package com.mechw.dao.db.nbt4700312009.stress.steel.lowalloy;

import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyResult;

public interface StressLowAlloyDao {

    /**
     * @param stressSteelLowAlloyQuery 传参对象
     * @return 结果对象
     */
    StressLowAlloyResult getTestAndDesignStress(StressLowAlloyQuery stressSteelLowAlloyQuery);

}
