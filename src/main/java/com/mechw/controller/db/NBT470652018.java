package com.mechw.controller.db;

import com.mechw.controller.CommonController;
import com.mechw.model.db.nbt470652018.saddle.*;
import com.mechw.service.db.nbt470652018.saddle.SaddleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class NBT470652018 extends CommonController {

    private SaddleService saddleService;

    @Autowired
    public NBT470652018(SaddleService saddleService) {
        this.saddleService = saddleService;
    }

    @ResponseBody
    @RequestMapping(value = {"list_nbt_47065_1_2018_dn.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listDN(@RequestBody String receivedData) throws Exception {
        DNInput dnInput = gson.fromJson(receivedData, DNInput.class);
        return gson.toJson(saddleService.listDN(dnInput.getMtl()));
    }

    @ResponseBody
    @RequestMapping(value = {"list_nbt_47065_1_2018_fab_method.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listFabMethod(@RequestBody String receivedData) throws Exception {
        QInput input = gson.fromJson(receivedData, QInput.class);
        return gson.toJson(saddleService.listFabMethod(input.getMtl(), input.getDn(), input.getQ()));
    }

    @ResponseBody
    @RequestMapping(value = {"list_nbt_47065_1_2018_pad.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listPad(@RequestBody String receivedData) throws Exception {
        FabMethodInput input = gson.fromJson(receivedData, FabMethodInput.class);
        return gson.toJson(saddleService.listPad(input.getMtl(), input.getDn(), input.getQ(), input.getFabMethod()));
    }

    @ResponseBody
    @RequestMapping(value = {"list_nbt_47065_1_2018_angle.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listAngle(@RequestBody String receivedData) throws Exception {
        PadInput input = gson.fromJson(receivedData, PadInput.class);
        return gson.toJson(saddleService.listAngle(input.getMtl(), input.getDn(), input.getQ(), input.getFabMethod(), input.getPad()));
    }

    @ResponseBody
    @RequestMapping(value = {"list_nbt_47065_1_2018_symbol.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String listSymbol(@RequestBody String receivedData) throws Exception {
        AngleInput input = gson.fromJson(receivedData, AngleInput.class);
        return gson.toJson(saddleService.listSymbol(input.getMtl(), input.getDn(), input.getQ(), input.getFabMethod(), input.getPad(), input.getAngle()));
    }

    @ResponseBody
    @RequestMapping(value = {"list_nbt_47065_1_2018_details.action"}, method = {RequestMethod.POST}, produces = {"text/html;charset=UTF-8"})
    public String getData(@RequestBody String receivedData) throws Exception {
        SymbolInput input = gson.fromJson(receivedData, SymbolInput.class);
        SaddleData result = saddleService.getData(input.getMtl(), input.getDn(), input.getQ(), input.getFabMethod(), input.getPad(), input.getAngle(), input.getSymbol());
        return gson.toJson(result);
    }
}
