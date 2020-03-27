package com.mechw.service.db.nbt4700312009.property.a.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.a.steel.lowalloy.ALowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.a.steel.lowalloy.ALowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.lowalloy.ALowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class ALowAlloyServiceImpl implements ALowAlloyService {

    private ALowAlloyDao aLowAlloyDao;

    public ALowAlloyServiceImpl() {
    }

    @Autowired
    public ALowAlloyServiceImpl(ALowAlloyDao aLowAlloyDao) {
        this.aLowAlloyDao = aLowAlloyDao;
    }

    @Override
    public ALowAlloyResult getDesignA(ALowAlloyQuery aLowAlloyQuery) {
        return aLowAlloyDao.getDesignA(aLowAlloyQuery);
    }

    public ALowAlloyDao getALowAlloyDao() {
        return aLowAlloyDao;
    }

    @Resource(name = "ALowAlloyDao")
    public void setALowAlloyDao(ALowAlloyDao aLowAlloyDao) {
        this.aLowAlloyDao = aLowAlloyDao;
    }

}
