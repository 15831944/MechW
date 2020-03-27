package com.mechw.model.payjs;

public class CancelOrderRec {

    private int return_code;
    private String return_msg;
    private String payjs_order_id;
    private String sign;

    public CancelOrderRec() {
    }

    public CancelOrderRec(int return_code, String return_msg, String payjs_order_id, String sign) {
        this.return_code = return_code;
        this.return_msg = return_msg;
        this.payjs_order_id = payjs_order_id;
        this.sign = sign;
    }

    public int getReturn_code() {
        return return_code;
    }

    public void setReturn_code(int return_code) {
        this.return_code = return_code;
    }

    public String getReturn_msg() {
        return return_msg;
    }

    public void setReturn_msg(String return_msg) {
        this.return_msg = return_msg;
    }

    public String getPayjs_order_id() {
        return payjs_order_id;
    }

    public void setPayjs_order_id(String payjs_order_id) {
        this.payjs_order_id = payjs_order_id;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }
}
