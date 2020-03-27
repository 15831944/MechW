package com.mechw.entity.db.gbt1502011.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "a", catalog = "gbt_150_2011")
public class A {

    // 行号
    @Id
    @Column(name = "index")
    private Double index;

    @Column(name = "no")
    private Double no;

    // 标准名称
    @Column(name = "std")
    private String std;

    // 材料名称
    @Column(name = "name")
    private String name;

    @Column(name = "a_thk_min")
    private Double aThkMin;

    @Column(name = "a_thk_max")
    private Double aThkMax;

    @Column(name = "a_temp_min")
    private Double aTempMin;

    @Column(name = "a_temp_max")
    private Double aTempMax;

    // 热膨胀系数
    @Column(name = "n198")
    private Double n198;

    @Column(name = "n196")
    private Double n196;

    @Column(name = "n184")
    private Double n184;

    @Column(name = "n180")
    private Double n180;

    @Column(name = "n160")
    private Double n160;

    @Column(name = "n140")
    private Double n140;

    @Column(name = "n129")
    private Double n129;

    @Column(name = "n120")
    private Double n120;

    @Column(name = "n100")
    private Double n100;

    @Column(name = "n80")
    private Double n80;

    @Column(name = "n73")
    private Double n73;

    @Column(name = "n60")
    private Double n60;

    @Column(name = "n50")
    private Double n50;

    @Column(name = "n40")
    private Double n40;

    @Column(name = "n20")
    private Double n20;

    @Column(name = "n0")
    private Double n0;

    @Column(name = "p20")
    private Double p20;

    @Column(name = "p21")
    private Double p21;

    @Column(name = "p38")
    private Double p38;

    @Column(name = "p40")
    private Double p40;

    @Column(name = "p50")
    private Double p50;

    @Column(name = "p60")
    private Double p60;

    @Column(name = "p66")
    private Double p66;

    @Column(name = "p80")
    private Double p80;

    @Column(name = "p93")
    private Double p93;

    @Column(name = "p100")
    private Double p100;

    @Column(name = "p120")
    private Double p120;

    @Column(name = "p121")
    private Double p121;

    @Column(name = "p140")
    private Double p140;

    @Column(name = "p149")
    private Double p149;

    @Column(name = "p150")
    private Double p150;

    @Column(name = "p160")
    private Double p160;

    @Column(name = "p177")
    private Double p177;

    @Column(name = "p180")
    private Double p180;

    @Column(name = "p200")
    private Double p200;

    @Column(name = "p204")
    private Double p204;

    @Column(name = "p220")
    private Double p220;

    @Column(name = "p232")
    private Double p232;

    @Column(name = "p240")
    private Double p240;

    @Column(name = "p250")
    private Double p250;

    @Column(name = "p260")
    private Double p260;

    @Column(name = "p280")
    private Double p280;

    @Column(name = "p288")
    private Double p288;

    @Column(name = "p300")
    private Double p300;

    @Column(name = "p316")
    private Double p316;

    @Column(name = "p320")
    private Double p320;

    @Column(name = "p343")
    private Double p343;

    @Column(name = "p350")
    private Double p350;

    @Column(name = "p371")
    private Double p371;

    @Column(name = "p399")
    private Double p399;

    @Column(name = "p400")
    private Double p400;

    @Column(name = "p426")
    private Double p426;

    @Column(name = "p427")
    private Double p427;

    @Column(name = "p450")
    private Double p450;

    @Column(name = "p454")
    private Double p454;

    @Column(name = "p482")
    private Double p482;

    @Column(name = "p500")
    private Double p500;

    @Column(name = "p510")
    private Double p510;

    @Column(name = "p538")
    private Double p538;

    @Column(name = "p550")
    private Double p550;

    @Column(name = "p565")
    private Double p565;

    @Column(name = "p593")
    private Double p593;

    @Column(name = "p600")
    private Double p600;

    @Column(name = "p620")
    private Double p620;

    @Column(name = "p649")
    private Double p649;

