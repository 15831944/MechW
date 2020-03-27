package com.mechw.controller.front.x;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.x.d.XDADocx;
import com.mechw.model.front.x.d.XDBDocx;
import com.mechw.service.BaseName;
import com.mechw.service.docx.x.DocxXD;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class XDController extends FrontController {

    @Autowired
    public XDController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // xda
    @ResponseBody
    @RequestMapping(value = {"xdadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXDADOCX(@RequestBody String receivedData) throws Exception {

        XDADocx xdaDocx = gson.fromJson(receivedData, XDADocx.class);

        // docx 计算书
        String docxUrl = DocxXD.getXDA(BaseName.getBase(), xdaDocx);

        // ribbonName
        String ribbonName = xdaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xdb
    @ResponseBody
    @RequestMapping(value = {"xdbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXDBDOCX(@RequestBody String receivedData) throws Exception {

        XDBDocx xdbDocx = gson.fromJson(receivedData, XDBDocx.class);

        // docx 计算书
        String docxUrl = DocxXD.getXDB(BaseName.getBase(), xdbDocx);

        // ribbonName
        String ribbonName = xdbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
