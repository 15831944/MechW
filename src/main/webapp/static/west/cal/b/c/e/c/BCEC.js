$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcecSketch = $("#d2");
    let bcecModel = $("#d3");
    let bcecd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcec'></table>");
    let pg = $("#bcec");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/e/c/BCEC.json", function (result) {

        let BCECDT;
        let BCECCCategory, BCECCCategoryVal, BCECCType, BCECCTypeVal, BCECCSTD, BCECCSTDVal, BCECCName, BCECCNameVal,
            BCECSCategory, BCECSCategoryVal, BCECSType, BCECSTypeVal, BCECSSTD, BCECSSTDVal, BCECSName, BCECSNameVal;
        let columns, rows, ed;

        function bcec2d(dsi = "ΦDsi", alpha = "α", thkcn = "δcn", thksn = "δsn") {

            bcecSketch.empty();

            let width = bcecSketch.width();
            let height = bcecSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCECSVG").attr("height", height);

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
            function dimBottomH(startX, startY, endX, endY, text) {

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
                ])).attr("id", "BCEBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCEBSketchDI").attr("startOffset", "50%").text(text);

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

            // sketch
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding - thk},
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + wg, y: padding + 1.5 * hg - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding},
                {x: padding + 3 * wg, y: padding},
                {x: padding + wg, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding + 4 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg},
                {x: padding + wg, y: padding + 2.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding + 4 * hg + thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk},
                {x: padding + wg, y: padding + 2.5 * hg + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding - thk},
                {x: padding + 4 * wg, y: padding + 4 * hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 1.5 * hg - thk - 10},
                {x: padding + wg, y: padding + 2.5 * hg + thk + 10}
            ])).classed("sketch", true).attr("stroke-dasharray", "25,5,5,5");

            drawCenterLine(padding + wg - 10, height / 2, padding + 4 * wg + 10, height / 2);

            // dsi
            dimRightV(padding + 4 * wg, padding + 4 * hg, padding + 4 * wg, padding, dsi, "BCECSketchDSI");

            // thksn
            extLineRightH(padding + 4 * wg, padding - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 4 * wg + 30, y: padding - thk},
                    {x: padding + 4 * wg + 27, y: padding - thk - 15},
                    {x: padding + 4 * wg + 33, y: padding - thk - 15},
                    {x: padding + 4 * wg + 30, y: padding - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg + 30, y: padding - thk},
                {x: padding + 4 * wg + 30, y: padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg + 30, y: padding - thk - 15},
                {x: padding + 4 * wg + 30, y: padding - thk - 15 - 40}
            ])).attr("id", "BCECSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCECSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // thkcn
            let rad = Math.atan(1.5 * hg / (2 * wg));
            let ang = rad / Math.PI * 180;
            let centerX = padding + 3 * wg - 2 * hg / Math.tan(rad);
            let centerY = height / 2;
            svg.append("path").attr("d", line([
                {x: width / 2, y: centerY + thk + 15 + 40},
                {x: width / 2, y: centerY + thk + 15}
            ])).attr("id", "BCECSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCECSketchTHKCN").attr("startOffset", "50%").text(thkcn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY - 15},
                    {x: width / 2 + 3, y: centerY - 15},
                    {x: width / 2, y: centerY}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY - 15 - 15},
                    {x: width / 2, y: centerY - 15}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2, y: centerY + thk}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY + thk},
                    {x: width / 2 - 3, y: centerY + thk + 15},
                    {x: width / 2 + 3, y: centerY + thk + 15},
                    {x: width / 2, y: centerY + thk}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");

            // alpha
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY - 15},
                    {x: width / 2 + 3, y: centerY - 15},
                    {x: width / 2, y: centerY}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY + 15},
                    {x: width / 2 + 3, y: centerY + 15},
                    {x: width / 2, y: centerY}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            let adimradius = width / 2 - centerX;
            svg.append("path").attr("d", "M "
                + (centerX + adimradius * Math.cos(rad)) + " " + (centerY - adimradius * Math.sin(rad)) + " "
                + "A" + adimradius + " " + adimradius + " "
                + "1 0 1" + " "
                + (width / 2) + " " + (centerY)
            ).classed("sketch", true).attr("id", "BCECSketchALPHA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCECSketchALPHA").attr("startOffset", "50%").text(alpha);
        }

        currentTabIndex = bcecd2d3.tabs('getTabIndex', bcecd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcec2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcec").length > 0) {
                    bcec2d();
                }
            });
        }
        bcecd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcec2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcec").length > 0) {
                            bcec2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 锥壳大端内压强度校核",
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
                    $(ed.target).combobox("loadData", BCECCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCECCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCECCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCECCName);
                }

                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCECSCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCECSType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCECSSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BCECSName);
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
                    bcecSketch.empty();

                    // model
                    bcecModel.empty();

                    // sketch
                    currentTabIndex = bcecd2d3.tabs('getTabIndex', bcecd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcec2d();
                        bcecSketch.off("resize").on("resize", function () {
                            if ($("#bcec").length > 0) {
                                bcec2d();
                            }
                        });
                    }
                    bcecd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcec2d();
                                bcecSketch.off("resize").on("resize", function () {
                                    if ($("#bcec").length > 0) {
                                        bcec2d();
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

                        BCECDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCECCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCECCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCECCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCECCName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCECSCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCECSType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCECSSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCECSName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCECCCategory = [];
                                BCECSCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCECDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCECCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCECSCategory[index] = {
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

                        BCECCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCECCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCECCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCECCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCECCCategoryVal,
                                temp: BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCECCType = [];
                                $(result).each(function (index, element) {
                                    BCECCType[index] = {
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

                        BCECCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCECCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCECCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCECCCategoryVal,
                                type: BCECCTypeVal,
                                temp: BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCECCSTD = [];
                                $(result).each(function (index, element) {
                                    BCECCSTD[index] = {
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

                        BCECCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCECCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCECCCategoryVal,
                                type: BCECCTypeVal,
                                std: BCECCSTDVal,
                                temp: BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCECCName = [];
                                $(result).each(function (index, element) {
                                    BCECCName[index] = {
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
                    else if (index === 13) {

                        BCECSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCECSType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCECSSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCECSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCECSCategoryVal,
                                temp: BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCECSType = [];
                                $(result).each(function (index, element) {
                                    BCECSType[index] = {
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
                    else if (index === 14) {

                        BCECSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCECSSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCECSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCECSCategoryVal,
                                type: BCECSTypeVal,
                                temp: BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCECSSTD = [];
                                $(result).each(function (index, element) {
                                    BCECSSTD[index] = {
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
                    else if (index === 15) {

                        BCECSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCECSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCECSCategoryVal,
                                type: BCECSTypeVal,
                                std: BCECSSTDVal,
                                temp: BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCECSName = [];
                                $(result).each(function (index, element) {
                                    BCECSName[index] = {
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

                        // 设计压力
                        let BCECPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCECPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BCECPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCECPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCECTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCECTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 封头材料
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCECCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取材料密度、最大最小厚度
                        let BCECDC, BCECCThkMin, BCECCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BCECCCategoryVal,
                                "type": BCECCTypeVal,
                                "std": BCECCSTDVal,
                                "name": BCECCNameVal,
                                "temp": BCECDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BCECDC = parseFloat(result.density);
                                BCECCThkMin = parseFloat(result.thkMin);
                                BCECCThkMax = parseFloat(result.thkMax);

                                // DSI
                                let BCECDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    BCECDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcec2d("Φ" + BCECDSI);
                                    bcecSketch.off("resize").on("resize", function () {
                                        if ($("#bcec").length > 0) {
                                            bcec2d("Φ" + BCECDSI);
                                        }
                                    });
                                }
                                bcecd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcec2d("Φ" + BCECDSI);
                                            bcecSketch.off("resize").on("resize", function () {
                                                if ($("#bcec").length > 0) {
                                                    bcec2d("Φ" + BCECDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // α
                                let BCECALPHA;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BCECALPHA = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcec2d("Φ" + BCECDSI, BCECALPHA + "°");
                                    bcecSketch.off("resize").on("resize", function () {
                                        if ($("#bcec").length > 0) {
                                            bcec2d("Φ" + BCECDSI, BCECALPHA + "°");
                                        }
                                    });
                                }
                                bcecd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcec2d("Φ" + BCECDSI, BCECALPHA + "°");
                                            bcecSketch.off("resize").on("resize", function () {
                                                if ($("#bcec").length > 0) {
                                                    bcec2d("Φ" + BCECDSI, BCECALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCECTHKCN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BCECCThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= BCECCThkMax) {
                                    BCECTHKCN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= BCECCThkMin) {
                                    south.html("锥壳材料厚度不能小于等于 " + BCECCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BCECCThkMax) {
                                    south.html("锥壳材料厚度不能大于 " + BCECCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN);
                                    bcecSketch.off("resize").on("resize", function () {
                                        if ($("#bcec").length > 0) {
                                            bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN);
                                        }
                                    });
                                }
                                bcecd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN);
                                            bcecSketch.off("resize").on("resize", function () {
                                                if ($("#bcec").length > 0) {
                                                    bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCECOCT, BCECOC, BCECRCEL, BCECCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BCECCCategoryVal,
                                        "type": BCECCTypeVal,
                                        "std": BCECCSTDVal,
                                        "name": BCECCNameVal,
                                        "thk": BCECTHKCN,
                                        "temp": BCECDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BCECDSI + 2 * BCECTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BCECOCT = parseFloat(result.ot);
                                        if (BCECOCT < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCECOC = parseFloat(result.o);
                                        if (BCECOC < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCECRCEL = parseFloat(result.rel);
                                        if (BCECRCEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BCECCC1 = parseFloat(result.c1);
                                        if (BCECCC1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // 腐蚀裕量
                                        let BCECCC2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < BCECTHKCN) {
                                            BCECCC2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= BCECTHKCN) {
                                            south.html("锥壳腐蚀裕量不能大于等于 " + BCECTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 焊接接头系数
                                        let BCECEC;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            BCECEC = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 大端筒体材料
                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                            BCECSNameVal = rows[16][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取材料密度、最大最小厚度
                                        let BCECDS, BCECSThkMin, BCECSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCECSCategoryVal,
                                                "type": BCECSTypeVal,
                                                "std": BCECSSTDVal,
                                                "name": BCECSNameVal,
                                                "temp": BCECDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCECDS = parseFloat(result.density);
                                                BCECSThkMin = parseFloat(result.thkMin);
                                                BCECSThkMax = parseFloat(result.thkMax);

                                                let BCECTHKSN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCECSThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCECSThkMax) {
                                                    BCECTHKSN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCECSThkMin) {
                                                    south.html("大端筒体材料厚度不能小于等于 " + BCECSThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCECSThkMax) {
                                                    south.html("大端筒体材料厚度不能大于 " + BCECSThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN, BCECTHKSN);
                                                    bcecSketch.off("resize").on("resize", function () {
                                                        if ($("#bcec").length > 0) {
                                                            bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN, BCECTHKSN);
                                                        }
                                                    });
                                                }
                                                bcecd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN, BCECTHKSN);
                                                            bcecSketch.off("resize").on("resize", function () {
                                                                if ($("#bcec").length > 0) {
                                                                    bcec2d("Φ" + BCECDSI, BCECALPHA + "°", BCECTHKCN, BCECTHKSN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BCECOST, BCECOS, BCECRSEL, BCECCS1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCECSCategoryVal,
                                                        "type": BCECSTypeVal,
                                                        "std": BCECSSTDVal,
                                                        "name": BCECSNameVal,
                                                        "thk": BCECTHKSN,
                                                        "temp": BCECDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BCECDSI + 2 * BCECTHKSN
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCECOST = parseFloat(result.ot);
                                                        if (BCECOST < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCECOS = parseFloat(result.o);
                                                        if (BCECOS < 0) {
                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCECRSEL = parseFloat(result.rel);
                                                        if (BCECRSEL < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCECCS1 = parseFloat(result.c1);
                                                        if (BCECCS1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // 腐蚀裕量
                                                        let BCECCS2;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) < BCECTHKSN) {
                                                            BCECCS2 = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) >= BCECTHKSN) {
                                                            south.html("大端筒体腐蚀裕量不能大于等于 " + BCECTHKSN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 焊接接头系数
                                                        let BCECES;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                            BCECES = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 过程参数
                                                        let BCECPC = BCECPD + BCECPS;
                                                        let BCECCC = BCECCC1 + BCECCC2;
                                                        let BCECTHKCE = BCECTHKCN - BCECCC;
                                                        let BCECWC = 0.6 * Math.sqrt(BCECDSI * BCECTHKCE / 2 / Math.cos(BCECALPHA / 180 * Math.PI));
                                                        let BCECT1 = BCECPC * BCECDSI / 4 / Math.cos(BCECALPHA / 180 * Math.PI);
                                                        let BCECT2 = BCECPC * BCECDSI / 2 / Math.cos(BCECALPHA / 180 * Math.PI);
                                                        let BCECCS = BCECCS1 + BCECCS2;
                                                        let BCECTHKSE = BCECTHKSN - BCECCS;
                                                        let BCECWS = 0.6 * Math.sqrt(BCECDSI * BCECTHKSE / 2);
                                                        let BCECT2S = BCECDSI * BCECPC / 2;

                                                        // 锥壳内压计算及校核
                                                        let BCECTHKCC = BCECPC * BCECDSI / (2 * BCECOCT * BCECEC) / Math.cos(BCECALPHA / 180 * Math.PI);
                                                        let BCECTHKCD = BCECTHKCC + BCECCC2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "大端锥壳内压所需厚度：" + (BCECTHKCD + BCECCC1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BCECTHKCCHK;
                                                        if (BCECTHKCN >= (BCECTHKCD + BCECCC1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCECTHKCN + " mm" +
                                                                "</span>");
                                                            BCECTHKCCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCECTHKCN + " mm" +
                                                                "</span>");
                                                            BCECTHKCCHK = "不合格";
                                                        }

                                                        // 大端筒体内压计算及校核
                                                        let BCECTHKSC = BCECPC * BCECDSI / (2 * BCECOST * BCECES);
                                                        let BCECTHKSD = BCECTHKSC + BCECCS2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "大端连接筒体内压所需厚度：" + (BCECTHKSD + BCECCS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BCECTHKSCHK;
                                                        if (BCECTHKSN >= (BCECTHKSD + BCECCS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCECTHKSN + " mm" +
                                                                "</span>");
                                                            BCECTHKSCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCECTHKSN + " mm" +
                                                                "</span>");
                                                            BCECTHKSCHK = "不合格";
                                                        }

                                                        // 连接处计算及校核
                                                        let BCECQ = BCECT2 * BCECWC + BCECT2S * BCECWS - 0.5 * BCECT2 * BCECDSI * Math.sin(BCECALPHA / 180 * Math.PI);
                                                        let BCECOCRT = -1;
                                                        if (BCECQ < 0) {
                                                            if (BCECDT <= 100) {
                                                                BCECOCRT = 103;
                                                            }
                                                            else if (BCECDT > 100 && BCECDT <= 200) {
                                                                BCECOCRT = 100;
                                                            }
                                                            else if (BCECDT > 200 && BCECDT <= 250) {
                                                                BCECOCRT = 95;
                                                            }
                                                            else if (BCECDT > 250 && BCECDT <= 350) {
                                                                BCECOCRT = 80;
                                                            }
                                                            else {
                                                                south.html("查表6-3超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }

                                                        let BCECA;
                                                        if (BCECQ < 0) {
                                                            BCECA = Math.abs(BCECQ) / BCECOCRT;
                                                        }
                                                        else {
                                                            BCECA = Math.abs(BCECQ) / Math.min(BCECOCT * BCECEC, BCECOST * BCECES);
                                                        }
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "大端连接处所需承压面积：" + BCECA.toFixed(4) + " mm²" +
                                                            "</span>");

                                                        let BCECAACT = BCECWC * BCECTHKCE + BCECWS * BCECTHKSE;
                                                        let BCECACHK, BCECAREQ = -1.0;
                                                        if (BCECAACT >= BCECA) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际承压面积：" + BCECAACT.toFixed(4) + " mm²" +
                                                                "</span>");
                                                            BCECACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际承压面积：" + BCECAACT.toFixed(4) + " mm²" +
                                                                "</span>");
                                                            BCECACHK = "不合格";
                                                            BCECAREQ = BCECA - BCECAACT;
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "连接处需要增加的承压面积：" + BCECAREQ.toFixed(4) + " mm²" +
                                                                "</span>");
                                                        }

                                                        let BCECWCSINALPHA = BCECWC * Math.sin(BCECALPHA / 180 * Math.PI);
                                                        let BCECDSI075 = 0.0075 * BCECDSI;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "锥壳最小径向投影宽度：" + BCECDSI075.toFixed(4) + " mm" +
                                                            "</span>");
                                                        let BCECWCSINALPHACHK;
                                                        if (BCECWCSINALPHA >= BCECDSI075) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际投影宽度：" + BCECWCSINALPHA.toFixed(4) + " mm" +
                                                                "</span>");
                                                            BCECWCSINALPHACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际投影宽度：" + BCECWCSINALPHA.toFixed(4) + " mm" +
                                                                "</span>");
                                                            BCECWCSINALPHACHK = "不合格";
                                                        }

                                                        // 压力试验
                                                        let BCECETA, BCECPCT, BCECPST, BCECPT;
                                                        if (BCECTest === "液压试验") {
                                                            BCECETA = 1.25;
                                                            BCECPCT = Math.max(BCECETA * BCECPD * BCECOC / BCECOCT, 0.05);
                                                            BCECPST = Math.max(BCECETA * BCECPD * BCECOS / BCECOST, 0.05);
                                                            BCECPT = Math.min(BCECPCT, BCECPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BCECPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BCECTest === "气压试验") {
                                                            BCECETA = 1.10;
                                                            BCECPCT = Math.max(BCECETA * BCECPD * BCECOC / BCECOCT, 0.05);
                                                            BCECPST = Math.max(BCECETA * BCECPD * BCECOS / BCECOST, 0.05);
                                                            BCECPT = Math.min(BCECPCT, BCECPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BCECPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }

                                                        // docx
                                                        let BCECPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bcecdocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BCEC",

                                                                    pd: BCECPD,
                                                                    t: BCECDT,
                                                                    ps: BCECPS,
                                                                    test: BCECTest,

                                                                    stdc: BCECCSTDVal,
                                                                    namec: BCECCNameVal,
                                                                    dsi: BCECDSI,
                                                                    alpha: BCECALPHA,
                                                                    thkcn: BCECTHKCN,
                                                                    cc2: BCECCC2,
                                                                    ec: BCECEC,

                                                                    stds: BCECSSTDVal,
                                                                    names: BCECSNameVal,
                                                                    thksn: BCECTHKSN,
                                                                    cs2: BCECCS2,
                                                                    es: BCECES,

                                                                    dc: BCECDC.toFixed(4),
                                                                    rcel: BCECRCEL.toFixed(4),
                                                                    cc1: BCECCC1.toFixed(4),
                                                                    oct: BCECOCT.toFixed(4),
                                                                    oc: BCECOC.toFixed(4),

                                                                    ds: BCECDS.toFixed(4),
                                                                    rsel: BCECRSEL.toFixed(4),
                                                                    cs1: BCECCS1.toFixed(4),
                                                                    ost: BCECOST.toFixed(4),
                                                                    os: BCECOS.toFixed(4),

                                                                    pc: BCECPC.toFixed(4),

                                                                    cc: BCECCC.toFixed(4),
                                                                    thkce: BCECTHKCE.toFixed(4),
                                                                    wc: BCECWC.toFixed(4),
                                                                    t1: BCECT1.toFixed(4),
                                                                    t2: BCECT2.toFixed(4),

                                                                    cs: BCECCS.toFixed(4),
                                                                    thkse: BCECTHKSE.toFixed(4),
                                                                    ws: BCECWS.toFixed(4),
                                                                    t2s: BCECT2S.toFixed(4),

                                                                    ocrt: BCECOCRT.toFixed(4),

                                                                    thkcc: BCECTHKCC.toFixed(4),
                                                                    thkcd: BCECTHKCD.toFixed(4),
                                                                    thkcchk: BCECTHKCCHK,

                                                                    thksc: BCECTHKSC.toFixed(4),
                                                                    thksd: BCECTHKSD.toFixed(4),
                                                                    thkschk: BCECTHKSCHK,

                                                                    q: BCECQ.toFixed(4),
                                                                    a: BCECA.toFixed(4),
                                                                    aact: BCECAACT.toFixed(4),
                                                                    achk: BCECACHK,

                                                                    areq: BCECAREQ.toFixed(4),
                                                                    wcsinalpha: BCECWCSINALPHA.toFixed(4),
                                                                    dsi075: BCECDSI075.toFixed(4),
                                                                    wcsinalphachk: BCECWCSINALPHACHK,

                                                                    eta: BCECETA.toFixed(4),
                                                                    pct: BCECPCT.toFixed(4),
                                                                    pst: BCECPST.toFixed(4),
                                                                    pt: BCECPT.toFixed(4)
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
                                                                        BCECPayJS.dialog({
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
                                                                                    BCECPayJS.dialog("close");
                                                                                    BCECPayJS.dialog("clear");
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
                                                                                                BCECPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BCECPayJS.dialog('close');
                                                                                                        BCECPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});