package com.mechw.service.payjs.order;

import com.mechw.entity.payjs.PJOrder;

public interface PJOrderService {

    void insOrder(PJOrder pjOrder);

    void setOrderStatus(String outTradeNo, int status, String wechatOrderID);

    int getOrderStatus(String outTradeNo);

    void setOrderCanceled(String payjsOrderId);

    String getDocxLink(String outTradeNo);

    String getASMPRTLink(String outTradeNo);
}
