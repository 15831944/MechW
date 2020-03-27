package com.mechw.model.db.hgt215742008;


public class TPCSend {

    private Float dn;
    private Float liftWeight;
    private String type;

    public TPCSend() {
    }

    public TPCSend(Float dn, Float liftWeight, String type) {
        this.dn = dn;
        this.liftWeight = liftWeight;
        this.type = type;
    }

    public Float getDn() {
        return dn;
    }

    public void setDn(Float dn) {
        this.dn = dn;
    }

    public Float getLiftWeight() {
        return liftWeight;
    }

    public void setLiftWeight(Float liftWeight) {
        this.liftWeight = liftWeight;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
