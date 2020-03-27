package com.mechw.dao.db.hgt215742008.table_10_1;

import com.mechw.entity.db.hgt215742008.Table_10_1;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_10_1DAO")
public class Table_10_1DAOImpl implements Table_10_1DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List findTypesByLiftWeight(Float liftWeight) {
        String sql = "SELECT DISTINCT lift_weight FROM hgt_21574_2008.table_10_1 WHERE lift_weight >= :category_liftWeight";
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("lift_weight", StandardBasicTypes.FLOAT);
        query.setParameter("category_liftWeight", liftWeight);
        return query.list();
    }

    @Override
    public Table_10_1 findByType(Float type) {

        String sql = "SELECT * FROM hgt_21574_2008.table_10_1 WHERE lift_weight = :category_liftWeight";
        NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Table_10_1.class);
        query.setParameter("category_liftWeight", type);
        List<Table_10_1> results = query.list();

        if (results.size() <= 0) {
            return null;
        } else {
            return results.get(0);
        }

    }
}
