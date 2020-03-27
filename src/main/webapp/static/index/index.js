$(document).ready(function () {

    // 浏览器检测代码
    var userAgent = navigator.userAgent;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion === 7) {
            $.messager.alert('浏览器检测', '您使用的是IE7浏览器，请使用非IE浏览器访问本站', 'error');
        }
        else if (fIEVersion === 8) {
            $.messager.alert('浏览器检测', '您使用的是IE8浏览器，请使用非IE浏览器访问本站', 'error');
        }
        else if (fIEVersion === 9) {
            $.messager.alert('浏览器检测', '您使用的是IE9浏览器，请使用非IE浏览器访问本站', 'error');
        }
        else if (fIEVersion === 10) {
            $.messager.alert('浏览器检测', '您使用的是IE10浏览器，请使用非IE浏览器访问本站', 'error');
        }
        else {
            $.messager.alert('浏览器检测', '您使用的是IE6浏览器，请使用非IE浏览器访问本站', 'error');
        }
    }
    else if (isEdge) {
        $.messager.alert('浏览器检测', '您使用的是微软Edge浏览器，请使用非Edge浏览器访问本站', 'error');
    }
    else if (isIE11) {
        $.messager.alert('浏览器检测', '您使用的是IE11浏览器，请使用非IE浏览器访问本站', 'error');
    }

    let westcontent = $("#westcontent");
    let cal = $("#cal");
    let center = $("#center");
    let body = $("#body");
    let south = $("#south");

    let button = "<a id='ASMPRT' class='l-btn l-btn-small l-btn-disabled'>" +
        "<span class='l-btn-left l-btn-icon-left'>" +
        "<span id='ASMPRTTEXT' class='l-btn-text'>下载模型</span><span class='l-btn-icon icon-asmprt'>&ensp;</span>" +
        "</span>" +
        "</a>" +
        "<a id='DWG' class='l-btn l-btn-small l-btn-disabled'>" +
        "<span class='l-btn-left l-btn-icon-left'>" +
        "<span id='DWGTEXT' class='l-btn-text'>下载图纸</span><span class='l-btn-icon icon-cad'>&ensp;</span>" +
        "</span>" +
        "</a>" +
        "<a id='DOCX' class='l-btn l-btn-small l-btn-disabled'>" +
        "<span class='l-btn-left l-btn-icon-left'>" +
        "<span id='DOCXTEXT' class='l-btn-text'>下载计算书</span><span class='l-btn-icon icon-word'>&ensp;</span>" +
        "</span>" +
        "</a>";

    let waitting = "<div style='display:table;height:100%;width:100%'>" +
        "<h3 style='display:table-cell;vertical-align:middle;text-align:center;'>" +
        "<i class='fa fa-spinner fa-spin fa-2x fa-fw'></i>" +
        "</h3>" +
        "</div>";

    let currentContentName = null;

    // init Modal
    let loading = "数据加载中......";
    let modalArray = [
        "BCFA", "BCFB",
        "CBA",
        "EAA", "EAB",
        "YAA", "YAB", "YAC", "YAD", "YAE", "YAF", "YAG", "YAH",
        "YCAA", "YCAB", "YCB", "YCC", "YCD", "YCE", "YCF", "YCG", "YCH", "YCI",
        "ZACA", "ZACB",
        "ZAJA", "ZAJB",
        "ZZA", "ZZB",
        "ZZCA", "ZZCB", "ZZCC", "ZZCE", "ZZCF", "ZZCG", "ZZCI",
        "ZZDA", "ZZDB", "ZZDC", "ZZDD",
        "ZZI",
        "HELPZA", "HELPZB"];
    for (let i = 0; i < modalArray.length; i++) {
        let name = modalArray[i];
        body.append("<div id='" + name + "DIV' class='popWindow'></div>");
        if (name === "BCFA") {
            initModal(name, "NB/T 47003.1-2009 序号1平盖厚度及加强角钢规格(表6-5)");
        }
        else if (name === "BCFB") {
            initModal(name, "NB/T 47003.1-2009 序号2平盖厚度及加强角钢规格(表6-5)");
        }
        else if (name === "CBA") {
            initModal(name, "螺旋导流板作为内筒体外压加强圈的判定");
        }
        else if (name === "EAA") {
            initModal(name, "附录 A 表 A.1 ZX(薄壁整体成形单层或多层) 型膨胀节波形参数");
        }
        else if (name === "EAB") {
            initModal(name, "附录 A 表 A.2 ZD(厚壁整体成形单层)型、HZ(厚壁整体成形单层带直边)型膨胀节波形参数(单层 n=1)");
        }
        else if (name === "YAA") {
            initModal(name, "HG/T 21574-2008 TP(立式容器板式无垫板)吊耳选型及尺寸查询");
        }
        else if (name === "YAB") {
            initModal(name, "HG/T 21574-2008 TPP(立式容器板式有垫板)吊耳选型及尺寸查询");
        }
        else if (name === "YAC") {
            initModal(name, "HG/T 21574-2008 HP(卧式容器板式)吊耳选型及尺寸查询");
        }
        else if (name === "YAD") {
            initModal(name, "HG/T 21574-2008 SP(立式容器侧壁板式)吊耳选型及尺寸查询");
        }
        else if (name === "YAE") {
            initModal(name, "HG/T 21574-2008 AXA(轻型轴式)吊耳选型及尺寸查询");
        }
        else if (name === "YAF") {
            initModal(name, "HG/T 21574-2008 AXB(轴式)吊耳选型及尺寸查询");
        }
        else if (name === "YAG") {
            initModal(name, "HG/T 21574-2008 AXC(重型轴式)吊耳选型及尺寸查询");
        }
        else if (name === "YAH") {
            initModal(name, "HG/T 21574-2008 AP 尾部吊耳选型及尺寸查询");
        }
        else if (name === "YBA") {
            initModal(name, "NB/T 47065-2018 标准鞍式支座选型及尺寸查询");
        }
        else if (name === "YCAA") {
            initModal(name, "GB/T 706-2016 等边角钢特性查询");
        }
        else if (name === "YCAB") {
            initModal(name, "YB/T 5309-2006 不锈钢等边角钢特性查询");
        }
        else if (name === "YCB") {
            initModal(name, "GB/T 706-2016 槽钢特性查询");
        }
        else if (name === "YCC") {
            initModal(name, "GB/T 706-2016 工字钢特性查询");
        }
        else if (name === "YCD") {
            initModal(name, "GB/T 706-2016 不等边角钢特性查询");
        }
        else if (name === "YCE") {
            initModal(name, "GB/T 11263-2017 H型钢特性查询");
        }
        else if (name === "YCF") {
            initModal(name, "GB/T 11263-2017 T型钢特性查询");
        }
        else if (name === "YCG") {
            initModal(name, "GB/T 6728-2017 方形型钢特性查询");
        }
        else if (name === "YCH") {
            initModal(name, "GB/T 6728-2017 矩形型钢特性查询");
        }
        else if (name === "YCI") {
            initModal(name, "GB/T 6728-2017 圆形型钢特性查询");
        }
        else if (name === "ZACA") {
            initModal(name, "HG 20660-2000《压力容器中化学介质毒性危害和爆炸危险程度分类》");
        }
        else if (name === "ZACB") {
            initModal(name, "HG/T 20660-2017《压力容器中化学介质毒性危害和爆炸危险程度分类标准》");
        }
        else if (name === "ZAJA") {
            initModal(name, "封头成形厚度变化图示");
        }
        else if (name === "ZAJB") {
            initModal(name, "GB/T 25198-2010 封头成形厚度减薄率");
        }
        else if (name === "ZZA") {
            initModal(name, "GB/T 25198-2010 封头表面积、容积、重量、纤维伸长率计算");
        }
        else if (name === "ZZB") {
            initModal(name, "常见几何体表面积、体积、重量计算");
        }
        else if (name === "ZZCA") {
            initModal(name, "立式平底储罐液位-容积计算");
        }
        else if (name === "ZZCB") {
            initModal(name, "立式椭圆(2:1)封头储罐液位-容积计算");
        }
        else if (name === "ZZCC") {
            initModal(name, "立式球形封头储罐液位-容积计算");
        }
        else if (name === "ZZCE") {
            initModal(name, "卧式平头储罐液位-容积计算");
        }
        else if (name === "ZZCF") {
            initModal(name, "卧式椭圆(2:1)封头储罐液位-容积计算");
        }
        else if (name === "ZZCG") {
            initModal(name, "卧式球形封头储罐液位-容积计算");
        }
        else if (name === "ZZCI") {
            initModal(name, "球形储罐液位-容积计算");
        }
        else if (name === "ZZDA") {
            initModal(name, "一次线性插值计算");
        }
        else if (name === "ZZDB") {
            initModal(name, "二次线性插值计算");
        }
        else if (name === "ZZDC") {
            initModal(name, "三次线性插值计算");
        }
        else if (name === "ZZDD") {
            initModal(name, "对数坐标插值计算");
        }
        else if (name === "ZZI") {
            initModal(name, "单位换算");
        }
        else if (name === "HELPZA") {
            $('#HELPZADIV').dialog({
                title: "更新日志",
                width: "70%",
                height: "80%",
                closed: true,
                cache: false,
                href: "/updates.html",
                loadingMessage: loading,
                modal: true,
                onResize: function () {
                    $(this).dialog("center");
                },
                onLoad: function () {
                    $("#HELPZADIV").mCustomScrollbar({theme: "minimal-dark"});
                },
                onClose: function () {
                    $("#HELPZADIV").mCustomScrollbar("destroy");
                }
            });
        }
        else if (name === "HELPZB") {
            $('#HELPZBDIV').dialog({
                title: "使用必读",
                width: "70%",
                height: "80%",
                closed: true,
                cache: false,
                href: "/readme.html",
                loadingMessage: loading,
                modal: true,
                onResize: function () {
                    $(this).dialog("center");
                },
                onLoad: function () {
                    $("#HELPZBDIV").mCustomScrollbar({theme: "minimal-dark"});
                },
                onClose: function () {
                    $("#HELPZBDIV").mCustomScrollbar("destroy");
                }
            });
        }
    }

    function initModal(ribbonName, modalTitle) {
        let url = "/static/west/cal/" + ribbonName.toLowerCase().split("").join("/") + "/" + ribbonName + ".html";
        $("#" + ribbonName + "DIV").dialog({
            title: modalTitle,
            width: "90%",
            height: "90%",
            closed: true,
            cache: false,
            href: url,
            loadingMessage: loading,
            modal: true,
            onResize: function () {
                $(this).dialog("center");
            },
            onLoad: function () {
                $("#" + ribbonName + "DIV").mCustomScrollbar({theme: "minimal-dark"});
                $.messager.show({
                    id: "AjaxAlert",
                    title: "",
                    width: 300,
                    height: 30,
                    msg: '',
                    showType: 'fade',
                    timeout: 0,
                    style: {
                        right: '',
                        top: document.body.scrollTop + document.documentElement.scrollTop,
                        bottom: '',
                        borderWidth: 0,
                        padding: "4px 0 0",
                        background: "transparent"
                    }
                });
            },
            onClose: function () {
                $("#" + ribbonName + "DIV").mCustomScrollbar("destroy");
                $("#AjaxAlert").window('destroy');
            }
        });
    }

    // Ribbon
    let noActionArray = [
        "AAA", "AAF", "AAG", "AAH", "AAK",
        "ACA", "ACB", "ACC", "ACD", "ACE",
        "AZA", "AZB", "AZC",
        "BAA", "BAB", "BAE", "BAF", "BAG", "BAH", "BAI",
        "BBA", "BBD",
        "BCB", "BCC", "BCD", "BCE", "BCF", "BCG", "BCH",
        "CAA", "CAB", "CAC", "CAD", "CAE", "CAF",
        "XAB",
        "XBA", "XBB",
        "YCA",
        "ZAC", "ZAJ",
        "ZZC", "ZZD", "ZZE", "ZZH",
        "HELPAA", "HELPAB", "HELPAC"];

    function initCalD2D3() {
        westcontent.layout("add", {
            id: "button",
            region: "south",
            border: false,
            height: 36,
            content: button
        });

        center.html("<div id='centerContent' class='easyui-layout'></div>");
        let centerContent = $("#centerContent");
        centerContent.layout({
            border: false,
            fit: true
        });
        centerContent.layout("add", {
            id: "tool",
            region: "east",
            border: false,
            width: 30
        });
        centerContent.layout("add", {
            id: "canvas",
            region: "center",
            border: false
        });

        $("#canvas").html("<div id='d2d3'>" +
            "<div id='d2' title='2D'></div>" +
            "<div id='d3' title='3D'></div>" +
            "</div>");

        $("#d2d3").tabs({
            fit: true,
            border: false,
            plain: true,
            tabPosition: "bottom",
            selected: 0
        });
    }

    function initCalSheet(ribbonName, sheetName) {
        let url = "/static/west/cal/" + ribbonName.toLowerCase().split("").join("/") + "/" + ribbonName + ".js";
        $.ajax({
            type: "GET",
            url: url,
            dataType: "script",
            async: true,
            beforeSend: function () {
                cal.html(waitting);
            },
            success: function () {
                south.html(sheetName + "加载成功！").css("color", "#444")
            },
            error: function () {
                cal.html(
                    "<div style='display:table;height:100%;width:100%'>" +
                    "<h3 style='display:table-cell;vertical-align:middle;text-align:center;color:red'>" +
                    "数据加载失败，请检查网络后重试！" +
                    "</h3>" +
                    "</div>"
                );
                south.html(sheetName + "加载失败，请检查网络后重试").css("color", "red");
            }
        });
    }

    $.getJSON("/static/north/north.json", function (result) {
        $("#north").ribbon({
            data: result,
            onClick: function (name) {
                // Open Modal
                if ($.inArray(name, modalArray) >= 0) {
                    $("#" + name + "DIV").dialog("open");
                }
                // calSheet
                else {
                    if ($.inArray(name, noActionArray) < 0 && name !== currentContentName) {

                        westcontent.layout("remove", "south");
                        cal.mCustomScrollbar("destroy").empty();
                        center.mCustomScrollbar("destroy").removeClass("text").removeClass("sharp").empty();

                        if (name === "AAAA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 单层圆筒内压计算模块");
                        }
                        else if (name === "AAAB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 多层圆筒内压计算模块");
                        }
                        else if (name === "AAB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 椭圆封头内压计算模块");
                        }
                        else if (name === "AAC") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 半球形封头内压计算模块");
                        }
                        else if (name === "AAD") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 碟形封头内压计算模块");
                        }
                        else if (name === "AAE") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 球冠形封头凹面受压计算模块");
                        }
                        else if (name === "AAFA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 锥形筒节计算模块");
                        }
                        else if (name === "AAFB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 无折边锥壳大端计算模块");
                        }
                        else if (name === "AAFC") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 带折边锥壳大端计算模块");
                        }
                        else if (name === "AAFD") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 无折边锥壳小端计算模块");
                        }
                        else if (name === "AAFE") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 带折边锥壳小端计算模块");
                        }
                        else if (name === "AAFF") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 大端无折边、小端无折边锥壳计算模块");
                        }
                        else if (name === "AAFG") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 大端有折边、小端无折边锥壳计算模块");
                        }
                        else if (name === "AAFH") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 大端有折边、小端有折边锥壳计算模块");
                        }
                        else if (name === "AAGA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 大锥角锥壳计算模块");
                        }
                        else if (name === "AAGB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 大锥角锥壳计算模块");
                        }
                        else if (name === "AAGC") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 大锥角锥壳计算模块");
                        }
                        else if (name === "AAHA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 与壳体搭接 Ω 膨胀节计算模块");
                        }
                        else if (name === "AAHB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 与壳体对接 Ω 膨胀节计算模块");
                        }
                        else if (name === "AAI") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 内压弯头计算模块");
                        }
                        else if (name === "AAJ") {
                            initCalD2D3();
                            initCalSheet(name, "半圆形压力容器计算模块");
                        }
                        else if (name === "AAKA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 薄壁椭圆封头内压计算模块");
                        }
                        else if (name === "AAKB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 薄壁碟形封头内压计算模块");
                        }
                        else if (name === "ABA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 大锥角封头外压计算模块");
                        }
                        else if (name === "ACAA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 圆筒体插入式接管开孔补强计算模块");
                        }
                        else if (name === "ACAB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 圆筒体安放式接管开孔补强计算模块");
                        }
                        else if (name === "ACBA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 球形封头插入式接管开孔补强计算模块");
                        }
                        else if (name === "ACBB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 球形封头安放式接管开孔补强计算模块");
                        }
                        else if (name === "ACCA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 椭圆封头插入式接管开孔补强计算模块");
                        }
                        else if (name === "ACCB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 椭圆封头安放式接管开孔补强计算模块");
                        }
                        else if (name === "ACDA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 碟形封头插入式接管开孔补强计算模块");
                        }
                        else if (name === "ACDB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 碟形封头安放式接管开孔补强计算模块");
                        }
                        else if (name === "ACEA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 锥壳段接管开孔补强计算模块");
                        }
                        else if (name === "AZAA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 气体储罐安全泄放量计算模块");
                        }
                        else if (name === "AZAB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 蒸汽发生器安全泄放量计算模块");
                        }
                        else if (name === "AZAC") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 易爆液化气体容器安全泄放量计算模块");
                        }
                        else if (name === "AZAD") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 非易爆液化气体容器安全泄放量计算模块");
                        }
                        else if (name === "AZBA") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 气体超压泄放面积计算模块");
                        }
                        else if (name === "AZBB") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 饱和蒸汽超压泄放面积计算模块");
                        }
                        else if (name === "AZBC") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 黏滞性液体超压泄放面积计算模块");
                        }
                        else if (name === "AZBD") {
                            initCalD2D3();
                            initCalSheet(name, "GB/T 150-2011 非黏滞性液体超压泄放面积计算模块");
                        }
                        else if (name === "AZCA") {
                            initCalD2D3();
                            initCalSheet(name, "API 521-2014 安全阀泄放噪声计算模块");
                        }
                        else if (name === "AZCB") {
                            initCalD2D3();
                            initCalSheet(name, "API 520.2-2015 气体安全阀泄放反力计算模块");
                        }
                        else if (name === "AZCC") {
                            initCalD2D3();
                            initCalSheet(name, "API 520.2-2015 液体安全阀泄放反力计算模块");
                        }
                        else if (name === "BAAA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 带加强筋的矩形容器顶板计算模块");
                        }
                        else if (name === "BAAB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 不带加强筋的矩形容器顶板计算模块");
                        }
                        else if (name === "BABA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 型钢支承的矩形容器底板计算模块");
                        }
                        else if (name === "BAC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 A 型(不加固型)矩形容器计算模块");
                        }
                        else if (name === "BAD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 B 型(顶边加固型)矩形容器计算模块");
                        }
                        else if (name === "BAEA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 C 型(顶边加固、垂直加固、有拉杆)矩形容器计算模块");
                        }
                        else if (name === "BAEB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 C 型(顶边加固、垂直加固、无拉杆)矩形容器计算模块");
                        }
                        else if (name === "BAFA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 D 型(顶边加固、1个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAFB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 D 型(顶边加固、2个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAFC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 D 型(顶边加固、3个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAFD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 D 型(顶边加固、4个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、有拉杆、1个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、无拉杆、1个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、有拉杆、2个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、无拉杆、2个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGE") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、有拉杆、3个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGF") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、无拉杆、3个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGG") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、有拉杆、4个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAGH") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 E 型(顶边加固、无拉杆、4个横向加固圈)矩形容器计算模块");
                        }
                        else if (name === "BAHA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 F 型矩形容器第一层拉杆及顶边加固件计算模块");
                        }
                        else if (name === "BAHB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 F 型矩形容器第 i 层(i ≥ 2)拉杆计算模块");
                        }
                        else if (name === "BAIA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 一层中间联杆的 G 型矩形容器计算模块");
                        }
                        else if (name === "BAIB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 二层中间联杆的 G 型矩形容器计算模块");
                        }
                        else if (name === "BAJ") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 矩形法兰计算模块");
                        }
                        else if (name === "BCA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 圆柱筒体计算模块");
                        }
                        else if (name === "BCBA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 椭圆封头计算模块");
                        }
                        else if (name === "BCBB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 半球封头计算模块");
                        }
                        else if (name === "BCBC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 碟形封头计算模块");
                        }
                        else if (name === "BCCA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 厚壁加强的球冠形端封头计算模块");
                        }
                        else if (name === "BCCB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 垫板加强的球冠形端封头计算模块");
                        }
                        else if (name === "BCCC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 扁钢加强的球冠形端封头计算模块");
                        }
                        else if (name === "BCCD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 角钢加强的球冠形端封头计算模块");
                        }
                        else if (name === "BCDA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 厚壁加强的球冠形中间封头计算模块");
                        }
                        else if (name === "BCDB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 垫板加强的球冠形中间封头计算模块");
                        }
                        else if (name === "BCDC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 扁钢加强的球冠形中间封头计算模块");
                        }
                        else if (name === "BCDD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 角钢加强的球冠形中间封头计算模块");
                        }
                        else if (name === "BCEA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 锥壳中间段(α≤60°)计算模块");
                        }
                        else if (name === "BCEB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 不带折边锥壳小端(α≤60°)计算模块");
                        }
                        else if (name === "BCEC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 不带折边锥壳大端(α≤60°)计算模块");
                        }
                        else if (name === "BCED") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 大端无折边、小端无折边锥壳(α≤60°)计算模块");
                        }
                        else if (name === "BCEE") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 大锥角无折边锥壳(α≥70°)计算模块");
                        }
                        else if (name === "BCEF") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 大锥角无折边、有加强圈锥壳(α≥70°)计算模块");
                        }
                        else if (name === "BCEG") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 大锥角带折边锥壳(α≥70°)计算模块");
                        }
                        else if (name === "BCFC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号3圆形平盖计算模块");
                        }
                        else if (name === "BCFD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号4圆形平盖计算模块");
                        }
                        else if (name === "BCFE") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号5圆形平盖计算模块");
                        }
                        else if (name === "BCFF") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号6圆形平盖计算模块");
                        }
                        else if (name === "BCFG") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号7圆形平盖计算模块");
                        }
                        else if (name === "BCFH") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号8圆形平盖计算模块");
                        }
                        else if (name === "BCFI") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号9圆形平盖计算模块");
                        }
                        else if (name === "BCFJ") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号10圆形平盖计算模块");
                        }
                        else if (name === "BCFK") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号11圆形平盖计算模块");
                        }
                        else if (name === "BCFL") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号12圆形平盖计算模块");
                        }
                        else if (name === "BCFM") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号13圆形平盖计算模块");
                        }
                        else if (name === "BCFN") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号14圆形平盖计算模块");
                        }
                        else if (name === "BCFO") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号15圆形平盖计算模块");
                        }
                        else if (name === "BCFP") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号16圆形平盖计算模块");
                        }
                        else if (name === "BCGA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号5：与筒体角焊连接非圆形平盖计算模块");
                        }
                        else if (name === "BCGB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号6：与筒体角焊连接非圆形平盖计算模块");
                        }
                        else if (name === "BCGC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号9：与筒体角焊连接非圆形平盖计算模块");
                        }
                        else if (name === "BCGD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 序号16：螺栓连接(宽面垫片)非圆形平盖计算模块");
                        }
                        else if (name === "BCHA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 与壳体搭接 Ω 膨胀节计算模块");
                        }
                        else if (name === "BCHB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 与壳体对接 Ω 膨胀节计算模块");
                        }
                        else if (name === "BCI") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 内压弯头计算模块");
                        }
                        else if (name === "BCJ") {
                            initCalD2D3();
                            initCalSheet(name, "半圆形常压容器计算模块");
                        }
                        else if (name === "BDA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 圆柱筒体开孔补强计算模块");
                        }
                        else if (name === "BDB") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 球形封头开孔补强计算模块");
                        }
                        else if (name === "BDC") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 椭圆形封头开孔补强计算模块");
                        }
                        else if (name === "BDD") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 碟形封头开孔补强计算模块");
                        }
                        else if (name === "BDE") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 锥形封头开孔补强计算模块");
                        }
                        else if (name === "CAAA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 短管支撑式蜂窝夹套计算模块");
                        }
                        else if (name === "CABA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 锥体支撑式蜂窝夹套计算模块");
                        }
                        else if (name === "CACA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 螺旋分隔式型钢夹套计算模块");
                        }
                        else if (name === "CACB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 螺旋互搭式型钢夹套计算模块");
                        }
                        else if (name === "CADA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 轴线分隔式型钢夹套计算模块");
                        }
                        else if (name === "CADB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 轴线互搭式型钢夹套计算模块");
                        }
                        else if (name === "CAEA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 螺旋焊接外盘管计算模块");
                        }
                        else if (name === "CAFA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 圆筒体半圆管夹套计算模块");
                        }
                        else if (name === "CAFB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 球形封头半圆管夹套计算模块");
                        }
                        else if (name === "CAFC") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 椭圆封头半圆管夹套计算模块");
                        }
                        else if (name === "CAFD") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 碟形封头半圆管夹套计算模块");
                        }
                        else if (name === "CAG") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20569-2013 筒体轴向稳定性计算模块");
                        }
                        else if (name === "DAA") {
                            initCalD2D3();
                            initCalSheet(name, "ASME VIII-1-2017 内压圆筒强度计算模块");
                        }
                        else if (name === "XAA") {
                            initCalD2D3();
                            initCalSheet(name, "SH/T 3098-2011 填料栅板强度计算模块");
                        }
                        else if (name === "XABA") {
                            initCalD2D3();
                            initCalSheet(name, "SH/T 3098-2011 工形填料支承梁强度计算模块");
                        }
                        else if (name === "XABB") {
                            initCalD2D3();
                            initCalSheet(name, "SH/T 3098-2011 槽形填料支承梁强度计算模块");
                        }
                        else if (name === "XABC") {
                            initCalD2D3();
                            initCalSheet(name, "SH/T 3098-2011 L形填料支承梁强度计算模块");
                        }
                        else if (name === "XABD") {
                            initCalD2D3();
                            initCalSheet(name, "SH/T 3098-2011 槽形填料支承梁强度计算模块");
                        }
                        else if (name === "XBAA") {
                            initCalD2D3();
                            initCalSheet(name, "NB/T 47003.1-2009 不带整体加强环耳式支座计算模块");
                        }
                        else if (name === "XBAB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 带整体加强环、带垫板的耳式支座计算模块");
                        }
                        else if (name === "XBAC") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 20582-2011 带整体加强环、不带垫板的耳式支座计算模块");
                        }
                        else if (name === "XBBA") {
                            initCalD2D3();
                            initCalSheet(name, "JB/T 4712.2-2007 管制腿式支座计算模块");
                        }
                        else if (name === "XBBB") {
                            initCalD2D3();
                            initCalSheet(name, "JB/T 4712.2-2007 等边角钢腿式支座计算模块");
                        }
                        else if (name === "XBBC") {
                            initCalD2D3();
                            initCalSheet(name, "JB/T 4712.2-2007 槽钢腿式支座计算模块");
                        }
                        else if (name === "XBBD") {
                            initCalD2D3();
                            initCalSheet(name, "JB/T 4712.2-2007 工字钢腿式支座计算模块");
                        }
                        else if (name === "XBBE") {
                            initCalD2D3();
                            initCalSheet(name, "JB/T 4712.2-2007 H型钢腿式支座计算模块");
                        }
                        else if (name === "XCA") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 21574-2008 立式容器板式吊耳(TP/TPP)计算模块");
                        }
                        else if (name === "XCB") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 21574-2008 卧式容器板式吊耳(HP)计算模块");
                        }
                        else if (name === "XCC") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 21574-2008 立式容器侧壁板式吊耳(SP)计算模块");
                        }
                        else if (name === "XCD") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 21574-2008 轴式吊耳(AXA/B/C)计算模块");
                        }
                        else if (name === "XCE") {
                            initCalD2D3();
                            initCalSheet(name, "HG/T 21574-2008 尾部吊耳(AP)计算模块");
                        }
                        else if (name === "XDA") {
                            initCalD2D3();
                            initCalSheet(name, "人孔起吊配件计算模块");
                        }
                        else if (name === "XDB") {
                            initCalD2D3();
                            initCalSheet(name, "U形管热应力计算模块");
                        }
                        else if (name === "ZAA") {
                            center.addClass("sharp");
                            initCalSheet(name, "TSG 21-2016 容器划类模块");
                        }
                        else if (name === "ZAB") {
                            center.addClass("text");
                            initCalSheet(name, "GB 压力容器标准总结模块");
                        }
                        else if (name === "ZAD") {
                            center.addClass("text");
                            initCalSheet(name, "ASME 标准规范模块");
                        }
                        else if (name === "ZAE") {
                            center.addClass("text");
                            initCalSheet(name, "GB 容器规范模块");
                        }
                        else if (name === "ZAF") {
                            center.addClass("text");
                            initCalSheet(name, "GB 紧固件规范模块");
                        }
                        else if (name === "ZAG") {
                            center.addClass("text");
                            initCalSheet(name, "GB 制图规范模块");
                        }
                        else if (name === "ZAH") {
                            center.addClass("text");
                            initCalSheet(name, "容器参考书模块");
                        }
                        else if (name === "ZAI") {
                            center.addClass("text");
                            initCalSheet(name, "容器术语模块");
                        }
                        else if (name === "ZBA") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBB") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBC") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBD") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBE") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBF") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBG") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBH") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBI") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBJ") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBK") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBL") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBM") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBN") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZBO") {
                            initCalD2D3();
                            initCalSheet(name, "截面力学特性计算模块");
                        }
                        else if (name === "ZZEA") {
                            initCalD2D3();
                            initCalSheet(name, "液体自流排净时间计算模块");
                        }
                        else if (name === "ZZEB") {
                            initCalD2D3();
                            initCalSheet(name, "液体自流排净时间计算模块");
                        }
                        else if (name === "ZZEC") {
                            initCalD2D3();
                            initCalSheet(name, "液体自流排净时间计算模块");
                        }
                        else if (name === "ZZED") {
                            initCalD2D3();
                            initCalSheet(name, "液体自流排净时间计算模块");
                        }
                        else if (name === "ZZF") {
                            initCalD2D3();
                            initCalSheet(name, "法兰当量设计压力计算模块");
                        }
                        else if (name === "ZZG") {
                            initCalD2D3();
                            initCalSheet(name, "介质静压力计算模块");
                        }
                        else if (name === "ZZHA") {
                            initCalD2D3();
                            initCalSheet(name, "盘管(半管)计算模块");
                        }
                        else if (name === "ZZHB") {
                            initCalD2D3();
                            initCalSheet(name, "盘管(全管)计算模块");
                        }
                        else if (name === "ZZJ") {
                                initCalD2D3();
                                initCalSheet(name, "钢的伸长率换算模块");
                            }
                    }
                    currentContentName = name;
                }
            }
        });
    });

    NProgress.done();

    $.messager.alert({
        title: '通 知',
        msg: "本站程序提供上门安装服务<br>详请联系：微信号，cumtedu；QQ：242793707。",
        width: 400,
        ok: "确定"
    });
});