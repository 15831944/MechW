package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.entity.db.gbt112632017.Table_1;
import com.mechw.entity.db.gbt112632017.Table_2;
import com.mechw.model.db.gbt112632017.table_1.Table_1_Query;
import com.mechw.model.db.gbt112632017.table_1.Table_1_thkMax;
import com.mechw.model.db.gbt112632017.table_2.Table_2_Query;
import com.mechw.model.db.gbt112632017.table_2.Table_2_thkMax;
import com.mechw.service.db.gbt112632017.table_1.Table_1Service;
import com.mechw.service.db.gbt112632017.table_2.Table_2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class GBT112632017 extends CommonController {

    private Table_1Service table_1Service;

    private Table_2Service table_2Service;

    @Autowired
    public GBT112632017(Table_1Service table_1Service, Table_2Service table_2Service) {
        this.table_1Service = table_1Service;
        this.table_2Service = table_2Service;
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_11263_2017_list_table_1_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table1Norms(@RequestBody String receivedData) throws Exception {

        Table_1_thkMax input = gson.fromJson(receivedData, Table_1_thkMax.class);
        List results = table_1Service.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_11263_2017_get_table_1_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table1Details(@RequestBody String receivedData) throws Exception {

        Table_1_Query input = gson.fromJson(receivedData, Table_1_Query.class);
        Table_1 table_1 = table_1Service.getDetails(input);
        return gson.toJson(table_1);
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_11263_2017_list_table_2_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table2Norms(@RequestBody String receivedData) throws Exception {

        Table_2_thkMax input = gson.fromJson(receivedData, Table_2_thkMax.class);
        List results = table_2Service.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_11263_2017_get_table_2_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table2Details(@RequestBody String receivedData) throws Exception {

        Table_2_Query input = gson.fromJson(receivedData, Table_2_Query.class);
        Table_2 table_2 = table_2Service.getDetails(input);
        return gson.toJson(table_2);
    }
}
