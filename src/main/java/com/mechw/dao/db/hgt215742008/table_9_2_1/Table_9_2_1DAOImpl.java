package com.mechw.dao.db.hgt215742008.table_9_2_1;

import com.mechw.entity.db.hgt215742008.Table_9_2_1;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("Table_9_2_1DAO")
public class Table_9_2_1DAOImpl implements Table_9_2_1DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Table_9_2_1 findByNorm(Float norm) {

        String sql = "SELECT * FROM hgt_21574_2008.table_9_2_1 WHERE lug_dn= :category_norm";
        NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Table_9_2_1.class);
        query.setParameter("category_norm", norm);
        return (Table_9_2_1) query.list().get(0);

    }

}
