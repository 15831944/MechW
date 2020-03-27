$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let zbmSketch = $("#d2");
    let zbmModel = $("#d3");
    let zbmd2d3 = $('#d2d3');

    $("#cal").html("<table id='zbm'></table>");
    let pg = $("#zbm");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/z/b/m/ZBM.json", function (result) {

        let columns, rows;

        function zbm2d(m = "m", n = "n", c = "c",
                       ex1 = "ex1", ex2 = "ex2", ey1 = "ey1", ey2 = "ey2") {

            zbmSketch.empty();
            let width = zbmSketch.width();
            let height = zbmSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ZBMSVG").attr("height", height);
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
            let padding = 100;

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 16;

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg},
                {x: padding + 3 * wg, y: padding + hg},
                {x: padding + 3 * wg, y: padding + 3 * hg},
                {x: padding + wg, y: padding + 3 * hg},
                {x: padding + wg, y: padding + hg}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + hg - thk},
                {x: padding + 3 * wg + thk, y: padding + hg - thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg + thk},
                {x: padding + wg - thk, y: padding + 3 * hg + thk},
                {x: padding + wg - thk, y: padding + hg - thk}
            ])).classed("sketch", true);

            drawCenterLine(width / 2, padding + hg - thk - 10, width / 2, padding + 3 * hg + thk + 10);
            drawCenterLine(padding + wg - thk - 10, height / 2, padding + 3 * wg + thk + 10, height / 2);
            let cx = width / 2;
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
                {x: padding + wg - thk - 10 - 10, y: padding + 2 * hg},
                {x: padding + wg - thk - 10, y: padding + 2 * hg}
            ])).attr("id", "ZBMSketchX1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchX1").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + 10, y: padding + 2 * hg},
                {x: padding + 3 * wg + thk + 10 + 10, y: padding + 2 * hg}
            ])).attr("id", "ZBMSketchX2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchX2").attr("startOffset", "50%").text("x");

            svg.append("path").attr("d", line([
                {x: padding + 2 * wg - 4, y: padding + hg - thk - 10},
                {x: padding + 2 * wg + 4, y: padding + hg - thk - 10}
            ])).attr("id", "ZBMSketchY1");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -9).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchY1").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 2 * wg - 4, y: padding + 3 * hg + thk + 10 + 5},
                {x: padding + 2 * wg + 4, y: padding + 3 * hg + thk + 10 + 5}
            ])).attr("id", "ZBMSketchY2");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", 6).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchY2").attr("startOffset", "50%").text("y");

            svg.append("path").attr("d", line([
                {x: padding + 2 * wg - 10, y: padding + 2 * hg},
                {x: padding + 2 * wg, y: padding + 2 * hg}
            ])).attr("id", "ZBMSketchS");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchS").attr("startOffset", "50%").text("S");

            // M
            dimBottomH(padding + wg - thk, height - padding - hg + thk + 15 + 10 + 40, padding + 3 * wg + thk, height - padding - hg + thk + 15 + 10 + 40, m, "ZBMSketchM");
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: height - padding - hg + thk + 3},
                {x: padding + wg - thk, y: height - padding - hg + thk + 15 + 53}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: height - padding - hg + thk + 3},
                {x: padding + 3 * wg + thk, y: height - padding - hg + thk + 15 + 53}
            ])).classed("sketch", true);

            // ey1 ey2
            dimBottomH(padding + wg - thk, height - padding - hg + thk + 15 + 10, width / 2, height - padding - hg + thk + 15 + 10, ey1, "ZBMSketchEY1");
            dimBottomH(width / 2, height - padding - hg + thk + 15 + 10, padding + 3 * wg + thk, height - padding - hg + thk + 15 + 10, ey2, "ZBMSketchEY2");

            // ex1 ex2
            dimLeftV(padding + wg - thk - 20 - 20, height - padding - hg + thk, padding + wg - thk - 20 - 20, height / 2, ex1, "ZBMSketchEX1");
            dimLeftV(padding + wg - thk - 20 - 20, height / 2, padding + wg - thk - 20 - 20, padding + hg - thk, ex2, "ZBMSketchEX2");

            // n
            dimLeftV(padding + wg - thk - 40 - 20 - 20 + 3, height - padding - hg + thk, padding + wg - thk - 40 - 20 - 20 + 3, padding + hg - thk, n, "ZBMSketchN");
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 3, y: height - padding - hg + thk},
                {x: padding + wg - thk - 43, y: height - padding - hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 3, y: padding + hg - thk},
                {x: padding + wg - thk - 43, y: padding + hg - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 10 - 10 - 3, y: height / 2},
                {x: padding + wg - thk - 10 - 40, y: height / 2}
            ])).classed("sketch", true);

            // c1
            svg.append("path").attr("d", line([
                {x: padding + wg - 3, y: padding + hg},
                {x: padding + wg - thk - 40, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 30, y: padding + hg - thk - 15 - 10},
                {x: padding + wg - thk - 30, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk - 30, y: padding + hg - thk},
                    {x: padding + wg - thk - 30 + 3, y: padding + hg - thk - 15},
                    {x: padding + wg - thk - 30 - 3, y: padding + hg - thk - 15},
                    {x: padding + wg - thk - 30, y: padding + hg - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk - 30, y: padding + hg},
                    {x: padding + wg - thk - 30 + 3, y: padding + hg + 15},
                    {x: padding + wg - thk - 30 - 3, y: padding + hg + 15},
                    {x: padding + wg - thk - 30, y: padding + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 30, y: padding + hg + 15 + 40},
                {x: padding + wg - thk - 30, y: padding + hg + 15}
            ])).attr("id", "ZBMSketchC1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchC1").attr("startOffset", "50%").text(c);

            // c2
            extLineRightH(padding + 3 * wg + thk, height - padding - hg + thk);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 3, y: height - padding - hg},
                {x: padding + 3 * wg + thk + 40, y: height - padding - hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + 30, y: height - padding - hg - 15 - 10},
                {x: padding + 3 * wg + thk + 30, y: height - padding - hg + thk}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + thk + 30, y: height - padding - hg},
                    {x: padding + 3 * wg + thk + 30 + 3, y: height - padding - hg - 15},
                    {x: padding + 3 * wg + thk + 30 - 3, y: height - padding - hg - 15},
                    {x: padding + 3 * wg + thk + 30, y: height - padding - hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + thk + 30, y: height - padding - hg + thk},
                    {x: padding + 3 * wg + thk + 30 + 3, y: height - padding - hg + thk + 15},
                    {x: padding + 3 * wg + thk + 30 - 3, y: height - padding - hg + thk + 15},
                    {x: padding + 3 * wg + thk + 30, y: height - padding - hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + 30, y: height - padding - hg + thk + 15 + 40},
                {x: padding + 3 * wg + thk + 30, y: height - padding - hg + thk + 15}
            ])).attr("id", "ZBMSketchC2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchC2").attr("startOffset", "50%").text(c);

            // c3
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.5 * hg},
                {x: padding + wg + 15 + 10, y: padding + 2.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk, y: padding + 2.5 * hg},
                    {x: padding + wg - thk - 15, y: padding + 2.5 * hg + 3},
                    {x: padding + wg - thk - 15, y: padding + 2.5 * hg - 3},
                    {x: padding + wg - thk, y: padding + 2.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: padding + 2.5 * hg},
                    {x: padding + wg + 15, y: padding + 2.5 * hg + 3},
                    {x: padding + wg + 15, y: padding + 2.5 * hg - 3},
                    {x: padding + wg, y: padding + 2.5 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 15 - 40, y: padding + 2.5 * hg},
                {x: padding + wg - thk - 15, y: padding + 2.5 * hg}
            ])).classed("sketch", true).attr("id", "ZBMSketchC3");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchC3").attr("startOffset", "50%").text(c);

            // c4
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 15 - 10, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: padding + 1.5 * hg},
                    {x: padding + 3 * wg - 15, y: padding + 1.5 * hg + 3},
                    {x: padding + 3 * wg - 15, y: padding + 1.5 * hg - 3},
                    {x: padding + 3 * wg, y: padding + 1.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + thk, y: padding + 1.5 * hg},
                    {x: padding + 3 * wg + thk + 15, y: padding + 1.5 * hg + 3},
                    {x: padding + 3 * wg + thk + 15, y: padding + 1.5 * hg - 3},
                    {x: padding + 3 * wg + thk, y: padding + 1.5 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + 15, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + thk + 15 + 40, y: padding + 1.5 * hg}
            ])).classed("sketch", true).attr("id", "ZBMSketchC4");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ZBMSketchC4").attr("startOffset", "50%").text(c);
        }

        currentTabIndex = zbmd2d3.tabs('getTabIndex', zbmd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            zbm2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#zbm").length > 0) {
                    zbm2d();
                }
            });
        }
        zbmd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    zbm2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#zbm").length > 0) {
                            zbm2d();
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
                    zbmSketch.empty();
                    zbmModel.empty();

                    // sketch
                    currentTabIndex = zbmd2d3.tabs('getTabIndex', zbmd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        zbm2d();
                        zbmSketch.off("resize").on("resize", function () {
                            if ($("#zbm").length > 0) {
                                zbm2d();
                            }
                        });
                    }
                    zbmd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zbm2d();
                                zbmSketch.off("resize").on("resize", function () {
                                    if ($("#zbm").length > 0) {
                                        zbm2d();
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
                        let ZBMM = parseFloat(rows[0][columns[0][1].field]);

                        // Sketch
                        if (currentTabIndex === 0) {
                            zbm2d(ZBMM);
                            zbmSketch.off("resize").on("resize", function () {
                                if ($("#zbm").length > 0) {
                                    zbm2d(ZBMM);
                                }
                            });
                        }
                        zbmd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    zbm2d(ZBMM);
                                    zbmSketch.off("resize").on("resize", function () {
                                        if ($("#zbm").length > 0) {
                                            zbm2d(ZBMM);
                                        }
                                    });
                                }
                            }
                        });

                        // N
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let ZBMN = parseFloat(rows[1][columns[0][1].field]);

                            // Sketch
                            if (currentTabIndex === 0) {
                                zbm2d(ZBMM, ZBMN);
                                zbmSketch.off("resize").on("resize", function () {
                                    if ($("#zbm").length > 0) {
                                        zbm2d(ZBMM, ZBMN);
                                    }
                                });
                            }
                            zbmd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        zbm2d(ZBMM, ZBMN);
                                        zbmSketch.off("resize").on("resize", function () {
                                            if ($("#zbm").length > 0) {
                                                zbm2d(ZBMM, ZBMN);
                                            }
                                        });
                                    }
                                }
                            });

                            // c
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                                && parseFloat(rows[2][columns[0][1].field]) <= Math.min(ZBMM / 2, ZBMN / 2)) {
                                let ZBMC = parseFloat(rows[2][columns[0][1].field]);

                                let ZBMK = ZBMM - 2 * ZBMC;
                                let ZBMB = ZBMN - 2 * ZBMC;
                                let ZBMA = ZBMM * ZBMN - ZBMK * ZBMB;
                                south.html(
                                    "<span style='color:#444444;'>" +
                                    "截面积 A = " + ZBMA.toFixed(2) + " mm²" +
                                    "</span>");

                                // X
                                let ZBMEX1 = ZBMN / 2;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "重心 S 的 x 轴外边距离 e<sub>x1</sub> = " + ZBMEX1.toFixed(2) + " mm" +
                                    "</span>");

                                let ZBMEX2 = ZBMN - ZBMEX1;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "重心 S 的 x 轴外边距离 e<sub>x2</sub> = " + ZBMEX2.toFixed(2) + " mm" +
                                    "</span>");

                                let ZBMIX = (ZBMM * ZBMN * ZBMN * ZBMN - ZBMK * ZBMB * ZBMB * ZBMB) / 12;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "x 轴惯性矩 I<sub>x</sub> = " + ZBMIX.toFixed(2) + " mm⁴" +
                                    "</span>");

                                let ZBMWX1 = ZBMIX / ZBMEX1;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "x 轴抗弯截面系数 W<sub>x1</sub> = " + ZBMWX1.toFixed(2) + " mm³" +
                                    "</span>");

                                let ZBMWX2 = ZBMIX / ZBMEX2;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "x 轴抗弯截面系数 W<sub>x2</sub> = " + ZBMWX2.toFixed(2) + " mm³" +
                                    "</span>");

                                let ZBMRX = Math.sqrt(ZBMIX / ZBMA);
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "x 轴惯性半径 r<sub>x</sub> = " + ZBMRX.toFixed(2) + " mm" +
                                    "</span>");

                                // Y
                                let ZBMEY1 = ZBMM / 2;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "重心 S 的 y 轴外边距离 e<sub>y1</sub> = " + ZBMEY1.toFixed(2) + " mm" +
                                    "</span>");

                                let ZBMEY2 = ZBMM - ZBMEY1;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "重心 S 的 y 轴外边距离 e<sub>y2</sub> = " + ZBMEY2.toFixed(2) + " mm" +
                                    "</span>");

                                let ZBMIY = (ZBMN * ZBMM * ZBMM * ZBMM + ZBMB * ZBMK * ZBMK * ZBMK) / 12;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "y 轴惯性矩 I<sub>y</sub> = " + ZBMIY.toFixed(2) + " mm⁴" +
                                    "</span>");

                                let ZBMWY1 = ZBMIY / ZBMEY1;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "y 轴抗弯截面系数 W<sub>y1</sub> = " + ZBMWY1.toFixed(2) + " mm³" +
                                    "</span>");

                                let ZBMWY2 = ZBMIY / ZBMEY2;
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "y 轴抗弯截面系数 W<sub>y2</sub> = " + ZBMWY2.toFixed(2) + " mm³" +
                                    "</span>");

                                let ZBMRY = Math.sqrt(ZBMIY / ZBMA);
                                south.append(
                                    "<span style='color:#444444;'>" +
                                    "&ensp;|&ensp;" +
                                    "y 轴惯性半径 r<sub>y</sub> = " + ZBMRY.toFixed(2) + " mm" +
                                    "</span>");

                                // Sketch
                                if (currentTabIndex === 0) {
                                    zbm2d(ZBMM, ZBMN, ZBMC, ZBMEX1.toFixed(2), ZBMEX2.toFixed(2), ZBMEY1.toFixed(2), ZBMEY2.toFixed(2));
                                    zbmSketch.off("resize").on("resize", function () {
                                        if ($("#zbm").length > 0) {
                                            zbm2d(ZBMM, ZBMN, ZBMC, ZBMEX1.toFixed(2), ZBMEX2.toFixed(2), ZBMEY1.toFixed(2), ZBMEY2.toFixed(2));
                                        }
                                    });
                                }
                                zbmd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            zbm2d(ZBMM, ZBMN, ZBMC, ZBMEX1.toFixed(2), ZBMEX2.toFixed(2), ZBMEY1.toFixed(2), ZBMEY2.toFixed(2));
                                            zbmSketch.off("resize").on("resize", function () {
                                                if ($("#zbm").length > 0) {
                                                    zbm2d(ZBMM, ZBMN, ZBMC, ZBMEX1.toFixed(2), ZBMEX2.toFixed(2), ZBMEY1.toFixed(2), ZBMEY2.toFixed(2));
                                                }
                                            });
                                        }
                                    }
                                });

                                // docx
                                let ZBMPayJS = $('#payjs');

                                function getDocx() {
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "zbmdocx.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            ribbonName: "ZBM",

                                            m: ZBMM,
                                            n: ZBMN,
                                            c: ZBMC,
                                            k: ZBMK.toFixed(4),
                                            b: ZBMB.toFixed(4),
                                            a: ZBMA.toFixed(4),
                                            ex1: ZBMEX1.toFixed(4),
                                            ex2: ZBMEX2.toFixed(4),
                                            ix: ZBMIX.toFixed(4),
                                            wx1: ZBMWX1.toFixed(4),
                                            wx2: ZBMWX2.toFixed(4),
                                            rx: ZBMRX.toFixed(4),
                                            ey1: ZBMEY1.toFixed(4),
                                            ey2: ZBMEY2.toFixed(4),
                                            iy: ZBMIY.toFixed(4),
                                            wy1: ZBMWY1.toFixed(4),
                                            wy2: ZBMWY2.toFixed(4),
                                            ry: ZBMRY.toFixed(4)
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
                                                ZBMPayJS.dialog({
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
                                                            ZBMPayJS.dialog("close");
                                                            ZBMPayJS.dialog("clear");
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
                                                                        ZBMPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                        // 倒计时计数器
                                                                        let maxTime = 4, timer;

                                                                        function CountDown() {
                                                                            if (maxTime >= 0) {
                                                                                $("#payjs_timer").html(maxTime);
                                                                                --maxTime;
                                                                            } else {

                                                                                clearInterval(timer);
                                                                                // 关闭并清空收银台
                                                                                ZBMPayJS.dialog('close');
                                                                                ZBMPayJS.dialog('clear');
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
                            else if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                                && parseFloat(rows[2][columns[0][1].field]) > Math.min(ZBMM / 2, ZBMN / 2)) {
                                south.html("厚度 c 不能大于 " + Math.min(ZBMM / 2, ZBMN / 2) + " mm").css("color", "red");
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