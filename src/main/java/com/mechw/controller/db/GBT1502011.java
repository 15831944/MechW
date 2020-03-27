package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.model.db.GBC1Query;
import com.mechw.model.db.gbt1502011.chart.chart_5_12.Chart_5_12_Query;
import com.mechw.model.db.gbt1502011.chart.chart_5_14.Chart_5_14_Query;
import com.mechw.model.db.gbt1502011.chart.chart_5_15.Chart_5_15_Query;
import com.mechw.model.db.gbt1502011.property.a.AQuery;
import com.mechw.model.db.gbt1502011.property.e.EQuery;
import com.mechw.model.db.gbt1502011.property.index.*;
import com.mechw.model.db.gbt1502011.property.rel.RelQuery;
import com.mechw.model.db.gbt1502011.property.rel.RelResult;
import com.mechw.model.db.gbt1502011.property.stress.StressQuery;
import com.mechw.model.db.gbt1502011.property.stress.StressResult;
import com.mechw.model.db.gbt1502011.table.table_5_6.Table_5_6_Query;
import com.mechw.model.db.gbt1502011.table.table_b_2.Table_b_2_Query;
import com.mechw.model.front.a.common.input.ComInput;
import com.mechw.model.front.a.common.input.EAComInput;
import com.mechw.model.front.a.common.result.*;
import com.mechw.service.db.gbt1502011.chart.chart_5_12.Chart_5_12Service;
import com.mechw.service.db.gbt1502011.chart.chart_5_14.Chart_5_14Service;
import com.mechw.service.db.gbt1502011.chart.chart_5_15.Chart_5_15Service;
import com.mechw.service.db.gbt1502011.property.GBC1;
import com.mechw.service.db.gbt1502011.property.a.AService;
import com.mechw.service.db.gbt1502011.property.e.EService;
import com.mechw.service.db.gbt1502011.property.index.IndexService;
import com.mechw.service.db.gbt1502011.property.rel.RelService;
import com.mechw.service.db.gbt1502011.property.stress.StressService;
import com.mechw.service.db.gbt1502011.table.table_5_6.Table_5_6Service;
import com.mechw.service.db.gbt1502011.table.table_b_2.Table_b_2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GBT1502011 extends CommonController {

    private IndexService indexService;
    private StressService stressService;
    private RelService relService;
    private EService eService;
    private AService aService;

    private Chart_5_12Service chart_5_12Service;
    private Chart_5_14Service chart_5_14Service;
    private Chart_5_15Service chart_5_15Service;

    private Table_5_6Service table_5_6Service;
    private Table_b_2Service table_b_2Service;

    @Autowired
    public GBT1502011(IndexService indexService, StressService stressService, RelService relService, EService eService, AService aService, Chart_5_12Service chart_5_12Service, Chart_5_14Service chart_5_14Service, Chart_5_15Service chart_5_15Service, Table_5_6Service table_5_6Service, Table_b_2Service table_b_2Service) {
        this.indexService = indexService;
        this.stressService = stressService;
        this.relService = relService;
        this.eService = eService;
        this.aService = aService;
        this.chart_5_12Service = chart_5_12Service;
        this.chart_5_14Service = chart_5_14Service;
        this.chart_5_15Service = chart_5_15Service;
        this.table_5_6Service = table_5_6Service;
        this.table_b_2Service = table_b_2Service;
    }

    // category
    @ResponseBody
    @RequestMapping(value = {"web_list_gbt_150_2011_category.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Category(@RequestBody String receivedData) throws Exception {

        CategoryQuery categoryQuery = gson.fromJson(receivedData, CategoryQuery.class);
        return gson.toJson(indexService.listCategory(categoryQuery));
    }

    // type
    @ResponseBody
    @RequestMapping(value = {"web_list_gbt_150_2011_type.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Type(@RequestBody String receivedData) throws Exception {

        TypeQuery typeQuery = gson.fromJson(receivedData, TypeQuery.class);
        return gson.toJson(indexService.listType(typeQuery));
    }

    // std
    @ResponseBody
    @RequestMapping(value = {"web_list_gbt_150_2011_std.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011STD(@RequestBody String receivedData) throws Exception {

        STDQuery stdQuery = gson.fromJson(receivedData, STDQuery.class);
        return gson.toJson(indexService.listSTD(stdQuery));
    }

    // name
    @ResponseBody
    @RequestMapping(value = {"web_list_gbt_150_2011_name.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Name(@RequestBody String receivedData) throws Exception {

        NameQuery nameQuery = gson.fromJson(receivedData, NameQuery.class);
        return gson.toJson(indexService.listName(nameQuery));
    }

    // Index
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_index.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Index(@RequestBody String receivedData) throws Exception {

        IndexQuery indexQuery = gson.fromJson(receivedData, IndexQuery.class);
        return gson.toJson(indexService.getIndex(indexQuery));
    }

    // 获取 o ot ot1 rel c1
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011ComProperty(@RequestBody String receivedData) throws Exception {

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

        // o ot ot1
        StressQuery stressQuery = new StressQuery(category, std, name, thk, temp, highLow);
        StressResult stressResult = stressService.getStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();
        double ot1 = stressResult.getOt1();

        // rel
        RelQuery relQuery = new RelQuery(category, std, name, thk, 20.0);
        RelResult relResult = relService.getRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // return
        return gson.toJson(new ComResult(o, ot, ot1, rel, c1));
    }

    // 获取 o ot ot1 rel c1 et
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_e_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011EtComProperty(@RequestBody String receivedData) throws Exception {

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

        // o ot ot1
        StressQuery stressQuery = new StressQuery(category, std, name, thk, temp, highLow);
        StressResult stressResult = stressService.getStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();
        double ot1 = stressResult.getOt1();

        // rel
        RelQuery relQuery = new RelQuery(category, std, name, thk, 20.0);
        RelResult relResult = relService.getRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // et
        EQuery eQuery = new EQuery(category, std, name, temp);
        double et = eService.getE(eQuery).getE();

        // return
        return gson.toJson(new EtComResult(o, ot, ot1, rel, c1, et));
    }

    // 获取 o ot ot1 rel relt c1 et
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_et_com_relt_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011ComReltEtProperty(@RequestBody String receivedData) throws Exception {

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

        // o ot ot1
        StressQuery stressQuery = new StressQuery(category, std, name, thk, temp, highLow);
        StressResult stressResult = stressService.getStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();
        double ot1 = stressResult.getOt1();

        // rel
        RelQuery relQuery = new RelQuery(category, std, name, thk, 20.0);
        RelResult relResult = relService.getRel(relQuery);
        double rel = relResult.getRel();

        // relt
        relQuery = new RelQuery(category, std, name, thk, temp);
        double relt = relService.getRel(relQuery).getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // et
        EQuery eQuery = new EQuery(category, std, name, temp);
        double et = eService.getE(eQuery).getE();

        // return
        return gson.toJson(new EtComReltResult(o, ot, ot1, rel, c1, et, relt));
    }

    // 获取 relt c1 et
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_relt_et_c1_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011RELTComProperty(@RequestBody String receivedData) throws Exception {

        ComInput comInput = gson.fromJson(receivedData, ComInput.class);

        // param
        String category = comInput.getCategory();
        String type = comInput.getType();
        String std = comInput.getStd();
        String name = comInput.getName();
        double thk = comInput.getThk();
        double temp = comInput.getTemp();
        double isTube = comInput.getIsTube();
        double od = comInput.getOd();

        // relt
        RelQuery relQuery = new RelQuery(category, std, name, thk, temp);
        RelResult relResult = relService.getRel(relQuery);
        double relt = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // et
        EQuery eQuery = new EQuery(category, std, name, temp);
        double et = eService.getE(eQuery).getE();

        // return
        return gson.toJson(new ReltC1EtResult(relt, c1, et));
    }

    // 获取 o ot ot1 rel c1 at
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_a_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011AComProperty(@RequestBody String receivedData) throws Exception {

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

        // o ot ot1
        StressQuery stressQuery = new StressQuery(category, std, name, thk, temp, highLow);
        StressResult stressResult = stressService.getStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();
        double ot1 = stressResult.getOt1();

        // rel
        RelQuery relQuery = new RelQuery(category, std, name, thk, 20.0);
        RelResult relResult = relService.getRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // A
        AQuery aQuery = new AQuery(category, std, name, temp);
        double at = aService.getA(aQuery).getA();

        // return
        return gson.toJson(new AtComResult(o, ot, ot1, rel, c1, at));
    }

    // 获取 o ot ot1 rel c1 et at
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_e_a_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011EAComProperty(@RequestBody String receivedData) throws Exception {

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

        // o ot ot1
        StressQuery stressQuery = new StressQuery(category, std, name, thk, designTemp, highLow);
        StressResult stressResult = stressService.getStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();
        double ot1 = stressResult.getOt1();

        // rel
        RelQuery relQuery = new RelQuery(category, std, name, thk, 20.0);
        RelResult relResult = relService.getRel(relQuery);
        double rel = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // e
        EQuery eQuery = new EQuery(category, std, name, designTemp);
        double et = eService.getE(eQuery).getE();

        // A
        AQuery aQuery = new AQuery(category, std, name, wallTemp);
        double at = aService.getA(aQuery).getA();

        // return
        return gson.toJson(new EtAtComResult(o, ot, ot1, rel, c1, et, at));
    }

    // 获取 o ot relt c1 et
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_relt_et_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011RELTETComProperty(@RequestBody String receivedData) throws Exception {

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

        // o ot ot1
        StressQuery stressQuery = new StressQuery(category, std, name, thk, temp, highLow);
        StressResult stressResult = stressService.getStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();

        // relt
        RelQuery relQuery = new RelQuery(category, std, name, thk, temp);
        RelResult relResult = relService.getRel(relQuery);
        double relt = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // et
        EQuery eQuery = new EQuery(category, std, name, temp);
        double et = eService.getE(eQuery).getE();

        // return
        return gson.toJson(new ReltEtComResult(o, ot, relt, c1, et));
    }

    // 获取 o ot relt c1 et at
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_relt_et_at_com_property.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011RELTETATComProperty(@RequestBody String receivedData) throws Exception {

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

        // o ot ot1
        StressQuery stressQuery = new StressQuery(category, std, name, thk, temp, highLow);
        StressResult stressResult = stressService.getStress(stressQuery);
        double o = stressResult.getO();
        double ot = stressResult.getOt();

        // relt
        RelQuery relQuery = new RelQuery(category, std, name, thk, temp);
        RelResult relResult = relService.getRel(relQuery);
        double relt = relResult.getRel();

        // c1
        GBC1Query gbc1Query = new GBC1Query(category, type, std, name, isTube, od, thk);
        GBC1 gbc1 = new GBC1(gbc1Query);
        double c1 = gbc1.getC1();

        // et
        EQuery eQuery = new EQuery(category, std, name, temp);
        double et = eService.getE(eQuery).getE();

        // at
        AQuery aQuery = new AQuery(category, std, name, temp);
        double at = aService.getA(aQuery).getA();

        // return
        return gson.toJson(new ReltEtAtComResult(o, ot, relt, c1, et, at));
    }

    // stress
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_design_and_tag_stress.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011DesignAndTagStress(@RequestBody String receivedData) throws Exception {

        StressQuery stressQuery = gson.fromJson(receivedData, StressQuery.class);
        return gson.toJson(stressService.getStress(stressQuery));
    }

    // Rel
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_rel.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Rel(@RequestBody String receivedData) throws Exception {

        RelQuery relQuery = gson.fromJson(receivedData, RelQuery.class);
        return gson.toJson(relService.getRel(relQuery));
    }

    // E
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_e.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011E(@RequestBody String receivedData) throws Exception {

        EQuery eQuery = gson.fromJson(receivedData, EQuery.class);
        return gson.toJson(eService.getE(eQuery));
    }

    // A
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_a.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011A(@RequestBody String receivedData) throws Exception {

        AQuery aQuery = gson.fromJson(receivedData, AQuery.class);
        return gson.toJson(aService.getA(aQuery));
    }

    // C1
    @ResponseBody
    @RequestMapping(value = {"web_get_gbt_150_2011_c1.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011C1(@RequestBody String receivedData) throws Exception {

        GBC1Query rec = gson.fromJson(receivedData, GBC1Query.class);
        GBC1 gbc1 = new GBC1(rec);
        return gson.toJson(gbc1.getC1());
    }

    // 获取q2
    @ResponseBody
    @RequestMapping(value = {"gbt_150_2011_chart_5_15_get_q2.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Chart515GetQ2(@RequestBody String receivedData) throws Exception {

        Chart_5_15_Query input = gson.fromJson(receivedData, Chart_5_15_Query.class);
        double q2 = chart_5_15Service.getQ2(input.getAlpha(), input.getThkrs());
        return gson.toJson(q2);
    }

    // 获取q2
    @ResponseBody
    @RequestMapping(value = {"gbt_150_2011_chart_5_14_get_q2.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Chart514GetQ2(@RequestBody String receivedData) throws Exception {

        Chart_5_14_Query input = gson.fromJson(receivedData, Chart_5_14_Query.class);
        double q2 = chart_5_14Service.getQ2(input.getAlpha(), input.getThkrs());
        return gson.toJson(q2);
    }

    // 获取K
    @ResponseBody
    @RequestMapping(value = {"gbt_150_2011_chart_5_12_get_q1.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Chart512Q1(@RequestBody String receivedData) throws Exception {

        Chart_5_12_Query input = gson.fromJson(receivedData, Chart_5_12_Query.class);
        double q1 = chart_5_12Service.getQ1(input.getAlpha(), input.getThkrl());
        return gson.toJson(q1);
    }

    // 获取k
    @ResponseBody
    @RequestMapping(value = {"gbt_150_2011_table_5_6_get_k.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011Table56K(@RequestBody String receivedData) throws Exception {

        Table_5_6_Query input = gson.fromJson(receivedData, Table_5_6_Query.class);
        double k = table_5_6Service.getK(input.getAlpha(), input.getRdil());
        return gson.toJson(k);
    }

    // 获取K
    @ResponseBody
    @RequestMapping(value = {"gbt_150_2011_table_b_2_get_zeta.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String GBT1502011TableB2Zeta(@RequestBody String receivedData) throws Exception {

        Table_b_2_Query input = gson.fromJson(receivedData, Table_b_2_Query.class);
        double zeta = table_b_2Service.getZeta(input.getRe());
        return gson.toJson(zeta);
    }
}
