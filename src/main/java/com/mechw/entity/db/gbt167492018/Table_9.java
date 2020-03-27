package com.mechw.entity.db.gbt167492018;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_9", catalog = "gbt_16749_2018")
public class Table_9 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "2rm_h")
    private Double rm2h;

    @Column(name = "182rm_dmtp")
    private Double rm182dmtp;

    @Column(name = "cf")
    private Double cf;

    public Table_9() {
    }

    public Table_9(Double no, Double rm2h, Double rm182dmtp, Double cf) {
        this.no = no;
        this.rm2h = rm2h;
        this.rm182dmtp = rm182dmtp;
        this.cf = cf;
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

    public Double getcf() {
        return cf;
    }

    public void setcf(Double cf) {
        this.cf = cf;
    }
}
