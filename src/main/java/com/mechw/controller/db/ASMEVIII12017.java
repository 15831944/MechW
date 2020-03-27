package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.model.db.asmeviii12017.index.IndexQuery;
import com.mechw.model.db.asmeviii12017.index.MaterialNameQuery;
import com.mechw.model.db.asmeviii12017.index.ProductFormQuery;
import com.mechw.model.db.asmeviii12017.stress.ASMEVIII12017StressQuery;
import com.mechw.service.db.asmeviii12017.index.ASMEVIII12017IndexService;
import com.mechw.service.db.asmeviii12017.stress.ASMEVIII12017StressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ASMEVIII12017 extends CommonController {

    private ASMEVIII12017IndexService asmeviii12017IndexService;
    private ASMEVIII12017StressService asmeviii12017StressService;

    @Autowired
    public ASMEVIII12017(ASMEVIII12017IndexService asmeviii12017IndexService, ASMEVIII12017StressService asmeviii12017StressService) {
        this.asmeviii12017IndexService = asmeviii12017IndexService;
        this.asmeviii12017StressService = asmeviii12017StressService;
    }

    @ResponseBody
    @RequestMapping(value = {"web_list_asme_viii_1_2017_material_name.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webListASMEVIII12017MaterialName(@RequestBody String receivedData) {
        MaterialNameQuery rec = gson.fromJson(receivedData, MaterialNameQuery.class);
        return gson.toJson(asmeviii12017IndexService.listMaterialName(rec));
    }

    @ResponseBody
    @RequestMapping(value = {"web_list_asme_viii_1_2017_product_form.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webListASMEVIII12017ProductForm(@RequestBody String receivedData) {
        ProductFormQuery rec = gson.fromJson(receivedData, ProductFormQuery.class);
        return gson.toJson(asmeviii12017IndexService.listProductForm(rec));
    }

    @ResponseBody
    @RequestMapping(value = {"web_get_asme_viii_1_2017_index.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webGetASMEVIII12017Index(@RequestBody String receivedData) {
        IndexQuery rec = gson.fromJson(receivedData, IndexQuery.class);
        return gson.toJson(asmeviii12017IndexService.getIndex(rec));
    }

    @ResponseBody
    @RequestMapping(value = {"web_query_asme_viii_1_2017_stress.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webQueryASMEVIII12017Stress(@RequestBody String receivedData) {
        ASMEVIII12017StressQuery rec = gson.fromJson(receivedData, ASMEVIII12017StressQuery.class);
        return gson.toJson(asmeviii12017StressService.queryASMEVIII12017Stress(rec));
    }
}
