package com.mechw.model.payssion;

import com.mechw.service.payssion.PSTools;

import static com.github.wxpay.sdk.WXPayUtil.MD5;

public class RequestData {

    private String pm_id;

    private double amount;

    private String currency;

    private String description;

    private String order_id;

    private String api_sig;

    private String return_url;

    private String payer_email;

    private String payer_name;

    public RequestData(String pm_id, double amount, String currency, String description, String order_id, String api_sig) {
        this.pm_id = pm_id;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.order_id = order_id;
        this.api_sig = api_sig;
    }

    public RequestData(String pm_id, double amount, String currency, String description, String order_id, String api_sig, String return_url, String payer_email, String payer_name) {
        this.pm_id = pm_id;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.order_id = order_id;
        this.api_sig = api_sig;
        this.return_url = return_url;
        this.payer_email = payer_email;
        this.payer_name = payer_name;
    }

    public String toMD5Sign() throws Exception {
        String str = PSTools.API_KEY + "|" + pm_id + "|" + amount + "|" + currency + "|" + order_id + "|" + PSTools.SECRET_KEY;
        return MD5(str);
    }

    public String getPm_id() {
        return pm_id;
    }

    public void setPm_id(String pm_id) {
        this.pm_id = pm_id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public String getApi_sig() {
        return api_sig;
    }

    public void setApi_sig(String api_sig) {
        this.api_sig = api_sig;
    }

    public String getReturn_url() {
        return return_url;
    }

    public void setReturn_url(String return_url) {
        this.return_url = return_url;
    }

    public String getPayer_email() {
        return payer_email;
    }

    public void setPayer_email(String payer_email) {
        this.payer_email = payer_email;
    }

    public String getPayer_name() {
        return payer_name;
    }

    public void setPayer_name(String payer_name) {
        this.payer_name = payer_name;
    }
}
