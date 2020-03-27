package com.mechw.controller.front.c;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.c.a.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.c.DocxCA;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CAController extends FrontController {

    @Autowired
    public CAController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // caaa
    @ResponseBody
    @RequestMapping(value = {"caaadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCAAADOCX(@RequestBody String receivedData) throws Exception {

        CAAADocx caaaDocx = gson.fromJson(receivedData, CAAADocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCAAA(BaseName.getBase(), caaaDocx);

        // ribbonName
        String ribbonName = caaaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // caba
    @ResponseBody
    @RequestMapping(value = {"cabadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCABADOCX(@RequestBody String receivedData) throws Exception {

        CABADocx cabaDocx = gson.fromJson(receivedData, CABADocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCABA(BaseName.getBase(), cabaDocx);

        // ribbonName
        String ribbonName = cabaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // caca
    @ResponseBody
    @RequestMapping(value = {"cacadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCACADOCX(@RequestBody String receivedData) throws Exception {

        CACADocx cacaDocx = gson.fromJson(receivedData, CACADocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCACA(BaseName.getBase(), cacaDocx);

        // ribbonName
        String ribbonName = cacaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cacb
    @ResponseBody
    @RequestMapping(value = {"cacbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCACBDOCX(@RequestBody String receivedData) throws Exception {

        CACBDocx cacbDocx = gson.fromJson(receivedData, CACBDocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCACB(BaseName.getBase(), cacbDocx);

        // ribbonName
        String ribbonName = cacbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cada
    @ResponseBody
    @RequestMapping(value = {"cadadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCADADOCX(@RequestBody String receivedData) throws Exception {

        CADADocx cadaDocx = gson.fromJson(receivedData, CADADocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCADA(BaseName.getBase(), cadaDocx);

        // ribbonName
        String ribbonName = cadaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cadb
    @ResponseBody
    @RequestMapping(value = {"cadbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCADBDOCX(@RequestBody String receivedData) throws Exception {

        CADBDocx cadbDocx = gson.fromJson(receivedData, CADBDocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCADB(BaseName.getBase(), cadbDocx);

        // ribbonName
        String ribbonName = cadbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // caea
    @ResponseBody
    @RequestMapping(value = {"caeadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCAEADOCX(@RequestBody String receivedData) throws Exception {

        CAEADocx caeaDocx = gson.fromJson(receivedData, CAEADocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCAEA(BaseName.getBase(), caeaDocx);

        // ribbonName
        String ribbonName = caeaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cafa
    @ResponseBody
    @RequestMapping(value = {"cafadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCAFADOCX(@RequestBody String receivedData) throws Exception {

        CAFADocx cafaDocx = gson.fromJson(receivedData, CAFADocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCAFA(BaseName.getBase(), cafaDocx);

        // ribbonName
        String ribbonName = cafaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cafb
    @ResponseBody
    @RequestMapping(value = {"cafbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCAFBDOCX(@RequestBody String receivedData) throws Exception {

        CAFBDocx cafbDocx = gson.fromJson(receivedData, CAFBDocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCAFB(BaseName.getBase(), cafbDocx);

        // ribbonName
        String ribbonName = cafbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cafc
    @ResponseBody
    @RequestMapping(value = {"cafcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCAFCDOCX(@RequestBody String receivedData) throws Exception {

        CAFCDocx cafcDocx = gson.fromJson(receivedData, CAFCDocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCAFC(BaseName.getBase(), cafcDocx);

        // ribbonName
        String ribbonName = cafcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cafd
    @ResponseBody
    @RequestMapping(value = {"cafddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCAFDDOCX(@RequestBody String receivedData) throws Exception {

        CAFDDocx cafdDocx = gson.fromJson(receivedData, CAFDDocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCAFD(BaseName.getBase(), cafdDocx);

        // ribbonName
        String ribbonName = cafdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // cag
    @ResponseBody
    @RequestMapping(value = {"cagdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calCAGDOCX(@RequestBody String receivedData) throws Exception {

        CAGDocx cagDocx = gson.fromJson(receivedData, CAGDocx.class);

        // docx 计算书
        String docxUrl = DocxCA.getCAG(BaseName.getBase(), cagDocx);

        // ribbonName
        String ribbonName = cagDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
