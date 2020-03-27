package com.mechw.service.docx.a;

import com.mechw.model.front.a.b.ABADocx;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxAB extends DocxTool {

    public static String getABA(String baseFileName, ABADocx abaResult) {

        String template;
        if (abaResult.getTest().equals("液压试验")) {
            template = "D:/mechw/static/west/cal/a/b/a/ABAL.docx";
        } else {
            template = "D:/mechw/static/west/cal/a/b/a/ABAG.docx";
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
                    case 36137:
                        if (var13.equals("$05")) {
                            var14 = 24;
                        }
                        break;
                    case 36138:
                        if (var13.equals("$06")) {
                            var14 = 25;
                        }
                        break;
                    case 36139:
                        if (var13.equals("$07")) {
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
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(abaResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(abaResult.getT().toString());
                        break;
                    case 2:
                        textElement.setValue(abaResult.getStdc());
                        break;
                    case 3:
                        textElement.setValue(abaResult.getNamec());
                        break;
                    case 4:
                        textElement.setValue(abaResult.getDsi().toString());
                        break;
                    case 5:
                        textElement.setValue(abaResult.getAlpha().toString());
                        break;
                    case 6:
                        textElement.setValue(abaResult.getThkcn().toString());
                        break;
                    case 7:
                        textElement.setValue(abaResult.getCc2().toString());
                        break;
                    case 8:
                        textElement.setValue(abaResult.getEc().toString());
                        break;
                    case 9:
                        textElement.setValue(abaResult.getTest());
                        break;
                    case 10:
                        textElement.setValue(abaResult.getDc().toString());
                        break;
                    case 11:
                        textElement.setValue(abaResult.getCc1().toString());
                        break;
                    case 12:
                        textElement.setValue(abaResult.getOct().toString());
                        break;
                    case 13:
                        textElement.setValue(abaResult.getEct().toString());
                        break;
                    case 14:
                        textElement.setValue(abaResult.getCc().toString());
                        break;
                    case 15:
                        textElement.setValue(abaResult.getThkce().toString());
                        break;
                    case 16:
                        textElement.setValue(abaResult.getGamma().toString());
                        break;
                    case 17:
                        textElement.setValue(abaResult.getK().toString());
                        break;
                    case 18:
                        textElement.setValue(abaResult.getNy().toString());
                        break;
                    case 19:
                        textElement.setValue(abaResult.getPe().toString());
                        break;
                    case 20:
                        textElement.setValue(abaResult.getPh().toString());
                        break;
                    case 21:
                        textElement.setValue(abaResult.getP().toString());
                        break;
                    case 22:
                        textElement.setValue(abaResult.getPchk());
                        break;
                    case 23:
                        textElement.setValue(abaResult.getPct().toString());
                        break;
                    case 24:
                        textElement.setValue("Φ" + abaResult.getDsi().toString());
                        break;
                    case 25:
                        textElement.setValue(abaResult.getAlpha().toString() + "°");
                        break;
                    case 26:
                        textElement.setValue(abaResult.getThkcn().toString());
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
