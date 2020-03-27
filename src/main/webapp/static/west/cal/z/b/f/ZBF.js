$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let zbfSketch = $("#d2");
    let zbfModel = $("#d3");
    let zbfd2d3 = $('#d2d3');

    $("#cal").html("<table id='zbf'></table>");
    let pg = $("#zbf");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/z/b/f/ZBF.json", function (result) {

        let columns, rows;

        function zbf2d(m = "m", n = "n", c = "c", d = "d",
                       ex1 = "ex1", ex2 = "ex2", ey1 = "ey1", ey2 = "ey2") {

            zbfSketch.empty();
            let width = zbfSketch.width();
            let height = zbfSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ZBFSVG").attr("height", height);
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
                {x: padding + 3 * wg, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + wg, y: padding + 3 * hg},
                {x: padding + 3 * wg, y: padding + 3 * hg},
                {x: padding + 3 * wg, y: padding + 3 * hg - thk},
                {x: padding + wg + thk, y: padding + 3 * hg - thk},
                {x: padding + wg + thk, y: padding + hg + thk},
                {x: padding + 3 * wg, y: padding + hg + thk},
                {x: padding + 3 * wg, y: padding + hg}
            ])).classed("sketch", true);

            drawCenterLine(padding + wg - 10, height / 2, padding + 3 * wg + 10, height / 2);
            drawCenterLine(padding + 1.75 * wg, padding + hg - 10, padding + 1.75 * wg, height - padding - hg + 10);
            let cx = padding + 1.75 * wg;
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
            ])).attr("id", "ZBFSketchX1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchX1").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 10, y: padding + 2 * hg},
                {x: padding + 3 * wg + 10 + 10, y: padding + 2 * hg}
            ])).attr("id", "ZBFSketchX2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchX2").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 1.75 * wg - 4, y: padding + hg + 5},
                {x: padding + 1.75 * wg + 4, y: padding + hg + 5}
            ])).attr("id", "ZBFSketchY1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -20).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchY1").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 1.75 * wg - 4, y: padding + 3 * hg + 10},
                {x: padding + 1.75 * wg + 4, y: padding + 3 * hg + 10}
            ])).attr("id", "ZBFSketchY2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 10).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchY2").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 1.75 * wg - 10, y: padding + 2 * hg},
                {x: padding + 1.75 * wg, y: padding + 2 * hg}
            ])).attr("id", "ZBFSketchS");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchS").attr("startOffset", "50%").text("S");

            // M
            dimBottomH(padding + wg, height - padding - hg, padding + 3 * wg, height - padding - hg, m, "ZBFSketchM");

            // ex1 ex2
            dimLeftV(padding + wg - 20, height - padding - hg, padding + wg - 20, height / 2, ex1, "ZBFSketchEX1");
            dimLeftV(padding + wg - 20, height / 2, padding + wg - 20, padding + hg, ex2, "ZBFSketchEX2");
            svg.append("path").attr("d", line([
                {x: padding + wg - 3, y: height - padding - hg},
                {x: padding + wg - 23, y: height - padding - hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 3, y: padding + hg},
                {x: padding + wg - 23, y: padding + hg}
            ])).classed("sketch", true);

            // n
            dimLeftV(padding + wg - 40 - 20 + 3, height - padding - hg, padding + wg - 40 - 20 + 3, padding + hg, n, "ZBFSketchN");

            // c
            svg.append("path").attr("d", line([
                {x: padding + wg - 15 - 10, y: height / 2 + 0.5 * hg},
                {x: padding + wg + thk, y: height / 2 + 0.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: height / 2 + 0.5 * hg},
                    {x: padding + wg - 15, y: height / 2 + 0.5 * hg + 3},
                    {x: padding + wg - 15, y: height / 2 + 0.5 * hg - 3},
                    {x: padding + wg, y: height / 2 + 0.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg + thk, y: height / 2 + 0.5 * hg},
                    {x: padding + wg + thk + 15, y: height / 2 + 0.5 * hg + 3},
                    {x: padding + wg + thk + 15, y: height / 2 + 0.5 * hg - 3},
                    {x: padding + wg + thk, y: height / 2 + 0.5 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg + thk + 15, y: height / 2 + 0.5 * hg},
                {x: padding + wg + thk + 15 + 40, y: height / 2 + 0.5 * hg}
            ])).classed("sketch", true).attr("id", "ZBFSketchC");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchC").attr("startOffset", "50%").text(c);

            // ey1 ey2
            dimTopH(padding + wg, padding + hg - 20, padding + 1.75 * wg, padding + hg - 20, ey1, "ZBFSketchEY1");
            dimTopH(padding + 1.75 * wg, padding + hg - 20, padding + 3 * wg, padding + hg - 20, ey2, "ZBFSketchEY2");
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding + hg - 3},
                {x: padding + 3 * wg, y: padding + hg - 23}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg - 3},
                {x: padding + wg, y: padding + hg - 23}
            ])).classed("sketch", true);

            // d1
            extLineRightH(padding + 3 * wg, padding + hg);
            extLineRightH(padding + 3 * wg, padding + hg + thk);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding + hg},
                {x: padding + 3 * wg + 30, y: padding + hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: padding + hg},
                    {x: padding + 3 * wg + 30 + 3, y: padding + hg - 15},
                    {x: padding + 3 * wg + 30 - 3, y: padding + hg - 15},
                    {x: padding + 3 * wg + 30, y: padding + hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: padding + hg + thk},
                    {x: padding + 3 * wg + 30 + 3, y: padding + hg + thk + 15},
                    {x: padding + 3 * wg + 30 - 3, y: padding + hg + thk + 15},
                    {x: padding + 3 * wg + 30, y: padding + hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding + hg - 15},
                {x: padding + 3 * wg + 30, y: padding + hg - 15 - 40}
            ])).attr("id", "ZBFSketchD1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchD1").attr("startOffset", "50%").text(d);

            // d2
            extLineRightH(padding + 3 * wg, height - padding - hg);
            extLineRightH(padding + 3 * wg, height - padding - hg - thk);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: height - padding - hg},
                {x: padding + 3 * wg + 30, y: height - padding - hg - thk - 15 - 10}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: height - padding - hg - thk},
                    {x: padding + 3 * wg + 30 + 3, y: height - padding - hg - thk - 15},
                    {x: padding + 3 * wg + 30 - 3, y: height - padding - hg - thk - 15},
                    {x: padding + 3 * wg + 30, y: height - padding - hg - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: height - padding - hg},
                    {x: padding + 3 * wg + 30 + 3, y: height - padding - hg + 15},
                    {x: padding + 3 * wg + 30 - 3, y: height - padding - hg + 15},
                    {x: padding + 3 * wg + 30, y: height - padding - hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: height - padding - hg + 15 + 40},
                {x: padding + 3 * wg + 30, y: height - padding - hg + 15}
            ])).attr("id", "ZBFSketchD2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBFSketchD2").attr("startOffset", "50%").text(d);
        }

        currentTabIndex = zbfd2d3.tabs('getTabIndex', zbfd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            zbf2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#zbf").length > 0) {
                    zbf2d();
                }
            });
        }
        zbfd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    zbf2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#zbf").length > 0) {
                            zbf2d();
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
                    zbfSketch.empty();
                    zbfModel.empty();

                    // sketch
                    currentTabIndex = zbfd2d3.tabs('getTabIndex', zbfd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        zbf2d();
                        zbfSketch.off("resize").on("resize", function () {
                            if ($("#zbf").length > 0) {
                                zbf2d();
                            }
                        });
                    }
                    zbfd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zbf2d();
                                zbfSketch.off("resize").on("resize", function () {
                                    if ($("#zbf").length > 0) {
                                        zbf2d();
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
                        let ZBFM = parseFloat(rows[0][columns[0][1].field]);

                        // Sketch
                        if (currentTabIndex === 0) {
                            zbf2d(ZBFM);
                            zbfSketch.off("resize").on("resize", function () {
                                if ($("#zbf").length > 0) {
                                    zbf2d(ZBFM);
                                }
                            });
                        }
                        zbfd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    zbf2d(ZBFM);
                                    zbfSketch.off("resize").on("resize", function () {
                                        if ($("#zbf").length > 0) {
                                            zbf2d(ZBFM);
                                        }
                                    });
                                }
                            }
                        });

                        // N
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let ZBFN = parseFloat(rows[1][columns[0][1].field]);

                            // Sketch
                            if (currentTabIndex === 0) {
                                zbf2d(ZBFM, ZBFN);
                                zbfSketch.off("resize").on("resize", function () {
                                    if ($("#zbf").length > 0) {
                                        zbf2d(ZBFM, ZBFN);
                                    }
                                });
                            }
                            zbfd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        zbf2d(ZBFM, ZBFN);
                                        zbfSketch.off("resize").on("resize", function () {
                                            if ($("#zbf").length > 0) {
                                                zbf2d(ZBFM, ZBFN);
                                            }
                                        });
                                    }
                                }
                            });

                            // c
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                                && parseFloat(rows[2][columns[0][1].field]) <= ZBFM) {
                                let ZBFC = parseFloat(rows[2][columns[0][1].field]);

                                // Sketch
                                if (currentTabIndex === 0) {
                                    zbf2d(ZBFM, ZBFN, ZBFC);
                                    zbfSketch.off("resize").on("resize", function () {
                                        if ($("#zbf").length > 0) {
                                            zbf2d(ZBFM, ZBFN, ZBFC);
                                        }
                                    });
                                }
                                zbfd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            zbf2d(ZBFM, ZBFN, ZBFC);
                                            zbfSketch.off("resize").on("resize", function () {
                                                if ($("#zbf").length > 0) {
                                                    zbf2d(ZBFM, ZBFN, ZBFC);
                                                }
                                            });
                                        }
                                    }
                                });

                                // D
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                                    && parseFloat(rows[3][columns[0][1].field]) <= ZBFN / 2) {
                                    let ZBFD = parseFloat(rows[3][columns[0][1].field]);

                                    let ZBFK = ZBFM - ZBFC;
                                    let ZBFB = ZBFN - 2 * ZBFD;
                                    let ZBFA = ZBFM * ZBFN - ZBFK * ZBFB;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "截面积 A = " + ZBFA.toFixed(2) + " mm²" +
                                        "</span>");

                                    // X
                                    let ZBFEX1 = ZBFN / 2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 x 轴外边距离 e<sub>x1</sub> = " + ZBFEX1.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBFEX2 = ZBFN - ZBFEX1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 x 轴外边距离 e<sub>x2</sub> = " + ZBFEX2.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBFIX = (ZBFM * ZBFN * ZBFN * ZBFN - ZBFK * ZBFB * ZBFB * ZBFB) / 12;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴惯性矩 I<sub>x</sub> = " + ZBFIX.toFixed(2) + " mm⁴" +
                                        "</span>");

                                    let ZBFWX1 = ZBFIX / ZBFEX1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴抗弯截面系数 W<sub>x1</sub> = " + ZBFWX1.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBFWX2 = ZBFIX / ZBFEX2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴抗弯截面系数 W<sub>x2</sub> = " + ZBFWX2.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBFRX = Math.sqrt(ZBFIX / ZBFA);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴惯性半径 r<sub>x</sub> = " + ZBFRX.toFixed(2) + " mm" +
                                        "</span>");

                                    // Y
                                    let ZBFEY1 = (2 * ZBFD * ZBFM * ZBFM + ZBFB * ZBFC * ZBFC) / (2 * (2 * ZBFD * ZBFM + ZBFB * ZBFC));
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 y 轴外边距离 e<sub>y1</sub> = " + ZBFEY1.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBFEY2 = ZBFM - ZBFEY1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 y 轴外边距离 e<sub>y2</sub> = " + ZBFEY2.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBFS = ZBFEY1 - ZBFC;
                                    let ZBFIY = (ZBFN * ZBFEY1 * ZBFEY1 * ZBFEY1 - ZBFB * ZBFS * ZBFS * ZBFS + 2 * ZBFD * ZBFEY2 * ZBFEY2 * ZBFEY2) / 3;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴惯性矩 I<sub>y</sub> = " + ZBFIY.toFixed(2) + " mm⁴" +
                                        "</span>");

                                    let ZBFWY1 = ZBFIY / ZBFEY1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴抗弯截面系数 W<sub>y1</sub> = " + ZBFWY1.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBFWY2 = ZBFIY / ZBFEY2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴抗弯截面系数 W<sub>y2</sub> = " + ZBFWY2.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBFRY = Math.sqrt(ZBFIY / ZBFA);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴惯性半径 r<sub>y</sub> = " + ZBFRY.toFixed(2) + " mm" +
                                        "</span>");

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        zbf2d(ZBFM, ZBFN, ZBFC, ZBFD, ZBFEX1.toFixed(2), ZBFEX2.toFixed(2), ZBFEY1.toFixed(2), ZBFEY2.toFixed(2));
                                        zbfSketch.off("resize").on("resize", function () {
                                            if ($("#zbf").length > 0) {
                                                zbf2d(ZBFM, ZBFN, ZBFC, ZBFD, ZBFEX1.toFixed(2), ZBFEX2.toFixed(2), ZBFEY1.toFixed(2), ZBFEY2.toFixed(2));
                                            }
                                        });
                                    }
                                    zbfd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                zbf2d(ZBFM, ZBFN, ZBFC, ZBFD, ZBFEX1.toFixed(2), ZBFEX2.toFixed(2), ZBFEY1.toFixed(2), ZBFEY2.toFixed(2));
                                                zbfSketch.off("resize").on("resize", function () {
                                                    if ($("#zbf").length > 0) {
                                                        zbf2d(ZBFM, ZBFN, ZBFC, ZBFD, ZBFEX1.toFixed(2), ZBFEX2.toFixed(2), ZBFEY1.toFixed(2), ZBFEY2.toFixed(2));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // docx
                                    let ZBFPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "zbfdocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "ZBF",

                                                m: ZBFM,
                                                n: ZBFN,
                                                c: ZBFC,
                                                d: ZBFD,
                                                k: ZBFK.toFixed(4),
                                                b: ZBFB.toFixed(4),
                                                s: ZBFS.toFixed(4),
                                                a: ZBFA.toFixed(4),
                                                ex1: ZBFEX1.toFixed(4),
                                                ex2: ZBFEX2.toFixed(4),
                                                ix: ZBFIX.toFixed(4),
                                                wx1: ZBFWX1.toFixed(4),
                                                wx2: ZBFWX2.toFixed(4),
                                                rx: ZBFRX.toFixed(4),
                                                ey1: ZBFEY1.toFixed(4),
                                                ey2: ZBFEY2.toFixed(4),
                                                iy: ZBFIY.toFixed(4),
                                                wy1: ZBFWY1.toFixed(4),
                                                wy2: ZBFWY2.toFixed(4),
                                                ry: ZBFRY.toFixed(4)
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
                                                    ZBFPayJS.dialog({
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
                                                                ZBFPayJS.dialog("close");
                                                                ZBFPayJS.dialog("clear");
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
                                                                            ZBFPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    ZBFPayJS.dialog('close');
                                                                                    ZBFPayJS.dialog('clear');
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
                                    && parseFloat(rows[3][columns[0][1].field]) > ZBFN / 2) {
                                    south.html("厚度 d 不能大于 " + ZBFN / 2 + " mm").css("color", "red");
                                }
                            }
                            else if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                                && parseFloat(rows[2][columns[0][1].field]) > ZBFM) {
                                south.html("厚度 c 不能大于 " + ZBFM + " mm").css("color", "red");
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