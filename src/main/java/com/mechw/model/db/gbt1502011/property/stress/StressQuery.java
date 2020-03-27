package com.mechw.model.db.gbt1502011.property.stress;

public class StressQuery {

    private String category;
    private String std;
    private String name;
    private Double thk;
    private Double temp;
    private Double highLow;

    public StressQuery() {
    }

    public StressQuery(String category, String std, String name, Double thk, Double temp, Double highLow) {
        this.category = category;
        this.std = std;
        this.name = name;
        this.thk = thk;
        this.temp = temp;
        this.highLow = highLow;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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
