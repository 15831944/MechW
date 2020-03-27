package com.mechw.entity.db.toolkit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hgt_20660_2017", catalog = "toolkit")
public class HGT206602017 {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "table_name")
    private String tableName;

    @Column(name = "table_no")
    private String tableNo;

    @Column(name = "name_chn")
    private String nameChn;

    @Column(name = "aliases")
    private String aliases;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "formula")
    private String formula;

    @Column(name = "toxicity")
    private String toxicity;

    @Column(name = "explosion")
    private String explosion;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "from")
    private String from;

    public HGT206602017() {
    }

    public HGT206602017(Double lineNo, String tableName, String tableNo, String nameChn, String aliases, String nameEn, String formula, String toxicity, String explosion, String remarks, String from) {
        this.lineNo = lineNo;
        this.tableName = tableName;
        this.tableNo = tableNo;
        this.nameChn = nameChn;
        this.aliases = aliases;
        this.nameEn = nameEn;
        this.formula = formula;
        this.toxicity = toxicity;
        this.explosion = explosion;
        this.remarks = remarks;
        this.from = from;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTableNo() {
        return tableNo;
    }

    public void setTableNo(String tableNo) {
        this.tableNo = tableNo;
    }

    public String getNameChn() {
        return nameChn;
    }

    public void setNameChn(String nameChn) {
        this.nameChn = nameChn;
    }

    public String getAliases() {
        return aliases;
    }

    public void setAliases(String aliases) {
        this.aliases = aliases;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    public String getToxicity() {
        return toxicity;
    }

    public void setToxicity(String toxicity) {
        this.toxicity = toxicity;
    }

    public String getExplosion() {
        return explosion;
    }

    public void setExplosion(String explosion) {
        this.explosion = explosion;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

}
