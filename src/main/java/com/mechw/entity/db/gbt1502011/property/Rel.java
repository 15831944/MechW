package com.mechw.entity.db.gbt1502011.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "rel", catalog = "gbt_150_2011")
public class Rel {

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

    // 最小厚度
    @Column(name = "rel_thk_min")
    private Double relThkMin;

    // 最大厚度
    @Column(name = "rel_thk_max")
    private Double relThkMax;

    // 最小温度
    @Column(name = "rel_temp_min")
    private Double relTempMin;

    // 最大温度
    @Column(name = "rel_temp_max")
    private Double relTempMax;

    // 屈服强度
    @Column(name = "p20")
    private Double p20;

    @Column(name = "p40")
    private Double p40;

    @Column(name = "p50")
    private Double p50;

    @Column(name = "p65")
    private Double p65;

    @Column(name = "p75")
    private Double p75;

    @Column(name = "p100")
    private Double p100;

    @Column(name = "p125")
    private Double p125;

    @Column(name = "p150")
    private Double p150;

    @Column(name = "p175")
    private Double p175;

    @Column(name = "p200")
    private Double p200;

    @Column(name = "p225")
    private Double p225;

    @Column(name = "p250")
    private Double p250;

    @Column(name = "p275")
    private Double p275;

    @Column(name = "p300")
    private Double p300;

    @Column(name = "p325")
    private Double p325;

    @Column(name = "p350")
    private Double p350;

    @Column(name = "p375")
    private Double p375;

    @Column(name = "p400")
    private Double p400;

    @Column(name = "p425")
    private Double p425;

    @Column(name = "p450")
    private Double p450;

    @Column(name = "p475")
    private Double p475;

    @Column(name = "p500")
    private Double p500;

    @Column(name = "p525")
    private Double p525;

    @Column(name = "p550")
    private Double p550;

    public Rel() {
    }

    public Rel(Double index, Double no, String std, String name, Double relThkMin, Double relThkMax, Double relTempMin, Double relTempMax, Double p20, Double p40, Double p50, Double p65, Double p75, Double p100, Double p125, Double p150, Double p175, Double p200, Double p225, Double p250, Double p275, Double p300, Double p325, Double p350, Double p375, Double p400, Double p425, Double p450, Double p475, Double p500, Double p525, Double p550) {
        this.index = index;
        this.no = no;
        this.std = std;
        this.name = name;
        this.relThkMin = relThkMin;
        this.relThkMax = relThkMax;
        this.relTempMin = relTempMin;
        this.relTempMax = relTempMax;
        this.p20 = p20;
        this.p40 = p40;
        this.p50 = p50;
        this.p65 = p65;
        this.p75 = p75;
        this.p100 = p100;
        this.p125 = p125;
        this.p150 = p150;
        this.p175 = p175;
        this.p200 = p200;
        this.p225 = p225;
        this.p250 = p250;
        this.p275 = p275;
        this.p300 = p300;
        this.p325 = p325;
        this.p350 = p350;
        this.p375 = p375;
        this.p400 = p400;
        this.p425 = p425;
        this.p450 = p450;
        this.p475 = p475;
        this.p500 = p500;
        this.p525 = p525;
        this.p550 = p550;
    }

