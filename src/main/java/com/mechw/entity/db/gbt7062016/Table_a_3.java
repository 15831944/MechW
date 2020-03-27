package com.mechw.entity.db.gbt7062016;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_a_3", catalog = "gbt_706_2016")
public class Table_a_3 {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "norms")
    private String norms;

    @Column(name = "type")
    private Double type;

    @Column(name = "b_mm")
    private Double b;

    @Column(name = "d_mm")
    private Double d;

    @Column(name = "r_mm")
    private Double r;

    @Column(name = "section_area_cm2")
    private Double sectionArea;

    @Column(name = "mass_kgm")
    private Double mass;

    @Column(name = "outer_area_m2m")
    private Double outerArea;

    @Column(name = "bix_cm4")
    private Double bix;

    @Column(name = "bix1_cm4")
    private Double bix1;

    @Column(name = "bix0_cm4")
    private Double bix0;

    @Column(name = "biy0_cm4")
    private Double biy0;

    @Column(name = "six_cm")
    private Double six;

    @Column(name = "six0_cm")
    private Double six0;

    @Column(name = "siy0_cm")
    private Double siy0;

    @Column(name = "wx_cm3")
    private Double wx;

    @Column(name = "wx0_cm3")
    private Double wx0;

    @Column(name = "wy0_cm3")
    private Double wy0;

    @Column(name = "z0_cm")
    private Double z0;

    public Table_a_3() {
    }

    public Table_a_3(Double lineNo, String norms, Double type, Double b, Double d, Double r, Double sectionArea, Double mass, Double outerArea, Double bix, Double bix1, Double bix0, Double biy0, Double six, Double six0, Double siy0, Double wx, Double wx0, Double wy0, Double z0) {
        this.lineNo = lineNo;
        this.norms = norms;
        this.type = type;
        this.b = b;
        this.d = d;
        this.r = r;
        this.sectionArea = sectionArea;
        this.mass = mass;
        this.outerArea = outerArea;
        this.bix = bix;
        this.bix1 = bix1;
        this.bix0 = bix0;
        this.biy0 = biy0;
        this.six = six;
        this.six0 = six0;
        this.siy0 = siy0;
        this.wx = wx;
        this.wx0 = wx0;
        this.wy0 = wy0;
        this.z0 = z0;
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

    public Double getType() {
        return type;
    }

    public void setType(Double type) {
        this.type = type;
    }

    public Double getB() {
        return b;
    }

    public void setB(Double b) {
        this.b = b;
    }

    public Double getD() {
        return d;
    }

    public void setD(Double d) {
        this.d = d;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Double getSectionArea() {
        return sectionArea;
    }

    public void setSectionArea(Double sectionArea) {
        this.sectionArea = sectionArea;
    }

    public Double getMass() {
        return mass;
    }

    public void setMass(Double mass) {
        this.mass = mass;
    }

    public Double getOuterArea() {
        return outerArea;
    }

    public void setOuterArea(Double outerArea) {
        this.outerArea = outerArea;
    }

    public Double getBix() {
        return bix;
    }

    public void setBix(Double bix) {
        this.bix = bix;
    }

    public Double getBix1() {
        return bix1;
    }

    public void setBix1(Double bix1) {
        this.bix1 = bix1;
    }

    public Double getBix0() {
        return bix0;
    }

    public void setBix0(Double bix0) {
        this.bix0 = bix0;
    }

    public Double getBiy0() {
        return biy0;
    }

    public void setBiy0(Double biy0) {
        this.biy0 = biy0;
    }

    public Double getSix() {
        return six;
    }

    public void setSix(Double six) {
        this.six = six;
    }

    public Double getSix0() {
        return six0;
    }

    public void setSix0(Double six0) {
        this.six0 = six0;
    }

    public Double getSiy0() {
        return siy0;
    }

    public void setSiy0(Double siy0) {
        this.siy0 = siy0;
    }

    public Double getWx() {
        return wx;
    }

    public void setWx(Double wx) {
        this.wx = wx;
    }

    public Double getWx0() {
        return wx0;
    }

    public void setWx0(Double wx0) {
        this.wx0 = wx0;
    }

    public Double getWy0() {
        return wy0;
    }

    public void setWy0(Double wy0) {
        this.wy0 = wy0;
    }

    public Double getZ0() {
        return z0;
    }

    public void setZ0(Double z0) {
        this.z0 = z0;
    }
}
