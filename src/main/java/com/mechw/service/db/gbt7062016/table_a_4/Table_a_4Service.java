package com.mechw.service.db.gbt7062016.table_a_4;

import com.mechw.entity.db.gbt7062016.Table_a_4;
import com.mechw.model.db.gbt7062016.table_a_4.Table_a_4_Query;

import java.util.List;

public interface Table_a_4Service {

    List listNorms(double thkMax);

    Table_a_4 getDetails(Table_a_4_Query table_a_4_query);

}
