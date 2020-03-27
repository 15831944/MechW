package com.mechw.entity.db.toolkit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hg_20660_2000", catalog = "toolkit")
public class HG206602000 {

    @Id
    @Column(name = "no")
    private Double no;

    @Column(name = "name")
    private String name;

    @Column(name = "toxicity")
    private String toxicity;

    @Column(name = "explosion")
    private String explosion;

    @Column(name = "from")
    private String from;

    public HG206602000() {
    }

    public HG206602000(Double no, String name, String toxicity, String explosion, String from) {
        this.no = no;
        this.name = name;
        this.toxicity = toxicity;
        this.explosion = explosion;
        this.from = from;
    }

    public Double getNo() {
        return no;
    }

    public void setNo(Double no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }
}
