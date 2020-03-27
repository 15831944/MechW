package com.mechw.service.docx.x;

import com.mechw.model.front.x.c.*;
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

public class DocxXC extends DocxTool {

    public static String getXCA(String baseFileName, XCADocx xcaResult) {

        String template = "D:/mechw/static/west/cal/x/c/a/XCA.docx";
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
                    case 36133:
                        if (value.equals("$01")) {
                            var15 = 32;
                        }
                        break;
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 33;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 34;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 35;
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
                    case 34366965:
                        if (value.equals("$$027")) {
                            var15 = 26;
                        }
                        break;
                    case 34366966:
                        if (value.equals("$$028")) {
                            var15 = 27;
                        }
                        break;
                    case 34366967:
                        if (value.equals("$$029")) {
                            var15 = 28;
                        }
                        break;
                    case 34366989:
                        if (value.equals("$$030")) {
                            var15 = 29;
                        }
                        break;
                    case 34366990:
                        if (value.equals("$$031")) {
                            var15 = 30;
                        }
                        break;
                    case 34366991:
                        if (value.equals("$$032")) {
                            var15 = 31;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xcaResult.getStd());
                        break;
                    case 1:
                        textElement.setValue(xcaResult.getName());
                        break;
                    case 2:
                        textElement.setValue(xcaResult.getThkn().toString());
                        break;
                    case 3:
                        textElement.setValue(xcaResult.getL().toString());
                        break;
                    case 4:
                        textElement.setValue(xcaResult.getR().toString());
                        break;
                    case 5:
                        textElement.setValue(xcaResult.getD().toString());
                        break;
                    case 6:
                        textElement.setValue(xcaResult.getC2().toString());
                        break;
                    case 7:
                        textElement.setValue(xcaResult.getMass().toString());
                        break;
                    case 8:
                        textElement.setValue(xcaResult.getDensity().toString());
                        break;
                    case 9:
                        textElement.setValue(xcaResult.getRel().toString());
                        break;
                    case 10:
                        textElement.setValue(xcaResult.getC1().toString());
                        break;
                    case 11:
                        textElement.setValue(xcaResult.getC().toString());
                        break;
                    case 12:
                        textElement.setValue(xcaResult.getThke().toString());
                        break;
                    case 13:
                        textElement.setValue(xcaResult.getE().toString());
                        break;
                    case 14:
                        textElement.setValue(xcaResult.getK().toString());
                        break;
                    case 15:
                        textElement.setValue(xcaResult.getFv().toString());
                        break;
                    case 16:
                        textElement.setValue(xcaResult.getFh().toString());
                        break;
                    case 17:
                        textElement.setValue(xcaResult.getFl().toString());
                        break;
                    case 18:
                        textElement.setValue(xcaResult.getM().toString());
                        break;
                    case 19:
                        textElement.setValue(xcaResult.getOl().toString());
                        break;
                    case 20:
                        textElement.setValue(xcaResult.getOlallow().toString());
                        break;
                    case 21:
                        textElement.setValue(xcaResult.getOlchk());
                        break;
                    case 22:
                        textElement.setValue(xcaResult.getTl().toString());
                        break;
                    case 23:
                        textElement.setValue(xcaResult.getTlallow().toString());
                        break;
                    case 24:
                        textElement.setValue(xcaResult.getTlchk());
                        break;
                    case 25:
                        textElement.setValue(xcaResult.getA().toString());
                        break;
                    case 26:
                        textElement.setValue(xcaResult.getOa().toString());
                        break;
                    case 27:
                        textElement.setValue(xcaResult.getTa().toString());
                        break;
                    case 28:
                        textElement.setValue(xcaResult.getOb().toString());
                        break;
                    case 29:
                        textElement.setValue(xcaResult.getOab().toString());
                        break;
                    case 30:
                        textElement.setValue(xcaResult.getOaballow().toString());
                        break;
                    case 31:
                        textElement.setValue(xcaResult.getOabchk());
                        break;
                    case 32:
                        textElement.setValue("R" + xcaResult.getR().toString());
                        break;
                    case 33:
                        textElement.setValue("Φ" + xcaResult.getD().toString());
                        break;
                    case 34:
                        textElement.setValue(xcaResult.getL().toString());
                        break;
                    case 35:
                        textElement.setValue(xcaResult.getThkn().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var16) {
            var16.printStackTrace();
            return "-1";
        }
    }

