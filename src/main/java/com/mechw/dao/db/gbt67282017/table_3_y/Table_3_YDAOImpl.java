package com.mechw.dao.db.gbt67282017.table_3_y;

import com.mechw.entity.db.gbt67282017.Table_3_Y;
import com.mechw.model.db.gbt67282017.table_3_y.Table_3_Y_Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_3_YDAO")
public class Table_3_YDAOImpl implements Table_3_YDAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listNorms(double thkMax) {

        String sql = "SELECT DISTINCT norms FROM gbt_6728_2017.table_3 where t_mm <= :thkMax_param";
        NativeQuery query = getSession()
                .createNativeQuery(sql)
                .addScalar("norms", StandardBasicTypes.STRING)
                .setParameter("thkMax_param", thkMax);
        return query.list();
    }

    @Override
    public Table_3_Y getDetails(Table_3_Y_Query table_3_Y_query) {

        String sql = "SELECT * FROM gbt_6728_2017.table_3 WHERE norms = :norms_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Table_3_Y.class);
        query.setParameter("norms_param", table_3_Y_query.getNorms());

        if (query.list().size() > 0) {
            return (Table_3_Y) query.list().get(0);
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
