package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.model.db.hgt205692013.Table_b_4_2Query;
import com.mechw.model.db.hgt205692013.Table_b_4_2Result;
import com.mechw.service.db.hgt205692013.table_b_4_2.Table_b_4_2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HGT205692013 extends CommonController {

    private Table_b_4_2Service table_b_4_2Service;

    @Autowired
    public HGT205692013(Table_b_4_2Service table_b_4_2Service) {
        this.table_b_4_2Service = table_b_4_2Service;
    }

    // 获取4个函数值
    @ResponseBody
    @RequestMapping(value = {"hgt_20569_2013_table_b_4_2_get_all.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String HGT205692013TableB42GetAll(@RequestBody String receivedData) throws Exception {

        Table_b_4_2Query input = gson.fromJson(receivedData, Table_b_4_2Query.class);
        Table_b_4_2Result result = table_b_4_2Service.find(input.getU());
        return gson.toJson(result);
    }
}
