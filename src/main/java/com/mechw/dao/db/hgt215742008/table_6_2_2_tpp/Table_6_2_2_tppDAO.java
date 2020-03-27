package com.mechw.dao.db.hgt215742008.table_6_2_2_tpp;

import com.mechw.entity.db.hgt215742008.Table_6_2_2_tpp;

import java.util.List;

public interface Table_6_2_2_tppDAO {

    // 列出所有可用的DN
    List<Float> listDN();

    // 查找指定DN，大于所要求吊重的所有 Type 型号
    List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight);

    // 根据指定DN、实际吊重、Type型号，获取满足要求的最小吊重的对象
    Table_6_2_2_tpp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type);

}
