package com.mechw.model.front.a.a;

public class AAAAModel {

    private String ribbonName;

    private Double di;
    private Double dout;
    private Double h;

    public AAAAModel() {
    }

    public AAAAModel(String ribbonName, Double di, Double dout, Double h) {
        this.ribbonName = ribbonName;
        this.di = di;
        this.dout = dout;
        this.h = h;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public Double getDi() {
        return di;
    }

    public void setDi(Double di) {
        this.di = di;
    }

    public Double getDout() {
        return dout;
    }

    public void setDout(Double dout) {
        this.dout = dout;
    }

    public Double getH() {
        return h;
    }

    public void setH(Double h) {
        this.h = h;
    }
}
