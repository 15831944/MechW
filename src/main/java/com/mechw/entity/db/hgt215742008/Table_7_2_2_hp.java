package com.mechw.entity.db.hgt215742008;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_7_2_2_hp", catalog = "hgt_21574_2008")
public class Table_7_2_2_hp {

    @Id
    @Column(name = "line_no")
    private Integer lineNo;

    @Column(name = "dn")
    private Float dn;

    @Column(name = "lift_weight")
    private Float liftWeight;

    @Column(name = "type")
    private String type;

    @Column(name = "shell_min")
    private Float shellMin;

    @Column(name = "pad_min")
    private Float padMin;

    public Table_7_2_2_hp() {
    }

    public Table_7_2_2_hp(Integer lineNo, Float dn, Float liftWeight, String type, Float shellMin, Float padMin) {
        this.lineNo = lineNo;
        this.dn = dn;
        this.liftWeight = liftWeight;
        this.type = type;
        this.shellMin = shellMin;
        this.padMin = padMin;
    }

    public Integer getLineNo() {
        return lineNo;
    }

    public void setLineNo(Integer lineNo) {
        this.lineNo = lineNo;
    }

    public Float getDn() {
        return dn;
    }

    public void setDn(Float dn) {
        this.dn = dn;
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

    public Float getShellMin() {
        return shellMin;
    }

    public void setShellMin(Float shellMin) {
        this.shellMin = shellMin;
    }

    public Float getPadMin() {
        return padMin;
    }

    public void setPadMin(Float padMin) {
        this.padMin = padMin;
    }
}