    @Column(name = "p650")
    private Double p650;

    @Column(name = "p677")
    private Double p677;

    @Column(name = "p700")
    private Double p700;

    @Column(name = "p704")
    private Double p704;

    @Column(name = "p732")
    private Double p732;

    @Column(name = "p760")
    private Double p760;

    @Column(name = "p788")
    private Double p788;

    @Column(name = "p816")
    private Double p816;

    @Column(name = "p843")
    private Double p843;

    @Column(name = "p871")
    private Double p871;

    @Column(name = "p889")
    private Double p889;

    public A() {
    }

    public A(Double index, Double no, String std, String name, Double aThkMin, Double aThkMax, Double aTempMin, Double aTempMax, Double n198, Double n196, Double n184, Double n180, Double n160, Double n140, Double n129, Double n120, Double n100, Double n80, Double n73, Double n60, Double n50, Double n40, Double n20, Double n0, Double p20, Double p21, Double p38, Double p40, Double p50, Double p60, Double p66, Double p80, Double p93, Double p100, Double p120, Double p121, Double p140, Double p149, Double p150, Double p160, Double p177, Double p180, Double p200, Double p204, Double p220, Double p232, Double p240, Double p250, Double p260, Double p280, Double p288, Double p300, Double p316, Double p320, Double p343, Double p350, Double p371, Double p399, Double p400, Double p426, Double p427, Double p450, Double p454, Double p482, Double p500, Double p510, Double p538, Double p550, Double p565, Double p593, Double p600, Double p620, Double p649, Double p650, Double p677, Double p700, Double p704, Double p732, Double p760, Double p788, Double p816, Double p843, Double p871, Double p889) {
        this.index = index;
        this.no = no;
        this.std = std;
        this.name = name;
        this.aThkMin = aThkMin;
        this.aThkMax = aThkMax;
        this.aTempMin = aTempMin;
        this.aTempMax = aTempMax;
        this.n198 = n198;
        this.n196 = n196;
        this.n184 = n184;
        this.n180 = n180;
        this.n160 = n160;
        this.n140 = n140;
        this.n129 = n129;
        this.n120 = n120;
        this.n100 = n100;
        this.n80 = n80;
        this.n73 = n73;
        this.n60 = n60;
        this.n50 = n50;
        this.n40 = n40;
        this.n20 = n20;
        this.n0 = n0;
        this.p20 = p20;
        this.p21 = p21;
        this.p38 = p38;
        this.p40 = p40;
        this.p50 = p50;
        this.p60 = p60;
        this.p66 = p66;
        this.p80 = p80;
        this.p93 = p93;
        this.p100 = p100;
        this.p120 = p120;
        this.p121 = p121;
        this.p140 = p140;
        this.p149 = p149;
        this.p150 = p150;
        this.p160 = p160;
        this.p177 = p177;
        this.p180 = p180;
        this.p200 = p200;
        this.p204 = p204;
        this.p220 = p220;
        this.p232 = p232;
        this.p240 = p240;
        this.p250 = p250;
        this.p260 = p260;
        this.p280 = p280;
        this.p288 = p288;
        this.p300 = p300;
        this.p316 = p316;
        this.p320 = p320;
        this.p343 = p343;
        this.p350 = p350;
        this.p371 = p371;
        this.p399 = p399;
        this.p400 = p400;
        this.p426 = p426;
        this.p427 = p427;
        this.p450 = p450;
        this.p454 = p454;
        this.p482 = p482;
        this.p500 = p500;
        this.p510 = p510;
        this.p538 = p538;
        this.p550 = p550;
        this.p565 = p565;
        this.p593 = p593;
        this.p600 = p600;
        this.p620 = p620;
        this.p649 = p649;
        this.p650 = p650;
        this.p677 = p677;
        this.p700 = p700;
        this.p704 = p704;
        this.p732 = p732;
        this.p760 = p760;
        this.p788 = p788;
        this.p816 = p816;
        this.p843 = p843;
        this.p871 = p871;
        this.p889 = p889;
    }

