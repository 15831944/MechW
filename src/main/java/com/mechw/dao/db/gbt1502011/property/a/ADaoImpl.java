package com.mechw.dao.db.gbt1502011.property.a;

import com.mechw.dao.db.gbt1502011.GBT150Tool;
import com.mechw.entity.db.gbt1502011.property.A;
import com.mechw.model.db.gbt1502011.property.a.AQuery;
import com.mechw.model.db.gbt1502011.property.a.AResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("ADao")
public class ADaoImpl implements ADao {

    @Resource
    private SessionFactory sessionFactory;

    public ADaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public AResult getA(AQuery aQuery) {

        String sql = "SELECT * FROM gbt_150_2011.a " +
                "WHERE std = :std_param AND name = :name_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(A.class);
        query.setParameter("std_param", aQuery.getStd())
                .setParameter("name_param", aQuery.getName());

        // 定义结果对象
        AResult aResult = new AResult();

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            A a = (A) query.list().get(0);

            // 将热膨胀系数部分转化为 map
            Map<Double, Double> aMap = a.toMap();

            // 获取热膨胀系数表 最大 最小温度
            double aTempMin = a.getaTempMin();
            double aTempMax = a.getaTempMax();

            // 设计应力
            double designTemp = aQuery.getTemp();
            double result;
            if (designTemp > aTempMax) {
                result = -1.0;
            } else if (designTemp < aTempMin) {
                result = -1.0;
            } else {
                result = GBT150Tool.calDesign(designTemp, aMap);
            }
            aResult.setA(result);
        } else {

            aResult.setA(-1.0);
        }

        return aResult;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
