package com.mechw.entity.db.gbt167492018;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_7", catalog = "gbt_16749_2018")
public class Table_7 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "661r2_dmtp")
    private Double r2661dmtp;

    @Column(name = "b1")
    private Double b1;

    @Column(name = "b2")
    private Double b2;

    @Column(name = "b3")
    private Double b3;

    public Table_7() {
    }

    public Table_7(Double no, Double r2661dmtp, Double b1, Double b2, Double b3) {
        this.no = no;
        this.r2661dmtp = r2661dmtp;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public Double getR2661dmtp() {
        return r2661dmtp;
    }

    public void setR2661dmtp(Double r2661dmtp) {
        this.r2661dmtp = r2661dmtp;
    }

    public Double getB1() {
        return b1;
    }

    public void setB1(Double b1) {
        this.b1 = b1;
    }

    public Double getB2() {
        return b2;
    }

    public void setB2(Double b2) {
        this.b2 = b2;
    }

    public Double getB3() {
        return b3;
    }

    public void setB3(Double b3) {
        this.b3 = b3;
    }
}
