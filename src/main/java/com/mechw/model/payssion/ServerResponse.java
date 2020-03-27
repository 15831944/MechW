package com.mechw.model.payssion;

public class ServerResponse {

    //200:Success;400:invalid parameters;401:invalid merchant_id;402:invalid api signature;403:invalid app_name;
    //405:invalid payment method;406:invalid currency;407:invalid amount;408:invalid language;409:invalid URL;
    //411:invalid secret key;412:invalid transaction_id;413:repeated order;414:invalid country;415:invalid payment type;
    //420:invalid request method;441:the app is inactive;491:this payment method is not enabled;500:server error;
    //501:server busy;502:the third party error;503:service not found;
    private int result_code;

    private PayssionTransaction transaction;

    // redirect  or done
    private String todo;

    private String redirect_url;

    public ServerResponse(int result_code, PayssionTransaction transaction, String todo) {
        this.result_code = result_code;
        this.transaction = transaction;
        this.todo = todo;
    }

    public ServerResponse(int result_code, PayssionTransaction transaction, String todo, String redirect_url) {
        this.result_code = result_code;
        this.transaction = transaction;
        this.todo = todo;
        this.redirect_url = redirect_url;
    }

    public int getResult_code() {
        return result_code;
    }

    public void setResult_code(int result_code) {
        this.result_code = result_code;
    }

    public PayssionTransaction getTransaction() {
        return transaction;
    }

    public void setTransaction(PayssionTransaction transaction) {
        this.transaction = transaction;
    }

    public String getTodo() {
        return todo;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }

    public String getRedirect_url() {
        return redirect_url;
    }

    public void setRedirect_url(String redirect_url) {
        this.redirect_url = redirect_url;
    }
}
