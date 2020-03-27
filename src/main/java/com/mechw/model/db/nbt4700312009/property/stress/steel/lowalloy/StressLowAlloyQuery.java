package com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy;

public class StressLowAlloyQuery {

    private String type;
    private String std;
    private String name;
    private Double thk;
    private Double temp;

    public StressLowAlloyQuery() {
    }

    public StressLowAlloyQuery(String type, String std, String name, Double thk, Double temp) {
        this.type = type;
        this.std = std;
        this.name = name;
        this.thk = thk;
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
