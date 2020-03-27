package com.mechw.model.front.x.b;

public class XBBADocx {

    private String ribbonName;

    // 设计温度
    private Double t;

    // 容器
    private Double h0;
    private Double d0;
    private Double m0;

    // 地震风载荷
    private Double q0;
    private Double fi;
    private String eq;

    // 支腿数据
    private String stds;
    private String names;
    private Double n;
    private Double dout;
    private Double thksn;
    private Double cs2;
    private Double e;
    private Double db;
    private Double b;
    private Double hf;
    private Double tf1;

    // 地脚螺栓
    private String stdb;
    private String nameb;
    private String norms;
    private Double nbt;
    private Double cb2;

    // 底板
    private String stdd;
    private String named;
    private Double cd2;
    private Double thkdn;
    private Double d1;
    private Double d2;
    private Double h;
    private Double hc;

    // 混凝土
    private Double oc1allow;

    // 支腿特性
    private Double densitys;
    private Double cs1;
    private Double ostallow;
    private Double rstel;
    private Double est;

    // 螺栓特性
    private Double densityb;
    private Double obtallow;

    // 底板特性
    private Double densityd;
    private Double cd1;
    private Double odtallow;

    // 支腿载荷计算
    private Double pw;
    private Double alphae;
    private Double g;
    private Double pe;
    private Double fh;
    private Double w1;
    private Double r;
    private Double fl1;
    private Double fl2;

    // 支腿强度计算
    private Double cs;
    private Double thkse;
    private Double a;
    private Double ixx;
    private Double iyy;
    private Double wmin;
    private Double imin;
    private Double ih;
    private Double lamuda;
    private Double lamudah;
    private Double ns;
    private Double eta;
    private Double ocrallow;
    private Double oc;
    private String occhk;
    private Double tau;
    private Double tauallow;
    private String tauchk;
    private Double l1;
    private Double ob;
    private Double oballow;
    private String obchk;
    private String totalchk;

    // 地脚螺栓计算
    private Double dmin;
    private Double abt;
    private Double obt;
    private String obtchk;
    private Double taubt;
    private Double taubtallow;
    private String taubtchk;

    // 基础应力计算
    private Double oc1;
    private String oc1chk;

    // 底板计算
    private Double thkdc;
    private Double thkdd;
    private String thkdchk;

    // 装配焊缝计算
    private Double fai;
    private Double ballow;
    private Double hf1;
    private Double z;
    private Double of;
    private String ofchk;
    private Double af;
    private Double tauf;
    private String taufchk;
    private Double ot;
    private String otchk;

    public XBBADocx() {
    }

    public XBBADocx(String ribbonName, Double t, Double h0, Double d0, Double m0, Double q0, Double fi, String eq, String stds, String names, Double n, Double dout, Double thksn, Double cs2, Double e, Double db, Double b, Double hf, Double tf1, String stdb, String nameb, String norms, Double nbt, Double cb2, String stdd, String named, Double cd2, Double thkdn, Double d1, Double d2, Double h, Double hc, Double oc1allow, Double densitys, Double cs1, Double ostallow, Double rstel, Double est, Double densityb, Double obtallow, Double densityd, Double cd1, Double odtallow, Double pw, Double alphae, Double g, Double pe, Double fh, Double w1, Double r, Double fl1, Double fl2, Double cs, Double thkse, Double a, Double ixx, Double iyy, Double wmin, Double imin, Double ih, Double lamuda, Double lamudah, Double ns, Double eta, Double ocrallow, Double oc, String occhk, Double tau, Double tauallow, String tauchk, Double l1, Double ob, Double oballow, String obchk, String totalchk, Double dmin, Double abt, Double obt, String obtchk, Double taubt, Double taubtallow, String taubtchk, Double oc1, String oc1chk, Double thkdc, Double thkdd, String thkdchk, Double fai, Double ballow, Double hf1, Double z, Double of, String ofchk, Double af, Double tauf, String taufchk, Double ot, String otchk) {
        this.ribbonName = ribbonName;
        this.t = t;
        this.h0 = h0;
        this.d0 = d0;
        this.m0 = m0;
        this.q0 = q0;
        this.fi = fi;
        this.eq = eq;
        this.stds = stds;
        this.names = names;
        this.n = n;
        this.dout = dout;
        this.thksn = thksn;
        this.cs2 = cs2;
        this.e = e;
        this.db = db;
        this.b = b;
        this.hf = hf;
        this.tf1 = tf1;
        this.stdb = stdb;
        this.nameb = nameb;
        this.norms = norms;
        this.nbt = nbt;
        this.cb2 = cb2;
        this.stdd = stdd;
        this.named = named;
        this.cd2 = cd2;
        this.thkdn = thkdn;
        this.d1 = d1;
        this.d2 = d2;
        this.h = h;
        this.hc = hc;
        this.oc1allow = oc1allow;
        this.densitys = densitys;
        this.cs1 = cs1;
        this.ostallow = ostallow;
        this.rstel = rstel;
        this.est = est;
        this.densityb = densityb;
        this.obtallow = obtallow;
        this.densityd = densityd;
        this.cd1 = cd1;
        this.odtallow = odtallow;
        this.pw = pw;
        this.alphae = alphae;
        this.g = g;
        this.pe = pe;
        this.fh = fh;
        this.w1 = w1;
        this.r = r;
        this.fl1 = fl1;
        this.fl2 = fl2;
        this.cs = cs;
        this.thkse = thkse;
        this.a = a;
        this.ixx = ixx;
        this.iyy = iyy;
        this.wmin = wmin;
        this.imin = imin;
        this.ih = ih;
        this.lamuda = lamuda;
        this.lamudah = lamudah;
        this.ns = ns;
        this.eta = eta;
        this.ocrallow = ocrallow;
        this.oc = oc;
        this.occhk = occhk;
        this.tau = tau;
        this.tauallow = tauallow;
        this.tauchk = tauchk;
        this.l1 = l1;
        this.ob = ob;
        this.oballow = oballow;
        this.obchk = obchk;
        this.totalchk = totalchk;
        this.dmin = dmin;
        this.abt = abt;
        this.obt = obt;
        this.obtchk = obtchk;
        this.taubt = taubt;
        this.taubtallow = taubtallow;
        this.taubtchk = taubtchk;
        this.oc1 = oc1;
        this.oc1chk = oc1chk;
        this.thkdc = thkdc;
        this.thkdd = thkdd;
        this.thkdchk = thkdchk;
        this.fai = fai;
        this.ballow = ballow;
        this.hf1 = hf1;
        this.z = z;
        this.of = of;
        this.ofchk = ofchk;
        this.af = af;
        this.tauf = tauf;
        this.taufchk = taufchk;
        this.ot = ot;
        this.otchk = otchk;
    }

