package com.mechw.dao.db.asmeviii12017.stress;

import com.mechw.dao.db.asmeviii12017.ASMEVIII12017Tool;
import com.mechw.entity.db.asmeviii12017.ASMEVIII12017Stress;
import com.mechw.model.db.asmeviii12017.stress.ASMEVIII12017StressQuery;
import com.mechw.model.db.asmeviii12017.stress.ASMEVIII12017StressResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Transactional
@Repository("ASMEVIII12017StressDao")
public class ASMEVIII12017StressDaoImpl implements ASMEVIII12017StressDao {

    @Resource
    private SessionFactory sessionFactory;

    public ASMEVIII12017StressDaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public ASMEVIII12017StressResult queryASMEVIII12017Stress(ASMEVIII12017StressQuery asmeviii12017StressQuery) {
        String sql = "SELECT * FROM asme_bpvc_viii_1_2017.stress " +
                "WHERE material_name = :material_name_param AND product_form = :product_form_param " +
                "AND thk_min < :thk_param AND thk_max >= :thk_param " +
                "AND od_min < :od_param AND od_max >= :od_param " +
                "AND high_low%:high_low_param=0";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(ASMEVIII12017Stress.class);
        query.setParameter("material_name_param", asmeviii12017StressQuery.getMaterialName())
                .setParameter("product_form_param", asmeviii12017StressQuery.getProductForm())
                .setParameter("thk_param", asmeviii12017StressQuery.getThk())
                .setParameter("od_param", asmeviii12017StressQuery.getOd())
                .setParameter("high_low_param", asmeviii12017StressQuery.getHighLow());

        // 如果查询结果存在
        String nominalComposition, notes;
        Double rm, rel, tagTemp, designStress, tagStress, ambientStress;
        if (query.list().size() >= 1) {

            // 获取领域模型
            ASMEVIII12017Stress asmeviii12017Stress = (ASMEVIII12017Stress) query.list().get(0);

            // 将许用应力部分转化为 map 和 数组
            Map<Double, Double> asmeviii12017StressMap = asmeviii12017Stress.toMap();

            nominalComposition = asmeviii12017Stress.getNominalComposition();
            notes = asmeviii12017Stress.getNotes();
            rm = asmeviii12017Stress.getRm();
            rel = asmeviii12017Stress.getRel();
            tagTemp = asmeviii12017Stress.getTagTemp();

            double temp = asmeviii12017StressQuery.getTemp();
            designStress = ASMEVIII12017Tool.calDesign(temp, asmeviii12017StressMap);

            if (tagTemp != null) {
                tagStress = ASMEVIII12017Tool.calDesign(tagTemp, asmeviii12017StressMap);
            } else {
                tagTemp = -1.0;
                tagStress = -1.0;
            }

            ambientStress = ASMEVIII12017Tool.calDesign(20, asmeviii12017StressMap);

        } else {
            nominalComposition = "-1.0";
            notes = "-1.0";
            rm = -1.0;
            rel = -1.0;
            tagTemp = -1.0;
            designStress = -1.0;
            tagStress = -1.0;
            ambientStress = -1.0;
        }

        return new ASMEVIII12017StressResult(nominalComposition, notes, rm, rel, tagTemp, tagStress, designStress, ambientStress);
    }

    public SessionFactory getSessionFactory() {
        return this.sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

}
