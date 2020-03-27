package com.mechw.dao.db.ybt53092006.table_2;


import com.mechw.entity.db.ybt53092006.ybt_5309_2006_Table_2;
import com.mechw.model.db.ybt53092006.table_2.ybt_5309_2006_Table_2_Query;

import java.util.List;

public interface ybt_5309_2006_Table_2DAO {

    List listNorms(double thkMax);

    ybt_5309_2006_Table_2 getDetails(ybt_5309_2006_Table_2_Query ybt_5309_2006_Table_2_query);

}
