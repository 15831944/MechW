package com.mechw.service.db.hgt215742008.table_8_2_1;

import com.mechw.dao.db.hgt215742008.table_8_2_1.Table_8_2_1DAO;
import com.mechw.entity.db.hgt215742008.Table_8_2_1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_8_2_1ServiceImpl implements Table_8_2_1Service {

    private Table_8_2_1DAO table_8_2_1DAO;

    @Autowired
    public Table_8_2_1ServiceImpl(Table_8_2_1DAO table_8_2_1DAO) {
        this.table_8_2_1DAO = table_8_2_1DAO;
    }

    @Override
    public List<Float> findTypesByLiftWeight(Float liftWeight) {
        return table_8_2_1DAO.findTypesByLiftWeight(liftWeight);
    }

    @Override
    public Table_8_2_1 findByType(Float type) {
        return table_8_2_1DAO.findByType(type);
    }

}
