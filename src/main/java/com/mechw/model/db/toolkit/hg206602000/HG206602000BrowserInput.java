package com.mechw.model.db.toolkit.hg206602000;


public class HG206602000BrowserInput {

    private String toxicity;
    private String explosion;

    public HG206602000BrowserInput() {
    }

    public HG206602000BrowserInput(String toxicity, String explosion) {
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
