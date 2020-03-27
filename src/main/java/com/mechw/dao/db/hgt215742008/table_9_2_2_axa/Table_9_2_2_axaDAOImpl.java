package com.mechw.dao.db.hgt215742008.table_9_2_2_axa;

import com.mechw.entity.db.hgt215742008.Table_9_2_2_axa;
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
@Repository("Table_9_2_2_axaDAO")
public class Table_9_2_2_axaDAOImpl implements Table_9_2_2_axaDAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    // 列出所有可用的壳体 DN
    @Override
    public List<Float> listDN() {

        String sql = "SELECT DISTINCT shell_dn FROM hgt_21574_2008.table_9_2_2_axa";
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("shell_dn", StandardBasicTypes.FLOAT);
        return query.list();

    }

    // 获取指定shell DN 和满足吊重的所有吊耳型号
    @Override
    public List<Float> findTypesByDNAndLiftWeight(Float dn, Float liftWeight) {

        String sqls = "SELECT DISTINCT lug_dn FROM hgt_21574_2008.table_9_2_2_axa WHERE shell_dn= :category_shelldn AND lift_weight>= :category_liftWeight";
        NativeQuery querys = this.getSession().createNativeQuery(sqls).addScalar("lug_dn", StandardBasicTypes.FLOAT);
        querys.setParameter("category_shelldn", dn).setParameter("category_liftWeight", liftWeight);
        return querys.list();

    }

    @Override
    public Table_9_2_2_axa findByDNAndLiftWeightAndType(Float dn, Float liftWeight, Float type) {

        String sqls = "SELECT * FROM hgt_21574_2008.table_9_2_2_axa WHERE shell_dn= :category_shelldn AND lift_weight>= :category_liftWeight AND lug_dn= :category_lugdn";
        NativeQuery querys = this.getSession().createNativeQuery(sqls).addEntity(Table_9_2_2_axa.class);
        querys.setParameter("category_shelldn", dn)
                .setParameter("category_liftWeight", liftWeight)
                .setParameter("category_lugdn", type);
        List<Table_9_2_2_axa> results = querys.list();

        if (results.size() <= 0) {

            return null;

        } else {

            double[] liftWeightArray = new double[results.size()];

            int i = 0;
            for (Table_9_2_2_axa axa : results) {

                liftWeightArray[i] = axa.getLiftWeight();
                i++;

            }

            String sql = "SELECT * FROM hgt_21574_2008.table_9_2_2_axa WHERE shell_dn= :category_shelldn AND lift_weight= :category_liftWeight AND lug_dn= :category_lugdn";
            NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Table_9_2_2_axa.class);
            query.setParameter("category_shelldn", dn)
                    .setParameter("category_liftWeight", Array.min(liftWeightArray))
                    .setParameter("category_lugdn", type);
            return (Table_9_2_2_axa) query.list().get(0);

        }

    }

}
