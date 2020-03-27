package com.mechw.dao.db.nbt4700312009.stress.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.stress.StressHighAlloy;
import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.stress.steel.highalloy.StressHighAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("StressHighAlloyDao")
public class StressHighAlloyDaoImpl implements StressHighAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public StressHighAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public StressHighAlloyResult getTestAndDesignStress(StressHighAlloyQuery stressSteelHighAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.stress_steel_high_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND min < :thk_param " +
                "AND max >= :thk_param " +
                "AND high_low%:hl_param=0 " +
                "AND type = :type_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(StressHighAlloy.class);
        query.setParameter("std_param", stressSteelHighAlloyQuery.getStd())
                .setParameter("name_param", stressSteelHighAlloyQuery.getName())
                .setParameter("thk_param", stressSteelHighAlloyQuery.getThk())
                .setParameter("hl_param", stressSteelHighAlloyQuery.getHighLow())
                .setParameter("type_param", stressSteelHighAlloyQuery.getType());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            StressHighAlloy stressSteelHighAlloy = (StressHighAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> stressSteelHighAlloyMap = stressSteelHighAlloy.toMap();

            // 定义结果变量
            Double designStress;

            double testStress = NBT470031Tool.calDesign(20.0, stressSteelHighAlloyMap);

            // 查询许用应力
            double temp = stressSteelHighAlloyQuery.getTemp();

            designStress = NBT470031Tool.calDesign(temp, stressSteelHighAlloyMap);

            return new StressHighAlloyResult(testStress, designStress);

        } else {
            return new StressHighAlloyResult(-1.0, -1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
