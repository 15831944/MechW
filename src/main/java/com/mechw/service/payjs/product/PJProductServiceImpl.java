package com.mechw.service.payjs.product;

import com.mechw.dao.payjs.product.PJProductDAO;
import com.mechw.entity.payjs.PJProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PJProductServiceImpl implements PJProductService {

    private PJProductDAO pjProductDAO;

    @Autowired
    public PJProductServiceImpl(PJProductDAO pjProductDAO) {
        this.pjProductDAO = pjProductDAO;
    }

    @Override
    public PJProduct getPJProduct(String ribbonName) {
        return pjProductDAO.getPJProduct(ribbonName);
    }
}
