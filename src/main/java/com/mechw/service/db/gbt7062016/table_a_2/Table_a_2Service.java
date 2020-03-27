package com.mechw.service.db.gbt7062016.table_a_2;

import com.mechw.entity.db.gbt7062016.Table_a_2;
import com.mechw.model.db.gbt7062016.table_a_2.Table_a_2_Query;

import java.util.List;

public interface Table_a_2Service {

    List listNorms(double thkMax);

    Table_a_2 getDetails(Table_a_2_Query table_a_2_query);

}
