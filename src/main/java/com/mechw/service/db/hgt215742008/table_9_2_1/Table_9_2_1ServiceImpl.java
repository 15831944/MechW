package com.mechw.service.db.hgt215742008.table_9_2_1;

import com.mechw.dao.db.hgt215742008.table_9_2_1.Table_9_2_1DAO;
import com.mechw.entity.db.hgt215742008.Table_9_2_1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_9_2_1ServiceImpl implements Table_9_2_1Service {

    private Table_9_2_1DAO table_9_2_1Dao;

    @Autowired
    public Table_9_2_1ServiceImpl(Table_9_2_1DAO table_9_2_1Dao) {
        this.table_9_2_1Dao = table_9_2_1Dao;
    }

    @Override
    public Table_9_2_1 findByNorm(Float norm) {
        return table_9_2_1Dao.findByNorm(norm);
    }

}
