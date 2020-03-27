package com.mechw.service.docx.c;

import com.mechw.model.front.c.a.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxCA extends DocxTool {

    /**
     * caaa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param caaaDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCAAA(String baseFileName, CAAADocx caaaDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (caaaDocx.getPsd() < 0) {
            template = "D:/mechw/static/west/cal/c/a/a/a/CAAAN.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/a/a/CAAA.docx";
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
                        textElement.setValue(caaaDocx.getT().toString());
                        break;

                    case "$$002":
                        textElement.setValue(caaaDocx.getSstd());
                        break;
                    case "$$003":
                        textElement.setValue(caaaDocx.getSname());
                        break;
                    case "$$004":
                        textElement.setValue(caaaDocx.getPsd().toString());
                        break;
                    case "$$005":
                        textElement.setValue(caaaDocx.getPss().toString());
                        break;
                    case "$$006":
                        textElement.setValue(caaaDocx.getDsi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(caaaDocx.getThksn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(caaaDocx.getCs2().toString());
                        break;

                    case "$$009":
                        textElement.setValue(caaaDocx.getPstd());
                        break;
                    case "$$010":
                        textElement.setValue(caaaDocx.getPname());
                        break;
                    case "$$011":
                        textElement.setValue(caaaDocx.getTp().toString());
                        break;
                    case "$$012":
                        textElement.setValue(caaaDocx.getTt().toString());
                        break;
                    case "$$013":
                        textElement.setValue(caaaDocx.getDpo().toString());
                        break;
                    case "$$014":
                        textElement.setValue(caaaDocx.getThkpn().toString());
                        break;
                    case "$$015":
                        textElement.setValue(caaaDocx.getA().toString());
                        break;
                    case "$$016":
                        textElement.setValue(caaaDocx.getCp2().toString());
                        break;

                    case "$$017":
                        textElement.setValue(caaaDocx.getJstd());
                        break;
                    case "$$018":
                        textElement.setValue(caaaDocx.getJname());
                        break;
                    case "$$019":
                        textElement.setValue(caaaDocx.getPjd().toString());
                        break;
                    case "$$020":
                        textElement.setValue(caaaDocx.getPjs().toString());
                        break;
                    case "$$021":
                        textElement.setValue(caaaDocx.getE().toString());
                        break;
                    case "$$022":
                        textElement.setValue(caaaDocx.getL().toString());
                        break;
                    case "$$023":
                        textElement.setValue(caaaDocx.getThkjn().toString());
                        break;
                    case "$$024":
                        textElement.setValue(caaaDocx.getCj2().toString());
                        break;

                    case "$$025":
                        textElement.setValue(caaaDocx.getTest());
                        break;

                    case "$$026":
                        textElement.setValue(caaaDocx.getDensitys().toString());
                        break;
                    case "$$027":
                        textElement.setValue(caaaDocx.getOst().toString());
                        break;
                    case "$$028":
                        textElement.setValue(caaaDocx.getOs().toString());
                        break;
                    case "$$029":
                        textElement.setValue(caaaDocx.getOst1() < 0 ? "/" : caaaDocx.getOst1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(caaaDocx.getRsel().toString());
                        break;
                    case "$$031":
                        textElement.setValue(caaaDocx.getEst().toString());
                        break;
                    case "$$032":
                        textElement.setValue(caaaDocx.getCs1().toString());
                        break;

                    case "$$037":
                        textElement.setValue(caaaDocx.getDensityj().toString());
                        break;
                    case "$$038":
                        textElement.setValue(caaaDocx.getOjt().toString());
                        break;
                    case "$$039":
                        textElement.setValue(caaaDocx.getOj().toString());
                        break;
                    case "$$040":
                        textElement.setValue(caaaDocx.getOjt1() < 0 ? "/" : caaaDocx.getOjt1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(caaaDocx.getRjel().toString());
                        break;
                    case "$$042":
                        textElement.setValue(caaaDocx.getEjt().toString());
                        break;
                    case "$$043":
                        textElement.setValue(caaaDocx.getCj1().toString());
                        break;

                    case "$$033":
                        textElement.setValue(caaaDocx.getDensityp().toString());
                        break;
                    case "$$034":
                        textElement.setValue(caaaDocx.getOpt().toString());
                        break;
                    case "$$035":
                        textElement.setValue(caaaDocx.getOp().toString());
                        break;
                    case "$$036":
                        textElement.setValue(caaaDocx.getEpt().toString());
                        break;
                    case "$$044":
                        textElement.setValue(caaaDocx.getOpt1() < 0 ? "/" : caaaDocx.getOpt1().toString());
                        break;
                    case "$$045":
                        textElement.setValue(caaaDocx.getRpel().toString());
                        break;
                    case "$$046":
                        textElement.setValue(caaaDocx.getCp1().toString());
                        break;


                    case "$$047":
                        textElement.setValue(caaaDocx.getCs().toString());
                        break;
                    case "$$048":
                        textElement.setValue(caaaDocx.getThkse().toString());
                        break;
                    case "$$049":
                        textElement.setValue(caaaDocx.getPsc().toString());
                        break;

                    case "$$050":
                        textElement.setValue(caaaDocx.getDji().toString());
                        break;
                    case "$$051":
                        textElement.setValue(caaaDocx.getCj().toString());
                        break;
                    case "$$052":
                        textElement.setValue(caaaDocx.getThkje().toString());
                        break;
                    case "$$053":
                        textElement.setValue(caaaDocx.getPjc().toString());
                        break;

                    case "$$054":
                        textElement.setValue(caaaDocx.getDpi().toString());
                        break;
                    case "$$055":
                        textElement.setValue(caaaDocx.getCp().toString());
                        break;
                    case "$$056":
                        textElement.setValue(caaaDocx.getThkpe().toString());
                        break;
                    case "$$057":
                        textElement.setValue(caaaDocx.getTo().toString());
                        break;

                    case "$$058":
                        textElement.setValue(caaaDocx.getThkt().toString());
                        break;
                    case "$$059":
                        textElement.setValue(caaaDocx.getThktallow().toString());
                        break;
                    case "$$060":
                        textElement.setValue(caaaDocx.getThktchk());
                        break;
                    case "$$061":
                        textElement.setValue(caaaDocx.getTptt().toString());
                        break;
                    case "$$062":
                        textElement.setValue(caaaDocx.getTpttchk());
                        break;
                    case "$$063":
                        textElement.setValue(caaaDocx.getDmin().toString());
                        break;
                    case "$$064":
                        textElement.setValue(caaaDocx.getDminchk());
                        break;

                    case "$$065":
                        textElement.setValue(caaaDocx.getF1().toString());
                        break;
                    case "$$066":
                        textElement.setValue(caaaDocx.getPs2().toString());
                        break;
                    case "$$067":
                        textElement.setValue(caaaDocx.getM().toString());
                        break;
                    case "$$068":
                        textElement.setValue(caaaDocx.getF2().toString());
                        break;
                    case "$$069":
                        textElement.setValue(caaaDocx.getPj2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(caaaDocx.getPmawp().toString());
                        break;
                    case "$$071":
                        textElement.setValue(caaaDocx.getPmawpchk());
                        break;

                    case "$$072":
                        textElement.setValue(caaaDocx.getT1().toString());
                        break;
                    case "$$073":
                        textElement.setValue(caaaDocx.getT2().toString());
                        break;
                    case "$$074":
                        textElement.setValue(caaaDocx.getTochk());
                        break;

                    case "$$075":
                        textElement.setValue(caaaDocx.getThksc().toString());
                        break;
                    case "$$076":
                        textElement.setValue(caaaDocx.getThksd().toString());
                        break;
                    case "$$077":
                        textElement.setValue(caaaDocx.getThkschk());
                        break;

                    case "$$078":
                        textElement.setValue(caaaDocx.getThksedsi().toString());
                        break;
                    case "$$079":
                        textElement.setValue(caaaDocx.getThksedsiallow().toString());
                        break;
                    case "$$080":
                        textElement.setValue(caaaDocx.getThksedsichk());
                        break;

                    case "$$081":
                        textElement.setValue(caaaDocx.getThkjc().toString());
                        break;
                    case "$$082":
                        textElement.setValue(caaaDocx.getThkjd().toString());
                        break;
                    case "$$083":
                        textElement.setValue(caaaDocx.getThkjchk());
                        break;

                    case "$$084":
                        textElement.setValue(caaaDocx.getTl().toString());
                        break;
                    case "$$085":
                        textElement.setValue(caaaDocx.getTk().toString());
                        break;

                    case "$$086":
                        textElement.setValue(caaaDocx.getEta().toString());
                        break;
                    case "$$087":
                        textElement.setValue(caaaDocx.getThkpc().toString());
                        break;
                    case "$$088":
                        textElement.setValue(caaaDocx.getThkpd().toString());
                        break;
                    case "$$089":
                        textElement.setValue(caaaDocx.getThkpchk());
                        break;

                    case "$$090":
                        textElement.setValue(caaaDocx.getAallow().toString());
                        break;
                    case "$$091":
                        textElement.setValue(caaaDocx.getAchk());
                        break;

                    case "$$092":
                        textElement.setValue(caaaDocx.getZeta().toString());
                        break;
                    case "$$093":
                        textElement.setValue(caaaDocx.getPjt().toString());
                        break;

                    case "$06":
                        textElement.setValue(caaaDocx.getDsi().toString());
                        break;
                    case "$07":
                        textElement.setValue(caaaDocx.getThksn().toString());
                        break;

                    case "$11":
                        textElement.setValue(caaaDocx.getTp().toString());
                        break;
                    case "$12":
                        textElement.setValue(caaaDocx.getTt().toString());
                        break;
                    case "$13":
                        textElement.setValue(caaaDocx.getDpo().toString());
                        break;
                    case "$14":
                        textElement.setValue(caaaDocx.getThkpn().toString());
                        break;
                    case "$15":
                        textElement.setValue(caaaDocx.getA().toString());
                        break;

                    case "$21":
                        textElement.setValue(caaaDocx.getE().toString());
                        break;
                    case "$23":
                        textElement.setValue(caaaDocx.getThkjn().toString());
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

    /**
     * caba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cabaDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCABA(String baseFileName, CABADocx cabaDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cabaDocx.getTest().equals("液压试验")) {
            if (cabaDocx.getPsd() < 0) {
                template = "D:/mechw/static/west/cal/c/a/b/a/CABALN.docx";
            } else {
                template = "D:/mechw/static/west/cal/c/a/b/a/CABAL.docx";
            }
        } else {
            if (cabaDocx.getPsd() < 0) {
                template = "D:/mechw/static/west/cal/c/a/b/a/CABAGN.docx";
            } else {
                template = "D:/mechw/static/west/cal/c/a/b/a/CABAG.docx";
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
                        textElement.setValue(cabaDocx.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(cabaDocx.getSstd());
                        break;
                    case "$$003":
                        textElement.setValue(cabaDocx.getSname());
                        break;
                    case "$$004":
                        textElement.setValue(cabaDocx.getPsd().toString());
                        break;
                    case "$$005":
                        textElement.setValue(cabaDocx.getPss().toString());
                        break;
                    case "$$006":
                        textElement.setValue(cabaDocx.getDsi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(cabaDocx.getThksn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(cabaDocx.getCs2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(cabaDocx.getJstd());
                        break;
                    case "$$010":
                        textElement.setValue(cabaDocx.getJname());
                        break;
                    case "$$011":
                        textElement.setValue(cabaDocx.getPjd().toString());
                        break;
                    case "$$012":
                        textElement.setValue(cabaDocx.getPjs().toString());
                        break;
                    case "$$013":
                        textElement.setValue(cabaDocx.getE().toString());
                        break;
                    case "$$014":
                        textElement.setValue(cabaDocx.getL().toString());
                        break;
                    case "$$015":
                        textElement.setValue(cabaDocx.getThkjn().toString());
                        break;
                    case "$$016":
                        textElement.setValue(cabaDocx.getCj2().toString());
                        break;
                    case "$$017":
                        textElement.setValue(cabaDocx.getTp().toString());
                        break;
                    case "$$018":
                        textElement.setValue(cabaDocx.getTt().toString());
                        break;
                    case "$$019":
                        textElement.setValue(cabaDocx.getDpo().toString());
                        break;
                    case "$$020":
                        textElement.setValue(cabaDocx.getDensitys().toString());
                        break;
                    case "$$021":
                        textElement.setValue(cabaDocx.getDensityj().toString());
                        break;
                    case "$$022":
                        textElement.setValue(cabaDocx.getOst().toString());
                        break;
                    case "$$023":
                        textElement.setValue(cabaDocx.getOjt().toString());
                        break;
                    case "$$024":
                        textElement.setValue(cabaDocx.getOs().toString());
                        break;
                    case "$$025":
                        textElement.setValue(cabaDocx.getOj().toString());
                        break;
                    case "$$026":
                        textElement.setValue(cabaDocx.getOst1() < 0 ? "/" : cabaDocx.getOst1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(cabaDocx.getOjt1() < 0 ? "/" : cabaDocx.getOjt1().toString());
                        break;
                    case "$$028":
                        textElement.setValue(cabaDocx.getRsel().toString());
                        break;
                    case "$$029":
                        textElement.setValue(cabaDocx.getRjel().toString());
                        break;
                    case "$$030":
                        textElement.setValue(cabaDocx.getEst().toString());
                        break;
                    case "$$031":
                        textElement.setValue(cabaDocx.getEjt().toString());
                        break;
                    case "$$032":
                        textElement.setValue(cabaDocx.getCs1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(cabaDocx.getCj1().toString());
                        break;
                    case "$$034":
                        textElement.setValue(cabaDocx.getCs().toString());
                        break;
                    case "$$035":
                        textElement.setValue(cabaDocx.getThkse().toString());
                        break;
                    case "$$036":
                        textElement.setValue(cabaDocx.getPsc().toString());
                        break;
                    case "$$037":
                        textElement.setValue(cabaDocx.getDji().toString());
                        break;
                    case "$$038":
                        textElement.setValue(cabaDocx.getCj().toString());
                        break;
                    case "$$039":
                        textElement.setValue(cabaDocx.getThkje().toString());
                        break;
                    case "$$040":
                        textElement.setValue(cabaDocx.getPjc().toString());
                        break;
                    case "$$041":
                        textElement.setValue(cabaDocx.getDpi().toString());
                        break;
                    case "$$042":
                        textElement.setValue(cabaDocx.getTo().toString());
                        break;
                    case "$$043":
                        textElement.setValue(cabaDocx.getThkt().toString());
                        break;
                    case "$$044":
                        textElement.setValue(cabaDocx.getThktallow().toString());
                        break;
                    case "$$045":
                        textElement.setValue(cabaDocx.getThktchk());
                        break;
                    case "$$046":
                        textElement.setValue(cabaDocx.getTptt().toString());
                        break;
                    case "$$047":
                        textElement.setValue(cabaDocx.getTpttchk());
                        break;
                    case "$$050":
                        textElement.setValue(cabaDocx.getF1().toString());
                        break;
                    case "$$051":
                        textElement.setValue(cabaDocx.getPs2().toString());
                        break;
                    case "$$052":
                        textElement.setValue(cabaDocx.getM().toString());
                        break;
                    case "$$053":
                        textElement.setValue(cabaDocx.getF2().toString());
                        break;
                    case "$$054":
                        textElement.setValue(cabaDocx.getPj2().toString());
                        break;
                    case "$$055":
                        textElement.setValue(cabaDocx.getPmawp().toString());
                        break;
                    case "$$056":
                        textElement.setValue(cabaDocx.getPjdchk());
                        break;
                    case "$$057":
                        textElement.setValue(cabaDocx.getT1().toString());
                        break;
                    case "$$058":
                        textElement.setValue(cabaDocx.getT2().toString());
                        break;
                    case "$$059":
                        textElement.setValue(cabaDocx.getTochk());
                        break;
                    case "$$060":
                        textElement.setValue(cabaDocx.getThksc().toString());
                        break;
                    case "$$061":
                        textElement.setValue(cabaDocx.getThksd().toString());
                        break;
                    case "$$062":
                        textElement.setValue(cabaDocx.getThkschk());
                        break;
                    case "$$063":
                        textElement.setValue(cabaDocx.getThkjc().toString());
                        break;
                    case "$$064":
                        textElement.setValue(cabaDocx.getThkjd().toString());
                        break;
                    case "$$065":
                        textElement.setValue(cabaDocx.getThkjchk());
                        break;
                    case "$$066":
                        textElement.setValue(cabaDocx.getTl().toString());
                        break;
                    case "$$067":
                        textElement.setValue(cabaDocx.getTk().toString());
                        break;
                    case "$$068":
                        textElement.setValue(cabaDocx.getU().toString());
                        break;
                    case "$$069":
                        textElement.setValue(cabaDocx.getThkpc().toString());
                        break;
                    case "$$070":
                        textElement.setValue(cabaDocx.getThkpd().toString());
                        break;
                    case "$$071":
                        textElement.setValue(cabaDocx.getThkpchk());
                        break;
                    case "$$072":
                        textElement.setValue(cabaDocx.getAallow().toString());
                        break;
                    case "$$073":
                        textElement.setValue(cabaDocx.getPjt().toString());
                        break;
                    case "$$201":
                        textElement.setValue(cabaDocx.getThksedsi().toString());
                        break;
                    case "$$202":
                        textElement.setValue(cabaDocx.getThksedsiallow().toString());
                        break;
                    case "$$203":
                        textElement.setValue(cabaDocx.getThksedsichk());
                        break;
                    case "$01":
                        textElement.setValue(cabaDocx.getDsi().toString());
                        break;
                    case "$02":
                        textElement.setValue(cabaDocx.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue(cabaDocx.getTp().toString());
                        break;
                    case "$04":
                        textElement.setValue(cabaDocx.getDpo().toString());
                        break;
                    case "$05":
                        textElement.setValue(cabaDocx.getE().toString());
                        break;
                    case "$06":
                        textElement.setValue(cabaDocx.getThkjn().toString());
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

    /**
     * caca
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cacaDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCACA(String baseFileName, CACADocx cacaDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cacaDocx.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/c/a/CACAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/c/a/CACAG.docx";
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
                        textElement.setValue(cacaDocx.getDt().toString());
                        break;
                    case "$$002":
                        textElement.setValue(cacaDocx.getTest());
                        break;
                    case "$$003":
                        textElement.setValue(cacaDocx.getSstd());
                        break;
                    case "$$004":
                        textElement.setValue(cacaDocx.getSname());
                        break;
                    case "$$005":
                        textElement.setValue(cacaDocx.getPsd().toString());
                        break;
                    case "$$006":
                        textElement.setValue(cacaDocx.getPss().toString());
                        break;
                    case "$$007":
                        textElement.setValue(cacaDocx.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(cacaDocx.getThksn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(cacaDocx.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(cacaDocx.getCs2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(cacaDocx.getJstd());
                        break;
                    case "$$012":
                        textElement.setValue(cacaDocx.getJname());
                        break;
                    case "$$013":
                        textElement.setValue(cacaDocx.getPjd().toString());
                        break;
                    case "$$014":
                        textElement.setValue(cacaDocx.getPjs().toString());
                        break;
                    case "$$015":
                        textElement.setValue(cacaDocx.getJ().toString());
                        break;
                    case "$$016":
                        textElement.setValue(cacaDocx.getT().toString());
                        break;
                    case "$$017":
                        textElement.setValue(cacaDocx.getThkjn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(cacaDocx.getCj2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(cacaDocx.getDensitys().toString());
                        break;
                    case "$$020":
                        textElement.setValue(cacaDocx.getDensityj().toString());
                        break;
                    case "$$021":
                        textElement.setValue(cacaDocx.getOst().toString());
                        break;
                    case "$$022":
                        textElement.setValue(cacaDocx.getOjt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(cacaDocx.getOs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(cacaDocx.getOj().toString());
                        break;
                    case "$$025":
                        textElement.setValue(cacaDocx.getOst1() < 0 ? "/" : cacaDocx.getOst1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(cacaDocx.getOjt1() < 0 ? "/" : cacaDocx.getOjt1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(cacaDocx.getRsel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(cacaDocx.getRjel().toString());
                        break;
                    case "$$029":
                        textElement.setValue(cacaDocx.getEst().toString());
                        break;
                    case "$$030":
                        textElement.setValue(cacaDocx.getEjt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(cacaDocx.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(cacaDocx.getCj1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(cacaDocx.getCs().toString());
                        break;
                    case "$$034":
                        textElement.setValue(cacaDocx.getThkse().toString());
                        break;
                    case "$$035":
                        textElement.setValue(cacaDocx.getPsc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(cacaDocx.getCj().toString());
                        break;
                    case "$$037":
                        textElement.setValue(cacaDocx.getThkje().toString());
                        break;
                    case "$$038":
                        textElement.setValue(cacaDocx.getPjc().toString());
                        break;
                    case "$$039":
                        textElement.setValue(cacaDocx.getThksc1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(cacaDocx.getThksc2().toString());
                        break;
                    case "$$041":
                        textElement.setValue(cacaDocx.getThksd().toString());
                        break;
                    case "$$042":
                        textElement.setValue(cacaDocx.getThkschk());
                        break;
                    case "$$043":
                        textElement.setValue(cacaDocx.getThkjc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(cacaDocx.getThkjd().toString());
                        break;
                    case "$$045":
                        textElement.setValue(cacaDocx.getThkjchk());
                        break;
                    case "$$046":
                        textElement.setValue(cacaDocx.getPjt().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + cacaDocx.getDsi().toString());
                        break;
                    case "$02":
                        textElement.setValue(cacaDocx.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue(cacaDocx.getT().toString());
                        break;
                    case "$04":
                        textElement.setValue(cacaDocx.getThkjn().toString());
                        break;
                    case "$05":
                        textElement.setValue(cacaDocx.getJ().toString());
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

    /**
     * cacb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cacbDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCACB(String baseFileName, CACBDocx cacbDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cacbDocx.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/c/b/CACBL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/c/b/CACBG.docx";
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
                        textElement.setValue(cacbDocx.getDt().toString());
                        break;
                    case "$$002":
                        textElement.setValue(cacbDocx.getTest());
                        break;
                    case "$$003":
                        textElement.setValue(cacbDocx.getSstd());
                        break;
                    case "$$004":
                        textElement.setValue(cacbDocx.getSname());
                        break;
                    case "$$005":
                        textElement.setValue(cacbDocx.getPsd().toString());
                        break;
                    case "$$006":
                        textElement.setValue(cacbDocx.getPss().toString());
                        break;
                    case "$$007":
                        textElement.setValue(cacbDocx.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(cacbDocx.getThksn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(cacbDocx.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(cacbDocx.getCs2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(cacbDocx.getJstd());
                        break;
                    case "$$012":
                        textElement.setValue(cacbDocx.getJname());
                        break;
                    case "$$013":
                        textElement.setValue(cacbDocx.getPjd().toString());
                        break;
                    case "$$014":
                        textElement.setValue(cacbDocx.getPjs().toString());
                        break;
                    case "$$015":
                        textElement.setValue(cacbDocx.getJ().toString());
                        break;
                    case "$$016":
                        textElement.setValue(cacbDocx.getT().toString());
                        break;
                    case "$$017":
                        textElement.setValue(cacbDocx.getThkjn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(cacbDocx.getCj2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(cacbDocx.getDensitys().toString());
                        break;
                    case "$$020":
                        textElement.setValue(cacbDocx.getDensityj().toString());
                        break;
                    case "$$021":
                        textElement.setValue(cacbDocx.getOst().toString());
                        break;
                    case "$$022":
                        textElement.setValue(cacbDocx.getOjt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(cacbDocx.getOs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(cacbDocx.getOj().toString());
                        break;
                    case "$$025":
                        textElement.setValue(cacbDocx.getOst1() < 0 ? "/" : cacbDocx.getOst1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(cacbDocx.getOjt1() < 0 ? "/" : cacbDocx.getOjt1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(cacbDocx.getRsel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(cacbDocx.getRjel().toString());
                        break;
                    case "$$029":
                        textElement.setValue(cacbDocx.getEst().toString());
                        break;
                    case "$$030":
                        textElement.setValue(cacbDocx.getEjt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(cacbDocx.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(cacbDocx.getCj1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(cacbDocx.getCs().toString());
                        break;
                    case "$$034":
                        textElement.setValue(cacbDocx.getThkse().toString());
                        break;
                    case "$$035":
                        textElement.setValue(cacbDocx.getPsc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(cacbDocx.getCj().toString());
                        break;
                    case "$$037":
                        textElement.setValue(cacbDocx.getThkje().toString());
                        break;
                    case "$$038":
                        textElement.setValue(cacbDocx.getPjc().toString());
                        break;
                    case "$$039":
                        textElement.setValue(cacbDocx.getDji().toString());
                        break;
                    case "$$040":
                        textElement.setValue(cacbDocx.getThksc1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(cacbDocx.getThksc2().toString());
                        break;
                    case "$$042":
                        textElement.setValue(cacbDocx.getThksd().toString());
                        break;
                    case "$$043":
                        textElement.setValue(cacbDocx.getThkschk());
                        break;
                    case "$$044":
                        textElement.setValue(cacbDocx.getThkjc1().toString());
                        break;
                    case "$$045":
                        textElement.setValue(cacbDocx.getThkjc2().toString());
                        break;
                    case "$$046":
                        textElement.setValue(cacbDocx.getThkjc3().toString());
                        break;
                    case "$$047":
                        textElement.setValue(cacbDocx.getThkjc().toString());
                        break;
                    case "$$048":
                        textElement.setValue(cacbDocx.getThkjd().toString());
                        break;
                    case "$$049":
                        textElement.setValue(cacbDocx.getThkjchk());
                        break;
                    case "$$050":
                        textElement.setValue(cacbDocx.getPjt().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + cacbDocx.getDsi().toString());
                        break;
                    case "$02":
                        textElement.setValue(cacbDocx.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue(cacbDocx.getThkjn().toString());
                        break;
                    case "$04":
                        textElement.setValue(cacbDocx.getJ().toString());
                        break;
                    case "$05":
                        textElement.setValue(cacbDocx.getT().toString());
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

    /**
     * cada
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cadaDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCADA(String baseFileName, CADADocx cadaDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cadaDocx.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/d/a/CADAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/d/a/CADAG.docx";
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
                        textElement.setValue(cadaDocx.getDt().toString());
                        break;
                    case "$$002":
                        textElement.setValue(cadaDocx.getTest());
                        break;
                    case "$$003":
                        textElement.setValue(cadaDocx.getSstd());
                        break;
                    case "$$004":
                        textElement.setValue(cadaDocx.getSname());
                        break;
                    case "$$005":
                        textElement.setValue(cadaDocx.getPsd().toString());
                        break;
                    case "$$006":
                        textElement.setValue(cadaDocx.getPss().toString());
                        break;
                    case "$$007":
                        textElement.setValue(cadaDocx.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(cadaDocx.getThksn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(cadaDocx.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(cadaDocx.getCs2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(cadaDocx.getJstd());
                        break;
                    case "$$012":
                        textElement.setValue(cadaDocx.getJname());
                        break;
                    case "$$013":
                        textElement.setValue(cadaDocx.getPjd().toString());
                        break;
                    case "$$014":
                        textElement.setValue(cadaDocx.getPjs().toString());
                        break;
                    case "$$015":
                        textElement.setValue(cadaDocx.getJ().toString());
                        break;
                    case "$$016":
                        textElement.setValue(cadaDocx.getT().toString());
                        break;
                    case "$$017":
                        textElement.setValue(cadaDocx.getThkjn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(cadaDocx.getCj2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(cadaDocx.getDensitys().toString());
                        break;
                    case "$$020":
                        textElement.setValue(cadaDocx.getDensityj().toString());
                        break;
                    case "$$021":
                        textElement.setValue(cadaDocx.getOst().toString());
                        break;
                    case "$$022":
                        textElement.setValue(cadaDocx.getOjt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(cadaDocx.getOs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(cadaDocx.getOj().toString());
                        break;
                    case "$$025":
                        textElement.setValue(cadaDocx.getOst1() < 0 ? "/" : cadaDocx.getOst1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(cadaDocx.getOjt1() < 0 ? "/" : cadaDocx.getOjt1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(cadaDocx.getRsel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(cadaDocx.getRjel().toString());
                        break;
                    case "$$029":
                        textElement.setValue(cadaDocx.getEst().toString());
                        break;
                    case "$$030":
                        textElement.setValue(cadaDocx.getEjt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(cadaDocx.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(cadaDocx.getCj1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(cadaDocx.getCs().toString());
                        break;
                    case "$$034":
                        textElement.setValue(cadaDocx.getThkse().toString());
                        break;
                    case "$$035":
                        textElement.setValue(cadaDocx.getPsc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(cadaDocx.getCj().toString());
                        break;
                    case "$$037":
                        textElement.setValue(cadaDocx.getThkje().toString());
                        break;
                    case "$$038":
                        textElement.setValue(cadaDocx.getPjc().toString());
                        break;
                    case "$$039":
                        textElement.setValue(cadaDocx.getThksc1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(cadaDocx.getThksc2().toString());
                        break;
                    case "$$041":
                        textElement.setValue(cadaDocx.getThksd().toString());
                        break;
                    case "$$042":
                        textElement.setValue(cadaDocx.getThkschk());
                        break;
                    case "$$043":
                        textElement.setValue(cadaDocx.getThkjc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(cadaDocx.getThkjd().toString());
                        break;
                    case "$$045":
                        textElement.setValue(cadaDocx.getThkjchk());
                        break;
                    case "$$046":
                        textElement.setValue(cadaDocx.getPjt().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + cadaDocx.getDsi().toString());
                        break;
                    case "$02":
                        textElement.setValue(cadaDocx.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue(cadaDocx.getT().toString());
                        break;
                    case "$04":
                        textElement.setValue(cadaDocx.getThkjn().toString());
                        break;
                    case "$05":
                        textElement.setValue(cadaDocx.getJ().toString());
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

    /**
     * cadb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cadbDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCADB(String baseFileName, CADBDocx cadbDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cadbDocx.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/d/b/CADBL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/d/b/CADBG.docx";
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
                        textElement.setValue(cadbDocx.getDt().toString());
                        break;
                    case "$$002":
                        textElement.setValue(cadbDocx.getTest());
                        break;
                    case "$$003":
                        textElement.setValue(cadbDocx.getSstd());
                        break;
                    case "$$004":
                        textElement.setValue(cadbDocx.getSname());
                        break;
                    case "$$005":
                        textElement.setValue(cadbDocx.getPsd().toString());
                        break;
                    case "$$006":
                        textElement.setValue(cadbDocx.getPss().toString());
                        break;
                    case "$$007":
                        textElement.setValue(cadbDocx.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(cadbDocx.getThksn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(cadbDocx.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(cadbDocx.getCs2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(cadbDocx.getJstd());
                        break;
                    case "$$012":
                        textElement.setValue(cadbDocx.getJname());
                        break;
                    case "$$013":
                        textElement.setValue(cadbDocx.getPjd().toString());
                        break;
                    case "$$014":
                        textElement.setValue(cadbDocx.getPjs().toString());
                        break;
                    case "$$015":
                        textElement.setValue(cadbDocx.getJ().toString());
                        break;
                    case "$$016":
                        textElement.setValue(cadbDocx.getT().toString());
                        break;
                    case "$$017":
                        textElement.setValue(cadbDocx.getThkjn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(cadbDocx.getCj2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(cadbDocx.getDensitys().toString());
                        break;
                    case "$$020":
                        textElement.setValue(cadbDocx.getDensityj().toString());
                        break;
                    case "$$021":
                        textElement.setValue(cadbDocx.getOst().toString());
                        break;
                    case "$$022":
                        textElement.setValue(cadbDocx.getOjt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(cadbDocx.getOs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(cadbDocx.getOj().toString());
                        break;
                    case "$$025":
                        textElement.setValue(cadbDocx.getOst1() < 0 ? "/" : cadbDocx.getOst1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(cadbDocx.getOjt1() < 0 ? "/" : cadbDocx.getOjt1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(cadbDocx.getRsel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(cadbDocx.getRjel().toString());
                        break;
                    case "$$029":
                        textElement.setValue(cadbDocx.getEst().toString());
                        break;
                    case "$$030":
                        textElement.setValue(cadbDocx.getEjt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(cadbDocx.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(cadbDocx.getCj1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(cadbDocx.getCs().toString());
                        break;
                    case "$$034":
                        textElement.setValue(cadbDocx.getThkse().toString());
                        break;
                    case "$$035":
                        textElement.setValue(cadbDocx.getPsc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(cadbDocx.getCj().toString());
                        break;
                    case "$$037":
                        textElement.setValue(cadbDocx.getThkje().toString());
                        break;
                    case "$$038":
                        textElement.setValue(cadbDocx.getPjc().toString());
                        break;
                    case "$$039":
                        textElement.setValue(cadbDocx.getDji().toString());
                        break;
                    case "$$040":
                        textElement.setValue(cadbDocx.getThksc1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(cadbDocx.getThksc2().toString());
                        break;
                    case "$$042":
                        textElement.setValue(cadbDocx.getThksd().toString());
                        break;
                    case "$$043":
                        textElement.setValue(cadbDocx.getThkschk());
                        break;
                    case "$$044":
                        textElement.setValue(cadbDocx.getThkjc1().toString());
                        break;
                    case "$$045":
                        textElement.setValue(cadbDocx.getThkjc2().toString());
                        break;
                    case "$$046":
                        textElement.setValue(cadbDocx.getThkjc3().toString());
                        break;
                    case "$$047":
                        textElement.setValue(cadbDocx.getThkjc().toString());
                        break;
                    case "$$048":
                        textElement.setValue(cadbDocx.getThkjd().toString());
                        break;
                    case "$$049":
                        textElement.setValue(cadbDocx.getThkjchk());
                        break;
                    case "$$050":
                        textElement.setValue(cadbDocx.getPjt().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + cadbDocx.getDsi().toString());
                        break;
                    case "$02":
                        textElement.setValue(cadbDocx.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue(cadbDocx.getThkjn().toString());
                        break;
                    case "$04":
                        textElement.setValue(cadbDocx.getJ().toString());
                        break;
                    case "$05":
                        textElement.setValue(cadbDocx.getT().toString());
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

    /**
     * caea
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param caeaDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCAEA(String baseFileName, CAEADocx caeaDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (caeaDocx.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/e/a/CAEAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/e/a/CAEAG.docx";
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
                        textElement.setValue(caeaDocx.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(caeaDocx.getSstd());
                        break;
                    case "$$004":
                        textElement.setValue(caeaDocx.getSname());
                        break;
                    case "$$005":
                        textElement.setValue(caeaDocx.getPsd().toString());
                        break;
                    case "$$006":
                        textElement.setValue(caeaDocx.getPss().toString());
                        break;
                    case "$$007":
                        textElement.setValue(caeaDocx.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(caeaDocx.getThksn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(caeaDocx.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(caeaDocx.getCs2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(caeaDocx.getTsb().toString());
                        break;
                    case "$$012":
                        textElement.setValue(caeaDocx.getJstd());
                        break;
                    case "$$013":
                        textElement.setValue(caeaDocx.getJname());
                        break;
                    case "$$014":
                        textElement.setValue(caeaDocx.getPjd().toString());
                        break;
                    case "$$015":
                        textElement.setValue(caeaDocx.getPjs().toString());
                        break;
                    case "$$016":
                        textElement.setValue(caeaDocx.getDout().toString());
                        break;
                    case "$$017":
                        textElement.setValue(caeaDocx.getTs().toString());
                        break;
                    case "$$018":
                        textElement.setValue(caeaDocx.getThkjn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(caeaDocx.getEj().toString());
                        break;
                    case "$$020":
                        textElement.setValue(caeaDocx.getCj2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(caeaDocx.getTjb().toString());
                        break;
                    case "$$022":
                        textElement.setValue(caeaDocx.getDensitys().toString());
                        break;
                    case "$$023":
                        textElement.setValue(caeaDocx.getDensityj().toString());
                        break;
                    case "$$024":
                        textElement.setValue(caeaDocx.getOst().toString());
                        break;
                    case "$$025":
                        textElement.setValue(caeaDocx.getOjt().toString());
                        break;
                    case "$$026":
                        textElement.setValue(caeaDocx.getOs().toString());
                        break;
                    case "$$027":
                        textElement.setValue(caeaDocx.getOj().toString());
                        break;
                    case "$$028":
                        textElement.setValue(caeaDocx.getOst1() < 0 ? "/" : caeaDocx.getOst1().toString());
                        break;
                    case "$$029":
                        textElement.setValue(caeaDocx.getOjt1() < 0 ? "/" : caeaDocx.getOjt1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(caeaDocx.getRsel().toString());
                        break;
                    case "$$031":
                        textElement.setValue(caeaDocx.getRjel().toString());
                        break;
                    case "$$032":
                        textElement.setValue(caeaDocx.getEst().toString());
                        break;
                    case "$$033":
                        textElement.setValue(caeaDocx.getEjt().toString());
                        break;
                    case "$$034":
                        textElement.setValue(caeaDocx.getAlphas().toString());
                        break;
                    case "$$035":
                        textElement.setValue(caeaDocx.getAlphaj().toString());
                        break;
                    case "$$036":
                        textElement.setValue(caeaDocx.getMius().toString());
                        break;
                    case "$$037":
                        textElement.setValue(caeaDocx.getMiuj().toString());
                        break;
                    case "$$038":
                        textElement.setValue(caeaDocx.getCs1().toString());
                        break;
                    case "$$039":
                        textElement.setValue(caeaDocx.getCj1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(caeaDocx.getCs().toString());
                        break;
                    case "$$041":
                        textElement.setValue(caeaDocx.getThkse().toString());
                        break;
                    case "$$042":
                        textElement.setValue(caeaDocx.getPsc().toString());
                        break;
                    case "$$043":
                        textElement.setValue(caeaDocx.getRm().toString());
                        break;
                    case "$$044":
                        textElement.setValue(caeaDocx.getCj().toString());
                        break;
                    case "$$045":
                        textElement.setValue(caeaDocx.getThkje().toString());
                        break;
                    case "$$046":
                        textElement.setValue(caeaDocx.getPjc().toString());
                        break;
                    case "$$047":
                        textElement.setValue(caeaDocx.getDi().toString());
                        break;
                    case "$$048":
                        textElement.setValue(caeaDocx.getT0().toString());
                        break;
                    case "$$049":
                        textElement.setValue(caeaDocx.getD().toString());
                        break;
                    case "$$050":
                        textElement.setValue(caeaDocx.getK().toString());
                        break;
                    case "$$051":
                        textElement.setValue(caeaDocx.getAs().toString());
                        break;
                    case "$$052":
                        textElement.setValue(caeaDocx.getAb().toString());
                        break;
                    case "$$053":
                        textElement.setValue(caeaDocx.getU().toString());
                        break;
                    case "$$054":
                        textElement.setValue(caeaDocx.getMiu1u().toString());
                        break;
                    case "$$055":
                        textElement.setValue(caeaDocx.getB1().toString());
                        break;
                    case "$$056":
                        textElement.setValue(caeaDocx.getQ0().toString());
                        break;
                    case "$$057":
                        textElement.setValue(caeaDocx.getX1u().toString());
                        break;
                    case "$$058":
                        textElement.setValue(caeaDocx.getX2u().toString());
                        break;
                    case "$$059":
                        textElement.setValue(caeaDocx.getFai1u().toString());
                        break;
                    case "$$060":
                        textElement.setValue(caeaDocx.getEsost().toString());
                        break;
                    case "$$061":
                        textElement.setValue(caeaDocx.getO1ai().toString());
                        break;
                    case "$$062":
                        textElement.setValue(caeaDocx.getO1ao().toString());
                        break;
                    case "$$063":
                        textElement.setValue(caeaDocx.getO1achk());
                        break;
                    case "$$064":
                        textElement.setValue(caeaDocx.getO2ai().toString());
                        break;
                    case "$$065":
                        textElement.setValue(caeaDocx.getO2ao().toString());
                        break;
                    case "$$066":
                        textElement.setValue(caeaDocx.getO2achk());
                        break;
                    case "$$067":
                        textElement.setValue(caeaDocx.getO1bi().toString());
                        break;
                    case "$$068":
                        textElement.setValue(caeaDocx.getO1bo().toString());
                        break;
                    case "$$069":
                        textElement.setValue(caeaDocx.getO1bchk());
                        break;
                    case "$$070":
                        textElement.setValue(caeaDocx.getO2bi().toString());
                        break;
                    case "$$071":
                        textElement.setValue(caeaDocx.getO2bo().toString());
                        break;
                    case "$$072":
                        textElement.setValue(caeaDocx.getO2bchk());
                        break;
                    case "$$073":
                        textElement.setValue(caeaDocx.getEjojt().toString());
                        break;
                    case "$$074":
                        textElement.setValue(caeaDocx.getO1().toString());
                        break;
                    case "$$075":
                        textElement.setValue(caeaDocx.getO1chk());
                        break;
                    case "$$076":
                        textElement.setValue(caeaDocx.getO2().toString());
                        break;
                    case "$$077":
                        textElement.setValue(caeaDocx.getO2chk());
                        break;
                    case "$$078":
                        textElement.setValue(caeaDocx.getPst().toString());
                        break;
                    case "$$079":
                        textElement.setValue(caeaDocx.getPjt().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + caeaDocx.getDsi().toString());
                        break;
                    case "$02":
                        textElement.setValue(caeaDocx.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue(caeaDocx.getTs().toString());
                        break;
                    case "$04":
                        textElement.setValue(caeaDocx.getThkjn().toString());
                        break;
                    case "$05":
                        textElement.setValue("Φ" + caeaDocx.getDout().toString());
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

    /**
     * cafa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cafaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getCAFA(String baseFileName, CAFADocx cafaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cafaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/f/a/CAFAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/f/a/CAFAG.docx";
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

                        textElement.setValue(cafaResult.getT().toString());

                        break;
                    case "$$002":

                        textElement.setValue(cafaResult.getPsd().toString());

                        break;
                    case "$$003":

                        textElement.setValue(cafaResult.getPss().toString());

                        break;
                    case "$$004":

                        textElement.setValue(cafaResult.getSstd());

                        break;
                    case "$$005":

                        textElement.setValue(cafaResult.getSname());

                        break;
                    case "$$006":

                        textElement.setValue(cafaResult.getDsi().toString());

                        break;
                    case "$$007":

                        textElement.setValue(cafaResult.getThksn().toString());

                        break;
                    case "$$008":

                        textElement.setValue(cafaResult.getCs2().toString());

                        break;
                    case "$$010":

                        textElement.setValue(cafaResult.getPjd().toString());

                        break;
                    case "$$011":

                        textElement.setValue(cafaResult.getPjs().toString());

                        break;
                    case "$$012":

                        textElement.setValue(cafaResult.getJstd());

                        break;
                    case "$$013":

                        textElement.setValue(cafaResult.getJname());

                        break;
                    case "$$014":

                        textElement.setValue(cafaResult.getDjo().toString());

                        break;
                    case "$$015":

                        textElement.setValue(cafaResult.getThkjn().toString());

                        break;
                    case "$$016":

                        textElement.setValue(cafaResult.getCj2().toString());

                        break;
                    case "$$018":

                        textElement.setValue(cafaResult.getF1().toString());

                        break;
                    case "$$019":
                        textElement.setValue(cafaResult.getM1().toString());

                        break;
                    case "$$020":

                        textElement.setValue(cafaResult.getDensityj().toString());

                        break;
                    case "$$021":

                        textElement.setValue(cafaResult.getDensitys().toString());

                        break;
                    case "$$022":

                        textElement.setValue(cafaResult.getOjt().toString());

                        break;
                    case "$$023":

                        textElement.setValue(cafaResult.getOst().toString());

                        break;
                    case "$$024":

                        textElement.setValue(cafaResult.getOj().toString());

                        break;
                    case "$$025":

                        textElement.setValue(cafaResult.getOs().toString());

                        break;
                    case "$$026":

                        textElement.setValue(cafaResult.getRjrel().toString());

                        break;
                    case "$$027":

                        textElement.setValue(cafaResult.getRsrel().toString());

                        break;
                    case "$$028":

                        textElement.setValue(cafaResult.getOjt1() < 0 ? "/" : cafaResult.getOjt1().toString());

                        break;
                    case "$$029":

                        textElement.setValue(cafaResult.getOst1() < 0 ? "/" : cafaResult.getOst1().toString());

                        break;
                    case "$$030":

                        textElement.setValue(cafaResult.getCj1().toString());

                        break;
                    case "$$031":

                        textElement.setValue(cafaResult.getCs1().toString());

                        break;
                    case "$$032":

                        textElement.setValue(cafaResult.getPsc().toString());

                        break;
                    case "$$033":

                        textElement.setValue(cafaResult.getPjc().toString());

                        break;
                    case "$$034":

                        textElement.setValue(cafaResult.getCj().toString());

                        break;
                    case "$$035":

                        textElement.setValue(cafaResult.getThkje().toString());

                        break;
                    case "$$036":

                        textElement.setValue(cafaResult.getRji().toString());

                        break;
                    case "$$037":

                        textElement.setValue(cafaResult.getThkjc().toString());

                        break;
                    case "$$038":

                        textElement.setValue(cafaResult.getThkjd().toString());

                        break;
                    case "$$039":

                        textElement.setValue(cafaResult.getThkjchk());

                        break;
                    case "$$040":

                        textElement.setValue(cafaResult.getCs().toString());

                        break;
                    case "$$041":

                        textElement.setValue(cafaResult.getThkse().toString());

                        break;
                    case "$$042":

                        textElement.setValue(cafaResult.getRsi().toString());

                        break;
                    case "$$043":

                        textElement.setValue(cafaResult.getOpie().toString());

                        break;
                    case "$$044":

                        textElement.setValue(cafaResult.getK().toString());

                        break;
                    case "$$045":

                        textElement.setValue(cafaResult.getF().toString());

                        break;
                    case "$$046":

                        textElement.setValue(cafaResult.getO().toString());

                        break;
                    case "$$047":

                        textElement.setValue(cafaResult.getO15().toString());

                        break;
                    case "$$048":

                        textElement.setValue(cafaResult.getOchk());

                        break;
                    case "$$049":

                        textElement.setValue(cafaResult.getPjt().toString());

                        break;
                    case "$$050":

                        textElement.setValue(cafaResult.getPst().toString());

                        break;
                    case "$$051":

                        textElement.setValue(cafaResult.getMawpjj().toString());

                        break;
                    case "$$052":

                        textElement.setValue(cafaResult.getMawpjs().toString());

                        break;
                    case "$$053":

                        textElement.setValue(cafaResult.getMawpj().toString());

                        break;
                    case "$$054":

                        textElement.setValue(cafaResult.getMawpss().toString());

                        break;
                    case "$$055":

                        textElement.setValue(cafaResult.getMawpsj().toString());

                        break;
                    case "$$056":

                        textElement.setValue(cafaResult.getMawps().toString());

                        break;
                    case "$01":

                        textElement.setValue("Φ" + cafaResult.getDsi().toString());

                        break;
                    case "$02":

                        textElement.setValue(cafaResult.getThksn().toString());

                        break;
                    case "$03":

                        textElement.setValue("Φ" + cafaResult.getDjo().toString());

                        break;
                    case "$04":

                        textElement.setValue(cafaResult.getThkjn().toString());

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

    /**
     * cafb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cafbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getCAFB(String baseFileName, CAFBDocx cafbResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cafbResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/f/b/CAFBL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/f/b/CAFBG.docx";
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

            // 替换 text 的内容;
            Text textElement;
            for (Object text : texts) {

                textElement = (Text) text;

                switch (textElement.getValue()) {
                    case "$$001":

                        textElement.setValue(cafbResult.getT().toString());

                        break;
                    case "$$002":

                        textElement.setValue(cafbResult.getPsd().toString());

                        break;
                    case "$$003":

                        textElement.setValue(cafbResult.getPss().toString());

                        break;
                    case "$$004":

                        textElement.setValue(cafbResult.getSstd());

                        break;
                    case "$$005":

                        textElement.setValue(cafbResult.getSname());

                        break;
                    case "$$006":

                        textElement.setValue(cafbResult.getDsi().toString());

                        break;
                    case "$$007":

                        textElement.setValue(cafbResult.getThksn().toString());

                        break;
                    case "$$008":

                        textElement.setValue(cafbResult.getCs2().toString());

                        break;
                    case "$$010":

                        textElement.setValue(cafbResult.getPjd().toString());

                        break;
                    case "$$011":

                        textElement.setValue(cafbResult.getPjs().toString());

                        break;
                    case "$$012":

                        textElement.setValue(cafbResult.getJstd());

                        break;
                    case "$$013":

                        textElement.setValue(cafbResult.getJname());

                        break;
                    case "$$014":

                        textElement.setValue(cafbResult.getDjo().toString());

                        break;
                    case "$$015":

                        textElement.setValue(cafbResult.getThkjn().toString());

                        break;
                    case "$$016":

                        textElement.setValue(cafbResult.getCj2().toString());

                        break;
                    case "$$020":

                        textElement.setValue(cafbResult.getDensityj().toString());

                        break;
                    case "$$021":

                        textElement.setValue(cafbResult.getDensitys().toString());

                        break;
                    case "$$022":

                        textElement.setValue(cafbResult.getOjt().toString());

                        break;
                    case "$$023":

                        textElement.setValue(cafbResult.getOst().toString());

                        break;
                    case "$$024":

                        textElement.setValue(cafbResult.getOj().toString());

                        break;
                    case "$$025":

                        textElement.setValue(cafbResult.getOs().toString());

                        break;
                    case "$$026":

                        textElement.setValue(cafbResult.getRjrel().toString());

                        break;
                    case "$$027":

                        textElement.setValue(cafbResult.getRsrel().toString());

                        break;
                    case "$$028":

                        textElement.setValue(cafbResult.getOjt1() < 0 ? "/" : cafbResult.getOjt1().toString());

                        break;
                    case "$$029":

                        textElement.setValue(cafbResult.getOst1() < 0 ? "/" : cafbResult.getOst1().toString());

                        break;
                    case "$$030":

                        textElement.setValue(cafbResult.getCj1().toString());

                        break;
                    case "$$031":

                        textElement.setValue(cafbResult.getCs1().toString());

                        break;
                    case "$$032":

                        textElement.setValue(cafbResult.getPsc().toString());

                        break;
                    case "$$033":

                        textElement.setValue(cafbResult.getPjc().toString());

                        break;
                    case "$$034":

                        textElement.setValue(cafbResult.getCj().toString());

                        break;
                    case "$$035":

                        textElement.setValue(cafbResult.getThkje().toString());

                        break;
                    case "$$036":

                        textElement.setValue(cafbResult.getRji().toString());

                        break;
                    case "$$037":

                        textElement.setValue(cafbResult.getThkjc().toString());

                        break;
                    case "$$038":

                        textElement.setValue(cafbResult.getThkjd().toString());

                        break;
                    case "$$039":

                        textElement.setValue(cafbResult.getThkjchk());

                        break;
                    case "$$040":

                        textElement.setValue(cafbResult.getCs().toString());

                        break;
                    case "$$041":

                        textElement.setValue(cafbResult.getThkse().toString());

                        break;
                    case "$$042":

                        textElement.setValue(cafbResult.getRsi().toString());

                        break;
                    case "$$043":

                        textElement.setValue(cafbResult.getOpie().toString());

                        break;
                    case "$$044":

                        textElement.setValue(cafbResult.getK().toString());

                        break;
                    case "$$045":

                        textElement.setValue(cafbResult.getF().toString());

                        break;
                    case "$$046":

                        textElement.setValue(cafbResult.getO().toString());

                        break;
                    case "$$047":

                        textElement.setValue(cafbResult.getO15().toString());

                        break;
                    case "$$048":

                        textElement.setValue(cafbResult.getOchk());

                        break;
                    case "$$049":

                        textElement.setValue(cafbResult.getPjt().toString());

                        break;
                    case "$$050":

                        textElement.setValue(cafbResult.getPst().toString());

                        break;
                    case "$$051":

                        textElement.setValue(cafbResult.getMawpjj().toString());

                        break;
                    case "$$052":

                        textElement.setValue(cafbResult.getMawpjs().toString());

                        break;
                    case "$$053":

                        textElement.setValue(cafbResult.getMawpj().toString());

                        break;
                    case "$$054":

                        textElement.setValue(cafbResult.getMawpss().toString());

                        break;
                    case "$$055":

                        textElement.setValue(cafbResult.getMawpsj().toString());

                        break;
                    case "$$056":

                        textElement.setValue(cafbResult.getMawps().toString());

                        break;
                    case "$01":

                        textElement.setValue("Φ" + cafbResult.getDsi().toString());

                        break;
                    case "$02":

                        textElement.setValue(cafbResult.getThksn().toString());

                        break;
                    case "$03":

                        textElement.setValue("Φ" + cafbResult.getDjo().toString());

                        break;
                    case "$04":

                        textElement.setValue(cafbResult.getThkjn().toString());

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

    /**
     * cafc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cafcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getCAFC(String baseFileName, CAFCDocx cafcResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cafcResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/f/c/CAFCL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/f/c/CAFCG.docx";
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

                        textElement.setValue(cafcResult.getT().toString());

                        break;
                    case "$$002":

                        textElement.setValue(cafcResult.getPsd().toString());

                        break;
                    case "$$003":

                        textElement.setValue(cafcResult.getPss().toString());

                        break;
                    case "$$004":

                        textElement.setValue(cafcResult.getSstd());

                        break;
                    case "$$005":

                        textElement.setValue(cafcResult.getSname());

                        break;
                    case "$$006":

                        textElement.setValue(cafcResult.getDsi().toString());

                        break;
                    case "$$007":

                        textElement.setValue(cafcResult.getThksn().toString());

                        break;
                    case "$$008":

                        textElement.setValue(cafcResult.getCs2().toString());

                        break;
                    case "$$010":

                        textElement.setValue(cafcResult.getPjd().toString());

                        break;
                    case "$$011":

                        textElement.setValue(cafcResult.getPjs().toString());

                        break;
                    case "$$012":

                        textElement.setValue(cafcResult.getJstd());

                        break;
                    case "$$013":

                        textElement.setValue(cafcResult.getJname());

                        break;
                    case "$$014":

                        textElement.setValue(cafcResult.getDjo().toString());

                        break;
                    case "$$015":

                        textElement.setValue(cafcResult.getThkjn().toString());

                        break;
                    case "$$016":

                        textElement.setValue(cafcResult.getCj2().toString());

                        break;
                    case "$$020":

                        textElement.setValue(cafcResult.getDensityj().toString());

                        break;
                    case "$$021":

                        textElement.setValue(cafcResult.getDensitys().toString());

                        break;
                    case "$$022":

                        textElement.setValue(cafcResult.getOjt().toString());

                        break;
                    case "$$023":

                        textElement.setValue(cafcResult.getOst().toString());

                        break;
                    case "$$024":

                        textElement.setValue(cafcResult.getOj().toString());

                        break;
                    case "$$025":

                        textElement.setValue(cafcResult.getOs().toString());

                        break;
                    case "$$026":

                        textElement.setValue(cafcResult.getRjrel().toString());

                        break;
                    case "$$027":

                        textElement.setValue(cafcResult.getRsrel().toString());

                        break;
                    case "$$028":

                        textElement.setValue(cafcResult.getOjt1() < 0 ? "/" : cafcResult.getOjt1().toString());

                        break;
                    case "$$029":

                        textElement.setValue(cafcResult.getOst1() < 0 ? "/" : cafcResult.getOst1().toString());

                        break;
                    case "$$030":

                        textElement.setValue(cafcResult.getCj1().toString());

                        break;
                    case "$$031":

                        textElement.setValue(cafcResult.getCs1().toString());

                        break;
                    case "$$032":

                        textElement.setValue(cafcResult.getPsc().toString());

                        break;
                    case "$$033":

                        textElement.setValue(cafcResult.getPjc().toString());

                        break;
                    case "$$034":

                        textElement.setValue(cafcResult.getCj().toString());

                        break;
                    case "$$035":

                        textElement.setValue(cafcResult.getThkje().toString());

                        break;
                    case "$$036":

                        textElement.setValue(cafcResult.getRji().toString());

                        break;
                    case "$$037":

                        textElement.setValue(cafcResult.getThkjc().toString());

                        break;
                    case "$$038":

                        textElement.setValue(cafcResult.getThkjd().toString());

                        break;
                    case "$$039":

                        textElement.setValue(cafcResult.getThkjchk());

                        break;
                    case "$$040":

                        textElement.setValue(cafcResult.getCs().toString());

                        break;
                    case "$$041":

                        textElement.setValue(cafcResult.getThkse().toString());

                        break;
                    case "$$042":

                        textElement.setValue(cafcResult.getRsi().toString());

                        break;
                    case "$$043":

                        textElement.setValue(cafcResult.getOpie().toString());

                        break;
                    case "$$044":

                        textElement.setValue(cafcResult.getK().toString());

                        break;
                    case "$$045":

                        textElement.setValue(cafcResult.getF().toString());

                        break;
                    case "$$046":

                        textElement.setValue(cafcResult.getO().toString());

                        break;
                    case "$$047":

                        textElement.setValue(cafcResult.getO15().toString());

                        break;
                    case "$$048":

                        textElement.setValue(cafcResult.getOchk());

                        break;
                    case "$$049":

                        textElement.setValue(cafcResult.getPjt().toString());

                        break;
                    case "$$050":

                        textElement.setValue(cafcResult.getPst().toString());

                        break;
                    case "$$051":

                        textElement.setValue(cafcResult.getMawpjj().toString());

                        break;
                    case "$$052":

                        textElement.setValue(cafcResult.getMawpjs().toString());

                        break;
                    case "$$053":

                        textElement.setValue(cafcResult.getMawpj().toString());

                        break;
                    case "$$054":

                        textElement.setValue(cafcResult.getMawpss().toString());

                        break;
                    case "$$055":

                        textElement.setValue(cafcResult.getMawpsj().toString());

                        break;
                    case "$$056":

                        textElement.setValue(cafcResult.getMawps().toString());

                        break;
                    case "$01":

                        textElement.setValue("Φ" + cafcResult.getDsi().toString());

                        break;
                    case "$02":

                        textElement.setValue(cafcResult.getThksn().toString());

                        break;
                    case "$03":

                        textElement.setValue("Φ" + cafcResult.getDjo().toString());

                        break;
                    case "$04":

                        textElement.setValue(cafcResult.getThkjn().toString());

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

    /**
     * cafd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cafdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getCAFD(String baseFileName, CAFDDocx cafdResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cafdResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/c/a/f/d/CAFDL.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/f/d/CAFDG.docx";
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

                        textElement.setValue(cafdResult.getT().toString());

                        break;
                    case "$$002":

                        textElement.setValue(cafdResult.getPsd().toString());

                        break;
                    case "$$003":

                        textElement.setValue(cafdResult.getPss().toString());

                        break;
                    case "$$004":

                        textElement.setValue(cafdResult.getSstd());

                        break;
                    case "$$005":

                        textElement.setValue(cafdResult.getSname());

                        break;
                    case "$$006":

                        textElement.setValue(cafdResult.getRsi().toString());

                        break;
                    case "$$007":

                        textElement.setValue(cafdResult.getThksn().toString());

                        break;
                    case "$$008":

                        textElement.setValue(cafdResult.getCs2().toString());

                        break;
                    case "$$010":

                        textElement.setValue(cafdResult.getPjd().toString());

                        break;
                    case "$$011":

                        textElement.setValue(cafdResult.getPjs().toString());

                        break;
                    case "$$012":

                        textElement.setValue(cafdResult.getJstd());

                        break;
                    case "$$013":

                        textElement.setValue(cafdResult.getJname());

                        break;
                    case "$$014":

                        textElement.setValue(cafdResult.getDjo().toString());

                        break;
                    case "$$015":

                        textElement.setValue(cafdResult.getThkjn().toString());

                        break;
                    case "$$016":

                        textElement.setValue(cafdResult.getCj2().toString());

                        break;
                    case "$$020":

                        textElement.setValue(cafdResult.getDensityj().toString());

                        break;
                    case "$$021":

                        textElement.setValue(cafdResult.getDensitys().toString());

                        break;
                    case "$$022":

                        textElement.setValue(cafdResult.getOjt().toString());

                        break;
                    case "$$023":

                        textElement.setValue(cafdResult.getOst().toString());

                        break;
                    case "$$024":

                        textElement.setValue(cafdResult.getOj().toString());

                        break;
                    case "$$025":

                        textElement.setValue(cafdResult.getOs().toString());

                        break;
                    case "$$026":

                        textElement.setValue(cafdResult.getRjrel().toString());

                        break;
                    case "$$027":

                        textElement.setValue(cafdResult.getRsrel().toString());

                        break;
                    case "$$028":

                        textElement.setValue(cafdResult.getOjt1() < 0 ? "/" : cafdResult.getOjt1().toString());

                        break;
                    case "$$029":

                        textElement.setValue(cafdResult.getOst1() < 0 ? "/" : cafdResult.getOst1().toString());

                        break;
                    case "$$030":

                        textElement.setValue(cafdResult.getCj1().toString());

                        break;
                    case "$$031":

                        textElement.setValue(cafdResult.getCs1().toString());

                        break;
                    case "$$032":

                        textElement.setValue(cafdResult.getPsc().toString());

                        break;
                    case "$$033":

                        textElement.setValue(cafdResult.getPjc().toString());

                        break;
                    case "$$034":

                        textElement.setValue(cafdResult.getCj().toString());

                        break;
                    case "$$035":

                        textElement.setValue(cafdResult.getThkje().toString());

                        break;
                    case "$$036":

                        textElement.setValue(cafdResult.getRji().toString());

                        break;
                    case "$$037":

                        textElement.setValue(cafdResult.getThkjc().toString());

                        break;
                    case "$$038":

                        textElement.setValue(cafdResult.getThkjd().toString());

                        break;
                    case "$$039":

                        textElement.setValue(cafdResult.getThkjchk());

                        break;
                    case "$$040":

                        textElement.setValue(cafdResult.getCs().toString());

                        break;
                    case "$$041":

                        textElement.setValue(cafdResult.getThkse().toString());

                        break;
                    case "$$042":

                        textElement.setValue(cafdResult.getDsi().toString());

                        break;
                    case "$$043":

                        textElement.setValue(cafdResult.getOpie().toString());

                        break;
                    case "$$044":

                        textElement.setValue(cafdResult.getK().toString());

                        break;
                    case "$$045":

                        textElement.setValue(cafdResult.getF().toString());

                        break;
                    case "$$046":

                        textElement.setValue(cafdResult.getO().toString());

                        break;
                    case "$$047":

                        textElement.setValue(cafdResult.getO15().toString());

                        break;
                    case "$$048":

                        textElement.setValue(cafdResult.getOchk());

                        break;
                    case "$$049":

                        textElement.setValue(cafdResult.getPjt().toString());

                        break;
                    case "$$050":

                        textElement.setValue(cafdResult.getPst().toString());

                        break;
                    case "$$051":

                        textElement.setValue(cafdResult.getMawpjj().toString());

                        break;
                    case "$$052":

                        textElement.setValue(cafdResult.getMawpjs().toString());

                        break;
                    case "$$053":

                        textElement.setValue(cafdResult.getMawpj().toString());

                        break;
                    case "$$054":

                        textElement.setValue(cafdResult.getMawpss().toString());

                        break;
                    case "$$055":

                        textElement.setValue(cafdResult.getMawpsj().toString());

                        break;
                    case "$$056":

                        textElement.setValue(cafdResult.getMawps().toString());

                        break;
                    case "$01":

                        textElement.setValue("R" + cafdResult.getRsi().toString());

                        break;
                    case "$02":

                        textElement.setValue(cafdResult.getThksn().toString());

                        break;
                    case "$03":

                        textElement.setValue("Φ" + cafdResult.getDjo().toString());

                        break;
                    case "$04":

                        textElement.setValue(cafdResult.getThkjn().toString());

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

    /**
     * cag
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param cagaDocx     计算数据结果
     * @return 新计算书 URL
     */
    public static String getCAG(String baseFileName, CAGDocx cagaDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (cagaDocx.getDithke() < cagaDocx.getEtrelt36()) {
            template = "D:/mechw/static/west/cal/c/a/g/CAGS.docx";
        } else {
            template = "D:/mechw/static/west/cal/c/a/g/CAGB.docx";
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
                        textElement.setValue(cagaDocx.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(cagaDocx.getStd());
                        break;
                    case "$$003":
                        textElement.setValue(cagaDocx.getName());
                        break;
                    case "$$004":
                        textElement.setValue(cagaDocx.getDi().toString());
                        break;
                    case "$$005":
                        textElement.setValue(cagaDocx.getThkn().toString());
                        break;
                    case "$$006":
                        textElement.setValue(cagaDocx.getC2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(cagaDocx.getQ1().toString());
                        break;
                    case "$$008":
                        textElement.setValue(cagaDocx.getQ2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(cagaDocx.getQ3().toString());
                        break;
                    case "$$010":
                        textElement.setValue(cagaDocx.getDensity().toString());
                        break;
                    case "$$011":
                        textElement.setValue(cagaDocx.getRelt().toString());
                        break;
                    case "$$012":
                        textElement.setValue(cagaDocx.getC1().toString());
                        break;
                    case "$$013":
                        textElement.setValue(cagaDocx.getEt().toString());
                        break;
                    case "$$014":
                        textElement.setValue(cagaDocx.getC().toString());
                        break;
                    case "$$015":
                        textElement.setValue(cagaDocx.getThke().toString());
                        break;
                    case "$$016":
                        textElement.setValue(cagaDocx.getDithke().toString());
                        break;
                    case "$$017":
                        textElement.setValue(cagaDocx.getEtrelt36().toString());
                        break;
                    case "$$018":
                        textElement.setValue(cagaDocx.getKc().toString());
                        break;
                    case "$$019":
                        textElement.setValue(cagaDocx.getEc().toString());
                        break;
                    case "$$020":
                        textElement.setValue(cagaDocx.getQallow().toString());
                        break;
                    case "$$021":
                        textElement.setValue(cagaDocx.getQ().toString());
                        break;
                    case "$$022":
                        textElement.setValue(cagaDocx.getQchk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + cagaDocx.getDi().toString());
                        break;
                    case "$02":
                        textElement.setValue(cagaDocx.getThkn().toString());
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
