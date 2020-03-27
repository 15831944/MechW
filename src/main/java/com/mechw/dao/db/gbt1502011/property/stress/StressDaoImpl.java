package com.mechw.dao.db.gbt1502011.property.stress;

import com.mechw.dao.db.gbt1502011.GBT150Tool;
import com.mechw.entity.db.gbt1502011.property.Stress;
import com.mechw.model.db.gbt1502011.property.stress.StressQuery;
import com.mechw.model.db.gbt1502011.property.stress.StressResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("StressDao")
public class StressDaoImpl implements StressDao {

    @Resource
    private SessionFactory sessionFactory;

    public StressDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public StressResult getStress(StressQuery stressQuery) {

        String sql = "SELECT * FROM gbt_150_2011.stress " +
                "WHERE std = :std_param AND name = :name_param " +
                "AND stress_thk_min < :thk_param AND stress_thk_max >= :thk_param " +
                "AND high_low % :high_low_param = 0";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Stress.class);
        query.setParameter("std_param", stressQuery.getStd())
                .setParameter("name_param", stressQuery.getName())
                .setParameter("thk_param", stressQuery.getThk())
                .setParameter("high_low_param", stressQuery.getHighLow());

        // 定义结果对象
        StressResult stressResult = new StressResult();

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            Stress stress = (Stress) query.list().get(0);

            // 将许用应力部分转化为 map
            Map<Double, Double> stressMap = stress.toMap();

            // 获取许用应力表 最大 最小温度
            double stressTempMin = stress.getStressTempMin();
            double stressTempMax = stress.getStressTempMax();

            // 常温应力
            double o = GBT150Tool.calDesign(stressTempMin, stressMap);
            stressResult.setO(o);

            // 标记应力
            double ot1 = stress.getTagStress();
            stressResult.setOt1(ot1);

            // 设计应力
            double designTemp = Math.max(stressTempMin, stressQuery.getTemp());
            double ot;
            if (designTemp > stressTempMax) {
                ot = -1.0;
            } else {
                ot = GBT150Tool.calDesign(designTemp, stressMap);
            }
            stressResult.setOt(ot);

        } else {

            stressResult.setO(-1.0);
            stressResult.setOt(-1.0);
            stressResult.setOt1(-1.0);
        }

        return stressResult;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
