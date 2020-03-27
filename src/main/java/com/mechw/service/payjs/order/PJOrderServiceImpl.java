package com.mechw.service.payjs.order;

import com.mechw.dao.payjs.order.PJOrderDAO;
import com.mechw.entity.payjs.PJOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PJOrderServiceImpl implements PJOrderService {

    private PJOrderDAO pjOrderDAO;

    @Autowired
    public PJOrderServiceImpl(PJOrderDAO pjOrderDAO) {
        this.pjOrderDAO = pjOrderDAO;
    }

    @Override
    @Transactional
    public void insOrder(PJOrder pjOrder) {
        pjOrderDAO.insOrder(pjOrder);
    }

    @Override
    @Transactional
    public void setOrderStatus(String outTradeNo, int status, String wechatOrderID) {
        pjOrderDAO.setOrderStatus(outTradeNo, status, wechatOrderID);
    }

    @Override
    public int getOrderStatus(String outTradeNo) {
        return pjOrderDAO.getOrderStatus(outTradeNo);
    }

    @Override
    public void setOrderCanceled(String payjsOrderId) {
        pjOrderDAO.setOrderCanceled(payjsOrderId);
    }

    @Override
    public String getDocxLink(String outTradeNo) {
        return pjOrderDAO.getDocxLink(outTradeNo);
    }

    @Override
    public String getASMPRTLink(String outTradeNo) {
        return pjOrderDAO.getASMPRTLink(outTradeNo);
    }
}
