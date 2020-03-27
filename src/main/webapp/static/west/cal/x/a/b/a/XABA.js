$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xabaSketch = $("#d2");
    let xabaModel = $("#d3");
    let xabad2d3 = $('#d2d3');

    $("#cal").html("<table id='xaba'></table>");
    let pg = $("#xaba");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/x/a/b/a/XABA.json", function (result) {

        let XABADT,
            XABACategory, XABACategoryVal, XABAType, XABATypeVal, XABASTD, XABASTDVal, XABAName, XABANameVal,
            columns, rows, ed;

        function xaba2d(thkhn = "δhn", thkvn = "δvn", wn = "Wn", h = "H", l = "L") {

            xabaSketch.empty();
            let width = xabaSketch.width();
            let height = xabaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XABASVG").attr("height", height);
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

            let thk = 20;

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

            let hg = (height - 2 * padding) / 6;
            let wg = (width - 2 * padding) / 8;

            drawLine(padding + wg, padding + hg, width - padding - wg, padding + hg);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg},
                {x: padding + wg + thk, y: padding + hg + 1.732 * thk},
                {x: padding + wg - thk, y: padding + hg + 1.732 * thk},
                {x: padding + wg, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding - wg, y: padding + hg},
                {x: width - padding - wg + thk, y: padding + hg + 1.732 * thk},
                {x: width - padding - wg - thk, y: padding + hg + 1.732 * thk},
                {x: width - padding - wg, y: padding + hg}
            ])).classed("sketch", true);
            dimTopH(padding + wg, padding + hg, width - padding - wg, padding + hg, l, "XABASketchL");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: height - padding - thk},
                {x: width / 2 - thk / 2, y: height - padding - thk},
                {x: width / 2 - thk / 2, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: padding + 3 * hg + thk},
                {x: width / 2 + thk / 2, y: padding + 3 * hg + thk},
                {x: width / 2 + thk / 2, y: height - padding - thk},
                {x: width - padding - 3 * wg, y: height - padding - thk},
                {x: width - padding - 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: height - padding}
            ])).classed("sketch", true);
            drawCenterLine(width / 2, height - padding - 3 * hg - 15, width / 2, height - padding + 15);

            // WN
            dimBottomH(padding + 3 * wg, height - padding, width - padding - 3 * wg, height - padding, wn, "XABASketchWN1");
            dimTopH(padding + 3 * wg, height / 2, width - padding - 3 * wg, height / 2, wn, "XABASketchWN2");

            // H
            dimRightV(padding + 5 * wg, height - padding, padding + 5 * wg, height - padding - 3 * hg, h, "XABASketchH");

            // thkvn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + thk / 2, y: height / 2 + 1.5 * hg},
                    {x: width / 2 + thk / 2 + 15, y: height / 2 + 1.5 * hg + 3},
                    {x: width / 2 + thk / 2 + 15, y: height / 2 + 1.5 * hg - 3},
                    {x: width / 2 + thk / 2, y: height / 2 + 1.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - thk / 2, y: height / 2 + 1.5 * hg},
                    {x: width / 2 - thk / 2 - 15, y: height / 2 + 1.5 * hg + 3},
                    {x: width / 2 - thk / 2 - 15, y: height / 2 + 1.5 * hg - 3},
                    {x: width / 2 - thk / 2, y: height / 2 + 1.5 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - thk / 2, y: height / 2 + 1.5 * hg},
                {x: width / 2 + thk / 2 + 15 + 10, y: height / 2 + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2 - thk / 2 - 15 - 40, y: height / 2 + 1.5 * hg},
                {x: width / 2 - thk / 2 - 15, y: height / 2 + 1.5 * hg}
            ])).attr("id", "XABASketchTHKVN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABASketchTHKVN").attr("startOffset", "50%").text(thkvn);

            // thkhn1
            extLineLeftH(padding + 3 * wg, height / 2);
            extLineLeftH(padding + 3 * wg, height / 2 + thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg - 30, y: height / 2},
                    {x: padding + 3 * wg - 30 + 3, y: height / 2 - 15},
                    {x: padding + 3 * wg - 30 - 3, y: height / 2 - 15},
                    {x: padding + 3 * wg - 30, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg - 30, y: height / 2 + thk},
                    {x: padding + 3 * wg - 30 + 3, y: height / 2 + thk + 15},
                    {x: padding + 3 * wg - 30 - 3, y: height / 2 + thk + 15},
                    {x: padding + 3 * wg - 30, y: height / 2 + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 30, y: height / 2},
                {x: padding + 3 * wg - 30, y: height / 2 + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 30, y: height / 2 - 15},
                {x: padding + 3 * wg - 30, y: height / 2 - 15 - 50}
            ])).attr("id", "XABASketchTHKHN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABASketchTHKHN1").attr("startOffset", "50%").text(thkhn);

            // thkhn2
            extLineLeftH(padding + 3 * wg, height - padding);
            extLineLeftH(padding + 3 * wg, height - padding - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg - 30, y: height - padding - thk},
                    {x: padding + 3 * wg - 30 + 3, y: height - padding - thk - 15},
                    {x: padding + 3 * wg - 30 - 3, y: height - padding - thk - 15},
                    {x: padding + 3 * wg - 30, y: height - padding - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg - 30, y: height - padding},
                    {x: padding + 3 * wg - 30 + 3, y: height - padding + 15},
                    {x: padding + 3 * wg - 30 - 3, y: height - padding + 15},
                    {x: padding + 3 * wg - 30, y: height - padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 30, y: height - padding - thk},
                {x: padding + 3 * wg - 30, y: height - padding + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 30, y: height - padding - thk - 15},
                {x: padding + 3 * wg - 30, y: height - padding - thk - 15 - 50}
            ])).attr("id", "XABASketchTHKHN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABASketchTHKHN2").attr("startOffset", "50%").text(thkhn);

        }

        currentTabIndex = xabad2d3.tabs('getTabIndex', xabad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xaba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xaba").length > 0) {
                    xaba2d();
                }
            });
        }
        xabad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xaba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xaba").length > 0) {
                            xaba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "SH/T 3098-2011 拼焊工形填料支承梁校核",
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
                    $(ed.target).combobox("loadData", XABACategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", XABAType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", XABASTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", XABAName);
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
                    xabaSketch.empty();
                    xabaModel.empty();

                    // sketch
                    currentTabIndex = xabad2d3.tabs('getTabIndex', xabad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xaba2d();
                        xabaSketch.off("resize").on("resize", function () {
                            if ($("#xaba").length > 0) {
                                xaba2d();
                            }
                        });
                    }
                    xabad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xaba2d();
                                xabaSketch.off("resize").on("resize", function () {
                                    if ($("#xaba").length > 0) {
                                        xaba2d();
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

                        XABADT = parseFloat(changes.value);

                        // reset category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XABACategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABAType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABASTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XABADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XABACategory[index] = {
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
                    else if (index === 4) {

                        XABACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABAType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABASTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABACategoryVal,
                                temp: XABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABAType = [];
                                $(result).each(function (index, element) {
                                    XABAType[index] = {
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
                    else if (index === 5) {

                        XABATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABASTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABACategoryVal,
                                type: XABATypeVal,
                                temp: XABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABASTD = [];
                                $(result).each(function (index, element) {
                                    XABASTD[index] = {
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
                    else if (index === 6) {

                        XABASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABACategoryVal,
                                type: XABATypeVal,
                                std: XABASTDVal,
                                temp: XABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABAName = [];
                                $(result).each(function (index, element) {
                                    XABAName[index] = {
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

                        // 填料质量 M1
                        let XABAM1;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XABAM1 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 持液量 M2
                        let XABAM2;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XABAM2 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 格栅质量 M3
                        let XABAM3;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            XABAM3 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XABANameVal = rows[7][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XABADensity, XABAThkMin, XABAThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XABACategoryVal,
                                    "type": XABATypeVal,
                                    "std": XABASTDVal,
                                    "name": XABANameVal,
                                    "temp": XABADT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XABADensity = parseFloat(result.density);
                                    XABAThkMin = parseFloat(result.thkMin);
                                    XABAThkMax = parseFloat(result.thkMax);

                                    // 腐蚀裕量
                                    let XABAC2;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) < XABAThkMax / 2) {
                                        XABAC2 = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) >= XABAThkMax / 2) {
                                        south.html("支承梁腐蚀裕量不能大于等于 " + XABAThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 横板名义厚度
                                    let XABATHKHN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > Math.max(2 * XABAC2, XABAThkMin)
                                        && parseFloat(rows[9][columns[0][1].field]) <= XABAThkMax) {
                                        XABATHKHN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.max(2 * XABAC2, XABAThkMin)) {
                                        south.html("横板名义厚度 δhn 不能小于等于 " + Math.max(2 * XABAC2, XABAThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > XABAThkMax) {
                                        south.html("横板名义厚度 δhn 不能大于 " + XABAThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xaba2d(XABATHKHN);
                                        xabaSketch.off("resize").on("resize", function () {
                                            if ($("#xaba").length > 0) {
                                                xaba2d(XABATHKHN);
                                            }
                                        });
                                    }
                                    xabad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xaba2d(XABATHKHN);
                                                xabaSketch.off("resize").on("resize", function () {
                                                    if ($("#xaba").length > 0) {
                                                        xaba2d(XABATHKHN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    let XABAOH, XABAOHT, XABARHTEL, XABACH1, XABAEHT;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XABACategoryVal,
                                            "type": XABATypeVal,
                                            "std": XABASTDVal,
                                            "name": XABANameVal,
                                            "thk": XABATHKHN,
                                            "temp": XABADT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 1000000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XABAOH = parseFloat(result.o);
                                            if (XABAOH < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABAOHT = parseFloat(result.ot);
                                            if (XABAOHT < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABARHTEL = parseFloat(result.relt);
                                            if (XABARHTEL < 0) {
                                                south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }

                                            XABACH1 = parseFloat(result.c1);
                                            if (XABACH1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            XABAEHT = 1000 * parseFloat(result.et);
                                            if (XABAEHT < 0) {
                                                south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // 竖板名义厚度
                                            let XABATHKVN;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > Math.max(2 * XABAC2, XABAThkMin)
                                                && parseFloat(rows[10][columns[0][1].field]) <= XABAThkMax) {
                                                XABATHKVN = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) <= Math.max(2 * XABAC2, XABAThkMin)) {
                                                south.html("竖板名义厚度 δvn 不能小于等于 " + Math.max(2 * XABAC2, XABAThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > XABAThkMax) {
                                                south.html("竖板名义厚度 δvn 不能大于 " + XABAThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xaba2d(XABATHKHN, XABATHKVN);
                                                xabaSketch.off("resize").on("resize", function () {
                                                    if ($("#xaba").length > 0) {
                                                        xaba2d(XABATHKHN, XABATHKVN);
                                                    }
                                                });
                                            }
                                            xabad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xaba2d(XABATHKHN, XABATHKVN);
                                                        xabaSketch.off("resize").on("resize", function () {
                                                            if ($("#xaba").length > 0) {
                                                                xaba2d(XABATHKHN, XABATHKVN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let XABAOV, XABAOVT, XABARVTEL, XABACV1, XABAEVT;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XABACategoryVal,
                                                    "type": XABATypeVal,
                                                    "std": XABASTDVal,
                                                    "name": XABANameVal,
                                                    "thk": XABATHKVN,
                                                    "temp": XABADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 1000000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XABAOV = parseFloat(result.o);
                                                    if (XABAOV < 0) {
                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABAOVT = parseFloat(result.ot);
                                                    if (XABAOVT < 0) {
                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABARVTEL = parseFloat(result.relt);
                                                    if (XABARVTEL < 0) {
                                                        south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABACV1 = parseFloat(result.c1);
                                                    if (XABACV1 < 0) {
                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABAEVT = 1000 * parseFloat(result.et);
                                                    if (XABAEVT < 0) {
                                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // WN
                                                    let XABAWN;
                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) >= XABATHKVN) {
                                                        XABAWN = parseFloat(rows[11][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) < XABATHKVN) {
                                                        south.html("支承梁宽度 Wn 不能小于 " + XABATHKVN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xaba2d(XABATHKHN, XABATHKVN, XABAWN);
                                                        xabaSketch.off("resize").on("resize", function () {
                                                            if ($("#xaba").length > 0) {
                                                                xaba2d(XABATHKHN, XABATHKVN, XABAWN);
                                                            }
                                                        });
                                                    }
                                                    xabad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xaba2d(XABATHKHN, XABATHKVN, XABAWN);
                                                                xabaSketch.off("resize").on("resize", function () {
                                                                    if ($("#xaba").length > 0) {
                                                                        xaba2d(XABATHKHN, XABATHKVN, XABAWN);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // H
                                                    let XABAH;
                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) >= 2 * XABATHKHN) {
                                                        XABAH = parseFloat(rows[12][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) < 2 * XABATHKHN) {
                                                        south.html("支承梁高度 Hn 不能小于 " + 2 * XABATHKHN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH);
                                                        xabaSketch.off("resize").on("resize", function () {
                                                            if ($("#xaba").length > 0) {
                                                                xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH);
                                                            }
                                                        });
                                                    }
                                                    xabad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH);
                                                                xabaSketch.off("resize").on("resize", function () {
                                                                    if ($("#xaba").length > 0) {
                                                                        xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // L
                                                    let XABAL;
                                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                        XABAL = parseFloat(rows[13][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH, XABAL);
                                                        xabaSketch.off("resize").on("resize", function () {
                                                            if ($("#xaba").length > 0) {
                                                                xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH, XABAL);
                                                            }
                                                        });
                                                    }
                                                    xabad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH, XABAL);
                                                                xabaSketch.off("resize").on("resize", function () {
                                                                    if ($("#xaba").length > 0) {
                                                                        xaba2d(XABATHKHN, XABATHKVN, XABAWN, XABAH, XABAL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // n
                                                    let XABAN;
                                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                        XABAN = parseFloat(rows[14][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let XABAET = (XABAEHT + XABAEVT) / 2;

                                                    // 过程参数
                                                    let XABAG = 9.8;
                                                    let XABAK;
                                                    if (XABAN <= 2) {
                                                        XABAK = 1.0;
                                                    }
                                                    else {
                                                        XABAK = 0.83;
                                                    }
                                                    let XABACH = 2 * XABAC2 + XABACH1;
                                                    let XABATHKHE = XABATHKHN - XABACH;
                                                    let XABACV = 2 * XABAC2 + XABACV1;
                                                    let XABATHKVE = XABATHKVN - XABACV;
                                                    let XABAWE = XABAWN - 2 * XABAC2;
                                                    let XABAHE = XABAH - 2 * XABAC2 - 2 * XABACH1;
                                                    let XABAM4 = (2 * XABAWN * XABATHKHN + (XABAH - 2 * XABATHKHN) * XABATHKVN) * XABADensity * XABAL / 1000000000;
                                                    let XABAJ = (XABAWE * Math.pow(XABAHE, 3) - (XABAWE - XABATHKVE) * Math.pow(XABAH - 2 * XABATHKHN + 2 * XABAC2, 3)) / 12;
                                                    let XABAW = (XABAWE * Math.pow(XABAHE, 3) - (XABAWE - XABATHKVE) * Math.pow(XABAH - 2 * XABATHKHN + 2 * XABAC2, 3)) / (6 * XABAHE);
                                                    let XABAOALLOW = Math.min(XABAOH, XABAOV);
                                                    let XABAOTALLOW = Math.min(XABAOHT, XABAOVT);
                                                    let XABARTEL = Math.min(XABARHTEL, XABARVTEL);

                                                    // 操作状态应力校核
                                                    let XABAQ1 = XABAM1 * XABAG / XABAL;
                                                    let XABAQ2 = XABAM2 * XABAG / XABAL;
                                                    let XABAQ3 = XABAM3 * XABAG / XABAL;
                                                    let XABAQ4 = XABAM4 * XABAG / XABAL;
                                                    let XABAQ = (XABAQ1 + XABAQ2 + XABAQ3) / (XABAK * XABAN) + XABAQ4;
                                                    let XABAMTMAX = XABAQ * XABAL * XABAL / 8;
                                                    let XABAOT = XABAMTMAX / XABAW;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "操作工况强度限制的许用应力：" + XABAOTALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABAOTCHK;
                                                    if (XABAOT <= XABAOTALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABAOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABAOTCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABAOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABAOTCHK = "不合格";
                                                    }

                                                    // 操作状态挠度校核
                                                    let XABXA = 5 * XABAQ * Math.pow(XABAL, 4) / (384 * XABAET * XABAJ);
                                                    let XABXAALLOW;
                                                    if (XABAL <= 3000) {
                                                        XABXAALLOW = 3;
                                                    } else if (XABAL > 3000 && XABAL <= 6000) {
                                                        XABXAALLOW = 5;
                                                    } else if (XABAL > 6000) {
                                                        XABXAALLOW = 6;
                                                    }
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "操作工况支承梁许用挠度：" + XABXAALLOW.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let XABXACHK;
                                                    if (XABXA <= XABXAALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABXA.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABXACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABXA.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABXACHK = "不合格";
                                                    }

                                                    // 操作工况稳定性校核
                                                    let XABAXIGEMA = (XABAL * XABATHKHE) / (XABAWE * XABAHE);
                                                    let XABABETAB;
                                                    if (XABAXIGEMA <= 2) {
                                                        XABABETAB = 0.69 + 0.13 * XABAXIGEMA;
                                                    } else if (XABAXIGEMA > 2) {
                                                        XABABETAB = 0.95;
                                                    }
                                                    let XABAA = 2 * XABAWE * XABATHKHE + (XABAHE - 2 * XABATHKHE) * XABATHKVE;
                                                    let XABALAMUDXA = XABAL / Math.sqrt((2 * XABATHKHE * Math.pow(XABAWE, 3) + (XABAHE - 2 * XABATHKHE) * Math.pow(XABATHKHE, 3)) / (12 * XABAA));

                                                    let XABAEB = XABABETAB * 4320 / (XABALAMUDXA * XABALAMUDXA) * XABAA * XABAHE / XABAW * Math.sqrt(1 + Math.pow((XABALAMUDXA * XABATHKHE) / (4.4 * XABAHE), 2)) * 235 / XABARTEL;
                                                    let XABAE;
                                                    if (XABAEB <= 0.6) {
                                                        XABAE = XABAEB;
                                                    } else if (XABAEB > 0.6) {
                                                        XABAE = 1.07 - 0.282 / XABAEB;
                                                    }
                                                    let XABAOBT = XABAMTMAX / (XABAE * XABAW);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "操作工况稳定性限制的许用应力：" + XABAOTALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABAOBTCHK;
                                                    if (XABAOBT <= XABAOTALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABAOBT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABAOBTCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABAOBT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABAOBTCHK = "不合格";
                                                    }

                                                    // 安装、检修工况
                                                    let XABAF, XABAMMAX;
                                                    if (XABAL <= 2000) {
                                                        XABAF = 1350;
                                                        XABAMMAX = (XABAQ3 / (XABAK * XABAN) + XABAQ4) * XABAL * XABAL / 8 + XABAF * XABAL / 4;
                                                    }
                                                    else if (XABAL > 2000) {
                                                        XABAF = 1000;
                                                        XABAMMAX = (XABAQ3 / (XABAK * XABAN) + XABAQ4) * XABAL * XABAL / 8 + XABAF * XABAL / 3;
                                                    }
                                                    let XABAO = XABAMMAX / XABAW;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "安装/检修工况许用应力：" + XABAOALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABAOCHK;
                                                    if (XABAO <= XABAOALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABAO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABAOCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABAO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABAOCHK = "不合格";
                                                    }

                                                    // docx
                                                    let XABAPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "xabadocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "XABA",

                                                                t: XABADT,
                                                                m1: XABAM1,
                                                                m2: XABAM2,
                                                                m3: XABAM3,
                                                                std: XABASTDVal,
                                                                name: XABANameVal,
                                                                c2: XABAC2,
                                                                thkhn: XABATHKHN,
                                                                thkvn: XABATHKVN,
                                                                wn: XABAWN,
                                                                h: XABAH,
                                                                l: XABAL,
                                                                ch1: XABACH1.toFixed(4),
                                                                oh: XABAOH.toFixed(4),
                                                                oht: XABAOHT.toFixed(4),
                                                                rhtel: XABARHTEL.toFixed(4),
                                                                density: XABADensity.toFixed(4),
                                                                cv1: XABACV1.toFixed(4),
                                                                ov: XABAOV.toFixed(4),
                                                                ovt: XABAOVT.toFixed(4),
                                                                rvtel: XABARVTEL.toFixed(4),
                                                                et: (XABAET / 1000).toFixed(4),
                                                                g: XABAG.toFixed(4),
                                                                ch: XABACH.toFixed(4),
                                                                thkhe: XABATHKHE.toFixed(4),
                                                                cv: XABACV.toFixed(4),
                                                                thkve: XABATHKVE.toFixed(4),
                                                                we: XABAWE.toFixed(4),
                                                                he: XABAHE.toFixed(4),
                                                                m4: XABAM4.toFixed(4),
                                                                j: XABAJ.toFixed(4),
                                                                w: XABAW.toFixed(4),
                                                                oallow: XABAOALLOW.toFixed(4),
                                                                otallow: XABAOTALLOW.toFixed(4),
                                                                rtel: XABARTEL.toFixed(4),
                                                                q1: XABAQ1.toFixed(4),
                                                                q2: XABAQ2.toFixed(4),
                                                                q3: XABAQ3.toFixed(4),
                                                                q4: XABAQ4.toFixed(4),
                                                                q: XABAQ.toFixed(4),
                                                                mtmax: XABAMTMAX.toFixed(4),
                                                                ot: XABAOT.toFixed(4),
                                                                otchk: XABAOTCHK,
                                                                y: XABXA.toFixed(4),
                                                                yallow: XABXAALLOW.toFixed(4),
                                                                ychk: XABXACHK,
                                                                xigema: XABAXIGEMA.toFixed(4),
                                                                betab: XABABETAB.toFixed(4),
                                                                lamuday: XABALAMUDXA.toFixed(4),
                                                                a: XABAA.toFixed(4),
                                                                eb: XABAEB.toFixed(4),
                                                                e: XABAE.toFixed(4),
                                                                obt: XABAOBT.toFixed(4),
                                                                obtchk: XABAOBTCHK,
                                                                f: XABAF.toFixed(4),
                                                                mmax: XABAMMAX.toFixed(4),
                                                                o: XABAO.toFixed(4),
                                                                ochk: XABAOCHK,

                                                                n: XABAN.toFixed(0),
                                                                k: XABAK.toFixed(2)
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
                                                                    XABAPayJS.dialog({
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
                                                                                XABAPayJS.dialog("close");
                                                                                XABAPayJS.dialog("clear");
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
                                                                                            XABAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    XABAPayJS.dialog('close');
                                                                                                    XABAPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});