    public static String getXCB(String baseFileName, XCBDocx xcbResult) {
        String template = "D:/mechw/static/west/cal/x/c/b/XCB.docx";
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
                    case 36133:
                        if (value.equals("$01")) {
                            var15 = 32;
                        }
                        break;
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 33;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 34;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 35;
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
                    case 34366965:
                        if (value.equals("$$027")) {
                            var15 = 26;
                        }
                        break;
                    case 34366966:
                        if (value.equals("$$028")) {
                            var15 = 27;
                        }
                        break;
                    case 34366967:
                        if (value.equals("$$029")) {
                            var15 = 28;
                        }
                        break;
                    case 34366989:
                        if (value.equals("$$030")) {
                            var15 = 29;
                        }
                        break;
                    case 34366990:
                        if (value.equals("$$031")) {
                            var15 = 30;
                        }
                        break;
                    case 34366991:
                        if (value.equals("$$032")) {
                            var15 = 31;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xcbResult.getStd());
                        break;
                    case 1:
                        textElement.setValue(xcbResult.getName());
                        break;
                    case 2:
                        textElement.setValue(xcbResult.getThkn().toString());
                        break;
                    case 3:
                        textElement.setValue(xcbResult.getL().toString());
                        break;
                    case 4:
                        textElement.setValue(xcbResult.getR().toString());
                        break;
                    case 5:
                        textElement.setValue(xcbResult.getD().toString());
                        break;
                    case 6:
                        textElement.setValue(xcbResult.getC2().toString());
                        break;
                    case 7:
                        textElement.setValue(xcbResult.getMass().toString());
                        break;
                    case 8:
                        textElement.setValue(xcbResult.getDensity().toString());
                        break;
                    case 9:
                        textElement.setValue(xcbResult.getRel().toString());
                        break;
                    case 10:
                        textElement.setValue(xcbResult.getC1().toString());
                        break;
                    case 11:
                        textElement.setValue(xcbResult.getC().toString());
                        break;
                    case 12:
                        textElement.setValue(xcbResult.getThke().toString());
                        break;
                    case 13:
                        textElement.setValue(xcbResult.getE().toString());
                        break;
                    case 14:
                        textElement.setValue(xcbResult.getK().toString());
                        break;
                    case 15:
                        textElement.setValue(xcbResult.getFv().toString());
                        break;
                    case 16:
                        textElement.setValue(xcbResult.getFh().toString());
                        break;
                    case 17:
                        textElement.setValue(xcbResult.getFl().toString());
                        break;
                    case 18:
                        textElement.setValue(xcbResult.getM().toString());
                        break;
                    case 19:
                        textElement.setValue(xcbResult.getOl().toString());
                        break;
                    case 20:
                        textElement.setValue(xcbResult.getOlallow().toString());
                        break;
                    case 21:
                        textElement.setValue(xcbResult.getOlchk());
                        break;
                    case 22:
                        textElement.setValue(xcbResult.getTl().toString());
                        break;
                    case 23:
                        textElement.setValue(xcbResult.getTlallow().toString());
                        break;
                    case 24:
                        textElement.setValue(xcbResult.getTlchk());
                        break;
                    case 25:
                        textElement.setValue(xcbResult.getA().toString());
                        break;
                    case 26:
                        textElement.setValue(xcbResult.getOa().toString());
                        break;
                    case 27:
                        textElement.setValue(xcbResult.getTa().toString());
                        break;
                    case 28:
                        textElement.setValue(xcbResult.getOb().toString());
                        break;
                    case 29:
                        textElement.setValue(xcbResult.getOab().toString());
                        break;
                    case 30:
                        textElement.setValue(xcbResult.getOaballow().toString());
                        break;
                    case 31:
                        textElement.setValue(xcbResult.getOabchk());
                        break;
                    case 32:
                        textElement.setValue("R" + xcbResult.getR().toString());
                        break;
                    case 33:
                        textElement.setValue("Φ" + xcbResult.getD().toString());
                        break;
                    case 34:
                        textElement.setValue(xcbResult.getL().toString());
                        break;
                    case 35:
                        textElement.setValue(xcbResult.getThkn().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var16) {
            var16.printStackTrace();
            return "-1";
        }
    }

