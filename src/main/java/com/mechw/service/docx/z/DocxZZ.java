package com.mechw.service.docx.z;

import com.mechw.model.front.z.z.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxZZ extends DocxTool {

    /**
     * zzea
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzeaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZEA(String baseFileName, ZZEADocx zzeaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/z/e/a/ZZEA.docx";

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
                        textElement.setValue(zzeaResult.getDbmm().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzeaResult.getHmm().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzeaResult.getDsmm().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzeaResult.getDb().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzeaResult.getH().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzeaResult.getDs().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zzeaResult.getAn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zzeaResult.getG().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zzeaResult.getT().toString());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + zzeaResult.getDbmm().toString());
                        break;
                    case "$02":
                        textElement.setValue(zzeaResult.getHmm().toString());
                        break;
                    case "$03":
                        textElement.setValue("Φ" + zzeaResult.getDsmm().toString());
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
     * zzeb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzebResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZEB(String baseFileName, ZZEBDocx zzebResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/z/e/b/ZZEB.docx";

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
                        textElement.setValue(zzebResult.getAlpha().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzebResult.getHmm().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzebResult.getDmm().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzebResult.getTheta().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzebResult.getH().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzebResult.getD().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zzebResult.getAn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zzebResult.getG().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zzebResult.getT().toString());
                        break;
                    case "$01":
                        textElement.setValue(zzebResult.getAlpha().toString() + "°");
                        break;
                    case "$02":
                        textElement.setValue(zzebResult.getHmm().toString());
                        break;
                    case "$03":
                        textElement.setValue("Φ" + zzebResult.getDmm().toString());
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
     * zzec
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzecResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZEC(String baseFileName, ZZECDocx zzecResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/z/e/c/ZZEC.docx";

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
                        textElement.setValue(zzecResult.getDbmm().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzecResult.getLmm().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzecResult.getHmm().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzecResult.getDsmm().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzecResult.getDb().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzecResult.getL().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zzecResult.getH().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zzecResult.getDs().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zzecResult.getAn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zzecResult.getG().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zzecResult.getT().toString());
                        break;
                    case "$01":
                        textElement.setValue(zzecResult.getHmm().toString());
                        break;
                    case "$02":
                        textElement.setValue("Φ" + zzecResult.getDbmm().toString());
                        break;
                    case "$03":
                        textElement.setValue(zzecResult.getLmm().toString());
                        break;
                    case "$04":
                        textElement.setValue("Φ" + zzecResult.getDsmm().toString());
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
     * zzed
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzedResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZED(String baseFileName, ZZEDDocx zzedResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/z/z/e/d/ZZED.docx";

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
                        textElement.setValue(zzedResult.getDbmm().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzedResult.getHmm().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzedResult.getDsmm().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzedResult.getDb().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzedResult.getH().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzedResult.getDs().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zzedResult.getAn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zzedResult.getG().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zzedResult.getT().toString());
                        break;
                    case "$01":
                        textElement.setValue(zzedResult.getDbmm().toString());
                        break;
                    case "$02":
                        textElement.setValue(zzedResult.getHmm().toString());
                        break;
                    case "$03":
                        textElement.setValue(zzedResult.getDsmm().toString());
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
     * zzf
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzfResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZF(String baseFileName, ZZFDocx zzfResult) {

        String template = "D:/mechw/static/west/cal/z/z/f/ZZF.docx";

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
                        textElement.setValue(zzfResult.getP().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzfResult.getDg().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzfResult.getF().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzfResult.getM().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzfResult.getPe().toString());
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
     * zzg
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzgResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZG(String baseFileName, ZZGDocx zzgResult) {

        String template = "D:/mechw/static/west/cal/z/z/g/ZZG.docx";

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
                        textElement.setValue(zzgResult.getD().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzgResult.getG().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzgResult.getH().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzgResult.getPd().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzgResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzgResult.getPspd().toString());
                        break;
                    case "$$007":
                        textElement.setValue(zzgResult.getIsCal());
                        break;

                    case "$03":
                        textElement.setValue(zzgResult.getH().toString());
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
     * zzha
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzhaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZHA(String baseFileName, ZZHADocx zzhaResult) {

        String template = "D:/mechw/static/west/cal/z/z/h/a/ZZHA.docx";

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
                        textElement.setValue(zzhaResult.getDout().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzhaResult.getThk().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzhaResult.getDm().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzhaResult.getSh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzhaResult.getN().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzhaResult.getDensity().toString());
                        break;

                    case "$$007":
                        textElement.setValue(zzhaResult.getTheta().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zzhaResult.getL().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zzhaResult.getLf().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zzhaResult.getA().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zzhaResult.getBh().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zzhaResult.getLt().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zzhaResult.getAt().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zzhaResult.getVt().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zzhaResult.getAh().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zzhaResult.getW().toString());
                        break;

                    case "$01":
                        textElement.setValue("Φ" + zzhaResult.getDout().toString());
                        break;
                    case "$03":
                        textElement.setValue("Φ" + zzhaResult.getDm().toString());
                        break;
                    case "$04":
                        textElement.setValue(zzhaResult.getSh().toString());
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
     * zzhb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzhbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZHB(String baseFileName, ZZHBDocx zzhbResult) {

        String template = "D:/mechw/static/west/cal/z/z/h/b/ZZHB.docx";

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
                        textElement.setValue(zzhbResult.getDout().toString());
                        break;
                    case "$$002":
                        textElement.setValue(zzhbResult.getThk().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzhbResult.getDm().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzhbResult.getSh().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzhbResult.getN().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzhbResult.getDensity().toString());
                        break;

                    case "$$007":
                        textElement.setValue(zzhbResult.getTheta().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zzhbResult.getL().toString());
                        break;
                    case "$$009":
                        textElement.setValue(zzhbResult.getLf().toString());
                        break;
                    case "$$010":
                        textElement.setValue(zzhbResult.getA().toString());
                        break;
                    case "$$011":
                        textElement.setValue(zzhbResult.getBh().toString());
                        break;
                    case "$$012":
                        textElement.setValue(zzhbResult.getLt().toString());
                        break;
                    case "$$013":
                        textElement.setValue(zzhbResult.getAt().toString());
                        break;
                    case "$$014":
                        textElement.setValue(zzhbResult.getVt().toString());
                        break;
                    case "$$015":
                        textElement.setValue(zzhbResult.getAh().toString());
                        break;
                    case "$$016":
                        textElement.setValue(zzhbResult.getW().toString());
                        break;
                    case "$$017":
                        textElement.setValue(zzhbResult.getVb().toString());
                        break;

                    case "$01":
                        textElement.setValue("Φ" + zzhbResult.getDout().toString());
                        break;
                    case "$03":
                        textElement.setValue("Φ" + zzhbResult.getDm().toString());
                        break;
                    case "$04":
                        textElement.setValue(zzhbResult.getSh().toString());
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
     * zzj
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param zzjResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getZZJ(String baseFileName, ZZJDocx zzjResult) {

        String template = "D:/mechw/static/west/cal/z/z/j/ZZJ.docx";

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
                        textElement.setValue(zzjResult.getCategory());
                        break;
                    case "$$002":
                        textElement.setValue(zzjResult.getL0().toString());
                        break;
                    case "$$003":
                        textElement.setValue(zzjResult.getS0().toString());
                        break;
                    case "$$004":
                        textElement.setValue(zzjResult.getThk().toString());
                        break;
                    case "$$005":
                        textElement.setValue(zzjResult.getL0r().toString());
                        break;
                    case "$$006":
                        textElement.setValue(zzjResult.getS0r().toString());
                        break;

                    case "$$007":
                        textElement.setValue(zzjResult.getN().toString());
                        break;
                    case "$$008":
                        textElement.setValue(zzjResult.getThkr().toString());
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
