package com.mechw.service.db.gbt1502011.chart.chart_5_12;

import com.mechw.dao.db.gbt1502011.chart.chart_5_12.Chart_5_12DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Chart_5_12ServiceImpl implements Chart_5_12Service {

    private Chart_5_12DAO chart_5_12DAO;

    @Autowired
    public Chart_5_12ServiceImpl(Chart_5_12DAO chart_5_12DAO) {
        this.chart_5_12DAO = chart_5_12DAO;
    }

    @Override
    public double getQ1(double alpha, double thkrl) {
        return this.chart_5_12DAO.getQ1(alpha, thkrl);
    }
}
