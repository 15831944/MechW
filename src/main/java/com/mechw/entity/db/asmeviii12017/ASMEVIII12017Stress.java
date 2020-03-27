package com.mechw.entity.db.asmeviii12017;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "stress", catalog = "asme_bpvc_viii_1_2017")
public class ASMEVIII12017Stress {

    @Id
    @Column(name = "index")
    private Double index;

    @Column(name = "table_index")
    private Double tableIndex;

    @Column(name = "from")
    private String from;

    @Column(name = "page")
    private Double page;

    @Column(name = "line_no")
    private Double lineNo;

    @Column(name = "nominal_composition")
    private String nominalComposition;

    @Column(name = "product_form")
    private String productForm;

    @Column(name = "material_name")
    private String materialName;

    @Column(name = "thk_min")
    private Double thkMin;

    @Column(name = "thk_max")
    private Double thkMax;

    @Column(name = "od_min")
    private Double odMin;

    @Column(name = "od_max")
    private Double odMax;

    @Column(name = "notes")
    private String notes;

    @Column(name = "rm")
    private Double rm;

    @Column(name = "rel")
    private Double rel;

    @Column(name = "tag_temp")
    private Double tagTemp;

    @Column(name = "high_low")
    private Double highLow;

    @Column(name = "p40")
    private Double p40;

    @Column(name = "p65")
    private Double p65;

    @Column(name = "p100")
    private Double p100;

    @Column(name = "p125")
    private Double p125;

    @Column(name = "p150")
    private Double p150;

    @Column(name = "p175")
    private Double p175;

    @Column(name = "p200")
    private Double p200;

    @Column(name = "p225")
    private Double p225;

    @Column(name = "p250")
    private Double p250;

    @Column(name = "p275")
    private Double p275;

    @Column(name = "p300")
    private Double p300;

    @Column(name = "p325")
    private Double p325;

    @Column(name = "p350")
    private Double p350;

    @Column(name = "p375")
    private Double p375;

    @Column(name = "p400")
    private Double p400;

    @Column(name = "p425")
    private Double p425;

    @Column(name = "p450")
    private Double p450;

    @Column(name = "p475")
    private Double p475;

    @Column(name = "p500")
    private Double p500;

    @Column(name = "p525")
    private Double p525;

    @Column(name = "p550")
    private Double p550;

    @Column(name = "p575")
    private Double p575;

    @Column(name = "p600")
    private Double p600;

    @Column(name = "p625")
    private Double p625;

    @Column(name = "p650")
    private Double p650;

    @Column(name = "p675")
    private Double p675;

    @Column(name = "p700")
    private Double p700;

    @Column(name = "p725")
    private Double p725;

    @Column(name = "p750")
    private Double p750;

    @Column(name = "p775")
    private Double p775;

    @Column(name = "p800")
    private Double p800;

    @Column(name = "p825")
    private Double p825;

    @Column(name = "p850")
    private Double p850;

    @Column(name = "p875")
    private Double p875;

    @Column(name = "p900")
    private Double p900;

    public ASMEVIII12017Stress() {
    }

    public ASMEVIII12017Stress(Double index, Double tableIndex, String from, Double page, Double lineNo, String nominalComposition, String productForm, String materialName, Double thkMin, Double thkMax, Double odMin, Double odMax, String notes, Double rm, Double rel, Double tagTemp, Double highLow, Double p40, Double p65, Double p100, Double p125, Double p150, Double p175, Double p200, Double p225, Double p250, Double p275, Double p300, Double p325, Double p350, Double p375, Double p400, Double p425, Double p450, Double p475, Double p500, Double p525, Double p550, Double p575, Double p600, Double p625, Double p650, Double p675, Double p700, Double p725, Double p750, Double p775, Double p800, Double p825, Double p850, Double p875, Double p900) {
        this.index = index;
        this.tableIndex = tableIndex;
        this.from = from;
        this.page = page;
        this.lineNo = lineNo;
        this.nominalComposition = nominalComposition;
        this.productForm = productForm;
        this.materialName = materialName;
        this.thkMin = thkMin;
        this.thkMax = thkMax;
        this.odMin = odMin;
        this.odMax = odMax;
        this.notes = notes;
        this.rm = rm;
        this.rel = rel;
        this.tagTemp = tagTemp;
        this.highLow = highLow;
        this.p40 = p40;
        this.p65 = p65;
        this.p100 = p100;
        this.p125 = p125;
        this.p150 = p150;
        this.p175 = p175;
        this.p200 = p200;
        this.p225 = p225;
        this.p250 = p250;
        this.p275 = p275;
        this.p300 = p300;
        this.p325 = p325;
        this.p350 = p350;
        this.p375 = p375;
        this.p400 = p400;
        this.p425 = p425;
        this.p450 = p450;
        this.p475 = p475;
        this.p500 = p500;
        this.p525 = p525;
        this.p550 = p550;
        this.p575 = p575;
        this.p600 = p600;
        this.p625 = p625;
        this.p650 = p650;
        this.p675 = p675;
        this.p700 = p700;
        this.p725 = p725;
        this.p750 = p750;
        this.p775 = p775;
        this.p800 = p800;
        this.p825 = p825;
        this.p850 = p850;
        this.p875 = p875;
        this.p900 = p900;
    }

