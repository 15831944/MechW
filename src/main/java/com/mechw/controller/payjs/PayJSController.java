package com.mechw.controller.payjs;

import com.mechw.controller.CommonController;
import com.mechw.model.payjs.CancelOrderQuery;
import com.mechw.model.payjs.OrderQuery;
import com.mechw.service.payjs.PJTools;
import com.mechw.service.payjs.order.PJOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class PayJSController extends CommonController {

    private PJOrderService pjOrderService;

    @Autowired
    public PayJSController(PJOrderService pjOrderService) {
        this.pjOrderService = pjOrderService;
    }

    // payjs 回调通知地址
    @ResponseBody
    @RequestMapping(value = {"payjs/notify.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String notify(@RequestBody String receivedData) {

        Map<String, String> data = PJTools.notifyToMap(receivedData);

        // 提取返回码
        int returnCode = Integer.parseInt(data.get("return_code"));

        // 1 表示付款成功
        if (returnCode != 1) {
            return "success";
        }
        String outTradeNo = data.get("out_trade_no");
        String wechatOrderID = data.get("transaction_id");

        // 1.验签逻辑


        // 2.验重逻辑


        // 3.自身业务逻辑，写入订单信息入库
        pjOrderService.setOrderStatus(outTradeNo, returnCode, wechatOrderID);

        return "success";
    }

    // 查询订单状态
    @ResponseBody
    @RequestMapping(value = {"payjs/order/get_order_status.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String getOrderStatus(@RequestBody String receivedData) {

        OrderQuery orderQuery = gson.fromJson(receivedData, OrderQuery.class);
        return gson.toJson(pjOrderService.getOrderStatus(orderQuery.getOutTradeNo()));
    }

    // 查询计算书下载链接
    @ResponseBody
    @RequestMapping(value = {"payjs/order/get_order_docxlink.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String getOrderDocxLink(@RequestBody String receivedData) {

        OrderQuery orderQuery = gson.fromJson(receivedData, OrderQuery.class);
        return gson.toJson(pjOrderService.getDocxLink(orderQuery.getOutTradeNo()));
    }

    // 查询模型下载链接
    @ResponseBody
    @RequestMapping(value = {"payjs/order/get_order_asmprtlink.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String getOrderASMPRTLink(@RequestBody String receivedData) {

        OrderQuery orderQuery = gson.fromJson(receivedData, OrderQuery.class);
        return gson.toJson(pjOrderService.getASMPRTLink(orderQuery.getOutTradeNo()));
    }

    // 关闭订单
    @ResponseBody
    @RequestMapping(value = {"payjs/order/cancel_order.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String cancelOrder(@RequestBody String receivedData) throws Exception {

        // 获取要关闭的payjs订单号
        CancelOrderQuery cancelOrderQuery = gson.fromJson(receivedData, CancelOrderQuery.class);
        String payjs_order_id = cancelOrderQuery.getPayjs_order_id();

        // mechw 取消订单
        pjOrderService.setOrderCanceled(payjs_order_id);

        // payjs 取消订单
        return gson.toJson(PJTools.cancelOrder(payjs_order_id));
    }
}
