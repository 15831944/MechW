package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.entity.db.ybt53092006.ybt_5309_2006_Table_2;
import com.mechw.model.db.ybt53092006.table_2.ybt_5309_2006_Table_2_Query;
import com.mechw.model.db.ybt53092006.table_2.ybt_5309_2006_Table_2_thkMax;
import com.mechw.service.db.ybt53092006.table_2.ybt_5309_2006_Table_2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class YBT53092006 extends CommonController {

    private ybt_5309_2006_Table_2Service ybt_5309_2006_Table_2Service;

    @Autowired
    public YBT53092006(ybt_5309_2006_Table_2Service ybt_5309_2006_Table_2Service) {
        this.ybt_5309_2006_Table_2Service = ybt_5309_2006_Table_2Service;
    }

    // 获取 norms
    @ResponseBody
    @RequestMapping(value = {"ybt_5309_2006_list_table_2_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table2Norms(@RequestBody String receivedData) throws Exception {

        ybt_5309_2006_Table_2_thkMax input = gson.fromJson(receivedData, ybt_5309_2006_Table_2_thkMax.class);
        List results = ybt_5309_2006_Table_2Service.listNorms(input.getThkMax());
        return gson.toJson(results);
    }

    // 获取 details
    @ResponseBody
    @RequestMapping(value = {"ybt_5309_2006_get_table_2_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String Table2Details(@RequestBody String receivedData) throws Exception {

        ybt_5309_2006_Table_2_Query input = gson.fromJson(receivedData, ybt_5309_2006_Table_2_Query.class);
        ybt_5309_2006_Table_2 ybt_5309_2006_Table_2 = ybt_5309_2006_Table_2Service.getDetails(input);
        return gson.toJson(ybt_5309_2006_Table_2);
    }
}
