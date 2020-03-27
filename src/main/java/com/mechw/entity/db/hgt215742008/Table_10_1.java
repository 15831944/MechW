package com.mechw.entity.db.hgt215742008;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_10_1", catalog = "hgt_21574_2008")
public class Table_10_1 {

    @Id
    @Column(name = "line_no")
    private Integer lineNo;

    @Column(name = "lift_weight")
    private Float liftWeight;

    @Column(name = "s")
    private Float s;

    @Column(name = "s1")
    private Float s1;

    @Column(name = "d")
    private Float d;

    @Column(name = "d1")
    private Float d1;

    @Column(name = "r")
    private Float r;

    @Column(name = "l")
    private Float l;

    @Column(name = "mass")
    private Float mass;

    public Table_10_1() {
    }

    public Table_10_1(Integer lineNo, Float liftWeight, Float s, Float s1, Float d, Float d1, Float r, Float l, Float mass) {
        this.lineNo = lineNo;
        this.liftWeight = liftWeight;
        this.s = s;
        this.s1 = s1;
        this.d = d;
        this.d1 = d1;
        this.r = r;
        this.l = l;
        this.mass = mass;
    }

    public Integer getLineNo() {
        return lineNo;
    }

    public void setLineNo(Integer lineNo) {
        this.lineNo = lineNo;
    }

    public Float getLiftWeight() {
        return liftWeight;
    }

    public void setLiftWeight(Float liftWeight) {
        this.liftWeight = liftWeight;
    }

    public Float getS() {
        return s;
    }

    public void setS(Float s) {
        this.s = s;
    }

    public Float getS1() {
        return s1;
    }

    public void setS1(Float s1) {
        this.s1 = s1;
    }

    public Float getD() {
        return d;
    }

    public void setD(Float d) {
        this.d = d;
    }

    public Float getD1() {
        return d1;
    }

    public void setD1(Float d1) {
        this.d1 = d1;
    }

    public Float getR() {
        return r;
    }

    public void setR(Float r) {
        this.r = r;
    }

    public Float getL() {
        return l;
    }

    public void setL(Float l) {
        this.l = l;
    }

    public Float getMass() {
        return mass;
    }

    public void setMass(Float mass) {
        this.mass = mass;
    }

}
