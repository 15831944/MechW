package com.mechw.dao.db.nbt4700312009.stress.steel.carbon;

import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonResult;

public interface StressCarbonDao {

    /**
     * @param stressSteelCarbonQuery 传参对象
     * @return 结果对象
     */
    StressCarbonResult getTestAndDesignStress(StressCarbonQuery stressSteelCarbonQuery);

}
