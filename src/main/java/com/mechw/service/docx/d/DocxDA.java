package com.mechw.service.docx.d;

import com.mechw.model.front.d.a.a.DAADocx;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxDA extends DocxTool {

    /**
     * daa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param daaResult    计算数据结果
     * @return 计算书 URL
     */
    public static String getDAA(String baseFileName, DAADocx daaResult) {

        String template;
        if (daaResult.getIdod().equals("ID")) {
            if (daaResult.getForm().contains("Plate") || daaResult.getForm().contains("Sheet") || daaResult.getForm().contains("Strip")) {
                template = "D:/mechw/static/west/cal/d/a/a/DAA_ID_Y_STRAIN.docx";
            } else {
                template = "D:/mechw/static/west/cal/d/a/a/DAA_ID_N_STRAIN.docx";
            }
        } else {
            if (daaResult.getForm().contains("Plate") || daaResult.getForm().contains("Sheet") || daaResult.getForm().contains("Strip")) {
                template = "D:/mechw/static/west/cal/d/a/a/DAA_OD_Y_STRAIN.docx";
            } else {
                template = "D:/mechw/static/west/cal/d/a/a/DAA_OD_N_STRAIN.docx";
            }
        }

        // 模板文件 obj
        File from = new File(template);

        // 拼接新的计算书完整的文件名
        String docName = "D:/data" + baseFileName + ".docx";

        try {

            // 创建文件夹
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());

            // 创建新的 docx 文件
            Files.createFile(docPath);
            File docFile = new File(docName);

            // 将模板文件拷贝到新文件
            DocxTool.copyDocx(from, docFile);

            // 加载 docx，获取主文档 word/document.xml
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();

            // 获取 text 集合
            List<Object> texts = getText(mainDocumentPart);

            // 替换 text 的内容
            Text textElement;
            for (Object text : texts) {

                textElement = (Text) text;
                switch (textElement.getValue()) {

                    case "$$001":
                        textElement.setValue(daaResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(daaResult.getPs().toString());
                        break;
                    case "$$003":
                        textElement.setValue(daaResult.getPts().toString());
                        break;
                    case "$$004":
                        textElement.setValue(daaResult.getT().toString());
                        break;

                    case "$$005":
                        textElement.setValue(daaResult.getName());
                        break;
                    case "$$006":
                        textElement.setValue(daaResult.getForm());
                        break;

                    case "$$007":
                        textElement.setValue(daaResult.getCi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(daaResult.getCe().toString());
                        break;
                    case "$$009":
                        textElement.setValue(daaResult.getEl().toString());
                        break;
                    case "$$010":
                        textElement.setValue(daaResult.getEc().toString());
                        break;

                    case "$$011":
                        textElement.setValue(daaResult.getDi().toString());
                        break;
                    case "$$012":
                        textElement.setValue(daaResult.getL().toString());
                        break;
                    case "$$013":
                        textElement.setValue(daaResult.getTn().toString());
                        break;
                    case "$$014":
                        textElement.setValue(daaResult.getTf().toString());
                        break;

                    case "$$015":
                        textElement.setValue(daaResult.getTest());
                        break;

                    case "$$016":
                        textElement.setValue(daaResult.getDensity().toString());
                        break;
                    case "$$017":
                        textElement.setValue(daaResult.getSy().toString());
                        break;
                    case "$$018":
                        textElement.setValue(daaResult.getS().toString());
                        break;
                    case "$$019":
                        textElement.setValue(daaResult.getSa().toString());
                        break;

                    case "$$020":
                        textElement.setValue(daaResult.getPc().toString());
                        break;
                    case "$$021":
                        textElement.setValue(daaResult.getC().toString());
                        break;
                    case "$$022":
                        textElement.setValue(daaResult.getTe().toString());
                        break;
                    case "$$023":
                        textElement.setValue(daaResult.getDout().toString());
                        break;
                    case "$$024":
                        textElement.setValue(daaResult.getRi().toString());
                        break;
                    case "$$025":
                        textElement.setValue(daaResult.getRo().toString());
                        break;
                    case "$$026":
                        textElement.setValue(daaResult.getDic().toString());
                        break;
                    case "$$027":
                        textElement.setValue(daaResult.getDoc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(daaResult.getRic().toString());
                        break;
                    case "$$029":
                        textElement.setValue(daaResult.getRoc().toString());
                        break;

                    case "$$030":
                        textElement.setValue(daaResult.getTrc().toString());
                        break;
                    case "$$031":
                        textElement.setValue(daaResult.getTrl().toString());
                        break;
                    case "$$032":
                        textElement.setValue(daaResult.getTr().toString());
                        break;
                    case "$$033":
                        textElement.setValue(daaResult.getTchk());
                        break;
                    case "$$034":
                        textElement.setValue(daaResult.getSact().toString());
                        break;

                    case "$$035":
                        textElement.setValue(daaResult.getMawp().toString());
                        break;
                    case "$$036":
                        textElement.setValue(daaResult.getMapnc().toString());
                        break;

                    case "$$037":
                        textElement.setValue(daaResult.getEta().toString());
                        break;
                    case "$$038":
                        textElement.setValue(daaResult.getPt().toString());
                        break;
                    case "$$039":
                        textElement.setValue(daaResult.getPtc().toString());
                        break;
                    case "$$040":
                        textElement.setValue(daaResult.getZeta().toString());
                        break;
                    case "$$041":
                        textElement.setValue(daaResult.getSalltest().toString());
                        break;
                    case "$$042":
                        textElement.setValue(daaResult.getSacttestnew().toString());
                        break;
                    case "$$043":
                        textElement.setValue(daaResult.getSacttestnewchk());
                        break;
                    case "$$044":
                        textElement.setValue(daaResult.getSacttestcod().toString());
                        break;
                    case "$$045":
                        textElement.setValue(daaResult.getSacttestcodchk());
                        break;

                    case "$$046":
                        textElement.setValue(daaResult.getRf().toString());
                        break;
                    case "$$047":
                        textElement.setValue(daaResult.getRorg());
                        break;
                    case "$$048":
                        textElement.setValue(daaResult.getEf().toString());
                        break;

                    case "$$049":
                        textElement.setValue(daaResult.getAon().toString());
                        break;
                    case "$$050":
                        textElement.setValue(daaResult.getVin().toString());
                        break;
                    case "$$051":
                        textElement.setValue(daaResult.getAin().toString());
                        break;
                    case "$$052":
                        textElement.setValue(daaResult.getWn().toString());
                        break;
                    case "$$053":
                        textElement.setValue(daaResult.getAoc().toString());
                        break;
                    case "$$054":
                        textElement.setValue(daaResult.getVic().toString());
                        break;
                    case "$$055":
                        textElement.setValue(daaResult.getAic().toString());
                        break;
                    case "$$056":
                        textElement.setValue(daaResult.getWc().toString());
                        break;

                    case "$$100":
                        textElement.setValue(daaResult.getpNo());
                        break;
                    case "$$101":
                        textElement.setValue(daaResult.getGroupNo());
                        break;

                    case "$11":
                        textElement.setValue("I.D. " + daaResult.getDi().toString());
                        break;
                    case "$12":
                        textElement.setValue(daaResult.getL().toString());
                        break;
                    case "$13":
                        textElement.setValue(daaResult.getTn().toString());
                        break;
                    case "$23":
                        textElement.setValue("O.D. " + daaResult.getDout().toString());
                        break;
                }
            }

            // 保存文件
            wordMLPackage.save(docFile);

            // 返回相对 URL 地址
            return "/data" + baseFileName + ".docx";

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "-1";
    }
}
