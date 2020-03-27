package com.mechw.model.db;

public class GBC1Query {

    // category 材料类别
    private String category;

    // type 材料类型
    private String type;

    // std 材料标准名称
    private String std;

    // name 材料牌号
    private String name;

    // isTube 是否为换热管，0为否，1为是
    private double isTube;

    // od 管材外直径
    private double od;

    // thk 板材、管材厚度
    private double thk;

    public GBC1Query() {
    }

    public GBC1Query(String category, String type, String std, String name, double isTube, double od, double thk) {
        this.category = category;
        this.type = type;
        this.std = std;
        this.name = name;
        this.isTube = isTube;
        this.od = od;
        this.thk = thk;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStd() {
        return this.std;
    }

    public void setStd(String std) {
        this.std = std;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getTag() {
        return this.isTube;
    }

    public void setTag(double isTube) {
        this.isTube = isTube;
    }

    public double getOd() {
        return this.od;
    }

    public void setOd(double od) {
        this.od = od;
    }

    public double getThk() {
        return this.thk;
    }

    public void setThk(double thk) {
        this.thk = thk;
    }

}
