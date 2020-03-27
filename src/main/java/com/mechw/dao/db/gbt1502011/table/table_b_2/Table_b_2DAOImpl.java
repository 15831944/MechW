package com.mechw.dao.db.gbt1502011.table.table_b_2;

import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("Table_b_2DAO")
public class Table_b_2DAOImpl implements Table_b_2DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public double getZeta(Double re) {

        // 获取图表中re组成的数组reArray
        Object[] reList = this.getSession().createNativeQuery("SELECT DISTINCT re FROM gbt_150_2011.table_b_2 ORDER BY re")
                .list().toArray();
        double[] reArray = new double[reList.length];
        for (int i = 0; i < reList.length; i++) {
            reArray[i] = (double) reList[i];
        }

        // 获取图表中 re 的最大值、最小值
        double chartReMin = Array.min(reArray);
        double chartReMax = Array.max(reArray);

        double zeta;
        double reUpperMin, reLowerMax;
        if (re <= chartReMax && re >= chartReMin) {
            // 如果re恰好是节点值
            if (Array.isContains(reArray, re)) {

                NativeQuery queryPoint = this.getSession().createNativeQuery("SELECT zeta FROM gbt_150_2011.table_b_2 WHERE re = :re_param");
                queryPoint.setParameter("re_param", re);
                zeta = (double) queryPoint.list().get(0);
            } else {

                // 获取给定 thk 的上下边界值
                reUpperMin = Array.getUpper(reArray, re);
                reLowerMax = Array.getLower(reArray, re);

                // 下部 zeta
                String sql_2 = "SELECT zeta FROM gbt_150_2011.table_b_2 WHERE re = :re_param";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("re_param", reLowerMax);
                double reLM = (double) query_2.list().get(0);

                // 上部 zeta
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_2);
                query_3.setParameter("re_param", reUpperMin);
                double reUM = (double) query_3.list().get(0);

                zeta = reUM + (reLM - reUM) * (re - reUpperMin) / (reLowerMax - reUpperMin);
            }
        } else {
            zeta = -1.0;
        }

        return zeta;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
