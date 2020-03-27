package com.mechw.service.db.gbt7062016.table_a_2;

import com.mechw.dao.db.gbt7062016.table_a_2.Table_a_2DAO;
import com.mechw.entity.db.gbt7062016.Table_a_2;
import com.mechw.model.db.gbt7062016.table_a_2.Table_a_2_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_a_2ServiceImpl implements Table_a_2Service {

    private Table_a_2DAO table_a_2DAO;

    @Autowired
    public Table_a_2ServiceImpl(Table_a_2DAO table_a_2DAO) {
        this.table_a_2DAO = table_a_2DAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_a_2DAO.listNorms(thkMax);
    }

    @Override
    public Table_a_2 getDetails(Table_a_2_Query table_a_2_query) {
        return table_a_2DAO.getDetails(table_a_2_query);
    }
}
