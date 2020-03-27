package com.mechw.entity.db.gbt1502011.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "e", catalog = "gbt_150_2011")
public class E {

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

    @Column(name = "e_thk_min")
    private Double eThkMin;

    @Column(name = "e_thk_max")
    private Double eThkMax;

    @Column(name = "e_temp_min")
    private Double eTempMin;

    @Column(name = "e_temp_max")
    private Double eTempMax;

    // 弹性模量
    @Column(name = "n200")
    private Double n200;

    @Column(name = "n198")
    private Double n198;

    @Column(name = "n196")
    private Double n196;

    @Column(name = "n195")
    private Double n195;

    @Column(name = "n129")
    private Double n129;

    @Column(name = "n125")
    private Double n125;

    @Column(name = "n100")
    private Double n100;

    @Column(name = "n75")
    private Double n75;

    @Column(name = "n73")
    private Double n73;

    @Column(name = "n70")
    private Double n70;

    @Column(name = "n40")
    private Double n40;

    @Column(name = "p18")
    private Double p18;

    @Column(name = "p20")
    private Double p20;

    @Column(name = "p21")
    private Double p21;

    @Column(name = "p25")
    private Double p25;

    @Column(name = "p38")
    private Double p38;

    @Column(name = "p50")
    private Double p50;

    @Column(name = "p93")
    private Double p93;

    @Column(name = "p100")
    private Double p100;

    @Column(name = "p125")
    private Double p125;

    @Column(name = "p149")
    private Double p149;

    @Column(name = "p150")
    private Double p150;

    @Column(name = "p175")
    private Double p175;

    @Column(name = "p200")
    private Double p200;

    @Column(name = "p204")
    private Double p204;

    @Column(name = "p250")
    private Double p250;

    @Column(name = "p260")
    private Double p260;

    @Column(name = "p300")
    private Double p300;

    @Column(name = "p316")
    private Double p316;

    @Column(name = "p350")
    private Double p350;

    @Column(name = "p371")
    private Double p371;

    @Column(name = "p400")
    private Double p400;

    @Column(name = "p450")
    private Double p450;

    @Column(name = "p500")
    private Double p500;

    @Column(name = "p550")
    private Double p550;

    @Column(name = "p600")
    private Double p600;

    @Column(name = "p650")
    private Double p650;

    @Column(name = "p700")
    private Double p700;

    @Column(name = "p750")
    private Double p750;

    public E() {
    }

    public E(Double index, Double no, String std, String name, Double eThkMin, Double eThkMax, Double eTempMin, Double eTempMax, Double n200, Double n198, Double n196, Double n195, Double n129, Double n125, Double n100, Double n75, Double n73, Double n70, Double n40, Double p18, Double p20, Double p21, Double p25, Double p38, Double p50, Double p93, Double p100, Double p125, Double p149, Double p150, Double p175, Double p200, Double p204, Double p250, Double p260, Double p300, Double p316, Double p350, Double p371, Double p400, Double p450, Double p500, Double p550, Double p600, Double p650, Double p700, Double p750) {
        this.index = index;
        this.no = no;
        this.std = std;
        this.name = name;
        this.eThkMin = eThkMin;
        this.eThkMax = eThkMax;
        this.eTempMin = eTempMin;
        this.eTempMax = eTempMax;
        this.n200 = n200;
        this.n198 = n198;
        this.n196 = n196;
        this.n195 = n195;
        this.n129 = n129;
        this.n125 = n125;
        this.n100 = n100;
        this.n75 = n75;
        this.n73 = n73;
        this.n70 = n70;
        this.n40 = n40;
        this.p18 = p18;
        this.p20 = p20;
        this.p21 = p21;
        this.p25 = p25;
        this.p38 = p38;
        this.p50 = p50;
        this.p93 = p93;
        this.p100 = p100;
        this.p125 = p125;
        this.p149 = p149;
        this.p150 = p150;
        this.p175 = p175;
        this.p200 = p200;
        this.p204 = p204;
        this.p250 = p250;
        this.p260 = p260;
        this.p300 = p300;
        this.p316 = p316;
        this.p350 = p350;
        this.p371 = p371;
        this.p400 = p400;
        this.p450 = p450;
        this.p500 = p500;
        this.p550 = p550;
        this.p600 = p600;
        this.p650 = p650;
        this.p700 = p700;
        this.p750 = p750;
    }

