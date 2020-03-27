package com.mechw.model.db.nbt4700312009.property.stress.steel.carbon;

public class StressCarbonResult {

    private Double testStress;
    private Double designStress;

    public StressCarbonResult() {
    }

    public StressCarbonResult(Double testStress, Double designStress) {
        this.testStress = testStress;
        this.designStress = designStress;
    }

    public Double getTestStress() {
        return testStress;
    }

    public void setTestStress(Double testStress) {
        this.testStress = testStress;
    }

    public Double getDesignStress() {
        return designStress;
    }

    public void setDesignStress(Double designStress) {
        this.designStress = designStress;
    }

}
