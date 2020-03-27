package com.mechw.dao.db.gbt1502011.property.e;

import com.mechw.dao.db.gbt1502011.GBT150Tool;
import com.mechw.entity.db.gbt1502011.property.E;
import com.mechw.model.db.gbt1502011.property.e.EQuery;
import com.mechw.model.db.gbt1502011.property.e.EResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("EDao")
public class EDaoImpl implements EDao {

    @Resource
    private SessionFactory sessionFactory;

    public EDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public EResult getE(EQuery eQuery) {

        String sql = "SELECT * FROM gbt_150_2011.e " +
                "WHERE std = :std_param AND name = :name_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(E.class);
        query.setParameter("std_param", eQuery.getStd())
                .setParameter("name_param", eQuery.getName());

        // 定义结果对象
        EResult eResult = new EResult();

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            E e = (E) query.list().get(0);

            // 将热膨胀系数部分转化为 map
            Map<Double, Double> eMap = e.toMap();

            // 获取热膨胀系数表 最大 最小温度
            double eTempMin = e.geteTempMin();
            double eTempMax = e.geteTempMax();

            // 设计应力
            double designTemp = eQuery.getTemp();
            double result;
            if (designTemp > eTempMax || designTemp < eTempMin) {
                result = -1.0;
            } else {
                result = GBT150Tool.calDesign(designTemp, eMap);
            }
            eResult.setE(result);
        } else {

            eResult.setE(-1.0);
        }

        return eResult;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
