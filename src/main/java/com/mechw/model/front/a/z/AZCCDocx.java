package com.mechw.model.front.a.z;

public class AZCCDocx {

    private String ribbonName;

    private Double w;
    private Double p;
    private Double density;
    private Double d;
    private Double a;
    private Double f;

    public AZCCDocx() {
    }

    public AZCCDocx(String ribbonName, Double w, Double p, Double density, Double d, Double a, Double f) {
        this.ribbonName = ribbonName;
        this.w = w;
        this.p = p;
        this.density = density;
        this.d = d;
        this.a = a;
        this.f = f;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public Double getW() {
        return w;
    }

    public void setW(Double w) {
        this.w = w;
    }

    public Double getP() {
        return p;
    }

    public void setP(Double p) {
        this.p = p;
    }

    public Double getDensity() {
        return density;
    }

    public void setDensity(Double density) {
        this.density = density;
    }

    public Double getD() {
        return d;
    }

    public void setD(Double d) {
        this.d = d;
    }

    public Double getA() {
        return a;
    }

    public void setA(Double a) {
        this.a = a;
    }

    public Double getF() {
        return f;
    }

    public void setF(Double f) {
        this.f = f;
    }
}
