package com.mechw.entity.db.gbt1502011.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "index", catalog = "gbt_150_2011")
public class Index {

    // 行号
    @Id
    @Column(name = "index")
    private Double index;

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

    // 材料许用应力允许的最小厚度
    @Column(name = "thk_min")
    private Double thkMin;

    // 材料许用应力允许的最大厚度
    @Column(name = "thk_max")
    private Double thkMax;

    // 最小使用温度
    @Column(name = "temp_min")
    private Double tempMin;

    // 最大使用温度
    @Column(name = "temp_max")
    private Double tempMax;

    // 材料密度
    @Column(name = "density")
    private Double density;

    // 泊松比
    @Column(name = "poisson_ratio")
    private Double poissonRatio;

    // 外压图表号
    @Column(name = "ext_chart_no")
    private String extChartNo;

    // 材料使用状态
    @Column(name = "status")
    private String status;

    public Index() {
    }

    public Index(Double index, Double lineNo, String category, String type, String std, String name, Double thkMin, Double thkMax, Double tempMin, Double tempMax, Double density, Double poissonRatio, String extChartNo, String status) {
        this.index = index;
        this.lineNo = lineNo;
        this.category = category;
        this.type = type;
        this.std = std;
        this.name = name;
        this.thkMin = thkMin;
        this.thkMax = thkMax;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.density = density;
        this.poissonRatio = poissonRatio;
        this.extChartNo = extChartNo;
        this.status = status;
    }

    public Double getIndex() {
        return index;
    }

    public void setIndex(Double index) {
        this.index = index;
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

    public String getExtChartNo() {
        return extChartNo;
    }

    public void setExtChartNo(String extChartNo) {
        this.extChartNo = extChartNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
