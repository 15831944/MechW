package com.mechw.entity.db.hgt215742008;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_8_2_1", catalog = "hgt_21574_2008")
public class Table_8_2_1 {

    @Id
    @Column(name = "line_no")
    private Integer lineNo;

    @Column(name = "lift_weight")
    private Float liftWeight;

    @Column(name = "a")
    private Float a;

    @Column(name = "s")
    private Float s;

    @Column(name = "d")
    private Float d;

    @Column(name = "d1")
    private Float d1;

    @Column(name = "s2")
    private Float s2;

    @Column(name = "f")
    private Float f;

    @Column(name = "g")
    private Float g;

    @Column(name = "h")
    private Float h;

    @Column(name = "hsp")
    private Float hsp;

    @Column(name = "l1")
    private Float l1;

    @Column(name = "l3")
    private Float l3;

    @Column(name = "lsp")
    private Float lsp;

    @Column(name = "r")
    private Float r;

    @Column(name = "s1")
    private Float s1;

    @Column(name = "u")
    private Float u;

    @Column(name = "w1")
    private Float w1;

    public Table_8_2_1() {
    }

    public Table_8_2_1(Integer lineNo, Float liftWeight, Float a, Float s, Float d, Float d1, Float s2, Float f, Float g, Float h, Float hsp, Float l1, Float l3, Float lsp, Float r, Float s1, Float u, Float w1) {
        this.lineNo = lineNo;
        this.liftWeight = liftWeight;
        this.a = a;
        this.s = s;
        this.d = d;
        this.d1 = d1;
        this.s2 = s2;
        this.f = f;
        this.g = g;
        this.h = h;
        this.hsp = hsp;
        this.l1 = l1;
        this.l3 = l3;
        this.lsp = lsp;
        this.r = r;
        this.s1 = s1;
        this.u = u;
        this.w1 = w1;
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

    public Float getA() {
        return a;
    }

    public void setA(Float a) {
        this.a = a;
    }

    public Float getS() {
        return s;
    }

    public void setS(Float s) {
        this.s = s;
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

    public Float getS2() {
        return s2;
    }

    public void setS2(Float s2) {
        this.s2 = s2;
    }

    public Float getF() {
        return f;
    }

    public void setF(Float f) {
        this.f = f;
    }

    public Float getG() {
        return g;
    }

    public void setG(Float g) {
        this.g = g;
    }

    public Float getH() {
        return h;
    }

    public void setH(Float h) {
        this.h = h;
    }

    public Float getHsp() {
        return hsp;
    }

    public void setHsp(Float hsp) {
        this.hsp = hsp;
    }

    public Float getL1() {
        return l1;
    }

    public void setL1(Float l1) {
        this.l1 = l1;
    }

    public Float getL3() {
        return l3;
    }

    public void setL3(Float l3) {
        this.l3 = l3;
    }

    public Float getLsp() {
        return lsp;
    }

    public void setLsp(Float lsp) {
        this.lsp = lsp;
    }

    public Float getR() {
        return r;
    }

    public void setR(Float r) {
        this.r = r;
    }

    public Float getS1() {
        return s1;
    }

    public void setS1(Float s1) {
        this.s1 = s1;
    }

    public Float getU() {
        return u;
    }

    public void setU(Float u) {
        this.u = u;
    }

    public Float getW1() {
        return w1;
    }

    public void setW1(Float w1) {
        this.w1 = w1;
    }
}
