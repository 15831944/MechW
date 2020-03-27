package com.mechw.entity.db.gbt7062016;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "table_a_4", catalog = "gbt_706_2016")
public class Table_a_4 {

    @Id
    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "norms")
    private String norms;

    @Column(name = "type")
    private String type;

    @Column(name = "bb_mm")
    private Double bb;

    @Column(name = "sb_mm")
    private Double sb;

    @Column(name = "d_mm")
    private Double d;

    @Column(name = "r_mm")
    private Double r;

    @Column(name = "section_area_cm2")
    private Double sectionArea;

    @Column(name = "mass_kgm")
    private Double mass;

    @Column(name = "outer_area_m2m")
    private Double outerArea;

    @Column(name = "bix_cm4")
    private Double bix;

    @Column(name = "bix1_cm4")
    private Double bix1;

    @Column(name = "biy_cm4")
    private Double biy;

    @Column(name = "biy1_cm4")
    private Double biy1;

    @Column(name = "biu_cm4")
    private Double biu;

    @Column(name = "six_cm")
    private Double six;

    @Column(name = "siy_cm")
    private Double siy;

    @Column(name = "siu_cm")
    private Double siu;

    @Column(name = "wx_cm3")
    private Double wx;

    @Column(name = "wy_cm3")
    private Double wy;

    @Column(name = "wu_cm3")
    private Double wu;

    @Column(name = "tan_alpha")
    private Double tanAlpha;

    @Column(name = "x0_cm")
    private Double x0;

    @Column(name = "y0_cm")
    private Double y0;

    public Table_a_4() {
    }


}
