package com.mechw.service.db.gbt1502011.chart.chart_5_15;

import com.mechw.dao.db.gbt1502011.chart.chart_5_15.Chart_5_15DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class Chart_5_15ServiceImpl implements Chart_5_15Service {

    private Chart_5_15DAO chart_5_15DAO;

    @Autowired
    public Chart_5_15ServiceImpl(Chart_5_15DAO chart_5_15DAO) {
        this.chart_5_15DAO = chart_5_15DAO;
    }

    @Override
    public double getQ2(double alpha, double thkrs) {
        return this.chart_5_15DAO.getQ2(alpha, thkrs);
    }
}
