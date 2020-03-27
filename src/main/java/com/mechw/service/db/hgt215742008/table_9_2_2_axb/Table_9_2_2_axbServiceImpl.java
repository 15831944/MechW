package com.mechw.service.db.hgt215742008.table_9_2_2_axb;

import com.mechw.dao.db.hgt215742008.table_9_2_2_axb.Table_9_2_2_axbDAO;
import com.mechw.entity.db.hgt215742008.Table_9_2_2_axb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class Table_9_2_2_axbServiceImpl implements Table_9_2_2_axbService {

    private Table_9_2_2_axbDAO table_9_2_2_axbDAO;

    @Autowired
    public Table_9_2_2_axbServiceImpl(Table_9_2_2_axbDAO table_9_2_2_axbDAO) {
        this.table_9_2_2_axbDAO = table_9_2_2_axbDAO;
    }

    @Override
    public List<Float> listDN() {
        return table_9_2_2_axbDAO.listDN();
    }

    @Override
    public List<Float> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {
        return table_9_2_2_axbDAO.findTypesByDNAndLiftWeight(dn, liftWeight);
    }

    @Override
    public Table_9_2_2_axb findByDNAndLiftWeightAndType(Float dn, Float liftWeight, Float type) {
        return table_9_2_2_axbDAO.findByDNAndLiftWeightAndType(dn, liftWeight, type);
    }

}
