package com.mechw.dao.db.nbt4700312009.rel.steel.carbon;

import com.mechw.dao.db.nbt4700312009.NBT470031Tool;
import com.mechw.entity.db.nbt4700312009.property.rel.RelCarbon;
import com.mechw.model.db.nbt4700312009.property.rel.steel.carbon.RelCarbonQuery;
import com.mechw.model.db.nbt4700312009.property.rel.steel.carbon.RelCarbonResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("RelCarbonDao")
public class RelCarbonDaoImpl implements RelCarbonDao {

    @Resource
    private SessionFactory sessionFactory;

    public RelCarbonDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public RelCarbonResult getDesignRel(RelCarbonQuery relSteelCarbonQuery) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.rel_steel_carbon " +
                "WHERE std = :std_param " +
                "AND name = :name_param " +
                "AND type = :type_param " +
                "AND min < :thk_param " +
                "AND max >= :thk_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(RelCarbon.class);
        query.setParameter("std_param", relSteelCarbonQuery.getStd())
                .setParameter("name_param", relSteelCarbonQuery.getName())
                .setParameter("type_param", relSteelCarbonQuery.getType())
                .setParameter("thk_param", relSteelCarbonQuery.getThk());

        // 如果查询结果存在
        if (query.list().size() >= 1) {

            // 获取领域模型
            RelCarbon relSteelCarbon = (RelCarbon) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> relSteelCarbonMap = relSteelCarbon.toMap();

            // 查询温度
            double designRel = NBT470031Tool.calDesign(relSteelCarbonQuery.getTemp(), relSteelCarbonMap);

            return new RelCarbonResult(designRel);

        } else {
            return new RelCarbonResult(-1.0);
        }

    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
