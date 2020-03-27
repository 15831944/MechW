package com.mechw.service.db.toolkit.hg206602000;

import com.mechw.dao.db.toolkit.hg206602000.HG206602000Dao;
import com.mechw.entity.db.toolkit.HG206602000;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Service
public class HG206602000ServiceImpl implements HG206602000Service {

    private HG206602000Dao hg206602000Dao;

    public HG206602000ServiceImpl() {
    }

    @Autowired
    public HG206602000ServiceImpl(HG206602000Dao hg206602000Dao) {
        this.hg206602000Dao = hg206602000Dao;
    }

    public List<HG206602000> findAll() {
        return this.hg206602000Dao.findAll();
    }

    public List<HG206602000> findByName(String name) {
        return this.hg206602000Dao.findByName(name);
    }

    public List<HG206602000> findByToxicity(String toxicity) {
        return this.hg206602000Dao.findByToxicity(toxicity);
    }

    public List<HG206602000> findByExplosion(String explosion) {
        return this.hg206602000Dao.findByExplosion(explosion);
    }

    public List<HG206602000> findByToxicityAndExplosion(String toxicity, String explosion) {
        return this.hg206602000Dao.findByToxicityAndExplosion(toxicity, explosion);
    }

    @Resource(name = "HG206602000Dao")
    public void setHg20660Dao(HG206602000Dao hg206602000Dao) {
        this.hg206602000Dao = hg206602000Dao;
    }

    public HG206602000Dao getHg206602000Dao() {
        return this.hg206602000Dao;
    }

}
