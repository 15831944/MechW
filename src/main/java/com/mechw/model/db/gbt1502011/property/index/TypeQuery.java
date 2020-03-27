package com.mechw.model.db.gbt1502011.property.index;

public class TypeQuery {

    private String category;
    private Double temp;

    public TypeQuery() {
    }

    public TypeQuery(String category, Double temp) {
        this.category = category;
        this.temp = temp;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }

}
