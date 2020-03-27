package com.mechw.model.front.b.common;

public class ReltEtComResult {

    private Double o;
    private Double ot;
    private Double relt;
    private Double et;
    private Double c1;

    public ReltEtComResult() {
    }

    public ReltEtComResult(Double o, Double ot, Double relt, Double et, Double c1) {
        this.o = o;
        this.ot = ot;
        this.relt = relt;
        this.et = et;
        this.c1 = c1;
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

    public Double getRelt() {
        return relt;
    }

    public void setRelt(Double relt) {
        this.relt = relt;
    }

    public Double getEt() {
        return et;
    }

    public void setEt(Double et) {
        this.et = et;
    }

    public Double getC1() {
        return c1;
    }

    public void setC1(Double c1) {
        this.c1 = c1;
    }
}
