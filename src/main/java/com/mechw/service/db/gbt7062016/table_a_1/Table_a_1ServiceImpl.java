package com.mechw.service.db.gbt7062016.table_a_1;

import com.mechw.dao.db.gbt7062016.table_a_1.Table_a_1DAO;
import com.mechw.entity.db.gbt7062016.Table_a_1;
import com.mechw.model.db.gbt7062016.table_a_1.Table_a_1_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_a_1ServiceImpl implements Table_a_1Service {

    private Table_a_1DAO table_a_1DAO;

    @Autowired
    public Table_a_1ServiceImpl(Table_a_1DAO table_a_1DAO) {
        this.table_a_1DAO = table_a_1DAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_a_1DAO.listNorms(thkMax);
    }

    @Override
    public Table_a_1 getDetails(Table_a_1_Query table_a_1_query) {
        return table_a_1DAO.getDetails(table_a_1_query);
    }
}
