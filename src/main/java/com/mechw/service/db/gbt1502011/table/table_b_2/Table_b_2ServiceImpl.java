package com.mechw.service.db.gbt1502011.table.table_b_2;

import com.mechw.dao.db.gbt1502011.table.table_b_2.Table_b_2DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_b_2ServiceImpl implements Table_b_2Service {

    private Table_b_2DAO table_b_2DAO;

    @Autowired
    public Table_b_2ServiceImpl(Table_b_2DAO table_b_2DAO) {
        this.table_b_2DAO = table_b_2DAO;
    }

    @Override
    public double getZeta(double re) {
        return this.table_b_2DAO.getZeta(re);
    }

}
