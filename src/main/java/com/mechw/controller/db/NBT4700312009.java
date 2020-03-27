package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.model.db.GBC1Query;
import com.mechw.model.db.nbt4700312009.property.a.AQuery;
import com.mechw.model.db.nbt4700312009.property.a.AResult;
import com.mechw.model.db.nbt4700312009.property.e.EQuery;
import com.mechw.model.db.nbt4700312009.property.e.EResult;
import com.mechw.model.db.nbt4700312009.property.index.*;
import com.mechw.model.db.nbt4700312009.property.rel.RelQuery;
import com.mechw.model.db.nbt4700312009.property.rel.RelResult;
import com.mechw.model.db.nbt4700312009.property.stress.StressQuery;
import com.mechw.model.db.nbt4700312009.property.stress.StressResult;
import com.mechw.model.db.nbt4700312009.table.table_8_15.Table_8_15_Query;
import com.mechw.model.db.nbt4700312009.table.table_8_15.Table_8_15_Result;
import com.mechw.model.db.nbt4700312009.table.table_8_5.Table_8_5_Query;
import com.mechw.model.db.nbt4700312009.table.table_8_5.Table_8_5_Result;
import com.mechw.model.db.nbt4700312009.table.table_8_7.Table_8_7_Query;
import com.mechw.model.db.nbt4700312009.table.table_8_7.Table_8_7_Result;
import com.mechw.model.front.b.common.*;
import com.mechw.service.db.nbt4700312009.property.GBC1;
import com.mechw.service.db.nbt4700312009.property.a.ASteelService;
import com.mechw.service.db.nbt4700312009.property.e.ESteelService;
import com.mechw.service.db.nbt4700312009.property.index.MtlIndexService;
import com.mechw.service.db.nbt4700312009.property.rel.RelSteelService;
import com.mechw.service.db.nbt4700312009.property.stress.StressSteelService;
import com.mechw.service.db.nbt4700312009.table.table_8_15.Table_8_15Service;
import com.mechw.service.db.nbt4700312009.table.table_8_5.Table_8_5Service;
import com.mechw.service.db.nbt4700312009.table.table_8_7.Table_8_7Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class NBT4700312009 extends CommonController {

    private StressSteelService stressSteelService;
    private MtlIndexService mtlIndexService;
    private RelSteelService relSteelService;
    private ESteelService eSteelService;
    private ASteelService aSteelService;

    private Table_8_5Service table_8_5Service;
    private Table_8_7Service table_8_7Service;
    private Table_8_15Service table_8_15Service;

    @Autowired
    public NBT4700312009(StressSteelService stressSteelService, MtlIndexService mtlIndexService, RelSteelService relSteelService, ESteelService eSteelService, ASteelService aSteelService, Table_8_5Service table_8_5Service, Table_8_7Service table_8_7Service, Table_8_15Service table_8_15Service) {
        this.stressSteelService = stressSteelService;
        this.mtlIndexService = mtlIndexService;
        this.relSteelService = relSteelService;
        this.eSteelService = eSteelService;
        this.aSteelService = aSteelService;
        this.table_8_5Service = table_8_5Service;
        this.table_8_7Service = table_8_7Service;
        this.table_8_15Service = table_8_15Service;
    }

    // category
    @ResponseBody
    @RequestMapping(value = {"web_list_nbt_47003_1_2009_category.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webGetNBT4700312009Category(@RequestBody String receivedData) throws Exception {

        Temp rec = gson.fromJson(receivedData, Temp.class);
        return gson.toJson(mtlIndexService.listCategory(rec));
    }

    // type
    @ResponseBody
    @RequestMapping(value = {"web_list_nbt_47003_1_2009_type.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webGetNBT4700312009Type(@RequestBody String receivedData) throws Exception {

        Category rec = gson.fromJson(receivedData, Category.class);
        return gson.toJson(mtlIndexService.listType(rec));
    }

    // std
    @ResponseBody
    @RequestMapping(value = {"web_list_nbt_47003_1_2009_std.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webGetNBT4700312009STD(@RequestBody String receivedData) throws Exception {

        Type rec = gson.fromJson(receivedData, Type.class);
        return gson.toJson(mtlIndexService.listSTD(rec));
    }

    // name
    @ResponseBody
    @RequestMapping(value = {"web_list_nbt_47003_1_2009_name.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webGetNBT4700312009Name(@RequestBody String receivedData) throws Exception {

        STD rec = gson.fromJson(receivedData, STD.class);
        return gson.toJson(mtlIndexService.listName(rec));
    }

    // Index
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_index.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String webGetNBT4700312009Index(@RequestBody String receivedData) throws Exception {

        Name rec = gson.fromJson(receivedData, Name.class);
        return gson.toJson(mtlIndexService.getIndex(rec));
    }

    // 获取 o ot rel c1
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009ComProperty(@RequestBody String receivedData) throws Exception {

        ComInput comInput = gson.fromJson(receivedData, ComInput.class);

        // param
        String category = comInput.getCategory();
        String type = comInput.getType();
        String std = comInput.getStd();
        String name = comInput.getName();
        double thk = comInput.getThk();
        double temp = comInput.getTemp();
        double highLow = comInput.getHighLow();
        double isTube = comInput.getIsTube();
        double od = comInput.getOd();

        // o ot
        StressQuery stressQuery = new StressQuery(category, type, std, name, thk, temp, highLow);
        StressResult stressResult = stressSteelService.getTestAndDesignStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();

        // rel
        RelQuery relQuery = new RelQuery(category, type, std, name, thk, 20.0);
        RelResult relResult = relSteelService.getDesignRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // return
        ComResult comResult = new ComResult(o, ot, rel, c1);
        return gson.toJson(comResult);
    }

    // 获取 o ot relt c1 et
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_relt_et_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009ReltEtComProperty(@RequestBody String receivedData) throws Exception {

        ComInput comInput = gson.fromJson(receivedData, ComInput.class);

        // param
        String category = comInput.getCategory();
        String type = comInput.getType();
        String std = comInput.getStd();
        String name = comInput.getName();
        double thk = comInput.getThk();
        double temp = comInput.getTemp();
        double highLow = comInput.getHighLow();
        double isTube = comInput.getIsTube();
        double od = comInput.getOd();

        // o ot
        StressQuery stressQuery = new StressQuery(category, type, std, name, thk, temp, highLow);
        StressResult stressResult = stressSteelService.getTestAndDesignStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();

        // relt
        RelQuery relQuery = new RelQuery(category, type, std, name, thk, temp);
        RelResult relResult = relSteelService.getDesignRel(relQuery);
        double relt = relResult.getRel();

        // et
        EQuery eQuery = new EQuery(category, type, std, name, temp);
        EResult eResult = eSteelService.getDesignE(eQuery);
        double et = eResult.getEt();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // return
        ReltEtComResult reltEtComResult = new ReltEtComResult(o, ot, relt, et, c1);
        return gson.toJson(reltEtComResult);
    }

    // 获取 o ot rel c1 et
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_e_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009EComProperty(@RequestBody String receivedData) throws Exception {

        ComInput comInput = gson.fromJson(receivedData, ComInput.class);

        // param
        String category = comInput.getCategory();
        String type = comInput.getType();
        String std = comInput.getStd();
        String name = comInput.getName();
        double thk = comInput.getThk();
        double temp = comInput.getTemp();
        double highLow = comInput.getHighLow();
        double isTube = comInput.getIsTube();
        double od = comInput.getOd();

        // o ot
        StressQuery stressQuery = new StressQuery(category, type, std, name, thk, temp, highLow);
        StressResult stressResult = stressSteelService.getTestAndDesignStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();

        // rel
        RelQuery relQuery = new RelQuery(category, type, std, name, thk, 20.0);
        RelResult relResult = relSteelService.getDesignRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // et
        EQuery eQuery = new EQuery(category, type, std, name, temp);
        EResult eResult = eSteelService.getDesignE(eQuery);
        double et = eResult.getEt();

        // return
        EComResult eComResult = new EComResult(o, ot, rel, c1, et);
        return gson.toJson(eComResult);
    }

    // 获取 o ot rel c1 at
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_a_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009AComProperty(@RequestBody String receivedData) throws Exception {

        ComInput comInput = gson.fromJson(receivedData, ComInput.class);

        // param
        String category = comInput.getCategory();
        String type = comInput.getType();
        String std = comInput.getStd();
        String name = comInput.getName();
        double thk = comInput.getThk();
        double temp = comInput.getTemp();
        double highLow = comInput.getHighLow();
        double isTube = comInput.getIsTube();
        double od = comInput.getOd();

        // o ot
        StressQuery stressQuery = new StressQuery(category, type, std, name, thk, temp, highLow);
        StressResult stressResult = stressSteelService.getTestAndDesignStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();

        // rel
        RelQuery relQuery = new RelQuery(category, type, std, name, thk, 20.0);
        RelResult relResult = relSteelService.getDesignRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // at
        AQuery aQuery = new AQuery(category, type, std, name, temp);
        AResult aResult = aSteelService.getDesignA(aQuery);
        double at = aResult.getA();

        // return
        AComResult aComResult = new AComResult(o, ot, rel, c1, at);
        return gson.toJson(aComResult);
    }

    // 获取 o ot rel c1 et at
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_e_a_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009EAComProperty(@RequestBody String receivedData) throws Exception {

        EAComInput eaComInput = gson.fromJson(receivedData, EAComInput.class);

        // param
        String category = eaComInput.getCategory();
        String type = eaComInput.getType();
        String std = eaComInput.getStd();
        String name = eaComInput.getName();
        double thk = eaComInput.getThk();
        double designTemp = eaComInput.getDesignTemp();
        double wallTemp = eaComInput.getWallTemp();
        double highLow = eaComInput.getHighLow();
        double isTube = eaComInput.getIsTube();
        double od = eaComInput.getOd();

        // o ot
        StressQuery stressQuery = new StressQuery(category, type, std, name, thk, designTemp, highLow);
        StressResult stressResult = stressSteelService.getTestAndDesignStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();

        // rel
        RelQuery relQuery = new RelQuery(category, type, std, name, thk, 20.0);
        RelResult relResult = relSteelService.getDesignRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // et
        EQuery eQuery = new EQuery(category, type, std, name, designTemp);
        EResult eResult = eSteelService.getDesignE(eQuery);
        double et = eResult.getEt();

        // at
        AQuery aQuery = new AQuery(category, type, std, name, wallTemp);
        AResult aResult = aSteelService.getDesignA(aQuery);
        double at = aResult.getA();

        // return
        EAComResult eaComResult = new EAComResult(o, ot, rel, c1, et, at);
        return gson.toJson(eaComResult);
    }

    // ot o
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_design_and_test_stress.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009DesignAndTestStress(@RequestBody String receivedData) throws Exception {

        StressQuery rec = gson.fromJson(receivedData, StressQuery.class);
        return gson.toJson(stressSteelService.getTestAndDesignStress(rec));
    }

    // C1
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_c1.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009C1(@RequestBody String receivedData) throws Exception {

        GBC1Query rec = gson.fromJson(receivedData, GBC1Query.class);
        GBC1 gbc1 = new GBC1(rec);
        return gson.toJson(gbc1.getC1());
    }

    // Rel
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_rel.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009Rel(@RequestBody String receivedData) throws Exception {

        RelQuery rec = gson.fromJson(receivedData, RelQuery.class);
        return gson.toJson(relSteelService.getDesignRel(rec));
    }

    // Et
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_e.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009E(@RequestBody String receivedData) throws Exception {

        EQuery eQuery = gson.fromJson(receivedData, EQuery.class);
        return gson.toJson(eSteelService.getDesignE(eQuery));
    }

    // A
    @ResponseBody
    @RequestMapping(value = {"web_get_nbt_47003_1_2009_a.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009A(@RequestBody String receivedData) throws Exception {

        AQuery rec = gson.fromJson(receivedData, AQuery.class);
        return gson.toJson(aSteelService.getDesignA(rec));
    }

    // Table 8-5 K
    @ResponseBody
    @RequestMapping(value = {"nbt_47003_1_2009_table_8_5_get_alpha_and_beta.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009Table85GetAlphaAndBeta(@RequestBody String receivedData) throws Exception {

        Table_8_5_Query input = gson.fromJson(receivedData, Table_8_5_Query.class);
        Table_8_5_Result table_8_5_result = table_8_5Service.findAlphaAndBeta(input);
        return gson.toJson(table_8_5_result);
    }

    // Table 8-7 K
    @ResponseBody
    @RequestMapping(value = {"nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009Table87GetAlphaAndBeta(@RequestBody String receivedData) throws Exception {

        Table_8_7_Query input = gson.fromJson(receivedData, Table_8_7_Query.class);
        Table_8_7_Result table_8_7_result = table_8_7Service.findAlphaAndBeta(input);
        return gson.toJson(table_8_7_result);
    }

    // Table 8-15 K
    @ResponseBody
    @RequestMapping(value = {"nbt_47003_1_2009_table_8_15_get_alpha_and_beta.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String NBT4700312009Table815GetAlphaAndBeta(@RequestBody String receivedData) throws Exception {

        Table_8_15_Query input = gson.fromJson(receivedData, Table_8_15_Query.class);
        Table_8_15_Result table_8_15_result = table_8_15Service.findAlphaAndBeta(input);
        return gson.toJson(table_8_15_result);
    }
}