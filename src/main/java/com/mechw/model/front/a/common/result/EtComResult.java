package com.mechw.model.front.a.common.result;

public class EtComResult {

    private Double o;
    private Double ot;
    private Double ot1;
    private Double rel;
    private Double c1;
    private Double et;

    public EtComResult() {
    }

    public EtComResult(Double o, Double ot, Double ot1, Double rel, Double c1, Double et) {
        this.o = o;
        this.ot = ot;
        this.ot1 = ot1;
        this.rel = rel;
        this.c1 = c1;
        this.et = et;
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

    public Double getRel() {
        return rel;
    }

    public void setRel(Double rel) {
        this.rel = rel;
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
}
