package com.mechw.service.db.hgt215742008.table_6_2_2_tp;

import com.mechw.dao.db.hgt215742008.table_6_2_2_tp.Table_6_2_2_tpDAO;
import com.mechw.entity.db.hgt215742008.Table_6_2_2_tp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_6_2_2_tpServiceImpl implements Table_6_2_2_tpService {

    private Table_6_2_2_tpDAO table_6_2_2_tpDAO;

    @Autowired
    public Table_6_2_2_tpServiceImpl(Table_6_2_2_tpDAO table_6_2_2_tpDAO) {
        this.table_6_2_2_tpDAO = table_6_2_2_tpDAO;
    }

    @Override
    public List<Float> listDN() {
        return table_6_2_2_tpDAO.listDN();
    }

    @Override
    public List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {
        return table_6_2_2_tpDAO.findTypesByDNAndLiftWeight(dn, liftWeight);
    }

    @Override
    public Table_6_2_2_tp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type) {
        return table_6_2_2_tpDAO.findByDNAndLiftWeightAndType(dn, liftWeight, type);
    }

}
