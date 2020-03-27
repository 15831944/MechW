package com.mechw.service.db.gbt1502011.property.index;

import com.mechw.dao.db.gbt1502011.property.index.IndexDao;
import com.mechw.entity.db.gbt1502011.property.Index;
import com.mechw.model.db.gbt1502011.property.index.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Service
public class IndexServiceImpl implements IndexService {

    private IndexDao indexDao;

    public IndexServiceImpl() {
    }

    @Autowired
    public IndexServiceImpl(IndexDao indexDao) {
        this.indexDao = indexDao;
    }

    @Override
    public List listCategory(CategoryQuery categoryQuery) {
        return indexDao.listCategory(categoryQuery);
    }

    @Override
    public List listType(TypeQuery typeQuery) {
        return indexDao.listType(typeQuery);
    }

    @Override
    public List listSTD(STDQuery stdQuery) {
        return indexDao.listSTD(stdQuery);
    }

    @Override
    public List listName(NameQuery nameQuery) {
        return indexDao.listName(nameQuery);
    }

    @Override
    public Index getIndex(IndexQuery indexQuery) {
        return indexDao.getIndex(indexQuery);
    }

    public IndexDao getIndexDao() {
        return indexDao;
    }

    @Resource(name = "IndexDao")
    public void setIndexDao(IndexDao indexDao) {
        this.indexDao = indexDao;
    }
}
