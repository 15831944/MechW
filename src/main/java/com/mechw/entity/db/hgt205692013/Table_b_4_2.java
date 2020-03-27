package com.mechw.entity.db.hgt205692013;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_b_4_2", catalog = "hgt_20569_2013")
public class Table_b_4_2 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "u")
    private Double u;

    @Column(name = "fai_1_u")
    private Double fai1u;

    @Column(name = "x_1_u")
    private Double x1u;

    @Column(name = "x_2_u")
    private Double x2u;

    @Column(name = "miu_1_u")
    private Double miu1u;

    public Table_b_4_2() {
    }

    public Table_b_4_2(Double no, Double u, Double fai1u, Double x1u, Double x2u, Double miu1u) {
        this.no = no;
        this.u = u;
        this.fai1u = fai1u;
        this.x1u = x1u;
        this.x2u = x2u;
        this.miu1u = miu1u;
    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public Double getU() {
        return u;
    }

    public void setU(Double u) {
        this.u = u;
    }

    public Double getFai1u() {
        return fai1u;
    }

    public void setFai1u(Double fai1u) {
        this.fai1u = fai1u;
    }

    public Double getX1u() {
        return x1u;
    }

    public void setX1u(Double x1u) {
        this.x1u = x1u;
    }

    public Double getX2u() {
        return x2u;
    }

    public void setX2u(Double x2u) {
        this.x2u = x2u;
    }

    public Double getMiu1u() {
        return miu1u;
    }

    public void setMiu1u(Double miu1u) {
        this.miu1u = miu1u;
    }

}
