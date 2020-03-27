package com.mechw.model.db.nbt4700312009.property.e.steel.highalloy;

public class EHighAlloyQuery {

    private String type;
    private String std;
    private String name;
    private Double temp;

    public EHighAlloyQuery() {
    }

    public EHighAlloyQuery(String type, String std, String name, Double temp) {
        this.type = type;
        this.std = std;
        this.name = name;
        this.temp = temp;
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

    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }

}
