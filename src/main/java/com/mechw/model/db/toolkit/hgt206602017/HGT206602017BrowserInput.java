package com.mechw.model.db.toolkit.hgt206602017;


public class HGT206602017BrowserInput {

    private String toxicity;
    private String explosion;

    public HGT206602017BrowserInput() {
    }

    public HGT206602017BrowserInput(String toxicity, String explosion) {
        this.toxicity = toxicity;
        this.explosion = explosion;
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
}
