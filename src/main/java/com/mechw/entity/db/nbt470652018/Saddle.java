package com.mechw.entity.db.nbt470652018;

import com.mechw.dao.db.gbt1502011.GBT150Tool;
import com.mechw.model.db.nbt470652018.saddle.SaddleData;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "saddle", catalog = "nbt_47065_2018")
public class Saddle {

    @Id
    @Column(name = "no")
    private Double lineNo;

    @Column(name = "from")
    private String from;

    @Column(name = "type")
    private String type;

    @Column(name = "fab_method")
    private String fabMethod;

    @Column(name = "symbol")
    private String symbol;

    @Column(name = "angle")
    private Double angle;

    @Column(name = "pad")
    private String pad;

    @Column(name = "rib_num")
    private Double ribNum;

    @Column(name = "dn")
    private Double dn;

    @Column(name = "q235_q")
    private Double q235q;

    @Column(name = "q235_q_200")
    private Double q235q200;

    @Column(name = "q235_q_250")
    private Double q235q250;

    @Column(name = "q235_q_300")
    private Double q235q300;

    @Column(name = "q235_q_350")
    private Double q235q350;

    @Column(name = "q235_q_400")
    private Double q235q400;

    @Column(name = "q235_q_450")
    private Double q235q450;

    @Column(name = "q235_q_500")
    private Double q235q500;

    @Column(name = "q235_q_600")
    private Double q235q600;

    @Column(name = "q235_q_700")
    private Double q235q700;

    @Column(name = "q235_q_800")
    private Double q235q800;

    @Column(name = "q235_q_900")
    private Double q235q900;

    @Column(name = "q235_q_1000")
    private Double q235q1000;

    @Column(name = "q235_q_1100")
    private Double q235q1100;

    @Column(name = "q235_q_1200")
    private Double q235q1200;

    @Column(name = "q345_q")
    private Double q345q;

    @Column(name = "q345_q_200")
    private Double q345q200;

    @Column(name = "q345_q_250")
    private Double q345q250;

    @Column(name = "q345_q_300")
    private Double q345q300;

    @Column(name = "q345_q_350")
    private Double q345q350;

    @Column(name = "q345_q_400")
    private Double q345q400;

    @Column(name = "q345_q_450")
    private Double q345q450;

    @Column(name = "q345_q_500")
    private Double q345q500;

    @Column(name = "q345_q_600")
    private Double q345q600;

    @Column(name = "q345_q_700")
    private Double q345q700;

    @Column(name = "q345_q_800")
    private Double q345q800;

    @Column(name = "q345_q_900")
    private Double q345q900;

    @Column(name = "q345_q_1000")
    private Double q345q1000;

    @Column(name = "q345_q_1100")
    private Double q345q1100;

    @Column(name = "q345_q_1200")
    private Double q345q1200;

    @Column(name = "h")
    private Double h;

    @Column(name = "l_1")
    private Double l1;

    @Column(name = "b_1")
    private Double b1;

    @Column(name = "thk_1")
    private Double thk1;

    @Column(name = "thk_2")
    private Double thk2;

    @Column(name = "l_3")
    private Double l3;

    @Column(name = "b_2")
    private Double b2;

    @Column(name = "b_3")
    private Double b3;

    @Column(name = "thk_3")
    private Double thk3;

    @Column(name = "arc")
    private Double arc;

    @Column(name = "b_4")
    private Double b4;

    @Column(name = "thk_4")
    private Double thk4;

    @Column(name = "e")
    private Double e;

    @Column(name = "l_2")
    private Double l2;

    @Column(name = "l_4")
    private Double l4;

    @Column(name = "d")
    private Double d;

    @Column(name = "screw")
    private String screw;

    @Column(name = "l")
    private Double l;

    @Column(name = "mass_no_pad")
    private Double massNoPad;

    @Column(name = "mass_pad")
    private Double massPad;

    @Column(name = "mass_rate")
    private Double massRate;

    public Saddle() {
    }

