package com.mechw.dao.db.nbt4700312009.stress.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.stress.StressLowAlloy;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.lowalloy.StressLowAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("StressLowAlloyDao")
public class StressLowAlloyDaoImpl implements StressLowAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public StressLowAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public StressLowAlloyResult getTestAndDesignStress(StressLowAlloyQuery stressSteelLowAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.stress_steel_low_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND min < :thk_param " +
                "AND max >= :thk_param " +
                "AND type = :type_param ";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(StressLowAlloy.class);
        query.setParameter("std_param", stressSteelLowAlloyQuery.getStd())
                .setParameter("name_param", stressSteelLowAlloyQuery.getName())
                .setParameter("thk_param", stressSteelLowAlloyQuery.getThk())
                .setParameter("type_param", stressSteelLowAlloyQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            StressLowAlloy stressSteelLowAlloy = (StressLowAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> stressSteelLowAlloyMap = stressSteelLowAlloy.toMap();

            // 定义结果变量
            Double designStress;

            double testStress = NBT470031Tool.calDesign(20.0, stressSteelLowAlloyMap);

            // 查询许用应力
            double temp = stressSteelLowAlloyQuery.getTemp();

            designStress = NBT470031Tool.calDesign(temp, stressSteelLowAlloyMap);

            return new StressLowAlloyResult(testStress, designStress);

        } else {
            return new StressLowAlloyResult(-1.0, -1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
