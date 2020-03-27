package com.mechw.entity.db.hgt215742008;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_7_2_1", catalog = "hgt_21574_2008")
public class Table_7_2_1 {

    @Id
    @Column(name = "line_no")
    private Integer lineNo;

    @Column(name = "norm")
    private String norm;

    @Column(name = "lift_weight_min")
    private Float liftWeightMin;

    @Column(name = "lift_weight_max")
    private Float liftWeightMax;

    @Column(name = "dn_min")
    private Float dnMin;

    @Column(name = "dn_max")
    private Float dnMax;

    @Column(name = "s")
    private Float s;

    @Column(name = "d")
    private Float d;

    @Column(name = "l")
    private Float l;

    @Column(name = "r")
    private Float r;

    @Column(name = "ltp")
    private Float ltp;

    @Column(name = "htp")
    private Float htp;

    @Column(name = "lug_weight")
    private Float lugWeight;

    @Column(name = "pad_weight_factor")
    private Float padWeightFactor;

    public Table_7_2_1() {
    }

    public Table_7_2_1(Integer lineNo, String norm, Float liftWeightMin, Float liftWeightMax, Float dnMin, Float dnMax, Float s, Float d, Float l, Float r, Float ltp, Float htp, Float lugWeight, Float padWeightFactor) {
        this.lineNo = lineNo;
        this.norm = norm;
        this.liftWeightMin = liftWeightMin;
        this.liftWeightMax = liftWeightMax;
        this.dnMin = dnMin;
        this.dnMax = dnMax;
        this.s = s;
        this.d = d;
        this.l = l;
        this.r = r;
        this.ltp = ltp;
        this.htp = htp;
        this.lugWeight = lugWeight;
        this.padWeightFactor = padWeightFactor;
    }

    public Integer getLineNo() {
        return lineNo;
    }

    public void setLineNo(Integer lineNo) {
        this.lineNo = lineNo;
    }

    public String getNorm() {
        return norm;
    }

    public void setNorm(String norm) {
        this.norm = norm;
    }

    public Float getLiftWeightMin() {
        return liftWeightMin;
    }

    public void setLiftWeightMin(Float liftWeightMin) {
        this.liftWeightMin = liftWeightMin;
    }

    public Float getLiftWeightMax() {
        return liftWeightMax;
    }

    public void setLiftWeightMax(Float liftWeightMax) {
        this.liftWeightMax = liftWeightMax;
    }

    public Float getDnMin() {
        return dnMin;
    }

    public void setDnMin(Float dnMin) {
        this.dnMin = dnMin;
    }

    public Float getDnMax() {
        return dnMax;
    }

    public void setDnMax(Float dnMax) {
        this.dnMax = dnMax;
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

    public Float getL() {
        return l;
    }

    public void setL(Float l) {
        this.l = l;
    }

    public Float getR() {
        return r;
    }

    public void setR(Float r) {
        this.r = r;
    }

    public Float getLtp() {
        return ltp;
    }

    public void setLtp(Float ltp) {
        this.ltp = ltp;
    }

    public Float getHtp() {
        return htp;
    }

    public void setHtp(Float htp) {
        this.htp = htp;
    }

    public Float getLugWeight() {
        return lugWeight;
    }

    public void setLugWeight(Float lugWeight) {
        this.lugWeight = lugWeight;
    }

    public Float getPadWeightFactor() {
        return padWeightFactor;
    }

    public void setPadWeightFactor(Float padWeightFactor) {
        this.padWeightFactor = padWeightFactor;
    }
}
