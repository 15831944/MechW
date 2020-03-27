package com.mechw.service.db.nbt4700312009.property.stress;

import com.mechw.model.db.nbt4700312009.property.stress.StressQuery;
import com.mechw.model.db.nbt4700312009.property.stress.StressResult;

public interface StressSteelService {

    StressResult getTestAndDesignStress(StressQuery stressQuery);

}
