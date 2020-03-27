package com.mechw.service;

import java.util.Arrays;

public class Array {

    public Array() {
    }

    /**
     * 获取数组最小值
     *
     * @param array 要操作的数组
     * @return 最小值
     */
    public static double min(double[] array) {

        double min = array[0];

        for (double anArray : array) {
            if (anArray < min) {
                min = anArray;
            }
        }

        return min;

    }

    /**
     * 获取数组最小值
     *
     * @param array 要操作的数组
     * @return 最小值
     */
    public static float min(float[] array) {

        float min = array[0];

        for (float anArray : array) {
            if (anArray < min) {
                min = anArray;
            }
        }

        return min;

    }

    /**
     * 获取数组最小值
     *
     * @param array 要操作的数组
     * @return 最小值
     */
    public static int min(int[] array) {

        int min = array[0];

        for (int anArray : array) {
            if (anArray < min) {
                min = anArray;
            }
        }

        return min;

    }

    /**
     * 获取数组的最大值
     *
     * @param array 要操作的数组
     * @return 最大值
     */
    public static double max(double[] array) {

        double max = array[0];

        for (double anArray : array) {
            if (anArray > max) {
                max = anArray;
            }
        }

        return max;

    }

    /**
     * 获取数组的最大值
     *
     * @param array 要操作的数组
     * @return 最大值
     */
    public static float max(float[] array) {

        float max = array[0];

        for (float anArray : array) {
            if (anArray > max) {
                max = anArray;
            }
        }

        return max;

    }

    /**
     * 获取数组的最大值
     *
     * @param array 要操作的数组
     * @return 最大值
     */
    public static int max(int[] array) {

        int max = array[0];

        for (int anArray : array) {
            if (anArray > max) {
                max = anArray;
            }
        }

        return max;

    }

    /**
     * 判断给定数组中是否包含给定值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 布尔结果
     */
    public static boolean isContains(int[] array, int q) {

        boolean tag = false;

        for (int anArray : array) {
            if (anArray == q) {
                tag = true;
            }
        }

        return tag;

    }

    /**
     * 判断给定数组中是否包含给定值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 布尔结果
     */
    public static boolean isContains(double[] array, double q) {

        boolean tag = false;

        for (double anArray : array) {
            if (anArray == q) {
                tag = true;
            }
        }

        return tag;

    }

    /**
     * 判断给定数组中是否包含给定值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 布尔结果
     */
    public static boolean isContains(float[] array, float q) {

        boolean tag = false;

        for (float anArray : array) {
            if (anArray == q) {
                tag = true;
            }
        }

        return tag;

    }

    /**
     * 判断给定数组中是否包含给定值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 布尔结果
     */
    public static boolean isContains(int[] array, float q) {

        boolean tag = false;

        for (int anArray : array) {
            if (anArray == q) {
                tag = true;
            }
        }

        return tag;

    }

    /**
     * 获取给定数组中，小于给定值的最大值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 小于给定值的最大值
     */
    public static int getLower(int[] array, int q) {

        Arrays.sort(array);
        int lowerMax = array[0];

        for (int anArray : array) {
            if (anArray < q && anArray > lowerMax) {
                lowerMax = anArray;
            }
        }

        return lowerMax;

    }

    /**
     * 获取给定数组中，小于给定值的最大值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 小于给定值的最大值
     */
    public static double getLower(double[] array, double q) {

        Arrays.sort(array);
        double lowerMax = array[0];

        for (double anArray : array) {
            if (anArray < q && anArray > lowerMax) {
                lowerMax = anArray;
            }
        }

        return lowerMax;

    }

    /**
     * 获取给定数组中，小于给定值的最大值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 小于给定值的最大值
     */
    public static float getLower(float[] array, float q) {

        Arrays.sort(array);
        float lowerMax = array[0];

        for (float anArray : array) {
            if (anArray < q && anArray > lowerMax) {
                lowerMax = anArray;
            }
        }

        return lowerMax;

    }

    /**
     * 获取给定数组中，小于给定值的最大值
     *
     * @param array 要查找的数组
     * @param q     目标值
     * @return 小于给定值的最大值
     */
    public static int getLower(int[] array, float q) {

        Arrays.sort(array);
        int lowerMax = array[0];

        for (int anArray : array) {
            if (anArray < q && anArray > lowerMax) {
                lowerMax = anArray;
            }
        }

        return lowerMax;

    }

    /**
     * 获取数组中大于给定值的最小值
     *
     * @param array 要操作的数组
     * @param q     目标值
     * @return 大于给定值的最小值
     */
    public static int getUpper(int[] array, int q) {

        Arrays.sort(array);
        int upperMin = array[array.length - 1];

        for (int anArray : array) {
            if (anArray > q && anArray < upperMin) {
                upperMin = anArray;
            }
        }

        return upperMin;

    }

    /**
     * 获取数组中大于给定值的最小值
     *
     * @param array 要操作的数组
     * @param q     目标值
     * @return 大于给定值的最小值
     */
    public static double getUpper(double[] array, double q) {

        Arrays.sort(array);
        double upperMin = array[array.length - 1];

        for (double anArray : array) {
            if (anArray > q && anArray < upperMin) {
                upperMin = anArray;
            }
        }

        return upperMin;

    }

    /**
     * 获取数组中大于给定值的最小值
     *
     * @param array 要操作的数组
     * @param q     目标值
     * @return 大于给定值的最小值
     */
    public static float getUpper(float[] array, float q) {

        Arrays.sort(array);
        float upperMin = array[array.length - 1];

        for (float anArray : array) {
            if (anArray > q && anArray < upperMin) {
                upperMin = anArray;
            }
        }

        return upperMin;

    }

    /**
     * 获取数组中大于给定值的最小值
     *
     * @param array 要操作的数组
     * @param q     目标值
     * @return 大于给定值的最小值
     */
    public static int getUpper(int[] array, float q) {

        Arrays.sort(array);
        int upperMin = array[array.length - 1];

        for (int anArray : array) {
            if (anArray > q && anArray < upperMin) {
                upperMin = anArray;
            }
        }

        return upperMin;

    }

}
