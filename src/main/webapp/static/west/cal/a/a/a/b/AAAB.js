$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aaabd2 = $("#d2");
    let aaabd3 = $("#d3");
    let aaabd2d3 = $('#d2d3');

    $("#cal").html("<table id='aaab'></table>");
    let pg = $("#aaab");

    let south = $("#south");
    let currentTabIndex = null;

    let AAABPayJS = $('#payjs');
    $.getJSON("/static/west/cal/a/a/a/b/AAAB.json", function (result) {

        let AAABDT,
            AAABSCategory, AAABSCategoryVal, AAABSType, AAABSTypeVal, AAABSSTD, AAABSSTDVal, AAABSName, AAABSNameVal,
            AAABCCategory, AAABCCategoryVal, AAABCType, AAABCTypeVal, AAABCSTD, AAABCSTDVal, AAABCName, AAABCNameVal,
            columns, rows, ed;

        function aaab2d(dsi = "ΦDsi", thksn = "δsn", thkcn = "δcn") {

            aaabd2.empty();

            let width = aaabd2.width();
            let height = aaabd2.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAABSVG").attr("height", height);

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
            let padding = 40;
            let thk = 8;

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            svg.append("path").attr("d", line([
                {x: padding + wg - 4 * thk, y: padding},
                {x: padding + 3 * wg + 4 * thk, y: padding},
                {x: padding + 3 * wg + 4 * thk, y: height - padding},
                {x: padding + wg - 4 * thk, y: height - padding},
                {x: padding + wg - 4 * thk, y: padding}
            ])).classed("sketch", true);

            drawLine(padding + wg - 3 * thk, padding, padding + wg - 3 * thk, height - padding);
            drawLine(padding + wg - 2 * thk, padding, padding + wg - 2 * thk, height - padding);
            drawLine(padding + wg - thk, padding, padding + wg - thk, height - padding);
            drawLine(padding + wg, padding, padding + wg, height - padding);
            drawLine(padding + wg + 2 * thk, padding, padding + wg + 2 * thk, height - padding);
            drawLine(padding + 3 * wg - 2 * thk, padding, padding + 3 * wg - 2 * thk, height - padding);
            drawLine(padding + 3 * wg, padding, padding + 3 * wg, height - padding);
            drawLine(padding + 3 * wg + thk, padding, padding + 3 * wg + thk, height - padding);
            drawLine(padding + 3 * wg + 2 * thk, padding, padding + 3 * wg + 2 * thk, height - padding);
            drawLine(padding + 3 * wg + 3 * thk, padding, padding + 3 * wg + 3 * thk, height - padding);

            drawCenterLine(width / 2, padding - 10, width / 2, height / 2 + 10);
            drawCenterLine(width / 2, height / 2 + 35, width / 2, height - padding + 10);

            // DSI
            dimBottomH(padding + wg + 2 * thk, height / 2, padding + 3 * wg - 2 * thk, height / 2, dsi, "AAABSketchDSI");

            // thksn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: height / 2},
                    {x: padding + 3 * wg + 15, y: height / 2 + 3},
                    {x: padding + 3 * wg + 15, y: height / 2 - 3},
                    {x: padding + 3 * wg, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg - 2 * thk, y: height / 2},
                    {x: padding + 3 * wg - 2 * thk - 15, y: height / 2 + 3},
                    {x: padding + 3 * wg - 2 * thk - 15, y: height / 2 - 3},
                    {x: padding + 3 * wg - 2 * thk, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 2 * thk, y: height / 2},
                {x: padding + 3 * wg + 15 + 10, y: height / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 2 * thk - 15 - 40, y: height / 2},
                {x: padding + 3 * wg - 2 * thk - 15, y: height / 2}
            ])).attr("id", "AAABSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAABSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // thkcn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + thk, y: height / 2 - 40},
                    {x: padding + 3 * wg + thk + 15, y: height / 2 - 40 + 3},
                    {x: padding + 3 * wg + thk + 15, y: height / 2 - 40 - 3},
                    {x: padding + 3 * wg + thk, y: height / 2 - 40}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: height / 2 - 40},
                    {x: padding + 3 * wg - 15, y: height / 2 - 40 + 3},
                    {x: padding + 3 * wg - 15, y: height / 2 - 40 - 3},
                    {x: padding + 3 * wg, y: height / 2 - 40}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height / 2 - 40},
                {x: padding + 3 * wg + thk + 15 + 10, y: height / 2 - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 15 - 40, y: height / 2 - 40},
                {x: padding + 3 * wg - 15, y: height / 2 - 40}
            ])).attr("id", "AAABSketchTHKCN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAABSketchTHKCN").attr("startOffset", "50%").text(thkcn);
        }

        currentTabIndex = aaabd2d3.tabs('getTabIndex', aaabd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aaab2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aaab").length > 0) {
                    aaab2d();
                }
            });
        }
        aaabd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aaab2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aaab").length > 0) {
                            aaab2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 多层圆筒内压强度计算",
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
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 4) {
                    $(ed.target).combobox("loadData", AAABSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAABSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAABSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAABSName);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", AAABCCategory);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", AAABCType);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAABCSTD);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAABCName);
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

                    // sketch & model
                    aaabd2.empty();
                    aaabd3.empty();

                    // sketch
                    currentTabIndex = aaabd2d3.tabs('getTabIndex', aaabd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aaab2d();
                        aaabd2.off("resize").on("resize", function () {
                            if ($("#aaab").length > 0) {
                                aaab2d();
                            }
                        });
                    }
                    aaabd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aaab2d();
                                aaabd2.off("resize").on("resize", function () {
                                    if ($("#aaab").length > 0) {
                                        aaab2d();
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
                    if (index === 1) {

                        AAABDT = parseFloat(changes.value);

                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAABSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAABSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAABSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAABSName = null;

                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        AAABCCategory = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        AAABCType = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAABCSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAABCName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAABSCategory = [];
                                AAABCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAABDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAABSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAABCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                    });
                                }
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料类别获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 4) {

                        AAABSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAABSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAABSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAABSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAABSCategoryVal,
                                temp: AAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAABSType = [];
                                $(result).each(function (index, element) {
                                    AAABSType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;内筒材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 5) {

                        AAABSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAABSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAABSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAABSCategoryVal,
                                type: AAABSTypeVal,
                                temp: AAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAABSSTD = [];
                                $(result).each(function (index, element) {
                                    AAABSSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;内筒材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 6) {

                        AAABSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAABSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAABSCategoryVal,
                                type: AAABSTypeVal,
                                std: AAABSSTDVal,
                                temp: AAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAABSName = [];
                                $(result).each(function (index, element) {
                                    AAABSName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;内筒材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 11) {

                        AAABCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        AAABCType = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAABCSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAABCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAABCCategoryVal,
                                temp: AAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAABCType = [];
                                $(result).each(function (index, element) {
                                    AAABCType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;层板材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 12) {

                        AAABCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAABCSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAABCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAABCCategoryVal,
                                type: AAABCTypeVal,
                                temp: AAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAABCSTD = [];
                                $(result).each(function (index, element) {
                                    AAABCSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;层板材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 13) {

                        AAABCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAABCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAABCCategoryVal,
                                type: AAABCTypeVal,
                                std: AAABCSTDVal,
                                temp: AAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAABCName = [];
                                $(result).each(function (index, element) {
                                    AAABCName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;层板材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    /*
                    数据获取和计算区
                     */
                    let AAABPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAABPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAABPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAABPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAABTest;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAABTest = rows[3][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // SNameVal
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        AAABSNameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AAABDS, AAABSThkMin, AAABSThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAABSCategoryVal,
                            "type": AAABSTypeVal,
                            "std": AAABSSTDVal,
                            "name": AAABSNameVal,
                            "temp": AAABDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAABDS = parseFloat(result.density);
                            AAABSThkMin = parseFloat(result.thkMin);
                            AAABSThkMax = parseFloat(result.thkMax);

                            let AAABDSI;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                AAABDSI = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            //Sketch
                            if (currentTabIndex === 0) {
                                aaab2d("Φ" + AAABDSI);
                                aaabd2.off("resize").on("resize", function () {
                                    if ($("#aaab").length > 0) {
                                        aaab2d("Φ" + AAABDSI);
                                    }
                                });
                            }
                            aaabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaab2d("Φ" + AAABDSI);
                                        aaabd2.off("resize").on("resize", function () {
                                            if ($("#aaab").length > 0) {
                                                aaab2d("Φ" + AAABDSI);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAABTHKSN;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > AAABSThkMin
                                && parseFloat(rows[9][columns[0][1].field]) <= AAABSThkMax) {
                                AAABTHKSN = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) <= AAABSThkMin) {
                                south.html("内筒材料厚度不能小于等于 " + AAABSThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > AAABSThkMax) {
                                south.html("内筒材料厚度不能大于 " + AAABSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            //Sketch
                            if (currentTabIndex === 0) {
                                aaab2d("Φ" + AAABDSI, AAABTHKSN);
                                aaabd2.off("resize").on("resize", function () {
                                    if ($("#aaab").length > 0) {
                                        aaab2d("Φ" + AAABDSI, AAABTHKSN);
                                    }
                                });
                            }
                            aaabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaab2d("Φ" + AAABDSI, AAABTHKSN);
                                        aaabd2.off("resize").on("resize", function () {
                                            if ($("#aaab").length > 0) {
                                                aaab2d("Φ" + AAABDSI, AAABTHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAABOST, AAABOS, AAABOST1, AAABRSEL, AAABCS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAABSCategoryVal,
                                    "type": AAABSTypeVal,
                                    "std": AAABSSTDVal,
                                    "name": AAABSNameVal,
                                    "thk": AAABTHKSN,
                                    "temp": AAABDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAABDSI + 2 * AAABTHKSN
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    AAABOST = parseFloat(result.ot);
                                    if (AAABOST < 0) {
                                        south.html("查询内筒材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    AAABOS = parseFloat(result.o);
                                    if (AAABOS < 0) {
                                        south.html("查询内筒材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    AAABOST1 = parseFloat(result.ot1);

                                    AAABRSEL = parseFloat(result.rel);
                                    if (AAABRSEL < 0) {
                                        south.html("查询内筒材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    AAABCS1 = parseFloat(result.c1);
                                    if (AAABCS1 < 0) {
                                        south.html("查询内筒材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 腐蚀裕量
                                    let AAABCS2;
                                    if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                        && parseFloat(rows[10][columns[0][1].field]) < AAABTHKSN) {
                                        AAABCS2 = parseFloat(rows[10][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                        && parseFloat(rows[10][columns[0][1].field]) >= AAABTHKSN) {
                                        south.html("内筒体腐蚀裕量不能大于等于 " + AAABTHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 层板材料名称
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        AAABCNameVal = rows[14][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let AAABDC, AAABCThkMin, AAABCThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": AAABCCategoryVal,
                                            "type": AAABCTypeVal,
                                            "std": AAABCSTDVal,
                                            "name": AAABCNameVal,
                                            "temp": AAABDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            AAABDC = parseFloat(result.density);
                                            AAABCThkMin = parseFloat(result.thkMin);
                                            AAABCThkMax = parseFloat(result.thkMax);

                                            // 层数 N
                                            let AAABN;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                AAABN = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 层板名义厚度
                                            let AAABTHKCN;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) > AAABCThkMin
                                                && parseFloat(rows[16][columns[0][1].field]) <= AAABCThkMax) {
                                                AAABTHKCN = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) <= AAABCThkMin) {
                                                south.html("层板材料厚度不能小于等于 " + AAABCThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) > AAABCThkMax) {
                                                south.html("层板材料厚度不能大于 " + AAABCThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            //Sketch
                                            if (currentTabIndex === 0) {
                                                aaab2d("Φ" + AAABDSI, AAABTHKSN, AAABTHKCN);
                                                aaabd2.off("resize").on("resize", function () {
                                                    if ($("#aaab").length > 0) {
                                                        aaab2d("Φ" + AAABDSI, AAABTHKSN, AAABTHKCN);
                                                    }
                                                });
                                            }
                                            aaabd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        aaab2d("Φ" + AAABDSI, AAABTHKSN, AAABTHKCN);
                                                        aaabd2.off("resize").on("resize", function () {
                                                            if ($("#aaab").length > 0) {
                                                                aaab2d("Φ" + AAABDSI, AAABTHKSN, AAABTHKCN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let AAABOCT, AAABOC, AAABOCT1, AAABRCEL, AAABCC1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": AAABCCategoryVal,
                                                    "type": AAABCTypeVal,
                                                    "std": AAABCSTDVal,
                                                    "name": AAABCNameVal,
                                                    "thk": AAABTHKCN,
                                                    "temp": AAABDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": AAABDSI + 2 * AAABTHKSN + AAABN * AAABTHKCN
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    AAABOCT = parseFloat(result.ot);
                                                    if (AAABOCT < 0) {
                                                        south.html("查询层板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    AAABOC = parseFloat(result.o);
                                                    if (AAABOC < 0) {
                                                        south.html("查询层板材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    AAABOCT1 = parseFloat(result.ot1);

                                                    AAABRCEL = parseFloat(result.rel);
                                                    if (AAABRCEL < 0) {
                                                        south.html("查询层板材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    AAABCC1 = parseFloat(result.c1);
                                                    if (AAABCC1 < 0) {
                                                        south.html("查询层板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 过程参数
                                                    let AAABPC = AAABPD + AAABPS;
                                                    let AAABCS = AAABCS1 + AAABCS2;
                                                    let AAABTHKSE = AAABTHKSN - AAABCS;
                                                    let AAABFAIS = 1.0;
                                                    let AAABTHK0N = AAABN * AAABTHKCN;
                                                    let AAABFAIC = 0.95;
                                                    let AAABTHKN = AAABTHK0N + AAABTHKSN;
                                                    let AAABTHKE = AAABTHKSE + AAABTHK0N;
                                                    let AAABOTFAI = AAABTHKSN / AAABTHKN * AAABOST * AAABFAIS + AAABTHK0N / AAABTHKN * AAABOCT * AAABFAIC;

                                                    // 强度计算
                                                    let AAABTHKC = (AAABPC * AAABDSI) / (2 * AAABOTFAI - AAABPC);
                                                    let AAABTHKD = AAABTHKC + AAABCS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "筒体所需总厚度：" + (AAABTHKD + AAABCS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let AAABTHKCHK;
                                                    if (AAABTHKN >= (AAABTHKD + AAABCS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入总厚度：" + AAABTHKN + " mm" +
                                                            "</span>");
                                                        AAABTHKCHK = "合格";
                                                    } else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入总厚度：" + AAABTHKN + " mm" +
                                                            "</span>");
                                                        AAABTHKCHK = "不合格";
                                                    }
                                                    let AAABOACT = AAABPC * (AAABDSI + AAABTHKE) / (2 * AAABTHKE);
                                                    let AAABOACTCHK;
                                                    if (AAABOACT <= AAABOTFAI) {
                                                        AAABOACTCHK = "合格";
                                                    }
                                                    else {
                                                        AAABOACTCHK = "不合格";
                                                    }

                                                    // 压力试验
                                                    let AAABETA, AAABZETA, AAABOTestALLOW, AAABPT;
                                                    if (AAABTest === "液压试验") {
                                                        AAABETA = 1.25;
                                                        AAABPT = AAABETA * AAABPD * Math.min(AAABOS / Math.max(AAABOST, AAABOST1), AAABOC / Math.max(AAABOCT, AAABOCT1));
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + AAABPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        AAABZETA = 0.9;
                                                        AAABOTestALLOW = AAABZETA * Math.min(AAABRSEL * AAABFAIS, AAABRCEL * AAABFAIC);
                                                    }
                                                    else if (AAABTest === "气压试验") {
                                                        AAABETA = 1.1;
                                                        AAABPT = AAABETA * AAABPD * Math.min(AAABOS / Math.max(AAABOST, AAABOST1), AAABOC / Math.max(AAABOCT, AAABOCT1));
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + AAABPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        AAABZETA = 0.8;
                                                        AAABOTestALLOW = AAABZETA * Math.min(AAABRSEL * AAABFAIS, AAABRCEL * AAABFAIC);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let AAABOTest = AAABPT * (AAABDSI + AAABTHKE) / (2 * AAABTHKE);
                                                    let AAABOTestCHK;
                                                    if (AAABOTest <= AAABOTestALLOW) {
                                                        AAABOTestCHK = "合格";
                                                    }
                                                    else {
                                                        AAABOTestCHK = "不合格";
                                                    }

                                                    // MAWP
                                                    let AAABMAWP = 2 * AAABTHKE * AAABOTFAI / (AAABDSI + AAABTHKE) - AAABPS;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + AAABMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "aaabdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "AAAB",

                                                                pd: AAABPD,
                                                                t: AAABDT,
                                                                ps: AAABPS,

                                                                stds: AAABSSTDVal,
                                                                names: AAABSNameVal,
                                                                dsi: AAABDSI,
                                                                thksn: AAABTHKSN,
                                                                cs2: AAABCS2,

                                                                stdc: AAABCSTDVal,
                                                                namec: AAABCNameVal,
                                                                n: AAABN,
                                                                thkcn: AAABTHKCN,

                                                                test: AAABTest,

                                                                ds: AAABDS.toFixed(4),
                                                                cs1: AAABCS1.toFixed(4),
                                                                rsel: AAABRSEL.toFixed(4),
                                                                ost: AAABOST.toFixed(4),
                                                                os: AAABOS.toFixed(4),
                                                                ost1: AAABOST1.toFixed(4),

                                                                dc: AAABDC.toFixed(4),
                                                                cc1: AAABCC1.toFixed(4),
                                                                rcel: AAABRCEL.toFixed(4),
                                                                oct: AAABOCT.toFixed(4),
                                                                oc: AAABOC.toFixed(4),
                                                                oct1: AAABOCT1.toFixed(4),

                                                                pc: AAABPC.toFixed(4),

                                                                cs: AAABCS.toFixed(4),
                                                                thkse: AAABTHKSE.toFixed(4),
                                                                fais: AAABFAIS.toFixed(4),

                                                                thk0n: AAABTHK0N.toFixed(4),
                                                                faic: AAABFAIC.toFixed(4),

                                                                thkn: AAABTHKN.toFixed(4),
                                                                thke: AAABTHKE.toFixed(4),
                                                                otfai: AAABOTFAI.toFixed(4),

                                                                thkc: AAABTHKC.toFixed(4),
                                                                thkd: AAABTHKD.toFixed(4),
                                                                thkchk: AAABTHKCHK,

                                                                oact: AAABOACT.toFixed(4),
                                                                oactchk: AAABOACTCHK,

                                                                eta: AAABETA.toFixed(4),
                                                                pt: AAABPT.toFixed(4),
                                                                otest: AAABOTest.toFixed(4),
                                                                zeta: AAABZETA.toFixed(4),
                                                                otestallow: AAABOTestALLOW.toFixed(4),
                                                                otestchk: AAABOTestCHK,

                                                                mawp: AAABMAWP.toFixed(4)
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
                                                                    AAABPayJS.dialog({
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
                                                                                AAABPayJS.dialog("close");
                                                                                AAABPayJS.dialog("clear");
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
                                                                                            AAABPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    AAABPayJS.dialog('close');
                                                                                                    AAABPayJS.dialog('clear');
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
                                                        "<span style='color:red;'>&ensp;层板材料力学特性获取失败，请检查网络后重试</span>");
                                                }
                                            });
                                        },
                                        error: function () {
                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                "<span style='color:red;'>&ensp;层板材料物理性质获取失败，请检查网络后重试</span>");
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;内筒材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;内筒材料物理性质获取失败，请检查网络后重试</span>");
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