package com.mechw.dao.db.nbt4700312009.a.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.a.ALowAlloy;
import com.mechw.model.db.nbt4700312009.property.a.steel.lowalloy.ALowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.a.steel.lowalloy.ALowAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("ALowAlloyDao")
public class ALowAlloyDaoImpl implements ALowAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public ALowAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public ALowAlloyResult getDesignA(ALowAlloyQuery aSteelLowAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.a_steel_low_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(ALowAlloy.class);
        query.setParameter("std_param", aSteelLowAlloyQuery.getStd())
                .setParameter("name_param", aSteelLowAlloyQuery.getName())
                .setParameter("type_param", aSteelLowAlloyQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            ALowAlloy aSteelLowAlloy = (ALowAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> aSteelLowAlloyMap = aSteelLowAlloy.toMap();

            // 查询温度
            double temp = aSteelLowAlloyQuery.getTemp();

            double designA = NBT470031Tool.calDesign(temp, aSteelLowAlloyMap);

            return new ALowAlloyResult(designA);

        } else {
            return new ALowAlloyResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
