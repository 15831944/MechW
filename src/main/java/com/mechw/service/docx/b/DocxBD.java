package com.mechw.service.docx.b;

import com.mechw.model.front.b.d.*;
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

public class DocxBD extends DocxTool {

    /**
     * bda
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bdaResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBDA(String baseFileName, BDADocx bdaResult) {
        String template;
        if (bdaResult.getIsB().equals("是")) {
            if (bdaResult.getIsPad().equals("是")) {
                template = "D:/mechw/static/west/cal/b/d/a/BDA_YP_YB.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/d/a/BDA_NP_YB.docx";
            }
        } else if (bdaResult.getIsPad().equals("是")) {
            template = "D:/mechw/static/west/cal/b/d/a/BDA_YP_NB.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/d/a/BDA_NP_NB.docx";
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
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 91;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 92;
                        }
                        break;
                    case 36168:
                        if (var13.equals("$15")) {
                            var14 = 93;
                        }
                        break;
                    case 36169:
                        if (var13.equals("$16")) {
                            var14 = 94;
                        }
                        break;
                    case 36170:
                        if (var13.equals("$17")) {
                            var14 = 95;
                        }
                        break;
                    case 36171:
                        if (var13.equals("$18")) {
                            var14 = 96;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 97;
                        }
                        break;
                    case 36194:
                        if (var13.equals("$20")) {
                            var14 = 98;
                        }
                        break;
                    case 36199:
                        if (var13.equals("$25")) {
                            var14 = 99;
                        }
                        break;
                    case 36200:
                        if (var13.equals("$26")) {
                            var14 = 100;
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
                        break;
                    case 34367150:
                        if (var13.equals("$$086")) {
                            var14 = 85;
                        }
                        break;
                    case 34367151:
                        if (var13.equals("$$087")) {
                            var14 = 86;
                        }
                        break;
                    case 34367152:
                        if (var13.equals("$$088")) {
                            var14 = 87;
                        }
                        break;
                    case 34367153:
                        if (var13.equals("$$089")) {
                            var14 = 88;
                        }
                        break;
                    case 34367175:
                        if (var13.equals("$$090")) {
                            var14 = 89;
                        }
                        break;
                    case 34367176:
                        if (var13.equals("$$091")) {
                            var14 = 90;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bdaResult.getTag());
                        break;
                    case 1:
                        textElement.setValue("Φ" + bdaResult.getDpo() + "×" + bdaResult.getThkpn());
                        break;
                    case 2:
                        textElement.setValue(bdaResult.getPd().toString());
                        break;
                    case 3:
                        textElement.setValue(bdaResult.getT().toString());
                        break;
                    case 4:
                        textElement.setValue(bdaResult.getPs().toString());
                        break;
                    case 5:
                        textElement.setValue(bdaResult.getTest());
                        break;
                    case 6:
                        textElement.setValue(bdaResult.getStds());
                        break;
                    case 7:
                        textElement.setValue(bdaResult.getNames());
                        break;
                    case 8:
                        textElement.setValue(bdaResult.getDsi().toString());
                        break;
                    case 9:
                        textElement.setValue(bdaResult.getThksn().toString());
                        break;
                    case 10:
                        textElement.setValue(bdaResult.getCs2().toString());
                        break;
                    case 11:
                        textElement.setValue(bdaResult.getEs().toString());
                        break;
                    case 12:
                        textElement.setValue(bdaResult.getStdp());
                        break;
                    case 13:
                        textElement.setValue(bdaResult.getNamep());
                        break;
                    case 14:
                        textElement.setValue(bdaResult.getDpo().toString());
                        break;
                    case 15:
                        textElement.setValue(bdaResult.getThkpn().toString());
                        break;
                    case 16:
                        textElement.setValue(bdaResult.getHpo().toString());
                        break;
                    case 17:
                        textElement.setValue(bdaResult.getHpi().toString());
                        break;
                    case 18:
                        textElement.setValue(bdaResult.getAlpha().toString());
                        break;
                    case 19:
                        textElement.setValue(bdaResult.getL().toString());
                        break;
                    case 20:
                        textElement.setValue(bdaResult.getCp2().toString());
                        break;
                    case 21:
                        textElement.setValue(bdaResult.getEp().toString());
                        break;
                    case 22:
                        textElement.setValue(bdaResult.getStdr());
                        break;
                    case 23:
                        textElement.setValue(bdaResult.getNamer());
                        break;
                    case 24:
                        textElement.setValue(bdaResult.getDro().toString());
                        break;
                    case 25:
                        textElement.setValue(bdaResult.getThkrn().toString());
                        break;
                    case 26:
                        textElement.setValue(bdaResult.getCr2().toString());
                        break;
                    case 27:
                        textElement.setValue(bdaResult.getA3().toString());
                        break;
                    case 28:
                        textElement.setValue(bdaResult.getBs().toString());
                        break;
                    case 29:
                        textElement.setValue(bdaResult.getDs().toString());
                        break;
                    case 30:
                        textElement.setValue(bdaResult.getCs1().toString());
                        break;
                    case 31:
                        textElement.setValue(bdaResult.getRsel().toString());
                        break;
                    case 32:
                        textElement.setValue(bdaResult.getOst().toString());
                        break;
                    case 33:
                        textElement.setValue(bdaResult.getOs().toString());
                        break;
                    case 34:
                        textElement.setValue(bdaResult.getDr().toString());
                        break;
                    case 35:
                        textElement.setValue(bdaResult.getCr1().toString());
                        break;
                    case 36:
                        textElement.setValue(bdaResult.getRrel().toString());
                        break;
                    case 37:
                        textElement.setValue(bdaResult.getDp().toString());
                        break;
                    case 38:
                        textElement.setValue(bdaResult.getCp1().toString());
                        break;
                    case 39:
                        textElement.setValue(bdaResult.getRpel().toString());
                        break;
                    case 40:
                        textElement.setValue(bdaResult.getOpt().toString());
                        break;
                    case 41:
                        textElement.setValue(bdaResult.getOp().toString());
                        break;
                    case 42:
                        textElement.setValue(bdaResult.getOrt().toString());
                        break;
                    case 43:
                        textElement.setValue(bdaResult.getOr().toString());
                        break;
                    case 44:
                        textElement.setValue(bdaResult.getPc().toString());
                        break;
                    case 45:
                        textElement.setValue(bdaResult.getCs().toString());
                        break;
                    case 46:
                        textElement.setValue(bdaResult.getThkse().toString());
                        break;
                    case 47:
                        textElement.setValue(bdaResult.getDsm().toString());
                        break;
                    case 48:
                        textElement.setValue(bdaResult.getRsm().toString());
                        break;
                    case 49:
                        textElement.setValue(bdaResult.getCp().toString());
                        break;
                    case 50:
                        textElement.setValue(bdaResult.getThkpe().toString());
                        break;
                    case 51:
                        textElement.setValue(bdaResult.getDpc().toString());
                        break;
                    case 52:
                        textElement.setValue(bdaResult.getSa().toString());
                        break;
                    case 53:
                        textElement.setValue(bdaResult.getSb().toString());
                        break;
                    case 54:
                        textElement.setValue(bdaResult.getK().toString());
                        break;
                    case 55:
                        textElement.setValue(bdaResult.getDop().toString());
                        break;
                    case 56:
                        textElement.setValue(bdaResult.getFp().toString());
                        break;
                    case 57:
                        textElement.setValue(bdaResult.getCr().toString());
                        break;
                    case 58:
                        textElement.setValue(bdaResult.getThkre().toString());
                        break;
                    case 59:
                        textElement.setValue(bdaResult.getFr().toString());
                        break;
                    case 60:
                        textElement.setValue(bdaResult.getThksc().toString());
                        break;
                    case 61:
                        textElement.setValue(bdaResult.getThksmin().toString());
                        break;
                    case 62:
                        textElement.setValue(bdaResult.getThksd().toString());
                        break;
                    case 63:
                        textElement.setValue(bdaResult.getThkschk());
                        break;
                    case 64:
                        textElement.setValue(bdaResult.getThkpc().toString());
                        break;
                    case 65:
                        textElement.setValue(bdaResult.getThkpd().toString());
                        break;
                    case 66:
                        textElement.setValue(bdaResult.getThkpchk());
                        break;
                    case 67:
                        textElement.setValue(bdaResult.getBa().toString());
                        break;
                    case 68:
                        textElement.setValue(bdaResult.getBb().toString());
                        break;
                    case 69:
                        textElement.setValue(bdaResult.getA1().toString());
                        break;
                    case 70:
                        textElement.setValue(bdaResult.getHp1().toString());
                        break;
                    case 71:
                        textElement.setValue(bdaResult.getHp2().toString());
                        break;
                    case 72:
                        textElement.setValue(bdaResult.getA2().toString());
                        break;
                    case 73:
                        textElement.setValue(bdaResult.getDre().toString());
                        break;
                    case 74:
                        textElement.setValue(bdaResult.getA4().toString());
                        break;
                    case 75:
                        textElement.setValue(bdaResult.getAe().toString());
                        break;
                    case 76:
                        textElement.setValue(bdaResult.getAchk());
                        break;
                    case 77:
                        textElement.setValue(bdaResult.getEta().toString());
                        break;
                    case 78:
                        textElement.setValue(bdaResult.getPst().toString());
                        break;
                    case 79:
                        textElement.setValue(bdaResult.getPpt().toString());
                        break;
                    case 80:
                        textElement.setValue(bdaResult.getPt().toString());
                        break;
                    case 81:
                        textElement.setValue(bdaResult.getMawps().toString());
                        break;
                    case 82:
                        textElement.setValue(bdaResult.getMawpp().toString());
                        break;
                    case 83:
                        textElement.setValue(bdaResult.getMawpa1().toString());
                        break;
                    case 84:
                        textElement.setValue(bdaResult.getMawpa2().toString());
                        break;
                    case 85:
                        textElement.setValue(bdaResult.getMawpa3().toString());
                        break;
                    case 86:
                        textElement.setValue(bdaResult.getMawpa4().toString());
                        break;
                    case 87:
                        textElement.setValue(bdaResult.getMawpa().toString());
                        break;
                    case 88:
                        textElement.setValue(bdaResult.getMawpae().toString());
                        break;
                    case 89:
                        textElement.setValue(bdaResult.getMawpr().toString());
                        break;
                    case 90:
                        textElement.setValue(bdaResult.getMawp().toString());
                        break;
                    case 91:
                        textElement.setValue("Φ" + bdaResult.getDsi().toString());
                        break;
                    case 92:
                        textElement.setValue(bdaResult.getThksn().toString());
                        break;
                    case 93:
                        textElement.setValue("Φ" + bdaResult.getDpo().toString());
                        break;
                    case 94:
                        textElement.setValue(bdaResult.getThkpn().toString());
                        break;
                    case 95:
                        textElement.setValue(bdaResult.getHpo().toString());
                        break;
                    case 96:
                        textElement.setValue(bdaResult.getHpi().toString());
                        break;
                    case 97:
                        textElement.setValue(bdaResult.getAlpha().toString() + "°");
                        break;
                    case 98:
                        textElement.setValue(bdaResult.getL().toString());
                        break;
                    case 99:
                        textElement.setValue(bdaResult.getDro().toString());
                        break;
                    case 100:
                        textElement.setValue(bdaResult.getThkrn().toString());
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
     * bdb
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bdbResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBDB(String baseFileName, BDBDocx bdbResult) {
        String template;
        if (bdbResult.getIsB().equals("是")) {
            if (bdbResult.getIsPad().equals("是")) {
                template = "D:/mechw/static/west/cal/b/d/b/BDB_YP_YB.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/d/b/BDB_NP_YB.docx";
            }
        } else if (bdbResult.getIsPad().equals("是")) {
            template = "D:/mechw/static/west/cal/b/d/b/BDB_YP_NB.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/d/b/BDB_NP_NB.docx";
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
                    case 36169:
                        if (var13.equals("$16")) {
                            var14 = 90;
                        }
                        break;
                    case 36170:
                        if (var13.equals("$17")) {
                            var14 = 91;
                        }
                        break;
                    case 36171:
                        if (var13.equals("$18")) {
                            var14 = 92;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 93;
                        }
                        break;
                    case 36198:
                        if (var13.equals("$24")) {
                            var14 = 94;
                        }
                        break;
                    case 36199:
                        if (var13.equals("$25")) {
                            var14 = 95;
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
                        break;
                    case 34367150:
                        if (var13.equals("$$086")) {
                            var14 = 85;
                        }
                        break;
                    case 34367151:
                        if (var13.equals("$$087")) {
                            var14 = 86;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bdbResult.getTag());
                        break;
                    case 1:
                        textElement.setValue("Φ" + bdbResult.getDpo() + "×" + bdbResult.getThkpn());
                        break;
                    case 2:
                        textElement.setValue(bdbResult.getPd().toString());
                        break;
                    case 3:
                        textElement.setValue(bdbResult.getT().toString());
                        break;
                    case 4:
                        textElement.setValue(bdbResult.getPs().toString());
                        break;
                    case 5:
                        textElement.setValue(bdbResult.getTest());
                        break;
                    case 6:
                        textElement.setValue(bdbResult.getStds());
                        break;
                    case 7:
                        textElement.setValue(bdbResult.getNames());
                        break;
                    case 8:
                        textElement.setValue(bdbResult.getDsi().toString());
                        break;
                    case 9:
                        textElement.setValue(bdbResult.getThksn().toString());
                        break;
                    case 10:
                        textElement.setValue(bdbResult.getCs2().toString());
                        break;
                    case 11:
                        textElement.setValue(bdbResult.getEs().toString());
                        break;
                    case 12:
                        textElement.setValue(bdbResult.getStdp());
                        break;
                    case 13:
                        textElement.setValue(bdbResult.getNamep());
                        break;
                    case 14:
                        textElement.setValue(bdbResult.getDpo().toString());
                        break;
                    case 15:
                        textElement.setValue(bdbResult.getThkpn().toString());
                        break;
                    case 16:
                        textElement.setValue(bdbResult.getHpo().toString());
                        break;
                    case 17:
                        textElement.setValue(bdbResult.getHpi().toString());
                        break;
                    case 18:
                        textElement.setValue(bdbResult.getAlpha().toString());
                        break;
                    case 19:
                        textElement.setValue(bdbResult.getCp2().toString());
                        break;
                    case 20:
                        textElement.setValue(bdbResult.getEp().toString());
                        break;
                    case 21:
                        textElement.setValue(bdbResult.getStdr());
                        break;
                    case 22:
                        textElement.setValue(bdbResult.getNamer());
                        break;
                    case 23:
                        textElement.setValue(bdbResult.getDro().toString());
                        break;
                    case 24:
                        textElement.setValue(bdbResult.getThkrn().toString());
                        break;
                    case 25:
                        textElement.setValue(bdbResult.getCr2().toString());
                        break;
                    case 26:
                        textElement.setValue(bdbResult.getA3().toString());
                        break;
                    case 27:
                        textElement.setValue(bdbResult.getBs().toString());
                        break;
                    case 28:
                        textElement.setValue(bdbResult.getDs().toString());
                        break;
                    case 29:
                        textElement.setValue(bdbResult.getCs1().toString());
                        break;
                    case 30:
                        textElement.setValue(bdbResult.getRsel().toString());
                        break;
                    case 31:
                        textElement.setValue(bdbResult.getOst().toString());
                        break;
                    case 32:
                        textElement.setValue(bdbResult.getOs().toString());
                        break;
                    case 33:
                        textElement.setValue(bdbResult.getDr().toString());
                        break;
                    case 34:
                        textElement.setValue(bdbResult.getCr1().toString());
                        break;
                    case 35:
                        textElement.setValue(bdbResult.getRrel().toString());
                        break;
                    case 36:
                        textElement.setValue(bdbResult.getDp().toString());
                        break;
                    case 37:
                        textElement.setValue(bdbResult.getCp1().toString());
                        break;
                    case 38:
                        textElement.setValue(bdbResult.getRpel().toString());
                        break;
                    case 39:
                        textElement.setValue(bdbResult.getOpt().toString());
                        break;
                    case 40:
                        textElement.setValue(bdbResult.getOp().toString());
                        break;
                    case 41:
                        textElement.setValue(bdbResult.getOrt().toString());
                        break;
                    case 42:
                        textElement.setValue(bdbResult.getOr().toString());
                        break;
                    case 43:
                        textElement.setValue(bdbResult.getPc().toString());
                        break;
                    case 44:
                        textElement.setValue(bdbResult.getCs().toString());
                        break;
                    case 45:
                        textElement.setValue(bdbResult.getThkse().toString());
                        break;
                    case 46:
                        textElement.setValue(bdbResult.getCp().toString());
                        break;
                    case 47:
                        textElement.setValue(bdbResult.getThkpe().toString());
                        break;
                    case 48:
                        textElement.setValue(bdbResult.getDpc().toString());
                        break;
                    case 49:
                        textElement.setValue(bdbResult.getSa().toString());
                        break;
                    case 50:
                        textElement.setValue(bdbResult.getSb().toString());
                        break;
                    case 51:
                        textElement.setValue(bdbResult.getK().toString());
                        break;
                    case 52:
                        textElement.setValue(bdbResult.getDop().toString());
                        break;
                    case 53:
                        textElement.setValue(bdbResult.getFp().toString());
                        break;
                    case 54:
                        textElement.setValue(bdbResult.getCr().toString());
                        break;
                    case 55:
                        textElement.setValue(bdbResult.getThkre().toString());
                        break;
                    case 56:
                        textElement.setValue(bdbResult.getFr().toString());
                        break;
                    case 57:
                        textElement.setValue(bdbResult.getThksc().toString());
                        break;
                    case 58:
                        textElement.setValue(bdbResult.getThksd().toString());
                        break;
                    case 59:
                        textElement.setValue(bdbResult.getThkschk());
                        break;
                    case 60:
                        textElement.setValue(bdbResult.getThkpc().toString());
                        break;
                    case 61:
                        textElement.setValue(bdbResult.getThkpd().toString());
                        break;
                    case 62:
                        textElement.setValue(bdbResult.getThkpchk());
                        break;
                    case 63:
                        textElement.setValue(bdbResult.getBa().toString());
                        break;
                    case 64:
                        textElement.setValue(bdbResult.getBb().toString());
                        break;
                    case 65:
                        textElement.setValue(bdbResult.getA1().toString());
                        break;
                    case 66:
                        textElement.setValue(bdbResult.getHp1().toString());
                        break;
                    case 67:
                        textElement.setValue(bdbResult.getHp2().toString());
                        break;
                    case 68:
                        textElement.setValue(bdbResult.getA2().toString());
                        break;
                    case 69:
                        textElement.setValue(bdbResult.getDre().toString());
                        break;
                    case 70:
                        textElement.setValue(bdbResult.getA4().toString());
                        break;
                    case 71:
                        textElement.setValue(bdbResult.getAe().toString());
                        break;
                    case 72:
                        textElement.setValue(bdbResult.getAchk());
                        break;
                    case 73:
                        textElement.setValue(bdbResult.getEta().toString());
                        break;
                    case 74:
                        textElement.setValue(bdbResult.getPst().toString());
                        break;
                    case 75:
                        textElement.setValue(bdbResult.getPpt().toString());
                        break;
                    case 76:
                        textElement.setValue(bdbResult.getPt().toString());
                        break;
                    case 77:
                        textElement.setValue(bdbResult.getMawps().toString());
                        break;
                    case 78:
                        textElement.setValue(bdbResult.getMawpp().toString());
                        break;
                    case 79:
                        textElement.setValue(bdbResult.getMawpa1().toString());
                        break;
                    case 80:
                        textElement.setValue(bdbResult.getMawpa2().toString());
                        break;
                    case 81:
                        textElement.setValue(bdbResult.getMawpa3().toString());
                        break;
                    case 82:
                        textElement.setValue(bdbResult.getMawpa4().toString());
                        break;
                    case 83:
                        textElement.setValue(bdbResult.getMawpa().toString());
                        break;
                    case 84:
                        textElement.setValue(bdbResult.getMawpae().toString());
                        break;
                    case 85:
                        textElement.setValue(bdbResult.getMawpr().toString());
                        break;
                    case 86:
                        textElement.setValue(bdbResult.getMawp().toString());
                        break;
                    case 87:
                        textElement.setValue("Φ" + bdbResult.getDsi().toString());
                        break;
                    case 88:
                        textElement.setValue(bdbResult.getThksn().toString());
                        break;
                    case 89:
                        textElement.setValue("Φ" + bdbResult.getDpo().toString());
                        break;
                    case 90:
                        textElement.setValue(bdbResult.getThkpn().toString());
                        break;
                    case 91:
                        textElement.setValue(bdbResult.getHpo().toString());
                        break;
                    case 92:
                        textElement.setValue(bdbResult.getHpi().toString());
                        break;
                    case 93:
                        textElement.setValue(bdbResult.getAlpha().toString() + "°");
                        break;
                    case 94:
                        textElement.setValue(bdbResult.getDro().toString());
                        break;
                    case 95:
                        textElement.setValue(bdbResult.getThkrn().toString());
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
     * bdc
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bdcResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBDC(String baseFileName, BDCDocx bdcResult) {
        String template;
        if (bdcResult.getIsB().equals("是")) {
            if (bdcResult.getIsPad().equals("是")) {
                template = "D:/mechw/static/west/cal/b/d/c/BDC_YP_YB.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/d/c/BDC_NP_YB.docx";
            }
        } else if (bdcResult.getIsPad().equals("是")) {
            template = "D:/mechw/static/west/cal/b/d/c/BDC_YP_NB.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/d/c/BDC_NP_NB.docx";
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
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 101;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 102;
                        }
                        break;
                    case 36164:
                        if (var13.equals("$11")) {
                            var14 = 103;
                        }
                        break;
                    case 36169:
                        if (var13.equals("$16")) {
                            var14 = 104;
                        }
                        break;
                    case 36170:
                        if (var13.equals("$17")) {
                            var14 = 105;
                        }
                        break;
                    case 36171:
                        if (var13.equals("$18")) {
                            var14 = 106;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 107;
                        }
                        break;
                    case 36194:
                        if (var13.equals("$20")) {
                            var14 = 108;
                        }
                        break;
                    case 36195:
                        if (var13.equals("$21")) {
                            var14 = 109;
                        }
                        break;
                    case 36196:
                        if (var13.equals("$22")) {
                            var14 = 110;
                        }
                        break;
                    case 36201:
                        if (var13.equals("$27")) {
                            var14 = 111;
                        }
                        break;
                    case 36202:
                        if (var13.equals("$28")) {
                            var14 = 112;
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
                        break;
                    case 34367150:
                        if (var13.equals("$$086")) {
                            var14 = 85;
                        }
                        break;
                    case 34367151:
                        if (var13.equals("$$087")) {
                            var14 = 86;
                        }
                        break;
                    case 34367152:
                        if (var13.equals("$$088")) {
                            var14 = 87;
                        }
                        break;
                    case 34367153:
                        if (var13.equals("$$089")) {
                            var14 = 88;
                        }
                        break;
                    case 34367175:
                        if (var13.equals("$$090")) {
                            var14 = 89;
                        }
                        break;
                    case 34367176:
                        if (var13.equals("$$091")) {
                            var14 = 90;
                        }
                        break;
                    case 34367177:
                        if (var13.equals("$$092")) {
                            var14 = 91;
                        }
                        break;
                    case 34367178:
                        if (var13.equals("$$093")) {
                            var14 = 92;
                        }
                        break;
                    case 34367179:
                        if (var13.equals("$$094")) {
                            var14 = 93;
                        }
                        break;
                    case 34367180:
                        if (var13.equals("$$095")) {
                            var14 = 94;
                        }
                        break;
                    case 34367181:
                        if (var13.equals("$$096")) {
                            var14 = 95;
                        }
                        break;
                    case 34367182:
                        if (var13.equals("$$097")) {
                            var14 = 96;
                        }
                        break;
                    case 34367183:
                        if (var13.equals("$$098")) {
                            var14 = 97;
                        }
                        break;
                    case 34367184:
                        if (var13.equals("$$099")) {
                            var14 = 98;
                        }
                        break;
                    case 34367857:
                        if (var13.equals("$$100")) {
                            var14 = 99;
                        }
                        break;
                    case 34367858:
                        if (var13.equals("$$101")) {
                            var14 = 100;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bdcResult.getTag());
                        break;
                    case 1:
                        textElement.setValue("Φ" + bdcResult.getDpo() + "×" + bdcResult.getThkpn());
                        break;
                    case 2:
                        textElement.setValue(bdcResult.getPd().toString());
                        break;
                    case 3:
                        textElement.setValue(bdcResult.getT().toString());
                        break;
                    case 4:
                        textElement.setValue(bdcResult.getPs().toString());
                        break;
                    case 5:
                        textElement.setValue(bdcResult.getTest());
                        break;
                    case 6:
                        textElement.setValue(bdcResult.getStds());
                        break;
                    case 7:
                        textElement.setValue(bdcResult.getNames());
                        break;
                    case 8:
                        textElement.setValue(bdcResult.getDsi().toString());
                        break;
                    case 9:
                        textElement.setValue(bdcResult.getHsi().toString());
                        break;
                    case 10:
                        textElement.setValue(bdcResult.getThksn().toString());
                        break;
                    case 11:
                        textElement.setValue(bdcResult.getCs2().toString());
                        break;
                    case 12:
                        textElement.setValue(bdcResult.getEs().toString());
                        break;
                    case 13:
                        textElement.setValue(bdcResult.getStdp());
                        break;
                    case 14:
                        textElement.setValue(bdcResult.getNamep());
                        break;
                    case 15:
                        textElement.setValue(bdcResult.getDpo().toString());
                        break;
                    case 16:
                        textElement.setValue(bdcResult.getThkpn().toString());
                        break;
                    case 17:
                        textElement.setValue(bdcResult.getHpo().toString());
                        break;
                    case 18:
                        textElement.setValue(bdcResult.getHpi().toString());
                        break;
                    case 19:
                        textElement.setValue(bdcResult.getAlpha().toString());
                        break;
                    case 20:
                        textElement.setValue(bdcResult.getBeta().toString());
                        break;
                    case 21:
                        textElement.setValue(bdcResult.getL().toString());
                        break;
                    case 22:
                        textElement.setValue(bdcResult.getCp2().toString());
                        break;
                    case 23:
                        textElement.setValue(bdcResult.getEp().toString());
                        break;
                    case 24:
                        textElement.setValue(bdcResult.getStdr());
                        break;
                    case 25:
                        textElement.setValue(bdcResult.getNamer());
                        break;
                    case 26:
                        textElement.setValue(bdcResult.getDro().toString());
                        break;
                    case 27:
                        textElement.setValue(bdcResult.getThkrn().toString());
                        break;
                    case 28:
                        textElement.setValue(bdcResult.getCr2().toString());
                        break;
                    case 29:
                        textElement.setValue(bdcResult.getA3().toString());
                        break;
                    case 30:
                        textElement.setValue(bdcResult.getBs().toString());
                        break;
                    case 31:
                        textElement.setValue(bdcResult.getDs().toString());
                        break;
                    case 32:
                        textElement.setValue(bdcResult.getCs1().toString());
                        break;
                    case 33:
                        textElement.setValue(bdcResult.getRsel().toString());
                        break;
                    case 34:
                        textElement.setValue(bdcResult.getOst().toString());
                        break;
                    case 35:
                        textElement.setValue(bdcResult.getOs().toString());
                        break;
                    case 36:
                        textElement.setValue(bdcResult.getDr().toString());
                        break;
                    case 37:
                        textElement.setValue(bdcResult.getCr1().toString());
                        break;
                    case 38:
                        textElement.setValue(bdcResult.getRrel().toString());
                        break;
                    case 39:
                        textElement.setValue(bdcResult.getDp().toString());
                        break;
                    case 40:
                        textElement.setValue(bdcResult.getCp1().toString());
                        break;
                    case 41:
                        textElement.setValue(bdcResult.getRpel().toString());
                        break;
                    case 42:
                        textElement.setValue(bdcResult.getOpt().toString());
                        break;
                    case 43:
                        textElement.setValue(bdcResult.getOp().toString());
                        break;
                    case 44:
                        textElement.setValue(bdcResult.getOrt().toString());
                        break;
                    case 45:
                        textElement.setValue(bdcResult.getOr().toString());
                        break;
                    case 46:
                        textElement.setValue(bdcResult.getPc().toString());
                        break;
                    case 47:
                        textElement.setValue(bdcResult.getCs().toString());
                        break;
                    case 48:
                        textElement.setValue(bdcResult.getThkse().toString());
                        break;
                    case 49:
                        textElement.setValue(bdcResult.getDso().toString());
                        break;
                    case 50:
                        textElement.setValue(bdcResult.getHso().toString());
                        break;
                    case 51:
                        textElement.setValue(bdcResult.getDsi2hsi().toString());
                        break;
                    case 52:
                        textElement.setValue(bdcResult.getK().toString());
                        break;
                    case 53:
                        textElement.setValue(bdcResult.getDso2hso().toString());
                        break;
                    case 54:
                        textElement.setValue(bdcResult.getK1().toString());
                        break;
                    case 55:
                        textElement.setValue(bdcResult.getAsm().toString());
                        break;
                    case 56:
                        textElement.setValue(bdcResult.getBsm().toString());
                        break;
                    case 57:
                        textElement.setValue(bdcResult.getH().toString());
                        break;
                    case 58:
                        textElement.setValue(bdcResult.getTheta().toString());
                        break;
                    case 59:
                        textElement.setValue(bdcResult.getCp().toString());
                        break;
                    case 60:
                        textElement.setValue(bdcResult.getThkpe().toString());
                        break;
                    case 61:
                        textElement.setValue(bdcResult.getDpc().toString());
                        break;
                    case 62:
                        textElement.setValue(bdcResult.getSa().toString());
                        break;
                    case 63:
                        textElement.setValue(bdcResult.getSb().toString());
                        break;
                    case 64:
                        textElement.setValue(bdcResult.getKs().toString());
                        break;
                    case 65:
                        textElement.setValue(bdcResult.getDop().toString());
                        break;
                    case 66:
                        textElement.setValue(bdcResult.getFp().toString());
                        break;
                    case 67:
                        textElement.setValue(bdcResult.getCr().toString());
                        break;
                    case 68:
                        textElement.setValue(bdcResult.getThkre().toString());
                        break;
                    case 69:
                        textElement.setValue(bdcResult.getFr().toString());
                        break;
                    case 70:
                        textElement.setValue(bdcResult.getThksc().toString());
                        break;
                    case 71:
                        textElement.setValue(bdcResult.getThksmin().toString());
                        break;
                    case 72:
                        textElement.setValue(bdcResult.getThksd().toString());
                        break;
                    case 73:
                        textElement.setValue(bdcResult.getThkschk());
                        break;
                    case 74:
                        textElement.setValue(bdcResult.getThkpc().toString());
                        break;
                    case 75:
                        textElement.setValue(bdcResult.getThkpd().toString());
                        break;
                    case 76:
                        textElement.setValue(bdcResult.getThkpchk());
                        break;
                    case 77:
                        textElement.setValue(bdcResult.getBa().toString());
                        break;
                    case 78:
                        textElement.setValue(bdcResult.getBb().toString());
                        break;
                    case 79:
                        textElement.setValue(bdcResult.getA1().toString());
                        break;
                    case 80:
                        textElement.setValue(bdcResult.getHp1().toString());
                        break;
                    case 81:
                        textElement.setValue(bdcResult.getHp2().toString());
                        break;
                    case 82:
                        textElement.setValue(bdcResult.getA2().toString());
                        break;
                    case 83:
                        textElement.setValue(bdcResult.getDre().toString());
                        break;
                    case 84:
                        textElement.setValue(bdcResult.getA4().toString());
                        break;
                    case 85:
                        textElement.setValue(bdcResult.getAe().toString());
                        break;
                    case 86:
                        textElement.setValue(bdcResult.getAchk());
                        break;
                    case 87:
                        textElement.setValue(bdcResult.getEta().toString());
                        break;
                    case 88:
                        textElement.setValue(bdcResult.getPst().toString());
                        break;
                    case 89:
                        textElement.setValue(bdcResult.getPpt().toString());
                        break;
                    case 90:
                        textElement.setValue(bdcResult.getPt().toString());
                        break;
                    case 91:
                        textElement.setValue(bdcResult.getMawps().toString());
                        break;
                    case 92:
                        textElement.setValue(bdcResult.getMawpp().toString());
                        break;
                    case 93:
                        textElement.setValue(bdcResult.getMawpa1().toString());
                        break;
                    case 94:
                        textElement.setValue(bdcResult.getMawpa2().toString());
                        break;
                    case 95:
                        textElement.setValue(bdcResult.getMawpa3().toString());
                        break;
                    case 96:
                        textElement.setValue(bdcResult.getMawpa4().toString());
                        break;
                    case 97:
                        textElement.setValue(bdcResult.getMawpa().toString());
                        break;
                    case 98:
                        textElement.setValue(bdcResult.getMawpae().toString());
                        break;
                    case 99:
                        textElement.setValue(bdcResult.getMawpr().toString());
                        break;
                    case 100:
                        textElement.setValue(bdcResult.getMawp().toString());
                        break;
                    case 101:
                        textElement.setValue("Φ" + bdcResult.getDsi().toString());
                        break;
                    case 102:
                        textElement.setValue(bdcResult.getHsi().toString());
                        break;
                    case 103:
                        textElement.setValue(bdcResult.getThksn().toString());
                        break;
                    case 104:
                        textElement.setValue("Φ" + bdcResult.getDpo().toString());
                        break;
                    case 105:
                        textElement.setValue(bdcResult.getThkpn().toString());
                        break;
                    case 106:
                        textElement.setValue(bdcResult.getHpo().toString());
                        break;
                    case 107:
                        textElement.setValue(bdcResult.getHpi().toString());
                        break;
                    case 108:
                        textElement.setValue(bdcResult.getAlpha().toString() + "°");
                        break;
                    case 109:
                        textElement.setValue(bdcResult.getBeta().toString() + "°");
                        break;
                    case 110:
                        textElement.setValue(bdcResult.getL().toString());
                        break;
                    case 111:
                        textElement.setValue(bdcResult.getDro().toString());
                        break;
                    case 112:
                        textElement.setValue(bdcResult.getThkrn().toString());
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
     * bdd
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bddResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBDD(String baseFileName, BDDDocx bddResult) {
        String template;
        if (bddResult.getIsB().equals("是")) {
            if (bddResult.getIsPad().equals("是")) {
                template = "D:/mechw/static/west/cal/b/d/d/BDD_YP_YB.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/d/d/BDD_NP_YB.docx";
            }
        } else if (bddResult.getIsPad().equals("是")) {
            template = "D:/mechw/static/west/cal/b/d/d/BDD_YP_NB.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/d/d/BDD_NP_NB.docx";
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
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 102;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 103;
                        }
                        break;
                    case 36164:
                        if (var13.equals("$11")) {
                            var14 = 104;
                        }
                        break;
                    case 36165:
                        if (var13.equals("$12")) {
                            var14 = 105;
                        }
                        break;
                    case 36170:
                        if (var13.equals("$17")) {
                            var14 = 106;
                        }
                        break;
                    case 36171:
                        if (var13.equals("$18")) {
                            var14 = 107;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 108;
                        }
                        break;
                    case 36194:
                        if (var13.equals("$20")) {
                            var14 = 109;
                        }
                        break;
                    case 36195:
                        if (var13.equals("$21")) {
                            var14 = 110;
                        }
                        break;
                    case 36196:
                        if (var13.equals("$22")) {
                            var14 = 111;
                        }
                        break;
                    case 36197:
                        if (var13.equals("$23")) {
                            var14 = 112;
                        }
                        break;
                    case 36202:
                        if (var13.equals("$28")) {
                            var14 = 113;
                        }
                        break;
                    case 36203:
                        if (var13.equals("$29")) {
                            var14 = 114;
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
                        break;
                    case 34367150:
                        if (var13.equals("$$086")) {
                            var14 = 85;
                        }
                        break;
                    case 34367151:
                        if (var13.equals("$$087")) {
                            var14 = 86;
                        }
                        break;
                    case 34367152:
                        if (var13.equals("$$088")) {
                            var14 = 87;
                        }
                        break;
                    case 34367153:
                        if (var13.equals("$$089")) {
                            var14 = 88;
                        }
                        break;
                    case 34367175:
                        if (var13.equals("$$090")) {
                            var14 = 89;
                        }
                        break;
                    case 34367176:
                        if (var13.equals("$$091")) {
                            var14 = 90;
                        }
                        break;
                    case 34367177:
                        if (var13.equals("$$092")) {
                            var14 = 91;
                        }
                        break;
                    case 34367178:
                        if (var13.equals("$$093")) {
                            var14 = 92;
                        }
                        break;
                    case 34367179:
                        if (var13.equals("$$094")) {
                            var14 = 93;
                        }
                        break;
                    case 34367180:
                        if (var13.equals("$$095")) {
                            var14 = 94;
                        }
                        break;
                    case 34367181:
                        if (var13.equals("$$096")) {
                            var14 = 95;
                        }
                        break;
                    case 34367182:
                        if (var13.equals("$$097")) {
                            var14 = 96;
                        }
                        break;
                    case 34367183:
                        if (var13.equals("$$098")) {
                            var14 = 97;
                        }
                        break;
                    case 34367184:
                        if (var13.equals("$$099")) {
                            var14 = 98;
                        }
                        break;
                    case 34367857:
                        if (var13.equals("$$100")) {
                            var14 = 99;
                        }
                        break;
                    case 34367858:
                        if (var13.equals("$$101")) {
                            var14 = 100;
                        }
                        break;
                    case 34367859:
                        if (var13.equals("$$102")) {
                            var14 = 101;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bddResult.getTag());
                        break;
                    case 1:
                        textElement.setValue("Φ" + bddResult.getDpo() + "×" + bddResult.getThkpn());
                        break;
                    case 2:
                        textElement.setValue(bddResult.getPd().toString());
                        break;
                    case 3:
                        textElement.setValue(bddResult.getT().toString());
                        break;
                    case 4:
                        textElement.setValue(bddResult.getPs().toString());
                        break;
                    case 5:
                        textElement.setValue(bddResult.getTest());
                        break;
                    case 6:
                        textElement.setValue(bddResult.getStds());
                        break;
                    case 7:
                        textElement.setValue(bddResult.getNames());
                        break;
                    case 8:
                        textElement.setValue(bddResult.getDsi().toString());
                        break;
                    case 9:
                        textElement.setValue(bddResult.getBrsi().toString());
                        break;
                    case 10:
                        textElement.setValue(bddResult.getSrsi().toString());
                        break;
                    case 11:
                        textElement.setValue(bddResult.getThksn().toString());
                        break;
                    case 12:
                        textElement.setValue(bddResult.getCs2().toString());
                        break;
                    case 13:
                        textElement.setValue(bddResult.getEs().toString());
                        break;
                    case 14:
                        textElement.setValue(bddResult.getStdp());
                        break;
                    case 15:
                        textElement.setValue(bddResult.getNamep());
                        break;
                    case 16:
                        textElement.setValue(bddResult.getDpo().toString());
                        break;
                    case 17:
                        textElement.setValue(bddResult.getThkpn().toString());
                        break;
                    case 18:
                        textElement.setValue(bddResult.getHpo().toString());
                        break;
                    case 19:
                        textElement.setValue(bddResult.getHpi().toString());
                        break;
                    case 20:
                        textElement.setValue(bddResult.getAlpha().toString());
                        break;
                    case 21:
                        textElement.setValue(bddResult.getBeta().toString());
                        break;
                    case 22:
                        textElement.setValue(bddResult.getL().toString());
                        break;
                    case 23:
                        textElement.setValue(bddResult.getCp2().toString());
                        break;
                    case 24:
                        textElement.setValue(bddResult.getEp().toString());
                        break;
                    case 25:
                        textElement.setValue(bddResult.getStdr());
                        break;
                    case 26:
                        textElement.setValue(bddResult.getNamer());
                        break;
                    case 27:
                        textElement.setValue(bddResult.getDro().toString());
                        break;
                    case 28:
                        textElement.setValue(bddResult.getThkrn().toString());
                        break;
                    case 29:
                        textElement.setValue(bddResult.getCr2().toString());
                        break;
                    case 30:
                        textElement.setValue(bddResult.getA3().toString());
                        break;
                    case 31:
                        textElement.setValue(bddResult.getBs().toString());
                        break;
                    case 32:
                        textElement.setValue(bddResult.getDs().toString());
                        break;
                    case 33:
                        textElement.setValue(bddResult.getCs1().toString());
                        break;
                    case 34:
                        textElement.setValue(bddResult.getRsel().toString());
                        break;
                    case 35:
                        textElement.setValue(bddResult.getOst().toString());
                        break;
                    case 36:
                        textElement.setValue(bddResult.getOs().toString());
                        break;
                    case 37:
                        textElement.setValue(bddResult.getDr().toString());
                        break;
                    case 38:
                        textElement.setValue(bddResult.getCr1().toString());
                        break;
                    case 39:
                        textElement.setValue(bddResult.getRrel().toString());
                        break;
                    case 40:
                        textElement.setValue(bddResult.getDp().toString());
                        break;
                    case 41:
                        textElement.setValue(bddResult.getCp1().toString());
                        break;
                    case 42:
                        textElement.setValue(bddResult.getRpel().toString());
                        break;
                    case 43:
                        textElement.setValue(bddResult.getOpt().toString());
                        break;
                    case 44:
                        textElement.setValue(bddResult.getOp().toString());
                        break;
                    case 45:
                        textElement.setValue(bddResult.getOrt().toString());
                        break;
                    case 46:
                        textElement.setValue(bddResult.getOr().toString());
                        break;
                    case 47:
                        textElement.setValue(bddResult.getPc().toString());
                        break;
                    case 48:
                        textElement.setValue(bddResult.getCs().toString());
                        break;
                    case 49:
                        textElement.setValue(bddResult.getThkse().toString());
                        break;
                    case 50:
                        textElement.setValue(bddResult.getDso().toString());
                        break;
                    case 51:
                        textElement.setValue(bddResult.getBrso().toString());
                        break;
                    case 52:
                        textElement.setValue(bddResult.getSrso().toString());
                        break;
                    case 53:
                        textElement.setValue(bddResult.getBrsisrsi().toString());
                        break;
                    case 54:
                        textElement.setValue(bddResult.getM().toString());
                        break;
                    case 55:
                        textElement.setValue(bddResult.getDsm().toString());
                        break;
                    case 56:
                        textElement.setValue(bddResult.getBrsm().toString());
                        break;
                    case 57:
                        textElement.setValue(bddResult.getSrsm().toString());
                        break;
                    case 58:
                        textElement.setValue(bddResult.getDelta().toString());
                        break;
                    case 59:
                        textElement.setValue(bddResult.getTheta().toString());
                        break;
                    case 60:
                        textElement.setValue(bddResult.getCp().toString());
                        break;
                    case 61:
                        textElement.setValue(bddResult.getThkpe().toString());
                        break;
                    case 62:
                        textElement.setValue(bddResult.getDpc().toString());
                        break;
                    case 63:
                        textElement.setValue(bddResult.getSa().toString());
                        break;
                    case 64:
                        textElement.setValue(bddResult.getSb().toString());
                        break;
                    case 65:
                        textElement.setValue(bddResult.getKs().toString());
                        break;
                    case 66:
                        textElement.setValue(bddResult.getDop().toString());
                        break;
                    case 67:
                        textElement.setValue(bddResult.getFp().toString());
                        break;
                    case 68:
                        textElement.setValue(bddResult.getCr().toString());
                        break;
                    case 69:
                        textElement.setValue(bddResult.getThkre().toString());
                        break;
                    case 70:
                        textElement.setValue(bddResult.getFr().toString());
                        break;
                    case 71:
                        textElement.setValue(bddResult.getThksc().toString());
                        break;
                    case 72:
                        textElement.setValue(bddResult.getThksmin().toString());
                        break;
                    case 73:
                        textElement.setValue(bddResult.getThksd().toString());
                        break;
                    case 74:
                        textElement.setValue(bddResult.getThkschk());
                        break;
                    case 75:
                        textElement.setValue(bddResult.getThkpc().toString());
                        break;
                    case 76:
                        textElement.setValue(bddResult.getThkpd().toString());
                        break;
                    case 77:
                        textElement.setValue(bddResult.getThkpchk());
                        break;
                    case 78:
                        textElement.setValue(bddResult.getBa().toString());
                        break;
                    case 79:
                        textElement.setValue(bddResult.getBb().toString());
                        break;
                    case 80:
                        textElement.setValue(bddResult.getA1().toString());
                        break;
                    case 81:
                        textElement.setValue(bddResult.getHp1().toString());
                        break;
                    case 82:
                        textElement.setValue(bddResult.getHp2().toString());
                        break;
                    case 83:
                        textElement.setValue(bddResult.getA2().toString());
                        break;
                    case 84:
                        textElement.setValue(bddResult.getDre().toString());
                        break;
                    case 85:
                        textElement.setValue(bddResult.getA4().toString());
                        break;
                    case 86:
                        textElement.setValue(bddResult.getAe().toString());
                        break;
                    case 87:
                        textElement.setValue(bddResult.getAchk());
                        break;
                    case 88:
                        textElement.setValue(bddResult.getEta().toString());
                        break;
                    case 89:
                        textElement.setValue(bddResult.getPst().toString());
                        break;
                    case 90:
                        textElement.setValue(bddResult.getPpt().toString());
                        break;
                    case 91:
                        textElement.setValue(bddResult.getPt().toString());
                        break;
                    case 92:
                        textElement.setValue(bddResult.getMawps().toString());
                        break;
                    case 93:
                        textElement.setValue(bddResult.getMawpp().toString());
                        break;
                    case 94:
                        textElement.setValue(bddResult.getMawpa1().toString());
                        break;
                    case 95:
                        textElement.setValue(bddResult.getMawpa2().toString());
                        break;
                    case 96:
                        textElement.setValue(bddResult.getMawpa3().toString());
                        break;
                    case 97:
                        textElement.setValue(bddResult.getMawpa4().toString());
                        break;
                    case 98:
                        textElement.setValue(bddResult.getMawpa().toString());
                        break;
                    case 99:
                        textElement.setValue(bddResult.getMawpae().toString());
                        break;
                    case 100:
                        textElement.setValue(bddResult.getMawpr().toString());
                        break;
                    case 101:
                        textElement.setValue(bddResult.getMawp().toString());
                        break;
                    case 102:
                        textElement.setValue("Φ" + bddResult.getDsi().toString());
                        break;
                    case 103:
                        textElement.setValue("R" + bddResult.getBrsi().toString());
                        break;
                    case 104:
                        textElement.setValue("R" + bddResult.getSrsi().toString());
                        break;
                    case 105:
                        textElement.setValue(bddResult.getThksn().toString());
                        break;
                    case 106:
                        textElement.setValue("Φ" + bddResult.getDpo().toString());
                        break;
                    case 107:
                        textElement.setValue(bddResult.getThkpn().toString());
                        break;
                    case 108:
                        textElement.setValue(bddResult.getHpo().toString());
                        break;
                    case 109:
                        textElement.setValue(bddResult.getHpi().toString());
                        break;
                    case 110:
                        textElement.setValue(bddResult.getAlpha().toString() + "°");
                        break;
                    case 111:
                        textElement.setValue(bddResult.getBeta().toString() + "°");
                        break;
                    case 112:
                        textElement.setValue(bddResult.getL().toString());
                        break;
                    case 113:
                        textElement.setValue(bddResult.getDro().toString());
                        break;
                    case 114:
                        textElement.setValue(bddResult.getThkrn().toString());
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
     * bde
     * docx4j 替换生成计算书
     *
     * @param baseFileName 基准文件名
     * @param bdeResult    计算数据结果
     * @return 新计算书 URL
     */
    public static String getBDE(String baseFileName, BDEDocx bdeResult) {
        String template;
        if (bdeResult.getIsB().equals("是")) {
            if (bdeResult.getIsPad().equals("是")) {
                template = "D:/mechw/static/west/cal/b/d/e/BDE_YP_YB.docx";
            } else {
                template = "D:/mechw/static/west/cal/b/d/e/BDE_NP_YB.docx";
            }
        } else if (bdeResult.getIsPad().equals("是")) {
            template = "D:/mechw/static/west/cal/b/d/e/BDE_YP_NB.docx";
        } else {
            template = "D:/mechw/static/west/cal/b/d/e/BDE_NP_NB.docx";
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
                    case 36141:
                        if (var13.equals("$09")) {
                            var14 = 91;
                        }
                        break;
                    case 36163:
                        if (var13.equals("$10")) {
                            var14 = 92;
                        }
                        break;
                    case 36164:
                        if (var13.equals("$11")) {
                            var14 = 93;
                        }
                        break;
                    case 36169:
                        if (var13.equals("$16")) {
                            var14 = 94;
                        }
                        break;
                    case 36170:
                        if (var13.equals("$17")) {
                            var14 = 95;
                        }
                        break;
                    case 36171:
                        if (var13.equals("$18")) {
                            var14 = 96;
                        }
                        break;
                    case 36172:
                        if (var13.equals("$19")) {
                            var14 = 97;
                        }
                        break;
                    case 36194:
                        if (var13.equals("$20")) {
                            var14 = 98;
                        }
                        break;
                    case 36195:
                        if (var13.equals("$21")) {
                            var14 = 99;
                        }
                        break;
                    case 36200:
                        if (var13.equals("$26")) {
                            var14 = 100;
                        }
                        break;
                    case 36201:
                        if (var13.equals("$27")) {
                            var14 = 101;
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
                        break;
                    case 34367150:
                        if (var13.equals("$$086")) {
                            var14 = 85;
                        }
                        break;
                    case 34367151:
                        if (var13.equals("$$087")) {
                            var14 = 86;
                        }
                        break;
                    case 34367152:
                        if (var13.equals("$$088")) {
                            var14 = 87;
                        }
                        break;
                    case 34367153:
                        if (var13.equals("$$089")) {
                            var14 = 88;
                        }
                        break;
                    case 34367175:
                        if (var13.equals("$$090")) {
                            var14 = 89;
                        }
                        break;
                    case 34367176:
                        if (var13.equals("$$091")) {
                            var14 = 90;
                        }
                }

                switch (var14) {
                    case 0:
                        textElement.setValue(bdeResult.getTag());
                        break;
                    case 1:
                        textElement.setValue("Φ" + bdeResult.getDpo() + "×" + bdeResult.getThkpn());
                        break;
                    case 2:
                        textElement.setValue(bdeResult.getPd().toString());
                        break;
                    case 3:
                        textElement.setValue(bdeResult.getT().toString());
                        break;
                    case 4:
                        textElement.setValue(bdeResult.getPs().toString());
                        break;
                    case 5:
                        textElement.setValue(bdeResult.getTest());
                        break;
                    case 6:
                        textElement.setValue(bdeResult.getStds());
                        break;
                    case 7:
                        textElement.setValue(bdeResult.getNames());
                        break;
                    case 8:
                        textElement.setValue(bdeResult.getDsi().toString());
                        break;
                    case 9:
                        textElement.setValue(bdeResult.getThksn().toString());
                        break;
                    case 10:
                        textElement.setValue(bdeResult.getTheta().toString());
                        break;
                    case 11:
                        textElement.setValue(bdeResult.getCs2().toString());
                        break;
                    case 12:
                        textElement.setValue(bdeResult.getEs().toString());
                        break;
                    case 13:
                        textElement.setValue(bdeResult.getStdp());
                        break;
                    case 14:
                        textElement.setValue(bdeResult.getNamep());
                        break;
                    case 15:
                        textElement.setValue(bdeResult.getDpo().toString());
                        break;
                    case 16:
                        textElement.setValue(bdeResult.getThkpn().toString());
                        break;
                    case 17:
                        textElement.setValue(bdeResult.getHpo().toString());
                        break;
                    case 18:
                        textElement.setValue(bdeResult.getHpi().toString());
                        break;
                    case 19:
                        textElement.setValue(bdeResult.getAlpha().toString());
                        break;
                    case 20:
                        textElement.setValue(bdeResult.getL().toString());
                        break;
                    case 21:
                        textElement.setValue(bdeResult.getCp2().toString());
                        break;
                    case 22:
                        textElement.setValue(bdeResult.getEp().toString());
                        break;
                    case 23:
                        textElement.setValue(bdeResult.getStdr());
                        break;
                    case 24:
                        textElement.setValue(bdeResult.getNamer());
                        break;
                    case 25:
                        textElement.setValue(bdeResult.getDro().toString());
                        break;
                    case 26:
                        textElement.setValue(bdeResult.getThkrn().toString());
                        break;
                    case 27:
                        textElement.setValue(bdeResult.getCr2().toString());
                        break;
                    case 28:
                        textElement.setValue(bdeResult.getA3().toString());
                        break;
                    case 29:
                        textElement.setValue(bdeResult.getBs().toString());
                        break;
                    case 30:
                        textElement.setValue(bdeResult.getDs().toString());
                        break;
                    case 31:
                        textElement.setValue(bdeResult.getCs1().toString());
                        break;
                    case 32:
                        textElement.setValue(bdeResult.getRsel().toString());
                        break;
                    case 33:
                        textElement.setValue(bdeResult.getOst().toString());
                        break;
                    case 34:
                        textElement.setValue(bdeResult.getOs().toString());
                        break;
                    case 35:
                        textElement.setValue(bdeResult.getDr().toString());
                        break;
                    case 36:
                        textElement.setValue(bdeResult.getCr1().toString());
                        break;
                    case 37:
                        textElement.setValue(bdeResult.getRrel().toString());
                        break;
                    case 38:
                        textElement.setValue(bdeResult.getDp().toString());
                        break;
                    case 39:
                        textElement.setValue(bdeResult.getCp1().toString());
                        break;
                    case 40:
                        textElement.setValue(bdeResult.getRpel().toString());
                        break;
                    case 41:
                        textElement.setValue(bdeResult.getOpt().toString());
                        break;
                    case 42:
                        textElement.setValue(bdeResult.getOp().toString());
                        break;
                    case 43:
                        textElement.setValue(bdeResult.getOrt().toString());
                        break;
                    case 44:
                        textElement.setValue(bdeResult.getOr().toString());
                        break;
                    case 45:
                        textElement.setValue(bdeResult.getPc().toString());
                        break;
                    case 46:
                        textElement.setValue(bdeResult.getCs().toString());
                        break;
                    case 47:
                        textElement.setValue(bdeResult.getThkse().toString());
                        break;
                    case 48:
                        textElement.setValue(bdeResult.getDsm().toString());
                        break;
                    case 49:
                        textElement.setValue(bdeResult.getRsm().toString());
                        break;
                    case 50:
                        textElement.setValue(bdeResult.getCp().toString());
                        break;
                    case 51:
                        textElement.setValue(bdeResult.getThkpe().toString());
                        break;
                    case 52:
                        textElement.setValue(bdeResult.getDpc().toString());
                        break;
                    case 53:
                        textElement.setValue(bdeResult.getSa().toString());
                        break;
                    case 54:
                        textElement.setValue(bdeResult.getSb().toString());
                        break;
                    case 55:
                        textElement.setValue(bdeResult.getK().toString());
                        break;
                    case 56:
                        textElement.setValue(bdeResult.getDop().toString());
                        break;
                    case 57:
                        textElement.setValue(bdeResult.getFp().toString());
                        break;
                    case 58:
                        textElement.setValue(bdeResult.getCr().toString());
                        break;
                    case 59:
                        textElement.setValue(bdeResult.getThkre().toString());
                        break;
                    case 60:
                        textElement.setValue(bdeResult.getFr().toString());
                        break;
                    case 61:
                        textElement.setValue(bdeResult.getThksc().toString());
                        break;
                    case 62:
                        textElement.setValue(bdeResult.getThksd().toString());
                        break;
                    case 63:
                        textElement.setValue(bdeResult.getThkschk());
                        break;
                    case 64:
                        textElement.setValue(bdeResult.getThkpc().toString());
                        break;
                    case 65:
                        textElement.setValue(bdeResult.getThkpd().toString());
                        break;
                    case 66:
                        textElement.setValue(bdeResult.getThkpchk());
                        break;
                    case 67:
                        textElement.setValue(bdeResult.getBa().toString());
                        break;
                    case 68:
                        textElement.setValue(bdeResult.getBb().toString());
                        break;
                    case 69:
                        textElement.setValue(bdeResult.getA1().toString());
                        break;
                    case 70:
                        textElement.setValue(bdeResult.getHp1().toString());
                        break;
                    case 71:
                        textElement.setValue(bdeResult.getHp2().toString());
                        break;
                    case 72:
                        textElement.setValue(bdeResult.getA2().toString());
                        break;
                    case 73:
                        textElement.setValue(bdeResult.getDre().toString());
                        break;
                    case 74:
                        textElement.setValue(bdeResult.getA4().toString());
                        break;
                    case 75:
                        textElement.setValue(bdeResult.getAe().toString());
                        break;
                    case 76:
                        textElement.setValue(bdeResult.getAchk());
                        break;
                    case 77:
                        textElement.setValue(bdeResult.getEta().toString());
                        break;
                    case 78:
                        textElement.setValue(bdeResult.getPst().toString());
                        break;
                    case 79:
                        textElement.setValue(bdeResult.getPpt().toString());
                        break;
                    case 80:
                        textElement.setValue(bdeResult.getPt().toString());
                        break;
                    case 81:
                        textElement.setValue(bdeResult.getMawps().toString());
                        break;
                    case 82:
                        textElement.setValue(bdeResult.getMawpp().toString());
                        break;
                    case 83:
                        textElement.setValue(bdeResult.getMawpa1().toString());
                        break;
                    case 84:
                        textElement.setValue(bdeResult.getMawpa2().toString());
                        break;
                    case 85:
                        textElement.setValue(bdeResult.getMawpa3().toString());
                        break;
                    case 86:
                        textElement.setValue(bdeResult.getMawpa4().toString());
                        break;
                    case 87:
                        textElement.setValue(bdeResult.getMawpa().toString());
                        break;
                    case 88:
                        textElement.setValue(bdeResult.getMawpae().toString());
                        break;
                    case 89:
                        textElement.setValue(bdeResult.getMawpr().toString());
                        break;
                    case 90:
                        textElement.setValue(bdeResult.getMawp().toString());
                        break;
                    case 91:
                        textElement.setValue("Φ" + bdeResult.getDsi().toString());
                        break;
                    case 92:
                        textElement.setValue(bdeResult.getThksn().toString());
                        break;
                    case 93:
                        textElement.setValue(bdeResult.getTheta().toString() + "°");
                        break;
                    case 94:
                        textElement.setValue("Φ" + bdeResult.getDpo().toString());
                        break;
                    case 95:
                        textElement.setValue(bdeResult.getThkpn().toString());
                        break;
                    case 96:
                        textElement.setValue(bdeResult.getHpo().toString());
                        break;
                    case 97:
                        textElement.setValue(bdeResult.getHpi().toString());
                        break;
                    case 98:
                        textElement.setValue(bdeResult.getAlpha().toString() + "°");
                        break;
                    case 99:
                        textElement.setValue(bdeResult.getL().toString());
                        break;
                    case 100:
                        textElement.setValue(bdeResult.getDro().toString());
                        break;
                    case 101:
                        textElement.setValue(bdeResult.getThkrn().toString());
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