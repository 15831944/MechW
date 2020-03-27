package com.mechw.dao.db.nbt4700312009.e.steel.carbon;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.e.ECarbon;
import com.mechw.model.db.nbt4700312009.property.e.steel.carbon.ECarbonQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.carbon.ECarbonResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("ECarbonDao")
public class ECarbonDaoImpl implements ECarbonDao {

    @Resource
    private SessionFactory sessionFactory;

    public ECarbonDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public ECarbonResult getDesignE(ECarbonQuery eCarbonQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.e_steel_carbon " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(ECarbon.class);
        query.setParameter("std_param", eCarbonQuery.getStd())
                .setParameter("name_param", eCarbonQuery.getName())
                .setParameter("type_param", eCarbonQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            ECarbon eSteelCarbon = (ECarbon) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> eSteelCarbonMap = eSteelCarbon.toMap();

            // 查询温度
            double temp = eCarbonQuery.getTemp();

            double designE = NBT470031Tool.calDesign(temp, eSteelCarbonMap);

            return new ECarbonResult(designE);

        } else {
            return new ECarbonResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
