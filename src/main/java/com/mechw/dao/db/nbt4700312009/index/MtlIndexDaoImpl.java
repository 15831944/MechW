package com.mechw.dao.db.nbt4700312009.index;

import com.mechw.entity.db.nbt4700312009.property.Index;
import com.mechw.model.db.nbt4700312009.property.index.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("MtlIndexDao")
public class MtlIndexDaoImpl implements MtlIndexDao {

    @Resource
    private SessionFactory sessionFactory;

    public MtlIndexDaoImpl() {
    }

    @Override
    public List listCategory(Temp temp) {

        String sql = "SELECT DISTINCT category " +
                "FROM nbt_47003_1_2009.index " +
                "WHERE temp_max >= :temp_param " +
                "AND temp_min <= :temp_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("category", StandardBasicTypes.STRING);
        query.setParameter("temp_param", temp.getTemp());
        return query.list();
    }

    @Override
    public List listType(Category category) {

        String sql = "SELECT DISTINCT type " +
                "FROM nbt_47003_1_2009.index " +
                "WHERE category= :category_param " +
                "AND temp_max >= :temp_param " +
                "AND temp_min <= :temp_param";

        NativeQuery query = getSession().createNativeQuery(sql).addScalar("type", StandardBasicTypes.STRING);
        query.setParameter("category_param", category.getCategory())
                .setParameter("temp_param", category.getTemp());

        return query.list();

    }

    @Override
    public List listSTD(Type type) {

        String sql = "SELECT DISTINCT std " +
                "FROM nbt_47003_1_2009.index " +
                "WHERE category = :category_param " +
                "AND type = :type_param " +
                "AND temp_max >= :temp_param " +
                "AND temp_min <= :temp_param";

        NativeQuery query = getSession().createNativeQuery(sql).addScalar("std", StandardBasicTypes.STRING);
        query.setParameter("category_param", type.getCategory())
                .setParameter("type_param", type.getType())
                .setParameter("temp_param", type.getTemp());

        return query.list();
    }

    @Override
    public List listName(STD std) {

        String sql = "SELECT DISTINCT name " +
                "FROM nbt_47003_1_2009.index " +
                "WHERE category = :category_param " +
                "AND type = :type_param " +
                "AND std = :std_param " +
                "AND temp_max >= :temp_param " +
                "AND temp_min <= :temp_param";

        NativeQuery query = getSession().createNativeQuery(sql).addScalar("name", StandardBasicTypes.STRING);
        query.setParameter("category_param", std.getCategory())
                .setParameter("type_param", std.getType())
                .setParameter("std_param", std.getStd())
                .setParameter("temp_param", std.getTemp());

        return query.list();
    }

    @Override
    public Index getIndex(Name name) {

        String sql = "SELECT * " +
                "FROM nbt_47003_1_2009.index " +
                "WHERE category = :category_param " +
                "AND type = :type_param " +
                "AND std = :std_param " +
                "AND name = :name_param " +
                "AND temp_max >= :temp_param " +
                "AND temp_min <= :temp_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(Index.class);
        query.setParameter("category_param", name.getCategory())
                .setParameter("type_param", name.getType())
                .setParameter("std_param", name.getStd())
                .setParameter("name_param", name.getName())
                .setParameter("temp_param", name.getTemp());

        if (query.list().size() > 0) {
            return (Index) query.list().get(0);
        } else {
            return null;
        }

    }

    private Session getSession() {
        return sessionFactory.getCurrentSession();
    }

}
