package com.mechw.entity.db.gbt1502011.table;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_b_2", catalog = "gbt_150_2011")
public class Table_b_2 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "re")
    private String re;

    @Column(name = "zeta")
    private String zeta;

    public Table_b_2() {
    }

    public Table_b_2(Double no, String re, String zeta) {
        this.no = no;
        this.re = re;
        this.zeta = zeta;
    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public String getRe() {
        return re;
    }

    public void setRe(String re) {
        this.re = re;
    }

    public String getZeta() {
        return zeta;
    }

    public void setZeta(String zeta) {
        this.zeta = zeta;
    }
}
