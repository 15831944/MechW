package com.mechw.model.front;

import com.mechw.model.payjs.QrCode;

public class FrontQrCode extends QrCode {

    private String title;

    private FrontQrCode(int return_code, int status, String msg, String return_msg, String payjs_order_id, String out_trade_no, String total_fee, String qrcode, String code_url, String sign, String title) {
        super(return_code, status, msg, return_msg, payjs_order_id, out_trade_no, total_fee, qrcode, code_url, sign);
        this.title = title;
    }

    public static FrontQrCode getInstance(String title, QrCode qrCode) {
        return new FrontQrCode(qrCode.getReturn_code(), qrCode.getStatus(), qrCode.getMsg(), qrCode.getReturn_msg(),
                qrCode.getPayjs_order_id(), qrCode.getOut_trade_no(), qrCode.getTotal_fee(),
                qrCode.getQrcode(), qrCode.getCode_url(), qrCode.getSign(), title);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
