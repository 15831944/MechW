package com.mechw.service.db.gbt67282017.table_3_y;

import com.mechw.dao.db.gbt67282017.table_3_y.Table_3_YDAO;
import com.mechw.entity.db.gbt67282017.Table_3_Y;
import com.mechw.model.db.gbt67282017.table_3_y.Table_3_Y_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_3_YServiceImpl implements Table_3_YService {

    private Table_3_YDAO table_3_YDAO;

    @Autowired
    public Table_3_YServiceImpl(Table_3_YDAO table_3_YDAO) {
        this.table_3_YDAO = table_3_YDAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_3_YDAO.listNorms(thkMax);
    }

    @Override
    public Table_3_Y getDetails(Table_3_Y_Query table_3_Y_query) {
        return table_3_YDAO.getDetails(table_3_Y_query);
    }
}
