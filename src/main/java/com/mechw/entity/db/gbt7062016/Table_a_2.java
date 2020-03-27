package com.mechw.entity.db.gbt7062016;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_a_2", catalog = "gbt_706_2016")
public class Table_a_2 {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "norms")
    private String norms;

    @Column(name = "type")
    private String type;

    @Column(name = "h_mm")
    private Double h;

    @Column(name = "b_mm")
    private Double b;

    @Column(name = "d_mm")
    private Double d;

    @Column(name = "t_mm")
    private Double t;

    @Column(name = "r_mm")
    private Double r;

    @Column(name = "r1_mm")
    private Double r1;

    @Column(name = "section_area_cm2")
    private Double sectionArea;

    @Column(name = "mass_kgm")
    private Double mass;

    @Column(name = "outer_area_m2m")
    private Double outerArea;

    @Column(name = "bix_cm4")
    private Double bix;

    @Column(name = "biy_cm4")
    private Double biy;

    @Column(name = "biy1_cm4")
    private Double biy1;

    @Column(name = "six_cm")
    private Double six;

    @Column(name = "siy_cm")
    private Double siy;

    @Column(name = "wx_cm3")
    private Double wx;

    @Column(name = "wy_cm3")
    private Double wy;

    @Column(name = "z0_cm")
    private Double z0;

    public Table_a_2() {
    }

    public Table_a_2(Double lineNo, String norms, String type, Double h, Double b, Double d, Double t, Double r, Double r1, Double sectionArea, Double mass, Double outerArea, Double bix, Double biy, Double biy1, Double six, Double siy, Double wx, Double wy, Double z0) {
        this.lineNo = lineNo;
        this.norms = norms;
        this.type = type;
        this.h = h;
        this.b = b;
        this.d = d;
        this.t = t;
        this.r = r;
        this.r1 = r1;
        this.sectionArea = sectionArea;
        this.mass = mass;
        this.outerArea = outerArea;
        this.bix = bix;
        this.biy = biy;
        this.biy1 = biy1;
        this.six = six;
        this.siy = siy;
        this.wx = wx;
        this.wy = wy;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Double getD() {
        return d;
    }

    public void setD(Double d) {
        this.d = d;
    }

    public Double getT() {
        return t;
    }

    public void setT(Double t) {
        this.t = t;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Double getR1() {
        return r1;
    }

    public void setR1(Double r1) {
        this.r1 = r1;
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

    public Double getBiy() {
        return biy;
    }

    public void setBiy(Double biy) {
        this.biy = biy;
    }

    public Double getBiy1() {
        return biy1;
    }

    public void setBiy1(Double biy1) {
        this.biy1 = biy1;
    }

    public Double getSix() {
        return six;
    }

    public void setSix(Double six) {
        this.six = six;
    }

    public Double getSiy() {
        return siy;
    }

    public void setSiy(Double siy) {
        this.siy = siy;
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

    public Double getZ0() {
        return z0;
    }

    public void setZ0(Double z0) {
        this.z0 = z0;
    }
}
