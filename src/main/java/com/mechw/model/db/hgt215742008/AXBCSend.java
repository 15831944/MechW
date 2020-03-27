package com.mechw.model.db.hgt215742008;


public class AXBCSend {

    private Float dn;
    private Float liftWeight;
    private Float type;

    public AXBCSend() {
    }

    public AXBCSend(Float dn, Float liftWeight, Float type) {
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

    public Float getType() {
        return type;
    }

    public void setType(Float type) {
        this.type = type;
    }
}
