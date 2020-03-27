package com.mechw.service.db.nbt4700312009.property.a;

import com.mechw.dao.db.nbt4700312009.a.steel.carbon.ACarbonDao;
import com.mechw.dao.db.nbt4700312009.a.steel.highalloy.AHighAlloyDao;
import com.mechw.dao.db.nbt4700312009.a.steel.lowalloy.ALowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.a.AQuery;
import com.mechw.model.db.nbt4700312009.property.a.AResult;
import com.mechw.model.db.nbt4700312009.property.a.steel.carbon.ACarbonQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.carbon.ACarbonResult;
import com.mechw.model.db.nbt4700312009.property.a.steel.highalloy.AHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.highalloy.AHighAlloyResult;
import com.mechw.model.db.nbt4700312009.property.a.steel.lowalloy.ALowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.lowalloy.ALowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Objects;

@Transactional
@Service
public class ASteelServiceImpl implements ASteelService {

    private ACarbonDao aCarbonDao;
    private ALowAlloyDao aLowAlloyDao;
    private AHighAlloyDao aHighAlloyDao;

    public ASteelServiceImpl() {
    }

    @Autowired
    public ASteelServiceImpl(ACarbonDao aCarbonDao, ALowAlloyDao aLowAlloyDao, AHighAlloyDao aHighAlloyDao) {
        this.aCarbonDao = aCarbonDao;
        this.aLowAlloyDao = aLowAlloyDao;
        this.aHighAlloyDao = aHighAlloyDao;
    }

    /**
     * @param aQuery 查询参数对象
     * @return AResult 设计弹性模量
     */
    @Override
    public AResult getDesignA(AQuery aQuery) {

        Double designA;

        String category = aQuery.getCategory();

        if (Objects.equals(category, "碳素钢")) {

            ACarbonQuery aCarbonQuery = new ACarbonQuery(aQuery.getType(), aQuery.getStd(), aQuery.getName(), aQuery.getTemp());
            ACarbonResult aCarbonResult = aCarbonDao.getDesignA(aCarbonQuery);
            designA = aCarbonResult.getDesignA();

        } else if (Objects.equals(category, "低合金钢")) {

            ALowAlloyQuery aLowAlloyQuery = new ALowAlloyQuery(aQuery.getType(), aQuery.getStd(), aQuery.getName(), aQuery.getTemp());
            ALowAlloyResult aLowAlloyResult = aLowAlloyDao.getDesignA(aLowAlloyQuery);
            designA = aLowAlloyResult.getDesignA();

        } else if (Objects.equals(category, "高合金钢")) {

            AHighAlloyQuery aHighAlloyQuery = new AHighAlloyQuery(aQuery.getType(), aQuery.getStd(), aQuery.getName(), aQuery.getTemp());
            AHighAlloyResult aHighAlloyResult = aHighAlloyDao.getDesignA(aHighAlloyQuery);
            designA = aHighAlloyResult.getDesignA();

        } else {
            designA = -1.0;
        }

        return new AResult(designA);

    }

    public ACarbonDao getaCarbonDao() {
        return aCarbonDao;
    }

    @Resource(name = "ACarbonDao")
    public void setaCarbonDao(ACarbonDao aCarbonDao) {
        this.aCarbonDao = aCarbonDao;
    }

    public ALowAlloyDao getaLowAlloyDao() {
        return aLowAlloyDao;
    }

    @Resource(name = "ALowAlloyDao")
    public void setaLowAlloyDao(ALowAlloyDao aLowAlloyDao) {
        this.aLowAlloyDao = aLowAlloyDao;
    }

    public AHighAlloyDao getaHighAlloyDao() {
        return aHighAlloyDao;
    }

    @Resource(name = "AHighAlloyDao")
    public void setaHighAlloyDao(AHighAlloyDao aHighAlloyDao) {
        this.aHighAlloyDao = aHighAlloyDao;
    }
}
