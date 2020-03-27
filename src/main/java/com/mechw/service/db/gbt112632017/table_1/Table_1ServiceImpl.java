package com.mechw.service.db.gbt112632017.table_1;

import com.mechw.dao.db.gbt112632017.table_1.Table_1DAO;
import com.mechw.entity.db.gbt112632017.Table_1;
import com.mechw.model.db.gbt112632017.table_1.Table_1_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_1ServiceImpl implements Table_1Service {

    private Table_1DAO table_1DAO;

    @Autowired
    public Table_1ServiceImpl(Table_1DAO table_1DAO) {
        this.table_1DAO = table_1DAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_1DAO.listNorms(thkMax);
    }

    @Override
    public Table_1 getDetails(Table_1_Query table_1_query) {
        return table_1DAO.getDetails(table_1_query);
    }
}
