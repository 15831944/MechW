$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let asmprt = $("#ASMPRT");
    let asmprttext = $("#ASMPRTTEXT");

    let aaaad2 = $("#d2");
    let aaaad3 = $("#d3");
    let aaaad2d3 = $('#d2d3');

    $("#cal").html("<table id='aaaa'></table>");
    let pg = $("#aaaa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/a/a/AAAA.json", function (result) {

        let AAAADT,
            AAAACategory, AAAACategoryVal, AAAAType, AAAATypeVal, AAAASTD, AAAASTDVal, AAAAName, AAAANameVal,
            columns, rows, ed;

        function aaaa2d(idod, di = "ϕDi", dout = "ϕDo", thkn = "δn", l = "L") {

            aaaad2.empty();

            let width = aaaad2.width();
            let height = aaaad2.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAAASVG").attr("height", height);

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
            let padding = 80;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 10;

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

            // 底部水平标注
            function dimBottomH(startX, startY, endX, endY, text, id) {

                extLineBottomV(startX, startY);
                extLineBottomV(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX, y: startY + 30},
                        {x: startX + 15, y: startY + 27},
                        {x: startX + 15, y: startY + 33},
                        {x: startX, y: startY + 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY + 30},
                        {x: endX - 15, y: endY + 27},
                        {x: endX - 15, y: endY + 33},
                        {x: endX, y: endY + 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX, y: startY + 30},
                    {x: endX, y: endY + 30}
                ])).attr("id", id).classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

            }

            // 左侧垂直标注
            function dimLeftV(startX, startY, endX, endY, text, id) {

                extLineLeftH(startX, startY);
                extLineLeftH(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX - 30, y: startY},
                        {x: startX - 27, y: startY - 15},
                        {x: startX - 33, y: startY - 15},
                        {x: startX - 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 27, y: endY + 15},
                        {x: endX - 33, y: endY + 15},
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
                        {x: startX + 27, y: startY - 15},
                        {x: startX + 33, y: startY - 15},
                        {x: startX + 30, y: startY}
                    ]));

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX + 30, y: endY},
                        {x: endX + 27, y: endY + 15},
                        {x: endX + 33, y: endY + 15},
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

            // 轮廓及中心线
            svg.append("path").attr("d", line([
                {x: padding, y: padding},
                {x: width - padding, y: padding},
                {x: width - padding, y: height - padding},
                {x: padding, y: height - padding},
                {x: padding, y: padding}
            ])).classed("sketch", true);
            drawLine(padding, padding + thk, width - padding, padding + thk);
            drawLine(padding, height - padding - thk, width - padding, height - padding - thk);
            drawCenterLine(padding - 10, height / 2, width - padding + 10, height / 2);

            // idod
            if (idod === "内径") {
                dimLeftV(padding, height - padding - thk, padding, padding + thk, di, "AAAASketchDI");
            }
            else if (idod === "外径") {
                dimLeftV(padding, height - padding, padding, padding, dout, "AAAASketchDOUT");
            }

            // thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding},
                    {x: width / 2 + 2, y: padding - 15},
                    {x: width / 2 - 2, y: padding - 15},
                    {x: width / 2, y: padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding + thk},
                    {x: width / 2 + 2, y: padding + thk + 15},
                    {x: width / 2 - 2, y: padding + thk + 15},
                    {x: width / 2, y: padding + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding - 15 - 10},
                {x: width / 2, y: padding + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + thk + 15 + 40},
                {x: width / 2, y: padding + thk + 15}
            ])).attr("id", "AAAASketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAAASketchTHKN").attr("startOffset", "50%").text(thkn);

            // L
            dimBottomH(padding, height - padding, width - padding, height - padding, l, "AAAASketchL");
        }

        currentTabIndex = aaaad2d3.tabs('getTabIndex', aaaad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aaaa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aaaa").length > 0) {
                    aaaa2d();
                }
            });
        }
        aaaad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aaaa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aaaa").length > 0) {
                            aaaa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 单层圆筒内压强度校核",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 180,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 143,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {

                if (index === 12) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 6) {
                    $(ed.target).combobox("loadData", AAAACategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAAAType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAAASTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AAAAName);
                }

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

                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    asmprt.addClass("l-btn-disabled").off("click").attr("href", null);
                    asmprttext.html("下载模型");

                    // sketch & model
                    aaaad2.empty();
                    aaaad3.empty();

                    // sketch
                    currentTabIndex = aaaad2d3.tabs('getTabIndex', aaaad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aaaa2d();
                        aaaad2.off("resize").on("resize", function () {
                            if ($("#aaaa").length > 0) {
                                aaaa2d();
                            }
                        });
                    }
                    aaaad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aaaa2d();
                                aaaad2.off("resize").on("resize", function () {
                                    if ($("#aaaa").length > 0) {
                                        aaaa2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    /*
                    级联菜单区
                     */
                    // 温度改变，重新加载 category
                    if (index === 1) {

                        AAAADT = parseFloat(changes.value);

                        // category、type、std、name
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAAACategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAAAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAAASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAAAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAAACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAAADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAAACategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                    });
                                }
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料类别获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // category 改变，重新加载type
                    if (index === 6) {

                        AAAACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAAAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAAASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAAAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAAACategoryVal,
                                temp: AAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAAAType = [];
                                $(result).each(function (index, element) {
                                    AAAAType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // type 改变，重新加载 std
                    if (index === 7) {

                        AAAATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAAASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAAAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAAACategoryVal,
                                type: AAAATypeVal,
                                temp: AAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAAASTD = [];
                                $(result).each(function (index, element) {
                                    AAAASTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // std 改变，重新加载 Name
                    if (index === 8) {

                        AAAASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAAAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAAACategoryVal,
                                type: AAAATypeVal,
                                std: AAAASTDVal,
                                temp: AAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAAAName = [];
                                $(result).each(function (index, element) {
                                    AAAAName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // UI - DI DOUT
                    if (index === 10) {
                        if (rows[10][columns[0][1].field] === "内径") {
                            pg.datagrid('options').finder.getTr(this, 11).show();
                            pg.datagrid('options').finder.getTr(this, 12).hide();
                        }
                        else if (rows[10][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 12).show();
                            pg.datagrid('options').finder.getTr(this, 11).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    /*
                    数据获取和计算区
                     */
                    let AAAAPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAAAPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAAAPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAAAPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAAAC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAAAC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAAAFAI;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AAAAFAI = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAAATest;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AAAATest = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // NameVal
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        AAAANameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AAAAD, AAAAThkMin, AAAAThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAAACategoryVal,
                            "type": AAAATypeVal,
                            "std": AAAASTDVal,
                            "name": AAAANameVal,
                            "temp": AAAADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAAAD = parseFloat(result.density);
                            AAAAThkMin = parseFloat(result.thkMin);
                            AAAAThkMax = parseFloat(result.thkMax);

                            let AAAAIDOD;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AAAAIDOD = rows[10][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aaaa2d(AAAAIDOD);
                                aaaad2.off("resize").on("resize", function () {
                                    if ($("#aaaa").length > 0) {
                                        aaaa2d(AAAAIDOD);
                                    }
                                });
                            }
                            aaaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaaa2d(AAAAIDOD);
                                        aaaad2.off("resize").on("resize", function () {
                                            if ($("#aaaa").length > 0) {
                                                aaaa2d(AAAAIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAAADI = -1, AAAADOUT = -1;
                            if (AAAAIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    AAAADI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (AAAAIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                    AAAADOUT = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT);
                                aaaad2.off("resize").on("resize", function () {
                                    if ($("#aaaa").length > 0) {
                                        aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT);
                                    }
                                });
                            }
                            aaaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT);
                                        aaaad2.off("resize").on("resize", function () {
                                            if ($("#aaaa").length > 0) {
                                                aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAAATHKN;
                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > Math.max(AAAAC2, AAAAThkMin)
                                && parseFloat(rows[13][columns[0][1].field]) <= AAAAThkMax) {
                                AAAATHKN = parseFloat(rows[13][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) <= Math.max(AAAAC2, AAAAThkMin)) {
                                south.html("筒体材料厚度不能小于等于 " + Math.max(AAAAC2, AAAAThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > AAAAThkMax) {
                                south.html("筒体材料厚度不能大于 " + AAAAThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN);
                                aaaad2.off("resize").on("resize", function () {
                                    if ($("#aaaa").length > 0) {
                                        aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN);
                                    }
                                });
                            }
                            aaaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN);
                                        aaaad2.off("resize").on("resize", function () {
                                            if ($("#aaaa").length > 0) {
                                                aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 补齐内外径
                            if (AAAAIDOD === "内径") {
                                AAAADOUT = AAAADI + 2 * AAAATHKN;
                            }
                            else if (AAAAIDOD === "外径") {
                                AAAADI = AAAADOUT - 2 * AAAATHKN;
                            }
                            else {
                                return false;
                            }

                            let AAAAOT, AAAAO, AAAAOT1, AAAARel, AAAAC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAAACategoryVal,
                                    "type": AAAATypeVal,
                                    "std": AAAASTDVal,
                                    "name": AAAANameVal,
                                    "thk": AAAATHKN,
                                    "temp": AAAADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAAADOUT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计应力
                                    AAAAOT = parseFloat(result.ot);
                                    if (AAAAOT < 0) {
                                        south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AAAAO = parseFloat(result.o);
                                    if (AAAAO < 0) {
                                        south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AAAARel = parseFloat(result.rel);
                                    if (AAAARel < 0) {
                                        south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AAAAC1 = parseFloat(result.c1);
                                    if (AAAAC1 < 0) {
                                        south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AAAAOT1 = parseFloat(result.ot1);

                                    // 过程参数
                                    let AAAAC = AAAAC1 + AAAAC2;
                                    let AAAATHKE = AAAATHKN - AAAAC;
                                    let AAAAPC = AAAAPD + AAAAPS;

                                    // 厚度校核
                                    let AAAATHKC;
                                    if (AAAAIDOD === "内径") {
                                        AAAATHKC = (AAAAPC * AAAADI) / (2 * AAAAOT * AAAAFAI - AAAAPC);
                                    }
                                    else if (AAAAIDOD === "外径") {
                                        AAAATHKC = (AAAAPC * AAAADOUT) / (2 * AAAAOT * AAAAFAI + AAAAPC);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AAAATHKMinimum;
                                    if (AAAACategoryVal === "碳素钢和低合金钢" || AAAACategoryVal === "铝及铝合金") {
                                        AAAATHKMinimum = 3;
                                    }
                                    else if (AAAACategoryVal === "高合金钢" || AAAACategoryVal === "钛及钛合金"
                                        || AAAACategoryVal === "铜及铜合金" || AAAACategoryVal === "镍及镍合金"
                                        || AAAACategoryVal === "锆及锆合金") {
                                        AAAATHKMinimum = 2;
                                    }
                                    else {
                                        return false;
                                    }

                                    let AAAATHKD = Math.max(AAAATHKC, AAAATHKMinimum) + AAAAC2;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "筒体所需厚度：" + (AAAATHKD + AAAAC1).toFixed(2) + " mm" +
                                        "</span>");
                                    let AAAATHKCHK;
                                    if (AAAATHKN >= (AAAATHKD + AAAAC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAAATHKN + " mm" +
                                            "</span>");
                                        AAAATHKCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAAATHKN + " mm" +
                                            "</span>");
                                        AAAATHKCHK = "不合格";
                                    }

                                    // 应力校核
                                    let AAAAOAct;
                                    if (AAAAIDOD === "内径") {
                                        AAAAOAct = AAAAPC * (AAAADI + AAAATHKE) / (2 * AAAATHKE);
                                    }
                                    else if (AAAAIDOD === "外径") {
                                        AAAAOAct = AAAAPC * (AAAADOUT - AAAATHKE) / (2 * AAAATHKE);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AAAAOActAllow = AAAAFAI * AAAAOT;
                                    let AAAAOActChk;
                                    if (AAAAOAct <= AAAAOActAllow) {
                                        AAAAOActChk = "合格";
                                    }
                                    else {
                                        AAAAOActChk = "不合格";
                                    }

                                    // 压力试验
                                    let AAAAETA, AAAAZETA, AAAAPT, AAAAOTestAllow;
                                    if (AAAATest === "液压试验") {

                                        AAAAETA = 1.25;
                                        AAAAPT = AAAAETA * AAAAPD * AAAAO / Math.max(AAAAOT, AAAAOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAAAPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AAAAZETA = 0.9;
                                        AAAAOTestAllow = AAAAZETA * AAAARel * AAAAFAI;
                                    }
                                    else if (AAAATest === "气压试验") {

                                        AAAAETA = 1.1;
                                        AAAAPT = AAAAETA * AAAAPD * AAAAO / Math.max(AAAAOT, AAAAOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAAAPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AAAAZETA = 0.8;
                                        AAAAOTestAllow = AAAAZETA * AAAARel * AAAAFAI;
                                    }
                                    else {
                                        return false;
                                    }
                                    let AAAAOTest;
                                    if (AAAAIDOD === "内径") {
                                        AAAAOTest = AAAAPT * (AAAADI + AAAATHKE) / (2 * AAAATHKE);
                                    }
                                    else if (AAAAIDOD === "外径") {
                                        AAAAOTest = AAAAPT * (AAAADOUT - AAAATHKE) / (2 * AAAATHKE);
                                    }
                                    else {
                                        return false;
                                    }

                                    let AAAAOTestChk;
                                    if (AAAAOTest <= AAAAOTestAllow) {
                                        AAAAOTestChk = "合格";
                                    }
                                    else {
                                        AAAAOTestChk = "不合格";
                                    }

                                    let AAAAMAWP;
                                    if (AAAAIDOD === "内径") {
                                        AAAAMAWP = (2 * AAAATHKE * AAAAOT * AAAAFAI) / (AAAADI + AAAATHKE) - AAAAPS;
                                    }
                                    else if (AAAAIDOD === "外径") {
                                        AAAAMAWP = (2 * AAAATHKE * AAAAOT * AAAAFAI) / (AAAADOUT - AAAATHKE) - AAAAPS;
                                    }
                                    else {
                                        return false;
                                    }

                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + AAAAMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    let AAAAL;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        AAAAL = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN, AAAAL);
                                        aaaad2.off("resize").on("resize", function () {
                                            if ($("#aaaa").length > 0) {
                                                aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN, AAAAL);
                                            }
                                        });
                                    }
                                    aaaad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN, AAAAL);
                                                aaaad2.off("resize").on("resize", function () {
                                                    if ($("#aaaa").length > 0) {
                                                        aaaa2d(AAAAIDOD, "Φ" + AAAADI, "Φ" + AAAADOUT, AAAATHKN, AAAAL);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 内表面积
                                    let AAAAAI = Math.PI * AAAADI * AAAAL / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + AAAAAI.toFixed(4) + " ㎡" +
                                        "</span>");

                                    // 外表面积
                                    let AAAAAO = Math.PI * AAAADOUT * AAAAL / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + AAAAAO.toFixed(4) + " ㎡" +
                                        "</span>");

                                    // 内容积
                                    let AAAAVI = 0.25 * Math.PI * AAAADI * AAAADI * AAAAL / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + AAAAVI.toFixed(4) + " m³" +
                                        "</span>");

                                    // 外容积
                                    let AAAAVO = 0.25 * Math.PI * AAAADOUT * AAAADOUT * AAAAL / 1000000000;

                                    // 质量
                                    let AAAAM = AAAAD * (AAAAVO - AAAAVI);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + AAAAM.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    let AAAAPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aaaadocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAAA",

                                                idod: AAAAIDOD,

                                                pd: AAAAPD,
                                                t: AAAADT,
                                                ps: AAAAPS,
                                                std: AAAASTDVal,
                                                name: AAAANameVal,
                                                c2: AAAAC2,
                                                fai: AAAAFAI,
                                                test: AAAATest,
                                                di: AAAADI,
                                                thkn: AAAATHKN,
                                                l: AAAAL,

                                                d: AAAAD.toFixed(4),
                                                rel: AAAARel.toFixed(4),
                                                c1: AAAAC1.toFixed(4),
                                                ot: AAAAOT.toFixed(4),
                                                o: AAAAO.toFixed(4),
                                                ot1: AAAAOT1.toFixed(4),

                                                c: AAAAC.toFixed(4),
                                                thke: AAAATHKE.toFixed(4),
                                                dout: AAAADOUT.toFixed(4),
                                                pc: AAAAPC.toFixed(4),

                                                thkc: AAAATHKC.toFixed(4),
                                                thkMinimum: AAAATHKMinimum.toFixed(4),
                                                thkd: AAAATHKD.toFixed(4),
                                                thkChk: AAAATHKCHK,
                                                oAct: AAAAOAct.toFixed(4),
                                                oActAllow: AAAAOActAllow.toFixed(4),
                                                oActChk: AAAAOActChk,

                                                eta: AAAAETA.toFixed(4),
                                                pt: AAAAPT.toFixed(4),
                                                oTest: AAAAOTest.toFixed(4),
                                                zeta: AAAAZETA.toFixed(4),
                                                oTestAllow: AAAAOTestAllow.toFixed(4),
                                                oTestChk: AAAAOTestChk,

                                                mawp: AAAAMAWP.toFixed(4),

                                                ai: AAAAAI.toFixed(4),
                                                ao: AAAAAO.toFixed(4),
                                                vi: AAAAVI.toFixed(4),
                                                m: AAAAM.toFixed(4)
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
                                                    AAAAPayJS.dialog({
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
                                                                AAAAPayJS.dialog("close");
                                                                AAAAPayJS.dialog("clear");
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
                                                                            AAAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AAAAPayJS.dialog('close');
                                                                                    AAAAPayJS.dialog('clear');
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

                                    // asmprt
                                    function getASMPRT() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aaaaasmprt.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAAAASMPRT",

                                                di: AAAADI,
                                                dout: AAAADOUT,
                                                h: AAAAL
                                            }),
                                            beforeSend: function () {
                                                asmprttext.html("生成中" + "<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>");
                                                asmprt.off("click");
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
                                                    asmprttext.html("下载模型");
                                                    asmprt.off("click").on("click", getASMPRT);
                                                }
                                                else {

                                                    asmprttext.html("生成成功");

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
                                                    AAAAPayJS.dialog({
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
                                                                AAAAPayJS.dialog("close");
                                                                AAAAPayJS.dialog("clear");
                                                                // 按钮重置
                                                                asmprt.removeClass("l-btn-disabled").attr("href", null).off("click").on("click", getASMPRT);
                                                                asmprttext.html("下载模型");
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
                                                                        url: "payjs/order/get_order_asmprtlink.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            outTradeNo: outTradeNo,
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            // 写入下载地址
                                                                            asmprt.attr("href", result);
                                                                            asmprttext.html("下载地址");

                                                                            // 支付成功跳转页
                                                                            AAAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AAAAPayJS.dialog('close');
                                                                                    AAAAPayJS.dialog('clear');
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
                                                    msg: "由于网络原因，模型生成失败，请检查网络后重试",
                                                    icon: "error",
                                                    ok: "确定"
                                                });
                                                asmprttext.html("下载模型");
                                                asmprt.off("click").on("click", getASMPRT);
                                            }
                                        });
                                    }

                                    asmprt.removeClass("l-btn-disabled").off("click").on("click", getASMPRT);
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;筒体材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;筒体材料物理性质获取失败，请检查网络后重试</span>");
                        }
                    });
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 12).hide();
            }
        });
    });
});