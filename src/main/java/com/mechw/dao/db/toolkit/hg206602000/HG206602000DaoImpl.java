package com.mechw.dao.db.toolkit.hg206602000;

import com.mechw.entity.db.toolkit.HG206602000;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("HG206602000Dao")
public class HG206602000DaoImpl implements HG206602000Dao {

    @Resource
    private SessionFactory sessionFactory;

    public HG206602000DaoImpl() {
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List<HG206602000> findAll() {

        String sql = "SELECT * FROM toolkit.hg_20660_2000";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HG206602000.class);
        return query.list();

    }

    @Override
    public List<HG206602000> findByName(String name) {

        String sql = "SELECT * FROM toolkit.hg_20660_2000 WHERE name LIKE :searchName";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HG206602000.class);
        query.setParameter("searchName", "%" + name + "%");
        return query.list();

    }

    @Override
    public List<HG206602000> findByToxicity(String toxicity) {

        String sql = "SELECT * FROM toolkit.hg_20660_2000 WHERE toxicity = :toxicityVal";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HG206602000.class);
        query.setParameter("toxicityVal", toxicity);
        return query.list();

    }

    @Override
    public List<HG206602000> findByExplosion(String explosion) {

        String sql = "SELECT * FROM toolkit.hg_20660_2000 WHERE explosion = :explosionVal";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HG206602000.class);
        query.setParameter("explosionVal", explosion);
        return query.list();

    }

    @Override
    public List<HG206602000> findByToxicityAndExplosion(String toxicity, String explosion) {

        String sql = "SELECT * FROM toolkit.hg_20660_2000 WHERE explosion = :explosionVal AND toxicity = :toxicityVal";
        NativeQuery query = getSession().createNativeQuery(sql).addEntity(HG206602000.class);
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
