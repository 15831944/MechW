package com.mechw.model.db.asmeviii12017.stress;

public class ASMEVIII12017StressResult {

    private String nominalComposition;
    private String notes;
    private double rm;
    private double rel;
    private double tagTemp;
    private double tagStress;
    private double designStress;
    private double ambientStress;

    public ASMEVIII12017StressResult() {
    }

    public ASMEVIII12017StressResult(String nominalComposition, String notes, double rm, double rel, double tagTemp, double tagStress, double designStress, double ambientStress) {
        this.nominalComposition = nominalComposition;
        this.notes = notes;
        this.rm = rm;
        this.rel = rel;
        this.tagTemp = tagTemp;
        this.tagStress = tagStress;
        this.designStress = designStress;
        this.ambientStress = ambientStress;
    }

    public String getNominalComposition() {
        return nominalComposition;
    }

    public void setNominalComposition(String nominalComposition) {
        this.nominalComposition = nominalComposition;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public double getRm() {
        return rm;
    }

    public void setRm(double rm) {
        this.rm = rm;
    }

    public double getRel() {
        return rel;
    }

    public void setRel(double rel) {
        this.rel = rel;
    }

    public double getTagTemp() {
        return tagTemp;
    }

    public void setTagTemp(double tagTemp) {
        this.tagTemp = tagTemp;
    }

    public double getTagStress() {
        return tagStress;
    }

    public void setTagStress(double tagStress) {
        this.tagStress = tagStress;
    }

    public double getDesignStress() {
        return designStress;
    }

    public void setDesignStress(double designStress) {
        this.designStress = designStress;
    }

    public double getAmbientStress() {
        return ambientStress;
    }

    public void setAmbientStress(double ambientStress) {
        this.ambientStress = ambientStress;
    }
}
