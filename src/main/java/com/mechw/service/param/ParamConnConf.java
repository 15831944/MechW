package com.mechw.service.param;

public class ParamConnConf {

    // Parametric 程序路径
    public static final String PARAMETRIC_PATH = "C:/Program Files/PTC/Creo 4.0/M050/Parametric/bin/parametric.bat";

    // 运行参数
    //public static final String OPTION = null;
    //public static final String OPTION = "-g:no_graphics -i:rpc_input";
    public static final String OPTION = "-g:no_graphics";
    //public static final String OPTION = "-i:rpc_input";

    // 上下文，简单异步模式应为null
    public static final String TEXT_DIR = null;
    //public static final String TEXT_DIR = "C:/Program Files/PTC/Creo 4.0/M050/Parametric/text";

    // 最小容量
    public static final int MIN_SIZE = 2;

    // 最大容量
    public static final int MAX_SIZE = 4;

    // 步进大小
    public static final int STEP = 1;
}
