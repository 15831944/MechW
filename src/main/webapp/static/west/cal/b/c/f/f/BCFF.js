$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcffSketch = $("#d2");
    let bcffModel = $("#d3");
    let bcffd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcff'></table>");
    let pg = $("#bcff");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/f/BCFF.json", function (result) {

        let BCFFDT,
            BCFFSCategory, BCFFSCategoryVal, BCFFSType, BCFFSTypeVal, BCFFSSTD, BCFFSSTDVal, BCFFSName, BCFFSNameVal,
            BCFFPCategory, BCFFPCategoryVal, BCFFPType, BCFFPTypeVal, BCFFPSTD, BCFFPSTDVal, BCFFPName, BCFFPNameVal,
            columns, rows, ed;

        function bcff2d(di = "ϕDi", thksn = "δsn", thkpn = "δpn") {

            bcffSketch.empty();

            let width = bcffSketch.width();
            let height = bcffSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFFSVG").attr("height", height);

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
            let thk = 10;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

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
                        {x: startX + 15, y: startY - 27},
                        {x: startX + 15, y: startY - 33},
                        {x: startX, y: startY - 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY - 30},
                        {x: endX - 15, y: endY - 27},
                        {x: endX - 15, y: endY - 33},
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

            // sketch
            drawLine(padding + wg - thk, padding, padding + wg - thk, height - padding);
            drawLine(padding + wg, padding, padding + wg, height - padding);
            drawLine(padding + wg - thk, height - padding, width - padding - wg + thk, height - padding);
            drawLine(padding + wg - thk, padding, padding + wg, padding);
            drawCenterLine(width / 2, padding - 10, width / 2, height - padding + 10);
            drawLine(width - padding - wg, padding, width - padding - wg, height - padding);
            drawLine(width - padding - wg + thk, padding, width - padding - wg + thk, height - padding);
            drawLine(padding + wg, padding, width - padding - wg + thk, padding);
            drawLine(padding + wg, padding + 4 * thk, width - padding - wg, padding + 4 * thk);
            drawLine(width - padding - wg - thk, padding, width - padding - wg, padding + thk);
            drawLine(padding + wg + thk, padding, padding + wg, padding + thk);
            drawLine(width - padding - wg, padding + thk, width - padding - wg - thk, padding + 4 * thk);
            drawLine(padding + wg, padding + thk, padding + wg + thk, padding + 4 * thk);

            // dsi
            dimBottomH(padding + wg, height - padding, width - padding - wg, height - padding, di, "BCFFSketchDI");

            // THKSN
            extLineBottomV(width - padding - wg + thk, height - padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - wg + thk, y: height - padding + 30},
                    {x: width - padding - wg + thk + 15, y: height - padding + 27},
                    {x: width - padding - wg + thk + 15, y: height - padding + 33},
                    {x: width - padding - wg + thk, y: height - padding + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width - padding - wg, y: height - padding + 30},
                {x: width - padding - wg + thk, y: height - padding + 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding - wg + thk + 15, y: height - padding + 30},
                {x: width - padding - wg + thk + 15 + 40, y: height - padding + 30}
            ])).attr("id", "BCFFSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFFSketchTHKSN").attr("startOffset", "50%")
                .text(thksn);

            // THKPN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + 4 * thk},
                    {x: padding + 2.5 * wg - 3, y: padding + 4 * thk + 15},
                    {x: padding + 2.5 * wg + 3, y: padding + 4 * thk + 15},
                    {x: padding + 2.5 * wg, y: padding + 4 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding},
                    {x: padding + 2.5 * wg - 3, y: padding - 15},
                    {x: padding + 2.5 * wg + 3, y: padding - 15},
                    {x: padding + 2.5 * wg, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: padding - 15 - 10},
                {x: padding + 2.5 * wg, y: padding + 4 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: padding + 4 * thk + 15 + 50},
                {x: padding + 2.5 * wg, y: padding + 4 * thk + 15}
            ])).attr("id", "BCFFSketchTHKPN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFFSketchTHKPN").attr("startOffset", "50%")
                .text(thkpn);
        }

        currentTabIndex = bcffd2d3.tabs('getTabIndex', bcffd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcff2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcff").length > 0) {
                    bcff2d();
                }
            });
        }
        bcffd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcff2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcff").length > 0) {
                            bcff2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号6圆形平盖计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 170,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 153,
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
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 4) {
                    $(ed.target).combobox("loadData", BCFFSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFFSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFFSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFFSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFFPCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFFPType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFFPSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFFPName);
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

                    // sketch
                    bcffSketch.empty();

                    // model
                    bcffModel.empty();

                    // sketch
                    currentTabIndex = bcffd2d3.tabs('getTabIndex', bcffd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcff2d();
                        bcffSketch.off("resize").on("resize", function () {
                            if ($("#bcff").length > 0) {
                                bcff2d();
                            }
                        });
                    }
                    bcffd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcff2d();
                                bcffSketch.off("resize").on("resize", function () {
                                    if ($("#bcff").length > 0) {
                                        bcff2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // 温度改变，重新加载 category
                    if (index === 1) {

                        BCFFDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFFSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFFSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFFSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFFPCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFFPType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFFPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFFSCategory = [];
                                BCFFPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFFDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFFSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFFPCategory[index] = {
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

                    // category 改变，重新加载type
                    else if (index === 4) {

                        BCFFSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFFSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFFSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFFSCategoryVal,
                                temp: BCFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFFSType = [];
                                $(result).each(function (index, element) {
                                    BCFFSType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // type 改变，重新加载 std
                    else if (index === 5) {

                        BCFFSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFFSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFFSCategoryVal,
                                type: BCFFSTypeVal,
                                temp: BCFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFFSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFFSSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // std 改变，重新加载 Name
                    else if (index === 6) {

                        BCFFSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFFSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFFSCategoryVal,
                                type: BCFFSTypeVal,
                                std: BCFFSSTDVal,
                                temp: BCFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFFSName = [];
                                $(result).each(function (index, element) {
                                    BCFFSName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // category 改变，重新加载type
                    else if (index === 12) {

                        BCFFPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFFPType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFFPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFFPCategoryVal,
                                temp: BCFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFFPType = [];
                                $(result).each(function (index, element) {
                                    BCFFPType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // type 改变，重新加载 std
                    else if (index === 13) {

                        BCFFPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFFPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFFPCategoryVal,
                                type: BCFFPTypeVal,
                                temp: BCFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFFPSTD = [];
                                $(result).each(function (index, element) {
                                    BCFFPSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // std 改变，重新加载 Name
                    else if (index === 14) {

                        BCFFPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFFPCategoryVal,
                                type: BCFFPTypeVal,
                                std: BCFFPSTDVal,
                                temp: BCFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFFPName = [];
                                $(result).each(function (index, element) {
                                    BCFFPName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // name 及其他修改项改变，获取数据，并计算
                    else {

                        // pd
                        let BCFFPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFFPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFFPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFFPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFFTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFFTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFFSNameVal = rows[7][columns[0][1].field];

                            // 筒体材料密度、最大最小厚度
                            let BCFFSDensity, BCFFSThkMin, BCFFSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFFSCategoryVal,
                                    "type": BCFFSTypeVal,
                                    "std": BCFFSSTDVal,
                                    "name": BCFFSNameVal,
                                    "temp": BCFFDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFFSDensity = parseFloat(result.density);
                                    BCFFSThkMin = parseFloat(result.thkMin);
                                    BCFFSThkMax = parseFloat(result.thkMax);

                                    // 筒体内直径
                                    let BCFFSDI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFFSDI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // init Sketch
                                    if (currentTabIndex === 0) {
                                        bcff2d("ϕ" + BCFFSDI);
                                        bcffSketch.off("resize").on("resize", function () {
                                            if ($("#bcff").length > 0) {
                                                bcff2d("ϕ" + BCFFSDI);
                                            }
                                        });
                                    }
                                    bcffd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcff2d("ϕ" + BCFFSDI);
                                                bcffSketch.off("resize").on("resize", function () {
                                                    if ($("#bcff").length > 0) {
                                                        bcff2d("ϕ" + BCFFSDI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 筒体名义厚度 thksn
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFFSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFFSThkMax) {
                                        let BCFFTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            bcff2d("ϕ" + BCFFSDI, BCFFTHKSN);
                                            bcffSketch.off("resize").on("resize", function () {
                                                if ($("#bcff").length > 0) {
                                                    bcff2d("ϕ" + BCFFSDI, BCFFTHKSN);
                                                }
                                            });
                                        }
                                        bcffd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    bcff2d("ϕ" + BCFFSDI, BCFFTHKSN);
                                                    bcffSketch.off("resize").on("resize", function () {
                                                        if ($("#bcff").length > 0) {
                                                            bcff2d("ϕ" + BCFFSDI, BCFFTHKSN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 筒体外直径
                                        let BCFFSDO = BCFFSDI + 2 * BCFFTHKSN;

                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                        let BCFFOST, BCFFOS, BCFFRSEL, BCFFCS1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCFFSCategoryVal,
                                                "type": BCFFSTypeVal,
                                                "std": BCFFSSTDVal,
                                                "name": BCFFSNameVal,
                                                "thk": BCFFTHKSN,
                                                "temp": BCFFDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": BCFFSDO
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCFFOST = parseFloat(result.ot);
                                                if (BCFFOST < 0) {
                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFFOS = parseFloat(result.o);
                                                if (BCFFOS < 0) {
                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFFRSEL = parseFloat(result.rel);
                                                if (BCFFRSEL < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFFCS1 = parseFloat(result.c1);
                                                if (BCFFCS1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 筒体腐蚀裕量
                                                let BCFFCS2;
                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) < BCFFTHKSN) {
                                                    BCFFCS2 = parseFloat(rows[10][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCFFTHKSN) {
                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCFFTHKSN + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 筒体焊接接头系数
                                                let BCFFES;
                                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                    BCFFES = parseFloat(rows[11][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖材料名称
                                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                    BCFFPNameVal = rows[15][columns[0][1].field];

                                                    // 平盖材料密度、最大最小厚度
                                                    let BCFFPDensity, BCFFPThkMin, BCFFPThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BCFFPCategoryVal,
                                                            "type": BCFFPTypeVal,
                                                            "std": BCFFPSTDVal,
                                                            "name": BCFFPNameVal,
                                                            "temp": BCFFDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BCFFPDensity = parseFloat(result.density);
                                                            BCFFPThkMin = parseFloat(result.thkMin);
                                                            BCFFPThkMax = parseFloat(result.thkMax);

                                                            // 平盖名义厚度 thkpn
                                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) > BCFFPThkMin
                                                                && parseFloat(rows[16][columns[0][1].field]) <= BCFFPThkMax) {
                                                                let BCFFTHKPN = parseFloat(rows[16][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcff2d("ϕ" + BCFFSDI, BCFFTHKSN, BCFFTHKPN);
                                                                    bcffSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcff").length > 0) {
                                                                            bcff2d("ϕ" + BCFFSDI, BCFFTHKSN, BCFFTHKPN);
                                                                        }
                                                                    });
                                                                }
                                                                bcffd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcff2d("ϕ" + BCFFSDI, BCFFTHKSN, BCFFTHKPN);
                                                                            bcffSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcff").length > 0) {
                                                                                    bcff2d("ϕ" + BCFFSDI, BCFFTHKSN, BCFFTHKPN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                                let BCFFOPT, BCFFOP, BCFFRPEL, BCFFCP1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCFFPCategoryVal,
                                                                        "type": BCFFPTypeVal,
                                                                        "std": BCFFPSTDVal,
                                                                        "name": BCFFPNameVal,
                                                                        "thk": BCFFTHKPN,
                                                                        "temp": BCFFDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": 100000
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCFFOPT = parseFloat(result.ot);
                                                                        if (BCFFOPT < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFFOP = parseFloat(result.o);
                                                                        if (BCFFOP < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFFRPEL = parseFloat(result.rel);
                                                                        if (BCFFRPEL < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFFCP1 = parseFloat(result.c1);
                                                                        if (BCFFCP1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 平盖腐蚀裕量
                                                                        let BCFFCP2;
                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                            && parseFloat(rows[17][columns[0][1].field]) < BCFFTHKPN) {
                                                                            BCFFCP2 = parseFloat(rows[17][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                            && parseFloat(rows[17][columns[0][1].field]) >= BCFFTHKPN) {
                                                                            south.html("平盖腐蚀裕量不能大于等于 " + BCFFTHKPN + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 平盖焊接接头系数
                                                                        let BCFFEP;
                                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                            BCFFEP = parseFloat(rows[18][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 计算压力
                                                                        let BCFFPC = BCFFPD + BCFFPS;

                                                                        // 筒体
                                                                        let BCFFCS = BCFFCS1 + BCFFCS2;
                                                                        let BCFFTHKSE = BCFFTHKSN - BCFFCS;
                                                                        let BCFFDC = BCFFSDI + 2 * BCFFCS2;
                                                                        let BCFFTHKSC = BCFFPC * BCFFDC / (2 * BCFFOST * BCFFES);
                                                                        let BCFFKP = Math.max(0.2, 0.44 * BCFFTHKSC / BCFFTHKSE);

                                                                        // 平盖
                                                                        let BCFFCP = BCFFCP1 + BCFFCP2;
                                                                        let BCFFTHKPE = BCFFTHKPN - BCFFCP;
                                                                        let BCFFTHKPC = BCFFDC * Math.sqrt(BCFFKP * BCFFPC / (BCFFOPT * BCFFEP));

                                                                        // 设计厚度
                                                                        let BCFFTHKPD = BCFFTHKPC + BCFFCP2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "平盖所需厚度：" + (BCFFTHKPD + BCFFCP1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 平盖厚度校核
                                                                        let BCFFTHKPCHK;
                                                                        if (BCFFTHKPN >= (BCFFTHKPD + BCFFCP1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCFFTHKPN + " mm" +
                                                                                "</span>");
                                                                            BCFFTHKPCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCFFTHKPN + " mm" +
                                                                                "</span>");
                                                                            BCFFTHKPCHK = "不合格";
                                                                        }

                                                                        // 压力试验
                                                                        let BCFFTestPT;
                                                                        if (BCFFTest === "液压试验") {
                                                                            BCFFTestPT = Math.max(1.25 * BCFFPD * BCFFOP / BCFFOPT, 0.05);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCFFTestPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (BCFFTest === "气压试验") {
                                                                            BCFFTestPT = Math.max(1.10 * BCFFPD * BCFFOP / BCFFOPT, 0.05);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCFFTestPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // MAWP
                                                                        let BCFFMAWP = BCFFTHKPE * BCFFTHKPE * BCFFOPT * BCFFEP / (BCFFKP * BCFFDC * BCFFDC) - BCFFPS;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "MAWP：" + BCFFMAWP.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                        // docx
                                                                        let BCFFPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "bcffdocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "BCFF",

                                                                                    t: BCFFDT,
                                                                                    pd: BCFFPD,
                                                                                    ps: BCFFPS,
                                                                                    stds: BCFFSSTDVal,
                                                                                    names: BCFFSNameVal,
                                                                                    thksn: BCFFTHKSN,
                                                                                    cs2: BCFFCS2,
                                                                                    dsi: BCFFSDI,
                                                                                    es: BCFFES,
                                                                                    stdp: BCFFPSTDVal,
                                                                                    namep: BCFFPNameVal,
                                                                                    thkpn: BCFFTHKPN,
                                                                                    cp2: BCFFCP2,
                                                                                    ep: BCFFEP,
                                                                                    test: BCFFTest,
                                                                                    ds: BCFFSDensity.toFixed(4),
                                                                                    rsel: BCFFRSEL.toFixed(4),
                                                                                    cs1: BCFFCS1.toFixed(4),
                                                                                    ost: BCFFOST.toFixed(4),
                                                                                    os: BCFFOS.toFixed(4),
                                                                                    dp: BCFFPDensity.toFixed(4),
                                                                                    rpel: BCFFRPEL.toFixed(4),
                                                                                    cp1: BCFFCP1.toFixed(4),
                                                                                    opt: BCFFOPT.toFixed(4),
                                                                                    op: BCFFOP.toFixed(4),
                                                                                    pc: BCFFPC.toFixed(4),
                                                                                    cs: BCFFCS.toFixed(4),
                                                                                    thkse: BCFFTHKSE.toFixed(4),
                                                                                    dc: BCFFDC.toFixed(4),
                                                                                    thksc: BCFFTHKSC.toFixed(4),
                                                                                    kp: BCFFKP.toFixed(4),
                                                                                    cp: BCFFCP.toFixed(4),
                                                                                    thkpe: BCFFTHKPE.toFixed(4),
                                                                                    thkpc: BCFFTHKPC.toFixed(4),
                                                                                    thkpd: BCFFTHKPD.toFixed(4),
                                                                                    thkpchk: BCFFTHKPCHK,
                                                                                    pt: BCFFTestPT.toFixed(4),
                                                                                    mawp: BCFFMAWP.toFixed(4)
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
                                                                                        BCFFPayJS.dialog({
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
                                                                                                    BCFFPayJS.dialog("close");
                                                                                                    BCFFPayJS.dialog("clear");
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
                                                                                                                BCFFPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                                // 倒计时计数器
                                                                                                                let maxTime = 4,
                                                                                                                    timer;

                                                                                                                function CountDown() {
                                                                                                                    if (maxTime >= 0) {
                                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                                        --maxTime;
                                                                                                                    } else {

                                                                                                                        clearInterval(timer);
                                                                                                                        // 关闭并清空收银台
                                                                                                                        BCFFPayJS.dialog('close');
                                                                                                                        BCFFPayJS.dialog('clear');
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
                                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                    }
                                                                });
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) <= BCFFPThkMin) {
                                                                south.html("平盖材料厚度不能小于等于 " + BCFFPThkMin + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) > BCFFPThkMax) {
                                                                south.html("平盖材料厚度不能大于 " + BCFFPThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }
                                                        },
                                                        error: function () {
                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                        }
                                                    });
                                                }
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFFSThkMin) {
                                        south.html("筒体材料厚度不能小于等于 " + BCFFSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFFSThkMax) {
                                        south.html("筒体材料厚度不能大于 " + BCFFSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                }
                            });
                        }
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        })
    });
});