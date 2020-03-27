package com.mechw.dao.payjs.order;

import com.mechw.entity.payjs.PJOrder;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Repository("PJOrderDAO")
public class PJOrderDAOImpl implements PJOrderDAO {

    @Resource
    private SessionFactory sessionFactory;

    // 生成二维码之后，插入一个新订单，状态为0 未付款
    @Override
    @Transactional
    public void insOrder(PJOrder pjOrder) {

        String sql = "INSERT INTO payjs.payjs_order(`line_no`, `out_trade_no`, `payjs_order_no`, `wechat_order_no`, `ribbon_name`, `title`, `total_fee`, `status`, `canceled`, `dl_link`) " +
                "VALUES(NULL, :out_trade_no_param, :payjs_order_no_param, :wechat_order_no_param, :ribbon_name_param, :title_param, :total_fee_param, :status_param, :canceled_param, :dl_link_param)";
        NativeQuery query = getSession().createNativeQuery(sql);
        query.setParameter("out_trade_no_param", pjOrder.getOutTradeNo())
                .setParameter("payjs_order_no_param", pjOrder.getPayjsOrderNo())
                .setParameter("wechat_order_no_param", pjOrder.getWechatOrderNo())
                .setParameter("ribbon_name_param", pjOrder.getRibbonName())
                .setParameter("title_param", pjOrder.getTitle())
                .setParameter("total_fee_param", pjOrder.getTotalFee())
                .setParameter("status_param", pjOrder.getStatus())
                .setParameter("canceled_param", pjOrder.getCanceled())
                .setParameter("dl_link_param", pjOrder.getDlLink());

        query.executeUpdate();
    }

    // 接收到回调后，更改订单状态为 1 已付款
    @Override
    @Transactional
    public void setOrderStatus(String outTradeNo, int status, String wechatOrderID) {

        String sql = "UPDATE payjs.`payjs_order` set status = :status_param, wechat_order_no = :wechat_order_no_param " +
                "WHERE out_trade_no = :out_trade_no_param";
        NativeQuery query = getSession().createNativeQuery(sql);
        query.setParameter("out_trade_no_param", outTradeNo)
                .setParameter("wechat_order_no_param", wechatOrderID)
                .setParameter("status_param", status);

        query.executeUpdate();
    }

    // 查询订单状态
    @Override
    public int getOrderStatus(String outTradeNo) {

        String sql = "SELECT status FROM payjs.`payjs_order` WHERE out_trade_no = :out_trade_no_param";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("status", StandardBasicTypes.INTEGER);
        query.setParameter("out_trade_no_param", outTradeNo);

        return (Integer) query.list().get(0);
    }

    // 将订单设定为 canceled 状态
    @Override
    public void setOrderCanceled(String payjsOrderId) {
        String sql = "UPDATE payjs.`payjs_order` set canceled = 1 WHERE payjs_order_no = :payjs_order_no_param";
        NativeQuery query = getSession().createNativeQuery(sql);
        query.setParameter("payjs_order_no_param", payjsOrderId);

        query.executeUpdate();
    }

    // 获取订单下载链接
    @Override
    public String getDocxLink(String outTradeNo) {

        String sql = "SELECT dl_link FROM payjs.`payjs_order` WHERE out_trade_no = :out_trade_no_param AND status = 1";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("dl_link", StandardBasicTypes.STRING);
        query.setParameter("out_trade_no_param", outTradeNo);

        return (String) query.list().get(0);
    }

    // 获取订单下载链接
    @Override
    public String getASMPRTLink(String outTradeNo) {

        String sql = "SELECT dl_link FROM payjs.`payjs_order` WHERE out_trade_no = :out_trade_no_param AND status = 1";
        NativeQuery query = getSession().createNativeQuery(sql).addScalar("dl_link", StandardBasicTypes.STRING);
        query.setParameter("out_trade_no_param", outTradeNo);

        return (String) query.list().get(0);
    }

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
