package com.mechw.dao.db.gbt67282017.table_3_y;


import com.mechw.entity.db.gbt67282017.Table_3_Y;
import com.mechw.model.db.gbt67282017.table_3_y.Table_3_Y_Query;

import java.util.List;

public interface Table_3_YDAO {

    List listNorms(double thkMax);

    Table_3_Y getDetails(Table_3_Y_Query table_3_Y_query);
}
