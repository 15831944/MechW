package com.mechw.service.db.hgt215742008.table_7_2_2_hp;


import com.mechw.entity.db.hgt215742008.Table_7_2_2_hp;

import java.util.List;

public interface Table_7_2_2_hpService {

    List<Float> listDN();

    List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight);

    Table_7_2_2_hp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type);

}
