package com.mechw.model.db.nbt470652018.saddle;

public class SymbolInput {

    private String mtl;
    private Double dn;
    private Double q;
    private String fabMethod;
    private String pad;
    private Double angle;
    private String symbol;

    public SymbolInput() {
    }

    public SymbolInput(String mtl, Double dn, Double q, String fabMethod, String pad, Double angle, String symbol) {
        this.mtl = mtl;
        this.dn = dn;
        this.q = q;
        this.fabMethod = fabMethod;
        this.pad = pad;
        this.angle = angle;
        this.symbol = symbol;
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

    public String getPad() {
        return pad;
    }

    public void setPad(String pad) {
        this.pad = pad;
    }

    public Double getAngle() {
        return angle;
    }

    public void setAngle(Double angle) {
        this.angle = angle;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}
