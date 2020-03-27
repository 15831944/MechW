package com.mechw.service.db.nbt470652018.saddle;

import com.mechw.dao.db.nbt470652018.SaddleDao;
import com.mechw.model.db.nbt470652018.saddle.SaddleData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class SaddleServiceImpl implements SaddleService {

    private SaddleDao saddleDao;

    @Autowired
    public SaddleServiceImpl(SaddleDao saddleDao) {
        this.saddleDao = saddleDao;
    }

    @Override
    public List listDN(String mtl) {
        return saddleDao.listDN(mtl);
    }

    @Override
    public List listFabMethod(String mtl, Double dn, Double q) {
        return saddleDao.listFabMethod(mtl, dn, q);
    }

    @Override
    public List listPad(String mtl, Double dn, Double q, String fabMethod) {
        return saddleDao.listPad(mtl, dn, q, fabMethod);
    }

    @Override
    public List listAngle(String mtl, Double dn, Double q, String fabMethod, String pad) {
        return saddleDao.listAngle(mtl, dn, q, fabMethod, pad);
    }

    @Override
    public List listSymbol(String mtl, Double dn, Double q, String fabMethod, String pad, Double angle) {
        return saddleDao.listSymbol(mtl, dn, q, fabMethod, pad, angle);
    }

    @Override
    public SaddleData getData(String mtl, Double dn, Double q, String fabMethod, String pad, Double angle, String symbol) {
        return saddleDao.getData(mtl, dn, q, fabMethod, pad, angle, symbol);
    }
}
