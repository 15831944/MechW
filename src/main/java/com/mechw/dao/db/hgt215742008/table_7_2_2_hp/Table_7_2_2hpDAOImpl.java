package com.mechw.dao.db.hgt215742008.table_7_2_2_hp;

import com.mechw.entity.db.hgt215742008.Table_7_2_2_hp;
import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("Table_7_2_2_hpDAO")
public class Table_7_2_2hpDAOImpl implements Table_7_2_2_hpDAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    // 列出可用的dn
    @Override
    public List<Float> listDN() {
        String sql = "SELECT DISTINCT dn FROM hgt_21574_2008.table_7_2_2_hp";
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("dn", StandardBasicTypes.FLOAT);
        return query.list();
    }

    // 根据DN和吊重查找符合要求的所有型号
    @Override
    public List<String> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {

        String sqls = "SELECT DISTINCT type FROM hgt_21574_2008.table_7_2_2_hp WHERE dn= :category_dn AND lift_weight>= :category_liftWeight";
        NativeQuery querys = this.getSession().createNativeQuery(sqls).addScalar("type", StandardBasicTypes.STRING);
        querys.setParameter("category_dn", dn).setParameter("category_liftWeight", liftWeight);
        return querys.list();

    }

    @Override
    public Table_7_2_2_hp findByDNAndLiftWeightAndType(Float dn, Float liftWeight, String type) {

        String sqls = "SELECT * FROM hgt_21574_2008.table_7_2_2_hp WHERE dn= :category_dn AND lift_weight>= :category_liftWeight AND type= :category_type";
        NativeQuery querys = this.getSession().createNativeQuery(sqls).addEntity(Table_7_2_2_hp.class);
        querys.setParameter("category_dn", dn)
                .setParameter("category_liftWeight", liftWeight)
                .setParameter("category_type", type);
        List<Table_7_2_2_hp> results = querys.list();

        if (results.size() <= 0) {

            return null;

        } else {

            double[] liftWeightArray = new double[results.size()];

            int i = 0;
            for (Table_7_2_2_hp tp : results) {

                liftWeightArray[i] = tp.getLiftWeight();
                i++;

            }

            String sql = "SELECT * FROM hgt_21574_2008.table_7_2_2_hp WHERE dn= :category_dn AND lift_weight= :category_liftWeight AND type= :category_type";
            NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Table_7_2_2_hp.class);
            query.setParameter("category_dn", dn)
                    .setParameter("category_liftWeight", Array.min(liftWeightArray))
                    .setParameter("category_type", type);
            return (Table_7_2_2_hp) query.list().get(0);

        }
    }

}
