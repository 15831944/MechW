$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xabbSketch = $("#d2");
    let xabbModel = $("#d3");
    let xabbd2d3 = $('#d2d3');

    $("#cal").html("<table id='xabb'></table>");
    let pg = $("#xabb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/a/b/b/XABB.json", function (result) {

        let XABBDT,
            XABBCategory, XABBCategoryVal, XABBType, XABBTypeVal, XABBSTD, XABBSTDVal, XABBName, XABBNameVal,
            columns, rows, ed;

        function xabb2d(thkhn = "δhn", thkvn = "δvn", wn = "Wn", h = "H", l = "L") {

            xabbSketch.empty();
            let width = xabbSketch.width();
            let height = xabbSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XABBSVG").attr("height", height);

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
            dimTopH(padding + wg, padding + hg, width - padding - wg, padding + hg, l, "XABBSketchL");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: height - padding},
                {x: width - padding - 3 * wg - thk, y: height - padding},
                {x: width - padding - 3 * wg - thk, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + thk, y: height - padding},
                {x: padding + 3 * wg, y: height - padding}
            ])).classed("sketch", true);
            drawCenterLine(width / 2, height - padding - 3 * hg - 15, width / 2, height - padding + 15);

            // WN
            dimBottomH(padding + 3 * wg, height - padding, width - padding - 3 * wg, height - padding, wn, "XABBSketchWN");

            // H
            dimRightV(padding + 5 * wg, height - padding, padding + 5 * wg, height - padding - 3 * hg, h, "XABBSketchH");

            // thkvn1
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
            ])).attr("id", "XABBSketchTHKVN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABBSketchTHKVN1").attr("startOffset", "50%").text(thkvn);

            // thkvn2
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - 3 * wg, y: height / 2 + 2 * hg},
                    {x: width - padding - 3 * wg + 15, y: height / 2 + 2 * hg + 3},
                    {x: width - padding - 3 * wg + 15, y: height / 2 + 2 * hg - 3},
                    {x: width - padding - 3 * wg, y: height / 2 + 2 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - 3 * wg - thk, y: height / 2 + 2 * hg},
                    {x: width - padding - 3 * wg - thk - 15, y: height / 2 + 2 * hg + 3},
                    {x: width - padding - 3 * wg - thk - 15, y: height / 2 + 2 * hg - 3},
                    {x: width - padding - 3 * wg - thk, y: height / 2 + 2 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: width - padding - 3 * wg - thk, y: height / 2 + 2 * hg},
                {x: width - padding - 3 * wg + 15 + 10, y: height / 2 + 2 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding - 3 * wg - thk - 15 - 40, y: height / 2 + 2 * hg},
                {x: width - padding - 3 * wg - thk - 15, y: height / 2 + 2 * hg}
            ])).attr("id", "XABBSketchTHKVN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABBSketchTHKVN2").attr("startOffset", "50%").text(thkvn);

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
                {x: padding + 3 * wg - 3, y: height / 2 + thk},
                {x: padding + 3 * wg + thk - 3, y: height / 2 + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 30, y: height / 2 - 15},
                {x: padding + 3 * wg - 30, y: height / 2 - 15 - 50}
            ])).attr("id", "XABBSketchTHKHN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABBSketchTHKHN1").attr("startOffset", "50%").text(thkhn);

        }

        currentTabIndex = xabbd2d3.tabs('getTabIndex', xabbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xabb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xabb").length > 0) {
                    xabb2d();
                }
            });
        }
        xabbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xabb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xabb").length > 0) {
                            xabb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "SH/T 3098-2011 槽形填料支承梁计算",
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
                    $(ed.target).combobox("loadData", XABBCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", XABBType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", XABBSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", XABBName);
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
                    xabbSketch.empty();
                    xabbModel.empty();

                    // sketch
                    currentTabIndex = xabbd2d3.tabs('getTabIndex', xabbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xabb2d();
                        xabbSketch.off("resize").on("resize", function () {
                            if ($("#xabb").length > 0) {
                                xabb2d();
                            }
                        });
                    }
                    xabbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xabb2d();
                                xabbSketch.off("resize").on("resize", function () {
                                    if ($("#xabb").length > 0) {
                                        xabb2d();
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

                        XABBDT = parseFloat(changes.value);

                        // reset category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XABBCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABBType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABBSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABBName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XABBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABBCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XABBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XABBCategory[index] = {
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

                        XABBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABBType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABBSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABBCategoryVal,
                                temp: XABBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABBType = [];
                                $(result).each(function (index, element) {
                                    XABBType[index] = {
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

                        XABBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABBSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABBCategoryVal,
                                type: XABBTypeVal,
                                temp: XABBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABBSTD = [];
                                $(result).each(function (index, element) {
                                    XABBSTD[index] = {
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

                        XABBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABBCategoryVal,
                                type: XABBTypeVal,
                                std: XABBSTDVal,
                                temp: XABBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABBName = [];
                                $(result).each(function (index, element) {
                                    XABBName[index] = {
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
                        let XABBM1;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XABBM1 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 持液量 M2
                        let XABBM2;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XABBM2 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 格栅质量 M3
                        let XABBM3;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            XABBM3 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XABBNameVal = rows[7][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XABBDensity, XABBThkMin, XABBThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XABBCategoryVal,
                                    "type": XABBTypeVal,
                                    "std": XABBSTDVal,
                                    "name": XABBNameVal,
                                    "temp": XABBDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XABBDensity = parseFloat(result.density);
                                    XABBThkMin = parseFloat(result.thkMin);
                                    XABBThkMax = parseFloat(result.thkMax);

                                    // 腐蚀裕量
                                    let XABBC2;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) < XABBThkMax / 2) {
                                        XABBC2 = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) >= XABBThkMax / 2) {
                                        south.html("支承梁腐蚀裕量不能大于等于 " + XABBThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 横板名义厚度
                                    let XABBTHKHN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > Math.max(2 * XABBC2, XABBThkMin)
                                        && parseFloat(rows[9][columns[0][1].field]) <= XABBThkMax) {
                                        XABBTHKHN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.max(2 * XABBC2, XABBThkMin)) {
                                        south.html("横板名义厚度 δhn 不能小于等于 " + Math.max(2 * XABBC2, XABBThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > XABBThkMax) {
                                        south.html("横板名义厚度 δhn 不能大于 " + XABBThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xabb2d(XABBTHKHN);
                                        xabbSketch.off("resize").on("resize", function () {
                                            if ($("#xabb").length > 0) {
                                                xabb2d(XABBTHKHN);
                                            }
                                        });
                                    }
                                    xabbd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xabb2d(XABBTHKHN);
                                                xabbSketch.off("resize").on("resize", function () {
                                                    if ($("#xabb").length > 0) {
                                                        xabb2d(XABBTHKHN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    let XABBOH, XABBOHT, XABBRHTEL, XABBCH1, XABBEHT;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XABBCategoryVal,
                                            "type": XABBTypeVal,
                                            "std": XABBSTDVal,
                                            "name": XABBNameVal,
                                            "thk": XABBTHKHN,
                                            "temp": XABBDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 1000000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XABBOH = parseFloat(result.o);
                                            if (XABBOH < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABBOHT = parseFloat(result.ot);
                                            if (XABBOHT < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABBRHTEL = parseFloat(result.relt);
                                            if (XABBRHTEL < 0) {
                                                south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }

                                            XABBCH1 = parseFloat(result.c1);
                                            if (XABBCH1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            XABBEHT = 1000 * parseFloat(result.et);
                                            if (XABBEHT < 0) {
                                                south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // 竖板名义厚度
                                            let XABBTHKVN;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > Math.max(2 * XABBC2, XABBThkMin)
                                                && parseFloat(rows[10][columns[0][1].field]) <= XABBThkMax) {
                                                XABBTHKVN = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) <= Math.max(2 * XABBC2, XABBThkMin)) {
                                                south.html("竖板名义厚度 δvn 不能小于等于 " + Math.max(2 * XABBC2, XABBThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > XABBThkMax) {
                                                south.html("竖板名义厚度 δvn 不能大于 " + XABBThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xabb2d(XABBTHKHN, XABBTHKVN);
                                                xabbSketch.off("resize").on("resize", function () {
                                                    if ($("#xabb").length > 0) {
                                                        xabb2d(XABBTHKHN, XABBTHKVN);
                                                    }
                                                });
                                            }
                                            xabbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xabb2d(XABBTHKHN, XABBTHKVN);
                                                        xabbSketch.off("resize").on("resize", function () {
                                                            if ($("#xabb").length > 0) {
                                                                xabb2d(XABBTHKHN, XABBTHKVN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let XABBOV, XABBOVT, XABBRVTEL, XABBCV1, XABBEVT;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XABBCategoryVal,
                                                    "type": XABBTypeVal,
                                                    "std": XABBSTDVal,
                                                    "name": XABBNameVal,
                                                    "thk": XABBTHKVN,
                                                    "temp": XABBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 1000000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XABBOV = parseFloat(result.o);
                                                    if (XABBOV < 0) {
                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABBOVT = parseFloat(result.ot);
                                                    if (XABBOVT < 0) {
                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABBRVTEL = parseFloat(result.relt);
                                                    if (XABBRVTEL < 0) {
                                                        south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABBCV1 = parseFloat(result.c1);
                                                    if (XABBCV1 < 0) {
                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABBEVT = 1000 * parseFloat(result.et);
                                                    if (XABBEVT < 0) {
                                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // WN
                                                    let XABBWN;
                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) >= 2 * XABBTHKVN) {
                                                        XABBWN = parseFloat(rows[11][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) < 2 * XABBTHKVN) {
                                                        south.html("支承梁宽度 Wn 不能小于 " + 2 * XABBTHKVN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabb2d(XABBTHKHN, XABBTHKVN, XABBWN);
                                                        xabbSketch.off("resize").on("resize", function () {
                                                            if ($("#xabb").length > 0) {
                                                                xabb2d(XABBTHKHN, XABBTHKVN, XABBWN);
                                                            }
                                                        });
                                                    }
                                                    xabbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabb2d(XABBTHKHN, XABBTHKVN, XABBWN);
                                                                xabbSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabb").length > 0) {
                                                                        xabb2d(XABBTHKHN, XABBTHKVN, XABBWN);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // H
                                                    let XABBH;
                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) >= XABBTHKHN) {
                                                        XABBH = parseFloat(rows[12][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) < XABBTHKHN) {
                                                        south.html("支承梁高度 Hn 不能小于 " + XABBTHKHN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH);
                                                        xabbSketch.off("resize").on("resize", function () {
                                                            if ($("#xabb").length > 0) {
                                                                xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH);
                                                            }
                                                        });
                                                    }
                                                    xabbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH);
                                                                xabbSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabb").length > 0) {
                                                                        xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // L
                                                    let XABBL;
                                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                        XABBL = parseFloat(rows[13][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH, XABBL);
                                                        xabbSketch.off("resize").on("resize", function () {
                                                            if ($("#xabb").length > 0) {
                                                                xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH, XABBL);
                                                            }
                                                        });
                                                    }
                                                    xabbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH, XABBL);
                                                                xabbSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabb").length > 0) {
                                                                        xabb2d(XABBTHKHN, XABBTHKVN, XABBWN, XABBH, XABBL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // n
                                                    let XABBN;
                                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                        XABBN = parseFloat(rows[14][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let XABBET = (XABBEHT + XABBEVT) / 2;

                                                    // 过程参数
                                                    let XABBG = 9.8;
                                                    let XABBK;
                                                    if (XABBN <= 2) {
                                                        XABBK = 1.0;
                                                    }
                                                    else {
                                                        XABBK = 0.83;
                                                    }
                                                    let XABBCH = 2 * XABBC2 + XABBCH1;
                                                    let XABBTHKHE = XABBTHKHN - XABBCH;
                                                    let XABBCV = 2 * XABBC2 + XABBCV1;
                                                    let XABBTHKVE = XABBTHKVN - XABBCV;
                                                    let XABBWE = XABBWN - 2 * XABBC2;
                                                    let XABBHE = XABBH - 2 * XABBC2 - XABBCH1;

                                                    let XABBM4 = (XABBWN * XABBTHKHN + 2 * (XABBH - XABBTHKHN) * XABBTHKVN) * XABBDensity * XABBL / 1000000000;
                                                    let XABBB = XABBWN - 2 * XABBTHKVN + 2 * XABBC2 + 2 * XABBCV1;
                                                    let XABBEY1 = (2 * XABBTHKVE * XABBHE * XABBHE + XABBB * XABBTHKHE * XABBTHKHE) / (2 * (2 * XABBTHKVE * XABBHE + XABBB * XABBTHKHE));
                                                    let XABBEY2 = XABBHE - XABBEY1;
                                                    let XABBS = XABBEY1 - XABBTHKHE;

                                                    let XABBJ = (XABBWE * Math.pow(XABBEY1, 3) - XABBB * Math.pow(XABBS, 3) + 2 * XABBTHKVE * Math.pow(XABBEY2, 3)) / 3;
                                                    let XABBW = XABBJ / Math.max(XABBEY1, XABBEY2);
                                                    let XABBOALLOW = Math.min(XABBOH, XABBOV);
                                                    let XABBOTALLOW = Math.min(XABBOHT, XABBOVT);
                                                    let XABBRTEL = Math.min(XABBRHTEL, XABBRVTEL);

                                                    // 操作状态应力校核
                                                    let XABBQ1 = XABBM1 * XABBG / XABBL;
                                                    let XABBQ2 = XABBM2 * XABBG / XABBL;
                                                    let XABBQ3 = XABBM3 * XABBG / XABBL;
                                                    let XABBQ4 = XABBM4 * XABBG / XABBL;
                                                    let XABBQ = (XABBQ1 + XABBQ2 + XABBQ3) / (XABBK * XABBN) + XABBQ4;
                                                    let XABBMTMAX = XABBQ * XABBL * XABBL / 8;
                                                    let XABBOT = XABBMTMAX / XABBW;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "操作工况强度限制的许用应力：" + XABBOTALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABBOTCHK;
                                                    if (XABBOT <= XABBOTALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABBOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABBOTCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABBOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABBOTCHK = "不合格";
                                                    }

                                                    // 操作状态挠度校核
                                                    let XABBY = 5 * XABBQ * Math.pow(XABBL, 4) / (384 * XABBET * XABBJ);
                                                    let XABBYALLOW;
                                                    if (XABBL <= 3000) {
                                                        XABBYALLOW = 3;
                                                    } else if (XABBL > 3000 && XABBL <= 6000) {
                                                        XABBYALLOW = 5;
                                                    } else if (XABBL > 6000) {
                                                        XABBYALLOW = 6;
                                                    }
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "操作工况支承梁许用挠度：" + XABBYALLOW.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let XABBYCHK;
                                                    if (XABBY <= XABBYALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABBY.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABBYCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABBY.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABBYCHK = "不合格";
                                                    }

                                                    // 操作工况稳定性校核
                                                    let XABBLT = XABBWE - XABBTHKVE + 2 * XABBHE - XABBTHKHE;
                                                    let XABBTHKM = XABBTHKHE * (XABBWE - XABBTHKVE) / XABBLT + XABBTHKVE * (2 * XABBHE - XABBTHKHE) / XABBLT;
                                                    let XABBEB = 570 * (XABBHE - XABBTHKHE) * XABBTHKM / (XABBL * XABBWE) * 235 / XABBRTEL;
                                                    let XABBE;
                                                    if (XABBEB <= 0.6) {
                                                        XABBE = XABBEB;
                                                    }
                                                    else if (XABBEB > 0.6) {
                                                        XABBE = 1.07 - 0.282 / XABBEB;
                                                    }
                                                    let XABBOBT = XABBMTMAX / (XABBE * XABBW);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "操作工况稳定性限制的许用应力：" + XABBOTALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABBOBTCHK;
                                                    if (XABBOBT <= XABBOTALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABBOBT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABBOBTCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABBOBT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABBOBTCHK = "不合格";
                                                    }

                                                    // 安装、检修工况
                                                    let XABBF, XABBMMAX;
                                                    if (XABBL <= 2000) {
                                                        XABBF = 1350;
                                                        XABBMMAX = (XABBQ3 / (XABBK * XABBN) + XABBQ4) * XABBL * XABBL / 8 + XABBF * XABBL / 4;
                                                    }
                                                    else if (XABBL > 2000) {
                                                        XABBF = 1000;
                                                        XABBMMAX = (XABBQ3 / (XABBK * XABBN) + XABBQ4) * XABBL * XABBL / 8 + XABBF * XABBL / 3;
                                                    }
                                                    let XABBO = XABBMMAX / XABBW;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "安装/检修工况许用应力：" + XABBOALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABBOCHK;
                                                    if (XABBO <= XABBOALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABBO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABBOCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABBO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABBOCHK = "不合格";
                                                    }

                                                    // docx
                                                    let XABBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "xabbdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "XABB",

                                                                t: XABBDT,
                                                                m1: XABBM1,
                                                                m2: XABBM2,
                                                                m3: XABBM3,
                                                                std: XABBSTDVal,
                                                                name: XABBNameVal,
                                                                c2: XABBC2,

                                                                thkhn: XABBTHKHN,
                                                                thkvn: XABBTHKVN,
                                                                wn: XABBWN,
                                                                h: XABBH,
                                                                l: XABBL,

                                                                n: XABBN.toFixed(0),

                                                                ch1: XABBCH1.toFixed(4),
                                                                oh: XABBOH.toFixed(4),
                                                                oht: XABBOHT.toFixed(4),
                                                                rhtel: XABBRHTEL.toFixed(4),
                                                                density: XABBDensity.toFixed(4),
                                                                cv1: XABBCV1.toFixed(4),
                                                                ov: XABBOV.toFixed(4),
                                                                ovt: XABBOVT.toFixed(4),
                                                                rvtel: XABBRVTEL.toFixed(4),
                                                                et: (XABBET / 1000).toFixed(4),

                                                                k: XABBK.toFixed(2),
                                                                g: XABBG.toFixed(4),
                                                                ch: XABBCH.toFixed(4),
                                                                thkhe: XABBTHKHE.toFixed(4),
                                                                cv: XABBCV.toFixed(4),
                                                                thkve: XABBTHKVE.toFixed(4),
                                                                we: XABBWE.toFixed(4),
                                                                he: XABBHE.toFixed(4),
                                                                m4: XABBM4.toFixed(4),
                                                                b: XABBB.toFixed(4),
                                                                ey1: XABBEY1.toFixed(4),
                                                                ey2: XABBEY2.toFixed(4),
                                                                s: XABBS.toFixed(4),
                                                                j: XABBJ.toFixed(4),
                                                                w: XABBW.toFixed(4),
                                                                oallow: XABBOALLOW.toFixed(4),
                                                                otallow: XABBOTALLOW.toFixed(4),
                                                                rtel: XABBRTEL.toFixed(4),

                                                                q1: XABBQ1.toFixed(4),
                                                                q2: XABBQ2.toFixed(4),
                                                                q3: XABBQ3.toFixed(4),
                                                                q4: XABBQ4.toFixed(4),
                                                                q: XABBQ.toFixed(4),
                                                                mtmax: XABBMTMAX.toFixed(4),
                                                                ot: XABBOT.toFixed(4),
                                                                otchk: XABBOTCHK,
                                                                y: XABBY.toFixed(4),
                                                                yallow: XABBYALLOW.toFixed(4),
                                                                ychk: XABBYCHK,

                                                                lt: XABBLT.toFixed(4),
                                                                thkm: XABBTHKM.toFixed(4),
                                                                eb: XABBEB.toFixed(4),
                                                                e: XABBE.toFixed(4),
                                                                obt: XABBOBT.toFixed(4),
                                                                obtchk: XABBOBTCHK,

                                                                f: XABBF.toFixed(4),
                                                                mmax: XABBMMAX.toFixed(4),
                                                                o: XABBO.toFixed(4),
                                                                ochk: XABBOCHK
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
                                                                    XABBPayJS.dialog({
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
                                                                                XABBPayJS.dialog("close");
                                                                                XABBPayJS.dialog("clear");
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
                                                                                            XABBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    XABBPayJS.dialog('close');
                                                                                                    XABBPayJS.dialog('clear');
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