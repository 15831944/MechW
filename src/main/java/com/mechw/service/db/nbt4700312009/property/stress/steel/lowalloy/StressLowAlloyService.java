package com.mechw.service.db.nbt4700312009.property.stress.steel.lowalloy;

import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyResult;

public interface StressLowAlloyService {

    StressLowAlloyResult getTestAndDesignStress(StressLowAlloyQuery stressSteelLowAlloyQuery);

}
