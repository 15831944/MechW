package com.mechw.dao.db.gbt1502011.property.rel;

import com.mechw.dao.db.gbt1502011.GBT150Tool;
import com.mechw.entity.db.gbt1502011.property.Rel;
import com.mechw.model.db.gbt1502011.property.rel.RelQuery;
import com.mechw.model.db.gbt1502011.property.rel.RelResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("RelDao")
public class RelDaoImpl implements RelDao {

    @Resource
    private SessionFactory sessionFactory;

    public RelDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public RelResult getRel(RelQuery relQuery) {

        String sql = "SELECT * FROM gbt_150_2011.rel " +
                "WHERE std = :std_param AND name = :name_param " +
                "AND rel_thk_min < :rel_thk_param AND rel_thk_max >= :rel_thk_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Rel.class);
        query.setParameter("std_param", relQuery.getStd())
                .setParameter("name_param", relQuery.getName())
                .setParameter("rel_thk_param", relQuery.getThk());

        // 定义结果对象
        RelResult relResult = new RelResult();

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            Rel rel = (Rel) query.list().get(0);

            // 将屈服强度部分转化为 map
            Map<Double, Double> relMap = rel.toMap();

            // 获取屈服强度表 最大 最小温度
            double relTempMin = rel.getRelTempMin();
            double relTempMax = rel.getRelTempMax();

            // 屈服强度
            double designTemp = Math.max(relTempMin, relQuery.getTemp());
            double result;
            if (designTemp > relTempMax) {
                result = -1.0;
            } else {
                result = GBT150Tool.calDesign(designTemp, relMap);
            }
            relResult.setRel(result);

        } else {

            relResult.setRel(-1.0);
        }

        return relResult;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
