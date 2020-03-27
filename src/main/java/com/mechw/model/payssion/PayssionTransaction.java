package com.mechw.model.payssion;

public class PayssionTransaction {

    private String transaction_id;
    private String state;
    private String amount;
    private String currency;
    private String order_id;
    private String amount_local;
    private String currency_local;

    public PayssionTransaction(String transaction_id, String state, String amount, String currency, String order_id) {
        this.transaction_id = transaction_id;
        this.state = state;
        this.amount = amount;
        this.currency = currency;
        this.order_id = order_id;
    }

    public PayssionTransaction(String transaction_id, String state, String amount, String currency, String order_id, String amount_local, String currency_local) {
        this.transaction_id = transaction_id;
        this.state = state;
        this.amount = amount;
        this.currency = currency;
        this.order_id = order_id;
        this.amount_local = amount_local;
        this.currency_local = currency_local;
    }

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public String getAmount_local() {
        return amount_local;
    }

    public void setAmount_local(String amount_local) {
        this.amount_local = amount_local;
    }

    public String getCurrency_local() {
        return currency_local;
    }

    public void setCurrency_local(String currency_local) {
        this.currency_local = currency_local;
    }
}
