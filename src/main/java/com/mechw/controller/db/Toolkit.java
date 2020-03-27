package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.entity.db.toolkit.HG206602000;
import com.mechw.entity.db.toolkit.HGT206602017;
import com.mechw.model.db.toolkit.hg206602000.HG206602000BrowserInput;
import com.mechw.model.db.toolkit.hg206602000.HG206602000SearchInput;
import com.mechw.model.db.toolkit.hgt206602017.HGT206602017BrowserInput;
import com.mechw.model.db.toolkit.hgt206602017.HGT206602017SearchInput;
import com.mechw.service.db.toolkit.hg206602000.HG206602000Service;
import com.mechw.service.db.toolkit.hgt206602017.HGT206602017Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class Toolkit extends CommonController {

    private HG206602000Service hg206602000Service;
    private HGT206602017Service hgt206602017Service;

    @Autowired
    public Toolkit(HG206602000Service hg206602000Service, HGT206602017Service hgt206602017Service) {
        this.hg206602000Service = hg206602000Service;
        this.hgt206602017Service = hgt206602017Service;
    }

    @ResponseBody
    @RequestMapping(value = {"hg_20660_2000_search.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String hg206602000Search(@RequestBody String receivedData) throws Exception {

        HG206602000SearchInput input = gson.fromJson(receivedData, HG206602000SearchInput.class);
        List<HG206602000> result = this.hg206602000Service.findByName(input.getName());
        return gson.toJson(result);
    }

    @ResponseBody
    @RequestMapping(value = {"hg_20660_2000_browser.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String hg206602000Browser(@RequestBody String receivedData) throws Exception {

        HG206602000BrowserInput input = gson.fromJson(receivedData, HG206602000BrowserInput.class);
        List<HG206602000> result;
        switch (input.getToxicity()) {

            case "ZACAAll":
                if (input.getExplosion().equals("ZACAAll")) {
                    result = this.hg206602000Service.findAll();
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACAExplosive")) {
                    result = this.hg206602000Service.findByExplosion("易爆");
                    return gson.toJson(result);
                }
                break;
            case "ZACAExtreme":
                if (input.getExplosion().equals("ZACAAll")) {
                    result = this.hg206602000Service.findByToxicity("极度危害");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACAExplosive")) {
                    result = this.hg206602000Service.findByToxicityAndExplosion("极度危害", "易爆");
                    return gson.toJson(result);
                }
                break;
            case "ZACAHighly":
                if (input.getExplosion().equals("ZACAAll")) {
                    result = this.hg206602000Service.findByToxicity("高度危害");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACAExplosive")) {
                    result = this.hg206602000Service.findByToxicityAndExplosion("高度危害", "易爆");
                    return gson.toJson(result);
                }
                break;
            case "ZACAModerate":
                if (input.getExplosion().equals("ZACAAll")) {
                    result = this.hg206602000Service.findByToxicity("中度危害");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACAExplosive")) {
                    result = this.hg206602000Service.findByToxicityAndExplosion("中度危害", "易爆");
                    return gson.toJson(result);
                }
                break;
        }

        return null;
    }

    @ResponseBody
    @RequestMapping(value = {"hgt_20660_2017_search.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String hgt206602017Search(@RequestBody String receivedData) throws Exception {

        HGT206602017SearchInput input = gson.fromJson(receivedData, HGT206602017SearchInput.class);
        List<HGT206602017> result = this.hgt206602017Service.findByName(input.getName());
        return gson.toJson(result);
    }

    @ResponseBody
    @RequestMapping(value = {"hgt_20660_2017_browser.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String hgt206602017Browser(@RequestBody String receivedData) throws Exception {

        HGT206602017BrowserInput input = gson.fromJson(receivedData, HGT206602017BrowserInput.class);
        List<HGT206602017> result;

        switch (input.getToxicity()) {
            case "ZACBAll":
                if (input.getExplosion().equals("ZACBAll")) {
                    result = this.hgt206602017Service.findAll();
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBSingleExplosive")) {
                    result = this.hgt206602017Service.findByExplosion("单一爆炸物质");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBMultiExplosive")) {
                    result = this.hgt206602017Service.findByExplosion("混合爆炸物质");
                    return gson.toJson(result);
                }
                break;
            case "ZACBExtreme":
                if (input.getExplosion().equals("ZACBAll")) {
                    result = this.hgt206602017Service.findByToxicity("极度危害");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBSingleExplosive")) {
                    result = this.hgt206602017Service.findByToxicityAndExplosion("极度危害", "单一爆炸物质");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBMultiExplosive")) {
                    result = this.hgt206602017Service.findByToxicityAndExplosion("极度危害", "混合爆炸物质");
                    return gson.toJson(result);
                }
                break;
            case "ZACBHighly":
                if (input.getExplosion().equals("ZACBAll")) {
                    result = this.hgt206602017Service.findByToxicity("高度危害");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBSingleExplosive")) {
                    result = this.hgt206602017Service.findByToxicityAndExplosion("高度危害", "单一爆炸物质");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBMultiExplosive")) {
                    result = this.hgt206602017Service.findByToxicityAndExplosion("高度危害", "混合爆炸物质");
                    return gson.toJson(result);
                }
                break;
            case "ZACBModerate":
                if (input.getExplosion().equals("ZACBAll")) {
                    result = this.hgt206602017Service.findByToxicity("中度危害");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBSingleExplosive")) {
                    result = this.hgt206602017Service.findByToxicityAndExplosion("中度危害", "单一爆炸物质");
                    return gson.toJson(result);
                }
                if (input.getExplosion().equals("ZACBMultiExplosive")) {
                    result = this.hgt206602017Service.findByToxicityAndExplosion("中度危害", "混合爆炸物质");
                    return gson.toJson(result);
                }
                break;
        }

        return null;
    }
}
