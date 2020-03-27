package com.mechw.service.docx.b;

import com.mechw.model.front.b.a.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxBA extends DocxTool {

    /**
     * baaa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baaaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAAA(String baseFileName, BAAADocx baaaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/a/a/BAAA.docx";

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
                        textElement.setValue(baaaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baaaResult.getDstd());
                        break;
                    case "$$003":
                        textElement.setValue(baaaResult.getDname());
                        break;
                    case "$$004":
                        textElement.setValue(baaaResult.getCd2().toString());
                        break;
                    case "$$005":
                        textElement.setValue(baaaResult.getThkdn().toString());
                        break;
                    case "$$006":
                        textElement.setValue(baaaResult.getBstd());
                        break;
                    case "$$007":
                        textElement.setValue(baaaResult.getBname());
                        break;
                    case "$$008":
                        textElement.setValue(baaaResult.getThkbn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(baaaResult.getLc().toString());
                        break;
                    case "$$010":
                        textElement.setValue(baaaResult.getWc().toString());
                        break;
                    case "$$011":
                        textElement.setValue(baaaResult.getDd().toString());
                        break;
                    case "$$012":
                        textElement.setValue(baaaResult.getCd1().toString());
                        break;
                    case "$$013":
                        textElement.setValue(baaaResult.getOdt().toString());
                        break;
                    case "$$014":
                        textElement.setValue(baaaResult.getEdt().toString());
                        break;
                    case "$$015":
                        textElement.setValue(baaaResult.getObt().toString());
                        break;
                    case "$$016":
                        textElement.setValue(baaaResult.getDm().toString() + "×10⁻⁶");
                        break;
                    case "$$017":
                        textElement.setValue(baaaResult.getG().toString());
                        break;
                    case "$$018":
                        textElement.setValue(baaaResult.getPa().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baaaResult.getCd().toString());
                        break;
                    case "$$020":
                        textElement.setValue(baaaResult.getThkde().toString());
                        break;
                    case "$$021":
                        textElement.setValue(baaaResult.getWl().toString());
                        break;
                    case "$$022":
                        textElement.setValue(baaaResult.getAlpha().toString());
                        break;
                    case "$$023":
                        textElement.setValue(baaaResult.getBeta().toString());
                        break;
                    case "$$024":
                        textElement.setValue(baaaResult.getThkdc().toString());
                        break;
                    case "$$025":
                        textElement.setValue(baaaResult.getThkdd().toString());
                        break;
                    case "$$026":
                        textElement.setValue(baaaResult.getThkdchk());
                        break;
                    case "$$027":
                        textElement.setValue(baaaResult.getFallow().toString());
                        break;
                    case "$$028":
                        textElement.setValue(baaaResult.getFtmax().toString());
                        break;
                    case "$$029":
                        textElement.setValue(baaaResult.getFtmaxchk());
                        break;
                    case "$$030":
                        textElement.setValue(baaaResult.getZtl().toString());
                        break;
                    case "$$031":
                        textElement.setValue(baaaResult.getZtw().toString());
                        break;
                    case "$$032":
                        textElement.setValue(baaaResult.getZt().toString());
                        break;
                    case "$$100":
                        textElement.setValue(baaaResult.getL().toString());
                        break;
                    case "$$101":
                        textElement.setValue(baaaResult.getW().toString());
                        break;

                    case "$05":
                        textElement.setValue(baaaResult.getThkdn().toString());
                        break;
                    case "$09":
                        textElement.setValue(baaaResult.getLc().toString());
                        break;
                    case "$10":
                        textElement.setValue(baaaResult.getWc().toString());
                        break;
                    case "$100":
                        textElement.setValue(baaaResult.getL().toString());
                        break;
                    case "$101":
                        textElement.setValue(baaaResult.getW().toString());
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
     * baab
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baabResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAAB(String baseFileName, BAABDocx baabResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/a/b/BAAB.docx";

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
                        textElement.setValue(baabResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baabResult.getStd());
                        break;
                    case "$$003":
                        textElement.setValue(baabResult.getName());
                        break;
                    case "$$004":
                        textElement.setValue(baabResult.getC2().toString());
                        break;
                    case "$$005":
                        textElement.setValue(baabResult.getThkn().toString());
                        break;
                    case "$$006":
                        textElement.setValue(baabResult.getL().toString());
                        break;
                    case "$$007":
                        textElement.setValue(baabResult.getW().toString());
                        break;
                    case "$$008":
                        textElement.setValue(baabResult.getD0().toString());
                        break;
                    case "$$009":
                        textElement.setValue(baabResult.getC1().toString());
                        break;
                    case "$$010":
                        textElement.setValue(baabResult.getOt().toString());
                        break;
                    case "$$011":
                        textElement.setValue(baabResult.getEt().toString());
                        break;
                    case "$$012":
                        textElement.setValue(baabResult.getDm().toString() + "×10⁻⁶");
                        break;
                    case "$$013":
                        textElement.setValue(baabResult.getG().toString());
                        break;
                    case "$$014":
                        textElement.setValue(baabResult.getPa().toString());
                        break;
                    case "$$015":
                        textElement.setValue(baabResult.getC().toString());
                        break;
                    case "$$016":
                        textElement.setValue(baabResult.getThkn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baabResult.getBa().toString());
                        break;
                    case "$$020":
                        textElement.setValue(baabResult.getAlpha().toString());
                        break;
                    case "$$021":
                        textElement.setValue(baabResult.getBeta().toString());
                        break;
                    case "$$022":
                        textElement.setValue(baabResult.getThkc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(baabResult.getThkd().toString());
                        break;
                    case "$$024":
                        textElement.setValue(baabResult.getThkchk());
                        break;
                    case "$$025":
                        textElement.setValue(baabResult.getFallow().toString());
                        break;
                    case "$$026":
                        textElement.setValue(baabResult.getFtmax().toString());
                        break;
                    case "$$027":
                        textElement.setValue(baabResult.getFtmaxchk());
                        break;
                    case "$05":
                        textElement.setValue(baabResult.getThkn().toString());
                        break;
                    case "$06":
                        textElement.setValue(baabResult.getL().toString());
                        break;
                    case "$07":
                        textElement.setValue(baabResult.getW().toString());
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
     * baba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param babaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBABA(String baseFileName, BABADocx babaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/b/a/BABA.docx";

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
                        textElement.setValue(babaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(babaResult.getStd());
                        break;
                    case "$$003":
                        textElement.setValue(babaResult.getName());
                        break;
                    case "$$004":
                        textElement.setValue(babaResult.getC2().toString());
                        break;
                    case "$$005":
                        textElement.setValue(babaResult.getThkn().toString());
                        break;
                    case "$$006":
                        textElement.setValue(babaResult.getD().toString());
                        break;
                    case "$$007":
                        textElement.setValue(babaResult.getH().toString());
                        break;
                    case "$$008":
                        textElement.setValue(babaResult.getLb().toString());
                        break;
                    case "$$009":
                        textElement.setValue(babaResult.getD0().toString());
                        break;
                    case "$$010":
                        textElement.setValue(babaResult.getC1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(babaResult.getOt().toString());
                        break;
                    case "$$012":
                        textElement.setValue(babaResult.getG().toString());
                        break;
                    case "$$013":
                        textElement.setValue(babaResult.getC().toString());
                        break;
                    case "$$014":
                        textElement.setValue(babaResult.getThke().toString());
                        break;
                    case "$$015":
                        textElement.setValue(babaResult.getThkc().toString());
                        break;
                    case "$$016":
                        textElement.setValue(babaResult.getThkd().toString());
                        break;
                    case "$$017":
                        textElement.setValue(babaResult.getThkchk());
                        break;
                    case "$$018":
                        textElement.setValue(babaResult.getLbmax().toString());
                        break;
                    case "$$019":
                        textElement.setValue(babaResult.getLbchk());
                        break;
                    case "$05":
                        textElement.setValue(babaResult.getThkn().toString());
                        break;
                    case "$08":
                        textElement.setValue(babaResult.getLb().toString());
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
     * bac
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bacResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAC(String baseFileName, BACDocx bacResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/c/BAC.docx";

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
                        textElement.setValue(bacResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bacResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bacResult.getStd());
                        break;
                    case "$$004":
                        textElement.setValue(bacResult.getName());
                        break;
                    case "$$005":
                        textElement.setValue(bacResult.getC2().toString());
                        break;
                    case "$$006":
                        textElement.setValue(bacResult.getThkn().toString());
                        break;
                    case "$$007":
                        textElement.setValue(bacResult.getL().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bacResult.getH().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bacResult.getD0().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bacResult.getC1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bacResult.getOt().toString());
                        break;
                    case "$$012":
                        textElement.setValue(bacResult.getEt().toString());
                        break;
                    case "$$013":
                        textElement.setValue(bacResult.getG().toString());
                        break;
                    case "$$014":
                        textElement.setValue(bacResult.getPc().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bacResult.getC().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bacResult.getThke().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bacResult.getHl().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bacResult.getAlpha().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bacResult.getBeta().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bacResult.getThkc().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bacResult.getThkd().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bacResult.getThkchk());
                        break;
                    case "$$023":
                        textElement.setValue(bacResult.getFallow().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bacResult.getFtmax().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bacResult.getFtmaxchk());
                        break;
                    case "$07":
                        textElement.setValue(bacResult.getL().toString());
                        break;
                    case "$08":
                        textElement.setValue(bacResult.getH().toString());
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
     * bad
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param badResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAD(String baseFileName, BADDocx badResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/d/BAD.docx";

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
                        textElement.setValue(badResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(badResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(badResult.getStd());
                        break;
                    case "$$004":
                        textElement.setValue(badResult.getName());
                        break;
                    case "$$005":
                        textElement.setValue(badResult.getC2().toString());
                        break;
                    case "$$006":
                        textElement.setValue(badResult.getThkn().toString());
                        break;
                    case "$$007":
                        textElement.setValue(badResult.getL().toString());
                        break;
                    case "$$008":
                        textElement.setValue(badResult.getH().toString());
                        break;
                    case "$$009":
                        textElement.setValue(badResult.getJstd());
                        break;
                    case "$$010":
                        textElement.setValue(badResult.getJname());
                        break;
                    case "$$011":
                        textElement.setValue(badResult.getD0().toString());
                        break;
                    case "$$012":
                        textElement.setValue(badResult.getC1().toString());
                        break;
                    case "$$013":
                        textElement.setValue(badResult.getOt().toString());
                        break;
                    case "$$014":
                        textElement.setValue(badResult.getEbt().toString());
                        break;
                    case "$$015":
                        textElement.setValue(badResult.getEjt().toString());
                        break;
                    case "$$016":
                        textElement.setValue(badResult.getG().toString());
                        break;
                    case "$$017":
                        textElement.setValue(badResult.getPc().toString());
                        break;
                    case "$$018":
                        textElement.setValue(badResult.getC().toString());
                        break;
                    case "$$019":
                        textElement.setValue(badResult.getThke().toString());
                        break;
                    case "$$020":
                        textElement.setValue(badResult.getHl().toString());
                        break;
                    case "$$021":
                        textElement.setValue(badResult.getAlpha().toString());
                        break;
                    case "$$022":
                        textElement.setValue(badResult.getBeta().toString());
                        break;
                    case "$$023":
                        textElement.setValue(badResult.getThkc().toString());
                        break;
                    case "$$024":
                        textElement.setValue(badResult.getThkd().toString());
                        break;
                    case "$$025":
                        textElement.setValue(badResult.getThkchk());
                        break;
                    case "$$026":
                        textElement.setValue(badResult.getFallow().toString());
                        break;
                    case "$$027":
                        textElement.setValue(badResult.getFmax().toString());
                        break;
                    case "$$028":
                        textElement.setValue(badResult.getFchk());
                        break;
                    case "$$029":
                        textElement.setValue(badResult.getIct().toString());
                        break;
                    case "$07":
                        textElement.setValue(badResult.getL().toString());
                        break;
                    case "$08":
                        textElement.setValue(badResult.getH().toString());
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
     * baea
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baeaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAEA(String baseFileName, BAEADocx baeaResult) {

        // 要使用的文件模板
        String template;

        if (baeaResult.getLg() < (363 * Math.pow(baeaResult.getDge(), 2.0 / 3.0))) {
            template = "D:/mechw/static/west/cal/b/a/e/a/BAEAN363.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/a/e/a/BAEAP363.docx";
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
                        textElement.setValue(baeaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baeaResult.getH().toString());
                        break;
                    case "$$003":
                        textElement.setValue(baeaResult.getD().toString());
                        break;
                    case "$$004":
                        textElement.setValue(baeaResult.getBstd());
                        break;
                    case "$$005":
                        textElement.setValue(baeaResult.getBname());
                        break;
                    case "$$006":
                        textElement.setValue(baeaResult.getCb2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(baeaResult.getThkbn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(baeaResult.getWc().toString());
                        break;
                    case "$$009":
                        textElement.setValue(baeaResult.getDstd());
                        break;
                    case "$$010":
                        textElement.setValue(baeaResult.getDname());
                        break;
                    case "$$011":
                        textElement.setValue(baeaResult.getGstd());
                        break;
                    case "$$012":
                        textElement.setValue(baeaResult.getGname());
                        break;
                    case "$$013":
                        textElement.setValue(baeaResult.getDgn().toString());
                        break;
                    case "$$014":
                        textElement.setValue(baeaResult.getLg().toString());
                        break;
                    case "$$015":
                        textElement.setValue(baeaResult.getCg2().toString());
                        break;
                    case "$$016":
                        textElement.setValue(baeaResult.getDb().toString());
                        break;
                    case "$$017":
                        textElement.setValue(baeaResult.getCb1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(baeaResult.getObt().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baeaResult.getEbt().toString());
                        break;
                    case "$$020":
                        textElement.setValue(baeaResult.getDg().toString());
                        break;
                    case "$$021":
                        textElement.setValue(baeaResult.getCg1().toString());
                        break;
                    case "$$022":
                        textElement.setValue(baeaResult.getOgt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(baeaResult.getEgt().toString());
                        break;
                    case "$$024":
                        textElement.setValue(baeaResult.getEdt().toString());
                        break;
                    case "$$025":
                        textElement.setValue(baeaResult.getG().toString());
                        break;
                    case "$$026":
                        textElement.setValue(baeaResult.getPc().toString());
                        break;
                    case "$$027":
                        textElement.setValue(baeaResult.getCb().toString());
                        break;
                    case "$$028":
                        textElement.setValue(baeaResult.getThkbe().toString());
                        break;
                    case "$$029":
                        textElement.setValue(baeaResult.getCg().toString());
                        break;
                    case "$$030":
                        textElement.setValue(baeaResult.getDge().toString());
                        break;
                    case "$$031":
                        textElement.setValue(baeaResult.getHwc().toString());
                        break;
                    case "$$032":
                        textElement.setValue(baeaResult.getAlpha().toString());
                        break;
                    case "$$033":
                        textElement.setValue(baeaResult.getBeta().toString());
                        break;
                    case "$$034":
                        textElement.setValue(baeaResult.getWmax().toString());
                        break;
                    case "$$035":
                        textElement.setValue(baeaResult.getWcchk());
                        break;
                    case "$$036":
                        textElement.setValue(baeaResult.getZp().toString());
                        break;
                    case "$$037":
                        textElement.setValue(baeaResult.getThkbc().toString());
                        break;
                    case "$$038":
                        textElement.setValue(baeaResult.getThkbd().toString());
                        break;
                    case "$$039":
                        textElement.setValue(baeaResult.getThkbchk());
                        break;
                    case "$$040":
                        textElement.setValue(baeaResult.getFallow().toString());
                        break;
                    case "$$041":
                        textElement.setValue(baeaResult.getFmax().toString());
                        break;
                    case "$$042":
                        textElement.setValue(baeaResult.getFchk());
                        break;
                    case "$$043":
                        textElement.setValue(baeaResult.getIct().toString());
                        break;
                    case "$$044":
                        textElement.setValue(baeaResult.getDgc().toString());
                        break;
                    case "$$045":
                        textElement.setValue(baeaResult.getDgd().toString());
                        break;
                    case "$$046":
                        textElement.setValue(baeaResult.getDgchk());
                        break;
                    case "$$101":
                        textElement.setValue(baeaResult.getOmax().toString());
                        break;
                    case "$$102":
                        textElement.setValue(baeaResult.getOmaxchk());
                        break;
                    case "$02":
                        textElement.setValue(baeaResult.getH().toString());
                        break;
                    case "$13":
                        textElement.setValue(baeaResult.getDgn().toString());
                        break;
                    case "$14":
                        textElement.setValue(baeaResult.getLg().toString());
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
     * baeb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baebResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAEB(String baseFileName, BAEBDocx baebResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/e/b/BAEB.docx";

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
                        textElement.setValue(baebResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baebResult.getH().toString());
                        break;
                    case "$$003":
                        textElement.setValue(baebResult.getD().toString());
                        break;
                    case "$$004":
                        textElement.setValue(baebResult.getBstd());
                        break;
                    case "$$005":
                        textElement.setValue(baebResult.getBname());
                        break;
                    case "$$006":
                        textElement.setValue(baebResult.getCb2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(baebResult.getThkbn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(baebResult.getWc().toString());
                        break;
                    case "$$009":
                        textElement.setValue(baebResult.getDstd());
                        break;
                    case "$$010":
                        textElement.setValue(baebResult.getDname());
                        break;
                    case "$$011":
                        textElement.setValue(baebResult.getW().toString());
                        break;
                    case "$$016":
                        textElement.setValue(baebResult.getDb().toString());
                        break;
                    case "$$017":
                        textElement.setValue(baebResult.getCb1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(baebResult.getObt().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baebResult.getEbt().toString());
                        break;
                    case "$$024":
                        textElement.setValue(baebResult.getEdt().toString());
                        break;
                    case "$$025":
                        textElement.setValue(baebResult.getG().toString());
                        break;
                    case "$$026":
                        textElement.setValue(baebResult.getPc().toString());
                        break;
                    case "$$027":
                        textElement.setValue(baebResult.getCb().toString());
                        break;
                    case "$$028":
                        textElement.setValue(baebResult.getThkbe().toString());
                        break;
                    case "$$031":
                        textElement.setValue(baebResult.getHwc().toString());
                        break;
                    case "$$032":
                        textElement.setValue(baebResult.getAlpha().toString());
                        break;
                    case "$$033":
                        textElement.setValue(baebResult.getBeta().toString());
                        break;
                    case "$$034":
                        textElement.setValue(baebResult.getWmax().toString());
                        break;
                    case "$$035":
                        textElement.setValue(baebResult.getWcchk());
                        break;
                    case "$$036":
                        textElement.setValue(baebResult.getZp().toString());
                        break;
                    case "$$037":
                        textElement.setValue(baebResult.getThkbc().toString());
                        break;
                    case "$$038":
                        textElement.setValue(baebResult.getThkbd().toString());
                        break;
                    case "$$039":
                        textElement.setValue(baebResult.getThkbchk());
                        break;
                    case "$$040":
                        textElement.setValue(baebResult.getFallow().toString());
                        break;
                    case "$$041":
                        textElement.setValue(baebResult.getFmax().toString());
                        break;
                    case "$$042":
                        textElement.setValue(baebResult.getFchk());
                        break;
                    case "$$043":
                        textElement.setValue(baebResult.getIct().toString());
                        break;
                    case "$02":
                        textElement.setValue(baebResult.getH().toString());
                        break;
                    case "$11":
                        textElement.setValue(baebResult.getW().toString());
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
     * bafa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bafaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAFA(String baseFileName, BAFADocx bafaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/f/a/BAFA.docx";

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
                        textElement.setValue(bafaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bafaResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bafaResult.getL().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bafaResult.getH().toString());
                        break;
                    case "$$005":
                        textElement.setValue(bafaResult.getFstd());
                        break;
                    case "$$006":
                        textElement.setValue(bafaResult.getFname());
                        break;
                    case "$$007":
                        textElement.setValue(bafaResult.getC12().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bafaResult.getThk1n().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bafaResult.getSstd());
                        break;
                    case "$$010":
                        textElement.setValue(bafaResult.getSname());
                        break;
                    case "$$011":
                        textElement.setValue(bafaResult.getC22().toString());
                        break;
                    case "$$012":
                        textElement.setValue(bafaResult.getThk2n().toString());
                        break;
                    case "$$013":
                        textElement.setValue(bafaResult.getJstd());
                        break;
                    case "$$014":
                        textElement.setValue(bafaResult.getJname());
                        break;
                    case "$$015":
                        textElement.setValue(bafaResult.getD1().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bafaResult.getC11().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bafaResult.getO1t().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bafaResult.getE1t().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bafaResult.getD2().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bafaResult.getC21().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bafaResult.getO2t().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bafaResult.getE2t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bafaResult.getEjt().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bafaResult.getG().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bafaResult.getBh1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bafaResult.getC1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bafaResult.getThk1e().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bafaResult.getBh1l().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bafaResult.getAlpha1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bafaResult.getBeta1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bafaResult.getBh2().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bafaResult.getC2().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bafaResult.getThk2e().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bafaResult.getBh2l().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bafaResult.getAlpha2().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bafaResult.getBeta2().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bafaResult.getSh1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bafaResult.getSh2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bafaResult.getI0().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bafaResult.getF1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bafaResult.getI1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bafaResult.getThk1c().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bafaResult.getThk1d().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bafaResult.getThk1chk());
                        break;
                    case "$$045":
                        textElement.setValue(bafaResult.getF1allow().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bafaResult.getF1max().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bafaResult.getF1chk());
                        break;
                    case "$$048":
                        textElement.setValue(bafaResult.getThk2c().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bafaResult.getThk2d().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bafaResult.getThk2chk());
                        break;
                    case "$$051":
                        textElement.setValue(bafaResult.getF2allow().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bafaResult.getF2max().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bafaResult.getF2chk());
                        break;
                    case "$03":
                        textElement.setValue(bafaResult.getL().toString());
                        break;
                    case "$04":
                        textElement.setValue(bafaResult.getH().toString());
                        break;
                    case "$25":
                        textElement.setValue(bafaResult.getBh1().toString());
                        break;
                    case "$31":
                        textElement.setValue(bafaResult.getBh2().toString());
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
     * bafb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bafbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAFB(String baseFileName, BAFBDocx bafbResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/f/b/BAFB.docx";

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
                        textElement.setValue(bafbResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bafbResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bafbResult.getL().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bafbResult.getBh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(bafbResult.getFstd());
                        break;
                    case "$$006":
                        textElement.setValue(bafbResult.getFname());
                        break;
                    case "$$007":
                        textElement.setValue(bafbResult.getC12().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bafbResult.getThk1n().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bafbResult.getSstd());
                        break;
                    case "$$010":
                        textElement.setValue(bafbResult.getSname());
                        break;
                    case "$$011":
                        textElement.setValue(bafbResult.getC22().toString());
                        break;
                    case "$$012":
                        textElement.setValue(bafbResult.getThk2n().toString());
                        break;
                    case "$$013":
                        textElement.setValue(bafbResult.getTstd());
                        break;
                    case "$$014":
                        textElement.setValue(bafbResult.getTname());
                        break;
                    case "$$015":
                        textElement.setValue(bafbResult.getC32().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bafbResult.getThk3n().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bafbResult.getJstd());
                        break;
                    case "$$018":
                        textElement.setValue(bafbResult.getJname());
                        break;
                    case "$$019":
                        textElement.setValue(bafbResult.getD1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bafbResult.getC11().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bafbResult.getO1t().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bafbResult.getE1t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bafbResult.getD3().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bafbResult.getC31().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bafbResult.getO3t().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bafbResult.getE3t().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bafbResult.getD2().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bafbResult.getC21().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bafbResult.getO2t().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bafbResult.getE2t().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bafbResult.getEjt().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bafbResult.getG().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bafbResult.getBh1().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bafbResult.getC1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bafbResult.getThk1e().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bafbResult.getBh1l().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bafbResult.getAlpha1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bafbResult.getBeta1().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bafbResult.getSh1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bafbResult.getBh2().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bafbResult.getC2().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bafbResult.getThk2e().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bafbResult.getBh2l().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bafbResult.getAlpha2().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bafbResult.getBeta2().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bafbResult.getSh2().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bafbResult.getBh3().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bafbResult.getC3().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bafbResult.getThk3e().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bafbResult.getBh3l().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bafbResult.getAlpha3().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bafbResult.getBeta3().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bafbResult.getSh3().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bafbResult.getI0().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bafbResult.getThk1c().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bafbResult.getThk1d().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bafbResult.getThk1chk());
                        break;
                    case "$$058":
                        textElement.setValue(bafbResult.getF1allow().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bafbResult.getF1max().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bafbResult.getF1chk());
                        break;
                    case "$$061":
                        textElement.setValue(bafbResult.getF1().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bafbResult.getI1().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bafbResult.getThk2c().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bafbResult.getThk2d().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bafbResult.getThk2chk());
                        break;
                    case "$$066":
                        textElement.setValue(bafbResult.getF2allow().toString());
                        break;
                    case "$$067":
                        textElement.setValue(bafbResult.getF2max().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bafbResult.getF2chk());
                        break;
                    case "$$069":
                        textElement.setValue(bafbResult.getF2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(bafbResult.getI2().toString());
                        break;
                    case "$$071":
                        textElement.setValue(bafbResult.getThk3c().toString());
                        break;
                    case "$$072":
                        textElement.setValue(bafbResult.getThk3d().toString());
                        break;
                    case "$$073":
                        textElement.setValue(bafbResult.getThk3chk());
                        break;
                    case "$$074":
                        textElement.setValue(bafbResult.getF3allow().toString());
                        break;
                    case "$$075":
                        textElement.setValue(bafbResult.getF3max().toString());
                        break;
                    case "$$076":
                        textElement.setValue(bafbResult.getF3chk());
                        break;
                    case "$03":
                        textElement.setValue(bafbResult.getL().toString());
                        break;
                    case "$04":
                        textElement.setValue(bafbResult.getBh().toString());
                        break;
                    case "$33":
                        textElement.setValue(bafbResult.getBh1().toString());
                        break;
                    case "$40":
                        textElement.setValue(bafbResult.getBh2().toString());
                        break;
                    case "$47":
                        textElement.setValue(bafbResult.getBh3().toString());
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
     * bafc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bafcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAFC(String baseFileName, BAFCDocx bafcResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/f/c/BAFC.docx";

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
                        textElement.setValue(bafcResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bafcResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bafcResult.getL().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bafcResult.getBh().toString());
                        break;

                    case "$$005":
                        textElement.setValue(bafcResult.getStd1());
                        break;
                    case "$$006":
                        textElement.setValue(bafcResult.getName1());
                        break;
                    case "$$007":
                        textElement.setValue(bafcResult.getC12().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bafcResult.getThk1n().toString());
                        break;

                    case "$$009":
                        textElement.setValue(bafcResult.getStd2());
                        break;
                    case "$$010":
                        textElement.setValue(bafcResult.getName2());
                        break;
                    case "$$011":
                        textElement.setValue(bafcResult.getC22().toString());
                        break;
                    case "$$012":
                        textElement.setValue(bafcResult.getThk2n().toString());
                        break;

                    case "$$013":
                        textElement.setValue(bafcResult.getStd3());
                        break;
                    case "$$014":
                        textElement.setValue(bafcResult.getName3());
                        break;
                    case "$$015":
                        textElement.setValue(bafcResult.getC32().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bafcResult.getThk3n().toString());
                        break;

                    case "$$017":
                        textElement.setValue(bafcResult.getStd4());
                        break;
                    case "$$018":
                        textElement.setValue(bafcResult.getName4());
                        break;
                    case "$$019":
                        textElement.setValue(bafcResult.getC42().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bafcResult.getThk4n().toString());
                        break;

                    case "$$021":
                        textElement.setValue(bafcResult.getJstd());
                        break;
                    case "$$022":
                        textElement.setValue(bafcResult.getJname());
                        break;

                    case "$$023":
                        textElement.setValue(bafcResult.getD1().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bafcResult.getC11().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bafcResult.getO1t().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bafcResult.getE1t().toString());
                        break;

                    case "$$027":
                        textElement.setValue(bafcResult.getD3().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bafcResult.getC31().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bafcResult.getO3t().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bafcResult.getE3t().toString());
                        break;

                    case "$$031":
                        textElement.setValue(bafcResult.getD2().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bafcResult.getC21().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bafcResult.getO2t().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bafcResult.getE2t().toString());
                        break;

                    case "$$035":
                        textElement.setValue(bafcResult.getD4().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bafcResult.getC41().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bafcResult.getO4t().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bafcResult.getE4t().toString());
                        break;

                    case "$$039":
                        textElement.setValue(bafcResult.getEjt().toString());
                        break;

                    case "$$040":
                        textElement.setValue(bafcResult.getG().toString());
                        break;

                    case "$$041":
                        textElement.setValue(bafcResult.getBh1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bafcResult.getC1().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bafcResult.getThk1e().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bafcResult.getBh1l().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bafcResult.getAlpha1().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bafcResult.getBeta1().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bafcResult.getSh1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(bafcResult.getBh2().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bafcResult.getC2().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bafcResult.getThk2e().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bafcResult.getBh2l().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bafcResult.getAlpha2().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bafcResult.getBeta2().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bafcResult.getSh2().toString());
                        break;

                    case "$$055":
                        textElement.setValue(bafcResult.getBh3().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bafcResult.getC3().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bafcResult.getThk3e().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bafcResult.getBh3l().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bafcResult.getAlpha3().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bafcResult.getBeta3().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bafcResult.getSh3().toString());
                        break;

                    case "$$062":
                        textElement.setValue(bafcResult.getBh4().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bafcResult.getC4().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bafcResult.getThk4e().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bafcResult.getBh4l().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bafcResult.getAlpha4().toString());
                        break;
                    case "$$067":
                        textElement.setValue(bafcResult.getBeta4().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bafcResult.getSh4().toString());
                        break;

                    case "$$069":
                        textElement.setValue(bafcResult.getI0().toString());
                        break;

                    case "$$070":
                        textElement.setValue(bafcResult.getThk1c().toString());
                        break;
                    case "$$071":
                        textElement.setValue(bafcResult.getThk1d().toString());
                        break;
                    case "$$072":
                        textElement.setValue(bafcResult.getThk1chk());
                        break;
                    case "$$073":
                        textElement.setValue(bafcResult.getF1allow().toString());
                        break;
                    case "$$074":
                        textElement.setValue(bafcResult.getF1max().toString());
                        break;
                    case "$$075":
                        textElement.setValue(bafcResult.getF1chk());
                        break;

                    case "$$076":
                        textElement.setValue(bafcResult.getF1().toString());
                        break;
                    case "$$077":
                        textElement.setValue(bafcResult.getI1().toString());
                        break;

                    case "$$078":
                        textElement.setValue(bafcResult.getThk2c().toString());
                        break;
                    case "$$079":
                        textElement.setValue(bafcResult.getThk2d().toString());
                        break;
                    case "$$080":
                        textElement.setValue(bafcResult.getThk2chk());
                        break;
                    case "$$081":
                        textElement.setValue(bafcResult.getF2allow().toString());
                        break;
                    case "$$082":
                        textElement.setValue(bafcResult.getF2max().toString());
                        break;
                    case "$$083":
                        textElement.setValue(bafcResult.getF2chk());
                        break;

                    case "$$084":
                        textElement.setValue(bafcResult.getF2().toString());
                        break;
                    case "$$085":
                        textElement.setValue(bafcResult.getI2().toString());
                        break;

                    case "$$086":
                        textElement.setValue(bafcResult.getThk3c().toString());
                        break;
                    case "$$087":
                        textElement.setValue(bafcResult.getThk3d().toString());
                        break;
                    case "$$088":
                        textElement.setValue(bafcResult.getThk3chk());
                        break;
                    case "$$089":
                        textElement.setValue(bafcResult.getF3allow().toString());
                        break;
                    case "$$090":
                        textElement.setValue(bafcResult.getF3max().toString());
                        break;
                    case "$$091":
                        textElement.setValue(bafcResult.getF3chk());
                        break;

                    case "$$092":
                        textElement.setValue(bafcResult.getF3().toString());
                        break;
                    case "$$093":
                        textElement.setValue(bafcResult.getI3().toString());
                        break;

                    case "$$094":
                        textElement.setValue(bafcResult.getThk4c().toString());
                        break;
                    case "$$095":
                        textElement.setValue(bafcResult.getThk4d().toString());
                        break;
                    case "$$096":
                        textElement.setValue(bafcResult.getThk4chk());
                        break;
                    case "$$097":
                        textElement.setValue(bafcResult.getF4allow().toString());
                        break;
                    case "$$098":
                        textElement.setValue(bafcResult.getF4max().toString());
                        break;
                    case "$$099":
                        textElement.setValue(bafcResult.getF4chk());
                        break;

                    case "$03":
                        textElement.setValue(bafcResult.getL().toString());
                        break;
                    case "$04":
                        textElement.setValue(bafcResult.getBh().toString());
                        break;
                    case "$41":
                        textElement.setValue(bafcResult.getBh1().toString());
                        break;
                    case "$48":
                        textElement.setValue(bafcResult.getBh2().toString());
                        break;
                    case "$55":
                        textElement.setValue(bafcResult.getBh3().toString());
                        break;
                    case "$62":
                        textElement.setValue(bafcResult.getBh4().toString());
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
     * bafd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bafdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAFD(String baseFileName, BAFDDocx bafdResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/f/d/BAFD.docx";

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
                        textElement.setValue(bafdResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bafdResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bafdResult.getL().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bafdResult.getBh().toString());
                        break;

                    case "$$005":
                        textElement.setValue(bafdResult.getStd1());
                        break;
                    case "$$006":
                        textElement.setValue(bafdResult.getName1());
                        break;
                    case "$$007":
                        textElement.setValue(bafdResult.getC12().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bafdResult.getThk1n().toString());
                        break;

                    case "$$009":
                        textElement.setValue(bafdResult.getStd2());
                        break;
                    case "$$010":
                        textElement.setValue(bafdResult.getName2());
                        break;
                    case "$$011":
                        textElement.setValue(bafdResult.getC22().toString());
                        break;
                    case "$$012":
                        textElement.setValue(bafdResult.getThk2n().toString());
                        break;

                    case "$$013":
                        textElement.setValue(bafdResult.getStd3());
                        break;
                    case "$$014":
                        textElement.setValue(bafdResult.getName3());
                        break;
                    case "$$015":
                        textElement.setValue(bafdResult.getC32().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bafdResult.getThk3n().toString());
                        break;

                    case "$$017":
                        textElement.setValue(bafdResult.getStd4());
                        break;
                    case "$$018":
                        textElement.setValue(bafdResult.getName4());
                        break;
                    case "$$019":
                        textElement.setValue(bafdResult.getC42().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bafdResult.getThk4n().toString());
                        break;

                    case "$$021":
                        textElement.setValue(bafdResult.getStd5());
                        break;
                    case "$$022":
                        textElement.setValue(bafdResult.getName5());
                        break;
                    case "$$023":
                        textElement.setValue(bafdResult.getC52().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bafdResult.getThk5n().toString());
                        break;

                    case "$$025":
                        textElement.setValue(bafdResult.getJstd());
                        break;
                    case "$$026":
                        textElement.setValue(bafdResult.getJname());
                        break;

                    case "$$027":
                        textElement.setValue(bafdResult.getD1().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bafdResult.getC11().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bafdResult.getO1t().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bafdResult.getE1t().toString());
                        break;

                    case "$$031":
                        textElement.setValue(bafdResult.getD3().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bafdResult.getC31().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bafdResult.getO3t().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bafdResult.getE3t().toString());
                        break;

                    case "$$035":
                        textElement.setValue(bafdResult.getD2().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bafdResult.getC21().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bafdResult.getO2t().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bafdResult.getE2t().toString());
                        break;

                    case "$$039":
                        textElement.setValue(bafdResult.getD4().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bafdResult.getC41().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bafdResult.getO4t().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bafdResult.getE4t().toString());
                        break;

                    case "$$043":
                        textElement.setValue(bafdResult.getD5().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bafdResult.getC51().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bafdResult.getO5t().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bafdResult.getE5t().toString());
                        break;

                    case "$$047":
                        textElement.setValue(bafdResult.getEjt().toString());
                        break;

                    case "$$048":
                        textElement.setValue(bafdResult.getG().toString());
                        break;

                    case "$$049":
                        textElement.setValue(bafdResult.getBh1().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bafdResult.getC1().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bafdResult.getThk1e().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bafdResult.getBh1l().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bafdResult.getAlpha1().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bafdResult.getBeta1().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bafdResult.getSh1().toString());
                        break;

                    case "$$056":
                        textElement.setValue(bafdResult.getBh2().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bafdResult.getC2().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bafdResult.getThk2e().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bafdResult.getBh2l().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bafdResult.getAlpha2().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bafdResult.getBeta2().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bafdResult.getSh2().toString());
                        break;

                    case "$$063":
                        textElement.setValue(bafdResult.getBh3().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bafdResult.getC3().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bafdResult.getThk3e().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bafdResult.getBh3l().toString());
                        break;
                    case "$$067":
                        textElement.setValue(bafdResult.getAlpha3().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bafdResult.getBeta3().toString());
                        break;
                    case "$$069":
                        textElement.setValue(bafdResult.getSh3().toString());
                        break;

                    case "$$070":
                        textElement.setValue(bafdResult.getBh4().toString());
                        break;
                    case "$$071":
                        textElement.setValue(bafdResult.getC4().toString());
                        break;
                    case "$$072":
                        textElement.setValue(bafdResult.getThk4e().toString());
                        break;
                    case "$$073":
                        textElement.setValue(bafdResult.getBh4l().toString());
                        break;
                    case "$$074":
                        textElement.setValue(bafdResult.getAlpha4().toString());
                        break;
                    case "$$075":
                        textElement.setValue(bafdResult.getBeta4().toString());
                        break;
                    case "$$076":
                        textElement.setValue(bafdResult.getSh4().toString());
                        break;

                    case "$$077":
                        textElement.setValue(bafdResult.getBh5().toString());
                        break;
                    case "$$078":
                        textElement.setValue(bafdResult.getC5().toString());
                        break;
                    case "$$079":
                        textElement.setValue(bafdResult.getThk5e().toString());
                        break;
                    case "$$080":
                        textElement.setValue(bafdResult.getBh5l().toString());
                        break;
                    case "$$081":
                        textElement.setValue(bafdResult.getAlpha5().toString());
                        break;
                    case "$$082":
                        textElement.setValue(bafdResult.getBeta5().toString());
                        break;
                    case "$$083":
                        textElement.setValue(bafdResult.getSh5().toString());
                        break;

                    case "$$084":
                        textElement.setValue(bafdResult.getI0().toString());
                        break;

                    case "$$085":
                        textElement.setValue(bafdResult.getThk1c().toString());
                        break;
                    case "$$086":
                        textElement.setValue(bafdResult.getThk1d().toString());
                        break;
                    case "$$087":
                        textElement.setValue(bafdResult.getThk1chk());
                        break;
                    case "$$088":
                        textElement.setValue(bafdResult.getF1allow().toString());
                        break;
                    case "$$089":
                        textElement.setValue(bafdResult.getF1max().toString());
                        break;
                    case "$$090":
                        textElement.setValue(bafdResult.getF1chk());
                        break;

                    case "$$091":
                        textElement.setValue(bafdResult.getF1().toString());
                        break;
                    case "$$092":
                        textElement.setValue(bafdResult.getI1().toString());
                        break;

                    case "$$093":
                        textElement.setValue(bafdResult.getThk2c().toString());
                        break;
                    case "$$094":
                        textElement.setValue(bafdResult.getThk2d().toString());
                        break;
                    case "$$095":
                        textElement.setValue(bafdResult.getThk2chk());
                        break;
                    case "$$096":
                        textElement.setValue(bafdResult.getF2allow().toString());
                        break;
                    case "$$097":
                        textElement.setValue(bafdResult.getF2max().toString());
                        break;
                    case "$$098":
                        textElement.setValue(bafdResult.getF2chk());
                        break;

                    case "$$099":
                        textElement.setValue(bafdResult.getF2().toString());
                        break;
                    case "$$100":
                        textElement.setValue(bafdResult.getI2().toString());
                        break;

                    case "$$101":
                        textElement.setValue(bafdResult.getThk3c().toString());
                        break;
                    case "$$102":
                        textElement.setValue(bafdResult.getThk3d().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bafdResult.getThk3chk());
                        break;
                    case "$$104":
                        textElement.setValue(bafdResult.getF3allow().toString());
                        break;
                    case "$$105":
                        textElement.setValue(bafdResult.getF3max().toString());
                        break;
                    case "$$106":
                        textElement.setValue(bafdResult.getF3chk());
                        break;

                    case "$$107":
                        textElement.setValue(bafdResult.getF3().toString());
                        break;
                    case "$$108":
                        textElement.setValue(bafdResult.getI3().toString());
                        break;

                    case "$$109":
                        textElement.setValue(bafdResult.getThk4c().toString());
                        break;
                    case "$$110":
                        textElement.setValue(bafdResult.getThk4d().toString());
                        break;
                    case "$$111":
                        textElement.setValue(bafdResult.getThk4chk());
                        break;
                    case "$$112":
                        textElement.setValue(bafdResult.getF4allow().toString());
                        break;
                    case "$$113":
                        textElement.setValue(bafdResult.getF4max().toString());
                        break;
                    case "$$114":
                        textElement.setValue(bafdResult.getF4chk());
                        break;

                    case "$$115":
                        textElement.setValue(bafdResult.getF4().toString());
                        break;
                    case "$$116":
                        textElement.setValue(bafdResult.getI4().toString());
                        break;

                    case "$$117":
                        textElement.setValue(bafdResult.getThk5c().toString());
                        break;
                    case "$$118":
                        textElement.setValue(bafdResult.getThk5d().toString());
                        break;
                    case "$$119":
                        textElement.setValue(bafdResult.getThk5chk());
                        break;
                    case "$$120":
                        textElement.setValue(bafdResult.getF5allow().toString());
                        break;
                    case "$$121":
                        textElement.setValue(bafdResult.getF5max().toString());
                        break;
                    case "$$122":
                        textElement.setValue(bafdResult.getF5chk());
                        break;

                    case "$03":
                        textElement.setValue(bafdResult.getL().toString());
                        break;
                    case "$04":
                        textElement.setValue(bafdResult.getBh().toString());
                        break;
                    case "$49":
                        textElement.setValue(bafdResult.getBh1().toString());
                        break;
                    case "$56":
                        textElement.setValue(bafdResult.getBh2().toString());
                        break;
                    case "$63":
                        textElement.setValue(bafdResult.getBh3().toString());
                        break;
                    case "$70":
                        textElement.setValue(bafdResult.getBh4().toString());
                        break;
                    case "$77":
                        textElement.setValue(bafdResult.getBh5().toString());
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
     * baga
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bagaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGA(String baseFileName, BAGADocx bagaResult) {

        // 要使用的文件模板
        String template;

        if (bagaResult.getLg() < (363 * Math.pow(bagaResult.getDge(), 2.0 / 3.0))) {
            template = "D:/mechw/static/west/cal/b/a/g/a/BAGAN363.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/a/g/a/BAGAP363.docx";
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
                        textElement.setValue(bagaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bagaResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bagaResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bagaResult.getBh().toString());
                        break;

                    case "$$005":
                        textElement.setValue(bagaResult.getJstd());
                        break;
                    case "$$006":
                        textElement.setValue(bagaResult.getJname());
                        break;

                    case "$$007":
                        textElement.setValue(bagaResult.getGstd());
                        break;
                    case "$$008":
                        textElement.setValue(bagaResult.getGname());
                        break;
                    case "$$009":
                        textElement.setValue(bagaResult.getDgn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bagaResult.getLg().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bagaResult.getCg2().toString());
                        break;

                    case "$$012":
                        textElement.setValue(bagaResult.getStd1());
                        break;
                    case "$$013":
                        textElement.setValue(bagaResult.getName1());
                        break;
                    case "$$014":
                        textElement.setValue(bagaResult.getC12().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bagaResult.getThk1n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(bagaResult.getStd2());
                        break;
                    case "$$017":
                        textElement.setValue(bagaResult.getName2());
                        break;
                    case "$$018":
                        textElement.setValue(bagaResult.getC22().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bagaResult.getThk2n().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bagaResult.getD1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bagaResult.getC11().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bagaResult.getO1t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bagaResult.getE1t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(bagaResult.getDg().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bagaResult.getCg1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bagaResult.getOgt().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bagaResult.getEgt().toString());
                        break;

                    case "$$028":
                        textElement.setValue(bagaResult.getD2().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bagaResult.getC21().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bagaResult.getO2t().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bagaResult.getE2t().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bagaResult.getEjt().toString());
                        break;

                    case "$$033":
                        textElement.setValue(bagaResult.getG().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bagaResult.getPc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bagaResult.getBhlc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bagaResult.getAlpha().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bagaResult.getBeta().toString());
                        break;

                    case "$$038":
                        textElement.setValue(bagaResult.getCg().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bagaResult.getDge().toString());
                        break;

                    case "$$040":
                        textElement.setValue(bagaResult.getBh1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bagaResult.getC1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bagaResult.getThk1e().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bagaResult.getBh1lc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bagaResult.getAlpha1().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bagaResult.getBeta1().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bagaResult.getSh1().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bagaResult.getPc1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(bagaResult.getBh2().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bagaResult.getC2().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bagaResult.getThk2e().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bagaResult.getBh2lc().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bagaResult.getAlpha2().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bagaResult.getBeta2().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bagaResult.getSh2().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bagaResult.getPc2().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bagaResult.getOmax().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bagaResult.getOmaxchk());
                        break;
                    case "$$058":
                        textElement.setValue(bagaResult.getI0().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bagaResult.getLmax1().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bagaResult.getZp1().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bagaResult.getThk1c().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bagaResult.getThk1d().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bagaResult.getThk1chk());
                        break;
                    case "$$064":
                        textElement.setValue(bagaResult.getF1allow().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bagaResult.getF1max().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bagaResult.getF1chk());
                        break;
                    case "$$067":
                        textElement.setValue(bagaResult.getF1().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bagaResult.getI1().toString());
                        break;
                    case "$$069":
                        textElement.setValue(bagaResult.getLmax2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(bagaResult.getZp2().toString());
                        break;
                    case "$$071":
                        textElement.setValue(bagaResult.getThk2c().toString());
                        break;
                    case "$$072":
                        textElement.setValue(bagaResult.getThk2d().toString());
                        break;
                    case "$$073":
                        textElement.setValue(bagaResult.getThk2chk());
                        break;
                    case "$$074":
                        textElement.setValue(bagaResult.getF2allow().toString());
                        break;
                    case "$$075":
                        textElement.setValue(bagaResult.getF2max().toString());
                        break;
                    case "$$076":
                        textElement.setValue(bagaResult.getF2chk());
                        break;
                    case "$$077":
                        textElement.setValue(bagaResult.getLmax().toString());
                        break;
                    case "$$078":
                        textElement.setValue(bagaResult.getLcchk());
                        break;
                    case "$$079":
                        textElement.setValue(bagaResult.getZp().toString());
                        break;
                    case "$$300":
                        textElement.setValue(bagaResult.getDgc().toString());
                        break;
                    case "$$301":
                        textElement.setValue(bagaResult.getDgd().toString());
                        break;
                    case "$$302":
                        textElement.setValue(bagaResult.getDgchk());
                        break;
                    case "$04":
                        textElement.setValue(bagaResult.getBh().toString());
                        break;
                    case "$09":
                        textElement.setValue(bagaResult.getDgn().toString());
                        break;
                    case "$10":
                        textElement.setValue(bagaResult.getLg().toString());
                        break;
                    case "$40":
                        textElement.setValue(bagaResult.getBh1().toString());
                        break;
                    case "$48":
                        textElement.setValue(bagaResult.getBh2().toString());
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
     * bagb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bagbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGB(String baseFileName, BAGBDocx bagbResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/g/b/BAGB.docx";

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
                        textElement.setValue(bagbResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bagbResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bagbResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bagbResult.getBh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(bagbResult.getL().toString());
                        break;

                    case "$$006":
                        textElement.setValue(bagbResult.getJstd());
                        break;
                    case "$$007":
                        textElement.setValue(bagbResult.getJname());
                        break;

                    case "$$008":
                        textElement.setValue(bagbResult.getStd1());
                        break;
                    case "$$009":
                        textElement.setValue(bagbResult.getName1());
                        break;
                    case "$$010":
                        textElement.setValue(bagbResult.getC12().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bagbResult.getThk1n().toString());
                        break;

                    case "$$012":
                        textElement.setValue(bagbResult.getStd2());
                        break;
                    case "$$013":
                        textElement.setValue(bagbResult.getName2());
                        break;
                    case "$$014":
                        textElement.setValue(bagbResult.getC22().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bagbResult.getThk2n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(bagbResult.getD1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bagbResult.getC11().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bagbResult.getO1t().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bagbResult.getE1t().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bagbResult.getD2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bagbResult.getC21().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bagbResult.getO2t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bagbResult.getE2t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(bagbResult.getEjt().toString());
                        break;

                    case "$$025":
                        textElement.setValue(bagbResult.getG().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bagbResult.getPc().toString());
                        break;

                    case "$$027":
                        textElement.setValue(bagbResult.getBhlc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bagbResult.getAlpha().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bagbResult.getBeta().toString());
                        break;

                    case "$$030":
                        textElement.setValue(bagbResult.getBh1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bagbResult.getC1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bagbResult.getThk1e().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bagbResult.getBh1lc().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bagbResult.getAlpha1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bagbResult.getBeta1().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bagbResult.getSh1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bagbResult.getPc1().toString());
                        break;

                    case "$$038":
                        textElement.setValue(bagbResult.getBh2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bagbResult.getC2().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bagbResult.getThk2e().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bagbResult.getBh2lc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bagbResult.getAlpha2().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bagbResult.getBeta2().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bagbResult.getSh2().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bagbResult.getPc2().toString());
                        break;

                    case "$$046":
                        textElement.setValue(bagbResult.getI0().toString());
                        break;

                    case "$$047":
                        textElement.setValue(bagbResult.getLmax1().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bagbResult.getZp1().toString());
                        break;

                    case "$$049":
                        textElement.setValue(bagbResult.getThk1c().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bagbResult.getThk1d().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bagbResult.getThk1chk());
                        break;
                    case "$$052":
                        textElement.setValue(bagbResult.getF1allow().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bagbResult.getF1max().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bagbResult.getF1chk());
                        break;

                    case "$$055":
                        textElement.setValue(bagbResult.getF1().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bagbResult.getI1().toString());
                        break;

                    case "$$057":
                        textElement.setValue(bagbResult.getLmax2().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bagbResult.getZp2().toString());
                        break;

                    case "$$059":
                        textElement.setValue(bagbResult.getThk2c().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bagbResult.getThk2d().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bagbResult.getThk2chk());
                        break;
                    case "$$062":
                        textElement.setValue(bagbResult.getF2allow().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bagbResult.getF2max().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bagbResult.getF2chk());
                        break;

                    case "$$065":
                        textElement.setValue(bagbResult.getLmax().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bagbResult.getLcchk());
                        break;
                    case "$$067":
                        textElement.setValue(bagbResult.getZp().toString());
                        break;

                    case "$04":
                        textElement.setValue(bagbResult.getBh().toString());
                        break;
                    case "$05":
                        textElement.setValue(bagbResult.getL().toString());
                        break;
                    case "$30":
                        textElement.setValue(bagbResult.getBh1().toString());
                        break;
                    case "$38":
                        textElement.setValue(bagbResult.getBh2().toString());
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
     * bagc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bagcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGC(String baseFileName, BAGCDocx bagcResult) {

        // 要使用的文件模板
        String template;

        if (bagcResult.getLg() < (363 * Math.pow(bagcResult.getDge(), 2.0 / 3.0))) {
            template = "D:/mechw/static/west/cal/b/a/g/c/BAGCN363.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/a/g/c/BAGCP363.docx";
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
                        textElement.setValue(bagcResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bagcResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bagcResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bagcResult.getBh().toString());
                        break;

                    case "$$005":
                        textElement.setValue(bagcResult.getJstd());
                        break;
                    case "$$006":
                        textElement.setValue(bagcResult.getJname());
                        break;

                    case "$$007":
                        textElement.setValue(bagcResult.getGstd());
                        break;
                    case "$$008":
                        textElement.setValue(bagcResult.getGname());
                        break;
                    case "$$009":
                        textElement.setValue(bagcResult.getDgn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bagcResult.getLg().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bagcResult.getCg2().toString());
                        break;

                    case "$$012":
                        textElement.setValue(bagcResult.getStd1());
                        break;
                    case "$$013":
                        textElement.setValue(bagcResult.getName1());
                        break;
                    case "$$014":
                        textElement.setValue(bagcResult.getC12().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bagcResult.getThk1n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(bagcResult.getStd2());
                        break;
                    case "$$017":
                        textElement.setValue(bagcResult.getName2());
                        break;
                    case "$$018":
                        textElement.setValue(bagcResult.getC22().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bagcResult.getThk2n().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bagcResult.getD1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bagcResult.getC11().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bagcResult.getO1t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bagcResult.getE1t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(bagcResult.getDg().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bagcResult.getCg1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bagcResult.getOgt().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bagcResult.getEgt().toString());
                        break;

                    case "$$028":
                        textElement.setValue(bagcResult.getD2().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bagcResult.getC21().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bagcResult.getO2t().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bagcResult.getE2t().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bagcResult.getEjt().toString());
                        break;

                    case "$$033":
                        textElement.setValue(bagcResult.getG().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bagcResult.getPc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bagcResult.getBhlc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bagcResult.getAlpha().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bagcResult.getBeta().toString());
                        break;

                    case "$$038":
                        textElement.setValue(bagcResult.getCg().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bagcResult.getDge().toString());
                        break;

                    case "$$040":
                        textElement.setValue(bagcResult.getBh1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bagcResult.getC1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bagcResult.getThk1e().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bagcResult.getBh1lc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bagcResult.getAlpha1().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bagcResult.getBeta1().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bagcResult.getSh1().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bagcResult.getPc1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(bagcResult.getBh2().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bagcResult.getC2().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bagcResult.getThk2e().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bagcResult.getBh2lc().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bagcResult.getAlpha2().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bagcResult.getBeta2().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bagcResult.getSh2().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bagcResult.getPc2().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bagcResult.getOmax().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bagcResult.getOmaxchk());
                        break;
                    case "$$058":
                        textElement.setValue(bagcResult.getI0().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bagcResult.getLmax1().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bagcResult.getZp1().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bagcResult.getThk1c().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bagcResult.getThk1d().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bagcResult.getThk1chk());
                        break;
                    case "$$064":
                        textElement.setValue(bagcResult.getF1allow().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bagcResult.getF1max().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bagcResult.getF1chk());
                        break;
                    case "$$067":
                        textElement.setValue(bagcResult.getF1().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bagcResult.getI1().toString());
                        break;
                    case "$$069":
                        textElement.setValue(bagcResult.getLmax2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(bagcResult.getZp2().toString());
                        break;
                    case "$$071":
                        textElement.setValue(bagcResult.getThk2c().toString());
                        break;
                    case "$$072":
                        textElement.setValue(bagcResult.getThk2d().toString());
                        break;
                    case "$$073":
                        textElement.setValue(bagcResult.getThk2chk());
                        break;
                    case "$$074":
                        textElement.setValue(bagcResult.getF2allow().toString());
                        break;
                    case "$$075":
                        textElement.setValue(bagcResult.getF2max().toString());
                        break;
                    case "$$076":
                        textElement.setValue(bagcResult.getF2chk());
                        break;
                    case "$$077":
                        textElement.setValue(bagcResult.getLmax().toString());
                        break;
                    case "$$078":
                        textElement.setValue(bagcResult.getLcchk());
                        break;
                    case "$$079":
                        textElement.setValue(bagcResult.getZp().toString());
                        break;
                    case "$$300":
                        textElement.setValue(bagcResult.getDgc().toString());
                        break;
                    case "$$301":
                        textElement.setValue(bagcResult.getDgd().toString());
                        break;
                    case "$$302":
                        textElement.setValue(bagcResult.getDgchk());
                        break;

                    case "$$100":
                        textElement.setValue(bagcResult.getStd3());
                        break;
                    case "$$101":
                        textElement.setValue(bagcResult.getName3());
                        break;
                    case "$$102":
                        textElement.setValue(bagcResult.getC32().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bagcResult.getThk3n().toString());
                        break;
                    case "$$104":
                        textElement.setValue(bagcResult.getD3().toString());
                        break;
                    case "$$105":
                        textElement.setValue(bagcResult.getC31().toString());
                        break;
                    case "$$106":
                        textElement.setValue(bagcResult.getO3t().toString());
                        break;
                    case "$$107":
                        textElement.setValue(bagcResult.getE3t().toString());
                        break;
                    case "$$108":
                        textElement.setValue(bagcResult.getBh3().toString());
                        break;
                    case "$$109":
                        textElement.setValue(bagcResult.getC3().toString());
                        break;
                    case "$$110":
                        textElement.setValue(bagcResult.getThk3e().toString());
                        break;
                    case "$$111":
                        textElement.setValue(bagcResult.getBh3lc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(bagcResult.getAlpha3().toString());
                        break;
                    case "$$113":
                        textElement.setValue(bagcResult.getBeta3().toString());
                        break;
                    case "$$114":
                        textElement.setValue(bagcResult.getSh3().toString());
                        break;
                    case "$$115":
                        textElement.setValue(bagcResult.getPc3().toString());
                        break;
                    case "$$116":
                        textElement.setValue(bagcResult.getF2().toString());
                        break;
                    case "$$117":
                        textElement.setValue(bagcResult.getI2().toString());
                        break;
                    case "$$118":
                        textElement.setValue(bagcResult.getLmax3().toString());
                        break;
                    case "$$119":
                        textElement.setValue(bagcResult.getZp3().toString());
                        break;
                    case "$$120":
                        textElement.setValue(bagcResult.getThk3c().toString());
                        break;
                    case "$$121":
                        textElement.setValue(bagcResult.getThk3d().toString());
                        break;
                    case "$$122":
                        textElement.setValue(bagcResult.getThk3chk());
                        break;
                    case "$$123":
                        textElement.setValue(bagcResult.getF3allow().toString());
                        break;
                    case "$$124":
                        textElement.setValue(bagcResult.getF3max().toString());
                        break;
                    case "$$125":
                        textElement.setValue(bagcResult.getF3chk());
                        break;

                    case "$04":
                        textElement.setValue(bagcResult.getBh().toString());
                        break;
                    case "$09":
                        textElement.setValue(bagcResult.getDgn().toString());
                        break;
                    case "$10":
                        textElement.setValue(bagcResult.getLg().toString());
                        break;
                    case "$40":
                        textElement.setValue(bagcResult.getBh1().toString());
                        break;
                    case "$48":
                        textElement.setValue(bagcResult.getBh2().toString());
                        break;
                    case "$108":
                        textElement.setValue(bagcResult.getBh3().toString());
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
     * bagd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bagdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGD(String baseFileName, BAGDDocx bagdResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/g/d/BAGD.docx";

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
                        textElement.setValue(bagdResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bagdResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bagdResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bagdResult.getBh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(bagdResult.getL().toString());
                        break;

                    case "$$006":
                        textElement.setValue(bagdResult.getJstd());
                        break;
                    case "$$007":
                        textElement.setValue(bagdResult.getJname());
                        break;

                    case "$$008":
                        textElement.setValue(bagdResult.getStd1());
                        break;
                    case "$$009":
                        textElement.setValue(bagdResult.getName1());
                        break;
                    case "$$010":
                        textElement.setValue(bagdResult.getC12().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bagdResult.getThk1n().toString());
                        break;

                    case "$$012":
                        textElement.setValue(bagdResult.getStd2());
                        break;
                    case "$$013":
                        textElement.setValue(bagdResult.getName2());
                        break;
                    case "$$014":
                        textElement.setValue(bagdResult.getC22().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bagdResult.getThk2n().toString());
                        break;

                    case "$$100":
                        textElement.setValue(bagdResult.getStd3());
                        break;
                    case "$$101":
                        textElement.setValue(bagdResult.getName3());
                        break;
                    case "$$102":
                        textElement.setValue(bagdResult.getC32().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bagdResult.getThk3n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(bagdResult.getD1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bagdResult.getC11().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bagdResult.getO1t().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bagdResult.getE1t().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bagdResult.getD2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bagdResult.getC21().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bagdResult.getO2t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bagdResult.getE2t().toString());
                        break;

                    case "$$104":
                        textElement.setValue(bagdResult.getD3().toString());
                        break;
                    case "$$105":
                        textElement.setValue(bagdResult.getC31().toString());
                        break;
                    case "$$106":
                        textElement.setValue(bagdResult.getO3t().toString());
                        break;
                    case "$$107":
                        textElement.setValue(bagdResult.getE3t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(bagdResult.getEjt().toString());
                        break;

                    case "$$025":
                        textElement.setValue(bagdResult.getG().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bagdResult.getPc().toString());
                        break;

                    case "$$027":
                        textElement.setValue(bagdResult.getBhlc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bagdResult.getAlpha().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bagdResult.getBeta().toString());
                        break;

                    case "$$030":
                        textElement.setValue(bagdResult.getBh1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bagdResult.getC1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bagdResult.getThk1e().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bagdResult.getBh1lc().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bagdResult.getAlpha1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bagdResult.getBeta1().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bagdResult.getSh1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bagdResult.getPc1().toString());
                        break;

                    case "$$038":
                        textElement.setValue(bagdResult.getBh2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bagdResult.getC2().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bagdResult.getThk2e().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bagdResult.getBh2lc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bagdResult.getAlpha2().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bagdResult.getBeta2().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bagdResult.getSh2().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bagdResult.getPc2().toString());
                        break;

                    case "$$108":
                        textElement.setValue(bagdResult.getBh3().toString());
                        break;
                    case "$$109":
                        textElement.setValue(bagdResult.getC3().toString());
                        break;
                    case "$$110":
                        textElement.setValue(bagdResult.getThk3e().toString());
                        break;
                    case "$$111":
                        textElement.setValue(bagdResult.getBh3lc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(bagdResult.getAlpha3().toString());
                        break;
                    case "$$113":
                        textElement.setValue(bagdResult.getBeta3().toString());
                        break;
                    case "$$114":
                        textElement.setValue(bagdResult.getSh3().toString());
                        break;
                    case "$$115":
                        textElement.setValue(bagdResult.getPc3().toString());
                        break;

                    case "$$046":
                        textElement.setValue(bagdResult.getI0().toString());
                        break;

                    case "$$047":
                        textElement.setValue(bagdResult.getLmax1().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bagdResult.getZp1().toString());
                        break;

                    case "$$049":
                        textElement.setValue(bagdResult.getThk1c().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bagdResult.getThk1d().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bagdResult.getThk1chk());
                        break;
                    case "$$052":
                        textElement.setValue(bagdResult.getF1allow().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bagdResult.getF1max().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bagdResult.getF1chk());
                        break;

                    case "$$055":
                        textElement.setValue(bagdResult.getF1().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bagdResult.getI1().toString());
                        break;

                    case "$$057":
                        textElement.setValue(bagdResult.getLmax2().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bagdResult.getZp2().toString());
                        break;

                    case "$$059":
                        textElement.setValue(bagdResult.getThk2c().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bagdResult.getThk2d().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bagdResult.getThk2chk());
                        break;
                    case "$$062":
                        textElement.setValue(bagdResult.getF2allow().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bagdResult.getF2max().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bagdResult.getF2chk());
                        break;

                    case "$$116":
                        textElement.setValue(bagdResult.getF2().toString());
                        break;
                    case "$$117":
                        textElement.setValue(bagdResult.getI2().toString());
                        break;

                    case "$$118":
                        textElement.setValue(bagdResult.getLmax3().toString());
                        break;
                    case "$$119":
                        textElement.setValue(bagdResult.getZp3().toString());
                        break;

                    case "$$120":
                        textElement.setValue(bagdResult.getThk3c().toString());
                        break;
                    case "$$121":
                        textElement.setValue(bagdResult.getThk3d().toString());
                        break;
                    case "$$122":
                        textElement.setValue(bagdResult.getThk3chk());
                        break;
                    case "$$123":
                        textElement.setValue(bagdResult.getF3allow().toString());
                        break;
                    case "$$124":
                        textElement.setValue(bagdResult.getF3max().toString());
                        break;
                    case "$$125":
                        textElement.setValue(bagdResult.getF3chk());
                        break;

                    case "$$065":
                        textElement.setValue(bagdResult.getLmax().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bagdResult.getLcchk());
                        break;
                    case "$$067":
                        textElement.setValue(bagdResult.getZp().toString());
                        break;

                    case "$04":
                        textElement.setValue(bagdResult.getBh().toString());
                        break;
                    case "$05":
                        textElement.setValue(bagdResult.getL().toString());
                        break;
                    case "$30":
                        textElement.setValue(bagdResult.getBh1().toString());
                        break;
                    case "$38":
                        textElement.setValue(bagdResult.getBh2().toString());
                        break;
                    case "$108":
                        textElement.setValue(bagdResult.getBh3().toString());
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
     * bage
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bageResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGE(String baseFileName, BAGEDocx bageResult) {

        // 要使用的文件模板
        String template;

        if (bageResult.getLg() < (363 * Math.pow(bageResult.getDge(), 2.0 / 3.0))) {
            template = "D:/mechw/static/west/cal/b/a/g/e/BAGEN363.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/a/g/e/BAGEP363.docx";
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
                        textElement.setValue(bageResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bageResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bageResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bageResult.getBh().toString());
                        break;

                    case "$$005":
                        textElement.setValue(bageResult.getJstd());
                        break;
                    case "$$006":
                        textElement.setValue(bageResult.getJname());
                        break;

                    case "$$007":
                        textElement.setValue(bageResult.getGstd());
                        break;
                    case "$$008":
                        textElement.setValue(bageResult.getGname());
                        break;
                    case "$$009":
                        textElement.setValue(bageResult.getDgn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bageResult.getLg().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bageResult.getCg2().toString());
                        break;

                    case "$$012":
                        textElement.setValue(bageResult.getStd1());
                        break;
                    case "$$013":
                        textElement.setValue(bageResult.getName1());
                        break;
                    case "$$014":
                        textElement.setValue(bageResult.getC12().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bageResult.getThk1n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(bageResult.getStd2());
                        break;
                    case "$$017":
                        textElement.setValue(bageResult.getName2());
                        break;
                    case "$$018":
                        textElement.setValue(bageResult.getC22().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bageResult.getThk2n().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bageResult.getD1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bageResult.getC11().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bageResult.getO1t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bageResult.getE1t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(bageResult.getDg().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bageResult.getCg1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bageResult.getOgt().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bageResult.getEgt().toString());
                        break;

                    case "$$028":
                        textElement.setValue(bageResult.getD2().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bageResult.getC21().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bageResult.getO2t().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bageResult.getE2t().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bageResult.getEjt().toString());
                        break;

                    case "$$033":
                        textElement.setValue(bageResult.getG().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bageResult.getPc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bageResult.getBhlc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bageResult.getAlpha().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bageResult.getBeta().toString());
                        break;

                    case "$$038":
                        textElement.setValue(bageResult.getCg().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bageResult.getDge().toString());
                        break;

                    case "$$040":
                        textElement.setValue(bageResult.getBh1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bageResult.getC1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bageResult.getThk1e().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bageResult.getBh1lc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bageResult.getAlpha1().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bageResult.getBeta1().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bageResult.getSh1().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bageResult.getPc1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(bageResult.getBh2().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bageResult.getC2().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bageResult.getThk2e().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bageResult.getBh2lc().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bageResult.getAlpha2().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bageResult.getBeta2().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bageResult.getSh2().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bageResult.getPc2().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bageResult.getOmax().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bageResult.getOmaxchk());
                        break;
                    case "$$058":
                        textElement.setValue(bageResult.getI0().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bageResult.getLmax1().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bageResult.getZp1().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bageResult.getThk1c().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bageResult.getThk1d().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bageResult.getThk1chk());
                        break;
                    case "$$064":
                        textElement.setValue(bageResult.getF1allow().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bageResult.getF1max().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bageResult.getF1chk());
                        break;
                    case "$$067":
                        textElement.setValue(bageResult.getF1().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bageResult.getI1().toString());
                        break;
                    case "$$069":
                        textElement.setValue(bageResult.getLmax2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(bageResult.getZp2().toString());
                        break;
                    case "$$071":
                        textElement.setValue(bageResult.getThk2c().toString());
                        break;
                    case "$$072":
                        textElement.setValue(bageResult.getThk2d().toString());
                        break;
                    case "$$073":
                        textElement.setValue(bageResult.getThk2chk());
                        break;
                    case "$$074":
                        textElement.setValue(bageResult.getF2allow().toString());
                        break;
                    case "$$075":
                        textElement.setValue(bageResult.getF2max().toString());
                        break;
                    case "$$076":
                        textElement.setValue(bageResult.getF2chk());
                        break;
                    case "$$077":
                        textElement.setValue(bageResult.getLmax().toString());
                        break;
                    case "$$078":
                        textElement.setValue(bageResult.getLcchk());
                        break;
                    case "$$079":
                        textElement.setValue(bageResult.getZp().toString());
                        break;
                    case "$$300":
                        textElement.setValue(bageResult.getDgc().toString());
                        break;
                    case "$$301":
                        textElement.setValue(bageResult.getDgd().toString());
                        break;
                    case "$$302":
                        textElement.setValue(bageResult.getDgchk());
                        break;

                    case "$$100":
                        textElement.setValue(bageResult.getStd3());
                        break;
                    case "$$101":
                        textElement.setValue(bageResult.getName3());
                        break;
                    case "$$102":
                        textElement.setValue(bageResult.getC32().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bageResult.getThk3n().toString());
                        break;
                    case "$$104":
                        textElement.setValue(bageResult.getD3().toString());
                        break;
                    case "$$105":
                        textElement.setValue(bageResult.getC31().toString());
                        break;
                    case "$$106":
                        textElement.setValue(bageResult.getO3t().toString());
                        break;
                    case "$$107":
                        textElement.setValue(bageResult.getE3t().toString());
                        break;
                    case "$$108":
                        textElement.setValue(bageResult.getBh3().toString());
                        break;
                    case "$$109":
                        textElement.setValue(bageResult.getC3().toString());
                        break;
                    case "$$110":
                        textElement.setValue(bageResult.getThk3e().toString());
                        break;
                    case "$$111":
                        textElement.setValue(bageResult.getBh3lc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(bageResult.getAlpha3().toString());
                        break;
                    case "$$113":
                        textElement.setValue(bageResult.getBeta3().toString());
                        break;
                    case "$$114":
                        textElement.setValue(bageResult.getSh3().toString());
                        break;
                    case "$$115":
                        textElement.setValue(bageResult.getPc3().toString());
                        break;
                    case "$$116":
                        textElement.setValue(bageResult.getF2().toString());
                        break;
                    case "$$117":
                        textElement.setValue(bageResult.getI2().toString());
                        break;
                    case "$$118":
                        textElement.setValue(bageResult.getLmax3().toString());
                        break;
                    case "$$119":
                        textElement.setValue(bageResult.getZp3().toString());
                        break;
                    case "$$120":
                        textElement.setValue(bageResult.getThk3c().toString());
                        break;
                    case "$$121":
                        textElement.setValue(bageResult.getThk3d().toString());
                        break;
                    case "$$122":
                        textElement.setValue(bageResult.getThk3chk());
                        break;
                    case "$$123":
                        textElement.setValue(bageResult.getF3allow().toString());
                        break;
                    case "$$124":
                        textElement.setValue(bageResult.getF3max().toString());
                        break;
                    case "$$125":
                        textElement.setValue(bageResult.getF3chk());
                        break;

                    case "$$200":
                        textElement.setValue(bageResult.getStd4());
                        break;
                    case "$$201":
                        textElement.setValue(bageResult.getName4());
                        break;
                    case "$$202":
                        textElement.setValue(bageResult.getC42().toString());
                        break;
                    case "$$203":
                        textElement.setValue(bageResult.getThk4n().toString());
                        break;
                    case "$$204":
                        textElement.setValue(bageResult.getD4().toString());
                        break;
                    case "$$205":
                        textElement.setValue(bageResult.getC41().toString());
                        break;
                    case "$$206":
                        textElement.setValue(bageResult.getO4t().toString());
                        break;
                    case "$$207":
                        textElement.setValue(bageResult.getE4t().toString());
                        break;
                    case "$$208":
                        textElement.setValue(bageResult.getBh4().toString());
                        break;
                    case "$$209":
                        textElement.setValue(bageResult.getC4().toString());
                        break;
                    case "$$210":
                        textElement.setValue(bageResult.getThk4e().toString());
                        break;
                    case "$$211":
                        textElement.setValue(bageResult.getBh4lc().toString());
                        break;
                    case "$$212":
                        textElement.setValue(bageResult.getAlpha4().toString());
                        break;
                    case "$$213":
                        textElement.setValue(bageResult.getBeta4().toString());
                        break;
                    case "$$214":
                        textElement.setValue(bageResult.getSh4().toString());
                        break;
                    case "$$215":
                        textElement.setValue(bageResult.getPc4().toString());
                        break;
                    case "$$216":
                        textElement.setValue(bageResult.getF3().toString());
                        break;
                    case "$$217":
                        textElement.setValue(bageResult.getI3().toString());
                        break;
                    case "$$218":
                        textElement.setValue(bageResult.getLmax4().toString());
                        break;
                    case "$$219":
                        textElement.setValue(bageResult.getZp4().toString());
                        break;
                    case "$$220":
                        textElement.setValue(bageResult.getThk4c().toString());
                        break;
                    case "$$221":
                        textElement.setValue(bageResult.getThk4d().toString());
                        break;
                    case "$$222":
                        textElement.setValue(bageResult.getThk4chk());
                        break;
                    case "$$223":
                        textElement.setValue(bageResult.getF4allow().toString());
                        break;
                    case "$$224":
                        textElement.setValue(bageResult.getF4max().toString());
                        break;
                    case "$$225":
                        textElement.setValue(bageResult.getF4chk());
                        break;

                    case "$04":
                        textElement.setValue(bageResult.getBh().toString());
                        break;
                    case "$09":
                        textElement.setValue(bageResult.getDgn().toString());
                        break;
                    case "$10":
                        textElement.setValue(bageResult.getLg().toString());
                        break;
                    case "$40":
                        textElement.setValue(bageResult.getBh1().toString());
                        break;
                    case "$48":
                        textElement.setValue(bageResult.getBh2().toString());
                        break;
                    case "$108":
                        textElement.setValue(bageResult.getBh3().toString());
                        break;
                    case "$208":
                        textElement.setValue(bageResult.getBh4().toString());
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
     * bagf
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bagfResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGF(String baseFileName, BAGFDocx bagfResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/g/f/BAGF.docx";

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
                        textElement.setValue(bagfResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bagfResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bagfResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bagfResult.getBh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(bagfResult.getL().toString());
                        break;

                    case "$$006":
                        textElement.setValue(bagfResult.getJstd());
                        break;
                    case "$$007":
                        textElement.setValue(bagfResult.getJname());
                        break;

                    case "$$008":
                        textElement.setValue(bagfResult.getStd1());
                        break;
                    case "$$009":
                        textElement.setValue(bagfResult.getName1());
                        break;
                    case "$$010":
                        textElement.setValue(bagfResult.getC12().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bagfResult.getThk1n().toString());
                        break;

                    case "$$012":
                        textElement.setValue(bagfResult.getStd2());
                        break;
                    case "$$013":
                        textElement.setValue(bagfResult.getName2());
                        break;
                    case "$$014":
                        textElement.setValue(bagfResult.getC22().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bagfResult.getThk2n().toString());
                        break;

                    case "$$100":
                        textElement.setValue(bagfResult.getStd3());
                        break;
                    case "$$101":
                        textElement.setValue(bagfResult.getName3());
                        break;
                    case "$$102":
                        textElement.setValue(bagfResult.getC32().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bagfResult.getThk3n().toString());
                        break;

                    case "$$200":
                        textElement.setValue(bagfResult.getStd4());
                        break;
                    case "$$201":
                        textElement.setValue(bagfResult.getName4());
                        break;
                    case "$$202":
                        textElement.setValue(bagfResult.getC42().toString());
                        break;
                    case "$$203":
                        textElement.setValue(bagfResult.getThk4n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(bagfResult.getD1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bagfResult.getC11().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bagfResult.getO1t().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bagfResult.getE1t().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bagfResult.getD2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bagfResult.getC21().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bagfResult.getO2t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bagfResult.getE2t().toString());
                        break;

                    case "$$104":
                        textElement.setValue(bagfResult.getD3().toString());
                        break;
                    case "$$105":
                        textElement.setValue(bagfResult.getC31().toString());
                        break;
                    case "$$106":
                        textElement.setValue(bagfResult.getO3t().toString());
                        break;
                    case "$$107":
                        textElement.setValue(bagfResult.getE3t().toString());
                        break;

                    case "$$204":
                        textElement.setValue(bagfResult.getD4().toString());
                        break;
                    case "$$205":
                        textElement.setValue(bagfResult.getC41().toString());
                        break;
                    case "$$206":
                        textElement.setValue(bagfResult.getO4t().toString());
                        break;
                    case "$$207":
                        textElement.setValue(bagfResult.getE4t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(bagfResult.getEjt().toString());
                        break;

                    case "$$025":
                        textElement.setValue(bagfResult.getG().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bagfResult.getPc().toString());
                        break;

                    case "$$027":
                        textElement.setValue(bagfResult.getBhlc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bagfResult.getAlpha().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bagfResult.getBeta().toString());
                        break;

                    case "$$030":
                        textElement.setValue(bagfResult.getBh1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bagfResult.getC1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bagfResult.getThk1e().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bagfResult.getBh1lc().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bagfResult.getAlpha1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bagfResult.getBeta1().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bagfResult.getSh1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bagfResult.getPc1().toString());
                        break;

                    case "$$038":
                        textElement.setValue(bagfResult.getBh2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bagfResult.getC2().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bagfResult.getThk2e().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bagfResult.getBh2lc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bagfResult.getAlpha2().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bagfResult.getBeta2().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bagfResult.getSh2().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bagfResult.getPc2().toString());
                        break;

                    case "$$108":
                        textElement.setValue(bagfResult.getBh3().toString());
                        break;
                    case "$$109":
                        textElement.setValue(bagfResult.getC3().toString());
                        break;
                    case "$$110":
                        textElement.setValue(bagfResult.getThk3e().toString());
                        break;
                    case "$$111":
                        textElement.setValue(bagfResult.getBh3lc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(bagfResult.getAlpha3().toString());
                        break;
                    case "$$113":
                        textElement.setValue(bagfResult.getBeta3().toString());
                        break;
                    case "$$114":
                        textElement.setValue(bagfResult.getSh3().toString());
                        break;
                    case "$$115":
                        textElement.setValue(bagfResult.getPc3().toString());
                        break;

                    case "$$208":
                        textElement.setValue(bagfResult.getBh4().toString());
                        break;
                    case "$$209":
                        textElement.setValue(bagfResult.getC4().toString());
                        break;
                    case "$$210":
                        textElement.setValue(bagfResult.getThk4e().toString());
                        break;
                    case "$$211":
                        textElement.setValue(bagfResult.getBh4lc().toString());
                        break;
                    case "$$212":
                        textElement.setValue(bagfResult.getAlpha4().toString());
                        break;
                    case "$$213":
                        textElement.setValue(bagfResult.getBeta4().toString());
                        break;
                    case "$$214":
                        textElement.setValue(bagfResult.getSh4().toString());
                        break;
                    case "$$215":
                        textElement.setValue(bagfResult.getPc4().toString());
                        break;

                    case "$$046":
                        textElement.setValue(bagfResult.getI0().toString());
                        break;

                    case "$$047":
                        textElement.setValue(bagfResult.getLmax1().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bagfResult.getZp1().toString());
                        break;

                    case "$$049":
                        textElement.setValue(bagfResult.getThk1c().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bagfResult.getThk1d().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bagfResult.getThk1chk());
                        break;
                    case "$$052":
                        textElement.setValue(bagfResult.getF1allow().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bagfResult.getF1max().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bagfResult.getF1chk());
                        break;

                    case "$$055":
                        textElement.setValue(bagfResult.getF1().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bagfResult.getI1().toString());
                        break;

                    case "$$057":
                        textElement.setValue(bagfResult.getLmax2().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bagfResult.getZp2().toString());
                        break;

                    case "$$059":
                        textElement.setValue(bagfResult.getThk2c().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bagfResult.getThk2d().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bagfResult.getThk2chk());
                        break;
                    case "$$062":
                        textElement.setValue(bagfResult.getF2allow().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bagfResult.getF2max().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bagfResult.getF2chk());
                        break;

                    case "$$116":
                        textElement.setValue(bagfResult.getF2().toString());
                        break;
                    case "$$117":
                        textElement.setValue(bagfResult.getI2().toString());
                        break;

                    case "$$118":
                        textElement.setValue(bagfResult.getLmax3().toString());
                        break;
                    case "$$119":
                        textElement.setValue(bagfResult.getZp3().toString());
                        break;

                    case "$$120":
                        textElement.setValue(bagfResult.getThk3c().toString());
                        break;
                    case "$$121":
                        textElement.setValue(bagfResult.getThk3d().toString());
                        break;
                    case "$$122":
                        textElement.setValue(bagfResult.getThk3chk());
                        break;
                    case "$$123":
                        textElement.setValue(bagfResult.getF3allow().toString());
                        break;
                    case "$$124":
                        textElement.setValue(bagfResult.getF3max().toString());
                        break;
                    case "$$125":
                        textElement.setValue(bagfResult.getF3chk());
                        break;

                    case "$$216":
                        textElement.setValue(bagfResult.getF3().toString());
                        break;
                    case "$$217":
                        textElement.setValue(bagfResult.getI3().toString());
                        break;

                    case "$$218":
                        textElement.setValue(bagfResult.getLmax4().toString());
                        break;
                    case "$$219":
                        textElement.setValue(bagfResult.getZp4().toString());
                        break;

                    case "$$220":
                        textElement.setValue(bagfResult.getThk4c().toString());
                        break;
                    case "$$221":
                        textElement.setValue(bagfResult.getThk4d().toString());
                        break;
                    case "$$222":
                        textElement.setValue(bagfResult.getThk4chk());
                        break;
                    case "$$223":
                        textElement.setValue(bagfResult.getF4allow().toString());
                        break;
                    case "$$224":
                        textElement.setValue(bagfResult.getF4max().toString());
                        break;
                    case "$$225":
                        textElement.setValue(bagfResult.getF4chk());
                        break;

                    case "$$065":
                        textElement.setValue(bagfResult.getLmax().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bagfResult.getLcchk());
                        break;
                    case "$$067":
                        textElement.setValue(bagfResult.getZp().toString());
                        break;

                    case "$04":
                        textElement.setValue(bagfResult.getBh().toString());
                        break;
                    case "$05":
                        textElement.setValue(bagfResult.getL().toString());
                        break;
                    case "$30":
                        textElement.setValue(bagfResult.getBh1().toString());
                        break;
                    case "$38":
                        textElement.setValue(bagfResult.getBh2().toString());
                        break;
                    case "$108":
                        textElement.setValue(bagfResult.getBh3().toString());
                        break;
                    case "$208":
                        textElement.setValue(bagfResult.getBh4().toString());
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
     * bagg
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baggResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGG(String baseFileName, BAGGDocx baggResult) {

        // 要使用的文件模板
        String template;

        if (baggResult.getLg() < (363 * Math.pow(baggResult.getDge(), 2.0 / 3.0))) {
            template = "D:/mechw/static/west/cal/b/a/g/g/BAGGN363.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/a/g/g/BAGGP363.docx";
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
                        textElement.setValue(baggResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baggResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(baggResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(baggResult.getBh().toString());
                        break;

                    case "$$005":
                        textElement.setValue(baggResult.getJstd());
                        break;
                    case "$$006":
                        textElement.setValue(baggResult.getJname());
                        break;

                    case "$$007":
                        textElement.setValue(baggResult.getGstd());
                        break;
                    case "$$008":
                        textElement.setValue(baggResult.getGname());
                        break;
                    case "$$009":
                        textElement.setValue(baggResult.getDgn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(baggResult.getLg().toString());
                        break;
                    case "$$011":
                        textElement.setValue(baggResult.getCg2().toString());
                        break;

                    case "$$012":
                        textElement.setValue(baggResult.getStd1());
                        break;
                    case "$$013":
                        textElement.setValue(baggResult.getName1());
                        break;
                    case "$$014":
                        textElement.setValue(baggResult.getC12().toString());
                        break;
                    case "$$015":
                        textElement.setValue(baggResult.getThk1n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(baggResult.getStd2());
                        break;
                    case "$$017":
                        textElement.setValue(baggResult.getName2());
                        break;
                    case "$$018":
                        textElement.setValue(baggResult.getC22().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baggResult.getThk2n().toString());
                        break;

                    case "$$020":
                        textElement.setValue(baggResult.getD1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(baggResult.getC11().toString());
                        break;
                    case "$$022":
                        textElement.setValue(baggResult.getO1t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(baggResult.getE1t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(baggResult.getDg().toString());
                        break;
                    case "$$025":
                        textElement.setValue(baggResult.getCg1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(baggResult.getOgt().toString());
                        break;
                    case "$$027":
                        textElement.setValue(baggResult.getEgt().toString());
                        break;

                    case "$$028":
                        textElement.setValue(baggResult.getD2().toString());
                        break;
                    case "$$029":
                        textElement.setValue(baggResult.getC21().toString());
                        break;
                    case "$$030":
                        textElement.setValue(baggResult.getO2t().toString());
                        break;
                    case "$$031":
                        textElement.setValue(baggResult.getE2t().toString());
                        break;
                    case "$$032":
                        textElement.setValue(baggResult.getEjt().toString());
                        break;

                    case "$$033":
                        textElement.setValue(baggResult.getG().toString());
                        break;
                    case "$$034":
                        textElement.setValue(baggResult.getPc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(baggResult.getBhlc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(baggResult.getAlpha().toString());
                        break;
                    case "$$037":
                        textElement.setValue(baggResult.getBeta().toString());
                        break;

                    case "$$038":
                        textElement.setValue(baggResult.getCg().toString());
                        break;
                    case "$$039":
                        textElement.setValue(baggResult.getDge().toString());
                        break;

                    case "$$040":
                        textElement.setValue(baggResult.getBh1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(baggResult.getC1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(baggResult.getThk1e().toString());
                        break;
                    case "$$043":
                        textElement.setValue(baggResult.getBh1lc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(baggResult.getAlpha1().toString());
                        break;
                    case "$$045":
                        textElement.setValue(baggResult.getBeta1().toString());
                        break;
                    case "$$046":
                        textElement.setValue(baggResult.getSh1().toString());
                        break;
                    case "$$047":
                        textElement.setValue(baggResult.getPc1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(baggResult.getBh2().toString());
                        break;
                    case "$$049":
                        textElement.setValue(baggResult.getC2().toString());
                        break;
                    case "$$050":
                        textElement.setValue(baggResult.getThk2e().toString());
                        break;
                    case "$$051":
                        textElement.setValue(baggResult.getBh2lc().toString());
                        break;
                    case "$$052":
                        textElement.setValue(baggResult.getAlpha2().toString());
                        break;
                    case "$$053":
                        textElement.setValue(baggResult.getBeta2().toString());
                        break;
                    case "$$054":
                        textElement.setValue(baggResult.getSh2().toString());
                        break;
                    case "$$055":
                        textElement.setValue(baggResult.getPc2().toString());
                        break;
                    case "$$056":
                        textElement.setValue(baggResult.getOmax().toString());
                        break;
                    case "$$057":
                        textElement.setValue(baggResult.getOmaxchk());
                        break;
                    case "$$058":
                        textElement.setValue(baggResult.getI0().toString());
                        break;
                    case "$$059":
                        textElement.setValue(baggResult.getLmax1().toString());
                        break;
                    case "$$060":
                        textElement.setValue(baggResult.getZp1().toString());
                        break;
                    case "$$061":
                        textElement.setValue(baggResult.getThk1c().toString());
                        break;
                    case "$$062":
                        textElement.setValue(baggResult.getThk1d().toString());
                        break;
                    case "$$063":
                        textElement.setValue(baggResult.getThk1chk());
                        break;
                    case "$$064":
                        textElement.setValue(baggResult.getF1allow().toString());
                        break;
                    case "$$065":
                        textElement.setValue(baggResult.getF1max().toString());
                        break;
                    case "$$066":
                        textElement.setValue(baggResult.getF1chk());
                        break;
                    case "$$067":
                        textElement.setValue(baggResult.getF1().toString());
                        break;
                    case "$$068":
                        textElement.setValue(baggResult.getI1().toString());
                        break;
                    case "$$069":
                        textElement.setValue(baggResult.getLmax2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(baggResult.getZp2().toString());
                        break;
                    case "$$071":
                        textElement.setValue(baggResult.getThk2c().toString());
                        break;
                    case "$$072":
                        textElement.setValue(baggResult.getThk2d().toString());
                        break;
                    case "$$073":
                        textElement.setValue(baggResult.getThk2chk());
                        break;
                    case "$$074":
                        textElement.setValue(baggResult.getF2allow().toString());
                        break;
                    case "$$075":
                        textElement.setValue(baggResult.getF2max().toString());
                        break;
                    case "$$076":
                        textElement.setValue(baggResult.getF2chk());
                        break;
                    case "$$077":
                        textElement.setValue(baggResult.getLmax().toString());
                        break;
                    case "$$078":
                        textElement.setValue(baggResult.getLcchk());
                        break;
                    case "$$079":
                        textElement.setValue(baggResult.getZp().toString());
                        break;
                    case "$$300":
                        textElement.setValue(baggResult.getDgc().toString());
                        break;
                    case "$$301":
                        textElement.setValue(baggResult.getDgd().toString());
                        break;
                    case "$$302":
                        textElement.setValue(baggResult.getDgchk());
                        break;

                    case "$$100":
                        textElement.setValue(baggResult.getStd3());
                        break;
                    case "$$101":
                        textElement.setValue(baggResult.getName3());
                        break;
                    case "$$102":
                        textElement.setValue(baggResult.getC32().toString());
                        break;
                    case "$$103":
                        textElement.setValue(baggResult.getThk3n().toString());
                        break;
                    case "$$104":
                        textElement.setValue(baggResult.getD3().toString());
                        break;
                    case "$$105":
                        textElement.setValue(baggResult.getC31().toString());
                        break;
                    case "$$106":
                        textElement.setValue(baggResult.getO3t().toString());
                        break;
                    case "$$107":
                        textElement.setValue(baggResult.getE3t().toString());
                        break;
                    case "$$108":
                        textElement.setValue(baggResult.getBh3().toString());
                        break;
                    case "$$109":
                        textElement.setValue(baggResult.getC3().toString());
                        break;
                    case "$$110":
                        textElement.setValue(baggResult.getThk3e().toString());
                        break;
                    case "$$111":
                        textElement.setValue(baggResult.getBh3lc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(baggResult.getAlpha3().toString());
                        break;
                    case "$$113":
                        textElement.setValue(baggResult.getBeta3().toString());
                        break;
                    case "$$114":
                        textElement.setValue(baggResult.getSh3().toString());
                        break;
                    case "$$115":
                        textElement.setValue(baggResult.getPc3().toString());
                        break;
                    case "$$116":
                        textElement.setValue(baggResult.getF2().toString());
                        break;
                    case "$$117":
                        textElement.setValue(baggResult.getI2().toString());
                        break;
                    case "$$118":
                        textElement.setValue(baggResult.getLmax3().toString());
                        break;
                    case "$$119":
                        textElement.setValue(baggResult.getZp3().toString());
                        break;
                    case "$$120":
                        textElement.setValue(baggResult.getThk3c().toString());
                        break;
                    case "$$121":
                        textElement.setValue(baggResult.getThk3d().toString());
                        break;
                    case "$$122":
                        textElement.setValue(baggResult.getThk3chk());
                        break;
                    case "$$123":
                        textElement.setValue(baggResult.getF3allow().toString());
                        break;
                    case "$$124":
                        textElement.setValue(baggResult.getF3max().toString());
                        break;
                    case "$$125":
                        textElement.setValue(baggResult.getF3chk());
                        break;

                    case "$$200":
                        textElement.setValue(baggResult.getStd4());
                        break;
                    case "$$201":
                        textElement.setValue(baggResult.getName4());
                        break;
                    case "$$202":
                        textElement.setValue(baggResult.getC42().toString());
                        break;
                    case "$$203":
                        textElement.setValue(baggResult.getThk4n().toString());
                        break;
                    case "$$204":
                        textElement.setValue(baggResult.getD4().toString());
                        break;
                    case "$$205":
                        textElement.setValue(baggResult.getC41().toString());
                        break;
                    case "$$206":
                        textElement.setValue(baggResult.getO4t().toString());
                        break;
                    case "$$207":
                        textElement.setValue(baggResult.getE4t().toString());
                        break;
                    case "$$208":
                        textElement.setValue(baggResult.getBh4().toString());
                        break;
                    case "$$209":
                        textElement.setValue(baggResult.getC4().toString());
                        break;
                    case "$$210":
                        textElement.setValue(baggResult.getThk4e().toString());
                        break;
                    case "$$211":
                        textElement.setValue(baggResult.getBh4lc().toString());
                        break;
                    case "$$212":
                        textElement.setValue(baggResult.getAlpha4().toString());
                        break;
                    case "$$213":
                        textElement.setValue(baggResult.getBeta4().toString());
                        break;
                    case "$$214":
                        textElement.setValue(baggResult.getSh4().toString());
                        break;
                    case "$$215":
                        textElement.setValue(baggResult.getPc4().toString());
                        break;
                    case "$$216":
                        textElement.setValue(baggResult.getF3().toString());
                        break;
                    case "$$217":
                        textElement.setValue(baggResult.getI3().toString());
                        break;
                    case "$$218":
                        textElement.setValue(baggResult.getLmax4().toString());
                        break;
                    case "$$219":
                        textElement.setValue(baggResult.getZp4().toString());
                        break;
                    case "$$220":
                        textElement.setValue(baggResult.getThk4c().toString());
                        break;
                    case "$$221":
                        textElement.setValue(baggResult.getThk4d().toString());
                        break;
                    case "$$222":
                        textElement.setValue(baggResult.getThk4chk());
                        break;
                    case "$$223":
                        textElement.setValue(baggResult.getF4allow().toString());
                        break;
                    case "$$224":
                        textElement.setValue(baggResult.getF4max().toString());
                        break;
                    case "$$225":
                        textElement.setValue(baggResult.getF4chk());
                        break;

                    case "$$400":
                        textElement.setValue(baggResult.getStd5());
                        break;
                    case "$$401":
                        textElement.setValue(baggResult.getName5());
                        break;
                    case "$$402":
                        textElement.setValue(baggResult.getC52().toString());
                        break;
                    case "$$403":
                        textElement.setValue(baggResult.getThk5n().toString());
                        break;
                    case "$$404":
                        textElement.setValue(baggResult.getD5().toString());
                        break;
                    case "$$405":
                        textElement.setValue(baggResult.getC51().toString());
                        break;
                    case "$$406":
                        textElement.setValue(baggResult.getO5t().toString());
                        break;
                    case "$$407":
                        textElement.setValue(baggResult.getE5t().toString());
                        break;
                    case "$$408":
                        textElement.setValue(baggResult.getBh5().toString());
                        break;
                    case "$$409":
                        textElement.setValue(baggResult.getC5().toString());
                        break;
                    case "$$410":
                        textElement.setValue(baggResult.getThk5e().toString());
                        break;
                    case "$$411":
                        textElement.setValue(baggResult.getBh5lc().toString());
                        break;
                    case "$$412":
                        textElement.setValue(baggResult.getAlpha5().toString());
                        break;
                    case "$$413":
                        textElement.setValue(baggResult.getBeta5().toString());
                        break;
                    case "$$414":
                        textElement.setValue(baggResult.getSh5().toString());
                        break;
                    case "$$415":
                        textElement.setValue(baggResult.getPc5().toString());
                        break;
                    case "$$416":
                        textElement.setValue(baggResult.getF4().toString());
                        break;
                    case "$$417":
                        textElement.setValue(baggResult.getI4().toString());
                        break;
                    case "$$418":
                        textElement.setValue(baggResult.getLmax5().toString());
                        break;
                    case "$$419":
                        textElement.setValue(baggResult.getZp5().toString());
                        break;
                    case "$$420":
                        textElement.setValue(baggResult.getThk5c().toString());
                        break;
                    case "$$421":
                        textElement.setValue(baggResult.getThk5d().toString());
                        break;
                    case "$$422":
                        textElement.setValue(baggResult.getThk5chk());
                        break;
                    case "$$423":
                        textElement.setValue(baggResult.getF5allow().toString());
                        break;
                    case "$$424":
                        textElement.setValue(baggResult.getF5max().toString());
                        break;
                    case "$$425":
                        textElement.setValue(baggResult.getF5chk());
                        break;

                    case "$04":
                        textElement.setValue(baggResult.getBh().toString());
                        break;
                    case "$09":
                        textElement.setValue(baggResult.getDgn().toString());
                        break;
                    case "$10":
                        textElement.setValue(baggResult.getLg().toString());
                        break;
                    case "$40":
                        textElement.setValue(baggResult.getBh1().toString());
                        break;
                    case "$48":
                        textElement.setValue(baggResult.getBh2().toString());
                        break;
                    case "$108":
                        textElement.setValue(baggResult.getBh3().toString());
                        break;
                    case "$208":
                        textElement.setValue(baggResult.getBh4().toString());
                        break;
                    case "$408":
                        textElement.setValue(baggResult.getBh5().toString());
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
     * bagh
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baghResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAGH(String baseFileName, BAGHDocx baghResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/g/h/BAGH.docx";

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
                        textElement.setValue(baghResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baghResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(baghResult.getLc().toString());
                        break;
                    case "$$004":
                        textElement.setValue(baghResult.getBh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(baghResult.getL().toString());
                        break;

                    case "$$006":
                        textElement.setValue(baghResult.getJstd());
                        break;
                    case "$$007":
                        textElement.setValue(baghResult.getJname());
                        break;

                    case "$$008":
                        textElement.setValue(baghResult.getStd1());
                        break;
                    case "$$009":
                        textElement.setValue(baghResult.getName1());
                        break;
                    case "$$010":
                        textElement.setValue(baghResult.getC12().toString());
                        break;
                    case "$$011":
                        textElement.setValue(baghResult.getThk1n().toString());
                        break;

                    case "$$012":
                        textElement.setValue(baghResult.getStd2());
                        break;
                    case "$$013":
                        textElement.setValue(baghResult.getName2());
                        break;
                    case "$$014":
                        textElement.setValue(baghResult.getC22().toString());
                        break;
                    case "$$015":
                        textElement.setValue(baghResult.getThk2n().toString());
                        break;

                    case "$$100":
                        textElement.setValue(baghResult.getStd3());
                        break;
                    case "$$101":
                        textElement.setValue(baghResult.getName3());
                        break;
                    case "$$102":
                        textElement.setValue(baghResult.getC32().toString());
                        break;
                    case "$$103":
                        textElement.setValue(baghResult.getThk3n().toString());
                        break;

                    case "$$200":
                        textElement.setValue(baghResult.getStd4());
                        break;
                    case "$$201":
                        textElement.setValue(baghResult.getName4());
                        break;
                    case "$$202":
                        textElement.setValue(baghResult.getC42().toString());
                        break;
                    case "$$203":
                        textElement.setValue(baghResult.getThk4n().toString());
                        break;

                    case "$$300":
                        textElement.setValue(baghResult.getStd5());
                        break;
                    case "$$301":
                        textElement.setValue(baghResult.getName5());
                        break;
                    case "$$302":
                        textElement.setValue(baghResult.getC52().toString());
                        break;
                    case "$$303":
                        textElement.setValue(baghResult.getThk5n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(baghResult.getD1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(baghResult.getC11().toString());
                        break;
                    case "$$018":
                        textElement.setValue(baghResult.getO1t().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baghResult.getE1t().toString());
                        break;

                    case "$$020":
                        textElement.setValue(baghResult.getD2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(baghResult.getC21().toString());
                        break;
                    case "$$022":
                        textElement.setValue(baghResult.getO2t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(baghResult.getE2t().toString());
                        break;

                    case "$$104":
                        textElement.setValue(baghResult.getD3().toString());
                        break;
                    case "$$105":
                        textElement.setValue(baghResult.getC31().toString());
                        break;
                    case "$$106":
                        textElement.setValue(baghResult.getO3t().toString());
                        break;
                    case "$$107":
                        textElement.setValue(baghResult.getE3t().toString());
                        break;

                    case "$$204":
                        textElement.setValue(baghResult.getD4().toString());
                        break;
                    case "$$205":
                        textElement.setValue(baghResult.getC41().toString());
                        break;
                    case "$$206":
                        textElement.setValue(baghResult.getO4t().toString());
                        break;
                    case "$$207":
                        textElement.setValue(baghResult.getE4t().toString());
                        break;

                    case "$$304":
                        textElement.setValue(baghResult.getD5().toString());
                        break;
                    case "$$305":
                        textElement.setValue(baghResult.getC51().toString());
                        break;
                    case "$$306":
                        textElement.setValue(baghResult.getO5t().toString());
                        break;
                    case "$$307":
                        textElement.setValue(baghResult.getE5t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(baghResult.getEjt().toString());
                        break;

                    case "$$025":
                        textElement.setValue(baghResult.getG().toString());
                        break;
                    case "$$026":
                        textElement.setValue(baghResult.getPc().toString());
                        break;

                    case "$$027":
                        textElement.setValue(baghResult.getBhlc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(baghResult.getAlpha().toString());
                        break;
                    case "$$029":
                        textElement.setValue(baghResult.getBeta().toString());
                        break;

                    case "$$030":
                        textElement.setValue(baghResult.getBh1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(baghResult.getC1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(baghResult.getThk1e().toString());
                        break;
                    case "$$033":
                        textElement.setValue(baghResult.getBh1lc().toString());
                        break;
                    case "$$034":
                        textElement.setValue(baghResult.getAlpha1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(baghResult.getBeta1().toString());
                        break;
                    case "$$036":
                        textElement.setValue(baghResult.getSh1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(baghResult.getPc1().toString());
                        break;

                    case "$$038":
                        textElement.setValue(baghResult.getBh2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(baghResult.getC2().toString());
                        break;
                    case "$$040":
                        textElement.setValue(baghResult.getThk2e().toString());
                        break;
                    case "$$041":
                        textElement.setValue(baghResult.getBh2lc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(baghResult.getAlpha2().toString());
                        break;
                    case "$$043":
                        textElement.setValue(baghResult.getBeta2().toString());
                        break;
                    case "$$044":
                        textElement.setValue(baghResult.getSh2().toString());
                        break;
                    case "$$045":
                        textElement.setValue(baghResult.getPc2().toString());
                        break;

                    case "$$108":
                        textElement.setValue(baghResult.getBh3().toString());
                        break;
                    case "$$109":
                        textElement.setValue(baghResult.getC3().toString());
                        break;
                    case "$$110":
                        textElement.setValue(baghResult.getThk3e().toString());
                        break;
                    case "$$111":
                        textElement.setValue(baghResult.getBh3lc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(baghResult.getAlpha3().toString());
                        break;
                    case "$$113":
                        textElement.setValue(baghResult.getBeta3().toString());
                        break;
                    case "$$114":
                        textElement.setValue(baghResult.getSh3().toString());
                        break;
                    case "$$115":
                        textElement.setValue(baghResult.getPc3().toString());
                        break;

                    case "$$208":
                        textElement.setValue(baghResult.getBh4().toString());
                        break;
                    case "$$209":
                        textElement.setValue(baghResult.getC4().toString());
                        break;
                    case "$$210":
                        textElement.setValue(baghResult.getThk4e().toString());
                        break;
                    case "$$211":
                        textElement.setValue(baghResult.getBh4lc().toString());
                        break;
                    case "$$212":
                        textElement.setValue(baghResult.getAlpha4().toString());
                        break;
                    case "$$213":
                        textElement.setValue(baghResult.getBeta4().toString());
                        break;
                    case "$$214":
                        textElement.setValue(baghResult.getSh4().toString());
                        break;
                    case "$$215":
                        textElement.setValue(baghResult.getPc4().toString());
                        break;

                    case "$$308":
                        textElement.setValue(baghResult.getBh5().toString());
                        break;
                    case "$$309":
                        textElement.setValue(baghResult.getC5().toString());
                        break;
                    case "$$310":
                        textElement.setValue(baghResult.getThk5e().toString());
                        break;
                    case "$$311":
                        textElement.setValue(baghResult.getBh5lc().toString());
                        break;
                    case "$$312":
                        textElement.setValue(baghResult.getAlpha5().toString());
                        break;
                    case "$$313":
                        textElement.setValue(baghResult.getBeta5().toString());
                        break;
                    case "$$314":
                        textElement.setValue(baghResult.getSh5().toString());
                        break;
                    case "$$315":
                        textElement.setValue(baghResult.getPc5().toString());
                        break;

                    case "$$046":
                        textElement.setValue(baghResult.getI0().toString());
                        break;

                    case "$$047":
                        textElement.setValue(baghResult.getLmax1().toString());
                        break;
                    case "$$048":
                        textElement.setValue(baghResult.getZp1().toString());
                        break;

                    case "$$049":
                        textElement.setValue(baghResult.getThk1c().toString());
                        break;
                    case "$$050":
                        textElement.setValue(baghResult.getThk1d().toString());
                        break;
                    case "$$051":
                        textElement.setValue(baghResult.getThk1chk());
                        break;
                    case "$$052":
                        textElement.setValue(baghResult.getF1allow().toString());
                        break;
                    case "$$053":
                        textElement.setValue(baghResult.getF1max().toString());
                        break;
                    case "$$054":
                        textElement.setValue(baghResult.getF1chk());
                        break;

                    case "$$055":
                        textElement.setValue(baghResult.getF1().toString());
                        break;
                    case "$$056":
                        textElement.setValue(baghResult.getI1().toString());
                        break;

                    case "$$057":
                        textElement.setValue(baghResult.getLmax2().toString());
                        break;
                    case "$$058":
                        textElement.setValue(baghResult.getZp2().toString());
                        break;

                    case "$$059":
                        textElement.setValue(baghResult.getThk2c().toString());
                        break;
                    case "$$060":
                        textElement.setValue(baghResult.getThk2d().toString());
                        break;
                    case "$$061":
                        textElement.setValue(baghResult.getThk2chk());
                        break;
                    case "$$062":
                        textElement.setValue(baghResult.getF2allow().toString());
                        break;
                    case "$$063":
                        textElement.setValue(baghResult.getF2max().toString());
                        break;
                    case "$$064":
                        textElement.setValue(baghResult.getF2chk());
                        break;

                    case "$$116":
                        textElement.setValue(baghResult.getF2().toString());
                        break;
                    case "$$117":
                        textElement.setValue(baghResult.getI2().toString());
                        break;

                    case "$$118":
                        textElement.setValue(baghResult.getLmax3().toString());
                        break;
                    case "$$119":
                        textElement.setValue(baghResult.getZp3().toString());
                        break;

                    case "$$120":
                        textElement.setValue(baghResult.getThk3c().toString());
                        break;
                    case "$$121":
                        textElement.setValue(baghResult.getThk3d().toString());
                        break;
                    case "$$122":
                        textElement.setValue(baghResult.getThk3chk());
                        break;
                    case "$$123":
                        textElement.setValue(baghResult.getF3allow().toString());
                        break;
                    case "$$124":
                        textElement.setValue(baghResult.getF3max().toString());
                        break;
                    case "$$125":
                        textElement.setValue(baghResult.getF3chk());
                        break;

                    case "$$216":
                        textElement.setValue(baghResult.getF3().toString());
                        break;
                    case "$$217":
                        textElement.setValue(baghResult.getI3().toString());
                        break;

                    case "$$218":
                        textElement.setValue(baghResult.getLmax4().toString());
                        break;
                    case "$$219":
                        textElement.setValue(baghResult.getZp4().toString());
                        break;

                    case "$$220":
                        textElement.setValue(baghResult.getThk4c().toString());
                        break;
                    case "$$221":
                        textElement.setValue(baghResult.getThk4d().toString());
                        break;
                    case "$$222":
                        textElement.setValue(baghResult.getThk4chk());
                        break;
                    case "$$223":
                        textElement.setValue(baghResult.getF4allow().toString());
                        break;
                    case "$$224":
                        textElement.setValue(baghResult.getF4max().toString());
                        break;
                    case "$$225":
                        textElement.setValue(baghResult.getF4chk());
                        break;

                    case "$$316":
                        textElement.setValue(baghResult.getF4().toString());
                        break;
                    case "$$317":
                        textElement.setValue(baghResult.getI4().toString());
                        break;

                    case "$$318":
                        textElement.setValue(baghResult.getLmax5().toString());
                        break;
                    case "$$319":
                        textElement.setValue(baghResult.getZp5().toString());
                        break;

                    case "$$320":
                        textElement.setValue(baghResult.getThk5c().toString());
                        break;
                    case "$$321":
                        textElement.setValue(baghResult.getThk5d().toString());
                        break;
                    case "$$322":
                        textElement.setValue(baghResult.getThk5chk());
                        break;
                    case "$$323":
                        textElement.setValue(baghResult.getF5allow().toString());
                        break;
                    case "$$324":
                        textElement.setValue(baghResult.getF5max().toString());
                        break;
                    case "$$325":
                        textElement.setValue(baghResult.getF5chk());
                        break;

                    case "$$065":
                        textElement.setValue(baghResult.getLmax().toString());
                        break;
                    case "$$066":
                        textElement.setValue(baghResult.getLcchk());
                        break;
                    case "$$067":
                        textElement.setValue(baghResult.getZp().toString());
                        break;

                    case "$04":
                        textElement.setValue(baghResult.getBh().toString());
                        break;
                    case "$05":
                        textElement.setValue(baghResult.getL().toString());
                        break;
                    case "$30":
                        textElement.setValue(baghResult.getBh1().toString());
                        break;
                    case "$38":
                        textElement.setValue(baghResult.getBh2().toString());
                        break;
                    case "$108":
                        textElement.setValue(baghResult.getBh3().toString());
                        break;
                    case "$208":
                        textElement.setValue(baghResult.getBh4().toString());
                        break;
                    case "$308":
                        textElement.setValue(baghResult.getBh5().toString());
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
     * baha
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bahaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAHA(String baseFileName, BAHADocx bahaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/h/a/BAHA.docx";

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
                        textElement.setValue(bahaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bahaResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bahaResult.getL().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bahaResult.getGstd());
                        break;
                    case "$$005":
                        textElement.setValue(bahaResult.getGname());
                        break;
                    case "$$006":
                        textElement.setValue(bahaResult.getCg2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(bahaResult.getDgn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bahaResult.getH1().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bahaResult.getA().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bahaResult.getH().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bahaResult.getStd1());
                        break;
                    case "$$012":
                        textElement.setValue(bahaResult.getName1());
                        break;
                    case "$$013":
                        textElement.setValue(bahaResult.getC12().toString());
                        break;
                    case "$$014":
                        textElement.setValue(bahaResult.getThk1n().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bahaResult.getJstd());
                        break;
                    case "$$016":
                        textElement.setValue(bahaResult.getJname());
                        break;
                    case "$$017":
                        textElement.setValue(bahaResult.getDg().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bahaResult.getCg1().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bahaResult.getOgt().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bahaResult.getD1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bahaResult.getC11().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bahaResult.getO1t().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bahaResult.getEjt().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bahaResult.getG().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bahaResult.getP1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bahaResult.getC1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bahaResult.getThk1e().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bahaResult.getCg().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bahaResult.getDge().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bahaResult.getI0().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bahaResult.getThk1c().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bahaResult.getThk1d().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bahaResult.getThk1chk());
                        break;
                    case "$$034":
                        textElement.setValue(bahaResult.getDgc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bahaResult.getDgd().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bahaResult.getDgchk());
                        break;

                    case "$03":
                        textElement.setValue(bahaResult.getL().toString());
                        break;
                    case "$08":
                        textElement.setValue(bahaResult.getH1().toString());
                        break;
                    case "$09":
                        textElement.setValue(bahaResult.getA().toString());
                        break;
                    case "$10":
                        textElement.setValue(bahaResult.getH().toString());
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
     * bahb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bahbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAHB(String baseFileName, BAHBDocx bahbResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/h/b/BAHB.docx";

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
                        textElement.setValue(bahbResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bahbResult.getD().toString());
                        break;

                    case "$$004":
                        textElement.setValue(bahbResult.getGstd());
                        break;
                    case "$$005":
                        textElement.setValue(bahbResult.getGname());
                        break;
                    case "$$006":
                        textElement.setValue(bahbResult.getCg2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(bahbResult.getDgn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bahbResult.getHi().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bahbResult.getA().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bahbResult.getH().toString());
                        break;

                    case "$$011":
                        textElement.setValue(bahbResult.getStd1());
                        break;
                    case "$$012":
                        textElement.setValue(bahbResult.getName1());
                        break;
                    case "$$013":
                        textElement.setValue(bahbResult.getC12().toString());
                        break;
                    case "$$014":
                        textElement.setValue(bahbResult.getThk1n().toString());
                        break;

                    case "$$017":
                        textElement.setValue(bahbResult.getDg().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bahbResult.getCg1().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bahbResult.getOgt().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bahbResult.getD1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bahbResult.getC11().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bahbResult.getO1t().toString());
                        break;

                    case "$$024":
                        textElement.setValue(bahbResult.getG().toString());
                        break;

                    case "$$025":
                        textElement.setValue(bahbResult.getPi().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bahbResult.getC1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bahbResult.getThk1e().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bahbResult.getCg().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bahbResult.getDge().toString());
                        break;

                    case "$$031":
                        textElement.setValue(bahbResult.getThk1c().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bahbResult.getThk1d().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bahbResult.getThk1chk());
                        break;

                    case "$$034":
                        textElement.setValue(bahbResult.getDgc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bahbResult.getDgd().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bahbResult.getDgchk());
                        break;

                    case "$08":
                        textElement.setValue(bahbResult.getHi().toString());
                        break;
                    case "$09":
                        textElement.setValue(bahbResult.getA().toString());
                        break;
                    case "$10":
                        textElement.setValue(bahbResult.getH().toString());
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
     * baia
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baiaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAIA(String baseFileName, BAIADocx baiaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/i/a/BAIA.docx";

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
                        textElement.setValue(baiaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baiaResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(baiaResult.getLp().toString());
                        break;
                    case "$$004":
                        textElement.setValue(baiaResult.getBh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(baiaResult.getThkte().toString());
                        break;
                    case "$$006":
                        textElement.setValue(baiaResult.getStd0());
                        break;
                    case "$$007":
                        textElement.setValue(baiaResult.getName0());
                        break;
                    case "$$008":
                        textElement.setValue(baiaResult.getC02().toString());
                        break;
                    case "$$009":
                        textElement.setValue(baiaResult.getB0n().toString());
                        break;
                    case "$$010":
                        textElement.setValue(baiaResult.getThk0n().toString());
                        break;
                    case "$$011":
                        textElement.setValue(baiaResult.getL0().toString());
                        break;
                    case "$$012":
                        textElement.setValue(baiaResult.getStd1());
                        break;
                    case "$$013":
                        textElement.setValue(baiaResult.getName1());
                        break;
                    case "$$014":
                        textElement.setValue(baiaResult.getC12().toString());
                        break;
                    case "$$015":
                        textElement.setValue(baiaResult.getThk1n().toString());
                        break;
                    case "$$016":
                        textElement.setValue(baiaResult.getStdf());
                        break;
                    case "$$017":
                        textElement.setValue(baiaResult.getNamef());
                        break;
                    case "$$018":
                        textElement.setValue(baiaResult.getCf2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baiaResult.getBfn().toString());
                        break;
                    case "$$020":
                        textElement.setValue(baiaResult.getThkfn().toString());
                        break;
                    case "$$021":
                        textElement.setValue(baiaResult.getLf().toString());
                        break;
                    case "$$022":
                        textElement.setValue(baiaResult.getStd2());
                        break;
                    case "$$023":
                        textElement.setValue(baiaResult.getName2());
                        break;
                    case "$$024":
                        textElement.setValue(baiaResult.getC22().toString());
                        break;
                    case "$$025":
                        textElement.setValue(baiaResult.getThk2n().toString());
                        break;
                    case "$$026":
                        textElement.setValue(baiaResult.getD0().toString());
                        break;
                    case "$$027":
                        textElement.setValue(baiaResult.getC01().toString());
                        break;
                    case "$$028":
                        textElement.setValue(baiaResult.getO0t().toString());
                        break;
                    case "$$029":
                        textElement.setValue(baiaResult.getE0t().toString());
                        break;
                    case "$$030":
                        textElement.setValue(baiaResult.getD2().toString());
                        break;
                    case "$$031":
                        textElement.setValue(baiaResult.getC21().toString());
                        break;
                    case "$$032":
                        textElement.setValue(baiaResult.getO2t().toString());
                        break;
                    case "$$033":
                        textElement.setValue(baiaResult.getE2t().toString());
                        break;
                    case "$$034":
                        textElement.setValue(baiaResult.getD1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(baiaResult.getC11().toString());
                        break;
                    case "$$036":
                        textElement.setValue(baiaResult.getO1t().toString());
                        break;
                    case "$$037":
                        textElement.setValue(baiaResult.getE1t().toString());
                        break;
                    case "$$038":
                        textElement.setValue(baiaResult.getDf().toString());
                        break;
                    case "$$039":
                        textElement.setValue(baiaResult.getCf1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(baiaResult.getOft().toString());
                        break;
                    case "$$041":
                        textElement.setValue(baiaResult.getEft().toString());
                        break;
                    case "$$042":
                        textElement.setValue(baiaResult.getG().toString());
                        break;
                    case "$$043":
                        textElement.setValue(baiaResult.getPc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(baiaResult.getB0e().toString());
                        break;
                    case "$$045":
                        textElement.setValue(baiaResult.getC0().toString());
                        break;
                    case "$$046":
                        textElement.setValue(baiaResult.getThk0e().toString());
                        break;
                    case "$$047":
                        textElement.setValue(baiaResult.getC1().toString());
                        break;
                    case "$$048":
                        textElement.setValue(baiaResult.getThk1e().toString());
                        break;
                    case "$$049":
                        textElement.setValue(baiaResult.getBh1().toString());
                        break;
                    case "$$050":
                        textElement.setValue(baiaResult.getBh1lp().toString());
                        break;
                    case "$$051":
                        textElement.setValue(baiaResult.getAlpha1().toString());
                        break;
                    case "$$052":
                        textElement.setValue(baiaResult.getBeta1().toString());
                        break;
                    case "$$053":
                        textElement.setValue(baiaResult.getSh1().toString());
                        break;
                    case "$$054":
                        textElement.setValue(baiaResult.getPc1().toString());
                        break;
                    case "$$055":
                        textElement.setValue(baiaResult.getCf().toString());
                        break;
                    case "$$056":
                        textElement.setValue(baiaResult.getBfe().toString());
                        break;
                    case "$$057":
                        textElement.setValue(baiaResult.getThkfe().toString());
                        break;
                    case "$$058":
                        textElement.setValue(baiaResult.getC2().toString());
                        break;
                    case "$$059":
                        textElement.setValue(baiaResult.getThk2e().toString());
                        break;
                    case "$$060":
                        textElement.setValue(baiaResult.getBh2().toString());
                        break;
                    case "$$061":
                        textElement.setValue(baiaResult.getBh2lp().toString());
                        break;
                    case "$$062":
                        textElement.setValue(baiaResult.getAlpha2().toString());
                        break;
                    case "$$063":
                        textElement.setValue(baiaResult.getBeta2().toString());
                        break;
                    case "$$064":
                        textElement.setValue(baiaResult.getSh2().toString());
                        break;
                    case "$$065":
                        textElement.setValue(baiaResult.getPc2().toString());
                        break;
                    case "$$066":
                        textElement.setValue(baiaResult.getK().toString());
                        break;
                    case "$$067":
                        textElement.setValue(baiaResult.getB().toString());
                        break;
                    case "$$068":
                        textElement.setValue(baiaResult.getE1().toString());
                        break;
                    case "$$069":
                        textElement.setValue(baiaResult.getE2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(baiaResult.getIx().toString());
                        break;
                    case "$$071":
                        textElement.setValue(baiaResult.getZx().toString());
                        break;
                    case "$$072":
                        textElement.setValue(baiaResult.getOtw0().toString());
                        break;
                    case "$$073":
                        textElement.setValue(baiaResult.getOnw0().toString());
                        break;
                    case "$$074":
                        textElement.setValue(baiaResult.getOtp0().toString());
                        break;
                    case "$$075":
                        textElement.setValue(baiaResult.getOrmax0().toString());
                        break;
                    case "$$076":
                        textElement.setValue(baiaResult.getOrmax0chk());
                        break;
                    case "$$077":
                        textElement.setValue(baiaResult.getZp1().toString());
                        break;
                    case "$$078":
                        textElement.setValue(baiaResult.getThk1c().toString());
                        break;
                    case "$$079":
                        textElement.setValue(baiaResult.getThk1d().toString());
                        break;
                    case "$$080":
                        textElement.setValue(baiaResult.getThk1chk());
                        break;
                    case "$$081":
                        textElement.setValue(baiaResult.getF1allow().toString());
                        break;
                    case "$$082":
                        textElement.setValue(baiaResult.getF1max().toString());
                        break;
                    case "$$083":
                        textElement.setValue(baiaResult.getF1maxchk());
                        break;
                    case "$$084":
                        textElement.setValue(baiaResult.getZp2().toString());
                        break;
                    case "$$085":
                        textElement.setValue(baiaResult.getOtwf().toString());
                        break;
                    case "$$086":
                        textElement.setValue(baiaResult.getOnwf().toString());
                        break;
                    case "$$087":
                        textElement.setValue(baiaResult.getOtpf().toString());
                        break;
                    case "$$088":
                        textElement.setValue(baiaResult.getOrmaxf().toString());
                        break;
                    case "$$089":
                        textElement.setValue(baiaResult.getOrmaxfchk());
                        break;
                    case "$$090":
                        textElement.setValue(baiaResult.getThk2c().toString());
                        break;
                    case "$$091":
                        textElement.setValue(baiaResult.getThk2d().toString());
                        break;
                    case "$$092":
                        textElement.setValue(baiaResult.getThk2chk());
                        break;
                    case "$$093":
                        textElement.setValue(baiaResult.getF2allow().toString());
                        break;
                    case "$$094":
                        textElement.setValue(baiaResult.getF2max().toString());
                        break;
                    case "$$095":
                        textElement.setValue(baiaResult.getF2maxchk());
                        break;
                    case "$$096":
                        textElement.setValue(baiaResult.getZp().toString());
                        break;

                    case "$03":
                        textElement.setValue(baiaResult.getLp().toString());
                        break;
                    case "$04":
                        textElement.setValue(baiaResult.getBh().toString());
                        break;
                    case "$05":
                        textElement.setValue(baiaResult.getThkte().toString());
                        break;
                    case "$09":
                        textElement.setValue(baiaResult.getB0n().toString());
                        break;
                    case "$10":
                        textElement.setValue(baiaResult.getThk0n().toString());
                        break;
                    case "$15":
                        textElement.setValue(baiaResult.getBh1().toString());
                        break;
                    case "$19":
                        textElement.setValue(baiaResult.getBfn().toString());
                        break;
                    case "$20":
                        textElement.setValue(baiaResult.getThkfn().toString());
                        break;
                    case "$25":
                        textElement.setValue(baiaResult.getBh2().toString());
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
     * baib
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param baibResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAIB(String baseFileName, BAIBDocx baibResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/i/b/BAIB.docx";

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
                        textElement.setValue(baibResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(baibResult.getD().toString());
                        break;
                    case "$$003":
                        textElement.setValue(baibResult.getLp().toString());
                        break;
                    case "$$004":
                        textElement.setValue(baibResult.getBh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(baibResult.getThkte().toString());
                        break;

                    case "$$006":
                        textElement.setValue(baibResult.getStd0());
                        break;
                    case "$$007":
                        textElement.setValue(baibResult.getName0());
                        break;
                    case "$$008":
                        textElement.setValue(baibResult.getC02().toString());
                        break;
                    case "$$009":
                        textElement.setValue(baibResult.getB0n().toString());
                        break;
                    case "$$010":
                        textElement.setValue(baibResult.getThk0n().toString());
                        break;
                    case "$$011":
                        textElement.setValue(baibResult.getL0().toString());
                        break;

                    case "$$012":
                        textElement.setValue(baibResult.getStd1());
                        break;
                    case "$$013":
                        textElement.setValue(baibResult.getName1());
                        break;
                    case "$$014":
                        textElement.setValue(baibResult.getC12().toString());
                        break;
                    case "$$015":
                        textElement.setValue(baibResult.getThk1n().toString());
                        break;

                    case "$$016":
                        textElement.setValue(baibResult.getStdf());
                        break;
                    case "$$017":
                        textElement.setValue(baibResult.getNamef());
                        break;
                    case "$$018":
                        textElement.setValue(baibResult.getCf2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(baibResult.getBfn().toString());
                        break;
                    case "$$020":
                        textElement.setValue(baibResult.getThkfn().toString());
                        break;
                    case "$$021":
                        textElement.setValue(baibResult.getLf().toString());
                        break;

                    case "$$022":
                        textElement.setValue(baibResult.getStd2());
                        break;
                    case "$$023":
                        textElement.setValue(baibResult.getName2());
                        break;
                    case "$$024":
                        textElement.setValue(baibResult.getC22().toString());
                        break;
                    case "$$025":
                        textElement.setValue(baibResult.getThk2n().toString());
                        break;

                    case "$$100":
                        textElement.setValue(baibResult.getStds());
                        break;
                    case "$$101":
                        textElement.setValue(baibResult.getNames());
                        break;
                    case "$$102":
                        textElement.setValue(baibResult.getCs2().toString());
                        break;
                    case "$$103":
                        textElement.setValue(baibResult.getBsn().toString());
                        break;
                    case "$$104":
                        textElement.setValue(baibResult.getThksn().toString());
                        break;
                    case "$$105":
                        textElement.setValue(baibResult.getLs().toString());
                        break;

                    case "$$106":
                        textElement.setValue(baibResult.getStd3());
                        break;
                    case "$$107":
                        textElement.setValue(baibResult.getName3());
                        break;
                    case "$$108":
                        textElement.setValue(baibResult.getC32().toString());
                        break;
                    case "$$109":
                        textElement.setValue(baibResult.getThk3n().toString());
                        break;

                    case "$$026":
                        textElement.setValue(baibResult.getD0().toString());
                        break;
                    case "$$027":
                        textElement.setValue(baibResult.getC01().toString());
                        break;
                    case "$$028":
                        textElement.setValue(baibResult.getO0t().toString());
                        break;
                    case "$$029":
                        textElement.setValue(baibResult.getE0t().toString());
                        break;

                    case "$$030":
                        textElement.setValue(baibResult.getD2().toString());
                        break;
                    case "$$031":
                        textElement.setValue(baibResult.getC21().toString());
                        break;
                    case "$$032":
                        textElement.setValue(baibResult.getO2t().toString());
                        break;
                    case "$$033":
                        textElement.setValue(baibResult.getE2t().toString());
                        break;

                    case "$$034":
                        textElement.setValue(baibResult.getD1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(baibResult.getC11().toString());
                        break;
                    case "$$036":
                        textElement.setValue(baibResult.getO1t().toString());
                        break;
                    case "$$037":
                        textElement.setValue(baibResult.getE1t().toString());
                        break;

                    case "$$038":
                        textElement.setValue(baibResult.getDf().toString());
                        break;
                    case "$$039":
                        textElement.setValue(baibResult.getCf1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(baibResult.getOft().toString());
                        break;
                    case "$$041":
                        textElement.setValue(baibResult.getEft().toString());
                        break;

                    case "$$110":
                        textElement.setValue(baibResult.getD3().toString());
                        break;
                    case "$$111":
                        textElement.setValue(baibResult.getC31().toString());
                        break;
                    case "$$112":
                        textElement.setValue(baibResult.getO3t().toString());
                        break;
                    case "$$113":
                        textElement.setValue(baibResult.getE3t().toString());
                        break;

                    case "$$114":
                        textElement.setValue(baibResult.getDs().toString());
                        break;
                    case "$$115":
                        textElement.setValue(baibResult.getCs1().toString());
                        break;
                    case "$$116":
                        textElement.setValue(baibResult.getOst().toString());
                        break;
                    case "$$117":
                        textElement.setValue(baibResult.getEst().toString());
                        break;

                    case "$$042":
                        textElement.setValue(baibResult.getG().toString());
                        break;
                    case "$$043":
                        textElement.setValue(baibResult.getPc().toString());
                        break;

                    case "$$044":
                        textElement.setValue(baibResult.getB0e().toString());
                        break;
                    case "$$045":
                        textElement.setValue(baibResult.getC0().toString());
                        break;
                    case "$$046":
                        textElement.setValue(baibResult.getThk0e().toString());
                        break;

                    case "$$047":
                        textElement.setValue(baibResult.getC1().toString());
                        break;
                    case "$$048":
                        textElement.setValue(baibResult.getThk1e().toString());
                        break;
                    case "$$049":
                        textElement.setValue(baibResult.getBh1().toString());
                        break;
                    case "$$050":
                        textElement.setValue(baibResult.getBh1lp().toString());
                        break;
                    case "$$051":
                        textElement.setValue(baibResult.getAlpha1().toString());
                        break;
                    case "$$052":
                        textElement.setValue(baibResult.getBeta1().toString());
                        break;
                    case "$$053":
                        textElement.setValue(baibResult.getSh1().toString());
                        break;
                    case "$$054":
                        textElement.setValue(baibResult.getPc1().toString());
                        break;

                    case "$$055":
                        textElement.setValue(baibResult.getCf().toString());
                        break;
                    case "$$056":
                        textElement.setValue(baibResult.getBfe().toString());
                        break;
                    case "$$057":
                        textElement.setValue(baibResult.getThkfe().toString());
                        break;

                    case "$$058":
                        textElement.setValue(baibResult.getC2().toString());
                        break;
                    case "$$059":
                        textElement.setValue(baibResult.getThk2e().toString());
                        break;
                    case "$$060":
                        textElement.setValue(baibResult.getBh2().toString());
                        break;
                    case "$$061":
                        textElement.setValue(baibResult.getBh2lp().toString());
                        break;
                    case "$$062":
                        textElement.setValue(baibResult.getAlpha2().toString());
                        break;
                    case "$$063":
                        textElement.setValue(baibResult.getBeta2().toString());
                        break;
                    case "$$064":
                        textElement.setValue(baibResult.getSh2().toString());
                        break;
                    case "$$065":
                        textElement.setValue(baibResult.getPc2().toString());
                        break;

                    case "$$118":
                        textElement.setValue(baibResult.getCs().toString());
                        break;
                    case "$$119":
                        textElement.setValue(baibResult.getBse().toString());
                        break;
                    case "$$120":
                        textElement.setValue(baibResult.getThkse().toString());
                        break;

                    case "$$121":
                        textElement.setValue(baibResult.getC3().toString());
                        break;
                    case "$$122":
                        textElement.setValue(baibResult.getThk3e().toString());
                        break;
                    case "$$123":
                        textElement.setValue(baibResult.getBh3().toString());
                        break;
                    case "$$124":
                        textElement.setValue(baibResult.getBh3lp().toString());
                        break;
                    case "$$125":
                        textElement.setValue(baibResult.getAlpha3().toString());
                        break;
                    case "$$126":
                        textElement.setValue(baibResult.getBeta3().toString());
                        break;
                    case "$$127":
                        textElement.setValue(baibResult.getSh3().toString());
                        break;
                    case "$$128":
                        textElement.setValue(baibResult.getPc3().toString());
                        break;

                    case "$$066":
                        textElement.setValue(baibResult.getK().toString());
                        break;
                    case "$$067":
                        textElement.setValue(baibResult.getB().toString());
                        break;
                    case "$$068":
                        textElement.setValue(baibResult.getE1().toString());
                        break;
                    case "$$069":
                        textElement.setValue(baibResult.getE2().toString());
                        break;
                    case "$$070":
                        textElement.setValue(baibResult.getIx().toString());
                        break;
                    case "$$071":
                        textElement.setValue(baibResult.getZx().toString());
                        break;
                    case "$$072":
                        textElement.setValue(baibResult.getOtw0().toString());
                        break;
                    case "$$073":
                        textElement.setValue(baibResult.getOnw0().toString());
                        break;
                    case "$$074":
                        textElement.setValue(baibResult.getOtp0().toString());
                        break;
                    case "$$075":
                        textElement.setValue(baibResult.getOrmax0().toString());
                        break;
                    case "$$076":
                        textElement.setValue(baibResult.getOrmax0chk());
                        break;

                    case "$$077":
                        textElement.setValue(baibResult.getZp1().toString());
                        break;

                    case "$$078":
                        textElement.setValue(baibResult.getThk1c().toString());
                        break;
                    case "$$079":
                        textElement.setValue(baibResult.getThk1d().toString());
                        break;
                    case "$$080":
                        textElement.setValue(baibResult.getThk1chk());
                        break;
                    case "$$081":
                        textElement.setValue(baibResult.getF1allow().toString());
                        break;
                    case "$$082":
                        textElement.setValue(baibResult.getF1max().toString());
                        break;
                    case "$$083":
                        textElement.setValue(baibResult.getF1maxchk());
                        break;

                    case "$$084":
                        textElement.setValue(baibResult.getZp2().toString());
                        break;

                    case "$$085":
                        textElement.setValue(baibResult.getOtwf().toString());
                        break;
                    case "$$086":
                        textElement.setValue(baibResult.getOnwf().toString());
                        break;
                    case "$$087":
                        textElement.setValue(baibResult.getOtpf().toString());
                        break;
                    case "$$088":
                        textElement.setValue(baibResult.getOrmaxf().toString());
                        break;
                    case "$$089":
                        textElement.setValue(baibResult.getOrmaxfchk());
                        break;

                    case "$$090":
                        textElement.setValue(baibResult.getThk2c().toString());
                        break;
                    case "$$091":
                        textElement.setValue(baibResult.getThk2d().toString());
                        break;
                    case "$$092":
                        textElement.setValue(baibResult.getThk2chk());
                        break;
                    case "$$093":
                        textElement.setValue(baibResult.getF2allow().toString());
                        break;
                    case "$$094":
                        textElement.setValue(baibResult.getF2max().toString());
                        break;
                    case "$$095":
                        textElement.setValue(baibResult.getF2maxchk());
                        break;

                    case "$$129":
                        textElement.setValue(baibResult.getZp3().toString());
                        break;

                    case "$$130":
                        textElement.setValue(baibResult.getOtws().toString());
                        break;
                    case "$$131":
                        textElement.setValue(baibResult.getOnws().toString());
                        break;
                    case "$$132":
                        textElement.setValue(baibResult.getOtps().toString());
                        break;
                    case "$$133":
                        textElement.setValue(baibResult.getOrmaxs().toString());
                        break;
                    case "$$134":
                        textElement.setValue(baibResult.getOrmaxschk());
                        break;

                    case "$$135":
                        textElement.setValue(baibResult.getThk3c().toString());
                        break;
                    case "$$136":
                        textElement.setValue(baibResult.getThk3d().toString());
                        break;
                    case "$$137":
                        textElement.setValue(baibResult.getThk3chk());
                        break;
                    case "$$138":
                        textElement.setValue(baibResult.getF3allow().toString());
                        break;
                    case "$$139":
                        textElement.setValue(baibResult.getF3max().toString());
                        break;
                    case "$$140":
                        textElement.setValue(baibResult.getF3maxchk());
                        break;

                    case "$$096":
                        textElement.setValue(baibResult.getZp().toString());
                        break;

                    case "$03":
                        textElement.setValue(baibResult.getLp().toString());
                        break;
                    case "$04":
                        textElement.setValue(baibResult.getBh().toString());
                        break;
                    case "$05":
                        textElement.setValue(baibResult.getThkte().toString());
                        break;
                    case "$09":
                        textElement.setValue(baibResult.getB0n().toString());
                        break;
                    case "$10":
                        textElement.setValue(baibResult.getThk0n().toString());
                        break;
                    case "$15":
                        textElement.setValue(baibResult.getBh1().toString());
                        break;
                    case "$19":
                        textElement.setValue(baibResult.getBfn().toString());
                        break;
                    case "$20":
                        textElement.setValue(baibResult.getThkfn().toString());
                        break;
                    case "$25":
                        textElement.setValue(baibResult.getBh2().toString());
                        break;
                    case "$103":
                        textElement.setValue(baibResult.getBsn().toString());
                        break;
                    case "$104":
                        textElement.setValue(baibResult.getThksn().toString());
                        break;
                    case "$123":
                        textElement.setValue(baibResult.getBh3().toString());
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
     * baj
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bajResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBAJ(String baseFileName, BAJDocx bajResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/b/a/j/BAJ.docx";

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
                        textElement.setValue(bajResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bajResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bajResult.getPs().toString());
                        break;

                    case "$$004":
                        textElement.setValue(bajResult.getGm());
                        break;
                    case "$$005":
                        textElement.setValue(bajResult.getDg().toString());
                        break;

                    case "$$006":
                        textElement.setValue(bajResult.getBstd());
                        break;
                    case "$$007":
                        textElement.setValue(bajResult.getBname());
                        break;
                    case "$$008":
                        textElement.setValue("M" + (int) bajResult.getSdb().doubleValue());
                        break;
                    case "$$009":
                        textElement.setValue(bajResult.getDm().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bajResult.getBdb().toString());
                        break;
                    case "$$011":
                        textElement.setValue(bajResult.getLf().toString());
                        break;

                    case "$$012":
                        textElement.setValue(bajResult.getFstd());
                        break;
                    case "$$013":
                        textElement.setValue(bajResult.getFname());
                        break;
                    case "$$014":
                        textElement.setValue(bajResult.getThkn().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bajResult.getCf2().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bajResult.getLa().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bajResult.getLe().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bajResult.getLd().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bajResult.getDi().toString());
                        break;

                    case "$$020":
                        textElement.setValue(bajResult.getTest());
                        break;

                    case "$$021":
                        textElement.setValue(bajResult.getDensityf().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bajResult.getRfel().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bajResult.getOft().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bajResult.getOf().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bajResult.getCf1().toString());
                        break;

                    case "$$026":
                        textElement.setValue(bajResult.getDensityb().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bajResult.getRbel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bajResult.getObt().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bajResult.getOb().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bajResult.getCb1().toString());
                        break;

                    case "$$031":
                        textElement.setValue(bajResult.getM().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bajResult.getY().toString());
                        break;

                    case "$$033":
                        textElement.setValue(bajResult.getPc().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bajResult.getCf().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bajResult.getThkf().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bajResult.getD().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bajResult.getBo().toString());
                        break;

                    case "$$038":
                        textElement.setValue(bajResult.getB().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bajResult.getFg().toString());
                        break;

                    case "$$040":
                        textElement.setValue(bajResult.getTwob().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bajResult.getFp().toString());
                        break;

                    case "$$042":
                        textElement.setValue(bajResult.getLfmin().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bajResult.getLfmax().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bajResult.getLfchk());
                        break;

                    case "$$045":
                        textElement.setValue(bajResult.getWa().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bajResult.getAa().toString());
                        break;

                    case "$$047":
                        textElement.setValue(bajResult.getLt().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bajResult.getLp().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bajResult.getLr().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bajResult.getFd().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bajResult.getFt().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bajResult.getFr().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bajResult.getF().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bajResult.getWp().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bajResult.getAp().toString());
                        break;

                    case "$$056":
                        textElement.setValue(bajResult.getAm().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bajResult.getDmin().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bajResult.getAb().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bajResult.getAbchk());
                        break;

                    case "$$060":
                        textElement.setValue(bajResult.getLamin().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bajResult.getLachk());
                        break;
                    case "$$062":
                        textElement.setValue(bajResult.getLemin().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bajResult.getLechk());
                        break;
                    case "$$064":
                        textElement.setValue(bajResult.getMo().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bajResult.getThkfc().toString());
                        break;
                    case "$$066":
                        textElement.setValue(bajResult.getThkfchk());
                        break;

                    case "$$067":
                        textElement.setValue(bajResult.getEta().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bajResult.getPft().toString());
                        break;
                    case "$$069":
                        textElement.setValue(bajResult.getPbt().toString());
                        break;
                    case "$$070":
                        textElement.setValue(bajResult.getPt().toString());
                        break;

                    case "$05":
                        textElement.setValue(bajResult.getDg().toString());
                        break;
                    case "$10":
                        textElement.setValue(bajResult.getBdb().toString());
                        break;
                    case "$11":
                        textElement.setValue(bajResult.getLf().toString());
                        break;
                    case "$14":
                        textElement.setValue(bajResult.getThkn().toString());
                        break;
                    case "$16":
                        textElement.setValue(bajResult.getLa().toString());
                        break;
                    case "$17":
                        textElement.setValue(bajResult.getLe().toString());
                        break;
                    case "$18":
                        textElement.setValue(bajResult.getLd().toString());
                        break;
                    case "$19":
                        textElement.setValue(bajResult.getDi().toString());
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