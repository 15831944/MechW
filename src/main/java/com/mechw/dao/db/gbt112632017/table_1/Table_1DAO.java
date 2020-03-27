package com.mechw.dao.db.gbt112632017.table_1;

import com.mechw.entity.db.gbt112632017.Table_1;
import com.mechw.model.db.gbt112632017.table_1.Table_1_Query;

import java.util.List;

public interface Table_1DAO {

    List listNorms(double thkMax);

    Table_1 getDetails(Table_1_Query table_1_query);
}
