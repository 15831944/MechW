package com.mechw.dao.db.gbt7062016.table_a_1;

import com.mechw.entity.db.gbt7062016.Table_a_1;
import com.mechw.model.db.gbt7062016.table_a_1.Table_a_1_Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_a_1DAO")
public class Table_a_1DAOImpl implements Table_a_1DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listNorms(double thkMax) {

        String sql = "SELECT DISTINCT norms FROM gbt_706_2016.table_a_1 where t_mm <= :thkMax_param";
        NativeQuery query = getSession()
                .createNativeQuery(sql)
                .addScalar("norms", StandardBasicTypes.STRING)
                .setParameter("thkMax_param", thkMax);
        return query.list();
    }

    @Override
    public Table_a_1 getDetails(Table_a_1_Query table_a_1_query) {

        String sql = "SELECT * FROM gbt_706_2016.table_a_1 WHERE norms = :norms_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Table_a_1.class);
        query.setParameter("norms_param", table_a_1_query.getNorms());

        if (query.list().size() > 0) {
            return (Table_a_1) query.list().get(0);
        } else {
            return null;
        }
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
