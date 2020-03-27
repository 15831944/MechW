package com.mechw.entity.db.ybt53092006;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_2", catalog = "ybt_5309_2006")
public class ybt_5309_2006_Table_2 {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "norms")
    private String norms;

    @Column(name = "a_mm")
    private Double a;

    @Column(name = "b_mm")
    private Double b;

    @Column(name = "t_mm")
    private Double t;

    @Column(name = "r1_mm")
    private Double r1;

    @Column(name = "r2_mm")
    private Double r2;

    @Column(name = "section_area_cm2")
    private Double sectionArea;

    @Column(name = "mass_1_kgm")
    private Double mass1;

    @Column(name = "mass_2_kgm")
    private Double mass2;

    @Column(name = "mass_3_kgm")
    private Double mass3;

    @Column(name = "cx_cm")
    private Double cx;

    @Column(name = "cy_cm")
    private Double cy;

    @Column(name = "bix_cm4")
    private Double bix;

    @Column(name = "biy_cm4")
    private Double biy;

    @Column(name = "max_biu_cm4")
    private Double maxBiu;

    @Column(name = "min_biv_cm4")
    private Double minBiv;

    @Column(name = "six_cm")
    private Double six;

    @Column(name = "siy_cm")
    private Double siy;

    @Column(name = "max_siu_cm")
    private Double maxSiu;

    @Column(name = "min_siv_cm")
    private Double minSiv;

    @Column(name = "zx_cm3")
    private Double zx;

    @Column(name = "zy_cm3")
    private Double zy;

    public ybt_5309_2006_Table_2() {
    }

    public ybt_5309_2006_Table_2(Double lineNo, String norms, Double a, Double b, Double t, Double r1, Double r2, Double sectionArea, Double mass1, Double mass2, Double mass3, Double cx, Double cy, Double bix, Double biy, Double maxBiu, Double minBiv, Double six, Double siy, Double maxSiu, Double minSiv, Double zx, Double zy) {
        this.lineNo = lineNo;
        this.norms = norms;
        this.a = a;
        this.b = b;
        this.t = t;
        this.r1 = r1;
        this.r2 = r2;
        this.sectionArea = sectionArea;
        this.mass1 = mass1;
        this.mass2 = mass2;
        this.mass3 = mass3;
        this.cx = cx;
        this.cy = cy;
        this.bix = bix;
        this.biy = biy;
        this.maxBiu = maxBiu;
        this.minBiv = minBiv;
        this.six = six;
        this.siy = siy;
        this.maxSiu = maxSiu;
        this.minSiv = minSiv;
        this.zx = zx;
        this.zy = zy;
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

    public Double getA() {
        return a;
    }

    public void setA(Double a) {
        this.a = a;
    }

    public Double getB() {
        return b;
    }

    public void setB(Double b) {
        this.b = b;
    }

    public Double getT() {
        return t;
    }

    public void setT(Double t) {
        this.t = t;
    }

    public Double getR1() {
        return r1;
    }

    public void setR1(Double r1) {
        this.r1 = r1;
    }

    public Double getR2() {
        return r2;
    }

    public void setR2(Double r2) {
        this.r2 = r2;
    }

    public Double getSectionArea() {
        return sectionArea;
    }

    public void setSectionArea(Double sectionArea) {
        this.sectionArea = sectionArea;
    }

    public Double getMass1() {
        return mass1;
    }

    public void setMass1(Double mass1) {
        this.mass1 = mass1;
    }

    public Double getMass2() {
        return mass2;
    }

    public void setMass2(Double mass2) {
        this.mass2 = mass2;
    }

    public Double getMass3() {
        return mass3;
    }

    public void setMass3(Double mass3) {
        this.mass3 = mass3;
    }

    public Double getCx() {
        return cx;
    }

    public void setCx(Double cx) {
        this.cx = cx;
    }

    public Double getCy() {
        return cy;
    }

    public void setCy(Double cy) {
        this.cy = cy;
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

    public Double getMaxBiu() {
        return maxBiu;
    }

    public void setMaxBiu(Double maxBiu) {
        this.maxBiu = maxBiu;
    }

    public Double getMaxBiv() {
        return minBiv;
    }

    public void setMaxBiv(Double minBiv) {
        this.minBiv = minBiv;
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

    public Double getMaxSiu() {
        return maxSiu;
    }

    public void setMaxSiu(Double maxSiu) {
        this.maxSiu = maxSiu;
    }

    public Double getMinSiv() {
        return minSiv;
    }

    public void setMinSiv(Double minSiv) {
        this.minSiv = minSiv;
    }

    public Double getZx() {
        return zx;
    }

    public void setZx(Double zx) {
        this.zx = zx;
    }

    public Double getZy() {
        return zy;
    }

    public void setZy(Double zy) {
        this.zy = zy;
    }
}
