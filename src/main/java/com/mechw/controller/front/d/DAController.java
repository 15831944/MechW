package com.mechw.controller.front.d;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.d.a.a.DAADocx;
import com.mechw.service.BaseName;
import com.mechw.service.docx.d.DocxDA;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DAController extends FrontController {

    @Autowired
    public DAController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // daadocx
    @ResponseBody
    @RequestMapping(value = {"daadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calDAADOCX(@RequestBody String receivedData) throws Exception {

        DAADocx daaDocx = gson.fromJson(receivedData, DAADocx.class);

        // docx 计算书
        String docxUrl = DocxDA.getDAA(BaseName.getBase(), daaDocx);

        // ribbonName
        String ribbonName = daaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
