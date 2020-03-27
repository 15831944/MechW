package com.mechw.service.db.gbt7062016.table_a_3;

import com.mechw.entity.db.gbt7062016.Table_a_3;
import com.mechw.model.db.gbt7062016.table_a_3.Table_a_3_Query;

import java.util.List;

public interface Table_a_3Service {

    List listNorms(double thkMax);

    Table_a_3 getDetails(Table_a_3_Query table_a_3_query);

}
