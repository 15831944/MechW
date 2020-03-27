package com.mechw.model.payssion;

public class PayssionNotify {

    private String app_name;
    private String pm_id;
    private String transaction_id;
    private String order_id;
    private String amount;
    private String paid;
    private String net;
    private String currency;
    private String description;
    private String state;
    private String notify_sig;

    public PayssionNotify() {
    }

    public PayssionNotify(String app_name, String pm_id, String transaction_id, String order_id, String amount, String paid, String net, String currency, String description, String state, String notify_sig) {
        this.app_name = app_name;
        this.pm_id = pm_id;
        this.transaction_id = transaction_id;
        this.order_id = order_id;
        this.amount = amount;
        this.paid = paid;
        this.net = net;
        this.currency = currency;
        this.description = description;
        this.state = state;
        this.notify_sig = notify_sig;
    }

    public String getApp_name() {
        return app_name;
    }

    public void setApp_name(String app_name) {
        this.app_name = app_name;
    }

    public String getPm_id() {
        return pm_id;
    }

    public void setPm_id(String pm_id) {
        this.pm_id = pm_id;
    }

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getPaid() {
        return paid;
    }

    public void setPaid(String paid) {
        this.paid = paid;
    }

    public String getNet() {
        return net;
    }

    public void setNet(String net) {
        this.net = net;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getNotify_sig() {
        return notify_sig;
    }

    public void setNotify_sig(String notify_sig) {
        this.notify_sig = notify_sig;
    }
}
