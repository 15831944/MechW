package com.mechw.service.db.nbt4700312009.property.e;

import com.mechw.dao.db.nbt4700312009.e.steel.carbon.ECarbonDao;
import com.mechw.dao.db.nbt4700312009.e.steel.highalloy.EHighAlloyDao;
import com.mechw.dao.db.nbt4700312009.e.steel.lowalloy.ELowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.e.EQuery;
import com.mechw.model.db.nbt4700312009.property.e.EResult;
import com.mechw.model.db.nbt4700312009.property.e.steel.carbon.ECarbonQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.carbon.ECarbonResult;
import com.mechw.model.db.nbt4700312009.property.e.steel.highalloy.EHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.highalloy.EHighAlloyResult;
import com.mechw.model.db.nbt4700312009.property.e.steel.lowalloy.ELowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.lowalloy.ELowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class ESteelServiceImpl implements ESteelService {

    private ECarbonDao eCarbonDao;
    private ELowAlloyDao eLowAlloyDao;
    private EHighAlloyDao eHighAlloyDao;

    public ESteelServiceImpl() {
    }

    @Autowired
    public ESteelServiceImpl(ECarbonDao eCarbonDao, ELowAlloyDao eLowAlloyDao, EHighAlloyDao eHighAlloyDao) {
        this.eCarbonDao = eCarbonDao;
        this.eLowAlloyDao = eLowAlloyDao;
        this.eHighAlloyDao = eHighAlloyDao;
    }

    /**
     * @param eQuery 查询参数对象
     * @return EResult 设计弹性模量
     */
    @Override
    public EResult getDesignE(EQuery eQuery) {

        Double designE;

        String category = eQuery.getCategory();

        switch (category) {

            case "碳素钢":
                ECarbonQuery eCarbonQuery = new ECarbonQuery(eQuery.getType(), eQuery.getStd(), eQuery.getName(), eQuery.getTemp());
                ECarbonResult eCarbonResult = eCarbonDao.getDesignE(eCarbonQuery);
                designE = eCarbonResult.getDesignE();
                break;
            case "低合金钢":
                ELowAlloyQuery eLowAlloyQuery = new ELowAlloyQuery(eQuery.getType(), eQuery.getStd(), eQuery.getName(), eQuery.getTemp());
                ELowAlloyResult eLowAlloyResult = eLowAlloyDao.getDesignE(eLowAlloyQuery);
                designE = eLowAlloyResult.getDesignE();
                break;
            case "高合金钢":
                EHighAlloyQuery eHighAlloyQuery = new EHighAlloyQuery(eQuery.getType(), eQuery.getStd(), eQuery.getName(), eQuery.getTemp());
                EHighAlloyResult eHighAlloyResult = eHighAlloyDao.getDesignE(eHighAlloyQuery);
                designE = eHighAlloyResult.getDesignE();
                break;
            default:
                designE = -1.0;
                break;
        }

        return new EResult(designE);

    }

    public ECarbonDao geteCarbonDao() {
        return eCarbonDao;
    }

    @Resource(name = "ECarbonDao")
    public void seteCarbonDao(ECarbonDao eCarbonDao) {
        this.eCarbonDao = eCarbonDao;
    }

    public ELowAlloyDao geteLowAlloyDao() {
        return eLowAlloyDao;
    }

    @Resource(name = "ELowAlloyDao")
    public void seteLowAlloyDao(ELowAlloyDao eLowAlloyDao) {
        this.eLowAlloyDao = eLowAlloyDao;
    }

    public EHighAlloyDao geteHighAlloyDao() {
        return eHighAlloyDao;
    }

    @Resource(name = "EHighAlloyDao")
    public void seteHighAlloyDao(EHighAlloyDao eHighAlloyDao) {
        this.eHighAlloyDao = eHighAlloyDao;
    }
}
