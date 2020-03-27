package com.mechw.service.db.gbt1502011.property.rel;

import com.mechw.dao.db.gbt1502011.property.rel.RelDao;
import com.mechw.model.db.gbt1502011.property.rel.RelQuery;
import com.mechw.model.db.gbt1502011.property.rel.RelResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class RelServiceImpl implements RelService {

    private RelDao relDao;

    public RelServiceImpl() {
    }

    @Autowired
    public RelServiceImpl(RelDao relDao) {
        this.relDao = relDao;
    }

    /**
     * @param relQuery 查询参数对象
     * @return RelResult 屈服强度
     */
    @Override
    public RelResult getRel(RelQuery relQuery) {

        return relDao.getRel(relQuery);
    }

    public RelDao getRelDao() {
        return relDao;
    }

    @Resource(name = "RelDao")
    public void setRelDao(RelDao relDao) {
        this.relDao = relDao;
    }
}
