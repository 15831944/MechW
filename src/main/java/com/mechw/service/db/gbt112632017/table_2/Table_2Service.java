package com.mechw.service.db.gbt112632017.table_2;


import com.mechw.entity.db.gbt112632017.Table_2;
import com.mechw.model.db.gbt112632017.table_2.Table_2_Query;

import java.util.List;

public interface Table_2Service {

    List listNorms(double thkMax);

    Table_2 getDetails(Table_2_Query table_2_query);

}
