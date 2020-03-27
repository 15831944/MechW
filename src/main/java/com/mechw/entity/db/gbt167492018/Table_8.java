package com.mechw.entity.db.gbt167492018;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_8", catalog = "gbt_16749_2018")
public class Table_8 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "2rm_h")
    private Double rm2h;

    @Column(name = "182rm_dmtp")
    private Double rm182dmtp;

    @Column(name = "cd")
    private Double cd;

    public Table_8() {
    }

    public Table_8(Double no, Double rm2h, Double rm182dmtp, Double cd) {
        this.no = no;
        this.rm2h = rm2h;
        this.rm182dmtp = rm182dmtp;
        this.cd = cd;
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

    public Double getcd() {
        return cd;
    }

    public void setcd(Double cd) {
        this.cd = cd;
    }
}
