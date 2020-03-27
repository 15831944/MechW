package com.mechw.service.docx.x;

import com.mechw.model.front.x.b.*;
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

public class DocxXB extends DocxTool {

    /**
     * xbaa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbaaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBAA(String baseFileName, XBAADocx xbaaResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/x/b/a/a/XBAA.docx";

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
                        textElement.setValue(xbaaResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xbaaResult.getM0().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xbaaResult.getH0().toString());
                        break;
                    case "$$004":
                        textElement.setValue(xbaaResult.getDi().toString());
                        break;
                    case "$$005":
                        textElement.setValue(xbaaResult.getThksn().toString());
                        break;
                    case "$$006":
                        textElement.setValue(xbaaResult.getDout().toString());
                        break;
                    case "$$007":
                        textElement.setValue(xbaaResult.getQ0().toString());
                        break;
                    case "$$008":
                        textElement.setValue(xbaaResult.getFi().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xbaaResult.getU().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xbaaResult.getN().toString());
                        break;
                    case "$$011":
                        textElement.setValue(xbaaResult.getEarstd());
                        break;
                    case "$$012":
                        textElement.setValue(xbaaResult.getEarname());
                        break;
                    case "$$013":
                        textElement.setValue(xbaaResult.getC2().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xbaaResult.getAlpha().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xbaaResult.getThkcn().toString());
                        break;
                    case "$$016":
                        textElement.setValue(xbaaResult.getSh().toString());
                        break;
                    case "$$017":
                        textElement.setValue(xbaaResult.getB2().toString());
                        break;
                    case "$$018":
                        textElement.setValue(xbaaResult.getThkbn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(xbaaResult.getA().toString());
                        break;
                    case "$$020":
                        textElement.setValue(xbaaResult.getB().toString());
                        break;
                    case "$$021":
                        textElement.setValue(xbaaResult.getBh().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xbaaResult.getSd().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xbaaResult.getThkan().toString());
                        break;
                    case "$$024":
                        textElement.setValue(xbaaResult.getC().toString());
                        break;
                    case "$$025":
                        textElement.setValue(xbaaResult.getThk3().toString());
                        break;
                    case "$$026":
                        textElement.setValue(xbaaResult.getGe().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xbaaResult.getSe().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xbaaResult.getDensityc().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xbaaResult.getDensityb().toString());
                        break;
                    case "$$030":
                        textElement.setValue(xbaaResult.getCc1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xbaaResult.getCb1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(xbaaResult.getOct().toString());
                        break;
                    case "$$033":
                        textElement.setValue(xbaaResult.getObt().toString());
                        break;
                    case "$$034":
                        textElement.setValue(xbaaResult.getDensitya().toString());
                        break;
                    case "$$035":
                        textElement.setValue(xbaaResult.getOat().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xbaaResult.getCa1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(xbaaResult.getG().toString());
                        break;
                    case "$$038":
                        textElement.setValue(xbaaResult.getK().toString());
                        break;
                    case "$$039":
                        textElement.setValue(xbaaResult.getBd().toString());
                        break;
                    case "$$040":
                        textElement.setValue(xbaaResult.getPw().toString());
                        break;
                    case "$$041":
                        textElement.setValue(xbaaResult.getPe().toString());
                        break;
                    case "$$042":
                        textElement.setValue(xbaaResult.getP().toString());
                        break;
                    case "$$043":
                        textElement.setValue(xbaaResult.getF().toString());
                        break;
                    case "$$044":
                        textElement.setValue(xbaaResult.getCc().toString());
                        break;
                    case "$$045":
                        textElement.setValue(xbaaResult.getThkce().toString());
                        break;
                    case "$$046":
                        textElement.setValue(xbaaResult.getR().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xbaaResult.getL2().toString());
                        break;
                    case "$$048":
                        textElement.setValue(xbaaResult.getOcmaxallow().toString());
                        break;
                    case "$$049":
                        textElement.setValue(xbaaResult.getFr().toString());
                        break;
                    case "$$050":
                        textElement.setValue(xbaaResult.getL1().toString());
                        break;
                    case "$$051":
                        textElement.setValue(xbaaResult.getE().toString());
                        break;
                    case "$$052":
                        textElement.setValue(xbaaResult.getOcmax().toString());
                        break;
                    case "$$053":
                        textElement.setValue(xbaaResult.getOcmaxchk());
                        break;
                    case "$$054":
                        textElement.setValue(xbaaResult.getCb().toString());
                        break;
                    case "$$055":
                        textElement.setValue(xbaaResult.getThkbe().toString());
                        break;
                    case "$$056":
                        textElement.setValue(xbaaResult.getAb().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xbaaResult.getBeta().toString());
                        break;
                    case "$$058":
                        textElement.setValue(xbaaResult.getOb().toString());
                        break;
                    case "$$059":
                        textElement.setValue(xbaaResult.getObchk());
                        break;
                    case "$$060":
                        textElement.setValue(xbaaResult.getCa().toString());
                        break;
                    case "$$061":
                        textElement.setValue(xbaaResult.getThkae().toString());
                        break;
                    case "$$062":
                        textElement.setValue(xbaaResult.getOa().toString());
                        break;
                    case "$$063":
                        textElement.setValue(xbaaResult.getOaallow().toString());
                        break;
                    case "$$064":
                        textElement.setValue(xbaaResult.getOachk());
                        break;
                    case "$24":
                        textElement.setValue(xbaaResult.getC().toString());
                        break;
                    case "$23":
                        textElement.setValue(xbaaResult.getThkan().toString());
                        break;
                    case "$14":
                        textElement.setValue(xbaaResult.getAlpha().toString());
                        break;
                    case "$16":
                        textElement.setValue(xbaaResult.getSh().toString());
                        break;
                    case "$18":
                        textElement.setValue(xbaaResult.getThkbn().toString());
                        break;
                    case "$22":
                        textElement.setValue(xbaaResult.getSd().toString());
                        break;
                    case "$20":
                        textElement.setValue(xbaaResult.getB().toString());
                        break;
                    case "$17":
                        textElement.setValue(xbaaResult.getB2().toString());
                        break;
                    case "$15":
                        textElement.setValue(xbaaResult.getThkcn().toString());
                        break;
                    case "$19":
                        textElement.setValue(xbaaResult.getA().toString());
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
     * xbab
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbabResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBAB(String baseFileName, XBABDocx xbabResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/x/b/a/b/XBAB.docx";

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
                        textElement.setValue(xbabResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xbabResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xbabResult.getQ0().toString());
                        break;
                    case "$$004":
                        textElement.setValue(xbabResult.getF0().toString());
                        break;
                    case "$$005":
                        textElement.setValue(xbabResult.getM0().toString());
                        break;
                    case "$$006":
                        textElement.setValue(xbabResult.getH0().toString());
                        break;
                    case "$$007":
                        textElement.setValue(xbabResult.getD0().toString());
                        break;
                    case "$$008":
                        textElement.setValue(xbabResult.getG0().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xbabResult.getS0().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xbabResult.getSstd());
                        break;
                    case "$$011":
                        textElement.setValue(xbabResult.getSname());
                        break;
                    case "$$012":
                        textElement.setValue(xbabResult.getCs2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(xbabResult.getDsi().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xbabResult.getThksn().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xbabResult.getDstd());
                        break;
                    case "$$016":
                        textElement.setValue(xbabResult.getDname());
                        break;
                    case "$$017":
                        textElement.setValue(xbabResult.getThkdn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(xbabResult.getCd2().toString());
                        break;
                    case "$$019":
                        textElement.setValue(xbabResult.getBstd());
                        break;
                    case "$$020":
                        textElement.setValue(xbabResult.getBname());
                        break;
                    case "$$021":
                        textElement.setValue(xbabResult.getWb().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xbabResult.getLb().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xbabResult.getThkbn().toString());
                        break;
                    case "$$024":
                        textElement.setValue(xbabResult.getCb2().toString());
                        break;
                    case "$$025":
                        textElement.setValue(xbabResult.getSh().toString());
                        break;
                    case "$$026":
                        textElement.setValue(xbabResult.getBh().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xbabResult.getLd().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xbabResult.getDensitys().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xbabResult.getCs1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(xbabResult.getOst().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xbabResult.getDensityb().toString());
                        break;
                    case "$$032":
                        textElement.setValue(xbabResult.getCb1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(xbabResult.getDensityd().toString());
                        break;
                    case "$$034":
                        textElement.setValue(xbabResult.getOdt().toString());
                        break;
                    case "$$035":
                        textElement.setValue(xbabResult.getCd1().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xbabResult.getObt().toString());
                        break;
                    case "$$037":
                        textElement.setValue(xbabResult.getG().toString());
                        break;
                    case "$$038":
                        textElement.setValue(xbabResult.getDso().toString());
                        break;
                    case "$$039":
                        textElement.setValue(xbabResult.getCs().toString());
                        break;
                    case "$$040":
                        textElement.setValue(xbabResult.getThkse().toString());
                        break;
                    case "$$041":
                        textElement.setValue(xbabResult.getLss().toString());
                        break;
                    case "$$042":
                        textElement.setValue(xbabResult.getDdo().toString());
                        break;
                    case "$$043":
                        textElement.setValue(xbabResult.getCd().toString());
                        break;
                    case "$$044":
                        textElement.setValue(xbabResult.getThkde().toString());
                        break;
                    case "$$045":
                        textElement.setValue(xbabResult.getLds().toString());
                        break;
                    case "$$046":
                        textElement.setValue(xbabResult.getCb().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xbabResult.getThkbe().toString());
                        break;
                    case "$$048":
                        textElement.setValue(xbabResult.getDb().toString());
                        break;
                    case "$$049":
                        textElement.setValue(xbabResult.getB().toString());
                        break;
                    case "$$050":
                        textElement.setValue(xbabResult.getPw().toString());
                        break;
                    case "$$051":
                        textElement.setValue(xbabResult.getFb().toString());
                        break;
                    case "$$052":
                        textElement.setValue(xbabResult.getF().toString());
                        break;
                    case "$$053":
                        textElement.setValue(xbabResult.getA().toString());
                        break;
                    case "$$054":
                        textElement.setValue(xbabResult.getAx().toString());
                        break;
                    case "$$055":
                        textElement.setValue(xbabResult.getDs().toString());
                        break;
                    case "$$056":
                        textElement.setValue(xbabResult.getA1().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xbabResult.getI1().toString());
                        break;
                    case "$$058":
                        textElement.setValue(xbabResult.getA2().toString());
                        break;
                    case "$$059":
                        textElement.setValue(xbabResult.getI2().toString());
                        break;
                    case "$$060":
                        textElement.setValue(xbabResult.getA3().toString());
                        break;
                    case "$$061":
                        textElement.setValue(xbabResult.getI3().toString());
                        break;
                    case "$$062":
                        textElement.setValue(xbabResult.getI().toString());
                        break;
                    case "$$063":
                        textElement.setValue(xbabResult.getTheta().toString());
                        break;
                    case "$$064":
                        textElement.setValue(xbabResult.getRs().toString());
                        break;
                    case "$$065":
                        textElement.setValue(xbabResult.getMr().toString());
                        break;
                    case "$$066":
                        textElement.setValue(xbabResult.getTr().toString());
                        break;
                    case "$$067":
                        textElement.setValue(xbabResult.getOr().toString());
                        break;
                    case "$$068":
                        textElement.setValue(xbabResult.getOrallow().toString());
                        break;
                    case "$$069":
                        textElement.setValue(xbabResult.getOrallowchk());
                        break;
                    case "$$070":
                        textElement.setValue(xbabResult.getMt().toString());
                        break;
                    case "$$071":
                        textElement.setValue(xbabResult.getTt().toString());
                        break;
                    case "$$072":
                        textElement.setValue(xbabResult.getOt().toString());
                        break;
                    case "$$073":
                        textElement.setValue(xbabResult.getOtallow().toString());
                        break;
                    case "$$074":
                        textElement.setValue(xbabResult.getOtallowchk());
                        break;

                    case "$$100":
                        textElement.setValue(xbabResult.getAlpha().toString());
                        break;
                    case "$$101":
                        textElement.setValue(xbabResult.getThkcn().toString());
                        break;
                    case "$$102":
                        textElement.setValue(xbabResult.getB2().toString());
                        break;
                    case "$$103":
                        textElement.setValue(xbabResult.getCc2().toString());
                        break;
                    case "$$104":
                        textElement.setValue(xbabResult.getU().toString());
                        break;

                    case "$$105":
                        textElement.setValue(xbabResult.getDensityc().toString());
                        break;
                    case "$$106":
                        textElement.setValue(xbabResult.getCc1().toString());
                        break;
                    case "$$107":
                        textElement.setValue(xbabResult.getOct().toString());
                        break;

                    case "$$108":
                        textElement.setValue(xbabResult.getK().toString());
                        break;

                    case "$$109":
                        textElement.setValue(xbabResult.getPe().toString());
                        break;
                    case "$$110":
                        textElement.setValue(xbabResult.getP().toString());
                        break;

                    case "$$111":
                        textElement.setValue(xbabResult.getCc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(xbabResult.getThkce().toString());
                        break;
                    case "$$113":
                        textElement.setValue(xbabResult.getR().toString());
                        break;
                    case "$$114":
                        textElement.setValue(xbabResult.getL2().toString());
                        break;
                    case "$$115":
                        textElement.setValue(xbabResult.getOcmaxallow().toString());
                        break;
                    case "$$116":
                        textElement.setValue(xbabResult.getFr().toString());
                        break;
                    case "$$117":
                        textElement.setValue(xbabResult.getL1().toString());
                        break;
                    case "$$118":
                        textElement.setValue(xbabResult.getE().toString());
                        break;
                    case "$$119":
                        textElement.setValue(xbabResult.getOcmax().toString());
                        break;
                    case "$$120":
                        textElement.setValue(xbabResult.getOcmaxchk());
                        break;
                    case "$$121":
                        textElement.setValue(xbabResult.getCstd());
                        break;
                    case "$$122":
                        textElement.setValue(xbabResult.getCname());
                        break;

                    case "$21":
                        textElement.setValue(xbabResult.getWb().toString());
                        break;
                    case "$17":
                        textElement.setValue(xbabResult.getThkdn().toString());
                        break;
                    case "$23":
                        textElement.setValue(xbabResult.getThkbn().toString());
                        break;
                    case "$25":
                        textElement.setValue(xbabResult.getSh().toString());
                        break;
                    case "$27":
                        textElement.setValue(xbabResult.getLd().toString());
                        break;
                    case "$13":
                        textElement.setValue("Φ" + xbabResult.getDsi().toString());
                        break;
                    case "$14":
                        textElement.setValue(xbabResult.getThksn().toString());
                        break;
                    case "$22":
                        textElement.setValue(xbabResult.getLb().toString());
                        break;
                    case "$26":
                        textElement.setValue(xbabResult.getBh().toString());
                        break;
                    case "$100":
                        textElement.setValue(">=" + String.valueOf((xbabResult.getLds() - xbabResult.getThkbn()) / 2));
                        break;

                    case "$101":
                        textElement.setValue(xbabResult.getThkcn().toString());
                        break;
                    case "$102":
                        textElement.setValue(xbabResult.getB2().toString());
                        break;
                    case "$110":
                        textElement.setValue(xbabResult.getAlpha().toString() + "°");
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
     * xbac
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbacResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBAC(String baseFileName, XBACDocx xbacResult) {

        // 根据试验类型确定要使用的文件模板
        String template = "D:/mechw/static/west/cal/x/b/a/c/XBAC.docx";

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
                        textElement.setValue(xbacResult.getT().toString());
                        break;
                    case "$$002":
                        textElement.setValue(xbacResult.getN().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xbacResult.getQ0().toString());
                        break;
                    case "$$004":
                        textElement.setValue(xbacResult.getF0().toString());
                        break;
                    case "$$005":
                        textElement.setValue(xbacResult.getM0().toString());
                        break;
                    case "$$006":
                        textElement.setValue(xbacResult.getH0().toString());
                        break;
                    case "$$007":
                        textElement.setValue(xbacResult.getD0().toString());
                        break;
                    case "$$008":
                        textElement.setValue(xbacResult.getG0().toString());
                        break;
                    case "$$009":
                        textElement.setValue(xbacResult.getS0().toString());
                        break;
                    case "$$010":
                        textElement.setValue(xbacResult.getSstd());
                        break;
                    case "$$011":
                        textElement.setValue(xbacResult.getSname());
                        break;
                    case "$$012":
                        textElement.setValue(xbacResult.getCs2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(xbacResult.getDsi().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xbacResult.getThksn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(xbacResult.getBstd());
                        break;
                    case "$$020":
                        textElement.setValue(xbacResult.getBname());
                        break;
                    case "$$021":
                        textElement.setValue(xbacResult.getWb().toString());
                        break;
                    case "$$022":
                        textElement.setValue(xbacResult.getLb().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xbacResult.getThkbn().toString());
                        break;
                    case "$$024":
                        textElement.setValue(xbacResult.getCb2().toString());
                        break;
                    case "$$025":
                        textElement.setValue(xbacResult.getSh().toString());
                        break;
                    case "$$026":
                        textElement.setValue(xbacResult.getBh().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xbacResult.getLd().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xbacResult.getDensitys().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xbacResult.getCs1().toString());
                        break;
                    case "$$030":
                        textElement.setValue(xbacResult.getOst().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xbacResult.getDensityb().toString());
                        break;
                    case "$$032":
                        textElement.setValue(xbacResult.getCb1().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xbacResult.getObt().toString());
                        break;
                    case "$$037":
                        textElement.setValue(xbacResult.getG().toString());
                        break;
                    case "$$038":
                        textElement.setValue(xbacResult.getDso().toString());
                        break;
                    case "$$039":
                        textElement.setValue(xbacResult.getCs().toString());
                        break;
                    case "$$040":
                        textElement.setValue(xbacResult.getThkse().toString());
                        break;
                    case "$$041":
                        textElement.setValue(xbacResult.getLss().toString());
                        break;
                    case "$$046":
                        textElement.setValue(xbacResult.getCb().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xbacResult.getThkbe().toString());
                        break;
                    case "$$048":
                        textElement.setValue(xbacResult.getDb().toString());
                        break;
                    case "$$049":
                        textElement.setValue(xbacResult.getB().toString());
                        break;
                    case "$$050":
                        textElement.setValue(xbacResult.getPw().toString());
                        break;
                    case "$$051":
                        textElement.setValue(xbacResult.getFb().toString());
                        break;
                    case "$$052":
                        textElement.setValue(xbacResult.getF().toString());
                        break;
                    case "$$053":
                        textElement.setValue(xbacResult.getA().toString());
                        break;
                    case "$$054":
                        textElement.setValue(xbacResult.getAx().toString());
                        break;
                    case "$$055":
                        textElement.setValue(xbacResult.getDs().toString());
                        break;
                    case "$$056":
                        textElement.setValue(xbacResult.getA1().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xbacResult.getI1().toString());
                        break;
                    case "$$060":
                        textElement.setValue(xbacResult.getA3().toString());
                        break;
                    case "$$061":
                        textElement.setValue(xbacResult.getI3().toString());
                        break;
                    case "$$062":
                        textElement.setValue(xbacResult.getI().toString());
                        break;
                    case "$$063":
                        textElement.setValue(xbacResult.getTheta().toString());
                        break;
                    case "$$064":
                        textElement.setValue(xbacResult.getRs().toString());
                        break;
                    case "$$065":
                        textElement.setValue(xbacResult.getMr().toString());
                        break;
                    case "$$066":
                        textElement.setValue(xbacResult.getTr().toString());
                        break;
                    case "$$067":
                        textElement.setValue(xbacResult.getOr().toString());
                        break;
                    case "$$068":
                        textElement.setValue(xbacResult.getOrallow().toString());
                        break;
                    case "$$069":
                        textElement.setValue(xbacResult.getOrallowchk());
                        break;
                    case "$$070":
                        textElement.setValue(xbacResult.getMt().toString());
                        break;
                    case "$$071":
                        textElement.setValue(xbacResult.getTt().toString());
                        break;
                    case "$$072":
                        textElement.setValue(xbacResult.getOt().toString());
                        break;
                    case "$$073":
                        textElement.setValue(xbacResult.getOtallow().toString());
                        break;
                    case "$$074":
                        textElement.setValue(xbacResult.getOtallowchk());
                        break;

                    case "$$100":
                        textElement.setValue(xbacResult.getAlpha().toString());
                        break;
                    case "$$101":
                        textElement.setValue(xbacResult.getThkcn().toString());
                        break;
                    case "$$102":
                        textElement.setValue(xbacResult.getB2().toString());
                        break;
                    case "$$103":
                        textElement.setValue(xbacResult.getCc2().toString());
                        break;
                    case "$$104":
                        textElement.setValue(xbacResult.getU().toString());
                        break;

                    case "$$105":
                        textElement.setValue(xbacResult.getDensityc().toString());
                        break;
                    case "$$106":
                        textElement.setValue(xbacResult.getCc1().toString());
                        break;
                    case "$$107":
                        textElement.setValue(xbacResult.getOct().toString());
                        break;

                    case "$$108":
                        textElement.setValue(xbacResult.getK().toString());
                        break;

                    case "$$109":
                        textElement.setValue(xbacResult.getPe().toString());
                        break;
                    case "$$110":
                        textElement.setValue(xbacResult.getP().toString());
                        break;

                    case "$$111":
                        textElement.setValue(xbacResult.getCc().toString());
                        break;
                    case "$$112":
                        textElement.setValue(xbacResult.getThkce().toString());
                        break;
                    case "$$113":
                        textElement.setValue(xbacResult.getR().toString());
                        break;
                    case "$$114":
                        textElement.setValue(xbacResult.getL2().toString());
                        break;
                    case "$$115":
                        textElement.setValue(xbacResult.getOcmaxallow().toString());
                        break;
                    case "$$116":
                        textElement.setValue(xbacResult.getFr().toString());
                        break;
                    case "$$117":
                        textElement.setValue(xbacResult.getL1().toString());
                        break;
                    case "$$118":
                        textElement.setValue(xbacResult.getE().toString());
                        break;
                    case "$$119":
                        textElement.setValue(xbacResult.getOcmax().toString());
                        break;
                    case "$$120":
                        textElement.setValue(xbacResult.getOcmaxchk());
                        break;
                    case "$$121":
                        textElement.setValue(xbacResult.getCstd());
                        break;
                    case "$$122":
                        textElement.setValue(xbacResult.getCname());
                        break;

                    case "$21":
                        textElement.setValue(xbacResult.getWb().toString());
                        break;
                    case "$23":
                        textElement.setValue(xbacResult.getThkbn().toString());
                        break;
                    case "$25":
                        textElement.setValue(xbacResult.getSh().toString());
                        break;
                    case "$27":
                        textElement.setValue(xbacResult.getLd().toString());
                        break;
                    case "$13":
                        textElement.setValue("Φ" + xbacResult.getDsi().toString());
                        break;
                    case "$14":
                        textElement.setValue(xbacResult.getThksn().toString());
                        break;
                    case "$22":
                        textElement.setValue(xbacResult.getLb().toString());
                        break;
                    case "$26":
                        textElement.setValue(xbacResult.getBh().toString());
                        break;

                    case "$101":
                        textElement.setValue(xbacResult.getThkcn().toString());
                        break;
                    case "$102":
                        textElement.setValue(xbacResult.getB2().toString());
                        break;
                    case "$110":
                        textElement.setValue(xbacResult.getAlpha().toString() + "°");
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
     * xbba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbbaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBBA(String baseFileName, XBBADocx xbbaResult) {

        // 要使用的文件模板
        String template = "D:/mechw/static/west/cal/x/b/b/a/XBBA.docx";

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
                        textElement.setValue(xbbaResult.getT().toString());
                        break;

                    case "$$002":
                        textElement.setValue(xbbaResult.getH0().toString());
                        break;
                    case "$$003":
                        textElement.setValue(xbbaResult.getD0().toString());
                        break;
                    case "$$004":
                        textElement.setValue(xbbaResult.getM0().toString());
                        break;

                    case "$$005":
                        textElement.setValue(xbbaResult.getQ0().toString());
                        break;
                    case "$$006":
                        textElement.setValue(xbbaResult.getFi().toString());
                        break;
                    case "$$007":
                        textElement.setValue(xbbaResult.getEq());
                        break;

                    case "$$008":
                        textElement.setValue(xbbaResult.getStds());
                        break;
                    case "$$009":
                        textElement.setValue(xbbaResult.getNames());
                        break;
                    case "$$010":
                        textElement.setValue(xbbaResult.getN().toString());
                        break;
                    case "$$011":
                        textElement.setValue(xbbaResult.getDout().toString());
                        break;
                    case "$$012":
                        textElement.setValue(xbbaResult.getThksn().toString());
                        break;
                    case "$$013":
                        textElement.setValue(xbbaResult.getCs2().toString());
                        break;
                    case "$$014":
                        textElement.setValue(xbbaResult.getE().toString());
                        break;
                    case "$$015":
                        textElement.setValue(xbbaResult.getDb().toString());
                        break;
                    case "$$016":
                        textElement.setValue(xbbaResult.getB().toString());
                        break;
                    case "$$017":
                        textElement.setValue(xbbaResult.getHf().toString());
                        break;
                    case "$$018":
                        textElement.setValue(xbbaResult.getTf1().toString());
                        break;

                    case "$$019":
                        textElement.setValue(xbbaResult.getStdb());
                        break;
                    case "$$020":
                        textElement.setValue(xbbaResult.getNameb());
                        break;
                    case "$$021":
                        textElement.setValue(xbbaResult.getNorms());
                        break;
                    case "$$022":
                        textElement.setValue(xbbaResult.getNbt().toString());
                        break;
                    case "$$023":
                        textElement.setValue(xbbaResult.getCb2().toString());
                        break;

                    case "$$024":
                        textElement.setValue(xbbaResult.getStdd());
                        break;
                    case "$$025":
                        textElement.setValue(xbbaResult.getNamed());
                        break;
                    case "$$026":
                        textElement.setValue(xbbaResult.getCd2().toString());
                        break;
                    case "$$027":
                        textElement.setValue(xbbaResult.getThkdn().toString());
                        break;
                    case "$$028":
                        textElement.setValue(xbbaResult.getD1().toString());
                        break;
                    case "$$029":
                        textElement.setValue(xbbaResult.getD2().toString());
                        break;
                    case "$$030":
                        textElement.setValue(xbbaResult.getH().toString());
                        break;
                    case "$$031":
                        textElement.setValue(xbbaResult.getHc().toString());
                        break;

                    case "$$032":
                        textElement.setValue(xbbaResult.getOc1allow().toString());
                        break;

                    case "$$033":
                        textElement.setValue(xbbaResult.getDensitys().toString());
                        break;
                    case "$$034":
                        textElement.setValue(xbbaResult.getCs1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(xbbaResult.getOstallow().toString());
                        break;
                    case "$$036":
                        textElement.setValue(xbbaResult.getRstel().toString());
                        break;
                    case "$$037":
                        textElement.setValue(xbbaResult.getEst().toString());
                        break;

                    case "$$038":
                        textElement.setValue(xbbaResult.getDensityb().toString());
                        break;
                    case "$$039":
                        textElement.setValue(xbbaResult.getObtallow().toString());
                        break;

                    case "$$040":
                        textElement.setValue(xbbaResult.getDensityd().toString());
                        break;
                    case "$$041":
                        textElement.setValue(xbbaResult.getCd1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(xbbaResult.getOdtallow().toString());
                        break;

                    case "$$043":
                        textElement.setValue(xbbaResult.getPw().toString());
                        break;
                    case "$$044":
                        textElement.setValue(xbbaResult.getAlphae().toString());
                        break;
                    case "$$045":
                        textElement.setValue(xbbaResult.getG().toString());
                        break;
                    case "$$046":
                        textElement.setValue(xbbaResult.getPe().toString());
                        break;
                    case "$$047":
                        textElement.setValue(xbbaResult.getFh().toString());
                        break;
                    case "$$048":
                        textElement.setValue(xbbaResult.getW1().toString());
                        break;
                    case "$$049":
                        textElement.setValue(xbbaResult.getR().toString());
                        break;
                    case "$$050":
                        textElement.setValue(xbbaResult.getFl1().toString());
                        break;
                    case "$$051":
                        textElement.setValue(xbbaResult.getFl2().toString());
                        break;

                    case "$$052":
                        textElement.setValue(xbbaResult.getCs().toString());
                        break;
                    case "$$053":
                        textElement.setValue(xbbaResult.getThkse().toString());
                        break;
                    case "$$054":
                        textElement.setValue(xbbaResult.getA().toString());
                        break;
                    case "$$055":
                        textElement.setValue(xbbaResult.getIxx().toString());
                        break;
                    case "$$056":
                        textElement.setValue(xbbaResult.getIyy().toString());
                        break;
                    case "$$057":
                        textElement.setValue(xbbaResult.getWmin().toString());
                        break;
                    case "$$058":
                        textElement.setValue(xbbaResult.getImin().toString());
                        break;
                    case "$$059":
                        textElement.setValue(xbbaResult.getIh().toString());
                        break;
                    case "$$060":
                        textElement.setValue(xbbaResult.getLamuda().toString());
                        break;
                    case "$$061":
                        textElement.setValue(xbbaResult.getLamudah().toString());
                        break;
                    case "$$062":
                        textElement.setValue(xbbaResult.getNs().toString());
                        break;
                    case "$$063":
                        textElement.setValue(xbbaResult.getEta().toString());
                        break;
                    case "$$064":
                        textElement.setValue(xbbaResult.getOcrallow().toString());
                        break;
                    case "$$065":
                        textElement.setValue(xbbaResult.getOc().toString());
                        break;
                    case "$$066":
                        textElement.setValue(xbbaResult.getOcchk());
                        break;
                    case "$$067":
                        textElement.setValue(xbbaResult.getTau().toString());
                        break;
                    case "$$068":
                        textElement.setValue(xbbaResult.getTauallow().toString());
                        break;
                    case "$$069":
                        textElement.setValue(xbbaResult.getTauchk());
                        break;
                    case "$$070":
                        textElement.setValue(xbbaResult.getL1().toString());
                        break;
                    case "$$071":
                        textElement.setValue(xbbaResult.getOb().toString());
                        break;
                    case "$$072":
                        textElement.setValue(xbbaResult.getOballow().toString());
                        break;
                    case "$$073":
                        textElement.setValue(xbbaResult.getObchk());
                        break;
                    case "$$074":
                        textElement.setValue(xbbaResult.getTotalchk());
                        break;

                    case "$$075":
                        textElement.setValue(xbbaResult.getDmin().toString());
                        break;
                    case "$$076":
                        textElement.setValue(xbbaResult.getAbt().toString());
                        break;
                    case "$$077":
                        textElement.setValue(xbbaResult.getObt().toString());
                        break;
                    case "$$078":
                        textElement.setValue(xbbaResult.getObtchk());
                        break;
                    case "$$079":
                        textElement.setValue(xbbaResult.getTaubt().toString());
                        break;
                    case "$$080":
                        textElement.setValue(xbbaResult.getTaubtallow().toString());
                        break;
                    case "$$081":
                        textElement.setValue(xbbaResult.getTaubtchk());
                        break;

                    case "$$082":
                        textElement.setValue(xbbaResult.getOc1().toString());
                        break;
                    case "$$083":
                        textElement.setValue(xbbaResult.getOc1chk());
                        break;

                    case "$$084":
                        textElement.setValue(xbbaResult.getThkdc().toString());
                        break;
                    case "$$085":
                        textElement.setValue(xbbaResult.getThkdd().toString());
                        break;
                    case "$$086":
                        textElement.setValue(xbbaResult.getThkdchk());
                        break;

                    case "$$087":
                        textElement.setValue(xbbaResult.getFai().toString());
                        break;
                    case "$$088":
                        textElement.setValue(xbbaResult.getBallow().toString());
                        break;
                    case "$$089":
                        textElement.setValue(xbbaResult.getHf1().toString());
                        break;
                    case "$$090":
                        textElement.setValue(xbbaResult.getZ().toString());
                        break;
                    case "$$091":
                        textElement.setValue(xbbaResult.getOf().toString());
                        break;
                    case "$$092":
                        textElement.setValue(xbbaResult.getOfchk());
                        break;
                    case "$$093":
                        textElement.setValue(xbbaResult.getAf().toString());
                        break;
                    case "$$094":
                        textElement.setValue(xbbaResult.getTauf().toString());
                        break;
                    case "$$095":
                        textElement.setValue(xbbaResult.getTaufchk());
                        break;
                    case "$$096":
                        textElement.setValue(xbbaResult.getOt().toString());
                        break;
                    case "$$097":
                        textElement.setValue(xbbaResult.getOtchk());
                        break;

                    case "$02":
                        textElement.setValue(xbbaResult.getH0().toString());
                        break;
                    case "$03":
                        textElement.setValue(xbbaResult.getD0().toString());
                        break;
                    case "$11":
                        textElement.setValue(xbbaResult.getDout().toString());
                        break;
                    case "$12":
                        textElement.setValue(xbbaResult.getThksn().toString());
                        break;
                    case "$14":
                        textElement.setValue(xbbaResult.getE().toString());
                        break;
                    case "$15":
                        textElement.setValue(xbbaResult.getDb().toString());
                        break;
                    case "$16":
                        textElement.setValue(xbbaResult.getB().toString());
                        break;
                    case "$17":
                        textElement.setValue(xbbaResult.getHf().toString());
                        break;
                    case "$27":
                        textElement.setValue(xbbaResult.getThkdn().toString());
                        break;
                    case "$28":
                        textElement.setValue(xbbaResult.getD1().toString());
                        break;
                    case "$29":
                        textElement.setValue(xbbaResult.getD2().toString());
                        break;
                    case "$30":
                        textElement.setValue(xbbaResult.getH().toString());
                        break;
                    case "$31":
                        textElement.setValue(xbbaResult.getHc().toString());
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
     * xbbb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbbbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBBB(String baseFileName, XBBBDocx xbbbResult) {
        String template = "D:/mechw/static/west/cal/x/b/b/b/XBBB.docx";
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
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 98;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 99;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 100;
                        }
                        break;
                    case 36166:
                        if (value.equals("$13")) {
                            var15 = 101;
                        }
                        break;
                    case 36167:
                        if (value.equals("$14")) {
                            var15 = 102;
                        }
                        break;
                    case 36198:
                        if (value.equals("$24")) {
                            var15 = 103;
                        }
                        break;
                    case 36201:
                        if (value.equals("$27")) {
                            var15 = 104;
                        }
                        break;
                    case 36202:
                        if (value.equals("$28")) {
                            var15 = 105;
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
                    case 34367026:
                        if (value.equals("$$046")) {
                            var15 = 45;
                        }
                        break;
                    case 34367027:
                        if (value.equals("$$047")) {
                            var15 = 46;
                        }
                        break;
                    case 34367028:
                        if (value.equals("$$048")) {
                            var15 = 47;
                        }
                        break;
                    case 34367029:
                        if (value.equals("$$049")) {
                            var15 = 48;
                        }
                        break;
                    case 34367051:
                        if (value.equals("$$050")) {
                            var15 = 49;
                        }
                        break;
                    case 34367052:
                        if (value.equals("$$051")) {
                            var15 = 50;
                        }
                        break;
                    case 34367053:
                        if (value.equals("$$052")) {
                            var15 = 51;
                        }
                        break;
                    case 34367054:
                        if (value.equals("$$053")) {
                            var15 = 52;
                        }
                        break;
                    case 34367055:
                        if (value.equals("$$054")) {
                            var15 = 53;
                        }
                        break;
                    case 34367056:
                        if (value.equals("$$055")) {
                            var15 = 54;
                        }
                        break;
                    case 34367057:
                        if (value.equals("$$056")) {
                            var15 = 55;
                        }
                        break;
                    case 34367058:
                        if (value.equals("$$057")) {
                            var15 = 56;
                        }
                        break;
                    case 34367059:
                        if (value.equals("$$058")) {
                            var15 = 57;
                        }
                        break;
                    case 34367060:
                        if (value.equals("$$059")) {
                            var15 = 58;
                        }
                        break;
                    case 34367082:
                        if (value.equals("$$060")) {
                            var15 = 59;
                        }
                        break;
                    case 34367083:
                        if (value.equals("$$061")) {
                            var15 = 60;
                        }
                        break;
                    case 34367084:
                        if (value.equals("$$062")) {
                            var15 = 61;
                        }
                        break;
                    case 34367085:
                        if (value.equals("$$063")) {
                            var15 = 62;
                        }
                        break;
                    case 34367086:
                        if (value.equals("$$064")) {
                            var15 = 63;
                        }
                        break;
                    case 34367087:
                        if (value.equals("$$065")) {
                            var15 = 64;
                        }
                        break;
                    case 34367088:
                        if (value.equals("$$066")) {
                            var15 = 65;
                        }
                        break;
                    case 34367089:
                        if (value.equals("$$067")) {
                            var15 = 66;
                        }
                        break;
                    case 34367090:
                        if (value.equals("$$068")) {
                            var15 = 67;
                        }
                        break;
                    case 34367091:
                        if (value.equals("$$069")) {
                            var15 = 68;
                        }
                        break;
                    case 34367113:
                        if (value.equals("$$070")) {
                            var15 = 69;
                        }
                        break;
                    case 34367114:
                        if (value.equals("$$071")) {
                            var15 = 70;
                        }
                        break;
                    case 34367115:
                        if (value.equals("$$072")) {
                            var15 = 71;
                        }
                        break;
                    case 34367116:
                        if (value.equals("$$073")) {
                            var15 = 72;
                        }
                        break;
                    case 34367117:
                        if (value.equals("$$074")) {
                            var15 = 73;
                        }
                        break;
                    case 34367118:
                        if (value.equals("$$075")) {
                            var15 = 74;
                        }
                        break;
                    case 34367119:
                        if (value.equals("$$076")) {
                            var15 = 75;
                        }
                        break;
                    case 34367120:
                        if (value.equals("$$077")) {
                            var15 = 76;
                        }
                        break;
                    case 34367121:
                        if (value.equals("$$078")) {
                            var15 = 77;
                        }
                        break;
                    case 34367122:
                        if (value.equals("$$079")) {
                            var15 = 78;
                        }
                        break;
                    case 34367144:
                        if (value.equals("$$080")) {
                            var15 = 79;
                        }
                        break;
                    case 34367145:
                        if (value.equals("$$081")) {
                            var15 = 80;
                        }
                        break;
                    case 34367146:
                        if (value.equals("$$082")) {
                            var15 = 81;
                        }
                        break;
                    case 34367147:
                        if (value.equals("$$083")) {
                            var15 = 82;
                        }
                        break;
                    case 34367148:
                        if (value.equals("$$084")) {
                            var15 = 83;
                        }
                        break;
                    case 34367149:
                        if (value.equals("$$085")) {
                            var15 = 84;
                        }
                        break;
                    case 34367150:
                        if (value.equals("$$086")) {
                            var15 = 85;
                        }
                        break;
                    case 34367151:
                        if (value.equals("$$087")) {
                            var15 = 86;
                        }
                        break;
                    case 34367152:
                        if (value.equals("$$088")) {
                            var15 = 87;
                        }
                        break;
                    case 34367153:
                        if (value.equals("$$089")) {
                            var15 = 88;
                        }
                        break;
                    case 34367175:
                        if (value.equals("$$090")) {
                            var15 = 89;
                        }
                        break;
                    case 34367176:
                        if (value.equals("$$091")) {
                            var15 = 90;
                        }
                        break;
                    case 34367177:
                        if (value.equals("$$092")) {
                            var15 = 91;
                        }
                        break;
                    case 34367178:
                        if (value.equals("$$093")) {
                            var15 = 92;
                        }
                        break;
                    case 34367179:
                        if (value.equals("$$094")) {
                            var15 = 93;
                        }
                        break;
                    case 34367180:
                        if (value.equals("$$095")) {
                            var15 = 94;
                        }
                        break;
                    case 34367181:
                        if (value.equals("$$096")) {
                            var15 = 95;
                        }
                        break;
                    case 34367182:
                        if (value.equals("$$097")) {
                            var15 = 96;
                        }
                        break;
                    case 34367183:
                        if (value.equals("$$098")) {
                            var15 = 97;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xbbbResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(xbbbResult.getH0().toString());
                        break;
                    case 2:
                        textElement.setValue(xbbbResult.getD0().toString());
                        break;
                    case 3:
                        textElement.setValue(xbbbResult.getDs0().toString());
                        break;
                    case 4:
                        textElement.setValue(xbbbResult.getM0().toString());
                        break;
                    case 5:
                        textElement.setValue(xbbbResult.getQ0().toString());
                        break;
                    case 6:
                        textElement.setValue(xbbbResult.getFi().toString());
                        break;
                    case 7:
                        textElement.setValue(xbbbResult.getEq());
                        break;
                    case 8:
                        textElement.setValue(xbbbResult.getStds());
                        break;
                    case 9:
                        textElement.setValue(xbbbResult.getNames());
                        break;
                    case 10:
                        textElement.setValue(xbbbResult.getN().toString());
                        break;
                    case 11:
                        textElement.setValue(xbbbResult.getNorms());
                        break;
                    case 12:
                        textElement.setValue(xbbbResult.getBb().toString());
                        break;
                    case 13:
                        textElement.setValue(xbbbResult.getHf().toString());
                        break;
                    case 14:
                        textElement.setValue(xbbbResult.getTf1().toString());
                        break;
                    case 15:
                        textElement.setValue(xbbbResult.getStdb());
                        break;
                    case 16:
                        textElement.setValue(xbbbResult.getNameb());
                        break;
                    case 17:
                        textElement.setValue(xbbbResult.getNormb());
                        break;
                    case 18:
                        textElement.setValue(xbbbResult.getNbt().toString());
                        break;
                    case 19:
                        textElement.setValue(xbbbResult.getCb2().toString());
                        break;
                    case 20:
                        textElement.setValue(xbbbResult.getStdd());
                        break;
                    case 21:
                        textElement.setValue(xbbbResult.getNamed());
                        break;
                    case 22:
                        textElement.setValue(xbbbResult.getCd2().toString());
                        break;
                    case 23:
                        textElement.setValue(xbbbResult.getThkdn().toString());
                        break;
                    case 24:
                        textElement.setValue(xbbbResult.getD1().toString());
                        break;
                    case 25:
                        textElement.setValue(xbbbResult.getD2().toString());
                        break;
                    case 26:
                        textElement.setValue(xbbbResult.getH().toString());
                        break;
                    case 27:
                        textElement.setValue(xbbbResult.getHc().toString());
                        break;
                    case 28:
                        textElement.setValue(xbbbResult.getOc1allow().toString());
                        break;
                    case 29:
                        textElement.setValue(xbbbResult.getOstallow().toString());
                        break;
                    case 30:
                        textElement.setValue(xbbbResult.getRstel().toString());
                        break;
                    case 31:
                        textElement.setValue(xbbbResult.getEst().toString());
                        break;
                    case 32:
                        textElement.setValue(xbbbResult.getSb().toString());
                        break;
                    case 33:
                        textElement.setValue(xbbbResult.getD().toString());
                        break;
                    case 34:
                        textElement.setValue(xbbbResult.getA().toString());
                        break;
                    case 35:
                        textElement.setValue(xbbbResult.getDensityb().toString());
                        break;
                    case 36:
                        textElement.setValue(xbbbResult.getObtallow().toString());
                        break;
                    case 37:
                        textElement.setValue(xbbbResult.getDensitys().toString());
                        break;
                    case 38:
                        textElement.setValue(xbbbResult.getAo().toString());
                        break;
                    case 39:
                        textElement.setValue(xbbbResult.getIxx().toString());
                        break;
                    case 40:
                        textElement.setValue(xbbbResult.getIyy().toString());
                        break;
                    case 41:
                        textElement.setValue(xbbbResult.getWmin().toString());
                        break;
                    case 42:
                        textElement.setValue(xbbbResult.getZ0().toString());
                        break;
                    case 43:
                        textElement.setValue(xbbbResult.getDensityd().toString());
                        break;
                    case 44:
                        textElement.setValue(xbbbResult.getCd1().toString());
                        break;
                    case 45:
                        textElement.setValue(xbbbResult.getOdtallow().toString());
                        break;
                    case 46:
                        textElement.setValue(xbbbResult.getPw().toString());
                        break;
                    case 47:
                        textElement.setValue(xbbbResult.getAlphae().toString());
                        break;
                    case 48:
                        textElement.setValue(xbbbResult.getG().toString());
                        break;
                    case 49:
                        textElement.setValue(xbbbResult.getPe().toString());
                        break;
                    case 50:
                        textElement.setValue(xbbbResult.getFh().toString());
                        break;
                    case 51:
                        textElement.setValue(xbbbResult.getW1().toString());
                        break;
                    case 52:
                        textElement.setValue(xbbbResult.getR().toString());
                        break;
                    case 53:
                        textElement.setValue(xbbbResult.getS().toString());
                        break;
                    case 54:
                        textElement.setValue(xbbbResult.getDb().toString());
                        break;
                    case 55:
                        textElement.setValue(xbbbResult.getFl1().toString());
                        break;
                    case 56:
                        textElement.setValue(xbbbResult.getFl2().toString());
                        break;
                    case 57:
                        textElement.setValue(xbbbResult.getImin().toString());
                        break;
                    case 58:
                        textElement.setValue(xbbbResult.getIh().toString());
                        break;
                    case 59:
                        textElement.setValue(xbbbResult.getLamuda().toString());
                        break;
                    case 60:
                        textElement.setValue(xbbbResult.getLamudah().toString());
                        break;
                    case 61:
                        textElement.setValue(xbbbResult.getNs().toString());
                        break;
                    case 62:
                        textElement.setValue(xbbbResult.getEta().toString());
                        break;
                    case 63:
                        textElement.setValue(xbbbResult.getOcrallow().toString());
                        break;
                    case 64:
                        textElement.setValue(xbbbResult.getOc().toString());
                        break;
                    case 65:
                        textElement.setValue(xbbbResult.getOcchk());
                        break;
                    case 66:
                        textElement.setValue(xbbbResult.getTau().toString());
                        break;
                    case 67:
                        textElement.setValue(xbbbResult.getTauallow().toString());
                        break;
                    case 68:
                        textElement.setValue(xbbbResult.getTauchk());
                        break;
                    case 69:
                        textElement.setValue(xbbbResult.getL1().toString());
                        break;
                    case 70:
                        textElement.setValue(xbbbResult.getE().toString());
                        break;
                    case 71:
                        textElement.setValue(xbbbResult.getOb().toString());
                        break;
                    case 72:
                        textElement.setValue(xbbbResult.getOballow().toString());
                        break;
                    case 73:
                        textElement.setValue(xbbbResult.getObchk());
                        break;
                    case 74:
                        textElement.setValue(xbbbResult.getTotalchk());
                        break;
                    case 75:
                        textElement.setValue(xbbbResult.getDmin().toString());
                        break;
                    case 76:
                        textElement.setValue(xbbbResult.getAbt().toString());
                        break;
                    case 77:
                        textElement.setValue(xbbbResult.getObt().toString());
                        break;
                    case 78:
                        textElement.setValue(xbbbResult.getObtchk());
                        break;
                    case 79:
                        textElement.setValue(xbbbResult.getTaubt().toString());
                        break;
                    case 80:
                        textElement.setValue(xbbbResult.getTaubtallow().toString());
                        break;
                    case 81:
                        textElement.setValue(xbbbResult.getTaubtchk());
                        break;
                    case 82:
                        textElement.setValue(xbbbResult.getOc1().toString());
                        break;
                    case 83:
                        textElement.setValue(xbbbResult.getOc1chk());
                        break;
                    case 84:
                        textElement.setValue(xbbbResult.getThkdc().toString());
                        break;
                    case 85:
                        textElement.setValue(xbbbResult.getThkdd().toString());
                        break;
                    case 86:
                        textElement.setValue(xbbbResult.getThkdchk());
                        break;
                    case 87:
                        textElement.setValue(xbbbResult.getFai().toString());
                        break;
                    case 88:
                        textElement.setValue(xbbbResult.getBallow().toString());
                        break;
                    case 89:
                        textElement.setValue(xbbbResult.getHf1().toString());
                        break;
                    case 90:
                        textElement.setValue(xbbbResult.getZ().toString());
                        break;
                    case 91:
                        textElement.setValue(xbbbResult.getOf().toString());
                        break;
                    case 92:
                        textElement.setValue(xbbbResult.getOfchk());
                        break;
                    case 93:
                        textElement.setValue(xbbbResult.getAf().toString());
                        break;
                    case 94:
                        textElement.setValue(xbbbResult.getTauf().toString());
                        break;
                    case 95:
                        textElement.setValue(xbbbResult.getTaufchk());
                        break;
                    case 96:
                        textElement.setValue(xbbbResult.getOt().toString());
                        break;
                    case 97:
                        textElement.setValue(xbbbResult.getOtchk());
                        break;
                    case 98:
                        textElement.setValue(xbbbResult.getH0().toString());
                        break;
                    case 99:
                        textElement.setValue(xbbbResult.getD0().toString());
                        break;
                    case 100:
                        textElement.setValue(xbbbResult.getDs0().toString());
                        break;
                    case 101:
                        textElement.setValue(xbbbResult.getBb().toString());
                        break;
                    case 102:
                        textElement.setValue(xbbbResult.getHf().toString());
                        break;
                    case 103:
                        textElement.setValue(xbbbResult.getThkdn().toString());
                        break;
                    case 104:
                        textElement.setValue(xbbbResult.getH().toString());
                        break;
                    case 105:
                        textElement.setValue(xbbbResult.getHc().toString());
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
     * xbbc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbbcResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBBC(String baseFileName, XBBCDocx xbbcResult) {
        String template = "D:/mechw/static/west/cal/x/b/b/c/XBBC.docx";
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
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 99;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 100;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 101;
                        }
                        break;
                    case 36166:
                        if (value.equals("$13")) {
                            var15 = 102;
                        }
                        break;
                    case 36167:
                        if (value.equals("$14")) {
                            var15 = 103;
                        }
                        break;
                    case 36198:
                        if (value.equals("$24")) {
                            var15 = 104;
                        }
                        break;
                    case 36201:
                        if (value.equals("$27")) {
                            var15 = 105;
                        }
                        break;
                    case 36202:
                        if (value.equals("$28")) {
                            var15 = 106;
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
                    case 34367026:
                        if (value.equals("$$046")) {
                            var15 = 45;
                        }
                        break;
                    case 34367027:
                        if (value.equals("$$047")) {
                            var15 = 46;
                        }
                        break;
                    case 34367028:
                        if (value.equals("$$048")) {
                            var15 = 47;
                        }
                        break;
                    case 34367029:
                        if (value.equals("$$049")) {
                            var15 = 48;
                        }
                        break;
                    case 34367051:
                        if (value.equals("$$050")) {
                            var15 = 49;
                        }
                        break;
                    case 34367052:
                        if (value.equals("$$051")) {
                            var15 = 50;
                        }
                        break;
                    case 34367053:
                        if (value.equals("$$052")) {
                            var15 = 51;
                        }
                        break;
                    case 34367054:
                        if (value.equals("$$053")) {
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
                        break;
                    case 34367082:
                        if (value.equals("$$060")) {
                            var15 = 58;
                        }
                        break;
                    case 34367083:
                        if (value.equals("$$061")) {
                            var15 = 59;
                        }
                        break;
                    case 34367084:
                        if (value.equals("$$062")) {
                            var15 = 60;
                        }
                        break;
                    case 34367085:
                        if (value.equals("$$063")) {
                            var15 = 61;
                        }
                        break;
                    case 34367086:
                        if (value.equals("$$064")) {
                            var15 = 62;
                        }
                        break;
                    case 34367087:
                        if (value.equals("$$065")) {
                            var15 = 63;
                        }
                        break;
                    case 34367088:
                        if (value.equals("$$066")) {
                            var15 = 64;
                        }
                        break;
                    case 34367089:
                        if (value.equals("$$067")) {
                            var15 = 65;
                        }
                        break;
                    case 34367090:
                        if (value.equals("$$068")) {
                            var15 = 66;
                        }
                        break;
                    case 34367091:
                        if (value.equals("$$069")) {
                            var15 = 67;
                        }
                        break;
                    case 34367113:
                        if (value.equals("$$070")) {
                            var15 = 68;
                        }
                        break;
                    case 34367114:
                        if (value.equals("$$071")) {
                            var15 = 69;
                        }
                        break;
                    case 34367115:
                        if (value.equals("$$072")) {
                            var15 = 70;
                        }
                        break;
                    case 34367116:
                        if (value.equals("$$073")) {
                            var15 = 71;
                        }
                        break;
                    case 34367117:
                        if (value.equals("$$074")) {
                            var15 = 72;
                        }
                        break;
                    case 34367118:
                        if (value.equals("$$075")) {
                            var15 = 73;
                        }
                        break;
                    case 34367119:
                        if (value.equals("$$076")) {
                            var15 = 74;
                        }
                        break;
                    case 34367120:
                        if (value.equals("$$077")) {
                            var15 = 75;
                        }
                        break;
                    case 34367121:
                        if (value.equals("$$078")) {
                            var15 = 76;
                        }
                        break;
                    case 34367122:
                        if (value.equals("$$079")) {
                            var15 = 77;
                        }
                        break;
                    case 34367144:
                        if (value.equals("$$080")) {
                            var15 = 78;
                        }
                        break;
                    case 34367145:
                        if (value.equals("$$081")) {
                            var15 = 79;
                        }
                        break;
                    case 34367146:
                        if (value.equals("$$082")) {
                            var15 = 80;
                        }
                        break;
                    case 34367147:
                        if (value.equals("$$083")) {
                            var15 = 81;
                        }
                        break;
                    case 34367148:
                        if (value.equals("$$084")) {
                            var15 = 82;
                        }
                        break;
                    case 34367149:
                        if (value.equals("$$085")) {
                            var15 = 83;
                        }
                        break;
                    case 34367150:
                        if (value.equals("$$086")) {
                            var15 = 84;
                        }
                        break;
                    case 34367151:
                        if (value.equals("$$087")) {
                            var15 = 85;
                        }
                        break;
                    case 34367152:
                        if (value.equals("$$088")) {
                            var15 = 86;
                        }
                        break;
                    case 34367153:
                        if (value.equals("$$089")) {
                            var15 = 87;
                        }
                        break;
                    case 34367175:
                        if (value.equals("$$090")) {
                            var15 = 88;
                        }
                        break;
                    case 34367176:
                        if (value.equals("$$091")) {
                            var15 = 89;
                        }
                        break;
                    case 34367177:
                        if (value.equals("$$092")) {
                            var15 = 90;
                        }
                        break;
                    case 34367178:
                        if (value.equals("$$093")) {
                            var15 = 91;
                        }
                        break;
                    case 34367179:
                        if (value.equals("$$094")) {
                            var15 = 92;
                        }
                        break;
                    case 34367180:
                        if (value.equals("$$095")) {
                            var15 = 93;
                        }
                        break;
                    case 34367181:
                        if (value.equals("$$096")) {
                            var15 = 94;
                        }
                        break;
                    case 34367182:
                        if (value.equals("$$097")) {
                            var15 = 95;
                        }
                        break;
                    case 34367183:
                        if (value.equals("$$098")) {
                            var15 = 96;
                        }
                        break;
                    case 34368818:
                        if (value.equals("$$200")) {
                            var15 = 97;
                        }
                        break;
                    case 34368819:
                        if (value.equals("$$201")) {
                            var15 = 98;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xbbcResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(xbbcResult.getH0().toString());
                        break;
                    case 2:
                        textElement.setValue(xbbcResult.getD0().toString());
                        break;
                    case 3:
                        textElement.setValue(xbbcResult.getDs0().toString());
                        break;
                    case 4:
                        textElement.setValue(xbbcResult.getM0().toString());
                        break;
                    case 5:
                        textElement.setValue(xbbcResult.getQ0().toString());
                        break;
                    case 6:
                        textElement.setValue(xbbcResult.getFi().toString());
                        break;
                    case 7:
                        textElement.setValue(xbbcResult.getEq());
                        break;
                    case 8:
                        textElement.setValue(xbbcResult.getStds());
                        break;
                    case 9:
                        textElement.setValue(xbbcResult.getNames());
                        break;
                    case 10:
                        textElement.setValue(xbbcResult.getN().toString());
                        break;
                    case 11:
                        textElement.setValue(xbbcResult.getNorms());
                        break;
                    case 12:
                        textElement.setValue(xbbcResult.getBb().toString());
                        break;
                    case 13:
                        textElement.setValue(xbbcResult.getHf().toString());
                        break;
                    case 14:
                        textElement.setValue(xbbcResult.getTf1().toString());
                        break;
                    case 15:
                        textElement.setValue(xbbcResult.getStdb());
                        break;
                    case 16:
                        textElement.setValue(xbbcResult.getNameb());
                        break;
                    case 17:
                        textElement.setValue(xbbcResult.getNormb());
                        break;
                    case 18:
                        textElement.setValue(xbbcResult.getNbt().toString());
                        break;
                    case 19:
                        textElement.setValue(xbbcResult.getCb2().toString());
                        break;
                    case 20:
                        textElement.setValue(xbbcResult.getStdd());
                        break;
                    case 21:
                        textElement.setValue(xbbcResult.getNamed());
                        break;
                    case 22:
                        textElement.setValue(xbbcResult.getCd2().toString());
                        break;
                    case 23:
                        textElement.setValue(xbbcResult.getThkdn().toString());
                        break;
                    case 24:
                        textElement.setValue(xbbcResult.getD1().toString());
                        break;
                    case 25:
                        textElement.setValue(xbbcResult.getD2().toString());
                        break;
                    case 26:
                        textElement.setValue(xbbcResult.getH().toString());
                        break;
                    case 27:
                        textElement.setValue(xbbcResult.getHc().toString());
                        break;
                    case 28:
                        textElement.setValue(xbbcResult.getOc1allow().toString());
                        break;
                    case 29:
                        textElement.setValue(xbbcResult.getOstallow().toString());
                        break;
                    case 30:
                        textElement.setValue(xbbcResult.getRstel().toString());
                        break;
                    case 31:
                        textElement.setValue(xbbcResult.getEst().toString());
                        break;
                    case 32:
                        textElement.setValue(xbbcResult.getSh().toString());
                        break;
                    case 33:
                        textElement.setValue(xbbcResult.getTm().toString());
                        break;
                    case 34:
                        textElement.setValue(xbbcResult.getA().toString());
                        break;
                    case 35:
                        textElement.setValue(xbbcResult.getDensityb().toString());
                        break;
                    case 36:
                        textElement.setValue(xbbcResult.getObtallow().toString());
                        break;
                    case 37:
                        textElement.setValue(xbbcResult.getDensitys().toString());
                        break;
                    case 38:
                        textElement.setValue(xbbcResult.getAo().toString());
                        break;
                    case 39:
                        textElement.setValue(xbbcResult.getIxx().toString());
                        break;
                    case 40:
                        textElement.setValue(xbbcResult.getIyy().toString());
                        break;
                    case 41:
                        textElement.setValue(xbbcResult.getWmin().toString());
                        break;
                    case 42:
                        textElement.setValue(xbbcResult.getZ0().toString());
                        break;
                    case 43:
                        textElement.setValue(xbbcResult.getDensityd().toString());
                        break;
                    case 44:
                        textElement.setValue(xbbcResult.getCd1().toString());
                        break;
                    case 45:
                        textElement.setValue(xbbcResult.getOdtallow().toString());
                        break;
                    case 46:
                        textElement.setValue(xbbcResult.getPw().toString());
                        break;
                    case 47:
                        textElement.setValue(xbbcResult.getAlphae().toString());
                        break;
                    case 48:
                        textElement.setValue(xbbcResult.getG().toString());
                        break;
                    case 49:
                        textElement.setValue(xbbcResult.getPe().toString());
                        break;
                    case 50:
                        textElement.setValue(xbbcResult.getFh().toString());
                        break;
                    case 51:
                        textElement.setValue(xbbcResult.getW1().toString());
                        break;
                    case 52:
                        textElement.setValue(xbbcResult.getR().toString());
                        break;
                    case 53:
                        textElement.setValue(xbbcResult.getDb().toString());
                        break;
                    case 54:
                        textElement.setValue(xbbcResult.getFl1().toString());
                        break;
                    case 55:
                        textElement.setValue(xbbcResult.getFl2().toString());
                        break;
                    case 56:
                        textElement.setValue(xbbcResult.getImin().toString());
                        break;
                    case 57:
                        textElement.setValue(xbbcResult.getIh().toString());
                        break;
                    case 58:
                        textElement.setValue(xbbcResult.getLamuda().toString());
                        break;
                    case 59:
                        textElement.setValue(xbbcResult.getLamudah().toString());
                        break;
                    case 60:
                        textElement.setValue(xbbcResult.getNs().toString());
                        break;
                    case 61:
                        textElement.setValue(xbbcResult.getEta().toString());
                        break;
                    case 62:
                        textElement.setValue(xbbcResult.getOcrallow().toString());
                        break;
                    case 63:
                        textElement.setValue(xbbcResult.getOc().toString());
                        break;
                    case 64:
                        textElement.setValue(xbbcResult.getOcchk());
                        break;
                    case 65:
                        textElement.setValue(xbbcResult.getTau().toString());
                        break;
                    case 66:
                        textElement.setValue(xbbcResult.getTauallow().toString());
                        break;
                    case 67:
                        textElement.setValue(xbbcResult.getTauchk());
                        break;
                    case 68:
                        textElement.setValue(xbbcResult.getL1().toString());
                        break;
                    case 69:
                        textElement.setValue(xbbcResult.getE().toString());
                        break;
                    case 70:
                        textElement.setValue(xbbcResult.getOb().toString());
                        break;
                    case 71:
                        textElement.setValue(xbbcResult.getOballow().toString());
                        break;
                    case 72:
                        textElement.setValue(xbbcResult.getObchk());
                        break;
                    case 73:
                        textElement.setValue(xbbcResult.getTotalchk());
                        break;
                    case 74:
                        textElement.setValue(xbbcResult.getDmin().toString());
                        break;
                    case 75:
                        textElement.setValue(xbbcResult.getAbt().toString());
                        break;
                    case 76:
                        textElement.setValue(xbbcResult.getObt().toString());
                        break;
                    case 77:
                        textElement.setValue(xbbcResult.getObtchk());
                        break;
                    case 78:
                        textElement.setValue(xbbcResult.getTaubt().toString());
                        break;
                    case 79:
                        textElement.setValue(xbbcResult.getTaubtallow().toString());
                        break;
                    case 80:
                        textElement.setValue(xbbcResult.getTaubtchk());
                        break;
                    case 81:
                        textElement.setValue(xbbcResult.getOc1().toString());
                        break;
                    case 82:
                        textElement.setValue(xbbcResult.getOc1chk());
                        break;
                    case 83:
                        textElement.setValue(xbbcResult.getThkdc().toString());
                        break;
                    case 84:
                        textElement.setValue(xbbcResult.getThkdd().toString());
                        break;
                    case 85:
                        textElement.setValue(xbbcResult.getThkdchk());
                        break;
                    case 86:
                        textElement.setValue(xbbcResult.getFai().toString());
                        break;
                    case 87:
                        textElement.setValue(xbbcResult.getBallow().toString());
                        break;
                    case 88:
                        textElement.setValue(xbbcResult.getHf1().toString());
                        break;
                    case 89:
                        textElement.setValue(xbbcResult.getZ().toString());
                        break;
                    case 90:
                        textElement.setValue(xbbcResult.getOf().toString());
                        break;
                    case 91:
                        textElement.setValue(xbbcResult.getOfchk());
                        break;
                    case 92:
                        textElement.setValue(xbbcResult.getAf().toString());
                        break;
                    case 93:
                        textElement.setValue(xbbcResult.getTauf().toString());
                        break;
                    case 94:
                        textElement.setValue(xbbcResult.getTaufchk());
                        break;
                    case 95:
                        textElement.setValue(xbbcResult.getOt().toString());
                        break;
                    case 96:
                        textElement.setValue(xbbcResult.getOtchk());
                        break;
                    case 97:
                        textElement.setValue(xbbcResult.getSb().toString());
                        break;
                    case 98:
                        textElement.setValue(xbbcResult.getD().toString());
                        break;
                    case 99:
                        textElement.setValue(xbbcResult.getH0().toString());
                        break;
                    case 100:
                        textElement.setValue(xbbcResult.getD0().toString());
                        break;
                    case 101:
                        textElement.setValue(xbbcResult.getDs0().toString());
                        break;
                    case 102:
                        textElement.setValue(xbbcResult.getBb().toString());
                        break;
                    case 103:
                        textElement.setValue(xbbcResult.getHf().toString());
                        break;
                    case 104:
                        textElement.setValue(xbbcResult.getThkdn().toString());
                        break;
                    case 105:
                        textElement.setValue(xbbcResult.getH().toString());
                        break;
                    case 106:
                        textElement.setValue(xbbcResult.getHc().toString());
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
     * xbbd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbbdResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBBD(String baseFileName, XBBDDocx xbbdResult) {
        String template = "D:/mechw/static/west/cal/x/b/b/d/XBBD.docx";
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
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 98;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 99;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 100;
                        }
                        break;
                    case 36166:
                        if (value.equals("$13")) {
                            var15 = 101;
                        }
                        break;
                    case 36167:
                        if (value.equals("$14")) {
                            var15 = 102;
                        }
                        break;
                    case 36198:
                        if (value.equals("$24")) {
                            var15 = 103;
                        }
                        break;
                    case 36201:
                        if (value.equals("$27")) {
                            var15 = 104;
                        }
                        break;
                    case 36202:
                        if (value.equals("$28")) {
                            var15 = 105;
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
                    case 34367024:
                        if (value.equals("$$044")) {
                            var15 = 42;
                        }
                        break;
                    case 34367025:
                        if (value.equals("$$045")) {
                            var15 = 43;
                        }
                        break;
                    case 34367026:
                        if (value.equals("$$046")) {
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
                    case 34367056:
                        if (value.equals("$$055")) {
                            var15 = 52;
                        }
                        break;
                    case 34367057:
                        if (value.equals("$$056")) {
                            var15 = 53;
                        }
                        break;
                    case 34367058:
                        if (value.equals("$$057")) {
                            var15 = 54;
                        }
                        break;
                    case 34367059:
                        if (value.equals("$$058")) {
                            var15 = 55;
                        }
                        break;
                    case 34367060:
                        if (value.equals("$$059")) {
                            var15 = 56;
                        }
                        break;
                    case 34367082:
                        if (value.equals("$$060")) {
                            var15 = 57;
                        }
                        break;
                    case 34367083:
                        if (value.equals("$$061")) {
                            var15 = 58;
                        }
                        break;
                    case 34367084:
                        if (value.equals("$$062")) {
                            var15 = 59;
                        }
                        break;
                    case 34367085:
                        if (value.equals("$$063")) {
                            var15 = 60;
                        }
                        break;
                    case 34367086:
                        if (value.equals("$$064")) {
                            var15 = 61;
                        }
                        break;
                    case 34367087:
                        if (value.equals("$$065")) {
                            var15 = 62;
                        }
                        break;
                    case 34367088:
                        if (value.equals("$$066")) {
                            var15 = 63;
                        }
                        break;
                    case 34367089:
                        if (value.equals("$$067")) {
                            var15 = 64;
                        }
                        break;
                    case 34367090:
                        if (value.equals("$$068")) {
                            var15 = 65;
                        }
                        break;
                    case 34367091:
                        if (value.equals("$$069")) {
                            var15 = 66;
                        }
                        break;
                    case 34367113:
                        if (value.equals("$$070")) {
                            var15 = 67;
                        }
                        break;
                    case 34367114:
                        if (value.equals("$$071")) {
                            var15 = 68;
                        }
                        break;
                    case 34367115:
                        if (value.equals("$$072")) {
                            var15 = 69;
                        }
                        break;
                    case 34367116:
                        if (value.equals("$$073")) {
                            var15 = 70;
                        }
                        break;
                    case 34367117:
                        if (value.equals("$$074")) {
                            var15 = 71;
                        }
                        break;
                    case 34367118:
                        if (value.equals("$$075")) {
                            var15 = 72;
                        }
                        break;
                    case 34367119:
                        if (value.equals("$$076")) {
                            var15 = 73;
                        }
                        break;
                    case 34367120:
                        if (value.equals("$$077")) {
                            var15 = 74;
                        }
                        break;
                    case 34367121:
                        if (value.equals("$$078")) {
                            var15 = 75;
                        }
                        break;
                    case 34367122:
                        if (value.equals("$$079")) {
                            var15 = 76;
                        }
                        break;
                    case 34367144:
                        if (value.equals("$$080")) {
                            var15 = 77;
                        }
                        break;
                    case 34367145:
                        if (value.equals("$$081")) {
                            var15 = 78;
                        }
                        break;
                    case 34367146:
                        if (value.equals("$$082")) {
                            var15 = 79;
                        }
                        break;
                    case 34367147:
                        if (value.equals("$$083")) {
                            var15 = 80;
                        }
                        break;
                    case 34367148:
                        if (value.equals("$$084")) {
                            var15 = 81;
                        }
                        break;
                    case 34367149:
                        if (value.equals("$$085")) {
                            var15 = 82;
                        }
                        break;
                    case 34367150:
                        if (value.equals("$$086")) {
                            var15 = 83;
                        }
                        break;
                    case 34367151:
                        if (value.equals("$$087")) {
                            var15 = 84;
                        }
                        break;
                    case 34367152:
                        if (value.equals("$$088")) {
                            var15 = 85;
                        }
                        break;
                    case 34367153:
                        if (value.equals("$$089")) {
                            var15 = 86;
                        }
                        break;
                    case 34367175:
                        if (value.equals("$$090")) {
                            var15 = 87;
                        }
                        break;
                    case 34367176:
                        if (value.equals("$$091")) {
                            var15 = 88;
                        }
                        break;
                    case 34367177:
                        if (value.equals("$$092")) {
                            var15 = 89;
                        }
                        break;
                    case 34367178:
                        if (value.equals("$$093")) {
                            var15 = 90;
                        }
                        break;
                    case 34367179:
                        if (value.equals("$$094")) {
                            var15 = 91;
                        }
                        break;
                    case 34367180:
                        if (value.equals("$$095")) {
                            var15 = 92;
                        }
                        break;
                    case 34367181:
                        if (value.equals("$$096")) {
                            var15 = 93;
                        }
                        break;
                    case 34367182:
                        if (value.equals("$$097")) {
                            var15 = 94;
                        }
                        break;
                    case 34367183:
                        if (value.equals("$$098")) {
                            var15 = 95;
                        }
                        break;
                    case 34368818:
                        if (value.equals("$$200")) {
                            var15 = 96;
                        }
                        break;
                    case 34368819:
                        if (value.equals("$$201")) {
                            var15 = 97;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xbbdResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(xbbdResult.getH0().toString());
                        break;
                    case 2:
                        textElement.setValue(xbbdResult.getD0().toString());
                        break;
                    case 3:
                        textElement.setValue(xbbdResult.getDs0().toString());
                        break;
                    case 4:
                        textElement.setValue(xbbdResult.getM0().toString());
                        break;
                    case 5:
                        textElement.setValue(xbbdResult.getQ0().toString());
                        break;
                    case 6:
                        textElement.setValue(xbbdResult.getFi().toString());
                        break;
                    case 7:
                        textElement.setValue(xbbdResult.getEq());
                        break;
                    case 8:
                        textElement.setValue(xbbdResult.getStds());
                        break;
                    case 9:
                        textElement.setValue(xbbdResult.getNames());
                        break;
                    case 10:
                        textElement.setValue(xbbdResult.getN().toString());
                        break;
                    case 11:
                        textElement.setValue(xbbdResult.getNorms());
                        break;
                    case 12:
                        textElement.setValue(xbbdResult.getBb().toString());
                        break;
                    case 13:
                        textElement.setValue(xbbdResult.getHf().toString());
                        break;
                    case 14:
                        textElement.setValue(xbbdResult.getTf1().toString());
                        break;
                    case 15:
                        textElement.setValue(xbbdResult.getStdb());
                        break;
                    case 16:
                        textElement.setValue(xbbdResult.getNameb());
                        break;
                    case 17:
                        textElement.setValue(xbbdResult.getNormb());
                        break;
                    case 18:
                        textElement.setValue(xbbdResult.getNbt().toString());
                        break;
                    case 19:
                        textElement.setValue(xbbdResult.getCb2().toString());
                        break;
                    case 20:
                        textElement.setValue(xbbdResult.getStdd());
                        break;
                    case 21:
                        textElement.setValue(xbbdResult.getNamed());
                        break;
                    case 22:
                        textElement.setValue(xbbdResult.getCd2().toString());
                        break;
                    case 23:
                        textElement.setValue(xbbdResult.getThkdn().toString());
                        break;
                    case 24:
                        textElement.setValue(xbbdResult.getD1().toString());
                        break;
                    case 25:
                        textElement.setValue(xbbdResult.getD2().toString());
                        break;
                    case 26:
                        textElement.setValue(xbbdResult.getH().toString());
                        break;
                    case 27:
                        textElement.setValue(xbbdResult.getHc().toString());
                        break;
                    case 28:
                        textElement.setValue(xbbdResult.getOc1allow().toString());
                        break;
                    case 29:
                        textElement.setValue(xbbdResult.getOstallow().toString());
                        break;
                    case 30:
                        textElement.setValue(xbbdResult.getRstel().toString());
                        break;
                    case 31:
                        textElement.setValue(xbbdResult.getEst().toString());
                        break;
                    case 32:
                        textElement.setValue(xbbdResult.getSh().toString());
                        break;
                    case 33:
                        textElement.setValue(xbbdResult.getTm().toString());
                        break;
                    case 34:
                        textElement.setValue(xbbdResult.getA().toString());
                        break;
                    case 35:
                        textElement.setValue(xbbdResult.getDensityb().toString());
                        break;
                    case 36:
                        textElement.setValue(xbbdResult.getObtallow().toString());
                        break;
                    case 37:
                        textElement.setValue(xbbdResult.getDensitys().toString());
                        break;
                    case 38:
                        textElement.setValue(xbbdResult.getAo().toString());
                        break;
                    case 39:
                        textElement.setValue(xbbdResult.getIxx().toString());
                        break;
                    case 40:
                        textElement.setValue(xbbdResult.getIyy().toString());
                        break;
                    case 41:
                        textElement.setValue(xbbdResult.getWmin().toString());
                        break;
                    case 42:
                        textElement.setValue(xbbdResult.getDensityd().toString());
                        break;
                    case 43:
                        textElement.setValue(xbbdResult.getCd1().toString());
                        break;
                    case 44:
                        textElement.setValue(xbbdResult.getOdtallow().toString());
                        break;
                    case 45:
                        textElement.setValue(xbbdResult.getPw().toString());
                        break;
                    case 46:
                        textElement.setValue(xbbdResult.getAlphae().toString());
                        break;
                    case 47:
                        textElement.setValue(xbbdResult.getG().toString());
                        break;
                    case 48:
                        textElement.setValue(xbbdResult.getPe().toString());
                        break;
                    case 49:
                        textElement.setValue(xbbdResult.getFh().toString());
                        break;
                    case 50:
                        textElement.setValue(xbbdResult.getW1().toString());
                        break;
                    case 51:
                        textElement.setValue(xbbdResult.getR().toString());
                        break;
                    case 52:
                        textElement.setValue(xbbdResult.getDb().toString());
                        break;
                    case 53:
                        textElement.setValue(xbbdResult.getFl1().toString());
                        break;
                    case 54:
                        textElement.setValue(xbbdResult.getFl2().toString());
                        break;
                    case 55:
                        textElement.setValue(xbbdResult.getImin().toString());
                        break;
                    case 56:
                        textElement.setValue(xbbdResult.getIh().toString());
                        break;
                    case 57:
                        textElement.setValue(xbbdResult.getLamuda().toString());
                        break;
                    case 58:
                        textElement.setValue(xbbdResult.getLamudah().toString());
                        break;
                    case 59:
                        textElement.setValue(xbbdResult.getNs().toString());
                        break;
                    case 60:
                        textElement.setValue(xbbdResult.getEta().toString());
                        break;
                    case 61:
                        textElement.setValue(xbbdResult.getOcrallow().toString());
                        break;
                    case 62:
                        textElement.setValue(xbbdResult.getOc().toString());
                        break;
                    case 63:
                        textElement.setValue(xbbdResult.getOcchk());
                        break;
                    case 64:
                        textElement.setValue(xbbdResult.getTau().toString());
                        break;
                    case 65:
                        textElement.setValue(xbbdResult.getTauallow().toString());
                        break;
                    case 66:
                        textElement.setValue(xbbdResult.getTauchk());
                        break;
                    case 67:
                        textElement.setValue(xbbdResult.getL1().toString());
                        break;
                    case 68:
                        textElement.setValue(xbbdResult.getE().toString());
                        break;
                    case 69:
                        textElement.setValue(xbbdResult.getOb().toString());
                        break;
                    case 70:
                        textElement.setValue(xbbdResult.getOballow().toString());
                        break;
                    case 71:
                        textElement.setValue(xbbdResult.getObchk());
                        break;
                    case 72:
                        textElement.setValue(xbbdResult.getTotalchk());
                        break;
                    case 73:
                        textElement.setValue(xbbdResult.getDmin().toString());
                        break;
                    case 74:
                        textElement.setValue(xbbdResult.getAbt().toString());
                        break;
                    case 75:
                        textElement.setValue(xbbdResult.getObt().toString());
                        break;
                    case 76:
                        textElement.setValue(xbbdResult.getObtchk());
                        break;
                    case 77:
                        textElement.setValue(xbbdResult.getTaubt().toString());
                        break;
                    case 78:
                        textElement.setValue(xbbdResult.getTaubtallow().toString());
                        break;
                    case 79:
                        textElement.setValue(xbbdResult.getTaubtchk());
                        break;
                    case 80:
                        textElement.setValue(xbbdResult.getOc1().toString());
                        break;
                    case 81:
                        textElement.setValue(xbbdResult.getOc1chk());
                        break;
                    case 82:
                        textElement.setValue(xbbdResult.getThkdc().toString());
                        break;
                    case 83:
                        textElement.setValue(xbbdResult.getThkdd().toString());
                        break;
                    case 84:
                        textElement.setValue(xbbdResult.getThkdchk());
                        break;
                    case 85:
                        textElement.setValue(xbbdResult.getFai().toString());
                        break;
                    case 86:
                        textElement.setValue(xbbdResult.getBallow().toString());
                        break;
                    case 87:
                        textElement.setValue(xbbdResult.getHf1().toString());
                        break;
                    case 88:
                        textElement.setValue(xbbdResult.getZ().toString());
                        break;
                    case 89:
                        textElement.setValue(xbbdResult.getOf().toString());
                        break;
                    case 90:
                        textElement.setValue(xbbdResult.getOfchk());
                        break;
                    case 91:
                        textElement.setValue(xbbdResult.getAf().toString());
                        break;
                    case 92:
                        textElement.setValue(xbbdResult.getTauf().toString());
                        break;
                    case 93:
                        textElement.setValue(xbbdResult.getTaufchk());
                        break;
                    case 94:
                        textElement.setValue(xbbdResult.getOt().toString());
                        break;
                    case 95:
                        textElement.setValue(xbbdResult.getOtchk());
                        break;
                    case 96:
                        textElement.setValue(xbbdResult.getSb().toString());
                        break;
                    case 97:
                        textElement.setValue(xbbdResult.getD().toString());
                        break;
                    case 98:
                        textElement.setValue(xbbdResult.getH0().toString());
                        break;
                    case 99:
                        textElement.setValue(xbbdResult.getD0().toString());
                        break;
                    case 100:
                        textElement.setValue(xbbdResult.getDs0().toString());
                        break;
                    case 101:
                        textElement.setValue(xbbdResult.getBb().toString());
                        break;
                    case 102:
                        textElement.setValue(xbbdResult.getHf().toString());
                        break;
                    case 103:
                        textElement.setValue(xbbdResult.getThkdn().toString());
                        break;
                    case 104:
                        textElement.setValue(xbbdResult.getH().toString());
                        break;
                    case 105:
                        textElement.setValue(xbbdResult.getHc().toString());
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
     * xbbe
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param xbbeResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getXBBE(String baseFileName, XBBEDocx xbbeResult) {
        String template = "D:/mechw/static/west/cal/x/b/b/e/XBBE.docx";
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
                    case 36134:
                        if (value.equals("$02")) {
                            var15 = 98;
                        }
                        break;
                    case 36135:
                        if (value.equals("$03")) {
                            var15 = 99;
                        }
                        break;
                    case 36136:
                        if (value.equals("$04")) {
                            var15 = 100;
                        }
                        break;
                    case 36166:
                        if (value.equals("$13")) {
                            var15 = 101;
                        }
                        break;
                    case 36167:
                        if (value.equals("$14")) {
                            var15 = 102;
                        }
                        break;
                    case 36198:
                        if (value.equals("$24")) {
                            var15 = 103;
                        }
                        break;
                    case 36201:
                        if (value.equals("$27")) {
                            var15 = 104;
                        }
                        break;
                    case 36202:
                        if (value.equals("$28")) {
                            var15 = 105;
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
                    case 34367024:
                        if (value.equals("$$044")) {
                            var15 = 42;
                        }
                        break;
                    case 34367025:
                        if (value.equals("$$045")) {
                            var15 = 43;
                        }
                        break;
                    case 34367026:
                        if (value.equals("$$046")) {
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
                    case 34367056:
                        if (value.equals("$$055")) {
                            var15 = 52;
                        }
                        break;
                    case 34367057:
                        if (value.equals("$$056")) {
                            var15 = 53;
                        }
                        break;
                    case 34367058:
                        if (value.equals("$$057")) {
                            var15 = 54;
                        }
                        break;
                    case 34367059:
                        if (value.equals("$$058")) {
                            var15 = 55;
                        }
                        break;
                    case 34367060:
                        if (value.equals("$$059")) {
                            var15 = 56;
                        }
                        break;
                    case 34367082:
                        if (value.equals("$$060")) {
                            var15 = 57;
                        }
                        break;
                    case 34367083:
                        if (value.equals("$$061")) {
                            var15 = 58;
                        }
                        break;
                    case 34367084:
                        if (value.equals("$$062")) {
                            var15 = 59;
                        }
                        break;
                    case 34367085:
                        if (value.equals("$$063")) {
                            var15 = 60;
                        }
                        break;
                    case 34367086:
                        if (value.equals("$$064")) {
                            var15 = 61;
                        }
                        break;
                    case 34367087:
                        if (value.equals("$$065")) {
                            var15 = 62;
                        }
                        break;
                    case 34367088:
                        if (value.equals("$$066")) {
                            var15 = 63;
                        }
                        break;
                    case 34367089:
                        if (value.equals("$$067")) {
                            var15 = 64;
                        }
                        break;
                    case 34367090:
                        if (value.equals("$$068")) {
                            var15 = 65;
                        }
                        break;
                    case 34367091:
                        if (value.equals("$$069")) {
                            var15 = 66;
                        }
                        break;
                    case 34367113:
                        if (value.equals("$$070")) {
                            var15 = 67;
                        }
                        break;
                    case 34367114:
                        if (value.equals("$$071")) {
                            var15 = 68;
                        }
                        break;
                    case 34367115:
                        if (value.equals("$$072")) {
                            var15 = 69;
                        }
                        break;
                    case 34367116:
                        if (value.equals("$$073")) {
                            var15 = 70;
                        }
                        break;
                    case 34367117:
                        if (value.equals("$$074")) {
                            var15 = 71;
                        }
                        break;
                    case 34367118:
                        if (value.equals("$$075")) {
                            var15 = 72;
                        }
                        break;
                    case 34367119:
                        if (value.equals("$$076")) {
                            var15 = 73;
                        }
                        break;
                    case 34367120:
                        if (value.equals("$$077")) {
                            var15 = 74;
                        }
                        break;
                    case 34367121:
                        if (value.equals("$$078")) {
                            var15 = 75;
                        }
                        break;
                    case 34367122:
                        if (value.equals("$$079")) {
                            var15 = 76;
                        }
                        break;
                    case 34367144:
                        if (value.equals("$$080")) {
                            var15 = 77;
                        }
                        break;
                    case 34367145:
                        if (value.equals("$$081")) {
                            var15 = 78;
                        }
                        break;
                    case 34367146:
                        if (value.equals("$$082")) {
                            var15 = 79;
                        }
                        break;
                    case 34367147:
                        if (value.equals("$$083")) {
                            var15 = 80;
                        }
                        break;
                    case 34367148:
                        if (value.equals("$$084")) {
                            var15 = 81;
                        }
                        break;
                    case 34367149:
                        if (value.equals("$$085")) {
                            var15 = 82;
                        }
                        break;
                    case 34367150:
                        if (value.equals("$$086")) {
                            var15 = 83;
                        }
                        break;
                    case 34367151:
                        if (value.equals("$$087")) {
                            var15 = 84;
                        }
                        break;
                    case 34367152:
                        if (value.equals("$$088")) {
                            var15 = 85;
                        }
                        break;
                    case 34367153:
                        if (value.equals("$$089")) {
                            var15 = 86;
                        }
                        break;
                    case 34367175:
                        if (value.equals("$$090")) {
                            var15 = 87;
                        }
                        break;
                    case 34367176:
                        if (value.equals("$$091")) {
                            var15 = 88;
                        }
                        break;
                    case 34367177:
                        if (value.equals("$$092")) {
                            var15 = 89;
                        }
                        break;
                    case 34367178:
                        if (value.equals("$$093")) {
                            var15 = 90;
                        }
                        break;
                    case 34367179:
                        if (value.equals("$$094")) {
                            var15 = 91;
                        }
                        break;
                    case 34367180:
                        if (value.equals("$$095")) {
                            var15 = 92;
                        }
                        break;
                    case 34367181:
                        if (value.equals("$$096")) {
                            var15 = 93;
                        }
                        break;
                    case 34367182:
                        if (value.equals("$$097")) {
                            var15 = 94;
                        }
                        break;
                    case 34367183:
                        if (value.equals("$$098")) {
                            var15 = 95;
                        }
                        break;
                    case 34368818:
                        if (value.equals("$$200")) {
                            var15 = 96;
                        }
                        break;
                    case 34368819:
                        if (value.equals("$$201")) {
                            var15 = 97;
                        }
                }

                switch (var15) {
                    case 0:
                        textElement.setValue(xbbeResult.getT().toString());
                        break;
                    case 1:
                        textElement.setValue(xbbeResult.getH0().toString());
                        break;
                    case 2:
                        textElement.setValue(xbbeResult.getD0().toString());
                        break;
                    case 3:
                        textElement.setValue(xbbeResult.getDs0().toString());
                        break;
                    case 4:
                        textElement.setValue(xbbeResult.getM0().toString());
                        break;
                    case 5:
                        textElement.setValue(xbbeResult.getQ0().toString());
                        break;
                    case 6:
                        textElement.setValue(xbbeResult.getFi().toString());
                        break;
                    case 7:
                        textElement.setValue(xbbeResult.getEq());
                        break;
                    case 8:
                        textElement.setValue(xbbeResult.getStds());
                        break;
                    case 9:
                        textElement.setValue(xbbeResult.getNames());
                        break;
                    case 10:
                        textElement.setValue(xbbeResult.getN().toString());
                        break;
                    case 11:
                        textElement.setValue(xbbeResult.getNorms());
                        break;
                    case 12:
                        textElement.setValue(xbbeResult.getBb().toString());
                        break;
                    case 13:
                        textElement.setValue(xbbeResult.getHf().toString());
                        break;
                    case 14:
                        textElement.setValue(xbbeResult.getTf1().toString());
                        break;
                    case 15:
                        textElement.setValue(xbbeResult.getStdb());
                        break;
                    case 16:
                        textElement.setValue(xbbeResult.getNameb());
                        break;
                    case 17:
                        textElement.setValue(xbbeResult.getNormb());
                        break;
                    case 18:
                        textElement.setValue(xbbeResult.getNbt().toString());
                        break;
                    case 19:
                        textElement.setValue(xbbeResult.getCb2().toString());
                        break;
                    case 20:
                        textElement.setValue(xbbeResult.getStdd());
                        break;
                    case 21:
                        textElement.setValue(xbbeResult.getNamed());
                        break;
                    case 22:
                        textElement.setValue(xbbeResult.getCd2().toString());
                        break;
                    case 23:
                        textElement.setValue(xbbeResult.getThkdn().toString());
                        break;
                    case 24:
                        textElement.setValue(xbbeResult.getD1().toString());
                        break;
                    case 25:
                        textElement.setValue(xbbeResult.getD2().toString());
                        break;
                    case 26:
                        textElement.setValue(xbbeResult.getH().toString());
                        break;
                    case 27:
                        textElement.setValue(xbbeResult.getHc().toString());
                        break;
                    case 28:
                        textElement.setValue(xbbeResult.getOc1allow().toString());
                        break;
                    case 29:
                        textElement.setValue(xbbeResult.getOstallow().toString());
                        break;
                    case 30:
                        textElement.setValue(xbbeResult.getRstel().toString());
                        break;
                    case 31:
                        textElement.setValue(xbbeResult.getEst().toString());
                        break;
                    case 32:
                        textElement.setValue(xbbeResult.getSh().toString());
                        break;
                    case 33:
                        textElement.setValue(xbbeResult.getT2().toString());
                        break;
                    case 34:
                        textElement.setValue(xbbeResult.getA().toString());
                        break;
                    case 35:
                        textElement.setValue(xbbeResult.getDensityb().toString());
                        break;
                    case 36:
                        textElement.setValue(xbbeResult.getObtallow().toString());
                        break;
                    case 37:
                        textElement.setValue(xbbeResult.getDensitys().toString());
                        break;
                    case 38:
                        textElement.setValue(xbbeResult.getAo().toString());
                        break;
                    case 39:
                        textElement.setValue(xbbeResult.getIxx().toString());
                        break;
                    case 40:
                        textElement.setValue(xbbeResult.getIyy().toString());
                        break;
                    case 41:
                        textElement.setValue(xbbeResult.getWmin().toString());
                        break;
                    case 42:
                        textElement.setValue(xbbeResult.getDensityd().toString());
                        break;
                    case 43:
                        textElement.setValue(xbbeResult.getCd1().toString());
                        break;
                    case 44:
                        textElement.setValue(xbbeResult.getOdtallow().toString());
                        break;
                    case 45:
                        textElement.setValue(xbbeResult.getPw().toString());
                        break;
                    case 46:
                        textElement.setValue(xbbeResult.getAlphae().toString());
                        break;
                    case 47:
                        textElement.setValue(xbbeResult.getG().toString());
                        break;
                    case 48:
                        textElement.setValue(xbbeResult.getPe().toString());
                        break;
                    case 49:
                        textElement.setValue(xbbeResult.getFh().toString());
                        break;
                    case 50:
                        textElement.setValue(xbbeResult.getW1().toString());
                        break;
                    case 51:
                        textElement.setValue(xbbeResult.getR().toString());
                        break;
                    case 52:
                        textElement.setValue(xbbeResult.getDb().toString());
                        break;
                    case 53:
                        textElement.setValue(xbbeResult.getFl1().toString());
                        break;
                    case 54:
                        textElement.setValue(xbbeResult.getFl2().toString());
                        break;
                    case 55:
                        textElement.setValue(xbbeResult.getImin().toString());
                        break;
                    case 56:
                        textElement.setValue(xbbeResult.getIh().toString());
                        break;
                    case 57:
                        textElement.setValue(xbbeResult.getLamuda().toString());
                        break;
                    case 58:
                        textElement.setValue(xbbeResult.getLamudah().toString());
                        break;
                    case 59:
                        textElement.setValue(xbbeResult.getNs().toString());
                        break;
                    case 60:
                        textElement.setValue(xbbeResult.getEta().toString());
                        break;
                    case 61:
                        textElement.setValue(xbbeResult.getOcrallow().toString());
                        break;
                    case 62:
                        textElement.setValue(xbbeResult.getOc().toString());
                        break;
                    case 63:
                        textElement.setValue(xbbeResult.getOcchk());
                        break;
                    case 64:
                        textElement.setValue(xbbeResult.getTau().toString());
                        break;
                    case 65:
                        textElement.setValue(xbbeResult.getTauallow().toString());
                        break;
                    case 66:
                        textElement.setValue(xbbeResult.getTauchk());
                        break;
                    case 67:
                        textElement.setValue(xbbeResult.getL1().toString());
                        break;
                    case 68:
                        textElement.setValue(xbbeResult.getE().toString());
                        break;
                    case 69:
                        textElement.setValue(xbbeResult.getOb().toString());
                        break;
                    case 70:
                        textElement.setValue(xbbeResult.getOballow().toString());
                        break;
                    case 71:
                        textElement.setValue(xbbeResult.getObchk());
                        break;
                    case 72:
                        textElement.setValue(xbbeResult.getTotalchk());
                        break;
                    case 73:
                        textElement.setValue(xbbeResult.getDmin().toString());
                        break;
                    case 74:
                        textElement.setValue(xbbeResult.getAbt().toString());
                        break;
                    case 75:
                        textElement.setValue(xbbeResult.getObt().toString());
                        break;
                    case 76:
                        textElement.setValue(xbbeResult.getObtchk());
                        break;
                    case 77:
                        textElement.setValue(xbbeResult.getTaubt().toString());
                        break;
                    case 78:
                        textElement.setValue(xbbeResult.getTaubtallow().toString());
                        break;
                    case 79:
                        textElement.setValue(xbbeResult.getTaubtchk());
                        break;
                    case 80:
                        textElement.setValue(xbbeResult.getOc1().toString());
                        break;
                    case 81:
                        textElement.setValue(xbbeResult.getOc1chk());
                        break;
                    case 82:
                        textElement.setValue(xbbeResult.getThkdc().toString());
                        break;
                    case 83:
                        textElement.setValue(xbbeResult.getThkdd().toString());
                        break;
                    case 84:
                        textElement.setValue(xbbeResult.getThkdchk());
                        break;
                    case 85:
                        textElement.setValue(xbbeResult.getFai().toString());
                        break;
                    case 86:
                        textElement.setValue(xbbeResult.getBallow().toString());
                        break;
                    case 87:
                        textElement.setValue(xbbeResult.getHf1().toString());
                        break;
                    case 88:
                        textElement.setValue(xbbeResult.getZ().toString());
                        break;
                    case 89:
                        textElement.setValue(xbbeResult.getOf().toString());
                        break;
                    case 90:
                        textElement.setValue(xbbeResult.getOfchk());
                        break;
                    case 91:
                        textElement.setValue(xbbeResult.getAf().toString());
                        break;
                    case 92:
                        textElement.setValue(xbbeResult.getTauf().toString());
                        break;
                    case 93:
                        textElement.setValue(xbbeResult.getTaufchk());
                        break;
                    case 94:
                        textElement.setValue(xbbeResult.getOt().toString());
                        break;
                    case 95:
                        textElement.setValue(xbbeResult.getOtchk());
                        break;
                    case 96:
                        textElement.setValue(xbbeResult.getSb().toString());
                        break;
                    case 97:
                        textElement.setValue(xbbeResult.getT1().toString());
                        break;
                    case 98:
                        textElement.setValue(xbbeResult.getH0().toString());
                        break;
                    case 99:
                        textElement.setValue(xbbeResult.getD0().toString());
                        break;
                    case 100:
                        textElement.setValue(xbbeResult.getDs0().toString());
                        break;
                    case 101:
                        textElement.setValue(xbbeResult.getBb().toString());
                        break;
                    case 102:
                        textElement.setValue(xbbeResult.getHf().toString());
                        break;
                    case 103:
                        textElement.setValue(xbbeResult.getThkdn().toString());
                        break;
                    case 104:
                        textElement.setValue(xbbeResult.getH().toString());
                        break;
                    case 105:
                        textElement.setValue(xbbeResult.getHc().toString());
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
