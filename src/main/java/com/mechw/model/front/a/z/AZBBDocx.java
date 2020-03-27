package com.mechw.model.front.a.z;

public class AZBBDocx {

    private String ribbonName;

    private Double ws;
    private Double pd;
    private Double deltap;
    private Double k;
    private Double pf;
    private Double a;
    private Double d;

    public AZBBDocx() {
    }

    public AZBBDocx(String ribbonName, Double ws, Double pd, Double deltap, Double k, Double pf, Double a, Double d) {
        this.ribbonName = ribbonName;
        this.ws = ws;
        this.pd = pd;
        this.deltap = deltap;
        this.k = k;
        this.pf = pf;
        this.a = a;
        this.d = d;
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

    public Double getPd() {
        return pd;
    }

    public void setPd(Double pd) {
        this.pd = pd;
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

    public Double getPf() {
        return pf;
    }

    public void setPf(Double pf) {
        this.pf = pf;
    }

    public Double getA() {
        return a;
    }

    public void setA(Double a) {
        this.a = a;
    }

    public Double getD() {
        return d;
    }

    public void setD(Double d) {
        this.d = d;
    }
}
