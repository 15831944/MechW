package com.mechw.dao.db.nbt4700312009.stress.steel.highalloy;

import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyResult;

public interface StressHighAlloyDao {

    /**
     * @param stressSteelHighAlloyQuery 传参对象
     * @return 结果对象
     */
    StressHighAlloyResult getTestAndDesignStress(StressHighAlloyQuery stressSteelHighAlloyQuery);

}
