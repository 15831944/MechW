package com.mechw.controller.front.b;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.b.d.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.b.DocxBD;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BDController extends FrontController {

    @Autowired
    public BDController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // bda
    @ResponseBody
    @RequestMapping(value = {"bdadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBDADOCX(@RequestBody String receivedData) throws Exception {

        BDADocx bdaDocx = gson.fromJson(receivedData, BDADocx.class);

        // docx 计算书
        String docxUrl = DocxBD.getBDA(BaseName.getBase(), bdaDocx);

        // ribbonName
        String ribbonName = bdaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bdb
    @ResponseBody
    @RequestMapping(value = {"bdbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBDBDOCX(@RequestBody String receivedData) throws Exception {

        BDBDocx bdbDocx = gson.fromJson(receivedData, BDBDocx.class);

        // docx 计算书
        String docxUrl = DocxBD.getBDB(BaseName.getBase(), bdbDocx);

        // ribbonName
        String ribbonName = bdbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bdc
    @ResponseBody
    @RequestMapping(value = {"bdcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBDCDOCX(@RequestBody String receivedData) throws Exception {

        BDCDocx bdcDocx = gson.fromJson(receivedData, BDCDocx.class);

        // docx 计算书
        String docxUrl = DocxBD.getBDC(BaseName.getBase(), bdcDocx);

        // ribbonName
        String ribbonName = bdcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bdd
    @ResponseBody
    @RequestMapping(value = {"bdddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBDDDOCX(@RequestBody String receivedData) throws Exception {

        BDDDocx bddDocx = gson.fromJson(receivedData, BDDDocx.class);

        // docx 计算书
        String docxUrl = DocxBD.getBDD(BaseName.getBase(), bddDocx);

        // ribbonName
        String ribbonName = bddDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bde
    @ResponseBody
    @RequestMapping(value = {"bdedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBDEDOCX(@RequestBody String receivedData) throws Exception {

        BDEDocx bdeDocx = gson.fromJson(receivedData, BDEDocx.class);

        // docx 计算书
        String docxUrl = DocxBD.getBDE(BaseName.getBase(), bdeDocx);

        // ribbonName
        String ribbonName = bdeDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
