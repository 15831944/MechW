package com.mechw.controller.front.a;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.a.b.ABADocx;
import com.mechw.service.BaseName;
import com.mechw.service.docx.a.DocxAB;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ABController extends FrontController {

    @Autowired
    public ABController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // aba
    @ResponseBody
    @RequestMapping(value = {"abadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calABADOCX(@RequestBody String receivedData) throws Exception {

        ABADocx abaDocx = gson.fromJson(receivedData, ABADocx.class);

        // docx 计算书
        String docxUrl = DocxAB.getABA(BaseName.getBase(), abaDocx);

        // ribbonName
        String ribbonName = abaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
