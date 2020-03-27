$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xabcSketch = $("#d2");
    let xabcModel = $("#d3");
    let xabcd2d3 = $('#d2d3');

    $("#cal").html("<table id='xabc'></table>");
    let pg = $("#xabc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/a/b/c/XABC.json", function (result) {

        let XABCDT,
            XABCCategory, XABCCategoryVal, XABCType, XABCTypeVal, XABCSTD, XABCSTDVal, XABCName, XABCNameVal,
            columns, rows, ed;

        function xabc2d(thkhn = "δhn", thkvn = "δvn", wn = "Wn", h = "H", l = "L") {

            xabcSketch.empty();
            let width = xabcSketch.width();
            let height = xabcSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XABCSVG").attr("height", height);

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
            dimTopH(padding + wg, padding + hg, width - padding - wg, padding + hg, l, "XABCSketchL");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + thk, y: height - padding},
                {x: padding + 3 * wg, y: height - padding}
            ])).classed("sketch", true);
            drawCenterLine(width / 2, height - padding - 3 * hg - 15, width / 2, height - padding + 15);

            // WN
            dimBottomH(padding + 3 * wg, height - padding, width - padding - 3 * wg, height - padding, wn, "XABCSketchWN");
            drawLine(width - padding - 3 * wg, height - padding + 3, width - padding - 3 * wg, padding + 3 * hg + thk + 3);

            // H
            dimRightV(padding + 5 * wg, height - padding, padding + 5 * wg, height - padding - 3 * hg, h, "XABCSketchH");
            drawLine(padding + 3 * wg + thk + 3, height - padding, width - padding - 3 * wg + 3, height - padding);

            // thkvn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + thk, y: height / 2 + 2 * hg},
                    {x: padding + 3 * wg + thk + 15, y: height / 2 + 2 * hg + 3},
                    {x: padding + 3 * wg + thk + 15, y: height / 2 + 2 * hg - 3},
                    {x: padding + 3 * wg + thk, y: height / 2 + 2 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: height / 2 + 2 * hg},
                    {x: padding + 3 * wg - 15, y: height / 2 + 2 * hg + 3},
                    {x: padding + 3 * wg - 15, y: height / 2 + 2 * hg - 3},
                    {x: padding + 3 * wg, y: height / 2 + 2 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height / 2 + 2 * hg},
                {x: padding + 3 * wg + thk + 15 + 10, y: height / 2 + 2 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 15 - 40, y: height / 2 + 2 * hg},
                {x: padding + 3 * wg - 15, y: height / 2 + 2 * hg}
            ])).attr("id", "XABCSketchTHKVN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABCSketchTHKVN").attr("startOffset", "50%").text(thkvn);

            // thkhn
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
                {x: padding + 3 * wg - 3, y: height / 2 + thk},
                {x: padding + 3 * wg + thk - 3, y: height / 2 + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 30, y: height / 2 - 15},
                {x: padding + 3 * wg - 30, y: height / 2 - 15 - 50}
            ])).attr("id", "XABCSketchTHKHN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABCSketchTHKHN").attr("startOffset", "50%").text(thkhn);

        }

        currentTabIndex = xabcd2d3.tabs('getTabIndex', xabcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xabc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xabc").length > 0) {
                    xabc2d();
                }
            });
        }
        xabcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xabc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xabc").length > 0) {
                            xabc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "SH/T 3098-2011 拼焊L形填料支承梁校核",
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
                    $(ed.target).combobox("loadData", XABCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", XABCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", XABCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", XABCName);
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
                    xabcSketch.empty();
                    xabcModel.empty();

                    // sketch
                    currentTabIndex = xabcd2d3.tabs('getTabIndex', xabcd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xabc2d();
                        xabcSketch.off("resize").on("resize", function () {
                            if ($("#xabc").length > 0) {
                                xabc2d();
                            }
                        });
                    }
                    xabcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xabc2d();
                                xabcSketch.off("resize").on("resize", function () {
                                    if ($("#xabc").length > 0) {
                                        xabc2d();
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

                        XABCDT = parseFloat(changes.value);

                        // reset category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XABCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABCName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XABCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XABCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XABCCategory[index] = {
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

                        XABCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABCCategoryVal,
                                temp: XABCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABCType = [];
                                $(result).each(function (index, element) {
                                    XABCType[index] = {
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

                        XABCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABCCategoryVal,
                                type: XABCTypeVal,
                                temp: XABCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABCSTD = [];
                                $(result).each(function (index, element) {
                                    XABCSTD[index] = {
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

                        XABCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABCCategoryVal,
                                type: XABCTypeVal,
                                std: XABCSTDVal,
                                temp: XABCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABCName = [];
                                $(result).each(function (index, element) {
                                    XABCName[index] = {
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
                        let XABCM1;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XABCM1 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 持液量 M2
                        let XABCM2;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XABCM2 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 格栅质量 M3
                        let XABCM3;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            XABCM3 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XABCNameVal = rows[7][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XABCDensity, XABCThkMin, XABCThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XABCCategoryVal,
                                    "type": XABCTypeVal,
                                    "std": XABCSTDVal,
                                    "name": XABCNameVal,
                                    "temp": XABCDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XABCDensity = parseFloat(result.density);
                                    XABCThkMin = parseFloat(result.thkMin);
                                    XABCThkMax = parseFloat(result.thkMax);

                                    // 腐蚀裕量
                                    let XABCC2;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) < XABCThkMax / 2) {
                                        XABCC2 = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) >= XABCThkMax / 2) {
                                        south.html("支承梁腐蚀裕量不能大于等于 " + XABCThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 横板名义厚度
                                    let XABCTHKHN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > Math.max(2 * XABCC2, XABCThkMin)
                                        && parseFloat(rows[9][columns[0][1].field]) <= XABCThkMax) {
                                        XABCTHKHN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.max(2 * XABCC2, XABCThkMin)) {
                                        south.html("横板名义厚度 δhn 不能小于等于 " + Math.max(2 * XABCC2, XABCThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > XABCThkMax) {
                                        south.html("横板名义厚度 δhn 不能大于 " + XABCThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xabc2d(XABCTHKHN);
                                        xabcSketch.off("resize").on("resize", function () {
                                            if ($("#xabc").length > 0) {
                                                xabc2d(XABCTHKHN);
                                            }
                                        });
                                    }
                                    xabcd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xabc2d(XABCTHKHN);
                                                xabcSketch.off("resize").on("resize", function () {
                                                    if ($("#xabc").length > 0) {
                                                        xabc2d(XABCTHKHN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    let XABCOH, XABCOHT, XABCRHTEL, XABCCH1, XABCEHT;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XABCCategoryVal,
                                            "type": XABCTypeVal,
                                            "std": XABCSTDVal,
                                            "name": XABCNameVal,
                                            "thk": XABCTHKHN,
                                            "temp": XABCDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 1000000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XABCOH = parseFloat(result.o);
                                            if (XABCOH < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABCOHT = parseFloat(result.ot);
                                            if (XABCOHT < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABCRHTEL = parseFloat(result.relt);
                                            if (XABCRHTEL < 0) {
                                                south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }

                                            XABCCH1 = parseFloat(result.c1);
                                            if (XABCCH1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            XABCEHT = 1000 * parseFloat(result.et);
                                            if (XABCEHT < 0) {
                                                south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // 竖板名义厚度
                                            let XABCTHKVN;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > Math.max(2 * XABCC2, XABCThkMin)
                                                && parseFloat(rows[10][columns[0][1].field]) <= XABCThkMax) {
                                                XABCTHKVN = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) <= Math.max(2 * XABCC2, XABCThkMin)) {
                                                south.html("竖板名义厚度 δvn 不能小于等于 " + Math.max(2 * XABCC2, XABCThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > XABCThkMax) {
                                                south.html("竖板名义厚度 δvn 不能大于 " + XABCThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xabc2d(XABCTHKHN, XABCTHKVN);
                                                xabcSketch.off("resize").on("resize", function () {
                                                    if ($("#xabc").length > 0) {
                                                        xabc2d(XABCTHKHN, XABCTHKVN);
                                                    }
                                                });
                                            }
                                            xabcd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xabc2d(XABCTHKHN, XABCTHKVN);
                                                        xabcSketch.off("resize").on("resize", function () {
                                                            if ($("#xabc").length > 0) {
                                                                xabc2d(XABCTHKHN, XABCTHKVN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let XABCOV, XABCOVT, XABCRVTEL, XABCCV1, XABCEVT;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XABCCategoryVal,
                                                    "type": XABCTypeVal,
                                                    "std": XABCSTDVal,
                                                    "name": XABCNameVal,
                                                    "thk": XABCTHKVN,
                                                    "temp": XABCDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 1000000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XABCOV = parseFloat(result.o);
                                                    if (XABCOV < 0) {
                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABCOVT = parseFloat(result.ot);
                                                    if (XABCOVT < 0) {
                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABCRVTEL = parseFloat(result.relt);
                                                    if (XABCRVTEL < 0) {
                                                        south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABCCV1 = parseFloat(result.c1);
                                                    if (XABCCV1 < 0) {
                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABCEVT = 1000 * parseFloat(result.et);
                                                    if (XABCEVT < 0) {
                                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // WN
                                                    let XABCWN;
                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) >= XABCTHKVN) {
                                                        XABCWN = parseFloat(rows[11][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) < XABCTHKVN) {
                                                        south.html("支承梁宽度 Wn 不能小于 " + XABCTHKVN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabc2d(XABCTHKHN, XABCTHKVN, XABCWN);
                                                        xabcSketch.off("resize").on("resize", function () {
                                                            if ($("#xabc").length > 0) {
                                                                xabc2d(XABCTHKHN, XABCTHKVN, XABCWN);
                                                            }
                                                        });
                                                    }
                                                    xabcd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabc2d(XABCTHKHN, XABCTHKVN, XABCWN);
                                                                xabcSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabc").length > 0) {
                                                                        xabc2d(XABCTHKHN, XABCTHKVN, XABCWN);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // H
                                                    let XABCH;
                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) >= XABCTHKHN) {
                                                        XABCH = parseFloat(rows[12][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) < XABCTHKHN) {
                                                        south.html("支承梁高度 Hn 不能小于 " + XABCTHKHN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH);
                                                        xabcSketch.off("resize").on("resize", function () {
                                                            if ($("#xabc").length > 0) {
                                                                xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH);
                                                            }
                                                        });
                                                    }
                                                    xabcd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH);
                                                                xabcSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabc").length > 0) {
                                                                        xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // L
                                                    let XABCL;
                                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                        XABCL = parseFloat(rows[13][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH, XABCL);
                                                        xabcSketch.off("resize").on("resize", function () {
                                                            if ($("#xabc").length > 0) {
                                                                xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH, XABCL);
                                                            }
                                                        });
                                                    }
                                                    xabcd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH, XABCL);
                                                                xabcSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabc").length > 0) {
                                                                        xabc2d(XABCTHKHN, XABCTHKVN, XABCWN, XABCH, XABCL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // n
                                                    let XABCN;
                                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                        XABCN = parseFloat(rows[14][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let XABCET = (XABCEHT + XABCEVT) / 2;

                                                    // 过程参数
                                                    let XABCK;
                                                    if (XABCN <= 2) {
                                                        XABCK = 1.0;
                                                    }
                                                    else {
                                                        XABCK = 0.83;
                                                    }
                                                    let XABCG = 9.8;
                                                    let XABCCH = 2 * XABCC2 + XABCCH1;
                                                    let XABCTHKHE = XABCTHKHN - XABCCH;
                                                    let XABCCV = 2 * XABCC2 + XABCCV1;
                                                    let XABCTHKVE = XABCTHKVN - XABCCV;
                                                    let XABCWE = XABCWN - XABCCV;
                                                    let XABCHE = XABCH - XABCCH;

                                                    let XABCM4 = (XABCWN * XABCTHKHN + (XABCH - XABCTHKHN) * XABCTHKVN) * XABCDensity * XABCL / 1000000000;
                                                    let XABCU = XABCWE - XABCTHKVE;
                                                    let XABCEY1 = (XABCTHKVE * XABCHE * XABCHE + XABCU * XABCTHKHE * XABCTHKHE) / (2 * (XABCTHKVE * XABCHE + XABCU * XABCTHKHE));
                                                    let XABCEY2 = XABCHE - XABCEY1;
                                                    let XABCS = XABCEY1 - XABCTHKHE;

                                                    let XABCJ = (XABCWE * Math.pow(XABCEY1, 3)
                                                        - XABCU * Math.pow(XABCS, 3) + XABCTHKVE * Math.pow(XABCEY2, 3)) / 3;
                                                    let XABCW = XABCJ / Math.max(XABCEY1, XABCEY2);
                                                    let XABCOALLOW = Math.min(XABCOH, XABCOV);
                                                    let XABCOTALLOW = Math.min(XABCOHT, XABCOVT);
                                                    let XABCRTEL = Math.min(XABCRHTEL, XABCRVTEL);

                                                    // 操作状态应力校核
                                                    let XABCQ1 = XABCM1 * XABCG / XABCL;
                                                    let XABCQ2 = XABCM2 * XABCG / XABCL;
                                                    let XABCQ3 = XABCM3 * XABCG / XABCL;
                                                    let XABCQ4 = XABCM4 * XABCG / XABCL;
                                                    let XABCQ = (XABCQ1 + XABCQ2 + XABCQ3) / (XABCK * XABCN) + XABCQ4;
                                                    let XABCMTMAX = XABCQ * XABCL * XABCL / 8;
                                                    let XABCOT = XABCMTMAX / XABCW;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "操作工况强度限制的许用应力：" + XABCOTALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABCOTCHK;
                                                    if (XABCOT <= XABCOTALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABCOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABCOTCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABCOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABCOTCHK = "不合格";
                                                    }

                                                    // 操作状态挠度校核
                                                    let XABCY = 5 * XABCQ * Math.pow(XABCL, 4) / (384 * XABCET * XABCJ);
                                                    let XABCYALLOW;
                                                    if (XABCL <= 3000) {
                                                        XABCYALLOW = 3;
                                                    } else if (XABCL > 3000 && XABCL <= 6000) {
                                                        XABCYALLOW = 5;
                                                    } else if (XABCL > 6000) {
                                                        XABCYALLOW = 6;
                                                    }
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "操作工况支承梁许用挠度：" + XABCYALLOW.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let XABCYCHK;
                                                    if (XABCY <= XABCYALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABCY.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABCYCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABCY.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABCYCHK = "不合格";
                                                    }

                                                    // 安装、检修工况
                                                    let XABCF, XABCMMAX;
                                                    if (XABCL <= 2000) {
                                                        XABCF = 1350;
                                                        XABCMMAX = (XABCQ3 / (XABCK * XABCN) + XABCQ4) * XABCL * XABCL / 8 + XABCF * XABCL / 4;
                                                    }
                                                    else if (XABCL > 2000) {
                                                        XABCF = 1000;
                                                        XABCMMAX = (XABCQ3 / (XABCK * XABCN) + XABCQ4) * XABCL * XABCL / 8 + XABCF * XABCL / 3;
                                                    }
                                                    let XABCO = XABCMMAX / XABCW;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "安装/检修工况许用应力：" + XABCOALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABCOCHK;
                                                    if (XABCO <= XABCOALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABCO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABCOCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABCO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABCOCHK = "不合格";
                                                    }

                                                    // docx
                                                    let XABCPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "xabcdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "XABC",

                                                                t: XABCDT,
                                                                m1: XABCM1,
                                                                m2: XABCM2,
                                                                m3: XABCM3,
                                                                std: XABCSTDVal,
                                                                name: XABCNameVal,
                                                                c2: XABCC2,

                                                                thkhn: XABCTHKHN,
                                                                thkvn: XABCTHKVN,
                                                                wn: XABCWN,
                                                                h: XABCH,
                                                                l: XABCL,

                                                                n: XABCN.toFixed(0),

                                                                ch1: XABCCH1.toFixed(4),
                                                                oh: XABCOH.toFixed(4),
                                                                oht: XABCOHT.toFixed(4),
                                                                rhtel: XABCRHTEL.toFixed(4),
                                                                density: XABCDensity.toFixed(4),
                                                                cv1: XABCCV1.toFixed(4),
                                                                ov: XABCOV.toFixed(4),
                                                                ovt: XABCOVT.toFixed(4),
                                                                rvtel: XABCRVTEL.toFixed(4),
                                                                et: (XABCET / 1000).toFixed(4),

                                                                k: XABCK.toFixed(2),
                                                                g: XABCG.toFixed(4),
                                                                ch: XABCCH.toFixed(4),
                                                                thkhe: XABCTHKHE.toFixed(4),
                                                                cv: XABCCV.toFixed(4),
                                                                thkve: XABCTHKVE.toFixed(4),
                                                                we: XABCWE.toFixed(4),
                                                                he: XABCHE.toFixed(4),
                                                                m4: XABCM4.toFixed(4),
                                                                u: XABCU.toFixed(4),
                                                                ey1: XABCEY1.toFixed(4),
                                                                ey2: XABCEY2.toFixed(4),
                                                                s: XABCS.toFixed(4),
                                                                j: XABCJ.toFixed(4),
                                                                w: XABCW.toFixed(4),
                                                                oallow: XABCOALLOW.toFixed(4),
                                                                otallow: XABCOTALLOW.toFixed(4),
                                                                rtel: XABCRTEL.toFixed(4),

                                                                q1: XABCQ1.toFixed(4),
                                                                q2: XABCQ2.toFixed(4),
                                                                q3: XABCQ3.toFixed(4),
                                                                q4: XABCQ4.toFixed(4),
                                                                q: XABCQ.toFixed(4),
                                                                mtmax: XABCMTMAX.toFixed(4),
                                                                ot: XABCOT.toFixed(4),
                                                                otchk: XABCOTCHK,
                                                                y: XABCY.toFixed(4),
                                                                yallow: XABCYALLOW.toFixed(4),
                                                                ychk: XABCYCHK,

                                                                f: XABCF.toFixed(4),
                                                                mmax: XABCMMAX.toFixed(4),
                                                                o: XABCO.toFixed(4),
                                                                ochk: XABCOCHK
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
                                                                    XABCPayJS.dialog({
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
                                                                                XABCPayJS.dialog("close");
                                                                                XABCPayJS.dialog("clear");
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
                                                                                            XABCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    XABCPayJS.dialog('close');
                                                                                                    XABCPayJS.dialog('clear');
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