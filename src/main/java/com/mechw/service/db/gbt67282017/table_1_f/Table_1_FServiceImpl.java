package com.mechw.service.db.gbt67282017.table_1_f;

import com.mechw.dao.db.gbt67282017.table_1_f.Table_1_FDAO;
import com.mechw.entity.db.gbt67282017.Table_1_F;
import com.mechw.model.db.gbt67282017.table_1_f.Table_1_F_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_1_FServiceImpl implements Table_1_FService {

    private Table_1_FDAO table_1_FDAO;

    @Autowired
    public Table_1_FServiceImpl(Table_1_FDAO table_1_FDAO) {
        this.table_1_FDAO = table_1_FDAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_1_FDAO.listNorms(thkMax);
    }

    @Override
    public Table_1_F getDetails(Table_1_F_Query table_1_F_query) {
        return table_1_FDAO.getDetails(table_1_F_query);
    }
}
