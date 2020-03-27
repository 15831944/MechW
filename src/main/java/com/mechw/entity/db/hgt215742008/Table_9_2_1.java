package com.mechw.entity.db.hgt215742008;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_9_2_1", catalog = "hgt_21574_2008")
public class Table_9_2_1 {

    @Id
    @Column(name = "line_no")
    private Integer line_no;

    @Column(name = "type")
    private String type;

    @Column(name = "lug_dn")
    private Float lugDN;

    @Column(name = "lift_weight_min")
    private Float liftWeightMin;

    @Column(name = "lift_weight_max")
    private Float liftWeightMax;

    @Column(name = "shell_dn_min")
    private Float shellDNMin;

    @Column(name = "shell_dn_max")
    private Float shellDNMax;

    @Column(name = "t")
    private Float t;

    @Column(name = "d0")
    private Float d0;

    @Column(name = "d1")
    private Float d1;

    @Column(name = "d2")
    private Float d2;

    @Column(name = "l")
    private Float l;

    @Column(name = "s")
    private Float s;

    @Column(name = "s2")
    private Float s2;

    @Column(name = "u")
    private Float u;

    @Column(name = "w1")
    private Float w1;

    public Table_9_2_1() {
    }

    public Table_9_2_1(Integer line_no, String type, Float lugDN, Float liftWeightMin, Float liftWeightMax, Float shellDNMin, Float shellDNMax, Float t, Float d0, Float d1, Float d2, Float l, Float s, Float s2, Float u, Float w1) {
        this.line_no = line_no;
        this.type = type;
        this.lugDN = lugDN;
        this.liftWeightMin = liftWeightMin;
        this.liftWeightMax = liftWeightMax;
        this.shellDNMin = shellDNMin;
        this.shellDNMax = shellDNMax;
        this.t = t;
        this.d0 = d0;
        this.d1 = d1;
        this.d2 = d2;
        this.l = l;
        this.s = s;
        this.s2 = s2;
        this.u = u;
        this.w1 = w1;
    }

    public Integer getLine_no() {
        return line_no;
    }

    public void setLine_no(Integer line_no) {
        this.line_no = line_no;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float getLugDN() {
        return lugDN;
    }

    public void setLugDN(Float lugDN) {
        this.lugDN = lugDN;
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

    public Float getShellDNMin() {
        return shellDNMin;
    }

    public void setShellDNMin(Float shellDNMin) {
        this.shellDNMin = shellDNMin;
    }

    public Float getShellDNMax() {
        return shellDNMax;
    }

    public void setShellDNMax(Float shellDNMax) {
        this.shellDNMax = shellDNMax;
    }

    public Float getT() {
        return t;
    }

    public void setT(Float t) {
        this.t = t;
    }

    public Float getD0() {
        return d0;
    }

    public void setD0(Float d0) {
        this.d0 = d0;
    }

    public Float getD1() {
        return d1;
    }

    public void setD1(Float d1) {
        this.d1 = d1;
    }

    public Float getD2() {
        return d2;
    }

    public void setD2(Float d2) {
        this.d2 = d2;
    }

    public Float getL() {
        return l;
    }

    public void setL(Float l) {
        this.l = l;
    }

    public Float getS() {
        return s;
    }

    public void setS(Float s) {
        this.s = s;
    }

    public Float getS2() {
        return s2;
    }

    public void setS2(Float s2) {
        this.s2 = s2;
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
