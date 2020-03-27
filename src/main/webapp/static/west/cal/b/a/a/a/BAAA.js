$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let baaaSketch = $("#d2");
    let baaaModel = $("#d3");
    let baaad2d3 = $('#d2d3');

    $("#cal").html("<table id='baaa'></table>");
    let pg = $("#baaa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/a/a/BAAA.json", function (result) {

        let BAAADT;
        let BAAADCategory, BAAADCategoryVal, BAAADType, BAAADTypeVal, BAAADSTD, BAAADSTDVal, BAAADName, BAAADNameVal,
            BAAABCategory, BAAABCategoryVal, BAAABType, BAAABTypeVal, BAAABSTD, BAAABSTDVal, BAAABName, BAAABNameVal;
        let columns, rows, ed;

        function baaa2d(thkdn = "δdn", l = "L", lc = "Lc", w = "W", wc = "Wc") {

            baaaSketch.empty();

            let width = baaaSketch.width();
            let height = baaaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAAASVG").attr("height", height);

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

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg - thk},
                {x: width - padding - wg, y: padding + hg - thk},
                {x: width - padding - wg, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + wg, y: padding + hg - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg, y: height / 2},
                {x: width - padding - wg, y: height / 2},
                {x: width - padding - wg, y: height / 2 + 2 * hg},
                {x: padding + wg, y: height / 2 + 2 * hg},
                {x: padding + wg, y: height / 2}
            ])).classed("sketch", true);

            drawCenterLine(width / 2, padding + hg - thk - 10, width / 2, padding + hg + 10);
            drawCenterLine(width / 2, height / 2 - 10, width / 2, height - padding + 10);
            drawCenterLine(padding + wg - 10, height - padding - hg, width - padding - wg + 10, height - padding - hg);

            drawCenterLine(padding + 1.25 * wg, height / 2 - 10, padding + 1.25 * wg, height - padding + 10);
            drawCenterLine(padding + 1.5 * wg, height / 2 - 10, padding + 1.5 * wg, height - padding + 10);
            drawCenterLine(padding + 1.75 * wg, height / 2 - 10, padding + 1.75 * wg, height - padding + 10);
            drawCenterLine(padding + 2.25 * wg, height / 2 - 10, padding + 2.25 * wg, height - padding + 10);
            drawCenterLine(padding + 2.5 * wg, height / 2 - 10, padding + 2.5 * wg, height - padding + 10);
            drawCenterLine(padding + 2.75 * wg, height / 2 - 10, padding + 2.75 * wg, height - padding + 10);


            drawCenterLine(padding + 1.25 * wg, padding + hg - thk - 10, padding + 1.25 * wg, padding + hg + 10);
            drawCenterLine(padding + 1.5 * wg, padding + hg - thk - 10, padding + 1.5 * wg, padding + hg + 10);
            drawCenterLine(padding + 1.75 * wg, padding + hg - thk - 10, padding + 1.75 * wg, padding + hg + 10);
            drawCenterLine(padding + 2.25 * wg, padding + hg - thk - 10, padding + 2.25 * wg, padding + hg + 10);
            drawCenterLine(padding + 2.5 * wg, padding + hg - thk - 10, padding + 2.5 * wg, padding + hg + 10);
            drawCenterLine(padding + 2.75 * wg, padding + hg - thk - 10, padding + 2.75 * wg, padding + hg + 10);

            drawCenterLine(padding + wg - 10, height / 2 + 0.5 * hg, width - padding - wg + 10, height / 2 + 0.5 * hg);
            drawCenterLine(padding + wg - 10, height / 2 + 1.5 * hg, width - padding - wg + 10, height / 2 + 1.5 * hg);

            // L
            dimBottomH(padding + wg, height / 2 + 2 * hg, width - padding - wg, height / 2 + 2 * hg, l, "BAAASketchL");

            // Lc
            dimBottomH(padding + 1.75 * wg, padding + hg + 10, width / 2, padding + hg + 10, lc, "BAAASketchLC");

            // W
            dimLeftV(padding + wg, height / 2 + 2 * hg, padding + wg, height / 2, w, "BAAASketchW");

            // Wc
            dimRightV(width - padding - wg + 10, height - padding - 0.5 * hg, width - padding - wg + 10, height - padding - hg, wc, "BAAASketchWC");

            // THKN
            extLineLeftH(padding + wg, padding + hg - thk);
            extLineLeftH(padding + wg, padding + hg);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - 30, y: padding + hg - thk},
                    {x: padding + wg - 30 + 3, y: padding + hg - thk - 15},
                    {x: padding + wg - 30 - 3, y: padding + hg - thk - 15},
                    {x: padding + wg - 30, y: padding + hg - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - 30, y: padding + hg},
                    {x: padding + wg - 30 + 3, y: padding + hg + 15},
                    {x: padding + wg - 30 - 3, y: padding + hg + 15},
                    {x: padding + wg - 30, y: padding + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - 30, y: padding + hg - thk},
                {x: padding + wg - 30, y: padding + hg + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 30, y: padding + hg - thk - 15},
                {x: padding + wg - 30, y: padding + hg - thk - 15 - 40}
            ])).attr("id", "BAAASketchTHKDN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAAASketchTHKDN").attr("startOffset", "50%").text(thkdn);

        }

        currentTabIndex = baaad2d3.tabs('getTabIndex', baaad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baaa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baaa").length > 0) {
                    baaa2d();
                }
            });
        }
        baaad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baaa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baaa").length > 0) {
                            baaa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 矩形容器顶板(带加强筋)计算",
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
                    $(ed.target).combobox("loadData", BAAADCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", BAAADType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", BAAADSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BAAADName);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAAABCategory);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAAABType);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAAABSTD);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAAABName);
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
                    baaaSketch.empty();
                    // model
                    baaaModel.empty();

                    // sketch
                    currentTabIndex = baaad2d3.tabs('getTabIndex', baaad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baaa2d();
                        baaaSketch.off("resize").on("resize", function () {
                            if ($("#baaa").length > 0) {
                                baaa2d();
                            }
                        });
                    }
                    baaad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baaa2d();
                                baaaSketch.off("resize").on("resize", function () {
                                    if ($("#baaa").length > 0) {
                                        baaa2d();
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

                        BAAADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[1][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 1);
                        BAAADCategory = null;
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BAAADType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAAADSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAAADName = null;

                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAAABCategory = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAAABType = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAAABSTD = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAAABName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAAADCategory = [];
                                BAAABCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAAADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAAADCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAAABCategory[index] = {
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

                        BAAADCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BAAADType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAAADSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAAADName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAAADCategoryVal,
                                temp: BAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAAADType = [];
                                $(result).each(function (index, element) {
                                    BAAADType[index] = {
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

                        BAAADTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAAADSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAAADName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAAADCategoryVal,
                                type: BAAADTypeVal,
                                temp: BAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAAADSTD = [];
                                $(result).each(function (index, element) {
                                    BAAADSTD[index] = {
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

                        BAAADSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAAADName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAAADCategoryVal,
                                type: BAAADTypeVal,
                                std: BAAADSTDVal,
                                temp: BAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAAADName = [];
                                $(result).each(function (index, element) {
                                    BAAADName[index] = {
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
                    if (index === 7) {

                        BAAABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAAABType = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAAABSTD = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAAABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAAABCategoryVal,
                                temp: BAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAAABType = [];
                                $(result).each(function (index, element) {
                                    BAAABType[index] = {
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
                    if (index === 8) {

                        BAAABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAAABSTD = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAAABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAAABCategoryVal,
                                type: BAAABTypeVal,
                                temp: BAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAAABSTD = [];
                                $(result).each(function (index, element) {
                                    BAAABSTD[index] = {
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
                    if (index === 9) {

                        BAAABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAAABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAAABCategoryVal,
                                type: BAAABTypeVal,
                                std: BAAABSTDVal,
                                temp: BAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAAABName = [];
                                $(result).each(function (index, element) {
                                    BAAABName[index] = {
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
                        BAAADNameVal = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAAADD, BAAADThkMin, BAAADThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAAADCategoryVal,
                            "type": BAAADTypeVal,
                            "std": BAAADSTDVal,
                            "name": BAAADNameVal,
                            "temp": BAAADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAAADD = parseFloat(result.density);
                            BAAADThkMin = parseFloat(result.thkMin);
                            BAAADThkMax = parseFloat(result.thkMax);

                            // 腐蚀裕量
                            let BAAACD2;
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                BAAACD2 = parseFloat(rows[5][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // 名义厚度
                            let BAAATHKDN;
                            if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > Math.max(BAAACD2, BAAADThkMin)
                                && parseFloat(rows[6][columns[0][1].field]) <= BAAADThkMax) {
                                BAAATHKDN = parseFloat(rows[6][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) <= Math.max(BAAACD2, BAAADThkMin)) {
                                south.html("顶板名义厚度 δdn 不能小于等于 " + Math.max(BAAACD2, BAAADThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > BAAADThkMax) {
                                south.html("顶板名义厚度 δdn 不能大于 " + BAAADThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                baaa2d(BAAATHKDN);
                                baaaSketch.off("resize").on("resize", function () {
                                    if ($("#baaa").length > 0) {
                                        baaa2d(BAAATHKDN);
                                    }
                                });
                            }
                            baaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        baaa2d(BAAATHKDN);
                                        baaaSketch.off("resize").on("resize", function () {
                                            if ($("#baaa").length > 0) {
                                                baaa2d(BAAATHKDN);
                                            }
                                        });
                                    }
                                }
                            });

                            // ajax 获取 ODT EDT CD1
                            let BAAAODT, BAAAOD, BAAARDEL, BAAAEDT, BAAACD1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAAADCategoryVal,
                                    "type": BAAADTypeVal,
                                    "std": BAAADSTDVal,
                                    "name": BAAADNameVal,
                                    "thk": BAAATHKDN,
                                    "temp": BAAADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAAAODT = parseFloat(result.ot);
                                    if (BAAAODT < 0) {
                                        south.html("查询顶板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAAAOD = parseFloat(result.o);
                                    if (BAAAOD < 0) {
                                        south.html("查询顶板材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAAARDEL = parseFloat(result.rel);
                                    if (BAAARDEL < 0) {
                                        south.html("查询顶板材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    BAAACD1 = parseFloat(result.c1);
                                    if (BAAACD1 < 0) {
                                        south.html("查询顶板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    BAAAEDT = 1000 * parseFloat(result.et);
                                    if (BAAAEDT < 0) {
                                        south.html("查询顶板材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // 材料名称
                                    if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                        BAAABNameVal = rows[10][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAAADB, BAAABThkMin, BAAABThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAAABCategoryVal,
                                            "type": BAAABTypeVal,
                                            "std": BAAABSTDVal,
                                            "name": BAAABNameVal,
                                            "temp": BAAADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAAADB = parseFloat(result.density);
                                            BAAABThkMin = parseFloat(result.thkMin);
                                            BAAABThkMax = parseFloat(result.thkMax);

                                            // 名义厚度
                                            let BAAATHKBN;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                && parseFloat(rows[11][columns[0][1].field]) > BAAABThkMin
                                                && parseFloat(rows[11][columns[0][1].field]) <= BAAABThkMax) {
                                                BAAATHKBN = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                && parseFloat(rows[11][columns[0][1].field]) <= BAAABThkMin) {
                                                south.html("加强筋名义厚度 δbn 不能小于等于 " + BAAABThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                && parseFloat(rows[11][columns[0][1].field]) > BAAABThkMax) {
                                                south.html("加强筋名义厚度 δbn 不能大于 " + BAAABThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 OBT
                                            let BAAAOBT;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAAABCategoryVal,
                                                    "type": BAAABTypeVal,
                                                    "std": BAAABSTDVal,
                                                    "name": BAAABNameVal,
                                                    "thk": BAAATHKBN,
                                                    "temp": BAAADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAAAOBT = parseFloat(result.ot);
                                                    if (BAAAOBT < 0) {
                                                        south.html("查询加强筋材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // L
                                                    let BAAAL;
                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                        BAAAL = parseFloat(rows[12][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baaa2d(BAAATHKDN, BAAAL);
                                                        baaaSketch.off("resize").on("resize", function () {
                                                            if ($("#baaa").length > 0) {
                                                                baaa2d(BAAATHKDN, BAAAL);
                                                            }
                                                        });
                                                    }
                                                    baaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baaa2d(BAAATHKDN, BAAAL);
                                                                baaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#baaa").length > 0) {
                                                                        baaa2d(BAAATHKDN, BAAAL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // LC
                                                    let BAAALC;
                                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                        && parseFloat(rows[13][columns[0][1].field]) <= BAAAL) {
                                                        BAAALC = parseFloat(rows[13][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                        && parseFloat(rows[13][columns[0][1].field]) > BAAAL) {
                                                        south.html("L 方向加强筋间距 Lc 不能大于 " + BAAAL + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baaa2d(BAAATHKDN, BAAAL, BAAALC);
                                                        baaaSketch.off("resize").on("resize", function () {
                                                            if ($("#baaa").length > 0) {
                                                                baaa2d(BAAATHKDN, BAAAL, BAAALC);
                                                            }
                                                        });
                                                    }
                                                    baaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baaa2d(BAAATHKDN, BAAAL, BAAALC);
                                                                baaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#baaa").length > 0) {
                                                                        baaa2d(BAAATHKDN, BAAAL, BAAALC);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // W
                                                    let BAAAW;
                                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                        BAAAW = parseFloat(rows[14][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW);
                                                        baaaSketch.off("resize").on("resize", function () {
                                                            if ($("#baaa").length > 0) {
                                                                baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW);
                                                            }
                                                        });
                                                    }
                                                    baaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW);
                                                                baaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#baaa").length > 0) {
                                                                        baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // WC
                                                    let BAAAWC;
                                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                        && parseFloat(rows[15][columns[0][1].field]) >= 0.1 * BAAALC
                                                        && parseFloat(rows[15][columns[0][1].field]) <= Math.min(5 * BAAALC, BAAAW)) {
                                                        BAAAWC = parseFloat(rows[15][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                        && parseFloat(rows[15][columns[0][1].field]) < 0.1 * BAAALC) {
                                                        south.html("加强筋间距 Wc 不能小于 " + 0.1 * BAAALC + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                        && parseFloat(rows[15][columns[0][1].field]) > Math.min(5 * BAAALC, BAAAW)) {
                                                        south.html("加强筋间距 Wc 不能大于 " + Math.min(5 * BAAALC, BAAAW) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW, BAAAWC);
                                                        baaaSketch.off("resize").on("resize", function () {
                                                            if ($("#baaa").length > 0) {
                                                                baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW, BAAAWC);
                                                            }
                                                        });
                                                    }
                                                    baaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW, BAAAWC);
                                                                baaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#baaa").length > 0) {
                                                                        baaa2d(BAAATHKDN, BAAAL, BAAALC, BAAAW, BAAAWC);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 过程参数
                                                    let BAAADM = BAAADD / 1000000000;
                                                    let BAAAG = 9.81;
                                                    let BAAAPA = 1.2 / 1000;
                                                    let BAAACD = BAAACD1 + BAAACD2;
                                                    let BAAATHKDE = BAAATHKDN - BAAACD;
                                                    let BAAAWCLC = BAAAWC / BAAALC;

                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "nbt_47003_1_2009_table_8_15_get_alpha_and_beta.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "ba": BAAAWCLC
                                                        }),
                                                        beforeSend: function () {
                                                            south.html("<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>" +
                                                                "<span style='color:#18bc9c;'>&ensp;正在查表 8-15 获取 α、β</span>");
                                                        },
                                                        success: function (result) {

                                                            let BAAAALPHA = parseFloat(result.alpha);
                                                            let BAAABETA = parseFloat(result.beta);

                                                            // 厚度
                                                            let BAAATHKDC = (3 * BAAALC * BAAALC * BAAAALPHA * BAAADM * BAAAG
                                                                + BAAALC * Math.sqrt(3 * BAAAALPHA * (3 * BAAALC * BAAADM * BAAALC * BAAADM * BAAAALPHA * BAAAG * BAAAG + 2 * BAAAPA * BAAAODT)))
                                                                / BAAAODT;

                                                            let BAAATHKDD = BAAATHKDC + BAAACD2;
                                                            south.html(
                                                                "<span style='color:#444444;'>" +
                                                                "顶板所需厚度：" + (BAAATHKDD + BAAACD1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            let BAAATHKDCHK;
                                                            if (BAAATHKDN >= (BAAATHKDD + BAAACD1)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + BAAATHKDN + " mm" +
                                                                    "</span>");
                                                                BAAATHKDCHK = "合格";
                                                            }
                                                            else if (BAAATHKDN < (BAAATHKDD + BAAACD1)) {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + BAAATHKDN + " mm" +
                                                                    "</span>");
                                                                BAAATHKDCHK = "不合格";
                                                            }

                                                            // 挠度
                                                            let BAAAFALLOW = 5 * (BAAATHKDE / 2 + Math.sqrt(BAAAWCLC) * BAAALC / 500);
                                                            let BAAAFTMAX = BAAABETA * Math.pow(BAAALC, 4) * (BAAADM * BAAAG * BAAATHKDE + BAAAPA) / (BAAAEDT * Math.pow(BAAATHKDE, 3));

                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "顶板许用挠度：" + BAAAFALLOW.toFixed(2) + " mm" +
                                                                "</span>");
                                                            let BAAAFTMAXCHK;
                                                            if (BAAAFTMAX <= BAAAFALLOW) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "实际挠度：" + BAAAFTMAX.toFixed(2) + " mm" +
                                                                    "</span>");
                                                                BAAAFTMAXCHK = "合格";
                                                            }
                                                            else if (BAAAFTMAX > BAAAFALLOW) {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "实际挠度：" + BAAAFTMAX.toFixed(2) + " mm" +
                                                                    "</span>");
                                                                BAAAFTMAXCHK = "不合格";
                                                            }

                                                            // 加强筋
                                                            let BAAAZTW = (BAAADM * BAAAG * BAAATHKDE + BAAAPA) * BAAALC * BAAAW * BAAAW / (9.4 * BAAAOBT)
                                                                - BAAALC * BAAATHKDE * BAAATHKDE / 6;
                                                            let BAAAZTL = (BAAADM * BAAAG * BAAATHKDE + BAAAPA) * BAAAWC * BAAAL * BAAAL / (9.4 * BAAAOBT)
                                                                - BAAAWC * BAAATHKDE * BAAATHKDE / 6;
                                                            let BAAAZT = Math.max(BAAAZTL, BAAAZTW);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "加强筋所需最小截面系数：" + BAAAZT.toFixed(2) + " mm³" +
                                                                "</span>");

                                                            // docx
                                                            let BAAAPayJS = $('#payjs');

                                                            function getDocx() {
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "baaadocx.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        ribbonName: "BAAA",

                                                                        t: BAAADT,
                                                                        dstd: BAAADSTDVal,
                                                                        dname: BAAADNameVal,
                                                                        cd2: BAAACD2,
                                                                        thkdn: BAAATHKDN,
                                                                        bstd: BAAABSTDVal,
                                                                        bname: BAAABNameVal,
                                                                        thkbn: BAAATHKBN,
                                                                        l: BAAAL,
                                                                        w: BAAAW,
                                                                        lc: BAAALC,
                                                                        wc: BAAAWC,
                                                                        dd: BAAADD.toFixed(4),
                                                                        cd1: BAAACD1.toFixed(4),
                                                                        odt: BAAAODT.toFixed(4),
                                                                        edt: (BAAAEDT / 1000).toFixed(4),
                                                                        obt: BAAAOBT.toFixed(4),
                                                                        dm: (BAAADM * 1000000).toFixed(4),
                                                                        g: BAAAG.toFixed(4),
                                                                        pa: BAAAPA.toFixed(4),
                                                                        cd: BAAACD.toFixed(4),
                                                                        thkde: BAAATHKDE.toFixed(4),
                                                                        wl: BAAAWCLC.toFixed(4),
                                                                        alpha: BAAAALPHA.toFixed(8),
                                                                        beta: BAAABETA.toFixed(8),
                                                                        thkdc: BAAATHKDC.toFixed(4),
                                                                        thkdd: BAAATHKDD.toFixed(4),
                                                                        thkdchk: BAAATHKDCHK,
                                                                        fallow: BAAAFALLOW.toFixed(4),
                                                                        ftmax: BAAAFTMAX.toFixed(4),
                                                                        ftmaxchk: BAAAFTMAXCHK,
                                                                        ztl: BAAAZTL.toFixed(4),
                                                                        ztw: BAAAZTW.toFixed(4),
                                                                        zt: BAAAZT.toFixed(4)
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
                                                                            BAAAPayJS.dialog({
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
                                                                                        BAAAPayJS.dialog("close");
                                                                                        BAAAPayJS.dialog("clear");
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
                                                                                                    BAAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                            BAAAPayJS.dialog('close');
                                                                                                            BAAAPayJS.dialog('clear');
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
                                                                "<span style='color:red;'>&ensp;查表 8-15 获取 α、β失败，请检查网络后重试</span>");
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