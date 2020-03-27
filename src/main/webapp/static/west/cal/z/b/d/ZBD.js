$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let zbdSketch = $("#d2");
    let zbdModel = $("#d3");
    let zbdd2d3 = $('#d2d3');

    $("#cal").html("<table id='zbd'></table>");
    let pg = $("#zbd");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/z/b/d/ZBD.json", function (result) {

        let columns, rows;

        function zbd2d(m = "m", n = "n", c = "c", d = "d",
                       ex1 = "ex1", ex2 = "ex2", ey1 = "ey1", ey2 = "ey2") {

            zbdSketch.empty();
            let width = zbdSketch.width();
            let height = zbdSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ZBDSVG").attr("height", height);
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
                ])).attr("id", "AAEBSketchDI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAEBSketchDI").attr("startOffset", "50%").text(text);

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
            let thk = 15;

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg},
                {x: padding + wg, y: padding + 3 * hg},
                {x: padding + 3 * wg, y: padding + 3 * hg},
                {x: padding + 3 * wg, y: padding + 3 * hg - thk},
                {x: padding + wg + thk, y: padding + 3 * hg - thk},
                {x: padding + wg + thk, y: padding + hg},
                {x: padding + wg, y: padding + hg}
            ])).classed("sketch", true);

            drawCenterLine(padding + 1.5 * wg, padding + hg - 10, padding + 1.5 * wg, padding + 3 * hg + 10);
            drawCenterLine(padding + wg - 10, padding + 2.5 * hg, padding + 3 * wg + 10, padding + 2.5 * hg);
            let cx = padding + 1.5 * wg;
            let cy = padding + 2.5 * hg;

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
                {x: padding + wg - 10 - 10, y: padding + 2.5 * hg},
                {x: padding + wg - 10, y: padding + 2.5 * hg}
            ])).attr("id", "ZBDSketchX1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchX1").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 10, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + 10 + 10, y: padding + 2.5 * hg}
            ])).attr("id", "ZBDSketchX2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchX2").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 4, y: padding + hg - 10},
                {x: padding + 1.5 * wg + 4, y: padding + hg - 10}
            ])).attr("id", "ZBDSketchY1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -10).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchY1").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 4, y: padding + 3 * hg + 10},
                {x: padding + 1.5 * wg + 4, y: padding + 3 * hg + 10}
            ])).attr("id", "ZBDSketchY2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 10).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchY2").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 10, y: padding + 2.5 * hg},
                {x: padding + 1.5 * wg, y: padding + 2.5 * hg}
            ])).attr("id", "ZBDSketchS");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchS").attr("startOffset", "50%").text("S");

            // m
            dimBottomH(padding + wg, padding + 3 * hg, padding + 3 * wg, padding + 3 * hg, m, "ZBDSketchM");

            // ex1
            svg.append("path").attr("d", line([
                {x: padding + wg - 20 - 40, y: padding + 2.5 * hg},
                {x: padding + wg - 20 - 3, y: padding + 2.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 20 - 30, y: padding + 2.5 * hg},
                {x: padding + wg - 20 - 30, y: padding + 3 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 20 - 40, y: padding + 3 * hg},
                {x: padding + wg - 3, y: padding + 3 * hg}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - 20 - 30, y: padding + 3 * hg},
                    {x: padding + wg - 20 - 30 + 3, y: padding + 3 * hg + 15},
                    {x: padding + wg - 20 - 30 - 3, y: padding + 3 * hg + 15},
                    {x: padding + wg - 20 - 30, y: padding + 3 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - 20 - 30, y: padding + 3 * hg + 15 + 40},
                {x: padding + wg - 20 - 30, y: padding + 3 * hg + 15}
            ])).attr("id", "ZBDSketchEX1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchEX1").attr("startOffset", "50%").text(ex1);

            // ex2
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - 20 - 30, y: padding + 2.5 * hg},
                    {x: padding + wg - 20 - 30 + 3, y: padding + 2.5 * hg - 15},
                    {x: padding + wg - 20 - 30 - 3, y: padding + 2.5 * hg - 15},
                    {x: padding + wg - 20 - 30, y: padding + 2.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - 20 - 30, y: padding + hg},
                    {x: padding + wg - 20 - 30 + 3, y: padding + hg + 15},
                    {x: padding + wg - 20 - 30 - 3, y: padding + hg + 15},
                    {x: padding + wg - 20 - 30, y: padding + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - 20 - 40, y: padding + hg},
                {x: padding + wg - 3, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 20 - 30, y: padding + 2.5 * hg},
                {x: padding + wg - 20 - 30, y: padding + hg}
            ])).attr("id", "ZBDSketchEX2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchEX2").attr("startOffset", "50%").text(ex2);

            // n
            dimLeftV(padding + wg - 20 - 40 + 3, padding + 3 * hg, padding + wg - 20 - 40 + 3, padding + hg, n, "ZBDSketchN");

            // EY1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: height / 2},
                    {x: padding + wg + 15, y: height / 2 + 3},
                    {x: padding + wg + 15, y: height / 2 - 3},
                    {x: padding + wg, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2},
                    {x: padding + 1.5 * wg - 15, y: height / 2 + 3},
                    {x: padding + 1.5 * wg - 15, y: height / 2 - 3},
                    {x: padding + 1.5 * wg, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg + 15, y: height / 2},
                {x: padding + 1.5 * wg - 15, y: height / 2}
            ])).attr("id", "ZBDSketchEY1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchEY1").attr("startOffset", "50%").text(ey1);

            // EY1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2},
                    {x: padding + 1.5 * wg + 15, y: height / 2 + 3},
                    {x: padding + 1.5 * wg + 15, y: height / 2 - 3},
                    {x: padding + 1.5 * wg, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: height / 2},
                    {x: padding + 3 * wg - 15, y: height / 2 + 3},
                    {x: padding + 3 * wg - 15, y: height / 2 - 3},
                    {x: padding + 3 * wg, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height / 2 - 10},
                {x: padding + 3 * wg, y: padding + 3 * hg - thk - 3}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg + 15, y: height / 2},
                {x: padding + 3 * wg - 15, y: height / 2}
            ])).attr("id", "ZBDSketchEY2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchEY2").attr("startOffset", "50%").text(ey2);

            // d
            extLineTopV(padding + wg, padding + hg);
            extLineTopV(padding + wg + thk, padding + hg);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg - 30},
                {x: padding + wg + thk + 15 + 10, y: padding + hg - 30}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg + thk, y: padding + hg - 30},
                    {x: padding + wg + thk + 15, y: padding + hg - 30 + 3},
                    {x: padding + wg + thk + 15, y: padding + hg - 30 - 3},
                    {x: padding + wg + thk, y: padding + hg - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: padding + hg - 30},
                    {x: padding + wg - 15, y: padding + hg - 30 + 3},
                    {x: padding + wg - 15, y: padding + hg - 30 - 3},
                    {x: padding + wg, y: padding + hg - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - 15 - 40, y: padding + hg - 30},
                {x: padding + wg - 15, y: padding + hg - 30}
            ])).attr("id", "ZBDSketchD").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchD").attr("startOffset", "50%").text(d);

            // C
            extLineRightH(padding + 3 * wg, padding + 3 * hg);
            extLineRightH(padding + 3 * wg, padding + 3 * hg - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: padding + 3 * hg - thk},
                    {x: padding + 3 * wg + 30 + 3, y: padding + 3 * hg - thk - 15},
                    {x: padding + 3 * wg + 30 - 3, y: padding + 3 * hg - thk - 15},
                    {x: padding + 3 * wg + 30, y: padding + 3 * hg - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: padding + 3 * hg},
                    {x: padding + 3 * wg + 30 + 3, y: padding + 3 * hg + 15},
                    {x: padding + 3 * wg + 30 - 3, y: padding + 3 * hg + 15},
                    {x: padding + 3 * wg + 30, y: padding + 3 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding + 3 * hg - thk - 15 - 10},
                {x: padding + 3 * wg + 30, y: padding + 3 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding + 3 * hg + 15 + 40},
                {x: padding + 3 * wg + 30, y: padding + 3 * hg + 15}
            ])).attr("id", "ZBDSketchC").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBDSketchC")
                .attr("startOffset", "50%").text(c);
        }

        currentTabIndex = zbdd2d3.tabs('getTabIndex', zbdd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            zbd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#zbd").length > 0) {
                    zbd2d();
                }
            });
        }
        zbdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    zbd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#zbd").length > 0) {
                            zbd2d();
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
                    docxtext.html("生成计算书");

                    // sketch & model
                    zbdSketch.empty();
                    zbdModel.empty();

                    // sketch
                    currentTabIndex = zbdd2d3.tabs('getTabIndex', zbdd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        zbd2d();
                        zbdSketch.off("resize").on("resize", function () {
                            if ($("#zbd").length > 0) {
                                zbd2d();
                            }
                        });
                    }
                    zbdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zbd2d();
                                zbdSketch.off("resize").on("resize", function () {
                                    if ($("#zbd").length > 0) {
                                        zbd2d();
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
                        let ZBDM = parseFloat(rows[0][columns[0][1].field]);

                        // Sketch
                        if (currentTabIndex === 0) {
                            zbd2d(ZBDM);
                            zbdSketch.off("resize").on("resize", function () {
                                if ($("#zbd").length > 0) {
                                    zbd2d(ZBDM);
                                }
                            });
                        }
                        zbdd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    zbd2d(ZBDM);
                                    zbdSketch.off("resize").on("resize", function () {
                                        if ($("#zbd").length > 0) {
                                            zbd2d(ZBDM);
                                        }
                                    });
                                }
                            }
                        });

                        // N
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let ZBDN = parseFloat(rows[1][columns[0][1].field]);

                            // Sketch
                            if (currentTabIndex === 0) {
                                zbd2d(ZBDM, ZBDN);
                                zbdSketch.off("resize").on("resize", function () {
                                    if ($("#zbd").length > 0) {
                                        zbd2d(ZBDM, ZBDN);
                                    }
                                });
                            }
                            zbdd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        zbd2d(ZBDM, ZBDN);
                                        zbdSketch.off("resize").on("resize", function () {
                                            if ($("#zbd").length > 0) {
                                                zbd2d(ZBDM, ZBDN);
                                            }
                                        });
                                    }
                                }
                            });

                            // C
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                                && parseFloat(rows[2][columns[0][1].field]) <= ZBDN) {
                                let ZBDC = parseFloat(rows[2][columns[0][1].field]);

                                // Sketch
                                if (currentTabIndex === 0) {
                                    zbd2d(ZBDM, ZBDN, ZBDC);
                                    zbdSketch.off("resize").on("resize", function () {
                                        if ($("#zbd").length > 0) {
                                            zbd2d(ZBDM, ZBDN, ZBDC);
                                        }
                                    });
                                }
                                zbdd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            zbd2d(ZBDM, ZBDN, ZBDC);
                                            zbdSketch.off("resize").on("resize", function () {
                                                if ($("#zbd").length > 0) {
                                                    zbd2d(ZBDM, ZBDN, ZBDC);
                                                }
                                            });
                                        }
                                    }
                                });

                                // D
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                                    && parseFloat(rows[3][columns[0][1].field]) <= ZBDM) {
                                    let ZBDD = parseFloat(rows[3][columns[0][1].field]);

                                    let ZBDK = ZBDM - ZBDD;
                                    let ZBDT = ZBDN - ZBDC;
                                    let ZBDA = ZBDM * ZBDN - (ZBDM - ZBDD) * (ZBDN - ZBDC);
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "截面积 A = " + ZBDA.toFixed(2) + " mm²" +
                                        "</span>");

                                    // X
                                    let ZBDEX1 = (ZBDD * ZBDN * ZBDN + ZBDK * ZBDC * ZBDC) / (2 * (ZBDD * ZBDN + ZBDK * ZBDC));
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 x 轴外边距离 e<sub>x1</sub> = " + ZBDEX1.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBDEX2 = ZBDN - ZBDEX1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 x 轴外边距离 e<sub>x2</sub> = " + ZBDEX2.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBDS = ZBDEX1 - ZBDC;
                                    let ZBDIX = (ZBDM * ZBDEX1 * ZBDEX1 * ZBDEX1 - ZBDK * ZBDS * ZBDS * ZBDS + ZBDD * ZBDEX2 * ZBDEX2 * ZBDEX2) / 3;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴惯性矩 I<sub>x</sub> = " + ZBDIX.toFixed(2) + " mm⁴" +
                                        "</span>");

                                    let ZBDWX1 = ZBDIX / ZBDEX1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴抗弯截面系数 W<sub>x1</sub> = " + ZBDWX1.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBDWX2 = ZBDIX / ZBDEX2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴抗弯截面系数 W<sub>x2</sub> = " + ZBDWX2.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBDRX = Math.sqrt(ZBDIX / ZBDA);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "x 轴惯性半径 r<sub>x</sub> = " + ZBDRX.toFixed(2) + " mm" +
                                        "</span>");

                                    // Y
                                    let ZBDEY1 = (ZBDC * ZBDM * ZBDM + ZBDT * ZBDD * ZBDD) / (2 * (ZBDC * ZBDM + ZBDT * ZBDD));
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 y 轴外边距离 e<sub>y1</sub> = " + ZBDEY1.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBDEY2 = ZBDM - ZBDEY1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重心 S 的 y 轴外边距离 e<sub>y2</sub> = " + ZBDEY2.toFixed(2) + " mm" +
                                        "</span>");

                                    let ZBDU = ZBDEY1 - ZBDD;
                                    let ZBDIY = (ZBDN * ZBDEY1 * ZBDEY1 * ZBDEY1 - ZBDT * ZBDU * ZBDU * ZBDU + ZBDC * ZBDEY2 * ZBDEY2 * ZBDEY2) / 3;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴惯性矩 I<sub>y</sub> = " + ZBDIY.toFixed(2) + " mm⁴" +
                                        "</span>");

                                    let ZBDWY1 = ZBDIY / ZBDEY1;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴抗弯截面系数 W<sub>y1</sub> = " + ZBDWY1.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBDWY2 = ZBDIY / ZBDEY2;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴抗弯截面系数 W<sub>y2</sub> = " + ZBDWY2.toFixed(2) + " mm³" +
                                        "</span>");

                                    let ZBDRY = Math.sqrt(ZBDIY / ZBDA);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "y 轴惯性半径 r<sub>y</sub> = " + ZBDRY.toFixed(2) + " mm" +
                                        "</span>");

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        zbd2d(ZBDM, ZBDN, ZBDC, ZBDD, ZBDEX1.toFixed(2), ZBDEX2.toFixed(2), ZBDEY1.toFixed(2), ZBDEY2.toFixed(2));
                                        zbdSketch.off("resize").on("resize", function () {
                                            if ($("#zbd").length > 0) {
                                                zbd2d(ZBDM, ZBDN, ZBDC, ZBDD, ZBDEX1.toFixed(2), ZBDEX2.toFixed(2), ZBDEY1.toFixed(2), ZBDEY2.toFixed(2));
                                            }
                                        });
                                    }
                                    zbdd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                zbd2d(ZBDM, ZBDN, ZBDC, ZBDD, ZBDEX1.toFixed(2), ZBDEX2.toFixed(2), ZBDEY1.toFixed(2), ZBDEY2.toFixed(2));
                                                zbdSketch.off("resize").on("resize", function () {
                                                    if ($("#zbd").length > 0) {
                                                        zbd2d(ZBDM, ZBDN, ZBDC, ZBDD, ZBDEX1.toFixed(2), ZBDEX2.toFixed(2), ZBDEY1.toFixed(2), ZBDEY2.toFixed(2));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // docx
                                    let ZBDPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "zbddocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "ZBD",

                                                m: ZBDM,
                                                n: ZBDN,
                                                c: ZBDC,
                                                d: ZBDD,
                                                k: ZBDK.toFixed(4),
                                                s: ZBDS.toFixed(4),
                                                t: ZBDT.toFixed(4),
                                                u: ZBDU.toFixed(4),
                                                a: ZBDA.toFixed(4),
                                                ex1: ZBDEX1.toFixed(4),
                                                ex2: ZBDEX2.toFixed(4),
                                                ix: ZBDIX.toFixed(4),
                                                wx1: ZBDWX1.toFixed(4),
                                                wx2: ZBDWX2.toFixed(4),
                                                rx: ZBDRX.toFixed(4),
                                                ey1: ZBDEY1.toFixed(4),
                                                ey2: ZBDEY2.toFixed(4),
                                                iy: ZBDIY.toFixed(4),
                                                wy1: ZBDWY1.toFixed(4),
                                                wy2: ZBDWY2.toFixed(4),
                                                ry: ZBDRY.toFixed(4)
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
                                                    ZBDPayJS.dialog({
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
                                                                ZBDPayJS.dialog("close");
                                                                ZBDPayJS.dialog("clear");
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
                                                                            ZBDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    ZBDPayJS.dialog('close');
                                                                                    ZBDPayJS.dialog('clear');
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
                                    && parseFloat(rows[3][columns[0][1].field]) > ZBDM) {
                                    south.html("厚度 d 不能大于 " + ZBDM + " mm").css("color", "red");
                                }
                            }
                            else if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                                && parseFloat(rows[2][columns[0][1].field]) > ZBDN) {
                                south.html("厚度 c 不能大于 " + ZBDN + " mm").css("color", "red");
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