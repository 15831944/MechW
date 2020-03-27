package com.mechw.model.db.hgt215742008;

public class AXCBSend {

    private Float dn;
    private Float liftWeight;

    public AXCBSend() {
    }

    public AXCBSend(Float dn, Float liftWeight) {
        this.dn = dn;
        this.liftWeight = liftWeight;
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
}
