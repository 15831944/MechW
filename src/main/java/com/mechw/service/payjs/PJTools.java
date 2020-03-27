package com.mechw.service.payjs;

import com.google.gson.Gson;
import com.mechw.model.payjs.CancelOrderRec;
import com.mechw.model.payjs.QrCode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static com.github.wxpay.sdk.WXPayUtil.MD5;

public class PJTools {

    // 编码
    public static final String charset = "UTF-8";
    // 商户 ID
    private static final String MCHID = "DYKQPD";
    // 秘钥
    private static final String KEY = "kBtXmyFdkXBdoQVQ";
    // 回调地址
    private static final String NOTIFY_URL = "https://www.mechw.com/payjs/notify.action";

    private static Gson gson = new Gson();

    // 获取自定义订单号
    public static String getTradeNo() {

        LocalDate today = LocalDate.now();
        int year = today.getYear();
        int month = today.getMonthValue();
        int day = today.getDayOfMonth();
        LocalTime now = LocalTime.now();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getNano();
        return "E" + year + month + day + hour + minute + second + (int) (Math.random() * 1000);
    }

    // md5 签名算法
    public static String sign(Map<String, String> data, String key) throws Exception {

        Set<String> keySet = data.keySet();
        String[] keyArray = keySet.toArray(new String[keySet.size()]);
        Arrays.sort(keyArray);
        StringBuilder sb = new StringBuilder();
        for (String k : keyArray) {
            if (data.get(k).trim().length() > 0) {
                sb.append(k).append("=").append(data.get(k).trim()).append("&");
            }
        }
        sb.append("key=").append(key);
        return MD5(sb.toString()).toUpperCase();
    }

    // 发送请求，接收二维码数据
    private static String readContentFromPost(String toUrl, Map<String, String> parameterMap) {
        String result = null;
        HttpURLConnection connection = null;
        BufferedReader reader = null;
        StringBuilder parameterBuffer = new StringBuilder();
        if (parameterMap != null) {
            Iterator iterator = parameterMap.keySet().iterator();
            String key;
            String value;
            while (iterator.hasNext()) {
                key = (String) iterator.next();
                if (parameterMap.get(key) != null) {
                    value = "" + parameterMap.get(key);
                } else {
                    value = "";
                }

                parameterBuffer.append(key).append("=").append(value);
                if (iterator.hasNext()) {
                    parameterBuffer.append("&");
                }
            }
        }
        try {
            // 创建连接
            URL url = new URL(toUrl);
            connection = (HttpURLConnection) url
                    .openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("POST");
            connection.setUseCaches(false);
            connection.setInstanceFollowRedirects(true);
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            connection.connect();

            // POST请求
            OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), charset);
            System.out.println("Sending post data:" + parameterBuffer.toString());
            out.append(parameterBuffer.toString());
            out.flush();
            out.close();

            // 读取响应
            reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream(), "utf-8"));
            String lines;
            StringBuilder sb = new StringBuilder("");
            while ((lines = reader.readLine()) != null) {
                sb.append(lines);
            }
            result = sb.toString();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (null != reader) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (null != connection)
                connection.disconnect();
        }
        return result;
    }

    public static QrCode getQrCode(String title, String outTradeNo, String totalFee) throws Exception {

        // 准备发送数据
        Map<String, String> map = new HashMap<>();
        map.put("body", title);
        map.put("mchid", PJTools.MCHID);
        map.put("notify_url", PJTools.NOTIFY_URL);
        map.put("out_trade_no", outTradeNo);
        map.put("total_fee", "" + totalFee);

        // 加密
        String md5 = sign(map, PJTools.KEY);
        map.put("sign", md5);

        // payjs 的二维码返回结果加上 title 返回给前端
        return gson.fromJson(PJTools.readContentFromPost("https://payjs.cn/api/native", map), QrCode.class);
    }

    // Unicode 转中文
    public static String decodeUnicode(final String dataStr) {
        int start = 0;
        int end;
        final StringBuilder buffer = new StringBuilder();
        while (start > -1) {
            end = dataStr.indexOf("\\u", start + 2);
            String charStr;
            if (end == -1) {
                charStr = dataStr.substring(start + 2, dataStr.length());
            } else {
                charStr = dataStr.substring(start + 2, end);
            }
            // 16进制parse整形字符串。
            char letter = (char) Integer.parseInt(charStr, 16);
            buffer.append(Character.toString(letter));
            start = end;
        }
        return buffer.toString();
    }

    // notify 数据转 map
    public static Map<String, String> notifyToMap(String string) {

        Map<String, String> map = new HashMap<>();

        String[] params = string.split("&");
        for (String param : params) {
            String[] p = param.split("=");
            if (p.length == 2) {
                map.put(p[0], p[1]);
            }
        }
        return map;
    }

    // 关闭订单
    public static int cancelOrder(String payjs_order_id) throws Exception {

        // 准备发送数据
        Map<String, String> map = new HashMap<>();
        map.put("payjs_order_id", payjs_order_id);
        String md5 = PJTools.sign(map, PJTools.KEY);
        map.put("sign", md5);

        // 发送关闭请求
        CancelOrderRec cancelOrderRec = gson.fromJson(PJTools.readContentFromPost("https://payjs.cn/api/close", map), CancelOrderRec.class);
        return cancelOrderRec.getReturn_code();
    }
}
