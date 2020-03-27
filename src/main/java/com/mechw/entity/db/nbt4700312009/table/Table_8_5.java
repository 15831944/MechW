package com.mechw.entity.db.nbt4700312009.table;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_8_5", catalog = "nbt_47003_1_2009")
public class Table_8_5 {

    // 行号
    @Id
    @Column(name = "no")
    private Double lineNo;

    @Column(name = "ba")
    private Double ba;

    @Column(name = "alpha")
    private Double alpha;

    @Column(name = "beta")
    private Double beta;

    public Table_8_5() {
    }

    public Table_8_5(Double lineNo, Double ba, Double alpha, Double beta) {
        this.lineNo = lineNo;
        this.ba = ba;
        this.alpha = alpha;
        this.beta = beta;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public Double getBa() {
        return ba;
    }

    public void setBa(Double ba) {
        this.ba = ba;
    }

    public Double getAlpha() {
        return alpha;
    }

    public void setAlpha(Double alpha) {
        this.alpha = alpha;
    }

    public Double getBeta() {
        return beta;
    }

    public void setBeta(Double beta) {
        this.beta = beta;
    }

}
