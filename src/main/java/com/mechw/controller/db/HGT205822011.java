package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.model.db.hgt205822011.Table_3_2_Query;
import com.mechw.service.db.hgt205822011.table_3_2.Table_3_2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HGT205822011 extends CommonController {

    private Table_3_2Service table_3_2Service;

    @Autowired
    public HGT205822011(Table_3_2Service table_3_2Service) {
        this.table_3_2Service = table_3_2Service;
    }

    // 获取K
    @ResponseBody
    @RequestMapping(value = {"hgt_20582_2011_table_3_2_get_k.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String HGT205822011Table32GetK(@RequestBody String receivedData) throws Exception {

        Table_3_2_Query input = gson.fromJson(receivedData, Table_3_2_Query.class);
        double k = table_3_2Service.findK(input.getJacketDo(), input.getShellDi(), input.getShellThk());
        return gson.toJson(k);
    }
}
