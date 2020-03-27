package com.mechw.service.db.nbt4700312009.property.a.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.a.steel.highalloy.AHighAlloyDao;
import com.mechw.model.db.nbt4700312009.property.a.steel.highalloy.AHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.highalloy.AHighAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class AHighAlloyServiceImpl implements AHighAlloyService {

    private AHighAlloyDao aHighAlloyDao;

    public AHighAlloyServiceImpl() {
    }

    @Autowired
    public AHighAlloyServiceImpl(AHighAlloyDao aHighAlloyDao) {
        this.aHighAlloyDao = aHighAlloyDao;
    }

    @Override
    public AHighAlloyResult getDesignA(AHighAlloyQuery aHighAlloyQuery) {
        return aHighAlloyDao.getDesignA(aHighAlloyQuery);
    }

    public AHighAlloyDao getAHighAlloyDao() {
        return aHighAlloyDao;
    }

    @Resource(name = "AHighAlloyDao")
    public void setAHighAlloyDao(AHighAlloyDao aHighAlloyDao) {
        this.aHighAlloyDao = aHighAlloyDao;
    }

}
