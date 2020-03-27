package com.mechw.service.db.nbt4700312009.table.table_8_5;

import com.mechw.dao.db.nbt4700312009.table_8_5.Table_8_5DAO;
import com.mechw.model.db.nbt4700312009.table.table_8_5.Table_8_5_Query;
import com.mechw.model.db.nbt4700312009.table.table_8_5.Table_8_5_Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_8_5ServiceImpl implements Table_8_5Service {

    private Table_8_5DAO table_8_5DAO;

    @Autowired
    public Table_8_5ServiceImpl(Table_8_5DAO table_8_5DAO) {
        this.table_8_5DAO = table_8_5DAO;
    }

    @Override
    public Table_8_5_Result findAlphaAndBeta(Table_8_5_Query table_8_5_query) {
        return table_8_5DAO.findAlphaAndBeta(table_8_5_query);
    }

}
