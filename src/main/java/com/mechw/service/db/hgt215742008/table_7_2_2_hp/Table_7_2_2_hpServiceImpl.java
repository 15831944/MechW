package com.mechw.service.db.hgt215742008.table_7_2_2_hp;

import com.mechw.dao.db.hgt215742008.table_7_2_2_hp.Table_7_2_2_hpDAO;
import com.mechw.entity.db.hgt215742008.Table_7_2_2_hp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_7_2_2_hpServiceImpl implements Table_7_2_2_hpService {

    private Table_7_2_2_hpDAO table_7_2_2_hpDAO;

    @Autowired
    public Table_7_2_2_hpServiceImpl(Table_7_2_2_hpDAO table_7_2_2_hpDAO) {
        this.table_7_2_2_hpDAO = table_7_2_2_hpDAO;
    }

    @Override
    public List<Float> listDN() {
        return table_7_2_2_hpDAO.listDN();
    }

    @Override
    public List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {
        return table_7_2_2_hpDAO.findTypesByDNAndLiftWeight(dn, liftWeight);
    }

    @Override
    public Table_7_2_2_hp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type) {
        return table_7_2_2_hpDAO.findByDNAndLiftWeightAndType(dn, liftWeight, type);
    }

}
