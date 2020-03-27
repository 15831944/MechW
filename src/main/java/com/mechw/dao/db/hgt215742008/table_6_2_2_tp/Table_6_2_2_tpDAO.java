package com.mechw.dao.db.hgt215742008.table_6_2_2_tp;


import com.mechw.entity.db.hgt215742008.Table_6_2_2_tp;

import java.util.List;

public interface Table_6_2_2_tpDAO {

    List<Float> listDN();

    // 查找指定DN，大于所要求吊重的所有 Type 型号
    List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight);

    // 根据指定DN、实际吊重、Type型号，获取满足要求的最小吊重的对象
    Table_6_2_2_tp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type);

}
