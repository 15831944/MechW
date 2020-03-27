package com.mechw.controller.front.a;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.a.c.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.a.DocxAC;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ACController extends FrontController {

    @Autowired
    public ACController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // acaa
    @ResponseBody
    @RequestMapping(value = {"acaadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACAADOCX(@RequestBody String receivedData) throws Exception {

        ACAADocx acaaDocx = gson.fromJson(receivedData, ACAADocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACAA(BaseName.getBase(), acaaDocx);

        // ribbonName
        String ribbonName = acaaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // acab
    @ResponseBody
    @RequestMapping(value = {"acabdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACABDOCX(@RequestBody String receivedData) throws Exception {

        ACABDocx acabDocx = gson.fromJson(receivedData, ACABDocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACAB(BaseName.getBase(), acabDocx);

        // ribbonName
        String ribbonName = acabDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // acba
    @ResponseBody
    @RequestMapping(value = {"acbadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACBADOCX(@RequestBody String receivedData) throws Exception {

        ACBADocx acbaDocx = gson.fromJson(receivedData, ACBADocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACBA(BaseName.getBase(), acbaDocx);

        // ribbonName
        String ribbonName = acbaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // acbb
    @ResponseBody
    @RequestMapping(value = {"acbbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACBBDOCX(@RequestBody String receivedData) throws Exception {

        ACBBDocx acbbDocx = gson.fromJson(receivedData, ACBBDocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACBB(BaseName.getBase(), acbbDocx);

        // ribbonName
        String ribbonName = acbbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // acca
    @ResponseBody
    @RequestMapping(value = {"accadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACCADOCX(@RequestBody String receivedData) throws Exception {

        ACCADocx accaDocx = gson.fromJson(receivedData, ACCADocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACCA(BaseName.getBase(), accaDocx);

        // ribbonName
        String ribbonName = accaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // accb
    @ResponseBody
    @RequestMapping(value = {"accbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACCBDOCX(@RequestBody String receivedData) throws Exception {

        ACCBDocx accbDocx = gson.fromJson(receivedData, ACCBDocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACCB(BaseName.getBase(), accbDocx);

        // ribbonName
        String ribbonName = accbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // acda
    @ResponseBody
    @RequestMapping(value = {"acdadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACDADOCX(@RequestBody String receivedData) throws Exception {

        ACDADocx acdaDocx = gson.fromJson(receivedData, ACDADocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACDA(BaseName.getBase(), acdaDocx);

        // ribbonName
        String ribbonName = acdaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // acdb
    @ResponseBody
    @RequestMapping(value = {"acdbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACDBDOCX(@RequestBody String receivedData) throws Exception {

        ACDBDocx acdbDocx = gson.fromJson(receivedData, ACDBDocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACDB(BaseName.getBase(), acdbDocx);

        // ribbonName
        String ribbonName = acdbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // acea
    @ResponseBody
    @RequestMapping(value = {"aceadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calACEADOCX(@RequestBody String receivedData) throws Exception {

        ACEADocx aceaDocx = gson.fromJson(receivedData, ACEADocx.class);

        // docx 计算书
        String docxUrl = DocxAC.getACEA(BaseName.getBase(), aceaDocx);

        // ribbonName
        String ribbonName = aceaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
