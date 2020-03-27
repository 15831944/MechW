package com.mechw.service.db.nbt4700312009.property.rel.steel.carbon;

import com.mechw.dao.db.nbt4700312009.rel.steel.carbon.RelCarbonDao;
import com.mechw.model.db.nbt4700312009.property.rel.steel.carbon.RelCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.carbon.RelCarbonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class RelCarbonServiceImpl implements RelCarbonService {

    private RelCarbonDao relCarbonDao;

    public RelCarbonServiceImpl() {
    }

    @Autowired
    public RelCarbonServiceImpl(RelCarbonDao relCarbonDao) {
        this.relCarbonDao = relCarbonDao;
    }

    @Override
    public RelCarbonResult getDesignRel(RelCarbonQuery relCarbonQuery) {
        return relCarbonDao.getDesignRel(relCarbonQuery);
    }

    public RelCarbonDao getRelCarbonDao() {
        return relCarbonDao;
    }

    @Resource(name = "RelCarbonDao")
    public void setRelCarbonDao(RelCarbonDao relCarbonDao) {
        this.relCarbonDao = relCarbonDao;
    }

}
