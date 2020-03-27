package com.mechw.service.db.nbt4700312009.property;

import com.mechw.model.db.GBC1Query;

import java.util.Objects;

/**
 * 本类用来计算材料的厚度负偏差，厚度范围为材料标准的可用范围，不是建造标准的采用范围
 */
public class GBC1 {


    private String category;
    private String type;
    private String std;
    private String name;
    private double isTube;
    private double od;
    private double thk;

    /**
     * 构造函数，将传入的查询对象分解
     *
     * @param gbc1Query 传入查询对象
     */
    public GBC1(GBC1Query gbc1Query) {
        category = gbc1Query.getCategory();
        type = gbc1Query.getType();
        std = gbc1Query.getStd();
        name = gbc1Query.getName();
        isTube = gbc1Query.getTag();
        od = gbc1Query.getOd();
        thk = gbc1Query.getThk();
    }

    /**
     * @return 厚度负偏差 C1
     */
    public double getC1() {

        if (Objects.equals(category, "碳素钢") || Objects.equals(category, "低合金钢")) {

            return getCarbonAndLowAlloyC1();

        } else if (Objects.equals(category, "高合金钢")) {

            return getHighAlloyC1();

        } else {
            return -1.0;
        }

    }

    /**
     * @return 碳素钢和低合金钢 C1
     */
    private double getCarbonAndLowAlloyC1() {

        switch (type) {

            case "板材":

                switch (std) {

                    case "GB/T 3274-2017":

                        switch (name) {

                            case "Q235A·F":
                            case "Q235A":
                            case "Q235B":
                            case "Q235C":

                                if (thk > 3.0 && thk <= 5.0) {
                                    return 0.65;
                                } else if (thk > 5.0 && thk <= 8.0) {
                                    return 0.75;
                                } else if (thk > 8.0 && thk <= 15.0) {
                                    return 0.9;
                                } else if (thk > 15.0 && thk <= 25.0) {
                                    return 1.1;
                                } else if (thk > 25.0 && thk <= 40.0) {
                                    return 1.2;
                                } else if (thk > 40.0 && thk <= 60.0) {
                                    return 1.3;
                                } else if (thk > 60.0 && thk <= 100.0) {
                                    return 1.5;
                                } else if (thk > 100.0 && thk <= 150.0) {
                                    return 1.8;
                                } else if (thk > 150.0 && thk <= 200.0) {
                                    return 1.9;
                                } else if (thk > 200.0 && thk <= 250.0) {
                                    return 2.2;
                                } else if (thk > 250.0 && thk <= 300.0) {
                                    return 2.4;
                                } else if (thk > 300.0 && thk <= 400.0) {
                                    return 2.6;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;
                        }

                    case "GB 713-2014":

                        switch (name) {

                            case "Q245R":
                            case "Q345R":
                            case "Q370R":

                                if (thk >= 3 && thk <= 250) {
                                    return 0.3;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;
                        }

                    default:
                        return -1.0;
                }

            case "管材":

                switch (std) {

                    case "GB/T 3091-2015":

                        switch (name) {

                            case "Q235A":
                            case "Q235B":
                                return 0.1 * thk;

                            default:
                                return -1.0;
                        }

                    case "GB/T 8162-2008":

                        switch (name) {

                            case "10":
                            case "20":
                            case "Q345A":
                            case "Q345B":
                            case "Q345C":
                            case "Q345D":
                            case "Q345E":

                                if (isTube == 0) {

                                    if (od > 0 && od <= 102) {

                                        return Math.max(0.15 * thk, 0.4);

                                    } else if (od > 102) {

                                        if (thk / od > 0 && thk / od <= 0.05) {
                                            return Math.max(0.15 * thk, 0.4);
                                        } else if (thk / od > 0.05 && thk / od <= 0.1) {
                                            return Math.max(0.15 * thk, 0.4);
                                        } else if (thk / od > 0.1) {
                                            return 0.15 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk > 0.0 && thk <= 3.0) {
                                        return Math.max(0.1 * thk, 0.15);
                                    } else if (thk > 3) {
                                        return 0.1 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;
                        }

                    case "GB/T 8163-2008":

                        switch (name) {

                            case "10":
                            case "20":
                            case "Q345A":
                            case "Q345B":
                            case "Q345C":
                            case "Q345D":
                            case "Q345E":

                                if (isTube == 0) {

                                    if (od > 0 && od <= 102) {

                                        return Math.max(0.15 * thk, 0.4);

                                    } else if (od > 102) {

                                        if (thk / od > 0 && thk / od <= 0.05) {
                                            return Math.max(0.15 * thk, 0.4);
                                        } else if (thk / od > 0.05 && thk / od <= 0.1) {
                                            return Math.max(0.15 * thk, 0.4);
                                        } else if (thk / od > 0.1) {
                                            return 0.15 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk > 0.0 && thk <= 3.0) {
                                        return Math.max(0.1 * thk, 0.15);
                                    } else if (thk > 3) {
                                        return 0.1 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;
                        }

                    case "GB 6479-2013":

                        switch (name) {

                            case "Q345B":
                            case "Q345C":
                            case "Q345D":
                            case "Q345E":

                                if (isTube == 0) {

                                    if (od > 0.0 && od <= 159.0) {

                                        return Math.max(0.15 * thk, 0.4);

                                    } else if (od > 159.0) {

                                        if (thk > 0) {
                                            return 0.15 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk > 0.0 && thk <= 2.0) {
                                        return 0.1 * thk;
                                    } else if (thk > 2) {
                                        return 0.075 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;
                        }

                    default:
                        return -1.0;
                }

            default:
                return 0.0;
        }
    }

    /**
     * @return 高合金钢 C1
     */
    private double getHighAlloyC1() {

        switch (type) {

            case "板材":

                switch (std) {

                    case "GB/T 4237-2015":

                        switch (name) {

                            case "S41008(06Cr13)":
                            case "S30408(06Cr19Ni10)":
                            case "S32168(06Cr18Ni11Ti)":
                            case "S31608(06Cr17Ni12Mo2)":
                            case "S31668(06Cr17Ni12Mo2Ti)":
                            case "S30403(022Cr19Ni10)":
                            case "S31603(022Cr17Ni12Mo2)":
                            case "S21953(022Cr19Ni5Mo3Si2N)":

                                if (thk >= 3.0 && thk < 5) {
                                    return 0.65;
                                } else if (thk >= 5 && thk <= 8) {
                                    return 0.75;
                                } else if (thk >= 8 && thk <= 13) {
                                    return 0.9;
                                } else if (thk >= 13 && thk <= 25) {
                                    return 1.1;
                                } else if (thk >= 25 && thk <= 40) {
                                    return 1.2;
                                } else if (thk >= 40 && thk <= 60) {
                                    return 1.3;
                                } else if (thk >= 60 && thk <= 80) {
                                    return 1.5;
                                } else if (thk >= 80 && thk <= 100) {
                                    return 1.6;
                                } else if (thk >= 100 && thk <= 150) {
                                    return 1.8;
                                } else if (thk >= 150 && thk <= 200) {
                                    return 2.1;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;
                        }

                    default:
                        return -1.0;
                }

            case "管材":

                switch (std) {

                    case "GB/T 14976-2012":

                        switch (name) {

                            case "S41008(06Cr13)":
                            case "S30408(06Cr19Ni10)":
                            case "S32168(06Cr18Ni11Ti)":
                            case "S31608(06Cr17Ni12Mo2)":
                            case "S31668(06Cr17Ni12Mo2Ti)":
                            case "S30403(022Cr19Ni10)":
                            case "S31603(022Cr17Ni12Mo2)":

                                if (isTube == 0) {

                                    if (thk > 0.0 && thk < 15.0) {
                                        return 0.125 * thk;
                                    } else if (thk >= 15.0) {
                                        return 0.15 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk > 0.0) {
                                        return 0.1 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;
                        }

                    case "GB 13296-2013":

                        switch (name) {

                            case "S30408(06Cr19Ni10)":
                            case "S32168(06Cr18Ni11Ti)":
                            case "S31608(06Cr17Ni12Mo2)":
                            case "S31668(06Cr17Ni12Mo2Ti)":
                            case "S30403(022Cr19Ni10)":
                            case "S31603(022Cr17Ni12Mo2)":
                                return 0.0;

                            default:
                                return -1.0;
                        }

                    default:
                        return -1.0;
                }

            default:
                return 0.0;
        }
    }
}
