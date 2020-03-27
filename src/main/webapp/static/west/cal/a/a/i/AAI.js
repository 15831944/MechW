$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aaiSketch = $("#d2");
    let aaiModel = $("#d3");
    let aaid2d3 = $('#d2d3');

    $("#cal").html("<table id='aai'></table>");
    let pg = $("#aai");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/i/AAI.json", function (result) {

        let AAIDT,
            AAICategory, AAICategoryVal, AAIType, AAITypeVal, AAISTD, AAISTDVal, AAIName, AAINameVal,
            columns, rows, ed;

        function aai2d(dw = "Dw", thkn = "δn", r = "R") {

            aaiSketch.empty();

            let width = aaiSketch.width();
            let height = aaiSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAISVG").attr("height", height);

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
            let wg = (width - 2 * padding) / 8;
            let hg = (height - 2 * padding) / 8;

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

            // 直管
            drawLine(padding + 1.25 * wg, padding, padding + 1.25 * wg, height - padding);
            drawLine(padding + 1.25 * wg + thk, padding, padding + 1.25 * wg + thk, height - padding);
            drawLine(padding + 2.75 * wg, padding, padding + 2.75 * wg, height - padding);
            drawLine(padding + 2.75 * wg - thk, padding, padding + 2.75 * wg - thk, height - padding);
            drawLine(padding + 1.25 * wg, padding, padding + 2.75 * wg, padding);
            drawLine(padding + 1.25 * wg, height - padding, padding + 2.75 * wg, height - padding);
            drawCenterLine(padding + 2 * wg, padding - 20, padding + 2 * wg, padding + 6 * hg + 10);
            drawCenterLine(padding + 2 * wg, padding + 6 * hg + 35, padding + 2 * wg, height - padding + 20);

            // 箭头
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 4.5 * wg, y: height / 2},
                    {x: padding + 4.5 * wg - 15, y: height / 2 + 3},
                    {x: padding + 4.5 * wg - 15, y: height / 2 - 3},
                    {x: padding + 4.5 * wg, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3.5 * wg, y: height / 2},
                {x: padding + 4.5 * wg - 15, y: height / 2}
            ])).attr("id", "AAISketchArrow").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAISketchArrow")
                .attr("startOffset", "50%").text("弯制");

            // 弯管
            let cx = padding + 5 * wg;
            let cy = padding + 6 * hg;
            let cr = Math.min(1.6 * wg, 1.5 * hg);

            svg.append("path").attr("d", "M "
                + (cx) + " " + (cy - cr) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 1" + " "
                + (cx + cr) + " " + (cy)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx) + " " + (cy - cr - thk) + " "
                + "A" + (cr + thk) + " " + (cr + thk) + " "
                + "1 0 1" + " "
                + (cx + cr + thk) + " " + (cy)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx) + " " + (cy - 2 * cr) + " "
                + "A" + 2 * cr + " " + 2 * cr + " "
                + "1 0 1" + " "
                + (cx + 2 * cr) + " " + (cy)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx) + " " + (cy - 2 * cr + thk) + " "
                + "A" + (2 * cr - thk) + " " + (2 * cr - thk) + " "
                + "1 0 1" + " "
                + (cx + 2 * cr - thk) + " " + (cy)
            ).classed("sketch", true);
            drawLine(cx, cy - 2 * cr, cx, cy - cr);
            drawLine(cx + cr, cy, cx + 2 * cr, cy);
            svg.append("path").attr("d", "M "
                + (cx) + " " + (cy - 1.5 * cr) + " "
                + "A" + (1.5 * cr) + " " + (1.5 * cr) + " "
                + "1 0 1" + " "
                + (cx + 1.5 * cr) + " " + (cy)
            ).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);
            drawCenterLine(cx - 20, cy - 1.5 * cr, cx, cy - 1.5 * cr);
            drawCenterLine(cx + 1.5 * cr, cy, cx + 1.5 * cr, cy + 20);

            // dw
            dimBottomH(padding + 1.25 * wg, padding + 6 * hg, padding + 2.75 * wg, padding + 6 * hg, dw, "AAISketchDW");

            // thkn
            drawLine(padding + 1.25 * wg, height / 2, padding + 1.25 * wg + thk + 15 + 10, height / 2);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.25 * wg + thk, y: height / 2},
                    {x: padding + 1.25 * wg + thk + 15, y: height / 2 + 3},
                    {x: padding + 1.25 * wg + thk + 15, y: height / 2 - 3},
                    {x: padding + 1.25 * wg + thk, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.25 * wg, y: height / 2},
                    {x: padding + 1.25 * wg - 15, y: height / 2 + 3},
                    {x: padding + 1.25 * wg - 15, y: height / 2 - 3},
                    {x: padding + 1.25 * wg, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.25 * wg - 15 - 40, y: height / 2},
                {x: padding + 1.25 * wg - 15, y: height / 2}
            ])).attr("id", "AAISketchTHKN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAISketchTHKN")
                .attr("startOffset", "50%").text(thkn);

            // R
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + 1.5 * cr, y: cy},
                    {x: cx + 1.5 * cr - 15, y: cy - 3},
                    {x: cx + 1.5 * cr - 15, y: cy + 3},
                    {x: cx + 1.5 * cr, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx, y: cy},
                    {x: cx + 2 * cr + 30, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + 0.707 * (2 * cr + 30), y: cy - 0.707 * (2 * cr + 30)},
                    {x: cx + 0.707 * (2 * cr + 30) + 40, y: cy - 0.707 * (2 * cr + 30)}
                ])).classed("sketch", true).attr("id", "AAISketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAISketchR")
                .attr("startOffset", "50%").text(r);


        }

        currentTabIndex = aaid2d3.tabs('getTabIndex', aaid2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            aai2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aai").length > 0) {
                    aai2d();
                }
            });
        }
        aaid2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aai2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aai").length > 0) {
                            aai2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 内压弯头强度校核",
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

                if (index === 6) {
                    $(ed.target).combobox("loadData", AAICategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAIType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAISTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AAIName);
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

                    // docx button
                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    aaiSketch.empty();
                    aaiModel.empty();

                    // sketch
                    currentTabIndex = aaid2d3.tabs('getTabIndex', aaid2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        aai2d();
                        aaiSketch.off("resize").on("resize", function () {
                            if ($("#aai").length > 0) {
                                aai2d();
                            }
                        });
                    }
                    aaid2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aai2d();
                                aaiSketch.off("resize").on("resize", function () {
                                    if ($("#aai").length > 0) {
                                        aai2d();
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

                        AAIDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAICategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAIType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAISTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAIName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAICategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAIDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAICategory[index] = {
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
                    else if (index === 6) {

                        AAICategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAIType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAISTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAIName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAICategoryVal,
                                temp: AAIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAIType = [];
                                $(result).each(function (index, element) {
                                    AAIType[index] = {
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
                    else if (index === 7) {

                        AAITypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAISTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAIName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAICategoryVal,
                                type: AAITypeVal,
                                temp: AAIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAISTD = [];
                                $(result).each(function (index, element) {
                                    AAISTD[index] = {
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
                    else if (index === 8) {

                        AAISTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAIName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAICategoryVal,
                                type: AAITypeVal,
                                std: AAISTDVal,
                                temp: AAIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAIName = [];
                                $(result).each(function (index, element) {
                                    AAIName[index] = {
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

                    // name 及业务逻辑
                    else {

                        // 设计压力
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            let AAIPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let AAIPS = parseFloat(rows[2][columns[0][1].field]);

                                // 腐蚀裕量
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let AAIC2 = parseFloat(rows[3][columns[0][1].field]);

                                    // 焊接接头系数
                                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                                        let AAIE = parseFloat(rows[4][columns[0][1].field]);

                                        // 试验类型
                                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                            let AAITest = rows[5][columns[0][1].field];

                                            // 材料名称
                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                AAINameVal = rows[9][columns[0][1].field];

                                                // AJAX 获取材料密度、最大最小厚度
                                                let AAIDensity, AAIThkMin, AAIThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAICategoryVal,
                                                        "type": AAITypeVal,
                                                        "std": AAISTDVal,
                                                        "name": AAINameVal,
                                                        "temp": AAIDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAIDensity = parseFloat(result.density);
                                                        AAIThkMin = parseFloat(result.thkMin);
                                                        AAIThkMax = parseFloat(result.thkMax);

                                                        // DW
                                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                            let AAIDW = parseFloat(rows[10][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                aai2d("ϕ" + AAIDW);
                                                                aaiSketch.off("resize").on("resize", function () {
                                                                    if ($("#aai").length > 0) {
                                                                        aai2d("ϕ" + AAIDW);
                                                                    }
                                                                });
                                                            }
                                                            aaid2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        aai2d("ϕ" + AAIDW);
                                                                        aaiSketch.off("resize").on("resize", function () {
                                                                            if ($("#aai").length > 0) {
                                                                                aai2d("ϕ" + AAIDW);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 筒体名义厚度
                                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) > Math.max(AAIC2, AAIThkMin)
                                                                && parseFloat(rows[11][columns[0][1].field]) <= Math.min(AAIThkMax, AAIDW / 2)) {
                                                                let AAITHKN = parseFloat(rows[11][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    aai2d("ϕ" + AAIDW, AAITHKN);
                                                                    aaiSketch.off("resize").on("resize", function () {
                                                                        if ($("#aai").length > 0) {
                                                                            aai2d("ϕ" + AAIDW, AAITHKN);
                                                                        }
                                                                    });
                                                                }
                                                                aaid2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            aai2d("ϕ" + AAIDW, AAITHKN);
                                                                            aaiSketch.off("resize").on("resize", function () {
                                                                                if ($("#aai").length > 0) {
                                                                                    aai2d("ϕ" + AAIDW, AAITHKN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // ajax 获取 设计应力、常温应力、标记应力、常温屈服强度、厚度负偏差
                                                                let AAIOT, AAIO, AAIOT1, AAIRel, AAIC1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": AAICategoryVal,
                                                                        "type": AAITypeVal,
                                                                        "std": AAISTDVal,
                                                                        "name": AAINameVal,
                                                                        "thk": AAITHKN,
                                                                        "temp": AAIDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": AAIDW
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        // 设计应力
                                                                        AAIOT = parseFloat(result.ot);
                                                                        if (AAIOT < 0) {
                                                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 常温应力
                                                                        AAIO = parseFloat(result.o);
                                                                        if (AAIO < 0) {
                                                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 常温屈服强度
                                                                        AAIRel = parseFloat(result.rel);
                                                                        if (AAIRel < 0) {
                                                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 厚度负偏差
                                                                        AAIC1 = parseFloat(result.c1);
                                                                        if (AAIC1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 标记应力
                                                                        AAIOT1 = parseFloat(result.ot1);

                                                                        // R
                                                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) > AAIDW / 2) {
                                                                            let AAIR = parseFloat(rows[12][columns[0][1].field]);

                                                                            // Sketch
                                                                            if (currentTabIndex === 0) {
                                                                                aai2d("ϕ" + AAIDW, AAITHKN, "R" + AAIR);
                                                                                aaiSketch.off("resize").on("resize", function () {
                                                                                    if ($("#aai").length > 0) {
                                                                                        aai2d("ϕ" + AAIDW, AAITHKN, "R" + AAIR);
                                                                                    }
                                                                                });
                                                                            }
                                                                            aaid2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        aai2d("ϕ" + AAIDW, AAITHKN, "R" + AAIR);
                                                                                        aaiSketch.off("resize").on("resize", function () {
                                                                                            if ($("#aai").length > 0) {
                                                                                                aai2d("ϕ" + AAIDW, AAITHKN, "R" + AAIR);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });

                                                                            let AAIPC = AAIPD + AAIPS;
                                                                            let AAIM = 100 * AAIC1 / AAITHKN;
                                                                            let AAIN = AAIR / AAIDW;
                                                                            let AAIA1;
                                                                            if (AAIN < 1.8) {
                                                                                AAIA1 = ((50 / (AAIN * (4 * AAIN + 1))) + AAIM) / (100 - AAIM);
                                                                            }
                                                                            else if (AAIN >= 1.8 && AAIN <= 3.5) {
                                                                                if (AAIM === 0) {
                                                                                    AAIA1 = 0.03;
                                                                                } else if (AAIM > 0 && AAIM < 5) {
                                                                                    AAIA1 = 0.03 + (0.06 - 0.03) * (AAIM) / (5);
                                                                                } else if (AAIM === 5) {
                                                                                    AAIA1 = 0.06;
                                                                                } else if (AAIM > 5 && AAIM < 10) {
                                                                                    AAIA1 = 0.06 + (0.15 - 0.06) * (AAIM - 5) / (10 - 5);
                                                                                } else if (AAIM === 10) {
                                                                                    AAIA1 = 0.15;
                                                                                } else if (AAIM > 10 && AAIM < 15) {
                                                                                    AAIA1 = 0.15 + (0.22 - 0.15) * (AAIM - 10) / (15 - 10);
                                                                                } else if (AAIM === 15) {
                                                                                    AAIA1 = 0.22;
                                                                                } else {
                                                                                    AAIA1 = -1;
                                                                                }
                                                                            }
                                                                            else if (AAIN > 3.5) {
                                                                                AAIA1 = AAIM / (100 - AAIM);
                                                                            }

                                                                            let AAIC = AAIA1 * AAITHKN + AAIC2;

                                                                            let AAITHK0 = AAIPC * AAIDW / (2 * AAIOT * AAIE + AAIPC);
                                                                            let AAITHK = AAITHK0 + AAIC;
                                                                            south.html(
                                                                                "<span style='color:#444444;'>" +
                                                                                "直管所需厚度：" + AAITHK.toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            let AAITHKCHK;
                                                                            if (AAITHK <= AAITHKN) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAITHKN + " mm" +
                                                                                    "</span>");
                                                                                AAITHKCHK = "合格";
                                                                            } else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAITHKN + " mm" +
                                                                                    "</span>");
                                                                                AAITHKCHK = "不合格";
                                                                            }

                                                                            let AAIPMAWP = (2 * AAIOT * AAIE * (AAITHKN - AAIC)) / (AAIDW - (AAITHKN - AAIC));
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "MAWP：" + AAIPMAWP.toFixed(4) + " MPa" +
                                                                                "</span>");

                                                                            // 压力试验
                                                                            let AAIPT;
                                                                            if (AAITest === "液压试验") {
                                                                                AAIPT = 1.25 * AAIPD * AAIO / Math.max(AAIOT, AAIOT1);
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试压类型：液压" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试验压力：" + AAIPT.toFixed(4) + " MPa" +
                                                                                    "</span>");
                                                                            }
                                                                            else if (AAITest === "气压试验") {
                                                                                AAIPT = 1.1 * AAIPD * AAIO / Math.max(AAIOT, AAIOT1);
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试压类型：气压" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试验压力：" + AAIPT.toFixed(4) + " MPa" +
                                                                                    "</span>");
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // docx
                                                                            let AAIPayJS = $('#payjs');

                                                                            function getDocx() {
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "aaidocx.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        ribbonName: "AAI",

                                                                                        pd: AAIPD,
                                                                                        t: AAIDT,
                                                                                        ps: AAIPS,
                                                                                        std: AAISTDVal,
                                                                                        name: AAINameVal,
                                                                                        dw: AAIDW,
                                                                                        r: AAIR,
                                                                                        thkn: AAITHKN,
                                                                                        c2: AAIC2,
                                                                                        e: AAIE,
                                                                                        test: AAITest,
                                                                                        density: AAIDensity.toFixed(4),
                                                                                        rel: AAIRel.toFixed(4),
                                                                                        c1: AAIC1.toFixed(4),
                                                                                        ot: AAIOT.toFixed(4),
                                                                                        o: AAIO.toFixed(4),
                                                                                        ot1: AAIOT1.toFixed(4),
                                                                                        pc: AAIPC.toFixed(4),
                                                                                        m: AAIM.toFixed(4),
                                                                                        n: AAIN.toFixed(4),
                                                                                        a1: AAIA1.toFixed(4),
                                                                                        c: AAIC.toFixed(4),
                                                                                        thk0: AAITHK0.toFixed(4),
                                                                                        thk: AAITHK.toFixed(4),
                                                                                        thkchk: AAITHKCHK,
                                                                                        pmawp: AAIPMAWP.toFixed(4),
                                                                                        pt: AAIPT.toFixed(4)
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
                                                                                            AAIPayJS.dialog({
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
                                                                                                        AAIPayJS.dialog("close");
                                                                                                        AAIPayJS.dialog("clear");
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
                                                                                                                    AAIPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                            AAIPayJS.dialog('close');
                                                                                                                            AAIPayJS.dialog('clear');
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
                                                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) <= AAIDW / 2) {
                                                                            south.html("弯头中心线曲率半径 R 不能小于等于 " + AAIDW / 2 + " mm").css("color", "red");
                                                                        }
                                                                    },
                                                                    error: function () {
                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                    }
                                                                });
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) <= Math.max(AAIC2, AAIThkMin)) {
                                                                south.html("直管名义厚度 δn 不能小于等于 " + Math.max(AAIC2, AAIThkMin) + " mm").css("color", "red");
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) > Math.min(AAIThkMax, AAIDW / 2)) {
                                                                south.html("直管名义厚度 δn 不能大于 " + Math.min(AAIThkMax, AAIDW / 2) + " mm").css("color", "red");
                                                            }
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
                                }
                            }
                        }
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});