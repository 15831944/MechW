package com.mechw.dao.db.gbt1502011.chart.chart_5_15;

import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("Chart_5_15DAO")
public class Chart_5_15DAOImpl implements Chart_5_15DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public double getQ2(Double alpha, Double thkrs) {

        double thkRsDB = thkrs * 10000;

        // 获取半顶角数组 alphas
        NativeQuery query_alpha = this.getSession().createNativeQuery("SELECT DISTINCT alpha FROM gbt_150_2011.chart_5_15");
        Object[] alphaList = query_alpha.list().toArray();
        double[] alphas = new double[alphaList.length];
        for (int i = 0; i < alphaList.length; i++) {
            alphas[i] = (double) alphaList[i];
        }

        double alphaUpperMin, alphaLowerMax, thkRsUpperMin, thkRsLowerMax, q2;

        // 半顶角恰好是曲线角度
        if (Array.isContains(alphas, alpha)) {

            // 获取横坐标节点数组 thkRss
            NativeQuery query_thkRs = this.getSession().createNativeQuery(
                    "SELECT DISTINCT thkrs FROM gbt_150_2011.chart_5_15 WHERE alpha=:alpha_param");
            query_thkRs.setParameter("alpha_param", alpha);
            Object[] thkRsList = query_thkRs.list().toArray();
            double[] thkRss = new double[thkRsList.length];
            for (int i = 0; i < thkRsList.length; i++) {
                thkRss[i] = (double) thkRsList[i];
            }

            // 如果 thkrs 恰好是节点值
            if (Array.isContains(thkRss, thkRsDB)) {
                String sql_1 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("alpha_param", alpha)
                        .setParameter("thkrs_param", thkRsDB);
                q2 = (double) query_1.list().get(0);
            }

            // thkrs 需要插值
            else {

                thkRsUpperMin = Array.getUpper(thkRss, thkRsDB);
                thkRsLowerMax = Array.getLower(thkRss, thkRsDB);

                String sql_2 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("alpha_param", alpha)
                        .setParameter("thkrs_param", thkRsLowerMax);
                double q2LowerMax = (double) query_2.list().get(0);

                String sql_3 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
                query_3.setParameter("alpha_param", alpha)
                        .setParameter("thkrs_param", thkRsUpperMin);
                double q2UpperMin = (double) query_3.list().get(0);

                q2 = q2LowerMax + (thkRsDB - thkRsLowerMax) / (thkRsUpperMin - thkRsLowerMax) * (q2UpperMin - q2LowerMax);
            }
        }

        // 半顶角需要插值
        else {

            // 上端角度及 q2Upper
            alphaUpperMin = Array.getUpper(alphas, alpha);
            // 获取横坐标节点数组 thkRss
            NativeQuery query_thkRs = this.getSession().createNativeQuery(
                    "SELECT DISTINCT thkrs FROM gbt_150_2011.chart_5_15 WHERE alpha=:alpha_param");
            query_thkRs.setParameter("alpha_param", alphaUpperMin);
            Object[] thkRsList = query_thkRs.list().toArray();
            double[] thkRss = new double[thkRsList.length];
            for (int i = 0; i < thkRsList.length; i++) {
                thkRss[i] = (double) thkRsList[i];
            }

            double q2Upper;
            // 如果 thkrs 恰好是节点值
            if (Array.isContains(thkRss, thkRsDB)) {
                String sql_1 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("alpha_param", alphaUpperMin)
                        .setParameter("thkrs_param", thkRsDB);
                q2Upper = (double) query_1.list().get(0);
            }

            // thkrs 需要插值
            else {

                thkRsUpperMin = Array.getUpper(thkRss, thkRsDB);
                thkRsLowerMax = Array.getLower(thkRss, thkRsDB);

                String sql_2 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("alpha_param", alphaUpperMin)
                        .setParameter("thkrs_param", thkRsLowerMax);
                double q2UpperLowerMax = (double) query_2.list().get(0);

                String sql_3 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
                query_3.setParameter("alpha_param", alphaUpperMin)
                        .setParameter("thkrs_param", thkRsUpperMin);
                double q2UpperUpperMin = (double) query_3.list().get(0);

                q2Upper = q2UpperLowerMax + (thkRsDB - thkRsLowerMax) / (thkRsUpperMin - thkRsLowerMax) * (q2UpperUpperMin - q2UpperLowerMax);
            }

            // 下端角度及 q2Lower
            alphaLowerMax = Array.getLower(alphas, alpha);

            // 获取横坐标节点数组 thkrss
            NativeQuery query_thkrs = this.getSession().createNativeQuery(
                    "SELECT DISTINCT thkrs FROM gbt_150_2011.chart_5_15 WHERE alpha=:alpha_param");
            query_thkrs.setParameter("alpha_param", alphaLowerMax);
            Object[] thkrsList = query_thkrs.list().toArray();
            double[] thkrss = new double[thkrsList.length];
            for (int i = 0; i < thkrsList.length; i++) {
                thkrss[i] = (double) thkrsList[i];
            }

            double q2Lower;
            // 如果 thkrs 恰好是节点值
            if (Array.isContains(thkrss, thkRsDB)) {
                String sql_1 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_1 = this.getSession().createNativeQuery(sql_1);
                query_1.setParameter("alpha_param", alphaLowerMax)
                        .setParameter("thkrs_param", thkRsDB);
                q2Lower = (double) query_1.list().get(0);
            }

            // thkrs 需要插值
            else {

                thkRsUpperMin = Array.getUpper(thkrss, thkRsDB);
                thkRsLowerMax = Array.getLower(thkrss, thkRsDB);

                String sql_2 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_2 = this.getSession().createNativeQuery(sql_2);
                query_2.setParameter("alpha_param", alphaLowerMax)
                        .setParameter("thkrs_param", thkRsLowerMax);
                double q2LowerLowerMax = (double) query_2.list().get(0);

                String sql_3 = "SELECT q2 FROM gbt_150_2011.chart_5_15 " +
                        "WHERE alpha=:alpha_param " +
                        "AND thkrs = :thkrs_param";
                NativeQuery query_3 = this.getSession().createNativeQuery(sql_3);
                query_3.setParameter("alpha_param", alphaLowerMax)
                        .setParameter("thkrs_param", thkRsUpperMin);
                double q2LowerUpperMin = (double) query_3.list().get(0);

                q2Lower = q2LowerLowerMax + (thkRsDB - thkRsLowerMax) / (thkRsUpperMin - thkRsLowerMax) * (q2LowerUpperMin - q2LowerLowerMax);
            }

            q2 = q2Lower + (alpha - alphaLowerMax) / (alphaUpperMin - alphaLowerMax) * (q2Upper - q2Lower);

        }

        return q2;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
