package com.mechw.service.payssion;

import com.google.gson.Gson;
import com.mechw.model.payssion.RequestData;
import com.mechw.model.payssion.ServerResponse;

public class PSTools {

    // api_key
    public static final String API_KEY = "live_ea0bf4409643ffdf";
    // secret_key
    public static final String SECRET_KEY = "181607ab36e96a01e1225351b22a6d8a";
    // submit_url
    public static final String SUBMIT_URL = "https://www.payssion.com/api/v1/payment/create";
    // notify_url
    private static final String NOTIFY_URL = "https://www.mechw.com/payssion/notify.action";
    // return url
    private static final String RETURN_URL = "https://www.mechw.com/payssion/pay_success.html";
    private static Gson gson = new Gson();

    public static ServerResponse createOrder(RequestData requestData) {

        return null;
    }
}
