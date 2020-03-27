package com.mechw.service.db.nbt4700312009.table.table_8_7;

import com.mechw.dao.db.nbt4700312009.table_8_7.Table_8_7DAO;
import com.mechw.model.db.nbt4700312009.table.table_8_7.Table_8_7_Query;
import com.mechw.model.db.nbt4700312009.table.table_8_7.Table_8_7_Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_8_7ServiceImpl implements Table_8_7Service {

    private Table_8_7DAO table_8_7DAO;

    @Autowired
    public Table_8_7ServiceImpl(Table_8_7DAO table_8_7DAO) {
        this.table_8_7DAO = table_8_7DAO;
    }

    @Override
    public Table_8_7_Result findAlphaAndBeta(Table_8_7_Query table_8_7_query) {
        return table_8_7DAO.findAlphaAndBeta(table_8_7_query);
    }

}
