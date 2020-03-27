package com.mechw.entity.db.gbt1502011.chart;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "chart_5_15", catalog = "gbt_150_2011")
public class Chart_5_15 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "alpha")
    private Double alpha;

    @Column(name = "thkrs")
    private Double thkrs;

    @Column(name = "q2")
    private Double q2;

    public Chart_5_15() {
    }

    public Chart_5_15(Double no, Double alpha, Double thkrs, Double q2) {
        this.no = no;
        this.alpha = alpha;
        this.thkrs = thkrs;
        this.q2 = q2;
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

    public Double getThkrs() {
        return thkrs;
    }

    public void setThkrs(Double thkrs) {
        this.thkrs = thkrs;
    }

    public Double getQ2() {
        return q2;
    }

    public void setQ2(Double q2) {
        this.q2 = q2;
    }
}
