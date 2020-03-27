package com.mechw.dao.db.hgt215742008.table_8_2_1;

import com.mechw.entity.db.hgt215742008.Table_8_2_1;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_8_2_1DAO")
public class Table_8_2_1DAOImpl implements Table_8_2_1DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List<Float> findTypesByLiftWeight(Float liftWeight) {
        String sqls = "SELECT DISTINCT lift_weight FROM hgt_21574_2008.table_8_2_1 WHERE lift_weight >= :category_liftWeight";
        NativeQuery querys = this.getSession().createNativeQuery(sqls).addScalar("lift_weight", StandardBasicTypes.FLOAT);
        querys.setParameter("category_liftWeight", liftWeight);
        return querys.list();
    }

    @Override
    public Table_8_2_1 findByType(Float type) {

        String sql = "SELECT * FROM hgt_21574_2008.table_8_2_1 WHERE lift_weight = :category_liftWeight";
        NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Table_8_2_1.class);
        query.setParameter("category_liftWeight", type);
        List<Table_8_2_1> results = query.list();

        if (results.size() <= 0) {

            return null;

        } else {

            return results.get(0);

        }

    }
}
