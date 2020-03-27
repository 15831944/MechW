package com.mechw.service.db.hgt205822011.table_3_2;

import com.mechw.dao.db.hgt205822011.table_3_2.Table_3_2DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_3_2ServiceImpl implements Table_3_2Service {

    private Table_3_2DAO table_3_2DAO;

    @Autowired
    public Table_3_2ServiceImpl(Table_3_2DAO table_3_2DAO) {
        this.table_3_2DAO = table_3_2DAO;
    }

    @Override
    public double findK(double jacketDo, double shellDi, double shellThk) {
        return this.table_3_2DAO.findK(jacketDo, shellDi, shellThk);
    }

}
