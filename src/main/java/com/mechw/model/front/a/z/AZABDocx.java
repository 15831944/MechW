package com.mechw.model.front.a.z;

public class AZABDocx {

    private String ribbonName;

    private Double h;
    private Double q;
    private Double ws;

    public AZABDocx() {
    }

    public AZABDocx(String ribbonName, Double h, Double q, Double ws) {
        this.ribbonName = ribbonName;
        this.h = h;
        this.q = q;
        this.ws = ws;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public Double getH() {
        return h;
    }

    public void setH(Double h) {
        this.h = h;
    }

    public Double getQ() {
        return q;
    }

    public void setQ(Double q) {
        this.q = q;
    }

    public Double getWs() {
        return ws;
    }

    public void setWs(Double ws) {
        this.ws = ws;
    }
}
