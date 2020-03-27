package com.mechw.dao.db.toolkit.hg206602000;

import com.mechw.entity.db.toolkit.HG206602000;

import java.util.List;

public interface HG206602000Dao {
    List<HG206602000> findAll();

    List<HG206602000> findByName(String name);

    List<HG206602000> findByToxicity(String toxicity);

    List<HG206602000> findByExplosion(String explosion);

    List<HG206602000> findByToxicityAndExplosion(String toxicity, String explosion);
}
