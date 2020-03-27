package com.mechw.dao.payjs.product;

import com.mechw.entity.payjs.PJProduct;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("PJProductDAO")
public class PJProductDAOImpl implements PJProductDAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    // 根据前台传来的 ribbonName 查询商品标题和售价
    @Override
    public PJProduct getPJProduct(String ribbonName) {

        String sql = "SELECT * FROM payjs.payjs_product WHERE ribbon_name = :ribbon_name_param";

        NativeQuery query = getSession().createNativeQuery(sql).addEntity(PJProduct.class);
        query.setParameter("ribbon_name_param", ribbonName);

        if (query.list().size() > 0) {
            return (PJProduct) query.list().get(0);
        } else {
            return null;
        }
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
