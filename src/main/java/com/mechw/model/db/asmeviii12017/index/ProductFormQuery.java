package com.mechw.model.db.asmeviii12017.index;

public class ProductFormQuery {

    private double temp;
    private String materialName;

    public ProductFormQuery() {
    }

    public ProductFormQuery(double temp, String materialName) {
        this.temp = temp;
        this.materialName = materialName;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }
}
