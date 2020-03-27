package com.mechw.entity.db.gbt67282017;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_3", catalog = "gbt_6728_2017")
public class Table_3_Y {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "norms")
    private String norms;

    @Column(name = "d_mm")
    private String d;

    @Column(name = "delta")
    private String delta;

    @Column(name = "t_mm")
    private Double t;

    @Column(name = "mass_kgm")
    private Double mass;

    @Column(name = "a_cm2")
    private Double a;

    @Column(name = "i_cm4")
    private Double i;

    @Column(name = "r_cm")
    private Double r;

    @Column(name = "z_cm3")
    private Double z;

    @Column(name = "s_cm3")
    private Double s;

    @Column(name = "j_cm4")
    private Double j;

    @Column(name = "c_cm3")
    private Double c;

    @Column(name = "as_m2m")
    private Double as;

    public Table_3_Y() {
    }

    public Table_3_Y(Double lineNo, String norms, String d, String delta, Double t, Double mass, Double a, Double i, Double r, Double z, Double s, Double j, Double c, Double as) {
        this.lineNo = lineNo;
        this.norms = norms;
        this.d = d;
        this.delta = delta;
        this.t = t;
        this.mass = mass;
        this.a = a;
        this.i = i;
        this.r = r;
        this.z = z;
        this.s = s;
        this.j = j;
        this.c = c;
        this.as = as;
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

    public String getD() {
        return d;
    }

    public void setD(String d) {
        this.d = d;
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

    public Double getI() {
        return i;
    }

    public void setI(Double i) {
        this.i = i;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Double getZ() {
        return z;
    }

    public void setZ(Double z) {
        this.z = z;
    }

    public Double getS() {
        return s;
    }

    public void setS(Double s) {
        this.s = s;
    }

    public Double getJ() {
        return j;
    }

    public void setJ(Double j) {
        this.j = j;
    }

    public Double getC() {
        return c;
    }

    public void setC(Double c) {
        this.c = c;
    }

    public Double getAs() {
        return as;
    }

    public void setAs(Double as) {
        this.as = as;
    }
}
