package com.mechw.service.db.gbt1502011.property.stress;

import com.mechw.model.db.gbt1502011.property.stress.StressQuery;
import com.mechw.model.db.gbt1502011.property.stress.StressResult;

public interface StressService {

    StressResult getStress(StressQuery stressQuery);
}
