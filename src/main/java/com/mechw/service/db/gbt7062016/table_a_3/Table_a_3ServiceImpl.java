package com.mechw.service.db.gbt7062016.table_a_3;

import com.mechw.dao.db.gbt7062016.table_a_3.Table_a_3DAO;
import com.mechw.entity.db.gbt7062016.Table_a_3;
import com.mechw.model.db.gbt7062016.table_a_3.Table_a_3_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_a_3ServiceImpl implements Table_a_3Service {

    private Table_a_3DAO table_a_3DAO;

    @Autowired
    public Table_a_3ServiceImpl(Table_a_3DAO table_a_3DAO) {
        this.table_a_3DAO = table_a_3DAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_a_3DAO.listNorms(thkMax);
    }

    @Override
    public Table_a_3 getDetails(Table_a_3_Query table_a_3_query) {
        return table_a_3DAO.getDetails(table_a_3_query);
    }
}
