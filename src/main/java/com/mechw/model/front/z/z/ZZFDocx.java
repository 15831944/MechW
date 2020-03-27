package com.mechw.model.front.z.z;

public class ZZFDocx {

    private String ribbonName;

    private Double p;
    private Double dg;
    private Double f;
    private Double m;
    private Double pe;

    public ZZFDocx() {
    }

    public ZZFDocx(String ribbonName, Double p, Double dg, Double f, Double m, Double pe) {
        this.ribbonName = ribbonName;
        this.p = p;
        this.dg = dg;
        this.f = f;
        this.m = m;
        this.pe = pe;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public Double getP() {
        return p;
    }

    public void setP(Double p) {
        this.p = p;
    }

    public Double getDg() {
        return dg;
    }

    public void setDg(Double dg) {
        this.dg = dg;
    }

    public Double getF() {
        return f;
    }

    public void setF(Double f) {
        this.f = f;
    }

    public Double getM() {
        return m;
    }

    public void setM(Double m) {
        this.m = m;
    }

    public Double getPe() {
        return pe;
    }

    public void setPe(Double pe) {
        this.pe = pe;
    }

}
