package com.mechw.entity.db.asmeviii12017;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "index", catalog = "asme_bpvc_viii_1_2017")
public class ASMEVIII12017Index implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "index")
    private Double index;

    @Id
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

    @Column(name = "spec_no")
    private String specNo;

    @Column(name = "type_grade")
    private String typeGrade;

    @Column(name = "alloy_desig_uns_no")
    private String alloyDesigUNSNo;

    @Column(name = "class_condition_temper")
    private String classConditionTemper;

    @Column(name = "thk_min")
    private Double thkMin;

    @Column(name = "thk_max")
    private Double thkMax;

    @Column(name = "od_min")
    private Double odMin;

    @Column(name = "od_max")
    private Double odMax;

    @Column(name = "p_no")
    private String pNo;

    @Column(name = "group_no")
    private String groupNo;

    @Column(name = "poisson_ratio")
    private Double poissonRatio;

    @Column(name = "density")
    private Double density;

    @Column(name = "temp_max_viii_1")
    private Double tempMaxVIII1;

    @Column(name = "external_pressure_chart_no")
    private String externalPressureChartNo;

    @Column(name = "cs_low_alloy")
    private String csLowAlloy;

    @Column(name = "ucs_66_curve")
    private String ucs66Curve;

    public ASMEVIII12017Index() {
    }

    public ASMEVIII12017Index(Double index, Double tableIndex, String from, Double page, Double lineNo, String nominalComposition, String productForm, String materialName, String specNo, String typeGrade, String alloyDesigUNSNo, String classConditionTemper, Double thkMin, Double thkMax, Double odMin, Double odMax, String pNo, String groupNo, Double poissonRatio, Double density, Double tempMaxVIII1, String externalPressureChartNo, String csLowAlloy, String ucs66Curve) {
        this.index = index;
        this.tableIndex = tableIndex;
        this.from = from;
        this.page = page;
        this.lineNo = lineNo;
        this.nominalComposition = nominalComposition;
        this.productForm = productForm;
        this.materialName = materialName;
        this.specNo = specNo;
        this.typeGrade = typeGrade;
        this.alloyDesigUNSNo = alloyDesigUNSNo;
        this.classConditionTemper = classConditionTemper;
        this.thkMin = thkMin;
        this.thkMax = thkMax;
        this.odMin = odMin;
        this.odMax = odMax;
        this.pNo = pNo;
        this.groupNo = groupNo;
        this.poissonRatio = poissonRatio;
        this.density = density;
        this.tempMaxVIII1 = tempMaxVIII1;
        this.externalPressureChartNo = externalPressureChartNo;
        this.csLowAlloy = csLowAlloy;
        this.ucs66Curve = ucs66Curve;
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

    public String getSpecNo() {
        return specNo;
    }

    public void setSpecNo(String specNo) {
        this.specNo = specNo;
    }

    public String getTypeGrade() {
        return typeGrade;
    }

    public void setTypeGrade(String typeGrade) {
        this.typeGrade = typeGrade;
    }

    public String getAlloyDesigUNSNo() {
        return alloyDesigUNSNo;
    }

    public void setAlloyDesigUNSNo(String alloyDesigUNSNo) {
        this.alloyDesigUNSNo = alloyDesigUNSNo;
    }

    public String getClassConditionTemper() {
        return classConditionTemper;
    }

    public void setClassConditionTemper(String classConditionTemper) {
        this.classConditionTemper = classConditionTemper;
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

    public String getpNo() {
        return pNo;
    }

    public void setpNo(String pNo) {
        this.pNo = pNo;
    }

    public String getGroupNo() {
        return groupNo;
    }

    public void setGroupNo(String groupNo) {
        this.groupNo = groupNo;
    }

    public Double getPoissonRatio() {
        return poissonRatio;
    }

    public void setPoissonRatio(Double poissonRatio) {
        this.poissonRatio = poissonRatio;
    }

    public Double getDensity() {
        return density;
    }

    public void setDensity(Double density) {
        this.density = density;
    }

    public Double getTempMaxVIII1() {
        return tempMaxVIII1;
    }

    public void setTempMaxVIII1(Double tempMaxVIII1) {
        this.tempMaxVIII1 = tempMaxVIII1;
    }

    public String getExternalPressureChartNo() {
        return externalPressureChartNo;
    }

    public void setExternalPressureChartNo(String externalPressureChartNo) {
        this.externalPressureChartNo = externalPressureChartNo;
    }

    public String getCsLowAlloy() {
        return csLowAlloy;
    }

    public void setCsLowAlloy(String csLowAlloy) {
        this.csLowAlloy = csLowAlloy;
    }

    public String getUcs66Curve() {
        return ucs66Curve;
    }

    public void setUcs66Curve(String ucs66Curve) {
        this.ucs66Curve = ucs66Curve;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    @Override
    public String toString() {
        return super.toString();
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
    }
}
