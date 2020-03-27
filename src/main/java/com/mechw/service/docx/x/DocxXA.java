package com.mechw.service.docx.x;

import com.mechw.model.front.x.a.*;
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

public class DocxXA extends DocxTool {

    /**
     * xaa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xaaResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getXAA(String baseFileName, XAADocx xaaResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/x/a/a/XAA.docx";

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
                        textElement.setValue(xaaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xaaResult.getVl().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xaaResult.getStd());
                        break;
                    case "$$004":
                        textElement.setValue(xaaResult.getName());
                        break;
                    case "$$005":
                        textElement.setValue(xaaResult.getC2().toString());
                        break;
                    case "$$006":
                        textElement.setValue(xaaResult.getSh().toString());
                        break;
                    case "$$007":
                        textElement.setValue(xaaResult.getThkn().toString());
                        break;
                    case "$$008":
                        textElement.setValue(xaaResult.getL().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xaaResult.getDelta().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xaaResult.getPack());
                        break;
                    case "$$011":
                        textElement.setValue(xaaResult.getV().toString());
                        break;
                    case "$$012":
                        textElement.setValue(xaaResult.getBh().toString());
                        break;
                    case "$$013":
                        textElement.setValue(xaaResult.getDensity().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xaaResult.getRel().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xaaResult.getOt().toString());
                        break;
                    case "$$016":
                        textElement.setValue(xaaResult.getC1().toString());
                        break;
                    case "$$017":
                        textElement.setValue(xaaResult.getC().toString());
                        break;
                    case "$$018":
                        textElement.setValue(xaaResult.getThke().toString());
                        break;
                    case "$$019":
                        textElement.setValue(xaaResult.getG().toString());
                        break;
                    case "$$020":
                        textElement.setValue(xaaResult.getMp().toString());
                        break;
                    case "$$021":
                        textElement.setValue(xaaResult.getK().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xaaResult.getMl().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xaaResult.getQ().toString());
                        break;
                    case "$$024":
                        textElement.setValue(xaaResult.getO().toString());
                        break;
                    case "$$025":
                        textElement.setValue(xaaResult.getOchk());
                        break;
                    case "$06":
                        textElement.setValue(xaaResult.getSh().toString());
                        break;
                    case "$07":
                        textElement.setValue(xaaResult.getThkn().toString());
                        break;
                    case "$08":
                        textElement.setValue(xaaResult.getL().toString());
                        break;
                    case "$09":
                        textElement.setValue(xaaResult.getDelta().toString());
                        break;
                    case "$12":
                        textElement.setValue(xaaResult.getBh().toString());
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
     * xaba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xabaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXABA(String baseFileName, XABADocx xabaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (xabaResult.getL() <= 2000) {
            template = "D:/mechw/static/west/cal/x/a/b/a/XABALN2.docx";
        } else {
            template = "D:/mechw/static/west/cal/x/a/b/a/XABALP2.docx";
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
                        textElement.setValue(xabaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xabaResult.getM1().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xabaResult.getM2().toString());
                        break;
                    case "$$004":
                        textElement.setValue(xabaResult.getM3().toString());
                        break;
                    case "$$005":
                        textElement.setValue(xabaResult.getStd());
                        break;
                    case "$$006":
                        textElement.setValue(xabaResult.getName());
                        break;
                    case "$$007":
                        textElement.setValue(xabaResult.getC2().toString());
                        break;
                    case "$$008":
                        textElement.setValue(xabaResult.getThkhn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xabaResult.getThkvn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xabaResult.getWn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(xabaResult.getH().toString());
                        break;
                    case "$$012":
                        textElement.setValue(xabaResult.getL().toString());
                        break;
                    case "$$013":
                        textElement.setValue(xabaResult.getCh1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xabaResult.getOh().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xabaResult.getOht().toString());
                        break;
                    case "$$016":
                        textElement.setValue(xabaResult.getRhtel().toString());
                        break;
                    case "$$017":
                        textElement.setValue(xabaResult.getDensity().toString());
                        break;
                    case "$$019":
                        textElement.setValue(xabaResult.getCv1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(xabaResult.getOv().toString());
                        break;
                    case "$$021":
                        textElement.setValue(xabaResult.getOvt().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xabaResult.getRvtel().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xabaResult.getEt().toString());
                        break;
                    case "$$024":
                        textElement.setValue(xabaResult.getG().toString());
                        break;
                    case "$$025":
                        textElement.setValue(xabaResult.getCh().toString());
                        break;
                    case "$$026":
                        textElement.setValue(xabaResult.getThkhe().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xabaResult.getCv().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xabaResult.getThkve().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xabaResult.getWe().toString());
                        break;
                    case "$$030":
                        textElement.setValue(xabaResult.getHe().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xabaResult.getM4().toString());
                        break;
                    case "$$032":
                        textElement.setValue(xabaResult.getJ().toString());
                        break;
                    case "$$033":
                        textElement.setValue(xabaResult.getW().toString());
                        break;
                    case "$$034":
                        textElement.setValue(xabaResult.getOallow().toString());
                        break;
                    case "$$035":
                        textElement.setValue(xabaResult.getOtallow().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xabaResult.getRtel().toString());
                        break;
                    case "$$037":
                        textElement.setValue(xabaResult.getQ1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(xabaResult.getQ2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(xabaResult.getQ3().toString());
                        break;
                    case "$$040":
                        textElement.setValue(xabaResult.getQ4().toString());
                        break;
                    case "$$041":
                        textElement.setValue(xabaResult.getQ().toString());
                        break;
                    case "$$042":
                        textElement.setValue(xabaResult.getMtmax().toString());
                        break;
                    case "$$043":
                        textElement.setValue(xabaResult.getOt().toString());
                        break;
                    case "$$044":
                        textElement.setValue(xabaResult.getOtchk());
                        break;
                    case "$$045":
                        textElement.setValue(xabaResult.getY().toString());
                        break;
                    case "$$046":
                        textElement.setValue(xabaResult.getYallow().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xabaResult.getYchk());
                        break;
                    case "$$048":
                        textElement.setValue(xabaResult.getXigema().toString());
                        break;
                    case "$$049":
                        textElement.setValue(xabaResult.getBetab().toString());
                        break;
                    case "$$050":
                        textElement.setValue(xabaResult.getLamuday().toString());
                        break;
                    case "$$051":
                        textElement.setValue(xabaResult.getA().toString());
                        break;
                    case "$$052":
                        textElement.setValue(xabaResult.getEb().toString());
                        break;
                    case "$$053":
                        textElement.setValue(xabaResult.getE().toString());
                        break;
                    case "$$054":
                        textElement.setValue(xabaResult.getObt().toString());
                        break;
                    case "$$055":
                        textElement.setValue(xabaResult.getObtchk());
                        break;
                    case "$$056":
                        textElement.setValue(xabaResult.getF().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xabaResult.getMmax().toString());
                        break;
                    case "$$058":
                        textElement.setValue(xabaResult.getO().toString());
                        break;
                    case "$$059":
                        textElement.setValue(xabaResult.getOchk());
                        break;

                    case "$$100":
                        textElement.setValue(xabaResult.getN().toString());
                        break;
                    case "$$101":
                        textElement.setValue(xabaResult.getK().toString());
                        break;

                    case "$08":
                        textElement.setValue(xabaResult.getThkhn().toString());
                        break;
                    case "$09":
                        textElement.setValue(xabaResult.getThkvn().toString());
                        break;
                    case "$10":
                        textElement.setValue(xabaResult.getWn().toString());
                        break;
                    case "$11":
                        textElement.setValue(xabaResult.getH().toString());
                        break;
                    case "$12":
                        textElement.setValue(xabaResult.getL().toString());
                        break;

                    case "L/3":
                        textElement.setValue(Double.toString(Math.round(xabaResult.getL() / 3.0 * 100) / 100.0));
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
     * xabb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xabbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXABB(String baseFileName, XABBDocx xabbResult) {
        String template;
        if (xabbResult.getL() <= 2000.0D) {
            template = "D:/mechw/static/west/cal/x/a/b/b/XABBLN2.docx";
        } else {
            template = "D:/mechw/static/west/cal/x/a/b/b/XABBLP2.docx";
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
                    case 36140:
                        if (var13.equals("$08")) {
                            var14 = 62;
                        }
                        break;
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 63;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 64;
                        }
                        break;
                    case 36164:
                        if (var13.equals("$11")) {
                            var14 = 65;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 66;
                        }
                        break;
                    case 74544:
                        if (var13.equals("L/3")) {
                            var14 = 67;
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
                        break;
                    case 34366995:
                        if (var13.equals("$$036")) {
                            var14 = 34;
                        }
                        break;
                    case 34366996:
                        if (var13.equals("$$037")) {
                            var14 = 35;
                        }
                        break;
                    case 34366997:
                        if (var13.equals("$$038")) {
                            var14 = 36;
                        }
                        break;
                    case 34366998:
                        if (var13.equals("$$039")) {
                            var14 = 37;
                        }
                        break;
                    case 34367020:
                        if (var13.equals("$$040")) {
                            var14 = 38;
                        }
                        break;
                    case 34367021:
                        if (var13.equals("$$041")) {
                            var14 = 39;
                        }
                        break;
                    case 34367022:
                        if (var13.equals("$$042")) {
                            var14 = 40;
                        }
                        break;
                    case 34367023:
                        if (var13.equals("$$043")) {
                            var14 = 41;
                        }
                        break;
                    case 34367024:
                        if (var13.equals("$$044")) {
                            var14 = 42;
                        }
                        break;
                    case 34367025:
                        if (var13.equals("$$045")) {
                            var14 = 43;
                        }
                        break;
                    case 34367026:
                        if (var13.equals("$$046")) {
                            var14 = 44;
                        }
                        break;
                    case 34367027:
                        if (var13.equals("$$047")) {
                            var14 = 45;
                        }
                        break;
                    case 34367053:
                        if (var13.equals("$$052")) {
                            var14 = 46;
                        }
                        break;
                    case 34367054:
                        if (var13.equals("$$053")) {
                            var14 = 47;
                        }
                        break;
                    case 34367055:
                        if (var13.equals("$$054")) {
                            var14 = 48;
                        }
                        break;
                    case 34367056:
                        if (var13.equals("$$055")) {
                            var14 = 49;
                        }
                        break;
                    case 34367057:
                        if (var13.equals("$$056")) {
                            var14 = 50;
                        }
                        break;
                    case 34367058:
                        if (var13.equals("$$057")) {
                            var14 = 51;
                        }
                        break;
                    case 34367059:
                        if (var13.equals("$$058")) {
                            var14 = 52;
                        }
                        break;
                    case 34367060:
                        if (var13.equals("$$059")) {
                            var14 = 53;
                        }
                        break;
                    case 34367857:
                        if (var13.equals("$$100")) {
                            var14 = 54;
                        }
                        break;
                    case 34367858:
                        if (var13.equals("$$101")) {
                            var14 = 55;
                        }
                        break;
                    case 34368818:
                        if (var13.equals("$$200")) {
                            var14 = 56;
                        }
                        break;
                    case 34368819:
                        if (var13.equals("$$201")) {
                            var14 = 57;
                        }
                        break;
                    case 34368820:
                        if (var13.equals("$$202")) {
                            var14 = 58;
                        }
                        break;
                    case 34368821:
                        if (var13.equals("$$203")) {
                            var14 = 59;
                        }
                        break;
                    case 34368822:
                        if (var13.equals("$$204")) {
                            var14 = 60;
                        }
                        break;
                    case 34368823:
                        if (var13.equals("$$205")) {
                            var14 = 61;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(xabbResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(xabbResult.getM1().toString());
                        break;
                    case 2:
                        textElement.setValue(xabbResult.getM2().toString());
                        break;
                    case 3:
                        textElement.setValue(xabbResult.getM3().toString());
                        break;
                    case 4:
                        textElement.setValue(xabbResult.getStd());
                        break;
                    case 5:
                        textElement.setValue(xabbResult.getName());
                        break;
                    case 6:
                        textElement.setValue(xabbResult.getC2().toString());
                        break;
                    case 7:
                        textElement.setValue(xabbResult.getThkhn().toString());
                        break;
                    case 8:
                        textElement.setValue(xabbResult.getThkvn().toString());
                        break;
                    case 9:
                        textElement.setValue(xabbResult.getWn().toString());
                        break;
                    case 10:
                        textElement.setValue(xabbResult.getH().toString());
                        break;
                    case 11:
                        textElement.setValue(xabbResult.getL().toString());
                        break;
                    case 12:
                        textElement.setValue(xabbResult.getCh1().toString());
                        break;
                    case 13:
                        textElement.setValue(xabbResult.getOh().toString());
                        break;
                    case 14:
                        textElement.setValue(xabbResult.getOht().toString());
                        break;
                    case 15:
                        textElement.setValue(xabbResult.getRhtel().toString());
                        break;
                    case 16:
                        textElement.setValue(xabbResult.getDensity().toString());
                        break;
                    case 17:
                        textElement.setValue(xabbResult.getCv1().toString());
                        break;
                    case 18:
                        textElement.setValue(xabbResult.getOv().toString());
                        break;
                    case 19:
                        textElement.setValue(xabbResult.getOvt().toString());
                        break;
                    case 20:
                        textElement.setValue(xabbResult.getRvtel().toString());
                        break;
                    case 21:
                        textElement.setValue(xabbResult.getEt().toString());
                        break;
                    case 22:
                        textElement.setValue(xabbResult.getG().toString());
                        break;
                    case 23:
                        textElement.setValue(xabbResult.getCh().toString());
                        break;
                    case 24:
                        textElement.setValue(xabbResult.getThkhe().toString());
                        break;
                    case 25:
                        textElement.setValue(xabbResult.getCv().toString());
                        break;
                    case 26:
                        textElement.setValue(xabbResult.getThkve().toString());
                        break;
                    case 27:
                        textElement.setValue(xabbResult.getWe().toString());
                        break;
                    case 28:
                        textElement.setValue(xabbResult.getHe().toString());
                        break;
                    case 29:
                        textElement.setValue(xabbResult.getM4().toString());
                        break;
                    case 30:
                        textElement.setValue(xabbResult.getJ().toString());
                        break;
                    case 31:
                        textElement.setValue(xabbResult.getW().toString());
                        break;
                    case 32:
                        textElement.setValue(xabbResult.getOallow().toString());
                        break;
                    case 33:
                        textElement.setValue(xabbResult.getOtallow().toString());
                        break;
                    case 34:
                        textElement.setValue(xabbResult.getRtel().toString());
                        break;
                    case 35:
                        textElement.setValue(xabbResult.getQ1().toString());
                        break;
                    case 36:
                        textElement.setValue(xabbResult.getQ2().toString());
                        break;
                    case 37:
                        textElement.setValue(xabbResult.getQ3().toString());
                        break;
                    case 38:
                        textElement.setValue(xabbResult.getQ4().toString());
                        break;
                    case 39:
                        textElement.setValue(xabbResult.getQ().toString());
                        break;
                    case 40:
                        textElement.setValue(xabbResult.getMtmax().toString());
                        break;
                    case 41:
                        textElement.setValue(xabbResult.getOt().toString());
                        break;
                    case 42:
                        textElement.setValue(xabbResult.getOtchk());
                        break;
                    case 43:
                        textElement.setValue(xabbResult.getY().toString());
                        break;
                    case 44:
                        textElement.setValue(xabbResult.getYallow().toString());
                        break;
                    case 45:
                        textElement.setValue(xabbResult.getYchk());
                        break;
                    case 46:
                        textElement.setValue(xabbResult.getEb().toString());
                        break;
                    case 47:
                        textElement.setValue(xabbResult.getE().toString());
                        break;
                    case 48:
                        textElement.setValue(xabbResult.getObt().toString());
                        break;
                    case 49:
                        textElement.setValue(xabbResult.getObtchk());
                        break;
                    case 50:
                        textElement.setValue(xabbResult.getF().toString());
                        break;
                    case 51:
                        textElement.setValue(xabbResult.getMmax().toString());
                        break;
                    case 52:
                        textElement.setValue(xabbResult.getO().toString());
                        break;
                    case 53:
                        textElement.setValue(xabbResult.getOchk());
                        break;
                    case 54:
                        textElement.setValue(xabbResult.getN().toString());
                        break;
                    case 55:
                        textElement.setValue(xabbResult.getK().toString());
                        break;
                    case 56:
                        textElement.setValue(xabbResult.getB().toString());
                        break;
                    case 57:
                        textElement.setValue(xabbResult.getEy1().toString());
                        break;
                    case 58:
                        textElement.setValue(xabbResult.getEy2().toString());
                        break;
                    case 59:
                        textElement.setValue(xabbResult.getS().toString());
                        break;
                    case 60:
                        textElement.setValue(xabbResult.getLt().toString());
                        break;
                    case 61:
                        textElement.setValue(xabbResult.getThkm().toString());
                        break;
                    case 62:
                        textElement.setValue(xabbResult.getThkhn().toString());
                        break;
                    case 63:
                        textElement.setValue(xabbResult.getThkvn().toString());
                        break;
                    case 64:
                        textElement.setValue(xabbResult.getWn().toString());
                        break;
                    case 65:
                        textElement.setValue(xabbResult.getH().toString());
                        break;
                    case 66:
                        textElement.setValue(xabbResult.getL().toString());
                        break;
                    case 67:
                        textElement.setValue(Double.toString((double) (Math.round(xabbResult.getL() / 3.0D * 100.0D) / 100L)));
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
     * xabc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xabcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXABC(String baseFileName, XABCDocx xabcResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (xabcResult.getL() <= 2000) {
            template = "D:/mechw/static/west/cal/x/a/b/c/XABCLN2.docx";
        } else {
            template = "D:/mechw/static/west/cal/x/a/b/c/XABCLP2.docx";
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
                        textElement.setValue(xabcResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xabcResult.getM1().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xabcResult.getM2().toString());
                        break;
                    case "$$004":
                        textElement.setValue(xabcResult.getM3().toString());
                        break;
                    case "$$005":
                        textElement.setValue(xabcResult.getStd());
                        break;
                    case "$$006":
                        textElement.setValue(xabcResult.getName());
                        break;
                    case "$$007":
                        textElement.setValue(xabcResult.getC2().toString());
                        break;

                    case "$$008":
                        textElement.setValue(xabcResult.getThkhn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xabcResult.getThkvn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xabcResult.getWn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(xabcResult.getH().toString());
                        break;
                    case "$$012":
                        textElement.setValue(xabcResult.getL().toString());
                        break;

                    case "$$100":
                        textElement.setValue(xabcResult.getN().toString());
                        break;

                    case "$$013":
                        textElement.setValue(xabcResult.getCh1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xabcResult.getOh().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xabcResult.getOht().toString());
                        break;
                    case "$$016":
                        textElement.setValue(xabcResult.getRhtel().toString());
                        break;
                    case "$$017":
                        textElement.setValue(xabcResult.getDensity().toString());
                        break;

                    case "$$019":
                        textElement.setValue(xabcResult.getCv1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(xabcResult.getOv().toString());
                        break;
                    case "$$021":
                        textElement.setValue(xabcResult.getOvt().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xabcResult.getRvtel().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xabcResult.getEt().toString());
                        break;

                    case "$$101":
                        textElement.setValue(xabcResult.getK().toString());
                        break;

                    case "$$024":
                        textElement.setValue(xabcResult.getG().toString());
                        break;
                    case "$$025":
                        textElement.setValue(xabcResult.getCh().toString());
                        break;
                    case "$$026":
                        textElement.setValue(xabcResult.getThkhe().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xabcResult.getCv().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xabcResult.getThkve().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xabcResult.getWe().toString());
                        break;
                    case "$$030":
                        textElement.setValue(xabcResult.getHe().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xabcResult.getM4().toString());
                        break;

                    case "$$200":
                        textElement.setValue(xabcResult.getU().toString());
                        break;
                    case "$$201":
                        textElement.setValue(xabcResult.getEy1().toString());
                        break;
                    case "$$202":
                        textElement.setValue(xabcResult.getEy2().toString());
                        break;
                    case "$$203":
                        textElement.setValue(xabcResult.getS().toString());
                        break;

                    case "$$032":
                        textElement.setValue(xabcResult.getJ().toString());
                        break;
                    case "$$033":
                        textElement.setValue(xabcResult.getW().toString());
                        break;
                    case "$$034":
                        textElement.setValue(xabcResult.getOallow().toString());
                        break;
                    case "$$035":
                        textElement.setValue(xabcResult.getOtallow().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xabcResult.getRtel().toString());
                        break;

                    case "$$037":
                        textElement.setValue(xabcResult.getQ1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(xabcResult.getQ2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(xabcResult.getQ3().toString());
                        break;
                    case "$$040":
                        textElement.setValue(xabcResult.getQ4().toString());
                        break;
                    case "$$041":
                        textElement.setValue(xabcResult.getQ().toString());
                        break;
                    case "$$042":
                        textElement.setValue(xabcResult.getMtmax().toString());
                        break;
                    case "$$043":
                        textElement.setValue(xabcResult.getOt().toString());
                        break;
                    case "$$044":
                        textElement.setValue(xabcResult.getOtchk());
                        break;
                    case "$$045":
                        textElement.setValue(xabcResult.getY().toString());
                        break;
                    case "$$046":
                        textElement.setValue(xabcResult.getYallow().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xabcResult.getYchk());
                        break;

                    case "$$056":
                        textElement.setValue(xabcResult.getF().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xabcResult.getMmax().toString());
                        break;
                    case "$$058":
                        textElement.setValue(xabcResult.getO().toString());
                        break;
                    case "$$059":
                        textElement.setValue(xabcResult.getOchk());
                        break;

                    case "$08":
                        textElement.setValue(xabcResult.getThkhn().toString());
                        break;
                    case "$09":
                        textElement.setValue(xabcResult.getThkvn().toString());
                        break;
                    case "$10":
                        textElement.setValue(xabcResult.getWn().toString());
                        break;
                    case "$11":
                        textElement.setValue(xabcResult.getH().toString());
                        break;
                    case "$12":
                        textElement.setValue(xabcResult.getL().toString());
                        break;

                    case "L/3":
                        textElement.setValue(Double.toString(Math.round(xabcResult.getL() / 3.0 * 100) / 100.0));
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
     * xabd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xabdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXABD(String baseFileName, XABDDocx xabdResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (xabdResult.getL() <= 2000) {
            template = "D:/mechw/static/west/cal/x/a/b/d/XABDLN2.docx";
        } else {
            template = "D:/mechw/static/west/cal/x/a/b/d/XABDLP2.docx";
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
                        textElement.setValue(xabdResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xabdResult.getM1().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xabdResult.getM2().toString());
                        break;
                    case "$$004":
                        textElement.setValue(xabdResult.getM3().toString());
                        break;
                    case "$$005":
                        textElement.setValue(xabdResult.getStd());
                        break;
                    case "$$006":
                        textElement.setValue(xabdResult.getName());
                        break;
                    case "$$007":
                        textElement.setValue(xabdResult.getC2().toString());
                        break;

                    case "$$008":
                        textElement.setValue(xabdResult.getThkhn().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xabdResult.getThkvn().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xabdResult.getWn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(xabdResult.getH().toString());
                        break;
                    case "$$012":
                        textElement.setValue(xabdResult.getL().toString());
                        break;

                    case "$$013":
                        textElement.setValue(xabdResult.getCh1().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xabdResult.getOh().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xabdResult.getOht().toString());
                        break;
                    case "$$016":
                        textElement.setValue(xabdResult.getRhtel().toString());
                        break;
                    case "$$017":
                        textElement.setValue(xabdResult.getDensity().toString());
                        break;

                    case "$$019":
                        textElement.setValue(xabdResult.getCv1().toString());
                        break;
                    case "$$020":
                        textElement.setValue(xabdResult.getOv().toString());
                        break;
                    case "$$021":
                        textElement.setValue(xabdResult.getOvt().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xabdResult.getRvtel().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xabdResult.getEt().toString());
                        break;

                    case "$$024":
                        textElement.setValue(xabdResult.getG().toString());
                        break;
                    case "$$025":
                        textElement.setValue(xabdResult.getCh().toString());
                        break;
                    case "$$026":
                        textElement.setValue(xabdResult.getThkhe().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xabdResult.getCv().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xabdResult.getThkve().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xabdResult.getWe().toString());
                        break;
                    case "$$030":
                        textElement.setValue(xabdResult.getHe().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xabdResult.getM4().toString());
                        break;

                    case "$$032":
                        textElement.setValue(xabdResult.getJ().toString());
                        break;
                    case "$$033":
                        textElement.setValue(xabdResult.getW().toString());
                        break;
                    case "$$034":
                        textElement.setValue(xabdResult.getOallow().toString());
                        break;
                    case "$$035":
                        textElement.setValue(xabdResult.getOtallow().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xabdResult.getRtel().toString());
                        break;

                    case "$$037":
                        textElement.setValue(xabdResult.getQ1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(xabdResult.getQ2().toString());
                        break;
                    case "$$039":
                        textElement.setValue(xabdResult.getQ3().toString());
                        break;
                    case "$$040":
                        textElement.setValue(xabdResult.getQ4().toString());
                        break;
                    case "$$041":
                        textElement.setValue(xabdResult.getQ().toString());
                        break;
                    case "$$042":
                        textElement.setValue(xabdResult.getMtmax().toString());
                        break;
                    case "$$043":
                        textElement.setValue(xabdResult.getOt().toString());
                        break;
                    case "$$044":
                        textElement.setValue(xabdResult.getOtchk());
                        break;
                    case "$$045":
                        textElement.setValue(xabdResult.getY().toString());
                        break;
                    case "$$046":
                        textElement.setValue(xabdResult.getYallow().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xabdResult.getYchk());
                        break;

                    case "$$052":
                        textElement.setValue(xabdResult.getEb().toString());
                        break;
                    case "$$053":
                        textElement.setValue(xabdResult.getE().toString());
                        break;
                    case "$$054":
                        textElement.setValue(xabdResult.getObt().toString());
                        break;
                    case "$$055":
                        textElement.setValue(xabdResult.getObtchk());
                        break;

                    case "$$056":
                        textElement.setValue(xabdResult.getF().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xabdResult.getMmax().toString());
                        break;
                    case "$$058":
                        textElement.setValue(xabdResult.getO().toString());
                        break;
                    case "$$059":
                        textElement.setValue(xabdResult.getOchk());
                        break;

                    case "$$100":
                        textElement.setValue(xabdResult.getN().toString());
                        break;
                    case "$$101":
                        textElement.setValue(xabdResult.getK().toString());
                        break;

                    case "$$200":
                        textElement.setValue(xabdResult.getB().toString());
                        break;
                    case "$$201":
                        textElement.setValue(xabdResult.getEx1().toString());
                        break;
                    case "$$202":
                        textElement.setValue(xabdResult.getEx2().toString());
                        break;
                    case "$$204":
                        textElement.setValue(xabdResult.getLt().toString());
                        break;
                    case "$$205":
                        textElement.setValue(xabdResult.getThkm().toString());
                        break;

                    case "$08":
                        textElement.setValue(xabdResult.getThkhn().toString());
                        break;
                    case "$09":
                        textElement.setValue(xabdResult.getThkvn().toString());
                        break;
                    case "$10":
                        textElement.setValue(xabdResult.getWn().toString());
                        break;
                    case "$11":
                        textElement.setValue(xabdResult.getH().toString());
                        break;
                    case "$12":
                        textElement.setValue(xabdResult.getL().toString());
                        break;

                    case "L/3":
                        textElement.setValue(Double.toString(Math.round(xabdResult.getL() / 3.0 * 100) / 100.0));
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