    public static String getXCC(String baseFileName, XCCDocx xccResult) {
        String template = "D:/mechw/static/west/cal/x/c/c/XCC.docx";
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
                    case 36133:
                        if (value.equals("$01")) {
                            var15 = 58;
                        }
                        break;
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 59;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 60;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 61;
                        }
                        break;
                    case 36137:
                        if (value.equals("$05")) {
                            var15 = 62;
                        }
                        break;
                    case 36138:
                        if (value.equals("$06")) {
                            var15 = 63;
                        }
                        break;
                    case 36139:
                        if (value.equals("$07")) {
                            var15 = 64;
                        }
                        break;
                    case 36140:
                        if (value.equals("$08")) {
                            var15 = 65;
                        }
                        break;
                    case 36141:
                        if (value.equals("$09")) {
                            var15 = 66;
                        }
                        break;
                    case 36163:
                        if (value.equals("$10")) {
                            var15 = 67;
                        }
                        break;
                    case 36164:
                        if (value.equals("$11")) {
                            var15 = 68;
                        }
                        break;
                    case 36165:
                        if (value.equals("$12")) {
                            var15 = 69;
                        }
                        break;
                    case 36166:
                        if (value.equals("$13")) {
                            var15 = 70;
                        }
                        break;
                    case 36167:
                        if (value.equals("$14")) {
                            var15 = 71;
                        }
                        break;
                    case 36168:
                        if (value.equals("$15")) {
                            var15 = 72;
                        }
                        break;
                    case 36169:
                        if (value.equals("$16")) {
                            var15 = 73;
                        }
                        break;
                    case 36170:
                        if (value.equals("$17")) {
                            var15 = 74;
                        }
                        break;
                    case 36171:
                        if (value.equals("$18")) {
                            var15 = 75;
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
                    case 34366965:
                        if (value.equals("$$027")) {
                            var15 = 26;
                        }
                        break;
                    case 34366966:
                        if (value.equals("$$028")) {
                            var15 = 27;
                        }
                        break;
                    case 34366967:
                        if (value.equals("$$029")) {
                            var15 = 28;
                        }
                        break;
                    case 34366989:
                        if (value.equals("$$030")) {
                            var15 = 29;
                        }
                        break;
                    case 34366990:
                        if (value.equals("$$031")) {
                            var15 = 30;
                        }
                        break;
                    case 34366991:
                        if (value.equals("$$032")) {
                            var15 = 31;
                        }
                        break;
                    case 34366992:
                        if (value.equals("$$033")) {
                            var15 = 32;
                        }
                        break;
                    case 34366993:
                        if (value.equals("$$034")) {
                            var15 = 33;
                        }
                        break;
                    case 34366994:
                        if (value.equals("$$035")) {
                            var15 = 34;
                        }
                        break;
                    case 34366995:
                        if (value.equals("$$036")) {
                            var15 = 35;
                        }
                        break;
                    case 34366996:
                        if (value.equals("$$037")) {
                            var15 = 36;
                        }
                        break;
                    case 34366997:
                        if (value.equals("$$038")) {
                            var15 = 37;
                        }
                        break;
                    case 34366998:
                        if (value.equals("$$039")) {
                            var15 = 38;
                        }
                        break;
                    case 34367020:
                        if (value.equals("$$040")) {
                            var15 = 39;
                        }
                        break;
                    case 34367021:
                        if (value.equals("$$041")) {
                            var15 = 40;
                        }
                        break;
                    case 34367022:
                        if (value.equals("$$042")) {
                            var15 = 41;
                        }
                        break;
                    case 34367023:
                        if (value.equals("$$043")) {
                            var15 = 42;
                        }
                        break;
                    case 34367024:
                        if (value.equals("$$044")) {
                            var15 = 43;
                        }
                        break;
                    case 34367025:
                        if (value.equals("$$045")) {
                            var15 = 44;
                        }
                        break;
                    case 34367027:
                        if (value.equals("$$047")) {
                            var15 = 45;
                        }
                        break;
                    case 34367028:
                        if (value.equals("$$048")) {
                            var15 = 46;
                        }
                        break;
                    case 34367029:
                        if (value.equals("$$049")) {
                            var15 = 47;
                        }
                        break;
                    case 34367051:
                        if (value.equals("$$050")) {
                            var15 = 48;
                        }
                        break;
                    case 34367052:
                        if (value.equals("$$051")) {
                            var15 = 49;
                        }
                        break;
                    case 34367053:
                        if (value.equals("$$052")) {
                            var15 = 50;
                        }
                        break;
                    case 34367054:
                        if (value.equals("$$053")) {
                            var15 = 51;
                        }
                        break;
                    case 34367055:
                        if (value.equals("$$054")) {
                            var15 = 52;
                        }
                        break;
                    case 34367056:
                        if (value.equals("$$055")) {
                            var15 = 53;
                        }
                        break;
                    case 34367057:
                        if (value.equals("$$056")) {
                            var15 = 54;
                        }
                        break;
                    case 34367058:
                        if (value.equals("$$057")) {
                            var15 = 55;
                        }
                        break;
                    case 34367059:
                        if (value.equals("$$058")) {
                            var15 = 56;
                        }
                        break;
                    case 34367060:
                        if (value.equals("$$059")) {
                            var15 = 57;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xccResult.getDstd());
                        break;
                    case 1:
                        textElement.setValue(xccResult.getDname());
                        break;
                    case 2:
                        textElement.setValue(xccResult.getThkdn().toString());
                        break;
                    case 3:
                        textElement.setValue(xccResult.getDd().toString());
                        break;
                    case 4:
                        textElement.setValue(xccResult.getHd().toString());
                        break;
                    case 5:
                        textElement.setValue(xccResult.getLd().toString());
                        break;
                    case 6:
                        textElement.setValue(xccResult.getGd().toString());
                        break;
                    case 7:
                        textElement.setValue(xccResult.getFd().toString());
                        break;
                    case 8:
                        textElement.setValue(xccResult.getA().toString());
                        break;
                    case 9:
                        textElement.setValue(xccResult.getRd().toString());
                        break;
                    case 10:
                        textElement.setValue(xccResult.getCd2().toString());
                        break;
                    case 11:
                        textElement.setValue(xccResult.getCstd());
                        break;
                    case 12:
                        textElement.setValue(xccResult.getCname());
                        break;
                    case 13:
                        textElement.setValue(xccResult.getThkcn().toString());
                        break;
                    case 14:
                        textElement.setValue(xccResult.getDc().toString());
                        break;
                    case 15:
                        textElement.setValue(xccResult.getCc2().toString());
                        break;
                    case 16:
                        textElement.setValue(xccResult.getPstd());
                        break;
                    case 17:
                        textElement.setValue(xccResult.getPname());
                        break;
                    case 18:
                        textElement.setValue(xccResult.getThkpn().toString());
                        break;
                    case 19:
                        textElement.setValue(xccResult.getHp().toString());
                        break;
                    case 20:
                        textElement.setValue(xccResult.getLp().toString());
                        break;
                    case 21:
                        textElement.setValue(xccResult.getCp2().toString());
                        break;
                    case 22:
                        textElement.setValue(xccResult.getM().toString());
                        break;
                    case 23:
                        textElement.setValue(xccResult.getDensityd().toString());
                        break;
                    case 24:
                        textElement.setValue(xccResult.getDensityc().toString());
                        break;
                    case 25:
                        textElement.setValue(xccResult.getRdel().toString());
                        break;
                    case 26:
                        textElement.setValue(xccResult.getRcel().toString());
                        break;
                    case 27:
                        textElement.setValue(xccResult.getCd1().toString());
                        break;
                    case 28:
                        textElement.setValue(xccResult.getCc1().toString());
                        break;
                    case 29:
                        textElement.setValue(xccResult.getDensityp().toString());
                        break;
                    case 30:
                        textElement.setValue(xccResult.getRpel().toString());
                        break;
                    case 31:
                        textElement.setValue(xccResult.getCp1().toString());
                        break;
                    case 32:
                        textElement.setValue(xccResult.getCd().toString());
                        break;
                    case 33:
                        textElement.setValue(xccResult.getThkde().toString());
                        break;
                    case 34:
                        textElement.setValue(xccResult.getOd().toString());
                        break;
                    case 35:
                        textElement.setValue(xccResult.getTd().toString());
                        break;
                    case 36:
                        textElement.setValue(xccResult.getCc().toString());
                        break;
                    case 37:
                        textElement.setValue(xccResult.getThkce().toString());
                        break;
                    case 38:
                        textElement.setValue(xccResult.getOc().toString());
                        break;
                    case 39:
                        textElement.setValue(xccResult.getTc().toString());
                        break;
                    case 40:
                        textElement.setValue(xccResult.getCp().toString());
                        break;
                    case 41:
                        textElement.setValue(xccResult.getThkpe().toString());
                        break;
                    case 42:
                        textElement.setValue(xccResult.getOp().toString());
                        break;
                    case 43:
                        textElement.setValue(xccResult.getTp().toString());
                        break;
                    case 44:
                        textElement.setValue(xccResult.getK().toString());
                        break;
                    case 45:
                        textElement.setValue(xccResult.getFv().toString());
                        break;
                    case 46:
                        textElement.setValue(xccResult.getOl().toString());
                        break;
                    case 47:
                        textElement.setValue(xccResult.getOlallow().toString());
                        break;
                    case 48:
                        textElement.setValue(xccResult.getOlchk());
                        break;
                    case 49:
                        textElement.setValue(xccResult.getTl().toString());
                        break;
                    case 50:
                        textElement.setValue(xccResult.getTlallow().toString());
                        break;
                    case 51:
                        textElement.setValue(xccResult.getTlchk());
                        break;
                    case 52:
                        textElement.setValue(xccResult.getTw().toString());
                        break;
                    case 53:
                        textElement.setValue(xccResult.getTwallow().toString());
                        break;
                    case 54:
                        textElement.setValue(xccResult.getTwchk());
                        break;
                    case 55:
                        textElement.setValue(xccResult.getTb().toString());
                        break;
                    case 56:
                        textElement.setValue(xccResult.getTballow().toString());
                        break;
                    case 57:
                        textElement.setValue(xccResult.getTbchk());
                        break;
                    case 58:
                        textElement.setValue(xccResult.getThkcn().toString());
                        break;
                    case 59:
                        textElement.setValue(xccResult.getThkcn().toString());
                        break;
                    case 60:
                        textElement.setValue(Double.toString(0.8D * xccResult.getThkcn()));
                        break;
                    case 61:
                        textElement.setValue(xccResult.getThkdn().toString());
                        break;
                    case 62:
                        textElement.setValue(xccResult.getA().toString());
                        break;
                    case 63:
                        textElement.setValue(xccResult.getThkdn().toString());
                        break;
                    case 64:
                        textElement.setValue(xccResult.getA().toString());
                        break;
                    case 65:
                        textElement.setValue(xccResult.getThkpn().toString());
                        break;
                    case 66:
                        textElement.setValue(Double.toString(0.8D * xccResult.getThkpn()));
                        break;
                    case 67:
                        textElement.setValue("Φ" + xccResult.getDc().toString());
                        break;
                    case 68:
                        textElement.setValue("Φ" + xccResult.getDd().toString());
                        break;
                    case 69:
                        textElement.setValue(xccResult.getHd().toString());
                        break;
                    case 70:
                        textElement.setValue(xccResult.getFd().toString());
                        break;
                    case 71:
                        textElement.setValue("R" + xccResult.getRd().toString());
                        break;
                    case 72:
                        textElement.setValue(xccResult.getLp().toString());
                        break;
                    case 73:
                        textElement.setValue(xccResult.getHp().toString());
                        break;
                    case 74:
                        textElement.setValue(xccResult.getLp().toString());
                        break;
                    case 75:
                        textElement.setValue(xccResult.getGd().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var16) {
            var16.printStackTrace();
            return "-1";
        }
    }

