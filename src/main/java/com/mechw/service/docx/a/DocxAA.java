package com.mechw.service.docx.a;

import com.mechw.model.front.a.a.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

public class DocxAA extends DocxTool {

    /**
     * aaaa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aaaaResult   计算数据结果
     * @return 计算书 URL
     */
    public static String getAAAA(String baseFileName, AAAADocx aaaaResult) {

        String template;
        if (aaaaResult.getIdod().equals("内径")) {
            template = "D:/mechw/static/west/cal/a/a/a/a/AAAA_ID.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/a/a/AAAA_OD.docx";
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
                        textElement.setValue(aaaaResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aaaaResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aaaaResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aaaaResult.getStd());
                        break;
                    case "$$005":
                        textElement.setValue(aaaaResult.getName());
                        break;
                    case "$$006":
                        textElement.setValue(aaaaResult.getC2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aaaaResult.getFai().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aaaaResult.getTest());
                        break;
                    case "$$009":
                        textElement.setValue(aaaaResult.getDi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aaaaResult.getThkn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aaaaResult.getL().toString());
                        break;

                    case "$$012":
                        textElement.setValue(aaaaResult.getD().toString());
                        break;
                    case "$$013":
                        textElement.setValue(aaaaResult.getRel().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aaaaResult.getC1().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aaaaResult.getOt().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aaaaResult.getO().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aaaaResult.getOt1() < 0 ? "/" : aaaaResult.getOt1().toString());
                        break;

                    case "$$018":
                        textElement.setValue(aaaaResult.getC().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aaaaResult.getThke().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aaaaResult.getDout().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aaaaResult.getPc().toString());
                        break;

                    case "$$022":
                        textElement.setValue(aaaaResult.getThkc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aaaaResult.getThkMinimum().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aaaaResult.getThkd().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aaaaResult.getThkChk());
                        break;
                    case "$$026":
                        textElement.setValue(aaaaResult.getoAct().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aaaaResult.getoActAllow().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aaaaResult.getoActChk());
                        break;

                    case "$$029":
                        textElement.setValue(aaaaResult.getEta().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aaaaResult.getPt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aaaaResult.getoTest().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aaaaResult.getZeta().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aaaaResult.getoTestAllow().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aaaaResult.getoTestChk());
                        break;

                    case "$$035":
                        textElement.setValue(aaaaResult.getMawp().toString());
                        break;

                    case "$$036":
                        textElement.setValue(aaaaResult.getAi().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aaaaResult.getAo().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aaaaResult.getVi().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aaaaResult.getM().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + aaaaResult.getDi().toString());
                        break;
                    case "$10":
                        textElement.setValue(aaaaResult.getThkn().toString());
                        break;
                    case "$11":
                        textElement.setValue(aaaaResult.getL().toString());
                        break;
                    case "$20":
                        textElement.setValue("Φ" + aaaaResult.getDout().toString());
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
     * aaab
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aaabResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAAB(String baseFileName, AAABDocx aaabResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/a/a/b/AAAB.docx";

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
                        textElement.setValue(aaabResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aaabResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aaabResult.getPs().toString());
                        break;

                    case "$$004":
                        textElement.setValue(aaabResult.getStds());
                        break;
                    case "$$005":
                        textElement.setValue(aaabResult.getNames());
                        break;
                    case "$$006":
                        textElement.setValue(aaabResult.getDsi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aaabResult.getThksn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aaabResult.getCs2().toString());
                        break;

                    case "$$009":
                        textElement.setValue(aaabResult.getStdc());
                        break;
                    case "$$010":
                        textElement.setValue(aaabResult.getNamec());
                        break;
                    case "$$011":
                        textElement.setValue(aaabResult.getN().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aaabResult.getThkcn().toString());
                        break;

                    case "$$013":
                        textElement.setValue(aaabResult.getTest());
                        break;

                    case "$$014":
                        textElement.setValue(aaabResult.getDs().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aaabResult.getCs1().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aaabResult.getRsel().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aaabResult.getOst().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aaabResult.getOs().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aaabResult.getOst1() < 0 ? "/" : aaabResult.getOst1().toString());
                        break;

                    case "$$020":
                        textElement.setValue(aaabResult.getDc().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aaabResult.getCc1().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aaabResult.getRcel().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aaabResult.getOct().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aaabResult.getOc().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aaabResult.getOct1() < 0 ? "/" : aaabResult.getOct1().toString());
                        break;

                    case "$$026":
                        textElement.setValue(aaabResult.getPc().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aaabResult.getCs().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aaabResult.getThkse().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aaabResult.getFais().toString());
                        break;

                    case "$$030":
                        textElement.setValue(aaabResult.getThk0n().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aaabResult.getFaic().toString());
                        break;

                    case "$$032":
                        textElement.setValue(aaabResult.getThkn().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aaabResult.getThke().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aaabResult.getOtfai().toString());
                        break;

                    case "$$035":
                        textElement.setValue(aaabResult.getThkc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aaabResult.getThkd().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aaabResult.getThkchk());
                        break;
                    case "$$038":
                        textElement.setValue(aaabResult.getOact().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aaabResult.getOactchk());
                        break;

                    case "$$040":
                        textElement.setValue(aaabResult.getEta().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aaabResult.getPt().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aaabResult.getOtest().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aaabResult.getZeta().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aaabResult.getOtestallow().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aaabResult.getOtestchk());
                        break;

                    case "$$046":
                        textElement.setValue(aaabResult.getMawp().toString());
                        break;

                    case "$06":
                        textElement.setValue("Φ" + aaabResult.getDsi().toString());
                        break;
                    case "$07":
                        textElement.setValue(aaabResult.getThksn().toString());
                        break;
                    case "$12":
                        textElement.setValue(aaabResult.getThkcn().toString());
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
     * aab
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aabResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAB(String baseFileName, AABDocx aabResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (aabResult.getIdod().equals("内径")) {
            template = "D:/mechw/static/west/cal/a/a/b/AAB_ID.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/b/AAB_OD.docx";
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
                        textElement.setValue(aabResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aabResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aabResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aabResult.getTest());
                        break;
                    case "$$005":
                        textElement.setValue(aabResult.getC2().toString());
                        break;
                    case "$$006":
                        textElement.setValue(aabResult.getFai().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aabResult.getStd());
                        break;
                    case "$$008":
                        textElement.setValue(aabResult.getName());
                        break;
                    case "$$009":
                        textElement.setValue(aabResult.getDi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aabResult.getHi().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aabResult.getThkn().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aabResult.getH().toString());
                        break;

                    case "$$013":
                        textElement.setValue(aabResult.getD().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aabResult.getRel().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aabResult.getC1().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aabResult.getOt().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aabResult.getO().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aabResult.getOt1() < 0 ? "/" : aabResult.getOt1().toString());
                        break;

                    case "$$019":
                        textElement.setValue(aabResult.getPc().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aabResult.getC().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aabResult.getThke().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aabResult.getDout().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aabResult.getHo().toString());
                        break;

                    case "$$024":
                        textElement.setValue(aabResult.getK().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aabResult.getThkc().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aabResult.getThkMin().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aabResult.getThkMinimum().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aabResult.getThkd().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aabResult.getThkChk());
                        break;
                    case "$$030":
                        textElement.setValue(aabResult.getoAct().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aabResult.getOtfai().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aabResult.getoActChk());
                        break;

                    case "$$033":
                        textElement.setValue(aabResult.getEta().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aabResult.getPt().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aabResult.getoTest().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aabResult.getZeta().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aabResult.getOTestAllow().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aabResult.getOTestChk());
                        break;

                    case "$$039":
                        textElement.setValue(aabResult.getMawp().toString());
                        break;

                    case "$$040":
                        textElement.setValue(aabResult.getAi().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aabResult.getAo().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aabResult.getVi().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aabResult.getM().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + aabResult.getDi().toString());
                        break;
                    case "$10":
                        textElement.setValue(aabResult.getHi().toString());
                        break;
                    case "$11":
                        textElement.setValue(aabResult.getThkn().toString());
                        break;
                    case "$12":
                        textElement.setValue(aabResult.getH().toString());
                        break;

                    case "$22":
                        textElement.setValue("Φ" + aabResult.getDout().toString());
                        break;
                    case "$23":
                        textElement.setValue(aabResult.getHo().toString());
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
     * aac
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aacResult    计算数据结果
     * @return 计算书 URL
     */
    public static String getAAC(String baseFileName, AACDocx aacResult) {

        String template;
        if (aacResult.getIdod().equals("内径")) {
            template = "D:/mechw/static/west/cal/a/a/c/AAC_ID.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/c/AAC_OD.docx";
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
                        textElement.setValue(aacResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aacResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aacResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aacResult.getDi().toString());
                        break;
                    case "$$005":
                        textElement.setValue(aacResult.getH().toString());
                        break;
                    case "$$006":
                        textElement.setValue(aacResult.getThkn().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aacResult.getStd());
                        break;
                    case "$$008":
                        textElement.setValue(aacResult.getName());
                        break;
                    case "$$009":
                        textElement.setValue(aacResult.getC2().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aacResult.getFai().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aacResult.getTest());
                        break;

                    case "$$012":
                        textElement.setValue(aacResult.getD().toString());
                        break;
                    case "$$013":
                        textElement.setValue(aacResult.getRel().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aacResult.getC1().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aacResult.getOt().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aacResult.getO().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aacResult.getOt1() < 0 ? "/" : aacResult.getOt1().toString());
                        break;

                    case "$$018":
                        textElement.setValue(aacResult.getPc().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aacResult.getC().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aacResult.getThke().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aacResult.getDout().toString());
                        break;

                    case "$$022":
                        textElement.setValue(aacResult.getThkc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aacResult.getThkMinimum().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aacResult.getThkd().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aacResult.getThkChk());
                        break;
                    case "$$026":
                        textElement.setValue(aacResult.getoAct().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aacResult.getoActAllow().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aacResult.getoActChk());
                        break;

                    case "$$029":
                        textElement.setValue(aacResult.getEta().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aacResult.getPt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aacResult.getoTest().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aacResult.getZeta().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aacResult.getoTestAllow().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aacResult.getoTestChk());
                        break;

                    case "$$035":
                        textElement.setValue(aacResult.getMawp().toString());
                        break;

                    case "$$036":
                        textElement.setValue(aacResult.getAi().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aacResult.getAo().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aacResult.getVi().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aacResult.getM().toString());
                        break;

                    case "$04":
                        textElement.setValue("Φ" + aacResult.getDi().toString());
                        break;
                    case "$05":
                        textElement.setValue(aacResult.getH().toString());
                        break;
                    case "$06":
                        textElement.setValue(aacResult.getThkn().toString());
                        break;
                    case "$21":
                        textElement.setValue("Φ" + aacResult.getDout().toString());
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
     * aad
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aadResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAD(String baseFileName, AADDocx aadResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (aadResult.getIdod().equals("内径")) {
            template = "D:/mechw/static/west/cal/a/a/d/AAD_ID.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/d/AAD_OD.docx";
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
                        textElement.setValue(aadResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aadResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aadResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aadResult.getDi().toString());
                        break;
                    case "$$005":
                        textElement.setValue(aadResult.getBri().toString());
                        break;
                    case "$$006":
                        textElement.setValue(aadResult.getSri().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aadResult.getH().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aadResult.getThkn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aadResult.getStd());
                        break;
                    case "$$010":
                        textElement.setValue(aadResult.getName());
                        break;
                    case "$$011":
                        textElement.setValue(aadResult.getC2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aadResult.getFai().toString());
                        break;
                    case "$$013":
                        textElement.setValue(aadResult.getTest());
                        break;

                    case "$$014":
                        textElement.setValue(aadResult.getD().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aadResult.getRel().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aadResult.getC1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aadResult.getOt().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aadResult.getO().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aadResult.getOt1() < 0 ? "/" : aadResult.getOt1().toString());
                        break;

                    case "$$020":
                        textElement.setValue(aadResult.getPc().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aadResult.getC().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aadResult.getThke().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aadResult.getDout().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aadResult.getBro().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aadResult.getSro().toString());
                        break;

                    case "$$026":
                        textElement.setValue(aadResult.getM().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aadResult.getThkc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aadResult.getThkm().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aadResult.getThkMinimum().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aadResult.getThkd().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aadResult.getThkChk());
                        break;
                    case "$$032":
                        textElement.setValue(aadResult.getoAct().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aadResult.getoActAllow().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aadResult.getoActChk());
                        break;

                    case "$$035":
                        textElement.setValue(aadResult.getEta().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aadResult.getPt().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aadResult.getoTest().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aadResult.getZeta().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aadResult.getoTestAllow().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aadResult.getoTestChk());
                        break;

                    case "$$041":
                        textElement.setValue(aadResult.getMawp().toString());
                        break;

                    case "$$042":
                        textElement.setValue(aadResult.getHi().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aadResult.getAi().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aadResult.getAo().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aadResult.getHo().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aadResult.getVi().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aadResult.getMass().toString());
                        break;

                    case "$04":
                        textElement.setValue("Φ" + aadResult.getDi().toString());
                        break;
                    case "$23":
                        textElement.setValue("Φ" + aadResult.getDout().toString());
                        break;
                    case "$05":
                        textElement.setValue("R" + aadResult.getBri().toString());
                        break;
                    case "$06":
                        textElement.setValue("R" + aadResult.getSri().toString());
                        break;
                    case "$24":
                        textElement.setValue("R" + aadResult.getBro().toString());
                        break;
                    case "$25":
                        textElement.setValue("R" + aadResult.getSro().toString());
                        break;
                    case "$07":
                        textElement.setValue(aadResult.getH().toString());
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
     * aae
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aaeDocx      计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAE(String baseFileName, AAEDocx aaeDocx) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (aaeDocx.getType().equals("端封头")) {
            template = "D:/mechw/static/west/cal/a/a/e/AAE_END.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/e/AAE_MID.docx";
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
                        textElement.setValue(aaeDocx.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aaeDocx.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aaeDocx.getPs().toString());
                        break;

                    case "$$004":
                        textElement.setValue(aaeDocx.getDi().toString());
                        break;
                    case "$$005":
                        textElement.setValue(aaeDocx.getThksn().toString());
                        break;
                    case "$$006":
                        textElement.setValue(aaeDocx.getCs2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aaeDocx.getFais().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aaeDocx.getSstd());
                        break;
                    case "$$009":
                        textElement.setValue(aaeDocx.getSname());
                        break;

                    case "$$010":
                        textElement.setValue(aaeDocx.getRi().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aaeDocx.getThkcn().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aaeDocx.getCc2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(aaeDocx.getFaic().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aaeDocx.getCstd());
                        break;
                    case "$$015":
                        textElement.setValue(aaeDocx.getCname());
                        break;

                    case "$$016":
                        textElement.setValue(aaeDocx.getThkrn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aaeDocx.getTest());
                        break;

                    case "$$018":
                        textElement.setValue(aaeDocx.getDc().toString());
                        break;

                    case "$$019":
                        textElement.setValue(aaeDocx.getOct().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aaeDocx.getOc().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aaeDocx.getRcrel().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aaeDocx.getOct1() < 0 ? "/" : aaeDocx.getOct1().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aaeDocx.getCc1().toString());
                        break;

                    case "$$024":
                        textElement.setValue(aaeDocx.getOcrt().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aaeDocx.getOcr().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aaeDocx.getRcrrel().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aaeDocx.getOcrt1() < 0 ? "/" : aaeDocx.getOcrt1().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aaeDocx.getCcr1().toString());
                        break;

                    case "$$029":
                        textElement.setValue(aaeDocx.getDs().toString());
                        break;

                    case "$$030":
                        textElement.setValue(aaeDocx.getOst().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aaeDocx.getOs().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aaeDocx.getRsrel().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aaeDocx.getOst1() < 0 ? "/" : aaeDocx.getOst1().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aaeDocx.getCs1().toString());
                        break;

                    case "$$035":
                        textElement.setValue(aaeDocx.getOsrt().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aaeDocx.getOsr().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aaeDocx.getRsrrel().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aaeDocx.getOsrt1() < 0 ? "/" : aaeDocx.getOsrt1().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aaeDocx.getCsr1().toString());
                        break;

                    case "$$040":
                        textElement.setValue(aaeDocx.getPc().toString());
                        break;

                    case "$$041":
                        textElement.setValue(aaeDocx.getCc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aaeDocx.getThkce().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aaeDocx.getThkcc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aaeDocx.getThkcd().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aaeDocx.getThkcchk());
                        break;

                    case "$$046":
                        textElement.setValue(aaeDocx.getCs().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aaeDocx.getThkse().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aaeDocx.getThksc().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aaeDocx.getThksd().toString());
                        break;
                    case "$$050":
                        textElement.setValue(aaeDocx.getThkschk());
                        break;

                    case "$$051":
                        textElement.setValue(aaeDocx.getCr2().toString());
                        break;
                    case "$$052":
                        textElement.setValue(aaeDocx.getCr1().toString());
                        break;
                    case "$$053":
                        textElement.setValue(aaeDocx.getCr().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aaeDocx.getRidi().toString());
                        break;
                    case "$$055":
                        textElement.setValue(aaeDocx.getThksrc().toString());
                        break;
                    case "$$056":
                        textElement.setValue(aaeDocx.getThksrc2di().toString());
                        break;
                    case "$$057":
                        textElement.setValue(aaeDocx.getPcosrtes().toString());
                        break;
                    case "$$058":
                        textElement.setValue(aaeDocx.getQ().toString());
                        break;
                    case "$$059":
                        textElement.setValue(aaeDocx.getThkrc().toString());
                        break;
                    case "$$060":
                        textElement.setValue(aaeDocx.getThkrd().toString());
                        break;
                    case "$$061":
                        textElement.setValue(aaeDocx.getThkrchk());
                        break;
                    case "$$062":
                        textElement.setValue(aaeDocx.getL().toString());
                        break;

                    case "$$063":
                        textElement.setValue(aaeDocx.getEta().toString());
                        break;
                    case "$$064":
                        textElement.setValue(aaeDocx.getPct().toString());
                        break;
                    case "$$065":
                        textElement.setValue(aaeDocx.getPcrt().toString());
                        break;
                    case "$$066":
                        textElement.setValue(aaeDocx.getPst().toString());
                        break;
                    case "$$067":
                        textElement.setValue(aaeDocx.getPsrt().toString());
                        break;
                    case "$$068":
                        textElement.setValue(aaeDocx.getPt().toString());
                        break;

                    case "$$069":
                        textElement.setValue(aaeDocx.getMawpc().toString());
                        break;
                    case "$$070":
                        textElement.setValue(aaeDocx.getMawps().toString());
                        break;
                    case "$$071":
                        textElement.setValue(aaeDocx.getMawpr().toString());
                        break;
                    case "$$072":
                        textElement.setValue(aaeDocx.getMawp().toString());
                        break;

                    case "$04":
                        textElement.setValue("Φ" + aaeDocx.getDi().toString());
                        break;
                    case "$05":
                        textElement.setValue(aaeDocx.getThksn().toString());
                        break;
                    case "$10":
                        textElement.setValue("SR" + aaeDocx.getRi().toString());
                        break;
                    case "$11":
                        textElement.setValue(aaeDocx.getThkcn().toString());
                        break;
                    case "$16":
                        textElement.setValue(aaeDocx.getThkrn().toString());
                        break;
                    case "$62":
                        textElement.setValue(aaeDocx.getL().toString());
                        break;
                    case "$100":
                        textElement.setValue(">=" + 2 * aaeDocx.getThkrn());
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
     * aafa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aafaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFA(String baseFileName, AAFADocx aafaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (aafaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/a/f/a/AAFAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/f/a/AAFAG.docx";
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

                        textElement.setValue(aafaResult.getDesignPressure().toString());

                        break;
                    case "$$002":

                        textElement.setValue(aafaResult.getDesignTemp().toString());

                        break;
                    case "$$003":

                        textElement.setValue(aafaResult.getStaticPressure().toString());

                        break;
                    case "$$004":

                        textElement.setValue(aafaResult.getStd());

                        break;
                    case "$$005":

                        textElement.setValue(aafaResult.getName());

                        break;
                    case "$$006":

                        textElement.setValue(aafaResult.getC2().toString());

                        break;
                    case "$$007":

                        textElement.setValue(aafaResult.getE().toString());

                        break;
                    case "$$008":

                        textElement.setValue(aafaResult.getLargeInnerDiameter().toString());

                        break;
                    case "$$009":

                        textElement.setValue(aafaResult.getSmallInnerDiameter().toString());

                        break;
                    case "$$010":

                        textElement.setValue(aafaResult.getA().toString());

                        break;
                    case "$$011":

                        textElement.setValue(aafaResult.getThkn().toString());

                        break;
                    case "$$012":

                        textElement.setValue(aafaResult.getDensity().toString());

                        break;
                    case "$$013":

                        textElement.setValue(aafaResult.getDesignStress().toString());

                        break;
                    case "$$014":

                        textElement.setValue(aafaResult.getTestRel().toString());

                        break;
                    case "$$015":

                        textElement.setValue(aafaResult.getTestStress().toString());

                        break;
                    case "$$016":

                        textElement.setValue(aafaResult.getC1().toString());

                        break;
                    case "$$017":

                        textElement.setValue(aafaResult.getTagStress() < 0 ? "/" : aafaResult.getTagStress().toString());

                        break;
                    case "$$018":

                        textElement.setValue(aafaResult.getC().toString());

                        break;
                    case "$$019":

                        textElement.setValue(aafaResult.getThke().toString());

                        break;
                    case "$$020":
                        textElement.setValue(aafaResult.getCalPressure().toString());

                        break;
                    case "$$021":

                        textElement.setValue(aafaResult.getThkc().toString());

                        break;
                    case "$$022":

                        textElement.setValue(aafaResult.getThkd().toString());

                        break;
                    case "$$023":

                        textElement.setValue(aafaResult.getThkChk());

                        break;
                    case "$$024":

                        textElement.setValue(aafaResult.getTestPressure().toString());

                        break;
                    case "$$025":

                        textElement.setValue(aafaResult.getMawp().toString());

                        break;
                    case "$$026":

                        textElement.setValue(aafaResult.getAi().toString());

                        break;
                    case "$$027":

                        textElement.setValue(aafaResult.getVi().toString());

                        break;
                    case "$$028":

                        textElement.setValue(aafaResult.getAo().toString());

                        break;
                    case "$$029":

                        textElement.setValue(aafaResult.getM().toString());

                        break;
                    case "$01":

                        textElement.setValue("Φ" + aafaResult.getLargeInnerDiameter().toString());

                        break;
                    case "$02":

                        textElement.setValue("Φ" + aafaResult.getSmallInnerDiameter().toString());

                        break;
                    case "$03":

                        textElement.setValue(aafaResult.getA().toString() + "°");

                        break;
                    case "$04":

                        textElement.setValue(aafaResult.getThkn().toString());

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
     * aafb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aafbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFB(String baseFileName, AAFBDocx aafbResult) {

        // 根据试验类型确定要使用的文件模板
        String template;

        if (aafbResult.getTest().equals("气压试验")) {
            if (aafbResult.getPcoctecchk().equals("否")) {
                if (aafbResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_NoInner.docx";
                } else if (aafbResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_NoInner_NoAxial.docx";
                } else if (aafbResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_NoInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_NoInner_YesAxial_YesRing.docx";
                }
            } else {
                if (aafbResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_YesInner.docx";
                } else if (aafbResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_YesInner_NoAxial.docx";
                } else if (aafbResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_YesInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBG_YesInner_YesAxial_YesRing.docx";
                }
            }
        } else {
            if (aafbResult.getPcoctecchk().equals("否")) {
                if (aafbResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_NoInner.docx";
                } else if (aafbResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_NoInner_NoAxial.docx";
                } else if (aafbResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_NoInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_NoInner_YesAxial_YesRing.docx";
                }
            } else {
                if (aafbResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_YesInner.docx";
                } else if (aafbResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_YesInner_NoAxial.docx";
                } else if (aafbResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_YesInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/b/AAFBL_YesInner_YesAxial_YesRing.docx";
                }
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
                        textElement.setValue(aafbResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aafbResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aafbResult.getPs().toString());
                        break;

                    case "$$004":
                        textElement.setValue(aafbResult.getStdc());
                        break;
                    case "$$005":
                        textElement.setValue(aafbResult.getNamec());
                        break;
                    case "$$006":
                        textElement.setValue(aafbResult.getDbi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aafbResult.getAlpha().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aafbResult.getThkcn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aafbResult.getCc2().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aafbResult.getEc().toString());
                        break;

                    case "$$011":
                        textElement.setValue(aafbResult.getStds());
                        break;
                    case "$$012":
                        textElement.setValue(aafbResult.getNames());
                        break;
                    case "$$013":
                        textElement.setValue(aafbResult.getThksn().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aafbResult.getCs2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aafbResult.getEs().toString());
                        break;

                    case "$$016":
                        textElement.setValue(aafbResult.getTest());
                        break;

                    case "$$017":
                        textElement.setValue(aafbResult.getDc().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aafbResult.getRcel().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aafbResult.getCc1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aafbResult.getOct().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aafbResult.getOc().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aafbResult.getOct1() < 0 ? "/" : aafbResult.getOct1().toString());
                        break;

                    case "$$023":
                        textElement.setValue(aafbResult.getDs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aafbResult.getRsel().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aafbResult.getCs1().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aafbResult.getOst().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aafbResult.getOs().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aafbResult.getOst1() < 0 ? "/" : aafbResult.getOst1().toString());
                        break;

                    case "$$029":
                        textElement.setValue(aafbResult.getPc().toString());
                        break;

                    case "$$030":
                        textElement.setValue(aafbResult.getCs().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aafbResult.getThkse().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aafbResult.getDsi().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aafbResult.getDso().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aafbResult.getDsm().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aafbResult.getRsm().toString());
                        break;

                    case "$$036":
                        textElement.setValue(aafbResult.getCc().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aafbResult.getThkce().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aafbResult.getDbc().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aafbResult.getDbo().toString());
                        break;

                    case "$$040":
                        textElement.setValue(aafbResult.getThksc().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aafbResult.getThksd().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aafbResult.getThkschk());
                        break;

                    case "$$043":
                        textElement.setValue(aafbResult.getThkcc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aafbResult.getThkcd().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aafbResult.getThkcchk());
                        break;

                    case "$$046":
                        textElement.setValue(aafbResult.getPcoctec().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aafbResult.getPcoctecallow().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aafbResult.getPcoctecchk());
                        break;

                    case "$$049":
                        textElement.setValue(aafbResult.getPcostes().toString());
                        break;
                    case "$$050":
                        textElement.setValue(aafbResult.getDelta().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aafbResult.getIsAxialReinforce());
                        break;

                    case "$$052":
                        textElement.setValue(aafbResult.getPct().toString());
                        break;
                    case "$$053":
                        textElement.setValue(aafbResult.getPst().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aafbResult.getPt().toString());
                        break;

                    case "$$100":
                        textElement.setValue(aafbResult.getFl().toString());
                        break;
                    case "$$101":
                        textElement.setValue(aafbResult.getDbm().toString());
                        break;
                    case "$$102":
                        textElement.setValue(aafbResult.getF1().toString());
                        break;
                    case "$$103":
                        textElement.setValue(aafbResult.getQl().toString());
                        break;
                    case "$$104":
                        textElement.setValue(aafbResult.getK().toString());
                        break;
                    case "$$105":
                        textElement.setValue(aafbResult.getArl().toString());
                        break;
                    case "$$106":
                        textElement.setValue(aafbResult.getAel().toString());
                        break;
                    case "$$107":
                        textElement.setValue(aafbResult.getAchk());
                        break;
                    case "$$108":
                        textElement.setValue(aafbResult.getIsRing());
                        break;

                    case "$$204":
                        textElement.setValue(aafbResult.getA().toString());
                        break;
                    case "$$205":
                        textElement.setValue(aafbResult.getWr().toString());
                        break;
                    case "$$206":
                        textElement.setValue(aafbResult.getLr().toString());
                        break;

                    case "$$300":
                        textElement.setValue(aafbResult.getThkscrsm().toString());
                        break;
                    case "$$301":
                        textElement.setValue(aafbResult.getQ1().toString());
                        break;
                    case "$$302":
                        textElement.setValue(aafbResult.getThkrc().toString());
                        break;
                    case "$$303":
                        textElement.setValue(aafbResult.getThkrd().toString());
                        break;
                    case "$$304":
                        textElement.setValue(aafbResult.getLrc().toString());
                        break;
                    case "$$305":
                        textElement.setValue(aafbResult.getLrs().toString());
                        break;

                    case "$06":
                        textElement.setValue("Φ" + aafbResult.getDbi().toString());
                        break;
                    case "$07":
                        textElement.setValue(aafbResult.getAlpha().toString() + "°");
                        break;
                    case "$08":
                        textElement.setValue(aafbResult.getThkcn().toString());
                        break;
                    case "$13":
                        textElement.setValue(aafbResult.getThksn().toString());
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
     * aafc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aafcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFC(String baseFileName, AAFCDocx aafcResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (aafcResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/a/f/c/AAFCL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/f/c/AAFCG.docx";
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
                        textElement.setValue(aafcResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aafcResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aafcResult.getPs().toString());
                        break;

                    case "$$004":
                        textElement.setValue(aafcResult.getStd());
                        break;
                    case "$$005":
                        textElement.setValue(aafcResult.getName());
                        break;
                    case "$$006":
                        textElement.setValue(aafcResult.getDil().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aafcResult.getR().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aafcResult.getAlpha().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aafcResult.getThkn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aafcResult.getC2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aafcResult.getE().toString());
                        break;

                    case "$$012":
                        textElement.setValue(aafcResult.getTest());
                        break;

                    case "$$013":
                        textElement.setValue(aafcResult.getD().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aafcResult.getRel().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aafcResult.getC1().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aafcResult.getOt().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aafcResult.getO().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aafcResult.getOt1() < 0 ? "/" : aafcResult.getOt1().toString());
                        break;

                    case "$$019":
                        textElement.setValue(aafcResult.getPc().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aafcResult.getC().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aafcResult.getThke().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aafcResult.getRdil().toString());
                        break;

                    case "$$023":
                        textElement.setValue(aafcResult.getK().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aafcResult.getThkrc().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aafcResult.getF().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aafcResult.getThkcc().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aafcResult.getThkd().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aafcResult.getThkchk());
                        break;

                    case "$$029":
                        textElement.setValue(aafcResult.getPt().toString());
                        break;

                    case "$$100":
                        textElement.setValue(aafcResult.getThksc().toString());
                        break;

                    case "$06":
                        textElement.setValue("Φ" + aafcResult.getDil().toString());
                        break;
                    case "$07":
                        textElement.setValue("R" + aafcResult.getR().toString());
                        break;
                    case "$08":
                        textElement.setValue(aafcResult.getAlpha().toString() + "°");
                        break;
                    case "$09":
                        textElement.setValue(aafcResult.getThkn().toString());
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
     * aafd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aafdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFD(String baseFileName, AAFDDocx aafdResult) {

        // 根据试验类型确定要使用的文件模板
        String template;

        if (aafdResult.getTest().equals("气压试验")) {
            if (aafdResult.getAlphachk().equals("否")) {
                if (aafdResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_NoInner.docx";
                } else if (aafdResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_NoInner_NoAxial.docx";
                } else if (aafdResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_NoInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_NoInner_YesAxial_YesRing.docx";
                }
            } else {
                if (aafdResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_YesInner.docx";
                } else if (aafdResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_YesInner_NoAxial.docx";
                } else if (aafdResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_YesInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDG_YesInner_YesAxial_YesRing.docx";
                }
            }
        } else {
            if (aafdResult.getAlphachk().equals("否")) {
                if (aafdResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_NoInner.docx";
                } else if (aafdResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_NoInner_NoAxial.docx";
                } else if (aafdResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_NoInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_NoInner_YesAxial_YesRing.docx";
                }
            } else {
                if (aafdResult.getIsAxial().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_YesInner.docx";
                } else if (aafdResult.getIsAxialReinforce().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_YesInner_NoAxial.docx";
                } else if (aafdResult.getIsRing().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_YesInner_YesAxial_NoRing.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/a/f/d/AAFDL_YesInner_YesAxial_YesRing.docx";
                }
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
                        textElement.setValue(aafdResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aafdResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aafdResult.getPs().toString());
                        break;

                    case "$$004":
                        textElement.setValue(aafdResult.getStdc());
                        break;
                    case "$$005":
                        textElement.setValue(aafdResult.getNamec());
                        break;
                    case "$$006":
                        textElement.setValue(aafdResult.getDbi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aafdResult.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aafdResult.getAlpha().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aafdResult.getThkcn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aafdResult.getCc2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aafdResult.getEc().toString());
                        break;

                    case "$$012":
                        textElement.setValue(aafdResult.getStdp());
                        break;
                    case "$$013":
                        textElement.setValue(aafdResult.getNamep());
                        break;
                    case "$$014":
                        textElement.setValue(aafdResult.getThkpn().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aafdResult.getCp2().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aafdResult.getEp().toString());
                        break;

                    case "$$017":
                        textElement.setValue(aafdResult.getTest());
                        break;

                    case "$$018":
                        textElement.setValue(aafdResult.getDc().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aafdResult.getRcel().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aafdResult.getCc1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aafdResult.getOct().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aafdResult.getOc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aafdResult.getOct1() < 0 ? "/" : aafdResult.getOct1().toString());
                        break;

                    case "$$024":
                        textElement.setValue(aafdResult.getDp().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aafdResult.getRpel().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aafdResult.getCp1().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aafdResult.getOpt().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aafdResult.getOp().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aafdResult.getOpt1() < 0 ? "/" : aafdResult.getOpt1().toString());
                        break;

                    case "$$030":
                        textElement.setValue(aafdResult.getPc().toString());
                        break;

                    case "$$031":
                        textElement.setValue(aafdResult.getCp().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aafdResult.getThkpe().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aafdResult.getDpi().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aafdResult.getDpo().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aafdResult.getDpm().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aafdResult.getRpm().toString());
                        break;

                    case "$$037":
                        textElement.setValue(aafdResult.getCc().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aafdResult.getThkce().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aafdResult.getDbc().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aafdResult.getDso().toString());
                        break;

                    case "$$041":
                        textElement.setValue(aafdResult.getThkpc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aafdResult.getThkpd().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aafdResult.getThkpchk());
                        break;

                    case "$$044":
                        textElement.setValue(aafdResult.getThkcc().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aafdResult.getThkcd().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aafdResult.getThkcchk());
                        break;

                    case "$$047":
                        textElement.setValue(aafdResult.getPcoctec().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aafdResult.getAlphaAllow().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aafdResult.getAlphachk());
                        break;

                    case "$$050":
                        textElement.setValue(aafdResult.getPct().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aafdResult.getPpt().toString());
                        break;
                    case "$$052":
                        textElement.setValue(aafdResult.getPt().toString());
                        break;

                    case "$$300":
                        textElement.setValue(aafdResult.getFs().toString());
                        break;
                    case "$$301":
                        textElement.setValue(aafdResult.getDsm().toString());
                        break;
                    case "$$302":
                        textElement.setValue(aafdResult.getF2().toString());
                        break;
                    case "$$303":
                        textElement.setValue(aafdResult.getQs().toString());
                        break;
                    case "$$304":
                        textElement.setValue(aafdResult.getK().toString());
                        break;
                    case "$$305":
                        textElement.setValue(aafdResult.getArs().toString());
                        break;
                    case "$$306":
                        textElement.setValue(aafdResult.getAes().toString());
                        break;
                    case "$$307":
                        textElement.setValue(aafdResult.getAchk());
                        break;
                    case "$$308":
                        textElement.setValue(aafdResult.getIsRing());
                        break;

                    case "$$200":
                        textElement.setValue(aafdResult.getPcoptep().toString());
                        break;
                    case "$$201":
                        textElement.setValue(aafdResult.getDelta().toString());
                        break;
                    case "$$202":
                        textElement.setValue(aafdResult.getIsAxialReinforce());
                        break;

                    case "$$400":
                        textElement.setValue(aafdResult.getA().toString());
                        break;
                    case "$$401":
                        textElement.setValue(aafdResult.getWr().toString());
                        break;
                    case "$$402":
                        textElement.setValue(aafdResult.getLr().toString());
                        break;

                    case "$$100":
                        textElement.setValue(aafdResult.getThkpcrpm().toString());
                        break;
                    case "$$101":
                        textElement.setValue(aafdResult.getQ2().toString());
                        break;
                    case "$$102":
                        textElement.setValue(aafdResult.getThkrc().toString());
                        break;
                    case "$$103":
                        textElement.setValue(aafdResult.getThkrd().toString());
                        break;
                    case "$$104":
                        textElement.setValue(aafdResult.getLrc().toString());
                        break;
                    case "$$105":
                        textElement.setValue(aafdResult.getLrs().toString());
                        break;

                    case "$06":
                        textElement.setValue("Φ" + aafdResult.getDbi().toString());
                        break;
                    case "$07":
                        textElement.setValue("Φ" + aafdResult.getDsi().toString());
                        break;
                    case "$08":
                        textElement.setValue(aafdResult.getAlpha().toString() + "°");
                        break;
                    case "$09":
                        textElement.setValue(aafdResult.getThkcn().toString());
                        break;
                    case "$14":
                        textElement.setValue(aafdResult.getThkpn().toString());
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
     * aafe
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aafeResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFE(String baseFileName, AAFEDocx aafeResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (aafeResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/a/f/e/AAFEL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/f/e/AAFEG.docx";
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
                        textElement.setValue(aafeResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aafeResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aafeResult.getPs().toString());
                        break;

                    case "$$004":
                        textElement.setValue(aafeResult.getStd());
                        break;
                    case "$$005":
                        textElement.setValue(aafeResult.getName());
                        break;
                    case "$$006":
                        textElement.setValue(aafeResult.getDbi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aafeResult.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aafeResult.getThkn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aafeResult.getAlpha().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aafeResult.getR().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aafeResult.getC2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aafeResult.getE().toString());
                        break;

                    case "$$013":
                        textElement.setValue(aafeResult.getTest());
                        break;

                    case "$$014":
                        textElement.setValue(aafeResult.getD().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aafeResult.getRel().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aafeResult.getC1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aafeResult.getOt().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aafeResult.getO().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aafeResult.getOt1() < 0 ? "/" : aafeResult.getOt1().toString());
                        break;

                    case "$$020":
                        textElement.setValue(aafeResult.getPc().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aafeResult.getC().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aafeResult.getThke().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aafeResult.getRsm().toString());
                        break;

                    case "$$024":
                        textElement.setValue(aafeResult.getThksc().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aafeResult.getThkcc().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aafeResult.getThkscrsm().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aafeResult.getQ2().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aafeResult.getThkrc().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aafeResult.getThkd().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aafeResult.getThkchk());
                        break;

                    case "$$031":
                        textElement.setValue(aafeResult.getLrc().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aafeResult.getLrs().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aafeResult.getPt().toString());
                        break;

                    case "$06":
                        textElement.setValue("Φ" + aafeResult.getDbi().toString());
                        break;
                    case "$07":
                        textElement.setValue("Φ" + aafeResult.getDsi().toString());
                        break;
                    case "$08":
                        textElement.setValue(aafeResult.getThkn().toString());
                        break;
                    case "$09":
                        textElement.setValue(aafeResult.getAlpha().toString() + "°");
                        break;
                    case "$10":
                        textElement.setValue("R" + aafeResult.getR().toString());
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
     * aaff
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aaffResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFF(String baseFileName, AAFFDocx aaffResult) {

        // 根据试验类型确定要使用的文件模板
        String template;

        // 大端不进行内压加强计算
        if (aaffResult.getPcoctecchk().equals("否")) {

            // 大端没有轴向载荷
            if (aaffResult.getIsSAxial().equals("否")) {

                // 小端没有内压加强计算
                if (aaffResult.getAlphachk().equals("否")) {

                    // 小端没有轴向载荷
                    if (aaffResult.getIsPAxial().equals("否")) {
                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_NI_NA.docx";
                    }

                    // 小端有轴向载荷
                    else {

                        // 小端轴向载荷不进行加强计算
                        if (aaffResult.getDeltapchk().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_NI_YA_NC.docx";
                        }

                        // 小端轴向载荷进行加强计算
                        else {

                            // 小端轴向载荷无需加强圈
                            if (aaffResult.getApchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_NI_YA_YC_NR.docx";
                            }

                            // 小端轴向载荷需要加强圈
                            else {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_NI_YA_YC_YR.docx";
                            }
                        }
                    }
                }

                // 小端有内压加强计算
                else {

                    // 小端没有轴向载荷
                    if (aaffResult.getIsPAxial().equals("否")) {
                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_YI_NA.docx";
                    }

                    // 小端有轴向载荷
                    else {

                        // 小端轴向载荷不进行加强计算
                        if (aaffResult.getDeltapchk().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_YI_YA_NC.docx";
                        }

                        // 小端轴向载荷进行加强计算
                        else {

                            // 小端轴向载荷无需加强圈
                            if (aaffResult.getApchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_YI_YA_YC_NR.docx";
                            }

                            // 小端轴向载荷需要加强圈
                            else {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_NA_P_YI_YA_YC_YR.docx";
                            }
                        }
                    }
                }
            }

            // 大端有轴向载荷
            else {

                // 大端轴向载荷不进行计算
                if (aaffResult.getDeltaschk().equals("否")) {

                    // 小端没有内压加强计算
                    if (aaffResult.getAlphachk().equals("否")) {

                        // 小端没有轴向载荷
                        if (aaffResult.getIsPAxial().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_NI_NA.docx";
                        }

                        // 小端有轴向载荷
                        else {

                            // 小端轴向载荷不进行加强计算
                            if (aaffResult.getDeltapchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_NI_YA_NC.docx";
                            }

                            // 小端轴向载荷进行加强计算
                            else {

                                // 小端轴向载荷无需加强圈
                                if (aaffResult.getApchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_NI_YA_YC_NR.docx";
                                }

                                // 小端轴向载荷需要加强圈
                                else {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_NI_YA_YC_YR.docx";
                                }
                            }
                        }
                    }

                    // 小端有内压加强计算
                    else {

                        // 小端没有轴向载荷
                        if (aaffResult.getIsPAxial().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_YI_NA.docx";
                        }

                        // 小端有轴向载荷
                        else {

                            // 小端轴向载荷不进行加强计算
                            if (aaffResult.getDeltapchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_YI_YA_NC.docx";
                            }

                            // 小端轴向载荷进行加强计算
                            else {

                                // 小端轴向载荷无需加强圈
                                if (aaffResult.getApchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_YI_YA_YC_NR.docx";
                                }

                                // 小端轴向载荷需要加强圈
                                else {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_NC_P_YI_YA_YC_YR.docx";
                                }
                            }
                        }
                    }
                }

                // 大端轴向载荷计算
                else {

                    // 大端轴向载荷计算无需加强圈
                    if (aaffResult.getAschk().equals("否")) {

                        // 小端没有内压加强计算
                        if (aaffResult.getAlphachk().equals("否")) {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_NI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_NI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_NI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_NI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }

                        // 小端有内压加强计算
                        else {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_YI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_YI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_YI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_NR_P_YI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }
                    }

                    // 大端轴向载荷需要加强圈
                    else {

                        // 小端没有内压加强计算
                        if (aaffResult.getAlphachk().equals("否")) {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_NI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_NI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_NI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_NI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }

                        // 小端有内压加强计算
                        else {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_YI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_YI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_YI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_NI_YA_YC_YR_P_YI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // 大端进行内压加强计算
        else {

            // 大端没有轴向载荷
            if (aaffResult.getIsSAxial().equals("否")) {

                // 小端没有内压加强计算
                if (aaffResult.getAlphachk().equals("否")) {

                    // 小端没有轴向载荷
                    if (aaffResult.getIsPAxial().equals("否")) {
                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_NI_NA.docx";
                    }

                    // 小端有轴向载荷
                    else {

                        // 小端轴向载荷不进行加强计算
                        if (aaffResult.getDeltapchk().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_NI_YA_NC.docx";
                        }

                        // 小端轴向载荷进行加强计算
                        else {

                            // 小端轴向载荷无需加强圈
                            if (aaffResult.getApchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_NI_YA_YC_NR.docx";
                            }

                            // 小端轴向载荷需要加强圈
                            else {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_NI_YA_YC_YR.docx";
                            }
                        }
                    }
                }

                // 小端有内压加强计算
                else {

                    // 小端没有轴向载荷
                    if (aaffResult.getIsPAxial().equals("否")) {
                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_YI_NA.docx";
                    }

                    // 小端有轴向载荷
                    else {

                        // 小端轴向载荷不进行加强计算
                        if (aaffResult.getDeltapchk().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_YI_YA_NC.docx";
                        }

                        // 小端轴向载荷进行加强计算
                        else {

                            // 小端轴向载荷无需加强圈
                            if (aaffResult.getApchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_YI_YA_YC_NR.docx";
                            }

                            // 小端轴向载荷需要加强圈
                            else {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_NA_P_YI_YA_YC_YR.docx";
                            }
                        }
                    }
                }
            }

            // 大端有轴向载荷
            else {

                // 大端轴向载荷不进行计算
                if (aaffResult.getDeltaschk().equals("否")) {

                    // 小端没有内压加强计算
                    if (aaffResult.getAlphachk().equals("否")) {

                        // 小端没有轴向载荷
                        if (aaffResult.getIsPAxial().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_NI_NA.docx";
                        }

                        // 小端有轴向载荷
                        else {

                            // 小端轴向载荷不进行加强计算
                            if (aaffResult.getDeltapchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_NI_YA_NC.docx";
                            }

                            // 小端轴向载荷进行加强计算
                            else {

                                // 小端轴向载荷无需加强圈
                                if (aaffResult.getApchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_NI_YA_YC_NR.docx";
                                }

                                // 小端轴向载荷需要加强圈
                                else {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_NI_YA_YC_YR.docx";
                                }
                            }
                        }
                    }

                    // 小端有内压加强计算
                    else {

                        // 小端没有轴向载荷
                        if (aaffResult.getIsPAxial().equals("否")) {
                            template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_YI_NA.docx";
                        }

                        // 小端有轴向载荷
                        else {

                            // 小端轴向载荷不进行加强计算
                            if (aaffResult.getDeltapchk().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_YI_YA_NC.docx";
                            }

                            // 小端轴向载荷进行加强计算
                            else {

                                // 小端轴向载荷无需加强圈
                                if (aaffResult.getApchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_YI_YA_YC_NR.docx";
                                }

                                // 小端轴向载荷需要加强圈
                                else {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_NC_P_YI_YA_YC_YR.docx";
                                }
                            }
                        }
                    }
                }

                // 大端轴向载荷计算
                else {

                    // 大端轴向载荷计算无需加强圈
                    if (aaffResult.getAschk().equals("否")) {

                        // 小端没有内压加强计算
                        if (aaffResult.getAlphachk().equals("否")) {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_NI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_NI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_NI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_NI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }

                        // 小端有内压加强计算
                        else {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_YI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_YI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_YI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_NR_P_YI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }
                    }

                    // 大端轴向载荷需要加强圈
                    else {

                        // 小端没有内压加强计算
                        if (aaffResult.getAlphachk().equals("否")) {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_NI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_NI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_NI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_NI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }

                        // 小端有内压加强计算
                        else {

                            // 小端没有轴向载荷
                            if (aaffResult.getIsPAxial().equals("否")) {
                                template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_YI_NA.docx";
                            }

                            // 小端有轴向载荷
                            else {

                                // 小端轴向载荷不进行加强计算
                                if (aaffResult.getDeltapchk().equals("否")) {
                                    template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_YI_YA_NC.docx";
                                }

                                // 小端轴向载荷进行加强计算
                                else {

                                    // 小端轴向载荷无需加强圈
                                    if (aaffResult.getApchk().equals("否")) {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_YI_YA_YC_NR.docx";
                                    }

                                    // 小端轴向载荷需要加强圈
                                    else {
                                        template = "D:/mechw/static/west/cal/a/a/f/f/AAFF_S_YI_YA_YC_YR_P_YI_YA_YC_YR.docx";
                                    }
                                }
                            }
                        }
                    }
                }
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
                        textElement.setValue(aaffResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aaffResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aaffResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aaffResult.getTest());
                        break;

                    case "$$005":
                        textElement.setValue(aaffResult.getStds());
                        break;
                    case "$$006":
                        textElement.setValue(aaffResult.getNames());
                        break;
                    case "$$007":
                        textElement.setValue(aaffResult.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aaffResult.getThksn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aaffResult.getCs2().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aaffResult.getEs().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aaffResult.getBfs().toString());
                        break;

                    case "$$012":
                        textElement.setValue(aaffResult.getStdc());
                        break;
                    case "$$013":
                        textElement.setValue(aaffResult.getNamec());
                        break;
                    case "$$014":
                        textElement.setValue(aaffResult.getAlpha().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aaffResult.getThkcn().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aaffResult.getCc2().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aaffResult.getEc().toString());
                        break;

                    case "$$018":
                        textElement.setValue(aaffResult.getStdp());
                        break;
                    case "$$019":
                        textElement.setValue(aaffResult.getNamep());
                        break;
                    case "$$020":
                        textElement.setValue(aaffResult.getDpi().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aaffResult.getThkpn().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aaffResult.getCp2().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aaffResult.getEp().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aaffResult.getBfp().toString());
                        break;

                    case "$$025":
                        textElement.setValue(aaffResult.getDs().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aaffResult.getRsel().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aaffResult.getCs1().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aaffResult.getOst().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aaffResult.getOs().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aaffResult.getOst1() < 0 ? "/" : aaffResult.getOst1().toString());
                        break;

                    case "$$031":
                        textElement.setValue(aaffResult.getDp().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aaffResult.getRpel().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aaffResult.getCp1().toString());
                        break;

                    case "$$034":
                        textElement.setValue(aaffResult.getDc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aaffResult.getRcel().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aaffResult.getCc1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aaffResult.getOct().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aaffResult.getOc().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aaffResult.getOct1() < 0 ? "/" : aaffResult.getOct1().toString());
                        break;

                    case "$$040":
                        textElement.setValue(aaffResult.getOpt().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aaffResult.getOp().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aaffResult.getOpt1() < 0 ? "/" : aaffResult.getOpt1().toString());
                        break;

                    case "$$043":
                        textElement.setValue(aaffResult.getPc().toString());
                        break;

                    case "$$044":
                        textElement.setValue(aaffResult.getCs().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aaffResult.getThkse().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aaffResult.getDso().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aaffResult.getDsm().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aaffResult.getRsm().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aaffResult.getSfs().toString());
                        break;
                    case "$$050":
                        textElement.setValue(aaffResult.getQs().toString());
                        break;

                    case "$$051":
                        textElement.setValue(aaffResult.getCc().toString());
                        break;
                    case "$$052":
                        textElement.setValue(aaffResult.getThkce().toString());
                        break;

                    case "$$053":
                        textElement.setValue(aaffResult.getCp().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aaffResult.getThkpe().toString());
                        break;
                    case "$$055":
                        textElement.setValue(aaffResult.getDpo().toString());
                        break;
                    case "$$056":
                        textElement.setValue(aaffResult.getDpm().toString());
                        break;
                    case "$$057":
                        textElement.setValue(aaffResult.getRpm().toString());
                        break;
                    case "$$058":
                        textElement.setValue(aaffResult.getSfp().toString());
                        break;
                    case "$$059":
                        textElement.setValue(aaffResult.getQp().toString());
                        break;

                    case "$$060":
                        textElement.setValue(aaffResult.getThksc().toString());
                        break;
                    case "$$061":
                        textElement.setValue(aaffResult.getThksd().toString());
                        break;
                    case "$$062":
                        textElement.setValue(aaffResult.getThkschk());
                        break;

                    case "$$063":
                        textElement.setValue(aaffResult.getThkcc().toString());
                        break;
                    case "$$064":
                        textElement.setValue(aaffResult.getThkcd().toString());
                        break;
                    case "$$065":
                        textElement.setValue(aaffResult.getThkcchk());
                        break;

                    case "$$066":
                        textElement.setValue(aaffResult.getThkpc().toString());
                        break;
                    case "$$067":
                        textElement.setValue(aaffResult.getThkpd().toString());
                        break;
                    case "$$068":
                        textElement.setValue(aaffResult.getThkpchk());
                        break;

                    case "$$069":
                        textElement.setValue(aaffResult.getPcoctec().toString());
                        break;
                    case "$$070":
                        textElement.setValue(aaffResult.getPcoctecallow().toString());
                        break;
                    case "$$071":
                        textElement.setValue(aaffResult.getPcoctecchk());
                        break;
                    case "$$072":
                        textElement.setValue(aaffResult.getThkscrsm().toString());
                        break;
                    case "$$073":
                        textElement.setValue(aaffResult.getQ1().toString());
                        break;
                    case "$$074":
                        textElement.setValue(aaffResult.getThksrc().toString());
                        break;
                    case "$$075":
                        textElement.setValue(aaffResult.getThksrd().toString());
                        break;
                    case "$$076":
                        textElement.setValue(aaffResult.getLsrc().toString());
                        break;
                    case "$$077":
                        textElement.setValue(aaffResult.getLsrs().toString());
                        break;

                    case "$$078":
                        textElement.setValue(aaffResult.getPcostes().toString());
                        break;
                    case "$$079":
                        textElement.setValue(aaffResult.getDeltas().toString());
                        break;
                    case "$$080":
                        textElement.setValue(aaffResult.getDeltaschk());
                        break;
                    case "$$081":
                        textElement.setValue(aaffResult.getKs().toString());
                        break;
                    case "$$082":
                        textElement.setValue(aaffResult.getArs().toString());
                        break;
                    case "$$083":
                        textElement.setValue(aaffResult.getAes().toString());
                        break;
                    case "$$084":
                        textElement.setValue(aaffResult.getAschk());
                        break;
                    case "$$085":
                        textElement.setValue(aaffResult.getAs().toString());
                        break;
                    case "$$086":
                        textElement.setValue(aaffResult.getWrs().toString());
                        break;
                    case "$$087":
                        textElement.setValue(aaffResult.getLrs().toString());
                        break;

                    case "$$088":
                        textElement.setValue(aaffResult.getAlphaallow().toString());
                        break;
                    case "$$089":
                        textElement.setValue(aaffResult.getAlphachk());
                        break;
                    case "$$090":
                        textElement.setValue(aaffResult.getThkpcrpm().toString());
                        break;
                    case "$$091":
                        textElement.setValue(aaffResult.getQ2().toString());
                        break;
                    case "$$092":
                        textElement.setValue(aaffResult.getThkprc().toString());
                        break;
                    case "$$093":
                        textElement.setValue(aaffResult.getThkprd().toString());
                        break;
                    case "$$094":
                        textElement.setValue(aaffResult.getLprc().toString());
                        break;
                    case "$$095":
                        textElement.setValue(aaffResult.getLprs().toString());
                        break;

                    case "$$096":
                        textElement.setValue(aaffResult.getPcoptep().toString());
                        break;
                    case "$$097":
                        textElement.setValue(aaffResult.getDeltap().toString());
                        break;
                    case "$$098":
                        textElement.setValue(aaffResult.getDeltapchk());
                        break;
                    case "$$099":
                        textElement.setValue(aaffResult.getKp().toString());
                        break;
                    case "$$100":
                        textElement.setValue(aaffResult.getArp().toString());
                        break;
                    case "$$101":
                        textElement.setValue(aaffResult.getAep().toString());
                        break;
                    case "$$102":
                        textElement.setValue(aaffResult.getApchk());
                        break;
                    case "$$103":
                        textElement.setValue(aaffResult.getAp().toString());
                        break;
                    case "$$104":
                        textElement.setValue(aaffResult.getWrp().toString());
                        break;
                    case "$$105":
                        textElement.setValue(aaffResult.getLrp().toString());
                        break;

                    case "$$106":
                        textElement.setValue(aaffResult.getEta().toString());
                        break;
                    case "$$107":
                        textElement.setValue(aaffResult.getPct().toString());
                        break;
                    case "$$108":
                        textElement.setValue(aaffResult.getPpt().toString());
                        break;
                    case "$$109":
                        textElement.setValue(aaffResult.getPst().toString());
                        break;
                    case "$$110":
                        textElement.setValue(aaffResult.getPt().toString());
                        break;

                    case "$07":
                        textElement.setValue("Φ" + aaffResult.getDsi().toString());
                        break;
                    case "$08":
                        textElement.setValue(aaffResult.getThksn().toString());
                        break;
                    case "$14":
                        textElement.setValue(aaffResult.getAlpha().toString() + "°");
                        break;
                    case "$15":
                        textElement.setValue(aaffResult.getThkcn().toString());
                        break;
                    case "$20":
                        textElement.setValue("Φ" + aaffResult.getDpi().toString());
                        break;
                    case "$21":
                        textElement.setValue(aaffResult.getThkpn().toString());
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
     * aafg
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aafgResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFG(String baseFileName, AAFGDocx aafgResult) {

        // 根据试验类型确定要使用的文件模板
        String template;

        // 小端没有内压加强计算
        if (aafgResult.getAlphachk().equals("否")) {

            // 小端没有轴向载荷
            if (aafgResult.getIsPAxial().equals("否")) {
                template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_NI_NA.docx";
            }

            // 小端有轴向载荷
            else {

                // 小端轴向载荷不进行加强计算
                if (aafgResult.getDeltapchk().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_NI_YA_NC.docx";
                }

                // 小端轴向载荷进行加强计算
                else {

                    // 小端轴向载荷无需加强圈
                    if (aafgResult.getApchk().equals("否")) {
                        template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_NI_YA_YC_NR.docx";
                    }

                    // 小端轴向载荷需要加强圈
                    else {
                        template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_NI_YA_YC_YR.docx";
                    }
                }
            }
        }

        // 小端有内压加强计算
        else {

            // 小端没有轴向载荷
            if (aafgResult.getIsPAxial().equals("否")) {
                template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_YI_NA.docx";
            }

            // 小端有轴向载荷
            else {

                // 小端轴向载荷不进行加强计算
                if (aafgResult.getDeltapchk().equals("否")) {
                    template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_YI_YA_NC.docx";
                }

                // 小端轴向载荷进行加强计算
                else {

                    // 小端轴向载荷无需加强圈
                    if (aafgResult.getApchk().equals("否")) {
                        template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_YI_YA_YC_NR.docx";
                    }

                    // 小端轴向载荷需要加强圈
                    else {
                        template = "D:/mechw/static/west/cal/a/a/f/g/AAFG_P_YI_YA_YC_YR.docx";
                    }
                }
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
                        textElement.setValue(aafgResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aafgResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aafgResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aafgResult.getTest());
                        break;

                    case "$$005":
                        textElement.setValue(aafgResult.getStdc());
                        break;
                    case "$$006":
                        textElement.setValue(aafgResult.getNamec());
                        break;
                    case "$$007":
                        textElement.setValue(aafgResult.getDsi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aafgResult.getR().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aafgResult.getThkcn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aafgResult.getAlpha().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aafgResult.getCc2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aafgResult.getEc().toString());
                        break;

                    case "$$013":
                        textElement.setValue(aafgResult.getStdp());
                        break;
                    case "$$014":
                        textElement.setValue(aafgResult.getNamep());
                        break;
                    case "$$015":
                        textElement.setValue(aafgResult.getDpi().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aafgResult.getThkpn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aafgResult.getCp2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aafgResult.getEp().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aafgResult.getBfp().toString());
                        break;

                    case "$$020":
                        textElement.setValue(aafgResult.getDc().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aafgResult.getRcel().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aafgResult.getCc1().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aafgResult.getOct().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aafgResult.getOc().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aafgResult.getOct1() < 0 ? "/" : aafgResult.getOct1().toString());
                        break;

                    case "$$026":
                        textElement.setValue(aafgResult.getDp().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aafgResult.getRpel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aafgResult.getCp1().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aafgResult.getOpt().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aafgResult.getOp().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aafgResult.getOpt1() < 0 ? "/" : aafgResult.getOpt1().toString());
                        break;

                    case "$$032":
                        textElement.setValue(aafgResult.getPc().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aafgResult.getCc().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aafgResult.getThkce().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aafgResult.getRdsi().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aafgResult.getCp().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aafgResult.getThkpe().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aafgResult.getDpo().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aafgResult.getDpm().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aafgResult.getRpm().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aafgResult.getSfp().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aafgResult.getQp().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aafgResult.getThksc().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aafgResult.getK().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aafgResult.getThkcrc().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aafgResult.getF().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aafgResult.getThkcc().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aafgResult.getThkcd().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aafgResult.getThkcchk());
                        break;

                    case "$$050":
                        textElement.setValue(aafgResult.getThkpc().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aafgResult.getThkpd().toString());
                        break;
                    case "$$052":
                        textElement.setValue(aafgResult.getThkpchk());
                        break;

                    case "$$053":
                        textElement.setValue(aafgResult.getPcoctec().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aafgResult.getAlphaallow().toString());
                        break;
                    case "$$055":
                        textElement.setValue(aafgResult.getAlphachk());
                        break;
                    case "$$056":
                        textElement.setValue(aafgResult.getThkpcrpm().toString());
                        break;
                    case "$$057":
                        textElement.setValue(aafgResult.getQ2().toString());
                        break;
                    case "$$058":
                        textElement.setValue(aafgResult.getThkprc().toString());
                        break;
                    case "$$059":
                        textElement.setValue(aafgResult.getThkprd().toString());
                        break;
                    case "$$060":
                        textElement.setValue(aafgResult.getLprc().toString());
                        break;
                    case "$$061":
                        textElement.setValue(aafgResult.getLprs().toString());
                        break;

                    case "$$062":
                        textElement.setValue(aafgResult.getPcoptep().toString());
                        break;
                    case "$$063":
                        textElement.setValue(aafgResult.getDeltap().toString());
                        break;
                    case "$$064":
                        textElement.setValue(aafgResult.getDeltapchk());
                        break;
                    case "$$065":
                        textElement.setValue(aafgResult.getKp().toString());
                        break;
                    case "$$066":
                        textElement.setValue(aafgResult.getArp().toString());
                        break;
                    case "$$067":
                        textElement.setValue(aafgResult.getAep().toString());
                        break;
                    case "$$068":
                        textElement.setValue(aafgResult.getApchk());
                        break;
                    case "$$069":
                        textElement.setValue(aafgResult.getAp().toString());
                        break;
                    case "$$070":
                        textElement.setValue(aafgResult.getWrp().toString());
                        break;
                    case "$$071":
                        textElement.setValue(aafgResult.getLrp().toString());
                        break;
                    case "$$072":
                        textElement.setValue(aafgResult.getEta().toString());
                        break;
                    case "$$073":
                        textElement.setValue(aafgResult.getPct().toString());
                        break;
                    case "$$074":
                        textElement.setValue(aafgResult.getPpt().toString());
                        break;
                    case "$$075":
                        textElement.setValue(aafgResult.getPt().toString());
                        break;

                    case "$07":
                        textElement.setValue("Φ" + aafgResult.getDsi().toString());
                        break;
                    case "$08":
                        textElement.setValue("R" + aafgResult.getR().toString());
                        break;
                    case "$09":
                        textElement.setValue(aafgResult.getThkcn().toString());
                        break;
                    case "$10":
                        textElement.setValue(aafgResult.getAlpha().toString() + "°");
                        break;
                    case "$15":
                        textElement.setValue("Φ" + aafgResult.getDpi().toString());
                        break;
                    case "$16":
                        textElement.setValue(aafgResult.getThkpn().toString());
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
     * aafh
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aafhResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAFH(String baseFileName, AAFHDocx aafhResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/a/f/h/AAFH.docx";

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
                        textElement.setValue(aafhResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aafhResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aafhResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aafhResult.getStd());
                        break;
                    case "$$005":
                        textElement.setValue(aafhResult.getName());
                        break;
                    case "$$006":
                        textElement.setValue(aafhResult.getDsi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aafhResult.getDpi().toString());
                        break;
                    case "$$008":
                        textElement.setValue(aafhResult.getThkn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aafhResult.getRs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aafhResult.getRp().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aafhResult.getAlpha().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aafhResult.getC2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(aafhResult.getE().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aafhResult.getTest());
                        break;

                    case "$$015":
                        textElement.setValue(aafhResult.getD().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aafhResult.getRel().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aafhResult.getC1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aafhResult.getOt().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aafhResult.getO().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aafhResult.getOt1() < 0 ? "/" : aafhResult.getOt1().toString());
                        break;

                    case "$$021":
                        textElement.setValue(aafhResult.getPc().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aafhResult.getC().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aafhResult.getThke().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aafhResult.getRsdsi().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aafhResult.getRpm().toString());
                        break;

                    case "$$026":
                        textElement.setValue(aafhResult.getThksc().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aafhResult.getThkpc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aafhResult.getK().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aafhResult.getThksrc().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aafhResult.getF().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aafhResult.getThkcc().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aafhResult.getThkpcrpm().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aafhResult.getQ2().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aafhResult.getThkprc().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aafhResult.getLprc().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aafhResult.getLprs().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aafhResult.getThkd().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aafhResult.getThkchk());
                        break;

                    case "$$039":
                        textElement.setValue(aafhResult.getEta().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aafhResult.getPt().toString());
                        break;

                    case "$06":
                        textElement.setValue("Φ" + aafhResult.getDsi().toString());
                        break;
                    case "$07":
                        textElement.setValue("Φ" + aafhResult.getDpi().toString());
                        break;
                    case "$08":
                        textElement.setValue(aafhResult.getThkn().toString());
                        break;
                    case "$09":
                        textElement.setValue("R" + aafhResult.getRs().toString());
                        break;
                    case "$10":
                        textElement.setValue("R" + aafhResult.getRp().toString());
                        break;
                    case "$11":
                        textElement.setValue(aafhResult.getAlpha().toString() + "°");
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
     * aaga
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aagaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAGA(String baseFileName, AAGADocx aagaResult) {
        String template;
        if (aagaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/a/g/a/AAGAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/g/a/AAGAG.docx";
        }

        File from = new File(template);
        String docName = "D:/data" + baseFileName + ".docx";

        try {
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());
            Files.createFile(docPath);
            File docFile = new File(docName);
            DocxTool.copyDocx(from, docFile);
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            List<Object> texts = getText(mainDocumentPart);

            for (Object text : texts) {
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 54;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 55;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 56;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 57;
                        }
                        break;
                    case 34366897:
                        if (var13.equals("$$001")) {
                            var14 = 0;
                        }
                        break;
                    case 34366898:
                        if (var13.equals("$$002")) {
                            var14 = 1;
                        }
                        break;
                    case 34366899:
                        if (var13.equals("$$003")) {
                            var14 = 2;
                        }
                        break;
                    case 34366900:
                        if (var13.equals("$$004")) {
                            var14 = 3;
                        }
                        break;
                    case 34366901:
                        if (var13.equals("$$005")) {
                            var14 = 4;
                        }
                        break;
                    case 34366902:
                        if (var13.equals("$$006")) {
                            var14 = 5;
                        }
                        break;
                    case 34366903:
                        if (var13.equals("$$007")) {
                            var14 = 6;
                        }
                        break;
                    case 34366904:
                        if (var13.equals("$$008")) {
                            var14 = 7;
                        }
                        break;
                    case 34366905:
                        if (var13.equals("$$009")) {
                            var14 = 8;
                        }
                        break;
                    case 34366927:
                        if (var13.equals("$$010")) {
                            var14 = 9;
                        }
                        break;
                    case 34366928:
                        if (var13.equals("$$011")) {
                            var14 = 10;
                        }
                        break;
                    case 34366929:
                        if (var13.equals("$$012")) {
                            var14 = 11;
                        }
                        break;
                    case 34366930:
                        if (var13.equals("$$013")) {
                            var14 = 12;
                        }
                        break;
                    case 34366931:
                        if (var13.equals("$$014")) {
                            var14 = 13;
                        }
                        break;
                    case 34366932:
                        if (var13.equals("$$015")) {
                            var14 = 14;
                        }
                        break;
                    case 34366933:
                        if (var13.equals("$$016")) {
                            var14 = 15;
                        }
                        break;
                    case 34366934:
                        if (var13.equals("$$017")) {
                            var14 = 16;
                        }
                        break;
                    case 34366935:
                        if (var13.equals("$$018")) {
                            var14 = 17;
                        }
                        break;
                    case 34366936:
                        if (var13.equals("$$019")) {
                            var14 = 18;
                        }
                        break;
                    case 34366958:
                        if (var13.equals("$$020")) {
                            var14 = 19;
                        }
                        break;
                    case 34366959:
                        if (var13.equals("$$021")) {
                            var14 = 20;
                        }
                        break;
                    case 34366960:
                        if (var13.equals("$$022")) {
                            var14 = 21;
                        }
                        break;
                    case 34366961:
                        if (var13.equals("$$023")) {
                            var14 = 22;
                        }
                        break;
                    case 34366962:
                        if (var13.equals("$$024")) {
                            var14 = 23;
                        }
                        break;
                    case 34366963:
                        if (var13.equals("$$025")) {
                            var14 = 24;
                        }
                        break;
                    case 34366964:
                        if (var13.equals("$$026")) {
                            var14 = 25;
                        }
                        break;
                    case 34366965:
                        if (var13.equals("$$027")) {
                            var14 = 26;
                        }
                        break;
                    case 34366966:
                        if (var13.equals("$$028")) {
                            var14 = 27;
                        }
                        break;
                    case 34366967:
                        if (var13.equals("$$029")) {
                            var14 = 28;
                        }
                        break;
                    case 34366989:
                        if (var13.equals("$$030")) {
                            var14 = 29;
                        }
                        break;
                    case 34366990:
                        if (var13.equals("$$031")) {
                            var14 = 30;
                        }
                        break;
                    case 34366991:
                        if (var13.equals("$$032")) {
                            var14 = 31;
                        }
                        break;
                    case 34366992:
                        if (var13.equals("$$033")) {
                            var14 = 32;
                        }
                        break;
                    case 34366993:
                        if (var13.equals("$$034")) {
                            var14 = 33;
                        }
                        break;
                    case 34366994:
                        if (var13.equals("$$035")) {
                            var14 = 34;
                        }
                        break;
                    case 34366995:
                        if (var13.equals("$$036")) {
                            var14 = 35;
                        }
                        break;
                    case 34366996:
                        if (var13.equals("$$037")) {
                            var14 = 36;
                        }
                        break;
                    case 34366997:
                        if (var13.equals("$$038")) {
                            var14 = 37;
                        }
                        break;
                    case 34366998:
                        if (var13.equals("$$039")) {
                            var14 = 38;
                        }
                        break;
                    case 34367020:
                        if (var13.equals("$$040")) {
                            var14 = 39;
                        }
                        break;
                    case 34367021:
                        if (var13.equals("$$041")) {
                            var14 = 40;
                        }
                        break;
                    case 34367022:
                        if (var13.equals("$$042")) {
                            var14 = 41;
                        }
                        break;
                    case 34367023:
                        if (var13.equals("$$043")) {
                            var14 = 42;
                        }
                        break;
                    case 34367024:
                        if (var13.equals("$$044")) {
                            var14 = 43;
                        }
                        break;
                    case 34367025:
                        if (var13.equals("$$045")) {
                            var14 = 44;
                        }
                        break;
                    case 34367026:
                        if (var13.equals("$$046")) {
                            var14 = 45;
                        }
                        break;
                    case 34367027:
                        if (var13.equals("$$047")) {
                            var14 = 46;
                        }
                        break;
                    case 34367028:
                        if (var13.equals("$$048")) {
                            var14 = 47;
                        }
                        break;
                    case 34367029:
                        if (var13.equals("$$049")) {
                            var14 = 48;
                        }
                        break;
                    case 34367051:
                        if (var13.equals("$$050")) {
                            var14 = 49;
                        }
                        break;
                    case 34367052:
                        if (var13.equals("$$051")) {
                            var14 = 50;
                        }
                        break;
                    case 34367053:
                        if (var13.equals("$$052")) {
                            var14 = 51;
                        }
                        break;
                    case 34367054:
                        if (var13.equals("$$053")) {
                            var14 = 52;
                        }
                        break;
                    case 34367055:
                        if (var13.equals("$$054")) {
                            var14 = 53;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(aagaResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(aagaResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(aagaResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(aagaResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(aagaResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(aagaResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(aagaResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(aagaResult.getEs().toString());
                        break;
                    case 8:
                        textElement.setValue(aagaResult.getCs2().toString());
                        break;
                    case 9:
                        textElement.setValue(aagaResult.getStdc());
                        break;
                    case 10:
                        textElement.setValue(aagaResult.getNamec());
                        break;
                    case 11:
                        textElement.setValue(aagaResult.getAlpha().toString());
                        break;
                    case 12:
                        textElement.setValue(aagaResult.getThkcn().toString());
                        break;
                    case 13:
                        textElement.setValue(aagaResult.getCc2().toString());
                        break;
                    case 14:
                        textElement.setValue(aagaResult.getEc().toString());
                        break;
                    case 15:
                        textElement.setValue(aagaResult.getTest());
                        break;
                    case 16:
                        textElement.setValue(aagaResult.getDs().toString());
                        break;
                    case 17:
                        textElement.setValue(aagaResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(aagaResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(aagaResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(aagaResult.getRsel().toString());
                        break;
                    case 21:
                        textElement.setValue(aagaResult.getOst1() < 0.0D ? "/" : aagaResult.getOst1().toString());
                        break;
                    case 22:
                        textElement.setValue(aagaResult.getDc().toString());
                        break;
                    case 23:
                        textElement.setValue(aagaResult.getCc1().toString());
                        break;
                    case 24:
                        textElement.setValue(aagaResult.getOct().toString());
                        break;
                    case 25:
                        textElement.setValue(aagaResult.getOc().toString());
                        break;
                    case 26:
                        textElement.setValue(aagaResult.getRcel().toString());
                        break;
                    case 27:
                        textElement.setValue(aagaResult.getOct1() < 0.0D ? "/" : aagaResult.getOct1().toString());
                        break;
                    case 28:
                        textElement.setValue(aagaResult.getPc().toString());
                        break;
                    case 29:
                        textElement.setValue(aagaResult.getCs().toString());
                        break;
                    case 30:
                        textElement.setValue(aagaResult.getThkse().toString());
                        break;
                    case 31:
                        textElement.setValue(aagaResult.getCc().toString());
                        break;
                    case 32:
                        textElement.setValue(aagaResult.getThkce().toString());
                        break;
                    case 33:
                        textElement.setValue(aagaResult.getBeta().toString());
                        break;
                    case 34:
                        textElement.setValue(aagaResult.getBeta1().toString());
                        break;
                    case 35:
                        textElement.setValue(aagaResult.getThk2().toString());
                        break;
                    case 36:
                        textElement.setValue(aagaResult.getThk1().toString());
                        break;
                    case 37:
                        textElement.setValue(aagaResult.getThkk().toString());
                        break;
                    case 38:
                        textElement.setValue(aagaResult.getThkp().toString());
                        break;
                    case 39:
                        textElement.setValue(aagaResult.getThkcc().toString());
                        break;
                    case 40:
                        textElement.setValue(aagaResult.getThkcd().toString());
                        break;
                    case 41:
                        textElement.setValue(aagaResult.getThkcchk());
                        break;
                    case 42:
                        textElement.setValue(aagaResult.getThksc().toString());
                        break;
                    case 43:
                        textElement.setValue(aagaResult.getThksd().toString());
                        break;
                    case 44:
                        textElement.setValue(aagaResult.getThkschk());
                        break;
                    case 45:
                        textElement.setValue(aagaResult.getPct().toString());
                        break;
                    case 46:
                        textElement.setValue(aagaResult.getPst().toString());
                        break;
                    case 47:
                        textElement.setValue(aagaResult.getPt().toString());
                        break;
                    case 48:
                        textElement.setValue(aagaResult.getPk().toString());
                        break;
                    case 49:
                        textElement.setValue(aagaResult.getP2().toString());
                        break;
                    case 50:
                        textElement.setValue(aagaResult.getPp().toString());
                        break;
                    case 51:
                        textElement.setValue(aagaResult.getMawpc().toString());
                        break;
                    case 52:
                        textElement.setValue(aagaResult.getMawps().toString());
                        break;
                    case 53:
                        textElement.setValue(aagaResult.getMawp().toString());
                        break;
                    case 54:
                        textElement.setValue("Φ" + aagaResult.getDsi().toString());
                        break;
                    case 55:
                        textElement.setValue(aagaResult.getThksn().toString());
                        break;
                    case 56:
                        textElement.setValue(aagaResult.getAlpha().toString() + "°");
                        break;
                    case 57:
                        textElement.setValue(aagaResult.getThkcn().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var15) {
            var15.printStackTrace();
            return "-1";
        }
    }

    /**
     * aagb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aagbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAGB(String baseFileName, AAGBDocx aagbResult) {
        String template;
        if (aagbResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/a/g/b/AAGBL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/g/b/AAGBG.docx";
        }

        File from = new File(template);
        String docName = "D:/data" + baseFileName + ".docx";

        try {
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());
            Files.createFile(docPath);
            File docFile = new File(docName);
            DocxTool.copyDocx(from, docFile);
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            List<Object> texts = getText(mainDocumentPart);

            for (Object text : texts) {
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 66;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 67;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 68;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 69;
                        }
                        break;
                    case 36171:
                        if (var13.equals("$18")) {
                            var14 = 70;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 71;
                        }
                        break;
                    case 1187323:
                        if (var13.equals("$tit")) {
                            var14 = 72;
                        }
                        break;
                    case 34366897:
                        if (var13.equals("$$001")) {
                            var14 = 0;
                        }
                        break;
                    case 34366898:
                        if (var13.equals("$$002")) {
                            var14 = 1;
                        }
                        break;
                    case 34366899:
                        if (var13.equals("$$003")) {
                            var14 = 2;
                        }
                        break;
                    case 34366900:
                        if (var13.equals("$$004")) {
                            var14 = 3;
                        }
                        break;
                    case 34366901:
                        if (var13.equals("$$005")) {
                            var14 = 4;
                        }
                        break;
                    case 34366902:
                        if (var13.equals("$$006")) {
                            var14 = 5;
                        }
                        break;
                    case 34366903:
                        if (var13.equals("$$007")) {
                            var14 = 6;
                        }
                        break;
                    case 34366904:
                        if (var13.equals("$$008")) {
                            var14 = 7;
                        }
                        break;
                    case 34366905:
                        if (var13.equals("$$009")) {
                            var14 = 8;
                        }
                        break;
                    case 34366927:
                        if (var13.equals("$$010")) {
                            var14 = 9;
                        }
                        break;
                    case 34366928:
                        if (var13.equals("$$011")) {
                            var14 = 10;
                        }
                        break;
                    case 34366929:
                        if (var13.equals("$$012")) {
                            var14 = 11;
                        }
                        break;
                    case 34366930:
                        if (var13.equals("$$013")) {
                            var14 = 12;
                        }
                        break;
                    case 34366931:
                        if (var13.equals("$$014")) {
                            var14 = 13;
                        }
                        break;
                    case 34366932:
                        if (var13.equals("$$015")) {
                            var14 = 14;
                        }
                        break;
                    case 34366933:
                        if (var13.equals("$$016")) {
                            var14 = 15;
                        }
                        break;
                    case 34366934:
                        if (var13.equals("$$017")) {
                            var14 = 16;
                        }
                        break;
                    case 34366935:
                        if (var13.equals("$$018")) {
                            var14 = 17;
                        }
                        break;
                    case 34366936:
                        if (var13.equals("$$019")) {
                            var14 = 18;
                        }
                        break;
                    case 34366958:
                        if (var13.equals("$$020")) {
                            var14 = 19;
                        }
                        break;
                    case 34366959:
                        if (var13.equals("$$021")) {
                            var14 = 20;
                        }
                        break;
                    case 34366960:
                        if (var13.equals("$$022")) {
                            var14 = 21;
                        }
                        break;
                    case 34366961:
                        if (var13.equals("$$023")) {
                            var14 = 22;
                        }
                        break;
                    case 34366962:
                        if (var13.equals("$$024")) {
                            var14 = 23;
                        }
                        break;
                    case 34366963:
                        if (var13.equals("$$025")) {
                            var14 = 24;
                        }
                        break;
                    case 34366964:
                        if (var13.equals("$$026")) {
                            var14 = 25;
                        }
                        break;
                    case 34366965:
                        if (var13.equals("$$027")) {
                            var14 = 26;
                        }
                        break;
                    case 34366966:
                        if (var13.equals("$$028")) {
                            var14 = 27;
                        }
                        break;
                    case 34366967:
                        if (var13.equals("$$029")) {
                            var14 = 28;
                        }
                        break;
                    case 34366989:
                        if (var13.equals("$$030")) {
                            var14 = 29;
                        }
                        break;
                    case 34366990:
                        if (var13.equals("$$031")) {
                            var14 = 30;
                        }
                        break;
                    case 34366991:
                        if (var13.equals("$$032")) {
                            var14 = 31;
                        }
                        break;
                    case 34366992:
                        if (var13.equals("$$033")) {
                            var14 = 32;
                        }
                        break;
                    case 34366993:
                        if (var13.equals("$$034")) {
                            var14 = 33;
                        }
                        break;
                    case 34366994:
                        if (var13.equals("$$035")) {
                            var14 = 34;
                        }
                        break;
                    case 34366995:
                        if (var13.equals("$$036")) {
                            var14 = 35;
                        }
                        break;
                    case 34366996:
                        if (var13.equals("$$037")) {
                            var14 = 36;
                        }
                        break;
                    case 34366997:
                        if (var13.equals("$$038")) {
                            var14 = 37;
                        }
                        break;
                    case 34366998:
                        if (var13.equals("$$039")) {
                            var14 = 38;
                        }
                        break;
                    case 34367020:
                        if (var13.equals("$$040")) {
                            var14 = 39;
                        }
                        break;
                    case 34367021:
                        if (var13.equals("$$041")) {
                            var14 = 40;
                        }
                        break;
                    case 34367022:
                        if (var13.equals("$$042")) {
                            var14 = 41;
                        }
                        break;
                    case 34367023:
                        if (var13.equals("$$043")) {
                            var14 = 42;
                        }
                        break;
                    case 34367024:
                        if (var13.equals("$$044")) {
                            var14 = 43;
                        }
                        break;
                    case 34367025:
                        if (var13.equals("$$045")) {
                            var14 = 44;
                        }
                        break;
                    case 34367026:
                        if (var13.equals("$$046")) {
                            var14 = 45;
                        }
                        break;
                    case 34367027:
                        if (var13.equals("$$047")) {
                            var14 = 46;
                        }
                        break;
                    case 34367028:
                        if (var13.equals("$$048")) {
                            var14 = 47;
                        }
                        break;
                    case 34367029:
                        if (var13.equals("$$049")) {
                            var14 = 48;
                        }
                        break;
                    case 34367051:
                        if (var13.equals("$$050")) {
                            var14 = 49;
                        }
                        break;
                    case 34367052:
                        if (var13.equals("$$051")) {
                            var14 = 50;
                        }
                        break;
                    case 34367053:
                        if (var13.equals("$$052")) {
                            var14 = 51;
                        }
                        break;
                    case 34367054:
                        if (var13.equals("$$053")) {
                            var14 = 52;
                        }
                        break;
                    case 34367055:
                        if (var13.equals("$$054")) {
                            var14 = 53;
                        }
                        break;
                    case 34367056:
                        if (var13.equals("$$055")) {
                            var14 = 54;
                        }
                        break;
                    case 34367057:
                        if (var13.equals("$$056")) {
                            var14 = 55;
                        }
                        break;
                    case 34367058:
                        if (var13.equals("$$057")) {
                            var14 = 56;
                        }
                        break;
                    case 34367059:
                        if (var13.equals("$$058")) {
                            var14 = 57;
                        }
                        break;
                    case 34367060:
                        if (var13.equals("$$059")) {
                            var14 = 58;
                        }
                        break;
                    case 34367082:
                        if (var13.equals("$$060")) {
                            var14 = 59;
                        }
                        break;
                    case 34367083:
                        if (var13.equals("$$061")) {
                            var14 = 60;
                        }
                        break;
                    case 34367084:
                        if (var13.equals("$$062")) {
                            var14 = 61;
                        }
                        break;
                    case 34367085:
                        if (var13.equals("$$063")) {
                            var14 = 62;
                        }
                        break;
                    case 34367086:
                        if (var13.equals("$$064")) {
                            var14 = 63;
                        }
                        break;
                    case 34367087:
                        if (var13.equals("$$065")) {
                            var14 = 64;
                        }
                        break;
                    case 34367088:
                        if (var13.equals("$$066")) {
                            var14 = 65;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(aagbResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(aagbResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(aagbResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(aagbResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(aagbResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(aagbResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(aagbResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(aagbResult.getEs().toString());
                        break;
                    case 8:
                        textElement.setValue(aagbResult.getCs2().toString());
                        break;
                    case 9:
                        textElement.setValue(aagbResult.getStdc());
                        break;
                    case 10:
                        textElement.setValue(aagbResult.getNamec());
                        break;
                    case 11:
                        textElement.setValue(aagbResult.getAlpha().toString());
                        break;
                    case 12:
                        textElement.setValue(aagbResult.getThkcn().toString());
                        break;
                    case 13:
                        textElement.setValue(aagbResult.getCc2().toString());
                        break;
                    case 14:
                        textElement.setValue(aagbResult.getEc().toString());
                        break;
                    case 15:
                        textElement.setValue(aagbResult.getStdr());
                        break;
                    case 16:
                        textElement.setValue(aagbResult.getNamer());
                        break;
                    case 17:
                        textElement.setValue(aagbResult.getThkrn().toString());
                        break;
                    case 18:
                        textElement.setValue(aagbResult.getHrn().toString());
                        break;
                    case 19:
                        textElement.setValue(aagbResult.getCr2().toString());
                        break;
                    case 20:
                        textElement.setValue(aagbResult.getTest());
                        break;
                    case 21:
                        textElement.setValue(aagbResult.getDs().toString());
                        break;
                    case 22:
                        textElement.setValue(aagbResult.getCs1().toString());
                        break;
                    case 23:
                        textElement.setValue(aagbResult.getOst().toString());
                        break;
                    case 24:
                        textElement.setValue(aagbResult.getOs().toString());
                        break;
                    case 25:
                        textElement.setValue(aagbResult.getRsel().toString());
                        break;
                    case 26:
                        textElement.setValue(aagbResult.getOst1() < 0.0D ? "/" : aagbResult.getOst1().toString());
                        break;
                    case 27:
                        textElement.setValue(aagbResult.getDr().toString());
                        break;
                    case 28:
                        textElement.setValue(aagbResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(aagbResult.getCc1().toString());
                        break;
                    case 30:
                        textElement.setValue(aagbResult.getOct().toString());
                        break;
                    case 31:
                        textElement.setValue(aagbResult.getOc().toString());
                        break;
                    case 32:
                        textElement.setValue(aagbResult.getRcel().toString());
                        break;
                    case 33:
                        textElement.setValue(aagbResult.getOct1() < 0.0D ? "/" : aagbResult.getOct1().toString());
                        break;
                    case 34:
                        textElement.setValue(aagbResult.getCr1().toString());
                        break;
                    case 35:
                        textElement.setValue(aagbResult.getPc().toString());
                        break;
                    case 36:
                        textElement.setValue(aagbResult.getCs().toString());
                        break;
                    case 37:
                        textElement.setValue(aagbResult.getThkse().toString());
                        break;
                    case 38:
                        textElement.setValue(aagbResult.getCc().toString());
                        break;
                    case 39:
                        textElement.setValue(aagbResult.getThkce().toString());
                        break;
                    case 40:
                        textElement.setValue(aagbResult.getCr().toString());
                        break;
                    case 41:
                        textElement.setValue(aagbResult.getThkre().toString());
                        break;
                    case 42:
                        textElement.setValue(aagbResult.getHre().toString());
                        break;
                    case 43:
                        textElement.setValue(aagbResult.getAact().toString());
                        break;
                    case 44:
                        textElement.setValue(aagbResult.getThkcc().toString());
                        break;
                    case 45:
                        textElement.setValue(aagbResult.getThkcd().toString());
                        break;
                    case 46:
                        textElement.setValue(aagbResult.getThkcchk());
                        break;
                    case 47:
                        textElement.setValue(aagbResult.getThksc().toString());
                        break;
                    case 48:
                        textElement.setValue(aagbResult.getThksd().toString());
                        break;
                    case 49:
                        textElement.setValue(aagbResult.getThkschk());
                        break;
                    case 50:
                        textElement.setValue(aagbResult.getBetaa().toString());
                        break;
                    case 51:
                        textElement.setValue(aagbResult.getBeta().toString());
                        break;
                    case 52:
                        textElement.setValue(aagbResult.getAr().toString());
                        break;
                    case 53:
                        textElement.setValue(aagbResult.getAchk());
                        break;
                    case 54:
                        textElement.setValue(aagbResult.getTi().toString());
                        break;
                    case 55:
                        textElement.setValue(aagbResult.getPct().toString());
                        break;
                    case 56:
                        textElement.setValue(aagbResult.getPst().toString());
                        break;
                    case 57:
                        textElement.setValue(aagbResult.getPt().toString());
                        break;
                    case 58:
                        textElement.setValue(aagbResult.getB2().toString());
                        break;
                    case 59:
                        textElement.setValue(aagbResult.getB3().toString());
                        break;
                    case 60:
                        textElement.setValue(aagbResult.getBeta0().toString());
                        break;
                    case 61:
                        textElement.setValue(aagbResult.getBeta2().toString());
                        break;
                    case 62:
                        textElement.setValue(aagbResult.getMawpc().toString());
                        break;
                    case 63:
                        textElement.setValue(aagbResult.getMawpr().toString());
                        break;
                    case 64:
                        textElement.setValue(aagbResult.getMawps().toString());
                        break;
                    case 65:
                        textElement.setValue(aagbResult.getMawp().toString());
                        break;
                    case 66:
                        textElement.setValue("Φ" + aagbResult.getDsi().toString());
                        break;
                    case 67:
                        textElement.setValue(aagbResult.getThksn().toString());
                        break;
                    case 68:
                        textElement.setValue(aagbResult.getAlpha().toString() + "°");
                        break;
                    case 69:
                        textElement.setValue(aagbResult.getThkcn().toString());
                        break;
                    case 70:
                        textElement.setValue(aagbResult.getThkrn().toString());
                        break;
                    case 71:
                        textElement.setValue(aagbResult.getHrn().toString());
                        break;
                    case 72:
                        textElement.setValue("Σti≥" + aagbResult.getTi().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var15) {
            var15.printStackTrace();
            return "-1";
        }
    }

    /**
     * aagc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aagcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAGC(String baseFileName, AAGCDocx aagcResult) {
        String template;
        if (aagcResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/a/g/c/AAGCL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/g/c/AAGCG.docx";
        }

        File from = new File(template);
        String docName = "D:/data" + baseFileName + ".docx";

        try {
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());
            Files.createFile(docPath);
            File docFile = new File(docName);
            DocxTool.copyDocx(from, docFile);
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            List<Object> texts = getText(mainDocumentPart);

            for (Object text : texts) {
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 35;
                        }
                        break;
                    case 36136:
                        if (var13.equals("$04")) {
                            var14 = 36;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 37;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 38;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 39;
                        }
                        break;
                    case 34366897:
                        if (var13.equals("$$001")) {
                            var14 = 0;
                        }
                        break;
                    case 34366898:
                        if (var13.equals("$$002")) {
                            var14 = 1;
                        }
                        break;
                    case 34366899:
                        if (var13.equals("$$003")) {
                            var14 = 2;
                        }
                        break;
                    case 34366900:
                        if (var13.equals("$$004")) {
                            var14 = 3;
                        }
                        break;
                    case 34366901:
                        if (var13.equals("$$005")) {
                            var14 = 4;
                        }
                        break;
                    case 34366902:
                        if (var13.equals("$$006")) {
                            var14 = 5;
                        }
                        break;
                    case 34366903:
                        if (var13.equals("$$007")) {
                            var14 = 6;
                        }
                        break;
                    case 34366904:
                        if (var13.equals("$$008")) {
                            var14 = 7;
                        }
                        break;
                    case 34366905:
                        if (var13.equals("$$009")) {
                            var14 = 8;
                        }
                        break;
                    case 34366927:
                        if (var13.equals("$$010")) {
                            var14 = 9;
                        }
                        break;
                    case 34366928:
                        if (var13.equals("$$011")) {
                            var14 = 10;
                        }
                        break;
                    case 34366929:
                        if (var13.equals("$$012")) {
                            var14 = 11;
                        }
                        break;
                    case 34366930:
                        if (var13.equals("$$013")) {
                            var14 = 12;
                        }
                        break;
                    case 34366931:
                        if (var13.equals("$$014")) {
                            var14 = 13;
                        }
                        break;
                    case 34366932:
                        if (var13.equals("$$015")) {
                            var14 = 14;
                        }
                        break;
                    case 34366933:
                        if (var13.equals("$$016")) {
                            var14 = 15;
                        }
                        break;
                    case 34366934:
                        if (var13.equals("$$017")) {
                            var14 = 16;
                        }
                        break;
                    case 34366935:
                        if (var13.equals("$$018")) {
                            var14 = 17;
                        }
                        break;
                    case 34366936:
                        if (var13.equals("$$019")) {
                            var14 = 18;
                        }
                        break;
                    case 34366958:
                        if (var13.equals("$$020")) {
                            var14 = 19;
                        }
                        break;
                    case 34366959:
                        if (var13.equals("$$021")) {
                            var14 = 20;
                        }
                        break;
                    case 34366960:
                        if (var13.equals("$$022")) {
                            var14 = 21;
                        }
                        break;
                    case 34366961:
                        if (var13.equals("$$023")) {
                            var14 = 22;
                        }
                        break;
                    case 34366962:
                        if (var13.equals("$$024")) {
                            var14 = 23;
                        }
                        break;
                    case 34366963:
                        if (var13.equals("$$025")) {
                            var14 = 24;
                        }
                        break;
                    case 34366964:
                        if (var13.equals("$$026")) {
                            var14 = 25;
                        }
                        break;
                    case 34366965:
                        if (var13.equals("$$027")) {
                            var14 = 26;
                        }
                        break;
                    case 34366966:
                        if (var13.equals("$$028")) {
                            var14 = 27;
                        }
                        break;
                    case 34366967:
                        if (var13.equals("$$029")) {
                            var14 = 28;
                        }
                        break;
                    case 34366989:
                        if (var13.equals("$$030")) {
                            var14 = 29;
                        }
                        break;
                    case 34366990:
                        if (var13.equals("$$031")) {
                            var14 = 30;
                        }
                        break;
                    case 34366991:
                        if (var13.equals("$$032")) {
                            var14 = 31;
                        }
                        break;
                    case 34366992:
                        if (var13.equals("$$033")) {
                            var14 = 32;
                        }
                        break;
                    case 34366993:
                        if (var13.equals("$$034")) {
                            var14 = 33;
                        }
                        break;
                    case 34366994:
                        if (var13.equals("$$035")) {
                            var14 = 34;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(aagcResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(aagcResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(aagcResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(aagcResult.getDsi().toString());
                        break;
                    case 4:
                        textElement.setValue(aagcResult.getStdc());
                        break;
                    case 5:
                        textElement.setValue(aagcResult.getNamec());
                        break;
                    case 6:
                        textElement.setValue(aagcResult.getAlpha().toString());
                        break;
                    case 7:
                        textElement.setValue(aagcResult.getThkcn().toString());
                        break;
                    case 8:
                        textElement.setValue(aagcResult.getRi().toString());
                        break;
                    case 9:
                        textElement.setValue(aagcResult.getCc2().toString());
                        break;
                    case 10:
                        textElement.setValue(aagcResult.getEc().toString());
                        break;
                    case 11:
                        textElement.setValue(aagcResult.getTest());
                        break;
                    case 12:
                        textElement.setValue(aagcResult.getDc().toString());
                        break;
                    case 13:
                        textElement.setValue(aagcResult.getCc1().toString());
                        break;
                    case 14:
                        textElement.setValue(aagcResult.getOct().toString());
                        break;
                    case 15:
                        textElement.setValue(aagcResult.getOc().toString());
                        break;
                    case 16:
                        textElement.setValue(aagcResult.getRcel().toString());
                        break;
                    case 17:
                        textElement.setValue(aagcResult.getOct1() < 0.0D ? "/" : aagcResult.getOct1().toString());
                        break;
                    case 18:
                        textElement.setValue(aagcResult.getPc().toString());
                        break;
                    case 19:
                        textElement.setValue(aagcResult.getCc().toString());
                        break;
                    case 20:
                        textElement.setValue(aagcResult.getThkce().toString());
                        break;
                    case 21:
                        textElement.setValue(aagcResult.getBeta().toString());
                        break;
                    case 22:
                        textElement.setValue(aagcResult.getBetat().toString());
                        break;
                    case 23:
                        textElement.setValue(aagcResult.getBeta3().toString());
                        break;
                    case 24:
                        textElement.setValue(aagcResult.getThkk().toString());
                        break;
                    case 25:
                        textElement.setValue(aagcResult.getThkt().toString());
                        break;
                    case 26:
                        textElement.setValue(aagcResult.getThkp().toString());
                        break;
                    case 27:
                        textElement.setValue(aagcResult.getThkcc().toString());
                        break;
                    case 28:
                        textElement.setValue(aagcResult.getThkcd().toString());
                        break;
                    case 29:
                        textElement.setValue(aagcResult.getThkcchk());
                        break;
                    case 30:
                        textElement.setValue(aagcResult.getPct().toString());
                        break;
                    case 31:
                        textElement.setValue(aagcResult.getPk().toString());
                        break;
                    case 32:
                        textElement.setValue(aagcResult.getPt().toString());
                        break;
                    case 33:
                        textElement.setValue(aagcResult.getPp().toString());
                        break;
                    case 34:
                        textElement.setValue(aagcResult.getMawpc().toString());
                        break;
                    case 35:
                        textElement.setValue("≥" + Double.toString(3.0D * aagcResult.getThkcn()));
                        break;
                    case 36:
                        textElement.setValue("Φ" + aagcResult.getDsi().toString());
                        break;
                    case 37:
                        textElement.setValue(aagcResult.getAlpha().toString() + "°");
                        break;
                    case 38:
                        textElement.setValue(aagcResult.getThkcn().toString());
                        break;
                    case 39:
                        textElement.setValue("R" + aagcResult.getRi().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var15) {
            var15.printStackTrace();
            return "-1";
        }
    }

    /**
     * aaha
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aahaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAHA(String baseFileName, AAHADocx aahaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/a/h/a/AAHA.docx";

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
                        textElement.setValue(aahaResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aahaResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aahaResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aahaResult.getTest());
                        break;
                    case "$$005":
                        textElement.setValue(aahaResult.getDelta().toString());
                        break;

                    case "$$006":
                        textElement.setValue(aahaResult.getJstd());
                        break;
                    case "$$007":
                        textElement.setValue(aahaResult.getJname());
                        break;
                    case "$$008":
                        textElement.setValue(aahaResult.getSdo().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aahaResult.getThkjn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aahaResult.getCj2().toString());
                        break;

                    case "$$011":
                        textElement.setValue(aahaResult.getBstd());
                        break;
                    case "$$012":
                        textElement.setValue(aahaResult.getBname());
                        break;
                    case "$$013":
                        textElement.setValue(aahaResult.getThkbn().toString());
                        break;

                    case "$$014":
                        textElement.setValue(aahaResult.getSstd());
                        break;
                    case "$$015":
                        textElement.setValue(aahaResult.getSname());
                        break;
                    case "$$016":
                        textElement.setValue(aahaResult.getBdi().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aahaResult.getThksn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aahaResult.getCs2().toString());
                        break;

                    case "$$019":
                        textElement.setValue(aahaResult.getL2().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aahaResult.getL3().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aahaResult.getH().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aahaResult.getNd().toString());
                        break;

                    case "$$023":
                        textElement.setValue(aahaResult.getDj().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aahaResult.getOjt().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aahaResult.getOj().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aahaResult.getRjel().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aahaResult.getOjt1() < 0 ? "/" : aahaResult.getOjt1().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aahaResult.getEjt().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aahaResult.getCj1().toString());
                        break;

                    case "$$030":
                        textElement.setValue(aahaResult.getDs().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aahaResult.getRsel().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aahaResult.getCs1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aahaResult.getEst().toString());
                        break;

                    case "$$034":
                        textElement.setValue(aahaResult.getDb().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aahaResult.getObt().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aahaResult.getOb().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aahaResult.getRbel().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aahaResult.getObt1() < 0 ? "/" : aahaResult.getObt1().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aahaResult.getEbt().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aahaResult.getCb1().toString());
                        break;

                    case "$$041":
                        textElement.setValue(aahaResult.getOs().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aahaResult.getOst().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aahaResult.getOst1() < 0 ? "/" : aahaResult.getOst1().toString());
                        break;

                    case "$$044":
                        textElement.setValue(aahaResult.getPc().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aahaResult.getCj().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aahaResult.getThkje().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aahaResult.getSdm().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aahaResult.getSdi().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aahaResult.getCs().toString());
                        break;
                    case "$$050":
                        textElement.setValue(aahaResult.getThkse().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aahaResult.getBdo().toString());
                        break;
                    case "$$052":
                        textElement.setValue(aahaResult.getThkbe().toString());
                        break;

                    case "$$053":
                        textElement.setValue(aahaResult.getO1().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aahaResult.getO1chk());
                        break;

                    case "$$055":
                        textElement.setValue(aahaResult.getL1().toString());
                        break;
                    case "$$056":
                        textElement.setValue(aahaResult.getO2().toString());
                        break;
                    case "$$057":
                        textElement.setValue(aahaResult.getOmin().toString());
                        break;
                    case "$$058":
                        textElement.setValue(aahaResult.getO2chk());
                        break;

                    case "$$059":
                        textElement.setValue(aahaResult.getO3().toString());
                        break;
                    case "$$060":
                        textElement.setValue(aahaResult.getOr().toString());
                        break;
                    case "$$061":
                        textElement.setValue(aahaResult.getN().toString());
                        break;

                    case "$$062":
                        textElement.setValue(aahaResult.getEta().toString());
                        break;
                    case "$$063":
                        textElement.setValue(aahaResult.getPjt().toString());
                        break;
                    case "$$064":
                        textElement.setValue(aahaResult.getPst().toString());
                        break;
                    case "$$065":
                        textElement.setValue(aahaResult.getPbt().toString());
                        break;
                    case "$$066":
                        textElement.setValue(aahaResult.getPt().toString());
                        break;

                    case "$09":
                        textElement.setValue(aahaResult.getThkjn().toString());
                        break;
                    case "$08":
                        textElement.setValue("Φ" + aahaResult.getSdo().toString());
                        break;
                    case "$19":
                        textElement.setValue(aahaResult.getL2().toString());
                        break;
                    case "$13":
                        textElement.setValue(aahaResult.getThkbn().toString());
                        break;
                    case "$16":
                        textElement.setValue("Φ" + aahaResult.getBdi().toString());
                        break;
                    case "$20":
                        textElement.setValue(aahaResult.getL3().toString());
                        break;
                    case "$55":
                        textElement.setValue(aahaResult.getL1().toString());
                        break;
                    case "$21":
                        textElement.setValue(aahaResult.getH().toString());
                        break;
                    case "$17":
                        textElement.setValue(aahaResult.getThksn().toString());
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
     * aahb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aahbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAHB(String baseFileName, AAHBDocx aahbResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/a/h/b/AAHB.docx";

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
                        textElement.setValue(aahbResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aahbResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aahbResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aahbResult.getTest());
                        break;
                    case "$$005":
                        textElement.setValue(aahbResult.getDelta().toString());
                        break;

                    case "$$006":
                        textElement.setValue(aahbResult.getJstd());
                        break;
                    case "$$007":
                        textElement.setValue(aahbResult.getJname());
                        break;
                    case "$$008":
                        textElement.setValue(aahbResult.getSdo().toString());
                        break;
                    case "$$009":
                        textElement.setValue(aahbResult.getThkjn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aahbResult.getCj2().toString());
                        break;

                    case "$$011":
                        textElement.setValue(aahbResult.getBstd());
                        break;
                    case "$$012":
                        textElement.setValue(aahbResult.getBname());
                        break;
                    case "$$013":
                        textElement.setValue(aahbResult.getBdi().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aahbResult.getThkbn().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aahbResult.getCb2().toString());
                        break;

                    case "$$016":
                        textElement.setValue(aahbResult.getL2().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aahbResult.getH().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aahbResult.getNd().toString());
                        break;

                    case "$$019":
                        textElement.setValue(aahbResult.getDj().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aahbResult.getOjt().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aahbResult.getOj().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aahbResult.getRjel().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aahbResult.getOjt1() < 0 ? "/" : aahbResult.getOjt1().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aahbResult.getEjt().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aahbResult.getCj1().toString());
                        break;

                    case "$$026":
                        textElement.setValue(aahbResult.getDb().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aahbResult.getObt().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aahbResult.getOb().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aahbResult.getRbel().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aahbResult.getObt1() < 0 ? "/" : aahbResult.getObt1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aahbResult.getEbt().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aahbResult.getCb1().toString());
                        break;

                    case "$$033":
                        textElement.setValue(aahbResult.getPc().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aahbResult.getCj().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aahbResult.getThkje().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aahbResult.getSdm().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aahbResult.getSdi().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aahbResult.getCb().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aahbResult.getThkbe().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aahbResult.getBdo().toString());
                        break;

                    case "$$041":
                        textElement.setValue(aahbResult.getO1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aahbResult.getO1chk());
                        break;

                    case "$$043":
                        textElement.setValue(aahbResult.getL1().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aahbResult.getO2().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aahbResult.getOmin().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aahbResult.getO2chk());
                        break;

                    case "$$047":
                        textElement.setValue(aahbResult.getO3().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aahbResult.getOr().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aahbResult.getN().toString());
                        break;

                    case "$$050":
                        textElement.setValue(aahbResult.getEta().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aahbResult.getPjt().toString());
                        break;
                    case "$$052":
                        textElement.setValue(aahbResult.getPbt().toString());
                        break;
                    case "$$053":
                        textElement.setValue(aahbResult.getPt().toString());
                        break;

                    case "$09":
                        textElement.setValue(aahbResult.getThkjn().toString());
                        break;
                    case "$08":
                        textElement.setValue("Φ" + aahbResult.getSdo().toString());
                        break;
                    case "$14":
                        textElement.setValue(aahbResult.getThkbn().toString());
                        break;
                    case "$13":
                        textElement.setValue("Φ" + aahbResult.getBdi().toString());
                        break;
                    case "$16":
                        textElement.setValue(aahbResult.getL2().toString());
                        break;
                    case "$43":
                        textElement.setValue(aahbResult.getL1().toString());
                        break;
                    case "$17":
                        textElement.setValue(aahbResult.getH().toString());
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
     * aai
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aaiResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAI(String baseFileName, AAIDocx aaiResult) {
        String template;
        if (aaiResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/a/i/AAIL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/a/i/AAIG.docx";
        }

        File from = new File(template);
        String docName = "D:/data" + baseFileName + ".docx";

        try {
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());
            Files.createFile(docPath);
            File docFile = new File(docName);
            DocxTool.copyDocx(from, docFile);
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            List<Object> texts = getText(mainDocumentPart);
            Iterator var10 = texts.iterator();

            while (var10.hasNext()) {
                Object text = var10.next();
                Text textElement = (Text) text;
                if (textElement.getValue().equals("$$001")) {
                    textElement.setValue(aaiResult.getPd().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(aaiResult.getT().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(aaiResult.getPs().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(aaiResult.getStd());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(aaiResult.getName());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(aaiResult.getDw().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(aaiResult.getR().toString());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(aaiResult.getThkn().toString());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(aaiResult.getC2().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(aaiResult.getE().toString());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(aaiResult.getTest());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(aaiResult.getDensity().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(aaiResult.getRel().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(aaiResult.getC1().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(aaiResult.getOt().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(aaiResult.getO().toString());
                } else if (textElement.getValue().equals("$$017")) {
                    textElement.setValue(aaiResult.getOt1() < 0.0D ? "/" : aaiResult.getOt1().toString());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(aaiResult.getPc().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(aaiResult.getM().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(aaiResult.getN().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(aaiResult.getA1().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(aaiResult.getC().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(aaiResult.getThk0().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(aaiResult.getThk().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(aaiResult.getThkchk());
                } else if (textElement.getValue().equals("$$026")) {
                    textElement.setValue(aaiResult.getPmawp().toString());
                } else if (textElement.getValue().equals("$$027")) {
                    textElement.setValue(aaiResult.getPt().toString());
                } else if (textElement.getValue().equals("$06")) {
                    textElement.setValue("Φ" + aaiResult.getDw().toString());
                } else if (textElement.getValue().equals("$07")) {
                    textElement.setValue("R" + aaiResult.getR().toString());
                } else if (textElement.getValue().equals("$08")) {
                    textElement.setValue(aaiResult.getThkn().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var13) {
            var13.printStackTrace();
            return "-1";
        }
    }

    /**
     * aaj
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aajResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAJ(String baseFileName, AAJDocx aajResult) {
        String template = "D:/mechw/static/west/cal/a/a/j/AAJ.docx";
        File from = new File(template);
        String docName = "D:/data" + baseFileName + ".docx";

        try {
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());
            Files.createFile(docPath);
            File docFile = new File(docName);
            DocxTool.copyDocx(from, docFile);
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            List<Object> texts = getText(mainDocumentPart);
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 67;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 68;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 69;
                        }
                        break;
                    case 36167:
                        if (var13.equals("$14")) {
                            var14 = 70;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 71;
                        }
                        break;
                    case 34366897:
                        if (var13.equals("$$001")) {
                            var14 = 0;
                        }
                        break;
                    case 34366898:
                        if (var13.equals("$$002")) {
                            var14 = 1;
                        }
                        break;
                    case 34366899:
                        if (var13.equals("$$003")) {
                            var14 = 2;
                        }
                        break;
                    case 34366900:
                        if (var13.equals("$$004")) {
                            var14 = 3;
                        }
                        break;
                    case 34366901:
                        if (var13.equals("$$005")) {
                            var14 = 4;
                        }
                        break;
                    case 34366902:
                        if (var13.equals("$$006")) {
                            var14 = 5;
                        }
                        break;
                    case 34366903:
                        if (var13.equals("$$007")) {
                            var14 = 6;
                        }
                        break;
                    case 34366904:
                        if (var13.equals("$$008")) {
                            var14 = 7;
                        }
                        break;
                    case 34366905:
                        if (var13.equals("$$009")) {
                            var14 = 8;
                        }
                        break;
                    case 34366927:
                        if (var13.equals("$$010")) {
                            var14 = 9;
                        }
                        break;
                    case 34366928:
                        if (var13.equals("$$011")) {
                            var14 = 10;
                        }
                        break;
                    case 34366929:
                        if (var13.equals("$$012")) {
                            var14 = 11;
                        }
                        break;
                    case 34366930:
                        if (var13.equals("$$013")) {
                            var14 = 12;
                        }
                        break;
                    case 34366931:
                        if (var13.equals("$$014")) {
                            var14 = 13;
                        }
                        break;
                    case 34366932:
                        if (var13.equals("$$015")) {
                            var14 = 14;
                        }
                        break;
                    case 34366933:
                        if (var13.equals("$$016")) {
                            var14 = 15;
                        }
                        break;
                    case 34366934:
                        if (var13.equals("$$017")) {
                            var14 = 16;
                        }
                        break;
                    case 34366935:
                        if (var13.equals("$$018")) {
                            var14 = 17;
                        }
                        break;
                    case 34366936:
                        if (var13.equals("$$019")) {
                            var14 = 18;
                        }
                        break;
                    case 34366958:
                        if (var13.equals("$$020")) {
                            var14 = 19;
                        }
                        break;
                    case 34366959:
                        if (var13.equals("$$021")) {
                            var14 = 20;
                        }
                        break;
                    case 34366960:
                        if (var13.equals("$$022")) {
                            var14 = 21;
                        }
                        break;
                    case 34366961:
                        if (var13.equals("$$023")) {
                            var14 = 22;
                        }
                        break;
                    case 34366962:
                        if (var13.equals("$$024")) {
                            var14 = 23;
                        }
                        break;
                    case 34366963:
                        if (var13.equals("$$025")) {
                            var14 = 24;
                        }
                        break;
                    case 34366964:
                        if (var13.equals("$$026")) {
                            var14 = 25;
                        }
                        break;
                    case 34366965:
                        if (var13.equals("$$027")) {
                            var14 = 26;
                        }
                        break;
                    case 34366966:
                        if (var13.equals("$$028")) {
                            var14 = 27;
                        }
                        break;
                    case 34366967:
                        if (var13.equals("$$029")) {
                            var14 = 28;
                        }
                        break;
                    case 34366989:
                        if (var13.equals("$$030")) {
                            var14 = 29;
                        }
                        break;
                    case 34366990:
                        if (var13.equals("$$031")) {
                            var14 = 30;
                        }
                        break;
                    case 34366991:
                        if (var13.equals("$$032")) {
                            var14 = 31;
                        }
                        break;
                    case 34366992:
                        if (var13.equals("$$033")) {
                            var14 = 32;
                        }
                        break;
                    case 34366993:
                        if (var13.equals("$$034")) {
                            var14 = 33;
                        }
                        break;
                    case 34366994:
                        if (var13.equals("$$035")) {
                            var14 = 34;
                        }
                        break;
                    case 34366995:
                        if (var13.equals("$$036")) {
                            var14 = 35;
                        }
                        break;
                    case 34366996:
                        if (var13.equals("$$037")) {
                            var14 = 36;
                        }
                        break;
                    case 34366997:
                        if (var13.equals("$$038")) {
                            var14 = 37;
                        }
                        break;
                    case 34366998:
                        if (var13.equals("$$039")) {
                            var14 = 38;
                        }
                        break;
                    case 34367020:
                        if (var13.equals("$$040")) {
                            var14 = 39;
                        }
                        break;
                    case 34367021:
                        if (var13.equals("$$041")) {
                            var14 = 40;
                        }
                        break;
                    case 34367022:
                        if (var13.equals("$$042")) {
                            var14 = 41;
                        }
                        break;
                    case 34367023:
                        if (var13.equals("$$043")) {
                            var14 = 42;
                        }
                        break;
                    case 34367024:
                        if (var13.equals("$$044")) {
                            var14 = 43;
                        }
                        break;
                    case 34367025:
                        if (var13.equals("$$045")) {
                            var14 = 44;
                        }
                        break;
                    case 34367026:
                        if (var13.equals("$$046")) {
                            var14 = 45;
                        }
                        break;
                    case 34367027:
                        if (var13.equals("$$047")) {
                            var14 = 46;
                        }
                        break;
                    case 34367028:
                        if (var13.equals("$$048")) {
                            var14 = 47;
                        }
                        break;
                    case 34367029:
                        if (var13.equals("$$049")) {
                            var14 = 48;
                        }
                        break;
                    case 34367051:
                        if (var13.equals("$$050")) {
                            var14 = 49;
                        }
                        break;
                    case 34367052:
                        if (var13.equals("$$051")) {
                            var14 = 50;
                        }
                        break;
                    case 34367053:
                        if (var13.equals("$$052")) {
                            var14 = 51;
                        }
                        break;
                    case 34367054:
                        if (var13.equals("$$053")) {
                            var14 = 52;
                        }
                        break;
                    case 34367055:
                        if (var13.equals("$$054")) {
                            var14 = 53;
                        }
                        break;
                    case 34367056:
                        if (var13.equals("$$055")) {
                            var14 = 54;
                        }
                        break;
                    case 34367057:
                        if (var13.equals("$$056")) {
                            var14 = 55;
                        }
                        break;
                    case 34367058:
                        if (var13.equals("$$057")) {
                            var14 = 56;
                        }
                        break;
                    case 34367059:
                        if (var13.equals("$$058")) {
                            var14 = 57;
                        }
                        break;
                    case 34367060:
                        if (var13.equals("$$059")) {
                            var14 = 58;
                        }
                        break;
                    case 34367082:
                        if (var13.equals("$$060")) {
                            var14 = 59;
                        }
                        break;
                    case 34367083:
                        if (var13.equals("$$061")) {
                            var14 = 60;
                        }
                        break;
                    case 34367084:
                        if (var13.equals("$$062")) {
                            var14 = 61;
                        }
                        break;
                    case 34367085:
                        if (var13.equals("$$063")) {
                            var14 = 62;
                        }
                        break;
                    case 34367086:
                        if (var13.equals("$$064")) {
                            var14 = 63;
                        }
                        break;
                    case 34367087:
                        if (var13.equals("$$065")) {
                            var14 = 64;
                        }
                        break;
                    case 34367088:
                        if (var13.equals("$$066")) {
                            var14 = 65;
                        }
                        break;
                    case 34367089:
                        if (var13.equals("$$067")) {
                            var14 = 66;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(aajResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(aajResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(aajResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(aajResult.getTest());
                        break;
                    case 4:
                        textElement.setValue(aajResult.getStds());
                        break;
                    case 5:
                        textElement.setValue(aajResult.getNames());
                        break;
                    case 6:
                        textElement.setValue(aajResult.getDso().toString());
                        break;
                    case 7:
                        textElement.setValue(aajResult.getL().toString());
                        break;
                    case 8:
                        textElement.setValue(aajResult.getThksn().toString());
                        break;
                    case 9:
                        textElement.setValue(aajResult.getCs2().toString());
                        break;
                    case 10:
                        textElement.setValue(aajResult.getEs().toString());
                        break;
                    case 11:
                        textElement.setValue(aajResult.getStdb());
                        break;
                    case 12:
                        textElement.setValue(aajResult.getNameb());
                        break;
                    case 13:
                        textElement.setValue(aajResult.getThkbn().toString());
                        break;
                    case 14:
                        textElement.setValue(aajResult.getCb2().toString());
                        break;
                    case 15:
                        textElement.setValue(aajResult.getEb().toString());
                        break;
                    case 16:
                        textElement.setValue(aajResult.getStde());
                        break;
                    case 17:
                        textElement.setValue(aajResult.getNamee());
                        break;
                    case 18:
                        textElement.setValue(aajResult.getThken().toString());
                        break;
                    case 19:
                        textElement.setValue(aajResult.getCe2().toString());
                        break;
                    case 20:
                        textElement.setValue(aajResult.getEe().toString());
                        break;
                    case 21:
                        textElement.setValue(aajResult.getDs().toString());
                        break;
                    case 22:
                        textElement.setValue(aajResult.getCs1().toString());
                        break;
                    case 23:
                        textElement.setValue(aajResult.getRtsel().toString());
                        break;
                    case 24:
                        textElement.setValue(aajResult.getOst().toString());
                        break;
                    case 25:
                        textElement.setValue(aajResult.getOs().toString());
                        break;
                    case 26:
                        textElement.setValue(aajResult.getOst1() < 0.0D ? "/" : aajResult.getOst1().toString());
                        break;
                    case 27:
                        textElement.setValue(aajResult.getDe().toString());
                        break;
                    case 28:
                        textElement.setValue(aajResult.getCe1().toString());
                        break;
                    case 29:
                        textElement.setValue(aajResult.getRteel().toString());
                        break;
                    case 30:
                        textElement.setValue(aajResult.getDb().toString());
                        break;
                    case 31:
                        textElement.setValue(aajResult.getCb1().toString());
                        break;
                    case 32:
                        textElement.setValue(aajResult.getRtbel().toString());
                        break;
                    case 33:
                        textElement.setValue(aajResult.getObt().toString());
                        break;
                    case 34:
                        textElement.setValue(aajResult.getOb().toString());
                        break;
                    case 35:
                        textElement.setValue(aajResult.getObt1() < 0.0D ? "/" : aajResult.getObt1().toString());
                        break;
                    case 36:
                        textElement.setValue(aajResult.getOet().toString());
                        break;
                    case 37:
                        textElement.setValue(aajResult.getOe().toString());
                        break;
                    case 38:
                        textElement.setValue(aajResult.getOet1() < 0.0D ? "/" : aajResult.getOet1().toString());
                        break;
                    case 39:
                        textElement.setValue(aajResult.getPc().toString());
                        break;
                    case 40:
                        textElement.setValue(aajResult.getCs().toString());
                        break;
                    case 41:
                        textElement.setValue(aajResult.getThkse().toString());
                        break;
                    case 42:
                        textElement.setValue(aajResult.getRso().toString());
                        break;
                    case 43:
                        textElement.setValue(aajResult.getCb().toString());
                        break;
                    case 44:
                        textElement.setValue(aajResult.getThkbe().toString());
                        break;
                    case 45:
                        textElement.setValue(aajResult.getCe().toString());
                        break;
                    case 46:
                        textElement.setValue(aajResult.getThkee().toString());
                        break;
                    case 47:
                        textElement.setValue(aajResult.getOsc().toString());
                        break;
                    case 48:
                        textElement.setValue(aajResult.getOstes().toString());
                        break;
                    case 49:
                        textElement.setValue(aajResult.getOscchk());
                        break;
                    case 50:
                        textElement.setValue(aajResult.getKs().toString());
                        break;
                    case 51:
                        textElement.setValue(aajResult.getOscc().toString());
                        break;
                    case 52:
                        textElement.setValue(aajResult.getEsost().toString());
                        break;
                    case 53:
                        textElement.setValue(aajResult.getOsccchk());
                        break;
                    case 54:
                        textElement.setValue(aajResult.getKb().toString());
                        break;
                    case 55:
                        textElement.setValue(aajResult.getObc().toString());
                        break;
                    case 56:
                        textElement.setValue(aajResult.getEbobt().toString());
                        break;
                    case 57:
                        textElement.setValue(aajResult.getObcchk());
                        break;
                    case 58:
                        textElement.setValue(aajResult.getKe().toString());
                        break;
                    case 59:
                        textElement.setValue(aajResult.getOec().toString());
                        break;
                    case 60:
                        textElement.setValue(aajResult.getEeoet().toString());
                        break;
                    case 61:
                        textElement.setValue(aajResult.getOecchk());
                        break;
                    case 62:
                        textElement.setValue(aajResult.getEta().toString());
                        break;
                    case 63:
                        textElement.setValue(aajResult.getPst().toString());
                        break;
                    case 64:
                        textElement.setValue(aajResult.getPbt().toString());
                        break;
                    case 65:
                        textElement.setValue(aajResult.getPet().toString());
                        break;
                    case 66:
                        textElement.setValue(aajResult.getPt().toString());
                        break;
                    case 67:
                        textElement.setValue(aajResult.getDso().toString());
                        break;
                    case 68:
                        textElement.setValue(aajResult.getL().toString());
                        break;
                    case 69:
                        textElement.setValue(aajResult.getThksn().toString());
                        break;
                    case 70:
                        textElement.setValue(aajResult.getThkbn().toString());
                        break;
                    case 71:
                        textElement.setValue(aajResult.getThken().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var15) {
            var15.printStackTrace();
            return "-1";
        }
    }

    /**
     * aaka
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aakaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAKA(String baseFileName, AAKADocx aakaResult) {
        String template = "D:/mechw/static/west/cal/a/a/k/a/AAKA.docx";
        File from = new File(template);
        String docName = "D:/data" + baseFileName + ".docx";

        try {
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());
            Files.createFile(docPath);
            File docFile = new File(docName);
            DocxTool.copyDocx(from, docFile);
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            List<Object> texts = getText(mainDocumentPart);

            // 替换 text 的内容
            Text textElement;
            for (Object text : texts) {

                textElement = (Text) text;
                switch (textElement.getValue()) {

                    case "$$001":
                        textElement.setValue(aakaResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aakaResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aakaResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aakaResult.getTest());
                        break;
                    case "$$005":
                        textElement.setValue(aakaResult.getC2().toString());
                        break;
                    case "$$006":
                        textElement.setValue(aakaResult.getFai().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aakaResult.getStd());
                        break;
                    case "$$008":
                        textElement.setValue(aakaResult.getName());
                        break;
                    case "$$009":
                        textElement.setValue(aakaResult.getDi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aakaResult.getHi().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aakaResult.getThkn().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aakaResult.getH().toString());
                        break;

                    case "$$013":
                        textElement.setValue(aakaResult.getDensity().toString());
                        break;
                    case "$$014":
                        textElement.setValue(aakaResult.getRel().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aakaResult.getC1().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aakaResult.getRelt().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aakaResult.getOt().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aakaResult.getO().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aakaResult.getOt1() < 0 ? "/" : aakaResult.getOt1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aakaResult.getEt().toString());
                        break;

                    case "$$021":
                        textElement.setValue(aakaResult.getPc().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aakaResult.getC().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aakaResult.getThke().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aakaResult.getDout().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aakaResult.getHo().toString());
                        break;

                    case "$$026":
                        textElement.setValue(aakaResult.getK().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aakaResult.getThkc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aakaResult.getThkm().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aakaResult.getThkd().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aakaResult.getThkchk());
                        break;

                    case "$$031":
                        textElement.setValue(aakaResult.getR().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aakaResult.getL().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aakaResult.getK1().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aakaResult.getK2().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aakaResult.getA().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aakaResult.getB().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aakaResult.getBeta().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aakaResult.getSai().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aakaResult.getF().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aakaResult.getRe().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aakaResult.getOe().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aakaResult.getPe().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aakaResult.getPy().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aakaResult.getPck().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aakaResult.getN().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aakaResult.getPk().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aakaResult.getPchk());
                        break;

                    case "$$048":
                        textElement.setValue(aakaResult.getEta().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aakaResult.getPt().toString());
                        break;

                    case "$$050":
                        textElement.setValue(aakaResult.getPm().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aakaResult.getMawp().toString());
                        break;

                    case "$$052":
                        textElement.setValue(aakaResult.getAi().toString());
                        break;
                    case "$$053":
                        textElement.setValue(aakaResult.getAo().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aakaResult.getVi().toString());
                        break;
                    case "$$055":
                        textElement.setValue(aakaResult.getM().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + aakaResult.getDi().toString());
                        break;
                    case "$10":
                        textElement.setValue(aakaResult.getHi().toString());
                        break;
                    case "$11":
                        textElement.setValue(aakaResult.getThkn().toString());
                        break;
                    case "$12":
                        textElement.setValue(aakaResult.getH().toString());
                        break;
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception exception) {
            exception.printStackTrace();
            return "-1";
        }
    }

    /**
     * aakb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aakbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAAKB(String baseFileName, AAKBDocx aakbResult) {
        String template = "D:/mechw/static/west/cal/a/a/k/b/AAKB.docx";
        File from = new File(template);
        String docName = "D:/data" + baseFileName + ".docx";

        try {
            Path docPath = Paths.get(docName);
            Files.createDirectories(docPath.getParent());
            Files.createFile(docPath);
            File docFile = new File(docName);
            DocxTool.copyDocx(from, docFile);
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docFile);
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            List<Object> texts = getText(mainDocumentPart);

            // 替换 text 的内容
            Text textElement;
            for (Object text : texts) {

                textElement = (Text) text;
                switch (textElement.getValue()) {

                    case "$$001":
                        textElement.setValue(aakbResult.getPd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(aakbResult.getT().toString());
                        break;
                    case "$$003":
                        textElement.setValue(aakbResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aakbResult.getTest());
                        break;
                    case "$$005":
                        textElement.setValue(aakbResult.getC2().toString());
                        break;
                    case "$$006":
                        textElement.setValue(aakbResult.getFai().toString());
                        break;
                    case "$$007":
                        textElement.setValue(aakbResult.getStd());
                        break;
                    case "$$008":
                        textElement.setValue(aakbResult.getName());
                        break;
                    case "$$009":
                        textElement.setValue(aakbResult.getDi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aakbResult.getBri().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aakbResult.getSri().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aakbResult.getThkn().toString());
                        break;
                    case "$$013":
                        textElement.setValue(aakbResult.getH().toString());
                        break;

                    case "$$014":
                        textElement.setValue(aakbResult.getDensity().toString());
                        break;
                    case "$$015":
                        textElement.setValue(aakbResult.getRel().toString());
                        break;
                    case "$$016":
                        textElement.setValue(aakbResult.getC1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aakbResult.getRelt().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aakbResult.getOt().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aakbResult.getO().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aakbResult.getOt1() < 0 ? "/" : aakbResult.getOt1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aakbResult.getEt().toString());
                        break;

                    case "$$022":
                        textElement.setValue(aakbResult.getPc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aakbResult.getC().toString());
                        break;
                    case "$$024":
                        textElement.setValue(aakbResult.getThke().toString());
                        break;
                    case "$$025":
                        textElement.setValue(aakbResult.getDout().toString());
                        break;
                    case "$$026":
                        textElement.setValue(aakbResult.getBro().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aakbResult.getSro().toString());
                        break;

                    case "$$028":
                        textElement.setValue(aakbResult.getM().toString());
                        break;
                    case "$$029":
                        textElement.setValue(aakbResult.getThkc().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aakbResult.getThkm().toString());
                        break;
                    case "$$031":
                        textElement.setValue(aakbResult.getThkd().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aakbResult.getThkchk());
                        break;

                    case "$$033":
                        textElement.setValue(aakbResult.getK1().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aakbResult.getK2().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aakbResult.getA().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aakbResult.getB().toString());
                        break;
                    case "$$037":
                        textElement.setValue(aakbResult.getBeta().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aakbResult.getSai().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aakbResult.getF().toString());
                        break;
                    case "$$040":
                        textElement.setValue(aakbResult.getRe().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aakbResult.getOe().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aakbResult.getPe().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aakbResult.getPy().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aakbResult.getPck().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aakbResult.getN().toString());
                        break;
                    case "$$046":
                        textElement.setValue(aakbResult.getPk().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aakbResult.getPchk());
                        break;

                    case "$$048":
                        textElement.setValue(aakbResult.getEta().toString());
                        break;
                    case "$$049":
                        textElement.setValue(aakbResult.getPt().toString());
                        break;

                    case "$$050":
                        textElement.setValue(aakbResult.getPm().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aakbResult.getMawp().toString());
                        break;

                    case "$$052":
                        textElement.setValue(aakbResult.getAi().toString());
                        break;
                    case "$$053":
                        textElement.setValue(aakbResult.getAo().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aakbResult.getVi().toString());
                        break;
                    case "$$055":
                        textElement.setValue(aakbResult.getMass().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + aakbResult.getDi().toString());
                        break;
                    case "$10":
                        textElement.setValue(aakbResult.getBri().toString());
                        break;
                    case "$11":
                        textElement.setValue(aakbResult.getSri().toString());
                        break;
                    case "$13":
                        textElement.setValue(aakbResult.getH().toString());
                        break;
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception exception) {
            exception.printStackTrace();
            return "-1";
        }
    }
}
