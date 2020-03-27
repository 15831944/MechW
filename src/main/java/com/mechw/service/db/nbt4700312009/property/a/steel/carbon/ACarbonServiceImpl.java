package com.mechw.service.db.nbt4700312009.property.a.steel.carbon;

import com.mechw.dao.db.nbt4700312009.a.steel.carbon.ACarbonDao;
import com.mechw.model.db.nbt4700312009.property.a.steel.carbon.ACarbonQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.carbon.ACarbonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class ACarbonServiceImpl implements ACarbonService {

    private ACarbonDao aCarbonDao;

    public ACarbonServiceImpl() {
    }

    @Autowired
    public ACarbonServiceImpl(ACarbonDao aCarbonDao) {
        this.aCarbonDao = aCarbonDao;
    }

    @Override
    public ACarbonResult getDesignA(ACarbonQuery aCarbonQuery) {
        return aCarbonDao.getDesignA(aCarbonQuery);
    }

    public ACarbonDao getACarbonDao() {
        return aCarbonDao;
    }

    @Resource(name = "ACarbonDao")
    public void setACarbonDao(ACarbonDao aCarbonDao) {
        this.aCarbonDao = aCarbonDao;
    }

}
