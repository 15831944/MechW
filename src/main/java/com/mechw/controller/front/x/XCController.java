package com.mechw.controller.front.x;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.x.c.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.x.DocxXC;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class XCController extends FrontController {

    @Autowired
    public XCController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // xca
    @ResponseBody
    @RequestMapping(value = {"xcadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXCADOCX(@RequestBody String receivedData) throws Exception {

        XCADocx xcaDocx = gson.fromJson(receivedData, XCADocx.class);

        // docx 计算书
        String docxUrl = DocxXC.getXCA(BaseName.getBase(), xcaDocx);

        // ribbonName
        String ribbonName = xcaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xcb
    @ResponseBody
    @RequestMapping(value = {"xcbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXCBDOCX(@RequestBody String receivedData) throws Exception {

        XCBDocx xcbDocx = gson.fromJson(receivedData, XCBDocx.class);

        // docx 计算书
        String docxUrl = DocxXC.getXCB(BaseName.getBase(), xcbDocx);

        // ribbonName
        String ribbonName = xcbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xcc
    @ResponseBody
    @RequestMapping(value = {"xccdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXCCDOCX(@RequestBody String receivedData) throws Exception {

        XCCDocx xccDocx = gson.fromJson(receivedData, XCCDocx.class);

        // docx 计算书
        String docxUrl = DocxXC.getXCC(BaseName.getBase(), xccDocx);

        // ribbonName
        String ribbonName = xccDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xcd
    @ResponseBody
    @RequestMapping(value = {"xcddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXCDDOCX(@RequestBody String receivedData) throws Exception {

        XCDDocx xcdDocx = gson.fromJson(receivedData, XCDDocx.class);

        // docx 计算书
        String docxUrl = DocxXC.getXCD(BaseName.getBase(), xcdDocx);

        // ribbonName
        String ribbonName = xcdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // xce
    @ResponseBody
    @RequestMapping(value = {"xcedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calXCEDOCX(@RequestBody String receivedData) throws Exception {

        XCEDocx xceDocx = gson.fromJson(receivedData, XCEDocx.class);

        // docx 计算书
        String docxUrl = DocxXC.getXCE(BaseName.getBase(), xceDocx);

        // ribbonName
        String ribbonName = xceDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
