package com.mechw.model.db.gbt1502011.property.stress;

public class StressResult {

    private Double o;
    private Double ot;
    private Double ot1;

    public StressResult() {
    }

    public StressResult(Double o, Double ot, Double ot1) {
        this.o = o;
        this.ot = ot;
        this.ot1 = ot1;
    }

    public Double getO() {
        return o;
    }

    public void setO(Double o) {
        this.o = o;
    }

    public Double getOt() {
        return ot;
    }

    public void setOt(Double ot) {
        this.ot = ot;
    }

    public Double getOt1() {
        return ot1;
    }

    public void setOt1(Double ot1) {
        this.ot1 = ot1;
    }
}
