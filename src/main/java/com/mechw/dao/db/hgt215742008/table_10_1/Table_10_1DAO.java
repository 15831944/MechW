package com.mechw.dao.db.hgt215742008.table_10_1;

import com.mechw.entity.db.hgt215742008.Table_10_1;

import java.util.List;

public interface Table_10_1DAO {

    // 查找大于所要求吊重的所有 Type 型号
    List findTypesByLiftWeight(Float liftWeight);

    // 根据Type型号，查找相应尺寸
    Table_10_1 findByType(Float type);

}
