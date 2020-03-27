package com.mechw.model.front.a.z;

public class AZAADocx {

    private String ribbonName;
    private Double d;
    private Double v;
    private Double density;
    private Double ws;

    public AZAADocx() {
    }

    public AZAADocx(String ribbonName, Double d, Double v, Double density, Double ws) {
        this.ribbonName = ribbonName;
        this.d = d;
        this.v = v;
        this.density = density;
        this.ws = ws;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public Double getD() {
        return d;
    }

    public void setD(Double d) {
        this.d = d;
    }

    public Double getV() {
        return v;
    }

    public void setV(Double v) {
        this.v = v;
    }

    public Double getDensity() {
        return density;
    }

    public void setDensity(Double density) {
        this.density = density;
    }

    public Double getWs() {
        return ws;
    }

    public void setWs(Double ws) {
        this.ws = ws;
    }
}
