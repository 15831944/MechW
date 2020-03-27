package com.mechw.dao.db.gbt7062016.table_a_4;

import com.mechw.entity.db.gbt7062016.Table_a_4;
import com.mechw.model.db.gbt7062016.table_a_4.Table_a_4_Query;

import java.util.List;

public interface Table_a_4DAO {

    List listNorms(double thkMax);

    Table_a_4 getDetails(Table_a_4_Query table_a_4_query);

}
