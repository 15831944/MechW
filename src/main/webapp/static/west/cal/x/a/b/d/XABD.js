$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xabdSketch = $("#d2");
    let xabdModel = $("#d3");
    let xabdd2d3 = $('#d2d3');

    $("#cal").html("<table id='xabd'></table>");
    let pg = $("#xabd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/a/b/d/XABD.json", function (result) {

        let XABDDT,
            XABDCategory, XABDCategoryVal, XABDType, XABDTypeVal, XABDSTD, XABDSTDVal, XABDName, XABDNameVal,
            columns, rows, ed;

        function xabd2d(thkhn = "δhn", thkvn = "δvn", wn = "Wn", h = "H", l = "L") {

            xabdSketch.empty();
            let width = xabdSketch.width();
            let height = xabdSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XABDSVG").attr("height", height);

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
            dimTopH(padding + wg, padding + hg, width - padding - wg, padding + hg, l, "XABDSketchL");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: padding + 3 * hg},
                {x: width - padding - 3 * wg, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + thk, y: height - padding - thk},
                {x: width - padding - 3 * wg, y: height - padding - thk},
                {x: width - padding - 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: height - padding}
            ])).classed("sketch", true);
            drawCenterLine(padding + 3 * wg - 10, padding + 4.5 * hg, width - padding - 3 * wg + 10, padding + 4.5 * hg);

            // WN
            dimBottomH(padding + 3 * wg, height - padding, width - padding - 3 * wg, height - padding, wn, "XABDSketchWN");

            // H
            dimRightV(padding + 5 * wg, height - padding, padding + 5 * wg, height - padding - 3 * hg, h, "XABDSketchH");

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
            ])).attr("id", "XABDSketchTHKVN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABDSketchTHKVN").attr("startOffset", "50%").text(thkvn);

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
                {x: padding + 3 * wg - 30, y: height / 2 - 15 - 40}
            ])).attr("id", "XABDSketchTHKHN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABDSketchTHKHN1").attr("startOffset", "50%").text(thkhn);

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
                {x: padding + 3 * wg - 30, y: height - padding},
                {x: padding + 3 * wg - 30, y: height - padding - thk - 15 - 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 3, y: height - padding - thk},
                {x: padding + 3 * wg + thk - 3, y: height - padding - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 30, y: height - padding + 15 + 40},
                {x: padding + 3 * wg - 30, y: height - padding + 15}
            ])).attr("id", "XABDSketchTHKHN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XABDSketchTHKHN2").attr("startOffset", "50%").text(thkhn);

        }

        currentTabIndex = xabdd2d3.tabs('getTabIndex', xabdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xabd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xabd").length > 0) {
                    xabd2d();
                }
            });
        }
        xabdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xabd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xabd").length > 0) {
                            xabd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "SH/T 3098-2011 拼焊槽形填料支承梁校核",
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
                    $(ed.target).combobox("loadData", XABDCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", XABDType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", XABDSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", XABDName);
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
                    xabdSketch.empty();
                    xabdModel.empty();

                    // sketch
                    currentTabIndex = xabdd2d3.tabs('getTabIndex', xabdd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        xabd2d();
                        xabdSketch.off("resize").on("resize", function () {
                            if ($("#xabd").length > 0) {
                                xabd2d();
                            }
                        });
                    }
                    xabdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xabd2d();
                                xabdSketch.off("resize").on("resize", function () {
                                    if ($("#xabd").length > 0) {
                                        xabd2d();
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

                        XABDDT = parseFloat(changes.value);

                        // reset category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XABDCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABDType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABDSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABDName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XABDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABDCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XABDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XABDCategory[index] = {
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

                        XABDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XABDType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABDSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABDCategoryVal,
                                temp: XABDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABDType = [];
                                $(result).each(function (index, element) {
                                    XABDType[index] = {
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

                        XABDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XABDSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABDCategoryVal,
                                type: XABDTypeVal,
                                temp: XABDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABDSTD = [];
                                $(result).each(function (index, element) {
                                    XABDSTD[index] = {
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

                        XABDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XABDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XABDCategoryVal,
                                type: XABDTypeVal,
                                std: XABDSTDVal,
                                temp: XABDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XABDName = [];
                                $(result).each(function (index, element) {
                                    XABDName[index] = {
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
                        let XABDM1;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XABDM1 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 持液量 M2
                        let XABDM2;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XABDM2 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 格栅质量 M3
                        let XABDM3;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            XABDM3 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XABDNameVal = rows[7][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XABDDensity, XABDThkMin, XABDThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XABDCategoryVal,
                                    "type": XABDTypeVal,
                                    "std": XABDSTDVal,
                                    "name": XABDNameVal,
                                    "temp": XABDDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XABDDensity = parseFloat(result.density);
                                    XABDThkMin = parseFloat(result.thkMin);
                                    XABDThkMax = parseFloat(result.thkMax);

                                    // 腐蚀裕量
                                    let XABDC2;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) < XABDThkMax / 2) {
                                        XABDC2 = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) >= XABDThkMax / 2) {
                                        south.html("支承梁腐蚀裕量不能大于等于 " + XABDThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 横板名义厚度
                                    let XABDTHKHN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > Math.max(2 * XABDC2, XABDThkMin)
                                        && parseFloat(rows[9][columns[0][1].field]) <= XABDThkMax) {
                                        XABDTHKHN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.max(2 * XABDC2, XABDThkMin)) {
                                        south.html("横板名义厚度 δhn 不能小于等于 " + Math.max(2 * XABDC2, XABDThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > XABDThkMax) {
                                        south.html("横板名义厚度 δhn 不能大于 " + XABDThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xabd2d(XABDTHKHN);
                                        xabdSketch.off("resize").on("resize", function () {
                                            if ($("#xabd").length > 0) {
                                                xabd2d(XABDTHKHN);
                                            }
                                        });
                                    }
                                    xabdd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xabd2d(XABDTHKHN);
                                                xabdSketch.off("resize").on("resize", function () {
                                                    if ($("#xabd").length > 0) {
                                                        xabd2d(XABDTHKHN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    let XABDOH, XABDOHT, XABDRHTEL, XABDCH1, XABDEHT;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XABDCategoryVal,
                                            "type": XABDTypeVal,
                                            "std": XABDSTDVal,
                                            "name": XABDNameVal,
                                            "thk": XABDTHKHN,
                                            "temp": XABDDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 1000000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XABDOH = parseFloat(result.o);
                                            if (XABDOH < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABDOHT = parseFloat(result.ot);
                                            if (XABDOHT < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }

                                            XABDRHTEL = parseFloat(result.relt);
                                            if (XABDRHTEL < 0) {
                                                south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }

                                            XABDCH1 = parseFloat(result.c1);
                                            if (XABDCH1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            XABDEHT = 1000 * parseFloat(result.et);
                                            if (XABDEHT < 0) {
                                                south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // 竖板名义厚度
                                            let XABDTHKVN;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > Math.max(2 * XABDC2, XABDThkMin)
                                                && parseFloat(rows[10][columns[0][1].field]) <= XABDThkMax) {
                                                XABDTHKVN = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) <= Math.max(2 * XABDC2, XABDThkMin)) {
                                                south.html("竖板名义厚度 δvn 不能小于等于 " + Math.max(2 * XABDC2, XABDThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) > XABDThkMax) {
                                                south.html("竖板名义厚度 δvn 不能大于 " + XABDThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xabd2d(XABDTHKHN, XABDTHKVN);
                                                xabdSketch.off("resize").on("resize", function () {
                                                    if ($("#xabd").length > 0) {
                                                        xabd2d(XABDTHKHN, XABDTHKVN);
                                                    }
                                                });
                                            }
                                            xabdd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xabd2d(XABDTHKHN, XABDTHKVN);
                                                        xabdSketch.off("resize").on("resize", function () {
                                                            if ($("#xabd").length > 0) {
                                                                xabd2d(XABDTHKHN, XABDTHKVN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let XABDOV, XABDOVT, XABDRVTEL, XABDCV1, XABDEVT;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_relt_et_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XABDCategoryVal,
                                                    "type": XABDTypeVal,
                                                    "std": XABDSTDVal,
                                                    "name": XABDNameVal,
                                                    "thk": XABDTHKVN,
                                                    "temp": XABDDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 1000000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XABDOV = parseFloat(result.o);
                                                    if (XABDOV < 0) {
                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABDOVT = parseFloat(result.ot);
                                                    if (XABDOVT < 0) {
                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABDRVTEL = parseFloat(result.relt);
                                                    if (XABDRVTEL < 0) {
                                                        south.html("查询材料设计温度屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABDCV1 = parseFloat(result.c1);
                                                    if (XABDCV1 < 0) {
                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    XABDEVT = 1000 * parseFloat(result.et);
                                                    if (XABDEVT < 0) {
                                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // WN
                                                    let XABDWN;
                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) >= XABDTHKVN) {
                                                        XABDWN = parseFloat(rows[11][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                        && parseFloat(rows[11][columns[0][1].field]) < XABDTHKVN) {
                                                        south.html("支承梁宽度 Wn 不能小于 " + XABDTHKVN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabd2d(XABDTHKHN, XABDTHKVN, XABDWN);
                                                        xabdSketch.off("resize").on("resize", function () {
                                                            if ($("#xabd").length > 0) {
                                                                xabd2d(XABDTHKHN, XABDTHKVN, XABDWN);
                                                            }
                                                        });
                                                    }
                                                    xabdd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabd2d(XABDTHKHN, XABDTHKVN, XABDWN);
                                                                xabdSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabd").length > 0) {
                                                                        xabd2d(XABDTHKHN, XABDTHKVN, XABDWN);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // H
                                                    let XABDH;
                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) >= 2 * XABDTHKHN) {
                                                        XABDH = parseFloat(rows[12][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                        && parseFloat(rows[12][columns[0][1].field]) < 2 * XABDTHKHN) {
                                                        south.html("支承梁高度 Hn 不能小于 " + 2 * XABDTHKHN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH);
                                                        xabdSketch.off("resize").on("resize", function () {
                                                            if ($("#xabd").length > 0) {
                                                                xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH);
                                                            }
                                                        });
                                                    }
                                                    xabdd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH);
                                                                xabdSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabd").length > 0) {
                                                                        xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // L
                                                    let XABDL;
                                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                        XABDL = parseFloat(rows[13][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH, XABDL);
                                                        xabdSketch.off("resize").on("resize", function () {
                                                            if ($("#xabd").length > 0) {
                                                                xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH, XABDL);
                                                            }
                                                        });
                                                    }
                                                    xabdd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH, XABDL);
                                                                xabdSketch.off("resize").on("resize", function () {
                                                                    if ($("#xabd").length > 0) {
                                                                        xabd2d(XABDTHKHN, XABDTHKVN, XABDWN, XABDH, XABDL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // n
                                                    let XABDN;
                                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                        XABDN = parseFloat(rows[14][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let XABDET = (XABDEHT + XABDEVT) / 2;

                                                    // 过程参数
                                                    let XABDG = 9.8;
                                                    let XABDK;
                                                    if (XABDN <= 2) {
                                                        XABDK = 1.0;
                                                    }
                                                    else {
                                                        XABDK = 0.83;
                                                    }
                                                    let XABDCH = 2 * XABDC2 + XABDCH1;
                                                    let XABDTHKHE = XABDTHKHN - XABDCH;
                                                    let XABDCV = 2 * XABDC2 + XABDCV1;
                                                    let XABDTHKVE = XABDTHKVN - XABDCV;
                                                    let XABDWE = XABDWN - 2 * XABDC2 - XABDCV1;
                                                    let XABDHE = XABDH - 2 * XABDC2;

                                                    let XABDM4 = (2 * XABDWN * XABDTHKHN + (XABDH - 2 * XABDTHKHN) * XABDTHKVN) * XABDDensity * XABDL / 1000000000;
                                                    let XABDB = XABDHE - 2 * XABDTHKHE;
                                                    let XABDEX1 = XABDHE / 2;
                                                    let XABDEX2 = XABDHE - XABDEX1;

                                                    let XABDJ = (XABDWE * Math.pow(XABDHE, 3) - (XABDWE - XABDTHKVE) * Math.pow(XABDB, 3)) / 12;
                                                    let XABDW = XABDJ / Math.max(XABDEX1, XABDEX2);
                                                    let XABDOALLOW = Math.min(XABDOH, XABDOV);
                                                    let XABDOTALLOW = Math.min(XABDOHT, XABDOVT);
                                                    let XABDRTEL = Math.min(XABDRHTEL, XABDRVTEL);

                                                    // 操作状态应力校核
                                                    let XABDQ1 = XABDM1 * XABDG / XABDL;
                                                    let XABDQ2 = XABDM2 * XABDG / XABDL;
                                                    let XABDQ3 = XABDM3 * XABDG / XABDL;
                                                    let XABDQ4 = XABDM4 * XABDG / XABDL;
                                                    let XABDQ = (XABDQ1 + XABDQ2 + XABDQ3) / (XABDK * XABDN) + XABDQ4;
                                                    let XABDMTMAX = XABDQ * XABDL * XABDL / 8;
                                                    let XABDOT = XABDMTMAX / XABDW;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "操作工况强度限制的许用应力：" + XABDOTALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABDOTCHK;
                                                    if (XABDOT <= XABDOTALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABDOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABDOTCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABDOT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABDOTCHK = "不合格";
                                                    }

                                                    // 操作状态挠度校核
                                                    let XABDY = 5 * XABDQ * Math.pow(XABDL, 4) / (384 * XABDET * XABDJ);
                                                    let XABDYALLOW;
                                                    if (XABDL <= 3000) {
                                                        XABDYALLOW = 3;
                                                    } else if (XABDL > 3000 && XABDL <= 6000) {
                                                        XABDYALLOW = 5;
                                                    } else if (XABDL > 6000) {
                                                        XABDYALLOW = 6;
                                                    }
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "操作工况支承梁许用挠度：" + XABDYALLOW.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let XABDYCHK;
                                                    if (XABDY <= XABDYALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABDY.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABDYCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际挠度：" + XABDY.toFixed(2) + " mm" +
                                                            "</span>");
                                                        XABDYCHK = "不合格";
                                                    }

                                                    // 操作工况稳定性校核
                                                    let XABDLT = XABDHE - XABDTHKHE + 2 * XABDWE - XABDTHKVE;
                                                    let XABDTHKM = XABDTHKVE * (XABDHE - XABDTHKHE) / XABDLT + XABDTHKHE * (2 * XABDWE - XABDTHKVE) / XABDLT;
                                                    let XABDEB = 570 * (XABDWE - XABDTHKVE) * XABDTHKM / (XABDL * XABDHE) * 235 / XABDRTEL;
                                                    let XABDE;
                                                    if (XABDEB <= 0.6) {
                                                        XABDE = XABDEB;
                                                    }
                                                    else if (XABDEB > 0.6) {
                                                        XABDE = 1.07 - 0.282 / XABDEB;
                                                    }
                                                    let XABDOBT = XABDMTMAX / (XABDE * XABDW);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "操作工况稳定性限制的许用应力：" + XABDOTALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABDOBTCHK;
                                                    if (XABDOBT <= XABDOTALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABDOBT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABDOBTCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABDOBT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABDOBTCHK = "不合格";
                                                    }

                                                    // 安装、检修工况
                                                    let XABDF, XABDMMAX;
                                                    if (XABDL <= 2000) {
                                                        XABDF = 1350;
                                                        XABDMMAX = (XABDQ3 / (XABDK * XABDN) + XABDQ4) * XABDL * XABDL / 8 + XABDF * XABDL / 4;
                                                    }
                                                    else if (XABDL > 2000) {
                                                        XABDF = 1000;
                                                        XABDMMAX = (XABDQ3 / (XABDK * XABDN) + XABDQ4) * XABDL * XABDL / 8 + XABDF * XABDL / 3;
                                                    }
                                                    let XABDO = XABDMMAX / XABDW;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "安装/检修工况许用应力：" + XABDOALLOW.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let XABDOCHK;
                                                    if (XABDO <= XABDOALLOW) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABDO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABDOCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + XABDO.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        XABDOCHK = "不合格";
                                                    }

                                                    // docx
                                                    let XABDPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "xabddocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "XABD",

                                                                t: XABDDT,
                                                                m1: XABDM1,
                                                                m2: XABDM2,
                                                                m3: XABDM3,
                                                                std: XABDSTDVal,
                                                                name: XABDNameVal,
                                                                c2: XABDC2,

                                                                thkhn: XABDTHKHN,
                                                                thkvn: XABDTHKVN,
                                                                wn: XABDWN,
                                                                h: XABDH,
                                                                l: XABDL,

                                                                n: XABDN.toFixed(0),

                                                                ch1: XABDCH1.toFixed(4),
                                                                oh: XABDOH.toFixed(4),
                                                                oht: XABDOHT.toFixed(4),
                                                                rhtel: XABDRHTEL.toFixed(4),
                                                                density: XABDDensity.toFixed(4),
                                                                cv1: XABDCV1.toFixed(4),
                                                                ov: XABDOV.toFixed(4),
                                                                ovt: XABDOVT.toFixed(4),
                                                                rvtel: XABDRVTEL.toFixed(4),
                                                                et: (XABDET / 1000).toFixed(4),

                                                                k: XABDK.toFixed(2),
                                                                g: XABDG.toFixed(4),
                                                                ch: XABDCH.toFixed(4),
                                                                thkhe: XABDTHKHE.toFixed(4),
                                                                cv: XABDCV.toFixed(4),
                                                                thkve: XABDTHKVE.toFixed(4),
                                                                we: XABDWE.toFixed(4),
                                                                he: XABDHE.toFixed(4),
                                                                m4: XABDM4.toFixed(4),
                                                                b: XABDB.toFixed(4),
                                                                ex1: XABDEX1.toFixed(4),
                                                                ex2: XABDEX2.toFixed(4),
                                                                j: XABDJ.toFixed(4),
                                                                w: XABDW.toFixed(4),
                                                                oallow: XABDOALLOW.toFixed(4),
                                                                otallow: XABDOTALLOW.toFixed(4),
                                                                rtel: XABDRTEL.toFixed(4),

                                                                q1: XABDQ1.toFixed(4),
                                                                q2: XABDQ2.toFixed(4),
                                                                q3: XABDQ3.toFixed(4),
                                                                q4: XABDQ4.toFixed(4),
                                                                q: XABDQ.toFixed(4),
                                                                mtmax: XABDMTMAX.toFixed(4),
                                                                ot: XABDOT.toFixed(4),
                                                                otchk: XABDOTCHK,
                                                                y: XABDY.toFixed(4),
                                                                yallow: XABDYALLOW.toFixed(4),
                                                                ychk: XABDYCHK,

                                                                lt: XABDLT.toFixed(4),
                                                                thkm: XABDTHKM.toFixed(4),
                                                                eb: XABDEB.toFixed(4),
                                                                e: XABDE.toFixed(4),
                                                                obt: XABDOBT.toFixed(4),
                                                                obtchk: XABDOBTCHK,

                                                                f: XABDF.toFixed(4),
                                                                mmax: XABDMMAX.toFixed(4),
                                                                o: XABDO.toFixed(4),
                                                                ochk: XABDOCHK
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
                                                                    XABDPayJS.dialog({
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
                                                                                XABDPayJS.dialog("close");
                                                                                XABDPayJS.dialog("clear");
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
                                                                                            XABDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    XABDPayJS.dialog('close');
                                                                                                    XABDPayJS.dialog('clear');
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