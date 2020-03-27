package com.mechw.dao.db.toolkit.hgt206602017;

import com.mechw.entity.db.toolkit.HGT206602017;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("HGT206602017Dao")
public class HGT206602017DaoImpl implements HGT206602017Dao {

    @Resource
    private SessionFactory sessionFactory;

    public HGT206602017DaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List<HGT206602017> findAll() {

        String sql = "SELECT * FROM toolkit.hgt_20660_2017 WHERE line_no IN (SELECT MIN(line_no) FROM toolkit.hgt_20660_2017 GROUP BY name_chn)";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HGT206602017.class);
        return query.list();

    }

    @Override
    public List<HGT206602017> findByName(String name) {

        String sql = "SELECT * " +
                "FROM toolkit.hgt_20660_2017 " +
                "WHERE line_no IN (SELECT MIN(line_no) FROM toolkit.hgt_20660_2017 GROUP BY name_chn) " +
                "AND (name_chn LIKE :searchName " +
                "OR aliases LIKE :searchName " +
                "OR name_en LIKE :searchName " +
                "OR formula LIKE :searchName)";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HGT206602017.class);
        query.setParameter("searchName", "%" + name + "%");
        return query.list();

    }

    @Override
    public List<HGT206602017> findByToxicity(String toxicity) {

        String sql = "SELECT * " +
                "FROM toolkit.hgt_20660_2017 " +
                "WHERE line_no IN (SELECT MIN(line_no) FROM toolkit.hgt_20660_2017 GROUP BY name_chn) AND toxicity = :toxicityVal";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HGT206602017.class);
        query.setParameter("toxicityVal", toxicity);
        return query.list();

    }

    @Override
    public List<HGT206602017> findByExplosion(String explosion) {

        String sql = "SELECT * " +
                "FROM toolkit.hgt_20660_2017 " +
                "WHERE line_no IN (SELECT MIN(line_no) FROM toolkit.hgt_20660_2017 GROUP BY name_chn) AND explosion = :explosionVal";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HGT206602017.class);
        query.setParameter("explosionVal", explosion);
        return query.list();

    }

    @Override
    public List<HGT206602017> findByToxicityAndExplosion(String toxicity, String explosion) {

        String sql = "SELECT * " +
                "FROM toolkit.hgt_20660_2017 " +
                "WHERE line_no IN (SELECT MIN(line_no) FROM toolkit.hgt_20660_2017 GROUP BY name_chn) AND explosion = :explosionVal " +
                "AND toxicity = :toxicityVal";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HGT206602017.class);
        query.setParameter("explosionVal", explosion).setParameter("toxicityVal", toxicity);
        return query.list();

    }

    public SessionFactory getSessionFactory() {
        return this.sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
