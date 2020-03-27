package com.mechw.service.db.nbt4700312009.property.stress.steel.carbon;

import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonResult;

public interface StressCarbonService {

    StressCarbonResult getTestAndDesignStress(StressCarbonQuery stressCarbonQuery);

}
