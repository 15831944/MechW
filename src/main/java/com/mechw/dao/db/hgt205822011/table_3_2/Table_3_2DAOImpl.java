package com.mechw.dao.db.hgt205822011.table_3_2;

import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_3_2DAO")
public class Table_3_2DAOImpl implements Table_3_2DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public double findK(Double jacketDo, Double shellDi, Double shellThk) {

        // 获取图表中横坐标组成的数组di
        String sql_di = "SELECT DISTINCT shell_di FROM hgt_20582_2011.table_3_2 WHERE jacket_do = :jacket_do_param";
        NativeQuery query_di = this.getSession().createNativeQuery(sql_di);
        query_di.setParameter("jacket_do_param", jacketDo);
        List shellDiList = query_di.list();
        Object[] diList = shellDiList.toArray();
        double[] di = new double[diList.length];
        for (int i = 0; i < diList.length; i++) {
            di[i] = (double) diList[i];
        }

        // 获取图表中厚度组成的数组thk
        String sql_thk = "SELECT DISTINCT shell_thk FROM hgt_20582_2011.table_3_2 WHERE jacket_do = :jacket_do_param";
        NativeQuery query_thk = this.getSession().createNativeQuery(sql_thk);
        query_thk.setParameter("jacket_do_param", jacketDo);
        List shellThkList = query_thk.list();
        Object[] thkList = shellThkList.toArray();
        double[] thk = new double[thkList.length];
        for (int i = 0; i < thkList.length; i++) {
            thk[i] = (double) thkList[i];
        }

        double diUpperMin, diLowerMax, thkUpperMin, thkLowerMax, k;

        // 如果设备直径恰好是节点值
        if (Array.isContains(di, shellDi)) {

            if (Array.isContains(thk, shellThk)) {

                String sql_1 = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", shellDi)
                        .setParameter("shell_thk_param", shellThk);

                k = (double) query_1.list().get(0);

            } else {

                // 获取给定 thk 的上下边界值
                thkUpperMin = Array.getUpper(thk, shellThk);
                thkLowerMax = Array.getLower(thk, shellThk);

                // 下部 k
                String sql_2 = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", shellDi)
                        .setParameter("shell_thk_param", thkLowerMax);
                double k2 = (double) query_2.list().get(0);

                // 上部 k
                String sql_3 = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
                query_3.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", shellDi)
                        .setParameter("shell_thk_param", thkUpperMin);
                double k3 = (double) query_3.list().get(0);

                k = k3 + (k2 - k3) * (shellThk - thkUpperMin) / (thkLowerMax - thkUpperMin);

            }

        } else {

            if (Array.isContains(thk, shellThk)) {

                // 获取给定 DI 的上下边界值
                diUpperMin = Array.getUpper(di, shellDi);
                diLowerMax = Array.getLower(di, shellDi);

                // 左角K
                String sql_k4 = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_k4 = this.getSession().createNativeQuery(sql_k4);
                query_k4.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", diLowerMax)
                        .setParameter("shell_thk_param", shellThk);
                double k4 = (double) query_k4.list().get(0);

                // 右角K
                String sql_k5 = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_k5 = this.getSession().createNativeQuery(sql_k5);
                query_k5.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", diUpperMin)
                        .setParameter("shell_thk_param", shellThk);
                double k5 = (double) query_k5.list().get(0);

                k = k4 * Math.pow(k5 / k4, (shellDi - diLowerMax) / (diUpperMin - diLowerMax));

            } else {

                // 获取给定 DI 的上下边界值
                diUpperMin = Array.getUpper(di, shellDi);
                diLowerMax = Array.getLower(di, shellDi);

                // 获取给定 thk 的上下边界值
                thkUpperMin = Array.getUpper(thk, shellThk);
                thkLowerMax = Array.getLower(thk, shellThk);

                // 左上角K
                String sql_klt = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_klt = this.getSession().createNativeQuery(sql_klt);
                query_klt.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", diLowerMax)
                        .setParameter("shell_thk_param", thkLowerMax);
                double kLT = (double) query_klt.list().get(0);

                // 右上角K
                String sql_krt = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_krt = this.getSession().createNativeQuery(sql_krt);
                query_krt.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", diUpperMin)
                        .setParameter("shell_thk_param", thkLowerMax);
                double kRT = (double) query_krt.list().get(0);

                // 左下角K
                String sql_klb = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_klb = this.getSession().createNativeQuery(sql_klb);
                query_klb.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", diLowerMax)
                        .setParameter("shell_thk_param", thkUpperMin);
                double kLB = (double) query_klb.list().get(0);

                // 右下角K
                String sql_krb = "SELECT k FROM hgt_20582_2011.table_3_2 " +
                        "WHERE jacket_do = :jacket_do_param " +
                        "AND shell_di = :shell_di_param " +
                        "AND ABS(shell_thk- :shell_thk_param) < 1e-5";
                NativeQuery query_krb = this.getSession().createNativeQuery(sql_krb);
                query_krb.setParameter("jacket_do_param", jacketDo)
                        .setParameter("shell_di_param", diUpperMin)
                        .setParameter("shell_thk_param", thkUpperMin);
                double kRB = (double) query_krb.list().get(0);

                // shellDi 上下线所对应的 K
                double kU = kLT * Math.pow(kRT / kLT, (shellDi - diLowerMax) / (diUpperMin - diLowerMax));
                double kL = kLB * Math.pow(kRB / kLB, (shellDi - diLowerMax) / (diUpperMin - diLowerMax));

                // 计算K
                k = kL + (kU - kL) * (shellThk - thkUpperMin) / (thkLowerMax - thkUpperMin);

            }

        }

        return k;

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
