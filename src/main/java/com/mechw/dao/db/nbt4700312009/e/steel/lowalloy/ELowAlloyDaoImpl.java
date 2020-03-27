package com.mechw.dao.db.nbt4700312009.e.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.e.ELowAlloy;
import com.mechw.model.db.nbt4700312009.property.e.steel.lowalloy.ELowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.e.steel.lowalloy.ELowAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("ELowAlloyDao")
public class ELowAlloyDaoImpl implements ELowAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public ELowAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public ELowAlloyResult getDesignE(ELowAlloyQuery eSteelLowAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.e_steel_low_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(ELowAlloy.class);
        query.setParameter("std_param", eSteelLowAlloyQuery.getStd())
                .setParameter("name_param", eSteelLowAlloyQuery.getName())
                .setParameter("type_param", eSteelLowAlloyQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            ELowAlloy eSteelLowAlloy = (ELowAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> eSteelLowAlloyMap = eSteelLowAlloy.toMap();

            // 查询温度
            double temp = eSteelLowAlloyQuery.getTemp();

            double designE = NBT470031Tool.calDesign(temp, eSteelLowAlloyMap);

            return new ELowAlloyResult(designE);

        } else {
            return new ELowAlloyResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
