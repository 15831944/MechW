package com.mechw.service.db.hgt215742008.table_6_2_2_tpp;

import com.mechw.dao.db.hgt215742008.table_6_2_2_tpp.Table_6_2_2_tppDAO;
import com.mechw.entity.db.hgt215742008.Table_6_2_2_tpp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_6_2_2_tppServiceImpl implements Table_6_2_2_tppService {

    private Table_6_2_2_tppDAO table_6_2_2_tppDAO;

    @Autowired
    public Table_6_2_2_tppServiceImpl(Table_6_2_2_tppDAO table_6_2_2_tppDAO) {
        this.table_6_2_2_tppDAO = table_6_2_2_tppDAO;
    }

    @Override
    public List<Float> listDN() {
        return table_6_2_2_tppDAO.listDN();
    }

    @Override
    public List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {
        return table_6_2_2_tppDAO.findTypesByDNAndLiftWeight(dn, liftWeight);
    }

    @Override
    public Table_6_2_2_tpp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type) {
        return table_6_2_2_tppDAO.findByDNAndLiftWeightAndType(dn, liftWeight, type);
    }

}
