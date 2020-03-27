package com.mechw.service.db.hgt215742008.table_9_2_2_axc;

import com.mechw.dao.db.hgt215742008.table_9_2_2_axc.Table_9_2_2_axcDAO;
import com.mechw.entity.db.hgt215742008.Table_9_2_2_axc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_9_2_2_axcServiceImpl implements Table_9_2_2_axcService {

    private Table_9_2_2_axcDAO table_9_2_2_axcDAO;

    @Autowired
    public Table_9_2_2_axcServiceImpl(Table_9_2_2_axcDAO table_9_2_2_axcDAO) {
        this.table_9_2_2_axcDAO = table_9_2_2_axcDAO;
    }

    @Override
    public List<Float> listDN() {
        return table_9_2_2_axcDAO.listDN();
    }

    @Override
    public List<Float> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {
        return table_9_2_2_axcDAO.findTypesByDNAndLiftWeight(dn, liftWeight);
    }

    @Override
    public Table_9_2_2_axc findByDNAndLiftWeightAndType(Float dn, Float liftWeight, Float type) {
        return table_9_2_2_axcDAO.findByDNAndLiftWeightAndType(dn, liftWeight, type);
    }

}
