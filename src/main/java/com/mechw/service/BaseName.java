package com.mechw.service;

import java.time.LocalDate;
import java.time.LocalTime;

public class BaseName {

    public BaseName() {
    }

    public static String getBase() {

        LocalDate today = LocalDate.now();
        int year = today.getYear();
        int month = today.getMonthValue();
        int day = today.getDayOfMonth();
        LocalTime now = LocalTime.now();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getNano();
        return "/" + year + "/" + month + "/" + day + "/" + hour + "/" + minute + "/" + second;
    }
}
