package com.mechw.service.db.nbt4700312009.property.stress.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.stress.steel.lowalloy.StressLowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class StressLowAlloyServiceImpl implements StressLowAlloyService {

    private StressLowAlloyDao stressLowAlloyDao;

    public StressLowAlloyServiceImpl() {
    }

    @Autowired
    public StressLowAlloyServiceImpl(StressLowAlloyDao stressLowAlloyDao) {
        this.stressLowAlloyDao = stressLowAlloyDao;
    }

    @Override
    public StressLowAlloyResult getTestAndDesignStress(StressLowAlloyQuery stressLowAlloyQuery) {
        return stressLowAlloyDao.getTestAndDesignStress(stressLowAlloyQuery);
    }

    public StressLowAlloyDao getStressLowAlloyDao() {
        return stressLowAlloyDao;
    }

    @Resource(name = "StressLowAlloyDao")
    public void setStressLowAlloyDao(StressLowAlloyDao stressLowAlloyDao) {
        this.stressLowAlloyDao = stressLowAlloyDao;
    }

}
