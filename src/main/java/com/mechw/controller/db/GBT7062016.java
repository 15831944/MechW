package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.entity.db.gbt7062016.Table_a_1;
import com.mechw.entity.db.gbt7062016.Table_a_2;
import com.mechw.entity.db.gbt7062016.Table_a_3;
import com.mechw.entity.db.gbt7062016.Table_a_4;
import com.mechw.model.db.gbt7062016.table_a_1.Table_a_1_Query;
import com.mechw.model.db.gbt7062016.table_a_1.Table_a_1_thkMax;
import com.mechw.model.db.gbt7062016.table_a_2.Table_a_2_Query;
import com.mechw.model.db.gbt7062016.table_a_2.Table_a_2_thkMax;
import com.mechw.model.db.gbt7062016.table_a_3.Table_a_3_Query;
import com.mechw.model.db.gbt7062016.table_a_3.Table_a_3_thkMax;
import com.mechw.model.db.gbt7062016.table_a_4.Table_a_4_Query;
import com.mechw.model.db.gbt7062016.table_a_4.Table_a_4_thkMax;
import com.mechw.service.db.gbt7062016.table_a_1.Table_a_1Service;
import com.mechw.service.db.gbt7062016.table_a_2.Table_a_2Service;
import com.mechw.service.db.gbt7062016.table_a_3.Table_a_3Service;
import com.mechw.service.db.gbt7062016.table_a_4.Table_a_4Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class GBT7062016 extends CommonController {

    private Table_a_1Service table_a_1Service;
    private Table_a_2Service table_a_2Service;
    private Table_a_3Service table_a_3Service;
    private Table_a_4Service table_a_4Service;

    @Autowired
    public GBT7062016(Table_a_1Service table_a_1Service, Table_a_2Service table_a_2Service, Table_a_3Service table_a_3Service, Table_a_4Service table_a_4Service) {
        this.table_a_1Service = table_a_1Service;
        this.table_a_2Service = table_a_2Service;
        this.table_a_3Service = table_a_3Service;
        this.table_a_4Service = table_a_4Service;
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_list_table_a1_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA1Norms(@RequestBody String receivedData) throws Exception {

        Table_a_1_thkMax input = gson.fromJson(receivedData, Table_a_1_thkMax.class);
        List results = table_a_1Service.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_get_table_a1_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA1Details(@RequestBody String receivedData) throws Exception {

        Table_a_1_Query input = gson.fromJson(receivedData, Table_a_1_Query.class);
        Table_a_1 table_a_1 = table_a_1Service.getDetails(input);
        return gson.toJson(table_a_1);
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_list_table_a2_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA2Norms(@RequestBody String receivedData) throws Exception {
        Table_a_2_thkMax input = gson.fromJson(receivedData, Table_a_2_thkMax.class);
        List results = table_a_2Service.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_get_table_a2_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA2Details(@RequestBody String receivedData) throws Exception {

        Table_a_2_Query input = gson.fromJson(receivedData, Table_a_2_Query.class);
        Table_a_2 table_a_2 = table_a_2Service.getDetails(input);
        return gson.toJson(table_a_2);
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_list_table_a3_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA3Norms(@RequestBody String receivedData) throws Exception {
        Table_a_3_thkMax input = gson.fromJson(receivedData, Table_a_3_thkMax.class);
        List results = table_a_3Service.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_get_table_a3_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA3Details(@RequestBody String receivedData) throws Exception {

        Table_a_3_Query input = gson.fromJson(receivedData, Table_a_3_Query.class);
        Table_a_3 table_a_3 = table_a_3Service.getDetails(input);
        return gson.toJson(table_a_3);
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_list_table_a4_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA4Norms(@RequestBody String receivedData) throws Exception {

        Table_a_4_thkMax input = gson.fromJson(receivedData, Table_a_4_thkMax.class);
        List results = table_a_4Service.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_706_2016_get_table_a4_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String TableA4Details(@RequestBody String receivedData) throws Exception {

        Table_a_4_Query input = gson.fromJson(receivedData, Table_a_4_Query.class);
        Table_a_4 table_a_4 = table_a_4Service.getDetails(input);
        return gson.toJson(table_a_4);
    }
}
