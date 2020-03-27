package com.mechw.entity.payjs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "payjs_product", catalog = "payjs")
public class PJProduct {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "ribbon_name")
    private String ribbonName;

    @Column(name = "title")
    private String title;

    @Column(name = "total_fee")
    private int totalFee;

    public PJProduct() {
    }

    public PJProduct(Double lineNo, String ribbonName, String title, int totalFee) {
        this.lineNo = lineNo;
        this.ribbonName = ribbonName;
        this.title = title;
        this.totalFee = totalFee;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(int totalFee) {
        this.totalFee = totalFee;
    }
}
