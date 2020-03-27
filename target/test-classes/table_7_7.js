function table7_7 (type, thk1, thk0, h, h0) {

    let a = thk1/thk0-1;
    let c = 43.68*Math.pow(h/h0, 4);

    let c1 = 1/3+a/12;
    let c2 = 5/42+17*a/336;
    let c3 = 1/210+a/360;
    let c4 = 11/360+59*a/5040+(1+3*a)/c;
    let c5 = 1/90+5*a/1008-Math.pow(1+a, 3)/c;
    let c6 = 1/120+17*a/5040+1/c;
    let c7 = 215/2772+51*a/1232+(60/7+225*a/14+75*a*a/7+5*a*a*a/2)/c;
    let c8 = 31/6930+128*a/45045+(6/7+15*a/7+12*a*a/7+5*a*a*a/11)/c;
    let c9 = 533/30240+653*a/73920+(1/2+33*a/14+39*a*a/28+25*a*a*a/84)/c;
    let c10 = 29/3780+3*a/704-(1/2+33*a/14+81*a*a/28+13*a*a*a/12)/c;
    let c11 = 31/6048+1763*a/665280+(1/2+6*a/7+15*a*a/28+5*a*a*a/42)/c;
    let c12 = 1/2925+71*a/300300+(8/35+18*a/35+156*a*a/385+6*a*a*a/55)/c;
    let c13 = 761/831600+937*a/1663200+(1/35+6*a/35+11*a*a/70+3*a*a*a/70)/c;
    let c14 = 197/415800+103*a/332640-(1/35+6*a/35+17*a*a/70+a*a*a/10)/c;
    let c15 = 233/831600+97*a/554400+(1/35+3*a/35+a*a/14+2*a*a*a/105)/c;

    let c16 = c1*c7*c12+c2*c8*c3+c3*c8*c2-(c3*c3*c7+c8*c8*c1+c2*c2*c12);
    let c17 = (c4*c7*c12+c2*c8*c13+c3*c8*c9-(c13*c7*c3+c8*c8*c4+c12*c2*c9))/c16;
    let c18 = (c5*c7*c12+c2*c8*c14+c3*c8*c10-(c14*c7*c3+c8*c8*c5+c12*c2*c10))/c16;
    let c19 = (c6*c7*c12+c2*c8*c15+c3*c8*c11-(c15*c7*c3+c8*c8*c6+c12*c2*c11))/c16;
    let c20 = (c1*c9*c12+c4*c8*c3+c3*c13*c2-(c3*c3*c9+c13*c8*c1+c12*c4*c2))/c16;
    let c21 = (c1*c10*c12+c5*c8*c3+c3*c14*c2-(c3*c3*c10+c14*c8*c1+c12*c5*c2))/c16;
    let c22 = (c1*c11*c12+c6*c8*c3+c3*c15*c2-(c3*c3*c11+c15*c8*c1+c12*c6*c2))/c16;
    let c23 = (c1*c7*c13+c2*c9*c3+c4*c8*c2-(c3*c7*c4+c8*c9*c1+c2*c2*c13))/c16;
    let c24 = (c1*c7*c14+c2*c10*c3+c5*c8*c2-(c3*c7*c5+c8*c10*c1+c2*c2*c14))/c16;
    let c25 = (c1*c7*c15+c2*c11*c3+c6*c8*c2-(c3*c7*c6+c8*c11*c1+c2*c2*c15))/c16;

    let c26 = -Math.pow(c/4, 1/4);
    let c27 = c20-c17-5/12+c17*c26;
    let c28 = c22-c19-1/12+c19*c26;
    let c29 = -Math.pow(c/4, 1/2);
    let c30 = -Math.pow(c/4, 3/4);
    let c31 = 3*a/2-c17*c30;
    let c32 = 1/2-c19*c30;
    let c33 = c26*c32/2+c28*c31*c29-(c30*c28/2+c32*c27*c29);
    let c34 = 1/12+c18-c21-c18*c26;
    let c35 = c18*c30;
    let c36 = (c28*c35*c29-c32*c34*c29)/c33;
    let c37 = (c26*c35/2+c34*c31*c29-(c30*c34/2+c35*c27*c29))/c33;

    let e1 = c17*c36+c18+c19*c37;
    let e2 = c20*c35+c21+c22*c37;
    let e3 = c23*c36+c24+c25*c37;
    let e4 = 1/4+c37/12+c36/4-e3/5-3*e2/2-e1;
    let e5 = e1*(1/2+a/6)+e2*(1/4+11*a/84)+e3*(1/70+a/105);
    let e6 = e5-c36*(7/120+a/36+3*a/c)-1/40-a/72-c37*(1/60+a/120+1/c);

    let result = null;
    if (type === "整体法兰") {
        if (thk1 === thk0) {
            result.fi = 0.908920;
            result.vi = 0.550103;
            result.f = 1;
        }
        else {
            result.fi = -e6/(Math.pow(c/2.73, 1/4)*Math.pow(1+a, 3)/c);
            result.vi = e4/(Math.pow(2.73/c, 1/4)*Math.pow(1+a, 3));
            result.f = c36/(1+a);
        }
    }
    else if (type === "带颈松式法兰") {
        result.fl = -(c18*(1/2+a/6)+c21*(1/4+11*a/84)+c24*(1/70+a/105)-(1/40+a/72))/(Math.pow(c/2.73, 1/4)*Math.pow(1+a, 3)/c);
        result.vl = (1/4-c24/5-3*c21/2-c18)/(Math.pow(2.73/c, 1/4)*Math.pow(1+a, 3));
        result.f = 1;
    }

    return result;
}