package com.mechw.service.db.hgt215742008.table_10_1;

import com.mechw.dao.db.hgt215742008.table_10_1.Table_10_1DAO;
import com.mechw.entity.db.hgt215742008.Table_10_1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_10_1ServiceImpl implements Table_10_1Service {

    private Table_10_1DAO table_10_1DAO;

    @Autowired
    public Table_10_1ServiceImpl(Table_10_1DAO table_10_1DAO) {
        this.table_10_1DAO = table_10_1DAO;
    }

    @Override
    public List findTypesByLiftWeight(Float liftWeight) {
        return table_10_1DAO.findTypesByLiftWeight(liftWeight);
    }

    @Override
    public Table_10_1 findByType(Float type) {
        return table_10_1DAO.findByType(type);
    }

}
