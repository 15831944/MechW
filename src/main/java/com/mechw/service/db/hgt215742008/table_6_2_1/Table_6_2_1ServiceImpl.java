package com.mechw.service.db.hgt215742008.table_6_2_1;

import com.mechw.dao.db.hgt215742008.table_6_2_1.Table_6_2_1DAO;
import com.mechw.entity.db.hgt215742008.Table_6_2_1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_6_2_1ServiceImpl implements Table_6_2_1Service {

    private Table_6_2_1DAO table_6_2_1Dao;

    @Autowired
    public Table_6_2_1ServiceImpl(Table_6_2_1DAO table_6_2_1Dao) {
        this.table_6_2_1Dao = table_6_2_1Dao;
    }

    @Override
    public Table_6_2_1 findByNorm(String norm) {
        return table_6_2_1Dao.findByNorm(norm);
    }
}
