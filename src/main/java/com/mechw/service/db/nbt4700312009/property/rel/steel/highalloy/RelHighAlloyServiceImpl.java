package com.mechw.service.db.nbt4700312009.property.rel.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.rel.steel.highalloy.RelHighAlloyDao;
import com.mechw.model.db.nbt4700312009.property.rel.steel.highalloy.RelHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.highalloy.RelHighAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class RelHighAlloyServiceImpl implements RelHighAlloyService {

    private RelHighAlloyDao relHighAlloyDao;

    public RelHighAlloyServiceImpl() {
    }

    @Autowired
    public RelHighAlloyServiceImpl(RelHighAlloyDao relHighAlloyDao) {
        this.relHighAlloyDao = relHighAlloyDao;
    }

    @Override
    public RelHighAlloyResult getDesignRel(RelHighAlloyQuery relHighAlloyQuery) {
        return relHighAlloyDao.getDesignRel(relHighAlloyQuery);
    }

    public RelHighAlloyDao getRelHighAlloyDao() {
        return relHighAlloyDao;
    }

    @Resource(name = "RelHighAlloyDao")
    public void setRelHighAlloyDao(RelHighAlloyDao relHighAlloyDao) {
        this.relHighAlloyDao = relHighAlloyDao;
    }

}
