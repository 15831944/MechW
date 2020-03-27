$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let baebSketch = $("#d2");
    let baebModel = $("#d3");
    let baebd2d3 = $('#d2d3');

    $("#cal").html("<table id='baeb'></table>");
    let pg = $("#baeb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/e/b/BAEB.json", function (result) {

        let BAEBDT;
        let BAEBBCategory, BAEBBCategoryVal, BAEBBType, BAEBBTypeVal, BAEBBSTD, BAEBBSTDVal, BAEBBName, BAEBBNameVal,
            BAEBDCategory, BAEBDCategoryVal, BAEBDType, BAEBDTypeVal, BAEBDSTD, BAEBDSTDVal, BAEBDName, BAEBDNameVal;
        let columns, rows, ed;

        function baeb2d(h = "H", w = "W") {

            baebSketch.empty();

            let width = baebSketch.width();
            let height = baebSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAEBSVG").attr("height", height);

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
                ])).attr("id", id).classed("sketch", true);

                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle").append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            // 底板
            svg.append("path").attr("d", line([
                {x: padding + wg - 7 * thk, y: height - padding},
                {x: padding + 3 * wg + 7 * thk, y: height - padding},
                {x: padding + 3 * wg + 7 * thk, y: height - padding + thk},
                {x: padding + wg - 7 * thk, y: height - padding + thk},
                {x: padding + wg - 7 * thk, y: height - padding}
            ])).classed("sketch", true);

            // 壁板
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: height - padding},
                {x: padding + wg - thk, y: padding},
                {x: padding + wg, y: padding},
                {x: padding + wg, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding},
                {x: padding + 3 * wg + thk, y: padding},
                {x: padding + 3 * wg + thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding},
                {x: padding + 3 * wg, y: padding}
            ])).classed("sketch", true);

            // 角钢
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding},
                {x: padding + wg - thk, y: padding - thk},
                {x: padding + wg - 6 * thk, y: padding - thk},
                {x: padding + wg - 6 * thk, y: padding},
                {x: padding + wg - 2 * thk, y: padding},
                {x: padding + wg - 2 * thk, y: padding + 4 * thk},
                {x: padding + wg - thk, y: padding + 4 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 2 * thk, y: padding + 4 * thk},
                {x: padding + wg - 2 * thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding},
                {x: padding + wg - 6 * thk, y: height - padding}
            ])).classed("sketch", true);

            // 角钢
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding},
                {x: padding + 3 * wg + thk, y: padding - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding},
                {x: padding + 3 * wg + 2 * thk, y: padding},
                {x: padding + 3 * wg + 2 * thk, y: padding + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 4 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 2 * thk, y: padding + 4 * thk},
                {x: padding + 3 * wg + 2 * thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding},
                {x: padding + 3 * wg + 6 * thk, y: height - padding}
            ])).classed("sketch", true);

            drawCenterLine(padding + wg - 4 * thk, padding - thk - 10, padding + wg - 4 * thk, height - padding + 10);
            drawCenterLine(padding + 3 * wg + 4 * thk, padding - thk - 10, padding + 3 * wg + 4 * thk, height - padding + 10);

            drawLine(padding + wg - thk, padding - thk, padding + 3 * wg + thk, padding - thk);

            // h
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: height - padding},
                    {x: padding + 2.5 * wg - 3, y: height - padding - 15},
                    {x: padding + 2.5 * wg + 3, y: height - padding - 15},
                    {x: padding + 2.5 * wg, y: height - padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding - thk},
                    {x: padding + 2.5 * wg + 3, y: padding - thk + 15},
                    {x: padding + 2.5 * wg - 3, y: padding - thk + 15},
                    {x: padding + 2.5 * wg, y: padding - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - 15},
                {x: padding + 2.5 * wg, y: padding - thk + 15}
            ])).attr("id", "BAEBSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAEBSketchH")
                .attr("startOffset", "50%").text(h);

            dimBottomH(padding + wg, height - padding + thk, padding + 3 * wg, height - padding + thk, w, "BAEBSketchW");
            drawLine(padding + wg, height - padding + 3, padding + wg, height - padding + thk + 3);
            drawLine(padding + 3 * wg, height - padding + 3, padding + 3 * wg, height - padding + thk + 3);
        }

        currentTabIndex = baebd2d3.tabs('getTabIndex', baebd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baeb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baeb").length > 0) {
                    baeb2d();
                }
            });
        }
        baebd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baeb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baeb").length > 0) {
                            baeb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 顶边加固、垂直加固矩形容器",
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
                if (index === 3) {
                    $(ed.target).combobox("loadData", BAEBBCategory);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BAEBBType);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAEBBSTD);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAEBBName);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAEBDCategory);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAEBDType);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAEBDSTD);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BAEBDName);
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

                    // sketch model
                    baebSketch.empty();
                    baebModel.empty();

                    // sketch
                    currentTabIndex = baebd2d3.tabs('getTabIndex', baebd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baeb2d();
                        baebSketch.off("resize").on("resize", function () {
                            if ($("#baeb").length > 0) {
                                baeb2d();
                            }
                        });
                    }
                    baebd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baeb2d();
                                baebSketch.off("resize").on("resize", function () {
                                    if ($("#baeb").length > 0) {
                                        baeb2d();
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

                        BAEBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAEBBCategory = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAEBBType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAEBBSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEBBName = null;

                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAEBDCategory = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAEBDType = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAEBDSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAEBDName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEBBCategory = [];
                                BAEBDCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAEBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAEBBCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAEBDCategory[index] = {
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
                    if (index === 3) {

                        BAEBBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAEBBType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAEBBSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEBBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEBBCategoryVal,
                                temp: BAEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEBBType = [];
                                $(result).each(function (index, element) {
                                    BAEBBType[index] = {
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
                    if (index === 4) {

                        BAEBBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAEBBSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEBBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEBBCategoryVal,
                                type: BAEBBTypeVal,
                                temp: BAEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEBBSTD = [];
                                $(result).each(function (index, element) {
                                    BAEBBSTD[index] = {
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
                    if (index === 5) {

                        BAEBBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEBBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEBBCategoryVal,
                                type: BAEBBTypeVal,
                                std: BAEBBSTDVal,
                                temp: BAEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEBBName = [];
                                $(result).each(function (index, element) {
                                    BAEBBName[index] = {
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
                    if (index === 11) {

                        BAEBDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAEBDType = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAEBDSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAEBDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEBDCategoryVal,
                                temp: BAEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEBDType = [];
                                $(result).each(function (index, element) {
                                    BAEBDType[index] = {
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
                    if (index === 12) {

                        BAEBDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAEBDSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAEBDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEBDCategoryVal,
                                type: BAEBDTypeVal,
                                temp: BAEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEBDSTD = [];
                                $(result).each(function (index, element) {
                                    BAEBDSTD[index] = {
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
                    if (index === 13) {

                        BAEBDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAEBDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEBDCategoryVal,
                                type: BAEBDTypeVal,
                                std: BAEBDSTDVal,
                                temp: BAEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEBDName = [];
                                $(result).each(function (index, element) {
                                    BAEBDName[index] = {
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

                    // H
                    let BAEBH;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAEBH = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baeb2d(BAEBH);
                        baebSketch.off("resize").on("resize", function () {
                            if ($("#baeb").length > 0) {
                                baeb2d(BAEBH);
                            }
                        });
                    }
                    baebd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baeb2d(BAEBH);
                                baebSketch.off("resize").on("resize", function () {
                                    if ($("#baeb").length > 0) {
                                        baeb2d(BAEBH);
                                    }
                                });
                            }
                        }
                    });

                    // D
                    let BAEBD;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAEBD = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 壁板材料名称
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        BAEBBNameVal = rows[6][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAEBDB, BAEBBThkMin, BAEBBThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAEBBCategoryVal,
                            "type": BAEBBTypeVal,
                            "std": BAEBBSTDVal,
                            "name": BAEBBNameVal,
                            "temp": BAEBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAEBDB = parseFloat(result.density);
                            BAEBBThkMin = parseFloat(result.thkMin);
                            BAEBBThkMax = parseFloat(result.thkMax);

                            // 壁板腐蚀裕量 CB2
                            let BAEBCB2;
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) < BAEBBThkMax) {
                                BAEBCB2 = parseFloat(rows[7][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) >= BAEBBThkMax) {
                                south.html("壁板腐蚀裕量不能大于等于 " + BAEBBThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 壁板名义厚度
                            let BAEBTHKBN;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) > Math.max(BAEBCB2, BAEBBThkMin)
                                && parseFloat(rows[8][columns[0][1].field]) <= BAEBBThkMax) {
                                BAEBTHKBN = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) <= Math.max(BAEBCB2, BAEBBThkMin)) {
                                south.html("壁板名义厚度不能小于等于 " + Math.max(BAEBCB2, BAEBBThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) > BAEBBThkMax) {
                                south.html("壁板名义厚度不能大于 " + BAEBBThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 OBT EBT CB1
                            let BAEBOBT, BAEBEBT, BAEBCB1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAEBBCategoryVal,
                                    "type": BAEBBTypeVal,
                                    "std": BAEBBSTDVal,
                                    "name": BAEBBNameVal,
                                    "thk": BAEBTHKBN,
                                    "temp": BAEBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAEBOBT = parseFloat(result.ot);
                                    if (BAEBOBT < 0) {
                                        south.html("查询壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAEBCB1 = parseFloat(result.c1);
                                    if (BAEBCB1 < 0) {
                                        south.html("查询壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    BAEBEBT = 1000 * parseFloat(result.et);
                                    if (BAEBEBT < 0) {
                                        south.html("查询壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // 壁板宽度 W
                                    let BAEBW;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                        BAEBW = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baeb2d(BAEBH, BAEBW);
                                        baebSketch.off("resize").on("resize", function () {
                                            if ($("#baeb").length > 0) {
                                                baeb2d(BAEBH, BAEBW);
                                            }
                                        });
                                    }
                                    baebd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baeb2d(BAEBH, BAEBW);
                                                baebSketch.off("resize").on("resize", function () {
                                                    if ($("#baeb").length > 0) {
                                                        baeb2d(BAEBH, BAEBW);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 加固柱间距 WC
                                    let BAEBWC;
                                    if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                        && parseFloat(rows[10][columns[0][1].field]) >= 0.2 * BAEBH
                                        && parseFloat(rows[10][columns[0][1].field]) <= Math.min(10 * BAEBH, BAEBW)) {
                                        BAEBWC = parseFloat(rows[10][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                        && parseFloat(rows[10][columns[0][1].field]) < 0.2 * BAEBH) {
                                        south.html("垂直加固柱沿壁板方向间距不能小于 " + 0.2 * BAEBH + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                        && parseFloat(rows[10][columns[0][1].field]) > Math.min(10 * BAEBH, BAEBW)) {
                                        south.html("垂直加固柱沿壁板方向间距不能大于 " + Math.min(10 * BAEBH, BAEBW) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 顶边加固件材料名称
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        BAEBDNameVal = rows[14][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // ajax 获取 EDT
                                    let BAEBEDT;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAEBDCategoryVal,
                                            "type": BAEBDTypeVal,
                                            "std": BAEBDSTDVal,
                                            "name": BAEBDNameVal,
                                            "temp": BAEBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAEBEDT = 1000 * parseFloat(result.et);
                                            if (BAEBEDT < 0) {
                                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // 过程参数
                                            let BAEBG = 9.81;
                                            let BAEBPC = BAEBD * BAEBG * BAEBH / 1000000000;
                                            let BAEBCB = BAEBCB1 + BAEBCB2;
                                            let BAEBTHKBE = BAEBTHKBN - BAEBCB;
                                            let BAEBHWC = BAEBH / BAEBWC;

                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "ba": BAEBHWC
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    let BAEBALPHA = parseFloat(result.alpha);
                                                    let BAEBBETA = parseFloat(result.beta);

                                                    // 加固柱校核
                                                    let BAEBWMAX = 0.408 * BAEBTHKBE * Math.sqrt(BAEBOBT / (BAEBALPHA * BAEBPC));
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "垂直加固柱允许最大间距：" + BAEBWMAX.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAEBWCCHK;
                                                    if (BAEBWC <= BAEBWMAX) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际输入间距：" + BAEBWC + " mm" +
                                                            "</span>");
                                                        BAEBWCCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际输入间距：" + BAEBWC + " mm" +
                                                            "</span>");
                                                        BAEBWCCHK = "不合格";
                                                    }
                                                    let BAEBZP = BAEBWC * (0.0642 * BAEBPC * BAEBH * BAEBH / BAEBOBT - BAEBTHKBE * BAEBTHKBE / 6);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "垂直加固柱所需最小截面系数：" + BAEBZP.toFixed(4) + " mm³" +
                                                        "</span>");

                                                    // 壁板厚度
                                                    let BAEBTHKBC = 2.45 * BAEBWC * Math.sqrt(BAEBALPHA * BAEBPC / BAEBOBT);
                                                    let BAEBTHKBD = BAEBTHKBC + BAEBCB2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "壁板所需厚度：" + (BAEBTHKBD + BAEBCB1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAEBTHKBCHK;
                                                    if (BAEBTHKBN >= (BAEBTHKBD + BAEBCB1)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + BAEBTHKBN + " mm" +
                                                            "</span>");
                                                        BAEBTHKBCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + BAEBTHKBN + " mm" +
                                                            "</span>");
                                                        BAEBTHKBCHK = "不合格";
                                                    }

                                                    // 壁板挠度
                                                    let BAEBFALLOW = 5 * (BAEBTHKBE / 2 + Math.sqrt(BAEBHWC) * BAEBWC / 500);
                                                    let BAEBFMAX = BAEBBETA * Math.pow(BAEBWC, 4) * BAEBPC / (BAEBEBT * Math.pow(BAEBTHKBE, 3));

                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "壁板许用挠度：" + BAEBFALLOW.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAEBFCHK;
                                                    if (BAEBFMAX <= BAEBFALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + BAEBFMAX.toFixed(2) + " mm" +
                                                            "</span>");
                                                        BAEBFCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + BAEBFMAX.toFixed(2) + " mm" +
                                                            "</span>");
                                                        BAEBFCHK = "不合格";
                                                    }

                                                    // 顶边加固件
                                                    let BAEBICT = 0.217 * BAEBPC * BAEBH * BAEBW * BAEBW * BAEBW / BAEBEDT;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "顶边加固件所需最小惯性矩：" + BAEBICT.toFixed(4) + " mm⁴" +
                                                        "</span>");

                                                    // docx
                                                    let BAEBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "baebdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "BAEB",

                                                                t: BAEBDT,
                                                                h: BAEBH,
                                                                d: BAEBD,
                                                                bstd: BAEBBSTDVal,
                                                                bname: BAEBBNameVal,
                                                                cb2: BAEBCB2,
                                                                thkbn: BAEBTHKBN,
                                                                w: BAEBW,
                                                                wc: BAEBWC,
                                                                dstd: BAEBDSTDVal,
                                                                dname: BAEBDNameVal,
                                                                db: BAEBDB.toFixed(4),
                                                                cb1: BAEBCB1.toFixed(4),
                                                                obt: BAEBOBT.toFixed(4),
                                                                ebt: (BAEBEBT / 1000).toFixed(4),
                                                                edt: (BAEBEDT / 1000).toFixed(4),
                                                                g: BAEBG.toFixed(4),
                                                                pc: BAEBPC.toFixed(4),
                                                                cb: BAEBCB.toFixed(4),
                                                                thkbe: BAEBTHKBE.toFixed(4),
                                                                hwc: BAEBHWC.toFixed(4),
                                                                alpha: BAEBALPHA.toFixed(8),
                                                                beta: BAEBBETA.toFixed(8),
                                                                wmax: BAEBWMAX.toFixed(4),
                                                                wcchk: BAEBWCCHK,
                                                                zp: BAEBZP.toFixed(4),
                                                                thkbc: BAEBTHKBC.toFixed(4),
                                                                thkbd: BAEBTHKBD.toFixed(4),
                                                                thkbchk: BAEBTHKBCHK,
                                                                fallow: BAEBFALLOW.toFixed(4),
                                                                fmax: BAEBFMAX.toFixed(4),
                                                                fchk: BAEBFCHK,
                                                                ict: BAEBICT.toFixed(4)
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
                                                                    BAEBPayJS.dialog({
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
                                                                                baebkground: "#ffffff",
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
                                                                                BAEBPayJS.dialog("close");
                                                                                BAEBPayJS.dialog("clear");
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
                                                                                            BAEBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    BAEBPayJS.dialog('close');
                                                                                                    BAEBPayJS.dialog('clear');
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