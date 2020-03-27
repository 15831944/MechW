package com.mechw.model.db.asmeviii12017.stress;

public class ASMEVIII12017StressQuery {

    private double temp;
    private String materialName;
    private String productForm;
    private double thk;
    private double od;
    private double highLow;

    public ASMEVIII12017StressQuery() {
    }

    public ASMEVIII12017StressQuery(double temp, String materialName, String productForm, double thk, double od, double highLow) {
        this.temp = temp;
        this.materialName = materialName;
        this.productForm = productForm;
        this.thk = thk;
        this.od = od;
        this.highLow = highLow;
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

    public String getProductForm() {
        return productForm;
    }

    public void setProductForm(String productForm) {
        this.productForm = productForm;
    }

    public double getThk() {
        return thk;
    }

    public void setThk(double thk) {
        this.thk = thk;
    }

    public double getOd() {
        return od;
    }

    public void setOd(double od) {
        this.od = od;
    }

    public double getHighLow() {
        return highLow;
    }

    public void setHighLow(double highLow) {
        this.highLow = highLow;
    }
}
