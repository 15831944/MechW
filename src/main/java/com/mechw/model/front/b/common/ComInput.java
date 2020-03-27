package com.mechw.model.front.b.common;

public class ComInput {

    // 类别
    private String category;

    //材料类型
    private String type;

    // 材料标准号
    private String std;

    // 材料名称
    private String name;

    // 材料厚度
    private Double thk;

    // 设计温度
    private Double temp;

    // 应力标记，3为高应力，2为低应力
    private Double highLow;

    // 是否为换热管，0为否，1为是
    private Double isTube;

    // 管材外直径
    private Double od;

    public ComInput() {
    }

    public ComInput(String category, String type, String std, String name, Double thk, Double temp, Double highLow, Double isTube, Double od) {
        this.category = category;
        this.type = type;
        this.std = std;
        this.name = name;
        this.thk = thk;
        this.temp = temp;
        this.highLow = highLow;
        this.isTube = isTube;
        this.od = od;
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

    public Double getThk() {
        return thk;
    }

    public void setThk(Double thk) {
        this.thk = thk;
    }

    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }

    public Double getHighLow() {
        return highLow;
    }

    public void setHighLow(Double highLow) {
        this.highLow = highLow;
    }

    public Double getIsTube() {
        return isTube;
    }

    public void setIsTube(Double isTube) {
        this.isTube = isTube;
    }

    public Double getOd() {
        return od;
    }

    public void setOd(Double od) {
        this.od = od;
    }

}
