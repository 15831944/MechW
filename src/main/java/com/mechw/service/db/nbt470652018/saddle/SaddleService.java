package com.mechw.service.db.nbt470652018.saddle;

import com.mechw.model.db.nbt470652018.saddle.SaddleData;

import java.util.List;

public interface SaddleService {

    List listDN(String mtl);

    List listFabMethod(String mtl, Double dn, Double q);

    List listPad(String mtl, Double dn, Double q, String fabMethod);

    List listAngle(String mtl, Double dn, Double q, String fabMethod, String pad);

    List listSymbol(String mtl, Double dn, Double q, String fabMethod, String pad, Double angle);

    SaddleData getData(String mtl, Double dn, Double q, String fabMethod, String pad, Double angle, String symbol);

}