    public Saddle(Double lineNo, String from, String type, String fabMethod, String symbol, Double angle, String pad, Double ribNum, Double dn, Double q235q, Double q235q200, Double q235q250, Double q235q300, Double q235q350, Double q235q400, Double q235q450, Double q235q500, Double q235q600, Double q235q700, Double q235q800, Double q235q900, Double q235q1000, Double q235q1100, Double q235q1200, Double q345q, Double q345q200, Double q345q250, Double q345q300, Double q345q350, Double q345q400, Double q345q450, Double q345q500, Double q345q600, Double q345q700, Double q345q800, Double q345q900, Double q345q1000, Double q345q1100, Double q345q1200, Double h, Double l1, Double b1, Double thk1, Double thk2, Double l3, Double b2, Double b3, Double thk3, Double arc, Double b4, Double thk4, Double e, Double l2, Double l4, Double d, String screw, Double l, Double massNoPad, Double massPad, Double massRate) {
        this.lineNo = lineNo;
        this.from = from;
        this.type = type;
        this.fabMethod = fabMethod;
        this.symbol = symbol;
        this.angle = angle;
        this.pad = pad;
        this.ribNum = ribNum;
        this.dn = dn;
        this.q235q = q235q;
        this.q235q200 = q235q200;
        this.q235q250 = q235q250;
        this.q235q300 = q235q300;
        this.q235q350 = q235q350;
        this.q235q400 = q235q400;
        this.q235q450 = q235q450;
        this.q235q500 = q235q500;
        this.q235q600 = q235q600;
        this.q235q700 = q235q700;
        this.q235q800 = q235q800;
        this.q235q900 = q235q900;
        this.q235q1000 = q235q1000;
        this.q235q1100 = q235q1100;
        this.q235q1200 = q235q1200;
        this.q345q = q345q;
        this.q345q200 = q345q200;
        this.q345q250 = q345q250;
        this.q345q300 = q345q300;
        this.q345q350 = q345q350;
        this.q345q400 = q345q400;
        this.q345q450 = q345q450;
        this.q345q500 = q345q500;
        this.q345q600 = q345q600;
        this.q345q700 = q345q700;
        this.q345q800 = q345q800;
        this.q345q900 = q345q900;
        this.q345q1000 = q345q1000;
        this.q345q1100 = q345q1100;
        this.q345q1200 = q345q1200;
        this.h = h;
        this.l1 = l1;
        this.b1 = b1;
        this.thk1 = thk1;
        this.thk2 = thk2;
        this.l3 = l3;
        this.b2 = b2;
        this.b3 = b3;
        this.thk3 = thk3;
        this.arc = arc;
        this.b4 = b4;
        this.thk4 = thk4;
        this.e = e;
        this.l2 = l2;
        this.l4 = l4;
        this.d = d;
        this.screw = screw;
        this.l = l;
        this.massNoPad = massNoPad;
        this.massPad = massPad;
        this.massRate = massRate;
    }

    public SaddleData toSaddleData(double q) {

        double q235MaxHeight = GBT150Tool.calDesign(q, toQ235Map());
        double q345MaxHeight = GBT150Tool.calDesign(q, toQ345Map());

        return new SaddleData(lineNo, from, type, fabMethod, symbol, angle, pad, ribNum, dn, q235q, q235MaxHeight, q345q, q345MaxHeight, h, l1, b1, thk1, thk2, l3, b2, b3, thk3, arc, b4, thk4, e, l2, l4, d, screw, l, massNoPad, massPad, massRate);
    }

    private Map<Double, Double> toQ235Map() {

        Map<Double, Double> q235Map = new HashMap<>();

        if (this.q235q200 != null) {
            q235Map.put(q235q200, 200.0);
        }
        if (this.q235q250 != null) {
            q235Map.put(q235q250, 250.0);
        }
        if (this.q235q300 != null) {
            q235Map.put(q235q300, 300.0);
        }
        if (this.q235q350 != null) {
            q235Map.put(q235q350, 350.0);
        }
        if (this.q235q400 != null) {
            q235Map.put(q235q400, 400.0);
        }
        if (this.q235q450 != null) {
            q235Map.put(q235q450, 450.0);
        }
        if (this.q235q500 != null) {
            q235Map.put(q235q500, 500.0);
        }
        if (this.q235q600 != null) {
            q235Map.put(q235q600, 600.0);
        }
        if (this.q235q700 != null) {
            q235Map.put(q235q700, 700.0);
        }
        if (this.q235q800 != null) {
            q235Map.put(q235q800, 800.0);
        }
        if (this.q235q900 != null) {
            q235Map.put(q235q900, 900.0);
        }
        if (this.q235q1000 != null) {
            q235Map.put(q235q1000, 1000.0);
        }
        if (this.q235q1100 != null) {
            q235Map.put(q235q1100, 1100.0);
        }
        if (this.q235q1200 != null) {
            q235Map.put(q235q1200, 1200.0);
        }

        return q235Map;
    }

