package com.mechw.model.db.hgt215742008;


public class HPCResult {

    private float dn;
    private float liftWeight;
    private String type;
    private float shellMin;
    private float padMin;
    private float s;
    private float d;
    private float l;
    private float r;
    private float ltp;
    private float htp;
    private float lugWeight;
    private float padWeightFactor;

    public HPCResult() {
    }

    public HPCResult(float dn, float liftWeight, String type, float shellMin, float padMin, float s, float d, float l, float r, float ltp, float htp, float lugWeight, float padWeightFactor) {
        this.dn = dn;
        this.liftWeight = liftWeight;
        this.type = type;
        this.shellMin = shellMin;
        this.padMin = padMin;
        this.s = s;
        this.d = d;
        this.l = l;
        this.r = r;
        this.ltp = ltp;
        this.htp = htp;
        this.lugWeight = lugWeight;
        this.padWeightFactor = padWeightFactor;
    }

    public float getDn() {
        return dn;
    }

    public void setDn(float dn) {
        this.dn = dn;
    }

    public float getLiftWeight() {
        return liftWeight;
    }

    public void setLiftWeight(float liftWeight) {
        this.liftWeight = liftWeight;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getShellMin() {
        return shellMin;
    }

    public void setShellMin(float shellMin) {
        this.shellMin = shellMin;
    }

    public float getPadMin() {
        return padMin;
    }

    public void setPadMin(float padMin) {
        this.padMin = padMin;
    }

    public float getS() {
        return s;
    }

    public void setS(float s) {
        this.s = s;
    }

    public float getD() {
        return d;
    }

    public void setD(float d) {
        this.d = d;
    }

    public float getL() {
        return l;
    }

    public void setL(float l) {
        this.l = l;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public float getLtp() {
        return ltp;
    }

    public void setLtp(float ltp) {
        this.ltp = ltp;
    }

    public float getHtp() {
        return htp;
    }

    public void setHtp(float htp) {
        this.htp = htp;
    }

    public float getLugWeight() {
        return lugWeight;
    }

    public void setLugWeight(float lugWeight) {
        this.lugWeight = lugWeight;
    }

    public float getPadWeightFactor() {
        return padWeightFactor;
    }

    public void setPadWeightFactor(float padWeightFactor) {
        this.padWeightFactor = padWeightFactor;
    }
}
