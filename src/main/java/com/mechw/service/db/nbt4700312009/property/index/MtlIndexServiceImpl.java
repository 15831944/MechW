package com.mechw.service.db.nbt4700312009.property.index;

import com.mechw.dao.db.nbt4700312009.index.MtlIndexDao;
import com.mechw.entity.db.nbt4700312009.property.Index;
import com.mechw.model.db.nbt4700312009.property.index.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Service
public class MtlIndexServiceImpl implements MtlIndexService {

    private MtlIndexDao mtlIndexDao;

    public MtlIndexServiceImpl() {
    }

    @Autowired
    public MtlIndexServiceImpl(MtlIndexDao mtlIndexDao) {
        this.mtlIndexDao = mtlIndexDao;
    }

    @Override
    public List listCategory(Temp temp) {
        return mtlIndexDao.listCategory(temp);
    }

    @Override
    public List listType(Category category) {
        return mtlIndexDao.listType(category);
    }

    @Override
    public List listSTD(Type type) {
        return mtlIndexDao.listSTD(type);
    }

    @Override
    public List listName(STD std) {
        return mtlIndexDao.listName(std);
    }

    @Override
    public Index getIndex(Name name) {
        return mtlIndexDao.getIndex(name);
    }

    public MtlIndexDao getMtlIndexDao() {
        return mtlIndexDao;
    }

    @Resource(name = "MtlIndexDao")
    public void setMtlIndexDao(MtlIndexDao mtlIndexDao) {
        this.mtlIndexDao = mtlIndexDao;
    }
}
