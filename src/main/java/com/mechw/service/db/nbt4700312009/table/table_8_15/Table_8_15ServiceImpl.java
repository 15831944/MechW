package com.mechw.service.db.nbt4700312009.table.table_8_15;

import com.mechw.dao.db.nbt4700312009.table_8_15.Table_8_15DAO;
import com.mechw.model.db.nbt4700312009.table.table_8_15.Table_8_15_Query;
import com.mechw.model.db.nbt4700312009.table.table_8_15.Table_8_15_Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Table_8_15ServiceImpl implements Table_8_15Service {

    private Table_8_15DAO table_8_15DAO;

    @Autowired
    public Table_8_15ServiceImpl(Table_8_15DAO table_8_15DAO) {
        this.table_8_15DAO = table_8_15DAO;
    }

    @Override
    public Table_8_15_Result findAlphaAndBeta(Table_8_15_Query table_8_15_query) {
        return table_8_15DAO.findAlphaAndBeta(table_8_15_query);
    }

}
