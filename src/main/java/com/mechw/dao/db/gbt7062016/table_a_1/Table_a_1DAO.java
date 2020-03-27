package com.mechw.dao.db.gbt7062016.table_a_1;

import com.mechw.entity.db.gbt7062016.Table_a_1;
import com.mechw.model.db.gbt7062016.table_a_1.Table_a_1_Query;

import java.util.List;

public interface Table_a_1DAO {

    List listNorms(double thkMax);

    Table_a_1 getDetails(Table_a_1_Query table_a_1_query);

}
