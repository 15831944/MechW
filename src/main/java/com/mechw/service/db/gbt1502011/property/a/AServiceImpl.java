package com.mechw.service.db.gbt1502011.property.a;

import com.mechw.dao.db.gbt1502011.property.a.ADao;
import com.mechw.model.db.gbt1502011.property.a.AQuery;
import com.mechw.model.db.gbt1502011.property.a.AResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class AServiceImpl implements AService {

    private ADao aDao;

    public AServiceImpl() {
    }

    @Autowired
    public AServiceImpl(ADao aDao) {
        this.aDao = aDao;
    }

    /**
     * @param aQuery 查询参数对象
     * @return AResult 设计膨胀系数
     */
    @Override
    public AResult getA(AQuery aQuery) {
        return aDao.getA(aQuery);
    }

    public ADao getaDao() {
        return aDao;
    }

    @Resource(name = "ADao")
    public void setaDao(ADao aDao) {
        this.aDao = aDao;
    }
}