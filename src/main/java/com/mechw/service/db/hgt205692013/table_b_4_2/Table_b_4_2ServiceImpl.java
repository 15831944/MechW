package com.mechw.service.db.hgt205692013.table_b_4_2;

import com.mechw.dao.db.hgt205692013.table_b_4_2.Table_b_4_2DAO;
import com.mechw.model.db.hgt205692013.Table_b_4_2Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_b_4_2ServiceImpl implements Table_b_4_2Service {

    private Table_b_4_2DAO table_b_4_2DAO;

    @Autowired
    public Table_b_4_2ServiceImpl(Table_b_4_2DAO table_b_4_2DAO) {
        this.table_b_4_2DAO = table_b_4_2DAO;
    }

    @Override
    public Table_b_4_2Result find(double u) {
        return this.table_b_4_2DAO.find(u);
    }

}
