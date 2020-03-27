package com.mechw.model.front.a.common.result;

public class ReltEtAtComResult {

    private Double o;
    private Double ot;
    private Double relt;
    private Double c1;
    private Double et;
    private Double at;

    public ReltEtAtComResult() {
    }

    public ReltEtAtComResult(Double o, Double ot, Double relt, Double c1, Double et, Double at) {
        this.o = o;
        this.ot = ot;
        this.relt = relt;
        this.c1 = c1;
        this.et = et;
        this.at = at;
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

    public Double getC1() {
        return c1;
    }

    public void setC1(Double c1) {
        this.c1 = c1;
    }

    public Double getEt() {
        return et;
    }

    public void setEt(Double et) {
        this.et = et;
    }

    public Double getAt() {
        return at;
    }

    public void setAt(Double at) {
        this.at = at;
    }
}
