import com.mechw.service.docx.DocxTool;
import com.mechw.service.param.ParamConnPool;
import com.ptc.cipjava.jxthrowable;
import com.ptc.pfc.pfcAsyncConnection.AsyncConnection;
import com.ptc.pfc.pfcModel.Model;
import com.ptc.pfc.pfcModel.ModelDescriptor;
import com.ptc.pfc.pfcModel.ModelType;
import com.ptc.pfc.pfcModel.pfcModel;
import com.ptc.pfc.pfcModelItem.*;
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

public class Main extends DocxTool {

    public static void main (String [] args) throws jxthrowable, IOException {

        String template = "D:/mechw/static/west/cal/a/a/a/a/aaaa.prt";
        File templateFile = new File(template);

        String baseFileName = "/2018/09/08/21/23/1230000000";

        String docName = "D:/data" + baseFileName + ".prt";
        Path docPath = Paths.get(docName);
        Files.createDirectories(docPath.getParent());
        Files.createFile(docPath);
        File docFile = new File(docName);

        DocxTool.copyDocx(templateFile, docFile);

        // 创建新链接到 Creo
        AsyncConnection connection = ParamConnPool.getConnection();
        Session session = connection.GetSession();

        // 获取模型
        ModelDescriptor md = pfcModel.ModelDescriptor_Create(ModelType.MDL_PART, docName, null);
        RetrieveModelOptions rmo = pfcSession.RetrieveModelOptions_Create();
        rmo.SetAskUserAboutReps(false);
        Model model = session.RetrieveModelWithOpts(md, rmo);
        Solid solid = (Solid)model;

        // 遍历参数并设置新值
        Parameters params = solid.ListParams();
        Parameter param;
        String paramName;
        ParamValue paramValue;
        for (int i = 2; i < params.getarraysize(); i ++) {
            param = params.get(i);
            paramName = param.GetName();
            paramValue = param.GetValue();

            // 内直径
            if (Objects.equals(paramName, "INNER_DIAMETER")) {
                paramValue.SetDoubleValue(1000);
                param.SetValue(paramValue);
            }

            // 外直径
            else if (Objects.equals(paramName, "OUTER_DIAMETER")) {
                paramValue.SetDoubleValue(1040);
                param.SetValue(paramValue);
            }

            // 高度
            else if (Objects.equals(paramName, "HEIGHT")) {
                paramValue.SetDoubleValue(8000);
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
    }
}
