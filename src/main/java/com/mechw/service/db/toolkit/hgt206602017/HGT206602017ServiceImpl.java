package com.mechw.service.db.toolkit.hgt206602017;

import com.mechw.dao.db.toolkit.hgt206602017.HGT206602017Dao;
import com.mechw.entity.db.toolkit.HGT206602017;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Service
public class HGT206602017ServiceImpl implements HGT206602017Service {

    private HGT206602017Dao hgt206602017Dao;

    public HGT206602017ServiceImpl() {
    }

    @Autowired
    public HGT206602017ServiceImpl(HGT206602017Dao hgt206602017Dao) {
        this.hgt206602017Dao = hgt206602017Dao;
    }

    public List<HGT206602017> findAll() {
        return this.hgt206602017Dao.findAll();
    }

    public List<HGT206602017> findByName(String name) {
        return this.hgt206602017Dao.findByName(name);
    }

    public List<HGT206602017> findByToxicity(String toxicity) {
        return this.hgt206602017Dao.findByToxicity(toxicity);
    }

    public List<HGT206602017> findByExplosion(String explosion) {
        return this.hgt206602017Dao.findByExplosion(explosion);
    }

    public List<HGT206602017> findByToxicityAndExplosion(String toxicity, String explosion) {
        return this.hgt206602017Dao.findByToxicityAndExplosion(toxicity, explosion);
    }

    @Resource(name = "HGT206602017Dao")
    public void setHg20660Dao(HGT206602017Dao hgt206602017Dao) {
        this.hgt206602017Dao = hgt206602017Dao;
    }

    public HGT206602017Dao getHg206602000Dao() {
        return this.hgt206602017Dao;
    }

}