    public static String getXCD(String baseFileName, XCDDocx xcdResult) {
        String template = "D:/mechw/static/west/cal/x/c/d/XCD.docx";
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
                    case 36133:
                        if (value.equals("$01")) {
                            var15 = 25;
                        }
                        break;
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 26;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 27;
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
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xcdResult.getStd());
                        break;
                    case 1:
                        textElement.setValue(xcdResult.getName());
                        break;
                    case 2:
                        textElement.setValue(xcdResult.getDout().toString());
                        break;
                    case 3:
                        textElement.setValue(xcdResult.getThkn().toString());
                        break;
                    case 4:
                        textElement.setValue(xcdResult.getL().toString());
                        break;
                    case 5:
                        textElement.setValue(xcdResult.getC2().toString());
                        break;
                    case 6:
                        textElement.setValue(xcdResult.getMass().toString());
                        break;
                    case 7:
                        textElement.setValue(xcdResult.getDensity().toString());
                        break;
                    case 8:
                        textElement.setValue(xcdResult.getRel().toString());
                        break;
                    case 9:
                        textElement.setValue(xcdResult.getC1().toString());
                        break;
                    case 10:
                        textElement.setValue(xcdResult.getC().toString());
                        break;
                    case 11:
                        textElement.setValue(xcdResult.getThke().toString());
                        break;
                    case 12:
                        textElement.setValue(xcdResult.getO().toString());
                        break;
                    case 13:
                        textElement.setValue(xcdResult.getK().toString());
                        break;
                    case 14:
                        textElement.setValue(xcdResult.getFv().toString());
                        break;
                    case 15:
                        textElement.setValue(xcdResult.getFh().toString());
                        break;
                    case 16:
                        textElement.setValue(xcdResult.getM().toString());
                        break;
                    case 17:
                        textElement.setValue(xcdResult.getA().toString());
                        break;
                    case 18:
                        textElement.setValue(xcdResult.getAlpha().toString());
                        break;
                    case 19:
                        textElement.setValue(xcdResult.getJ().toString());
                        break;
                    case 20:
                        textElement.setValue(xcdResult.getW().toString());
                        break;
                    case 21:
                        textElement.setValue(xcdResult.getOlt().toString());
                        break;
                    case 22:
                        textElement.setValue(xcdResult.getOlb().toString());
                        break;
                    case 23:
                        textElement.setValue(xcdResult.getOl().toString());
                        break;
                    case 24:
                        textElement.setValue(xcdResult.getOlchk());
                        break;
                    case 25:
                        textElement.setValue("Φ" + xcdResult.getDout().toString());
                        break;
                    case 26:
                        textElement.setValue(xcdResult.getThkn().toString());
                        break;
                    case 27:
                        textElement.setValue(xcdResult.getL().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var16) {
            var16.printStackTrace();
            return "-1";
        }
    }

    public static String getXCE(String baseFileName, XCEDocx xceResult) {
        String template = "D:/mechw/static/west/cal/x/c/e/XCE.docx";
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
                    case 36133:
                        if (value.equals("$01")) {
                            var15 = 41;
                        }
                        break;
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 42;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 43;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 44;
                        }
                        break;
                    case 36137:
                        if (value.equals("$05")) {
                            var15 = 45;
                        }
                        break;
                    case 36138:
                        if (value.equals("$06")) {
                            var15 = 46;
                        }
                        break;
                    case 36139:
                        if (value.equals("$07")) {
                            var15 = 47;
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
                    case 34366965:
                        if (value.equals("$$027")) {
                            var15 = 26;
                        }
                        break;
                    case 34366966:
                        if (value.equals("$$028")) {
                            var15 = 27;
                        }
                        break;
                    case 34366967:
                        if (value.equals("$$029")) {
                            var15 = 28;
                        }
                        break;
                    case 34366989:
                        if (value.equals("$$030")) {
                            var15 = 29;
                        }
                        break;
                    case 34366990:
                        if (value.equals("$$031")) {
                            var15 = 30;
                        }
                        break;
                    case 34366991:
                        if (value.equals("$$032")) {
                            var15 = 31;
                        }
                        break;
                    case 34366992:
                        if (value.equals("$$033")) {
                            var15 = 32;
                        }
                        break;
                    case 34366993:
                        if (value.equals("$$034")) {
                            var15 = 33;
                        }
                        break;
                    case 34366994:
                        if (value.equals("$$035")) {
                            var15 = 34;
                        }
                        break;
                    case 34366995:
                        if (value.equals("$$036")) {
                            var15 = 35;
                        }
                        break;
                    case 34366996:
                        if (value.equals("$$037")) {
                            var15 = 36;
                        }
                        break;
                    case 34366997:
                        if (value.equals("$$038")) {
                            var15 = 37;
                        }
                        break;
                    case 34366998:
                        if (value.equals("$$039")) {
                            var15 = 38;
                        }
                        break;
                    case 34367020:
                        if (value.equals("$$040")) {
                            var15 = 39;
                        }
                        break;
                    case 34367021:
                        if (value.equals("$$041")) {
                            var15 = 40;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xceResult.getDstd());
                        break;
                    case 1:
                        textElement.setValue(xceResult.getDname());
                        break;
                    case 2:
                        textElement.setValue(xceResult.getThkdn().toString());
                        break;
                    case 3:
                        textElement.setValue(xceResult.getHd().toString());
                        break;
                    case 4:
                        textElement.setValue(xceResult.getB().toString());
                        break;
                    case 5:
                        textElement.setValue(xceResult.getDd().toString());
                        break;
                    case 6:
                        textElement.setValue(xceResult.getA().toString());
                        break;
                    case 7:
                        textElement.setValue(xceResult.getCd2().toString());
                        break;
                    case 8:
                        textElement.setValue(xceResult.getCstd());
                        break;
                    case 9:
                        textElement.setValue(xceResult.getCname());
                        break;
                    case 10:
                        textElement.setValue(xceResult.getThkcn().toString());
                        break;
                    case 11:
                        textElement.setValue(xceResult.getDc().toString());
                        break;
                    case 12:
                        textElement.setValue(xceResult.getCc2().toString());
                        break;
                    case 13:
                        textElement.setValue(xceResult.getMass().toString());
                        break;
                    case 14:
                        textElement.setValue(xceResult.getDensityd().toString());
                        break;
                    case 15:
                        textElement.setValue(xceResult.getDensityc().toString());
                        break;
                    case 16:
                        textElement.setValue(xceResult.getCd1().toString());
                        break;
                    case 17:
                        textElement.setValue(xceResult.getCc1().toString());
                        break;
                    case 18:
                        textElement.setValue(xceResult.getRdel().toString());
                        break;
                    case 19:
                        textElement.setValue(xceResult.getRcel().toString());
                        break;
                    case 20:
                        textElement.setValue(xceResult.getCd().toString());
                        break;
                    case 21:
                        textElement.setValue(xceResult.getThkde().toString());
                        break;
                    case 22:
                        textElement.setValue(xceResult.getOd().toString());
                        break;
                    case 23:
                        textElement.setValue(xceResult.getTd().toString());
                        break;
                    case 24:
                        textElement.setValue(xceResult.getCc().toString());
                        break;
                    case 25:
                        textElement.setValue(xceResult.getThkce().toString());
                        break;
                    case 26:
                        textElement.setValue(xceResult.getOc().toString());
                        break;
                    case 27:
                        textElement.setValue(xceResult.getTc().toString());
                        break;
                    case 28:
                        textElement.setValue(xceResult.getE().toString());
                        break;
                    case 29:
                        textElement.setValue(xceResult.getK().toString());
                        break;
                    case 30:
                        textElement.setValue(xceResult.getFv().toString());
                        break;
                    case 31:
                        textElement.setValue(xceResult.getOl().toString());
                        break;
                    case 32:
                        textElement.setValue(xceResult.getOlallow().toString());
                        break;
                    case 33:
                        textElement.setValue(xceResult.getOlchk());
                        break;
                    case 34:
                        textElement.setValue(xceResult.getTl().toString());
                        break;
                    case 35:
                        textElement.setValue(xceResult.getTlallow().toString());
                        break;
                    case 36:
                        textElement.setValue(xceResult.getTlchk());
                        break;
                    case 37:
                        textElement.setValue(xceResult.getArea().toString());
                        break;
                    case 38:
                        textElement.setValue(xceResult.getOa().toString());
                        break;
                    case 39:
                        textElement.setValue(xceResult.getOaallow().toString());
                        break;
                    case 40:
                        textElement.setValue(xceResult.getOachk());
                        break;
                    case 41:
                        textElement.setValue(xceResult.getThkdn().toString());
                        break;
                    case 42:
                        textElement.setValue(xceResult.getHd().toString());
                        break;
                    case 43:
                        textElement.setValue(xceResult.getB().toString());
                        break;
                    case 44:
                        textElement.setValue("Φ" + xceResult.getDd().toString());
                        break;
                    case 45:
                        textElement.setValue(xceResult.getThkcn().toString());
                        break;
                    case 46:
                        textElement.setValue(xceResult.getThkcn().toString());
                        break;
                    case 47:
                        textElement.setValue("Φ" + xceResult.getDc().toString());
                }
            }

            wordMLPackage.save(docFile);
            return "/data" + baseFileName + ".docx";
        } catch (Exception var16) {
            var16.printStackTrace();
            return "-1";
        }
    }
}
