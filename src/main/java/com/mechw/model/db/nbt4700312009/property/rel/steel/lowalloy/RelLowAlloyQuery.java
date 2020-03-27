package com.mechw.model.db.nbt4700312009.property.rel.steel.lowalloy;

public class RelLowAlloyQuery {

    private String type;
    private String std;
    private String name;
    private Double temp;
    private Double thk;

    public RelLowAlloyQuery() {
    }

    public RelLowAlloyQuery(String type, String std, String name, Double temp, Double thk) {
        this.type = type;
        this.std = std;
        this.name = name;
        this.temp = temp;
        this.thk = thk;
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

    public Double getThk() {
        return thk;
    }

    public void setThk(Double thk) {
        this.thk = thk;
    }
}
