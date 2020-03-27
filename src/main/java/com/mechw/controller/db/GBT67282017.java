package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.entity.db.gbt67282017.Table_1_F;
import com.mechw.entity.db.gbt67282017.Table_2_J;
import com.mechw.entity.db.gbt67282017.Table_3_Y;
import com.mechw.model.db.gbt67282017.table_1_f.Table_1_F_Query;
import com.mechw.model.db.gbt67282017.table_1_f.Table_1_F_thkMax;
import com.mechw.model.db.gbt67282017.table_2_j.Table_2_J_Query;
import com.mechw.model.db.gbt67282017.table_2_j.Table_2_J_thkMax;
import com.mechw.model.db.gbt67282017.table_3_y.Table_3_Y_Query;
import com.mechw.model.db.gbt67282017.table_3_y.Table_3_Y_thkMax;
import com.mechw.service.db.gbt67282017.table_1_f.Table_1_FService;
import com.mechw.service.db.gbt67282017.table_2_j.Table_2_JService;
import com.mechw.service.db.gbt67282017.table_3_y.Table_3_YService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class GBT67282017 extends CommonController {

    private Table_1_FService table_1_FService;

    private Table_2_JService table_2_JService;

    private Table_3_YService table_3_YService;

    @Autowired
    public GBT67282017(Table_1_FService table_1_FService, Table_2_JService table_2_JService, Table_3_YService table_3_YService) {
        this.table_1_FService = table_1_FService;
        this.table_2_JService = table_2_JService;
        this.table_3_YService = table_3_YService;
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_6728_2017_list_table_1_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table1Norms(@RequestBody String receivedData) throws Exception {

        Table_1_F_thkMax input = gson.fromJson(receivedData, Table_1_F_thkMax.class);
        List results = table_1_FService.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_6728_2017_get_table_1_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table1Details(@RequestBody String receivedData) throws Exception {

        Table_1_F_Query input = gson.fromJson(receivedData, Table_1_F_Query.class);
        Table_1_F table_1_F = table_1_FService.getDetails(input);
        return gson.toJson(table_1_F);
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_6728_2017_list_table_2_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table2Norms(@RequestBody String receivedData) throws Exception {

        Table_2_J_thkMax input = gson.fromJson(receivedData, Table_2_J_thkMax.class);
        List results = table_2_JService.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_6728_2017_get_table_2_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table2Details(@RequestBody String receivedData) throws Exception {

        Table_2_J_Query input = gson.fromJson(receivedData, Table_2_J_Query.class);
        Table_2_J table_2_J = table_2_JService.getDetails(input);
        return gson.toJson(table_2_J);
    }

    // 获取norms
    @ResponseBody
    @RequestMapping(value = {"gbt_6728_2017_list_table_3_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table3Norms(@RequestBody String receivedData) throws Exception {

        Table_3_Y_thkMax input = gson.fromJson(receivedData, Table_3_Y_thkMax.class);
        List results = table_3_YService.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取details
    @ResponseBody
    @RequestMapping(value = {"gbt_6728_2017_get_table_3_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table3Details(@RequestBody String receivedData) throws Exception {

        Table_3_Y_Query input = gson.fromJson(receivedData, Table_3_Y_Query.class);
        Table_3_Y table_3_Y = table_3_YService.getDetails(input);
        return gson.toJson(table_3_Y);
    }
}
