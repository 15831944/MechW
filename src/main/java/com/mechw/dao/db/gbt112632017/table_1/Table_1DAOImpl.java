package com.mechw.dao.db.gbt112632017.table_1;

import com.mechw.entity.db.gbt112632017.Table_1;
import com.mechw.model.db.gbt112632017.table_1.Table_1_Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_1DAO")
public class Table_1DAOImpl implements Table_1DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listNorms(double thkMax) {

        String sql = "SELECT DISTINCT norms FROM gbt_11263_2017.table_1 where t2_mm <= :thkMax_param";
        NativeQuery query = getSession()
                .createNativeQuery(sql)
                .addScalar("norms", StandardBasicTypes.STRING)
                .setParameter("thkMax_param", thkMax);
        return query.list();
    }

    @Override
    public Table_1 getDetails(Table_1_Query table_1_query) {

        String sql = "SELECT * FROM gbt_11263_2017.table_1 " +
                "WHERE norms = :norms_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Table_1.class);
        query.setParameter("norms_param", table_1_query.getNorms());

        if (query.list().size() > 0) {
            return (Table_1) query.list().get(0);
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
