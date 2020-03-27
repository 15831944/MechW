$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let azbaSketch = $("#d2");
    let azbaModel = $("#d3");
    let azbad2d3 = $('#d2d3');

    $("#cal").html("<table id='azba'></table>");
    let pg = $("#azba");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/z/b/a/AZBA.json", function (result) {

        let columns, rows;

        function azba2d() {

            azbaSketch.empty();

            let width = azbaSketch.width();
            let height = azbaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AZBASVG").attr("height", height);

            // X 轴比例尺
            let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

            // Y 轴比例尺
            let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

            // 添加划类线
            let line = d3.line().x(function (d) {
                return xScale(d.x);
            }).y(function (d) {
                return yScale(d.y);
            });

            // 图形边距
            let padding = 100;
            let hg = (height - 2 * padding) / 4;
            let wg = (width - 2 * padding) / 4;

            // 直线
            function drawLine(startX, startY, endX, endY) {
                svg.append("path").attr("d", line([
                    {x: startX, y: startY},
                    {x: endX, y: endY}
                ])).classed("sketch", true);
            }

            // 中心线
            function drawCenterLine(startX, startY, endX, endY) {
                svg.append("path").attr("d", line([
                    {x: startX, y: startY},
                    {x: endX, y: endY}
                ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);
            }

            // 尺寸界线-上方垂直
            function extLineTopV(x, y) {
                svg.append("path").attr("d", line([
                    {x: x, y: y - 3},
                    {x: x, y: y - 40}
                ])).classed("sketch", true);
            }

            // 尺寸界线-下方垂直
            function extLineBottomV(x, y) {
                svg.append("path").attr("d", line([
                    {x: x, y: y + 40},
                    {x: x, y: y + 3}
                ])).classed("sketch", true);
            }

            // 尺寸界线-左侧水平
            function extLineLeftH(x, y) {
                svg.append("path").attr("d", line([
                    {x: x - 40, y: y},
                    {x: x - 3, y: y}
                ])).classed("sketch", true);
            }

            // 尺寸界线-右侧水平
            function extLineRightH(x, y) {
                svg.append("path").attr("d", line([
                    {x: x + 3, y: y},
                    {x: x + 40, y: y}
                ])).classed("sketch", true);
            }

            // 顶部水平标注
            function dimTopH(startX, startY, endX, endY, text, id) {

                extLineTopV(startX, startY);
                extLineTopV(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX, y: startY - 30},
                        {x: startX + 10, y: startY - 28},
                        {x: startX + 10, y: startY - 32},
                        {x: startX, y: startY - 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY - 30},
                        {x: endX - 10, y: endY - 28},
                        {x: endX - 10, y: endY - 32},
                        {x: endX, y: endY - 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX, y: startY - 30},
                    {x: endX, y: endY - 30}
                ]))
                    .attr("id", id).classed("sketch", true);
                svg.append("g").append("text").attr("x", 0)
                    .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id)
                    .attr("startOffset", "50%").text(text);

            }

            // 底部水平标注
            function dimBottomH(startX, startY, endX, endY, text, id) {

                extLineBottomV(startX, startY);
                extLineBottomV(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX, y: startY + 30},
                        {x: startX + 10, y: startY + 28},
                        {x: startX + 10, y: startY + 32},
                        {x: startX, y: startY + 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY + 30},
                        {x: endX - 10, y: endY + 28},
                        {x: endX - 10, y: endY + 32},
                        {x: endX, y: endY + 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX, y: startY + 30},
                    {x: endX, y: endY + 30}
                ])).attr("id", id).classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%")
                    .text(text);

            }

            // 左侧垂直标注
            function dimLeftV(startX, startY, endX, endY, text, id) {

                extLineLeftH(startX, startY);
                extLineLeftH(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX - 30, y: startY},
                        {x: startX - 28, y: startY - 10},
                        {x: startX - 32, y: startY - 10},
                        {x: startX - 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 28, y: endY + 10},
                        {x: endX - 32, y: endY + 10},
                        {x: endX - 30, y: endY}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX - 30, y: startY},
                    {x: endX - 30, y: endY}
                ])).attr("id", id).classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

            }

            // 右侧侧垂直标注
            function dimRightV(startX, startY, endX, endY, text, id) {

                extLineRightH(startX, startY);
                extLineRightH(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX + 30, y: startY},
                        {x: startX + 28, y: startY - 10},
                        {x: startX + 32, y: startY - 10},
                        {x: startX + 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX + 30, y: endY},
                        {x: endX + 28, y: endY + 10},
                        {x: endX + 32, y: endY + 10},
                        {x: endX + 30, y: endY}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX + 30, y: startY},
                    {x: endX + 30, y: endY}
                ])).attr("id", id).classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id)
                    .attr("startOffset", "50%").text(text);

            }

            // 画圆弧/椭圆弧
            function drawArc(radiusX, radiusY, startX, startY, endX, endY) {
                svg.append("path").attr("d", "M "
                    + startX + " " + startY + " "
                    + "A" + radiusX + " " + radiusY + " "
                    + "1 0 1" + " "
                    + endX + " " + endY
                ).classed("sketch", true);
            }
        }

        azbad2d3.tabs('select', 1);
        currentTabIndex = azbad2d3.tabs('getTabIndex', azbad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            azba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#azba").length > 0) {
                    azba2d();
                }
            });
        }
        azbad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    azba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#azba").length > 0) {
                            azba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 气体泄放面积计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 210,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 113,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            onClickRow: function (index) {
                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                lastIndex = index;
            },
            onBeginEdit: function (index) {

                let dg = $(this);
                let ed = dg.propertygrid('getEditors', index)[0];
                if (!ed) {
                    return;
                }
                let t = $(ed.target);
                if (t.hasClass('combobox-f')) {
                    t.combobox('textbox').bind('focus', function () {
                        t.combobox('showPanel');
                    }).focus();
                    t.combobox({
                        onChange: function () {
                            window.setTimeout(function () {
                                dg.propertygrid('endEdit', index)
                            }, 50);
                        }
                    });
                }
                else {
                    t.textbox('textbox').bind('keydown', function (e) {
                        if (e.keyCode === 13) {
                            dg.propertygrid('endEdit', index);
                        }
                        else if (e.keyCode === 27) {
                            dg.propertygrid('cancelEdit', index);
                        }
                    }).focus();
                }
            },
            onEndEdit: function (index, row, changes) {
                if ((!jQuery.isEmptyObject(changes)) && (!jQuery.isEmptyObject(changes.value))) {

                    // docx button
                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    azbaSketch.empty();
                    azbaModel.empty();

                    // sketch
                    currentTabIndex = azbad2d3.tabs('getTabIndex', azbad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        azba2d();
                        azbaSketch.off("resize").on("resize", function () {
                            if ($("#azba").length > 0) {
                                azba2d();
                            }
                        });
                    }
                    azbad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                azba2d();
                                azbaSketch.off("resize").on("resize", function () {
                                    if ($("#azba").length > 0) {
                                        azba2d();
                                    }
                                });
                            }
                        }
                    });

                    south.empty();
                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // ws
                    let AZBAWS;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AZBAWS = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // pd
                    let AZBAPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        AZBAPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // deltap
                    let AZBADELTAP;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AZBADELTAP = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AZBAPF = AZBAPD + AZBADELTAP + 0.1;

                    // po
                    let AZBAPO;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < AZBAPF) {
                        AZBAPO = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= AZBAPF) {
                        south.html("背压不能大于等于 " + AZBAPF + " MPa").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    let AZBAPOPF = AZBAPO / AZBAPF;

                    // kr
                    let AZBAKR;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AZBAKR = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // tf
                    let AZBASTF;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AZBASTF = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AZBABTF = AZBASTF + 273.15;

                    // k
                    let AZBAK;
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        AZBAK = parseFloat(rows[6][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AZBAKALLOW = Math.pow(2 / (AZBAK + 1), AZBAK / (AZBAK - 1));

                    // m
                    let AZBAM;
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        AZBAM = parseFloat(rows[7][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // z
                    let AZBAZ;
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        AZBAZ = parseFloat(rows[8][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AZBAC = -1, AZBAA, AZBAD;
                    if (AZBAPOPF <= AZBAKALLOW) {
                        AZBAC = 520 * Math.sqrt(AZBAK * Math.pow((2 / (AZBAK + 1)), ((AZBAK + 1) / (AZBAK - 1))));
                        AZBAA = 13.16 * AZBAWS / (AZBAC * AZBAK * AZBAPF) * Math.sqrt(AZBAZ * AZBABTF / AZBAM);
                        AZBAD = Math.sqrt(4 * AZBAA / Math.PI);
                    }
                    else {
                        AZBAA = 1.79 / 100 * AZBAWS * Math.sqrt(AZBAZ * AZBABTF / AZBAM)
                            / (AZBAK * AZBAPF * Math.sqrt(AZBAK / (AZBAK - 1) * (Math.pow(AZBAPO / AZBAPF, 2 / AZBAK) - Math.pow(AZBAPO / AZBAPF, (AZBAK + 1) / AZBAK))));
                        AZBAD = Math.sqrt(4 * AZBAA / Math.PI);
                    }

                    south.html(
                        "<span style='color:#444444;'>" +
                        "所需最小泄放面积：" + AZBAA.toFixed(2) + " mm²" +
                        "</span>");

                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "最小流道直径：" + AZBAD.toFixed(2) + " mm" +
                        "</span>");

                    // docx
                    let AZBAPayJS = $('#payjs');

                    function getDocx() {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "azbadocx.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                ribbonName: "AZBA",

                                ws: AZBAWS,
                                pd: AZBAPD,
                                deltap: AZBADELTAP,
                                po: AZBAPO,
                                kr: AZBAKR,
                                stf: AZBASTF,
                                k: AZBAK,
                                m: AZBAM,
                                z: AZBAZ,
                                c: AZBAC.toFixed(2),
                                btf: AZBABTF.toFixed(2),
                                pf: AZBAPF.toFixed(2),
                                popf: AZBAPOPF.toFixed(2),
                                kallow: AZBAKALLOW.toFixed(2),
                                a: AZBAA.toFixed(2),
                                d: AZBAD.toFixed(2)
                            }),
                            beforeSend: function () {
                                docxtext.html("生成中" + "<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>");
                                docx.off("click");
                            },
                            success: function (result) {

                                // 返回状态码
                                let return_code = parseFloat(result.return_code);

                                // 获取 QrCode 失败
                                if (return_code < 1) {
                                    $.messager.alert({
                                        title: "错 误",
                                        msg: "获取支付信息失败，请检查网络后重试",
                                        icon: "error",
                                        ok: "确定"
                                    });
                                    docxtext.html("下载计算书");
                                    docx.off("click").on("click", getDocx);
                                }
                                else {

                                    docxtext.html("生成成功");

                                    /*
                                    收银台
                                     */
                                    // 二维码地址
                                    let codeUrl = result.code_url;
                                    // 名称
                                    let productName = result.title;
                                    // 价格
                                    let totalFee = result.total_fee;
                                    // 订单号
                                    let outTradeNo = result.out_trade_no;
                                    // payjs 订单号
                                    let payjsOrderId = result.payjs_order_id;
                                    // 初始化收银台
                                    let query = null, status;
                                    AZBAPayJS.dialog({
                                        title: '收银台',
                                        width: 450,
                                        height: 500,
                                        cache: false,
                                        closable: false,
                                        href: '/static/payjs/payjs.html',
                                        modal: true,
                                        onLoad: function () {

                                            // 替换模板数据
                                            $('#payjs_qrcode').qrcode({
                                                render: "canvas",
                                                text: codeUrl,
                                                width: 145,
                                                height: 145,
                                                background: "#ffffff",
                                                foreground: "#122A0A",
                                                src: '/favicon.png',
                                                imgWidth: 32,
                                                imgHeight: 32
                                            });
                                            $("#product_name").html(productName);
                                            $("#total_fee").html("¥" + totalFee / 100);
                                            $("#out_trade_no").html(outTradeNo);

                                            // 取消订单按钮功能
                                            $("#payjs_cancel").off("click").on("click", function () {

                                                // 收银台关闭并清空
                                                AZBAPayJS.dialog("close");
                                                AZBAPayJS.dialog("clear");
                                                // 按钮重置
                                                docx.removeClass("l-btn-disabled").attr("href", null).off("click").on("click", getDocx);
                                                docxtext.html("下载计算书");
                                                // 关闭轮询
                                                if (query != null) {
                                                    query.abort();
                                                }
                                                // payjs 关闭订单
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "payjs/order/cancel_order.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        payjs_order_id: payjsOrderId,
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {
                                                        if (parseFloat(result) === 1) {
                                                            $.messager.alert({
                                                                title: "信息",
                                                                msg: "成功取消订单",
                                                                icon: "info",
                                                                ok: "确定"
                                                            });
                                                        }
                                                    },
                                                    error: function () {
                                                    }
                                                });
                                            });
                                        }
                                    });

                                    // 轮询订单状态， 若status 为 1，则获取下载链接
                                    getOrder(outTradeNo);

                                    function getOrder(outTradeNo) {
                                        query = $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "payjs/order/get_order_status.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                outTradeNo: outTradeNo,
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                // 返回状态码
                                                status = parseFloat(result);

                                                // 0 未支付 1 已支付
                                                if (status < 1) {
                                                    getOrder(outTradeNo);
                                                }
                                                else {

                                                    // 获取下载链接
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "payjs/order/get_order_docxlink.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            outTradeNo: outTradeNo,
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            // 写入下载地址
                                                            docx.attr("href", result);
                                                            docxtext.html("下载地址");

                                                            // 支付成功跳转页
                                                            AZBAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                            // 倒计时计数器
                                                            let maxTime = 4, timer;

                                                            function CountDown() {
                                                                if (maxTime >= 0) {
                                                                    $("#payjs_timer").html(maxTime);
                                                                    --maxTime;
                                                                } else {

                                                                    clearInterval(timer);
                                                                    // 关闭并清空收银台
                                                                    AZBAPayJS.dialog('close');
                                                                    AZBAPayJS.dialog('clear');
                                                                }
                                                            }

                                                            timer = setInterval(CountDown, 1000);
                                                        },
                                                        error: function () {
                                                            $.messager.alert({
                                                                title: "错 误",
                                                                msg: "获取下载链接失败，请联系站长解决",
                                                                icon: "error",
                                                                ok: "确定"
                                                            });
                                                        }
                                                    })
                                                }
                                            },
                                            error: function () {
                                            }
                                        });
                                    }
                                }
                            },
                            error: function () {
                                $.messager.alert({
                                    title: "错 误",
                                    msg: "由于网络原因，Word 计算书生成失败，请检查网络后重试",
                                    icon: "error",
                                    ok: "确定"
                                });
                                docxtext.html("下载计算书");
                                docx.off("click").on("click", getDocx);
                            }
                        });
                    }

                    docx.removeClass("l-btn-disabled").off("click").on("click", getDocx);
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});