    // 将屈服强度部分转化为Map
    public Map<Double, Double> toMap() {

        Map<Double, Double> relMap = new HashMap<>();

        if (this.p20 != null) {
            relMap.put(20.0, p20);
        }
        if (this.p40 != null) {
            relMap.put(40.0, p40);
        }
        if (this.p50 != null) {
            relMap.put(50.0, p50);
        }
        if (this.p65 != null) {
            relMap.put(65.0, p65);
        }
        if (this.p75 != null) {
            relMap.put(75.0, p75);
        }
        if (this.p100 != null) {
            relMap.put(100.0, p100);
        }
        if (this.p125 != null) {
            relMap.put(125.0, p125);
        }
        if (this.p150 != null) {
            relMap.put(150.0, p150);
        }
        if (this.p175 != null) {
            relMap.put(175.0, p175);
        }
        if (this.p200 != null) {
            relMap.put(200.0, p200);
        }
        if (this.p225 != null) {
            relMap.put(225.0, p225);
        }
        if (this.p250 != null) {
            relMap.put(250.0, p250);
        }
        if (this.p275 != null) {
            relMap.put(275.0, p275);
        }
        if (this.p300 != null) {
            relMap.put(300.0, p300);
        }
        if (this.p325 != null) {
            relMap.put(325.0, p325);
        }
        if (this.p350 != null) {
            relMap.put(350.0, p350);
        }
        if (this.p375 != null) {
            relMap.put(375.0, p375);
        }
        if (this.p400 != null) {
            relMap.put(400.0, p400);
        }
        if (this.p425 != null) {
            relMap.put(425.0, p425);
        }
        if (this.p450 != null) {
            relMap.put(450.0, p450);
        }
        if (this.p475 != null) {
            relMap.put(475.0, p475);
        }
        if (this.p500 != null) {
            relMap.put(500.0, p500);
        }
        if (this.p525 != null) {
            relMap.put(525.0, p525);
        }
        if (this.p550 != null) {
            relMap.put(550.0, p550);
        }

        return relMap;
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

    public Double getRelThkMin() {
        return relThkMin;
    }

    public void setRelThkMin(Double relThkMin) {
        this.relThkMin = relThkMin;
    }

    public Double getRelThkMax() {
        return relThkMax;
    }

    public void setRelThkMax(Double relThkMax) {
        this.relThkMax = relThkMax;
    }

    public Double getRelTempMin() {
        return relTempMin;
    }

    public void setRelTempMin(Double relTempMin) {
        this.relTempMin = relTempMin;
    }

    public Double getRelTempMax() {
        return relTempMax;
    }

    public void setRelTempMax(Double relTempMax) {
        this.relTempMax = relTempMax;
    }

    public Double getP20() {
        return p20;
    }

    public void setP20(Double p20) {
        this.p20 = p20;
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

    public Double getP65() {
        return p65;
    }

    public void setP65(Double p65) {
        this.p65 = p65;
    }

    public Double getP75() {
        return p75;
    }

    public void setP75(Double p75) {
        this.p75 = p75;
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

    public Double getP225() {
        return p225;
    }

    public void setP225(Double p225) {
        this.p225 = p225;
    }

    public Double getP250() {
        return p250;
    }

    public void setP250(Double p250) {
        this.p250 = p250;
    }

    public Double getP275() {
        return p275;
    }

    public void setP275(Double p275) {
        this.p275 = p275;
    }

    public Double getP300() {
        return p300;
    }

    public void setP300(Double p300) {
        this.p300 = p300;
    }

    public Double getP325() {
        return p325;
    }

    public void setP325(Double p325) {
        this.p325 = p325;
    }

    public Double getP350() {
        return p350;
    }

    public void setP350(Double p350) {
        this.p350 = p350;
    }

    public Double getP375() {
        return p375;
    }

    public void setP375(Double p375) {
        this.p375 = p375;
    }

    public Double getP400() {
        return p400;
    }

    public void setP400(Double p400) {
        this.p400 = p400;
    }

    public Double getP425() {
        return p425;
    }

    public void setP425(Double p425) {
        this.p425 = p425;
    }

    public Double getP450() {
        return p450;
    }

    public void setP450(Double p450) {
        this.p450 = p450;
    }

    public Double getP475() {
        return p475;
    }

    public void setP475(Double p475) {
        this.p475 = p475;
    }

    public Double getP500() {
        return p500;
    }

    public void setP500(Double p500) {
        this.p500 = p500;
    }

    public Double getP525() {
        return p525;
    }

    public void setP525(Double p525) {
        this.p525 = p525;
    }

    public Double getP550() {
        return p550;
    }

    public void setP550(Double p550) {
        this.p550 = p550;
    }
}
