package com.mechw.entity.db.gbt1502011.chart;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "chart_5_12", catalog = "gbt_150_2011")
public class Chart_5_12 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "alpha")
    private Double alpha;

    @Column(name = "thkrl")
    private Double thkrl;

    @Column(name = "q1")
    private Double q1;

    public Chart_5_12() {
    }

    public Chart_5_12(Double no, Double alpha, Double thkrl, Double q1) {
        this.no = no;
        this.alpha = alpha;
        this.thkrl = thkrl;
        this.q1 = q1;
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

    public Double getThkrl() {
        return thkrl;
    }

    public void setThkrl(Double thkrl) {
        this.thkrl = thkrl;
    }

    public Double getQ1() {
        return q1;
    }

    public void setQ1(Double q1) {
        this.q1 = q1;
    }
}