    private Map<Double, Double> toQ345Map() {

        Map<Double, Double> q345Map = new HashMap<>();

        if (this.q345q200 != null) {
            q345Map.put(q345q200, 200.0);
        }
        if (this.q345q250 != null) {
            q345Map.put(q345q250, 250.0);
        }
        if (this.q345q300 != null) {
            q345Map.put(q345q300, 300.0);
        }
        if (this.q345q350 != null) {
            q345Map.put(q345q350, 350.0);
        }
        if (this.q345q400 != null) {
            q345Map.put(q345q400, 400.0);
        }
        if (this.q345q450 != null) {
            q345Map.put(q345q450, 450.0);
        }
        if (this.q345q500 != null) {
            q345Map.put(q345q500, 500.0);
        }
        if (this.q345q600 != null) {
            q345Map.put(q345q600, 600.0);
        }
        if (this.q345q700 != null) {
            q345Map.put(q345q700, 700.0);
        }
        if (this.q345q800 != null) {
            q345Map.put(q345q800, 800.0);
        }
        if (this.q345q900 != null) {
            q345Map.put(q345q900, 900.0);
        }
        if (this.q345q1000 != null) {
            q345Map.put(q345q1000, 1000.0);
        }
        if (this.q345q1100 != null) {
            q345Map.put(q345q1100, 1100.0);
        }
        if (this.q345q1200 != null) {
            q345Map.put(q345q1200, 1200.0);
        }

        return q345Map;
    }

    public Double getLineNo() {
        return lineNo;
    }

