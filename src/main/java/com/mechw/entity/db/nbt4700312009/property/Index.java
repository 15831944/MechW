package com.mechw.entity.db.nbt4700312009.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "index", catalog = "nbt_47003_1_2009")
public class Index {

    // 行号
    @Id
    @Column(name = "no")
    private Double lineNo;

    // 材料类别
    @Column(name = "category")
    private String category;

    // 材料类型
    @Column(name = "type")
    private String type;

    // 材料标准
    @Column(name = "std")
    private String std;

    // 材料名称
    @Column(name = "name")
    private String name;

    // 最小使用温度
    @Column(name = "temp_min")
    private Double tempMin;

    // 最大使用温度
    @Column(name = "temp_max")
    private Double tempMax;

    // 材料最小厚度
    @Column(name = "thk_min")
    private Double thkMin;

    // 材料最大厚度
    @Column(name = "thk_max")
    private Double thkMax;

    // 材料密度
    @Column(name = "density")
    private Double density;

    // 泊松比
    @Column(name = "poisson_ratio")
    private Double poissonRatio;

    public Index() {
    }

    public Index(Double lineNo, String category, String type, String std, String name, Double tempMin, Double tempMax, Double thkMin, Double thkMax, Double density, Double poissonRatio) {
        this.lineNo = lineNo;
        this.category = category;
        this.type = type;
        this.std = std;
        this.name = name;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.thkMin = thkMin;
        this.thkMax = thkMax;
        this.density = density;
        this.poissonRatio = poissonRatio;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public Double getTempMin() {
        return tempMin;
    }

    public void setTempMin(Double tempMin) {
        this.tempMin = tempMin;
    }

    public Double getTempMax() {
        return tempMax;
    }

    public void setTempMax(Double tempMax) {
        this.tempMax = tempMax;
    }

    public Double getThkMin() {
        return thkMin;
    }

    public void setThkMin(Double thkMin) {
        this.thkMin = thkMin;
    }

    public Double getThkMax() {
        return thkMax;
    }

    public void setThkMax(Double thkMax) {
        this.thkMax = thkMax;
    }

    public Double getDensity() {
        return density;
    }

    public void setDensity(Double density) {
        this.density = density;
    }

    public Double getPoissonRatio() {
        return poissonRatio;
    }

    public void setPoissonRatio(Double poissonRatio) {
        this.poissonRatio = poissonRatio;
    }

}
