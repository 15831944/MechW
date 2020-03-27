package com.mechw.dao.db.gbt67282017.table_2_j;

import com.mechw.entity.db.gbt67282017.Table_2_J;
import com.mechw.model.db.gbt67282017.table_2_j.Table_2_J_Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_2_JDAO")
public class Table_2_JDAOImpl implements Table_2_JDAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listNorms(double thkMax) {

        String sql = "SELECT DISTINCT norms FROM gbt_6728_2017.table_2 where t_mm <= :thkMax_param";
        NativeQuery query = getSession()
                .createNativeQuery(sql)
                .addScalar("norms", StandardBasicTypes.STRING)
                .setParameter("thkMax_param", thkMax);
        return query.list();
    }

    @Override
    public Table_2_J getDetails(Table_2_J_Query table_2_J_query) {

        String sql = "SELECT * FROM gbt_6728_2017.table_2 WHERE norms = :norms_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Table_2_J.class);
        query.setParameter("norms_param", table_2_J_query.getNorms());

        if (query.list().size() > 0) {
            return (Table_2_J) query.list().get(0);
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
