package com.mechw.service.asmprt.b;

import com.mechw.model.front.b.c.a.BCAModel;
import com.mechw.service.asmprt.ASMPRTTool;
import com.mechw.service.param.ParamConnPool;
import com.ptc.cipjava.jxthrowable;
import com.ptc.pfc.pfcAsyncConnection.AsyncConnection;
import com.ptc.pfc.pfcModel.Model;
import com.ptc.pfc.pfcModel.ModelDescriptor;
import com.ptc.pfc.pfcModel.ModelType;
import com.ptc.pfc.pfcModel.pfcModel;
import com.ptc.pfc.pfcModelItem.ParamValue;
import com.ptc.pfc.pfcModelItem.Parameter;
import com.ptc.pfc.pfcModelItem.Parameters;
import com.ptc.pfc.pfcSession.RetrieveModelOptions;
import com.ptc.pfc.pfcSession.Session;
import com.ptc.pfc.pfcSession.pfcSession;
import com.ptc.pfc.pfcSolid.Solid;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

public class ModelBC extends ASMPRTTool {

    /**
     * bca
     * 生成Creo模型
     *
     * @param baseFileName 基准文件名
     * @param bcaModel     模型数据
     * @return 模型 URL
     */
    public static String getBCA(String baseFileName, BCAModel bcaModel) throws jxthrowable, IOException {

        String template = "D:/mechw/static/west/cal/b/c/a/bca.prt";
        File templateFile = new File(template);

        String asmprtName = "D:/data" + baseFileName + ".prt";
        Path asmprtPath = Paths.get(asmprtName);
        Files.createDirectories(asmprtPath.getParent());
        Files.createFile(asmprtPath);
        File asmprtFile = new File(asmprtName);

        copyASMPRT(templateFile, asmprtFile);

        // 创建新链接到 Creo
        AsyncConnection connection = ParamConnPool.getConnection();
        Session session = connection.GetSession();

        // 获取模型
        ModelDescriptor md = pfcModel.ModelDescriptor_Create(ModelType.MDL_PART, asmprtName, null);
        RetrieveModelOptions rmo = pfcSession.RetrieveModelOptions_Create();
        rmo.SetAskUserAboutReps(false);
        Model model = session.RetrieveModelWithOpts(md, rmo);
        Solid solid = (Solid) model;

        // 遍历参数并设置新值
        Parameters params = solid.ListParams();
        Parameter param;
        String paramName;
        ParamValue paramValue;
        for (int i = 2; i < params.getarraysize(); i++) {
            param = params.get(i);
            paramName = param.GetName();
            paramValue = param.GetValue();

            // 内直径
            if (Objects.equals(paramName, "INNER_DIAMETER")) {
                paramValue.SetDoubleValue(bcaModel.getDi());
                param.SetValue(paramValue);
            }

            // 外直径
            else if (Objects.equals(paramName, "OUTER_DIAMETER")) {
                paramValue.SetDoubleValue(bcaModel.getDout());
                param.SetValue(paramValue);
            }

            // 高度
            else if (Objects.equals(paramName, "HEIGHT")) {
                paramValue.SetDoubleValue(bcaModel.getH());
                param.SetValue(paramValue);
            }
        }

        // 重新生成模型
        session.SetConfigOption("regen_failure_handling", "resolve_mode");
        solid.Regenerate(null);

        // 保存模型
        model.Save();

        // 内存中清除模型
        model.Erase();
        session.EraseUndisplayedModels();

        // 释放链接
        ParamConnPool.releaseConnection(connection);

        return "/data" + baseFileName + ".prt.2";
    }
}
