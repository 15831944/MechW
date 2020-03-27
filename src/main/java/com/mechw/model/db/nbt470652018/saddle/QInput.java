package com.mechw.model.db.nbt470652018.saddle;

public class QInput {

    private String mtl;
    private Double dn;
    private Double q;

    public QInput() {
    }

    public QInput(String mtl, Double dn, Double q) {
        this.mtl = mtl;
        this.dn = dn;
        this.q = q;
    }

    public String getMtl() {
        return mtl;
    }

    public void setMtl(String mtl) {
        this.mtl = mtl;
    }

    public Double getDn() {
        return dn;
    }

    public void setDn(Double dn) {
        this.dn = dn;
    }

    public Double getQ() {
        return q;
    }

    public void setQ(Double q) {
        this.q = q;
    }
}
