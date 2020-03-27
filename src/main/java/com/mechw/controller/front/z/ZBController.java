package com.mechw.controller.front.z;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.z.b.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.z.DocxZB;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ZBController extends FrontController {

    @Autowired
    public ZBController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // zba
    @ResponseBody
    @RequestMapping(value = {"zbadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBADOCX(@RequestBody String receivedData) throws Exception {

        ZBADocx zbaDocx = gson.fromJson(receivedData, ZBADocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBA(BaseName.getBase(), zbaDocx);

        // ribbonName
        String ribbonName = zbaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbb
    @ResponseBody
    @RequestMapping(value = {"zbbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBBDOCX(@RequestBody String receivedData) throws Exception {

        ZBBDocx zbbDocx = gson.fromJson(receivedData, ZBBDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBB(BaseName.getBase(), zbbDocx);

        // ribbonName
        String ribbonName = zbbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbc
    @ResponseBody
    @RequestMapping(value = {"zbcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBCDOCX(@RequestBody String receivedData) throws Exception {

        ZBCDocx zbcDocx = gson.fromJson(receivedData, ZBCDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBC(BaseName.getBase(), zbcDocx);

        // ribbonName
        String ribbonName = zbcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbd
    @ResponseBody
    @RequestMapping(value = {"zbddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBDDOCX(@RequestBody String receivedData) throws Exception {

        ZBDDocx zbdDocx = gson.fromJson(receivedData, ZBDDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBD(BaseName.getBase(), zbdDocx);

        // ribbonName
        String ribbonName = zbdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbe
    @ResponseBody
    @RequestMapping(value = {"zbedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBEDOCX(@RequestBody String receivedData) throws Exception {

        ZBEDocx zbeDocx = gson.fromJson(receivedData, ZBEDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBE(BaseName.getBase(), zbeDocx);

        // ribbonName
        String ribbonName = zbeDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbf
    @ResponseBody
    @RequestMapping(value = {"zbfdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBFDOCX(@RequestBody String receivedData) throws Exception {

        ZBFDocx zbfDocx = gson.fromJson(receivedData, ZBFDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBF(BaseName.getBase(), zbfDocx);

        // ribbonName
        String ribbonName = zbfDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbg
    @ResponseBody
    @RequestMapping(value = {"zbgdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBGDOCX(@RequestBody String receivedData) throws Exception {

        ZBGDocx zbgDocx = gson.fromJson(receivedData, ZBGDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBG(BaseName.getBase(), zbgDocx);

        // ribbonName
        String ribbonName = zbgDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbh
    @ResponseBody
    @RequestMapping(value = {"zbhdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBHDOCX(@RequestBody String receivedData) throws Exception {

        ZBHDocx zbhDocx = gson.fromJson(receivedData, ZBHDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBH(BaseName.getBase(), zbhDocx);

        // ribbonName
        String ribbonName = zbhDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbi
    @ResponseBody
    @RequestMapping(value = {"zbidocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBIDOCX(@RequestBody String receivedData) throws Exception {

        ZBIDocx zbiDocx = gson.fromJson(receivedData, ZBIDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBI(BaseName.getBase(), zbiDocx);

        // ribbonName
        String ribbonName = zbiDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbj
    @ResponseBody
    @RequestMapping(value = {"zbjdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBJDOCX(@RequestBody String receivedData) throws Exception {

        ZBJDocx zbjDocx = gson.fromJson(receivedData, ZBJDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBJ(BaseName.getBase(), zbjDocx);

        // ribbonName
        String ribbonName = zbjDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbk
    @ResponseBody
    @RequestMapping(value = {"zbkdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBKDOCX(@RequestBody String receivedData) throws Exception {

        ZBKDocx zbkDocx = gson.fromJson(receivedData, ZBKDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBK(BaseName.getBase(), zbkDocx);

        // ribbonName
        String ribbonName = zbkDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbl
    @ResponseBody
    @RequestMapping(value = {"zbldocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBLDOCX(@RequestBody String receivedData) throws Exception {

        ZBLDocx zblDocx = gson.fromJson(receivedData, ZBLDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBL(BaseName.getBase(), zblDocx);

        // ribbonName
        String ribbonName = zblDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbm
    @ResponseBody
    @RequestMapping(value = {"zbmdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBMDOCX(@RequestBody String receivedData) throws Exception {

        ZBMDocx zbmDocx = gson.fromJson(receivedData, ZBMDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBM(BaseName.getBase(), zbmDocx);

        // ribbonName
        String ribbonName = zbmDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbn
    @ResponseBody
    @RequestMapping(value = {"zbndocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBNDOCX(@RequestBody String receivedData) throws Exception {

        ZBNDocx zbnDocx = gson.fromJson(receivedData, ZBNDocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBN(BaseName.getBase(), zbnDocx);

        // ribbonName
        String ribbonName = zbnDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // zbo
    @ResponseBody
    @RequestMapping(value = {"zbodocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calZBODOCX(@RequestBody String receivedData) throws Exception {

        ZBODocx zboDocx = gson.fromJson(receivedData, ZBODocx.class);

        // docx 计算书
        String docxUrl = DocxZB.getZBO(BaseName.getBase(), zboDocx);

        // ribbonName
        String ribbonName = zboDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
