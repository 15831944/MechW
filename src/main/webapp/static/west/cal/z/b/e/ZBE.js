$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let zbeSketch = $("#d2");
    let zbeModel = $("#d3");
    let zbed2d3 = $('#d2d3');

    $("#cal").html("<table id='zbe'></table>");
    let pg = $("#zbe");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/z/b/e/ZBE.json", function (result) {

        let columns, rows;

        function zbe2d(m = "m", n = "n", c = "c", d = "d",
                       ex1 = "ex1", ex2 = "ex2", ey1 = "ey1", ey2 = "ey2",
                       b2 = "(n-d)/2") {

            zbeSketch.empty();
            let width = zbeSketch.width();
            let height = zbeSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ZBESVG").attr("height", height);
            let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
            let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);
            let line = d3.line().x(function (d) {
                return xScale(d.x);
            }).y(function (d) {
                return yScale(d.y);
            });

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

            // 图形边距
            let padding = 80;

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 16;

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding},
                {x: padding + wg + thk, y: padding},
                {x: padding + wg + thk, y: height / 2 - thk / 2},
                {x: padding + 3 * wg, y: height / 2 - thk / 2},
                {x: padding + 3 * wg, y: height / 2 + thk / 2},
                {x: padding + wg + thk, y: height / 2 + thk / 2},
                {x: padding + wg + thk, y: height - padding},
                {x: padding + wg, y: height - padding},
                {x: padding + wg, y: padding}
            ])).classed("sketch", true);

            drawCenterLine(padding + wg - 10, height / 2, padding + 3 * wg + 10, height / 2);
            drawCenterLine(padding + 1.5 * wg, padding + 10, padding + 1.5 * wg, height - padding + 10);
            let cx = padding + 1.5 * wg;
            let cy = height / 2;

            svg.append("path").attr("d", "M "
                + cx + " " + (cy + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cx + " " + (cy - 2)
            ).classed("arrow sketch", true);
            svg.append("path").attr("d", "M "
                + cx + " " + (cy - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cx + " " + (cy + 2)
            ).classed("arrow sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - 10 - 10, y: padding + 2 * hg},
                {x: padding + wg - 10, y: padding + 2 * hg}
            ])).attr("id", "ZBESketchX1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBESketchX1").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 10, y: padding + 2 * hg},
                {x: padding + 3 * wg + 10 + 10, y: padding + 2 * hg}
            ])).attr("id", "ZBESketchX2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBESketchX2").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 4, y: padding + 5},
                {x: padding + 1.5 * wg + 4, y: padding + 5}
            ])).attr("id", "ZBESketchY1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBESketchY1").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 4, y: padding + 4 * hg + 10},
                {x: padding + 1.5 * wg + 4, y: padding + 4 * hg + 10}
            ])).attr("id", "ZBESketchY2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 10).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBESketchY2").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 10, y: padding + 2 * hg},
                {x: padding + 1.5 * wg, y: padding + 2 * hg}
            ])).attr("id", "ZBESketchS");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBESketchS").attr("startOffset", "50%").text("S");

            // b2
            dimLeftV(padding + wg, height / 2 - thk / 2, padding + wg, padding, b2, "ZBESketchB21");
            dimLeftV(padding + wg, height - padding, padding + wg, height / 2 + thk / 2, b2, "ZBESketchB22");
            svg.append("path").attr("d", line([
                {x: padding + wg - 3, y: height / 2 - thk / 2},
                {x: padding + wg + thk - 3, y: height / 2 - thk / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 3, y: height / 2 + thk / 2},
                {x: padding + wg + thk - 3, y: height / 2 + thk / 2}
            ])).classed("sketch", true);

            // n
            dimLeftV(padding + wg - 40 + 3, height - padding, padding + wg - 40 + 3, padding, n, "ZBESketchN");

            // M
            dimBottomH(padding + wg + thk, height - padding, padding + 3 * wg, height - padding, m, "ZBESketchM");
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height / 2 + thk / 2 + 3},
                {x: padding + 3 * wg, y: height - padding + 3}
            ])).classed("sketch", true);

            // c
            svg.append("path").attr("d", line([
                {x: padding + wg, y: height - padding + 3},
                {x: padding + wg, y: height - padding + 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: height - padding + 30},
                {x: padding + wg + thk, y: height - padding + 30}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: height - padding + 30},
                    {x: padding + wg - 15, y: height - padding + 30 + 3},
                    {x: padding + wg - 15, y: height - padding + 30 - 3},
                    {x: padding + wg, y: height - padding + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - 15 - 40, y: height - padding + 30},
                {x: padding + wg - 15, y: height - padding + 30}
            ])).classed("sketch", true).attr("id", "ZBESketchC");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBESketchC").attr("startOffset", "50%").text(c);

            // ex1 ex2
            dimRightV(padding + wg + thk, height / 2, padding + wg + thk, padding, ex1, "ZBESketchEX1");
            dimRightV(padding + wg + thk, height - padding, padding + wg + thk, height / 2, ex2, "ZBESketchEX2");

            // ey1 ey2
            dimTopH(padding + wg, padding, padding + 1.5 * wg, padding, ey1, "ZBESketchEY1");
            dimTopH(padding + 1.5 * wg, padding, padding + 3 * wg, padding, ey2, "ZBESketchEY2");
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding - 3},
                {x: padding + 3 * wg, y: height / 2 - thk / 2 - 3}
            ])).classed("sketch", true);

            // d
            extLineRightH(padding + 3 * wg, height / 2 - thk / 2);
            extLineRightH(padding + 3 * wg, height / 2 + thk / 2);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: height / 2 - thk / 2 - 15 - 10},
                {x: padding + 3 * wg + 30, y: height / 2 + thk / 2}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: height / 2 - thk / 2},
                    {x: padding + 3 * wg + 30 + 3, y: height / 2 - thk / 2 - 15},
                    {x: padding + 3 * wg + 30 - 3, y: height / 2 - thk / 2 - 15},
                    {x: padding + 3 * wg + 30, y: height / 2 - thk / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: height / 2 + thk / 2},
                    {x: padding + 3 * wg + 30 + 3, y: height / 2 + thk / 2 + 15},
                    {x: padding + 3 * wg + 30 - 3, y: height / 2 + thk / 2 + 15},
                    {x: padding + 3 * wg + 30, y: height / 2 + thk / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: height / 2 + thk / 2 + 15 + 40},
                {x: padding + 3 * wg + 30, y: height / 2 + thk / 2 + 15}
            ])).attr("id", "ZBESketchD").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBESketchD").attr("startOffset", "50%").text(d);
        }

        currentTabIndex = zbed2d3.tabs('getTabIndex', zbed2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            zbe2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#zbe").length > 0) {
                    zbe2d();
                }
            });
        }
        zbed2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    zbe2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#zbe").length > 0) {
                            zbe2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "截面力学特性计算",
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
                    zbeSketch.empty();
                    zbeModel.empty();

                    // sketch
                    currentTabIndex = zbed2d3.tabs('getTabIndex', zbed2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        zbe2d();
                        zbeSketch.off("resize").on("resize", function () {
                            if ($("#zbe").length > 0) {
                                zbe2d();
                            }
                        });
                    }
                    zbed2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zbe2d();
                                zbeSketch.off("resize").on("resize", function () {
                                    if ($("#zbe").length > 0) {
                                        zbe2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // M
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        let ZBEM = parseFloat(rows[0][columns[0][1].field]);

                        // Sketch
                        if (currentTabIndex === 0) {
                            zbe2d(ZBEM);
                            zbeSketch.off("resize").on("resize", function () {
                                if ($("#zbe").length > 0) {
                                    zbe2d(ZBEM);
                                }
                            });
                        }
                        zbed2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    zbe2d(ZBEM);
                                    zbeSketch.off("resize").on("resize", function () {
                                        if ($("#zbe").length > 0) {
                                            zbe2d(ZBEM);
                                        }
                                    });
                                }
                            }
                        });

                        // N
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let ZBEN = parseFloat(rows[1][columns[0][1].field]);

                            // Sketch
                            if (currentTabIndex === 0) {
                                zbe2d(ZBEM, ZBEN);
                                zbeSketch.off("resize").on("resize", function () {
                                    if ($("#zbe").length > 0) {
                                        zbe2d(ZBEM, ZBEN);
                                    }
                                });
                            }
                            zbed2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        zbe2d(ZBEM, ZBEN);
                                        zbeSketch.off("resize").on("resize", function () {
                                            if ($("#zbe").length > 0) {
                                                zbe2d(ZBEM, ZBEN);
                                            }
                                        });
                                    }
                                }
                            });

                            // c
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let ZBEC = parseFloat(rows[2][columns[0][1].field]);

                                // Sketch
                                if (currentTabIndex === 0) {
                                    zbe2d(ZBEM, ZBEN, ZBEC);
                                    zbeSketch.off("resize").on("resize", function () {
                                        if ($("#zbe").length > 0) {
                                            zbe2d(ZBEM, ZBEN, ZBEC);
                                        }
                                    });
                                }
                                zbed2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            zbe2d(ZBEM, ZBEN, ZBEC);
                                            zbeSketch.off("resize").on("resize", function () {
                                                if ($("#zbe").length > 0) {
                                                    zbe2d(ZBEM, ZBEN, ZBEC);
                                                }
                                            });
                                        }
                                    }
                                });

                                // D
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                                    && parseFloat(rows[3][columns[0][1].field]) <= ZBEN) {
                                    let ZBED = parseFloat(rows[3][columns[0][1].field]);

                                    let ZBEK = ZBEM + ZBEC;
                                    let ZBEB = ZBEN - ZBED;
                                    let ZBEA = ZBEM * ZBED + ZBEN * ZBEC;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "截面积 A = " + ZBEA.toFixed(2) + " mm²" +
                                        "</span>");

                                    // X
                                    let ZBEEX1 = ZBEN / 2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 x 轴外边距离 e<sub>x1</sub> = " + ZBEEX1.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBEEX2 = ZBEN - ZBEEX1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 x 轴外边距离 e<sub>x2</sub> = " + ZBEEX2.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBEIX = (ZBEC * ZBEN * ZBEN * ZBEN + ZBEM * ZBED * ZBED * ZBED) / 12;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴惯性矩 I<sub>x</sub> = " + ZBEIX.toFixed(2) + " mm⁴" +
                                        "</span>");

                                    let ZBEWX1 = ZBEIX / ZBEEX1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴抗弯截面系数 W<sub>x1</sub> = " + ZBEWX1.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBEWX2 = ZBEIX / ZBEEX2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴抗弯截面系数 W<sub>x2</sub> = " + ZBEWX2.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBERX = Math.sqrt(ZBEIX / ZBEA);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴惯性半径 r<sub>x</sub> = " + ZBERX.toFixed(2) + " mm" +
                                        "</span>");

                                    // Y
                                    let ZBEEY1 = (ZBED * ZBEK * ZBEK + ZBEB * ZBEC * ZBEC) / (2 * (ZBED * ZBEK + ZBEB * ZBEC));
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 y 轴外边距离 e<sub>y1</sub> = " + ZBEEY1.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBEEY2 = ZBEK - ZBEEY1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 y 轴外边距离 e<sub>y2</sub> = " + ZBEEY2.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBES = ZBEEY1 - ZBEC;
                                    let ZBEIY = (ZBEN * ZBEEY1 * ZBEEY1 * ZBEEY1 - ZBEB * ZBES * ZBES * ZBES + ZBED * ZBEEY2 * ZBEEY2 * ZBEEY2) / 3;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴惯性矩 I<sub>y</sub> = " + ZBEIY.toFixed(2) + " mm⁴" +
                                        "</span>");

                                    let ZBEWY1 = ZBEIY / ZBEEY1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴抗弯截面系数 W<sub>y1</sub> = " + ZBEWY1.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBEWY2 = ZBEIY / ZBEEY2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴抗弯截面系数 W<sub>y2</sub> = " + ZBEWY2.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBERY = Math.sqrt(ZBEIY / ZBEA);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴惯性半径 r<sub>y</sub> = " + ZBERY.toFixed(2) + " mm" +
                                        "</span>");

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        zbe2d(ZBEM, ZBEN, ZBEC, ZBED, ZBEEX1.toFixed(2), ZBEEX2.toFixed(2), ZBEEY1.toFixed(2), ZBEEY2.toFixed(2), (ZBEN - ZBED) / 2);
                                        zbeSketch.off("resize").on("resize", function () {
                                            if ($("#zbe").length > 0) {
                                                zbe2d(ZBEM, ZBEN, ZBEC, ZBED, ZBEEX1.toFixed(2), ZBEEX2.toFixed(2), ZBEEY1.toFixed(2), ZBEEY2.toFixed(2), (ZBEN - ZBED) / 2);
                                            }
                                        });
                                    }
                                    zbed2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                zbe2d(ZBEM, ZBEN, ZBEC, ZBED, ZBEEX1.toFixed(2), ZBEEX2.toFixed(2), ZBEEY1.toFixed(2), ZBEEY2.toFixed(2), (ZBEN - ZBED) / 2);
                                                zbeSketch.off("resize").on("resize", function () {
                                                    if ($("#zbe").length > 0) {
                                                        zbe2d(ZBEM, ZBEN, ZBEC, ZBED, ZBEEX1.toFixed(2), ZBEEX2.toFixed(2), ZBEEY1.toFixed(2), ZBEEY2.toFixed(2), (ZBEN - ZBED) / 2);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // docx
                                    let ZBEPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "zbedocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "ZBE",

                                                m: ZBEM,
                                                n: ZBEN,
                                                c: ZBEC,
                                                d: ZBED,
                                                k: ZBEK.toFixed(4),
                                                b: ZBEB.toFixed(4),
                                                s: ZBES.toFixed(4),
                                                a: ZBEA.toFixed(4),
                                                ex1: ZBEEX1.toFixed(4),
                                                ex2: ZBEEX2.toFixed(4),
                                                ix: ZBEIX.toFixed(4),
                                                wx1: ZBEWX1.toFixed(4),
                                                wx2: ZBEWX2.toFixed(4),
                                                rx: ZBERX.toFixed(4),
                                                ey1: ZBEEY1.toFixed(4),
                                                ey2: ZBEEY2.toFixed(4),
                                                iy: ZBEIY.toFixed(4),
                                                wy1: ZBEWY1.toFixed(4),
                                                wy2: ZBEWY2.toFixed(4),
                                                ry: ZBERY.toFixed(4)
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
                                                    ZBEPayJS.dialog({
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
                                                                ZBEPayJS.dialog("close");
                                                                ZBEPayJS.dialog("clear");
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
                                                                            ZBEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    ZBEPayJS.dialog('close');
                                                                                    ZBEPayJS.dialog('clear');
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
                                else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                                    && parseFloat(rows[3][columns[0][1].field]) > ZBEN) {
                                    south.html("厚度 d 不能大于 " + ZBEN + " mm").css("color", "red");
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