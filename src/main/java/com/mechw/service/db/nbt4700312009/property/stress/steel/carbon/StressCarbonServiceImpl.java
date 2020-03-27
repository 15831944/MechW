package com.mechw.service.db.nbt4700312009.property.stress.steel.carbon;

import com.mechw.dao.db.nbt4700312009.stress.steel.carbon.StressCarbonDao;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class StressCarbonServiceImpl implements StressCarbonService {

    private StressCarbonDao stressCarbonDao;

    public StressCarbonServiceImpl() {
    }

    @Autowired
    public StressCarbonServiceImpl(StressCarbonDao stressCarbonDao) {
        this.stressCarbonDao = stressCarbonDao;
    }

    @Override
    public StressCarbonResult getTestAndDesignStress(StressCarbonQuery stressCarbonQuery) {
        return stressCarbonDao.getTestAndDesignStress(stressCarbonQuery);
    }

    public StressCarbonDao getStressCarbonDao() {
        return stressCarbonDao;
    }

    @Resource(name = "StressCarbonDao")
    public void setStressCarbonDao(StressCarbonDao stressCarbonDao) {
        this.stressCarbonDao = stressCarbonDao;
    }

}
