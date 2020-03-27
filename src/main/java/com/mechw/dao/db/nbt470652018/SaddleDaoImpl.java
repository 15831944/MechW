package com.mechw.dao.db.nbt470652018;

import com.mechw.entity.db.nbt470652018.Saddle;
import com.mechw.model.db.nbt470652018.saddle.SaddleData;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Repository("SaddleDao")
public class SaddleDaoImpl implements SaddleDao {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List listDN(String mtl) {

        String sql = "SELECT DISTINCT dn FROM nbt_47065_2018.saddle ORDER BY dn";
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("dn", StandardBasicTypes.INTEGER);
        return query.list();
    }

    @Override
    public List listFabMethod(String mtl, Double dn, Double q) {

        String sql;
        if ("Q235B".equals(mtl)) {
            sql = "SELECT DISTINCT fab_method FROM nbt_47065_2018.saddle WHERE q235_q >= :q_param AND dn= :dn_param";
        } else {
            sql = "SELECT DISTINCT fab_method FROM nbt_47065_2018.saddle WHERE q345_q >= :q_param AND dn= :dn_param";
        }
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("fab_method", StandardBasicTypes.STRING);
        query.setParameter("dn_param", dn)
                .setParameter("q_param", q);
        return query.list();
    }

    @Override
    public List listPad(String mtl, Double dn, Double q, String fabMethod) {

        String sql;
        if ("Q235B".equals(mtl)) {
            sql = "SELECT DISTINCT pad FROM nbt_47065_2018.saddle WHERE q235_q >= :q_param AND dn= :dn_param AND fab_method= :fab_method_param";
        } else {
            sql = "SELECT DISTINCT pad FROM nbt_47065_2018.saddle WHERE q345_q >= :q_param AND dn= :dn_param AND fab_method= :fab_method_param";
        }
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("pad", StandardBasicTypes.STRING);
        query.setParameter("dn_param", dn)
                .setParameter("q_param", q)
                .setParameter("fab_method_param", fabMethod);
        return query.list();
    }

    @Override
    public List listAngle(String mtl, Double dn, Double q, String fabMethod, String pad) {

        String sql;
        if ("Q235B".equals(mtl)) {
            sql = "SELECT DISTINCT angle FROM nbt_47065_2018.saddle " +
                    "WHERE q235_q >= :q_param " +
                    "AND dn= :dn_param " +
                    "AND fab_method= :fab_method_param " +
                    "AND pad= :pad_param";
        } else {
            sql = "SELECT DISTINCT angle FROM nbt_47065_2018.saddle " +
                    "WHERE q345_q >= :q_param " +
                    "AND dn= :dn_param " +
                    "AND fab_method= :fab_method_param " +
                    "AND pad= :pad_param";
        }
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("angle", StandardBasicTypes.INTEGER);
        query.setParameter("q_param", q)
                .setParameter("dn_param", dn)
                .setParameter("fab_method_param", fabMethod)
                .setParameter("pad_param", pad);
        return query.list();
    }

    @Override
    public List listSymbol(String mtl, Double dn, Double q, String fabMethod, String pad, Double angle) {

        String sql;
        if ("Q235B".equals(mtl)) {
            sql = "SELECT DISTINCT symbol FROM nbt_47065_2018.saddle " +
                    "WHERE q235_q >= :q_param " +
                    "AND dn= :dn_param " +
                    "AND fab_method= :fab_method_param " +
                    "AND pad= :pad_param " +
                    "AND angle= :angle_param";
        } else {
            sql = "SELECT DISTINCT symbol FROM nbt_47065_2018.saddle " +
                    "WHERE q345_q >= :q_param " +
                    "AND dn= :dn_param " +
                    "AND fab_method= :fab_method_param " +
                    "AND pad= :pad_param " +
                    "AND angle= :angle_param";
        }
        NativeQuery query = this.getSession().createNativeQuery(sql).addScalar("symbol", StandardBasicTypes.STRING);
        query.setParameter("q_param", q)
                .setParameter("dn_param", dn)
                .setParameter("fab_method_param", fabMethod)
                .setParameter("pad_param", pad)
                .setParameter("angle_param", angle);
        return query.list();
    }

    @Override
    public SaddleData getData(String mtl, Double dn, Double q, String fabMethod, String pad, Double angle, String symbol) {

        String sql;
        if ("Q235B".equals(mtl)) {
            sql = "SELECT * FROM nbt_47065_2018.saddle " +
                    "WHERE q235_q >= :q_param " +
                    "AND dn= :dn_param " +
                    "AND fab_method= :fab_method_param " +
                    "AND pad= :pad_param " +
                    "AND angle= :angle_param " +
                    "AND symbol= :symbol_param ";
        } else {
            sql = "SELECT * FROM nbt_47065_2018.saddle " +
                    "WHERE q345_q >= :q_param " +
                    "AND dn= :dn_param " +
                    "AND fab_method= :fab_method_param " +
                    "AND pad= :pad_param " +
                    "AND angle= :angle_param " +
                    "AND symbol= :symbol_param ";
        }
        NativeQuery query = this.getSession().createNativeQuery(sql).addEntity(Saddle.class);
        query.setParameter("q_param", q)
                .setParameter("dn_param", dn)
                .setParameter("fab_method_param", fabMethod)
                .setParameter("pad_param", pad)
                .setParameter("angle_param", angle)
                .setParameter("symbol_param", symbol);
        Saddle saddle = (Saddle) query.list().get(0);
        return saddle.toSaddleData(q);
    }
}
