package com.mechw.dao.db.gbt1502011.property.index;

import com.mechw.entity.db.gbt1502011.property.Index;
import com.mechw.model.db.gbt1502011.property.index.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("IndexDao")
public class IndexDaoImpl implements IndexDao {

    @Resource
    private SessionFactory sessionFactory;

    public IndexDaoImpl() {
    }

    @Override
    public List listCategory(CategoryQuery categoryQuery) {

        String sql = "SELECT DISTINCT category FROM gbt_150_2011.index " +
                "WHERE temp_max >= :temp_param AND temp_min <= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("category", StandardBasicTypes.STRING);
        query.setParameter("temp_param", categoryQuery.getTemp());
        return query.list();
    }

    @Override
    public List listType(TypeQuery typeQuery) {

        String sql = "SELECT DISTINCT type FROM gbt_150_2011.index " +
                "WHERE category = :category_param " +
                "AND temp_max >= :temp_param AND temp_min <= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("type", StandardBasicTypes.STRING);
        query.setParameter("category_param", typeQuery.getCategory())
                .setParameter("temp_param", typeQuery.getTemp());
        return query.list();
    }

    @Override
    public List listSTD(STDQuery stdQuery) {

        String sql = "SELECT DISTINCT std FROM gbt_150_2011.index " +
                "WHERE category = :category_param AND type = :type_param " +
                "AND temp_max >= :temp_param AND temp_min <= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("std", StandardBasicTypes.STRING);
        query.setParameter("category_param", stdQuery.getCategory())
                .setParameter("type_param", stdQuery.getType())
                .setParameter("temp_param", stdQuery.getTemp());
        return query.list();
    }

    @Override
    public List listName(NameQuery nameQuery) {

        String sql = "SELECT DISTINCT name FROM gbt_150_2011.index " +
                "WHERE category = :category_param AND type = :type_param AND std = :std_param " +
                "AND temp_max >= :temp_param AND temp_min <= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("name", StandardBasicTypes.STRING);
        query.setParameter("category_param", nameQuery.getCategory())
                .setParameter("type_param", nameQuery.getType())
                .setParameter("std_param", nameQuery.getStd())
                .setParameter("temp_param", nameQuery.getTemp());
        return query.list();
    }

    @Override
    public Index getIndex(IndexQuery indexQuery) {

        String sql = "SELECT * FROM gbt_150_2011.index " +
                "WHERE category = :category_param AND type = :type_param AND std = :std_param AND name = :name_param " +
                "AND temp_max >= :temp_param AND temp_min <= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Index.class);
        query.setParameter("category_param", indexQuery.getCategory())
                .setParameter("type_param", indexQuery.getType())
                .setParameter("std_param", indexQuery.getStd())
                .setParameter("name_param", indexQuery.getName())
                .setParameter("temp_param", indexQuery.getTemp());
        return (Index) query.list().get(0);
    }

    private Session getSession() {
        return sessionFactory.getCurrentSession();
    }
}
