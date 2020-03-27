package com.mechw.service.db.gbt67282017.table_1_f;

import com.mechw.entity.db.gbt67282017.Table_1_F;
import com.mechw.model.db.gbt67282017.table_1_f.Table_1_F_Query;

import java.util.List;

public interface Table_1_FService {

    List listNorms(double thkMax);

    Table_1_F getDetails(Table_1_F_Query table_1_f_query);

}
