package com.mechw.service.db.asmeviii12017.stress;

import com.mechw.dao.db.asmeviii12017.stress.ASMEVIII12017StressDao;
import com.mechw.model.db.asmeviii12017.stress.ASMEVIII12017StressQuery;
import com.mechw.model.db.asmeviii12017.stress.ASMEVIII12017StressResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service
public class ASMEVIII12017StressServiceImpl implements ASMEVIII12017StressService {

    private ASMEVIII12017StressDao asmeviii12017StressDao;

    public ASMEVIII12017StressServiceImpl() {
    }

    @Autowired
    public ASMEVIII12017StressServiceImpl(ASMEVIII12017StressDao asmeviii12017StressDao) {
        this.asmeviii12017StressDao = asmeviii12017StressDao;
    }

    @Override
    public ASMEVIII12017StressResult queryASMEVIII12017Stress(ASMEVIII12017StressQuery asmeviii12017StressQuery) {
        return asmeviii12017StressDao.queryASMEVIII12017Stress(asmeviii12017StressQuery);
    }

    public ASMEVIII12017StressDao getAsmebpvcviii12017StressDao() {
        return asmeviii12017StressDao;
    }

    @Resource(name = "ASMEVIII12017StressDao")
    public void setAsmebpvcviii12017StressDao(ASMEVIII12017StressDao asmeviii12017StressDao) {
        this.asmeviii12017StressDao = asmeviii12017StressDao;
    }
}
