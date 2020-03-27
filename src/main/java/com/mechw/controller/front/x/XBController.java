package com.mechw.controller.front.x;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.x.b.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.x.DocxXB;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class XBController extends FrontController {

    @Autowired
    public XBController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // xbaa
    @ResponseBody
    @RequestMapping(value = {"xbaadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBAADOCX(@RequestBody String receivedData) throws Exception {

        XBAADocx xbaaDocx = gson.fromJson(receivedData, XBAADocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBAA(BaseName.getBase(), xbaaDocx);

        // ribbonName
        String ribbonName = xbaaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xbab
    @ResponseBody
    @RequestMapping(value = {"xbabdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBABDOCX(@RequestBody String receivedData) throws Exception {

        XBABDocx xbabDocx = gson.fromJson(receivedData, XBABDocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBAB(BaseName.getBase(), xbabDocx);

        // ribbonName
        String ribbonName = xbabDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xbac
    @ResponseBody
    @RequestMapping(value = {"xbacdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBACDOCX(@RequestBody String receivedData) throws Exception {

        XBACDocx xbacDocx = gson.fromJson(receivedData, XBACDocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBAC(BaseName.getBase(), xbacDocx);

        // ribbonName
        String ribbonName = xbacDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xbba
    @ResponseBody
    @RequestMapping(value = {"xbbadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBBADOCX(@RequestBody String receivedData) throws Exception {

        XBBADocx xbbaDocx = gson.fromJson(receivedData, XBBADocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBBA(BaseName.getBase(), xbbaDocx);

        // ribbonName
        String ribbonName = xbbaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xbbb
    @ResponseBody
    @RequestMapping(value = {"xbbbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBBBDOCX(@RequestBody String receivedData) throws Exception {

        XBBBDocx xbbbDocx = gson.fromJson(receivedData, XBBBDocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBBB(BaseName.getBase(), xbbbDocx);

        // ribbonName
        String ribbonName = xbbbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xbbc
    @ResponseBody
    @RequestMapping(value = {"xbbcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBBCDOCX(@RequestBody String receivedData) throws Exception {

        XBBCDocx xbbcDocx = gson.fromJson(receivedData, XBBCDocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBBC(BaseName.getBase(), xbbcDocx);

        // ribbonName
        String ribbonName = xbbcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xbbd
    @ResponseBody
    @RequestMapping(value = {"xbbddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBBDDOCX(@RequestBody String receivedData) throws Exception {

        XBBDDocx xbbdDocx = gson.fromJson(receivedData, XBBDDocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBBD(BaseName.getBase(), xbbdDocx);

        // ribbonName
        String ribbonName = xbbdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xbbe
    @ResponseBody
    @RequestMapping(value = {"xbbedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXBBEDOCX(@RequestBody String receivedData) throws Exception {

        XBBEDocx xbbeDocx = gson.fromJson(receivedData, XBBEDocx.class);

        // docx 计算书
        String docxUrl = DocxXB.getXBBE(BaseName.getBase(), xbbeDocx);

        // ribbonName
        String ribbonName = xbbeDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
