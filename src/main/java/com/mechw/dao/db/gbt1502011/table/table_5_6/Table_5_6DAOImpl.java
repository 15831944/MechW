package com.mechw.dao.db.gbt1502011.table.table_5_6;

import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("Table_5_6DAO")
public class Table_5_6DAOImpl implements Table_5_6DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public double getK(Double alpha, Double rdil) {

        double rDilDB = rdil * 100;

        // 获取半顶角数组 alphas[]
        NativeQuery query_alpha = this.getSession().createNativeQuery("SELECT DISTINCT alpha FROM gbt_150_2011.table_5_6");
        Object[] alphaList = query_alpha.list().toArray();
        double[] alphas = new double[alphaList.length];
        for (int i = 0; i < alphaList.length; i++) {
            alphas[i] = (double) alphaList[i];
        }

        // 半顶角恰好是曲线角度
        if (Array.isContains(alphas, alpha)) {

            // 获取横坐标节点数组 rDils[]
            NativeQuery query_rDil = this.getSession().createNativeQuery(
                    "SELECT DISTINCT rdil FROM gbt_150_2011.table_5_6 WHERE alpha=:alpha_param");
            query_rDil.setParameter("alpha_param", alpha);
            Object[] rDilList = query_rDil.list().toArray();
            double[] rDils1 = new double[rDilList.length];
            for (int i = 0; i < rDilList.length; i++) {
                rDils1[i] = (double) rDilList[i];
            }

            // 如果 rdil 恰好是节点值
            if (Array.isContains(rDils1, rDilDB)) {
                String sql_1 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                        "WHERE alpha=:alpha_param " +
                        "AND rdil = :rdil_param";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("alpha_param", alpha)
                        .setParameter("rdil_param", rDilDB);
                return (double) query_1.list().get(0);
            }

            // rdil 插值
            double rDilUpperMin = Array.getUpper(rDils1, rDilDB);
            double rDilLowerMax = Array.getLower(rDils1, rDilDB);
            String sql_2 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
            query_2.setParameter("alpha_param", alpha)
                    .setParameter("rdil_param", rDilLowerMax);
            double kLowerMax = (double) query_2.list().get(0);

            String sql_3 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
            query_3.setParameter("alpha_param", alpha)
                    .setParameter("rdil_param", rDilUpperMin);
            double kUpperMin = (double) query_3.list().get(0);

            return kLowerMax + (rDilDB - rDilLowerMax) / (rDilUpperMin - rDilLowerMax) * (kUpperMin - kLowerMax);
        }

        /*
        半顶角需要插值
         */

        // 上端角度及 kUpper
        double alphaUpperMin = Array.getUpper(alphas, alpha);
        NativeQuery query_4 = this.getSession().createNativeQuery(
                "SELECT DISTINCT rdil FROM gbt_150_2011.table_5_6 WHERE alpha=:alpha_param");
        query_4.setParameter("alpha_param", alphaUpperMin);
        Object[] rDilList = query_4.list().toArray();
        double[] rDils2 = new double[rDilList.length];
        for (int i = 0; i < rDilList.length; i++) {
            rDils2[i] = (double) rDilList[i];
        }
        double kUpper;
        if (Array.isContains(rDils2, rDilDB)) {
            String sql_5 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_5 = this.getSession().createNativeQuery(sql_5);
            query_5.setParameter("alpha_param", alphaUpperMin)
                    .setParameter("rdil_param", rDilDB);
            kUpper = (double) query_5.list().get(0);
        } else {
            double rDilUpperMin = Array.getUpper(rDils2, rDilDB);
            double rDilLowerMax = Array.getLower(rDils2, rDilDB);
            String sql_6 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_6 = this.getSession().createNativeQuery(sql_6);
            query_6.setParameter("alpha_param", alphaUpperMin)
                    .setParameter("rdil_param", rDilLowerMax);
            double kUpperLowerMax = (double) query_6.list().get(0);
            String sql_7 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_7 = this.getSession().createNativeQuery(sql_7);
            query_7.setParameter("alpha_param", alphaUpperMin)
                    .setParameter("rdil_param", rDilUpperMin);
            double kUpperUpperMin = (double) query_7.list().get(0);

            kUpper = kUpperLowerMax + (rDilDB - rDilLowerMax) / (rDilUpperMin - rDilLowerMax) * (kUpperUpperMin - kUpperLowerMax);
        }

        // 下端角度及 kLower
        double alphaLowerMax = Array.getLower(alphas, alpha);
        // 获取横坐标节点数组 rdils
        NativeQuery query_rdil = this.getSession().createNativeQuery(
                "SELECT DISTINCT rdil FROM gbt_150_2011.table_5_6 WHERE alpha=:alpha_param");
        query_rdil.setParameter("alpha_param", alphaLowerMax);
        Object[] rdilList = query_rdil.list().toArray();
        double[] rdils3 = new double[rdilList.length];
        for (int i = 0; i < rdilList.length; i++) {
            rdils3[i] = (double) rdilList[i];
        }

        double kLower;
        // 如果 rdil 恰好是节点值
        if (Array.isContains(rdils3, rDilDB)) {
            String sql_1 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
            query_1.setParameter("alpha_param", alphaLowerMax)
                    .setParameter("rdil_param", rDilDB);
            kLower = (double) query_1.list().get(0);
        }

        // rdil 需要插值
        else {

            double rDilUpperMin = Array.getUpper(rdils3, rDilDB);
            double rDilLowerMax = Array.getLower(rdils3, rDilDB);

            String sql_2 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
            query_2.setParameter("alpha_param", alphaLowerMax)
                    .setParameter("rdil_param", rDilLowerMax);
            double kLowerLowerMax = (double) query_2.list().get(0);

            String sql_3 = "SELECT k FROM gbt_150_2011.table_5_6 " +
                    "WHERE alpha=:alpha_param " +
                    "AND rdil = :rdil_param";
            NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
            query_3.setParameter("alpha_param", alphaLowerMax)
                    .setParameter("rdil_param", rDilUpperMin);
            double kLowerUpperMin = (double) query_3.list().get(0);

            kLower = kLowerLowerMax + (rDilDB - rDilLowerMax) / (rDilUpperMin - rDilLowerMax) * (kLowerUpperMin - kLowerLowerMax);
        }

        return kLower + (alpha - alphaLowerMax) / (alphaUpperMin - alphaLowerMax) * (kUpper - kLower);
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
