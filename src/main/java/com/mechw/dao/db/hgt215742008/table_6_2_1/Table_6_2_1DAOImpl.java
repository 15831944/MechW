package com.mechw.dao.db.hgt215742008.table_6_2_1;

import com.mechw.entity.db.hgt215742008.Table_6_2_1;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("Table_6_2_1DAO")
public class Table_6_2_1DAOImpl implements Table_6_2_1DAO {

    @Resource
    private SessionFactory sessionFactory;

    public Table_6_2_1DAOImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Table_6_2_1 findByNorm(String norm) {

        // 将 TP-1 转化为 1
        String serial = norm.substring(norm.length() - 1);

        // 根据 serial 查询几何数据
        String sql = "SELECT * FROM hgt_21574_2008.table_6_2_1 WHERE norm= :category_norm";
        NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Table_6_2_1.class);
        query.setParameter("category_norm", serial);
        return (Table_6_2_1) query.list().get(0);

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
