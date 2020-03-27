package com.mechw.model.payjs;

public class OrderQuery {

    private String outTradeNo;

    public OrderQuery() {
    }

    public OrderQuery(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }

    public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }
}
