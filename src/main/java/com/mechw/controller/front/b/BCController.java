package com.mechw.controller.front.b;

import com.mechw.controller.front.FrontController;
import com.mechw.model.front.FrontQrCode;
import com.mechw.model.front.b.c.*;
import com.mechw.model.front.b.c.a.BCADocx;
import com.mechw.model.front.b.c.a.BCAModel;
import com.mechw.service.BaseName;
import com.mechw.service.asmprt.b.ModelBC;
import com.mechw.service.docx.b.DocxBC;
import com.mechw.service.payjs.order.PJOrderService;
import com.mechw.service.payjs.product.PJProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BCController extends FrontController {

    @Autowired
    public BCController(PJProductService pjProductService, PJOrderService pjOrderService) {
        super(pjProductService, pjOrderService);
    }

    // bca
    @ResponseBody
    @RequestMapping(value = {"bcadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCADOCX(@RequestBody String receivedData) throws Exception {

        BCADocx bcaDocx = gson.fromJson(receivedData, BCADocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCA(BaseName.getBase(), bcaDocx);

        // ribbonName
        String ribbonName = bcaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcaasmprt
    @ResponseBody
    @RequestMapping(value = {"bcaasmprt.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCAASMPRTDOCX(@RequestBody String receivedData) throws Exception {

        // 模型数据
        BCAModel bcaModel = gson.fromJson(receivedData, BCAModel.class);

        // 模型地址
        String asmprtUrl = ModelBC.getBCA(BaseName.getBase(), bcaModel);

        // ribbonName
        String ribbonName = bcaModel.getRibbonName();

        FrontQrCode frontQrCode = procOrder(asmprtUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcba
    @ResponseBody
    @RequestMapping(value = {"bcbadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCBADOCX(@RequestBody String receivedData) throws Exception {

        BCBADocx bcbaDocx = gson.fromJson(receivedData, BCBADocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCBA(BaseName.getBase(), bcbaDocx);

        // ribbonName
        String ribbonName = bcbaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcbb
    @ResponseBody
    @RequestMapping(value = {"bcbbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCBBDOCX(@RequestBody String receivedData) throws Exception {

        BCBBDocx bcbbDocx = gson.fromJson(receivedData, BCBBDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCBB(BaseName.getBase(), bcbbDocx);

        // ribbonName
        String ribbonName = bcbbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcbc
    @ResponseBody
    @RequestMapping(value = {"bcbcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCBCDOCX(@RequestBody String receivedData) throws Exception {

        BCBCDocx bcbcDocx = gson.fromJson(receivedData, BCBCDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCBC(BaseName.getBase(), bcbcDocx);

        // ribbonName
        String ribbonName = bcbcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcca
    @ResponseBody
    @RequestMapping(value = {"bccadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCCADOCX(@RequestBody String receivedData) throws Exception {

        BCCADocx bccaDocx = gson.fromJson(receivedData, BCCADocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCCA(BaseName.getBase(), bccaDocx);

        // ribbonName
        String ribbonName = bccaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bccb
    @ResponseBody
    @RequestMapping(value = {"bccbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCCBDOCX(@RequestBody String receivedData) throws Exception {

        BCCBDocx bccbDocx = gson.fromJson(receivedData, BCCBDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCCB(BaseName.getBase(), bccbDocx);

        // ribbonName
        String ribbonName = bccbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bccc
    @ResponseBody
    @RequestMapping(value = {"bcccdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCCCDOCX(@RequestBody String receivedData) throws Exception {

        BCCCDocx bcccDocx = gson.fromJson(receivedData, BCCCDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCCC(BaseName.getBase(), bcccDocx);

        // ribbonName
        String ribbonName = bcccDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bccd
    @ResponseBody
    @RequestMapping(value = {"bccddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCCDDOCX(@RequestBody String receivedData) throws Exception {

        BCCDDocx bccdDocx = gson.fromJson(receivedData, BCCDDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCCD(BaseName.getBase(), bccdDocx);

        // ribbonName
        String ribbonName = bccdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcda
    @ResponseBody
    @RequestMapping(value = {"bcdadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCDADOCX(@RequestBody String receivedData) throws Exception {

        BCDADocx bcdaDocx = gson.fromJson(receivedData, BCDADocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCDA(BaseName.getBase(), bcdaDocx);

        // ribbonName
        String ribbonName = bcdaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcdb
    @ResponseBody
    @RequestMapping(value = {"bcdbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCDBDOCX(@RequestBody String receivedData) throws Exception {

        BCDBDocx bcdbDocx = gson.fromJson(receivedData, BCDBDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCDB(BaseName.getBase(), bcdbDocx);

        // ribbonName
        String ribbonName = bcdbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcdc
    @ResponseBody
    @RequestMapping(value = {"bcdcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCDCDOCX(@RequestBody String receivedData) throws Exception {

        BCDCDocx bcdcDocx = gson.fromJson(receivedData, BCDCDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCDC(BaseName.getBase(), bcdcDocx);

        // ribbonName
        String ribbonName = bcdcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcdd
    @ResponseBody
    @RequestMapping(value = {"bcdddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCDDDOCX(@RequestBody String receivedData) throws Exception {

        BCDDDocx bcddDocx = gson.fromJson(receivedData, BCDDDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCDD(BaseName.getBase(), bcddDocx);

        // ribbonName
        String ribbonName = bcddDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcea
    @ResponseBody
    @RequestMapping(value = {"bceadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCEADOCX(@RequestBody String receivedData) throws Exception {

        BCEADocx bceaDocx = gson.fromJson(receivedData, BCEADocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCEA(BaseName.getBase(), bceaDocx);

        // ribbonName
        String ribbonName = bceaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bceb
    @ResponseBody
    @RequestMapping(value = {"bcebdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCEBDOCX(@RequestBody String receivedData) throws Exception {

        BCEBDocx bcebDocx = gson.fromJson(receivedData, BCEBDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCEB(BaseName.getBase(), bcebDocx);

        // ribbonName
        String ribbonName = bcebDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcec
    @ResponseBody
    @RequestMapping(value = {"bcecdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCECDOCX(@RequestBody String receivedData) throws Exception {

        BCECDocx bcecDocx = gson.fromJson(receivedData, BCECDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCEC(BaseName.getBase(), bcecDocx);

        // ribbonName
        String ribbonName = bcecDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bced
    @ResponseBody
    @RequestMapping(value = {"bceddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCEDDOCX(@RequestBody String receivedData) throws Exception {

        BCEDDocx bcedDocx = gson.fromJson(receivedData, BCEDDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCED(BaseName.getBase(), bcedDocx);

        // ribbonName
        String ribbonName = bcedDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcee
    @ResponseBody
    @RequestMapping(value = {"bceedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCEEDOCX(@RequestBody String receivedData) throws Exception {

        BCEEDocx bceeDocx = gson.fromJson(receivedData, BCEEDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCEE(BaseName.getBase(), bceeDocx);

        // ribbonName
        String ribbonName = bceeDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcef
    @ResponseBody
    @RequestMapping(value = {"bcefdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCEFDOCX(@RequestBody String receivedData) throws Exception {

        BCEFDocx bcefDocx = gson.fromJson(receivedData, BCEFDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCEF(BaseName.getBase(), bcefDocx);

        // ribbonName
        String ribbonName = bcefDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bceg
    @ResponseBody
    @RequestMapping(value = {"bcegdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCEGDOCX(@RequestBody String receivedData) throws Exception {

        BCEGDocx bcegDocx = gson.fromJson(receivedData, BCEGDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCEG(BaseName.getBase(), bcegDocx);

        // ribbonName
        String ribbonName = bcegDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfc
    @ResponseBody
    @RequestMapping(value = {"bcfcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFCDOCX(@RequestBody String receivedData) throws Exception {

        BCFCDocx bcfcDocx = gson.fromJson(receivedData, BCFCDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFC(BaseName.getBase(), bcfcDocx);

        // ribbonName
        String ribbonName = bcfcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfd
    @ResponseBody
    @RequestMapping(value = {"bcfddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFDDOCX(@RequestBody String receivedData) throws Exception {

        BCFDDocx bcfdDocx = gson.fromJson(receivedData, BCFDDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFD(BaseName.getBase(), bcfdDocx);

        // ribbonName
        String ribbonName = bcfdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfe
    @ResponseBody
    @RequestMapping(value = {"bcfedocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFEDOCX(@RequestBody String receivedData) throws Exception {

        BCFEDocx bcfeDocx = gson.fromJson(receivedData, BCFEDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFE(BaseName.getBase(), bcfeDocx);

        // ribbonName
        String ribbonName = bcfeDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcff
    @ResponseBody
    @RequestMapping(value = {"bcffdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFFDOCX(@RequestBody String receivedData) throws Exception {

        BCFFDocx bcffDocx = gson.fromJson(receivedData, BCFFDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFF(BaseName.getBase(), bcffDocx);

        // ribbonName
        String ribbonName = bcffDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfg
    @ResponseBody
    @RequestMapping(value = {"bcfgdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFGDOCX(@RequestBody String receivedData) throws Exception {

        BCFGDocx bcfgDocx = gson.fromJson(receivedData, BCFGDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFG(BaseName.getBase(), bcfgDocx);

        // ribbonName
        String ribbonName = bcfgDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfh
    @ResponseBody
    @RequestMapping(value = {"bcfhdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFHDOCX(@RequestBody String receivedData) throws Exception {

        BCFHDocx bcfhDocx = gson.fromJson(receivedData, BCFHDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFH(BaseName.getBase(), bcfhDocx);

        // ribbonName
        String ribbonName = bcfhDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfi
    @ResponseBody
    @RequestMapping(value = {"bcfidocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFIDOCX(@RequestBody String receivedData) throws Exception {

        BCFIDocx bcfiDocx = gson.fromJson(receivedData, BCFIDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFI(BaseName.getBase(), bcfiDocx);

        // ribbonName
        String ribbonName = bcfiDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfj
    @ResponseBody
    @RequestMapping(value = {"bcfjdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFJDOCX(@RequestBody String receivedData) throws Exception {

        BCFJDocx bcfjDocx = gson.fromJson(receivedData, BCFJDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFJ(BaseName.getBase(), bcfjDocx);

        // ribbonName
        String ribbonName = bcfjDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfk
    @ResponseBody
    @RequestMapping(value = {"bcfkdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFKDOCX(@RequestBody String receivedData) throws Exception {

        BCFKDocx bcfkDocx = gson.fromJson(receivedData, BCFKDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFK(BaseName.getBase(), bcfkDocx);

        // ribbonName
        String ribbonName = bcfkDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfl
    @ResponseBody
    @RequestMapping(value = {"bcfldocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFLDOCX(@RequestBody String receivedData) throws Exception {

        BCFLDocx bcflDocx = gson.fromJson(receivedData, BCFLDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFL(BaseName.getBase(), bcflDocx);

        // ribbonName
        String ribbonName = bcflDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfm
    @ResponseBody
    @RequestMapping(value = {"bcfmdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFMDOCX(@RequestBody String receivedData) throws Exception {

        BCFMDocx bcfmDocx = gson.fromJson(receivedData, BCFMDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFM(BaseName.getBase(), bcfmDocx);

        // ribbonName
        String ribbonName = bcfmDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfn
    @ResponseBody
    @RequestMapping(value = {"bcfndocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFNDOCX(@RequestBody String receivedData) throws Exception {

        BCFNDocx bcfnDocx = gson.fromJson(receivedData, BCFNDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFN(BaseName.getBase(), bcfnDocx);

        // ribbonName
        String ribbonName = bcfnDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfo
    @ResponseBody
    @RequestMapping(value = {"bcfodocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFODOCX(@RequestBody String receivedData) throws Exception {

        BCFODocx bcfoDocx = gson.fromJson(receivedData, BCFODocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFO(BaseName.getBase(), bcfoDocx);

        // ribbonName
        String ribbonName = bcfoDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcfp
    @ResponseBody
    @RequestMapping(value = {"bcfpdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCFPDOCX(@RequestBody String receivedData) throws Exception {

        BCFPDocx bcfpDocx = gson.fromJson(receivedData, BCFPDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCFP(BaseName.getBase(), bcfpDocx);

        // ribbonName
        String ribbonName = bcfpDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcga
    @ResponseBody
    @RequestMapping(value = {"bcgadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCGADOCX(@RequestBody String receivedData) throws Exception {

        BCGADocx bcgaDocx = gson.fromJson(receivedData, BCGADocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCGA(BaseName.getBase(), bcgaDocx);

        // ribbonName
        String ribbonName = bcgaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcgb
    @ResponseBody
    @RequestMapping(value = {"bcgbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCGBDOCX(@RequestBody String receivedData) throws Exception {

        BCGBDocx bcgbDocx = gson.fromJson(receivedData, BCGBDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCGB(BaseName.getBase(), bcgbDocx);

        // ribbonName
        String ribbonName = bcgbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcgc
    @ResponseBody
    @RequestMapping(value = {"bcgcdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCGCDOCX(@RequestBody String receivedData) throws Exception {

        BCGCDocx bcgcDocx = gson.fromJson(receivedData, BCGCDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCGC(BaseName.getBase(), bcgcDocx);

        // ribbonName
        String ribbonName = bcgcDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcgd
    @ResponseBody
    @RequestMapping(value = {"bcgddocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCGDDOCX(@RequestBody String receivedData) throws Exception {

        BCGDDocx bcgdDocx = gson.fromJson(receivedData, BCGDDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCGD(BaseName.getBase(), bcgdDocx);

        // ribbonName
        String ribbonName = bcgdDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcha
    @ResponseBody
    @RequestMapping(value = {"bchadocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCHADOCX(@RequestBody String receivedData) throws Exception {

        BCHADocx bchaDocx = gson.fromJson(receivedData, BCHADocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCHA(BaseName.getBase(), bchaDocx);

        // ribbonName
        String ribbonName = bchaDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bchb
    @ResponseBody
    @RequestMapping(value = {"bchbdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCHBDOCX(@RequestBody String receivedData) throws Exception {

        BCHBDocx bchbDocx = gson.fromJson(receivedData, BCHBDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCHB(BaseName.getBase(), bchbDocx);

        // ribbonName
        String ribbonName = bchbDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bci
    @ResponseBody
    @RequestMapping(value = {"bcidocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCIDOCX(@RequestBody String receivedData) throws Exception {

        BCIDocx bciDocx = gson.fromJson(receivedData, BCIDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCI(BaseName.getBase(), bciDocx);

        // ribbonName
        String ribbonName = bciDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }

    // bcj
    @ResponseBody
    @RequestMapping(value = {"bcjdocx.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String calBCJDOCX(@RequestBody String receivedData) throws Exception {

        BCJDocx bcjDocx = gson.fromJson(receivedData, BCJDocx.class);

        // docx 计算书
        String docxUrl = DocxBC.getBCJ(BaseName.getBase(), bcjDocx);

        // ribbonName
        String ribbonName = bcjDocx.getRibbonName();

        FrontQrCode frontQrCode = procOrder(docxUrl, ribbonName);

        return gson.toJson(frontQrCode);
    }
}
