package com.mechw.service.db.gbt1502011.chart.chart_5_14;

import com.mechw.dao.db.gbt1502011.chart.chart_5_14.Chart_5_14DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Chart_5_14ServiceImpl implements Chart_5_14Service {

    private Chart_5_14DAO chart_5_14DAO;

    @Autowired
    public Chart_5_14ServiceImpl(Chart_5_14DAO chart_5_14DAO) {
        this.chart_5_14DAO = chart_5_14DAO;
    }

    @Override
    public double getQ2(double alpha, double thkrs) {
        return this.chart_5_14DAO.getQ2(alpha, thkrs);
    }
}
