package com.mechw.dao.db.nbt4700312009.a.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.a.AHighAlloy;
import com.mechw.model.db.nbt4700312009.property.a.steel.highalloy.AHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.highalloy.AHighAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("AHighAlloyDao")
public class AHighAlloyDaoImpl implements AHighAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public AHighAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public AHighAlloyResult getDesignA(AHighAlloyQuery aSteelHighAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.a_steel_high_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(AHighAlloy.class);
        query.setParameter("std_param", aSteelHighAlloyQuery.getStd())
                .setParameter("name_param", aSteelHighAlloyQuery.getName())
                .setParameter("type_param", aSteelHighAlloyQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            AHighAlloy aSteelHighAlloy = (AHighAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> aSteelHighAlloyMap = aSteelHighAlloy.toMap();

            // 查询温度
            double temp = aSteelHighAlloyQuery.getTemp();

            double designA = NBT470031Tool.calDesign(temp, aSteelHighAlloyMap);

            return new AHighAlloyResult(designA);

        } else {
            return new AHighAlloyResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
