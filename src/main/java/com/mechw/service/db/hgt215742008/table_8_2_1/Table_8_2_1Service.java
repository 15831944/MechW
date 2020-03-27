package com.mechw.service.db.hgt215742008.table_8_2_1;


import com.mechw.entity.db.hgt215742008.Table_8_2_1;

import java.util.List;

public interface Table_8_2_1Service {

    // 查找大于所要求吊重的所有 Type 型号
    List<Float> findTypesByLiftWeight(Float liftWeight);

    // 根据Type型号，查找相应尺寸
    Table_8_2_1 findByType(Float type);

}
