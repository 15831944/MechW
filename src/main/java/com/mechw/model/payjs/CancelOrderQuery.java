package com.mechw.model.payjs;

public class CancelOrderQuery {

    private String payjs_order_id;

    public CancelOrderQuery() {
    }

    public CancelOrderQuery(String payjs_order_id) {
        this.payjs_order_id = payjs_order_id;
    }

    public String getPayjs_order_id() {
        return payjs_order_id;
    }

    public void setPayjs_order_id(String payjs_order_id) {
        this.payjs_order_id = payjs_order_id;
    }
}
