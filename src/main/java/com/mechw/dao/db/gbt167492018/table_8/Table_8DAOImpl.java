package com.mechw.dao.db.gbt167492018.table_8;

import com.mechw.model.db.gbt167492018.table_8.Table_8_Query;
import com.mechw.model.db.gbt167492018.table_8.Table_8_Result;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @Description 表 7 查询类
 * @Author lishaoyan@mechw.com
 * @Date 2018/11/6 16:55
 * @Version 1.0
 */
@Transactional
@Repository("Table_8DAO")
public class Table_8DAOImpl implements Table_8DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Table_8_Result query(Table_8_Query table_8_query) {
        return null;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
