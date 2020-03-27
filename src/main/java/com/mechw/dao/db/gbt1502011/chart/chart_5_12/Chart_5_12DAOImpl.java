package com.mechw.dao.db.gbt1502011.chart.chart_5_12;

import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("Chart_5_12DAO")
public class Chart_5_12DAOImpl implements Chart_5_12DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public double getQ1(Double alpha, Double thkrl) {

        double thkRlDB = thkrl * 100000;

        // 获取半顶角数组 alphas
        NativeQuery query_alpha = this.getSession().createNativeQuery("SELECT DISTINCT alpha FROM gbt_150_2011.chart_5_12");
        Object[] alphaList = query_alpha.list().toArray();
        double[] alphas = new double[alphaList.length];
        for (int i = 0; i < alphaList.length; i++) {
            alphas[i] = (double) alphaList[i];
        }

        double alphaUpperMin, alphaLowerMax, thkRlUpperMin, thkRlLowerMax, q1;

        // 半顶角恰好是 10°、20°、25°、30°
        if (Array.isContains(alphas, alpha)) {

            // 获取横坐标节点数组 thkRls
            NativeQuery query_thkRl = this.getSession().createNativeQuery(
                    "SELECT DISTINCT thkrl FROM gbt_150_2011.chart_5_12 WHERE alpha=:alpha_param");
            query_thkRl.setParameter("alpha_param", alpha);
            Object[] thkRlList = query_thkRl.list().toArray();
            double[] thkRls = new double[thkRlList.length];
            for (int i = 0; i < thkRlList.length; i++) {
                thkRls[i] = (double) thkRlList[i];
            }

            // 如果 thkrl 恰好是节点值
            if (Array.isContains(thkRls, thkRlDB)) {
                String sql_1 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("alpha_param", alpha)
                        .setParameter("thkrl_param", thkRlDB);
                q1 = (double) query_1.list().get(0);
            }

            // thkrl 需要插值
            else {

                thkRlUpperMin = Array.getUpper(thkRls, thkRlDB);
                thkRlLowerMax = Array.getLower(thkRls, thkRlDB);

                String sql_2 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("alpha_param", alpha)
                        .setParameter("thkrl_param", thkRlLowerMax);
                double q1LowerMax = (double) query_2.list().get(0);

                String sql_3 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
                query_3.setParameter("alpha_param", alpha)
                        .setParameter("thkrl_param", thkRlUpperMin);
                double q1UpperMin = (double) query_3.list().get(0);

                q1 = q1LowerMax + (thkRlDB - thkRlLowerMax) / (thkRlUpperMin - thkRlLowerMax) * (q1UpperMin - q1LowerMax);
            }
        }

        // 半顶角需要插值
        else {

            // 上端角度及 q1Upper
            alphaUpperMin = Array.getUpper(alphas, alpha);
            // 获取横坐标节点数组 thkRls
            NativeQuery query_thkRl = this.getSession().createNativeQuery(
                    "SELECT DISTINCT thkrl FROM gbt_150_2011.chart_5_12 WHERE alpha=:alpha_param");
            query_thkRl.setParameter("alpha_param", alphaUpperMin);
            Object[] thkRlList = query_thkRl.list().toArray();
            double[] thkRls = new double[thkRlList.length];
            for (int i = 0; i < thkRlList.length; i++) {
                thkRls[i] = (double) thkRlList[i];
            }

            double q1Upper;
            // 如果 thkrl 恰好是节点值
            if (Array.isContains(thkRls, thkRlDB)) {
                String sql_1 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("alpha_param", alphaUpperMin)
                        .setParameter("thkrl_param", thkRlDB);
                q1Upper = (double) query_1.list().get(0);
            }

            // thkrl 需要插值
            else {

                thkRlUpperMin = Array.getUpper(thkRls, thkRlDB);
                thkRlLowerMax = Array.getLower(thkRls, thkRlDB);

                String sql_2 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("alpha_param", alphaUpperMin)
                        .setParameter("thkrl_param", thkRlLowerMax);
                double q1UpperLowerMax = (double) query_2.list().get(0);

                String sql_3 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
                query_3.setParameter("alpha_param", alphaUpperMin)
                        .setParameter("thkrl_param", thkRlUpperMin);
                double q1UpperUpperMin = (double) query_3.list().get(0);

                q1Upper = q1UpperLowerMax + (thkRlDB - thkRlLowerMax) / (thkRlUpperMin - thkRlLowerMax) * (q1UpperUpperMin - q1UpperLowerMax);
            }

            // 下端角度及 q1Lower
            alphaLowerMax = Array.getLower(alphas, alpha);

            // 获取横坐标节点数组 thkrls
            NativeQuery query_thkrl = this.getSession().createNativeQuery(
                    "SELECT DISTINCT thkrl FROM gbt_150_2011.chart_5_12 WHERE alpha=:alpha_param");
            query_thkrl.setParameter("alpha_param", alphaLowerMax);
            Object[] thkrlList = query_thkrl.list().toArray();
            double[] thkrls = new double[thkrlList.length];
            for (int i = 0; i < thkrlList.length; i++) {
                thkrls[i] = (double) thkrlList[i];
            }

            double q1Lower;
            // 如果 thkrl 恰好是节点值
            if (Array.isContains(thkrls, thkRlDB)) {
                String sql_1 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("alpha_param", alphaLowerMax)
                        .setParameter("thkrl_param", thkRlDB);
                q1Lower = (double) query_1.list().get(0);
            }

            // thkrl 需要插值
            else {

                thkRlUpperMin = Array.getUpper(thkrls, thkRlDB);
                thkRlLowerMax = Array.getLower(thkrls, thkRlDB);

                String sql_2 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("alpha_param", alphaLowerMax)
                        .setParameter("thkrl_param", thkRlLowerMax);
                double q1LowerLowerMax = (double) query_2.list().get(0);

                String sql_3 = "SELECT q1 FROM gbt_150_2011.chart_5_12 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrl = :thkrl_param";
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
                query_3.setParameter("alpha_param", alphaLowerMax)
                        .setParameter("thkrl_param", thkRlUpperMin);
                double q1LowerUpperMin = (double) query_3.list().get(0);

                q1Lower = q1LowerLowerMax + (thkRlDB - thkRlLowerMax) / (thkRlUpperMin - thkRlLowerMax) * (q1LowerUpperMin - q1LowerLowerMax);
            }

            q1 = q1Lower + (alpha - alphaLowerMax) / (alphaUpperMin - alphaLowerMax) * (q1Upper - q1Lower);

        }

        return q1;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
