package com.mechw.dao.payjs.order;

import com.mechw.entity.payjs.PJOrder;

public interface PJOrderDAO {

    // 插入一个新订单
    void insOrder(PJOrder pjOrder);

    // 更改订单状态为 1 已付款，并写入微信交易号
    void setOrderStatus(String outTradeNo, int status, String wechatOrderID);

    // 查询订单状态
    int getOrderStatus(String outTradeNo);

    // 将订单设置为取消 canceled 状态
    void setOrderCanceled(String payjsOrderId);

    // 获取订单下载链接
    String getDocxLink(String outTradeNo);

    // 获取订单下载链接
    String getASMPRTLink(String outTradeNo);
}