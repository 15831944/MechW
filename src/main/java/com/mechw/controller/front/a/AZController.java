package com.mechw.controller.front.a;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.a.z.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.a.DocxAZ;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AZController extends FrontController {

    @Autowired
    public AZController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // azaa
    @ResponseBody
    @RequestMapping(value = {"azaadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZAADOCX(@RequestBody String receivedData) throws Exception {

        AZAADocx azaaDocx = gson.fromJson(receivedData, AZAADocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZAA(BaseName.getBase(), azaaDocx);

        // ribbonName
        String ribbonName = azaaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azab
    @ResponseBody
    @RequestMapping(value = {"azabdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZABDOCX(@RequestBody String receivedData) throws Exception {

        AZABDocx azabDocx = gson.fromJson(receivedData, AZABDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZAB(BaseName.getBase(), azabDocx);

        // ribbonName
        String ribbonName = azabDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azac
    @ResponseBody
    @RequestMapping(value = {"azacdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZACDOCX(@RequestBody String receivedData) throws Exception {

        AZACDocx azacDocx = gson.fromJson(receivedData, AZACDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZAC(BaseName.getBase(), azacDocx);

        // ribbonName
        String ribbonName = azacDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azad
    @ResponseBody
    @RequestMapping(value = {"azaddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZADDOCX(@RequestBody String receivedData) throws Exception {

        AZADDocx azadDocx = gson.fromJson(receivedData, AZADDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZAD(BaseName.getBase(), azadDocx);

        // ribbonName
        String ribbonName = azadDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azba
    @ResponseBody
    @RequestMapping(value = {"azbadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZBADOCX(@RequestBody String receivedData) throws Exception {

        AZBADocx azbaDocx = gson.fromJson(receivedData, AZBADocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZBA(BaseName.getBase(), azbaDocx);

        // ribbonName
        String ribbonName = azbaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azbb
    @ResponseBody
    @RequestMapping(value = {"azbbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZBBDOCX(@RequestBody String receivedData) throws Exception {

        AZBBDocx azbbDocx = gson.fromJson(receivedData, AZBBDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZBB(BaseName.getBase(), azbbDocx);

        // ribbonName
        String ribbonName = azbbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azbc
    @ResponseBody
    @RequestMapping(value = {"azbcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZBCDOCX(@RequestBody String receivedData) throws Exception {

        AZBCDocx azbcDocx = gson.fromJson(receivedData, AZBCDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZBC(BaseName.getBase(), azbcDocx);

        // ribbonName
        String ribbonName = azbcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azbd
    @ResponseBody
    @RequestMapping(value = {"azbddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZBDDOCX(@RequestBody String receivedData) throws Exception {

        AZBDDocx azbdDocx = gson.fromJson(receivedData, AZBDDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZBD(BaseName.getBase(), azbdDocx);

        // ribbonName
        String ribbonName = azbdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azca
    @ResponseBody
    @RequestMapping(value = {"azcadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZCADOCX(@RequestBody String receivedData) throws Exception {

        AZCADocx azcaDocx = gson.fromJson(receivedData, AZCADocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZCA(BaseName.getBase(), azcaDocx);

        // ribbonName
        String ribbonName = azcaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azcb
    @ResponseBody
    @RequestMapping(value = {"azcbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZCBDOCX(@RequestBody String receivedData) throws Exception {

        AZCBDocx azcbDocx = gson.fromJson(receivedData, AZCBDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZCB(BaseName.getBase(), azcbDocx);

        // ribbonName
        String ribbonName = azcbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // azcc
    @ResponseBody
    @RequestMapping(value = {"azccdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAZCCDOCX(@RequestBody String receivedData) throws Exception {

        AZCCDocx azccDocx = gson.fromJson(receivedData, AZCCDocx.class);

        // docx 计算书
        String docxUrl = DocxAZ.getAZCC(BaseName.getBase(), azccDocx);

        // ribbonName
        String ribbonName = azccDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