    public void setLineNo(Double lineNo) {
        this.lineNo = lineNo;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFabMethod() {
        return fabMethod;
    }

    public void setFabMethod(String fabMethod) {
        this.fabMethod = fabMethod;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Double getAngle() {
        return angle;
    }

    public void setAngle(Double angle) {
        this.angle = angle;
    }

    public String getPad() {
        return pad;
    }

    public void setPad(String pad) {
        this.pad = pad;
    }

    public Double getRibNum() {
        return ribNum;
    }

    public void setRibNum(Double ribNum) {
        this.ribNum = ribNum;
    }

    public Double getDn() {
        return dn;
    }

    public void setDn(Double dn) {
        this.dn = dn;
    }

    public Double getQ235q() {
        return q235q;
    }

    public void setQ235q(Double q235q) {
        this.q235q = q235q;
    }

    public Double getQ235q200() {
        return q235q200;
    }

    public void setQ235q200(Double q235q200) {
        this.q235q200 = q235q200;
    }

    public Double getQ235q250() {
        return q235q250;
    }

    public void setQ235q250(Double q235q250) {
        this.q235q250 = q235q250;
    }

    public Double getQ235q300() {
        return q235q300;
    }

    public void setQ235q300(Double q235q300) {
        this.q235q300 = q235q300;
    }

    public Double getQ235q350() {
        return q235q350;
    }

    public void setQ235q350(Double q235q350) {
        this.q235q350 = q235q350;
    }

    public Double getQ235q400() {
        return q235q400;
    }

    public void setQ235q400(Double q235q400) {
        this.q235q400 = q235q400;
    }

    public Double getQ235q450() {
        return q235q450;
    }

    public void setQ235q450(Double q235q450) {
        this.q235q450 = q235q450;
    }

    public Double getQ235q500() {
        return q235q500;
    }

    public void setQ235q500(Double q235q500) {
        this.q235q500 = q235q500;
    }

    public Double getQ235q600() {
        return q235q600;
    }

    public void setQ235q600(Double q235q600) {
        this.q235q600 = q235q600;
    }

    public Double getQ235q700() {
        return q235q700;
    }

    public void setQ235q700(Double q235q700) {
        this.q235q700 = q235q700;
    }

    public Double getQ235q800() {
        return q235q800;
    }

    public void setQ235q800(Double q235q800) {
        this.q235q800 = q235q800;
    }

    public Double getQ235q900() {
        return q235q900;
    }

    public void setQ235q900(Double q235q900) {
        this.q235q900 = q235q900;
    }

    public Double getQ235q1000() {
        return q235q1000;
    }

    public void setQ235q1000(Double q235q1000) {
        this.q235q1000 = q235q1000;
    }

    public Double getQ235q1100() {
        return q235q1100;
    }

    public void setQ235q1100(Double q235q1100) {
        this.q235q1100 = q235q1100;
    }

    public Double getQ235q1200() {
        return q235q1200;
    }

    public void setQ235q1200(Double q235q1200) {
        this.q235q1200 = q235q1200;
    }

    public Double getQ345q() {
        return q345q;
    }

    public void setQ345q(Double q345q) {
        this.q345q = q345q;
    }

    public Double getQ345q200() {
        return q345q200;
    }

    public void setQ345q200(Double q345q200) {
        this.q345q200 = q345q200;
    }

    public Double getQ345q250() {
        return q345q250;
    }

    public void setQ345q250(Double q345q250) {
        this.q345q250 = q345q250;
    }

    public Double getQ345q300() {
        return q345q300;
    }

    public void setQ345q300(Double q345q300) {
        this.q345q300 = q345q300;
    }

    public Double getQ345q350() {
        return q345q350;
    }

    public void setQ345q350(Double q345q350) {
        this.q345q350 = q345q350;
    }

    public Double getQ345q400() {
        return q345q400;
    }

    public void setQ345q400(Double q345q400) {
        this.q345q400 = q345q400;
    }

    public Double getQ345q450() {
        return q345q450;
    }

    public void setQ345q450(Double q345q450) {
        this.q345q450 = q345q450;
    }

    public Double getQ345q500() {
        return q345q500;
    }

    public void setQ345q500(Double q345q500) {
        this.q345q500 = q345q500;
    }

    public Double getQ345q600() {
        return q345q600;
    }

    public void setQ345q600(Double q345q600) {
        this.q345q600 = q345q600;
    }

    public Double getQ345q700() {
        return q345q700;
    }

    public void setQ345q700(Double q345q700) {
        this.q345q700 = q345q700;
    }

    public Double getQ345q800() {
        return q345q800;
    }

    public void setQ345q800(Double q345q800) {
        this.q345q800 = q345q800;
    }

    public Double getQ345q900() {
        return q345q900;
    }

    public void setQ345q900(Double q345q900) {
        this.q345q900 = q345q900;
    }

    public Double getQ345q1000() {
        return q345q1000;
    }

    public void setQ345q1000(Double q345q1000) {
        this.q345q1000 = q345q1000;
    }

    public Double getQ345q1100() {
        return q345q1100;
    }

    public void setQ345q1100(Double q345q1100) {
        this.q345q1100 = q345q1100;
    }

    public Double getQ345q1200() {
        return q345q1200;
    }

    public void setQ345q1200(Double q345q1200) {
        this.q345q1200 = q345q1200;
    }

    public Double getH() {
        return h;
    }

    public void setH(Double h) {
        this.h = h;
    }

    public Double getL1() {
        return l1;
    }

    public void setL1(Double l1) {
        this.l1 = l1;
    }

    public Double getB1() {
        return b1;
    }

    public void setB1(Double b1) {
        this.b1 = b1;
    }

    public Double getThk1() {
        return thk1;
    }

    public void setThk1(Double thk1) {
        this.thk1 = thk1;
    }

    public Double getThk2() {
        return thk2;
    }

    public void setThk2(Double thk2) {
        this.thk2 = thk2;
    }

    public Double getL3() {
        return l3;
    }

    public void setL3(Double l3) {
        this.l3 = l3;
    }

    public Double getB2() {
        return b2;
    }

    public void setB2(Double b2) {
        this.b2 = b2;
    }

    public Double getB3() {
        return b3;
    }

    public void setB3(Double b3) {
        this.b3 = b3;
    }

    public Double getThk3() {
        return thk3;
    }

    public void setThk3(Double thk3) {
        this.thk3 = thk3;
    }

    public Double getArc() {
        return arc;
    }

    public void setArc(Double arc) {
        this.arc = arc;
    }

    public Double getB4() {
        return b4;
    }

    public void setB4(Double b4) {
        this.b4 = b4;
    }

    public Double getThk4() {
        return thk4;
    }

    public void setThk4(Double thk4) {
        this.thk4 = thk4;
    }

    public Double getE() {
        return e;
    }

    public void setE(Double e) {
        this.e = e;
    }

    public Double getL2() {
        return l2;
    }

    public void setL2(Double l2) {
        this.l2 = l2;
    }

    public Double getL4() {
        return l4;
    }

    public void setL4(Double l4) {
        this.l4 = l4;
    }

    public Double getD() {
        return d;
    }

    public void setD(Double d) {
        this.d = d;
    }

    public String getScrew() {
        return screw;
    }

    public void setScrew(String screw) {
        this.screw = screw;
    }

    public Double getL() {
        return l;
    }

    public void setL(Double l) {
        this.l = l;
    }

    public Double getMassNoPad() {
        return massNoPad;
    }

    public void setMassNoPad(Double massNoPad) {
        this.massNoPad = massNoPad;
    }

    public Double getMassPad() {
        return massPad;
    }

    public void setMassPad(Double massPad) {
        this.massPad = massPad;
    }

    public Double getMassRate() {
        return massRate;
    }

    public void setMassRate(Double massRate) {
        this.massRate = massRate;
    }
}