    // 将线膨胀系数部分转化为Map
    public Map<Double, Double> toMap() {

        Map<Double, Double> aMap = new HashMap<>();

        if (this.n198 != null) {
            aMap.put(-198.0, n198);
        }
        if (this.n196 != null) {
            aMap.put(-196.0, n196);
        }
        if (this.n184 != null) {
            aMap.put(-184.0, n184);
        }
        if (this.n180 != null) {
            aMap.put(-180.0, n180);
        }
        if (this.n160 != null) {
            aMap.put(-160.0, n160);
        }
        if (this.n140 != null) {
            aMap.put(-140.0, n140);
        }
        if (this.n129 != null) {
            aMap.put(-129.0, n129);
        }
        if (this.n120 != null) {
            aMap.put(-120.0, n120);
        }
        if (this.n100 != null) {
            aMap.put(-100.0, n100);
        }
        if (this.n80 != null) {
            aMap.put(-80.0, n80);
        }
        if (this.n73 != null) {
            aMap.put(-73.0, n73);
        }
        if (this.n60 != null) {
            aMap.put(-60.0, n60);
        }
        if (this.n50 != null) {
            aMap.put(-50.0, n50);
        }
        if (this.n40 != null) {
            aMap.put(-40.0, n40);
        }
        if (this.n20 != null) {
            aMap.put(-20.0, n20);
        }
        if (this.n0 != null) {
            aMap.put(0.0, n0);
        }
        if (this.p20 != null) {
            aMap.put(20.0, p20);
        }
        if (this.p21 != null) {
            aMap.put(21.0, p21);
        }
        if (this.p38 != null) {
            aMap.put(38.0, p38);
        }
        if (this.p40 != null) {
            aMap.put(40.0, p40);
        }
        if (this.p50 != null) {
            aMap.put(50.0, p50);
        }
        if (this.p60 != null) {
            aMap.put(60.0, p60);
        }
        if (this.p66 != null) {
            aMap.put(66.0, p66);
        }
        if (this.p80 != null) {
            aMap.put(80.0, p80);
        }
        if (this.p93 != null) {
            aMap.put(93.0, p93);
        }
        if (this.p100 != null) {
            aMap.put(100.0, p100);
        }
        if (this.p120 != null) {
            aMap.put(120.0, p120);
        }
        if (this.p121 != null) {
            aMap.put(121.0, p121);
        }
        if (this.p140 != null) {
            aMap.put(140.0, p140);
        }
        if (this.p149 != null) {
            aMap.put(149.0, p149);
        }
        if (this.p150 != null) {
            aMap.put(150.0, p150);
        }
        if (this.p160 != null) {
            aMap.put(160.0, p160);
        }
        if (this.p177 != null) {
            aMap.put(177.0, p177);
        }
        if (this.p180 != null) {
            aMap.put(180.0, p180);
        }
        if (this.p200 != null) {
            aMap.put(200.0, p200);
        }
        if (this.p204 != null) {
            aMap.put(204.0, p204);
        }
        if (this.p220 != null) {
            aMap.put(220.0, p220);
        }
        if (this.p232 != null) {
            aMap.put(232.0, p232);
        }
        if (this.p240 != null) {
            aMap.put(240.0, p240);
        }
        if (this.p250 != null) {
            aMap.put(250.0, p250);
        }
        if (this.p260 != null) {
            aMap.put(260.0, p260);
        }
        if (this.p280 != null) {
            aMap.put(280.0, p280);
        }
        if (this.p288 != null) {
            aMap.put(288.0, p288);
        }
        if (this.p300 != null) {
            aMap.put(300.0, p300);
        }
        if (this.p316 != null) {
            aMap.put(316.0, p316);
        }
        if (this.p320 != null) {
            aMap.put(320.0, p320);
        }
        if (this.p343 != null) {
            aMap.put(343.0, p343);
        }
        if (this.p350 != null) {
            aMap.put(350.0, p350);
        }
        if (this.p371 != null) {
            aMap.put(371.0, p371);
        }
        if (this.p399 != null) {
            aMap.put(399.0, p399);
        }
        if (this.p400 != null) {
            aMap.put(400.0, p400);
        }
        if (this.p426 != null) {
            aMap.put(426.0, p426);
        }
        if (this.p427 != null) {
            aMap.put(427.0, p427);
        }
        if (this.p450 != null) {
            aMap.put(450.0, p450);
        }
        if (this.p454 != null) {
            aMap.put(454.0, p454);
        }
        if (this.p482 != null) {
            aMap.put(482.0, p482);
        }
        if (this.p500 != null) {
            aMap.put(500.0, p500);
        }
        if (this.p510 != null) {
            aMap.put(510.0, p510);
        }
        if (this.p538 != null) {
            aMap.put(538.0, p538);
        }
        if (this.p550 != null) {
            aMap.put(550.0, p550);
        }
        if (this.p565 != null) {
            aMap.put(565.0, p565);
        }
        if (this.p593 != null) {
            aMap.put(593.0, p593);
        }
        if (this.p600 != null) {
            aMap.put(600.0, p600);
        }
        if (this.p620 != null) {
            aMap.put(620.0, p620);
        }
        if (this.p649 != null) {
            aMap.put(649.0, p649);
        }
        if (this.p650 != null) {
            aMap.put(650.0, p650);
        }
        if (this.p677 != null) {
            aMap.put(677.0, p677);
        }
        if (this.p700 != null) {
            aMap.put(700.0, p700);
        }
        if (this.p704 != null) {
            aMap.put(704.0, p704);
        }
        if (this.p732 != null) {
            aMap.put(732.0, p732);
        }
        if (this.p760 != null) {
            aMap.put(760.0, p760);
        }
        if (this.p788 != null) {
            aMap.put(788.0, p788);
        }
        if (this.p816 != null) {
            aMap.put(816.0, p816);
        }
        if (this.p843 != null) {
            aMap.put(843.0, p843);
        }
        if (this.p871 != null) {
            aMap.put(871.0, p871);
        }
        if (this.p889 != null) {
            aMap.put(889.0, p889);
        }

        return aMap;
    }

