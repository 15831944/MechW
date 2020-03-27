package com.mechw.service.db.gbt1502011.property;

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

        if (Objects.equals(category, "碳素钢和低合金钢")) {

            return getCarbonAndLowAlloyC1();

        } else if (Objects.equals(category, "高合金钢")) {

            return getHighAlloyC1();

        } else if (Objects.equals(category, "铸铁")) {

            return 0.0;

        } else if (Objects.equals(category, "镍及镍合金")) {

            return getNickelC1();

        } else if (Objects.equals(category, "铝及铝合金")) {

            return getAluminumC1();

        } else if (Objects.equals(category, "钛及钛合金")) {

            return getTitaniumC1();

        } else if (Objects.equals(category, "铜及铜合金")) {

            return getCopperC1();

        } else if (Objects.equals(category, "锆及锆合金")) {

            return getZirconiumC1();

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
                            case "18MnMoNbR":
                            case "13MnNiMoR":
                            case "15CrMoR":
                            case "14Cr1MoR":
                            case "12Cr2Mo1R":
                            case "12Cr1MoVR":
                            case "12Cr2Mo1VR":

                                if (thk >= 3 && thk <= 250) {
                                    return 0.3;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB 3531-2014":

                        switch (name) {

                            case "16MnDR(6～60)":
                            case "16MnDR(60～120)":
                            case "15MnNiDR":
                            case "15MnNiNbDR":
                            case "09MnNiDR":
                            case "08Ni3DR":
                            case "06Ni9DR":

                                if (thk >= 5 && thk <= 120) {
                                    return 0.3;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB 19189-2011":

                        switch (name) {

                            case "07MnMoVR":
                            case "07MnNiVDR":
                            case "07MnNiMoDR":
                            case "12MnNiVR":

                                if (thk >= 10 && thk <= 60) {
                                    return 0.3;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "ASME SA-516M:2013":

                        switch (name) {

                            case "GB/SA 516 Gr70":

                                if (thk >= 3 && thk <= 205) {
                                    return 0.3;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "ASME SA-537M:2013":

                        switch (name) {

                            case "GB/SA 537 Cl 1":

                                if (thk >= 3 && thk <= 100) {
                                    return 0.3;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "ASME SA-387M:2013":

                        switch (name) {

                            case "GB/SA 387 Gr12 Cl 2":
                                return 0.3;
                            default:
                                return -1.0;

                        }

                    default:
                        return -1.0;

                }

            case "管材":

                switch (std) {

                    case "GB/T 8163-2008":

                        switch (name) {

                            case "10":
                            case "20":
                            case "Q345D":

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

                    case "GB 9948-2013":
                    case "GB/T 150.2-2011 附录A":

                        switch (name) {

                            case "10":
                            case "20":
                            case "12CrMo":
                            case "15CrMo":
                            case "12Cr5MoI(1Cr5Mo)":
                            case "12Cr2Mo1":
                            case "09MnD":
                            case "09MnNiD":
                            case "08Cr2AlMo":
                            case "09CrCuSb":

                                if (isTube == 0) {

                                    if (thk > 0) {
                                        return 0.15 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk > 0.0 && thk <= 3.0) {
                                        return 0.2;
                                    } else if (thk > 3.0) {
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

                    case "GB 6479-2013":

                        switch (name) {

                            case "20":
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

                    case "GB 5310-2008":

                        switch (name) {

                            case "12Cr1MoVG":

                                if (isTube == 0) {

                                    if (thk > 0.0 && thk <= 4.0) {

                                        return Math.max(0.10 * thk, 0.45);

                                    } else if (thk > 4.0 && thk <= 20.0) {

                                        return 0.1 * thk;

                                    } else if (thk > 20.0) {

                                        return 0.1 * thk;

                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk > 0.0 && thk <= 3.0) {

                                        return 0.2;

                                    } else if (thk > 3.0 && thk <= 30.0) {

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

                    case "GB/T 24511-2017":

                        switch (name) {

                            case "S11306":
                            case "S11348":
                            case "S11972":
                            case "S21953":
                            case "S22253":
                            case "S22053":
                            case "S30408":
                            case "S30403":
                            case "S30409":
                            case "S31008":
                            case "S31608":
                            case "S31603":
                            case "S31668":
                            case "S31708":
                            case "S31703":
                            case "S32168":
                            case "S39042":
                            case "S30408(应变强化)":
                            case "S30403(应变强化)":
                            case "S31608(应变强化)":
                            case "S31603(应变强化)":

                                if (thk >= 1.5 && thk < 2.0) {
                                    return 0.10;
                                } else if (thk >= 2.0 && thk < 2.5) {
                                    return 0.29;
                                } else if (thk >= 2.5 && thk < 3.0) {
                                    return 0.30;
                                } else if (thk >= 3.0 && thk < 4.0) {
                                    return 0.30;
                                } else if (thk >= 4.0 && thk < 5.0) {
                                    return 0.30;
                                } else if (thk >= 5 && thk <= 100) {
                                    return 0.30;
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

                            case "S30408":
                            case "S30403":
                            case "S32168":
                            case "S31608":
                            case "S31603":
                            case "S31668":
                            case "S31708":
                            case "S31703":
                            case "S31008":

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

                            case "S30408":
                            case "S30403":
                            case "S32168":
                            case "S31608":
                            case "S31603":
                            case "S31668":
                            case "S31708":
                            case "S31703":
                            case "S31008":
                            case "S30409":
                                return 0.0;

                            default:
                                return -1.0;

                        }

                    case "GB/T 21833-2008":

                        switch (name) {

                            case "S21953":
                            case "S22253":
                            case "S22053":
                            case "S25073":

                                if (isTube == 0) {

                                    if (thk > 0.0 && thk <= 4.0) {
                                        return 0.45;
                                    } else if (thk > 4.0) {
                                        return 0.1 * thk;
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

                    case "GB/T 12771-2008":

                        switch (name) {

                            case "S30408":
                            case "S30403":
                            case "S31608":
                            case "S31603":
                            case "S32168":

                                if (thk > 0.0 && thk <= 0.5) {
                                    return 0.1;
                                } else if (thk > 0.5 && thk <= 1.0) {
                                    return 0.15;
                                } else if (thk > 1.0 && thk <= 2.0) {
                                    return 0.2;
                                } else if (thk > 2.0 && thk <= 4.0) {
                                    return 0.3;
                                } else if (thk > 4.0) {
                                    return 0.1 * thk;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB/T 24593-2009":

                        switch (name) {

                            case "S30408":
                            case "S30403":
                            case "S31608":
                            case "S31603":
                            case "S32168":

                                if (thk > 0.0) {
                                    return 0.1 * thk;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB/T 21832-2008":

                        switch (name) {

                            case "S21953":
                            case "S22253":
                            case "S22053":

                                if (od > 0 && od <= 38.0) {
                                    return 0.125 * thk;
                                } else if (od > 38.0) {
                                    return Math.max(0.1 * thk, 0.2);
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
     * @return 镍及镍合金 C1
     */
    private double getNickelC1() {

        switch (type) {

            case "板材":

                switch (std) {

                    case "NB/T 47046-2015":

                        switch (name) {

                            case "N5":
                            case "N7":
                            case "NCu30":

                                if (thk > 1.0 && thk <= 1.5) {
                                    return 0.11;
                                } else if (thk > 1.5 && thk <= 2.5) {
                                    return 0.13;
                                } else if (thk > 2.5 && thk <= 4) {
                                    return 0.15;
                                } else if (thk > 4 && thk <= 6) {
                                    return 0.4;
                                } else if (thk > 6 && thk <= 8) {
                                    return 0.5;
                                } else if (thk > 8 && thk <= 10) {
                                    return 0.6;
                                } else if (thk > 10 && thk <= 15) {
                                    return 0.7;
                                } else if (thk > 15 && thk <= 20) {
                                    return 0.9;
                                } else if (thk > 20 && thk <= 30) {
                                    return 1.1;
                                } else if (thk > 30 && thk <= 40) {
                                    return 1.3;
                                } else if (thk > 40 && thk <= 50) {
                                    return 1.5;
                                } else if (thk > 50 && thk <= 100) {
                                    return 1.5;
                                } else {
                                    return -1.0;
                                }

                            case "NS1101(NS111)":
                            case "NS1102(NS112)":
                            case "NS1402(NS142)":
                            case "NS3102(NS312)":
                            case "NS3201(NS321)":
                            case "NS3202(NS322)":
                            case "NS3304(NS334)":
                            case "NS3305(NS335)":
                            case "NS3306(NS336)":

                                if (thk >= 1 && thk <= 100) {
                                    return 0.3;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB/T 2054-2013":

                        switch (name) {

                            case "N6":

                                if (thk > 0.3 && thk <= 0.5) {
                                    return 0.05;
                                } else if (thk > 0.5 && thk <= 0.7) {
                                    return 0.07;
                                } else if (thk > 0.7 && thk <= 1.0) {
                                    return 0.09;
                                } else if (thk > 1 && thk <= 1.5) {
                                    return 0.11;
                                } else if (thk > 1.5 && thk <= 2.5) {
                                    return 0.13;
                                } else if (thk > 2.5 && thk <= 4) {
                                    return 0.15;
                                } else if (thk > 4 && thk <= 6) {
                                    return 0.4;
                                } else if (thk > 6 && thk <= 8) {
                                    return 0.5;
                                } else if (thk > 8 && thk <= 10) {
                                    return 0.6;
                                } else if (thk > 10 && thk <= 15) {
                                    return 0.7;
                                } else if (thk > 15 && thk <= 20) {
                                    return 0.9;
                                } else if (thk > 20 && thk <= 30) {
                                    return 1.1;
                                } else if (thk > 30 && thk <= 40) {
                                    return 1.3;
                                } else if (thk > 40 && thk <= 50) {
                                    return 1.5;
                                } else if (thk > 50 && thk <= 80) {
                                    return 1.7;
                                } else if (thk > 80 && thk <= 100) {
                                    return 1.9;
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

                    case "NB/T 47047-2015":

                        switch (name) {

                            case "NCu30":
                            case "NS1101(NS111)":
                            case "NS1102(NS112)":
                            case "NS3102(NS312)":
                            case "NS3105(NS315)":

                                if (isTube == 0) {

                                    if (thk > 0 && thk <= 8) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {
                                    if (thk > 0 && thk <= 8) {
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

                    case "GB/T 2882-2013":

                        switch (name) {

                            case "N6":

                                if (isTube == 0) {

                                    if (thk >= 0.05 && thk <= 0.06) {
                                        return 0.01;
                                    } else if (thk > 0.06 && thk <= 0.09) {
                                        return 0.01;
                                    } else if (thk > 0.09 && thk <= 0.12) {
                                        return 0.015;
                                    } else if (thk > 0.12 && thk <= 0.15) {
                                        return 0.02;
                                    } else if (thk > 0.15 && thk <= 0.20) {
                                        return 0.025;
                                    } else if (thk > 0.20 && thk <= 0.25) {
                                        return 0.03;
                                    } else if (thk > 0.25 && thk <= 0.30) {
                                        return 0.035;
                                    } else if (thk > 0.30 && thk <= 0.40) {
                                        return 0.04;
                                    } else if (thk > 0.40 && thk <= 0.50) {
                                        return 0.045;
                                    } else if (thk > 0.50 && thk <= 0.60) {
                                        return 0.055;
                                    } else if (thk > 0.60 && thk <= 0.70) {
                                        return 0.07;
                                    } else if (thk > 0.70 && thk <= 0.90) {
                                        return 0.08;
                                    } else if (thk > 0.90 && thk <= 3.0) {
                                        return 0.1 * thk;
                                    } else if (thk > 3.0 && thk <= 5.0) {
                                        return 0.125 * thk;
                                    } else if (thk > 5.0 && thk <= 8.0) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk >= 0.05 && thk <= 0.06) {
                                        return 0.006;
                                    } else if (thk > 0.06 && thk <= 0.09) {
                                        return 0.007;
                                    } else if (thk > 0.09 && thk <= 0.12) {
                                        return 0.01;
                                    } else if (thk > 0.12 && thk <= 0.15) {
                                        return 0.015;
                                    } else if (thk > 0.15 && thk <= 0.20) {
                                        return 0.020;
                                    } else if (thk > 0.20 && thk <= 0.25) {
                                        return 0.025;
                                    } else if (thk > 0.25 && thk <= 0.30) {
                                        return 0.030;
                                    } else if (thk > 0.30 && thk <= 0.40) {
                                        return 0.035;
                                    } else if (thk > 0.40 && thk <= 0.50) {
                                        return 0.040;
                                    } else if (thk > 0.50 && thk <= 0.60) {
                                        return 0.050;
                                    } else if (thk > 0.60 && thk <= 0.70) {
                                        return 0.06;
                                    } else if (thk > 0.70 && thk <= 0.90) {
                                        return 0.07;
                                    } else if (thk > 0.90 && thk <= 3.0) {
                                        return 0.1 * thk;
                                    } else if (thk > 3.0 && thk <= 5.0) {
                                        return 0.1 * thk;
                                    } else if (thk > 5.0 && thk <= 8.0) {
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

                    default:
                        return -1.0;

                }

            default:
                return 0.0;

        }

    }

    /**
     * @return 铝及铝合金材料 C1
     */
    private double getAluminumC1() {

        switch (type) {

            case "板材":

                switch (std) {

                    case "GB/T 3880-2012":

                        switch (name) {

                            case "1A85":
                            case "1060":
                            case "1050A":
                            case "1200":
                            case "3003":
                            case "3004":
                            case "5052":
                            case "5A03":
                            case "5A05":
                            case "5083":
                            case "5086":
                            case "6A02(T4焊)":
                            case "6A02(T6焊)":

                                if (thk > 0.20 && thk <= 0.4) {
                                    return 0.06;
                                } else if (thk > 0.4 && thk <= 0.6) {
                                    return 0.12;
                                } else if (thk > 0.6 && thk <= 0.8) {
                                    return 0.13;
                                } else if (thk > 0.8 && thk <= 2) {
                                    return 0.15;
                                } else if (thk > 2.0 && thk <= 2.5) {
                                    return 0.16;
                                } else if (thk > 2.5 && thk <= 3) {
                                    return 0.40;
                                } else if (thk > 3 && thk <= 3.5) {
                                    return 0.40;
                                } else if (thk > 3.5 && thk <= 4) {
                                    return 0.57;
                                } else if (thk > 4.0 && thk <= 5.0) {
                                    return 0.63;
                                } else if (thk > 5.0 && thk <= 6.0) {
                                    return 0.69;
                                } else if (thk > 6.0 && thk <= 8.0) {
                                    return 0.55;
                                } else if (thk > 8.0 && thk <= 10.0) {
                                    return 0.6;
                                } else if (thk > 10.0 && thk <= 15.0) {
                                    return 0.8;
                                } else if (thk > 15.0 && thk <= 20.0) {
                                    return 0.9;
                                } else if (thk > 20.0 && thk <= 30.0) {
                                    return 1.0;
                                } else if (thk > 30.0 && thk <= 40.0) {
                                    return 1.2;
                                } else if (thk > 40.0 && thk <= 50.0) {
                                    return 1.5;
                                } else if (thk > 50.0 && thk <= 60.0) {
                                    return 1.7;
                                } else if (thk > 60.0 && thk <= 80.0) {
                                    return 2.0;
                                } else if (thk > 80.0 && thk <= 100.0) {
                                    return 2.2;
                                } else if (thk > 100.0 && thk <= 150.0) {
                                    return 2.6;
                                } else if (thk > 150.0 && thk <= 220.0) {
                                    return 3.0;
                                } else if (thk > 220.0 && thk <= 250.0) {
                                    return 3.3;
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

                    case "GB/T 6893-2010":

                        switch (name) {

                            case "1060":
                            case "1050A":
                            case "1200":
                            case "5052":
                            case "5A03":
                            case "5A05":
                            case "5083":
                            case "6A02(T4焊)":
                            case "3003":
                            case "6061(T4焊)":
                            case "6061(T6焊)":
                            case "6063(T6焊)":

                                if (thk > 0 && thk <= 0.8) {
                                    return 0.10;
                                } else if (thk > 0.8 && thk <= 1.2) {
                                    return 0.12;
                                } else if (thk > 1.2 && thk <= 2.0) {
                                    return 0.20;
                                } else if (thk > 2.0 && thk <= 3.0) {
                                    return 0.23;
                                } else if (thk > 3.0 && thk <= 4.0) {
                                    return 0.30;
                                } else if (thk > 4.0 && thk <= 5.0) {
                                    return 0.40;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB/T 4437.1-2015":

                        switch (name) {

                            // 高镁合金
                            case "5083":
                            case "5086":
                            case "5A05":

                                if (thk >= 5 && thk <= 6) {

                                    if (od > 0 && od <= 80) {
                                        return 0.54;
                                    } else if (od > 80 && od <= 130) {
                                        return 0.77;
                                    } else if (od > 130) {
                                        return 1.10;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 6 && thk <= 10) {

                                    if (od > 0 && od <= 80) {
                                        return 0.65;
                                    } else if (od > 80 && od <= 130) {
                                        return 0.92;
                                    } else if (od > 130) {
                                        return 1.5;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 10 && thk <= 12) {

                                    if (od > 30 && od <= 80) {
                                        return 0.87;
                                    } else if (od > 80 && od <= 130) {
                                        return 1.2;
                                    } else if (od > 130) {
                                        return 2.0;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 12 && thk <= 20) {

                                    if (od > 30 && od <= 80) {
                                        return 1.1;
                                    } else if (od > 80 && od <= 130) {
                                        return 1.6;
                                    } else if (od > 130) {
                                        return 2.6;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 20 && thk <= 25) {

                                    if (od > 80 && od <= 130) {
                                        return 2.0;
                                    } else if (od > 130) {
                                        return 3.2;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 25 && thk <= 38) {

                                    if (od > 80 && od <= 130) {
                                        return 2.6;
                                    } else if (od > 130) {
                                        return 3.7;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 38 && thk <= 50) {

                                    if (od > 130) {
                                        return 4.3;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 50 && thk <= 60) {

                                    if (od > 130) {
                                        return 4.88;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 60 && thk <= 80) {

                                    if (od > 130) {
                                        return 5.48;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 80 && thk <= 90) {

                                    if (od > 130) {
                                        return 6.00;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 90 && thk <= 100) {

                                    if (od > 130) {
                                        return 6.60;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                                // 其他合金
                            case "1060":
                            case "1050A":
                            case "1200":
                            case "3003":
                            case "5052":
                            case "5A03":
                            case "5454":
                            case "6A02(T4焊)":
                            case "6A02(T6焊)":
                            case "6061(T4焊)":
                            case "6061(T6焊)":
                            case "6063(T6焊)":

                                if (thk >= 5 && thk <= 6) {

                                    if (od > 0 && od <= 80) {
                                        return 0.35;
                                    } else if (od > 80 && od <= 130) {
                                        return 0.50;
                                    } else if (od > 130) {
                                        return 0.77;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 6 && thk <= 10) {

                                    if (od > 0 && od <= 80) {
                                        return 0.42;
                                    } else if (od > 80 && od <= 130) {
                                        return 0.62;
                                    } else if (od > 130) {
                                        return 0.96;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 10 && thk <= 12) {

                                    if (od > 30 && od <= 80) {
                                        return 0.57;
                                    } else if (od > 80 && od <= 130) {
                                        return 0.80;
                                    } else if (od > 130) {
                                        return 1.3;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 12 && thk <= 20) {

                                    if (od > 30 && od <= 80) {
                                        return 0.77;
                                    } else if (od > 80 && od <= 130) {
                                        return 1.1;
                                    } else if (od > 130) {
                                        return 1.7;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 20 && thk <= 25) {

                                    if (od > 80 && od <= 130) {
                                        return 1.3;
                                    } else if (od > 130) {
                                        return 2.1;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 25 && thk <= 38) {

                                    if (od > 80 && od <= 130) {
                                        return 1.70;
                                    } else if (od > 130) {
                                        return 2.50;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 38 && thk <= 50) {

                                    if (od > 130) {
                                        return 2.9;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 50 && thk <= 60) {

                                    if (od > 130) {
                                        return 3.22;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 60 && thk <= 80) {

                                    if (od > 130) {
                                        return 3.60;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 80 && thk <= 90) {

                                    if (od > 130) {
                                        return 3.98;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 90 && thk <= 100) {

                                    if (od > 130) {
                                        return 4.36;
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
     * @return 钛及钛合金 C1
     */
    private double getTitaniumC1() {

        switch (type) {

            case "板材":

                switch (std) {

                    case "GB/T 3621-2007":

                        switch (name) {

                            case "TA1(TA0)":
                            case "TA2(TA1)":
                            case "TA3(TA2)":
                            case "TA4(TA3)":
                            case "TA9":
                            case "TA10":

                                if (thk > 0.3 && thk <= 0.5) {
                                    return 0.05;
                                } else if (thk > 0.5 && thk <= 0.8) {
                                    return 0.07;
                                } else if (thk > 0.8 && thk <= 1.1) {
                                    return 0.09;
                                } else if (thk > 1.1 && thk <= 1.5) {
                                    return 0.11;
                                } else if (thk > 1.5 && thk <= 2.0) {
                                    return 0.15;
                                } else if (thk > 2.0 && thk <= 3.0) {
                                    return 0.18;
                                } else if (thk > 3.0 && thk <= 4.0) {
                                    return 0.22;
                                } else if (thk > 4.0 && thk <= 6.0) {
                                    return 0.40;
                                } else if (thk > 6.0 && thk <= 10.0) {
                                    return 0.80;
                                } else if (thk > 10.0 && thk <= 15.0) {
                                    return 1.0;
                                } else if (thk > 15.0 && thk <= 20.0) {
                                    return 1.1;
                                } else if (thk > 20.0 && thk <= 30.0) {
                                    return 1.2;
                                } else if (thk > 30.0 && thk <= 40.0) {
                                    return 1.5;
                                } else if (thk > 40.0 && thk <= 50.0) {
                                    return 2.0;
                                } else if (thk > 50.0 && thk <= 60.0) {
                                    return 2.5;
                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB/T 14845-2007":

                        switch (name) {

                            case "TA1(TA1-A)":

                                if (thk > 0.5 && thk <= 0.8) {
                                    return 0.07;
                                } else if (thk > 0.8 && thk <= 1.0) {
                                    return 0.09;
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

                    case "GB/T 3624-2010":

                        switch (name) {

                            case "TA1(TA0)":
                            case "TA2(TA1)":
                            case "TA9":
                            case "TA10":

                                if (od >= 3 && od <= 5) {

                                    if (thk >= 0.2 && thk <= 0.6) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 5 && od <= 10) {

                                    if (thk >= 0.3 && thk <= 1.25) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 10 && od <= 15) {

                                    if (thk >= 0.5 && thk <= 2.0) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 15 && od <= 20) {

                                    if (thk >= 0.6 && thk <= 2.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 20 && od <= 30) {

                                    if (thk >= 0.6 && thk <= 3.0) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 30 && od <= 40) {

                                    if (thk >= 1.0 && thk <= 3.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 40 && od <= 50) {

                                    if (thk >= 1.25 && thk <= 4) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 50 && od <= 60) {

                                    if (thk >= 1.5 && thk <= 5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 60 && od <= 80) {

                                    if (thk >= 1.5 && thk <= 5.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 80 && od <= 110) {

                                    if (thk >= 2.5 && thk <= 5.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            case "TA3(TA2)":

                                if (od > 10 && od <= 15) {

                                    if (thk >= 0.5 && thk <= 2.0) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 15 && od <= 20) {

                                    if (thk >= 0.6 && thk <= 2.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 20 && od <= 30) {

                                    if (thk >= 0.6 && thk <= 2.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 30 && od <= 40) {

                                    if (thk >= 1.25 && thk <= 3.0) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 40 && od <= 50) {

                                    if (thk >= 1.25 && thk <= 3.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 50 && od <= 60) {

                                    if (thk >= 1.5 && thk <= 4.0) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (od > 60 && od <= 80) {

                                    if (thk >= 2.0 && thk <= 4.5) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;

                        }

                    case "GB/T 3625-2007":

                        switch (name) {

                            case "TA1(TA0)-无缝":
                            case "TA2(TA1)-无缝":
                            case "TA3(TA2)-无缝":
                            case "TA9-无缝":
                            case "TA10-无缝":
                            case "TA1(TA0)-焊接":
                            case "TA2(TA1)-焊接":
                            case "TA3(TA2)-焊接":
                            case "TA9-焊接":
                            case "TA10-焊接":

                                if (od >= 6 && od <= 80) {
                                    return 0.1 * thk;
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
     * @return 铜及铜合金 C1
     */
    private double getCopperC1() {

        switch (type) {

            case "板材":

                switch (std) {

                    case "GB/T 2040-2008":

                        switch (name) {

                            // 表 3、表 4
                            case "T2":
                            case "T3":
                            case "TU2":
                            case "TP1":
                            case "TP2":
                            case "H68":
                            case "H96":
                            case "H80":
                            case "H62":
                            case "HPb-59-1":
                            case "HSn62-1":

                                if (thk > 0.2 && thk <= 0.35) {
                                    return 0.06;
                                } else if (thk > 0.35 && thk <= 0.5) {
                                    return 0.08;
                                } else if (thk > 0.5 && thk <= 0.8) {
                                    return 0.15;
                                } else if (thk > 0.8 && thk <= 1.2) {
                                    return 0.16;
                                } else if (thk > 1.2 && thk <= 2) {
                                    return 0.35;
                                } else if (thk > 2 && thk <= 3.2) {
                                    return 0.5;
                                } else if (thk > 3.2 && thk <= 5) {
                                    return 0.7;
                                } else if (thk > 5 && thk <= 8) {
                                    return 1.0;
                                } else if (thk > 8 && thk <= 12.0) {
                                    return 1.3;
                                } else if (thk > 12 && thk <= 16) {
                                    return 1.4;
                                } else if (thk > 16 && thk <= 20) {
                                    return 1.5;
                                } else if (thk > 20 && thk <= 25) {
                                    return 1.8;
                                } else if (thk > 25 && thk <= 30) {
                                    return 2.0;
                                } else if (thk > 30 && thk <= 40) {
                                    return 2.7;
                                } else if (thk > 40 && thk <= 50) {
                                    return 3.5;
                                } else if (thk > 50 && thk <= 60) {
                                    return 4.3;
                                } else {
                                    return -1.0;
                                }

                                // 表 3 表 5
                            case "QAl5":
                            case "B19":
                            case "BFe10-1-1":
                            case "BFe30-1-1":

                                if (thk >= 0.2 && thk <= 0.3) {
                                    return 0.03;
                                } else if (thk > 0.3 && thk <= 0.4) {
                                    return 0.035;
                                } else if (thk > 0.4 && thk <= 0.5) {
                                    return 0.06;
                                } else if (thk > 0.5 && thk <= 0.8) {
                                    return 0.07;
                                } else if (thk > 0.8 && thk <= 1.2) {
                                    return 0.15;
                                } else if (thk > 1.2 && thk <= 2) {
                                    return 0.2;
                                } else if (thk > 2 && thk <= 3.2) {
                                    return 0.25;
                                } else if (thk > 3.2 && thk <= 4) {
                                    return 0.3;
                                } else if (thk > 4 && thk <= 5) {
                                    return 0.40;
                                } else if (thk > 5 && thk <= 6) {
                                    return 0.40;
                                } else if (thk > 6 && thk <= 8) {
                                    return 0.45;
                                } else if (thk > 8 && thk <= 12) {
                                    return 1.3;
                                } else if (thk > 12 && thk <= 16) {
                                    return 1.40;
                                } else if (thk > 16 && thk <= 20) {
                                    return 1.50;
                                } else if (thk > 20 && thk <= 25) {
                                    return 1.80;
                                } else if (thk > 25 && thk <= 30) {
                                    return 2.00;
                                } else if (thk > 30 && thk <= 40) {
                                    return 2.70;
                                } else if (thk > 40 && thk <= 50) {
                                    return 3.50;
                                } else if (thk > 50 && thk <= 60) {
                                    return 4.30;
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

                    case "GB/T 17791-2017":

                        switch (name) {

                            case "T2":
                            case "TU1":
                            case "TU2":
                            case "TP1":
                            case "TP2":

                                if (thk > 0.25 && thk <= 0.4) {

                                    if (od > 3 && od <= 15) {
                                        return 0.03;
                                    } else if (od > 15 && od <= 20) {
                                        return 0.04;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 0.4 && thk <= 0.6) {

                                    if (od > 3 && od <= 15) {
                                        return 0.04;
                                    } else if (od > 15 && od <= 20) {
                                        return 0.05;
                                    } else if (od > 20 && od <= 30) {
                                        return 0.05;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 0.6 && thk <= 0.8) {

                                    if (od > 3 && od <= 15) {
                                        return 0.05;
                                    } else if (od > 15 && od <= 20) {
                                        return 0.06;
                                    } else if (od > 20 && od <= 30) {
                                        return 0.07;
                                    } else if (od > 30 && od <= 54) {
                                        return 0.09;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 0.8 && thk <= 1.5) {

                                    if (od > 3 && od <= 15) {
                                        return 0.06;
                                    } else if (od > 15 && od <= 20) {
                                        return 0.07;
                                    } else if (od > 20 && od <= 30) {
                                        return 0.09;
                                    } else if (od > 30 && od <= 54) {
                                        return 0.10;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (thk > 1.5 && thk <= 2.5) {

                                    if (od > 3 && od <= 15) {
                                        return 0.07;
                                    } else if (od > 15 && od <= 20) {
                                        return 0.09;
                                    } else if (od > 20 && od <= 30) {
                                        return 0.10;
                                    } else if (od > 30 && od <= 54) {
                                        return 0.12;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;


                        }

                    case "GB/T 8890-2015":

                        switch (name) {

                            case "HAs85-0.05(H85A)":
                            case "HAs68-0.04(H68A)":
                            case "HSn70-1":
                            case "HAl77-2":
                            case "BFe10-1-1":
                            case "BFe30-1-1":

                                if (isTube == 0) {

                                    if (od >= 3 && od <= 160) {
                                        return 0.1 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (od >= 3 && od <= 160) {
                                        return 0.08 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else {
                                    return -1.0;
                                }

                            default:
                                return -1.0;


                        }

                    case "GB/T 1527-2017":

                        switch (name) {

                            case "T2":
                            case "T3":
                            case "TP1":
                            case "TP2":
                            case "H95(H96)":
                            case "H68":
                            case "H62":
                            case "HSn70-1":
                            case "HSn62-1":

                                if (isTube == 0) {

                                    if (thk > 0.2 && thk <= 0.4) {

                                        if (od > 3 & od <= 15) {
                                            return 0.12 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 0.4 && thk <= 0.6) {

                                        if (od > 3 & od <= 50) {
                                            return 0.12 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 0.6 && thk <= 0.9) {

                                        if (od > 3 & od <= 100) {
                                            return 0.12 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 0.9 && thk <= 1.5) {

                                        if (od > 3 & od <= 100) {
                                            return 0.12 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 1.5 && thk <= 2.0) {

                                        if (od > 3 & od <= 100) {
                                            return 0.1 * thk;
                                        } else if (od > 100 & od <= 175) {
                                            return 0.11 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 2.0 && thk <= 3.0) {

                                        if (od > 3 & od <= 100) {
                                            return 0.1 * thk;
                                        } else if (od > 100 & od <= 175) {
                                            return 0.11 * thk;
                                        } else if (od > 175 & od <= 250) {
                                            return 0.12 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 3.0 && thk <= 4.0) {

                                        if (od > 15 & od <= 175) {
                                            return 0.1 * thk;
                                        } else if (od > 175 & od <= 250) {
                                            return 0.11 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 4.0 && thk <= 5.5) {

                                        if (od > 15 & od <= 250) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 5.5 && thk <= 7) {

                                        if (od > 25 & od <= 250) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 7 && thk <= 10) {

                                        if (od > 50 & od <= 250) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 10) {

                                        if (od > 50 & od <= 250) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (thk > 0.2 && thk <= 0.4) {

                                        if (od > 3 & od <= 15) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 0.4 && thk <= 0.6) {

                                        if (od > 3 & od <= 50) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 0.6 && thk <= 0.9) {

                                        if (od > 3 & od <= 25) {
                                            return 0.09 * thk;
                                        } else if (od > 25 & od <= 100) {
                                            return 0.10 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 0.9 && thk <= 1.5) {

                                        if (od > 3 & od <= 25) {
                                            return 0.07 * thk;
                                        } else if (od > 25 & od <= 50) {
                                            return 0.08 * thk;
                                        } else if (od > 50 & od <= 100) {
                                            return 0.09 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 1.5 && thk <= 2.0) {

                                        if (od > 3 & od <= 15) {
                                            return 0.05 * thk;
                                        } else if (od > 15 & od <= 50) {
                                            return 0.06 * thk;
                                        } else if (od > 50 & od <= 100) {
                                            return 0.08 * thk;
                                        } else if (od > 100 & od <= 175) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 2.0 && thk <= 3.0) {

                                        if (od > 3 & od <= 25) {
                                            return 0.05 * thk;
                                        } else if (od > 25 & od <= 50) {
                                            return 0.06 * thk;
                                        } else if (od > 50 & od <= 100) {
                                            return 0.08 * thk;
                                        } else if (od > 100 & od <= 175) {
                                            return 0.09 * thk;
                                        } else if (od > 175 & od <= 250) {
                                            return 0.1 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 3.0 && thk <= 4.0) {

                                        if (od > 15 & od <= 50) {
                                            return 0.05 * thk;
                                        } else if (od > 50 & od <= 100) {
                                            return 0.06 * thk;
                                        } else if (od > 100 & od <= 175) {
                                            return 0.07 * thk;
                                        } else if (od > 175 & od <= 250) {
                                            return 0.09 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 4.0 && thk <= 5.5) {

                                        if (od > 15 & od <= 100) {
                                            return 0.05 * thk;
                                        } else if (od > 100 & od <= 175) {
                                            return 0.07 * thk;
                                        } else if (od > 175 & od <= 250) {
                                            return 0.08 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 5.5 && thk <= 7) {

                                        if (od > 25 & od <= 100) {
                                            return 0.05 * thk;
                                        } else if (od > 100 & od <= 175) {
                                            return 0.06 * thk;
                                        } else if (od > 175 & od <= 250) {
                                            return 0.07 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 7 && thk <= 10) {

                                        if (od > 50 & od <= 100) {
                                            return 0.05 * thk;
                                        } else if (od > 100 & od <= 250) {
                                            return 0.06 * thk;
                                        } else {
                                            return -1.0;
                                        }

                                    } else if (thk > 10) {

                                        if (od > 50 & od <= 175) {
                                            return 0.05 * thk;
                                        } else if (od > 175 & od <= 250) {
                                            return 0.06 * thk;
                                        } else {
                                            return -1.0;
                                        }

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
     * @return 锆及锆合金材料 C1
     */
    private double getZirconiumC1() {

        switch (type) {

            case "板材":

                switch (std) {

                    case "YS/T 753-2011":

                        switch (name) {

                            case "Zr-3":
                            case "Zr-5":

                                if (thk > 0.3 & thk <= 1.5) {
                                    return 0.03;
                                } else if (thk > 1.5 & thk <= 2) {
                                    return 0.08;
                                } else if (thk > 2 & thk <= 3) {
                                    return 0.12;
                                } else if (thk > 3 & thk <= 4) {
                                    return 0.14;
                                } else if (thk > 4 & thk <= 4.75) {
                                    return 0.17;
                                } else if (thk > 4.75 & thk <= 60) {
                                    return 0.25;
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

                    case "GB/T 26283-2010":

                        switch (name) {

                            case "Zr-3":
                            case "Zr-5":

                                if (isTube == 0) {

                                    if (od >= 6 && od <= 90) {
                                        return 0.125 * thk;
                                    } else {
                                        return -1.0;
                                    }

                                } else if (isTube == 1) {

                                    if (od >= 6 && od <= 90) {
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

                    default:
                        return -1.0;

                }

            default:
                return 0.0;

        }

    }

}
