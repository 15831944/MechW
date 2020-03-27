package com.mechw.entity.db.nbt4700312009.property.rel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "rel_steel_low_alloy", catalog = "nbt_47003_1_2009")
public class RelLowAlloy {

    // 行号
    @Id
    @Column(name = "no")
    private Double no;

    // 材料类别
    @Column(name = "type")
    private String type;

    // 标准名称
    @Column(name = "std")
    private String std;

    // 材料名称
    @Column(name = "name")
    private String name;

    // 最小厚度
    @Column(name = "min")
    private Double min;

    // 最大厚度
    @Column(name = "max")
    private Double max;

    // 屈服强度
    @Column(name = "p20")
    private Double p20;

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

    public RelLowAlloy() {
    }

    public RelLowAlloy(Double no, String type, String std, String name, Double min, Double max, Double p20, Double p100, Double p150, Double p200, Double p250, Double p300, Double p350) {
        this.no = no;
        this.type = type;
        this.std = std;
        this.name = name;
        this.min = min;
        this.max = max;
        this.p20 = p20;
        this.p100 = p100;
        this.p150 = p150;
        this.p200 = p200;
        this.p250 = p250;
        this.p300 = p300;
        this.p350 = p350;
    }

    // 将屈服强度部分转化为Map
    public Map<Double, Double> toMap() {

        Map<Double, Double> relMap = new HashMap<>();

        if (this.p20 != null) {
            relMap.put(20.0, p20);
        }
        if (this.p100 != null) {
            relMap.put(100.0, p100);
        }
        if (this.p150 != null) {
            relMap.put(150.0, p150);
        }
        if (this.p200 != null) {
            relMap.put(200.0, p200);
        }
        if (this.p250 != null) {
            relMap.put(250.0, p250);
        }
        if (this.p300 != null) {
            relMap.put(300.0, p300);
        }
        if (this.p350 != null) {
            relMap.put(350.0, p350);
        }

        return relMap;

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

    public Double getMin() {
        return min;
    }

    public void setMin(Double min) {
        this.min = min;
    }

    public Double getMax() {
        return max;
    }

    public void setMax(Double max) {
        this.max = max;
    }

    public Double getP20() {
        return p20;
    }

    public void setP20(Double p20) {
        this.p20 = p20;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
