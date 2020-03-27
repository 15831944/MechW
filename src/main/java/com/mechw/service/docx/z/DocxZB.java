package com.mechw.service.docx.z;

import com.mechw.model.front.z.b.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxZB extends DocxTool {

    /**
     * zba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbaResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBA(String baseFileName, ZBADocx zbaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/a/ZBA.docx";

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
                        textElement.setValue(zbaResult.getD().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbaResult.getA().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbaResult.getEx().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbaResult.getIx().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbaResult.getWx().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbaResult.getRx().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbaResult.getEy().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbaResult.getIy().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbaResult.getWy().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbaResult.getRy().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbaResult.getIz().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbaResult.getWz().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + zbaResult.getD().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbaResult.getEx().toString());
                        break;
                    case "$07":
                        textElement.setValue(zbaResult.getEy().toString());
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
     * zbb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbbResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBB(String baseFileName, ZBBDocx zbbResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/b/ZBB.docx";

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
                        textElement.setValue(zbbResult.getBd().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbbResult.getSd().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbbResult.getA().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbbResult.getEx().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbbResult.getIx().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbbResult.getWx().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbbResult.getRx().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbbResult.getEy().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbbResult.getIy().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbbResult.getWy().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbbResult.getRy().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbbResult.getIz().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbbResult.getWz().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + zbbResult.getBd().toString());
                        break;
                    case "$02":
                        textElement.setValue("Φ" + zbbResult.getSd().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbbResult.getEx().toString());
                        break;
                    case "$08":
                        textElement.setValue(zbbResult.getEy().toString());
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
     * zbc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbcResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBC(String baseFileName, ZBCDocx zbcResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/c/ZBC.docx";

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
                        textElement.setValue(zbcResult.getA().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbcResult.getB().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbcResult.getBa().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbcResult.getEx().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbcResult.getIx().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbcResult.getWx().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbcResult.getRx().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbcResult.getEy().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbcResult.getIy().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbcResult.getWy().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbcResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbcResult.getA().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbcResult.getB().toString());
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
     * zbd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbdResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBD(String baseFileName, ZBDDocx zbdResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/d/ZBD.docx";

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
                        textElement.setValue(zbdResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbdResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbdResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbdResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbdResult.getK().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbdResult.getS().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbdResult.getT().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbdResult.getU().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbdResult.getA().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbdResult.getEx1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbdResult.getEx2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbdResult.getIx().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbdResult.getWx1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbdResult.getWx2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbdResult.getRx().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbdResult.getEy1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbdResult.getEy2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbdResult.getIy().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbdResult.getWy1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zbdResult.getWy2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(zbdResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbdResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbdResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbdResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbdResult.getD().toString());
                        break;
                    case "$10":
                        textElement.setValue(zbdResult.getEx1().toString());
                        break;
                    case "$11":
                        textElement.setValue(zbdResult.getEx2().toString());
                        break;
                    case "$16":
                        textElement.setValue(zbdResult.getEy1().toString());
                        break;
                    case "$17":
                        textElement.setValue(zbdResult.getEy2().toString());
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
     * zbe
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbeResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBE(String baseFileName, ZBEDocx zbeResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/e/ZBE.docx";

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
                        textElement.setValue(zbeResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbeResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbeResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbeResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbeResult.getK().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbeResult.getB().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbeResult.getS().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbeResult.getA().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbeResult.getEx1().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbeResult.getEx2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbeResult.getIx().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbeResult.getWx1().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbeResult.getWx2().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbeResult.getRx().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbeResult.getEy1().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbeResult.getEy2().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbeResult.getIy().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbeResult.getWy1().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbeResult.getWy2().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zbeResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbeResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbeResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbeResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbeResult.getD().toString());
                        break;
                    case "$09":
                        textElement.setValue(zbeResult.getEx1().toString());
                        break;
                    case "$10":
                        textElement.setValue(zbeResult.getEx2().toString());
                        break;
                    case "$15":
                        textElement.setValue(zbeResult.getEy1().toString());
                        break;
                    case "$16":
                        textElement.setValue(zbeResult.getEy2().toString());
                        break;
                    case "$40":
                        textElement.setValue(Double.toString(zbeResult.getB() / 2));
                        break;
                    case "$50":
                        textElement.setValue(Double.toString(zbeResult.getB() / 2));
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
     * zbf
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbfResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBF(String baseFileName, ZBFDocx zbfResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/f/ZBF.docx";

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
                        textElement.setValue(zbfResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbfResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbfResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbfResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbfResult.getK().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbfResult.getB().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbfResult.getS().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbfResult.getA().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbfResult.getEx1().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbfResult.getEx2().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbfResult.getIx().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbfResult.getWx1().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbfResult.getWx2().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbfResult.getRx().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbfResult.getEy1().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbfResult.getEy2().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbfResult.getIy().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbfResult.getWy1().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbfResult.getWy2().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zbfResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbfResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbfResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbfResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbfResult.getD().toString());
                        break;
                    case "$09":
                        textElement.setValue(zbfResult.getEx1().toString());
                        break;
                    case "$10":
                        textElement.setValue(zbfResult.getEx2().toString());
                        break;
                    case "$15":
                        textElement.setValue(zbfResult.getEy1().toString());
                        break;
                    case "$16":
                        textElement.setValue(zbfResult.getEy2().toString());
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
     * zbg
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbgResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBG(String baseFileName, ZBGDocx zbgResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/g/ZBG.docx";

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
                        textElement.setValue(zbgResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbgResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbgResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbgResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbgResult.getK().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbgResult.getB().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbgResult.getA().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbgResult.getEx1().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbgResult.getEx2().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbgResult.getIx().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbgResult.getWx1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbgResult.getWx2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbgResult.getRx().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbgResult.getEy1().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbgResult.getEy2().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbgResult.getIy().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbgResult.getWy1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbgResult.getWy2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbgResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbgResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbgResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbgResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbgResult.getD().toString());
                        break;
                    case "$08":
                        textElement.setValue(zbgResult.getEx1().toString());
                        break;
                    case "$09":
                        textElement.setValue(zbgResult.getEx2().toString());
                        break;
                    case "$14":
                        textElement.setValue(zbgResult.getEy1().toString());
                        break;
                    case "$15":
                        textElement.setValue(zbgResult.getEy2().toString());
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
     * zbh
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbhResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBH(String baseFileName, ZBHDocx zbhResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/h/ZBH.docx";

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
                        textElement.setValue(zbhResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbhResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbhResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbhResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbhResult.getK().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbhResult.getB().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbhResult.getA().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbhResult.getEx1().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbhResult.getEx2().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbhResult.getIx().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbhResult.getWx1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbhResult.getWx2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbhResult.getRx().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbhResult.getEy1().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbhResult.getEy2().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbhResult.getIy().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbhResult.getWy1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbhResult.getWy2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbhResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbhResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbhResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbhResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbhResult.getD().toString());
                        break;
                    case "$08":
                        textElement.setValue(zbhResult.getEx1().toString());
                        break;
                    case "$09":
                        textElement.setValue(zbhResult.getEx2().toString());
                        break;
                    case "$14":
                        textElement.setValue(zbhResult.getEy1().toString());
                        break;
                    case "$15":
                        textElement.setValue(zbhResult.getEy2().toString());
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
     * zbi
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbiResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBI(String baseFileName, ZBIDocx zbiResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/i/ZBI.docx";

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
                        textElement.setValue(zbiResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbiResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbiResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbiResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbiResult.getU().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbiResult.getK().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbiResult.getB().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbiResult.getS().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbiResult.getF().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbiResult.getA().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbiResult.getEx1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbiResult.getEx2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbiResult.getIx().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbiResult.getWx1().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbiResult.getWx2().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbiResult.getRx().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbiResult.getEy1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbiResult.getEy2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbiResult.getIy().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zbiResult.getWy1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(zbiResult.getWy2().toString());
                        break;
                    case "$$022":
                        textElement.setValue(zbiResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbiResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbiResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbiResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbiResult.getD().toString());
                        break;
                    case "$05":
                        textElement.setValue(zbiResult.getU().toString());
                        break;
                    case "$11":
                        textElement.setValue(zbiResult.getEx1().toString());
                        break;
                    case "$12":
                        textElement.setValue(zbiResult.getEx2().toString());
                        break;
                    case "$17":
                        textElement.setValue(zbiResult.getEy1().toString());
                        break;
                    case "$18":
                        textElement.setValue(zbiResult.getEy2().toString());
                        break;
                    case "$50":
                        textElement.setValue(Double.toString(zbiResult.getU() / 2));
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
     * zbj
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbjResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBJ(String baseFileName, ZBJDocx zbjResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/j/ZBJ.docx";

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
                        textElement.setValue(zbjResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbjResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbjResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbjResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbjResult.getU().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbjResult.getK().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbjResult.getB().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbjResult.getS().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbjResult.getF().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbjResult.getA().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbjResult.getEx1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbjResult.getEx2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbjResult.getIx().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbjResult.getWx1().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbjResult.getWx2().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbjResult.getRx().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbjResult.getEy1().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbjResult.getEy2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbjResult.getIy().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zbjResult.getWy1().toString());
                        break;
                    case "$$021":
                        textElement.setValue(zbjResult.getWy2().toString());
                        break;
                    case "$$022":
                        textElement.setValue(zbjResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbjResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbjResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbjResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbjResult.getD().toString());
                        break;
                    case "$05":
                        textElement.setValue(zbjResult.getU().toString());
                        break;
                    case "$11":
                        textElement.setValue(zbjResult.getEx1().toString());
                        break;
                    case "$12":
                        textElement.setValue(zbjResult.getEx2().toString());
                        break;
                    case "$17":
                        textElement.setValue(zbjResult.getEy1().toString());
                        break;
                    case "$18":
                        textElement.setValue(zbjResult.getEy2().toString());
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
     * zbk
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbkResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBK(String baseFileName, ZBKDocx zbkResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/k/ZBK.docx";

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
                        textElement.setValue(zbkResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbkResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbkResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbkResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbkResult.getU().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbkResult.getK().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbkResult.getB().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbkResult.getS().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbkResult.getA().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbkResult.getEx1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbkResult.getEx2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbkResult.getIx().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbkResult.getWx1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbkResult.getWx2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbkResult.getRx().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbkResult.getEy1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbkResult.getEy2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbkResult.getIy().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbkResult.getWy1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zbkResult.getWy2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(zbkResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbkResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbkResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbkResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbkResult.getD().toString());
                        break;
                    case "$05":
                        textElement.setValue(zbkResult.getU().toString());
                        break;
                    case "$10":
                        textElement.setValue(zbkResult.getEx1().toString());
                        break;
                    case "$11":
                        textElement.setValue(zbkResult.getEx2().toString());
                        break;
                    case "$16":
                        textElement.setValue(zbkResult.getEy1().toString());
                        break;
                    case "$17":
                        textElement.setValue(zbkResult.getEy2().toString());
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
     * zbl
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zblResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBL(String baseFileName, ZBLDocx zblResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/l/ZBL.docx";

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
                        textElement.setValue(zblResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zblResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zblResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zblResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zblResult.getU().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zblResult.getK().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zblResult.getB().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zblResult.getS().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zblResult.getA().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zblResult.getEx1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zblResult.getEx2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zblResult.getIx().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zblResult.getWx1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zblResult.getWx2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zblResult.getRx().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zblResult.getEy1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zblResult.getEy2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zblResult.getIy().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zblResult.getWy1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zblResult.getWy2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(zblResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zblResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zblResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zblResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zblResult.getD().toString());
                        break;
                    case "$05":
                        textElement.setValue(zblResult.getU().toString());
                        break;
                    case "$10":
                        textElement.setValue(zblResult.getEx1().toString());
                        break;
                    case "$11":
                        textElement.setValue(zblResult.getEx2().toString());
                        break;
                    case "$16":
                        textElement.setValue(zblResult.getEy1().toString());
                        break;
                    case "$17":
                        textElement.setValue(zblResult.getEy2().toString());
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
     * zbm
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbmResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBM(String baseFileName, ZBMDocx zbmResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/m/ZBM.docx";

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
                        textElement.setValue(zbmResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbmResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbmResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbmResult.getK().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbmResult.getB().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbmResult.getA().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbmResult.getEx1().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbmResult.getEx2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbmResult.getIx().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbmResult.getWx1().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbmResult.getWx2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbmResult.getRx().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbmResult.getEy1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbmResult.getEy2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbmResult.getIy().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbmResult.getWy1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbmResult.getWy2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbmResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbmResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbmResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbmResult.getC().toString());
                        break;
                    case "$07":
                        textElement.setValue(zbmResult.getEx1().toString());
                        break;
                    case "$08":
                        textElement.setValue(zbmResult.getEx2().toString());
                        break;
                    case "$13":
                        textElement.setValue(zbmResult.getEy1().toString());
                        break;
                    case "$14":
                        textElement.setValue(zbmResult.getEy2().toString());
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
     * zbn
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zbnResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBN(String baseFileName, ZBNDocx zbnResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/n/ZBN.docx";

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
                        textElement.setValue(zbnResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zbnResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zbnResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zbnResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zbnResult.getU().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zbnResult.getP().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zbnResult.getK().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zbnResult.getB().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zbnResult.getS().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zbnResult.getF().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zbnResult.getH().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zbnResult.getA().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zbnResult.getEx1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zbnResult.getEx2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zbnResult.getIx().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zbnResult.getWx1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zbnResult.getWx2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zbnResult.getRx().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zbnResult.getEy1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zbnResult.getEy2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(zbnResult.getIy().toString());
                        break;
                    case "$$022":
                        textElement.setValue(zbnResult.getWy1().toString());
                        break;
                    case "$$023":
                        textElement.setValue(zbnResult.getWy2().toString());
                        break;
                    case "$$024":
                        textElement.setValue(zbnResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zbnResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zbnResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zbnResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zbnResult.getD().toString());
                        break;
                    case "$05":
                        textElement.setValue(zbnResult.getU().toString());
                        break;
                    case "$06":
                        textElement.setValue(zbnResult.getP().toString());
                        break;
                    case "$13":
                        textElement.setValue(zbnResult.getEx1().toString());
                        break;
                    case "$14":
                        textElement.setValue(zbnResult.getEx2().toString());
                        break;
                    case "$19":
                        textElement.setValue(zbnResult.getEy1().toString());
                        break;
                    case "$20":
                        textElement.setValue(zbnResult.getEy2().toString());
                        break;
                    case "$50":
                        textElement.setValue(Double.toString(zbnResult.getP() / 2));
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
     * zbo
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zboResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZBO(String baseFileName, ZBODocx zboResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/b/o/ZBO.docx";

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
                        textElement.setValue(zboResult.getM().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zboResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zboResult.getC().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zboResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zboResult.getU().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zboResult.getP().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zboResult.getK().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zboResult.getB().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zboResult.getS().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zboResult.getF().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zboResult.getG().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zboResult.getA().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zboResult.getEx1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zboResult.getEx2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zboResult.getIx().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zboResult.getWx1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zboResult.getWx2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(zboResult.getRx().toString());
                        break;
                    case "$$019":
                        textElement.setValue(zboResult.getEy1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(zboResult.getEy2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(zboResult.getIy().toString());
                        break;
                    case "$$022":
                        textElement.setValue(zboResult.getWy1().toString());
                        break;
                    case "$$023":
                        textElement.setValue(zboResult.getWy2().toString());
                        break;
                    case "$$024":
                        textElement.setValue(zboResult.getRy().toString());
                        break;
                    case "$01":
                        textElement.setValue(zboResult.getM().toString());
                        break;
                    case "$02":
                        textElement.setValue(zboResult.getN().toString());
                        break;
                    case "$03":
                        textElement.setValue(zboResult.getC().toString());
                        break;
                    case "$04":
                        textElement.setValue(zboResult.getD().toString());
                        break;
                    case "$05":
                        textElement.setValue(zboResult.getU().toString());
                        break;
                    case "$06":
                        textElement.setValue(zboResult.getP().toString());
                        break;
                    case "$13":
                        textElement.setValue(zboResult.getEx1().toString());
                        break;
                    case "$14":
                        textElement.setValue(zboResult.getEx2().toString());
                        break;
                    case "$19":
                        textElement.setValue(zboResult.getEy1().toString());
                        break;
                    case "$20":
                        textElement.setValue(zboResult.getEy2().toString());
                        break;
                    case "$50":
                        textElement.setValue(Double.toString(zboResult.getP() / 2));
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
