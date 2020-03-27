package com.mechw.dao.db.ybt53092006.table_2;

import com.mechw.entity.db.ybt53092006.ybt_5309_2006_Table_2;
import com.mechw.model.db.ybt53092006.table_2.ybt_5309_2006_Table_2_Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("ybt_5309_2006_Table_2DAO")
public class ybt_5309_2006_Table_2DAOImpl implements ybt_5309_2006_Table_2DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listNorms(double thkMax) {

        String sql = "SELECT DISTINCT norms FROM ybt_5309_2006.table_2 where t_mm <= :thkMax_param";
        NativeQuery query = getSession()
                .createNativeQuery(sql)
                .addScalar("norms", StandardBasicTypes.STRING)
                .setParameter("thkMax_param", thkMax);
        return query.list();
    }

    @Override
    public ybt_5309_2006_Table_2 getDetails(ybt_5309_2006_Table_2_Query table_2_query) {

        String sql = "SELECT * FROM ybt_5309_2006.table_2 WHERE norms = :norms_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(ybt_5309_2006_Table_2.class);
        query.setParameter("norms_param", table_2_query.getNorms());

        if (query.list().size() > 0) {
            return (ybt_5309_2006_Table_2) query.list().get(0);
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
