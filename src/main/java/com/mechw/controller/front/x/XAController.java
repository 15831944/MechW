package com.mechw.controller.front.x;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.x.a.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.x.DocxXA;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class XAController extends FrontController {

    @Autowired
    public XAController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // xaa
    @ResponseBody
    @RequestMapping(value = {"xaadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXAAADOCX(@RequestBody String receivedData) throws Exception {

        XAADocx xaaDocx = gson.fromJson(receivedData, XAADocx.class);

        // docx 计算书
        String docxUrl = DocxXA.getXAA(BaseName.getBase(), xaaDocx);

        // ribbonName
        String ribbonName = xaaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xaba
    @ResponseBody
    @RequestMapping(value = {"xabadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXABADOCX(@RequestBody String receivedData) throws Exception {

        XABADocx xabaDocx = gson.fromJson(receivedData, XABADocx.class);

        // docx 计算书
        String docxUrl = DocxXA.getXABA(BaseName.getBase(), xabaDocx);

        // ribbonName
        String ribbonName = xabaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xabb
    @ResponseBody
    @RequestMapping(value = {"xabbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXABBDOCX(@RequestBody String receivedData) throws Exception {

        XABBDocx xabbDocx = gson.fromJson(receivedData, XABBDocx.class);

        // docx 计算书
        String docxUrl = DocxXA.getXABB(BaseName.getBase(), xabbDocx);

        // ribbonName
        String ribbonName = xabbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xabc
    @ResponseBody
    @RequestMapping(value = {"xabcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXABCDOCX(@RequestBody String receivedData) throws Exception {

        XABCDocx xabcDocx = gson.fromJson(receivedData, XABCDocx.class);

        // docx 计算书
        String docxUrl = DocxXA.getXABC(BaseName.getBase(), xabcDocx);

        // ribbonName
        String ribbonName = xabcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xabd
    @ResponseBody
    @RequestMapping(value = {"xabddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXABDDOCX(@RequestBody String receivedData) throws Exception {

        XABDDocx xabdDocx = gson.fromJson(receivedData, XABDDocx.class);

        // docx 计算书
        String docxUrl = DocxXA.getXABD(BaseName.getBase(), xabdDocx);

        // ribbonName
        String ribbonName = xabdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
