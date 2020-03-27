package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.entity.db.hgt215742008.*;
import com.mechw.model.Return;
import com.mechw.model.db.hgt215742008.*;
import com.mechw.service.db.hgt215742008.table_10_1.Table_10_1Service;
import com.mechw.service.db.hgt215742008.table_6_2_1.Table_6_2_1Service;
import com.mechw.service.db.hgt215742008.table_6_2_2_tp.Table_6_2_2_tpService;
import com.mechw.service.db.hgt215742008.table_6_2_2_tpp.Table_6_2_2_tppService;
import com.mechw.service.db.hgt215742008.table_7_2_1.Table_7_2_1Service;
import com.mechw.service.db.hgt215742008.table_7_2_2_hp.Table_7_2_2_hpService;
import com.mechw.service.db.hgt215742008.table_8_2_1.Table_8_2_1Service;
import com.mechw.service.db.hgt215742008.table_9_2_1.Table_9_2_1Service;
import com.mechw.service.db.hgt215742008.table_9_2_2_axa.Table_9_2_2_axaService;
import com.mechw.service.db.hgt215742008.table_9_2_2_axb.Table_9_2_2_axbService;
import com.mechw.service.db.hgt215742008.table_9_2_2_axc.Table_9_2_2_axcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class HGT215742008 extends CommonController {

    private Table_6_2_1Service table_6_2_1Service;
    private Table_6_2_2_tpService table_6_2_2_tpService;
    private Table_6_2_2_tppService table_6_2_2_tppService;
    private Table_7_2_1Service table_7_2_1Service;
    private Table_7_2_2_hpService table_7_2_2_hpService;
    private Table_8_2_1Service table_8_2_1Service;
    private Table_9_2_1Service table_9_2_1Service;
    private Table_9_2_2_axaService table_9_2_2_axaService;
    private Table_9_2_2_axbService table_9_2_2_axbService;
    private Table_9_2_2_axcService table_9_2_2_axcService;
    private Table_10_1Service table_10_1Service;

    @Autowired
    public HGT215742008(Table_6_2_1Service table_6_2_1Service, Table_6_2_2_tpService table_6_2_2_tpService, Table_6_2_2_tppService table_6_2_2_tppService, Table_7_2_1Service table_7_2_1Service, Table_7_2_2_hpService table_7_2_2_hpService, Table_8_2_1Service table_8_2_1Service, Table_9_2_1Service table_9_2_1Service, Table_9_2_2_axaService table_9_2_2_axaService, Table_9_2_2_axbService table_9_2_2_axbService, Table_9_2_2_axcService table_9_2_2_axcService, Table_10_1Service table_10_1Service) {
        this.table_6_2_1Service = table_6_2_1Service;
        this.table_6_2_2_tpService = table_6_2_2_tpService;
        this.table_6_2_2_tppService = table_6_2_2_tppService;
        this.table_7_2_1Service = table_7_2_1Service;
        this.table_7_2_2_hpService = table_7_2_2_hpService;
        this.table_8_2_1Service = table_8_2_1Service;
        this.table_9_2_1Service = table_9_2_1Service;
        this.table_9_2_2_axaService = table_9_2_2_axaService;
        this.table_9_2_2_axbService = table_9_2_2_axbService;
        this.table_9_2_2_axcService = table_9_2_2_axcService;
        this.table_10_1Service = table_10_1Service;
    }

    /*
    TP
     */
    // 列出 DN 列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_tp_list_dn.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listTPDN(@RequestBody String receivedData) throws Exception {
        return gson.toJson(this.table_6_2_2_tpService.listDN());
    }

    // 根据 DN 和 实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_tp_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findTPTypesByDNAndLiftWeight(@RequestBody String receivedData) throws Exception {

        TPBSend send = gson.fromJson(receivedData, TPBSend.class);
        List<String> results = table_6_2_2_tpService.findTypesByDNAndLiftWeight(send.getDn(), send.getLiftWeight());

        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据 DN 和 型号获取满足吊重的最小型号
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_tp_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findTPByDNAndLiftWeightAndType(@RequestBody String receivedData) throws Exception {

        TPCSend send = gson.fromJson(receivedData, TPCSend.class);
        Table_6_2_2_tp table_6_2_2_tp = table_6_2_2_tpService.findByDNAndLiftWeightAndType(send.getDn(), send.getLiftWeight(), send.getType());

        Table_6_2_1 table_6_2_1 = table_6_2_1Service.findByNorm(send.getType());
        return gson.toJson(new TPCResult(
                table_6_2_2_tp.getDn(),
                table_6_2_2_tp.getDistance(),
                table_6_2_2_tp.getLiftWeight(),
                table_6_2_2_tp.getType(),
                table_6_2_2_tp.getShellMin(),
                table_6_2_1.getS(),
                table_6_2_1.getD(),
                table_6_2_1.getL(),
                table_6_2_1.getR(),
                table_6_2_1.getLtp(),
                table_6_2_1.getHtp(),
                table_6_2_1.getLugWeight()));
    }

    /*
    TPP
     */
    // 列出 DN 列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_tpp_list_dn.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listTPPDN(@RequestBody String receivedData) throws Exception {
        return gson.toJson(this.table_6_2_2_tppService.listDN());
    }

    // 根据 DN 和 实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_tpp_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findTPPTypesByDNAndLiftWeight(@RequestBody String receivedData) throws Exception {

        TPPBSend send = gson.fromJson(receivedData, TPPBSend.class);
        List<String> results = table_6_2_2_tppService.findTypesByDNAndLiftWeight(send.getDn(), send.getLiftWeight());

        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据 DN 和 型号获取满足吊重的最小型号
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_tpp_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findTPPByDNAndLiftWeightAndType(@RequestBody String receivedData) throws Exception {

        TPPCSend send = gson.fromJson(receivedData, TPPCSend.class);
        Table_6_2_2_tpp result = table_6_2_2_tppService.findByDNAndLiftWeightAndType(send.getDn(), send.getLiftWeight(), send.getType());

        Table_6_2_1 table_6_2_1 = table_6_2_1Service.findByNorm(send.getType());
        return gson.toJson(new TPPCResult(
                result.getDn(),
                result.getDistance(),
                result.getLiftWeight(),
                result.getType(),
                result.getShellMin(),
                result.getPadMin(),
                table_6_2_1.getS(),
                table_6_2_1.getD(),
                table_6_2_1.getL(),
                table_6_2_1.getR(),
                table_6_2_1.getLtp(),
                table_6_2_1.getHtp(),
                table_6_2_1.getLugWeight(),
                table_6_2_1.getPadWeightFactor()));
    }

    /*
    HP
     */
    // 列出 DN 列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_hp_list_dn.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listHPDN(@RequestBody String receivedData) throws Exception {
        return gson.toJson(this.table_7_2_2_hpService.listDN());
    }

    // 根据 DN 和 实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_hp_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findHPTypesByDNAndLiftWeight(@RequestBody String receivedData) throws Exception {

        HPBSend send = gson.fromJson(receivedData, HPBSend.class);
        List<String> results = table_7_2_2_hpService.findTypesByDNAndLiftWeight(send.getDn(), send.getLiftWeight());

        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据 DN 和 型号获取满足吊重的最小型号
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_hp_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findHPByDNAndLiftWeightAndType(@RequestBody String receivedData) throws Exception {

        HPCSend send = gson.fromJson(receivedData, HPCSend.class);
        Table_7_2_2_hp result = table_7_2_2_hpService.findByDNAndLiftWeightAndType(send.getDn(), send.getLiftWeight(), send.getType());

        Table_7_2_1 table_7_2_1 = table_7_2_1Service.findByNorm(send.getType());
        return gson.toJson(new HPCResult(
                result.getDn(),
                result.getLiftWeight(),
                result.getType(),
                result.getShellMin(),
                result.getPadMin(),
                table_7_2_1.getS(),
                table_7_2_1.getD(),
                table_7_2_1.getL(),
                table_7_2_1.getR(),
                table_7_2_1.getLtp(),
                table_7_2_1.getHtp(),
                table_7_2_1.getLugWeight(),
                table_7_2_1.getPadWeightFactor()));
    }

    /*
    SP
     */
    // 根据实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_sp_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findSPTypesByLiftWeight(@RequestBody String receivedData) throws Exception {

        SPASend send = gson.fromJson(receivedData, SPASend.class);
        List<Float> results = table_8_2_1Service.findTypesByLiftWeight(send.getLiftWeight());

        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据型号获取数据
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_sp_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findSPByType(@RequestBody String receivedData) throws Exception {

        SPBSend send = gson.fromJson(receivedData, SPBSend.class);
        Table_8_2_1 result = table_8_2_1Service.findByType(send.getType());
        return gson.toJson(result);
    }

    /*
    AXA
     */
    // 列出 DN 列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axa_list_dn.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listAXADN(@RequestBody String receivedData) throws Exception {
        return gson.toJson(table_9_2_2_axaService.listDN());
    }

    // 根据 DN 和 实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axa_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAXATypesByDNAndLiftWeight(@RequestBody String receivedData) throws Exception {

        AXABSend send = gson.fromJson(receivedData, AXABSend.class);
        List<Float> results = table_9_2_2_axaService.findTypesByDNAndLiftWeight(send.getDn(), send.getLiftWeight());

        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据 DN 和 型号获取满足吊重的最小参数
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axa_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAXAByDNAndLiftWeightAndType(@RequestBody String receivedData) throws Exception {

        AXACSend send = gson.fromJson(receivedData, AXACSend.class);
        Table_9_2_2_axa table_9_2_2_axa = table_9_2_2_axaService.findByDNAndLiftWeightAndType(send.getDn(), send.getLiftWeight(), send.getType());

        Table_9_2_1 table_9_2_1 = table_9_2_1Service.findByNorm(send.getType());
        return gson.toJson(new AXACResult(
                table_9_2_2_axa.getType(),
                table_9_2_2_axa.getLugDN(),
                table_9_2_2_axa.getLiftWeight(),
                table_9_2_1.getLiftWeightMin(),
                table_9_2_1.getLiftWeightMax(),
                table_9_2_2_axa.getShellDN(),
                table_9_2_1.getShellDNMin(),
                table_9_2_1.getShellDNMax(),
                table_9_2_1.getT(),
                table_9_2_1.getD0(),
                table_9_2_1.getD1(),
                table_9_2_1.getD2(),
                table_9_2_1.getL(),
                table_9_2_1.getS(),
                table_9_2_1.getS2(),
                table_9_2_1.getU(),
                table_9_2_1.getW1(),
                table_9_2_2_axa.getShellMinTHK(),
                table_9_2_2_axa.getPadTHK()
        ));
    }

    /*
    AXB
     */
    // 列出 DN 列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axb_list_dn.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listAXBDN(@RequestBody String receivedData) throws Exception {
        return gson.toJson(this.table_9_2_2_axbService.listDN());
    }

    // 根据 DN 和 实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axb_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAXBTypesByDNAndLiftWeight(@RequestBody String receivedData) throws Exception {

        AXBBSend send = gson.fromJson(receivedData, AXBBSend.class);
        List<Float> results = table_9_2_2_axbService.findTypesByDNAndLiftWeight(send.getDn(), send.getLiftWeight());
        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据 DN 和 型号获取满足吊重的最小参数
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axb_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAXBByDNAndLiftWeightAndType(@RequestBody String receivedData) throws Exception {

        AXBCSend send = gson.fromJson(receivedData, AXBCSend.class);
        Table_9_2_2_axb table_9_2_2_axb = table_9_2_2_axbService.findByDNAndLiftWeightAndType(send.getDn(), send.getLiftWeight(), send.getType());

        Table_9_2_1 table_9_2_1 = table_9_2_1Service.findByNorm(send.getType());
        return gson.toJson(new AXBCResult(
                table_9_2_2_axb.getType(),
                table_9_2_2_axb.getLugDN(),
                table_9_2_2_axb.getLiftWeight(),
                table_9_2_1.getLiftWeightMin(),
                table_9_2_1.getLiftWeightMax(),
                table_9_2_2_axb.getShellDN(),
                table_9_2_1.getShellDNMin(),
                table_9_2_1.getShellDNMax(),
                table_9_2_1.getT(),
                table_9_2_1.getD0(),
                table_9_2_1.getD1(),
                table_9_2_1.getD2(),
                table_9_2_1.getL(),
                table_9_2_1.getS(),
                table_9_2_1.getS2(),
                table_9_2_1.getU(),
                table_9_2_1.getW1(),
                table_9_2_2_axb.getShellMinTHK(),
                table_9_2_2_axb.getPadTHK()
        ));
    }

    /*
    AXC
     */
    // 列出 DN 列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axc_list_dn.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listAXCDN(@RequestBody String receivedData) throws Exception {
        return gson.toJson(this.table_9_2_2_axcService.listDN());
    }

    // 根据 DN 和 实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axc_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAXCTypesByDNAndLiftWeight(@RequestBody String receivedData) throws Exception {

        AXCBSend send = gson.fromJson(receivedData, AXCBSend.class);
        List<Float> results = table_9_2_2_axcService.findTypesByDNAndLiftWeight(send.getDn(), send.getLiftWeight());

        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据 DN 和 型号获取满足吊重的最小参数
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_axc_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAXCByDNAndLiftWeightAndType(@RequestBody String receivedData) throws Exception {

        AXCCSend send = gson.fromJson(receivedData, AXCCSend.class);
        Table_9_2_2_axc table_9_2_2_axc = table_9_2_2_axcService.findByDNAndLiftWeightAndType(send.getDn(), send.getLiftWeight(), send.getType());

        Table_9_2_1 table_9_2_1 = table_9_2_1Service.findByNorm(send.getType());
        return gson.toJson(new AXCCResult(
                table_9_2_2_axc.getType(),
                table_9_2_2_axc.getLugDN(),
                table_9_2_2_axc.getLiftWeight(),
                table_9_2_1.getLiftWeightMin(),
                table_9_2_1.getLiftWeightMax(),
                table_9_2_2_axc.getShellDN(),
                table_9_2_1.getShellDNMin(),
                table_9_2_1.getShellDNMax(),
                table_9_2_1.getT(),
                table_9_2_1.getD0(),
                table_9_2_1.getD1(),
                table_9_2_1.getD2(),
                table_9_2_1.getL(),
                table_9_2_1.getS(),
                table_9_2_1.getS2(),
                table_9_2_1.getU(),
                table_9_2_1.getW1(),
                table_9_2_2_axc.getShellMinTHK(),
                table_9_2_2_axc.getPadTHK()
        ));
    }

    /*
    AP
     */
    // 根据实际吊重获取所有可用的型号列表
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_ap_list_norms.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAPTypesByLiftWeight(@RequestBody String receivedData) throws Exception {

        APASend send = gson.fromJson(receivedData, APASend.class);
        List results = table_10_1Service.findTypesByLiftWeight(send.getLiftWeight());

        if (results.size() <= 0) {
            return gson.toJson(new Return("yes"));
        } else {
            return gson.toJson(results);
        }
    }

    // 根据型号获取数据
    @ResponseBody
    @RequestMapping(value = {"hgt_21574_2008_ap_get_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String findAPByType(@RequestBody String receivedData) throws Exception {

        APBSend send = gson.fromJson(receivedData, APBSend.class);
        Table_10_1 result = table_10_1Service.findByType(send.getType());
        return gson.toJson(result);
    }
}
