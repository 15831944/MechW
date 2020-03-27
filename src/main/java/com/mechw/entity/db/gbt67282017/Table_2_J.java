package com.mechw.entity.db.gbt67282017;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_2", catalog = "gbt_6728_2017")
public class Table_2_J {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "norms")
    private String norms;

    @Column(name = "h_mm")
    private Double h;

    @Column(name = "b_mm")
    private Double b;

    @Column(name = "delta")
    private String delta;

    @Column(name = "t_mm")
    private Double t;

    @Column(name = "mass_kgm")
    private Double mass;

    @Column(name = "a_cm2")
    private Double a;

    @Column(name = "ix_cm4")
    private Double ix;

    @Column(name = "iy_cm4")
    private Double iy;

    @Column(name = "rx_cm")
    private Double rx;

    @Column(name = "ry_cm")
    private Double ry;

    @Column(name = "wx_cm3")
    private Double wx;

    @Column(name = "wy_cm3")
    private Double wy;

    @Column(name = "it_cm4")
    private Double it;

    @Column(name = "ct_cm3")
    private Double ct;

    @Column(name = "cs_ro_min")
    private Double csRoMin;

    @Column(name = "cs_ro_max")
    private Double csRoMax;

    @Column(name = "low_alloy_ro_min")
    private Double lowAlloyRoMin;

    @Column(name = "low_alloy_ro_max")
    private Double lowAlloyRoMax;

    public Table_2_J() {
    }

    public Table_2_J(Double lineNo, String norms, Double h, Double b, String delta, Double t, Double mass, Double a, Double ix, Double iy, Double rx, Double ry, Double wx, Double wy, Double it, Double ct, Double csRoMin, Double csRoMax, Double lowAlloyRoMin, Double lowAlloyRoMax) {
        this.lineNo = lineNo;
        this.norms = norms;
        this.h = h;
        this.b = b;
        this.delta = delta;
        this.t = t;
        this.mass = mass;
        this.a = a;
        this.ix = ix;
        this.iy = iy;
        this.rx = rx;
        this.ry = ry;
        this.wx = wx;
        this.wy = wy;
        this.it = it;
        this.ct = ct;
        this.csRoMin = csRoMin;
        this.csRoMax = csRoMax;
        this.lowAlloyRoMin = lowAlloyRoMin;
        this.lowAlloyRoMax = lowAlloyRoMax;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public String getNorms() {
        return norms;
    }

    public void setNorms(String norms) {
        this.norms = norms;
    }

    public Double getH() {
        return h;
    }

    public void setH(Double h) {
        this.h = h;
    }

    public Double getB() {
        return b;
    }

    public void setB(Double b) {
        this.b = b;
    }

    public String getDelta() {
        return delta;
    }

    public void setDelta(String delta) {
        this.delta = delta;
    }

    public Double getT() {
        return t;
    }

    public void setT(Double t) {
        this.t = t;
    }

    public Double getMass() {
        return mass;
    }

    public void setMass(Double mass) {
        this.mass = mass;
    }

    public Double getA() {
        return a;
    }

    public void setA(Double a) {
        this.a = a;
    }

    public Double getIx() {
        return ix;
    }

    public void setIx(Double ix) {
        this.ix = ix;
    }

    public Double getIy() {
        return iy;
    }

    public void setIy(Double iy) {
        this.iy = iy;
    }

    public Double getRx() {
        return rx;
    }

    public void setRx(Double rx) {
        this.rx = rx;
    }

    public Double getRy() {
        return ry;
    }

    public void setRy(Double ry) {
        this.ry = ry;
    }

    public Double getWx() {
        return wx;
    }

    public void setWx(Double wx) {
        this.wx = wx;
    }

    public Double getWy() {
        return wy;
    }

    public void setWy(Double wy) {
        this.wy = wy;
    }

    public Double getIt() {
        return it;
    }

    public void setIt(Double it) {
        this.it = it;
    }

    public Double getCt() {
        return ct;
    }

    public void setCt(Double ct) {
        this.ct = ct;
    }

    public Double getCsRoMin() {
        return csRoMin;
    }

    public void setCsRoMin(Double csRoMin) {
        this.csRoMin = csRoMin;
    }

    public Double getCsRoMax() {
        return csRoMax;
    }

    public void setCsRoMax(Double csRoMax) {
        this.csRoMax = csRoMax;
    }

    public Double getLowAlloyRoMin() {
        return lowAlloyRoMin;
    }

    public void setLowAlloyRoMin(Double lowAlloyRoMin) {
        this.lowAlloyRoMin = lowAlloyRoMin;
    }

    public Double getLowAlloyRoMax() {
        return lowAlloyRoMax;
    }

    public void setLowAlloyRoMax(Double lowAlloyRoMax) {
        this.lowAlloyRoMax = lowAlloyRoMax;
    }
}
