package com.mechw.model.payjs;

public class QrCode {

    // 1:请求成功，0:请求失败
    private int return_code;

    // return_code 为 0 时 status 参数为 0
    private int status;

    // return_code为0时返回的错误消息
    private String msg;

    // 返回消息
    private String return_msg;

    // PAYJS 平台订单号
    private String payjs_order_id;

    // 用户生成的订单号
    private String out_trade_no;

    // 金额,单位：分
    private String total_fee;

    // 二维码图片地址
    private String qrcode;

    // 可将该参数生成二维码展示出来进行扫码支付
    private String code_url;

    // 数据签名 详见签名算法
    private String sign;

    public QrCode(int return_code, int status, String msg, String return_msg, String payjs_order_id, String out_trade_no, String total_fee, String qrcode, String code_url, String sign) {
        this.return_code = return_code;
        this.status = status;
        this.msg = msg;
        this.return_msg = return_msg;
        this.payjs_order_id = payjs_order_id;
        this.out_trade_no = out_trade_no;
        this.total_fee = total_fee;
        this.qrcode = qrcode;
        this.code_url = code_url;
        this.sign = sign;
    }

    public int getReturn_code() {
        return return_code;
    }

    public void setReturn_code(int return_code) {
        this.return_code = return_code;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
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

    public String getOut_trade_no() {
        return out_trade_no;
    }

    public void setOut_trade_no(String out_trade_no) {
        this.out_trade_no = out_trade_no;
    }

    public String getTotal_fee() {
        return total_fee;
    }

    public void setTotal_fee(String total_fee) {
        this.total_fee = total_fee;
    }

    public String getQrcode() {
        return qrcode;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public String getCode_url() {
        return code_url;
    }

    public void setCode_url(String code_url) {
        this.code_url = code_url;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }
}
