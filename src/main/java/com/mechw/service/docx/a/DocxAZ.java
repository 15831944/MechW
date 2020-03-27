package com.mechw.service.docx.a;

import com.mechw.model.front.a.z.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

public class DocxAZ extends DocxTool {

    /**
     * azaa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azaaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZAA(String baseFileName, AZAADocx azaaResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/z/a/a/AZAA.docx";

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
                        textElement.setValue(azaaResult.getD().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azaaResult.getV().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azaaResult.getDensity().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azaaResult.getWs().toString());
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
     * azab
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azabResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZAB(String baseFileName, AZABDocx azabResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/z/a/b/AZAB.docx";

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
                        textElement.setValue(azabResult.getH().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azabResult.getQ().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azabResult.getWs().toString());
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
     * azac
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azacResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZAC(String baseFileName, AZACDocx azacResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (Objects.equals(azacResult.getIsInsulation(), "有")) {
            if (Objects.equals(azacResult.getType(), "卧式容器(半球封头)")) {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_WithInsulation_HS.docx";
            } else if (Objects.equals(azacResult.getType(), "卧式容器(椭圆封头)")) {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_WithInsulation_HT.docx";
            } else if (Objects.equals(azacResult.getType(), "立式容器")) {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_WithInsulation_V.docx";
            } else {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_WithInsulation_S.docx";
            }
        } else {
            if (Objects.equals(azacResult.getType(), "卧式容器(半球封头)")) {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_NoInsulation_HS.docx";
            } else if (Objects.equals(azacResult.getType(), "卧式容器(椭圆封头)")) {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_NoInsulation_HT.docx";
            } else if (Objects.equals(azacResult.getType(), "立式容器")) {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_NoInsulation_V.docx";
            } else {
                template = "D:/mechw/static/west/cal/a/z/a/c/AZAC_NoInsulation_S.docx";
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
                        textElement.setValue(azacResult.getType());
                        break;
                    case "$$002":
                        textElement.setValue(azacResult.getL().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azacResult.getDout().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azacResult.getIsInsulation());
                        break;
                    case "$$005":
                        textElement.setValue(azacResult.getCover());
                        break;
                    case "$$006":
                        textElement.setValue(azacResult.getQ().toString());
                        break;
                    case "$$007":
                        textElement.setValue(azacResult.getF().toString());
                        break;
                    case "$$008":
                        textElement.setValue(azacResult.getAr().toString());
                        break;
                    case "$$009":
                        textElement.setValue(azacResult.getWs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(azacResult.getA75().toString());
                        break;
                    case "$$011":
                        textElement.setValue(azacResult.getH1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(azacResult.getThk().toString());
                        break;
                    case "$$013":
                        textElement.setValue(azacResult.getLamuda().toString());
                        break;
                    case "$$014":
                        textElement.setValue(azacResult.getT().toString());
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
     * azad
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azadResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZAD(String baseFileName, AZADDocx azadResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (Objects.equals(azadResult.getFire(), "是")) {

            if (Objects.equals(azadResult.getIsInsulation(), "有")) {
                if (Objects.equals(azadResult.getType(), "卧式容器(半球封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_WithInsulation_HS.docx";
                } else if (Objects.equals(azadResult.getType(), "卧式容器(椭圆封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_WithInsulation_HT.docx";
                } else if (Objects.equals(azadResult.getType(), "立式容器")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_WithInsulation_V.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_WithInsulation_S.docx";
                }
            } else {
                if (Objects.equals(azadResult.getType(), "卧式容器(半球封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_NoInsulation_HS.docx";
                } else if (Objects.equals(azadResult.getType(), "卧式容器(椭圆封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_NoInsulation_HT.docx";
                } else if (Objects.equals(azadResult.getType(), "立式容器")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_NoInsulation_V.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_Fire_NoInsulation_S.docx";
                }
            }
        } else {
            if (Objects.equals(azadResult.getIsInsulation(), "有")) {
                if (Objects.equals(azadResult.getType(), "卧式容器(半球封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_WithInsulation_HS.docx";
                } else if (Objects.equals(azadResult.getType(), "卧式容器(椭圆封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_WithInsulation_HT.docx";
                } else if (Objects.equals(azadResult.getType(), "立式容器")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_WithInsulation_V.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_WithInsulation_S.docx";
                }
            } else {
                if (Objects.equals(azadResult.getType(), "卧式容器(半球封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_NoInsulation_HS.docx";
                } else if (Objects.equals(azadResult.getType(), "卧式容器(椭圆封头)")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_NoInsulation_HT.docx";
                } else if (Objects.equals(azadResult.getType(), "立式容器")) {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_NoInsulation_V.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/z/a/d/AZAD_NoFire_NoInsulation_S.docx";
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
                        textElement.setValue(azadResult.getType());
                        break;
                    case "$$002":
                        textElement.setValue(azadResult.getL().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azadResult.getDout().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azadResult.getIsInsulation());
                        break;
                    case "$$005":
                        textElement.setValue(azadResult.getCover());
                        break;
                    case "$$006":
                        textElement.setValue(azadResult.getQ().toString());
                        break;
                    case "$$007":
                        textElement.setValue(azadResult.getF().toString());
                        break;
                    case "$$008":
                        textElement.setValue(azadResult.getAr().toString());
                        break;
                    case "$$009":
                        textElement.setValue(azadResult.getWs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(azadResult.getA75().toString());
                        break;
                    case "$$011":
                        textElement.setValue(azadResult.getH1().toString());
                        break;
                    case "$$012":
                        textElement.setValue(azadResult.getThk().toString());
                        break;
                    case "$$013":
                        textElement.setValue(azadResult.getLamuda().toString());
                        break;
                    case "$$014":
                        textElement.setValue(azadResult.getT().toString());
                        break;
                    case "$$015":
                        textElement.setValue(azadResult.getFire());
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
     * azba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azbaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZBA(String baseFileName, AZBADocx azbaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (azbaResult.getPopf() <= azbaResult.getKallow()) {
            template = "D:/mechw/static/west/cal/a/z/b/a/AZBAN.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/z/b/a/AZBAP.docx";
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
                        textElement.setValue(azbaResult.getWs().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azbaResult.getPd().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azbaResult.getDeltap().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azbaResult.getPo().toString());
                        break;
                    case "$$005":
                        textElement.setValue(azbaResult.getKr().toString());
                        break;
                    case "$$006":
                        textElement.setValue(azbaResult.getStf().toString());
                        break;
                    case "$$007":
                        textElement.setValue(azbaResult.getK().toString());
                        break;
                    case "$$008":
                        textElement.setValue(azbaResult.getM().toString());
                        break;
                    case "$$009":
                        textElement.setValue(azbaResult.getZ().toString());
                        break;
                    case "$$010":
                        textElement.setValue(azbaResult.getC().toString());
                        break;
                    case "$$011":
                        textElement.setValue(azbaResult.getBtf().toString());
                        break;
                    case "$$012":
                        textElement.setValue(azbaResult.getPf().toString());
                        break;
                    case "$$013":
                        textElement.setValue(azbaResult.getPopf().toString());
                        break;
                    case "$$014":
                        textElement.setValue(azbaResult.getKallow().toString());
                        break;
                    case "$$015":
                        textElement.setValue(azbaResult.getA().toString());
                        break;
                    case "$$016":
                        textElement.setValue(azbaResult.getD().toString());
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
     * azbb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azbbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZBB(String baseFileName, AZBBDocx azbbResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (azbbResult.getPf() <= 10) {
            template = "D:/mechw/static/west/cal/a/z/b/b/AZBBN10.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/z/b/b/AZBBP10.docx";
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
                        textElement.setValue(azbbResult.getWs().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azbbResult.getPd().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azbbResult.getDeltap().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azbbResult.getK().toString());
                        break;
                    case "$$005":
                        textElement.setValue(azbbResult.getPf().toString());
                        break;
                    case "$$006":
                        textElement.setValue(azbbResult.getA().toString());
                        break;
                    case "$$007":
                        textElement.setValue(azbbResult.getD().toString());
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
     * azbc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azbcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZBC(String baseFileName, AZBCDocx azbcResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/z/b/c/AZBC.docx";
        ;

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
                        textElement.setValue(azbcResult.getWs().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azbcResult.getDeltap().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azbcResult.getK().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azbcResult.getD().toString());
                        break;
                    case "$$005":
                        textElement.setValue(azbcResult.getU().toString());
                        break;
                    case "$$006":
                        textElement.setValue(azbcResult.getAs().toString());
                        break;
                    case "$$007":
                        textElement.setValue(azbcResult.getA().toString());
                        break;
                    case "$$008":
                        textElement.setValue(azbcResult.getW().toString());
                        break;
                    case "$$009":
                        textElement.setValue(azbcResult.getRe().toString());
                        break;
                    case "$$010":
                        textElement.setValue(azbcResult.getZeta().toString());
                        break;
                    case "$$011":
                        textElement.setValue(azbcResult.getWact().toString());
                        break;
                    case "$$012":
                        textElement.setValue(azbcResult.getWchk());
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
     * azbd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azbdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZBD(String baseFileName, AZBDDocx azbdResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/z/b/d/AZBD.docx";
        ;

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
                        textElement.setValue(azbdResult.getWs().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azbdResult.getDeltap().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azbdResult.getK().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azbdResult.getD().toString());
                        break;
                    case "$$006":
                        textElement.setValue(azbdResult.getAs().toString());
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
     * azca
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azcaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZCA(String baseFileName, AZCADocx azcaResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/z/c/a/AZCA.docx";

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
                        textElement.setValue(azcaResult.getQm().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azcaResult.getP1().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azcaResult.getT().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azcaResult.getP2().toString());
                        break;
                    case "$$005":
                        textElement.setValue(azcaResult.getM().toString());
                        break;
                    case "$$006":
                        textElement.setValue(azcaResult.getK().toString());
                        break;
                    case "$$007":
                        textElement.setValue(azcaResult.getH().toString());
                        break;
                    case "$$008":
                        textElement.setValue(azcaResult.getR().toString());
                        break;

                    case "$$009":
                        textElement.setValue(azcaResult.getC().toString());
                        break;
                    case "$$010":
                        textElement.setValue(azcaResult.getPo().toString());
                        break;
                    case "$$011":
                        textElement.setValue(azcaResult.getPr().toString());
                        break;
                    case "$$012":
                        textElement.setValue(azcaResult.getL().toString());
                        break;
                    case "$$013":
                        textElement.setValue(azcaResult.getL30().toString());
                        break;
                    case "$$014":
                        textElement.setValue(azcaResult.getLp().toString());
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
     * azcb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azcbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZCB(String baseFileName, AZCBDocx azcbResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/z/c/b/AZCB.docx";

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
                        textElement.setValue(azcbResult.getW().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azcbResult.getP1().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azcbResult.getP2().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azcbResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(azcbResult.getM().toString());
                        break;
                    case "$$006":
                        textElement.setValue(azcbResult.getK().toString());
                        break;
                    case "$$007":
                        textElement.setValue(azcbResult.getD().toString());
                        break;

                    case "$$008":
                        textElement.setValue(azcbResult.getA().toString());
                        break;
                    case "$$009":
                        textElement.setValue(azcbResult.getP().toString());
                        break;
                    case "$$010":
                        textElement.setValue(azcbResult.getF().toString());
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
     * azcc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param azccResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getAZCC(String baseFileName, AZCCDocx azccResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/a/z/c/c/AZCC.docx";

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
                        textElement.setValue(azccResult.getW().toString());
                        break;
                    case "$$002":
                        textElement.setValue(azccResult.getP().toString());
                        break;
                    case "$$003":
                        textElement.setValue(azccResult.getDensity().toString());
                        break;
                    case "$$004":
                        textElement.setValue(azccResult.getD().toString());
                        break;

                    case "$$005":
                        textElement.setValue(azccResult.getA().toString());
                        break;
                    case "$$006":
                        textElement.setValue(azccResult.getF().toString());
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
