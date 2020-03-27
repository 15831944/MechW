package com.mechw.entity.db.gbt167492018;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_10", catalog = "gbt_16749_2018")
public class Table_10 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "2rm_h")
    private Double rm2h;

    @Column(name = "182rm_dmtp")
    private Double rm182dmtp;

    @Column(name = "cp")
    private Double cp;

    public Table_10() {
    }

    public Table_10(Double no, Double rm2h, Double rm182dmtp, Double cp) {
        this.no = no;
        this.rm2h = rm2h;
        this.rm182dmtp = rm182dmtp;
        this.cp = cp;
    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public Double getRm2h() {
        return rm2h;
    }

    public void setRm2h(Double rm2h) {
        this.rm2h = rm2h;
    }

    public Double getRm182dmtp() {
        return rm182dmtp;
    }

    public void setRm182dmtp(Double rm182dmtp) {
        this.rm182dmtp = rm182dmtp;
    }

    public Double getCp() {
        return cp;
    }

    public void setCp(Double cp) {
        this.cp = cp;
    }
}
