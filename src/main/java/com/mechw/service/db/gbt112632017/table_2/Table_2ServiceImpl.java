package com.mechw.service.db.gbt112632017.table_2;

import com.mechw.dao.db.gbt112632017.table_2.Table_2DAO;
import com.mechw.entity.db.gbt112632017.Table_2;
import com.mechw.model.db.gbt112632017.table_2.Table_2_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_2ServiceImpl implements Table_2Service {

    private Table_2DAO table_2DAO;

    @Autowired
    public Table_2ServiceImpl(Table_2DAO table_2DAO) {
        this.table_2DAO = table_2DAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_2DAO.listNorms(thkMax);
    }

    @Override
    public Table_2 getDetails(Table_2_Query table_2_query) {
        return table_2DAO.getDetails(table_2_query);
    }
}
