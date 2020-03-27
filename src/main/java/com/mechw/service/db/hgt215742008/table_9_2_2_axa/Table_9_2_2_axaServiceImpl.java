package com.mechw.service.db.hgt215742008.table_9_2_2_axa;

import com.mechw.dao.db.hgt215742008.table_9_2_2_axa.Table_9_2_2_axaDAO;
import com.mechw.entity.db.hgt215742008.Table_9_2_2_axa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_9_2_2_axaServiceImpl implements Table_9_2_2_axaService {

    private Table_9_2_2_axaDAO table_9_2_2_axaDAO;

    @Autowired
    public Table_9_2_2_axaServiceImpl(Table_9_2_2_axaDAO table_9_2_2_axaDAO) {
        this.table_9_2_2_axaDAO = table_9_2_2_axaDAO;
    }

    @Override
    public List<Float> listDN() {
        return table_9_2_2_axaDAO.listDN();
    }

    @Override
    public List<Float> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {
        return table_9_2_2_axaDAO.findTypesByDNAndLiftWeight(dn, liftWeight);
    }

    @Override
    public Table_9_2_2_axa findByDNAndLiftWeightAndType(Float dn, Float liftWeight, Float type) {
        return table_9_2_2_axaDAO.findByDNAndLiftWeightAndType(dn, liftWeight, type);
    }

}
