package com.mechw.service.db.toolkit.hgt206602017;

import com.mechw.entity.db.toolkit.HGT206602017;

import java.util.List;

public interface HGT206602017Service {
    List<HGT206602017> findAll();

    List<HGT206602017> findByName(String name);

    List<HGT206602017> findByToxicity(String toxicity);

    List<HGT206602017> findByExplosion(String explosion);

    List<HGT206602017> findByToxicityAndExplosion(String toxicity, String explosion);
}

