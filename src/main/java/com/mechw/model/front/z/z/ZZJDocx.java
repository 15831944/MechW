package com.mechw.model.front.z.z;

public class ZZJDocx {

    private String ribbonName;

    private String category;

    private Double l0;
    private Double s0;
    private Double thk;
    private Double l0r;
    private Double s0r;

    private Double n;
    private Double thkr;

    public ZZJDocx() {
    }

    public ZZJDocx(String ribbonName, String category, Double l0, Double s0, Double thk, Double l0r, Double s0r, Double n, Double thkr) {
        this.ribbonName = ribbonName;
        this.category = category;
        this.l0 = l0;
        this.s0 = s0;
        this.thk = thk;
        this.l0r = l0r;
        this.s0r = s0r;
        this.n = n;
        this.thkr = thkr;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getL0() {
        return l0;
    }

    public void setL0(Double l0) {
        this.l0 = l0;
    }

    public Double getS0() {
        return s0;
    }

    public void setS0(Double s0) {
        this.s0 = s0;
    }

    public Double getThk() {
        return thk;
    }

    public void setThk(Double thk) {
        this.thk = thk;
    }

    public Double getL0r() {
        return l0r;
    }

    public void setL0r(Double l0r) {
        this.l0r = l0r;
    }

    public Double getS0r() {
        return s0r;
    }

    public void setS0r(Double s0r) {
        this.s0r = s0r;
    }

    public Double getN() {
        return n;
    }

    public void setN(Double n) {
        this.n = n;
    }

    public Double getThkr() {
        return thkr;
    }

    public void setThkr(Double thkr) {
        this.thkr = thkr;
    }
}
