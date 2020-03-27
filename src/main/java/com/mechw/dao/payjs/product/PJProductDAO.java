package com.mechw.dao.payjs.product;

import com.mechw.entity.payjs.PJProduct;

public interface PJProductDAO {

    // 根据前台传来的 ribbonName 查询商品标题和售价
    PJProduct getPJProduct(String ribbonName);
}