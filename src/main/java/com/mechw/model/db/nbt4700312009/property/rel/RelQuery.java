package com.mechw.model.db.nbt4700312009.property.rel;

public class RelQuery {

    private String category;
    private String type;
    private String std;
    private String name;
    private Double thk;
    private Double temp;

    public RelQuery() {
    }

    public RelQuery(String category, String type, String std, String name, Double thk, Double temp) {
        this.category = category;
        this.type = type;
        this.std = std;
        this.name = name;
        this.thk = thk;
        this.temp = temp;
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

}
