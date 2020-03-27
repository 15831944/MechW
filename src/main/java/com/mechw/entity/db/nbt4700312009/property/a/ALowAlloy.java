package com.mechw.entity.db.nbt4700312009.property.a;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "a_steel_low_alloy", catalog = "nbt_47003_1_2009")
public class ALowAlloy {

    // 行号
    @Id
    @Column(name = "no")
    private Double no;

    // 材料类型
    @Column(name = "type")
    private String type;

    // 标准名称
    @Column(name = "std")
    private String std;

    // 材料名称
    @Column(name = "name")
    private String name;

    // 热膨胀系数
    @Column(name = "n50")
    private Double n50;

    @Column(name = "n0")
    private Double n0;

    @Column(name = "p50")
    private Double p50;

    @Column(name = "p100")
    private Double p100;

    @Column(name = "p150")
    private Double p150;

    @Column(name = "p200")
    private Double p200;

    @Column(name = "p250")
    private Double p250;

    @Column(name = "p300")
    private Double p300;

    @Column(name = "p350")
    private Double p350;

    public ALowAlloy() {
    }

    public ALowAlloy(Double no, String type, String std, String name, Double n50, Double n0, Double p50, Double p100, Double p150, Double p200, Double p250, Double p300, Double p350) {
        this.no = no;
        this.type = type;
        this.std = std;
        this.name = name;
        this.n50 = n50;
        this.n0 = n0;
        this.p50 = p50;
        this.p100 = p100;
        this.p150 = p150;
        this.p200 = p200;
        this.p250 = p250;
        this.p300 = p300;
        this.p350 = p350;
    }

    // 将线膨胀系数部分转化为Map
    public Map<Double, Double> toMap() {

        Map<Double, Double> aMap = new HashMap<>();

        if (this.n50 != null) {
            aMap.put(-50.0, n50);
        }
        if (this.n0 != null) {
            aMap.put(-0.0, n0);
        }
        if (this.p50 != null) {
            aMap.put(50.0, p50);
        }
        if (this.p100 != null) {
            aMap.put(100.0, p100);
        }
        if (this.p150 != null) {
            aMap.put(150.0, p150);
        }
        if (this.p200 != null) {
            aMap.put(200.0, p200);
        }
        if (this.p250 != null) {
            aMap.put(250.0, p250);
        }
        if (this.p300 != null) {
            aMap.put(300.0, p300);
        }
        if (this.p350 != null) {
            aMap.put(350.0, p350);
        }

        return aMap;

    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Double getN50() {
        return n50;
    }

    public void setN50(Double n50) {
        this.n50 = n50;
    }

    public Double getN0() {
        return n0;
    }

    public void setN0(Double n0) {
        this.n0 = n0;
    }

    public Double getP50() {
        return p50;
    }

    public void setP50(Double p50) {
        this.p50 = p50;
    }

    public Double getP100() {
        return p100;
    }

    public void setP100(Double p100) {
        this.p100 = p100;
    }

    public Double getP150() {
        return p150;
    }

    public void setP150(Double p150) {
        this.p150 = p150;
    }

    public Double getP200() {
        return p200;
    }

    public void setP200(Double p200) {
        this.p200 = p200;
    }

    public Double getP250() {
        return p250;
    }

    public void setP250(Double p250) {
        this.p250 = p250;
    }

    public Double getP300() {
        return p300;
    }

    public void setP300(Double p300) {
        this.p300 = p300;
    }

    public Double getP350() {
        return p350;
    }

    public void setP350(Double p350) {
        this.p350 = p350;
    }

}
