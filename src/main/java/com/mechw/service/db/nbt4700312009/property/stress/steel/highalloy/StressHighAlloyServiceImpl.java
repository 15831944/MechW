package com.mechw.service.db.nbt4700312009.property.stress.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.stress.steel.highalloy.StressHighAlloyDao;
import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class StressHighAlloyServiceImpl implements StressHighAlloyService {

    private StressHighAlloyDao stressHighAlloyDao;

    public StressHighAlloyServiceImpl() {
    }

    @Autowired
    public StressHighAlloyServiceImpl(StressHighAlloyDao stressHighAlloyDao) {
        this.stressHighAlloyDao = stressHighAlloyDao;
    }

    @Override
    public StressHighAlloyResult getTestAndDesignStress(StressHighAlloyQuery stressHighAlloyQuery) {
        return stressHighAlloyDao.getTestAndDesignStress(stressHighAlloyQuery);
    }

    public StressHighAlloyDao getStressHighAlloyDao() {
        return stressHighAlloyDao;
    }

    @Resource(name = "StressHighAlloyDao")
    public void setStressHighAlloyDao(StressHighAlloyDao stressHighAlloyDao) {
        this.stressHighAlloyDao = stressHighAlloyDao;
    }

}
