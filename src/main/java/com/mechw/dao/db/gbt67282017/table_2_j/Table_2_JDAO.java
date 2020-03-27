package com.mechw.dao.db.gbt67282017.table_2_j;


import com.mechw.entity.db.gbt67282017.Table_2_J;
import com.mechw.model.db.gbt67282017.table_2_j.Table_2_J_Query;

import java.util.List;

public interface Table_2_JDAO {

    List listNorms(double thkMax);

    Table_2_J getDetails(Table_2_J_Query table_2_J_query);
}
