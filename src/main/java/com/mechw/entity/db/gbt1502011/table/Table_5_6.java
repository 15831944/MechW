package com.mechw.entity.db.gbt1502011.table;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_5_6", catalog = "gbt_150_2011")
public class Table_5_6 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "alpha")
    private Double alpha;

    @Column(name = "rdil")
    private Double rdil;

    @Column(name = "k")
    private Double k;

    public Table_5_6() {
    }

    public Table_5_6(Double no, Double alpha, Double rdil, Double k) {
        this.no = no;
        this.alpha = alpha;
        this.rdil = rdil;
        this.k = k;
    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public Double getAlpha() {
        return alpha;
    }

    public void setAlpha(Double alpha) {
        this.alpha = alpha;
    }

    public Double getRdil() {
        return rdil;
    }

    public void setRdil(Double rdil) {
        this.rdil = rdil;
    }

    public Double getK() {
        return k;
    }

    public void setK(Double k) {
        this.k = k;
    }
}
