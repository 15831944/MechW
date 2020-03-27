package com.mechw.model.db.gbt1502011.property.index;

public class NameQuery {

    private String category;
    private String type;
    private String std;
    private Double temp;

    public NameQuery() {
    }

    public NameQuery(String category, String type, String std, Double temp) {
        this.category = category;
        this.type = type;
        this.std = std;
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

    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }

}
