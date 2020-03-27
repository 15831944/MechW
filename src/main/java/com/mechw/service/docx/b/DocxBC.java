package com.mechw.service.docx.b;

import com.mechw.model.front.b.c.*;
import com.mechw.model.front.b.c.a.BCADocx;
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

public class DocxBC extends DocxTool {

    /**
     * bca
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcaResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCA(String baseFileName, BCADocx bcaResult) {
        String template;
        if (bcaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/a/BCAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/a/BCAG.docx";
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
                    textElement.setValue(bcaResult.getDesignPressure().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bcaResult.getDesignTemp().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bcaResult.getStaticPressure().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bcaResult.getInnerDiameter().toString());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bcaResult.getLength().toString());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bcaResult.getThkn().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bcaResult.getStd());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bcaResult.getName());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bcaResult.getC2().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bcaResult.getE().toString());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bcaResult.getDensity().toString());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bcaResult.getDesignStress().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bcaResult.getTestRel().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bcaResult.getTestStress().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bcaResult.getC1().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bcaResult.getC().toString());
                } else if (textElement.getValue().equals("$$017")) {
                    textElement.setValue(bcaResult.getThke().toString());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bcaResult.getCalPressure().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bcaResult.getThkc().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bcaResult.getThkMin().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bcaResult.getThkd().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bcaResult.getThkChk());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bcaResult.getDesignActStress().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bcaResult.getDesignAllowStress().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bcaResult.getDesignStressChk());
                } else if (textElement.getValue().equals("$$026")) {
                    textElement.setValue(bcaResult.getTestPressure().toString());
                } else if (textElement.getValue().equals("$$027")) {
                    textElement.setValue(bcaResult.getTestActStress().toString());
                } else if (textElement.getValue().equals("$$028")) {
                    textElement.setValue(bcaResult.getTestAllowStress().toString());
                } else if (textElement.getValue().equals("$$029")) {
                    textElement.setValue(bcaResult.getTestStressChk());
                } else if (textElement.getValue().equals("$$030")) {
                    textElement.setValue(bcaResult.getMawp().toString());
                } else if (textElement.getValue().equals("$$031")) {
                    textElement.setValue(bcaResult.getAi().toString());
                } else if (textElement.getValue().equals("$$032")) {
                    textElement.setValue(bcaResult.getVi().toString());
                } else if (textElement.getValue().equals("$$033")) {
                    textElement.setValue(bcaResult.getAo().toString());
                } else if (textElement.getValue().equals("$$034")) {
                    textElement.setValue(bcaResult.getM().toString());
                } else if (textElement.getValue().equals("$01")) {
                    textElement.setValue("Φ" + bcaResult.getInnerDiameter().toString());
                } else if (textElement.getValue().equals("$02")) {
                    textElement.setValue(bcaResult.getThkn().toString());
                } else if (textElement.getValue().equals("$03")) {
                    textElement.setValue(bcaResult.getLength().toString());
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
     * bcba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcbaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCBA(String baseFileName, BCBADocx bcbaResult) {
        String template;
        if (bcbaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/b/a/BCBAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/b/a/BCBAG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36133:
                        if (var13.equals("$01")) {
                            var14 = 36;
                        }
                        break;
                    case 36134:
                        if (var13.equals("$02")) {
                            var14 = 37;
                        }
                        break;
                    case 36135:
                        if (var13.equals("$03")) {
                            var14 = 38;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcbaResult.getDesignPressure().toString());
                        break;
                    case 1:
                        textElement.setValue(bcbaResult.getDesignTemp().toString());
                        break;
                    case 2:
                        textElement.setValue(bcbaResult.getStaticPressure().toString());
                        break;
                    case 3:
                        textElement.setValue(bcbaResult.getInnerDiameter().toString());
                        break;
                    case 4:
                        textElement.setValue(bcbaResult.getHi().toString());
                        break;
                    case 5:
                        textElement.setValue(bcbaResult.getH().toString());
                        break;
                    case 6:
                        textElement.setValue(bcbaResult.getThkn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcbaResult.getStd());
                        break;
                    case 8:
                        textElement.setValue(bcbaResult.getName());
                        break;
                    case 9:
                        textElement.setValue(bcbaResult.getC2().toString());
                        break;
                    case 10:
                        textElement.setValue(bcbaResult.getE().toString());
                        break;
                    case 11:
                        textElement.setValue(bcbaResult.getDensity().toString());
                        break;
                    case 12:
                        textElement.setValue(bcbaResult.getDesignStress().toString());
                        break;
                    case 13:
                        textElement.setValue(bcbaResult.getTestRel().toString());
                        break;
                    case 14:
                        textElement.setValue(bcbaResult.getTestStress().toString());
                        break;
                    case 15:
                        textElement.setValue(bcbaResult.getC1().toString());
                        break;
                    case 16:
                        textElement.setValue(bcbaResult.getC().toString());
                        break;
                    case 17:
                        textElement.setValue(bcbaResult.getThke().toString());
                        break;
                    case 18:
                        textElement.setValue(bcbaResult.getCalPressure().toString());
                        break;
                    case 19:
                        textElement.setValue(bcbaResult.getK().toString());
                        break;
                    case 20:
                        textElement.setValue(bcbaResult.getThkc().toString());
                        break;
                    case 21:
                        textElement.setValue(bcbaResult.getThkMin().toString());
                        break;
                    case 22:
                        textElement.setValue(bcbaResult.getThkd().toString());
                        break;
                    case 23:
                        textElement.setValue(bcbaResult.getThkChk());
                        break;
                    case 24:
                        textElement.setValue(bcbaResult.getDesignActStress().toString());
                        break;
                    case 25:
                        textElement.setValue(bcbaResult.getDesignAllowStress().toString());
                        break;
                    case 26:
                        textElement.setValue(bcbaResult.getDesignStressChk());
                        break;
                    case 27:
                        textElement.setValue(bcbaResult.getTestPressure().toString());
                        break;
                    case 28:
                        textElement.setValue(bcbaResult.getTestActStress().toString());
                        break;
                    case 29:
                        textElement.setValue(bcbaResult.getTestAllowStress().toString());
                        break;
                    case 30:
                        textElement.setValue(bcbaResult.getTestStressChk());
                        break;
                    case 31:
                        textElement.setValue(bcbaResult.getMawp().toString());
                        break;
                    case 32:
                        textElement.setValue(bcbaResult.getAi().toString());
                        break;
                    case 33:
                        textElement.setValue(bcbaResult.getVi().toString());
                        break;
                    case 34:
                        textElement.setValue(bcbaResult.getAo().toString());
                        break;
                    case 35:
                        textElement.setValue(bcbaResult.getM().toString());
                        break;
                    case 36:
                        textElement.setValue("Φ" + bcbaResult.getInnerDiameter().toString());
                        break;
                    case 37:
                        textElement.setValue(bcbaResult.getH().toString());
                        break;
                    case 38:
                        textElement.setValue(bcbaResult.getThkn().toString());
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
     * bcbb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcbbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCBB(String baseFileName, BCBBDocx bcbbResult) {
        String template;
        if (bcbbResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/b/b/BCBBL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/b/b/BCBBG.docx";
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
                    textElement.setValue(bcbbResult.getDesignPressure().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bcbbResult.getDesignTemp().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bcbbResult.getStaticPressure().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bcbbResult.getInnerDiameter().toString());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bcbbResult.getH().toString());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bcbbResult.getThkn().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bcbbResult.getStd());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bcbbResult.getName());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bcbbResult.getC2().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bcbbResult.getE().toString());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bcbbResult.getDensity().toString());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bcbbResult.getDesignStress().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bcbbResult.getTestRel().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bcbbResult.getTestStress().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bcbbResult.getC1().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bcbbResult.getC().toString());
                } else if (textElement.getValue().equals("$$017")) {
                    textElement.setValue(bcbbResult.getThke().toString());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bcbbResult.getCalPressure().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bcbbResult.getThkc().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bcbbResult.getThkd().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bcbbResult.getThkChk());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bcbbResult.getDesignActStress().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bcbbResult.getDesignAllowStress().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bcbbResult.getDesignStressChk());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bcbbResult.getTestPressure().toString());
                } else if (textElement.getValue().equals("$$026")) {
                    textElement.setValue(bcbbResult.getTestActStress().toString());
                } else if (textElement.getValue().equals("$$027")) {
                    textElement.setValue(bcbbResult.getTestAllowStress().toString());
                } else if (textElement.getValue().equals("$$028")) {
                    textElement.setValue(bcbbResult.getTestStressChk());
                } else if (textElement.getValue().equals("$$029")) {
                    textElement.setValue(bcbbResult.getMawp().toString());
                } else if (textElement.getValue().equals("$$030")) {
                    textElement.setValue(bcbbResult.getAi().toString());
                } else if (textElement.getValue().equals("$$031")) {
                    textElement.setValue(bcbbResult.getVi().toString());
                } else if (textElement.getValue().equals("$$032")) {
                    textElement.setValue(bcbbResult.getAo().toString());
                } else if (textElement.getValue().equals("$$033")) {
                    textElement.setValue(bcbbResult.getM().toString());
                } else if (textElement.getValue().equals("$01")) {
                    textElement.setValue("Φ" + bcbbResult.getInnerDiameter().toString());
                } else if (textElement.getValue().equals("$02")) {
                    textElement.setValue(bcbbResult.getH().toString());
                } else if (textElement.getValue().equals("$03")) {
                    textElement.setValue(bcbbResult.getThkn().toString());
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
     * bcbc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcbcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCBC(String baseFileName, BCBCDocx bcbcResult) {
        String template;
        if (bcbcResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/b/c/BCBCL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/b/c/BCBCG.docx";
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
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36133:
                        if (var13.equals("$01")) {
                            var14 = 38;
                        }
                        break;
                    case 36134:
                        if (var13.equals("$02")) {
                            var14 = 39;
                        }
                        break;
                    case 36135:
                        if (var13.equals("$03")) {
                            var14 = 40;
                        }
                        break;
                    case 36136:
                        if (var13.equals("$04")) {
                            var14 = 41;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcbcResult.getDesignPressure().toString());
                        break;
                    case 1:
                        textElement.setValue(bcbcResult.getDesignTemp().toString());
                        break;
                    case 2:
                        textElement.setValue(bcbcResult.getStaticPressure().toString());
                        break;
                    case 3:
                        textElement.setValue(bcbcResult.getInnerDiameter().toString());
                        break;
                    case 4:
                        textElement.setValue(bcbcResult.getCrownRi().toString());
                        break;
                    case 5:
                        textElement.setValue(bcbcResult.getCornerRi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcbcResult.getH().toString());
                        break;
                    case 7:
                        textElement.setValue(bcbcResult.getThkn().toString());
                        break;
                    case 8:
                        textElement.setValue(bcbcResult.getStd());
                        break;
                    case 9:
                        textElement.setValue(bcbcResult.getName());
                        break;
                    case 10:
                        textElement.setValue(bcbcResult.getC2().toString());
                        break;
                    case 11:
                        textElement.setValue(bcbcResult.getE().toString());
                        break;
                    case 12:
                        textElement.setValue(bcbcResult.getDensity().toString());
                        break;
                    case 13:
                        textElement.setValue(bcbcResult.getDesignStress().toString());
                        break;
                    case 14:
                        textElement.setValue(bcbcResult.getTestRel().toString());
                        break;
                    case 15:
                        textElement.setValue(bcbcResult.getTestStress().toString());
                        break;
                    case 16:
                        textElement.setValue(bcbcResult.getC1().toString());
                        break;
                    case 17:
                        textElement.setValue(bcbcResult.getC().toString());
                        break;
                    case 18:
                        textElement.setValue(bcbcResult.getThke().toString());
                        break;
                    case 19:
                        textElement.setValue(bcbcResult.getCalPressure().toString());
                        break;
                    case 20:
                        textElement.setValue(bcbcResult.getM().toString());
                        break;
                    case 21:
                        textElement.setValue(bcbcResult.getThkc().toString());
                        break;
                    case 22:
                        textElement.setValue(bcbcResult.getThkMin().toString());
                        break;
                    case 23:
                        textElement.setValue(bcbcResult.getThkd().toString());
                        break;
                    case 24:
                        textElement.setValue(bcbcResult.getThkChk());
                        break;
                    case 25:
                        textElement.setValue(bcbcResult.getDesignActStress().toString());
                        break;
                    case 26:
                        textElement.setValue(bcbcResult.getDesignAllowStress().toString());
                        break;
                    case 27:
                        textElement.setValue(bcbcResult.getDesignStressChk());
                        break;
                    case 28:
                        textElement.setValue(bcbcResult.getTestPressure().toString());
                        break;
                    case 29:
                        textElement.setValue(bcbcResult.getTestActStress().toString());
                        break;
                    case 30:
                        textElement.setValue(bcbcResult.getTestAllowStress().toString());
                        break;
                    case 31:
                        textElement.setValue(bcbcResult.getTestStressChk());
                        break;
                    case 32:
                        textElement.setValue(bcbcResult.getMawp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcbcResult.getHi().toString());
                        break;
                    case 34:
                        textElement.setValue(bcbcResult.getAi().toString());
                        break;
                    case 35:
                        textElement.setValue(bcbcResult.getAo().toString());
                        break;
                    case 36:
                        textElement.setValue(bcbcResult.getVi().toString());
                        break;
                    case 37:
                        textElement.setValue(bcbcResult.getMass().toString());
                        break;
                    case 38:
                        textElement.setValue("Φ" + bcbcResult.getInnerDiameter().toString());
                        break;
                    case 39:
                        textElement.setValue("R" + bcbcResult.getCrownRi().toString());
                        break;
                    case 40:
                        textElement.setValue(bcbcResult.getThkn().toString());
                        break;
                    case 41:
                        textElement.setValue("R" + bcbcResult.getCornerRi().toString());
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
     * bcca
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bccaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCCA(String baseFileName, BCCADocx bccaResult) {
        String template;
        if (bccaResult.getTest().equals("液压试验")) {
            if (bccaResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/c/a/BCCAL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/c/a/BCCAL-Q-P0.docx";
            }
        } else if (bccaResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/c/a/BCCAG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/c/a/BCCAG-Q-P0.docx";
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
                    textElement.setValue(bccaResult.getT().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bccaResult.getPd().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bccaResult.getPs().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bccaResult.getSstd());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bccaResult.getSname());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bccaResult.getDi().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bccaResult.getThksn().toString());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bccaResult.getCs2().toString());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bccaResult.getEs().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bccaResult.getCstd());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bccaResult.getCname());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bccaResult.getRi().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bccaResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bccaResult.getCc2().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bccaResult.getEc().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bccaResult.getThkcrn().toString());
                } else if (textElement.getValue().equals("$$017")) {
                    textElement.setValue(bccaResult.getThksrn().toString());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bccaResult.getDc().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bccaResult.getDs().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bccaResult.getOct().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bccaResult.getOst().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bccaResult.getOc().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bccaResult.getOs().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bccaResult.getRcrel().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bccaResult.getRsrel().toString());
                } else if (textElement.getValue().equals("$$028")) {
                    textElement.setValue(bccaResult.getCc1().toString());
                } else if (textElement.getValue().equals("$$029")) {
                    textElement.setValue(bccaResult.getCs1().toString());
                } else if (textElement.getValue().equals("$$030")) {
                    textElement.setValue(bccaResult.getOcrt().toString());
                } else if (textElement.getValue().equals("$$031")) {
                    textElement.setValue(bccaResult.getOsrt().toString());
                } else if (textElement.getValue().equals("$$032")) {
                    textElement.setValue(bccaResult.getOcr().toString());
                } else if (textElement.getValue().equals("$$033")) {
                    textElement.setValue(bccaResult.getOsr().toString());
                } else if (textElement.getValue().equals("$$034")) {
                    textElement.setValue(bccaResult.getRcrrel().toString());
                } else if (textElement.getValue().equals("$$035")) {
                    textElement.setValue(bccaResult.getRsrrel().toString());
                } else if (textElement.getValue().equals("$$038")) {
                    textElement.setValue(bccaResult.getCcr1().toString());
                } else if (textElement.getValue().equals("$$039")) {
                    textElement.setValue(bccaResult.getCsr1().toString());
                } else if (textElement.getValue().equals("$$040")) {
                    textElement.setValue(bccaResult.getPc().toString());
                } else if (textElement.getValue().equals("$$041")) {
                    textElement.setValue(bccaResult.getCc().toString());
                } else if (textElement.getValue().equals("$$042")) {
                    textElement.setValue(bccaResult.getThkce().toString());
                } else if (textElement.getValue().equals("$$043")) {
                    textElement.setValue(bccaResult.getCcr().toString());
                } else if (textElement.getValue().equals("$$044")) {
                    textElement.setValue(bccaResult.getThkcre().toString());
                } else if (textElement.getValue().equals("$$045")) {
                    textElement.setValue(bccaResult.getCs().toString());
                } else if (textElement.getValue().equals("$$046")) {
                    textElement.setValue(bccaResult.getThkse().toString());
                } else if (textElement.getValue().equals("$$047")) {
                    textElement.setValue(bccaResult.getCsr().toString());
                } else if (textElement.getValue().equals("$$048")) {
                    textElement.setValue(bccaResult.getThksre().toString());
                } else if (textElement.getValue().equals("$$049")) {
                    textElement.setValue(bccaResult.getAlpha().toString());
                } else if (textElement.getValue().equals("$$050")) {
                    textElement.setValue(bccaResult.getOtcr().toString());
                } else if (textElement.getValue().equals("$$051")) {
                    textElement.setValue(bccaResult.getThkcc().toString());
                } else if (textElement.getValue().equals("$$052")) {
                    textElement.setValue(bccaResult.getThkcd().toString());
                } else if (textElement.getValue().equals("$$053")) {
                    textElement.setValue(bccaResult.getThkcchk());
                } else if (textElement.getValue().equals("$$054")) {
                    textElement.setValue(bccaResult.getThksc().toString());
                } else if (textElement.getValue().equals("$$055")) {
                    textElement.setValue(bccaResult.getThksd().toString());
                } else if (textElement.getValue().equals("$$056")) {
                    textElement.setValue(bccaResult.getThkschk());
                } else if (textElement.getValue().equals("$$057")) {
                    textElement.setValue(bccaResult.getT2s().toString());
                } else if (textElement.getValue().equals("$$058")) {
                    textElement.setValue(bccaResult.getT1().toString());
                } else if (textElement.getValue().equals("$$059")) {
                    textElement.setValue(bccaResult.getT2().toString());
                } else if (textElement.getValue().equals("$$060")) {
                    textElement.setValue(bccaResult.getWs().toString());
                } else if (textElement.getValue().equals("$$061")) {
                    textElement.setValue(bccaResult.getWc().toString());
                } else if (textElement.getValue().equals("$$062")) {
                    textElement.setValue(bccaResult.getQ().toString());
                } else if (textElement.getValue().equals("$$063")) {
                    textElement.setValue(bccaResult.getA().toString());
                } else if (textElement.getValue().equals("$$064")) {
                    textElement.setValue(bccaResult.getAr().toString());
                } else if (textElement.getValue().equals("$$065")) {
                    textElement.setValue(bccaResult.getArchk());
                } else if (textElement.getValue().equals("$$066")) {
                    textElement.setValue(bccaResult.getPct().toString());
                } else if (textElement.getValue().equals("$$067")) {
                    textElement.setValue(bccaResult.getPcrt().toString());
                } else if (textElement.getValue().equals("$$068")) {
                    textElement.setValue(bccaResult.getPst().toString());
                } else if (textElement.getValue().equals("$$069")) {
                    textElement.setValue(bccaResult.getPsrt().toString());
                } else if (textElement.getValue().equals("$$070")) {
                    textElement.setValue(bccaResult.getPt().toString());
                } else if (textElement.getValue().equals("$$101")) {
                    textElement.setValue(bccaResult.getWcsinalpha().toString());
                } else if (textElement.getValue().equals("$$102")) {
                    textElement.setValue(bccaResult.getRi000752().toString());
                } else if (textElement.getValue().equals("$$103")) {
                    textElement.setValue(bccaResult.getWcsinalphachk());
                } else if (textElement.getValue().equals("$01")) {
                    textElement.setValue("Φ" + bccaResult.getDi().toString());
                } else if (textElement.getValue().equals("$02")) {
                    textElement.setValue(bccaResult.getThksn().toString());
                } else if (textElement.getValue().equals("$03")) {
                    textElement.setValue("SR" + bccaResult.getRi().toString());
                } else if (textElement.getValue().equals("$04")) {
                    textElement.setValue(bccaResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$05")) {
                    textElement.setValue(bccaResult.getThksrn().toString());
                } else if (textElement.getValue().equals("$06")) {
                    textElement.setValue(bccaResult.getThkcrn().toString());
                } else if (textElement.getValue().equals("$07")) {
                    textElement.setValue(">=" + bccaResult.getWs().toString());
                } else if (textElement.getValue().equals("$08")) {
                    textElement.setValue(">=" + Double.toString(2.0D * bccaResult.getThksrn()));
                } else if (textElement.getValue().equals("$09")) {
                    textElement.setValue(">=" + bccaResult.getWc().toString());
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
     * bccb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bccbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCCB(String baseFileName, BCCBDocx bccbResult) {
        String template;
        if (bccbResult.getTest().equals("液压试验")) {
            if (bccbResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/c/b/BCCBL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/c/b/BCCBL-Q-P0.docx";
            }
        } else if (bccbResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/c/b/BCCBG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/c/b/BCCBG-Q-P0.docx";
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
                    textElement.setValue(bccbResult.getT().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bccbResult.getPd().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bccbResult.getPs().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bccbResult.getSstd());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bccbResult.getSname());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bccbResult.getDi().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bccbResult.getThksn().toString());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bccbResult.getCs2().toString());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bccbResult.getEs().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bccbResult.getCstd());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bccbResult.getCname());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bccbResult.getRi().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bccbResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bccbResult.getCc2().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bccbResult.getEc().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bccbResult.getThkcrn().toString());
                } else if (textElement.getValue().equals("$$017")) {
                    textElement.setValue(bccbResult.getThksrn().toString());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bccbResult.getDc().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bccbResult.getDs().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bccbResult.getOct().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bccbResult.getOst().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bccbResult.getOc().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bccbResult.getOs().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bccbResult.getRcrel().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bccbResult.getRsrel().toString());
                } else if (textElement.getValue().equals("$$028")) {
                    textElement.setValue(bccbResult.getCc1().toString());
                } else if (textElement.getValue().equals("$$029")) {
                    textElement.setValue(bccbResult.getCs1().toString());
                } else if (textElement.getValue().equals("$$030")) {
                    textElement.setValue(bccbResult.getOcrt().toString());
                } else if (textElement.getValue().equals("$$031")) {
                    textElement.setValue(bccbResult.getOsrt().toString());
                } else if (textElement.getValue().equals("$$032")) {
                    textElement.setValue(bccbResult.getOcr().toString());
                } else if (textElement.getValue().equals("$$033")) {
                    textElement.setValue(bccbResult.getOsr().toString());
                } else if (textElement.getValue().equals("$$034")) {
                    textElement.setValue(bccbResult.getRcrrel().toString());
                } else if (textElement.getValue().equals("$$035")) {
                    textElement.setValue(bccbResult.getRsrrel().toString());
                } else if (textElement.getValue().equals("$$038")) {
                    textElement.setValue(bccbResult.getCcr1().toString());
                } else if (textElement.getValue().equals("$$039")) {
                    textElement.setValue(bccbResult.getCsr1().toString());
                } else if (textElement.getValue().equals("$$040")) {
                    textElement.setValue(bccbResult.getPc().toString());
                } else if (textElement.getValue().equals("$$041")) {
                    textElement.setValue(bccbResult.getCc().toString());
                } else if (textElement.getValue().equals("$$042")) {
                    textElement.setValue(bccbResult.getThkce().toString());
                } else if (textElement.getValue().equals("$$043")) {
                    textElement.setValue(bccbResult.getCcr().toString());
                } else if (textElement.getValue().equals("$$044")) {
                    textElement.setValue(bccbResult.getThkcre().toString());
                } else if (textElement.getValue().equals("$$045")) {
                    textElement.setValue(bccbResult.getCs().toString());
                } else if (textElement.getValue().equals("$$046")) {
                    textElement.setValue(bccbResult.getThkse().toString());
                } else if (textElement.getValue().equals("$$047")) {
                    textElement.setValue(bccbResult.getCsr().toString());
                } else if (textElement.getValue().equals("$$048")) {
                    textElement.setValue(bccbResult.getThksre().toString());
                } else if (textElement.getValue().equals("$$049")) {
                    textElement.setValue(bccbResult.getAlpha().toString());
                } else if (textElement.getValue().equals("$$050")) {
                    textElement.setValue(bccbResult.getOtcr().toString());
                } else if (textElement.getValue().equals("$$051")) {
                    textElement.setValue(bccbResult.getThkcc().toString());
                } else if (textElement.getValue().equals("$$052")) {
                    textElement.setValue(bccbResult.getThkcd().toString());
                } else if (textElement.getValue().equals("$$053")) {
                    textElement.setValue(bccbResult.getThkcchk());
                } else if (textElement.getValue().equals("$$054")) {
                    textElement.setValue(bccbResult.getThksc().toString());
                } else if (textElement.getValue().equals("$$055")) {
                    textElement.setValue(bccbResult.getThksd().toString());
                } else if (textElement.getValue().equals("$$056")) {
                    textElement.setValue(bccbResult.getThkschk());
                } else if (textElement.getValue().equals("$$057")) {
                    textElement.setValue(bccbResult.getT2s().toString());
                } else if (textElement.getValue().equals("$$058")) {
                    textElement.setValue(bccbResult.getT1().toString());
                } else if (textElement.getValue().equals("$$059")) {
                    textElement.setValue(bccbResult.getT2().toString());
                } else if (textElement.getValue().equals("$$060")) {
                    textElement.setValue(bccbResult.getWs().toString());
                } else if (textElement.getValue().equals("$$061")) {
                    textElement.setValue(bccbResult.getWc().toString());
                } else if (textElement.getValue().equals("$$062")) {
                    textElement.setValue(bccbResult.getQ().toString());
                } else if (textElement.getValue().equals("$$063")) {
                    textElement.setValue(bccbResult.getA().toString());
                } else if (textElement.getValue().equals("$$064")) {
                    textElement.setValue(bccbResult.getAr().toString());
                } else if (textElement.getValue().equals("$$065")) {
                    textElement.setValue(bccbResult.getArchk());
                } else if (textElement.getValue().equals("$$066")) {
                    textElement.setValue(bccbResult.getPct().toString());
                } else if (textElement.getValue().equals("$$067")) {
                    textElement.setValue(bccbResult.getPcrt().toString());
                } else if (textElement.getValue().equals("$$068")) {
                    textElement.setValue(bccbResult.getPst().toString());
                } else if (textElement.getValue().equals("$$069")) {
                    textElement.setValue(bccbResult.getPsrt().toString());
                } else if (textElement.getValue().equals("$$070")) {
                    textElement.setValue(bccbResult.getPt().toString());
                } else if (textElement.getValue().equals("$$101")) {
                    textElement.setValue(bccbResult.getWcsinalpha().toString());
                } else if (textElement.getValue().equals("$$102")) {
                    textElement.setValue(bccbResult.getRi000752().toString());
                } else if (textElement.getValue().equals("$$103")) {
                    textElement.setValue(bccbResult.getWcsinalphachk());
                } else if (textElement.getValue().equals("$01")) {
                    textElement.setValue("Φ" + bccbResult.getDi().toString());
                } else if (textElement.getValue().equals("$02")) {
                    textElement.setValue(bccbResult.getThksn().toString());
                } else if (textElement.getValue().equals("$03")) {
                    textElement.setValue("SR" + bccbResult.getRi().toString());
                } else if (textElement.getValue().equals("$04")) {
                    textElement.setValue(bccbResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$05")) {
                    textElement.setValue(bccbResult.getThksrn().toString());
                } else if (textElement.getValue().equals("$06")) {
                    textElement.setValue(bccbResult.getThkcrn().toString());
                } else if (textElement.getValue().equals("$07")) {
                    textElement.setValue(">=" + bccbResult.getWs().toString());
                } else if (textElement.getValue().equals("$08")) {
                    textElement.setValue(">=" + Double.toString(2.0D * bccbResult.getThksrn()));
                } else if (textElement.getValue().equals("$09")) {
                    textElement.setValue(">=" + bccbResult.getWc().toString());
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
     * bccc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcccResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCCC(String baseFileName, BCCCDocx bcccResult) {
        String template;
        if (bcccResult.getTest().equals("液压试验")) {
            if (bcccResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/c/c/BCCCL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/c/c/BCCCL-Q-P0.docx";
            }
        } else if (bcccResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/c/c/BCCCG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/c/c/BCCCG-Q-P0.docx";
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
                    textElement.setValue(bcccResult.getT().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bcccResult.getPd().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bcccResult.getPs().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bcccResult.getSstd());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bcccResult.getSname());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bcccResult.getDi().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bcccResult.getThksn().toString());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bcccResult.getCs2().toString());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bcccResult.getEs().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bcccResult.getCstd());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bcccResult.getCname());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bcccResult.getRi().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bcccResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bcccResult.getCc2().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bcccResult.getEc().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bcccResult.getRstd());
                } else if (textElement.getValue().equals("$$017")) {
                    textElement.setValue(bcccResult.getRname());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bcccResult.getThkrn().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bcccResult.getWr().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bcccResult.getEr().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bcccResult.getDc().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bcccResult.getDs().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bcccResult.getOct().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bcccResult.getOst().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bcccResult.getOc().toString());
                } else if (textElement.getValue().equals("$$026")) {
                    textElement.setValue(bcccResult.getOs().toString());
                } else if (textElement.getValue().equals("$$027")) {
                    textElement.setValue(bcccResult.getRcrel().toString());
                } else if (textElement.getValue().equals("$$028")) {
                    textElement.setValue(bcccResult.getRsrel().toString());
                } else if (textElement.getValue().equals("$$029")) {
                    textElement.setValue(bcccResult.getCc1().toString());
                } else if (textElement.getValue().equals("$$030")) {
                    textElement.setValue(bcccResult.getCs1().toString());
                } else if (textElement.getValue().equals("$$031")) {
                    textElement.setValue(bcccResult.getDr().toString());
                } else if (textElement.getValue().equals("$$032")) {
                    textElement.setValue(bcccResult.getOrt().toString());
                } else if (textElement.getValue().equals("$$033")) {
                    textElement.setValue(bcccResult.getRrrel().toString());
                } else if (textElement.getValue().equals("$$034")) {
                    textElement.setValue(bcccResult.getOr().toString());
                } else if (textElement.getValue().equals("$$035")) {
                    textElement.setValue(bcccResult.getCr1().toString());
                } else if (textElement.getValue().equals("$$036")) {
                    textElement.setValue(bcccResult.getPc().toString());
                } else if (textElement.getValue().equals("$$037")) {
                    textElement.setValue(bcccResult.getCc().toString());
                } else if (textElement.getValue().equals("$$038")) {
                    textElement.setValue(bcccResult.getThkce().toString());
                } else if (textElement.getValue().equals("$$039")) {
                    textElement.setValue(bcccResult.getCs().toString());
                } else if (textElement.getValue().equals("$$040")) {
                    textElement.setValue(bcccResult.getThkse().toString());
                } else if (textElement.getValue().equals("$$041")) {
                    textElement.setValue(bcccResult.getCr().toString());
                } else if (textElement.getValue().equals("$$042")) {
                    textElement.setValue(bcccResult.getThkre().toString());
                } else if (textElement.getValue().equals("$$043")) {
                    textElement.setValue(bcccResult.getAlpha().toString());
                } else if (textElement.getValue().equals("$$044")) {
                    textElement.setValue(bcccResult.getOtcr().toString());
                } else if (textElement.getValue().equals("$$045")) {
                    textElement.setValue(bcccResult.getThkcc().toString());
                } else if (textElement.getValue().equals("$$046")) {
                    textElement.setValue(bcccResult.getThkcd().toString());
                } else if (textElement.getValue().equals("$$047")) {
                    textElement.setValue(bcccResult.getThkcchk());
                } else if (textElement.getValue().equals("$$048")) {
                    textElement.setValue(bcccResult.getThksc().toString());
                } else if (textElement.getValue().equals("$$049")) {
                    textElement.setValue(bcccResult.getThksd().toString());
                } else if (textElement.getValue().equals("$$050")) {
                    textElement.setValue(bcccResult.getThkschk());
                } else if (textElement.getValue().equals("$$051")) {
                    textElement.setValue(bcccResult.getT2s().toString());
                } else if (textElement.getValue().equals("$$052")) {
                    textElement.setValue(bcccResult.getT1().toString());
                } else if (textElement.getValue().equals("$$053")) {
                    textElement.setValue(bcccResult.getT2().toString());
                } else if (textElement.getValue().equals("$$054")) {
                    textElement.setValue(bcccResult.getWs().toString());
                } else if (textElement.getValue().equals("$$055")) {
                    textElement.setValue(bcccResult.getWc().toString());
                } else if (textElement.getValue().equals("$$056")) {
                    textElement.setValue(bcccResult.getQ().toString());
                } else if (textElement.getValue().equals("$$057")) {
                    textElement.setValue(bcccResult.getA().toString());
                } else if (textElement.getValue().equals("$$058")) {
                    textElement.setValue(bcccResult.getAr().toString());
                } else if (textElement.getValue().equals("$$059")) {
                    textElement.setValue(bcccResult.getAc().toString());
                } else if (textElement.getValue().equals("$$060")) {
                    textElement.setValue(bcccResult.getArchk());
                } else if (textElement.getValue().equals("$$061")) {
                    textElement.setValue(bcccResult.getPct().toString());
                } else if (textElement.getValue().equals("$$062")) {
                    textElement.setValue(bcccResult.getPst().toString());
                } else if (textElement.getValue().equals("$$063")) {
                    textElement.setValue(bcccResult.getPrt().toString());
                } else if (textElement.getValue().equals("$$064")) {
                    textElement.setValue(bcccResult.getPt().toString());
                } else if (textElement.getValue().equals("$$101")) {
                    textElement.setValue(bcccResult.getWcsinalpha().toString());
                } else if (textElement.getValue().equals("$$102")) {
                    textElement.setValue(bcccResult.getRi000752().toString());
                } else if (textElement.getValue().equals("$$103")) {
                    textElement.setValue(bcccResult.getWcsinalphachk());
                } else if (textElement.getValue().equals("$01")) {
                    textElement.setValue("Φ" + bcccResult.getDi().toString());
                } else if (textElement.getValue().equals("$02")) {
                    textElement.setValue(bcccResult.getThksn().toString());
                } else if (textElement.getValue().equals("$03")) {
                    textElement.setValue("SR" + bcccResult.getRi().toString());
                } else if (textElement.getValue().equals("$04")) {
                    textElement.setValue(bcccResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$05")) {
                    textElement.setValue(bcccResult.getThkrn().toString());
                } else if (textElement.getValue().equals("$06")) {
                    textElement.setValue(bcccResult.getWr().toString());
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
     * bccd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bccdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCCD(String baseFileName, BCCDDocx bccdResult) {
        String template;
        if (bccdResult.getTest().equals("液压试验")) {
            if (bccdResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/c/d/BCCDL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/c/d/BCCDL-Q-P0.docx";
            }
        } else if (bccdResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/c/d/BCCDG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/c/d/BCCDG-Q-P0.docx";
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
                    textElement.setValue(bccdResult.getT().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bccdResult.getPd().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bccdResult.getPs().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bccdResult.getSstd());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bccdResult.getSname());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bccdResult.getDi().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bccdResult.getThksn().toString());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bccdResult.getCs2().toString());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bccdResult.getEs().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bccdResult.getCstd());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bccdResult.getCname());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bccdResult.getRi().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bccdResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bccdResult.getCc2().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bccdResult.getEc().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bccdResult.getRstd());
                } else if (textElement.getValue().equals("$$017")) {
                    textElement.setValue(bccdResult.getRname());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bccdResult.getThkrn().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bccdResult.getWr().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bccdResult.getHr().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bccdResult.getEr().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bccdResult.getDc().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bccdResult.getDs().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bccdResult.getOct().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bccdResult.getOst().toString());
                } else if (textElement.getValue().equals("$$026")) {
                    textElement.setValue(bccdResult.getOc().toString());
                } else if (textElement.getValue().equals("$$027")) {
                    textElement.setValue(bccdResult.getOs().toString());
                } else if (textElement.getValue().equals("$$028")) {
                    textElement.setValue(bccdResult.getRcrel().toString());
                } else if (textElement.getValue().equals("$$029")) {
                    textElement.setValue(bccdResult.getRsrel().toString());
                } else if (textElement.getValue().equals("$$030")) {
                    textElement.setValue(bccdResult.getCc1().toString());
                } else if (textElement.getValue().equals("$$031")) {
                    textElement.setValue(bccdResult.getCs1().toString());
                } else if (textElement.getValue().equals("$$032")) {
                    textElement.setValue(bccdResult.getDr().toString());
                } else if (textElement.getValue().equals("$$033")) {
                    textElement.setValue(bccdResult.getOrt().toString());
                } else if (textElement.getValue().equals("$$034")) {
                    textElement.setValue(bccdResult.getRrrel().toString());
                } else if (textElement.getValue().equals("$$035")) {
                    textElement.setValue(bccdResult.getOr().toString());
                } else if (textElement.getValue().equals("$$036")) {
                    textElement.setValue(bccdResult.getCr1().toString());
                } else if (textElement.getValue().equals("$$037")) {
                    textElement.setValue(bccdResult.getPc().toString());
                } else if (textElement.getValue().equals("$$038")) {
                    textElement.setValue(bccdResult.getCc().toString());
                } else if (textElement.getValue().equals("$$039")) {
                    textElement.setValue(bccdResult.getThkce().toString());
                } else if (textElement.getValue().equals("$$040")) {
                    textElement.setValue(bccdResult.getCs().toString());
                } else if (textElement.getValue().equals("$$041")) {
                    textElement.setValue(bccdResult.getThkse().toString());
                } else if (textElement.getValue().equals("$$042")) {
                    textElement.setValue(bccdResult.getCr().toString());
                } else if (textElement.getValue().equals("$$043")) {
                    textElement.setValue(bccdResult.getThkre().toString());
                } else if (textElement.getValue().equals("$$044")) {
                    textElement.setValue(bccdResult.getAlpha().toString());
                } else if (textElement.getValue().equals("$$045")) {
                    textElement.setValue(bccdResult.getOtcr().toString());
                } else if (textElement.getValue().equals("$$046")) {
                    textElement.setValue(bccdResult.getThkcc().toString());
                } else if (textElement.getValue().equals("$$047")) {
                    textElement.setValue(bccdResult.getThkcd().toString());
                } else if (textElement.getValue().equals("$$048")) {
                    textElement.setValue(bccdResult.getThkcchk());
                } else if (textElement.getValue().equals("$$049")) {
                    textElement.setValue(bccdResult.getThksc().toString());
                } else if (textElement.getValue().equals("$$050")) {
                    textElement.setValue(bccdResult.getThksd().toString());
                } else if (textElement.getValue().equals("$$051")) {
                    textElement.setValue(bccdResult.getThkschk());
                } else if (textElement.getValue().equals("$$052")) {
                    textElement.setValue(bccdResult.getT2s().toString());
                } else if (textElement.getValue().equals("$$053")) {
                    textElement.setValue(bccdResult.getT1().toString());
                } else if (textElement.getValue().equals("$$054")) {
                    textElement.setValue(bccdResult.getT2().toString());
                } else if (textElement.getValue().equals("$$055")) {
                    textElement.setValue(bccdResult.getWs().toString());
                } else if (textElement.getValue().equals("$$056")) {
                    textElement.setValue(bccdResult.getWc().toString());
                } else if (textElement.getValue().equals("$$057")) {
                    textElement.setValue(bccdResult.getQ().toString());
                } else if (textElement.getValue().equals("$$058")) {
                    textElement.setValue(bccdResult.getA().toString());
                } else if (textElement.getValue().equals("$$059")) {
                    textElement.setValue(bccdResult.getAr().toString());
                } else if (textElement.getValue().equals("$$060")) {
                    textElement.setValue(bccdResult.getAc().toString());
                } else if (textElement.getValue().equals("$$061")) {
                    textElement.setValue(bccdResult.getArchk());
                } else if (textElement.getValue().equals("$$062")) {
                    textElement.setValue(bccdResult.getPct().toString());
                } else if (textElement.getValue().equals("$$063")) {
                    textElement.setValue(bccdResult.getPst().toString());
                } else if (textElement.getValue().equals("$$064")) {
                    textElement.setValue(bccdResult.getPrt().toString());
                } else if (textElement.getValue().equals("$$065")) {
                    textElement.setValue(bccdResult.getPt().toString());
                } else if (textElement.getValue().equals("$$101")) {
                    textElement.setValue(bccdResult.getWcsinalpha().toString());
                } else if (textElement.getValue().equals("$$102")) {
                    textElement.setValue(bccdResult.getRi000752().toString());
                } else if (textElement.getValue().equals("$$103")) {
                    textElement.setValue(bccdResult.getWcsinalphachk());
                } else if (textElement.getValue().equals("$01")) {
                    textElement.setValue("Φ" + bccdResult.getDi().toString());
                } else if (textElement.getValue().equals("$02")) {
                    textElement.setValue(bccdResult.getThksn().toString());
                } else if (textElement.getValue().equals("$03")) {
                    textElement.setValue("SR" + bccdResult.getRi().toString());
                } else if (textElement.getValue().equals("$04")) {
                    textElement.setValue(bccdResult.getThkcn().toString());
                } else if (textElement.getValue().equals("$05")) {
                    textElement.setValue(bccdResult.getThkrn().toString());
                } else if (textElement.getValue().equals("$06")) {
                    textElement.setValue(bccdResult.getWr().toString());
                } else if (textElement.getValue().equals("$07")) {
                    textElement.setValue(bccdResult.getHr().toString());
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
     * bcda
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcdaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCDA(String baseFileName, BCDADocx bcdaResult) {
        String template;
        if (bcdaResult.getTest().equals("液压试验")) {
            if (bcdaResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/d/a/BCDAL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/d/a/BCDAL-Q-P0.docx";
            }
        } else if (bcdaResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/d/a/BCDAG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/d/a/BCDAG-Q-P0.docx";
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
                switch (textElement.getValue()) {
                    case "$$001":
                        textElement.setValue(bcdaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bcdaResult.getPd().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bcdaResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bcdaResult.getSstd());
                        break;
                    case "$$005":
                        textElement.setValue(bcdaResult.getSname());
                        break;
                    case "$$006":
                        textElement.setValue(bcdaResult.getDi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(bcdaResult.getThksn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bcdaResult.getCs2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bcdaResult.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bcdaResult.getCstd());
                        break;
                    case "$$011":
                        textElement.setValue(bcdaResult.getCname());
                        break;
                    case "$$012":
                        textElement.setValue(bcdaResult.getRi().toString());
                        break;
                    case "$$013":
                        textElement.setValue(bcdaResult.getThkcn().toString());
                        break;
                    case "$$014":
                        textElement.setValue(bcdaResult.getCc2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bcdaResult.getEc().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bcdaResult.getThkcrn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bcdaResult.getThksrn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bcdaResult.getDc().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bcdaResult.getDs().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bcdaResult.getOct().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bcdaResult.getOst().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bcdaResult.getOc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bcdaResult.getOs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bcdaResult.getRcrel().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bcdaResult.getRsrel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bcdaResult.getCc1().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bcdaResult.getCs1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bcdaResult.getOcrt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bcdaResult.getOsrt().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bcdaResult.getOcr().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bcdaResult.getOsr().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bcdaResult.getRcrrel().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bcdaResult.getRsrrel().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bcdaResult.getCcr1().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bcdaResult.getCsr1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bcdaResult.getPc().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bcdaResult.getCc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bcdaResult.getThkce().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bcdaResult.getCcr().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bcdaResult.getThkcre().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bcdaResult.getCs().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bcdaResult.getThkse().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bcdaResult.getCsr().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bcdaResult.getThksre().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bcdaResult.getAlpha().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bcdaResult.getOtcr().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bcdaResult.getThkcc().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bcdaResult.getThkcd().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bcdaResult.getThkcchk());
                        break;
                    case "$$054":
                        textElement.setValue(bcdaResult.getThksc().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bcdaResult.getThksd().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bcdaResult.getThkschk());
                        break;
                    case "$$057":
                        textElement.setValue(bcdaResult.getT2s().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bcdaResult.getT1().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bcdaResult.getT2().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bcdaResult.getWs().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bcdaResult.getWc().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bcdaResult.getQ().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bcdaResult.getA().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bcdaResult.getAr().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bcdaResult.getArchk());
                        break;
                    case "$$066":
                        textElement.setValue(bcdaResult.getPct().toString());
                        break;
                    case "$$067":
                        textElement.setValue(bcdaResult.getPcrt().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bcdaResult.getPst().toString());
                        break;
                    case "$$069":
                        textElement.setValue(bcdaResult.getPsrt().toString());
                        break;
                    case "$$070":
                        textElement.setValue(bcdaResult.getPt().toString());
                        break;
                    case "$$101":
                        textElement.setValue(bcdaResult.getWcsinalpha().toString());
                        break;
                    case "$$102":
                        textElement.setValue(bcdaResult.getRi000752().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bcdaResult.getWcsinalphachk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + bcdaResult.getDi().toString());
                        break;
                    case "$02":
                        textElement.setValue(bcdaResult.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue("SR" + bcdaResult.getRi().toString());
                        break;
                    case "$04":
                        textElement.setValue(bcdaResult.getThkcn().toString());
                        break;
                    case "$05":
                        textElement.setValue(bcdaResult.getThksrn().toString());
                        break;
                    case "$06":
                        textElement.setValue(bcdaResult.getThkcrn().toString());
                        break;
                    case "$07":
                        textElement.setValue(">=" + bcdaResult.getWs().toString());
                        break;
                    case "$08":
                        textElement.setValue(">=" + bcdaResult.getWs().toString());
                        break;
                    case "$09":
                        textElement.setValue(">=" + bcdaResult.getWc().toString());
                        break;
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
     * bcdb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcdbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCDB(String baseFileName, BCDBDocx bcdbResult) {
        String template;
        if (bcdbResult.getTest().equals("液压试验")) {
            if (bcdbResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/d/b/BCDBL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/d/b/BCDBL-Q-P0.docx";
            }
        } else if (bcdbResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/d/b/BCDBG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/d/b/BCDBG-Q-P0.docx";
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
                switch (textElement.getValue()) {
                    case "$$001":
                        textElement.setValue(bcdbResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bcdbResult.getPd().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bcdbResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bcdbResult.getSstd());
                        break;
                    case "$$005":
                        textElement.setValue(bcdbResult.getSname());
                        break;
                    case "$$006":
                        textElement.setValue(bcdbResult.getDi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(bcdbResult.getThksn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bcdbResult.getCs2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bcdbResult.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bcdbResult.getCstd());
                        break;
                    case "$$011":
                        textElement.setValue(bcdbResult.getCname());
                        break;
                    case "$$012":
                        textElement.setValue(bcdbResult.getRi().toString());
                        break;
                    case "$$013":
                        textElement.setValue(bcdbResult.getThkcn().toString());
                        break;
                    case "$$014":
                        textElement.setValue(bcdbResult.getCc2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bcdbResult.getEc().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bcdbResult.getThkcrn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(bcdbResult.getThksrn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(bcdbResult.getDc().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bcdbResult.getDs().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bcdbResult.getOct().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bcdbResult.getOst().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bcdbResult.getOc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bcdbResult.getOs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bcdbResult.getRcrel().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bcdbResult.getRsrel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bcdbResult.getCc1().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bcdbResult.getCs1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bcdbResult.getOcrt().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bcdbResult.getOsrt().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bcdbResult.getOcr().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bcdbResult.getOsr().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bcdbResult.getRcrrel().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bcdbResult.getRsrrel().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bcdbResult.getCcr1().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bcdbResult.getCsr1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bcdbResult.getPc().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bcdbResult.getCc().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bcdbResult.getThkce().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bcdbResult.getCcr().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bcdbResult.getThkcre().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bcdbResult.getCs().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bcdbResult.getThkse().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bcdbResult.getCsr().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bcdbResult.getThksre().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bcdbResult.getAlpha().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bcdbResult.getOtcr().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bcdbResult.getThkcc().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bcdbResult.getThkcd().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bcdbResult.getThkcchk());
                        break;
                    case "$$054":
                        textElement.setValue(bcdbResult.getThksc().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bcdbResult.getThksd().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bcdbResult.getThkschk());
                        break;
                    case "$$057":
                        textElement.setValue(bcdbResult.getT2s().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bcdbResult.getT1().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bcdbResult.getT2().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bcdbResult.getWs().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bcdbResult.getWc().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bcdbResult.getQ().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bcdbResult.getA().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bcdbResult.getAr().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bcdbResult.getArchk());
                        break;
                    case "$$066":
                        textElement.setValue(bcdbResult.getPct().toString());
                        break;
                    case "$$067":
                        textElement.setValue(bcdbResult.getPcrt().toString());
                        break;
                    case "$$068":
                        textElement.setValue(bcdbResult.getPst().toString());
                        break;
                    case "$$069":
                        textElement.setValue(bcdbResult.getPsrt().toString());
                        break;
                    case "$$070":
                        textElement.setValue(bcdbResult.getPt().toString());
                        break;
                    case "$$101":
                        textElement.setValue(bcdbResult.getWcsinalpha().toString());
                        break;
                    case "$$102":
                        textElement.setValue(bcdbResult.getRi000752().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bcdbResult.getWcsinalphachk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + bcdbResult.getDi().toString());
                        break;
                    case "$02":
                        textElement.setValue(bcdbResult.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue("SR" + bcdbResult.getRi().toString());
                        break;
                    case "$04":
                        textElement.setValue(bcdbResult.getThkcn().toString());
                        break;
                    case "$05":
                        textElement.setValue(bcdbResult.getThksrn().toString());
                        break;
                    case "$06":
                        textElement.setValue(bcdbResult.getThkcrn().toString());
                        break;
                    case "$07":
                        textElement.setValue(">=" + bcdbResult.getWs().toString());
                        break;
                    case "$08":
                        textElement.setValue(">=" + bcdbResult.getWs().toString());
                        break;
                    case "$09":
                        textElement.setValue(">=" + bcdbResult.getWc().toString());
                        break;
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
     * bcdc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcdcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCDC(String baseFileName, BCDCDocx bcdcResult) {
        String template;
        if (bcdcResult.getTest().equals("液压试验")) {
            if (bcdcResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/d/c/BCDCL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/d/c/BCDCL-Q-P0.docx";
            }
        } else if (bcdcResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/d/c/BCDCG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/d/c/BCDCG-Q-P0.docx";
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
                switch (textElement.getValue()) {
                    case "$$001":
                        textElement.setValue(bcdcResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bcdcResult.getPd().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bcdcResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bcdcResult.getSstd());
                        break;
                    case "$$005":
                        textElement.setValue(bcdcResult.getSname());
                        break;
                    case "$$006":
                        textElement.setValue(bcdcResult.getDi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(bcdcResult.getThksn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bcdcResult.getCs2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bcdcResult.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bcdcResult.getCstd());
                        break;
                    case "$$011":
                        textElement.setValue(bcdcResult.getCname());
                        break;
                    case "$$012":
                        textElement.setValue(bcdcResult.getRi().toString());
                        break;
                    case "$$013":
                        textElement.setValue(bcdcResult.getThkcn().toString());
                        break;
                    case "$$014":
                        textElement.setValue(bcdcResult.getCc2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bcdcResult.getEc().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bcdcResult.getRstd());
                        break;
                    case "$$017":
                        textElement.setValue(bcdcResult.getRname());
                        break;
                    case "$$018":
                        textElement.setValue(bcdcResult.getThkrn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bcdcResult.getWr().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bcdcResult.getEr().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bcdcResult.getDc().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bcdcResult.getDs().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bcdcResult.getOct().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bcdcResult.getOst().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bcdcResult.getOc().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bcdcResult.getOs().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bcdcResult.getRcrel().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bcdcResult.getRsrel().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bcdcResult.getCc1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bcdcResult.getCs1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bcdcResult.getDr().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bcdcResult.getOrt().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bcdcResult.getRrrel().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bcdcResult.getOr().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bcdcResult.getCr1().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bcdcResult.getPc().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bcdcResult.getCc().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bcdcResult.getThkce().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bcdcResult.getCs().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bcdcResult.getThkse().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bcdcResult.getCr().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bcdcResult.getThkre().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bcdcResult.getAlpha().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bcdcResult.getOtcr().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bcdcResult.getThkcc().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bcdcResult.getThkcd().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bcdcResult.getThkcchk());
                        break;
                    case "$$048":
                        textElement.setValue(bcdcResult.getThksc().toString());
                        break;
                    case "$$049":
                        textElement.setValue(bcdcResult.getThksd().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bcdcResult.getThkschk());
                        break;
                    case "$$051":
                        textElement.setValue(bcdcResult.getT2s().toString());
                        break;
                    case "$$052":
                        textElement.setValue(bcdcResult.getT1().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bcdcResult.getT2().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bcdcResult.getWs().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bcdcResult.getWc().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bcdcResult.getQ().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bcdcResult.getA().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bcdcResult.getAr().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bcdcResult.getAc().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bcdcResult.getArchk());
                        break;
                    case "$$061":
                        textElement.setValue(bcdcResult.getPct().toString());
                        break;
                    case "$$062":
                        textElement.setValue(bcdcResult.getPst().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bcdcResult.getPrt().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bcdcResult.getPt().toString());
                        break;
                    case "$$101":
                        textElement.setValue(bcdcResult.getWcsinalpha().toString());
                        break;
                    case "$$102":
                        textElement.setValue(bcdcResult.getRi000752().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bcdcResult.getWcsinalphachk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + bcdcResult.getDi().toString());
                        break;
                    case "$02":
                        textElement.setValue(bcdcResult.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue("SR" + bcdcResult.getRi().toString());
                        break;
                    case "$04":
                        textElement.setValue(bcdcResult.getThkcn().toString());
                        break;
                    case "$05":
                        textElement.setValue(bcdcResult.getThkrn().toString());
                        break;
                    case "$06":
                        textElement.setValue(bcdcResult.getWr().toString());
                        break;
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
     * bcdd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcddResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCDD(String baseFileName, BCDDDocx bcddResult) {
        String template;
        if (bcddResult.getTest().equals("液压试验")) {
            if (bcddResult.getQ() < 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/d/d/BCDDL-Q-N0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/d/d/BCDDL-Q-P0.docx";
            }
        } else if (bcddResult.getQ() < 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/d/d/BCDDG-Q-N0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/d/d/BCDDG-Q-P0.docx";
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
                switch (textElement.getValue()) {
                    case "$$001":
                        textElement.setValue(bcddResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(bcddResult.getPd().toString());
                        break;
                    case "$$003":
                        textElement.setValue(bcddResult.getPs().toString());
                        break;
                    case "$$004":
                        textElement.setValue(bcddResult.getSstd());
                        break;
                    case "$$005":
                        textElement.setValue(bcddResult.getSname());
                        break;
                    case "$$006":
                        textElement.setValue(bcddResult.getDi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(bcddResult.getThksn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(bcddResult.getCs2().toString());
                        break;
                    case "$$009":
                        textElement.setValue(bcddResult.getEs().toString());
                        break;
                    case "$$010":
                        textElement.setValue(bcddResult.getCstd());
                        break;
                    case "$$011":
                        textElement.setValue(bcddResult.getCname());
                        break;
                    case "$$012":
                        textElement.setValue(bcddResult.getRi().toString());
                        break;
                    case "$$013":
                        textElement.setValue(bcddResult.getThkcn().toString());
                        break;
                    case "$$014":
                        textElement.setValue(bcddResult.getCc2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(bcddResult.getEc().toString());
                        break;
                    case "$$016":
                        textElement.setValue(bcddResult.getRstd());
                        break;
                    case "$$017":
                        textElement.setValue(bcddResult.getRname());
                        break;
                    case "$$018":
                        textElement.setValue(bcddResult.getThkrn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(bcddResult.getWr().toString());
                        break;
                    case "$$020":
                        textElement.setValue(bcddResult.getHr().toString());
                        break;
                    case "$$021":
                        textElement.setValue(bcddResult.getEr().toString());
                        break;
                    case "$$022":
                        textElement.setValue(bcddResult.getDc().toString());
                        break;
                    case "$$023":
                        textElement.setValue(bcddResult.getDs().toString());
                        break;
                    case "$$024":
                        textElement.setValue(bcddResult.getOct().toString());
                        break;
                    case "$$025":
                        textElement.setValue(bcddResult.getOst().toString());
                        break;
                    case "$$026":
                        textElement.setValue(bcddResult.getOc().toString());
                        break;
                    case "$$027":
                        textElement.setValue(bcddResult.getOs().toString());
                        break;
                    case "$$028":
                        textElement.setValue(bcddResult.getRcrel().toString());
                        break;
                    case "$$029":
                        textElement.setValue(bcddResult.getRsrel().toString());
                        break;
                    case "$$030":
                        textElement.setValue(bcddResult.getCc1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(bcddResult.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(bcddResult.getDr().toString());
                        break;
                    case "$$033":
                        textElement.setValue(bcddResult.getOrt().toString());
                        break;
                    case "$$034":
                        textElement.setValue(bcddResult.getRrrel().toString());
                        break;
                    case "$$035":
                        textElement.setValue(bcddResult.getOr().toString());
                        break;
                    case "$$036":
                        textElement.setValue(bcddResult.getCr1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(bcddResult.getPc().toString());
                        break;
                    case "$$038":
                        textElement.setValue(bcddResult.getCc().toString());
                        break;
                    case "$$039":
                        textElement.setValue(bcddResult.getThkce().toString());
                        break;
                    case "$$040":
                        textElement.setValue(bcddResult.getCs().toString());
                        break;
                    case "$$041":
                        textElement.setValue(bcddResult.getThkse().toString());
                        break;
                    case "$$042":
                        textElement.setValue(bcddResult.getCr().toString());
                        break;
                    case "$$043":
                        textElement.setValue(bcddResult.getThkre().toString());
                        break;
                    case "$$044":
                        textElement.setValue(bcddResult.getAlpha().toString());
                        break;
                    case "$$045":
                        textElement.setValue(bcddResult.getOtcr().toString());
                        break;
                    case "$$046":
                        textElement.setValue(bcddResult.getThkcc().toString());
                        break;
                    case "$$047":
                        textElement.setValue(bcddResult.getThkcd().toString());
                        break;
                    case "$$048":
                        textElement.setValue(bcddResult.getThkcchk());
                        break;
                    case "$$049":
                        textElement.setValue(bcddResult.getThksc().toString());
                        break;
                    case "$$050":
                        textElement.setValue(bcddResult.getThksd().toString());
                        break;
                    case "$$051":
                        textElement.setValue(bcddResult.getThkschk());
                        break;
                    case "$$052":
                        textElement.setValue(bcddResult.getT2s().toString());
                        break;
                    case "$$053":
                        textElement.setValue(bcddResult.getT1().toString());
                        break;
                    case "$$054":
                        textElement.setValue(bcddResult.getT2().toString());
                        break;
                    case "$$055":
                        textElement.setValue(bcddResult.getWs().toString());
                        break;
                    case "$$056":
                        textElement.setValue(bcddResult.getWc().toString());
                        break;
                    case "$$057":
                        textElement.setValue(bcddResult.getQ().toString());
                        break;
                    case "$$058":
                        textElement.setValue(bcddResult.getA().toString());
                        break;
                    case "$$059":
                        textElement.setValue(bcddResult.getAr().toString());
                        break;
                    case "$$060":
                        textElement.setValue(bcddResult.getAc().toString());
                        break;
                    case "$$061":
                        textElement.setValue(bcddResult.getArchk());
                        break;
                    case "$$062":
                        textElement.setValue(bcddResult.getPct().toString());
                        break;
                    case "$$063":
                        textElement.setValue(bcddResult.getPst().toString());
                        break;
                    case "$$064":
                        textElement.setValue(bcddResult.getPrt().toString());
                        break;
                    case "$$065":
                        textElement.setValue(bcddResult.getPt().toString());
                        break;
                    case "$$101":
                        textElement.setValue(bcddResult.getWcsinalpha().toString());
                        break;
                    case "$$102":
                        textElement.setValue(bcddResult.getRi000752().toString());
                        break;
                    case "$$103":
                        textElement.setValue(bcddResult.getWcsinalphachk());
                        break;
                    case "$01":
                        textElement.setValue("Φ" + bcddResult.getDi().toString());
                        break;
                    case "$02":
                        textElement.setValue(bcddResult.getThksn().toString());
                        break;
                    case "$03":
                        textElement.setValue("SR" + bcddResult.getRi().toString());
                        break;
                    case "$04":
                        textElement.setValue(bcddResult.getThkcn().toString());
                        break;
                    case "$05":
                        textElement.setValue(bcddResult.getThkrn().toString());
                        break;
                    case "$06":
                        textElement.setValue(bcddResult.getWr().toString());
                        break;
                    case "$07":
                        textElement.setValue(bcddResult.getHr().toString());
                        break;
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
     * bcea
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bceaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCEA(String baseFileName, BCEADocx bceaResult) {
        String template;
        if (bceaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/e/a/BCEAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/e/a/BCEAG.docx";
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
                    textElement.setValue(bceaResult.getDesignPressure().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bceaResult.getDesignTemp().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bceaResult.getStaticPressure().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bceaResult.getStd());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bceaResult.getName());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bceaResult.getC2().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bceaResult.getE().toString());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bceaResult.getLargeInnerDiameter().toString());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bceaResult.getSmallInnerDiameter().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bceaResult.getA().toString());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bceaResult.getThkn().toString());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bceaResult.getDensity().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bceaResult.getDesignStress().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bceaResult.getTestRel().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bceaResult.getTestStress().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bceaResult.getC1().toString());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bceaResult.getC().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bceaResult.getThke().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bceaResult.getCalPressure().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bceaResult.getThkc().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bceaResult.getThkd().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bceaResult.getThkChk());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bceaResult.getTestPressure().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bceaResult.getMawp().toString());
                } else if (textElement.getValue().equals("$$026")) {
                    textElement.setValue(bceaResult.getAi().toString());
                } else if (textElement.getValue().equals("$$027")) {
                    textElement.setValue(bceaResult.getVi().toString());
                } else if (textElement.getValue().equals("$$028")) {
                    textElement.setValue(bceaResult.getAo().toString());
                } else if (textElement.getValue().equals("$$029")) {
                    textElement.setValue(bceaResult.getM().toString());
                } else if (textElement.getValue().equals("$01")) {
                    textElement.setValue("Φ" + bceaResult.getLargeInnerDiameter().toString());
                } else if (textElement.getValue().equals("$02")) {
                    textElement.setValue("Φ" + bceaResult.getSmallInnerDiameter().toString());
                } else if (textElement.getValue().equals("$03")) {
                    textElement.setValue(bceaResult.getA().toString() + "°");
                } else if (textElement.getValue().equals("$04")) {
                    textElement.setValue(bceaResult.getThkn().toString());
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
     * bceb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcebResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCEB(String baseFileName, BCEBDocx bcebResult) {
        String template;
        if (bcebResult.getQ() > 0.0D) {
            if (bcebResult.getAreq() > 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/e/b/BCEB_YAR_QP0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/e/b/BCEB_NAR_QP0.docx";
            }
        } else if (bcebResult.getAreq() > 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/e/b/BCEB_YAR_QN0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/e/b/BCEB_NAR_QN0.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 56;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 57;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 58;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 59;
                        }
                        break;
                    case 36168:
                        if (var13.equals("$15")) {
                            var14 = 60;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcebResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bcebResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bcebResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcebResult.getTest());
                        break;
                    case 4:
                        textElement.setValue(bcebResult.getStdc());
                        break;
                    case 5:
                        textElement.setValue(bcebResult.getNamec());
                        break;
                    case 6:
                        textElement.setValue(bcebResult.getDbi().toString());
                        break;
                    case 7:
                        textElement.setValue(bcebResult.getDpi().toString());
                        break;
                    case 8:
                        textElement.setValue(bcebResult.getAlpha().toString());
                        break;
                    case 9:
                        textElement.setValue(bcebResult.getThkcn().toString());
                        break;
                    case 10:
                        textElement.setValue(bcebResult.getCc2().toString());
                        break;
                    case 11:
                        textElement.setValue(bcebResult.getEc().toString());
                        break;
                    case 12:
                        textElement.setValue(bcebResult.getStdp());
                        break;
                    case 13:
                        textElement.setValue(bcebResult.getNamep());
                        break;
                    case 14:
                        textElement.setValue(bcebResult.getThkpn().toString());
                        break;
                    case 15:
                        textElement.setValue(bcebResult.getCp2().toString());
                        break;
                    case 16:
                        textElement.setValue(bcebResult.getEp().toString());
                        break;
                    case 17:
                        textElement.setValue(bcebResult.getDc().toString());
                        break;
                    case 18:
                        textElement.setValue(bcebResult.getRcel().toString());
                        break;
                    case 19:
                        textElement.setValue(bcebResult.getCc1().toString());
                        break;
                    case 20:
                        textElement.setValue(bcebResult.getOct().toString());
                        break;
                    case 21:
                        textElement.setValue(bcebResult.getOc().toString());
                        break;
                    case 22:
                        textElement.setValue(bcebResult.getDp().toString());
                        break;
                    case 23:
                        textElement.setValue(bcebResult.getRpel().toString());
                        break;
                    case 24:
                        textElement.setValue(bcebResult.getCp1().toString());
                        break;
                    case 25:
                        textElement.setValue(bcebResult.getOpt().toString());
                        break;
                    case 26:
                        textElement.setValue(bcebResult.getOp().toString());
                        break;
                    case 27:
                        textElement.setValue(bcebResult.getPc().toString());
                        break;
                    case 28:
                        textElement.setValue(bcebResult.getCc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcebResult.getThkce().toString());
                        break;
                    case 30:
                        textElement.setValue(bcebResult.getWc().toString());
                        break;
                    case 31:
                        textElement.setValue(bcebResult.getT1().toString());
                        break;
                    case 32:
                        textElement.setValue(bcebResult.getT2().toString());
                        break;
                    case 33:
                        textElement.setValue(bcebResult.getCp().toString());
                        break;
                    case 34:
                        textElement.setValue(bcebResult.getThkpe().toString());
                        break;
                    case 35:
                        textElement.setValue(bcebResult.getWp().toString());
                        break;
                    case 36:
                        textElement.setValue(bcebResult.getT2s().toString());
                        break;
                    case 37:
                        textElement.setValue(bcebResult.getOcrt().toString());
                        break;
                    case 38:
                        textElement.setValue(bcebResult.getThkcc().toString());
                        break;
                    case 39:
                        textElement.setValue(bcebResult.getThkcd().toString());
                        break;
                    case 40:
                        textElement.setValue(bcebResult.getThkcchk());
                        break;
                    case 41:
                        textElement.setValue(bcebResult.getThkpc().toString());
                        break;
                    case 42:
                        textElement.setValue(bcebResult.getThkpd().toString());
                        break;
                    case 43:
                        textElement.setValue(bcebResult.getThkpchk());
                        break;
                    case 44:
                        textElement.setValue(bcebResult.getQ().toString());
                        break;
                    case 45:
                        textElement.setValue(bcebResult.getA().toString());
                        break;
                    case 46:
                        textElement.setValue(bcebResult.getAact().toString());
                        break;
                    case 47:
                        textElement.setValue(bcebResult.getAchk());
                        break;
                    case 48:
                        textElement.setValue(bcebResult.getAreq().toString());
                        break;
                    case 49:
                        textElement.setValue(bcebResult.getWcsinalpha().toString());
                        break;
                    case 50:
                        textElement.setValue(bcebResult.getDpi075().toString());
                        break;
                    case 51:
                        textElement.setValue(bcebResult.getWcsinalphachk());
                        break;
                    case 52:
                        textElement.setValue(bcebResult.getEta().toString());
                        break;
                    case 53:
                        textElement.setValue(bcebResult.getPct().toString());
                        break;
                    case 54:
                        textElement.setValue(bcebResult.getPpt().toString());
                        break;
                    case 55:
                        textElement.setValue(bcebResult.getPt().toString());
                        break;
                    case 56:
                        textElement.setValue("Φ" + bcebResult.getDbi().toString());
                        break;
                    case 57:
                        textElement.setValue("Φ" + bcebResult.getDpi().toString());
                        break;
                    case 58:
                        textElement.setValue(bcebResult.getAlpha().toString() + "°");
                        break;
                    case 59:
                        textElement.setValue(bcebResult.getThkcn().toString());
                        break;
                    case 60:
                        textElement.setValue(bcebResult.getThkpn().toString());
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
     * bcec
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcecResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCEC(String baseFileName, BCECDocx bcecResult) {
        String template;
        if (bcecResult.getQ() > 0.0D) {
            if (bcecResult.getAreq() > 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/e/c/BCEC_YAR_QP0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/e/c/BCEC_NAR_QP0.docx";
            }
        } else if (bcecResult.getAreq() > 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/e/c/BCEC_YAR_QN0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/e/c/BCEC_NAR_QN0.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 55;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 56;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 57;
                        }
                        break;
                    case 36167:
                        if (var13.equals("$14")) {
                            var14 = 58;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcecResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bcecResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bcecResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcecResult.getTest());
                        break;
                    case 4:
                        textElement.setValue(bcecResult.getStdc());
                        break;
                    case 5:
                        textElement.setValue(bcecResult.getNamec());
                        break;
                    case 6:
                        textElement.setValue(bcecResult.getDsi().toString());
                        break;
                    case 7:
                        textElement.setValue(bcecResult.getAlpha().toString());
                        break;
                    case 8:
                        textElement.setValue(bcecResult.getThkcn().toString());
                        break;
                    case 9:
                        textElement.setValue(bcecResult.getCc2().toString());
                        break;
                    case 10:
                        textElement.setValue(bcecResult.getEc().toString());
                        break;
                    case 11:
                        textElement.setValue(bcecResult.getStds());
                        break;
                    case 12:
                        textElement.setValue(bcecResult.getNames());
                        break;
                    case 13:
                        textElement.setValue(bcecResult.getThksn().toString());
                        break;
                    case 14:
                        textElement.setValue(bcecResult.getCs2().toString());
                        break;
                    case 15:
                        textElement.setValue(bcecResult.getEs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcecResult.getDc().toString());
                        break;
                    case 17:
                        textElement.setValue(bcecResult.getRcel().toString());
                        break;
                    case 18:
                        textElement.setValue(bcecResult.getCc1().toString());
                        break;
                    case 19:
                        textElement.setValue(bcecResult.getOct().toString());
                        break;
                    case 20:
                        textElement.setValue(bcecResult.getOc().toString());
                        break;
                    case 21:
                        textElement.setValue(bcecResult.getDs().toString());
                        break;
                    case 22:
                        textElement.setValue(bcecResult.getRsel().toString());
                        break;
                    case 23:
                        textElement.setValue(bcecResult.getCs1().toString());
                        break;
                    case 24:
                        textElement.setValue(bcecResult.getOst().toString());
                        break;
                    case 25:
                        textElement.setValue(bcecResult.getOs().toString());
                        break;
                    case 26:
                        textElement.setValue(bcecResult.getPc().toString());
                        break;
                    case 27:
                        textElement.setValue(bcecResult.getCc().toString());
                        break;
                    case 28:
                        textElement.setValue(bcecResult.getThkce().toString());
                        break;
                    case 29:
                        textElement.setValue(bcecResult.getWc().toString());
                        break;
                    case 30:
                        textElement.setValue(bcecResult.getT1().toString());
                        break;
                    case 31:
                        textElement.setValue(bcecResult.getT2().toString());
                        break;
                    case 32:
                        textElement.setValue(bcecResult.getCs().toString());
                        break;
                    case 33:
                        textElement.setValue(bcecResult.getThkse().toString());
                        break;
                    case 34:
                        textElement.setValue(bcecResult.getWs().toString());
                        break;
                    case 35:
                        textElement.setValue(bcecResult.getT2s().toString());
                        break;
                    case 36:
                        textElement.setValue(bcecResult.getOcrt().toString());
                        break;
                    case 37:
                        textElement.setValue(bcecResult.getThkcc().toString());
                        break;
                    case 38:
                        textElement.setValue(bcecResult.getThkcd().toString());
                        break;
                    case 39:
                        textElement.setValue(bcecResult.getThkcchk());
                        break;
                    case 40:
                        textElement.setValue(bcecResult.getThksc().toString());
                        break;
                    case 41:
                        textElement.setValue(bcecResult.getThksd().toString());
                        break;
                    case 42:
                        textElement.setValue(bcecResult.getThkschk());
                        break;
                    case 43:
                        textElement.setValue(bcecResult.getQ().toString());
                        break;
                    case 44:
                        textElement.setValue(bcecResult.getA().toString());
                        break;
                    case 45:
                        textElement.setValue(bcecResult.getAact().toString());
                        break;
                    case 46:
                        textElement.setValue(bcecResult.getAchk());
                        break;
                    case 47:
                        textElement.setValue(bcecResult.getAreq().toString());
                        break;
                    case 48:
                        textElement.setValue(bcecResult.getWcsinalpha().toString());
                        break;
                    case 49:
                        textElement.setValue(bcecResult.getDsi075().toString());
                        break;
                    case 50:
                        textElement.setValue(bcecResult.getWcsinalphachk());
                        break;
                    case 51:
                        textElement.setValue(bcecResult.getEta().toString());
                        break;
                    case 52:
                        textElement.setValue(bcecResult.getPct().toString());
                        break;
                    case 53:
                        textElement.setValue(bcecResult.getPst().toString());
                        break;
                    case 54:
                        textElement.setValue(bcecResult.getPt().toString());
                        break;
                    case 55:
                        textElement.setValue("Φ" + bcecResult.getDsi().toString());
                        break;
                    case 56:
                        textElement.setValue(bcecResult.getAlpha().toString() + "°");
                        break;
                    case 57:
                        textElement.setValue(bcecResult.getThkcn().toString());
                        break;
                    case 58:
                        textElement.setValue(bcecResult.getThksn().toString());
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
     * bced
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcedResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCED(String baseFileName, BCEDDocx bcedResult) {
        String template;
        if (bcedResult.getAreqs() > 0.0D) {
            if (bcedResult.getQs() > 0.0D) {
                if (bcedResult.getAreqp() > 0.0D) {
                    if (bcedResult.getQp() > 0.0D) {
                        template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QP0_P_YA_QP0.docx";
                    } else {
                        template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QP0_P_YA_QN0.docx";
                    }
                } else if (bcedResult.getQp() > 0.0D) {
                    template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QP0_P_NA_QP0.docx";
                } else {
                    template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QP0_P_NA_QN0.docx";
                }
            } else if (bcedResult.getAreqp() > 0.0D) {
                if (bcedResult.getQp() > 0.0D) {
                    template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QN0_P_YA_QP0.docx";
                } else {
                    template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QN0_P_YA_QN0.docx";
                }
            } else if (bcedResult.getQp() > 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QN0_P_NA_QP0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_YA_QN0_P_NA_QN0.docx";
            }
        } else if (bcedResult.getQs() > 0.0D) {
            if (bcedResult.getAreqp() > 0.0D) {
                if (bcedResult.getQp() > 0.0D) {
                    template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QP0_P_YA_QP0.docx";
                } else {
                    template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QP0_P_YA_QN0.docx";
                }
            } else if (bcedResult.getQp() > 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QP0_P_NA_QP0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QP0_P_NA_QN0.docx";
            }
        } else if (bcedResult.getAreqp() > 0.0D) {
            if (bcedResult.getQp() > 0.0D) {
                template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QN0_P_YA_QP0.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QN0_P_YA_QN0.docx";
            }
        } else if (bcedResult.getQp() > 0.0D) {
            template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QN0_P_NA_QP0.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/e/d/BCED_S_NA_QN0_P_NA_QN0.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 85;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 86;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 87;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 88;
                        }
                        break;
                    case 36168:
                        if (var13.equals("$15")) {
                            var14 = 89;
                        }
                        break;
                    case 36194:
                        if (var13.equals("$20")) {
                            var14 = 90;
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
                        break;
                    case 34367090:
                        if (var13.equals("$$068")) {
                            var14 = 67;
                        }
                        break;
                    case 34367091:
                        if (var13.equals("$$069")) {
                            var14 = 68;
                        }
                        break;
                    case 34367113:
                        if (var13.equals("$$070")) {
                            var14 = 69;
                        }
                        break;
                    case 34367114:
                        if (var13.equals("$$071")) {
                            var14 = 70;
                        }
                        break;
                    case 34367115:
                        if (var13.equals("$$072")) {
                            var14 = 71;
                        }
                        break;
                    case 34367116:
                        if (var13.equals("$$073")) {
                            var14 = 72;
                        }
                        break;
                    case 34367117:
                        if (var13.equals("$$074")) {
                            var14 = 73;
                        }
                        break;
                    case 34367118:
                        if (var13.equals("$$075")) {
                            var14 = 74;
                        }
                        break;
                    case 34367119:
                        if (var13.equals("$$076")) {
                            var14 = 75;
                        }
                        break;
                    case 34367120:
                        if (var13.equals("$$077")) {
                            var14 = 76;
                        }
                        break;
                    case 34367121:
                        if (var13.equals("$$078")) {
                            var14 = 77;
                        }
                        break;
                    case 34367122:
                        if (var13.equals("$$079")) {
                            var14 = 78;
                        }
                        break;
                    case 34367144:
                        if (var13.equals("$$080")) {
                            var14 = 79;
                        }
                        break;
                    case 34367145:
                        if (var13.equals("$$081")) {
                            var14 = 80;
                        }
                        break;
                    case 34367146:
                        if (var13.equals("$$082")) {
                            var14 = 81;
                        }
                        break;
                    case 34367147:
                        if (var13.equals("$$083")) {
                            var14 = 82;
                        }
                        break;
                    case 34367148:
                        if (var13.equals("$$084")) {
                            var14 = 83;
                        }
                        break;
                    case 34367149:
                        if (var13.equals("$$085")) {
                            var14 = 84;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcedResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bcedResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bcedResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcedResult.getTest());
                        break;
                    case 4:
                        textElement.setValue(bcedResult.getStdc());
                        break;
                    case 5:
                        textElement.setValue(bcedResult.getNamec());
                        break;
                    case 6:
                        textElement.setValue(bcedResult.getDsi().toString());
                        break;
                    case 7:
                        textElement.setValue(bcedResult.getDpi().toString());
                        break;
                    case 8:
                        textElement.setValue(bcedResult.getAlpha().toString());
                        break;
                    case 9:
                        textElement.setValue(bcedResult.getThkcn().toString());
                        break;
                    case 10:
                        textElement.setValue(bcedResult.getCc2().toString());
                        break;
                    case 11:
                        textElement.setValue(bcedResult.getEc().toString());
                        break;
                    case 12:
                        textElement.setValue(bcedResult.getStds());
                        break;
                    case 13:
                        textElement.setValue(bcedResult.getNames());
                        break;
                    case 14:
                        textElement.setValue(bcedResult.getThksn().toString());
                        break;
                    case 15:
                        textElement.setValue(bcedResult.getCs2().toString());
                        break;
                    case 16:
                        textElement.setValue(bcedResult.getEs().toString());
                        break;
                    case 17:
                        textElement.setValue(bcedResult.getStdp());
                        break;
                    case 18:
                        textElement.setValue(bcedResult.getNamep());
                        break;
                    case 19:
                        textElement.setValue(bcedResult.getThkpn().toString());
                        break;
                    case 20:
                        textElement.setValue(bcedResult.getCp2().toString());
                        break;
                    case 21:
                        textElement.setValue(bcedResult.getEp().toString());
                        break;
                    case 22:
                        textElement.setValue(bcedResult.getDc().toString());
                        break;
                    case 23:
                        textElement.setValue(bcedResult.getRcel().toString());
                        break;
                    case 24:
                        textElement.setValue(bcedResult.getCc1().toString());
                        break;
                    case 25:
                        textElement.setValue(bcedResult.getOct().toString());
                        break;
                    case 26:
                        textElement.setValue(bcedResult.getOc().toString());
                        break;
                    case 27:
                        textElement.setValue(bcedResult.getDp().toString());
                        break;
                    case 28:
                        textElement.setValue(bcedResult.getRpel().toString());
                        break;
                    case 29:
                        textElement.setValue(bcedResult.getCp1().toString());
                        break;
                    case 30:
                        textElement.setValue(bcedResult.getDs().toString());
                        break;
                    case 31:
                        textElement.setValue(bcedResult.getRsel().toString());
                        break;
                    case 32:
                        textElement.setValue(bcedResult.getCs1().toString());
                        break;
                    case 33:
                        textElement.setValue(bcedResult.getOst().toString());
                        break;
                    case 34:
                        textElement.setValue(bcedResult.getOs().toString());
                        break;
                    case 35:
                        textElement.setValue(bcedResult.getOpt().toString());
                        break;
                    case 36:
                        textElement.setValue(bcedResult.getOp().toString());
                        break;
                    case 37:
                        textElement.setValue(bcedResult.getPc().toString());
                        break;
                    case 38:
                        textElement.setValue(bcedResult.getCc().toString());
                        break;
                    case 39:
                        textElement.setValue(bcedResult.getThkce().toString());
                        break;
                    case 40:
                        textElement.setValue(bcedResult.getWsc().toString());
                        break;
                    case 41:
                        textElement.setValue(bcedResult.getTs1().toString());
                        break;
                    case 42:
                        textElement.setValue(bcedResult.getTs2().toString());
                        break;
                    case 43:
                        textElement.setValue(bcedResult.getWpc().toString());
                        break;
                    case 44:
                        textElement.setValue(bcedResult.getTp1().toString());
                        break;
                    case 45:
                        textElement.setValue(bcedResult.getTp2().toString());
                        break;
                    case 46:
                        textElement.setValue(bcedResult.getCs().toString());
                        break;
                    case 47:
                        textElement.setValue(bcedResult.getThkse().toString());
                        break;
                    case 48:
                        textElement.setValue(bcedResult.getWs().toString());
                        break;
                    case 49:
                        textElement.setValue(bcedResult.getT2s().toString());
                        break;
                    case 50:
                        textElement.setValue(bcedResult.getCp().toString());
                        break;
                    case 51:
                        textElement.setValue(bcedResult.getThkpe().toString());
                        break;
                    case 52:
                        textElement.setValue(bcedResult.getWp().toString());
                        break;
                    case 53:
                        textElement.setValue(bcedResult.getT2p().toString());
                        break;
                    case 54:
                        textElement.setValue(bcedResult.getOcrt().toString());
                        break;
                    case 55:
                        textElement.setValue(bcedResult.getThkcc().toString());
                        break;
                    case 56:
                        textElement.setValue(bcedResult.getThkcd().toString());
                        break;
                    case 57:
                        textElement.setValue(bcedResult.getThkcchk());
                        break;
                    case 58:
                        textElement.setValue(bcedResult.getThksc().toString());
                        break;
                    case 59:
                        textElement.setValue(bcedResult.getThksd().toString());
                        break;
                    case 60:
                        textElement.setValue(bcedResult.getThkschk());
                        break;
                    case 61:
                        textElement.setValue(bcedResult.getThkpc().toString());
                        break;
                    case 62:
                        textElement.setValue(bcedResult.getThkpd().toString());
                        break;
                    case 63:
                        textElement.setValue(bcedResult.getThkpchk());
                        break;
                    case 64:
                        textElement.setValue(bcedResult.getQs().toString());
                        break;
                    case 65:
                        textElement.setValue(bcedResult.getAs().toString());
                        break;
                    case 66:
                        textElement.setValue(bcedResult.getAacts().toString());
                        break;
                    case 67:
                        textElement.setValue(bcedResult.getAschk());
                        break;
                    case 68:
                        textElement.setValue(bcedResult.getAreqs().toString());
                        break;
                    case 69:
                        textElement.setValue(bcedResult.getWscsinalpha().toString());
                        break;
                    case 70:
                        textElement.setValue(bcedResult.getDsi075().toString());
                        break;
                    case 71:
                        textElement.setValue(bcedResult.getWscsinalphachk());
                        break;
                    case 72:
                        textElement.setValue(bcedResult.getQp().toString());
                        break;
                    case 73:
                        textElement.setValue(bcedResult.getAp().toString());
                        break;
                    case 74:
                        textElement.setValue(bcedResult.getAactp().toString());
                        break;
                    case 75:
                        textElement.setValue(bcedResult.getApchk());
                        break;
                    case 76:
                        textElement.setValue(bcedResult.getAreqp().toString());
                        break;
                    case 77:
                        textElement.setValue(bcedResult.getWpcsinalpha().toString());
                        break;
                    case 78:
                        textElement.setValue(bcedResult.getDpi075().toString());
                        break;
                    case 79:
                        textElement.setValue(bcedResult.getWpcsinalphachk());
                        break;
                    case 80:
                        textElement.setValue(bcedResult.getEta().toString());
                        break;
                    case 81:
                        textElement.setValue(bcedResult.getPct().toString());
                        break;
                    case 82:
                        textElement.setValue(bcedResult.getPst().toString());
                        break;
                    case 83:
                        textElement.setValue(bcedResult.getPpt().toString());
                        break;
                    case 84:
                        textElement.setValue(bcedResult.getPt().toString());
                        break;
                    case 85:
                        textElement.setValue("Φ" + bcedResult.getDsi().toString());
                        break;
                    case 86:
                        textElement.setValue("Φ" + bcedResult.getDpi().toString());
                        break;
                    case 87:
                        textElement.setValue(bcedResult.getAlpha().toString() + "°");
                        break;
                    case 88:
                        textElement.setValue(bcedResult.getThkcn().toString());
                        break;
                    case 89:
                        textElement.setValue(bcedResult.getThksn().toString());
                        break;
                    case 90:
                        textElement.setValue(bcedResult.getThkpn().toString());
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
     * bcee
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bceeResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCEE(String baseFileName, BCEEDocx bceeResult) {
        String template;
        if (bceeResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/e/e/BCEEL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/e/e/BCEEG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 52;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 53;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 54;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 55;
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
                    case 34366961:
                        if (var13.equals("$$023")) {
                            var14 = 21;
                        }
                        break;
                    case 34366962:
                        if (var13.equals("$$024")) {
                            var14 = 22;
                        }
                        break;
                    case 34366963:
                        if (var13.equals("$$025")) {
                            var14 = 23;
                        }
                        break;
                    case 34366964:
                        if (var13.equals("$$026")) {
                            var14 = 24;
                        }
                        break;
                    case 34366965:
                        if (var13.equals("$$027")) {
                            var14 = 25;
                        }
                        break;
                    case 34366967:
                        if (var13.equals("$$029")) {
                            var14 = 26;
                        }
                        break;
                    case 34366989:
                        if (var13.equals("$$030")) {
                            var14 = 27;
                        }
                        break;
                    case 34366990:
                        if (var13.equals("$$031")) {
                            var14 = 28;
                        }
                        break;
                    case 34366991:
                        if (var13.equals("$$032")) {
                            var14 = 29;
                        }
                        break;
                    case 34366992:
                        if (var13.equals("$$033")) {
                            var14 = 30;
                        }
                        break;
                    case 34366993:
                        if (var13.equals("$$034")) {
                            var14 = 31;
                        }
                        break;
                    case 34366994:
                        if (var13.equals("$$035")) {
                            var14 = 32;
                        }
                        break;
                    case 34366995:
                        if (var13.equals("$$036")) {
                            var14 = 33;
                        }
                        break;
                    case 34366996:
                        if (var13.equals("$$037")) {
                            var14 = 34;
                        }
                        break;
                    case 34366997:
                        if (var13.equals("$$038")) {
                            var14 = 35;
                        }
                        break;
                    case 34366998:
                        if (var13.equals("$$039")) {
                            var14 = 36;
                        }
                        break;
                    case 34367020:
                        if (var13.equals("$$040")) {
                            var14 = 37;
                        }
                        break;
                    case 34367021:
                        if (var13.equals("$$041")) {
                            var14 = 38;
                        }
                        break;
                    case 34367022:
                        if (var13.equals("$$042")) {
                            var14 = 39;
                        }
                        break;
                    case 34367023:
                        if (var13.equals("$$043")) {
                            var14 = 40;
                        }
                        break;
                    case 34367024:
                        if (var13.equals("$$044")) {
                            var14 = 41;
                        }
                        break;
                    case 34367025:
                        if (var13.equals("$$045")) {
                            var14 = 42;
                        }
                        break;
                    case 34367026:
                        if (var13.equals("$$046")) {
                            var14 = 43;
                        }
                        break;
                    case 34367027:
                        if (var13.equals("$$047")) {
                            var14 = 44;
                        }
                        break;
                    case 34367028:
                        if (var13.equals("$$048")) {
                            var14 = 45;
                        }
                        break;
                    case 34367029:
                        if (var13.equals("$$049")) {
                            var14 = 46;
                        }
                        break;
                    case 34367051:
                        if (var13.equals("$$050")) {
                            var14 = 47;
                        }
                        break;
                    case 34367052:
                        if (var13.equals("$$051")) {
                            var14 = 48;
                        }
                        break;
                    case 34367053:
                        if (var13.equals("$$052")) {
                            var14 = 49;
                        }
                        break;
                    case 34367054:
                        if (var13.equals("$$053")) {
                            var14 = 50;
                        }
                        break;
                    case 34367055:
                        if (var13.equals("$$054")) {
                            var14 = 51;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bceeResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bceeResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bceeResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bceeResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bceeResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bceeResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bceeResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bceeResult.getEs().toString());
                        break;
                    case 8:
                        textElement.setValue(bceeResult.getCs2().toString());
                        break;
                    case 9:
                        textElement.setValue(bceeResult.getStdc());
                        break;
                    case 10:
                        textElement.setValue(bceeResult.getNamec());
                        break;
                    case 11:
                        textElement.setValue(bceeResult.getAlpha().toString());
                        break;
                    case 12:
                        textElement.setValue(bceeResult.getThkcn().toString());
                        break;
                    case 13:
                        textElement.setValue(bceeResult.getCc2().toString());
                        break;
                    case 14:
                        textElement.setValue(bceeResult.getEc().toString());
                        break;
                    case 15:
                        textElement.setValue(bceeResult.getTest());
                        break;
                    case 16:
                        textElement.setValue(bceeResult.getDs().toString());
                        break;
                    case 17:
                        textElement.setValue(bceeResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bceeResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bceeResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bceeResult.getRsel().toString());
                        break;
                    case 21:
                        textElement.setValue(bceeResult.getDc().toString());
                        break;
                    case 22:
                        textElement.setValue(bceeResult.getCc1().toString());
                        break;
                    case 23:
                        textElement.setValue(bceeResult.getOct().toString());
                        break;
                    case 24:
                        textElement.setValue(bceeResult.getOc().toString());
                        break;
                    case 25:
                        textElement.setValue(bceeResult.getRcel().toString());
                        break;
                    case 26:
                        textElement.setValue(bceeResult.getPc().toString());
                        break;
                    case 27:
                        textElement.setValue(bceeResult.getCs().toString());
                        break;
                    case 28:
                        textElement.setValue(bceeResult.getThkse().toString());
                        break;
                    case 29:
                        textElement.setValue(bceeResult.getCc().toString());
                        break;
                    case 30:
                        textElement.setValue(bceeResult.getThkce().toString());
                        break;
                    case 31:
                        textElement.setValue(bceeResult.getBeta().toString());
                        break;
                    case 32:
                        textElement.setValue(bceeResult.getBeta1().toString());
                        break;
                    case 33:
                        textElement.setValue(bceeResult.getThk2().toString());
                        break;
                    case 34:
                        textElement.setValue(bceeResult.getThk1().toString());
                        break;
                    case 35:
                        textElement.setValue(bceeResult.getThkk().toString());
                        break;
                    case 36:
                        textElement.setValue(bceeResult.getThkp().toString());
                        break;
                    case 37:
                        textElement.setValue(bceeResult.getThkcc().toString());
                        break;
                    case 38:
                        textElement.setValue(bceeResult.getThkcd().toString());
                        break;
                    case 39:
                        textElement.setValue(bceeResult.getThkcchk());
                        break;
                    case 40:
                        textElement.setValue(bceeResult.getThksc().toString());
                        break;
                    case 41:
                        textElement.setValue(bceeResult.getThksd().toString());
                        break;
                    case 42:
                        textElement.setValue(bceeResult.getThkschk());
                        break;
                    case 43:
                        textElement.setValue(bceeResult.getPct().toString());
                        break;
                    case 44:
                        textElement.setValue(bceeResult.getPst().toString());
                        break;
                    case 45:
                        textElement.setValue(bceeResult.getPt().toString());
                        break;
                    case 46:
                        textElement.setValue(bceeResult.getPk().toString());
                        break;
                    case 47:
                        textElement.setValue(bceeResult.getP2().toString());
                        break;
                    case 48:
                        textElement.setValue(bceeResult.getPp().toString());
                        break;
                    case 49:
                        textElement.setValue(bceeResult.getMawpc().toString());
                        break;
                    case 50:
                        textElement.setValue(bceeResult.getMawps().toString());
                        break;
                    case 51:
                        textElement.setValue(bceeResult.getMawp().toString());
                        break;
                    case 52:
                        textElement.setValue("Φ" + bceeResult.getDsi().toString());
                        break;
                    case 53:
                        textElement.setValue(bceeResult.getThksn().toString());
                        break;
                    case 54:
                        textElement.setValue(bceeResult.getAlpha().toString() + "°");
                        break;
                    case 55:
                        textElement.setValue(bceeResult.getThkcn().toString());
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
     * bcef
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcefResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCEF(String baseFileName, BCEFDocx bcefResult) {
        String template;
        if (bcefResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/e/f/BCEFL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/e/f/BCEFG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 64;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 65;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 66;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 67;
                        }
                        break;
                    case 36171:
                        if (var13.equals("$18")) {
                            var14 = 68;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 69;
                        }
                        break;
                    case 1187323:
                        if (var13.equals("$tit")) {
                            var14 = 70;
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
                    case 34366966:
                        if (var13.equals("$$028")) {
                            var14 = 26;
                        }
                        break;
                    case 34366967:
                        if (var13.equals("$$029")) {
                            var14 = 27;
                        }
                        break;
                    case 34366989:
                        if (var13.equals("$$030")) {
                            var14 = 28;
                        }
                        break;
                    case 34366990:
                        if (var13.equals("$$031")) {
                            var14 = 29;
                        }
                        break;
                    case 34366991:
                        if (var13.equals("$$032")) {
                            var14 = 30;
                        }
                        break;
                    case 34366992:
                        if (var13.equals("$$033")) {
                            var14 = 31;
                        }
                        break;
                    case 34366994:
                        if (var13.equals("$$035")) {
                            var14 = 32;
                        }
                        break;
                    case 34366995:
                        if (var13.equals("$$036")) {
                            var14 = 33;
                        }
                        break;
                    case 34366996:
                        if (var13.equals("$$037")) {
                            var14 = 34;
                        }
                        break;
                    case 34366997:
                        if (var13.equals("$$038")) {
                            var14 = 35;
                        }
                        break;
                    case 34366998:
                        if (var13.equals("$$039")) {
                            var14 = 36;
                        }
                        break;
                    case 34367020:
                        if (var13.equals("$$040")) {
                            var14 = 37;
                        }
                        break;
                    case 34367021:
                        if (var13.equals("$$041")) {
                            var14 = 38;
                        }
                        break;
                    case 34367022:
                        if (var13.equals("$$042")) {
                            var14 = 39;
                        }
                        break;
                    case 34367023:
                        if (var13.equals("$$043")) {
                            var14 = 40;
                        }
                        break;
                    case 34367024:
                        if (var13.equals("$$044")) {
                            var14 = 41;
                        }
                        break;
                    case 34367025:
                        if (var13.equals("$$045")) {
                            var14 = 42;
                        }
                        break;
                    case 34367026:
                        if (var13.equals("$$046")) {
                            var14 = 43;
                        }
                        break;
                    case 34367027:
                        if (var13.equals("$$047")) {
                            var14 = 44;
                        }
                        break;
                    case 34367028:
                        if (var13.equals("$$048")) {
                            var14 = 45;
                        }
                        break;
                    case 34367029:
                        if (var13.equals("$$049")) {
                            var14 = 46;
                        }
                        break;
                    case 34367051:
                        if (var13.equals("$$050")) {
                            var14 = 47;
                        }
                        break;
                    case 34367052:
                        if (var13.equals("$$051")) {
                            var14 = 48;
                        }
                        break;
                    case 34367053:
                        if (var13.equals("$$052")) {
                            var14 = 49;
                        }
                        break;
                    case 34367054:
                        if (var13.equals("$$053")) {
                            var14 = 50;
                        }
                        break;
                    case 34367055:
                        if (var13.equals("$$054")) {
                            var14 = 51;
                        }
                        break;
                    case 34367056:
                        if (var13.equals("$$055")) {
                            var14 = 52;
                        }
                        break;
                    case 34367057:
                        if (var13.equals("$$056")) {
                            var14 = 53;
                        }
                        break;
                    case 34367058:
                        if (var13.equals("$$057")) {
                            var14 = 54;
                        }
                        break;
                    case 34367059:
                        if (var13.equals("$$058")) {
                            var14 = 55;
                        }
                        break;
                    case 34367060:
                        if (var13.equals("$$059")) {
                            var14 = 56;
                        }
                        break;
                    case 34367082:
                        if (var13.equals("$$060")) {
                            var14 = 57;
                        }
                        break;
                    case 34367083:
                        if (var13.equals("$$061")) {
                            var14 = 58;
                        }
                        break;
                    case 34367084:
                        if (var13.equals("$$062")) {
                            var14 = 59;
                        }
                        break;
                    case 34367085:
                        if (var13.equals("$$063")) {
                            var14 = 60;
                        }
                        break;
                    case 34367086:
                        if (var13.equals("$$064")) {
                            var14 = 61;
                        }
                        break;
                    case 34367087:
                        if (var13.equals("$$065")) {
                            var14 = 62;
                        }
                        break;
                    case 34367088:
                        if (var13.equals("$$066")) {
                            var14 = 63;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcefResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bcefResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bcefResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcefResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcefResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcefResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcefResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcefResult.getEs().toString());
                        break;
                    case 8:
                        textElement.setValue(bcefResult.getCs2().toString());
                        break;
                    case 9:
                        textElement.setValue(bcefResult.getStdc());
                        break;
                    case 10:
                        textElement.setValue(bcefResult.getNamec());
                        break;
                    case 11:
                        textElement.setValue(bcefResult.getAlpha().toString());
                        break;
                    case 12:
                        textElement.setValue(bcefResult.getThkcn().toString());
                        break;
                    case 13:
                        textElement.setValue(bcefResult.getCc2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcefResult.getEc().toString());
                        break;
                    case 15:
                        textElement.setValue(bcefResult.getStdr());
                        break;
                    case 16:
                        textElement.setValue(bcefResult.getNamer());
                        break;
                    case 17:
                        textElement.setValue(bcefResult.getThkrn().toString());
                        break;
                    case 18:
                        textElement.setValue(bcefResult.getHrn().toString());
                        break;
                    case 19:
                        textElement.setValue(bcefResult.getCr2().toString());
                        break;
                    case 20:
                        textElement.setValue(bcefResult.getTest());
                        break;
                    case 21:
                        textElement.setValue(bcefResult.getDs().toString());
                        break;
                    case 22:
                        textElement.setValue(bcefResult.getCs1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcefResult.getOst().toString());
                        break;
                    case 24:
                        textElement.setValue(bcefResult.getOs().toString());
                        break;
                    case 25:
                        textElement.setValue(bcefResult.getRsel().toString());
                        break;
                    case 26:
                        textElement.setValue(bcefResult.getDr().toString());
                        break;
                    case 27:
                        textElement.setValue(bcefResult.getDc().toString());
                        break;
                    case 28:
                        textElement.setValue(bcefResult.getCc1().toString());
                        break;
                    case 29:
                        textElement.setValue(bcefResult.getOct().toString());
                        break;
                    case 30:
                        textElement.setValue(bcefResult.getOc().toString());
                        break;
                    case 31:
                        textElement.setValue(bcefResult.getRcel().toString());
                        break;
                    case 32:
                        textElement.setValue(bcefResult.getCr1().toString());
                        break;
                    case 33:
                        textElement.setValue(bcefResult.getPc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcefResult.getCs().toString());
                        break;
                    case 35:
                        textElement.setValue(bcefResult.getThkse().toString());
                        break;
                    case 36:
                        textElement.setValue(bcefResult.getCc().toString());
                        break;
                    case 37:
                        textElement.setValue(bcefResult.getThkce().toString());
                        break;
                    case 38:
                        textElement.setValue(bcefResult.getCr().toString());
                        break;
                    case 39:
                        textElement.setValue(bcefResult.getThkre().toString());
                        break;
                    case 40:
                        textElement.setValue(bcefResult.getHre().toString());
                        break;
                    case 41:
                        textElement.setValue(bcefResult.getAact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcefResult.getThkcc().toString());
                        break;
                    case 43:
                        textElement.setValue(bcefResult.getThkcd().toString());
                        break;
                    case 44:
                        textElement.setValue(bcefResult.getThkcchk());
                        break;
                    case 45:
                        textElement.setValue(bcefResult.getThksc().toString());
                        break;
                    case 46:
                        textElement.setValue(bcefResult.getThksd().toString());
                        break;
                    case 47:
                        textElement.setValue(bcefResult.getThkschk());
                        break;
                    case 48:
                        textElement.setValue(bcefResult.getBetaa().toString());
                        break;
                    case 49:
                        textElement.setValue(bcefResult.getBeta().toString());
                        break;
                    case 50:
                        textElement.setValue(bcefResult.getAr().toString());
                        break;
                    case 51:
                        textElement.setValue(bcefResult.getAchk());
                        break;
                    case 52:
                        textElement.setValue(bcefResult.getTi().toString());
                        break;
                    case 53:
                        textElement.setValue(bcefResult.getPct().toString());
                        break;
                    case 54:
                        textElement.setValue(bcefResult.getPst().toString());
                        break;
                    case 55:
                        textElement.setValue(bcefResult.getPt().toString());
                        break;
                    case 56:
                        textElement.setValue(bcefResult.getB2().toString());
                        break;
                    case 57:
                        textElement.setValue(bcefResult.getB3().toString());
                        break;
                    case 58:
                        textElement.setValue(bcefResult.getBeta0().toString());
                        break;
                    case 59:
                        textElement.setValue(bcefResult.getBeta2().toString());
                        break;
                    case 60:
                        textElement.setValue(bcefResult.getMawpc().toString());
                        break;
                    case 61:
                        textElement.setValue(bcefResult.getMawpr().toString());
                        break;
                    case 62:
                        textElement.setValue(bcefResult.getMawps().toString());
                        break;
                    case 63:
                        textElement.setValue(bcefResult.getMawp().toString());
                        break;
                    case 64:
                        textElement.setValue("Φ" + bcefResult.getDsi().toString());
                        break;
                    case 65:
                        textElement.setValue(bcefResult.getThksn().toString());
                        break;
                    case 66:
                        textElement.setValue(bcefResult.getAlpha().toString() + "°");
                        break;
                    case 67:
                        textElement.setValue(bcefResult.getThkcn().toString());
                        break;
                    case 68:
                        textElement.setValue(bcefResult.getThkrn().toString());
                        break;
                    case 69:
                        textElement.setValue(bcefResult.getHrn().toString());
                        break;
                    case 70:
                        textElement.setValue("Σti≥" + bcefResult.getTi().toString());
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
     * bceg
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcegResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCEG(String baseFileName, BCEGDocx bcegResult) {
        String template;
        if (bcegResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/e/g/BCEGL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/e/g/BCEGG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 34;
                        }
                        break;
                    case 36136:
                        if (var13.equals("$04")) {
                            var14 = 35;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 36;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 37;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 38;
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
                    case 34366936:
                        if (var13.equals("$$019")) {
                            var14 = 17;
                        }
                        break;
                    case 34366958:
                        if (var13.equals("$$020")) {
                            var14 = 18;
                        }
                        break;
                    case 34366959:
                        if (var13.equals("$$021")) {
                            var14 = 19;
                        }
                        break;
                    case 34366960:
                        if (var13.equals("$$022")) {
                            var14 = 20;
                        }
                        break;
                    case 34366961:
                        if (var13.equals("$$023")) {
                            var14 = 21;
                        }
                        break;
                    case 34366962:
                        if (var13.equals("$$024")) {
                            var14 = 22;
                        }
                        break;
                    case 34366963:
                        if (var13.equals("$$025")) {
                            var14 = 23;
                        }
                        break;
                    case 34366964:
                        if (var13.equals("$$026")) {
                            var14 = 24;
                        }
                        break;
                    case 34366965:
                        if (var13.equals("$$027")) {
                            var14 = 25;
                        }
                        break;
                    case 34366966:
                        if (var13.equals("$$028")) {
                            var14 = 26;
                        }
                        break;
                    case 34366967:
                        if (var13.equals("$$029")) {
                            var14 = 27;
                        }
                        break;
                    case 34366989:
                        if (var13.equals("$$030")) {
                            var14 = 28;
                        }
                        break;
                    case 34366990:
                        if (var13.equals("$$031")) {
                            var14 = 29;
                        }
                        break;
                    case 34366991:
                        if (var13.equals("$$032")) {
                            var14 = 30;
                        }
                        break;
                    case 34366992:
                        if (var13.equals("$$033")) {
                            var14 = 31;
                        }
                        break;
                    case 34366993:
                        if (var13.equals("$$034")) {
                            var14 = 32;
                        }
                        break;
                    case 34366994:
                        if (var13.equals("$$035")) {
                            var14 = 33;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcegResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bcegResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bcegResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcegResult.getDsi().toString());
                        break;
                    case 4:
                        textElement.setValue(bcegResult.getStdc());
                        break;
                    case 5:
                        textElement.setValue(bcegResult.getNamec());
                        break;
                    case 6:
                        textElement.setValue(bcegResult.getAlpha().toString());
                        break;
                    case 7:
                        textElement.setValue(bcegResult.getThkcn().toString());
                        break;
                    case 8:
                        textElement.setValue(bcegResult.getRi().toString());
                        break;
                    case 9:
                        textElement.setValue(bcegResult.getCc2().toString());
                        break;
                    case 10:
                        textElement.setValue(bcegResult.getEc().toString());
                        break;
                    case 11:
                        textElement.setValue(bcegResult.getTest());
                        break;
                    case 12:
                        textElement.setValue(bcegResult.getDc().toString());
                        break;
                    case 13:
                        textElement.setValue(bcegResult.getCc1().toString());
                        break;
                    case 14:
                        textElement.setValue(bcegResult.getOct().toString());
                        break;
                    case 15:
                        textElement.setValue(bcegResult.getOc().toString());
                        break;
                    case 16:
                        textElement.setValue(bcegResult.getRcel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcegResult.getPc().toString());
                        break;
                    case 18:
                        textElement.setValue(bcegResult.getCc().toString());
                        break;
                    case 19:
                        textElement.setValue(bcegResult.getThkce().toString());
                        break;
                    case 20:
                        textElement.setValue(bcegResult.getBeta().toString());
                        break;
                    case 21:
                        textElement.setValue(bcegResult.getBetat().toString());
                        break;
                    case 22:
                        textElement.setValue(bcegResult.getBeta3().toString());
                        break;
                    case 23:
                        textElement.setValue(bcegResult.getThkk().toString());
                        break;
                    case 24:
                        textElement.setValue(bcegResult.getThkt().toString());
                        break;
                    case 25:
                        textElement.setValue(bcegResult.getThkp().toString());
                        break;
                    case 26:
                        textElement.setValue(bcegResult.getThkcc().toString());
                        break;
                    case 27:
                        textElement.setValue(bcegResult.getThkcd().toString());
                        break;
                    case 28:
                        textElement.setValue(bcegResult.getThkcchk());
                        break;
                    case 29:
                        textElement.setValue(bcegResult.getPct().toString());
                        break;
                    case 30:
                        textElement.setValue(bcegResult.getPk().toString());
                        break;
                    case 31:
                        textElement.setValue(bcegResult.getPt().toString());
                        break;
                    case 32:
                        textElement.setValue(bcegResult.getPp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcegResult.getMawpc().toString());
                        break;
                    case 34:
                        textElement.setValue("≥" + Double.toString(3.0D * bcegResult.getThkcn()));
                        break;
                    case 35:
                        textElement.setValue("Φ" + bcegResult.getDsi().toString());
                        break;
                    case 36:
                        textElement.setValue(bcegResult.getAlpha().toString() + "°");
                        break;
                    case 37:
                        textElement.setValue(bcegResult.getThkcn().toString());
                        break;
                    case 38:
                        textElement.setValue("R" + bcegResult.getRi().toString());
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
     * bcfc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFC(String baseFileName, BCFCDocx bcfcResult) {
        String template;
        if (bcfcResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/c/BCFCL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/c/BCFCG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 46;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 47;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 48;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 49;
                        }
                        break;
                    case 1120140:
                        if (var13.equals("$000")) {
                            var14 = 45;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfcResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfcResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfcResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfcResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfcResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfcResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfcResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfcResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfcResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfcResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfcResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfcResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfcResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfcResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfcResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfcResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfcResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfcResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfcResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfcResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfcResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfcResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfcResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfcResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfcResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfcResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfcResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfcResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfcResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfcResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfcResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfcResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfcResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfcResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfcResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfcResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfcResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfcResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfcResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfcResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfcResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfcResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfcResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfcResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfcResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue("Φ" + (double) Math.round(bcfcResult.getDsi() / 3.0D * 100.0D) / 100.0D);
                        break;
                    case 46:
                        textElement.setValue("Φ" + bcfcResult.getDsi().toString());
                        break;
                    case 47:
                        textElement.setValue(bcfcResult.getThksn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfcResult.getThkjn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcfcResult.getHj().toString());
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
     * bcfd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFD(String baseFileName, BCFDDocx bcfdResult) {
        String template;
        if (bcfdResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/d/BCFDL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/d/BCFDG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 46;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 47;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 48;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 49;
                        }
                        break;
                    case 1120140:
                        if (var13.equals("$000")) {
                            var14 = 45;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfdResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfdResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfdResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfdResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfdResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfdResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfdResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfdResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfdResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfdResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfdResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfdResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfdResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfdResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfdResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfdResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfdResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfdResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfdResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfdResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfdResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfdResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfdResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfdResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfdResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfdResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfdResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfdResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfdResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfdResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfdResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfdResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfdResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfdResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfdResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfdResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfdResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfdResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfdResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfdResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfdResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfdResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfdResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfdResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfdResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue("Φ" + (double) Math.round(bcfdResult.getDsi() / 3.0D * 100.0D) / 100.0D);
                        break;
                    case 46:
                        textElement.setValue("Φ" + bcfdResult.getDsi().toString());
                        break;
                    case 47:
                        textElement.setValue(bcfdResult.getThksn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfdResult.getThkjn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcfdResult.getHj().toString());
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
     * bcfe
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfeResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFE(String baseFileName, BCFEDocx bcfeResult) {
        String template;
        if (bcfeResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/e/BCFEL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/e/BCFEG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 38;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 39;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 40;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfeResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfeResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfeResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfeResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfeResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfeResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfeResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfeResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfeResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfeResult.getStdp());
                        break;
                    case 10:
                        textElement.setValue(bcfeResult.getNamep());
                        break;
                    case 11:
                        textElement.setValue(bcfeResult.getThkpn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfeResult.getCp2().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfeResult.getEp().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfeResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfeResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfeResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfeResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfeResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfeResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfeResult.getDp().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfeResult.getRpel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfeResult.getCp1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfeResult.getOpt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfeResult.getOp().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfeResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfeResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfeResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfeResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfeResult.getThksc().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfeResult.getKp().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfeResult.getCp().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfeResult.getThkpe().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfeResult.getThkpc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfeResult.getThkpd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfeResult.getThkpchk());
                        break;
                    case 36:
                        textElement.setValue(bcfeResult.getPt().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfeResult.getMawp().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfeResult.getThksn().toString());
                        break;
                    case 39:
                        textElement.setValue("Φ" + bcfeResult.getDsi().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfeResult.getThkpn().toString());
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
     * bcff
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcffResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFF(String baseFileName, BCFFDocx bcffResult) {
        String template;
        if (bcffResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/f/BCFFL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/f/BCFFG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 38;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 39;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 40;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcffResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcffResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcffResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcffResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcffResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcffResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcffResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcffResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcffResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcffResult.getStdp());
                        break;
                    case 10:
                        textElement.setValue(bcffResult.getNamep());
                        break;
                    case 11:
                        textElement.setValue(bcffResult.getThkpn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcffResult.getCp2().toString());
                        break;
                    case 13:
                        textElement.setValue(bcffResult.getEp().toString());
                        break;
                    case 14:
                        textElement.setValue(bcffResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcffResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcffResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcffResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcffResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcffResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcffResult.getDp().toString());
                        break;
                    case 21:
                        textElement.setValue(bcffResult.getRpel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcffResult.getCp1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcffResult.getOpt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcffResult.getOp().toString());
                        break;
                    case 25:
                        textElement.setValue(bcffResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcffResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcffResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcffResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcffResult.getThksc().toString());
                        break;
                    case 30:
                        textElement.setValue(bcffResult.getKp().toString());
                        break;
                    case 31:
                        textElement.setValue(bcffResult.getCp().toString());
                        break;
                    case 32:
                        textElement.setValue(bcffResult.getThkpe().toString());
                        break;
                    case 33:
                        textElement.setValue(bcffResult.getThkpc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcffResult.getThkpd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcffResult.getThkpchk());
                        break;
                    case 36:
                        textElement.setValue(bcffResult.getPt().toString());
                        break;
                    case 37:
                        textElement.setValue(bcffResult.getMawp().toString());
                        break;
                    case 38:
                        textElement.setValue(bcffResult.getThksn().toString());
                        break;
                    case 39:
                        textElement.setValue("Φ" + bcffResult.getDsi().toString());
                        break;
                    case 40:
                        textElement.setValue(bcffResult.getThkpn().toString());
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
     * bcfg
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfgResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFG(String baseFileName, BCFGDocx bcfgResult) {
        String template;
        if (bcfgResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/g/BCFGL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/g/BCFGG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 25;
                        }
                        break;
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 26;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 27;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfgResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfgResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfgResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfgResult.getStd());
                        break;
                    case 4:
                        textElement.setValue(bcfgResult.getName());
                        break;
                    case 5:
                        textElement.setValue(bcfgResult.getDi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfgResult.getThkn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfgResult.getC2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfgResult.getE().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfgResult.getTest());
                        break;
                    case 10:
                        textElement.setValue(bcfgResult.getD().toString());
                        break;
                    case 11:
                        textElement.setValue(bcfgResult.getRel().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfgResult.getC1().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfgResult.getOt().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfgResult.getO().toString());
                        break;
                    case 15:
                        textElement.setValue(bcfgResult.getPc().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfgResult.getKp().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfgResult.getC().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfgResult.getThke().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfgResult.getDc().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfgResult.getThkc().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfgResult.getThkd().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfgResult.getThkchk());
                        break;
                    case 23:
                        textElement.setValue(bcfgResult.getPt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfgResult.getMawp().toString());
                        break;
                    case 25:
                        textElement.setValue("r≥" + bcfgResult.getThkn().toString());
                        break;
                    case 26:
                        textElement.setValue("Φ" + bcfgResult.getDi().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfgResult.getThkn().toString());
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
     * bcfh
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfhResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFH(String baseFileName, BCFHDocx bcfhResult) {
        String template;
        if (bcfhResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/h/BCFHL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/h/BCFHG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 45;
                        }
                        break;
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 47;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 48;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 49;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 50;
                        }
                        break;
                    case 1120140:
                        if (var13.equals("$000")) {
                            var14 = 46;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfhResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfhResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfhResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfhResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfhResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfhResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfhResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfhResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfhResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfhResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfhResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfhResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfhResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfhResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfhResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfhResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfhResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfhResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfhResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfhResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfhResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfhResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfhResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfhResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfhResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfhResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfhResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfhResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfhResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfhResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfhResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfhResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfhResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfhResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfhResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfhResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfhResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfhResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfhResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfhResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfhResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfhResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfhResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfhResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfhResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue("r≥" + bcfhResult.getThksn().toString());
                        break;
                    case 46:
                        textElement.setValue("Φ" + (double) Math.round(bcfhResult.getDsi() / 3.0D * 100.0D) / 100.0D);
                        break;
                    case 47:
                        textElement.setValue("Φ" + bcfhResult.getDsi().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfhResult.getThksn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcfhResult.getThkjn().toString());
                        break;
                    case 50:
                        textElement.setValue(bcfhResult.getHj().toString());
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
     * bcfi
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfiResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFI(String baseFileName, BCFIDocx bcfiResult) {
        String template;
        if (bcfiResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/i/BCFIL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/i/BCFIG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 38;
                        }
                        break;
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 39;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 40;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfiResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfiResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfiResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfiResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfiResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfiResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfiResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfiResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfiResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfiResult.getStdp());
                        break;
                    case 10:
                        textElement.setValue(bcfiResult.getNamep());
                        break;
                    case 11:
                        textElement.setValue(bcfiResult.getThkpn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfiResult.getCp2().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfiResult.getEp().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfiResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfiResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfiResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfiResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfiResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfiResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfiResult.getDp().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfiResult.getRpel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfiResult.getCp1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfiResult.getOpt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfiResult.getOp().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfiResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfiResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfiResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfiResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfiResult.getThksc().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfiResult.getKp().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfiResult.getCp().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfiResult.getThkpe().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfiResult.getThkpc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfiResult.getThkpd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfiResult.getThkpchk());
                        break;
                    case 36:
                        textElement.setValue(bcfiResult.getPt().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfiResult.getMawp().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfiResult.getThksn().toString());
                        break;
                    case 39:
                        textElement.setValue("Φ" + bcfiResult.getDsi().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfiResult.getThkpn().toString());
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
     * bcfj
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfjResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFJ(String baseFileName, BCFJDocx bcfjResult) {
        String template;
        if (bcfjResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/j/BCFJL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/j/BCFJG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 45;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 46;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 47;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 48;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfjResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfjResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfjResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfjResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfjResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfjResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfjResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfjResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfjResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfjResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfjResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfjResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfjResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfjResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfjResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfjResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfjResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfjResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfjResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfjResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfjResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfjResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfjResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfjResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfjResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfjResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfjResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfjResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfjResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfjResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfjResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfjResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfjResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfjResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfjResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfjResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfjResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfjResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfjResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfjResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfjResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfjResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfjResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfjResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfjResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue("Φ" + bcfjResult.getDsi().toString());
                        break;
                    case 46:
                        textElement.setValue(bcfjResult.getThksn().toString());
                        break;
                    case 47:
                        textElement.setValue(bcfjResult.getThkjn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfjResult.getHj().toString());
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
     * bcfk
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfkResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFK(String baseFileName, BCFKDocx bcfkResult) {
        String template;
        if (bcfkResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/k/BCFKL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/k/BCFKG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 45;
                        }
                        break;
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 46;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 47;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 48;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 49;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfkResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfkResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfkResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfkResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfkResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfkResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfkResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfkResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfkResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfkResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfkResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfkResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfkResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfkResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfkResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfkResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfkResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfkResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfkResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfkResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfkResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfkResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfkResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfkResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfkResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfkResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfkResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfkResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfkResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfkResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfkResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfkResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfkResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfkResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfkResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfkResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfkResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfkResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfkResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfkResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfkResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfkResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfkResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfkResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfkResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue(Double.toString((double) (Math.round(bcfkResult.getDsi() / 3.0D * 10.0D) / 10L)));
                        break;
                    case 46:
                        textElement.setValue("Φ" + bcfkResult.getDsi().toString());
                        break;
                    case 47:
                        textElement.setValue(bcfkResult.getThksn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfkResult.getThkjn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcfkResult.getHj().toString());
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
     * bcfl
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcflResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFL(String baseFileName, BCFLDocx bcflResult) {
        String template;
        if (bcflResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/l/BCFLL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/l/BCFLG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 45;
                        }
                        break;
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 46;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 47;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 48;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 49;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcflResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcflResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcflResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcflResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcflResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcflResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcflResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcflResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcflResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcflResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcflResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcflResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcflResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcflResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcflResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcflResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcflResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcflResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcflResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcflResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcflResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcflResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcflResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcflResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcflResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcflResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcflResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcflResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcflResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcflResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcflResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcflResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcflResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcflResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcflResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcflResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcflResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcflResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcflResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcflResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcflResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcflResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcflResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcflResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcflResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue(Double.toString(0.4D * bcflResult.getDsi()));
                        break;
                    case 46:
                        textElement.setValue("Φ" + bcflResult.getDsi().toString());
                        break;
                    case 47:
                        textElement.setValue(bcflResult.getThksn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcflResult.getThkjn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcflResult.getHj().toString());
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
     * bcfm
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfmResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFM(String baseFileName, BCFMDocx bcfmResult) {
        String template;
        if (bcfmResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/m/BCFML.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/m/BCFMG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 45;
                        }
                        break;
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 46;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 47;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 48;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 49;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfmResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfmResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfmResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfmResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfmResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfmResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfmResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfmResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfmResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfmResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfmResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfmResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfmResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfmResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfmResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfmResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfmResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfmResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfmResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfmResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfmResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfmResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfmResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfmResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfmResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfmResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfmResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfmResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfmResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfmResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfmResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfmResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfmResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfmResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfmResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfmResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfmResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfmResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfmResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfmResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfmResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfmResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfmResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfmResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfmResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue(Double.toString(0.5D * bcfmResult.getDsi()));
                        break;
                    case 46:
                        textElement.setValue("Φ" + bcfmResult.getDsi().toString());
                        break;
                    case 47:
                        textElement.setValue(bcfmResult.getThksn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfmResult.getThkjn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcfmResult.getHj().toString());
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
     * bcfn
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfnResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFN(String baseFileName, BCFNDocx bcfnResult) {
        String template;
        if (bcfnResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/n/BCFNL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/n/BCFNG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36132:
                        if (var13.equals("$00")) {
                            var14 = 45;
                        }
                        break;
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 46;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 47;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 48;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 49;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfnResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfnResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfnResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfnResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfnResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfnResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfnResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfnResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfnResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfnResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfnResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfnResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfnResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfnResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfnResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfnResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfnResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfnResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfnResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfnResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfnResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfnResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfnResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfnResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfnResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfnResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfnResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfnResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfnResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfnResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfnResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfnResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfnResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfnResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfnResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfnResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfnResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfnResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfnResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfnResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfnResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfnResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfnResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfnResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfnResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue(Double.toString(0.2D * bcfnResult.getDsi()));
                        break;
                    case 46:
                        textElement.setValue("Φ" + bcfnResult.getDsi().toString());
                        break;
                    case 47:
                        textElement.setValue(bcfnResult.getThksn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfnResult.getThkjn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcfnResult.getHj().toString());
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
     * bcfo
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfoResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFO(String baseFileName, BCFODocx bcfoResult) {
        String template;
        if (bcfoResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/o/BCFOL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/o/BCFOG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 46;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 47;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 48;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 49;
                        }
                        break;
                    case 1120140:
                        if (var13.equals("$000")) {
                            var14 = 45;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfoResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfoResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfoResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfoResult.getStds());
                        break;
                    case 4:
                        textElement.setValue(bcfoResult.getNames());
                        break;
                    case 5:
                        textElement.setValue(bcfoResult.getDsi().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfoResult.getThksn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfoResult.getCs2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfoResult.getEs().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfoResult.getStdj());
                        break;
                    case 10:
                        textElement.setValue(bcfoResult.getNamej());
                        break;
                    case 11:
                        textElement.setValue(bcfoResult.getThkjn().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfoResult.getHj().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfoResult.getCj2().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfoResult.getTest());
                        break;
                    case 15:
                        textElement.setValue(bcfoResult.getDs().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfoResult.getRsel().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfoResult.getCs1().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfoResult.getOst().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfoResult.getOs().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfoResult.getDj().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfoResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bcfoResult.getCj1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfoResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bcfoResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfoResult.getPc().toString());
                        break;
                    case 26:
                        textElement.setValue(bcfoResult.getCs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcfoResult.getThkse().toString());
                        break;
                    case 28:
                        textElement.setValue(bcfoResult.getDc().toString());
                        break;
                    case 29:
                        textElement.setValue(bcfoResult.getCj().toString());
                        break;
                    case 30:
                        textElement.setValue(bcfoResult.getThkje().toString());
                        break;
                    case 31:
                        textElement.setValue(bcfoResult.getHje().toString());
                        break;
                    case 32:
                        textElement.setValue(bcfoResult.getKp().toString());
                        break;
                    case 33:
                        textElement.setValue(bcfoResult.getThksc().toString());
                        break;
                    case 34:
                        textElement.setValue(bcfoResult.getThksd().toString());
                        break;
                    case 35:
                        textElement.setValue(bcfoResult.getThkschk());
                        break;
                    case 36:
                        textElement.setValue(bcfoResult.getZx().toString());
                        break;
                    case 37:
                        textElement.setValue(bcfoResult.getLs().toString());
                        break;
                    case 38:
                        textElement.setValue(bcfoResult.getE1().toString());
                        break;
                    case 39:
                        textElement.setValue(bcfoResult.getE2().toString());
                        break;
                    case 40:
                        textElement.setValue(bcfoResult.getI().toString());
                        break;
                    case 41:
                        textElement.setValue(bcfoResult.getZact().toString());
                        break;
                    case 42:
                        textElement.setValue(bcfoResult.getZchk());
                        break;
                    case 43:
                        textElement.setValue(bcfoResult.getPt().toString());
                        break;
                    case 44:
                        textElement.setValue(bcfoResult.getMawp().toString());
                        break;
                    case 45:
                        textElement.setValue("Φ" + (double) Math.round(bcfoResult.getDsi() / 3.0D * 100.0D) / 100.0D);
                        break;
                    case 46:
                        textElement.setValue("Φ" + bcfoResult.getDsi().toString());
                        break;
                    case 47:
                        textElement.setValue(bcfoResult.getThksn().toString());
                        break;
                    case 48:
                        textElement.setValue(bcfoResult.getThkjn().toString());
                        break;
                    case 49:
                        textElement.setValue(bcfoResult.getHj().toString());
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
     * bcfp
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcfpResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCFP(String baseFileName, BCFPDocx bcfpResult) {
        String template;
        if (bcfpResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/f/p/BCFPL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/f/p/BCFPG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 24;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
                            var14 = 25;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcfpResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcfpResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcfpResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcfpResult.getStd());
                        break;
                    case 4:
                        textElement.setValue(bcfpResult.getName());
                        break;
                    case 5:
                        textElement.setValue(bcfpResult.getDc().toString());
                        break;
                    case 6:
                        textElement.setValue(bcfpResult.getThkn().toString());
                        break;
                    case 7:
                        textElement.setValue(bcfpResult.getC2().toString());
                        break;
                    case 8:
                        textElement.setValue(bcfpResult.getE().toString());
                        break;
                    case 9:
                        textElement.setValue(bcfpResult.getTest());
                        break;
                    case 10:
                        textElement.setValue(bcfpResult.getD().toString());
                        break;
                    case 11:
                        textElement.setValue(bcfpResult.getRel().toString());
                        break;
                    case 12:
                        textElement.setValue(bcfpResult.getC1().toString());
                        break;
                    case 13:
                        textElement.setValue(bcfpResult.getOt().toString());
                        break;
                    case 14:
                        textElement.setValue(bcfpResult.getO().toString());
                        break;
                    case 15:
                        textElement.setValue(bcfpResult.getPc().toString());
                        break;
                    case 16:
                        textElement.setValue(bcfpResult.getKp().toString());
                        break;
                    case 17:
                        textElement.setValue(bcfpResult.getC().toString());
                        break;
                    case 18:
                        textElement.setValue(bcfpResult.getThke().toString());
                        break;
                    case 19:
                        textElement.setValue(bcfpResult.getThkc().toString());
                        break;
                    case 20:
                        textElement.setValue(bcfpResult.getThkd().toString());
                        break;
                    case 21:
                        textElement.setValue(bcfpResult.getThkchk());
                        break;
                    case 22:
                        textElement.setValue(bcfpResult.getPt().toString());
                        break;
                    case 23:
                        textElement.setValue(bcfpResult.getMawp().toString());
                        break;
                    case 24:
                        textElement.setValue("Φ" + bcfpResult.getDc().toString());
                        break;
                    case 25:
                        textElement.setValue(bcfpResult.getThkn().toString());
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
     * bcga
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcgaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCGA(String baseFileName, BCGADocx bcgaResult) {
        String template;
        if (bcgaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/g/a/BCGAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/g/a/BCGAG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 26;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcgaResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcgaResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcgaResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcgaResult.getStdp());
                        break;
                    case 4:
                        textElement.setValue(bcgaResult.getNamep());
                        break;
                    case 5:
                        textElement.setValue(bcgaResult.getThkpn().toString());
                        break;
                    case 6:
                        textElement.setValue(bcgaResult.getCp2().toString());
                        break;
                    case 7:
                        textElement.setValue(bcgaResult.getEp().toString());
                        break;
                    case 8:
                        textElement.setValue(bcgaResult.getA().toString());
                        break;
                    case 9:
                        textElement.setValue(bcgaResult.getB().toString());
                        break;
                    case 10:
                        textElement.setValue(bcgaResult.getTest());
                        break;
                    case 11:
                        textElement.setValue(bcgaResult.getDp().toString());
                        break;
                    case 12:
                        textElement.setValue(bcgaResult.getCp1().toString());
                        break;
                    case 13:
                        textElement.setValue(bcgaResult.getRpel().toString());
                        break;
                    case 14:
                        textElement.setValue(bcgaResult.getOpt().toString());
                        break;
                    case 15:
                        textElement.setValue(bcgaResult.getOp().toString());
                        break;
                    case 16:
                        textElement.setValue(bcgaResult.getPc().toString());
                        break;
                    case 17:
                        textElement.setValue(bcgaResult.getKp().toString());
                        break;
                    case 18:
                        textElement.setValue(bcgaResult.getCp().toString());
                        break;
                    case 19:
                        textElement.setValue(bcgaResult.getThkpe().toString());
                        break;
                    case 20:
                        textElement.setValue(bcgaResult.getZp().toString());
                        break;
                    case 21:
                        textElement.setValue(bcgaResult.getThkpc().toString());
                        break;
                    case 22:
                        textElement.setValue(bcgaResult.getThkpd().toString());
                        break;
                    case 23:
                        textElement.setValue(bcgaResult.getThkpchk());
                        break;
                    case 24:
                        textElement.setValue(bcgaResult.getPt().toString());
                        break;
                    case 25:
                        textElement.setValue(bcgaResult.getMawp().toString());
                        break;
                    case 26:
                        textElement.setValue(bcgaResult.getThkpn().toString());
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
     * bcgb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcgbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCGB(String baseFileName, BCGBDocx bcgbResult) {
        String template;
        if (bcgbResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/g/b/BCGBL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/g/b/BCGBG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 26;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcgbResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcgbResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcgbResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcgbResult.getStdp());
                        break;
                    case 4:
                        textElement.setValue(bcgbResult.getNamep());
                        break;
                    case 5:
                        textElement.setValue(bcgbResult.getThkpn().toString());
                        break;
                    case 6:
                        textElement.setValue(bcgbResult.getCp2().toString());
                        break;
                    case 7:
                        textElement.setValue(bcgbResult.getEp().toString());
                        break;
                    case 8:
                        textElement.setValue(bcgbResult.getA().toString());
                        break;
                    case 9:
                        textElement.setValue(bcgbResult.getB().toString());
                        break;
                    case 10:
                        textElement.setValue(bcgbResult.getTest());
                        break;
                    case 11:
                        textElement.setValue(bcgbResult.getDp().toString());
                        break;
                    case 12:
                        textElement.setValue(bcgbResult.getCp1().toString());
                        break;
                    case 13:
                        textElement.setValue(bcgbResult.getRpel().toString());
                        break;
                    case 14:
                        textElement.setValue(bcgbResult.getOpt().toString());
                        break;
                    case 15:
                        textElement.setValue(bcgbResult.getOp().toString());
                        break;
                    case 16:
                        textElement.setValue(bcgbResult.getPc().toString());
                        break;
                    case 17:
                        textElement.setValue(bcgbResult.getKp().toString());
                        break;
                    case 18:
                        textElement.setValue(bcgbResult.getCp().toString());
                        break;
                    case 19:
                        textElement.setValue(bcgbResult.getThkpe().toString());
                        break;
                    case 20:
                        textElement.setValue(bcgbResult.getZp().toString());
                        break;
                    case 21:
                        textElement.setValue(bcgbResult.getThkpc().toString());
                        break;
                    case 22:
                        textElement.setValue(bcgbResult.getThkpd().toString());
                        break;
                    case 23:
                        textElement.setValue(bcgbResult.getThkpchk());
                        break;
                    case 24:
                        textElement.setValue(bcgbResult.getPt().toString());
                        break;
                    case 25:
                        textElement.setValue(bcgbResult.getMawp().toString());
                        break;
                    case 26:
                        textElement.setValue(bcgbResult.getThkpn().toString());
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
     * bcgc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcgcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCGC(String baseFileName, BCGCDocx bcgcResult) {
        String template;
        if (bcgcResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/g/c/BCGCL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/g/c/BCGCG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 26;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcgcResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcgcResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcgcResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcgcResult.getStdp());
                        break;
                    case 4:
                        textElement.setValue(bcgcResult.getNamep());
                        break;
                    case 5:
                        textElement.setValue(bcgcResult.getThkpn().toString());
                        break;
                    case 6:
                        textElement.setValue(bcgcResult.getCp2().toString());
                        break;
                    case 7:
                        textElement.setValue(bcgcResult.getEp().toString());
                        break;
                    case 8:
                        textElement.setValue(bcgcResult.getA().toString());
                        break;
                    case 9:
                        textElement.setValue(bcgcResult.getB().toString());
                        break;
                    case 10:
                        textElement.setValue(bcgcResult.getTest());
                        break;
                    case 11:
                        textElement.setValue(bcgcResult.getDp().toString());
                        break;
                    case 12:
                        textElement.setValue(bcgcResult.getCp1().toString());
                        break;
                    case 13:
                        textElement.setValue(bcgcResult.getRpel().toString());
                        break;
                    case 14:
                        textElement.setValue(bcgcResult.getOpt().toString());
                        break;
                    case 15:
                        textElement.setValue(bcgcResult.getOp().toString());
                        break;
                    case 16:
                        textElement.setValue(bcgcResult.getPc().toString());
                        break;
                    case 17:
                        textElement.setValue(bcgcResult.getKp().toString());
                        break;
                    case 18:
                        textElement.setValue(bcgcResult.getCp().toString());
                        break;
                    case 19:
                        textElement.setValue(bcgcResult.getThkpe().toString());
                        break;
                    case 20:
                        textElement.setValue(bcgcResult.getZp().toString());
                        break;
                    case 21:
                        textElement.setValue(bcgcResult.getThkpc().toString());
                        break;
                    case 22:
                        textElement.setValue(bcgcResult.getThkpd().toString());
                        break;
                    case 23:
                        textElement.setValue(bcgcResult.getThkpchk());
                        break;
                    case 24:
                        textElement.setValue(bcgcResult.getPt().toString());
                        break;
                    case 25:
                        textElement.setValue(bcgcResult.getMawp().toString());
                        break;
                    case 26:
                        textElement.setValue(bcgcResult.getThkpn().toString());
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
     * bcgd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcgdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCGD(String baseFileName, BCGDDocx bcgdResult) {
        String template;
        if (bcgdResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/g/d/BCGDL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/g/d/BCGDG.docx";
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
            Iterator var11 = texts.iterator();

            while (var11.hasNext()) {
                Object text = var11.next();
                Text textElement = (Text) text;
                String var13 = textElement.getValue();
                byte var14 = -1;
                switch (var13.hashCode()) {
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 26;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 27;
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bcgdResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(bcgdResult.getPd().toString());
                        break;
                    case 2:
                        textElement.setValue(bcgdResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcgdResult.getStdp());
                        break;
                    case 4:
                        textElement.setValue(bcgdResult.getNamep());
                        break;
                    case 5:
                        textElement.setValue(bcgdResult.getThkpn().toString());
                        break;
                    case 6:
                        textElement.setValue(bcgdResult.getCp2().toString());
                        break;
                    case 7:
                        textElement.setValue(bcgdResult.getEp().toString());
                        break;
                    case 8:
                        textElement.setValue(bcgdResult.getA().toString());
                        break;
                    case 9:
                        textElement.setValue(bcgdResult.getB().toString());
                        break;
                    case 10:
                        textElement.setValue(bcgdResult.getTest());
                        break;
                    case 11:
                        textElement.setValue(bcgdResult.getDp().toString());
                        break;
                    case 12:
                        textElement.setValue(bcgdResult.getCp1().toString());
                        break;
                    case 13:
                        textElement.setValue(bcgdResult.getRpel().toString());
                        break;
                    case 14:
                        textElement.setValue(bcgdResult.getOpt().toString());
                        break;
                    case 15:
                        textElement.setValue(bcgdResult.getOp().toString());
                        break;
                    case 16:
                        textElement.setValue(bcgdResult.getPc().toString());
                        break;
                    case 17:
                        textElement.setValue(bcgdResult.getKp().toString());
                        break;
                    case 18:
                        textElement.setValue(bcgdResult.getCp().toString());
                        break;
                    case 19:
                        textElement.setValue(bcgdResult.getThkpe().toString());
                        break;
                    case 20:
                        textElement.setValue(bcgdResult.getZp().toString());
                        break;
                    case 21:
                        textElement.setValue(bcgdResult.getThkpc().toString());
                        break;
                    case 22:
                        textElement.setValue(bcgdResult.getThkpd().toString());
                        break;
                    case 23:
                        textElement.setValue(bcgdResult.getThkpchk());
                        break;
                    case 24:
                        textElement.setValue(bcgdResult.getPt().toString());
                        break;
                    case 25:
                        textElement.setValue(bcgdResult.getMawp().toString());
                        break;
                    case 26:
                        textElement.setValue(bcgdResult.getThkpn().toString());
                        break;
                    case 27:
                        textElement.setValue(bcgdResult.getA().toString());
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
     * bcha
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bchaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCHA(String baseFileName, BCHADocx bchaResult) {
        String template;
        if (bchaResult.getTest().equals("气压试验")) {
            if (!bchaResult.getJcategory().equals("碳素钢") && !bchaResult.getJcategory().equals("低合金钢")) {
                template = "D:/mechw/static/west/cal/b/c/h/a/BCHA-HighAlloy-G.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/h/a/BCHA-CarbonLowAlloy-G.docx";
            }
        } else if (!bchaResult.getJcategory().equals("碳素钢") && !bchaResult.getJcategory().equals("低合金钢")) {
            template = "D:/mechw/static/west/cal/b/c/h/a/BCHA-HighAlloy-L.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/h/a/BCHA-CarbonLowAlloy-L.docx";
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
                String value = textElement.getValue();
                byte var15 = -1;
                switch (value.hashCode()) {
                    case 36140:
                        if (value.equals("$08")) {
                            var15 = 63;
                        }
                        break;
                    case 36141:
                        if (value.equals("$09")) {
                            var15 = 62;
                        }
                        break;
                    case 36166:
                        if (value.equals("$13")) {
                            var15 = 65;
                        }
                        break;
                    case 36169:
                        if (value.equals("$16")) {
                            var15 = 66;
                        }
                        break;
                    case 36170:
                        if (value.equals("$17")) {
                            var15 = 70;
                        }
                        break;
                    case 36172:
                        if (value.equals("$19")) {
                            var15 = 64;
                        }
                        break;
                    case 36194:
                        if (value.equals("$20")) {
                            var15 = 67;
                        }
                        break;
                    case 36195:
                        if (value.equals("$21")) {
                            var15 = 69;
                        }
                        break;
                    case 36292:
                        if (value.equals("$55")) {
                            var15 = 68;
                        }
                        break;
                    case 34366897:
                        if (value.equals("$$001")) {
                            var15 = 0;
                        }
                        break;
                    case 34366898:
                        if (value.equals("$$002")) {
                            var15 = 1;
                        }
                        break;
                    case 34366899:
                        if (value.equals("$$003")) {
                            var15 = 2;
                        }
                        break;
                    case 34366900:
                        if (value.equals("$$004")) {
                            var15 = 3;
                        }
                        break;
                    case 34366901:
                        if (value.equals("$$005")) {
                            var15 = 4;
                        }
                        break;
                    case 34366902:
                        if (value.equals("$$006")) {
                            var15 = 5;
                        }
                        break;
                    case 34366903:
                        if (value.equals("$$007")) {
                            var15 = 6;
                        }
                        break;
                    case 34366904:
                        if (value.equals("$$008")) {
                            var15 = 7;
                        }
                        break;
                    case 34366905:
                        if (value.equals("$$009")) {
                            var15 = 8;
                        }
                        break;
                    case 34366927:
                        if (value.equals("$$010")) {
                            var15 = 9;
                        }
                        break;
                    case 34366928:
                        if (value.equals("$$011")) {
                            var15 = 10;
                        }
                        break;
                    case 34366929:
                        if (value.equals("$$012")) {
                            var15 = 11;
                        }
                        break;
                    case 34366930:
                        if (value.equals("$$013")) {
                            var15 = 12;
                        }
                        break;
                    case 34366931:
                        if (value.equals("$$014")) {
                            var15 = 13;
                        }
                        break;
                    case 34366932:
                        if (value.equals("$$015")) {
                            var15 = 14;
                        }
                        break;
                    case 34366933:
                        if (value.equals("$$016")) {
                            var15 = 15;
                        }
                        break;
                    case 34366934:
                        if (value.equals("$$017")) {
                            var15 = 16;
                        }
                        break;
                    case 34366935:
                        if (value.equals("$$018")) {
                            var15 = 17;
                        }
                        break;
                    case 34366936:
                        if (value.equals("$$019")) {
                            var15 = 18;
                        }
                        break;
                    case 34366958:
                        if (value.equals("$$020")) {
                            var15 = 19;
                        }
                        break;
                    case 34366959:
                        if (value.equals("$$021")) {
                            var15 = 20;
                        }
                        break;
                    case 34366960:
                        if (value.equals("$$022")) {
                            var15 = 21;
                        }
                        break;
                    case 34366961:
                        if (value.equals("$$023")) {
                            var15 = 22;
                        }
                        break;
                    case 34366962:
                        if (value.equals("$$024")) {
                            var15 = 23;
                        }
                        break;
                    case 34366963:
                        if (value.equals("$$025")) {
                            var15 = 24;
                        }
                        break;
                    case 34366964:
                        if (value.equals("$$026")) {
                            var15 = 25;
                        }
                        break;
                    case 34366966:
                        if (value.equals("$$028")) {
                            var15 = 26;
                        }
                        break;
                    case 34366967:
                        if (value.equals("$$029")) {
                            var15 = 27;
                        }
                        break;
                    case 34366989:
                        if (value.equals("$$030")) {
                            var15 = 28;
                        }
                        break;
                    case 34366990:
                        if (value.equals("$$031")) {
                            var15 = 29;
                        }
                        break;
                    case 34366991:
                        if (value.equals("$$032")) {
                            var15 = 30;
                        }
                        break;
                    case 34366992:
                        if (value.equals("$$033")) {
                            var15 = 31;
                        }
                        break;
                    case 34366993:
                        if (value.equals("$$034")) {
                            var15 = 32;
                        }
                        break;
                    case 34366994:
                        if (value.equals("$$035")) {
                            var15 = 33;
                        }
                        break;
                    case 34366995:
                        if (value.equals("$$036")) {
                            var15 = 34;
                        }
                        break;
                    case 34366996:
                        if (value.equals("$$037")) {
                            var15 = 35;
                        }
                        break;
                    case 34366998:
                        if (value.equals("$$039")) {
                            var15 = 36;
                        }
                        break;
                    case 34367020:
                        if (value.equals("$$040")) {
                            var15 = 37;
                        }
                        break;
                    case 34367021:
                        if (value.equals("$$041")) {
                            var15 = 38;
                        }
                        break;
                    case 34367022:
                        if (value.equals("$$042")) {
                            var15 = 39;
                        }
                        break;
                    case 34367024:
                        if (value.equals("$$044")) {
                            var15 = 40;
                        }
                        break;
                    case 34367025:
                        if (value.equals("$$045")) {
                            var15 = 41;
                        }
                        break;
                    case 34367026:
                        if (value.equals("$$046")) {
                            var15 = 42;
                        }
                        break;
                    case 34367027:
                        if (value.equals("$$047")) {
                            var15 = 43;
                        }
                        break;
                    case 34367028:
                        if (value.equals("$$048")) {
                            var15 = 44;
                        }
                        break;
                    case 34367029:
                        if (value.equals("$$049")) {
                            var15 = 45;
                        }
                        break;
                    case 34367051:
                        if (value.equals("$$050")) {
                            var15 = 46;
                        }
                        break;
                    case 34367052:
                        if (value.equals("$$051")) {
                            var15 = 47;
                        }
                        break;
                    case 34367053:
                        if (value.equals("$$052")) {
                            var15 = 48;
                        }
                        break;
                    case 34367054:
                        if (value.equals("$$053")) {
                            var15 = 49;
                        }
                        break;
                    case 34367055:
                        if (value.equals("$$054")) {
                            var15 = 50;
                        }
                        break;
                    case 34367056:
                        if (value.equals("$$055")) {
                            var15 = 51;
                        }
                        break;
                    case 34367057:
                        if (value.equals("$$056")) {
                            var15 = 52;
                        }
                        break;
                    case 34367058:
                        if (value.equals("$$057")) {
                            var15 = 53;
                        }
                        break;
                    case 34367059:
                        if (value.equals("$$058")) {
                            var15 = 54;
                        }
                        break;
                    case 34367060:
                        if (value.equals("$$059")) {
                            var15 = 55;
                        }
                        break;
                    case 34367082:
                        if (value.equals("$$060")) {
                            var15 = 56;
                        }
                        break;
                    case 34367083:
                        if (value.equals("$$061")) {
                            var15 = 57;
                        }
                        break;
                    case 34367084:
                        if (value.equals("$$062")) {
                            var15 = 58;
                        }
                        break;
                    case 34367085:
                        if (value.equals("$$063")) {
                            var15 = 59;
                        }
                        break;
                    case 34367086:
                        if (value.equals("$$064")) {
                            var15 = 60;
                        }
                        break;
                    case 34367087:
                        if (value.equals("$$065")) {
                            var15 = 61;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(bchaResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bchaResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bchaResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bchaResult.getTest());
                        break;
                    case 4:
                        textElement.setValue(bchaResult.getDelta().toString());
                        break;
                    case 5:
                        textElement.setValue(bchaResult.getJstd());
                        break;
                    case 6:
                        textElement.setValue(bchaResult.getJname());
                        break;
                    case 7:
                        textElement.setValue(bchaResult.getSdo().toString());
                        break;
                    case 8:
                        textElement.setValue(bchaResult.getThkjn().toString());
                        break;
                    case 9:
                        textElement.setValue(bchaResult.getCj2().toString());
                        break;
                    case 10:
                        textElement.setValue(bchaResult.getBstd());
                        break;
                    case 11:
                        textElement.setValue(bchaResult.getBname());
                        break;
                    case 12:
                        textElement.setValue(bchaResult.getThkbn().toString());
                        break;
                    case 13:
                        textElement.setValue(bchaResult.getSstd());
                        break;
                    case 14:
                        textElement.setValue(bchaResult.getSname());
                        break;
                    case 15:
                        textElement.setValue(bchaResult.getBdi().toString());
                        break;
                    case 16:
                        textElement.setValue(bchaResult.getThksn().toString());
                        break;
                    case 17:
                        textElement.setValue(bchaResult.getCs2().toString());
                        break;
                    case 18:
                        textElement.setValue(bchaResult.getL2().toString());
                        break;
                    case 19:
                        textElement.setValue(bchaResult.getL3().toString());
                        break;
                    case 20:
                        textElement.setValue(bchaResult.getH().toString());
                        break;
                    case 21:
                        textElement.setValue(bchaResult.getNd().toString());
                        break;
                    case 22:
                        textElement.setValue(bchaResult.getDj().toString());
                        break;
                    case 23:
                        textElement.setValue(bchaResult.getOjt().toString());
                        break;
                    case 24:
                        textElement.setValue(bchaResult.getOj().toString());
                        break;
                    case 25:
                        textElement.setValue(bchaResult.getRjel().toString());
                        break;
                    case 26:
                        textElement.setValue(bchaResult.getEjt().toString());
                        break;
                    case 27:
                        textElement.setValue(bchaResult.getCj1().toString());
                        break;
                    case 28:
                        textElement.setValue(bchaResult.getDs().toString());
                        break;
                    case 29:
                        textElement.setValue(bchaResult.getRsel().toString());
                        break;
                    case 30:
                        textElement.setValue(bchaResult.getCs1().toString());
                        break;
                    case 31:
                        textElement.setValue(bchaResult.getEst().toString());
                        break;
                    case 32:
                        textElement.setValue(bchaResult.getDb().toString());
                        break;
                    case 33:
                        textElement.setValue(bchaResult.getObt().toString());
                        break;
                    case 34:
                        textElement.setValue(bchaResult.getOb().toString());
                        break;
                    case 35:
                        textElement.setValue(bchaResult.getRbel().toString());
                        break;
                    case 36:
                        textElement.setValue(bchaResult.getEbt().toString());
                        break;
                    case 37:
                        textElement.setValue(bchaResult.getCb1().toString());
                        break;
                    case 38:
                        textElement.setValue(bchaResult.getOs().toString());
                        break;
                    case 39:
                        textElement.setValue(bchaResult.getOst().toString());
                        break;
                    case 40:
                        textElement.setValue(bchaResult.getPc().toString());
                        break;
                    case 41:
                        textElement.setValue(bchaResult.getCj().toString());
                        break;
                    case 42:
                        textElement.setValue(bchaResult.getThkje().toString());
                        break;
                    case 43:
                        textElement.setValue(bchaResult.getSdm().toString());
                        break;
                    case 44:
                        textElement.setValue(bchaResult.getSdi().toString());
                        break;
                    case 45:
                        textElement.setValue(bchaResult.getCs().toString());
                        break;
                    case 46:
                        textElement.setValue(bchaResult.getThkse().toString());
                        break;
                    case 47:
                        textElement.setValue(bchaResult.getBdo().toString());
                        break;
                    case 48:
                        textElement.setValue(bchaResult.getThkbe().toString());
                        break;
                    case 49:
                        textElement.setValue(bchaResult.getO1().toString());
                        break;
                    case 50:
                        textElement.setValue(bchaResult.getO1chk());
                        break;
                    case 51:
                        textElement.setValue(bchaResult.getL1().toString());
                        break;
                    case 52:
                        textElement.setValue(bchaResult.getO2().toString());
                        break;
                    case 53:
                        textElement.setValue(bchaResult.getOmin().toString());
                        break;
                    case 54:
                        textElement.setValue(bchaResult.getO2chk());
                        break;
                    case 55:
                        textElement.setValue(bchaResult.getO3().toString());
                        break;
                    case 56:
                        textElement.setValue(bchaResult.getOr().toString());
                        break;
                    case 57:
                        textElement.setValue(bchaResult.getN().toString());
                        break;
                    case 58:
                        textElement.setValue(bchaResult.getPjt().toString());
                        break;
                    case 59:
                        textElement.setValue(bchaResult.getPst().toString());
                        break;
                    case 60:
                        textElement.setValue(bchaResult.getPbt().toString());
                        break;
                    case 61:
                        textElement.setValue(bchaResult.getPt().toString());
                        break;
                    case 62:
                        textElement.setValue(bchaResult.getThkjn().toString());
                        break;
                    case 63:
                        textElement.setValue("Φ" + bchaResult.getSdo().toString());
                        break;
                    case 64:
                        textElement.setValue(bchaResult.getL2().toString());
                        break;
                    case 65:
                        textElement.setValue(bchaResult.getThkbn().toString());
                        break;
                    case 66:
                        textElement.setValue("Φ" + bchaResult.getBdi().toString());
                        break;
                    case 67:
                        textElement.setValue(bchaResult.getL3().toString());
                        break;
                    case 68:
                        textElement.setValue(bchaResult.getL1().toString());
                        break;
                    case 69:
                        textElement.setValue(bchaResult.getH().toString());
                        break;
                    case 70:
                        textElement.setValue(bchaResult.getThksn().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var16) {
            var16.printStackTrace();
            return "-1";
        }
    }

    /**
     * bchb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bchbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCHB(String baseFileName, BCHBDocx bchbResult) {
        String template;
        if (bchbResult.getTest().equals("气压试验")) {
            if (bchbResult.getJcategory().equals("碳素钢和低合金钢")) {
                template = "D:/mechw/static/west/cal/b/c/h/b/BCHB-CarbonLowAlloy-G.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/c/h/b/BCHB-HighAlloy-G.docx";
            }
        } else if (bchbResult.getJcategory().equals("碳素钢和低合金钢")) {
            template = "D:/mechw/static/west/cal/b/c/h/b/BCHB-CarbonLowAlloy-L.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/h/b/BCHB-HighAlloy-L.docx";
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
                String value = textElement.getValue();
                byte var15 = -1;
                switch (value.hashCode()) {
                    case 36140:
                        if (value.equals("$08")) {
                            var15 = 51;
                        }
                        break;
                    case 36141:
                        if (value.equals("$09")) {
                            var15 = 50;
                        }
                        break;
                    case 36166:
                        if (value.equals("$13")) {
                            var15 = 53;
                        }
                        break;
                    case 36167:
                        if (value.equals("$14")) {
                            var15 = 52;
                        }
                        break;
                    case 36169:
                        if (value.equals("$16")) {
                            var15 = 54;
                        }
                        break;
                    case 36170:
                        if (value.equals("$17")) {
                            var15 = 56;
                        }
                        break;
                    case 36259:
                        if (value.equals("$43")) {
                            var15 = 55;
                        }
                        break;
                    case 34366897:
                        if (value.equals("$$001")) {
                            var15 = 0;
                        }
                        break;
                    case 34366898:
                        if (value.equals("$$002")) {
                            var15 = 1;
                        }
                        break;
                    case 34366899:
                        if (value.equals("$$003")) {
                            var15 = 2;
                        }
                        break;
                    case 34366900:
                        if (value.equals("$$004")) {
                            var15 = 3;
                        }
                        break;
                    case 34366901:
                        if (value.equals("$$005")) {
                            var15 = 4;
                        }
                        break;
                    case 34366902:
                        if (value.equals("$$006")) {
                            var15 = 5;
                        }
                        break;
                    case 34366903:
                        if (value.equals("$$007")) {
                            var15 = 6;
                        }
                        break;
                    case 34366904:
                        if (value.equals("$$008")) {
                            var15 = 7;
                        }
                        break;
                    case 34366905:
                        if (value.equals("$$009")) {
                            var15 = 8;
                        }
                        break;
                    case 34366927:
                        if (value.equals("$$010")) {
                            var15 = 9;
                        }
                        break;
                    case 34366928:
                        if (value.equals("$$011")) {
                            var15 = 10;
                        }
                        break;
                    case 34366929:
                        if (value.equals("$$012")) {
                            var15 = 11;
                        }
                        break;
                    case 34366930:
                        if (value.equals("$$013")) {
                            var15 = 12;
                        }
                        break;
                    case 34366931:
                        if (value.equals("$$014")) {
                            var15 = 13;
                        }
                        break;
                    case 34366932:
                        if (value.equals("$$015")) {
                            var15 = 14;
                        }
                        break;
                    case 34366933:
                        if (value.equals("$$016")) {
                            var15 = 15;
                        }
                        break;
                    case 34366934:
                        if (value.equals("$$017")) {
                            var15 = 16;
                        }
                        break;
                    case 34366935:
                        if (value.equals("$$018")) {
                            var15 = 17;
                        }
                        break;
                    case 34366936:
                        if (value.equals("$$019")) {
                            var15 = 18;
                        }
                        break;
                    case 34366958:
                        if (value.equals("$$020")) {
                            var15 = 19;
                        }
                        break;
                    case 34366959:
                        if (value.equals("$$021")) {
                            var15 = 20;
                        }
                        break;
                    case 34366960:
                        if (value.equals("$$022")) {
                            var15 = 21;
                        }
                        break;
                    case 34366962:
                        if (value.equals("$$024")) {
                            var15 = 22;
                        }
                        break;
                    case 34366963:
                        if (value.equals("$$025")) {
                            var15 = 23;
                        }
                        break;
                    case 34366964:
                        if (value.equals("$$026")) {
                            var15 = 24;
                        }
                        break;
                    case 34366965:
                        if (value.equals("$$027")) {
                            var15 = 25;
                        }
                        break;
                    case 34366966:
                        if (value.equals("$$028")) {
                            var15 = 26;
                        }
                        break;
                    case 34366967:
                        if (value.equals("$$029")) {
                            var15 = 27;
                        }
                        break;
                    case 34366990:
                        if (value.equals("$$031")) {
                            var15 = 28;
                        }
                        break;
                    case 34366991:
                        if (value.equals("$$032")) {
                            var15 = 29;
                        }
                        break;
                    case 34366992:
                        if (value.equals("$$033")) {
                            var15 = 30;
                        }
                        break;
                    case 34366993:
                        if (value.equals("$$034")) {
                            var15 = 31;
                        }
                        break;
                    case 34366994:
                        if (value.equals("$$035")) {
                            var15 = 32;
                        }
                        break;
                    case 34366995:
                        if (value.equals("$$036")) {
                            var15 = 33;
                        }
                        break;
                    case 34366996:
                        if (value.equals("$$037")) {
                            var15 = 34;
                        }
                        break;
                    case 34366997:
                        if (value.equals("$$038")) {
                            var15 = 35;
                        }
                        break;
                    case 34366998:
                        if (value.equals("$$039")) {
                            var15 = 36;
                        }
                        break;
                    case 34367020:
                        if (value.equals("$$040")) {
                            var15 = 37;
                        }
                        break;
                    case 34367021:
                        if (value.equals("$$041")) {
                            var15 = 38;
                        }
                        break;
                    case 34367022:
                        if (value.equals("$$042")) {
                            var15 = 39;
                        }
                        break;
                    case 34367023:
                        if (value.equals("$$043")) {
                            var15 = 40;
                        }
                        break;
                    case 34367024:
                        if (value.equals("$$044")) {
                            var15 = 41;
                        }
                        break;
                    case 34367025:
                        if (value.equals("$$045")) {
                            var15 = 42;
                        }
                        break;
                    case 34367026:
                        if (value.equals("$$046")) {
                            var15 = 43;
                        }
                        break;
                    case 34367027:
                        if (value.equals("$$047")) {
                            var15 = 44;
                        }
                        break;
                    case 34367028:
                        if (value.equals("$$048")) {
                            var15 = 45;
                        }
                        break;
                    case 34367029:
                        if (value.equals("$$049")) {
                            var15 = 46;
                        }
                        break;
                    case 34367051:
                        if (value.equals("$$050")) {
                            var15 = 47;
                        }
                        break;
                    case 34367052:
                        if (value.equals("$$051")) {
                            var15 = 48;
                        }
                        break;
                    case 34367053:
                        if (value.equals("$$052")) {
                            var15 = 49;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(bchbResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bchbResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bchbResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bchbResult.getTest());
                        break;
                    case 4:
                        textElement.setValue(bchbResult.getDelta().toString());
                        break;
                    case 5:
                        textElement.setValue(bchbResult.getJstd());
                        break;
                    case 6:
                        textElement.setValue(bchbResult.getJname());
                        break;
                    case 7:
                        textElement.setValue(bchbResult.getSdo().toString());
                        break;
                    case 8:
                        textElement.setValue(bchbResult.getThkjn().toString());
                        break;
                    case 9:
                        textElement.setValue(bchbResult.getCj2().toString());
                        break;
                    case 10:
                        textElement.setValue(bchbResult.getBstd());
                        break;
                    case 11:
                        textElement.setValue(bchbResult.getBname());
                        break;
                    case 12:
                        textElement.setValue(bchbResult.getBdi().toString());
                        break;
                    case 13:
                        textElement.setValue(bchbResult.getThkbn().toString());
                        break;
                    case 14:
                        textElement.setValue(bchbResult.getCb2().toString());
                        break;
                    case 15:
                        textElement.setValue(bchbResult.getL2().toString());
                        break;
                    case 16:
                        textElement.setValue(bchbResult.getH().toString());
                        break;
                    case 17:
                        textElement.setValue(bchbResult.getNd().toString());
                        break;
                    case 18:
                        textElement.setValue(bchbResult.getDj().toString());
                        break;
                    case 19:
                        textElement.setValue(bchbResult.getOjt().toString());
                        break;
                    case 20:
                        textElement.setValue(bchbResult.getOj().toString());
                        break;
                    case 21:
                        textElement.setValue(bchbResult.getRjel().toString());
                        break;
                    case 22:
                        textElement.setValue(bchbResult.getEjt().toString());
                        break;
                    case 23:
                        textElement.setValue(bchbResult.getCj1().toString());
                        break;
                    case 24:
                        textElement.setValue(bchbResult.getDb().toString());
                        break;
                    case 25:
                        textElement.setValue(bchbResult.getObt().toString());
                        break;
                    case 26:
                        textElement.setValue(bchbResult.getOb().toString());
                        break;
                    case 27:
                        textElement.setValue(bchbResult.getRbel().toString());
                        break;
                    case 28:
                        textElement.setValue(bchbResult.getEbt().toString());
                        break;
                    case 29:
                        textElement.setValue(bchbResult.getCb1().toString());
                        break;
                    case 30:
                        textElement.setValue(bchbResult.getPc().toString());
                        break;
                    case 31:
                        textElement.setValue(bchbResult.getCj().toString());
                        break;
                    case 32:
                        textElement.setValue(bchbResult.getThkje().toString());
                        break;
                    case 33:
                        textElement.setValue(bchbResult.getSdm().toString());
                        break;
                    case 34:
                        textElement.setValue(bchbResult.getSdi().toString());
                        break;
                    case 35:
                        textElement.setValue(bchbResult.getCb().toString());
                        break;
                    case 36:
                        textElement.setValue(bchbResult.getThkbe().toString());
                        break;
                    case 37:
                        textElement.setValue(bchbResult.getBdo().toString());
                        break;
                    case 38:
                        textElement.setValue(bchbResult.getO1().toString());
                        break;
                    case 39:
                        textElement.setValue(bchbResult.getO1chk());
                        break;
                    case 40:
                        textElement.setValue(bchbResult.getL1().toString());
                        break;
                    case 41:
                        textElement.setValue(bchbResult.getO2().toString());
                        break;
                    case 42:
                        textElement.setValue(bchbResult.getOmin().toString());
                        break;
                    case 43:
                        textElement.setValue(bchbResult.getO2chk());
                        break;
                    case 44:
                        textElement.setValue(bchbResult.getO3().toString());
                        break;
                    case 45:
                        textElement.setValue(bchbResult.getOr().toString());
                        break;
                    case 46:
                        textElement.setValue(bchbResult.getN().toString());
                        break;
                    case 47:
                        textElement.setValue(bchbResult.getPjt().toString());
                        break;
                    case 48:
                        textElement.setValue(bchbResult.getPbt().toString());
                        break;
                    case 49:
                        textElement.setValue(bchbResult.getPt().toString());
                        break;
                    case 50:
                        textElement.setValue(bchbResult.getThkjn().toString());
                        break;
                    case 51:
                        textElement.setValue("Φ" + bchbResult.getSdo().toString());
                        break;
                    case 52:
                        textElement.setValue(bchbResult.getThkbn().toString());
                        break;
                    case 53:
                        textElement.setValue("Φ" + bchbResult.getBdi().toString());
                        break;
                    case 54:
                        textElement.setValue(bchbResult.getL2().toString());
                        break;
                    case 55:
                        textElement.setValue(bchbResult.getL1().toString());
                        break;
                    case 56:
                        textElement.setValue(bchbResult.getH().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var16) {
            var16.printStackTrace();
            return "-1";
        }
    }

    /**
     * bci
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bciResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCI(String baseFileName, BCIDocx bciResult) {
        String template;
        if (bciResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/b/c/i/BCIL.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/c/i/BCIG.docx";
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
                    textElement.setValue(bciResult.getPd().toString());
                } else if (textElement.getValue().equals("$$002")) {
                    textElement.setValue(bciResult.getT().toString());
                } else if (textElement.getValue().equals("$$003")) {
                    textElement.setValue(bciResult.getPs().toString());
                } else if (textElement.getValue().equals("$$004")) {
                    textElement.setValue(bciResult.getStd());
                } else if (textElement.getValue().equals("$$005")) {
                    textElement.setValue(bciResult.getName());
                } else if (textElement.getValue().equals("$$006")) {
                    textElement.setValue(bciResult.getDw().toString());
                } else if (textElement.getValue().equals("$$007")) {
                    textElement.setValue(bciResult.getR().toString());
                } else if (textElement.getValue().equals("$$008")) {
                    textElement.setValue(bciResult.getThkn().toString());
                } else if (textElement.getValue().equals("$$009")) {
                    textElement.setValue(bciResult.getC2().toString());
                } else if (textElement.getValue().equals("$$010")) {
                    textElement.setValue(bciResult.getE().toString());
                } else if (textElement.getValue().equals("$$011")) {
                    textElement.setValue(bciResult.getTest());
                } else if (textElement.getValue().equals("$$012")) {
                    textElement.setValue(bciResult.getDensity().toString());
                } else if (textElement.getValue().equals("$$013")) {
                    textElement.setValue(bciResult.getRel().toString());
                } else if (textElement.getValue().equals("$$014")) {
                    textElement.setValue(bciResult.getC1().toString());
                } else if (textElement.getValue().equals("$$015")) {
                    textElement.setValue(bciResult.getOt().toString());
                } else if (textElement.getValue().equals("$$016")) {
                    textElement.setValue(bciResult.getO().toString());
                } else if (textElement.getValue().equals("$$018")) {
                    textElement.setValue(bciResult.getPc().toString());
                } else if (textElement.getValue().equals("$$019")) {
                    textElement.setValue(bciResult.getM().toString());
                } else if (textElement.getValue().equals("$$020")) {
                    textElement.setValue(bciResult.getN().toString());
                } else if (textElement.getValue().equals("$$021")) {
                    textElement.setValue(bciResult.getA1().toString());
                } else if (textElement.getValue().equals("$$022")) {
                    textElement.setValue(bciResult.getC().toString());
                } else if (textElement.getValue().equals("$$023")) {
                    textElement.setValue(bciResult.getThk0().toString());
                } else if (textElement.getValue().equals("$$024")) {
                    textElement.setValue(bciResult.getThk().toString());
                } else if (textElement.getValue().equals("$$025")) {
                    textElement.setValue(bciResult.getThkchk());
                } else if (textElement.getValue().equals("$$026")) {
                    textElement.setValue(bciResult.getPmawp().toString());
                } else if (textElement.getValue().equals("$$027")) {
                    textElement.setValue(bciResult.getPt().toString());
                } else if (textElement.getValue().equals("$06")) {
                    textElement.setValue("Φ" + bciResult.getDw().toString());
                } else if (textElement.getValue().equals("$07")) {
                    textElement.setValue("R" + bciResult.getR().toString());
                } else if (textElement.getValue().equals("$08")) {
                    textElement.setValue(bciResult.getThkn().toString());
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
     * bcj
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bcjResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBCJ(String baseFileName, BCJDocx bcjResult) {
        String template = "D:/mechw/static/west/cal/b/c/j/BCJ.docx";
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
                        textElement.setValue(bcjResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(bcjResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(bcjResult.getPs().toString());
                        break;
                    case 3:
                        textElement.setValue(bcjResult.getTest());
                        break;
                    case 4:
                        textElement.setValue(bcjResult.getStds());
                        break;
                    case 5:
                        textElement.setValue(bcjResult.getNames());
                        break;
                    case 6:
                        textElement.setValue(bcjResult.getDso().toString());
                        break;
                    case 7:
                        textElement.setValue(bcjResult.getL().toString());
                        break;
                    case 8:
                        textElement.setValue(bcjResult.getThksn().toString());
                        break;
                    case 9:
                        textElement.setValue(bcjResult.getCs2().toString());
                        break;
                    case 10:
                        textElement.setValue(bcjResult.getEs().toString());
                        break;
                    case 11:
                        textElement.setValue(bcjResult.getStdb());
                        break;
                    case 12:
                        textElement.setValue(bcjResult.getNameb());
                        break;
                    case 13:
                        textElement.setValue(bcjResult.getThkbn().toString());
                        break;
                    case 14:
                        textElement.setValue(bcjResult.getCb2().toString());
                        break;
                    case 15:
                        textElement.setValue(bcjResult.getEb().toString());
                        break;
                    case 16:
                        textElement.setValue(bcjResult.getStde());
                        break;
                    case 17:
                        textElement.setValue(bcjResult.getNamee());
                        break;
                    case 18:
                        textElement.setValue(bcjResult.getThken().toString());
                        break;
                    case 19:
                        textElement.setValue(bcjResult.getCe2().toString());
                        break;
                    case 20:
                        textElement.setValue(bcjResult.getEe().toString());
                        break;
                    case 21:
                        textElement.setValue(bcjResult.getDs().toString());
                        break;
                    case 22:
                        textElement.setValue(bcjResult.getCs1().toString());
                        break;
                    case 23:
                        textElement.setValue(bcjResult.getRtsel().toString());
                        break;
                    case 24:
                        textElement.setValue(bcjResult.getOst().toString());
                        break;
                    case 25:
                        textElement.setValue(bcjResult.getOs().toString());
                        break;
                    case 27:
                        textElement.setValue(bcjResult.getDe().toString());
                        break;
                    case 28:
                        textElement.setValue(bcjResult.getCe1().toString());
                        break;
                    case 29:
                        textElement.setValue(bcjResult.getRteel().toString());
                        break;
                    case 30:
                        textElement.setValue(bcjResult.getDb().toString());
                        break;
                    case 31:
                        textElement.setValue(bcjResult.getCb1().toString());
                        break;
                    case 32:
                        textElement.setValue(bcjResult.getRtbel().toString());
                        break;
                    case 33:
                        textElement.setValue(bcjResult.getObt().toString());
                        break;
                    case 34:
                        textElement.setValue(bcjResult.getOb().toString());
                        break;
                    case 36:
                        textElement.setValue(bcjResult.getOet().toString());
                        break;
                    case 37:
                        textElement.setValue(bcjResult.getOe().toString());
                        break;
                    case 39:
                        textElement.setValue(bcjResult.getPc().toString());
                        break;
                    case 40:
                        textElement.setValue(bcjResult.getCs().toString());
                        break;
                    case 41:
                        textElement.setValue(bcjResult.getThkse().toString());
                        break;
                    case 42:
                        textElement.setValue(bcjResult.getRso().toString());
                        break;
                    case 43:
                        textElement.setValue(bcjResult.getCb().toString());
                        break;
                    case 44:
                        textElement.setValue(bcjResult.getThkbe().toString());
                        break;
                    case 45:
                        textElement.setValue(bcjResult.getCe().toString());
                        break;
                    case 46:
                        textElement.setValue(bcjResult.getThkee().toString());
                        break;
                    case 47:
                        textElement.setValue(bcjResult.getOsc().toString());
                        break;
                    case 48:
                        textElement.setValue(bcjResult.getOstes().toString());
                        break;
                    case 49:
                        textElement.setValue(bcjResult.getOscchk());
                        break;
                    case 50:
                        textElement.setValue(bcjResult.getKs().toString());
                        break;
                    case 51:
                        textElement.setValue(bcjResult.getOscc().toString());
                        break;
                    case 52:
                        textElement.setValue(bcjResult.getEsost().toString());
                        break;
                    case 53:
                        textElement.setValue(bcjResult.getOsccchk());
                        break;
                    case 54:
                        textElement.setValue(bcjResult.getKb().toString());
                        break;
                    case 55:
                        textElement.setValue(bcjResult.getObc().toString());
                        break;
                    case 56:
                        textElement.setValue(bcjResult.getEbobt().toString());
                        break;
                    case 57:
                        textElement.setValue(bcjResult.getObcchk());
                        break;
                    case 58:
                        textElement.setValue(bcjResult.getKe().toString());
                        break;
                    case 59:
                        textElement.setValue(bcjResult.getOec().toString());
                        break;
                    case 60:
                        textElement.setValue(bcjResult.getEeoet().toString());
                        break;
                    case 61:
                        textElement.setValue(bcjResult.getOecchk());
                        break;
                    case 62:
                        textElement.setValue(bcjResult.getEta().toString());
                        break;
                    case 63:
                        textElement.setValue(bcjResult.getPst().toString());
                        break;
                    case 64:
                        textElement.setValue(bcjResult.getPbt().toString());
                        break;
                    case 65:
                        textElement.setValue(bcjResult.getPet().toString());
                        break;
                    case 66:
                        textElement.setValue(bcjResult.getPt().toString());
                        break;
                    case 67:
                        textElement.setValue(bcjResult.getDso().toString());
                        break;
                    case 68:
                        textElement.setValue(bcjResult.getL().toString());
                        break;
                    case 69:
                        textElement.setValue(bcjResult.getThksn().toString());
                        break;
                    case 70:
                        textElement.setValue(bcjResult.getThkbn().toString());
                        break;
                    case 71:
                        textElement.setValue(bcjResult.getThken().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var15) {
            var15.printStackTrace();
            return "-1";
        }
    }
}