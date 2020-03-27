$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let badSketch = $("#d2");
    let badModel = $("#d3");
    let badd2d3 = $('#d2d3');

    $("#cal").html("<table id='bad'></table>");
    let pg = $("#bad");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/d/BAD.json", function (result) {

        let BADDT;
        let BADCategory, BADCategoryVal, BADType, BADTypeVal, BADSTD, BADSTDVal, BADName, BADNameVal,
            BADJCategory, BADJCategoryVal, BADJType, BADJTypeVal, BADJSTD, BADJSTDVal, BADJName, BADJNameVal;
        let columns, rows, ed;

        function bad2d(l = "L", h = "H") {

            badSketch.empty();

            let width = badSketch.width();
            let height = badSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BADSVG").attr("height", height);

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
            let padding = 60;
            let thk = 12;

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

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            svg.append("path").attr("d", line([
                {x: padding + wg - 4 * thk, y: height - padding - thk},
                {x: padding + 3 * wg + 4 * thk, y: height - padding - thk},
                {x: padding + 3 * wg + 4 * thk, y: height - padding},
                {x: padding + wg - 4 * thk, y: height - padding},
                {x: padding + wg - 4 * thk, y: height - padding - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: height - padding - thk},
                {x: padding + wg - thk, y: padding + thk},
                {x: padding + wg, y: padding + thk},
                {x: padding + wg, y: height - padding - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding},
                {x: padding + wg + 3 * thk, y: padding},
                {x: padding + wg + 3 * thk, y: padding + thk},
                {x: padding + wg + thk, y: padding + thk},
                {x: padding + wg + thk, y: padding + 3 * thk},
                {x: padding + wg, y: padding + 3 * thk},
                {x: padding + wg, y: padding}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg + 3 * thk, y: padding + thk},
                {x: width / 2, y: padding + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg + thk, y: padding + 3 * thk},
                {x: width / 2, y: padding + 3 * thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding - thk},
                {x: padding + 3 * wg, y: padding + thk},
                {x: padding + 3 * wg + thk, y: padding + thk},
                {x: padding + 3 * wg + thk, y: height - padding - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding},
                {x: padding + 3 * wg + 4 * thk, y: padding},
                {x: padding + 3 * wg + 4 * thk, y: padding + thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3 * thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + thk},
                {x: padding + 3 * wg + thk, y: padding + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding},
                {x: padding + 3 * wg + thk, y: padding + thk}
            ])).classed("sketch", true);

            drawCenterLine(width / 2, padding - 10, width / 2, height - padding + 10);

            dimBottomH(padding + wg, height - padding - thk + 10, padding + 3 * wg, height - padding - thk + 10, l, "BADSketchL");
            svg.append("path").attr("d", line([
                {x: padding + wg, y: height - padding - thk + 3},
                {x: padding + wg, y: height - padding - thk + 13}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding - thk + 3},
                {x: padding + 3 * wg, y: height - padding - thk + 13}
            ])).classed("sketch", true);

            // h
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: height - padding - thk},
                    {x: padding + 2.5 * wg - 3, y: height - padding - thk - 15},
                    {x: padding + 2.5 * wg + 3, y: height - padding - thk - 15},
                    {x: padding + 2.5 * wg, y: height - padding - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding},
                    {x: padding + 2.5 * wg + 3, y: padding + 15},
                    {x: padding + 2.5 * wg - 3, y: padding + 15},
                    {x: padding + 2.5 * wg, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - thk - 15},
                {x: padding + 2.5 * wg, y: padding + 15}
            ])).attr("id", "BADSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BADSketchH")
                .attr("startOffset", "50%").text(h);

            // 文字
            svg.append("path").attr("d", line([
                {x: padding + wg - thk / 2, y: height / 2},
                {x: padding + wg - thk / 2 - 40, y: height / 2 - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk / 2 - 40 - 40, y: height / 2 - 40},
                {x: padding + wg - thk / 2 - 40, y: height / 2 - 40}
            ])).attr("id", "BADSketchBB").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BADSketchBB").attr("startOffset", "50%").text("壁板");

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding},
                {x: padding + 3 * wg, y: padding}
            ])).attr("id", "BADSketchAlert");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BADSketchAlert").attr("startOffset", "50%").text("顶部加强件可放置于壁板内侧、外侧或内外侧兼有");
        }

        currentTabIndex = badd2d3.tabs('getTabIndex', badd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bad2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bad").length > 0) {
                    bad2d();
                }
            });
        }
        badd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bad2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bad").length > 0) {
                            bad2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 B型(顶边加固型)矩形容器计算",
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
                if (index === 1) {
                    $(ed.target).combobox("loadData", BADCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", BADType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", BADSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BADName);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BADJCategory);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BADJType);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BADJSTD);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BADJName);
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
                    badSketch.empty();

                    // model
                    badModel.empty();

                    // sketch
                    currentTabIndex = badd2d3.tabs('getTabIndex', badd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bad2d();
                        badSketch.off("resize").on("resize", function () {
                            if ($("#bad").length > 0) {
                                bad2d();
                            }
                        });
                    }
                    badd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bad2d();
                                badSketch.off("resize").on("resize", function () {
                                    if ($("#bad").length > 0) {
                                        bad2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // t - category
                    if (index === 0) {

                        BADDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[1][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 1);
                        BADCategory = null;
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BADType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BADSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BADName = null;

                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BADJCategory = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BADJType = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BADJSTD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BADJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BADCategory = [];
                                BADJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BADDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BADCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BADJCategory[index] = {
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

                    // category - type
                    if (index === 1) {

                        BADCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BADType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BADSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BADName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BADCategoryVal,
                                temp: BADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BADType = [];
                                $(result).each(function (index, element) {
                                    BADType[index] = {
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

                    // type - std
                    if (index === 2) {

                        BADTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BADSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BADName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BADCategoryVal,
                                type: BADTypeVal,
                                temp: BADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BADSTD = [];
                                $(result).each(function (index, element) {
                                    BADSTD[index] = {
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

                    // std - Name
                    if (index === 3) {

                        BADSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BADName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BADCategoryVal,
                                type: BADTypeVal,
                                std: BADSTDVal,
                                temp: BADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BADName = [];
                                $(result).each(function (index, element) {
                                    BADName[index] = {
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

                    // category - type
                    if (index === 10) {

                        BADJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BADJType = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BADJSTD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BADJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BADJCategoryVal,
                                temp: BADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BADJType = [];
                                $(result).each(function (index, element) {
                                    BADJType[index] = {
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

                    // type - std
                    if (index === 11) {

                        BADJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BADJSTD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BADJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BADJCategoryVal,
                                type: BADJTypeVal,
                                temp: BADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BADJSTD = [];
                                $(result).each(function (index, element) {
                                    BADJSTD[index] = {
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

                    // std - Name
                    if (index === 12) {

                        BADJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BADJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BADJCategoryVal,
                                type: BADJTypeVal,
                                std: BADJSTDVal,
                                temp: BADDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BADJName = [];
                                $(result).each(function (index, element) {
                                    BADJName[index] = {
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

                    // 材料名称
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BADNameVal = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BADD0, BADThkMin, BADThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BADCategoryVal,
                            "type": BADTypeVal,
                            "std": BADSTDVal,
                            "name": BADNameVal,
                            "temp": BADDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BADD0 = parseFloat(result.density);
                            BADThkMin = parseFloat(result.thkMin);
                            BADThkMax = parseFloat(result.thkMax);

                            // 腐蚀裕量
                            let BADC2;
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                BADC2 = parseFloat(rows[5][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // 名义厚度
                            let BADTHKN;
                            if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > Math.max(BADC2, BADThkMin)
                                && parseFloat(rows[6][columns[0][1].field]) <= BADThkMax) {
                                BADTHKN = parseFloat(rows[6][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) <= Math.max(BADC2, BADThkMin)) {
                                south.html("壁板名义厚度 δn 不能小于等于 " + Math.max(BADC2, BADThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > BADThkMax) {
                                south.html("壁板名义厚度 δn 不能大于 " + BADThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 OT EBT C1
                            let BADOT, BADEBT, BADC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BADCategoryVal,
                                    "type": BADTypeVal,
                                    "std": BADSTDVal,
                                    "name": BADNameVal,
                                    "thk": BADTHKN,
                                    "temp": BADDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BADOT = parseFloat(result.ot);
                                    if (BADOT < 0) {
                                        south.html("查询壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BADC1 = parseFloat(result.c1);
                                    if (BADC1 < 0) {
                                        south.html("查询壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    BADEBT = 1000 * parseFloat(result.et);
                                    if (BADEBT < 0) {
                                        south.html("查询壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // L
                                    let BADL;
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        BADL = parseFloat(rows[7][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bad2d(BADL);
                                        $("#d2").off("resize").on("resize", function () {
                                            if ($("#bad").length > 0) {
                                                bad2d(BADL);
                                            }
                                        });
                                    }
                                    badd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bad2d(BADL);
                                                $("#d2").off("resize").on("resize", function () {
                                                    if ($("#bad").length > 0) {
                                                        bad2d(BADL);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // H
                                    let BADH;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) >= 0.1 * BADL
                                        && parseFloat(rows[8][columns[0][1].field]) <= 5 * BADL) {
                                        BADH = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) < 0.1 * BADL) {
                                        south.html("壁板高度 H 不能小于 " + 0.1 * BADL + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) > 5 * BADL) {
                                        south.html("壁板高度 H 不能大于 " + 5 * BADL + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bad2d(BADL, BADH);
                                        $("#d2").off("resize").on("resize", function () {
                                            if ($("#bad").length > 0) {
                                                bad2d(BADL, BADH);
                                            }
                                        });
                                    }
                                    badd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bad2d(BADL, BADH);
                                                $("#d2").off("resize").on("resize", function () {
                                                    if ($("#bad").length > 0) {
                                                        bad2d(BADL, BADH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // D
                                    let BADD;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                        BADD = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 材料名称
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                        BADJNameVal = rows[13][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // ajax 获取 EJT
                                    let BADEJT;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BADJCategoryVal,
                                            "type": BADJTypeVal,
                                            "std": BADJSTDVal,
                                            "name": BADJNameVal,
                                            "temp": BADDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BADEJT = 1000 * parseFloat(result.et);
                                            if (BADEJT < 0) {
                                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // 过程参数
                                            let BADG = 9.81;
                                            let BADPC = BADD * BADG * BADH / 1000000000;
                                            let BADC = BADC1 + BADC2;
                                            let BADTHKE = BADTHKN - BADC;
                                            let BADHL = BADH / BADL;

                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "ba": BADHL
                                                }),
                                                beforeSend: function () {
                                                    south.html("<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>" +
                                                        "<span style='color:#18bc9c;'>&ensp;正在查表 8-7 获取 α、β</span>");
                                                },
                                                success: function (result) {

                                                    let BADALPHA = parseFloat(result.alpha);
                                                    let BADBETA = parseFloat(result.beta);

                                                    // 厚度
                                                    let BADTHKC = 2.45 * BADL * Math.sqrt(BADALPHA * BADPC / BADOT);

                                                    let BADTHKD = BADTHKC + BADC2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "壁板所需厚度：" + (BADTHKD + BADC1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BADTHKCHK;
                                                    if (BADTHKN >= (BADTHKD + BADC1)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + BADTHKN + " mm" +
                                                            "</span>");
                                                        BADTHKCHK = "合格";
                                                    }
                                                    else if (BADTHKN < (BADTHKD + BADC1)) {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + BADTHKN + " mm" +
                                                            "</span>");
                                                        BADTHKCHK = "不合格";
                                                    }

                                                    // 挠度
                                                    let BADFALLOW = 5 * (BADTHKE / 2 + Math.sqrt(BADHL) * BADL / 500);
                                                    let BADFMAX = BADBETA * Math.pow(BADL, 4) * BADPC / (BADEBT * Math.pow(BADTHKE, 3));

                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "壁板许用挠度：" + BADFALLOW.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BADFCHK;
                                                    if (BADFMAX <= BADFALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + BADFMAX.toFixed(2) + " mm" +
                                                            "</span>");
                                                        BADFCHK = "合格";
                                                    }
                                                    else if (BADFMAX > BADFALLOW) {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + BADFMAX.toFixed(2) + " mm" +
                                                            "</span>");
                                                        BADFCHK = "不合格";
                                                    }

                                                    // 加固件
                                                    let BADICT = 0.217 * BADD * BADG * BADH * BADH * BADL * BADL * BADL / BADEJT / 1000000000;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "顶边加固件所需最小惯性矩：" + BADICT.toFixed(2) + " mm⁴" +
                                                        "</span>");

                                                    // docx
                                                    let BADPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "baddocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "BAD",

                                                                t: BADDT,
                                                                d: BADD,
                                                                std: BADSTDVal,
                                                                name: BADNameVal,
                                                                c2: BADC2,
                                                                thkn: BADTHKN,
                                                                l: BADL,
                                                                h: BADH,
                                                                jstd: BADJSTDVal,
                                                                jname: BADJNameVal,
                                                                d0: BADD0.toFixed(4),
                                                                c1: BADC1.toFixed(4),
                                                                ot: BADOT.toFixed(4),
                                                                ebt: (BADEBT / 1000).toFixed(4),
                                                                ejt: (BADEJT / 1000).toFixed(4),
                                                                g: BADG.toFixed(4),
                                                                pc: BADPC.toFixed(4),
                                                                c: BADC.toFixed(4),
                                                                thke: BADTHKE.toFixed(4),
                                                                hl: BADHL.toFixed(4),
                                                                alpha: BADALPHA.toFixed(8),
                                                                beta: BADBETA.toFixed(8),
                                                                thkc: BADTHKC.toFixed(4),
                                                                thkd: BADTHKD.toFixed(4),
                                                                thkchk: BADTHKCHK,
                                                                fallow: BADFALLOW.toFixed(4),
                                                                fmax: BADFMAX.toFixed(4),
                                                                fchk: BADFCHK,
                                                                ict: BADICT.toFixed(4)
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
                                                                    BADPayJS.dialog({
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
                                                                                BADPayJS.dialog("close");
                                                                                BADPayJS.dialog("clear");
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
                                                                                            BADPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    BADPayJS.dialog('close');
                                                                                                    BADPayJS.dialog('clear');
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
                                                        "<span style='color:red;'>&ensp;查表 8-7 获取 α、β失败，请检查网络后重试</span>");
                                                }
                                            });
                                        },
                                        error: function () {
                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
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