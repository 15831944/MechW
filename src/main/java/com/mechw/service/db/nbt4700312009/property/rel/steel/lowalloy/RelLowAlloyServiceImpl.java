package com.mechw.service.db.nbt4700312009.property.rel.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.rel.steel.lowalloy.RelLowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.rel.steel.lowalloy.RelLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.lowalloy.RelLowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class RelLowAlloyServiceImpl implements RelLowAlloyService {

    private RelLowAlloyDao relLowAlloyDao;

    public RelLowAlloyServiceImpl() {
    }

    @Autowired
    public RelLowAlloyServiceImpl(RelLowAlloyDao relLowAlloyDao) {
        this.relLowAlloyDao = relLowAlloyDao;
    }

    @Override
    public RelLowAlloyResult getDesignRel(RelLowAlloyQuery relLowAlloyQuery) {
        return relLowAlloyDao.getDesignRel(relLowAlloyQuery);
    }

    public RelLowAlloyDao getRelLowAlloyDao() {
        return relLowAlloyDao;
    }

    @Resource(name = "RelLowAlloyDao")
    public void setRelLowAlloyDao(RelLowAlloyDao relLowAlloyDao) {
        this.relLowAlloyDao = relLowAlloyDao;
    }

}
