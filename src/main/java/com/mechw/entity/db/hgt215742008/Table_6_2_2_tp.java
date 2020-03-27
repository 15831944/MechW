package com.mechw.entity.db.hgt215742008;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_6_2_2_tp", catalog = "hgt_21574_2008")
public class Table_6_2_2_tp {

    @Id
    @Column(name = "line_no")
    private Integer lineNo;

    @Column(name = "dn")
    private Float dn;

    @Column(name = "distance")
    private Float distance;

    @Column(name = "lift_weight")
    private Float liftWeight;

    @Column(name = "type")
    private String type;

    @Column(name = "shell_min")
    private Float shellMin;

    public Table_6_2_2_tp() {
    }

    public Table_6_2_2_tp(Integer lineNo, Float dn, Float distance, Float liftWeight, String type, Float shellMin) {
        this.lineNo = lineNo;
        this.dn = dn;
        this.distance = distance;
        this.liftWeight = liftWeight;
        this.type = type;
        this.shellMin = shellMin;
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

    public Float getDistance() {
        return distance;
    }

    public void setDistance(Float distance) {
        this.distance = distance;
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
}