    // 将弹性模量部分转化为Map
    public Map<Double, Double> toMap() {

        Map<Double, Double> eMap = new HashMap<>();

        if (this.n200 != null) {
            eMap.put(-200.0, n200);
        }
        if (this.n198 != null) {
            eMap.put(-198.0, n198);
        }
        if (this.n196 != null) {
            eMap.put(-196.0, n196);
        }
        if (this.n195 != null) {
            eMap.put(-195.0, n195);
        }
        if (this.n129 != null) {
            eMap.put(-129.0, n129);
        }
        if (this.n125 != null) {
            eMap.put(-125.0, n125);
        }
        if (this.n100 != null) {
            eMap.put(-100.0, n100);
        }
        if (this.n75 != null) {
            eMap.put(-75.0, n75);
        }
        if (this.n73 != null) {
            eMap.put(-73.0, n73);
        }
        if (this.n70 != null) {
            eMap.put(-70.0, n70);
        }
        if (this.n40 != null) {
            eMap.put(-40.0, n40);
        }
        if (this.p18 != null) {
            eMap.put(18.0, p18);
        }
        if (this.p20 != null) {
            eMap.put(20.0, p20);
        }
        if (this.p21 != null) {
            eMap.put(21.0, p21);
        }
        if (this.p25 != null) {
            eMap.put(25.0, p25);
        }
        if (this.p38 != null) {
            eMap.put(38.0, p38);
        }
        if (this.p50 != null) {
            eMap.put(50.0, p50);
        }
        if (this.p93 != null) {
            eMap.put(93.0, p93);
        }
        if (this.p100 != null) {
            eMap.put(100.0, p100);
        }
        if (this.p125 != null) {
            eMap.put(125.0, p125);
        }
        if (this.p149 != null) {
            eMap.put(149.0, p149);
        }
        if (this.p150 != null) {
            eMap.put(150.0, p150);
        }
        if (this.p175 != null) {
            eMap.put(175.0, p175);
        }
        if (this.p200 != null) {
            eMap.put(200.0, p200);
        }
        if (this.p204 != null) {
            eMap.put(204.0, p204);
        }
        if (this.p250 != null) {
            eMap.put(250.0, p250);
        }
        if (this.p260 != null) {
            eMap.put(260.0, p260);
        }
        if (this.p300 != null) {
            eMap.put(300.0, p300);
        }
        if (this.p316 != null) {
            eMap.put(316.0, p316);
        }
        if (this.p350 != null) {
            eMap.put(350.0, p350);
        }
        if (this.p371 != null) {
            eMap.put(371.0, p371);
        }
        if (this.p400 != null) {
            eMap.put(400.0, p400);
        }
        if (this.p450 != null) {
            eMap.put(450.0, p450);
        }
        if (this.p500 != null) {
            eMap.put(500.0, p500);
        }
        if (this.p550 != null) {
            eMap.put(550.0, p550);
        }
        if (this.p600 != null) {
            eMap.put(600.0, p600);
        }
        if (this.p650 != null) {
            eMap.put(650.0, p650);
        }
        if (this.p700 != null) {
            eMap.put(700.0, p700);
        }
        if (this.p750 != null) {
            eMap.put(750.0, p750);
        }

        return eMap;
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

    public Double geteThkMin() {
        return eThkMin;
    }

    public void seteThkMin(Double eThkMin) {
        this.eThkMin = eThkMin;
    }

    public Double geteThkMax() {
        return eThkMax;
    }

    public void seteThkMax(Double eThkMax) {
        this.eThkMax = eThkMax;
    }

    public Double geteTempMin() {
        return eTempMin;
    }

    public void seteTempMin(Double eTempMin) {
        this.eTempMin = eTempMin;
    }

    public Double geteTempMax() {
        return eTempMax;
    }

    public void seteTempMax(Double eTempMax) {
        this.eTempMax = eTempMax;
    }

    public Double getN200() {
        return n200;
    }

    public void setN200(Double n200) {
        this.n200 = n200;
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

    public Double getN195() {
        return n195;
    }

    public void setN195(Double n195) {
        this.n195 = n195;
    }

    public Double getN129() {
        return n129;
    }

    public void setN129(Double n129) {
        this.n129 = n129;
    }

    public Double getN125() {
        return n125;
    }

    public void setN125(Double n125) {
        this.n125 = n125;
    }

    public Double getN100() {
        return n100;
    }

    public void setN100(Double n100) {
        this.n100 = n100;
    }

    public Double getN75() {
        return n75;
    }

    public void setN75(Double n75) {
        this.n75 = n75;
    }

    public Double getN73() {
        return n73;
    }

    public void setN73(Double n73) {
        this.n73 = n73;
    }

    public Double getN70() {
        return n70;
    }

    public void setN70(Double n70) {
        this.n70 = n70;
    }

    public Double getN40() {
        return n40;
    }

    public void setN40(Double n40) {
        this.n40 = n40;
    }

    public Double getP18() {
        return p18;
    }

    public void setP18(Double p18) {
        this.p18 = p18;
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

    public Double getP25() {
        return p25;
    }

    public void setP25(Double p25) {
        this.p25 = p25;
    }

    public Double getP38() {
        return p38;
    }

    public void setP38(Double p38) {
        this.p38 = p38;
    }

    public Double getP50() {
        return p50;
    }

    public void setP50(Double p50) {
        this.p50 = p50;
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

    public Double getP125() {
        return p125;
    }

    public void setP125(Double p125) {
        this.p125 = p125;
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

    public Double getP175() {
        return p175;
    }

    public void setP175(Double p175) {
        this.p175 = p175;
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

    public Double getP400() {
        return p400;
    }

    public void setP400(Double p400) {
        this.p400 = p400;
    }

    public Double getP450() {
        return p450;
    }

    public void setP450(Double p450) {
        this.p450 = p450;
    }

    public Double getP500() {
        return p500;
    }

    public void setP500(Double p500) {
        this.p500 = p500;
    }

    public Double getP550() {
        return p550;
    }

    public void setP550(Double p550) {
        this.p550 = p550;
    }

    public Double getP600() {
        return p600;
    }

    public void setP600(Double p600) {
        this.p600 = p600;
    }

    public Double getP650() {
        return p650;
    }

    public void setP650(Double p650) {
        this.p650 = p650;
    }

    public Double getP700() {
        return p700;
    }

    public void setP700(Double p700) {
        this.p700 = p700;
    }

    public Double getP750() {
        return p750;
    }

    public void setP750(Double p750) {
        this.p750 = p750;
    }
}