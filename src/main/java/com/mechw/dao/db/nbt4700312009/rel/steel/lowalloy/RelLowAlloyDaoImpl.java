package com.mechw.dao.db.nbt4700312009.rel.steel.lowalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.rel.RelLowAlloy;
import com.mechw.model.db.nbt4700312009.property.rel.steel.lowalloy.RelLowAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.lowalloy.RelLowAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("RelLowAlloyDao")
public class RelLowAlloyDaoImpl implements RelLowAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public RelLowAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public RelLowAlloyResult getDesignRel(RelLowAlloyQuery relSteelLowAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.rel_steel_low_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param " +
                "AND min < :thk_param " +
                "AND max >= :thk_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(RelLowAlloy.class);
        query.setParameter("std_param", relSteelLowAlloyQuery.getStd())
                .setParameter("name_param", relSteelLowAlloyQuery.getName())
                .setParameter("type_param", relSteelLowAlloyQuery.getType())
                .setParameter("thk_param", relSteelLowAlloyQuery.getThk());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            RelLowAlloy relLowAlloy = (RelLowAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> relLowAlloyMap = relLowAlloy.toMap();

            // 查询温度
            double temp = relSteelLowAlloyQuery.getTemp();

            double designRel = NBT470031Tool.calDesign(temp, relLowAlloyMap);

            return new RelLowAlloyResult(designRel);

        } else {
            return new RelLowAlloyResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
