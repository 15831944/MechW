package com.mechw.model.front.a.z;

public class AZBCDocx {

    private String ribbonName;

    private Double ws;
    private Double deltap;
    private Double k;
    private Double d;
    private Double u;

    private Double as;

    private Double a;

    private Double w;
    private Double re;
    private Double zeta;
    private Double wact;
    private String wchk;

    public AZBCDocx() {
    }

    public AZBCDocx(String ribbonName, Double ws, Double deltap, Double k, Double d, Double u, Double as, Double a, Double w, Double re, Double zeta, Double wact, String wchk) {
        this.ribbonName = ribbonName;
        this.ws = ws;
        this.deltap = deltap;
        this.k = k;
        this.d = d;
        this.u = u;
        this.as = as;
        this.a = a;
        this.w = w;
        this.re = re;
        this.zeta = zeta;
        this.wact = wact;
        this.wchk = wchk;
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

    public Double getU() {
        return u;
    }

    public void setU(Double u) {
        this.u = u;
    }

    public Double getAs() {
        return as;
    }

    public void setAs(Double as) {
        this.as = as;
    }

    public Double getA() {
        return a;
    }

    public void setA(Double a) {
        this.a = a;
    }

    public Double getW() {
        return w;
    }

    public void setW(Double w) {
        this.w = w;
    }

    public Double getRe() {
        return re;
    }

    public void setRe(Double re) {
        this.re = re;
    }

    public Double getZeta() {
        return zeta;
    }

    public void setZeta(Double zeta) {
        this.zeta = zeta;
    }

    public Double getWact() {
        return wact;
    }

    public void setWact(Double wact) {
        this.wact = wact;
    }

    public String getWchk() {
        return wchk;
    }

    public void setWchk(String wchk) {
        this.wchk = wchk;
    }
}
