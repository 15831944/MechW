package com.mechw.service.db.nbt4700312009.property.e.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.e.steel.lowalloy.ELowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.e.steel.lowalloy.ELowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.lowalloy.ELowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class ELowAlloyServiceImpl implements ELowAlloyService {

    private ELowAlloyDao eLowAlloyDao;

    public ELowAlloyServiceImpl() {
    }

    @Autowired
    public ELowAlloyServiceImpl(ELowAlloyDao eLowAlloyDao) {
        this.eLowAlloyDao = eLowAlloyDao;
    }

    @Override
    public ELowAlloyResult getDesignE(ELowAlloyQuery eLowAlloyQuery) {
        return eLowAlloyDao.getDesignE(eLowAlloyQuery);
    }

    public ELowAlloyDao getELowAlloyDao() {
        return eLowAlloyDao;
    }

    @Resource(name = "ELowAlloyDao")
    public void setELowAlloyDao(ELowAlloyDao eLowAlloyDao) {
        this.eLowAlloyDao = eLowAlloyDao;
    }

}
