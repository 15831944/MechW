package com.mechw.dao.db.nbt4700312009.stress.steel.carbon;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.stress.StressCarbon;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.carbon.StressCarbonResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("StressCarbonDao")
public class StressCarbonDaoImpl implements StressCarbonDao {

    @Resource
    private SessionFactory sessionFactory;

    public StressCarbonDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public StressCarbonResult getTestAndDesignStress(StressCarbonQuery stressSteelCarbonQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.stress_steel_carbon " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND min < :thk_param " +
                "AND max >= :thk_param " +
                "AND type = :type_param ";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(StressCarbon.class);
        query.setParameter("std_param", stressSteelCarbonQuery.getStd())
                .setParameter("name_param", stressSteelCarbonQuery.getName())
                .setParameter("thk_param", stressSteelCarbonQuery.getThk())
                .setParameter("type_param", stressSteelCarbonQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            StressCarbon stressSteelCarbon = (StressCarbon) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> stressSteelCarbonMap = stressSteelCarbon.toMap();

            double testStress = NBT470031Tool.calDesign(20.0, stressSteelCarbonMap);

            double temp = stressSteelCarbonQuery.getTemp();
            Double designStress = NBT470031Tool.calDesign(temp, stressSteelCarbonMap);

            return new StressCarbonResult(testStress, designStress);

        } else {
            return new StressCarbonResult(-1.0, -1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
