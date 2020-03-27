package com.mechw.model.front.z.z;

public class ZZGDocx {

    private String ribbonName;

    private Double d;
    private Double g;
    private Double h;
    private Double pd;
    private Double ps;
    private Double pspd;
    private String isCal;

    public ZZGDocx() {
    }

    public ZZGDocx(String ribbonName, Double d, Double g, Double h, Double pd, Double ps, Double pspd, String isCal) {
        this.ribbonName = ribbonName;
        this.d = d;
        this.g = g;
        this.h = h;
        this.pd = pd;
        this.ps = ps;
        this.pspd = pspd;
        this.isCal = isCal;
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

    public Double getG() {
        return g;
    }

    public void setG(Double g) {
        this.g = g;
    }

    public Double getH() {
        return h;
    }

    public void setH(Double h) {
        this.h = h;
    }

    public Double getPd() {
        return pd;
    }

    public void setPd(Double pd) {
        this.pd = pd;
    }

    public Double getPs() {
        return ps;
    }

    public void setPs(Double ps) {
        this.ps = ps;
    }

    public Double getPspd() {
        return pspd;
    }

    public void setPspd(Double pspd) {
        this.pspd = pspd;
    }

    public String getIsCal() {
        return isCal;
    }

    public void setIsCal(String isCal) {
        this.isCal = isCal;
    }
}
