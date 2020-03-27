package com.mechw.model.db.nbt470652018.saddle;

public class FabMethodInput {

    private String mtl;
    private Double dn;
    private Double q;
    private String fabMethod;

    public FabMethodInput() {
    }

    public FabMethodInput(String mtl, Double dn, Double q, String fabMethod) {
        this.mtl = mtl;
        this.dn = dn;
        this.q = q;
        this.fabMethod = fabMethod;
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

    public String getFabMethod() {
        return fabMethod;
    }

    public void setFabMethod(String fabMethod) {
        this.fabMethod = fabMethod;
    }
}
