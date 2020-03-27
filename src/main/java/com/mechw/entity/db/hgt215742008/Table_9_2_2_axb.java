package com.mechw.entity.db.hgt215742008;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_9_2_2_axb", catalog = "hgt_21574_2008")
public class Table_9_2_2_axb {

    @Id
    @Column(name = "line_no")
    private Integer lineNo;

    @Column(name = "shell_dn")
    private Float shellDN;

    @Column(name = "lift_weight")
    private Float liftWeight;

    @Column(name = "type")
    private String type;

    @Column(name = "lug_dn")
    private Float lugDN;

    @Column(name = "shell_min_thk")
    private Float shellMinTHK;

    @Column(name = "pad_thk")
    private Float padTHK;

    public Table_9_2_2_axb() {
    }

    public Table_9_2_2_axb(Integer lineNo, Float shellDN, Float liftWeight, String type, Float lugDN, Float shellMinTHK, Float padTHK) {
        this.lineNo = lineNo;
        this.shellDN = shellDN;
        this.liftWeight = liftWeight;
        this.type = type;
        this.lugDN = lugDN;
        this.shellMinTHK = shellMinTHK;
        this.padTHK = padTHK;
    }

    public Integer getLineNo() {
        return lineNo;
    }

    public void setLineNo(Integer lineNo) {
        this.lineNo = lineNo;
    }

    public Float getShellDN() {
        return shellDN;
    }

    public void setShellDN(Float shellDN) {
        this.shellDN = shellDN;
    }

    public Float getLiftWeight() {
        return liftWeight;
    }

    public void setLiftWeight(Float liftWeight) {
        this.liftWeight = liftWeight;
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

    public Float getShellMinTHK() {
        return shellMinTHK;
    }

    public void setShellMinTHK(Float shellMinTHK) {
        this.shellMinTHK = shellMinTHK;
    }

    public Float getPadTHK() {
        return padTHK;
    }

    public void setPadTHK(Float padTHK) {
        this.padTHK = padTHK;
    }
}
