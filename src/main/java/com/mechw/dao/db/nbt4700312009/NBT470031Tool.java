package com.mechw.dao.db.nbt4700312009;

import com.mechw.service.Array;

import java.util.Arrays;
import java.util.Map;

public class NBT470031Tool {

    // 查表通用函数
    public static double calDesign(double temp, Map<Double, Double> map) {

        // 将温度转化为数组
        Object[] objArray = map.keySet().toArray();
        double[] tempArray = new double[objArray.length];
        for (int i = 0; i < objArray.length; i++) {
            tempArray[i] = (double) objArray[i];
        }

        // 数组排序
        Arrays.sort(tempArray);

        double minTableTemp = Array.min(tempArray);
        double maxTableTemp = Array.max(tempArray);

        // 当给定温度小于数据库最小温度时，取最小温度对应的值
        if (temp <= minTableTemp) {

            return map.get(minTableTemp);

            // 当给定温度大于数据库最大温度时，返回 -1.0
        } else if (temp > maxTableTemp) {

            return -1.0;

            // 中间插值
        } else {

            if (Array.isContains(tempArray, temp)) {

                return map.get(temp);

            } else {

                double lowerMax = Array.getLower(tempArray, temp);
                double upperMin = Array.getUpper(tempArray, temp);
                double lowerValue = map.get(lowerMax);
                double upperValue = map.get(upperMin);
                return lowerValue + (upperValue - lowerValue) * (temp - lowerMax) / (upperMin - lowerMax);

            }

        }

    }

}
