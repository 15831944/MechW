package com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy;

public class StressHighAlloyQuery {

    private String type;
    private String std;
    private String name;
    private Double thk;
    private Double temp;
    private Double highLow;

    public StressHighAlloyQuery() {
    }

    public StressHighAlloyQuery(String type, String std, String name, Double thk, Double temp, Double highLow) {
        this.type = type;
        this.std = std;
        this.name = name;
        this.thk = thk;
        this.temp = temp;
        this.highLow = highLow;
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
}
