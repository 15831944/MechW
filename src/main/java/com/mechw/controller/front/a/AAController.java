package com.mechw.controller.front.a;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.a.a.*;
import com.mechw.service.BaseName;
import com.mechw.service.asmprt.a.ModelAA;
import com.mechw.service.docx.a.DocxAA;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AAController extends FrontController {

    @Autowired
    public AAController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // aaaadocx
    @ResponseBody
    @RequestMapping(value = {"aaaadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAAADOCX(@RequestBody String receivedData) throws Exception {

        AAAADocx aaaaDocx = gson.fromJson(receivedData, AAAADocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAAA(BaseName.getBase(), aaaaDocx);

        // ribbonName
        String ribbonName = aaaaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aaaaasmprt
    @ResponseBody
    @RequestMapping(value = {"aaaaasmprt.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAAAASMPRTDOCX(@RequestBody String receivedData) throws Exception {

        // 模型数据
        AAAAModel aaaaModel = gson.fromJson(receivedData, AAAAModel.class);

        // 模型地址
        String asmprtUrl = ModelAA.getAAAA(BaseName.getBase(), aaaaModel);

        // ribbonName
        String ribbonName = aaaaModel.getRibbonName();

        FrontQrCode frontQrCode = procOrder(asmprtUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aaab
    @ResponseBody
    @RequestMapping(value = {"aaabdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAABDOCX(@RequestBody String receivedData) throws Exception {

        AAABDocx aaabDocx = gson.fromJson(receivedData, AAABDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAAB(BaseName.getBase(), aaabDocx);

        // ribbonName
        String ribbonName = aaabDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aab
    @ResponseBody
    @RequestMapping(value = {"aabdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAABDOCX(@RequestBody String receivedData) throws Exception {

        AABDocx aabDocx = gson.fromJson(receivedData, AABDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAB(BaseName.getBase(), aabDocx);

        // ribbonName
        String ribbonName = aabDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aac
    @ResponseBody
    @RequestMapping(value = {"aacdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAACDOCX(@RequestBody String receivedData) throws Exception {

        AACDocx aacDocx = gson.fromJson(receivedData, AACDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAC(BaseName.getBase(), aacDocx);

        // ribbonName
        String ribbonName = aacDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aad
    @ResponseBody
    @RequestMapping(value = {"aaddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAADDOCX(@RequestBody String receivedData) throws Exception {

        AADDocx aadDocx = gson.fromJson(receivedData, AADDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAD(BaseName.getBase(), aadDocx);

        // ribbonName
        String ribbonName = aadDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aae
    @ResponseBody
    @RequestMapping(value = {"aaedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAEDOCX(@RequestBody String receivedData) throws Exception {

        AAEDocx aaeDocx = gson.fromJson(receivedData, AAEDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAE(BaseName.getBase(), aaeDocx);

        // ribbonName
        String ribbonName = aaeDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aafa
    @ResponseBody
    @RequestMapping(value = {"aafadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFADOCX(@RequestBody String receivedData) throws Exception {

        AAFADocx aafaDocx = gson.fromJson(receivedData, AAFADocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFA(BaseName.getBase(), aafaDocx);

        // ribbonName
        String ribbonName = aafaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aafb
    @ResponseBody
    @RequestMapping(value = {"aafbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFBDOCX(@RequestBody String receivedData) throws Exception {

        AAFBDocx aafbDocx = gson.fromJson(receivedData, AAFBDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFB(BaseName.getBase(), aafbDocx);

        // ribbonName
        String ribbonName = aafbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aafc
    @ResponseBody
    @RequestMapping(value = {"aafcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFCDOCX(@RequestBody String receivedData) throws Exception {

        AAFCDocx aafcDocx = gson.fromJson(receivedData, AAFCDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFC(BaseName.getBase(), aafcDocx);

        // ribbonName
        String ribbonName = aafcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aafd
    @ResponseBody
    @RequestMapping(value = {"aafddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFDDOCX(@RequestBody String receivedData) throws Exception {

        AAFDDocx aafdDocx = gson.fromJson(receivedData, AAFDDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFD(BaseName.getBase(), aafdDocx);

        // ribbonName
        String ribbonName = aafdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aafe
    @ResponseBody
    @RequestMapping(value = {"aafedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFEDOCX(@RequestBody String receivedData) throws Exception {

        AAFEDocx aafeDocx = gson.fromJson(receivedData, AAFEDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFE(BaseName.getBase(), aafeDocx);

        // ribbonName
        String ribbonName = aafeDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aaff
    @ResponseBody
    @RequestMapping(value = {"aaffdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFFDOCX(@RequestBody String receivedData) throws Exception {

        AAFFDocx aaffDocx = gson.fromJson(receivedData, AAFFDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFF(BaseName.getBase(), aaffDocx);

        // ribbonName
        String ribbonName = aaffDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aafg
    @ResponseBody
    @RequestMapping(value = {"aafgdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFGDOCX(@RequestBody String receivedData) throws Exception {

        AAFGDocx aafgDocx = gson.fromJson(receivedData, AAFGDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFG(BaseName.getBase(), aafgDocx);

        // ribbonName
        String ribbonName = aafgDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aafh
    @ResponseBody
    @RequestMapping(value = {"aafhdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAFHDOCX(@RequestBody String receivedData) throws Exception {

        AAFHDocx aafhDocx = gson.fromJson(receivedData, AAFHDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAFH(BaseName.getBase(), aafhDocx);

        // ribbonName
        String ribbonName = aafhDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aaga
    @ResponseBody
    @RequestMapping(value = {"aagadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAGADOCX(@RequestBody String receivedData) throws Exception {

        AAGADocx aagaDocx = gson.fromJson(receivedData, AAGADocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAGA(BaseName.getBase(), aagaDocx);

        // ribbonName
        String ribbonName = aagaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aagb
    @ResponseBody
    @RequestMapping(value = {"aagbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAGBDOCX(@RequestBody String receivedData) throws Exception {

        AAGBDocx aagbDocx = gson.fromJson(receivedData, AAGBDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAGB(BaseName.getBase(), aagbDocx);

        // ribbonName
        String ribbonName = aagbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aagc
    @ResponseBody
    @RequestMapping(value = {"aagcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAGCDOCX(@RequestBody String receivedData) throws Exception {

        AAGCDocx aagcDocx = gson.fromJson(receivedData, AAGCDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAGC(BaseName.getBase(), aagcDocx);

        // ribbonName
        String ribbonName = aagcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aaha
    @ResponseBody
    @RequestMapping(value = {"aahadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAHADOCX(@RequestBody String receivedData) throws Exception {

        AAHADocx aahaDocx = gson.fromJson(receivedData, AAHADocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAHA(BaseName.getBase(), aahaDocx);

        // ribbonName
        String ribbonName = aahaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aahb
    @ResponseBody
    @RequestMapping(value = {"aahbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAHBDOCX(@RequestBody String receivedData) throws Exception {

        AAHBDocx aahbDocx = gson.fromJson(receivedData, AAHBDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAHB(BaseName.getBase(), aahbDocx);

        // ribbonName
        String ribbonName = aahbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aai
    @ResponseBody
    @RequestMapping(value = {"aaidocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAIDOCX(@RequestBody String receivedData) throws Exception {

        AAIDocx aaiDocx = gson.fromJson(receivedData, AAIDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAI(BaseName.getBase(), aaiDocx);

        // ribbonName
        String ribbonName = aaiDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aaj
    @ResponseBody
    @RequestMapping(value = {"aajdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAJDOCX(@RequestBody String receivedData) throws Exception {

        AAJDocx aajDocx = gson.fromJson(receivedData, AAJDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAJ(BaseName.getBase(), aajDocx);

        // ribbonName
        String ribbonName = aajDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aaka
    @ResponseBody
    @RequestMapping(value = {"aakadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAKADOCX(@RequestBody String receivedData) throws Exception {

        AAKADocx aakaDocx = gson.fromJson(receivedData, AAKADocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAKA(BaseName.getBase(), aakaDocx);

        // ribbonName
        String ribbonName = aakaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // aakb
    @ResponseBody
    @RequestMapping(value = {"aakbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calAAKBDOCX(@RequestBody String receivedData) throws Exception {

        AAKBDocx aakbDocx = gson.fromJson(receivedData, AAKBDocx.class);

        // docx 计算书
        String docxUrl = DocxAA.getAAKB(BaseName.getBase(), aakbDocx);

        // ribbonName
        String ribbonName = aakbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
