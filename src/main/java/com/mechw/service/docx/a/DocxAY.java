package com.mechw.service.docx.a;

import com.mechw.model.front.a.y.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxAY extends DocxTool {

    /**
     * ayfa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayfaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFA(String baseFileName, AYFADocx ayfaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/a/AYFA.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayfaResult.getStd());
                        break;
                    case "$$002":
                        textElement.setValue(ayfaResult.getName());
                        break;
                    case "$$003":
                        textElement.setValue(ayfaResult.getThkn().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayfaResult.getL().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayfaResult.getR().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayfaResult.getD().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayfaResult.getC2().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayfaResult.getMass().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayfaResult.getDensity().toString());
                        break;
                    case "$$010":
                        textElement.setValue(ayfaResult.getRel().toString());
                        break;
                    case "$$011":
                        textElement.setValue(ayfaResult.getC1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayfaResult.getC().toString());
                        break;
                    case "$$013":
                        textElement.setValue(ayfaResult.getThke().toString());
                        break;
                    case "$$014":
                        textElement.setValue(ayfaResult.getE().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayfaResult.getK().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayfaResult.getFv().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayfaResult.getFh().toString());
                        break;
                    case "$$018":
                        textElement.setValue(ayfaResult.getFl().toString());
                        break;
                    case "$$019":
                        textElement.setValue(ayfaResult.getM().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayfaResult.getOl().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayfaResult.getOlallow().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayfaResult.getOlchk());
                        break;
                    case "$$023":
                        textElement.setValue(ayfaResult.getTl().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayfaResult.getTlallow().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayfaResult.getTlchk());
                        break;
                    case "$$026":
                        textElement.setValue(ayfaResult.getA().toString());
                        break;
                    case "$$027":
                        textElement.setValue(ayfaResult.getOa().toString());
                        break;
                    case "$$028":
                        textElement.setValue(ayfaResult.getTa().toString());
                        break;
                    case "$$029":
                        textElement.setValue(ayfaResult.getOb().toString());
                        break;
                    case "$$030":
                        textElement.setValue(ayfaResult.getOab().toString());
                        break;
                    case "$$031":
                        textElement.setValue(ayfaResult.getOaballow().toString());
                        break;
                    case "$$032":
                        textElement.setValue(ayfaResult.getOabchk());
                        break;
                    case "$01":
                        textElement.setValue("R" + ayfaResult.getR().toString());
                        break;
                    case "$02":
                        textElement.setValue("Φ" + ayfaResult.getD().toString());
                        break;
                    case "$03":
                        textElement.setValue(ayfaResult.getL().toString());
                        break;
                    case "$04":
                        textElement.setValue(ayfaResult.getThkn().toString());
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
     * ayfb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayfbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFB(String baseFileName, AYFBDocx ayfbResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/b/AYFB.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayfbResult.getStd());
                        break;
                    case "$$002":
                        textElement.setValue(ayfbResult.getName());
                        break;
                    case "$$003":
                        textElement.setValue(ayfbResult.getThkn().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayfbResult.getL().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayfbResult.getR().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayfbResult.getD().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayfbResult.getC2().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayfbResult.getMass().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayfbResult.getDensity().toString());
                        break;
                    case "$$010":
                        textElement.setValue(ayfbResult.getRel().toString());
                        break;
                    case "$$011":
                        textElement.setValue(ayfbResult.getC1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayfbResult.getC().toString());
                        break;
                    case "$$013":
                        textElement.setValue(ayfbResult.getThke().toString());
                        break;
                    case "$$014":
                        textElement.setValue(ayfbResult.getE().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayfbResult.getK().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayfbResult.getFv().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayfbResult.getFh().toString());
                        break;
                    case "$$018":
                        textElement.setValue(ayfbResult.getFl().toString());
                        break;
                    case "$$019":
                        textElement.setValue(ayfbResult.getM().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayfbResult.getOl().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayfbResult.getOlallow().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayfbResult.getOlchk());
                        break;
                    case "$$023":
                        textElement.setValue(ayfbResult.getTl().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayfbResult.getTlallow().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayfbResult.getTlchk());
                        break;
                    case "$$026":
                        textElement.setValue(ayfbResult.getA().toString());
                        break;
                    case "$$027":
                        textElement.setValue(ayfbResult.getOa().toString());
                        break;
                    case "$$028":
                        textElement.setValue(ayfbResult.getTa().toString());
                        break;
                    case "$$029":
                        textElement.setValue(ayfbResult.getOb().toString());
                        break;
                    case "$$030":
                        textElement.setValue(ayfbResult.getOab().toString());
                        break;
                    case "$$031":
                        textElement.setValue(ayfbResult.getOaballow().toString());
                        break;
                    case "$$032":
                        textElement.setValue(ayfbResult.getOabchk());
                        break;
                    case "$01":
                        textElement.setValue("R" + ayfbResult.getR().toString());
                        break;
                    case "$02":
                        textElement.setValue("Φ" + ayfbResult.getD().toString());
                        break;
                    case "$03":
                        textElement.setValue(ayfbResult.getL().toString());
                        break;
                    case "$04":
                        textElement.setValue(ayfbResult.getThkn().toString());
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
     * ayfc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayfcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFC(String baseFileName, AYFCDocx ayfcResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/c/AYFC.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayfcResult.getStd());
                        break;
                    case "$$002":
                        textElement.setValue(ayfcResult.getName());
                        break;
                    case "$$003":
                        textElement.setValue(ayfcResult.getThkn().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayfcResult.getL().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayfcResult.getR().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayfcResult.getD().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayfcResult.getC2().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayfcResult.getMass().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayfcResult.getDensity().toString());
                        break;
                    case "$$010":
                        textElement.setValue(ayfcResult.getRel().toString());
                        break;
                    case "$$011":
                        textElement.setValue(ayfcResult.getC1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayfcResult.getC().toString());
                        break;
                    case "$$013":
                        textElement.setValue(ayfcResult.getThke().toString());
                        break;
                    case "$$014":
                        textElement.setValue(ayfcResult.getE().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayfcResult.getK().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayfcResult.getFv().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayfcResult.getFh().toString());
                        break;
                    case "$$018":
                        textElement.setValue(ayfcResult.getFl().toString());
                        break;
                    case "$$019":
                        textElement.setValue(ayfcResult.getM().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayfcResult.getOl().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayfcResult.getOlallow().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayfcResult.getOlchk());
                        break;
                    case "$$023":
                        textElement.setValue(ayfcResult.getTl().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayfcResult.getTlallow().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayfcResult.getTlchk());
                        break;
                    case "$$026":
                        textElement.setValue(ayfcResult.getA().toString());
                        break;
                    case "$$027":
                        textElement.setValue(ayfcResult.getOa().toString());
                        break;
                    case "$$028":
                        textElement.setValue(ayfcResult.getTa().toString());
                        break;
                    case "$$029":
                        textElement.setValue(ayfcResult.getOb().toString());
                        break;
                    case "$$030":
                        textElement.setValue(ayfcResult.getOab().toString());
                        break;
                    case "$$031":
                        textElement.setValue(ayfcResult.getOaballow().toString());
                        break;
                    case "$$032":
                        textElement.setValue(ayfcResult.getOabchk());
                        break;
                    case "$01":
                        textElement.setValue("R" + ayfcResult.getR().toString());
                        break;
                    case "$02":
                        textElement.setValue("Φ" + ayfcResult.getD().toString());
                        break;
                    case "$03":
                        textElement.setValue(ayfcResult.getL().toString());
                        break;
                    case "$04":
                        textElement.setValue(ayfcResult.getThkn().toString());
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
     * ayfd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayfdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFD(String baseFileName, AYFDDocx ayfdResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/d/AYFD.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayfdResult.getDstd());
                        break;
                    case "$$002":
                        textElement.setValue(ayfdResult.getDname());
                        break;
                    case "$$003":
                        textElement.setValue(ayfdResult.getThkdn().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayfdResult.getDd().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayfdResult.getHd().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayfdResult.getLd().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayfdResult.getGd().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayfdResult.getFd().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayfdResult.getA().toString());
                        break;
                    case "$$010":
                        textElement.setValue(ayfdResult.getRd().toString());
                        break;
                    case "$$011":
                        textElement.setValue(ayfdResult.getCd2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayfdResult.getCstd());
                        break;
                    case "$$013":
                        textElement.setValue(ayfdResult.getCname());
                        break;
                    case "$$014":
                        textElement.setValue(ayfdResult.getThkcn().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayfdResult.getDc().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayfdResult.getCc2().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayfdResult.getPstd());
                        break;
                    case "$$018":
                        textElement.setValue(ayfdResult.getPname());
                        break;
                    case "$$019":
                        textElement.setValue(ayfdResult.getThkpn().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayfdResult.getHp().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayfdResult.getLp().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayfdResult.getCp2().toString());
                        break;
                    case "$$023":
                        textElement.setValue(ayfdResult.getM().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayfdResult.getDensityd().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayfdResult.getDensityc().toString());
                        break;
                    case "$$026":
                        textElement.setValue(ayfdResult.getRdel().toString());
                        break;
                    case "$$027":
                        textElement.setValue(ayfdResult.getRcel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(ayfdResult.getCd1().toString());
                        break;
                    case "$$029":
                        textElement.setValue(ayfdResult.getCc1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(ayfdResult.getDensityp().toString());
                        break;
                    case "$$031":
                        textElement.setValue(ayfdResult.getRpel().toString());
                        break;
                    case "$$032":
                        textElement.setValue(ayfdResult.getCp1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(ayfdResult.getCd().toString());
                        break;
                    case "$$034":
                        textElement.setValue(ayfdResult.getThkde().toString());
                        break;
                    case "$$035":
                        textElement.setValue(ayfdResult.getOd().toString());
                        break;
                    case "$$036":
                        textElement.setValue(ayfdResult.getTd().toString());
                        break;
                    case "$$037":
                        textElement.setValue(ayfdResult.getCc().toString());
                        break;
                    case "$$038":
                        textElement.setValue(ayfdResult.getThkce().toString());
                        break;
                    case "$$039":
                        textElement.setValue(ayfdResult.getOc().toString());
                        break;
                    case "$$040":
                        textElement.setValue(ayfdResult.getTc().toString());
                        break;
                    case "$$041":
                        textElement.setValue(ayfdResult.getCp().toString());
                        break;
                    case "$$042":
                        textElement.setValue(ayfdResult.getThkpe().toString());
                        break;
                    case "$$043":
                        textElement.setValue(ayfdResult.getOp().toString());
                        break;
                    case "$$044":
                        textElement.setValue(ayfdResult.getTp().toString());
                        break;
                    case "$$045":
                        textElement.setValue(ayfdResult.getK().toString());
                        break;
                    case "$$047":
                        textElement.setValue(ayfdResult.getFv().toString());
                        break;
                    case "$$048":
                        textElement.setValue(ayfdResult.getOl().toString());
                        break;
                    case "$$049":
                        textElement.setValue(ayfdResult.getOlallow().toString());
                        break;
                    case "$$050":
                        textElement.setValue(ayfdResult.getOlchk());
                        break;
                    case "$$051":
                        textElement.setValue(ayfdResult.getTl().toString());
                        break;
                    case "$$052":
                        textElement.setValue(ayfdResult.getTlallow().toString());
                        break;
                    case "$$053":
                        textElement.setValue(ayfdResult.getTlchk());
                        break;
                    case "$$054":
                        textElement.setValue(ayfdResult.getTw().toString());
                        break;
                    case "$$055":
                        textElement.setValue(ayfdResult.getTwallow().toString());
                        break;
                    case "$$056":
                        textElement.setValue(ayfdResult.getTwchk());
                        break;
                    case "$$057":
                        textElement.setValue(ayfdResult.getTb().toString());
                        break;
                    case "$$058":
                        textElement.setValue(ayfdResult.getTballow().toString());
                        break;
                    case "$$059":
                        textElement.setValue(ayfdResult.getTbchk());
                        break;
                    case "$01":
                        textElement.setValue(ayfdResult.getThkcn().toString());
                        break;
                    case "$02":
                        textElement.setValue(ayfdResult.getThkcn().toString());
                        break;
                    case "$03":
                        textElement.setValue(Double.toString(0.8 * ayfdResult.getThkcn()));
                        break;
                    case "$04":
                        textElement.setValue(ayfdResult.getThkdn().toString());
                        break;
                    case "$05":
                        textElement.setValue(ayfdResult.getA().toString());
                        break;
                    case "$06":
                        textElement.setValue(ayfdResult.getThkdn().toString());
                        break;
                    case "$07":
                        textElement.setValue(ayfdResult.getA().toString());
                        break;
                    case "$08":
                        textElement.setValue(ayfdResult.getThkpn().toString());
                        break;
                    case "$09":
                        textElement.setValue(Double.toString(0.8 * ayfdResult.getThkpn()));
                        break;
                    case "$10":
                        textElement.setValue("Φ" + ayfdResult.getDc().toString());
                        break;
                    case "$11":
                        textElement.setValue("Φ" + ayfdResult.getDd().toString());
                        break;
                    case "$12":
                        textElement.setValue(ayfdResult.getHd().toString());
                        break;
                    case "$13":
                        textElement.setValue(ayfdResult.getFd().toString());
                        break;
                    case "$14":
                        textElement.setValue("R" + ayfdResult.getRd().toString());
                        break;
                    case "$15":
                        textElement.setValue(ayfdResult.getLp().toString());
                        break;
                    case "$16":
                        textElement.setValue(ayfdResult.getHp().toString());
                        break;
                    case "$17":
                        textElement.setValue(ayfdResult.getLp().toString());
                        break;
                    case "$18":
                        textElement.setValue(ayfdResult.getGd().toString());
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
     * ayfe
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayfeResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFE(String baseFileName, AYFEDocx ayfeResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/e/AYFE.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayfeResult.getStd());
                        break;
                    case "$$002":
                        textElement.setValue(ayfeResult.getName());
                        break;
                    case "$$003":
                        textElement.setValue(ayfeResult.getDout().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayfeResult.getThkn().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayfeResult.getL().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayfeResult.getC2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayfeResult.getMass().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayfeResult.getDensity().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayfeResult.getRel().toString());
                        break;
                    case "$$010":
                        textElement.setValue(ayfeResult.getC1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(ayfeResult.getC().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayfeResult.getThke().toString());
                        break;
                    case "$$013":
                        textElement.setValue(ayfeResult.getO().toString());
                        break;
                    case "$$014":
                        textElement.setValue(ayfeResult.getK().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayfeResult.getFv().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayfeResult.getFh().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayfeResult.getM().toString());
                        break;
                    case "$$018":
                        textElement.setValue(ayfeResult.getA().toString());
                        break;
                    case "$$019":
                        textElement.setValue(ayfeResult.getAlpha().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayfeResult.getJ().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayfeResult.getW().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayfeResult.getOlt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(ayfeResult.getOlb().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayfeResult.getOl().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayfeResult.getOlchk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + ayfeResult.getDout().toString());
                        break;
                    case "$02":
                        textElement.setValue(ayfeResult.getThkn().toString());
                        break;
                    case "$03":
                        textElement.setValue(ayfeResult.getL().toString());
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
     * ayff
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayffResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFF(String baseFileName, AYFFDocx ayffResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/f/AYFF.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayffResult.getStd());
                        break;
                    case "$$002":
                        textElement.setValue(ayffResult.getName());
                        break;
                    case "$$003":
                        textElement.setValue(ayffResult.getDout().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayffResult.getThkn().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayffResult.getL().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayffResult.getC2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayffResult.getMass().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayffResult.getDensity().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayffResult.getRel().toString());
                        break;
                    case "$$010":
                        textElement.setValue(ayffResult.getC1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(ayffResult.getC().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayffResult.getThke().toString());
                        break;
                    case "$$013":
                        textElement.setValue(ayffResult.getO().toString());
                        break;
                    case "$$014":
                        textElement.setValue(ayffResult.getK().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayffResult.getFv().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayffResult.getFh().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayffResult.getM().toString());
                        break;
                    case "$$018":
                        textElement.setValue(ayffResult.getA().toString());
                        break;
                    case "$$019":
                        textElement.setValue(ayffResult.getAlpha().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayffResult.getJ().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayffResult.getW().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayffResult.getOlt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(ayffResult.getOlb().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayffResult.getOl().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayffResult.getOlchk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + ayffResult.getDout().toString());
                        break;
                    case "$02":
                        textElement.setValue(ayffResult.getThkn().toString());
                        break;
                    case "$03":
                        textElement.setValue(ayffResult.getL().toString());
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
     * ayfg
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayfgResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFG(String baseFileName, AYFGDocx ayfgResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/g/AYFG.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayfgResult.getStd());
                        break;
                    case "$$002":
                        textElement.setValue(ayfgResult.getName());
                        break;
                    case "$$003":
                        textElement.setValue(ayfgResult.getDout().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayfgResult.getThkn().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayfgResult.getL().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayfgResult.getC2().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayfgResult.getMass().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayfgResult.getDensity().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayfgResult.getRel().toString());
                        break;
                    case "$$010":
                        textElement.setValue(ayfgResult.getC1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(ayfgResult.getC().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayfgResult.getThke().toString());
                        break;
                    case "$$013":
                        textElement.setValue(ayfgResult.getO().toString());
                        break;
                    case "$$014":
                        textElement.setValue(ayfgResult.getK().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayfgResult.getFv().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayfgResult.getFh().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayfgResult.getM().toString());
                        break;
                    case "$$018":
                        textElement.setValue(ayfgResult.getA().toString());
                        break;
                    case "$$019":
                        textElement.setValue(ayfgResult.getAlpha().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayfgResult.getJ().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayfgResult.getW().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayfgResult.getOlt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(ayfgResult.getOlb().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayfgResult.getOl().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayfgResult.getOlchk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + ayfgResult.getDout().toString());
                        break;
                    case "$02":
                        textElement.setValue(ayfgResult.getThkn().toString());
                        break;
                    case "$03":
                        textElement.setValue(ayfgResult.getL().toString());
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
     * ayfh
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param ayfhResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAYFH(String baseFileName, AYFHDocx ayfhResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/y/f/h/AYFH.docx";

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
            for (Object text : texts) {

                Text textElement = (Text) text;
                String value = textElement.getValue();

                switch (value) {
                    case "$$001":
                        textElement.setValue(ayfhResult.getDstd());
                        break;
                    case "$$002":
                        textElement.setValue(ayfhResult.getDname());
                        break;
                    case "$$003":
                        textElement.setValue(ayfhResult.getThkdn().toString());
                        break;
                    case "$$004":
                        textElement.setValue(ayfhResult.getHd().toString());
                        break;
                    case "$$005":
                        textElement.setValue(ayfhResult.getB().toString());
                        break;
                    case "$$006":
                        textElement.setValue(ayfhResult.getDd().toString());
                        break;
                    case "$$007":
                        textElement.setValue(ayfhResult.getA().toString());
                        break;
                    case "$$008":
                        textElement.setValue(ayfhResult.getCd2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(ayfhResult.getCstd());
                        break;
                    case "$$010":
                        textElement.setValue(ayfhResult.getCname());
                        break;
                    case "$$011":
                        textElement.setValue(ayfhResult.getThkcn().toString());
                        break;
                    case "$$012":
                        textElement.setValue(ayfhResult.getDc().toString());
                        break;
                    case "$$013":
                        textElement.setValue(ayfhResult.getCc2().toString());
                        break;
                    case "$$014":
                        textElement.setValue(ayfhResult.getMass().toString());
                        break;
                    case "$$015":
                        textElement.setValue(ayfhResult.getDensityd().toString());
                        break;
                    case "$$016":
                        textElement.setValue(ayfhResult.getDensityc().toString());
                        break;
                    case "$$017":
                        textElement.setValue(ayfhResult.getCd1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(ayfhResult.getCc1().toString());
                        break;
                    case "$$019":
                        textElement.setValue(ayfhResult.getRdel().toString());
                        break;
                    case "$$020":
                        textElement.setValue(ayfhResult.getRcel().toString());
                        break;
                    case "$$021":
                        textElement.setValue(ayfhResult.getCd().toString());
                        break;
                    case "$$022":
                        textElement.setValue(ayfhResult.getThkde().toString());
                        break;
                    case "$$023":
                        textElement.setValue(ayfhResult.getOd().toString());
                        break;
                    case "$$024":
                        textElement.setValue(ayfhResult.getTd().toString());
                        break;
                    case "$$025":
                        textElement.setValue(ayfhResult.getCc().toString());
                        break;
                    case "$$026":
                        textElement.setValue(ayfhResult.getThkce().toString());
                        break;
                    case "$$027":
                        textElement.setValue(ayfhResult.getOc().toString());
                        break;
                    case "$$028":
                        textElement.setValue(ayfhResult.getTc().toString());
                        break;
                    case "$$029":
                        textElement.setValue(ayfhResult.getE().toString());
                        break;
                    case "$$030":
                        textElement.setValue(ayfhResult.getK().toString());
                        break;
                    case "$$031":
                        textElement.setValue(ayfhResult.getFv().toString());
                        break;
                    case "$$032":
                        textElement.setValue(ayfhResult.getOl().toString());
                        break;
                    case "$$033":
                        textElement.setValue(ayfhResult.getOlallow().toString());
                        break;
                    case "$$034":
                        textElement.setValue(ayfhResult.getOlchk());
                        break;
                    case "$$035":
                        textElement.setValue(ayfhResult.getTl().toString());
                        break;
                    case "$$036":
                        textElement.setValue(ayfhResult.getTlallow().toString());
                        break;
                    case "$$037":
                        textElement.setValue(ayfhResult.getTlchk());
                        break;
                    case "$$038":
                        textElement.setValue(ayfhResult.getArea().toString());
                        break;
                    case "$$039":
                        textElement.setValue(ayfhResult.getOa().toString());
                        break;
                    case "$$040":
                        textElement.setValue(ayfhResult.getOaallow().toString());
                        break;
                    case "$$041":
                        textElement.setValue(ayfhResult.getOachk());
                        break;
                    case "$01":
                        textElement.setValue(ayfhResult.getThkdn().toString());
                        break;
                    case "$02":
                        textElement.setValue(ayfhResult.getHd().toString());
                        break;
                    case "$03":
                        textElement.setValue(ayfhResult.getB().toString());
                        break;
                    case "$04":
                        textElement.setValue("Φ" + ayfhResult.getDd().toString());
                        break;
                    case "$05":
                        textElement.setValue(ayfhResult.getThkcn().toString());
                        break;
                    case "$06":
                        textElement.setValue(ayfhResult.getThkcn().toString());
                        break;
                    case "$07":
                        textElement.setValue("Φ" + ayfhResult.getDc().toString());
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
