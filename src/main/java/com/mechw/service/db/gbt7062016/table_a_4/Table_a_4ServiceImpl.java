package com.mechw.service.db.gbt7062016.table_a_4;

import com.mechw.dao.db.gbt7062016.table_a_4.Table_a_4DAO;
import com.mechw.entity.db.gbt7062016.Table_a_4;
import com.mechw.model.db.gbt7062016.table_a_4.Table_a_4_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_a_4ServiceImpl implements Table_a_4Service {

    private Table_a_4DAO table_a_4DAO;

    @Autowired
    public Table_a_4ServiceImpl(Table_a_4DAO table_a_4DAO) {
        this.table_a_4DAO = table_a_4DAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return table_a_4DAO.listNorms(thkMax);
    }

    @Override
    public Table_a_4 getDetails(Table_a_4_Query table_a_4_query) {
        return table_a_4DAO.getDetails(table_a_4_query);
    }
}