    public String getRibbonName() {
        return ribbonName;
    }

    public void setRibbonName(String ribbonName) {
        this.ribbonName = ribbonName;
    }

    public Double getT() {
        return t;
    }

    public void setT(Double t) {
        this.t = t;
    }

    public Double getH0() {
        return h0;
    }

    public void setH0(Double h0) {
        this.h0 = h0;
    }

    public Double getD0() {
        return d0;
    }

    public void setD0(Double d0) {
        this.d0 = d0;
    }

    public Double getM0() {
        return m0;
    }

    public void setM0(Double m0) {
        this.m0 = m0;
    }

    public Double getQ0() {
        return q0;
    }

    public void setQ0(Double q0) {
        this.q0 = q0;
    }

    public Double getFi() {
        return fi;
    }

    public void setFi(Double fi) {
        this.fi = fi;
    }

    public String getEq() {
        return eq;
    }

    public void setEq(String eq) {
        this.eq = eq;
    }

    public String getStds() {
        return stds;
    }

    public void setStds(String stds) {
        this.stds = stds;
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public Double getN() {
        return n;
    }

    public void setN(Double n) {
        this.n = n;
    }

    public Double getA() {
        return a;
    }

    public void setA(Double a) {
        this.a = a;
    }

    public Double getE() {
        return e;
    }

    public void setE(Double e) {
        this.e = e;
    }

    public Double getDb() {
        return db;
    }

    public void setDb(Double db) {
        this.db = db;
    }

    public Double getB() {
        return b;
    }

    public void setB(Double b) {
        this.b = b;
    }

    public Double getIxx() {
        return ixx;
    }

    public void setIxx(Double ixx) {
        this.ixx = ixx;
    }

    public Double getIyy() {
        return iyy;
    }

    public void setIyy(Double iyy) {
        this.iyy = iyy;
    }

    public Double getWmin() {
        return wmin;
    }

    public void setWmin(Double wmin) {
        this.wmin = wmin;
    }

    public Double getHf() {
        return hf;
    }

    public void setHf(Double hf) {
        this.hf = hf;
    }

    public Double getTf1() {
        return tf1;
    }

    public void setTf1(Double tf1) {
        this.tf1 = tf1;
    }

    public String getStdb() {
        return stdb;
    }

    public void setStdb(String stdb) {
        this.stdb = stdb;
    }

    public String getNameb() {
        return nameb;
    }

    public void setNameb(String nameb) {
        this.nameb = nameb;
    }

    public String getNorms() {
        return norms;
    }

    public void setNorms(String norms) {
        this.norms = norms;
    }

    public Double getNbt() {
        return nbt;
    }

    public void setNbt(Double nbt) {
        this.nbt = nbt;
    }

    public Double getCb2() {
        return cb2;
    }

    public void setCb2(Double cb2) {
        this.cb2 = cb2;
    }

    public String getStdd() {
        return stdd;
    }

    public void setStdd(String stdd) {
        this.stdd = stdd;
    }

    public String getNamed() {
        return named;
    }

    public void setNamed(String named) {
        this.named = named;
    }

    public Double getCd2() {
        return cd2;
    }

    public void setCd2(Double cd2) {
        this.cd2 = cd2;
    }

    public Double getThkdn() {
        return thkdn;
    }

    public void setThkdn(Double thkdn) {
        this.thkdn = thkdn;
    }

    public Double getD1() {
        return d1;
    }

    public void setD1(Double d1) {
        this.d1 = d1;
    }

    public Double getD2() {
        return d2;
    }

    public void setD2(Double d2) {
        this.d2 = d2;
    }

    public Double getH() {
        return h;
    }

    public void setH(Double h) {
        this.h = h;
    }

    public Double getHc() {
        return hc;
    }

    public void setHc(Double hc) {
        this.hc = hc;
    }

    public Double getOc1allow() {
        return oc1allow;
    }

    public void setOc1allow(Double oc1allow) {
        this.oc1allow = oc1allow;
    }

    public Double getDensitys() {
        return densitys;
    }

    public void setDensitys(Double densitys) {
        this.densitys = densitys;
    }

    public Double getOstallow() {
        return ostallow;
    }

    public void setOstallow(Double ostallow) {
        this.ostallow = ostallow;
    }

    public Double getRstel() {
        return rstel;
    }

    public void setRstel(Double rstel) {
        this.rstel = rstel;
    }

    public Double getEst() {
        return est;
    }

    public void setEst(Double est) {
        this.est = est;
    }

    public Double getDensityb() {
        return densityb;
    }

    public void setDensityb(Double densityb) {
        this.densityb = densityb;
    }

    public Double getObtallow() {
        return obtallow;
    }

    public void setObtallow(Double obtallow) {
        this.obtallow = obtallow;
    }

    public Double getDensityd() {
        return densityd;
    }

    public void setDensityd(Double densityd) {
        this.densityd = densityd;
    }

    public Double getCd1() {
        return cd1;
    }

    public void setCd1(Double cd1) {
        this.cd1 = cd1;
    }

    public Double getOdtallow() {
        return odtallow;
    }

    public void setOdtallow(Double odtallow) {
        this.odtallow = odtallow;
    }

    public Double getPw() {
        return pw;
    }

    public void setPw(Double pw) {
        this.pw = pw;
    }

    public Double getAlphae() {
        return alphae;
    }

    public void setAlphae(Double alphae) {
        this.alphae = alphae;
    }

    public Double getG() {
        return g;
    }

    public void setG(Double g) {
        this.g = g;
    }

    public Double getPe() {
        return pe;
    }

    public void setPe(Double pe) {
        this.pe = pe;
    }

    public Double getFh() {
        return fh;
    }

    public void setFh(Double fh) {
        this.fh = fh;
    }

    public Double getW1() {
        return w1;
    }

    public void setW1(Double w1) {
        this.w1 = w1;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Double getFl1() {
        return fl1;
    }

    public void setFl1(Double fl1) {
        this.fl1 = fl1;
    }

    public Double getFl2() {
        return fl2;
    }

    public void setFl2(Double fl2) {
        this.fl2 = fl2;
    }

    public Double getImin() {
        return imin;
    }

    public void setImin(Double imin) {
        this.imin = imin;
    }

    public Double getIh() {
        return ih;
    }

    public void setIh(Double ih) {
        this.ih = ih;
    }

    public Double getLamuda() {
        return lamuda;
    }

    public void setLamuda(Double lamuda) {
        this.lamuda = lamuda;
    }

    public Double getLamudah() {
        return lamudah;
    }

    public void setLamudah(Double lamudah) {
        this.lamudah = lamudah;
    }

    public Double getNs() {
        return ns;
    }

    public void setNs(Double ns) {
        this.ns = ns;
    }

    public Double getEta() {
        return eta;
    }

    public void setEta(Double eta) {
        this.eta = eta;
    }

    public Double getOcrallow() {
        return ocrallow;
    }

    public void setOcrallow(Double ocrallow) {
        this.ocrallow = ocrallow;
    }

    public Double getOc() {
        return oc;
    }

    public void setOc(Double oc) {
        this.oc = oc;
    }

    public String getOcchk() {
        return occhk;
    }

    public void setOcchk(String occhk) {
        this.occhk = occhk;
    }

    public Double getTau() {
        return tau;
    }

    public void setTau(Double tau) {
        this.tau = tau;
    }

    public Double getTauallow() {
        return tauallow;
    }

    public void setTauallow(Double tauallow) {
        this.tauallow = tauallow;
    }

    public String getTauchk() {
        return tauchk;
    }

    public void setTauchk(String tauchk) {
        this.tauchk = tauchk;
    }

    public Double getL1() {
        return l1;
    }

    public void setL1(Double l1) {
        this.l1 = l1;
    }

    public Double getOb() {
        return ob;
    }

    public void setOb(Double ob) {
        this.ob = ob;
    }

    public Double getOballow() {
        return oballow;
    }

    public void setOballow(Double oballow) {
        this.oballow = oballow;
    }

    public String getObchk() {
        return obchk;
    }

    public void setObchk(String obchk) {
        this.obchk = obchk;
    }

    public String getTotalchk() {
        return totalchk;
    }

    public void setTotalchk(String totalchk) {
        this.totalchk = totalchk;
    }

    public Double getDmin() {
        return dmin;
    }

    public void setDmin(Double dmin) {
        this.dmin = dmin;
    }

    public Double getAbt() {
        return abt;
    }

    public void setAbt(Double abt) {
        this.abt = abt;
    }

    public Double getObt() {
        return obt;
    }

    public void setObt(Double obt) {
        this.obt = obt;
    }

    public String getObtchk() {
        return obtchk;
    }

    public void setObtchk(String obtchk) {
        this.obtchk = obtchk;
    }

    public Double getTaubt() {
        return taubt;
    }

    public void setTaubt(Double taubt) {
        this.taubt = taubt;
    }

    public Double getTaubtallow() {
        return taubtallow;
    }

    public void setTaubtallow(Double taubtallow) {
        this.taubtallow = taubtallow;
    }

    public String getTaubtchk() {
        return taubtchk;
    }

    public void setTaubtchk(String taubtchk) {
        this.taubtchk = taubtchk;
    }

    public Double getOc1() {
        return oc1;
    }

    public void setOc1(Double oc1) {
        this.oc1 = oc1;
    }

    public String getOc1chk() {
        return oc1chk;
    }

    public void setOc1chk(String oc1chk) {
        this.oc1chk = oc1chk;
    }

    public Double getThkdc() {
        return thkdc;
    }

    public void setThkdc(Double thkdc) {
        this.thkdc = thkdc;
    }

    public Double getThkdd() {
        return thkdd;
    }

    public void setThkdd(Double thkdd) {
        this.thkdd = thkdd;
    }

    public String getThkdchk() {
        return thkdchk;
    }

    public void setThkdchk(String thkdchk) {
        this.thkdchk = thkdchk;
    }

    public Double getFai() {
        return fai;
    }

    public void setFai(Double fai) {
        this.fai = fai;
    }

    public Double getBallow() {
        return ballow;
    }

    public void setBallow(Double ballow) {
        this.ballow = ballow;
    }

    public Double getHf1() {
        return hf1;
    }

    public void setHf1(Double hf1) {
        this.hf1 = hf1;
    }

    public Double getZ() {
        return z;
    }

    public void setZ(Double z) {
        this.z = z;
    }

    public Double getOf() {
        return of;
    }

    public void setOf(Double of) {
        this.of = of;
    }

    public String getOfchk() {
        return ofchk;
    }

    public void setOfchk(String ofchk) {
        this.ofchk = ofchk;
    }

    public Double getAf() {
        return af;
    }

    public void setAf(Double af) {
        this.af = af;
    }

    public Double getTauf() {
        return tauf;
    }

    public void setTauf(Double tauf) {
        this.tauf = tauf;
    }

    public String getTaufchk() {
        return taufchk;
    }

    public void setTaufchk(String taufchk) {
        this.taufchk = taufchk;
    }

    public Double getOt() {
        return ot;
    }

    public void setOt(Double ot) {
        this.ot = ot;
    }

    public String getOtchk() {
        return otchk;
    }

    public void setOtchk(String otchk) {
        this.otchk = otchk;
    }

    public Double getDout() {
        return dout;
    }

    public void setDout(Double dout) {
        this.dout = dout;
    }

    public Double getThksn() {
        return thksn;
    }

    public void setThksn(Double thksn) {
        this.thksn = thksn;
    }

    public Double getCs2() {
        return cs2;
    }

    public void setCs2(Double cs2) {
        this.cs2 = cs2;
    }

    public Double getCs1() {
        return cs1;
    }

    public void setCs1(Double cs1) {
        this.cs1 = cs1;
    }

    public Double getCs() {
        return cs;
    }

    public void setCs(Double cs) {
        this.cs = cs;
    }

    public Double getThkse() {
        return thkse;
    }

    public void setThkse(Double thkse) {
        this.thkse = thkse;
    }
}
