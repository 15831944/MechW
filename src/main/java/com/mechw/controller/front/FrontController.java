package com.mechw.controller.front;

import com.mechw.controller.CommonController;
import com.mechw.entity.payjs.PJOrder;
import com.mechw.entity.payjs.PJProduct;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.payjs.QrCode;
import com.mechw.service.payjs.PJTools;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class FrontController extends CommonController {

    private PJProductService pjProductService;
    private PJOrderService pjOrderService;

    @Autowired
    public FrontController(PJProductService pjProductService, PJOrderService pjOrderService) {
        this.pjProductService = pjProductService;
        this.pjOrderService = pjOrderService;
    }

    /**
     * 后台处理订单信息
     *
     * @param docxUrl    计算书下载地址
     * @param ribbonName 前端 name
     * @return 二维码结果
     * @throws Exception 异常
     */
    protected FrontQrCode procOrder(String docxUrl, String ribbonName) throws Exception {

        // 生成订单号
        String outTradeNo = PJTools.getTradeNo();

        // 查询 title 和 totalFee
        PJProduct pjProduct = pjProductService.getPJProduct(ribbonName);
        String title = pjProduct.getTitle();
        int totalFee = pjProduct.getTotalFee();

        // payjs 的二维码返回结果
        QrCode qrCode = PJTools.getQrCode(title, outTradeNo, Integer.toString(totalFee));

        // 订单信息入库, status 为 0 表示未支付, canceled 为 0 表示未取消，
        // 微信交易号留空，需等待支付成功回调时才会推送得到，并写入
        String payjsOrderId = qrCode.getPayjs_order_id();
        PJOrder pjOrder = new PJOrder(null, outTradeNo, payjsOrderId, "", ribbonName, title, totalFee, 0, 0, docxUrl);
        pjOrderService.insOrder(pjOrder);

        // qrCode 加上 title 返回给前端
        return FrontQrCode.getInstance(title, qrCode);
    }
}
