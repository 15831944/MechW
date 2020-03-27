package com.mechw.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class CommonController {

    protected static Gson gson = new Gson();

    @Autowired
    public CommonController() {
    }

    public static Gson getGson() {
        return gson;
    }

    public static void setGson(Gson gson) {
        CommonController.gson = gson;
    }
}
