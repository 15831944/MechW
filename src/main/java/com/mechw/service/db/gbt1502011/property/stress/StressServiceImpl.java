package com.mechw.service.db.gbt1502011.property.stress;

import com.mechw.dao.db.gbt1502011.property.stress.StressDao;
import com.mechw.model.db.gbt1502011.property.stress.StressQuery;
import com.mechw.model.db.gbt1502011.property.stress.StressResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class StressServiceImpl implements StressService {

    private StressDao stressDao;

    public StressServiceImpl() {
    }

    @Autowired
    public StressServiceImpl(StressDao stressDao) {
        this.stressDao = stressDao;
    }

    /**
     * @param stressQuery 查询参数对象
     * @return StressResult 包含设计应力 标记应力 常温应力
     */
    @Override
    public StressResult getStress(StressQuery stressQuery) {

        return stressDao.getStress(stressQuery);
    }

    public StressDao getStressDao() {
        return stressDao;
    }

    @Resource(name = "StressDao")
    public void setStressDao(StressDao stressDao) {
        this.stressDao = stressDao;
    }
}