    public Double getIndex() {
        return index;
    }

    public void setIndex(Double index) {
        this.index = index;
    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public String getStd() {
        return std;
    }

    public void setStd(String std) {
        this.std = std;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getaThkMin() {
        return aThkMin;
    }

    public void setaThkMin(Double aThkMin) {
        this.aThkMin = aThkMin;
    }

    public Double getaThkMax() {
        return aThkMax;
    }

    public void setaThkMax(Double aThkMax) {
        this.aThkMax = aThkMax;
    }

    public Double getaTempMin() {
        return aTempMin;
    }

    public void setaTempMin(Double aTempMin) {
        this.aTempMin = aTempMin;
    }

    public Double getaTempMax() {
        return aTempMax;
    }

    public void setaTempMax(Double aTempMax) {
        this.aTempMax = aTempMax;
    }

    public Double getN198() {
        return n198;
    }

    public void setN198(Double n198) {
        this.n198 = n198;
    }

    public Double getN196() {
        return n196;
    }

    public void setN196(Double n196) {
        this.n196 = n196;
    }

    public Double getN184() {
        return n184;
    }

    public void setN184(Double n184) {
        this.n184 = n184;
    }

    public Double getN180() {
        return n180;
    }

    public void setN180(Double n180) {
        this.n180 = n180;
    }

    public Double getN160() {
        return n160;
    }

    public void setN160(Double n160) {
        this.n160 = n160;
    }

    public Double getN140() {
        return n140;
    }

    public void setN140(Double n140) {
        this.n140 = n140;
    }

    public Double getN129() {
        return n129;
    }

    public void setN129(Double n129) {
        this.n129 = n129;
    }

    public Double getN120() {
        return n120;
    }

    public void setN120(Double n120) {
        this.n120 = n120;
    }

    public Double getN100() {
        return n100;
    }

    public void setN100(Double n100) {
        this.n100 = n100;
    }

    public Double getN80() {
        return n80;
    }

    public void setN80(Double n80) {
        this.n80 = n80;
    }

    public Double getN73() {
        return n73;
    }

    public void setN73(Double n73) {
        this.n73 = n73;
    }

    public Double getN60() {
        return n60;
    }

    public void setN60(Double n60) {
        this.n60 = n60;
    }

    public Double getN50() {
        return n50;
    }

    public void setN50(Double n50) {
        this.n50 = n50;
    }

    public Double getN40() {
        return n40;
    }

    public void setN40(Double n40) {
        this.n40 = n40;
    }

    public Double getN20() {
        return n20;
    }

    public void setN20(Double n20) {
        this.n20 = n20;
    }

    public Double getN0() {
        return n0;
    }

    public void setN0(Double n0) {
        this.n0 = n0;
    }

    public Double getP20() {
        return p20;
    }

    public void setP20(Double p20) {
        this.p20 = p20;
    }

    public Double getP21() {
        return p21;
    }

    public void setP21(Double p21) {
        this.p21 = p21;
    }

    public Double getP38() {
        return p38;
    }

    public void setP38(Double p38) {
        this.p38 = p38;
    }

    public Double getP40() {
        return p40;
    }

    public void setP40(Double p40) {
        this.p40 = p40;
    }

    public Double getP50() {
        return p50;
    }

    public void setP50(Double p50) {
        this.p50 = p50;
    }

    public Double getP60() {
        return p60;
    }

    public void setP60(Double p60) {
        this.p60 = p60;
    }

    public Double getP66() {
        return p66;
    }

    public void setP66(Double p66) {
        this.p66 = p66;
    }

    public Double getP80() {
        return p80;
    }

    public void setP80(Double p80) {
        this.p80 = p80;
    }

    public Double getP93() {
        return p93;
    }

    public void setP93(Double p93) {
        this.p93 = p93;
    }

    public Double getP100() {
        return p100;
    }

    public void setP100(Double p100) {
        this.p100 = p100;
    }

    public Double getP120() {
        return p120;
    }

    public void setP120(Double p120) {
        this.p120 = p120;
    }

    public Double getP121() {
        return p121;
    }

    public void setP121(Double p121) {
        this.p121 = p121;
    }

    public Double getP140() {
        return p140;
    }

    public void setP140(Double p140) {
        this.p140 = p140;
    }

    public Double getP149() {
        return p149;
    }

    public void setP149(Double p149) {
        this.p149 = p149;
    }

    public Double getP150() {
        return p150;
    }

    public void setP150(Double p150) {
        this.p150 = p150;
    }

    public Double getP160() {
        return p160;
    }

    public void setP160(Double p160) {
        this.p160 = p160;
    }

    public Double getP177() {
        return p177;
    }

    public void setP177(Double p177) {
        this.p177 = p177;
    }

    public Double getP180() {
        return p180;
    }

    public void setP180(Double p180) {
        this.p180 = p180;
    }

    public Double getP200() {
        return p200;
    }

    public void setP200(Double p200) {
        this.p200 = p200;
    }

    public Double getP204() {
        return p204;
    }

    public void setP204(Double p204) {
        this.p204 = p204;
    }

    public Double getP220() {
        return p220;
    }

    public void setP220(Double p220) {
        this.p220 = p220;
    }

    public Double getP232() {
        return p232;
    }

    public void setP232(Double p232) {
        this.p232 = p232;
    }

    public Double getP240() {
        return p240;
    }

    public void setP240(Double p240) {
        this.p240 = p240;
    }

    public Double getP250() {
        return p250;
    }

    public void setP250(Double p250) {
        this.p250 = p250;
    }

    public Double getP260() {
        return p260;
    }

    public void setP260(Double p260) {
        this.p260 = p260;
    }

    public Double getP280() {
        return p280;
    }

    public void setP280(Double p280) {
        this.p280 = p280;
    }

    public Double getP288() {
        return p288;
    }

    public void setP288(Double p288) {
        this.p288 = p288;
    }

    public Double getP300() {
        return p300;
    }

    public void setP300(Double p300) {
        this.p300 = p300;
    }

    public Double getP316() {
        return p316;
    }

    public void setP316(Double p316) {
        this.p316 = p316;
    }

    public Double getP320() {
        return p320;
    }

    public void setP320(Double p320) {
        this.p320 = p320;
    }

    public Double getP343() {
        return p343;
    }

    public void setP343(Double p343) {
        this.p343 = p343;
    }

    public Double getP350() {
        return p350;
    }

    public void setP350(Double p350) {
        this.p350 = p350;
    }

    public Double getP371() {
        return p371;
    }

    public void setP371(Double p371) {
        this.p371 = p371;
    }

    public Double getP399() {
        return p399;
    }

    public void setP399(Double p399) {
        this.p399 = p399;
    }

    public Double getP400() {
        return p400;
    }

    public void setP400(Double p400) {
        this.p400 = p400;
    }

    public Double getP426() {
        return p426;
    }

    public void setP426(Double p426) {
        this.p426 = p426;
    }

    public Double getP427() {
        return p427;
    }

    public void setP427(Double p427) {
        this.p427 = p427;
    }

    public Double getP450() {
        return p450;
    }

    public void setP450(Double p450) {
        this.p450 = p450;
    }

    public Double getP454() {
        return p454;
    }

    public void setP454(Double p454) {
        this.p454 = p454;
    }

    public Double getP482() {
        return p482;
    }

    public void setP482(Double p482) {
        this.p482 = p482;
    }

    public Double getP500() {
        return p500;
    }

    public void setP500(Double p500) {
        this.p500 = p500;
    }

    public Double getP510() {
        return p510;
    }

    public void setP510(Double p510) {
        this.p510 = p510;
    }

    public Double getP538() {
        return p538;
    }

    public void setP538(Double p538) {
        this.p538 = p538;
    }

    public Double getP550() {
        return p550;
    }

    public void setP550(Double p550) {
        this.p550 = p550;
    }

    public Double getP565() {
        return p565;
    }

    public void setP565(Double p565) {
        this.p565 = p565;
    }

    public Double getP593() {
        return p593;
    }

    public void setP593(Double p593) {
        this.p593 = p593;
    }

    public Double getP600() {
        return p600;
    }

    public void setP600(Double p600) {
        this.p600 = p600;
    }

    public Double getP620() {
        return p620;
    }

    public void setP620(Double p620) {
        this.p620 = p620;
    }

    public Double getP649() {
        return p649;
    }

    public void setP649(Double p649) {
        this.p649 = p649;
    }

    public Double getP650() {
        return p650;
    }

    public void setP650(Double p650) {
        this.p650 = p650;
    }

    public Double getP677() {
        return p677;
    }

    public void setP677(Double p677) {
        this.p677 = p677;
    }

    public Double getP700() {
        return p700;
    }

    public void setP700(Double p700) {
        this.p700 = p700;
    }

    public Double getP704() {
        return p704;
    }

    public void setP704(Double p704) {
        this.p704 = p704;
    }

    public Double getP732() {
        return p732;
    }

    public void setP732(Double p732) {
        this.p732 = p732;
    }

    public Double getP760() {
        return p760;
    }

    public void setP760(Double p760) {
        this.p760 = p760;
    }

    public Double getP788() {
        return p788;
    }

    public void setP788(Double p788) {
        this.p788 = p788;
    }

    public Double getP816() {
        return p816;
    }

    public void setP816(Double p816) {
        this.p816 = p816;
    }

    public Double getP843() {
        return p843;
    }

    public void setP843(Double p843) {
        this.p843 = p843;
    }

    public Double getP871() {
        return p871;
    }

    public void setP871(Double p871) {
        this.p871 = p871;
    }

    public Double getP889() {
        return p889;
    }

    public void setP889(Double p889) {
        this.p889 = p889;
    }
}
