package com.mechw.controller.front.b;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.b.a.*;
import com.mechw.service.BaseName;
import com.mechw.service.docx.b.DocxBA;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BAController extends FrontController {

    @Autowired
    public BAController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // baaa
    @ResponseBody
    @RequestMapping(value = {"baaadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAAADOCX(@RequestBody String receivedData) throws Exception {

        BAAADocx baaaDocx = gson.fromJson(receivedData, BAAADocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAAA(BaseName.getBase(), baaaDocx);

        // ribbonName
        String ribbonName = baaaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baab
    @ResponseBody
    @RequestMapping(value = {"baabdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAABDOCX(@RequestBody String receivedData) throws Exception {

        BAABDocx baabDocx = gson.fromJson(receivedData, BAABDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAAB(BaseName.getBase(), baabDocx);

        // ribbonName
        String ribbonName = baabDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baba
    @ResponseBody
    @RequestMapping(value = {"babadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBABADOCX(@RequestBody String receivedData) throws Exception {

        BABADocx babaDocx = gson.fromJson(receivedData, BABADocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBABA(BaseName.getBase(), babaDocx);

        // ribbonName
        String ribbonName = babaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bac
    @ResponseBody
    @RequestMapping(value = {"bacdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBACDOCX(@RequestBody String receivedData) throws Exception {

        BACDocx bacDocx = gson.fromJson(receivedData, BACDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAC(BaseName.getBase(), bacDocx);

        // ribbonName
        String ribbonName = bacDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bad
    @ResponseBody
    @RequestMapping(value = {"baddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBADDOCX(@RequestBody String receivedData) throws Exception {

        BADDocx badDocx = gson.fromJson(receivedData, BADDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAD(BaseName.getBase(), badDocx);

        // ribbonName
        String ribbonName = badDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baea
    @ResponseBody
    @RequestMapping(value = {"baeadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAEADOCX(@RequestBody String receivedData) throws Exception {

        BAEADocx baeaDocx = gson.fromJson(receivedData, BAEADocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAEA(BaseName.getBase(), baeaDocx);

        // ribbonName
        String ribbonName = baeaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baeb
    @ResponseBody
    @RequestMapping(value = {"baebdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAEBDOCX(@RequestBody String receivedData) throws Exception {

        BAEBDocx baebDocx = gson.fromJson(receivedData, BAEBDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAEB(BaseName.getBase(), baebDocx);

        // ribbonName
        String ribbonName = baebDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bafa
    @ResponseBody
    @RequestMapping(value = {"bafadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAFADOCX(@RequestBody String receivedData) throws Exception {

        BAFADocx bafaDocx = gson.fromJson(receivedData, BAFADocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAFA(BaseName.getBase(), bafaDocx);

        // ribbonName
        String ribbonName = bafaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bafb
    @ResponseBody
    @RequestMapping(value = {"bafbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAFBDOCX(@RequestBody String receivedData) throws Exception {

        BAFBDocx bafbDocx = gson.fromJson(receivedData, BAFBDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAFB(BaseName.getBase(), bafbDocx);

        // ribbonName
        String ribbonName = bafbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bafc
    @ResponseBody
    @RequestMapping(value = {"bafcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAFCDOCX(@RequestBody String receivedData) throws Exception {

        BAFCDocx bafcDocx = gson.fromJson(receivedData, BAFCDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAFC(BaseName.getBase(), bafcDocx);

        // ribbonName
        String ribbonName = bafcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bafd
    @ResponseBody
    @RequestMapping(value = {"bafddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAFDDOCX(@RequestBody String receivedData) throws Exception {

        BAFDDocx bafdDocx = gson.fromJson(receivedData, BAFDDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAFD(BaseName.getBase(), bafdDocx);

        // ribbonName
        String ribbonName = bafdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baga
    @ResponseBody
    @RequestMapping(value = {"bagadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGADOCX(@RequestBody String receivedData) throws Exception {

        BAGADocx bagaDocx = gson.fromJson(receivedData, BAGADocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGA(BaseName.getBase(), bagaDocx);

        // ribbonName
        String ribbonName = bagaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bagb
    @ResponseBody
    @RequestMapping(value = {"bagbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGBDOCX(@RequestBody String receivedData) throws Exception {

        BAGBDocx bagbDocx = gson.fromJson(receivedData, BAGBDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGB(BaseName.getBase(), bagbDocx);

        // ribbonName
        String ribbonName = bagbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bagc
    @ResponseBody
    @RequestMapping(value = {"bagcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGCDOCX(@RequestBody String receivedData) throws Exception {

        BAGCDocx bagcDocx = gson.fromJson(receivedData, BAGCDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGC(BaseName.getBase(), bagcDocx);

        // ribbonName
        String ribbonName = bagcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bagd
    @ResponseBody
    @RequestMapping(value = {"bagddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGDDOCX(@RequestBody String receivedData) throws Exception {

        BAGDDocx bagdDocx = gson.fromJson(receivedData, BAGDDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGD(BaseName.getBase(), bagdDocx);

        // ribbonName
        String ribbonName = bagdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bage
    @ResponseBody
    @RequestMapping(value = {"bagedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGEDOCX(@RequestBody String receivedData) throws Exception {

        BAGEDocx bageDocx = gson.fromJson(receivedData, BAGEDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGE(BaseName.getBase(), bageDocx);

        // ribbonName
        String ribbonName = bageDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bagf
    @ResponseBody
    @RequestMapping(value = {"bagfdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGFDOCX(@RequestBody String receivedData) throws Exception {

        BAGFDocx bagfDocx = gson.fromJson(receivedData, BAGFDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGF(BaseName.getBase(), bagfDocx);

        // ribbonName
        String ribbonName = bagfDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bagg
    @ResponseBody
    @RequestMapping(value = {"baggdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGGDOCX(@RequestBody String receivedData) throws Exception {

        BAGGDocx baggDocx = gson.fromJson(receivedData, BAGGDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGG(BaseName.getBase(), baggDocx);

        // ribbonName
        String ribbonName = baggDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bagh
    @ResponseBody
    @RequestMapping(value = {"baghdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAGHDOCX(@RequestBody String receivedData) throws Exception {

        BAGHDocx baghDocx = gson.fromJson(receivedData, BAGHDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAGH(BaseName.getBase(), baghDocx);

        // ribbonName
        String ribbonName = baghDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baha
    @ResponseBody
    @RequestMapping(value = {"bahadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAHADOCX(@RequestBody String receivedData) throws Exception {

        BAHADocx bahaDocx = gson.fromJson(receivedData, BAHADocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAHA(BaseName.getBase(), bahaDocx);

        // ribbonName
        String ribbonName = bahaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bahb
    @ResponseBody
    @RequestMapping(value = {"bahbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAHBDOCX(@RequestBody String receivedData) throws Exception {

        BAHBDocx bahbDocx = gson.fromJson(receivedData, BAHBDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAHB(BaseName.getBase(), bahbDocx);

        // ribbonName
        String ribbonName = bahbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baia
    @ResponseBody
    @RequestMapping(value = {"baiadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAIADOCX(@RequestBody String receivedData) throws Exception {

        BAIADocx baiaDocx = gson.fromJson(receivedData, BAIADocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAIA(BaseName.getBase(), baiaDocx);

        // ribbonName
        String ribbonName = baiaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baib
    @ResponseBody
    @RequestMapping(value = {"baibdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAIBDOCX(@RequestBody String receivedData) throws Exception {

        BAIBDocx baibDocx = gson.fromJson(receivedData, BAIBDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAIB(BaseName.getBase(), baibDocx);

        // ribbonName
        String ribbonName = baibDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // baj
    @ResponseBody
    @RequestMapping(value = {"bajdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBAJDOCX(@RequestBody String receivedData) throws Exception {

        BAJDocx bajDocx = gson.fromJson(receivedData, BAJDocx.class);

        // docx 计算书
        String docxUrl = DocxBA.getBAJ(BaseName.getBase(), bajDocx);

        // ribbonName
        String ribbonName = bajDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
