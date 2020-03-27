package com.mechw.model.db.asmeviii12017.index;

public class IndexQuery {

    private double temp;
    private String materialName;
    private String productForm;

    public IndexQuery() {
    }

    public IndexQuery(double temp, String materialName, String productForm) {
        this.temp = temp;
        this.materialName = materialName;
        this.productForm = productForm;
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
}
