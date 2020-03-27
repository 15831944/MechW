package com.mechw.dao.db.gbt7062016.table_a_4;

import com.mechw.entity.db.gbt7062016.Table_a_4;
import com.mechw.model.db.gbt7062016.table_a_4.Table_a_4_Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_a_4DAO")
public class Table_a_4DAOImpl implements Table_a_4DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listNorms(double thkMax) {

        String sql = "SELECT DISTINCT norms FROM gbt_706_2016.table_a_4 where d_mm <= :thkMax_param";
        NativeQuery query = getSession()
                .createNativeQuery(sql)
                .addScalar("norms", StandardBasicTypes.STRING)
                .setParameter("thkMax_param", thkMax);
        return query.list();
    }

    @Override
    public Table_a_4 getDetails(Table_a_4_Query table_a_4_query) {

        String sql = "SELECT * FROM gbt_706_2016.table_a_4 " +
                "WHERE norms = :norms_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Table_a_4.class);
        query.setParameter("norms_param", table_a_4_query.getNorms());

        if (query.list().size() > 0) {
            return (Table_a_4) query.list().get(0);
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
