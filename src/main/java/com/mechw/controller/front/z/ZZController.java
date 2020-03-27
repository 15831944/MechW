package com.mechw.controller.front.z;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.z.z.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.z.DocxZZ;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ZZController extends FrontController {

    @Autowired
    public ZZController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // zzea
    @ResponseBody
    @RequestMapping(value = {"zzeadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZEADOCX(@RequestBody String receivedData) throws Exception {

        ZZEADocx zzeaDocx = gson.fromJson(receivedData, ZZEADocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZEA(BaseName.getBase(), zzeaDocx);

        // ribbonName
        String ribbonName = zzeaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzeb
    @ResponseBody
    @RequestMapping(value = {"zzebdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZEBDOCX(@RequestBody String receivedData) throws Exception {

        ZZEBDocx zzebDocx = gson.fromJson(receivedData, ZZEBDocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZEB(BaseName.getBase(), zzebDocx);

        // ribbonName
        String ribbonName = zzebDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzec
    @ResponseBody
    @RequestMapping(value = {"zzecdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZECDOCX(@RequestBody String receivedData) throws Exception {

        ZZECDocx zzecDocx = gson.fromJson(receivedData, ZZECDocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZEC(BaseName.getBase(), zzecDocx);

        // ribbonName
        String ribbonName = zzecDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzed
    @ResponseBody
    @RequestMapping(value = {"zzeddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZEDDOCX(@RequestBody String receivedData) throws Exception {

        ZZEDDocx zzedDocx = gson.fromJson(receivedData, ZZEDDocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZED(BaseName.getBase(), zzedDocx);

        // ribbonName
        String ribbonName = zzedDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzf
    @ResponseBody
    @RequestMapping(value = {"zzfdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZFDOCX(@RequestBody String receivedData) throws Exception {

        ZZFDocx zzfDocx = gson.fromJson(receivedData, ZZFDocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZF(BaseName.getBase(), zzfDocx);

        // ribbonName
        String ribbonName = zzfDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzg
    @ResponseBody
    @RequestMapping(value = {"zzgdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZGDOCX(@RequestBody String receivedData) throws Exception {

        ZZGDocx zzgDocx = gson.fromJson(receivedData, ZZGDocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZG(BaseName.getBase(), zzgDocx);

        // ribbonName
        String ribbonName = zzgDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzha
    @ResponseBody
    @RequestMapping(value = {"zzhadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZHADOCX(@RequestBody String receivedData) throws Exception {

        ZZHADocx zzhaDocx = gson.fromJson(receivedData, ZZHADocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZHA(BaseName.getBase(), zzhaDocx);

        // ribbonName
        String ribbonName = zzhaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzhb
    @ResponseBody
    @RequestMapping(value = {"zzhbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZHBDOCX(@RequestBody String receivedData) throws Exception {

        ZZHBDocx zzhbDocx = gson.fromJson(receivedData, ZZHBDocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZHB(BaseName.getBase(), zzhbDocx);

        // ribbonName
        String ribbonName = zzhbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zzj
    @ResponseBody
    @RequestMapping(value = {"zzjdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZZJDOCX(@RequestBody String receivedData) throws Exception {

        ZZJDocx zzjDocx = gson.fromJson(receivedData, ZZJDocx.class);

        // docx 计算书
        String docxUrl = DocxZZ.getZZJ(BaseName.getBase(), zzjDocx);

        // ribbonName
        String ribbonName = zzjDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
