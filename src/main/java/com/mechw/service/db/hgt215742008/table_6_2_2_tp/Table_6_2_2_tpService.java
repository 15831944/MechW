package com.mechw.service.db.hgt215742008.table_6_2_2_tp;


import com.mechw.entity.db.hgt215742008.Table_6_2_2_tp;

import java.util.List;

public interface Table_6_2_2_tpService {

    List<Float> listDN();

    List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight);

    Table_6_2_2_tp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type);

}
