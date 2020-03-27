package com.mechw.dao.db.hgt205692013.table_b_4_2;

import com.mechw.entity.db.hgt205692013.Table_b_4_2;
import com.mechw.model.db.hgt205692013.Table_b_4_2Result;
import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("Table_b_4_2DAO")
public class Table_b_4_2DaoImpl implements Table_b_4_2DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Table_b_4_2Result find(double u) {

        // table 中 u×10
        double queryU = u * 10;

        // object array
        Object[] uObjectArray = this.getSession()
                .createNativeQuery("SELECT u FROM hgt_20569_2013.table_b_4_2 ORDER BY u")
                .list().toArray();

        // double array
        double[] uDoubleArray = new double[uObjectArray.length];
        for (int i = 0; i < uObjectArray.length; i++) {
            uDoubleArray[i] = (double) uObjectArray[i];
        }

        // result param
        double fai1u, x1u, x2u, miu1u;
        if (Array.isContains(uDoubleArray, queryU)) {

            // Table_b_4_2 row object
            NativeQuery query_row = this.getSession()
                    .createNativeQuery("SELECT * FROM hgt_20569_2013.table_b_4_2 WHERE u=:u_param")
                    .addEntity(Table_b_4_2.class);
            query_row.setParameter("u_param", queryU);
            Table_b_4_2 table_b_4_2 = (Table_b_4_2) query_row.list().get(0);

            fai1u = table_b_4_2.getFai1u();
            x1u = table_b_4_2.getX1u();
            x2u = table_b_4_2.getX2u();
            miu1u = table_b_4_2.getMiu1u();

        } else {

            // 获取给定 u 的上下边界值
            double uUpperMin = Array.getUpper(uDoubleArray, queryU);
            double uLowerMax = Array.getLower(uDoubleArray, queryU);

            // Table_b_4_2 row lowMax
            NativeQuery queryLowerMax = this.getSession()
                    .createNativeQuery("SELECT * FROM hgt_20569_2013.table_b_4_2 WHERE u=:u_param")
                    .addEntity(Table_b_4_2.class).setParameter("u_param", uLowerMax);
            Table_b_4_2 table_b_4_2_lowerMax = (Table_b_4_2) queryLowerMax.list().get(0);

            // Table_b_4_2 row upperMin
            NativeQuery queryUpperMin = this.getSession()
                    .createNativeQuery("SELECT * FROM hgt_20569_2013.table_b_4_2 WHERE u=:u_param")
                    .addEntity(Table_b_4_2.class).setParameter("u_param", uLowerMax);
            Table_b_4_2 table_b_4_2_upperMin = (Table_b_4_2) queryUpperMin.list().get(0);

            // fai1u
            double fai_1_u_low = table_b_4_2_lowerMax.getFai1u();
            double fai_1_u_high = table_b_4_2_upperMin.getFai1u();
            fai1u = fai_1_u_high + (fai_1_u_low - fai_1_u_high) * (queryU - uUpperMin) / (uLowerMax - uUpperMin);

            // x1u
            double x_1_u_low = table_b_4_2_lowerMax.getX1u();
            double x_1_u_high = table_b_4_2_upperMin.getX1u();
            x1u = x_1_u_high + (x_1_u_low - x_1_u_high) * (queryU - uUpperMin) / (uLowerMax - uUpperMin);

            // x2u
            double x_2_u_low = table_b_4_2_lowerMax.getX2u();
            double x_2_u_high = table_b_4_2_upperMin.getX2u();
            x2u = x_2_u_high + (x_2_u_low - x_2_u_high) * (queryU - uUpperMin) / (uLowerMax - uUpperMin);

            // miu1u
            double miu_1_u_low = table_b_4_2_lowerMax.getMiu1u();
            double miu_1_u_high = table_b_4_2_upperMin.getMiu1u();
            miu1u = miu_1_u_high + (miu_1_u_low - miu_1_u_high) * (queryU - uUpperMin) / (uLowerMax - uUpperMin);

        }

        return new Table_b_4_2Result(fai1u, x1u, x2u, miu1u);

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