    // 将许用应力部分转化为Map
    public Map<Double, Double> toMap() {

        Map<Double, Double> stressMap = new HashMap<>();

        if (this.p40 != null) {
            stressMap.put(40.0, p40);
        }
        if (this.p65 != null) {
            stressMap.put(65.0, p65);
        }
        if (this.p100 != null) {
            stressMap.put(100.0, p100);
        }
        if (this.p125 != null) {
            stressMap.put(125.0, p125);
        }
        if (this.p150 != null) {
            stressMap.put(150.0, p150);
        }
        if (this.p175 != null) {
            stressMap.put(175.0, p175);
        }
        if (this.p200 != null) {
            stressMap.put(200.0, p200);
        }
        if (this.p225 != null) {
            stressMap.put(225.0, p225);
        }
        if (this.p250 != null) {
            stressMap.put(250.0, p250);
        }
        if (this.p275 != null) {
            stressMap.put(275.0, p275);
        }
        if (this.p300 != null) {
            stressMap.put(300.0, p300);
        }
        if (this.p325 != null) {
            stressMap.put(325.0, p325);
        }
        if (this.p350 != null) {
            stressMap.put(350.0, p350);
        }
        if (this.p375 != null) {
            stressMap.put(375.0, p375);
        }
        if (this.p400 != null) {
            stressMap.put(400.0, p400);
        }
        if (this.p425 != null) {
            stressMap.put(425.0, p425);
        }
        if (this.p450 != null) {
            stressMap.put(450.0, p450);
        }
        if (this.p475 != null) {
            stressMap.put(475.0, p475);
        }
        if (this.p500 != null) {
            stressMap.put(500.0, p500);
        }
        if (this.p525 != null) {
            stressMap.put(525.0, p525);
        }
        if (this.p550 != null) {
            stressMap.put(550.0, p550);
        }
        if (this.p575 != null) {
            stressMap.put(575.0, p575);
        }
        if (this.p600 != null) {
            stressMap.put(600.0, p600);
        }
        if (this.p625 != null) {
            stressMap.put(625.0, p625);
        }
        if (this.p650 != null) {
            stressMap.put(650.0, p650);
        }
        if (this.p675 != null) {
            stressMap.put(675.0, p675);
        }
        if (this.p700 != null) {
            stressMap.put(700.0, p700);
        }
        if (this.p725 != null) {
            stressMap.put(725.0, p725);
        }
        if (this.p750 != null) {
            stressMap.put(750.0, p750);
        }
        if (this.p775 != null) {
            stressMap.put(775.0, p775);
        }
        if (this.p800 != null) {
            stressMap.put(800.0, p800);
        }
        if (this.p825 != null) {
            stressMap.put(825.0, p825);
        }
        if (this.p850 != null) {
            stressMap.put(850.0, p850);
        }
        if (this.p875 != null) {
            stressMap.put(875.0, p875);
        }
        if (this.p900 != null) {
            stressMap.put(900.0, p900);
        }

        return stressMap;
    }

    public Double getIndex() {
        return index;
    }

    public void setIndex(Double index) {
        this.index = index;
    }

    public Double getTableIndex() {
        return tableIndex;
    }

