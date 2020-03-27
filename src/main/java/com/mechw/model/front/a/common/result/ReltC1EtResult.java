package com.mechw.model.front.a.common.result;

public class ReltC1EtResult {

    private Double relt;
    private Double c1;
    private Double et;

    public ReltC1EtResult() {
    }

    public ReltC1EtResult(Double relt, Double c1, Double et) {
        this.relt = relt;
        this.c1 = c1;
        this.et = et;
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
}
