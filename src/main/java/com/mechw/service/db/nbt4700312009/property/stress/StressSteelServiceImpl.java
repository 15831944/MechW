package com.mechw.service.db.nbt4700312009.property.stress;

import com.mechw.dao.db.nbt4700312009.stress.steel.carbon.StressCarbonDao;
import com.mechw.dao.db.nbt4700312009.stress.steel.highalloy.StressHighAlloyDao;
import com.mechw.dao.db.nbt4700312009.stress.steel.lowalloy.StressLowAlloyDao;
import com.mechw.model.db.nbt4700312009.property.stress.StressQuery;
import com.mechw.model.db.nbt4700312009.property.stress.StressResult;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonResult;
import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyResult;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Objects;

@Transactional
@Service
public class StressSteelServiceImpl implements StressSteelService {

    private StressCarbonDao stressCarbonDao;
    private StressLowAlloyDao stressLowAlloyDao;
    private StressHighAlloyDao stressHighAlloyDao;

    public StressSteelServiceImpl() {
    }

    @Autowired
    public StressSteelServiceImpl(StressCarbonDao stressCarbonDao, StressLowAlloyDao stressLowAlloyDao, StressHighAlloyDao stressHighAlloyDao) {
        this.stressCarbonDao = stressCarbonDao;
        this.stressLowAlloyDao = stressLowAlloyDao;
        this.stressHighAlloyDao = stressHighAlloyDao;
    }

    /**
     * @param stressQuery 查询参数对象
     * @return StressResult
     */
    @Override
    public StressResult getTestAndDesignStress(StressQuery stressQuery) {

        Double designStress, testStress;

        String category = stressQuery.getCategory();

        if (Objects.equals(category, "碳素钢")) {

            StressCarbonQuery stressCarbonQuery = new StressCarbonQuery(stressQuery.getType(), stressQuery.getStd(), stressQuery.getName(), stressQuery.getThk(), stressQuery.getTemp());
            StressCarbonResult stressCarbonResult = stressCarbonDao.getTestAndDesignStress(stressCarbonQuery);
            designStress = stressCarbonResult.getDesignStress();
            testStress = stressCarbonResult.getTestStress();

        } else if (Objects.equals(category, "低合金钢")) {

            StressLowAlloyQuery stressLowAlloyQuery = new StressLowAlloyQuery(stressQuery.getType(), stressQuery.getStd(), stressQuery.getName(), stressQuery.getThk(), stressQuery.getTemp());
            StressLowAlloyResult stressLowAlloyResult = stressLowAlloyDao.getTestAndDesignStress(stressLowAlloyQuery);
            designStress = stressLowAlloyResult.getDesignStress();
            testStress = stressLowAlloyResult.getTestStress();

        } else if (Objects.equals(category, "高合金钢")) {

            StressHighAlloyQuery stressHighAlloyQuery = new StressHighAlloyQuery(stressQuery.getType(), stressQuery.getStd(), stressQuery.getName(), stressQuery.getThk(), stressQuery.getTemp(), stressQuery.getHighLow());
            StressHighAlloyResult stressHighAlloyResult = stressHighAlloyDao.getTestAndDesignStress(stressHighAlloyQuery);
            designStress = stressHighAlloyResult.getDesignStress();
            testStress = stressHighAlloyResult.getTestStress();

        } else {
            designStress = -1.0;
            testStress = -1.0;
        }

        return new StressResult(testStress, designStress);

    }

    public StressCarbonDao getstressCarbonDao() {
        return stressCarbonDao;
    }

    @Resource(name = "StressCarbonDao")
    public void setstressCarbonDao(StressCarbonDao stressCarbonDao) {
        this.stressCarbonDao = stressCarbonDao;
    }

    public StressLowAlloyDao getstressLowAlloyDao() {
        return stressLowAlloyDao;
    }

    @Resource(name = "StressLowAlloyDao")
    public void setstressLowAlloyDao(StressLowAlloyDao stressLowAlloyDao) {
        this.stressLowAlloyDao = stressLowAlloyDao;
    }

    public StressHighAlloyDao getstressHighAlloyDao() {
        return stressHighAlloyDao;
    }

    @Resource(name = "StressHighAlloyDao")
    public void setstressHighAlloyDao(StressHighAlloyDao stressHighAlloyDao) {
        this.stressHighAlloyDao = stressHighAlloyDao;
    }
}
