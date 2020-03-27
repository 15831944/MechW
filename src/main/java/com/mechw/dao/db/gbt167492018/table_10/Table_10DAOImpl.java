package com.mechw.dao.db.gbt167492018.table_10;

import com.mechw.model.db.gbt167492018.table_10.Table_10_Query;
import com.mechw.model.db.gbt167492018.table_10.Table_10_Result;
import com.mechw.service.Array;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Arrays;

/**
 * @Description 表 7 查询类
 * @Author lishaoyan@mechw.com
 * @Date 2018/11/6 16:55
 * @Version 1.0
 */
@Transactional
@Repository("Table_10DAO")
public class Table_10DAOImpl implements Table_10DAO {

    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Table_10_Result query(Table_10_Query table_10_query) {

        //数据库为整数，乘以相应倍数
        double rm2h = table_10_query.getRm2h() * 100;
        double rm182dmtp = table_10_query.getRm182dmtp() * 10;

        // 获取 rm2h[]
        NativeQuery query_rm2h = this.getSession().createNativeQuery("SELECT DISTINCT `2rm_h` FROM gbt_16749_2018.table_10");
        double[] rm2hs = Arrays.stream(query_rm2h.list().toArray()).mapToDouble(o -> (double) o).toArray();

        // rm2h 恰好是节点值
        if (Array.isContains(rm2hs, rm2h)) {

            // 获取 rm182dmtp[]
            NativeQuery query_rm182dmtp = this.getSession().createNativeQuery(
                    "SELECT DISTINCT `182rm_dmtp` FROM gbt_16749_2018.table_10 WHERE `2rm_h`=:rm2h_param");
            query_rm182dmtp.setParameter("rm2h_param", rm2h);
            double[] rm182dmtps = Arrays.stream(query_rm182dmtp.list().toArray()).mapToDouble(o -> (double) o).toArray();

            // rm182dmtp 恰好是节点值
            if (Array.isContains(rm182dmtps, rm182dmtp)) {
                NativeQuery query_1 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                        "WHERE `2rm_h`=:rm2h_param " +
                        "AND `182rm_dmtp` = :rm182dmtp_param");
                query_1.setParameter("rm2h_param", rm2h)
                        .setParameter("rm182dmtp_param", rm182dmtp);
                return new Table_10_Result((double) query_1.list().get(0));
            }

            /*
             * rm182dmtp 不是节点值
             */
            // rm182dmtp 插值
            double rm182dmtpUpperMin = Array.getUpper(rm182dmtps, rm182dmtp);
            double rm182dmtpLowerMax = Array.getLower(rm182dmtps, rm182dmtp);

            NativeQuery query_2 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`= :rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_2.setParameter("rm2h_param", rm2h)
                    .setParameter("rm182dmtp_param", rm182dmtpLowerMax);
            double cpLowerMax = (double) query_2.list().get(0);

            NativeQuery query_3 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`=:rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_3.setParameter("rm2h_param", rm2h)
                    .setParameter("rm182dmtp_param", rm182dmtpUpperMin);
            double cpUpperMin = (double) query_3.list().get(0);

            return new Table_10_Result(cpLowerMax + (rm182dmtp - rm182dmtpLowerMax) / (rm182dmtpUpperMin - rm182dmtpLowerMax) * (cpUpperMin - cpLowerMax));
        }

        /*
         * rm2h 不是节点值
         */

        // 上端rm2h及 cpUpper
        double rm2hUpperMin = Array.getUpper(rm2hs, rm2h);
        NativeQuery query_4 = this.getSession().createNativeQuery(
                "SELECT DISTINCT `182rm_dmtp` FROM gbt_16749_2018.table_10 WHERE `2rm_h`=:rm2h_param");
        query_4.setParameter("rm2h_param", rm2hUpperMin);
        double[] rm182dmtpUps = Arrays.stream(query_4.list().toArray()).mapToDouble(o -> (double) o).toArray();

        double cpUpper;

        if (Array.isContains(rm182dmtpUps, rm182dmtp)) {
            NativeQuery query_5 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`=:rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_5.setParameter("rm2h_param", rm2hUpperMin)
                    .setParameter("rm182dmtp_param", rm182dmtp);
            cpUpper = (double) query_5.list().get(0);

        } else {

            double rm182dmtpUpperMin = Array.getUpper(rm182dmtpUps, rm182dmtp);
            double rm182dmtpLowerMax = Array.getLower(rm182dmtpUps, rm182dmtp);

            NativeQuery query_6 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`=:rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_6.setParameter("rm2h_param", rm2hUpperMin)
                    .setParameter("rm182dmtp_param", rm182dmtpLowerMax);
            double cpUpperLowerMax = (double) query_6.list().get(0);

            NativeQuery query_7 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`=:rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_7.setParameter("rm2h_param", rm2hUpperMin)
                    .setParameter("rm182dmtp_param", rm182dmtpUpperMin);
            double cpUpperUpperMin = (double) query_7.list().get(0);

            cpUpper = cpUpperLowerMax + (rm182dmtp - rm182dmtpLowerMax) / (rm182dmtpUpperMin - rm182dmtpLowerMax) * (cpUpperUpperMin - cpUpperLowerMax);
        }


        // 下端rm2h及 cpLower
        double rm2hLowerMax = Array.getLower(rm2hs, rm2h);

        // 获取横坐标节点数组 rm182dmtps
        NativeQuery query_rdil = this.getSession().createNativeQuery(
                "SELECT DISTINCT `182rm_dmtp` FROM gbt_16749_2018.table_10 WHERE `2rm_h`=:rm2h_param");
        query_rdil.setParameter("rm2h_param", rm2hLowerMax);
        double[] rm182dmtpLows = Arrays.stream(query_rdil.list().toArray()).mapToDouble(o -> (double) o).toArray();

        double cpLower;
        // 如果 rm182dmtp 恰好是节点值
        if (Array.isContains(rm182dmtpLows, rm182dmtp)) {
            NativeQuery query_1 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`=:rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_1.setParameter("rm2h_param", rm2hLowerMax)
                    .setParameter("rm182dmtp_param", rm182dmtp);
            cpLower = (double) query_1.list().get(0);
        } else { // rm182dmtp 需要插值

            double rm182dmtpUpperMin = Array.getUpper(rm182dmtpLows, rm182dmtp);
            double rm182dmtpLowerMax = Array.getLower(rm182dmtpLows, rm182dmtp);

            NativeQuery query_2 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`=:rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_2.setParameter("rm2h_param", rm2hLowerMax)
                    .setParameter("rm182dmtp_param", rm182dmtpLowerMax);
            double cpLowerLowerMax = (double) query_2.list().get(0);

            NativeQuery query_3 = this.getSession().createNativeQuery("SELECT cp FROM gbt_16749_2018.table_10 " +
                    "WHERE `2rm_h`=:rm2h_param " +
                    "AND `182rm_dmtp` = :rm182dmtp_param");
            query_3.setParameter("rm2h_param", rm2hLowerMax)
                    .setParameter("rm182dmtp_param", rm182dmtpUpperMin);
            double cpLowerUpperMin = (double) query_3.list().get(0);

            cpLower = cpLowerLowerMax + (rm182dmtp - rm182dmtpLowerMax) / (rm182dmtpUpperMin - rm182dmtpLowerMax) * (cpLowerUpperMin - cpLowerLowerMax);
        }

        return new Table_10_Result(cpLower + (rm2h - rm2hLowerMax) / (rm2hUpperMin - rm2hLowerMax) * (cpUpper - cpLower));
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
