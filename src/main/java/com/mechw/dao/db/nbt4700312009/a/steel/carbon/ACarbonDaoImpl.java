package com.mechw.dao.db.nbt4700312009.a.steel.carbon;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.a.ACarbon;
import com.mechw.model.db.nbt4700312009.property.a.steel.carbon.ACarbonQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.carbon.ACarbonResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("ACarbonDao")
public class ACarbonDaoImpl implements ACarbonDao {

    @Resource
    private SessionFactory sessionFactory;

    public ACarbonDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public ACarbonResult getDesignA(ACarbonQuery aSteelCarbonQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.a_steel_low_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(ACarbon.class);
        query.setParameter("std_param", aSteelCarbonQuery.getStd())
                .setParameter("name_param", aSteelCarbonQuery.getName())
                .setParameter("type_param", aSteelCarbonQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            ACarbon aSteelCarbon = (ACarbon) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> aSteelCarbonMap = aSteelCarbon.toMap();

            // 查询温度
            double temp = aSteelCarbonQuery.getTemp();

            double designA = NBT470031Tool.calDesign(temp, aSteelCarbonMap);

            return new ACarbonResult(designA);

        } else {
            return new ACarbonResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
