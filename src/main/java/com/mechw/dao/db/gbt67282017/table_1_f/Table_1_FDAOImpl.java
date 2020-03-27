package com.mechw.dao.db.gbt67282017.table_1_f;

import com.mechw.entity.db.gbt67282017.Table_1_F;
import com.mechw.model.db.gbt67282017.table_1_f.Table_1_F_Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_1_FDAO")
public class Table_1_FDAOImpl implements Table_1_FDAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listNorms(double thkMax) {

        String sql = "SELECT DISTINCT norms FROM gbt_6728_2017.table_1 where t_mm <= :thkMax_param";
        NativeQuery query = getSession()
                .createNativeQuery(sql)
                .addScalar("norms", StandardBasicTypes.STRING)
                .setParameter("thkMax_param", thkMax);
        return query.list();
    }

    @Override
    public Table_1_F getDetails(Table_1_F_Query table_1_F_query) {

        String sql = "SELECT * FROM gbt_6728_2017.table_1 WHERE norms = :norms_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Table_1_F.class);
        query.setParameter("norms_param", table_1_F_query.getNorms());

        if (query.list().size() > 0) {
            return (Table_1_F) query.list().get(0);
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
