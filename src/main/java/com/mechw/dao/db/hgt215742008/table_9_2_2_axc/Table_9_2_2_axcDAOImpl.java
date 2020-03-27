package com.mechw.dao.db.hgt215742008.table_9_2_2_axc;

import com.mechw.entity.db.hgt215742008.Table_9_2_2_axc;
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
@Repository("Table_9_2_2_axcDAO")
public class Table_9_2_2_axcDAOImpl implements Table_9_2_2_axcDAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    // 列出所有可用的壳体 DN
    @Override
    public List<Float> listDN() {

        String sql = "SELECT DISTINCT shell_dn FROM hgt_21574_2008.table_9_2_2_axc";
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("shell_dn", StandardBasicTypes.FLOAT);
        return query.list();

    }

    // 获取指定shell DN 和满足吊重的所有吊耳型号
    @Override
    public List<Float> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {

        String sqls = "SELECT DISTINCT lug_dn FROM hgt_21574_2008.table_9_2_2_axc WHERE shell_dn= :category_shelldn AND lift_weight>= :category_liftWeight";
        NativeQuery querys = this.getSession().createNativeQuery(sqls).addScalar("lug_dn", StandardBasicTypes.FLOAT);
        querys.setParameter("category_shelldn", dn).setParameter("category_liftWeight", liftWeight);
        return querys.list();

    }

    @Override
    public Table_9_2_2_axc findByDNAndLiftWeightAndType(Float dn, Float liftWeight, Float type) {

        String sqls = "SELECT * FROM hgt_21574_2008.table_9_2_2_axc WHERE shell_dn= :category_shelldn AND lift_weight>= :category_liftWeight AND lug_dn= :category_lugdn";
        NativeQuery querys = this.getSession().createNativeQuery(sqls).addEntity(Table_9_2_2_axc.class);
        querys.setParameter("category_shelldn", dn)
                .setParameter("category_liftWeight", liftWeight)
                .setParameter("category_lugdn", type);
        List<Table_9_2_2_axc> results = querys.list();

        if (results.size() <= 0) {

            return null;

        } else {

            double[] liftWeightArray = new double[results.size()];

            int i = 0;
            for (Table_9_2_2_axc axc : results) {

                liftWeightArray[i] = axc.getLiftWeight();
                i++;

            }

            String sql = "SELECT * FROM hgt_21574_2008.table_9_2_2_axc WHERE shell_dn= :category_shelldn AND lift_weight= :category_liftWeight AND lug_dn= :category_lugdn";
            NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Table_9_2_2_axc.class);
            query.setParameter("category_shelldn", dn)
                    .setParameter("category_liftWeight", Array.min(liftWeightArray))
                    .setParameter("category_lugdn", type);
            return (Table_9_2_2_axc) query.list().get(0);

        }

    }

}
