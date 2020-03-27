package com.mechw.service.db.asmeviii12017.index;

import com.mechw.dao.db.asmeviii12017.index.ASMEVIII12017IndexDao;
import com.mechw.entity.db.asmeviii12017.ASMEVIII12017Index;
import com.mechw.model.db.asmeviii12017.index.IndexQuery;
import com.mechw.model.db.asmeviii12017.index.MaterialNameQuery;
import com.mechw.model.db.asmeviii12017.index.ProductFormQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Service
public class ASMEVIII12017IndexServiceImpl implements ASMEVIII12017IndexService {

    private ASMEVIII12017IndexDao asmeviii12017IndexDao;

    public ASMEVIII12017IndexServiceImpl() {
    }

    @Autowired
    public ASMEVIII12017IndexServiceImpl(ASMEVIII12017IndexDao asmeviii12017IndexDao) {
        this.asmeviii12017IndexDao = asmeviii12017IndexDao;
    }

    @Override
    public List listMaterialName(MaterialNameQuery materialNameQuery) {
        return asmeviii12017IndexDao.listMaterialName(materialNameQuery);
    }

    @Override
    public List listProductForm(ProductFormQuery productFormQuery) {
        return asmeviii12017IndexDao.listProductForm(productFormQuery);
    }

    @Override
    public ASMEVIII12017Index getIndex(IndexQuery indexQuery) {
        return asmeviii12017IndexDao.getIndex(indexQuery);
    }

    public ASMEVIII12017IndexDao getAsmeviii12017IndexDao() {
        return asmeviii12017IndexDao;
    }

    @Resource(name = "ASMEVIII12017IndexDao")
    public void setAsmeviii12017IndexDao(ASMEVIII12017IndexDao asmeviii12017IndexDao) {
        this.asmeviii12017IndexDao = asmeviii12017IndexDao;
    }
}
