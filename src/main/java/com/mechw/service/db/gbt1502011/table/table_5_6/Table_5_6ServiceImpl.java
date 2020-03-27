package com.mechw.service.db.gbt1502011.table.table_5_6;

import com.mechw.dao.db.gbt1502011.table.table_5_6.Table_5_6DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_5_6ServiceImpl implements Table_5_6Service {

    private Table_5_6DAO table_5_6DAO;

    @Autowired
    public Table_5_6ServiceImpl(Table_5_6DAO table_5_6DAO) {
        this.table_5_6DAO = table_5_6DAO;
    }

    @Override
    public double getK(double alpha, double rdil) {
        return this.table_5_6DAO.getK(alpha, rdil);
    }
}
