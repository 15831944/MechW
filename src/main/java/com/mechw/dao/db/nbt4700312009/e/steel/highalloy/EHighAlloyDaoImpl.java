package com.mechw.dao.db.nbt4700312009.e.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.e.EHighAlloy;
import com.mechw.model.db.nbt4700312009.property.e.steel.highalloy.EHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.highalloy.EHighAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("EHighAlloyDao")
public class EHighAlloyDaoImpl implements EHighAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public EHighAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public EHighAlloyResult getDesignE(EHighAlloyQuery eSteelHighAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.e_steel_high_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(EHighAlloy.class);
        query.setParameter("std_param", eSteelHighAlloyQuery.getStd())
                .setParameter("name_param", eSteelHighAlloyQuery.getName())
                .setParameter("type_param", eSteelHighAlloyQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            EHighAlloy eSteelHighAlloy = (EHighAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> eSteelHighAlloyMap = eSteelHighAlloy.toMap();

            // 查询温度
            double temp = eSteelHighAlloyQuery.getTemp();

            double designA = NBT470031Tool.calDesign(temp, eSteelHighAlloyMap);

            return new EHighAlloyResult(designA);

        } else {
            return new EHighAlloyResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
