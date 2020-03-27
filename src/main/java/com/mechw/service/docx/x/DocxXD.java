package com.mechw.service.docx.x;

import com.mechw.model.front.x.d.XDADocx;
import com.mechw.model.front.x.d.XDBDocx;
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

public class DocxXD extends DocxTool {

    /**
     * xda
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xdaResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getXDA(String baseFileName, XDADocx xdaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/x/d/a/XDA.docx";

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
                        textElement.setValue(xdaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xdaResult.getM0().toString());
                        break;

                    case "$$003":
                        textElement.setValue(xdaResult.getStdb());
                        break;
                    case "$$004":
                        textElement.setValue(xdaResult.getNameb());
                        break;
                    case "$$005":
                        textElement.setValue(xdaResult.getDb().toString());
                        break;
                    case "$$006":
                        textElement.setValue(xdaResult.getThkbn().toString());
                        break;
                    case "$$007":
                        textElement.setValue(xdaResult.getCb2().toString());
                        break;
                    case "$$008":
                        textElement.setValue(xdaResult.getRb().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xdaResult.getSb().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xdaResult.getLb().toString());
                        break;

                    case "$$011":
                        textElement.setValue(xdaResult.getStdh());
                        break;
                    case "$$012":
                        textElement.setValue(xdaResult.getNameh());
                        break;
                    case "$$013":
                        textElement.setValue(xdaResult.getDh().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xdaResult.getCh2().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xdaResult.getBoltNorms());
                        break;

                    case "$$016":
                        textElement.setValue(xdaResult.getStdr());
                        break;
                    case "$$017":
                        textElement.setValue(xdaResult.getNamer());
                        break;
                    case "$$018":
                        textElement.setValue(xdaResult.getLr().toString());
                        break;
                    case "$$019":
                        textElement.setValue(xdaResult.getDr().toString());
                        break;
                    case "$$020":
                        textElement.setValue(xdaResult.getCr2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(xdaResult.getHr().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xdaResult.getLrw().toString());
                        break;

                    case "$$023":
                        textElement.setValue(xdaResult.getStds());
                        break;
                    case "$$024":
                        textElement.setValue(xdaResult.getNames());
                        break;
                    case "$$025":
                        textElement.setValue(xdaResult.getDs().toString());
                        break;
                    case "$$026":
                        textElement.setValue(xdaResult.getThksn().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xdaResult.getCs2().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xdaResult.getLs().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xdaResult.getHs().toString());
                        break;

                    case "$$030":
                        textElement.setValue(xdaResult.getDensityb().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xdaResult.getCb1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(xdaResult.getObt().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xdaResult.getEbt().toString());
                        break;

                    case "$$037":
                        textElement.setValue(xdaResult.getDensityr().toString());
                        break;
                    case "$$038":
                        textElement.setValue(xdaResult.getCr1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(xdaResult.getOrt().toString());
                        break;
                    case "$$043":
                        textElement.setValue(xdaResult.getErt().toString());
                        break;

                    case "$$044":
                        textElement.setValue(xdaResult.getDensityh().toString());
                        break;
                    case "$$045":
                        textElement.setValue(xdaResult.getCh1().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xdaResult.getOht().toString());
                        break;
                    case "$$050":
                        textElement.setValue(xdaResult.getEht().toString());
                        break;

                    case "$$051":
                        textElement.setValue(xdaResult.getDensitys().toString());
                        break;
                    case "$$052":
                        textElement.setValue(xdaResult.getCs1().toString());
                        break;
                    case "$$054":
                        textElement.setValue(xdaResult.getOst().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xdaResult.getEst().toString());
                        break;

                    case "$$058":
                        textElement.setValue(xdaResult.getKd().toString());
                        break;
                    case "$$059":
                        textElement.setValue(xdaResult.getG().toString());
                        break;
                    case "$$060":
                        textElement.setValue(xdaResult.getF().toString());
                        break;

                    case "$$061":
                        textElement.setValue(xdaResult.getDhmin().toString());
                        break;
                    case "$$062":
                        textElement.setValue(xdaResult.getCh().toString());
                        break;
                    case "$$063":
                        textElement.setValue(xdaResult.getDhe().toString());
                        break;

                    case "$$064":
                        textElement.setValue(xdaResult.getCb().toString());
                        break;
                    case "$$065":
                        textElement.setValue(xdaResult.getThkbe().toString());
                        break;
                    case "$$066":
                        textElement.setValue(xdaResult.getDbo().toString());
                        break;
                    case "$$067":
                        textElement.setValue(xdaResult.getDbi().toString());
                        break;
                    case "$$068":
                        textElement.setValue(xdaResult.getA().toString());
                        break;
                    case "$$069":
                        textElement.setValue(xdaResult.getK().toString());
                        break;

                    case "$$070":
                        textElement.setValue(xdaResult.getCr().toString());
                        break;
                    case "$$071":
                        textElement.setValue(xdaResult.getDre().toString());
                        break;

                    case "$$072":
                        textElement.setValue(xdaResult.getCs().toString());
                        break;
                    case "$$073":
                        textElement.setValue(xdaResult.getThkse().toString());
                        break;
                    case "$$074":
                        textElement.setValue(xdaResult.getAs().toString());
                        break;

                    case "$$075":
                        textElement.setValue(xdaResult.getOhc().toString());
                        break;
                    case "$$076":
                        textElement.setValue(xdaResult.getOhcchk());
                        break;

                    case "$$077":
                        textElement.setValue(xdaResult.getObxc().toString());
                        break;
                    case "$$078":
                        textElement.setValue(xdaResult.getObmc().toString());
                        break;
                    case "$$079":
                        textElement.setValue(xdaResult.getObmt().toString());
                        break;
                    case "$$080":
                        textElement.setValue(xdaResult.getObxcmc().toString());
                        break;
                    case "$$081":
                        textElement.setValue(xdaResult.getObxcmcchk());
                        break;
                    case "$$082":
                        textElement.setValue(xdaResult.getObxcmt().toString());
                        break;
                    case "$$083":
                        textElement.setValue(xdaResult.getObxcmtchk());
                        break;

                    case "$$084":
                        textElement.setValue(xdaResult.getTheta2().toString());
                        break;
                    case "$$085":
                        textElement.setValue(xdaResult.getObab().toString());
                        break;
                    case "$$086":
                        textElement.setValue(xdaResult.getObabchk());
                        break;

                    case "$$087":
                        textElement.setValue(xdaResult.getOrc().toString());
                        break;
                    case "$$088":
                        textElement.setValue(xdaResult.getOrcchk());
                        break;

                    case "$$089":
                        textElement.setValue(xdaResult.getOrwc().toString());
                        break;
                    case "$$090":
                        textElement.setValue(xdaResult.getOrwcchk());
                        break;

                    case "$$091":
                        textElement.setValue(xdaResult.getOsc().toString());
                        break;
                    case "$$092":
                        textElement.setValue(xdaResult.getOscchk());
                        break;

                    case "$$093":
                        textElement.setValue(xdaResult.getTauswc().toString());
                        break;
                    case "$$094":
                        textElement.setValue(xdaResult.getTaustallow().toString());
                        break;
                    case "$$095":
                        textElement.setValue(xdaResult.getTauswcchk());
                        break;

                    case "$08":
                        textElement.setValue("R" + xdaResult.getRb().toString());
                        break;
                    case "$09":
                        textElement.setValue(xdaResult.getSb().toString());
                        break;
                    case "$10":
                        textElement.setValue(xdaResult.getLb().toString());
                        break;
                    case "$18":
                        textElement.setValue(xdaResult.getLr().toString());
                        break;
                    case "$28":
                        textElement.setValue(xdaResult.getLs().toString());
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
     * xdb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xdbResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getXDB(String baseFileName, XDBDocx xdbResult) {
        String template = "D:/mechw/static/west/cal/x/d/b/XDB.docx";
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
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 38;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 39;
                        }
                        break;
                    case 36164:
                        if (var13.equals("$11")) {
                            var14 = 40;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 41;
                        }
                        break;
                    case 36166:
                        if (var13.equals("$13")) {
                            var14 = 42;
                        }
                        break;
                    case 36357:
                        if (var13.equals("$78")) {
                            var14 = 43;
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
                        textElement.setValue(xdbResult.getPd().toString());
                        break;
                    case 1:
                        textElement.setValue(xdbResult.getTh().toString());
                        break;
                    case 2:
                        textElement.setValue(xdbResult.getTc().toString());
                        break;
                    case 3:
                        textElement.setValue(xdbResult.getPs().toString());
                        break;
                    case 4:
                        textElement.setValue(xdbResult.getStd());
                        break;
                    case 5:
                        textElement.setValue(xdbResult.getName());
                        break;
                    case 6:
                        textElement.setValue(xdbResult.getDout().toString());
                        break;
                    case 7:
                        textElement.setValue(xdbResult.getThkn().toString());
                        break;
                    case 8:
                        textElement.setValue(xdbResult.getLs().toString());
                        break;
                    case 9:
                        textElement.setValue(xdbResult.getS0().toString());
                        break;
                    case 10:
                        textElement.setValue(xdbResult.getS1().toString());
                        break;
                    case 11:
                        textElement.setValue(xdbResult.getS2().toString());
                        break;
                    case 12:
                        textElement.setValue(xdbResult.getR().toString());
                        break;
                    case 13:
                        textElement.setValue(xdbResult.getDensity().toString());
                        break;
                    case 14:
                        textElement.setValue(xdbResult.getEht().toString());
                        break;
                    case 15:
                        textElement.setValue(xdbResult.getAh().toString());
                        break;
                    case 16:
                        textElement.setValue(xdbResult.getOht().toString());
                        break;
                    case 17:
                        textElement.setValue(xdbResult.getRhel().toString());
                        break;
                    case 18:
                        textElement.setValue(xdbResult.getC1().toString());
                        break;
                    case 19:
                        textElement.setValue(xdbResult.getEct().toString());
                        break;
                    case 20:
                        textElement.setValue(xdbResult.getAc().toString());
                        break;
                    case 21:
                        textElement.setValue(xdbResult.getOct().toString());
                        break;
                    case 22:
                        textElement.setValue(xdbResult.getRcel().toString());
                        break;
                    case 23:
                        textElement.setValue(xdbResult.getPc().toString());
                        break;
                    case 24:
                        textElement.setValue(xdbResult.getC().toString());
                        break;
                    case 25:
                        textElement.setValue(xdbResult.getThke().toString());
                        break;
                    case 26:
                        textElement.setValue(xdbResult.getL().toString());
                        break;
                    case 27:
                        textElement.setValue(xdbResult.getRm().toString());
                        break;
                    case 28:
                        textElement.setValue(xdbResult.getEmt().toString());
                        break;
                    case 29:
                        textElement.setValue(xdbResult.getKn().toString());
                        break;
                    case 30:
                        textElement.setValue(xdbResult.getSn().toString());
                        break;
                    case 31:
                        textElement.setValue(xdbResult.getFn().toString());
                        break;
                    case 32:
                        textElement.setValue(xdbResult.getOn().toString());
                        break;
                    case 33:
                        textElement.setValue(xdbResult.getKc().toString());
                        break;
                    case 34:
                        textElement.setValue(xdbResult.getSc().toString());
                        break;
                    case 35:
                        textElement.setValue(xdbResult.getFc().toString());
                        break;
                    case 36:
                        textElement.setValue(xdbResult.getOc().toString());
                        break;
                    case 37:
                        textElement.setValue(xdbResult.getC2().toString());
                        break;
                    case 38:
                        textElement.setValue(xdbResult.getLs().toString());
                        break;
                    case 39:
                        textElement.setValue(xdbResult.getS0().toString());
                        break;
                    case 40:
                        textElement.setValue(xdbResult.getS1().toString());
                        break;
                    case 41:
                        textElement.setValue(xdbResult.getS2().toString());
                        break;
                    case 42:
                        textElement.setValue("R" + xdbResult.getR().toString());
                        break;
                    case 43:
                        textElement.setValue("Φ" + xdbResult.getDout() + "×" + xdbResult.getThkn());
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
