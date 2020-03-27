$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let azbcSketch = $("#d2");
    let azbcModel = $("#d3");
    let azbcd2d3 = $('#d2d3');

    $("#cal").html("<table id='azbc'></table>");
    let pg = $("#azbc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/z/b/c/AZBC.json", function (result) {

        let columns, rows;

        function azbc2d() {

            azbcSketch.empty();

            let width = azbcSketch.width();
            let height = azbcSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AZBCSVG").attr("height", height);

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

        azbcd2d3.tabs('select', 1);
        currentTabIndex = azbcd2d3.tabs('getTabIndex', azbcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            azbc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#azbc").length > 0) {
                    azbc2d();
                }
            });
        }
        azbcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    azbc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#azbc").length > 0) {
                            azbc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 黏滞性液体泄放面积计算",
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
                    azbcSketch.empty();
                    azbcModel.empty();

                    // sketch
                    currentTabIndex = azbcd2d3.tabs('getTabIndex', azbcd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        azbc2d();
                        azbcSketch.off("resize").on("resize", function () {
                            if ($("#azbc").length > 0) {
                                azbc2d();
                            }
                        });
                    }
                    azbcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                azbc2d();
                                azbcSketch.off("resize").on("resize", function () {
                                    if ($("#azbc").length > 0) {
                                        azbc2d();
                                    }
                                });
                            }
                        }
                    });

                    south.empty();
                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // ws
                    let AZBCWS;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AZBCWS = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // deltap
                    let AZBCDELTAP;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        AZBCDELTAP = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // k
                    let AZBCK;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AZBCK = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // d
                    let AZBCD;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AZBCD = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AZBCAS = 0.196 * AZBCWS / (AZBCK * Math.sqrt(AZBCD * AZBCDELTAP));
                    south.html(
                        "<span style='color:#444444;'>" +
                        "试算假设泄放面积：" + AZBCAS.toFixed(2) + " mm²" +
                        "</span>");

                    // u
                    let AZBCU;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AZBCU = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // a
                    let AZBCA;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                        && parseFloat(rows[5][columns[0][1].field]) >= AZBCAS) {
                        AZBCA = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                        && parseFloat(rows[5][columns[0][1].field]) < AZBCAS) {
                        south.html("向上圆整到产品规格的实际泄放面积A不得小于 " + AZBCAS.toFixed(2) + " mm²").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    let AZBCW = AZBCA * AZBCK * Math.sqrt(AZBCD * AZBCDELTAP) / 0.196;
                    let AZBCRE = 0.3134 * AZBCW / (AZBCU * Math.sqrt(AZBCA));

                    let AZBCZETA;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "gbt_150_2011_table_b_2_get_zeta.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "re": AZBCRE,
                        }),
                        beforeSend: function () {
                            south.html("<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>" +
                                "<span style='color:#18bc9c;'>&ensp;正在查表获取粘度校正系数</span>");
                        },
                        success: function (result) {

                            south.html("<i class='fa fa-check' style='color:#18bc9c;'></i>" +
                                "<span style='color:#18bc9c;'>&ensp;粘度校正系数获取成功</span>");

                            AZBCZETA = parseFloat(result);

                            if (AZBCZETA <= 0) {
                                south.html("查表 B-2 超界，请检查输入数据！").css("color", "red");
                                return false;
                            }

                            south.html(
                                "<span style='color:#444444;'>" +
                                "所需泄放量：" + AZBCWS.toFixed(2) + " kg/h" +
                                "</span>");

                            let AZBCWACT = AZBCA * AZBCZETA * AZBCK * Math.sqrt(AZBCD * AZBCDELTAP) / 0.196;
                            let AZBCWCHK;
                            if (AZBCWACT >= AZBCWS) {
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "实际泄放量：" + AZBCWACT.toFixed(2) + " kg/h" +
                                    "</span>");
                                AZBCWCHK = "合格";
                            }
                            else {
                                south.append(
                                    "<span style='color:red;'>" +
                                    "&ensp;|&ensp;" +
                                    "实际泄放量：" + AZBCWACT.toFixed(2) + " kg/h" +
                                    "</span>");
                                AZBCWCHK = "不合格";
                            }

                            // docx
                            let AZBCPayJS = $('#payjs');

                            function getDocx() {
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "azbcdocx.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        ribbonName: "AZBC",

                                        ws: AZBCWS,
                                        deltap: AZBCDELTAP,
                                        k: AZBCK,
                                        d: AZBCD,
                                        u: AZBCU,
                                        as: AZBCAS.toFixed(2),
                                        a: AZBCA,
                                        w: AZBCW.toFixed(2),
                                        re: AZBCRE.toFixed(2),
                                        zeta: AZBCZETA.toFixed(2),
                                        wact: AZBCWACT.toFixed(2),
                                        wchk: AZBCWCHK
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
                                            AZBCPayJS.dialog({
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
                                                        AZBCPayJS.dialog("close");
                                                        AZBCPayJS.dialog("clear");
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
                                                                    AZBCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                    // 倒计时计数器
                                                                    let maxTime = 4, timer;

                                                                    function CountDown() {
                                                                        if (maxTime >= 0) {
                                                                            $("#payjs_timer").html(maxTime);
                                                                            --maxTime;
                                                                        } else {

                                                                            clearInterval(timer);
                                                                            // 关闭并清空收银台
                                                                            AZBCPayJS.dialog('close');
                                                                            AZBCPayJS.dialog('clear');
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
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;粘度校正系数获取失败，请检查网络后重试</span>");
                        }
                    });
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});