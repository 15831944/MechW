package com.mechw.service.db.ybt53092006.table_2;

import com.mechw.dao.db.ybt53092006.table_2.ybt_5309_2006_Table_2DAO;
import com.mechw.entity.db.ybt53092006.ybt_5309_2006_Table_2;
import com.mechw.model.db.ybt53092006.table_2.ybt_5309_2006_Table_2_Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Ybt_5309_2006_Table_2ServiceImpl implements ybt_5309_2006_Table_2Service {

    private ybt_5309_2006_Table_2DAO ybt_5309_2006_Table_2DAO;

    @Autowired
    public Ybt_5309_2006_Table_2ServiceImpl(ybt_5309_2006_Table_2DAO ybt_5309_2006_Table_2DAO) {
        this.ybt_5309_2006_Table_2DAO = ybt_5309_2006_Table_2DAO;
    }

    @Override
    public List listNorms(double thkMax) {
        return ybt_5309_2006_Table_2DAO.listNorms(thkMax);
    }

    @Override
    public ybt_5309_2006_Table_2 getDetails(ybt_5309_2006_Table_2_Query ybt_5309_2006_Table_2_query) {
        return ybt_5309_2006_Table_2DAO.getDetails(ybt_5309_2006_Table_2_query);
    }
}
