package com.mechw.service.docx.a;

import com.mechw.model.front.a.c.*;
import com.mechw.service.docx.DocxTool;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DocxAC extends DocxTool {

    /**
     * acaa
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param acaaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACAA(String baseFileName, ACAADocx acaaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (acaaResult.getIsB().equals("是")) {
            if (acaaResult.getIdod().equals("内径")) {
                if (acaaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_ID_NP_YB.docx";
                }
            } else {
                if (acaaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_OD_NP_YB.docx";
                }
            }
        } else {
            if (acaaResult.getIdod().equals("内径")) {
                if (acaaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_ID_NP_NB.docx";
                }
            } else {
                if (acaaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/a/ACAA_OD_NP_NB.docx";
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
                        textElement.setValue(acaaResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + acaaResult.getDpo() + "×" + acaaResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(acaaResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(acaaResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(acaaResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(acaaResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(acaaResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(acaaResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(acaaResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(acaaResult.getThksn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(acaaResult.getCs2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(acaaResult.getEs().toString());
                        break;

                    case "$$013":
                        textElement.setValue(acaaResult.getStdp());
                        break;
                    case "$$014":
                        textElement.setValue(acaaResult.getNamep());
                        break;
                    case "$$015":
                        textElement.setValue(acaaResult.getDpo().toString());
                        break;
                    case "$$016":
                        textElement.setValue(acaaResult.getThkpn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(acaaResult.getHpo().toString());
                        break;
                    case "$$018":
                        textElement.setValue(acaaResult.getHpi().toString());
                        break;
                    case "$$019":
                        textElement.setValue(acaaResult.getAlpha().toString());
                        break;
                    case "$$020":
                        textElement.setValue(acaaResult.getL().toString());
                        break;
                    case "$$021":
                        textElement.setValue(acaaResult.getCp2().toString());
                        break;
                    case "$$022":
                        textElement.setValue(acaaResult.getEp().toString());
                        break;

                    case "$$023":
                        textElement.setValue(acaaResult.getStdr());
                        break;
                    case "$$024":
                        textElement.setValue(acaaResult.getNamer());
                        break;
                    case "$$025":
                        textElement.setValue(acaaResult.getDro().toString());
                        break;
                    case "$$026":
                        textElement.setValue(acaaResult.getThkrn().toString());
                        break;
                    case "$$027":
                        textElement.setValue(acaaResult.getCr2().toString());
                        break;

                    case "$$028":
                        textElement.setValue(acaaResult.getA3().toString());
                        break;
                    case "$$029":
                        textElement.setValue(acaaResult.getBs().toString());
                        break;

                    case "$$030":
                        textElement.setValue(acaaResult.getDs().toString());
                        break;
                    case "$$031":
                        textElement.setValue(acaaResult.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(acaaResult.getRsel().toString());
                        break;
                    case "$$033":
                        textElement.setValue(acaaResult.getOst().toString());
                        break;
                    case "$$034":
                        textElement.setValue(acaaResult.getOs().toString());
                        break;
                    case "$$035":
                        textElement.setValue(acaaResult.getOst1() < 0 ? "/" : acaaResult.getOst1().toString());
                        break;

                    case "$$036":
                        textElement.setValue(acaaResult.getDr().toString());
                        break;
                    case "$$037":
                        textElement.setValue(acaaResult.getCr1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(acaaResult.getRrel().toString());
                        break;

                    case "$$039":
                        textElement.setValue(acaaResult.getDp().toString());
                        break;
                    case "$$040":
                        textElement.setValue(acaaResult.getCp1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(acaaResult.getRpel().toString());
                        break;
                    case "$$042":
                        textElement.setValue(acaaResult.getOpt().toString());
                        break;
                    case "$$043":
                        textElement.setValue(acaaResult.getOp().toString());
                        break;
                    case "$$044":
                        textElement.setValue(acaaResult.getOpt1() < 0 ? "/" : acaaResult.getOpt1().toString());
                        break;

                    case "$$045":
                        textElement.setValue(acaaResult.getOrt().toString());
                        break;
                    case "$$046":
                        textElement.setValue(acaaResult.getOr().toString());
                        break;
                    case "$$047":
                        textElement.setValue(acaaResult.getOrt1() < 0 ? "/" : acaaResult.getOrt1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(acaaResult.getPc().toString());
                        break;
                    case "$$049":
                        textElement.setValue(acaaResult.getCs().toString());
                        break;
                    case "$$050":
                        textElement.setValue(acaaResult.getThkse().toString());
                        break;
                    case "$$051":
                        textElement.setValue(acaaResult.getDsm().toString());
                        break;
                    case "$$052":
                        textElement.setValue(acaaResult.getRsm().toString());
                        break;
                    case "$$053":
                        textElement.setValue(acaaResult.getCp().toString());
                        break;
                    case "$$054":
                        textElement.setValue(acaaResult.getThkpe().toString());
                        break;
                    case "$$055":
                        textElement.setValue(acaaResult.getDpc().toString());
                        break;
                    case "$$056":
                        textElement.setValue(acaaResult.getSa().toString());
                        break;
                    case "$$057":
                        textElement.setValue(acaaResult.getSb().toString());
                        break;
                    case "$$058":
                        textElement.setValue(acaaResult.getK().toString());
                        break;
                    case "$$059":
                        textElement.setValue(acaaResult.getDop().toString());
                        break;
                    case "$$060":
                        textElement.setValue(acaaResult.getFp().toString());
                        break;
                    case "$$061":
                        textElement.setValue(acaaResult.getCr().toString());
                        break;
                    case "$$062":
                        textElement.setValue(acaaResult.getThkre().toString());
                        break;
                    case "$$063":
                        textElement.setValue(acaaResult.getFr().toString());
                        break;

                    case "$$064":
                        textElement.setValue(acaaResult.getThksc().toString());
                        break;
                    case "$$065":
                        textElement.setValue(acaaResult.getThksd().toString());
                        break;
                    case "$$066":
                        textElement.setValue(acaaResult.getThkschk());
                        break;
                    case "$$067":
                        textElement.setValue(acaaResult.getThkpc().toString());
                        break;
                    case "$$068":
                        textElement.setValue(acaaResult.getThkpd().toString());
                        break;
                    case "$$069":
                        textElement.setValue(acaaResult.getThkpchk());
                        break;

                    case "$$070":
                        textElement.setValue(acaaResult.getBa().toString());
                        break;
                    case "$$071":
                        textElement.setValue(acaaResult.getBb().toString());
                        break;
                    case "$$072":
                        textElement.setValue(acaaResult.getA1().toString());
                        break;
                    case "$$073":
                        textElement.setValue(acaaResult.getHp1().toString());
                        break;
                    case "$$074":
                        textElement.setValue(acaaResult.getHp2().toString());
                        break;
                    case "$$075":
                        textElement.setValue(acaaResult.getA2().toString());
                        break;
                    case "$$076":
                        textElement.setValue(acaaResult.getDre().toString());
                        break;
                    case "$$077":
                        textElement.setValue(acaaResult.getA4().toString());
                        break;
                    case "$$078":
                        textElement.setValue(acaaResult.getAe().toString());
                        break;
                    case "$$079":
                        textElement.setValue(acaaResult.getAchk());
                        break;

                    case "$$080":
                        textElement.setValue(acaaResult.getEta().toString());
                        break;
                    case "$$081":
                        textElement.setValue(acaaResult.getPst().toString());
                        break;
                    case "$$082":
                        textElement.setValue(acaaResult.getPpt().toString());
                        break;
                    case "$$083":
                        textElement.setValue(acaaResult.getPt().toString());
                        break;

                    case "$$084":
                        textElement.setValue(acaaResult.getMawps().toString());
                        break;
                    case "$$085":
                        textElement.setValue(acaaResult.getMawpp().toString());
                        break;
                    case "$$086":
                        textElement.setValue(acaaResult.getMawpa1().toString());
                        break;
                    case "$$087":
                        textElement.setValue(acaaResult.getMawpa2().toString());
                        break;
                    case "$$088":
                        textElement.setValue(acaaResult.getMawpa3().toString());
                        break;
                    case "$$089":
                        textElement.setValue(acaaResult.getMawpa4().toString());
                        break;
                    case "$$090":
                        textElement.setValue(acaaResult.getMawpa().toString());
                        break;
                    case "$$091":
                        textElement.setValue(acaaResult.getMawpae().toString());
                        break;
                    case "$$092":
                        textElement.setValue(acaaResult.getMawpr().toString());
                        break;
                    case "$$093":
                        textElement.setValue(acaaResult.getMawp().toString());
                        break;

                    case "$$100":
                        textElement.setValue(acaaResult.getDso().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + acaaResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue(acaaResult.getThksn().toString());
                        break;
                    case "$15":
                        textElement.setValue("Φ" + acaaResult.getDpo().toString());
                        break;
                    case "$16":
                        textElement.setValue(acaaResult.getThkpn().toString());
                        break;
                    case "$17":
                        textElement.setValue(acaaResult.getHpo().toString());
                        break;
                    case "$18":
                        textElement.setValue(acaaResult.getHpi().toString());
                        break;
                    case "$19":
                        textElement.setValue(acaaResult.getAlpha().toString() + "°");
                        break;
                    case "$20":
                        textElement.setValue(acaaResult.getL().toString());
                        break;
                    case "$25":
                        textElement.setValue(acaaResult.getDro().toString());
                        break;
                    case "$26":
                        textElement.setValue(acaaResult.getThkrn().toString());
                        break;
                    case "$100":
                        textElement.setValue("Φ" + acaaResult.getDso().toString());
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
     * acab
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param acabResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACAB(String baseFileName, ACABDocx acabResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (acabResult.getIsB().equals("是")) {
            if (acabResult.getIdod().equals("内径")) {
                if (acabResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_ID_NP_YB.docx";
                }
            } else {
                if (acabResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_OD_NP_YB.docx";
                }
            }
        } else {
            if (acabResult.getIdod().equals("内径")) {
                if (acabResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_ID_NP_NB.docx";
                }
            } else {
                if (acabResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/a/b/ACAB_OD_NP_NB.docx";
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
                        textElement.setValue(acabResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + acabResult.getDpo() + "×" + acabResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(acabResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(acabResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(acabResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(acabResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(acabResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(acabResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(acabResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(acabResult.getThksn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(acabResult.getCs2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(acabResult.getEs().toString());
                        break;

                    case "$$013":
                        textElement.setValue(acabResult.getStdp());
                        break;
                    case "$$014":
                        textElement.setValue(acabResult.getNamep());
                        break;
                    case "$$015":
                        textElement.setValue(acabResult.getDpo().toString());
                        break;
                    case "$$016":
                        textElement.setValue(acabResult.getThkpn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(acabResult.getHpo().toString());
                        break;
                    case "$$019":
                        textElement.setValue(acabResult.getAlpha().toString());
                        break;
                    case "$$020":
                        textElement.setValue(acabResult.getL().toString());
                        break;
                    case "$$021":
                        textElement.setValue(acabResult.getCp2().toString());
                        break;
                    case "$$022":
                        textElement.setValue(acabResult.getEp().toString());
                        break;

                    case "$$023":
                        textElement.setValue(acabResult.getStdr());
                        break;
                    case "$$024":
                        textElement.setValue(acabResult.getNamer());
                        break;
                    case "$$025":
                        textElement.setValue(acabResult.getDro().toString());
                        break;
                    case "$$026":
                        textElement.setValue(acabResult.getThkrn().toString());
                        break;
                    case "$$027":
                        textElement.setValue(acabResult.getCr2().toString());
                        break;

                    case "$$028":
                        textElement.setValue(acabResult.getA3().toString());
                        break;
                    case "$$029":
                        textElement.setValue(acabResult.getBs().toString());
                        break;

                    case "$$030":
                        textElement.setValue(acabResult.getDs().toString());
                        break;
                    case "$$031":
                        textElement.setValue(acabResult.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(acabResult.getRsel().toString());
                        break;
                    case "$$033":
                        textElement.setValue(acabResult.getOst().toString());
                        break;
                    case "$$034":
                        textElement.setValue(acabResult.getOs().toString());
                        break;
                    case "$$035":
                        textElement.setValue(acabResult.getOst1() < 0 ? "/" : acabResult.getOst1().toString());
                        break;

                    case "$$036":
                        textElement.setValue(acabResult.getDr().toString());
                        break;
                    case "$$037":
                        textElement.setValue(acabResult.getCr1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(acabResult.getRrel().toString());
                        break;

                    case "$$039":
                        textElement.setValue(acabResult.getDp().toString());
                        break;
                    case "$$040":
                        textElement.setValue(acabResult.getCp1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(acabResult.getRpel().toString());
                        break;
                    case "$$042":
                        textElement.setValue(acabResult.getOpt().toString());
                        break;
                    case "$$043":
                        textElement.setValue(acabResult.getOp().toString());
                        break;
                    case "$$044":
                        textElement.setValue(acabResult.getOpt1() < 0 ? "/" : acabResult.getOpt1().toString());
                        break;

                    case "$$045":
                        textElement.setValue(acabResult.getOrt().toString());
                        break;
                    case "$$046":
                        textElement.setValue(acabResult.getOr().toString());
                        break;
                    case "$$047":
                        textElement.setValue(acabResult.getOrt1() < 0 ? "/" : acabResult.getOrt1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(acabResult.getPc().toString());
                        break;
                    case "$$049":
                        textElement.setValue(acabResult.getCs().toString());
                        break;
                    case "$$050":
                        textElement.setValue(acabResult.getThkse().toString());
                        break;
                    case "$$051":
                        textElement.setValue(acabResult.getDsm().toString());
                        break;
                    case "$$052":
                        textElement.setValue(acabResult.getRsm().toString());
                        break;

                    case "$$053":
                        textElement.setValue(acabResult.getCp().toString());
                        break;
                    case "$$054":
                        textElement.setValue(acabResult.getThkpe().toString());
                        break;
                    case "$$055":
                        textElement.setValue(acabResult.getDpc().toString());
                        break;
                    case "$$056":
                        textElement.setValue(acabResult.getSa().toString());
                        break;
                    case "$$057":
                        textElement.setValue(acabResult.getSb().toString());
                        break;
                    case "$$058":
                        textElement.setValue(acabResult.getK().toString());
                        break;
                    case "$$059":
                        textElement.setValue(acabResult.getDop().toString());
                        break;
                    case "$$060":
                        textElement.setValue(acabResult.getFp().toString());
                        break;
                    case "$$061":
                        textElement.setValue(acabResult.getCr().toString());
                        break;
                    case "$$062":
                        textElement.setValue(acabResult.getThkre().toString());
                        break;
                    case "$$063":
                        textElement.setValue(acabResult.getFr().toString());
                        break;

                    case "$$064":
                        textElement.setValue(acabResult.getThksc().toString());
                        break;
                    case "$$065":
                        textElement.setValue(acabResult.getThksd().toString());
                        break;
                    case "$$066":
                        textElement.setValue(acabResult.getThkschk());
                        break;

                    case "$$067":
                        textElement.setValue(acabResult.getThkpc().toString());
                        break;
                    case "$$068":
                        textElement.setValue(acabResult.getThkpd().toString());
                        break;
                    case "$$069":
                        textElement.setValue(acabResult.getThkpchk());
                        break;

                    case "$$070":
                        textElement.setValue(acabResult.getBa().toString());
                        break;
                    case "$$071":
                        textElement.setValue(acabResult.getBb().toString());
                        break;
                    case "$$072":
                        textElement.setValue(acabResult.getA1().toString());
                        break;
                    case "$$073":
                        textElement.setValue(acabResult.getHp1().toString());
                        break;
                    case "$$075":
                        textElement.setValue(acabResult.getA2().toString());
                        break;
                    case "$$076":
                        textElement.setValue(acabResult.getDre().toString());
                        break;
                    case "$$077":
                        textElement.setValue(acabResult.getA4().toString());
                        break;
                    case "$$078":
                        textElement.setValue(acabResult.getAe().toString());
                        break;
                    case "$$079":
                        textElement.setValue(acabResult.getAchk());
                        break;

                    case "$$080":
                        textElement.setValue(acabResult.getEta().toString());
                        break;
                    case "$$081":
                        textElement.setValue(acabResult.getPst().toString());
                        break;
                    case "$$082":
                        textElement.setValue(acabResult.getPpt().toString());
                        break;
                    case "$$083":
                        textElement.setValue(acabResult.getPt().toString());
                        break;

                    case "$$084":
                        textElement.setValue(acabResult.getMawps().toString());
                        break;
                    case "$$085":
                        textElement.setValue(acabResult.getMawpp().toString());
                        break;
                    case "$$086":
                        textElement.setValue(acabResult.getMawpa1().toString());
                        break;
                    case "$$087":
                        textElement.setValue(acabResult.getMawpa2().toString());
                        break;
                    case "$$088":
                        textElement.setValue(acabResult.getMawpa3().toString());
                        break;
                    case "$$089":
                        textElement.setValue(acabResult.getMawpa4().toString());
                        break;
                    case "$$090":
                        textElement.setValue(acabResult.getMawpa().toString());
                        break;
                    case "$$091":
                        textElement.setValue(acabResult.getMawpae().toString());
                        break;
                    case "$$092":
                        textElement.setValue(acabResult.getMawpr().toString());
                        break;
                    case "$$093":
                        textElement.setValue(acabResult.getMawp().toString());
                        break;

                    case "$$100":
                        textElement.setValue(acabResult.getDso().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + acabResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue(acabResult.getThksn().toString());
                        break;
                    case "$15":
                        textElement.setValue("Φ" + acabResult.getDpo().toString());
                        break;
                    case "$16":
                        textElement.setValue(acabResult.getThkpn().toString());
                        break;
                    case "$17":
                        textElement.setValue(acabResult.getHpo().toString());
                        break;
                    case "$19":
                        textElement.setValue(acabResult.getAlpha().toString() + "°");
                        break;
                    case "$20":
                        textElement.setValue(acabResult.getL().toString());
                        break;
                    case "$25":
                        textElement.setValue(acabResult.getDro().toString());
                        break;
                    case "$26":
                        textElement.setValue(acabResult.getThkrn().toString());
                        break;
                    case "$100":
                        textElement.setValue("Φ" + acabResult.getDso().toString());
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
     * acba
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param acbaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACBA(String baseFileName, ACBADocx acbaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (acbaResult.getIsB().equals("是")) {
            if (acbaResult.getIdod().equals("内径")) {
                if (acbaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_ID_NP_YB.docx";
                }
            } else {
                if (acbaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_OD_NP_YB.docx";
                }
            }
        } else {
            if (acbaResult.getIdod().equals("内径")) {
                if (acbaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_ID_NP_NB.docx";
                }
            } else {
                if (acbaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/a/ACBA_OD_NP_NB.docx";
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
                        textElement.setValue(acbaResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + acbaResult.getDpo() + "×" + acbaResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(acbaResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(acbaResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(acbaResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(acbaResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(acbaResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(acbaResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(acbaResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(acbaResult.getThksn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(acbaResult.getCs2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(acbaResult.getEs().toString());
                        break;

                    case "$$013":
                        textElement.setValue(acbaResult.getStdp());
                        break;
                    case "$$014":
                        textElement.setValue(acbaResult.getNamep());
                        break;
                    case "$$015":
                        textElement.setValue(acbaResult.getDpo().toString());
                        break;
                    case "$$016":
                        textElement.setValue(acbaResult.getThkpn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(acbaResult.getHpo().toString());
                        break;
                    case "$$018":
                        textElement.setValue(acbaResult.getHpi().toString());
                        break;
                    case "$$019":
                        textElement.setValue(acbaResult.getAlpha().toString());
                        break;
                    case "$$020":
                        textElement.setValue(acbaResult.getCp2().toString());
                        break;
                    case "$$021":
                        textElement.setValue(acbaResult.getEp().toString());
                        break;

                    case "$$022":
                        textElement.setValue(acbaResult.getStdr());
                        break;
                    case "$$023":
                        textElement.setValue(acbaResult.getNamer());
                        break;
                    case "$$024":
                        textElement.setValue(acbaResult.getDro().toString());
                        break;
                    case "$$025":
                        textElement.setValue(acbaResult.getThkrn().toString());
                        break;
                    case "$$026":
                        textElement.setValue(acbaResult.getCr2().toString());
                        break;

                    case "$$027":
                        textElement.setValue(acbaResult.getA3().toString());
                        break;
                    case "$$028":
                        textElement.setValue(acbaResult.getBs().toString());
                        break;

                    case "$$029":
                        textElement.setValue(acbaResult.getDs().toString());
                        break;
                    case "$$030":
                        textElement.setValue(acbaResult.getCs1().toString());
                        break;
                    case "$$031":
                        textElement.setValue(acbaResult.getRsel().toString());
                        break;
                    case "$$032":
                        textElement.setValue(acbaResult.getOst().toString());
                        break;
                    case "$$033":
                        textElement.setValue(acbaResult.getOs().toString());
                        break;
                    case "$$034":
                        textElement.setValue(acbaResult.getOst1() < 0 ? "/" : acbaResult.getOst1().toString());
                        break;

                    case "$$035":
                        textElement.setValue(acbaResult.getDr().toString());
                        break;
                    case "$$036":
                        textElement.setValue(acbaResult.getCr1().toString());
                        break;
                    case "$$037":
                        textElement.setValue(acbaResult.getRrel().toString());
                        break;

                    case "$$038":
                        textElement.setValue(acbaResult.getDp().toString());
                        break;
                    case "$$039":
                        textElement.setValue(acbaResult.getCp1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(acbaResult.getRpel().toString());
                        break;
                    case "$$041":
                        textElement.setValue(acbaResult.getOpt().toString());
                        break;
                    case "$$042":
                        textElement.setValue(acbaResult.getOp().toString());
                        break;
                    case "$$043":
                        textElement.setValue(acbaResult.getOpt1() < 0 ? "/" : acbaResult.getOpt1().toString());
                        break;

                    case "$$044":
                        textElement.setValue(acbaResult.getOrt().toString());
                        break;
                    case "$$045":
                        textElement.setValue(acbaResult.getOr().toString());
                        break;
                    case "$$046":
                        textElement.setValue(acbaResult.getOrt1() < 0 ? "/" : acbaResult.getOrt1().toString());
                        break;

                    case "$$047":
                        textElement.setValue(acbaResult.getPc().toString());
                        break;
                    case "$$048":
                        textElement.setValue(acbaResult.getCs().toString());
                        break;
                    case "$$049":
                        textElement.setValue(acbaResult.getThkse().toString());
                        break;
                    case "$$050":
                        textElement.setValue(acbaResult.getCp().toString());
                        break;
                    case "$$051":
                        textElement.setValue(acbaResult.getThkpe().toString());
                        break;
                    case "$$052":
                        textElement.setValue(acbaResult.getDpc().toString());
                        break;
                    case "$$053":
                        textElement.setValue(acbaResult.getSa().toString());
                        break;
                    case "$$054":
                        textElement.setValue(acbaResult.getSb().toString());
                        break;
                    case "$$055":
                        textElement.setValue(acbaResult.getK().toString());
                        break;
                    case "$$056":
                        textElement.setValue(acbaResult.getDop().toString());
                        break;
                    case "$$057":
                        textElement.setValue(acbaResult.getFp().toString());
                        break;
                    case "$$058":
                        textElement.setValue(acbaResult.getCr().toString());
                        break;
                    case "$$059":
                        textElement.setValue(acbaResult.getThkre().toString());
                        break;
                    case "$$060":
                        textElement.setValue(acbaResult.getFr().toString());
                        break;

                    case "$$061":
                        textElement.setValue(acbaResult.getThksc().toString());
                        break;
                    case "$$062":
                        textElement.setValue(acbaResult.getThksd().toString());
                        break;
                    case "$$063":
                        textElement.setValue(acbaResult.getThkschk());
                        break;
                    case "$$064":
                        textElement.setValue(acbaResult.getThkpc().toString());
                        break;
                    case "$$065":
                        textElement.setValue(acbaResult.getThkpd().toString());
                        break;
                    case "$$066":
                        textElement.setValue(acbaResult.getThkpchk());
                        break;

                    case "$$067":
                        textElement.setValue(acbaResult.getBa().toString());
                        break;
                    case "$$068":
                        textElement.setValue(acbaResult.getBb().toString());
                        break;
                    case "$$069":
                        textElement.setValue(acbaResult.getA1().toString());
                        break;
                    case "$$070":
                        textElement.setValue(acbaResult.getHp1().toString());
                        break;
                    case "$$071":
                        textElement.setValue(acbaResult.getHp2().toString());
                        break;
                    case "$$072":
                        textElement.setValue(acbaResult.getA2().toString());
                        break;
                    case "$$073":
                        textElement.setValue(acbaResult.getDre().toString());
                        break;
                    case "$$074":
                        textElement.setValue(acbaResult.getA4().toString());
                        break;
                    case "$$075":
                        textElement.setValue(acbaResult.getAe().toString());
                        break;
                    case "$$076":
                        textElement.setValue(acbaResult.getAchk());
                        break;

                    case "$$077":
                        textElement.setValue(acbaResult.getEta().toString());
                        break;
                    case "$$078":
                        textElement.setValue(acbaResult.getPst().toString());
                        break;
                    case "$$079":
                        textElement.setValue(acbaResult.getPpt().toString());
                        break;
                    case "$$080":
                        textElement.setValue(acbaResult.getPt().toString());
                        break;

                    case "$$081":
                        textElement.setValue(acbaResult.getMawps().toString());
                        break;
                    case "$$082":
                        textElement.setValue(acbaResult.getMawpp().toString());
                        break;
                    case "$$083":
                        textElement.setValue(acbaResult.getMawpa1().toString());
                        break;
                    case "$$084":
                        textElement.setValue(acbaResult.getMawpa2().toString());
                        break;
                    case "$$085":
                        textElement.setValue(acbaResult.getMawpa3().toString());
                        break;
                    case "$$086":
                        textElement.setValue(acbaResult.getMawpa4().toString());
                        break;
                    case "$$087":
                        textElement.setValue(acbaResult.getMawpa().toString());
                        break;
                    case "$$088":
                        textElement.setValue(acbaResult.getMawpae().toString());
                        break;
                    case "$$089":
                        textElement.setValue(acbaResult.getMawpr().toString());
                        break;
                    case "$$090":
                        textElement.setValue(acbaResult.getMawp().toString());
                        break;

                    case "$$100":
                        textElement.setValue(acbaResult.getDso().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + acbaResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue(acbaResult.getThksn().toString());
                        break;
                    case "$15":
                        textElement.setValue("Φ" + acbaResult.getDpo().toString());
                        break;
                    case "$16":
                        textElement.setValue(acbaResult.getThkpn().toString());
                        break;
                    case "$17":
                        textElement.setValue(acbaResult.getHpo().toString());
                        break;
                    case "$18":
                        textElement.setValue(acbaResult.getHpi().toString());
                        break;
                    case "$19":
                        textElement.setValue(acbaResult.getAlpha().toString() + "°");
                        break;
                    case "$24":
                        textElement.setValue(acbaResult.getDro().toString());
                        break;
                    case "$25":
                        textElement.setValue(acbaResult.getThkrn().toString());
                        break;
                    case "$100":
                        textElement.setValue("Φ" + acbaResult.getDso().toString());
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
     * acbb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param acbbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACBB(String baseFileName, ACBBDocx acbbResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (acbbResult.getIsB().equals("是")) {
            if (acbbResult.getIdod().equals("内径")) {
                if (acbbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_ID_NP_YB.docx";
                }
            } else {
                if (acbbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_OD_NP_YB.docx";
                }
            }
        } else {
            if (acbbResult.getIdod().equals("内径")) {
                if (acbbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_ID_NP_NB.docx";
                }
            } else {
                if (acbbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/b/b/ACBB_OD_NP_NB.docx";
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
                        textElement.setValue(acbbResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + acbbResult.getDpo() + "×" + acbbResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(acbbResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(acbbResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(acbbResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(acbbResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(acbbResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(acbbResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(acbbResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(acbbResult.getThksn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(acbbResult.getCs2().toString());
                        break;
                    case "$$012":
                        textElement.setValue(acbbResult.getEs().toString());
                        break;

                    case "$$013":
                        textElement.setValue(acbbResult.getStdp());
                        break;
                    case "$$014":
                        textElement.setValue(acbbResult.getNamep());
                        break;
                    case "$$015":
                        textElement.setValue(acbbResult.getDpo().toString());
                        break;
                    case "$$016":
                        textElement.setValue(acbbResult.getThkpn().toString());
                        break;
                    case "$$017":
                        textElement.setValue(acbbResult.getHpo().toString());
                        break;
                    case "$$019":
                        textElement.setValue(acbbResult.getAlpha().toString());
                        break;
                    case "$$021":
                        textElement.setValue(acbbResult.getCp2().toString());
                        break;
                    case "$$022":
                        textElement.setValue(acbbResult.getEp().toString());
                        break;

                    case "$$023":
                        textElement.setValue(acbbResult.getStdr());
                        break;
                    case "$$024":
                        textElement.setValue(acbbResult.getNamer());
                        break;
                    case "$$025":
                        textElement.setValue(acbbResult.getDro().toString());
                        break;
                    case "$$026":
                        textElement.setValue(acbbResult.getThkrn().toString());
                        break;
                    case "$$027":
                        textElement.setValue(acbbResult.getCr2().toString());
                        break;

                    case "$$028":
                        textElement.setValue(acbbResult.getA3().toString());
                        break;
                    case "$$029":
                        textElement.setValue(acbbResult.getBs().toString());
                        break;

                    case "$$030":
                        textElement.setValue(acbbResult.getDs().toString());
                        break;
                    case "$$031":
                        textElement.setValue(acbbResult.getCs1().toString());
                        break;
                    case "$$032":
                        textElement.setValue(acbbResult.getRsel().toString());
                        break;
                    case "$$033":
                        textElement.setValue(acbbResult.getOst().toString());
                        break;
                    case "$$034":
                        textElement.setValue(acbbResult.getOs().toString());
                        break;
                    case "$$035":
                        textElement.setValue(acbbResult.getOst1() < 0 ? "/" : acbbResult.getOst1().toString());
                        break;

                    case "$$036":
                        textElement.setValue(acbbResult.getDr().toString());
                        break;
                    case "$$037":
                        textElement.setValue(acbbResult.getCr1().toString());
                        break;
                    case "$$038":
                        textElement.setValue(acbbResult.getRrel().toString());
                        break;

                    case "$$039":
                        textElement.setValue(acbbResult.getDp().toString());
                        break;
                    case "$$040":
                        textElement.setValue(acbbResult.getCp1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(acbbResult.getRpel().toString());
                        break;
                    case "$$042":
                        textElement.setValue(acbbResult.getOpt().toString());
                        break;
                    case "$$043":
                        textElement.setValue(acbbResult.getOp().toString());
                        break;
                    case "$$044":
                        textElement.setValue(acbbResult.getOpt1() < 0 ? "/" : acbbResult.getOpt1().toString());
                        break;

                    case "$$045":
                        textElement.setValue(acbbResult.getOrt().toString());
                        break;
                    case "$$046":
                        textElement.setValue(acbbResult.getOr().toString());
                        break;
                    case "$$047":
                        textElement.setValue(acbbResult.getOrt1() < 0 ? "/" : acbbResult.getOrt1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(acbbResult.getPc().toString());
                        break;
                    case "$$049":
                        textElement.setValue(acbbResult.getCs().toString());
                        break;
                    case "$$050":
                        textElement.setValue(acbbResult.getThkse().toString());
                        break;

                    case "$$053":
                        textElement.setValue(acbbResult.getCp().toString());
                        break;
                    case "$$054":
                        textElement.setValue(acbbResult.getThkpe().toString());
                        break;
                    case "$$055":
                        textElement.setValue(acbbResult.getDpc().toString());
                        break;
                    case "$$056":
                        textElement.setValue(acbbResult.getSa().toString());
                        break;
                    case "$$057":
                        textElement.setValue(acbbResult.getSb().toString());
                        break;
                    case "$$058":
                        textElement.setValue(acbbResult.getK().toString());
                        break;
                    case "$$059":
                        textElement.setValue(acbbResult.getDop().toString());
                        break;
                    case "$$060":
                        textElement.setValue(acbbResult.getFp().toString());
                        break;
                    case "$$061":
                        textElement.setValue(acbbResult.getCr().toString());
                        break;
                    case "$$062":
                        textElement.setValue(acbbResult.getThkre().toString());
                        break;
                    case "$$063":
                        textElement.setValue(acbbResult.getFr().toString());
                        break;

                    case "$$064":
                        textElement.setValue(acbbResult.getThksc().toString());
                        break;
                    case "$$065":
                        textElement.setValue(acbbResult.getThksd().toString());
                        break;
                    case "$$066":
                        textElement.setValue(acbbResult.getThkschk());
                        break;

                    case "$$067":
                        textElement.setValue(acbbResult.getThkpc().toString());
                        break;
                    case "$$068":
                        textElement.setValue(acbbResult.getThkpd().toString());
                        break;
                    case "$$069":
                        textElement.setValue(acbbResult.getThkpchk());
                        break;

                    case "$$070":
                        textElement.setValue(acbbResult.getBa().toString());
                        break;
                    case "$$071":
                        textElement.setValue(acbbResult.getBb().toString());
                        break;
                    case "$$072":
                        textElement.setValue(acbbResult.getA1().toString());
                        break;
                    case "$$073":
                        textElement.setValue(acbbResult.getHp1().toString());
                        break;
                    case "$$075":
                        textElement.setValue(acbbResult.getA2().toString());
                        break;
                    case "$$076":
                        textElement.setValue(acbbResult.getDre().toString());
                        break;
                    case "$$077":
                        textElement.setValue(acbbResult.getA4().toString());
                        break;
                    case "$$078":
                        textElement.setValue(acbbResult.getAe().toString());
                        break;
                    case "$$079":
                        textElement.setValue(acbbResult.getAchk());
                        break;

                    case "$$080":
                        textElement.setValue(acbbResult.getEta().toString());
                        break;
                    case "$$081":
                        textElement.setValue(acbbResult.getPst().toString());
                        break;
                    case "$$082":
                        textElement.setValue(acbbResult.getPpt().toString());
                        break;
                    case "$$083":
                        textElement.setValue(acbbResult.getPt().toString());
                        break;

                    case "$$084":
                        textElement.setValue(acbbResult.getMawps().toString());
                        break;
                    case "$$085":
                        textElement.setValue(acbbResult.getMawpp().toString());
                        break;
                    case "$$086":
                        textElement.setValue(acbbResult.getMawpa1().toString());
                        break;
                    case "$$087":
                        textElement.setValue(acbbResult.getMawpa2().toString());
                        break;
                    case "$$088":
                        textElement.setValue(acbbResult.getMawpa3().toString());
                        break;
                    case "$$089":
                        textElement.setValue(acbbResult.getMawpa4().toString());
                        break;
                    case "$$090":
                        textElement.setValue(acbbResult.getMawpa().toString());
                        break;
                    case "$$091":
                        textElement.setValue(acbbResult.getMawpae().toString());
                        break;
                    case "$$092":
                        textElement.setValue(acbbResult.getMawpr().toString());
                        break;
                    case "$$093":
                        textElement.setValue(acbbResult.getMawp().toString());
                        break;

                    case "$$100":
                        textElement.setValue(acbbResult.getDso().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + acbbResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue(acbbResult.getThksn().toString());
                        break;
                    case "$15":
                        textElement.setValue("Φ" + acbbResult.getDpo().toString());
                        break;
                    case "$16":
                        textElement.setValue(acbbResult.getThkpn().toString());
                        break;
                    case "$17":
                        textElement.setValue(acbbResult.getHpo().toString());
                        break;
                    case "$19":
                        textElement.setValue(acbbResult.getAlpha().toString() + "°");
                        break;
                    case "$25":
                        textElement.setValue(acbbResult.getDro().toString());
                        break;
                    case "$26":
                        textElement.setValue(acbbResult.getThkrn().toString());
                        break;
                    case "$100":
                        textElement.setValue("Φ" + acbbResult.getDso().toString());
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
     * acca
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param accaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACCA(String baseFileName, ACCADocx accaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (accaResult.getIsB().equals("是")) {
            if (accaResult.getIdod().equals("内径")) {
                if (accaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_ID_NP_YB.docx";
                }
            } else {
                if (accaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_OD_NP_YB.docx";
                }
            }
        } else {
            if (accaResult.getIdod().equals("内径")) {
                if (accaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_ID_NP_NB.docx";
                }
            } else {
                if (accaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/a/ACCA_OD_NP_NB.docx";
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
                        textElement.setValue(accaResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + accaResult.getDpo() + "×" + accaResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(accaResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(accaResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(accaResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(accaResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(accaResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(accaResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(accaResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(accaResult.getHsi().toString());
                        break;
                    case "$$011":
                        textElement.setValue(accaResult.getThksn().toString());
                        break;
                    case "$$012":
                        textElement.setValue(accaResult.getCs2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(accaResult.getEs().toString());
                        break;

                    case "$$014":
                        textElement.setValue(accaResult.getStdp());
                        break;
                    case "$$015":
                        textElement.setValue(accaResult.getNamep());
                        break;
                    case "$$016":
                        textElement.setValue(accaResult.getDpo().toString());
                        break;
                    case "$$017":
                        textElement.setValue(accaResult.getThkpn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(accaResult.getHpo().toString());
                        break;
                    case "$$019":
                        textElement.setValue(accaResult.getHpi().toString());
                        break;
                    case "$$020":
                        textElement.setValue(accaResult.getAlpha().toString());
                        break;
                    case "$$021":
                        textElement.setValue(accaResult.getBeta().toString());
                        break;
                    case "$$022":
                        textElement.setValue(accaResult.getL().toString());
                        break;
                    case "$$023":
                        textElement.setValue(accaResult.getCp2().toString());
                        break;
                    case "$$024":
                        textElement.setValue(accaResult.getEp().toString());
                        break;

                    case "$$025":
                        textElement.setValue(accaResult.getStdr());
                        break;
                    case "$$026":
                        textElement.setValue(accaResult.getNamer());
                        break;
                    case "$$027":
                        textElement.setValue(accaResult.getDro().toString());
                        break;
                    case "$$028":
                        textElement.setValue(accaResult.getThkrn().toString());
                        break;
                    case "$$029":
                        textElement.setValue(accaResult.getCr2().toString());
                        break;

                    case "$$030":
                        textElement.setValue(accaResult.getA3().toString());
                        break;
                    case "$$031":
                        textElement.setValue(accaResult.getBs().toString());
                        break;

                    case "$$032":
                        textElement.setValue(accaResult.getDs().toString());
                        break;
                    case "$$033":
                        textElement.setValue(accaResult.getCs1().toString());
                        break;
                    case "$$034":
                        textElement.setValue(accaResult.getRsel().toString());
                        break;
                    case "$$035":
                        textElement.setValue(accaResult.getOst().toString());
                        break;
                    case "$$036":
                        textElement.setValue(accaResult.getOs().toString());
                        break;
                    case "$$037":
                        textElement.setValue(accaResult.getOst1() < 0 ? "/" : accaResult.getOst1().toString());
                        break;

                    case "$$038":
                        textElement.setValue(accaResult.getDr().toString());
                        break;
                    case "$$039":
                        textElement.setValue(accaResult.getCr1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(accaResult.getRrel().toString());
                        break;

                    case "$$041":
                        textElement.setValue(accaResult.getDp().toString());
                        break;
                    case "$$042":
                        textElement.setValue(accaResult.getCp1().toString());
                        break;
                    case "$$043":
                        textElement.setValue(accaResult.getRpel().toString());
                        break;
                    case "$$044":
                        textElement.setValue(accaResult.getOpt().toString());
                        break;
                    case "$$045":
                        textElement.setValue(accaResult.getOp().toString());
                        break;
                    case "$$046":
                        textElement.setValue(accaResult.getOpt1() < 0 ? "/" : accaResult.getOpt1().toString());
                        break;

                    case "$$047":
                        textElement.setValue(accaResult.getOrt().toString());
                        break;
                    case "$$048":
                        textElement.setValue(accaResult.getOr().toString());
                        break;
                    case "$$049":
                        textElement.setValue(accaResult.getOrt1() < 0 ? "/" : accaResult.getOrt1().toString());
                        break;

                    case "$$050":
                        textElement.setValue(accaResult.getPc().toString());
                        break;
                    case "$$051":
                        textElement.setValue(accaResult.getCs().toString());
                        break;
                    case "$$052":
                        textElement.setValue(accaResult.getThkse().toString());
                        break;
                    case "$$053":
                        textElement.setValue(accaResult.getDso().toString());
                        break;
                    case "$$054":
                        textElement.setValue(accaResult.getHso().toString());
                        break;
                    case "$$055":
                        textElement.setValue(accaResult.getDsi2hsi().toString());
                        break;
                    case "$$056":
                        textElement.setValue(accaResult.getK().toString());
                        break;
                    case "$$057":
                        textElement.setValue(accaResult.getDso2hso().toString());
                        break;
                    case "$$058":
                        textElement.setValue(accaResult.getK1().toString());
                        break;
                    case "$$059":
                        textElement.setValue(accaResult.getAsm().toString());
                        break;
                    case "$$060":
                        textElement.setValue(accaResult.getBsm().toString());
                        break;
                    case "$$061":
                        textElement.setValue(accaResult.getH().toString());
                        break;
                    case "$$062":
                        textElement.setValue(accaResult.getTheta().toString());
                        break;

                    case "$$063":
                        textElement.setValue(accaResult.getCp().toString());
                        break;
                    case "$$064":
                        textElement.setValue(accaResult.getThkpe().toString());
                        break;
                    case "$$065":
                        textElement.setValue(accaResult.getDpc().toString());
                        break;
                    case "$$066":
                        textElement.setValue(accaResult.getSa().toString());
                        break;
                    case "$$067":
                        textElement.setValue(accaResult.getSb().toString());
                        break;
                    case "$$068":
                        textElement.setValue(accaResult.getKs().toString());
                        break;
                    case "$$069":
                        textElement.setValue(accaResult.getDop().toString());
                        break;
                    case "$$070":
                        textElement.setValue(accaResult.getFp().toString());
                        break;

                    case "$$071":
                        textElement.setValue(accaResult.getCr().toString());
                        break;
                    case "$$072":
                        textElement.setValue(accaResult.getThkre().toString());
                        break;
                    case "$$073":
                        textElement.setValue(accaResult.getFr().toString());
                        break;

                    case "$$074":
                        textElement.setValue(accaResult.getThksc().toString());
                        break;
                    case "$$075":
                        textElement.setValue(accaResult.getThksmin().toString());
                        break;
                    case "$$076":
                        textElement.setValue(accaResult.getThksd().toString());
                        break;
                    case "$$077":
                        textElement.setValue(accaResult.getThkschk());
                        break;

                    case "$$078":
                        textElement.setValue(accaResult.getThkpc().toString());
                        break;
                    case "$$079":
                        textElement.setValue(accaResult.getThkpd().toString());
                        break;
                    case "$$080":
                        textElement.setValue(accaResult.getThkpchk());
                        break;

                    case "$$081":
                        textElement.setValue(accaResult.getBa().toString());
                        break;
                    case "$$082":
                        textElement.setValue(accaResult.getBb().toString());
                        break;
                    case "$$083":
                        textElement.setValue(accaResult.getA1().toString());
                        break;
                    case "$$084":
                        textElement.setValue(accaResult.getHp1().toString());
                        break;
                    case "$$085":
                        textElement.setValue(accaResult.getHp2().toString());
                        break;
                    case "$$086":
                        textElement.setValue(accaResult.getA2().toString());
                        break;
                    case "$$087":
                        textElement.setValue(accaResult.getDre().toString());
                        break;
                    case "$$088":
                        textElement.setValue(accaResult.getA4().toString());
                        break;
                    case "$$089":
                        textElement.setValue(accaResult.getAe().toString());
                        break;
                    case "$$090":
                        textElement.setValue(accaResult.getAchk());
                        break;

                    case "$$091":
                        textElement.setValue(accaResult.getEta().toString());
                        break;
                    case "$$092":
                        textElement.setValue(accaResult.getPst().toString());
                        break;
                    case "$$093":
                        textElement.setValue(accaResult.getPpt().toString());
                        break;
                    case "$$094":
                        textElement.setValue(accaResult.getPt().toString());
                        break;

                    case "$$095":
                        textElement.setValue(accaResult.getMawps().toString());
                        break;
                    case "$$096":
                        textElement.setValue(accaResult.getMawpp().toString());
                        break;
                    case "$$097":
                        textElement.setValue(accaResult.getMawpa1().toString());
                        break;
                    case "$$098":
                        textElement.setValue(accaResult.getMawpa2().toString());
                        break;
                    case "$$099":
                        textElement.setValue(accaResult.getMawpa3().toString());
                        break;
                    case "$$100":
                        textElement.setValue(accaResult.getMawpa4().toString());
                        break;
                    case "$$101":
                        textElement.setValue(accaResult.getMawpa().toString());
                        break;
                    case "$$102":
                        textElement.setValue(accaResult.getMawpae().toString());
                        break;
                    case "$$103":
                        textElement.setValue(accaResult.getMawpr().toString());
                        break;
                    case "$$104":
                        textElement.setValue(accaResult.getMawp().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + accaResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue(accaResult.getHsi().toString());
                        break;
                    case "$53":
                        textElement.setValue("Φ" + accaResult.getDso().toString());
                        break;
                    case "$54":
                        textElement.setValue(accaResult.getHso().toString());
                        break;
                    case "$11":
                        textElement.setValue(accaResult.getThksn().toString());
                        break;

                    case "$16":
                        textElement.setValue("Φ" + accaResult.getDpo().toString());
                        break;
                    case "$17":
                        textElement.setValue(accaResult.getThkpn().toString());
                        break;
                    case "$18":
                        textElement.setValue(accaResult.getHpo().toString());
                        break;
                    case "$19":
                        textElement.setValue(accaResult.getHpi().toString());
                        break;
                    case "$20":
                        textElement.setValue(accaResult.getAlpha().toString() + "°");
                        break;
                    case "$21":
                        textElement.setValue(accaResult.getBeta().toString() + "°");
                        break;
                    case "$22":
                        textElement.setValue(accaResult.getL().toString());
                        break;
                    case "$27":
                        textElement.setValue(accaResult.getDro().toString());
                        break;
                    case "$28":
                        textElement.setValue(accaResult.getThkrn().toString());
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
     * accb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param accbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACCB(String baseFileName, ACCBDocx accbResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (accbResult.getIsB().equals("是")) {
            if (accbResult.getIdod().equals("内径")) {
                if (accbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_ID_NP_YB.docx";
                }
            } else {
                if (accbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_OD_NP_YB.docx";
                }
            }
        } else {
            if (accbResult.getIdod().equals("内径")) {
                if (accbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_ID_NP_NB.docx";
                }
            } else {
                if (accbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/c/b/ACCB_OD_NP_NB.docx";
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
                        textElement.setValue(accbResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + accbResult.getDpo() + "×" + accbResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(accbResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(accbResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(accbResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(accbResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(accbResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(accbResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(accbResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(accbResult.getHsi().toString());
                        break;
                    case "$$011":
                        textElement.setValue(accbResult.getThksn().toString());
                        break;
                    case "$$012":
                        textElement.setValue(accbResult.getCs2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(accbResult.getEs().toString());
                        break;

                    case "$$014":
                        textElement.setValue(accbResult.getStdp());
                        break;
                    case "$$015":
                        textElement.setValue(accbResult.getNamep());
                        break;
                    case "$$016":
                        textElement.setValue(accbResult.getDpo().toString());
                        break;
                    case "$$017":
                        textElement.setValue(accbResult.getThkpn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(accbResult.getHpo().toString());
                        break;
                    case "$$020":
                        textElement.setValue(accbResult.getAlpha().toString());
                        break;
                    case "$$021":
                        textElement.setValue(accbResult.getBeta().toString());
                        break;
                    case "$$022":
                        textElement.setValue(accbResult.getL().toString());
                        break;
                    case "$$023":
                        textElement.setValue(accbResult.getCp2().toString());
                        break;
                    case "$$024":
                        textElement.setValue(accbResult.getEp().toString());
                        break;

                    case "$$025":
                        textElement.setValue(accbResult.getStdr());
                        break;
                    case "$$026":
                        textElement.setValue(accbResult.getNamer());
                        break;
                    case "$$027":
                        textElement.setValue(accbResult.getDro().toString());
                        break;
                    case "$$028":
                        textElement.setValue(accbResult.getThkrn().toString());
                        break;
                    case "$$029":
                        textElement.setValue(accbResult.getCr2().toString());
                        break;

                    case "$$030":
                        textElement.setValue(accbResult.getA3().toString());
                        break;
                    case "$$031":
                        textElement.setValue(accbResult.getBs().toString());
                        break;

                    case "$$032":
                        textElement.setValue(accbResult.getDs().toString());
                        break;
                    case "$$033":
                        textElement.setValue(accbResult.getCs1().toString());
                        break;
                    case "$$034":
                        textElement.setValue(accbResult.getRsel().toString());
                        break;
                    case "$$035":
                        textElement.setValue(accbResult.getOst().toString());
                        break;
                    case "$$036":
                        textElement.setValue(accbResult.getOs().toString());
                        break;
                    case "$$037":
                        textElement.setValue(accbResult.getOst1() < 0 ? "/" : accbResult.getOst1().toString());
                        break;

                    case "$$038":
                        textElement.setValue(accbResult.getDr().toString());
                        break;
                    case "$$039":
                        textElement.setValue(accbResult.getCr1().toString());
                        break;
                    case "$$040":
                        textElement.setValue(accbResult.getRrel().toString());
                        break;

                    case "$$041":
                        textElement.setValue(accbResult.getDp().toString());
                        break;
                    case "$$042":
                        textElement.setValue(accbResult.getCp1().toString());
                        break;
                    case "$$043":
                        textElement.setValue(accbResult.getRpel().toString());
                        break;
                    case "$$044":
                        textElement.setValue(accbResult.getOpt().toString());
                        break;
                    case "$$045":
                        textElement.setValue(accbResult.getOp().toString());
                        break;
                    case "$$046":
                        textElement.setValue(accbResult.getOpt1() < 0 ? "/" : accbResult.getOpt1().toString());
                        break;

                    case "$$047":
                        textElement.setValue(accbResult.getOrt().toString());
                        break;
                    case "$$048":
                        textElement.setValue(accbResult.getOr().toString());
                        break;
                    case "$$049":
                        textElement.setValue(accbResult.getOrt1() < 0 ? "/" : accbResult.getOrt1().toString());
                        break;

                    case "$$050":
                        textElement.setValue(accbResult.getPc().toString());
                        break;
                    case "$$051":
                        textElement.setValue(accbResult.getCs().toString());
                        break;
                    case "$$052":
                        textElement.setValue(accbResult.getThkse().toString());
                        break;
                    case "$$053":
                        textElement.setValue(accbResult.getDso().toString());
                        break;
                    case "$$054":
                        textElement.setValue(accbResult.getHso().toString());
                        break;
                    case "$$055":
                        textElement.setValue(accbResult.getDsi2hsi().toString());
                        break;
                    case "$$056":
                        textElement.setValue(accbResult.getK().toString());
                        break;
                    case "$$057":
                        textElement.setValue(accbResult.getDso2hso().toString());
                        break;
                    case "$$058":
                        textElement.setValue(accbResult.getK1().toString());
                        break;
                    case "$$059":
                        textElement.setValue(accbResult.getAsm().toString());
                        break;
                    case "$$060":
                        textElement.setValue(accbResult.getBsm().toString());
                        break;
                    case "$$061":
                        textElement.setValue(accbResult.getH().toString());
                        break;
                    case "$$062":
                        textElement.setValue(accbResult.getTheta().toString());
                        break;

                    case "$$063":
                        textElement.setValue(accbResult.getCp().toString());
                        break;
                    case "$$064":
                        textElement.setValue(accbResult.getThkpe().toString());
                        break;
                    case "$$065":
                        textElement.setValue(accbResult.getDpc().toString());
                        break;
                    case "$$066":
                        textElement.setValue(accbResult.getSa().toString());
                        break;
                    case "$$067":
                        textElement.setValue(accbResult.getSb().toString());
                        break;
                    case "$$068":
                        textElement.setValue(accbResult.getKs().toString());
                        break;
                    case "$$069":
                        textElement.setValue(accbResult.getDop().toString());
                        break;
                    case "$$070":
                        textElement.setValue(accbResult.getFp().toString());
                        break;

                    case "$$071":
                        textElement.setValue(accbResult.getCr().toString());
                        break;
                    case "$$072":
                        textElement.setValue(accbResult.getThkre().toString());
                        break;
                    case "$$073":
                        textElement.setValue(accbResult.getFr().toString());
                        break;

                    case "$$074":
                        textElement.setValue(accbResult.getThksc().toString());
                        break;
                    case "$$075":
                        textElement.setValue(accbResult.getThksmin().toString());
                        break;
                    case "$$076":
                        textElement.setValue(accbResult.getThksd().toString());
                        break;
                    case "$$077":
                        textElement.setValue(accbResult.getThkschk());
                        break;

                    case "$$078":
                        textElement.setValue(accbResult.getThkpc().toString());
                        break;
                    case "$$079":
                        textElement.setValue(accbResult.getThkpd().toString());
                        break;
                    case "$$080":
                        textElement.setValue(accbResult.getThkpchk());
                        break;

                    case "$$081":
                        textElement.setValue(accbResult.getBa().toString());
                        break;
                    case "$$082":
                        textElement.setValue(accbResult.getBb().toString());
                        break;
                    case "$$083":
                        textElement.setValue(accbResult.getA1().toString());
                        break;
                    case "$$084":
                        textElement.setValue(accbResult.getHp1().toString());
                        break;
                    case "$$086":
                        textElement.setValue(accbResult.getA2().toString());
                        break;
                    case "$$087":
                        textElement.setValue(accbResult.getDre().toString());
                        break;
                    case "$$088":
                        textElement.setValue(accbResult.getA4().toString());
                        break;
                    case "$$089":
                        textElement.setValue(accbResult.getAe().toString());
                        break;
                    case "$$090":
                        textElement.setValue(accbResult.getAchk());
                        break;

                    case "$$091":
                        textElement.setValue(accbResult.getEta().toString());
                        break;
                    case "$$092":
                        textElement.setValue(accbResult.getPst().toString());
                        break;
                    case "$$093":
                        textElement.setValue(accbResult.getPpt().toString());
                        break;
                    case "$$094":
                        textElement.setValue(accbResult.getPt().toString());
                        break;

                    case "$$095":
                        textElement.setValue(accbResult.getMawps().toString());
                        break;
                    case "$$096":
                        textElement.setValue(accbResult.getMawpp().toString());
                        break;
                    case "$$097":
                        textElement.setValue(accbResult.getMawpa1().toString());
                        break;
                    case "$$098":
                        textElement.setValue(accbResult.getMawpa2().toString());
                        break;
                    case "$$099":
                        textElement.setValue(accbResult.getMawpa3().toString());
                        break;
                    case "$$100":
                        textElement.setValue(accbResult.getMawpa4().toString());
                        break;
                    case "$$101":
                        textElement.setValue(accbResult.getMawpa().toString());
                        break;
                    case "$$102":
                        textElement.setValue(accbResult.getMawpae().toString());
                        break;
                    case "$$103":
                        textElement.setValue(accbResult.getMawpr().toString());
                        break;
                    case "$$104":
                        textElement.setValue(accbResult.getMawp().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + accbResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue(accbResult.getHsi().toString());
                        break;
                    case "$53":
                        textElement.setValue("Φ" + accbResult.getDso().toString());
                        break;
                    case "$54":
                        textElement.setValue(accbResult.getHso().toString());
                        break;
                    case "$11":
                        textElement.setValue(accbResult.getThksn().toString());
                        break;

                    case "$16":
                        textElement.setValue("Φ" + accbResult.getDpo().toString());
                        break;
                    case "$17":
                        textElement.setValue(accbResult.getThkpn().toString());
                        break;
                    case "$18":
                        textElement.setValue(accbResult.getHpo().toString());
                        break;
                    case "$20":
                        textElement.setValue(accbResult.getAlpha().toString() + "°");
                        break;
                    case "$21":
                        textElement.setValue(accbResult.getBeta().toString() + "°");
                        break;
                    case "$22":
                        textElement.setValue(accbResult.getL().toString());
                        break;
                    case "$27":
                        textElement.setValue(accbResult.getDro().toString());
                        break;
                    case "$28":
                        textElement.setValue(accbResult.getThkrn().toString());
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
     * acda
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param acdaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACDA(String baseFileName, ACDADocx acdaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (acdaResult.getIsB().equals("是")) {
            if (acdaResult.getIdod().equals("内径")) {
                if (acdaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_ID_NP_YB.docx";
                }
            } else {
                if (acdaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_OD_NP_YB.docx";
                }
            }
        } else {
            if (acdaResult.getIdod().equals("内径")) {
                if (acdaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_ID_NP_NB.docx";
                }
            } else {
                if (acdaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/a/ACDA_OD_NP_NB.docx";
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
                        textElement.setValue(acdaResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + acdaResult.getDpo() + "×" + acdaResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(acdaResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(acdaResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(acdaResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(acdaResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(acdaResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(acdaResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(acdaResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(acdaResult.getBrsi().toString());
                        break;
                    case "$$011":
                        textElement.setValue(acdaResult.getSrsi().toString());
                        break;
                    case "$$012":
                        textElement.setValue(acdaResult.getThksn().toString());
                        break;
                    case "$$013":
                        textElement.setValue(acdaResult.getCs2().toString());
                        break;
                    case "$$014":
                        textElement.setValue(acdaResult.getEs().toString());
                        break;

                    case "$$015":
                        textElement.setValue(acdaResult.getStdp());
                        break;
                    case "$$016":
                        textElement.setValue(acdaResult.getNamep());
                        break;
                    case "$$017":
                        textElement.setValue(acdaResult.getDpo().toString());
                        break;
                    case "$$018":
                        textElement.setValue(acdaResult.getThkpn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(acdaResult.getHpo().toString());
                        break;
                    case "$$020":
                        textElement.setValue(acdaResult.getHpi().toString());
                        break;
                    case "$$021":
                        textElement.setValue(acdaResult.getAlpha().toString());
                        break;
                    case "$$022":
                        textElement.setValue(acdaResult.getBeta().toString());
                        break;
                    case "$$023":
                        textElement.setValue(acdaResult.getL().toString());
                        break;
                    case "$$024":
                        textElement.setValue(acdaResult.getCp2().toString());
                        break;
                    case "$$025":
                        textElement.setValue(acdaResult.getEp().toString());
                        break;

                    case "$$026":
                        textElement.setValue(acdaResult.getStdr());
                        break;
                    case "$$027":
                        textElement.setValue(acdaResult.getNamer());
                        break;
                    case "$$028":
                        textElement.setValue(acdaResult.getDro().toString());
                        break;
                    case "$$029":
                        textElement.setValue(acdaResult.getThkrn().toString());
                        break;
                    case "$$030":
                        textElement.setValue(acdaResult.getCr2().toString());
                        break;

                    case "$$031":
                        textElement.setValue(acdaResult.getA3().toString());
                        break;
                    case "$$032":
                        textElement.setValue(acdaResult.getBs().toString());
                        break;

                    case "$$033":
                        textElement.setValue(acdaResult.getDs().toString());
                        break;
                    case "$$034":
                        textElement.setValue(acdaResult.getCs1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(acdaResult.getRsel().toString());
                        break;
                    case "$$036":
                        textElement.setValue(acdaResult.getOst().toString());
                        break;
                    case "$$037":
                        textElement.setValue(acdaResult.getOs().toString());
                        break;
                    case "$$038":
                        textElement.setValue(acdaResult.getOst1() < 0 ? "/" : acdaResult.getOst1().toString());
                        break;

                    case "$$039":
                        textElement.setValue(acdaResult.getDr().toString());
                        break;
                    case "$$040":
                        textElement.setValue(acdaResult.getCr1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(acdaResult.getRrel().toString());
                        break;

                    case "$$042":
                        textElement.setValue(acdaResult.getDp().toString());
                        break;
                    case "$$043":
                        textElement.setValue(acdaResult.getCp1().toString());
                        break;
                    case "$$044":
                        textElement.setValue(acdaResult.getRpel().toString());
                        break;
                    case "$$045":
                        textElement.setValue(acdaResult.getOpt().toString());
                        break;
                    case "$$046":
                        textElement.setValue(acdaResult.getOp().toString());
                        break;
                    case "$$047":
                        textElement.setValue(acdaResult.getOpt1() < 0 ? "/" : acdaResult.getOpt1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(acdaResult.getOrt().toString());
                        break;
                    case "$$049":
                        textElement.setValue(acdaResult.getOr().toString());
                        break;
                    case "$$050":
                        textElement.setValue(acdaResult.getOrt1() < 0 ? "/" : acdaResult.getOrt1().toString());
                        break;

                    case "$$051":
                        textElement.setValue(acdaResult.getPc().toString());
                        break;

                    case "$$052":
                        textElement.setValue(acdaResult.getCs().toString());
                        break;
                    case "$$053":
                        textElement.setValue(acdaResult.getThkse().toString());
                        break;
                    case "$$054":
                        textElement.setValue(acdaResult.getDso().toString());
                        break;
                    case "$$055":
                        textElement.setValue(acdaResult.getBrso().toString());
                        break;
                    case "$$056":
                        textElement.setValue(acdaResult.getSrso().toString());
                        break;
                    case "$$057":
                        textElement.setValue(acdaResult.getBrsisrsi().toString());
                        break;
                    case "$$058":
                        textElement.setValue(acdaResult.getM().toString());
                        break;
                    case "$$059":
                        textElement.setValue(acdaResult.getDsm().toString());
                        break;
                    case "$$060":
                        textElement.setValue(acdaResult.getBrsm().toString());
                        break;
                    case "$$061":
                        textElement.setValue(acdaResult.getSrsm().toString());
                        break;
                    case "$$062":
                        textElement.setValue(acdaResult.getDelta().toString());
                        break;
                    case "$$063":
                        textElement.setValue(acdaResult.getTheta().toString());
                        break;

                    case "$$064":
                        textElement.setValue(acdaResult.getCp().toString());
                        break;
                    case "$$065":
                        textElement.setValue(acdaResult.getThkpe().toString());
                        break;
                    case "$$066":
                        textElement.setValue(acdaResult.getDpc().toString());
                        break;
                    case "$$067":
                        textElement.setValue(acdaResult.getSa().toString());
                        break;
                    case "$$068":
                        textElement.setValue(acdaResult.getSb().toString());
                        break;
                    case "$$069":
                        textElement.setValue(acdaResult.getKs().toString());
                        break;
                    case "$$070":
                        textElement.setValue(acdaResult.getDop().toString());
                        break;
                    case "$$071":
                        textElement.setValue(acdaResult.getFp().toString());
                        break;

                    case "$$072":
                        textElement.setValue(acdaResult.getCr().toString());
                        break;
                    case "$$073":
                        textElement.setValue(acdaResult.getThkre().toString());
                        break;
                    case "$$074":
                        textElement.setValue(acdaResult.getFr().toString());
                        break;

                    case "$$075":
                        textElement.setValue(acdaResult.getThksc().toString());
                        break;
                    case "$$076":
                        textElement.setValue(acdaResult.getThksmin().toString());
                        break;
                    case "$$077":
                        textElement.setValue(acdaResult.getThksd().toString());
                        break;
                    case "$$078":
                        textElement.setValue(acdaResult.getThkschk());
                        break;

                    case "$$079":
                        textElement.setValue(acdaResult.getThkpc().toString());
                        break;
                    case "$$080":
                        textElement.setValue(acdaResult.getThkpd().toString());
                        break;
                    case "$$081":
                        textElement.setValue(acdaResult.getThkpchk());
                        break;

                    case "$$082":
                        textElement.setValue(acdaResult.getBa().toString());
                        break;
                    case "$$083":
                        textElement.setValue(acdaResult.getBb().toString());
                        break;
                    case "$$084":
                        textElement.setValue(acdaResult.getA1().toString());
                        break;
                    case "$$085":
                        textElement.setValue(acdaResult.getHp1().toString());
                        break;
                    case "$$086":
                        textElement.setValue(acdaResult.getHp2().toString());
                        break;
                    case "$$087":
                        textElement.setValue(acdaResult.getA2().toString());
                        break;
                    case "$$088":
                        textElement.setValue(acdaResult.getDre().toString());
                        break;
                    case "$$089":
                        textElement.setValue(acdaResult.getA4().toString());
                        break;
                    case "$$090":
                        textElement.setValue(acdaResult.getAe().toString());
                        break;
                    case "$$091":
                        textElement.setValue(acdaResult.getAchk());
                        break;

                    case "$$092":
                        textElement.setValue(acdaResult.getEta().toString());
                        break;
                    case "$$093":
                        textElement.setValue(acdaResult.getPst().toString());
                        break;
                    case "$$094":
                        textElement.setValue(acdaResult.getPpt().toString());
                        break;
                    case "$$095":
                        textElement.setValue(acdaResult.getPt().toString());
                        break;

                    case "$$096":
                        textElement.setValue(acdaResult.getMawps().toString());
                        break;
                    case "$$097":
                        textElement.setValue(acdaResult.getMawpp().toString());
                        break;
                    case "$$098":
                        textElement.setValue(acdaResult.getMawpa1().toString());
                        break;
                    case "$$099":
                        textElement.setValue(acdaResult.getMawpa2().toString());
                        break;
                    case "$$100":
                        textElement.setValue(acdaResult.getMawpa3().toString());
                        break;
                    case "$$101":
                        textElement.setValue(acdaResult.getMawpa4().toString());
                        break;
                    case "$$102":
                        textElement.setValue(acdaResult.getMawpa().toString());
                        break;
                    case "$$103":
                        textElement.setValue(acdaResult.getMawpae().toString());
                        break;
                    case "$$104":
                        textElement.setValue(acdaResult.getMawpr().toString());
                        break;
                    case "$$105":
                        textElement.setValue(acdaResult.getMawp().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + acdaResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue("R" + acdaResult.getBrsi().toString());
                        break;
                    case "$11":
                        textElement.setValue("R" + acdaResult.getSrsi().toString());
                        break;
                    case "$54":
                        textElement.setValue("Φ" + acdaResult.getDso().toString());
                        break;
                    case "$55":
                        textElement.setValue("R" + acdaResult.getBrso().toString());
                        break;
                    case "$56":
                        textElement.setValue("R" + acdaResult.getSrso().toString());
                        break;
                    case "$12":
                        textElement.setValue(acdaResult.getThksn().toString());
                        break;

                    case "$17":
                        textElement.setValue("Φ" + acdaResult.getDpo().toString());
                        break;
                    case "$18":
                        textElement.setValue(acdaResult.getThkpn().toString());
                        break;
                    case "$19":
                        textElement.setValue(acdaResult.getHpo().toString());
                        break;
                    case "$20":
                        textElement.setValue(acdaResult.getHpi().toString());
                        break;
                    case "$21":
                        textElement.setValue(acdaResult.getAlpha().toString() + "°");
                        break;
                    case "$22":
                        textElement.setValue(acdaResult.getBeta().toString() + "°");
                        break;
                    case "$23":
                        textElement.setValue(acdaResult.getL().toString());
                        break;

                    case "$28":
                        textElement.setValue(acdaResult.getDro().toString());
                        break;
                    case "$29":
                        textElement.setValue(acdaResult.getThkrn().toString());
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
     * acdb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param acdbResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACDB(String baseFileName, ACDBDocx acdbResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (acdbResult.getIsB().equals("是")) {
            if (acdbResult.getIdod().equals("内径")) {
                if (acdbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_ID_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_ID_NP_YB.docx";
                }
            } else {
                if (acdbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_OD_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_OD_NP_YB.docx";
                }
            }
        } else {
            if (acdbResult.getIdod().equals("内径")) {
                if (acdbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_ID_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_ID_NP_NB.docx";
                }
            } else {
                if (acdbResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_OD_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/d/b/ACDB_OD_NP_NB.docx";
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
                        textElement.setValue(acdbResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + acdbResult.getDpo() + "×" + acdbResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(acdbResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(acdbResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(acdbResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(acdbResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(acdbResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(acdbResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(acdbResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(acdbResult.getBrsi().toString());
                        break;
                    case "$$011":
                        textElement.setValue(acdbResult.getSrsi().toString());
                        break;
                    case "$$012":
                        textElement.setValue(acdbResult.getThksn().toString());
                        break;
                    case "$$013":
                        textElement.setValue(acdbResult.getCs2().toString());
                        break;
                    case "$$014":
                        textElement.setValue(acdbResult.getEs().toString());
                        break;

                    case "$$015":
                        textElement.setValue(acdbResult.getStdp());
                        break;
                    case "$$016":
                        textElement.setValue(acdbResult.getNamep());
                        break;
                    case "$$017":
                        textElement.setValue(acdbResult.getDpo().toString());
                        break;
                    case "$$018":
                        textElement.setValue(acdbResult.getThkpn().toString());
                        break;
                    case "$$019":
                        textElement.setValue(acdbResult.getHpo().toString());
                        break;
                    case "$$021":
                        textElement.setValue(acdbResult.getAlpha().toString());
                        break;
                    case "$$022":
                        textElement.setValue(acdbResult.getBeta().toString());
                        break;
                    case "$$023":
                        textElement.setValue(acdbResult.getL().toString());
                        break;
                    case "$$024":
                        textElement.setValue(acdbResult.getCp2().toString());
                        break;
                    case "$$025":
                        textElement.setValue(acdbResult.getEp().toString());
                        break;

                    case "$$026":
                        textElement.setValue(acdbResult.getStdr());
                        break;
                    case "$$027":
                        textElement.setValue(acdbResult.getNamer());
                        break;
                    case "$$028":
                        textElement.setValue(acdbResult.getDro().toString());
                        break;
                    case "$$029":
                        textElement.setValue(acdbResult.getThkrn().toString());
                        break;
                    case "$$030":
                        textElement.setValue(acdbResult.getCr2().toString());
                        break;

                    case "$$031":
                        textElement.setValue(acdbResult.getA3().toString());
                        break;
                    case "$$032":
                        textElement.setValue(acdbResult.getBs().toString());
                        break;

                    case "$$033":
                        textElement.setValue(acdbResult.getDs().toString());
                        break;
                    case "$$034":
                        textElement.setValue(acdbResult.getCs1().toString());
                        break;
                    case "$$035":
                        textElement.setValue(acdbResult.getRsel().toString());
                        break;
                    case "$$036":
                        textElement.setValue(acdbResult.getOst().toString());
                        break;
                    case "$$037":
                        textElement.setValue(acdbResult.getOs().toString());
                        break;
                    case "$$038":
                        textElement.setValue(acdbResult.getOst1() < 0 ? "/" : acdbResult.getOst1().toString());
                        break;

                    case "$$039":
                        textElement.setValue(acdbResult.getDr().toString());
                        break;
                    case "$$040":
                        textElement.setValue(acdbResult.getCr1().toString());
                        break;
                    case "$$041":
                        textElement.setValue(acdbResult.getRrel().toString());
                        break;

                    case "$$042":
                        textElement.setValue(acdbResult.getDp().toString());
                        break;
                    case "$$043":
                        textElement.setValue(acdbResult.getCp1().toString());
                        break;
                    case "$$044":
                        textElement.setValue(acdbResult.getRpel().toString());
                        break;
                    case "$$045":
                        textElement.setValue(acdbResult.getOpt().toString());
                        break;
                    case "$$046":
                        textElement.setValue(acdbResult.getOp().toString());
                        break;
                    case "$$047":
                        textElement.setValue(acdbResult.getOpt1() < 0 ? "/" : acdbResult.getOpt1().toString());
                        break;

                    case "$$048":
                        textElement.setValue(acdbResult.getOrt().toString());
                        break;
                    case "$$049":
                        textElement.setValue(acdbResult.getOr().toString());
                        break;
                    case "$$050":
                        textElement.setValue(acdbResult.getOrt1() < 0 ? "/" : acdbResult.getOrt1().toString());
                        break;

                    case "$$051":
                        textElement.setValue(acdbResult.getPc().toString());
                        break;

                    case "$$052":
                        textElement.setValue(acdbResult.getCs().toString());
                        break;
                    case "$$053":
                        textElement.setValue(acdbResult.getThkse().toString());
                        break;
                    case "$$054":
                        textElement.setValue(acdbResult.getDso().toString());
                        break;
                    case "$$055":
                        textElement.setValue(acdbResult.getBrso().toString());
                        break;
                    case "$$056":
                        textElement.setValue(acdbResult.getSrso().toString());
                        break;
                    case "$$057":
                        textElement.setValue(acdbResult.getBrsisrsi().toString());
                        break;
                    case "$$058":
                        textElement.setValue(acdbResult.getM().toString());
                        break;
                    case "$$059":
                        textElement.setValue(acdbResult.getDsm().toString());
                        break;
                    case "$$060":
                        textElement.setValue(acdbResult.getBrsm().toString());
                        break;
                    case "$$061":
                        textElement.setValue(acdbResult.getSrsm().toString());
                        break;
                    case "$$062":
                        textElement.setValue(acdbResult.getDelta().toString());
                        break;
                    case "$$063":
                        textElement.setValue(acdbResult.getTheta().toString());
                        break;

                    case "$$064":
                        textElement.setValue(acdbResult.getCp().toString());
                        break;
                    case "$$065":
                        textElement.setValue(acdbResult.getThkpe().toString());
                        break;
                    case "$$066":
                        textElement.setValue(acdbResult.getDpc().toString());
                        break;
                    case "$$067":
                        textElement.setValue(acdbResult.getSa().toString());
                        break;
                    case "$$068":
                        textElement.setValue(acdbResult.getSb().toString());
                        break;
                    case "$$069":
                        textElement.setValue(acdbResult.getKs().toString());
                        break;
                    case "$$070":
                        textElement.setValue(acdbResult.getDop().toString());
                        break;
                    case "$$071":
                        textElement.setValue(acdbResult.getFp().toString());
                        break;

                    case "$$072":
                        textElement.setValue(acdbResult.getCr().toString());
                        break;
                    case "$$073":
                        textElement.setValue(acdbResult.getThkre().toString());
                        break;
                    case "$$074":
                        textElement.setValue(acdbResult.getFr().toString());
                        break;

                    case "$$075":
                        textElement.setValue(acdbResult.getThksc().toString());
                        break;
                    case "$$076":
                        textElement.setValue(acdbResult.getThksmin().toString());
                        break;
                    case "$$077":
                        textElement.setValue(acdbResult.getThksd().toString());
                        break;
                    case "$$078":
                        textElement.setValue(acdbResult.getThkschk());
                        break;

                    case "$$079":
                        textElement.setValue(acdbResult.getThkpc().toString());
                        break;
                    case "$$080":
                        textElement.setValue(acdbResult.getThkpd().toString());
                        break;
                    case "$$081":
                        textElement.setValue(acdbResult.getThkpchk());
                        break;

                    case "$$082":
                        textElement.setValue(acdbResult.getBa().toString());
                        break;
                    case "$$083":
                        textElement.setValue(acdbResult.getBb().toString());
                        break;
                    case "$$084":
                        textElement.setValue(acdbResult.getA1().toString());
                        break;
                    case "$$085":
                        textElement.setValue(acdbResult.getHp1().toString());
                        break;
                    case "$$087":
                        textElement.setValue(acdbResult.getA2().toString());
                        break;
                    case "$$088":
                        textElement.setValue(acdbResult.getDre().toString());
                        break;
                    case "$$089":
                        textElement.setValue(acdbResult.getA4().toString());
                        break;
                    case "$$090":
                        textElement.setValue(acdbResult.getAe().toString());
                        break;
                    case "$$091":
                        textElement.setValue(acdbResult.getAchk());
                        break;

                    case "$$092":
                        textElement.setValue(acdbResult.getEta().toString());
                        break;
                    case "$$093":
                        textElement.setValue(acdbResult.getPst().toString());
                        break;
                    case "$$094":
                        textElement.setValue(acdbResult.getPpt().toString());
                        break;
                    case "$$095":
                        textElement.setValue(acdbResult.getPt().toString());
                        break;

                    case "$$096":
                        textElement.setValue(acdbResult.getMawps().toString());
                        break;
                    case "$$097":
                        textElement.setValue(acdbResult.getMawpp().toString());
                        break;
                    case "$$098":
                        textElement.setValue(acdbResult.getMawpa1().toString());
                        break;
                    case "$$099":
                        textElement.setValue(acdbResult.getMawpa2().toString());
                        break;
                    case "$$100":
                        textElement.setValue(acdbResult.getMawpa3().toString());
                        break;
                    case "$$101":
                        textElement.setValue(acdbResult.getMawpa4().toString());
                        break;
                    case "$$102":
                        textElement.setValue(acdbResult.getMawpa().toString());
                        break;
                    case "$$103":
                        textElement.setValue(acdbResult.getMawpae().toString());
                        break;
                    case "$$104":
                        textElement.setValue(acdbResult.getMawpr().toString());
                        break;
                    case "$$105":
                        textElement.setValue(acdbResult.getMawp().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + acdbResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue("R" + acdbResult.getBrsi().toString());
                        break;
                    case "$11":
                        textElement.setValue("R" + acdbResult.getSrsi().toString());
                        break;
                    case "$54":
                        textElement.setValue("Φ" + acdbResult.getDso().toString());
                        break;
                    case "$55":
                        textElement.setValue("R" + acdbResult.getBrso().toString());
                        break;
                    case "$56":
                        textElement.setValue("R" + acdbResult.getSrso().toString());
                        break;
                    case "$12":
                        textElement.setValue(acdbResult.getThksn().toString());
                        break;

                    case "$17":
                        textElement.setValue("Φ" + acdbResult.getDpo().toString());
                        break;
                    case "$18":
                        textElement.setValue(acdbResult.getThkpn().toString());
                        break;
                    case "$19":
                        textElement.setValue(acdbResult.getHpo().toString());
                        break;
                    case "$21":
                        textElement.setValue(acdbResult.getAlpha().toString() + "°");
                        break;
                    case "$22":
                        textElement.setValue(acdbResult.getBeta().toString() + "°");
                        break;
                    case "$23":
                        textElement.setValue(acdbResult.getL().toString());
                        break;

                    case "$28":
                        textElement.setValue(acdbResult.getDro().toString());
                        break;
                    case "$29":
                        textElement.setValue(acdbResult.getThkrn().toString());
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
     * acea
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param aceaResult   计算数据结果
     * @return 新计算书 URL
     */
    public static String getACEA(String baseFileName, ACEADocx aceaResult) {

        // 根据试验类型确定要使用的文件模板
        String template;
        if (aceaResult.getIsB().equals("是")) {
            if (aceaResult.getPipeType().equals("插入式")) {
                if (aceaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Insert_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Insert_NP_YB.docx";
                }
            } else {
                if (aceaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Sit_YP_YB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Sit_NP_YB.docx";
                }
            }
        } else {
            if (aceaResult.getPipeType().equals("插入式")) {
                if (aceaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Insert_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Insert_NP_NB.docx";
                }
            } else {
                if (aceaResult.getIsPad().equals("是")) {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Sit_YP_NB.docx";
                } else {
                    template = "D:/mechw/static/west/cal/a/c/e/a/ACEA_Sit_NP_NB.docx";
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
                        textElement.setValue(aceaResult.getTag());
                        break;
                    case "$$002":
                        textElement.setValue("Φ" + aceaResult.getDpo() + "×" + aceaResult.getThkpn());
                        break;

                    case "$$003":
                        textElement.setValue(aceaResult.getPd().toString());
                        break;
                    case "$$004":
                        textElement.setValue(aceaResult.getT().toString());
                        break;
                    case "$$005":
                        textElement.setValue(aceaResult.getPs().toString());
                        break;
                    case "$$006":
                        textElement.setValue(aceaResult.getTest());
                        break;

                    case "$$007":
                        textElement.setValue(aceaResult.getStds());
                        break;
                    case "$$008":
                        textElement.setValue(aceaResult.getNames());
                        break;
                    case "$$009":
                        textElement.setValue(aceaResult.getDsi().toString());
                        break;
                    case "$$010":
                        textElement.setValue(aceaResult.getThksn().toString());
                        break;
                    case "$$011":
                        textElement.setValue(aceaResult.getTheta().toString());
                        break;
                    case "$$012":
                        textElement.setValue(aceaResult.getCs2().toString());
                        break;
                    case "$$013":
                        textElement.setValue(aceaResult.getEs().toString());
                        break;

                    case "$$014":
                        textElement.setValue(aceaResult.getStdp());
                        break;
                    case "$$015":
                        textElement.setValue(aceaResult.getNamep());
                        break;
                    case "$$016":
                        textElement.setValue(aceaResult.getDpo().toString());
                        break;
                    case "$$017":
                        textElement.setValue(aceaResult.getThkpn().toString());
                        break;
                    case "$$018":
                        textElement.setValue(aceaResult.getHpo().toString());
                        break;
                    case "$$019":
                        textElement.setValue(aceaResult.getHpi().toString());
                        break;
                    case "$$020":
                        textElement.setValue(aceaResult.getAlpha().toString());
                        break;
                    case "$$021":
                        textElement.setValue(aceaResult.getL().toString());
                        break;
                    case "$$022":
                        textElement.setValue(aceaResult.getCp2().toString());
                        break;
                    case "$$023":
                        textElement.setValue(aceaResult.getEp().toString());
                        break;

                    case "$$024":
                        textElement.setValue(aceaResult.getStdr());
                        break;
                    case "$$025":
                        textElement.setValue(aceaResult.getNamer());
                        break;
                    case "$$026":
                        textElement.setValue(aceaResult.getDro().toString());
                        break;
                    case "$$027":
                        textElement.setValue(aceaResult.getThkrn().toString());
                        break;
                    case "$$028":
                        textElement.setValue(aceaResult.getCr2().toString());
                        break;

                    case "$$029":
                        textElement.setValue(aceaResult.getA3().toString());
                        break;
                    case "$$030":
                        textElement.setValue(aceaResult.getBs().toString());
                        break;

                    case "$$031":
                        textElement.setValue(aceaResult.getDs().toString());
                        break;
                    case "$$032":
                        textElement.setValue(aceaResult.getCs1().toString());
                        break;
                    case "$$033":
                        textElement.setValue(aceaResult.getRsel().toString());
                        break;
                    case "$$034":
                        textElement.setValue(aceaResult.getOst().toString());
                        break;
                    case "$$035":
                        textElement.setValue(aceaResult.getOs().toString());
                        break;
                    case "$$036":
                        textElement.setValue(aceaResult.getOst1() < 0 ? "/" : aceaResult.getOst1().toString());
                        break;

                    case "$$037":
                        textElement.setValue(aceaResult.getDr().toString());
                        break;
                    case "$$038":
                        textElement.setValue(aceaResult.getCr1().toString());
                        break;
                    case "$$039":
                        textElement.setValue(aceaResult.getRrel().toString());
                        break;

                    case "$$040":
                        textElement.setValue(aceaResult.getDp().toString());
                        break;
                    case "$$041":
                        textElement.setValue(aceaResult.getCp1().toString());
                        break;
                    case "$$042":
                        textElement.setValue(aceaResult.getRpel().toString());
                        break;
                    case "$$043":
                        textElement.setValue(aceaResult.getOpt().toString());
                        break;
                    case "$$044":
                        textElement.setValue(aceaResult.getOp().toString());
                        break;
                    case "$$045":
                        textElement.setValue(aceaResult.getOpt1() < 0 ? "/" : aceaResult.getOpt1().toString());
                        break;

                    case "$$046":
                        textElement.setValue(aceaResult.getOrt().toString());
                        break;
                    case "$$047":
                        textElement.setValue(aceaResult.getOr().toString());
                        break;
                    case "$$048":
                        textElement.setValue(aceaResult.getOrt1() < 0 ? "/" : aceaResult.getOrt1().toString());
                        break;

                    case "$$049":
                        textElement.setValue(aceaResult.getPc().toString());
                        break;
                    case "$$050":
                        textElement.setValue(aceaResult.getCs().toString());
                        break;
                    case "$$051":
                        textElement.setValue(aceaResult.getThkse().toString());
                        break;
                    case "$$052":
                        textElement.setValue(aceaResult.getDsm().toString());
                        break;
                    case "$$053":
                        textElement.setValue(aceaResult.getRsm().toString());
                        break;
                    case "$$054":
                        textElement.setValue(aceaResult.getCp().toString());
                        break;
                    case "$$055":
                        textElement.setValue(aceaResult.getThkpe().toString());
                        break;
                    case "$$056":
                        textElement.setValue(aceaResult.getDpc().toString());
                        break;
                    case "$$057":
                        textElement.setValue(aceaResult.getSa().toString());
                        break;
                    case "$$058":
                        textElement.setValue(aceaResult.getSb().toString());
                        break;
                    case "$$059":
                        textElement.setValue(aceaResult.getK().toString());
                        break;
                    case "$$060":
                        textElement.setValue(aceaResult.getDop().toString());
                        break;
                    case "$$061":
                        textElement.setValue(aceaResult.getFp().toString());
                        break;
                    case "$$062":
                        textElement.setValue(aceaResult.getCr().toString());
                        break;
                    case "$$063":
                        textElement.setValue(aceaResult.getThkre().toString());
                        break;
                    case "$$064":
                        textElement.setValue(aceaResult.getFr().toString());
                        break;

                    case "$$065":
                        textElement.setValue(aceaResult.getThksc().toString());
                        break;
                    case "$$066":
                        textElement.setValue(aceaResult.getThksd().toString());
                        break;
                    case "$$067":
                        textElement.setValue(aceaResult.getThkschk());
                        break;
                    case "$$068":
                        textElement.setValue(aceaResult.getThkpc().toString());
                        break;
                    case "$$069":
                        textElement.setValue(aceaResult.getThkpd().toString());
                        break;
                    case "$$070":
                        textElement.setValue(aceaResult.getThkpchk());
                        break;

                    case "$$071":
                        textElement.setValue(aceaResult.getBa().toString());
                        break;
                    case "$$072":
                        textElement.setValue(aceaResult.getBb().toString());
                        break;
                    case "$$073":
                        textElement.setValue(aceaResult.getA1().toString());
                        break;
                    case "$$074":
                        textElement.setValue(aceaResult.getHp1().toString());
                        break;
                    case "$$075":
                        textElement.setValue(aceaResult.getHp2().toString());
                        break;
                    case "$$076":
                        textElement.setValue(aceaResult.getA2().toString());
                        break;
                    case "$$077":
                        textElement.setValue(aceaResult.getDre().toString());
                        break;
                    case "$$078":
                        textElement.setValue(aceaResult.getA4().toString());
                        break;
                    case "$$079":
                        textElement.setValue(aceaResult.getAe().toString());
                        break;
                    case "$$080":
                        textElement.setValue(aceaResult.getAchk());
                        break;

                    case "$$081":
                        textElement.setValue(aceaResult.getEta().toString());
                        break;
                    case "$$082":
                        textElement.setValue(aceaResult.getPst().toString());
                        break;
                    case "$$083":
                        textElement.setValue(aceaResult.getPpt().toString());
                        break;
                    case "$$084":
                        textElement.setValue(aceaResult.getPt().toString());
                        break;

                    case "$$085":
                        textElement.setValue(aceaResult.getMawps().toString());
                        break;
                    case "$$086":
                        textElement.setValue(aceaResult.getMawpp().toString());
                        break;
                    case "$$087":
                        textElement.setValue(aceaResult.getMawpa1().toString());
                        break;
                    case "$$088":
                        textElement.setValue(aceaResult.getMawpa2().toString());
                        break;
                    case "$$089":
                        textElement.setValue(aceaResult.getMawpa3().toString());
                        break;
                    case "$$090":
                        textElement.setValue(aceaResult.getMawpa4().toString());
                        break;
                    case "$$091":
                        textElement.setValue(aceaResult.getMawpa().toString());
                        break;
                    case "$$092":
                        textElement.setValue(aceaResult.getMawpae().toString());
                        break;
                    case "$$093":
                        textElement.setValue(aceaResult.getMawpr().toString());
                        break;
                    case "$$094":
                        textElement.setValue(aceaResult.getMawp().toString());
                        break;

                    case "$09":
                        textElement.setValue("Φ" + aceaResult.getDsi().toString());
                        break;
                    case "$10":
                        textElement.setValue(aceaResult.getThksn().toString());
                        break;
                    case "$11":
                        textElement.setValue(aceaResult.getTheta().toString() + "°");
                        break;

                    case "$16":
                        textElement.setValue("Φ" + aceaResult.getDpo().toString());
                        break;
                    case "$17":
                        textElement.setValue(aceaResult.getThkpn().toString());
                        break;
                    case "$18":
                        textElement.setValue(aceaResult.getHpo().toString());
                        break;
                    case "$19":
                        textElement.setValue(aceaResult.getHpi().toString());
                        break;
                    case "$20":
                        textElement.setValue(aceaResult.getAlpha().toString() + "°");
                        break;
                    case "$21":
                        textElement.setValue(aceaResult.getL().toString());
                        break;

                    case "$26":
                        textElement.setValue(aceaResult.getDro().toString());
                        break;
                    case "$27":
                        textElement.setValue(aceaResult.getThkrn().toString());
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
