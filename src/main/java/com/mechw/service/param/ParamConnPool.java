package com.mechw.service.param;

import com.ptc.cipjava.jxthrowable;
import com.ptc.pfc.pfcAsyncConnection.AsyncConnection;
import com.ptc.pfc.pfcAsyncConnection.pfcAsyncConnection;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ParamConnPool {

    // 空闲连接池
    private static List<AsyncConnection> freeList = new ArrayList<>();

    // 线程等待队列
    private static LinkedList<Object> waitQueue = new LinkedList<>();

    // 当前容量
    private static int totalSize = 0;

    // 连接池是否已经初始化
    private static boolean initialized = false;

    // 调试模式
    private static boolean debug = false;

    static {
        System.loadLibrary("pfcasyncmt");
    }

    /**
     * 初始化池
     */
    private static synchronized void initPool() throws jxthrowable {
        if (initialized) {
            return;
        }

        initialized = true;

        if (debug) debugPrint("Connection pool initialized!");

        for (int i = 0; i < ParamConnConf.MIN_SIZE; i++) {
            AsyncConnection conn = pfcAsyncConnection.AsyncConnection_Start(ParamConnConf.PARAMETRIC_PATH
                            + " "
                            + ParamConnConf.OPTION,
                    ParamConnConf.TEXT_DIR);
            freeList.add(conn);
            ++totalSize;
            if (debug) {
                debugPrint("Increase a connection, " +
                        "total connections =" + totalSize
                        + ", free connections " + freeList.size());
            }
        }
    }

    /**
     * 获取连接，如果当前没有连接可用，则加入等待队列
     */
    public static AsyncConnection getConnection() throws jxthrowable {

        AsyncConnection result;

        while (true) {//直到获取到一条连接为止
            result = internalGetConnection();

            if (result != null) {
                if (debug) {
                    debugPrint("Thread " + Thread.currentThread().getName()
                            + " acquired a connection, " +
                            "total connections =" + totalSize
                            + ", free connections " + freeList.size());
                }
                break;
            } else {
                Object monitor = new Object();
                if (debug) {
                    debugPrint("Thread " + Thread.currentThread().getName()
                            + " wait for a connection.");
                }

                //没有获取到连接，将当前线程加入等待队列
                synchronized (monitor) {
                    synchronized (waitQueue) {
                        waitQueue.add(monitor);
                    }
                    try {
                        monitor.wait();
                    } catch (InterruptedException ignore) {
                    }
                    //唤醒后会继续回到while循环，尝试获取连接
                }

                if (debug) {
                    debugPrint("Thread " + Thread.currentThread().getName()
                            + " wakeup.");
                }
            }
        }


        return result;
    }

    /**
     * 获取连接，如果没有连接，则尝试增加连接池
     */
    private static synchronized AsyncConnection internalGetConnection() throws jxthrowable {

        if (!initialized) {
            initPool();
        }

        AsyncConnection result = null;
        if (!freeList.isEmpty()) {
            result = freeList.remove(0);
        } else {
            if (totalSize < ParamConnConf.MAX_SIZE) {
                if (debug) {
                    debugPrint("Current pool is empty, " +
                            "try to increase connection pool.");
                }
                //当前创建的连接总数小于最大连接数，增加连接池
                result = increasePool();
            }
        }

        return result;
    }

    /**
     * 增加连接池，同时将最后创建的连接返回给当前线程
     *
     * @return 新创建的连接
     */
    private static AsyncConnection increasePool() throws jxthrowable {

        int localStep = ParamConnConf.STEP;

        if (totalSize + ParamConnConf.STEP > ParamConnConf.MAX_SIZE) {
            localStep = ParamConnConf.MAX_SIZE - totalSize;
        }

        AsyncConnection result = null;
        int lastIndex = localStep - 1;
        for (int i = 0; i < localStep; i++) {
            AsyncConnection conn = pfcAsyncConnection.AsyncConnection_Start(ParamConnConf.PARAMETRIC_PATH
                            + " "
                            + ParamConnConf.OPTION,
                    ParamConnConf.TEXT_DIR);
            totalSize++;

            if (i == lastIndex) {
                //最后创建的连接返回给当前线程使用
                result = conn;
                if (debug) {
                    debugPrint("Increase a connection, " +
                            "total connections =" + totalSize
                            + ", free connections " + freeList.size());
                }
            } else {
                freeList.add(conn);
                if (debug) {
                    debugPrint("Increase a connection, "
                            + "total connections =" + totalSize
                            + ", free connections " + freeList.size());
                }
                //增加连接后唤醒等待线程
                notifyWaitingThreads();
            }
        }

        return result;
    }

    /**
     * 唤醒等待的线程
     */
    private static void notifyWaitingThreads() {
        Object waitMonitor = null;
        synchronized (waitQueue) {
            if (waitQueue.size() > 0) {
                waitMonitor = waitQueue.removeFirst();
            }
        }

        if (waitMonitor != null) {
            synchronized (waitMonitor) {
                waitMonitor.notify();
            }
        }
    }

    /**
     * 释放连接，同时唤醒等待的线程
     *
     * @param conn 要释放的连接
     */
    public static synchronized void releaseConnection(AsyncConnection conn) {
        System.gc();
        freeList.add(conn);
        if (debug) {
            debugPrint("Release a connection, "
                    + "total connections =" + totalSize
                    + ", free connections " + freeList.size());
        }
        notifyWaitingThreads();
    }

    /**
     * 打印日志
     *
     * @param debugStr 日志信息
     */
    private static void debugPrint(String debugStr) {
        System.out.println(debugStr);
    }
}
