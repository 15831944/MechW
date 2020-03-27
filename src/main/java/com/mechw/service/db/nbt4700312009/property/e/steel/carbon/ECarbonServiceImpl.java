package com.mechw.service.db.nbt4700312009.property.e.steel.carbon;

import com.mechw.dao.db.nbt4700312009.e.steel.carbon.ECarbonDao;
import com.mechw.model.db.nbt4700312009.property.e.steel.carbon.ECarbonQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.carbon.ECarbonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class ECarbonServiceImpl implements ECarbonService {

    private ECarbonDao eCarbonDao;

    public ECarbonServiceImpl() {
    }

    @Autowired
    public ECarbonServiceImpl(ECarbonDao eCarbonDao) {
        this.eCarbonDao = eCarbonDao;
    }

    @Override
    public ECarbonResult getDesignE(ECarbonQuery eCarbonQuery) {
        return eCarbonDao.getDesignE(eCarbonQuery);
    }

    public ECarbonDao getECarbonDao() {
        return eCarbonDao;
    }

    @Resource(name = "ECarbonDao")
    public void setECarbonDao(ECarbonDao eCarbonDao) {
        this.eCarbonDao = eCarbonDao;
    }

}
