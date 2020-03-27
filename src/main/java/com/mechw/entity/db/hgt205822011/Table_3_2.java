package com.mechw.entity.db.hgt205822011;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_3_2", catalog = "hgt_20582_2011")
public class Table_3_2 {

    // 行号
    @Id
    @Column(name = "no")
    private Double lineNo;

    @Column(name = "jacket_do")
    private Double jacketDo;

    @Column(name = "shell_di")
    private Double shellDi;

    @Column(name = "shell_thk")
    private Double shellThk;

    @Column(name = "k")
    private Double k;

    public Table_3_2() {
    }

    public Table_3_2(Double lineNo, Double jacketDo, Double shellDi, Double shellThk, Double k) {
        this.lineNo = lineNo;
        this.jacketDo = jacketDo;
        this.shellDi = shellDi;
        this.shellThk = shellThk;
        this.k = k;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public Double getJacketDo() {
        return jacketDo;
    }

    public void setJacketDo(Double jacketDo) {
        this.jacketDo = jacketDo;
    }

    public Double getShellDi() {
        return shellDi;
    }

    public void setShellDi(Double shellDi) {
        this.shellDi = shellDi;
    }

    public Double getShellThk() {
        return shellThk;
    }

    public void setShellThk(Double shellThk) {
        this.shellThk = shellThk;
    }

    public Double getK() {
        return k;
    }

    public void setK(Double k) {
        this.k = k;
    }
}
