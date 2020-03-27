package com.mechw.service.db.gbt67282017.table_2_j;

import com.mechw.dao.db.gbt67282017.table_2_j.Table_2_JDAO;
import com.mechw.entity.db.gbt67282017.Table_2_J;
import com.mechw.model.db.gbt67282017.table_2_j.Table_2_J_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_2_JServiceImpl implements Table_2_JService {

    private Table_2_JDAO table_2_JDAO;

    @Autowired
    public Table_2_JServiceImpl(Table_2_JDAO table_2_JDAO) {
        this.table_2_JDAO = table_2_JDAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_2_JDAO.listNorms(thkMax);
    }

    @Override
    public Table_2_J getDetails(Table_2_J_Query table_2_J_query) {
        return table_2_JDAO.getDetails(table_2_J_query);
    }
}
