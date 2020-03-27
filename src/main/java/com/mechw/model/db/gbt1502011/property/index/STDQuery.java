package com.mechw.model.db.gbt1502011.property.index;

public class STDQuery {

    private String category;
    private String type;
    private Double temp;

    public STDQuery() {
    }

    public STDQuery(String category, String type, Double temp) {
        this.category = category;
        this.type = type;
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

    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }

}
