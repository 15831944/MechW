package com.mechw.service.db.nbt4700312009.property.e.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.e.steel.highalloy.EHighAlloyDao;
import com.mechw.model.db.nbt4700312009.property.e.steel.highalloy.EHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.highalloy.EHighAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class EHighAlloyServiceImpl implements EHighAlloyService {

    private EHighAlloyDao eHighAlloyDao;

    public EHighAlloyServiceImpl() {
    }

    @Autowired
    public EHighAlloyServiceImpl(EHighAlloyDao eHighAlloyDao) {
        this.eHighAlloyDao = eHighAlloyDao;
    }

    @Override
    public EHighAlloyResult getDesignE(EHighAlloyQuery eHighAlloyQuery) {
        return eHighAlloyDao.getDesignE(eHighAlloyQuery);
    }

    public EHighAlloyDao getEHighAlloyDao() {
        return eHighAlloyDao;
    }

    @Resource(name = "EHighAlloyDao")
    public void setEHighAlloyDao(EHighAlloyDao eHighAlloyDao) {
        this.eHighAlloyDao = eHighAlloyDao;
    }

}
