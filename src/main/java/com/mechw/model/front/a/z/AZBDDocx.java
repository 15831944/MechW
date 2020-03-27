package com.mechw.model.front.a.z;

public class AZBDDocx {

    private String ribbonName;

    private Double ws;
    private Double deltap;
    private Double k;
    private Double d;

    private Double as;

    public AZBDDocx() {
    }

    public AZBDDocx(String ribbonName, Double ws, Double deltap, Double k, Double d, Double as) {
        this.ribbonName = ribbonName;
        this.ws = ws;
        this.deltap = deltap;
        this.k = k;
        this.d = d;
        this.as = as;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public Double getWs() {
        return ws;
    }

    public void setWs(Double ws) {
        this.ws = ws;
    }

    public Double getDeltap() {
        return deltap;
    }

    public void setDeltap(Double deltap) {
        this.deltap = deltap;
    }

    public Double getK() {
        return k;
    }

    public void setK(Double k) {
        this.k = k;
    }

    public Double getD() {
        return d;
    }

    public void setD(Double d) {
        this.d = d;
    }

    public Double getAs() {
        return as;
    }

    public void setAs(Double as) {
        this.as = as;
    }
}
