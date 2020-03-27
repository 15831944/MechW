package com.mechw.dao.db.gbt1502011.property.stress;

import com.mechw.model.db.gbt1502011.property.stress.StressQuery;
import com.mechw.model.db.gbt1502011.property.stress.StressResult;

public interface StressDao {

    /**
     * @param stressQuery 传参对象
     * @return 设计应力、常温应力、标记应力
     */
    StressResult getStress(StressQuery stressQuery);
}
