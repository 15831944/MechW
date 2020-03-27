package com.mechw.service.db.nbt4700312009.property.rel;

import com.mechw.dao.db.nbt4700312009.rel.steel.carbon.RelCarbonDao;
import com.mechw.dao.db.nbt4700312009.rel.steel.highalloy.RelHighAlloyDao;
import com.mechw.dao.db.nbt4700312009.rel.steel.lowalloy.RelLowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.rel.RelQuery;
import com.mechw.model.db.nbt4700312009.property.rel.RelResult;
import com.mechw.model.db.nbt4700312009.property.rel.steel.carbon.RelCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.carbon.RelCarbonResult;
import com.mechw.model.db.nbt4700312009.property.rel.steel.highalloy.RelHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.highalloy.RelHighAlloyResult;
import com.mechw.model.db.nbt4700312009.property.rel.steel.lowalloy.RelLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.lowalloy.RelLowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Objects;

@Transactional
@Service
public class RelSteelServiceImpl implements RelSteelService {

    private RelCarbonDao relCarbonDao;
    private RelLowAlloyDao relLowAlloyDao;
    private RelHighAlloyDao relHighAlloyDao;

    public RelSteelServiceImpl() {
    }

    @Autowired
    public RelSteelServiceImpl(RelCarbonDao relCarbonDao, RelLowAlloyDao relLowAlloyDao, RelHighAlloyDao relHighAlloyDao) {
        this.relCarbonDao = relCarbonDao;
        this.relLowAlloyDao = relLowAlloyDao;
        this.relHighAlloyDao = relHighAlloyDao;
    }

    /**
     * @param relQuery 查询参数对象
     * @return RelResult 设计弹性模量
     */
    @Override
    public RelResult getDesignRel(RelQuery relQuery) {

        Double designRel;

        String category = relQuery.getCategory();

        if (Objects.equals(category, "碳素钢")) {

            RelCarbonQuery relCarbonQuery = new RelCarbonQuery(relQuery.getType(), relQuery.getStd(), relQuery.getName(), relQuery.getTemp(), relQuery.getThk());
            RelCarbonResult relCarbonResult = relCarbonDao.getDesignRel(relCarbonQuery);
            designRel = relCarbonResult.getDesignRel();

        } else if (Objects.equals(category, "低合金钢")) {

            RelLowAlloyQuery relLowAlloyQuery = new RelLowAlloyQuery(relQuery.getType(), relQuery.getStd(), relQuery.getName(), relQuery.getTemp(), relQuery.getThk());
            RelLowAlloyResult relLowAlloyResult = relLowAlloyDao.getDesignRel(relLowAlloyQuery);
            designRel = relLowAlloyResult.getDesignRel();

        } else if (Objects.equals(category, "高合金钢")) {

            RelHighAlloyQuery relHighAlloyQuery = new RelHighAlloyQuery(relQuery.getType(), relQuery.getStd(), relQuery.getName(), relQuery.getTemp(), relQuery.getThk());
            RelHighAlloyResult relHighAlloyResult = relHighAlloyDao.getDesignRel(relHighAlloyQuery);
            designRel = relHighAlloyResult.getDesignRel();

        } else {
            designRel = -1.0;
        }

        return new RelResult(designRel);

    }

    public RelCarbonDao getrelCarbonDao() {
        return relCarbonDao;
    }

    @Resource(name = "RelCarbonDao")
    public void setrelCarbonDao(RelCarbonDao relCarbonDao) {
        this.relCarbonDao = relCarbonDao;
    }

    public RelLowAlloyDao getrelLowAlloyDao() {
        return relLowAlloyDao;
    }

    @Resource(name = "RelLowAlloyDao")
    public void setrelLowAlloyDao(RelLowAlloyDao relLowAlloyDao) {
        this.relLowAlloyDao = relLowAlloyDao;
    }

    public RelHighAlloyDao getrelHighAlloyDao() {
        return relHighAlloyDao;
    }

    @Resource(name = "RelHighAlloyDao")
    public void setrelHighAlloyDao(RelHighAlloyDao relHighAlloyDao) {
        this.relHighAlloyDao = relHighAlloyDao;
    }
}