    public void setTableIndex(Double tableIndex) {
        this.tableIndex = tableIndex;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public Double getPage() {
        return page;
    }

    public void setPage(Double page) {
        this.page = page;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public String getNominalComposition() {
        return nominalComposition;
    }

    public void setNominalComposition(String nominalComposition) {
        this.nominalComposition = nominalComposition;
    }

    public String getProductForm() {
        return productForm;
    }

    public void setProductForm(String productForm) {
        this.productForm = productForm;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public Double getThkMin() {
        return thkMin;
    }

    public void setThkMin(Double thkMin) {
        this.thkMin = thkMin;
    }

    public Double getThkMax() {
        return thkMax;
    }

    public void setThkMax(Double thkMax) {
        this.thkMax = thkMax;
    }

    public Double getOdMin() {
        return odMin;
    }

    public void setOdMin(Double odMin) {
        this.odMin = odMin;
    }

    public Double getOdMax() {
        return odMax;
    }

    public void setOdMax(Double odMax) {
        this.odMax = odMax;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Double getRm() {
        return rm;
    }

    public void setRm(Double rm) {
        this.rm = rm;
    }

    public Double getRel() {
        return rel;
    }

    public void setRel(Double rel) {
        this.rel = rel;
    }

    public Double getTagTemp() {
        return tagTemp;
    }

    public void setTagTemp(Double tagTemp) {
        this.tagTemp = tagTemp;
    }

    public Double getHighLow() {
        return highLow;
    }

    public void setHighLow(Double highLow) {
        this.highLow = highLow;
    }

    public Double getP40() {
        return p40;
    }

    public void setP40(Double p40) {
        this.p40 = p40;
    }

    public Double getP65() {
        return p65;
    }

    public void setP65(Double p65) {
        this.p65 = p65;
    }

    public Double getP100() {
        return p100;
    }

    public void setP100(Double p100) {
        this.p100 = p100;
    }

    public Double getP125() {
        return p125;
    }

    public void setP125(Double p125) {
        this.p125 = p125;
    }

    public Double getP150() {
        return p150;
    }

    public void setP150(Double p150) {
        this.p150 = p150;
    }

    public Double getP175() {
        return p175;
    }

    public void setP175(Double p175) {
        this.p175 = p175;
    }

    public Double getP200() {
        return p200;
    }

    public void setP200(Double p200) {
        this.p200 = p200;
    }

    public Double getP225() {
        return p225;
    }

    public void setP225(Double p225) {
        this.p225 = p225;
    }

    public Double getP250() {
        return p250;
    }

    public void setP250(Double p250) {
        this.p250 = p250;
    }

    public Double getP275() {
        return p275;
    }

    public void setP275(Double p275) {
        this.p275 = p275;
    }

    public Double getP300() {
        return p300;
    }

    public void setP300(Double p300) {
        this.p300 = p300;
    }

    public Double getP325() {
        return p325;
    }

    public void setP325(Double p325) {
        this.p325 = p325;
    }

    public Double getP350() {
        return p350;
    }

    public void setP350(Double p350) {
        this.p350 = p350;
    }

    public Double getP375() {
        return p375;
    }

    public void setP375(Double p375) {
        this.p375 = p375;
    }

    public Double getP400() {
        return p400;
    }

    public void setP400(Double p400) {
        this.p400 = p400;
    }

    public Double getP425() {
        return p425;
    }

    public void setP425(Double p425) {
        this.p425 = p425;
    }

    public Double getP450() {
        return p450;
    }

    public void setP450(Double p450) {
        this.p450 = p450;
    }

    public Double getP475() {
        return p475;
    }

    public void setP475(Double p475) {
        this.p475 = p475;
    }

    public Double getP500() {
        return p500;
    }

    public void setP500(Double p500) {
        this.p500 = p500;
    }

    public Double getP525() {
        return p525;
    }

    public void setP525(Double p525) {
        this.p525 = p525;
    }

    public Double getP550() {
        return p550;
    }

    public void setP550(Double p550) {
        this.p550 = p550;
    }

    public Double getP575() {
        return p575;
    }

    public void setP575(Double p575) {
        this.p575 = p575;
    }

    public Double getP600() {
        return p600;
    }

    public void setP600(Double p600) {
        this.p600 = p600;
    }

    public Double getP625() {
        return p625;
    }

    public void setP625(Double p625) {
        this.p625 = p625;
    }

    public Double getP650() {
        return p650;
    }

    public void setP650(Double p650) {
        this.p650 = p650;
    }

    public Double getP675() {
        return p675;
    }

    public void setP675(Double p675) {
        this.p675 = p675;
    }

    public Double getP700() {
        return p700;
    }

    public void setP700(Double p700) {
        this.p700 = p700;
    }

    public Double getP725() {
        return p725;
    }

    public void setP725(Double p725) {
        this.p725 = p725;
    }

    public Double getP750() {
        return p750;
    }

    public void setP750(Double p750) {
        this.p750 = p750;
    }

    public Double getP775() {
        return p775;
    }

    public void setP775(Double p775) {
        this.p775 = p775;
    }

    public Double getP800() {
        return p800;
    }

    public void setP800(Double p800) {
        this.p800 = p800;
    }

    public Double getP825() {
        return p825;
    }

    public void setP825(Double p825) {
        this.p825 = p825;
    }

    public Double getP850() {
        return p850;
    }

    public void setP850(Double p850) {
        this.p850 = p850;
    }

    public Double getP875() {
        return p875;
    }

    public void setP875(Double p875) {
        this.p875 = p875;
    }

    public Double getP900() {
        return p900;
    }

    public void setP900(Double p900) {
        this.p900 = p900;
    }
}
