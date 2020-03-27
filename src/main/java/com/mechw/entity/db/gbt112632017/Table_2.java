package com.mechw.entity.db.gbt112632017;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_2", catalog = "gbt_11263_2017")
public class Table_2 {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "norms")
    private String norms;

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private String size;

    @Column(name = "h_mm")
    private Double h;

    @Column(name = "b_mm")
    private Double b;

    @Column(name = "t1_mm")
    private Double t1;

    @Column(name = "t2_mm")
    private Double t2;

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

    @Column(name = "biy_cm4")
    private Double biy;

    @Column(name = "six_cm")
    private Double six;

    @Column(name = "siy_cm")
    private Double siy;

    @Column(name = "wx_cm3")
    private Double wx;

    @Column(name = "wy_cm3")
    private Double wy;

    @Column(name = "cx_cm")
    private Double cx;

    @Column(name = "h_norms")
    private String hNorms;

    public Table_2() {
    }

    public Table_2(Double lineNo, String norms, String type, String size, Double h, Double b, Double t1, Double t2, Double r, Double sectionArea, Double mass, Double outerArea, Double bix, Double biy, Double six, Double siy, Double wx, Double wy, Double cx, String hNorms) {
        this.lineNo = lineNo;
        this.norms = norms;
        this.type = type;
        this.size = size;
        this.h = h;
        this.b = b;
        this.t1 = t1;
        this.t2 = t2;
        this.r = r;
        this.sectionArea = sectionArea;
        this.mass = mass;
        this.outerArea = outerArea;
        this.bix = bix;
        this.biy = biy;
        this.six = six;
        this.siy = siy;
        this.wx = wx;
        this.wy = wy;
        this.cx = cx;
        this.hNorms = hNorms;
    }

    public Double getCx() {
        return cx;
    }

    public void setCx(Double cx) {
        this.cx = cx;
    }

    public String gethNorms() {
        return hNorms;
    }

    public void sethNorms(String hNorms) {
        this.hNorms = hNorms;
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

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
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

    public Double getT1() {
        return t1;
    }

    public void setT1(Double t1) {
        this.t1 = t1;
    }

    public Double getT2() {
        return t2;
    }

    public void setT2(Double t2) {
        this.t2 = t2;
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

    public Double getBiy() {
        return biy;
    }

    public void setBiy(Double biy) {
        this.biy = biy;
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
}
