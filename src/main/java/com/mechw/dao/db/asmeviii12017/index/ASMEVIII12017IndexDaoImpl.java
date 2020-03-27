package com.mechw.dao.db.asmeviii12017.index;

import com.mechw.entity.db.asmeviii12017.ASMEVIII12017Index;
import com.mechw.model.db.asmeviii12017.index.IndexQuery;
import com.mechw.model.db.asmeviii12017.index.MaterialNameQuery;
import com.mechw.model.db.asmeviii12017.index.ProductFormQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("ASMEVIII12017IndexDao")
public class ASMEVIII12017IndexDaoImpl implements ASMEVIII12017IndexDao {

    @Resource
    private SessionFactory sessionFactory;

    public ASMEVIII12017IndexDaoImpl() {
    }

    @Override
    public List listMaterialName(MaterialNameQuery materialNameQuery) {
        String sql = "SELECT DISTINCT material_name FROM asme_bpvc_viii_1_2017.index " +
                "WHERE temp_max_viii_1 >= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("material_name", StandardBasicTypes.STRING);
        query.setParameter("temp_param", materialNameQuery.getTemp());
        return query.list();
    }

    @Override
    public List listProductForm(ProductFormQuery productFormQuery) {
        String sql = "SELECT DISTINCT product_form FROM asme_bpvc_viii_1_2017.index " +
                "WHERE material_name= :material_name_param " +
                "AND temp_max_viii_1 >= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("product_form", StandardBasicTypes.STRING);
        query.setParameter("material_name_param", productFormQuery.getMaterialName())
                .setParameter("temp_param", productFormQuery.getTemp());
        return query.list();
    }

    @Override
    public ASMEVIII12017Index getIndex(IndexQuery indexQuery) {
        String sql = "SELECT * FROM asme_bpvc_viii_1_2017.index " +
                "WHERE material_name= :material_name_param " +
                "AND product_form = :product_form_param AND temp_max_viii_1 >= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(ASMEVIII12017Index.class);
        query.setParameter("material_name_param", indexQuery.getMaterialName())
                .setParameter("product_form_param", indexQuery.getProductForm())
                .setParameter("temp_param", indexQuery.getTemp());
        if (query.list().size() > 0) {
            return (ASMEVIII12017Index) query.list().get(0);
        } else {
            return null;
        }
    }

    private Session getSession() {
        return sessionFactory.getCurrentSession();
    }
}
