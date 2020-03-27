package com.mechw.dao.db.nbt4700312009.rel.steel.highalloy;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.rel.RelHighAlloy;
import com.mechw.model.db.nbt4700312009.property.rel.steel.highalloy.RelHighAlloyQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.highalloy.RelHighAlloyResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("RelHighAlloyDao")
public class RelHighAlloyDaoImpl implements RelHighAlloyDao {

    @Resource
    private SessionFactory sessionFactory;

    public RelHighAlloyDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public RelHighAlloyResult getDesignRel(RelHighAlloyQuery relSteelHighAlloyQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.rel_steel_high_alloy " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param " +
                "AND min < :thk_param " +
                "AND max >= :thk_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(RelHighAlloy.class);
        query.setParameter("std_param", relSteelHighAlloyQuery.getStd())
                .setParameter("name_param", relSteelHighAlloyQuery.getName())
                .setParameter("type_param", relSteelHighAlloyQuery.getType())
                .setParameter("thk_param", relSteelHighAlloyQuery.getThk());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            RelHighAlloy relSteelHighAlloy = (RelHighAlloy) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> relSteelHighAlloyMap = relSteelHighAlloy.toMap();

            // 查询温度
            double temp = relSteelHighAlloyQuery.getTemp();

            double designRel = NBT470031Tool.calDesign(temp, relSteelHighAlloyMap);

            return new RelHighAlloyResult(designRel);

        } else {
            return new RelHighAlloyResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
