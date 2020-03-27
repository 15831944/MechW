package com.mechw.service.db.gbt1502011.property.e;

import com.mechw.dao.db.gbt1502011.property.e.EDao;
import com.mechw.model.db.gbt1502011.property.e.EQuery;
import com.mechw.model.db.gbt1502011.property.e.EResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class EServiceImpl implements EService {

    private EDao eDao;

    public EServiceImpl() {
    }

    @Autowired
    public EServiceImpl(EDao eDao) {
        this.eDao = eDao;
    }

    /**
     * @param eQuery 查询参数对象
     * @return EResult 设计弹性模量
     */
    @Override
    public EResult getE(EQuery eQuery) {

        return eDao.getE(eQuery);
    }

    public EDao geteDao() {
        return eDao;
    }

    @Resource(name = "EDao")
    public void seteDao(EDao eDao) {
        this.eDao = eDao;
    }
}
