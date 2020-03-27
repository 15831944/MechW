$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbbbSketch = $("#d2");
    let xbbbModel = $("#d3");
    let xbbbd2d3 = $('#d2d3');

    $("#cal").html("<table id='xbbb'></table>");
    let pg = $("#xbbb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/b/b/XBBB.json", function (result) {

        let XBBBDT,
            XBBBSCategory, XBBBSCategoryVal, XBBBSType, XBBBSTypeVal, XBBBSSTD, XBBBSSTDVal, XBBBSName, XBBBSNameVal,
            XBBBSNorm, XBBBSNormVal,
            XBBBSDensity, XBBBSThkMax, XBBBSThkMin,
            XBBBBCategory, XBBBBCategoryVal, XBBBBType, XBBBBTypeVal, XBBBBSTD, XBBBBSTDVal, XBBBBName, XBBBBNameVal,
            XBBBDCategory, XBBBDCategoryVal, XBBBDType, XBBBDTypeVal, XBBBDSTD, XBBBDSTDVal, XBBBDName, XBBBDNameVal,
            columns, rows, ed;

        function xbbb2d(ds0 = "ΦDs0", d0 = "ΦD0", b = "B", hf = "hf",
                        thkdn = "δdn", h = "H", hc = "Hc") {

            xbbbSketch.empty();

            let width = xbbbSketch.width();
            let height = xbbbSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XBBBSVG").attr("height", height);

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
            let thk = 6;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let gg = Math.min(wg, hg);

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
                        {x: startX + 10, y: startY - 28},
                        {x: startX + 10, y: startY - 32},
                        {x: startX, y: startY - 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY - 30},
                        {x: endX - 10, y: endY - 28},
                        {x: endX - 10, y: endY - 32},
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
                        {x: startX + 10, y: startY + 28},
                        {x: startX + 10, y: startY + 32},
                        {x: startX, y: startY + 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY + 30},
                        {x: endX - 10, y: endY + 28},
                        {x: endX - 10, y: endY + 32},
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
                        {x: startX - 28, y: startY - 10},
                        {x: startX - 32, y: startY - 10},
                        {x: startX - 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 28, y: endY + 10},
                        {x: endX - 32, y: endY + 10},
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
                        {x: startX + 28, y: startY - 10},
                        {x: startX + 32, y: startY - 10},
                        {x: startX + 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX + 30, y: endY},
                        {x: endX + 28, y: endY + 10},
                        {x: endX + 32, y: endY + 10},
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

            let ro = gg / 3;

            // 设备轮廓
            let xaxis = padding + 2 * wg;
            drawArc(gg / 2, gg / 4, xaxis - gg / 2, padding + hg, xaxis + gg / 2, padding + hg);
            drawArc(gg / 2, gg / 4, xaxis + gg / 2, padding + 3 * hg, xaxis - gg / 2, padding + 3 * hg);
            drawLine(xaxis - gg / 2, padding + hg, xaxis - gg / 2, padding + 3 * hg);
            drawLine(xaxis + gg / 2, padding + hg, xaxis + gg / 2, padding + 3 * hg);
            drawCenterLine(xaxis - gg / 2, padding + hg, xaxis + gg / 2, padding + hg);
            drawLine(xaxis - gg / 2, padding + hg + 5, xaxis + gg / 2, padding + hg + 5);
            drawCenterLine(xaxis - gg / 2, padding + 3 * hg, xaxis + gg / 2, padding + 3 * hg);
            drawLine(xaxis - gg / 2, padding + 3 * hg - 5, xaxis + gg / 2, padding + 3 * hg - 5);

            // 左支腿
            let sdo = ro / 2;
            drawLine(xaxis - gg / 2 - sdo - 5, height / 2 + 0.4 * hg + sdo + 5, xaxis - gg / 2, height / 2 + 0.4 * hg);
            drawLine(xaxis - gg / 2, padding + 3 * hg, xaxis - gg / 2, height - padding);
            drawLine(xaxis - gg / 2 - sdo, height / 2 + 0.4 * hg + sdo, xaxis - gg / 2 - sdo, height - padding);
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo - 10, y: height - padding},
                {x: xaxis - gg / 2 + 10, y: height - padding},
                {x: xaxis - gg / 2 + 10, y: height - padding + thk},
                {x: xaxis - gg / 2 - sdo - 10, y: height - padding + thk},
                {x: xaxis - gg / 2 - sdo - 10, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo + 2, y: height / 2 + 0.4 * hg + sdo - 2},
                {x: xaxis - gg / 2 - sdo + 2, y: height - padding}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5,5");

            // 右支腿
            drawLine(xaxis + gg / 2 + sdo + 5, height / 2 + 0.4 * hg + sdo + 5, xaxis + gg / 2, height / 2 + 0.4 * hg);
            drawLine(xaxis + gg / 2, padding + 3 * hg, xaxis + gg / 2, height - padding);
            drawLine(xaxis + gg / 2 + sdo, height / 2 + 0.4 * hg + sdo, xaxis + gg / 2 + sdo, height - padding);
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo + 10, y: height - padding},
                {x: xaxis + gg / 2 - 10, y: height - padding},
                {x: xaxis + gg / 2 - 10, y: height - padding + thk},
                {x: xaxis + gg / 2 + sdo + 10, y: height - padding + thk},
                {x: xaxis + gg / 2 + sdo + 10, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo - 2, y: height / 2 + 0.4 * hg + sdo - 2},
                {x: xaxis + gg / 2 + sdo - 2, y: height - padding}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5,5");

            // cg
            svg.append("path").attr("d", "M "
                + (padding + 2 * wg) + " " + (height / 2 + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (padding + 2 * wg) + " " + (height / 2 - 2)
            ).classed("sketch arrow", true);
            svg.append("path").attr("d", "M "
                + (padding + 2 * wg) + " " + (height / 2 - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (padding + 2 * wg) + " " + (height / 2 + 2)
            ).classed("sketch arrow", true);

            //d0
            dimTopH(xaxis - gg / 2 - 10, height / 2, xaxis + gg / 2 + 10, height / 2, d0, "XBBBSketchD0");
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8, xaxis - gg / 2, height / 2 - 8 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 5, xaxis - gg / 2, height / 2 - 8 - 5 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 10, xaxis - gg / 2, height / 2 - 8 - 5 - 10);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 15, xaxis - gg / 2, height / 2 - 8 - 5 - 15);
            drawLine(xaxis + gg / 2, height / 2 - 8, xaxis + gg / 2 + 10, height / 2 - 8 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 5, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 10, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 10);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 15, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 15);

            //ds0
            dimTopH(xaxis - gg / 2, height / 2 - 20, xaxis + gg / 2, height / 2 - 20, ds0, "XBBBSketchDS0");

            // B
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xaxis - gg / 2 + 10, y: height - padding - 20},
                    {x: xaxis - gg / 2 + 10 + 10, y: height - padding - 18},
                    {x: xaxis - gg / 2 + 10 + 10, y: height - padding - 22},
                    {x: xaxis - gg / 2 + 10, y: height - padding - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xaxis - gg / 2, y: height - padding - 20},
                    {x: xaxis - gg / 2 - 10, y: height - padding - 18},
                    {x: xaxis - gg / 2 - 10, y: height - padding - 22},
                    {x: xaxis - gg / 2, y: height - padding - 20}
                ]));
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - 10 - 5, y: height - padding - 20},
                {x: xaxis - gg / 2 + 10 + 10, y: height - padding - 20}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 + 10, y: height - padding - 25},
                {x: xaxis - gg / 2 + 10, y: height - padding - 3}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 + 10 + 10, y: height - padding - 20},
                {x: xaxis - gg / 2 + 10 + 10 + 40, y: height - padding - 20}
            ])).attr("id", "XBBBSketchB").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBBSketchB")
                .attr("startOffset", "50%").text(b);

            // hf
            dimRightV(xaxis - gg / 2, height - padding - hg - 5 - 5, xaxis - gg / 2, height / 2 + 0.4 * hg, hf, "XBBBSketchHF");

            // thkdn
            extLineLeftH(xaxis - gg / 2 - sdo - 10, height - padding);
            extLineLeftH(xaxis - gg / 2 - sdo - 10, height - padding + thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding},
                    {x: xaxis - gg / 2 - sdo - 10 - 28, y: height - padding - 10},
                    {x: xaxis - gg / 2 - sdo - 10 - 32, y: height - padding - 10},
                    {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding + thk},
                    {x: xaxis - gg / 2 - sdo - 10 - 28, y: height - padding + thk + 10},
                    {x: xaxis - gg / 2 - sdo - 10 - 32, y: height - padding + thk + 10},
                    {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding},
                {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding + thk + 10 + 5}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding - 10},
                {x: xaxis - gg / 2 - sdo - 10 - 30, y: height - padding - 10 - 40}
            ])).attr("id", "XBBBSketchTHKDN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBBSketchTHKDN").attr("startOffset", "50%").text(thkdn);

            // 50mm
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: xaxis - gg / 2, y: padding + 3 * hg - 8},
                    {x: xaxis - gg / 2 + 3 * sdo, y: padding + 3 * hg - 8}
                ])).attr("transform", "rotate(" + -135 + ", " + (xaxis - gg / 2) + " " + (padding + 3 * hg - 8) + ")");
            svg.append("path")
                .attr("d", line([
                    {x: xaxis - gg / 2 - 0.707 * (3 * sdo) - 70, y: padding + 3 * hg - 8 - 0.707 * (3 * sdo)},
                    {x: xaxis - gg / 2 - 0.707 * (3 * sdo) + 1, y: padding + 3 * hg - 8 - 0.707 * (3 * sdo)}
                ])).classed("sketch", true).attr("id", "XBBBSketch50");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBBSketch50")
                .attr("startOffset", "50%").text("50mm不焊");

            // H
            dimLeftV(xaxis - gg / 2 - sdo - 10 - 40 + 3, height - padding + thk, xaxis - gg / 2 - sdo - 10 - 40 + 3, padding + 3 * hg - 5, h, "XBBBSketchH");
            drawLine(xaxis - gg / 2 - sdo - 10 - 40 - 3, padding + 3 * hg - 5, xaxis - gg / 2 - 3, padding + 3 * hg - 5);

            // hc
            dimRightV(xaxis + gg / 2 + sdo + 10, height - padding + thk,
                xaxis + gg / 2 + sdo + 10, height / 2,
                hc, "XBBBSketchHC");
            drawLine(xaxis + gg / 2 + sdo + 10 + 3, height / 2, padding + 2 * wg + 2 + 3, height / 2);
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo + 10 + 40, y: height / 2},
                {x: xaxis + gg / 2 + sdo + 10 + 40 + 30, y: height / 2}
            ])).attr("id", "XBBBSketchCG");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBBSketchCG")
                .attr("startOffset", "50%").text("C.G.");
        }

        currentTabIndex = xbbbd2d3.tabs('getTabIndex', xbbbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbbb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xbbb").length > 0) {
                    xbbb2d();
                }
            });
        }
        xbbbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbbb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xbbb").length > 0) {
                            xbbb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "JB/T 4712.2-2007 等边角钢腿式支座计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 190,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 133,
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

                if (index === 8) {
                    $(ed.target).combobox("loadData", XBBBSCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", XBBBSType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", XBBBSSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", XBBBSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", XBBBSNorm);
                }

                else if (index === 17) {
                    $(ed.target).combobox("loadData", XBBBBCategory);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", XBBBBType);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", XBBBBSTD);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", XBBBBName);
                }

                else if (index === 24) {
                    $(ed.target).combobox("loadData", XBBBDCategory);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", XBBBDType);
                }
                else if (index === 26) {
                    $(ed.target).combobox("loadData", XBBBDSTD);
                }
                else if (index === 27) {
                    $(ed.target).combobox("loadData", XBBBDName);
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
                    xbbbSketch.empty();
                    xbbbModel.empty();

                    // sketch
                    currentTabIndex = xbbbd2d3.tabs('getTabIndex', xbbbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xbbb2d();
                        xbbbSketch.off("resize").on("resize", function () {
                            if ($("#xbbb").length > 0) {
                                xbbb2d();
                            }
                        });
                    }
                    xbbbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbbb2d();
                                xbbbSketch.off("resize").on("resize", function () {
                                    if ($("#xbbb").length > 0) {
                                        xbbb2d();
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
                    if (index === 0) {

                        XBBBDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XBBBSCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBBSType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBBSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBBSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBBSNorm = null;

                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBBBBCategory = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBBBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBBBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBBBName = null;

                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBBBDCategory = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBBDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBBDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBBDName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBSCategory = [];
                                XBBBBCategory = [];
                                XBBBDCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XBBBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XBBBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBBDCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBBBCategory[index] = {
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

                    // category  type
                    else if (index === 8) {

                        XBBBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBBSType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBBSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBBSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBBSNorm = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBSCategoryVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBSType = [];
                                $(result).each(function (index, element) {
                                    XBBBSType[index] = {
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
                    // type std
                    else if (index === 9) {

                        XBBBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBBSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBBSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBBSNorm = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBSCategoryVal,
                                type: XBBBSTypeVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBSSTD = [];
                                $(result).each(function (index, element) {
                                    XBBBSSTD[index] = {
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
                    // std Name
                    else if (index === 10) {

                        XBBBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBBSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBBSNorm = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBSCategoryVal,
                                type: XBBBSTypeVal,
                                std: XBBBSSTDVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBSName = [];
                                $(result).each(function (index, element) {
                                    XBBBSName[index] = {
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
                    // name norms
                    else if (index === 11) {

                        XBBBSNameVal = changes.value;

                        // 将 norms 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBBSNorm = null;

                        // AJAX 获取材料密度、最大最小厚度
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": XBBBSCategoryVal,
                                "type": XBBBSTypeVal,
                                "std": XBBBSSTDVal,
                                "name": XBBBSNameVal,
                                "temp": XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                XBBBSDensity = parseFloat(result.density);
                                XBBBSThkMin = parseFloat(result.thkMin);
                                XBBBSThkMax = parseFloat(result.thkMax);

                                // 获取 norm 列表
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "gbt_706_2016_list_table_a3_norms.action",
                                    async: false,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        thkMax: XBBBSThkMax,
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        XBBBSNorm = [];
                                        $(result).each(function (index, element) {
                                            XBBBSNorm[index] = {
                                                "value": element,
                                                "text": element
                                            };
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;角钢规格获取失败，请检查网络后重试</span>");
                                    }
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // category  type
                    else if (index === 17) {

                        XBBBBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBBBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBBBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBBBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBBCategoryVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBBType = [];
                                $(result).each(function (index, element) {
                                    XBBBBType[index] = {
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
                    // type std
                    else if (index === 18) {

                        XBBBBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBBBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBBBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBBCategoryVal,
                                type: XBBBBTypeVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBBSTD = [];
                                $(result).each(function (index, element) {
                                    XBBBBSTD[index] = {
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
                    // std Name
                    else if (index === 19) {

                        XBBBBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBBBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBBCategoryVal,
                                type: XBBBBTypeVal,
                                std: XBBBBSTDVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBBName = [];
                                $(result).each(function (index, element) {
                                    XBBBBName[index] = {
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

                    // category  type
                    else if (index === 24) {

                        XBBBDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBBDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBBDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBBDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBDCategoryVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBDType = [];
                                $(result).each(function (index, element) {
                                    XBBBDType[index] = {
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
                    // type std
                    else if (index === 25) {

                        XBBBDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBBDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBBDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBDCategoryVal,
                                type: XBBBDTypeVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBDSTD = [];
                                $(result).each(function (index, element) {
                                    XBBBDSTD[index] = {
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
                    // std Name
                    else if (index === 26) {

                        XBBBDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBBDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBBDCategoryVal,
                                type: XBBBDTypeVal,
                                std: XBBBDSTDVal,
                                temp: XBBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBBDName = [];
                                $(result).each(function (index, element) {
                                    XBBBDName[index] = {
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

                        // H0
                        let XBBBH0;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XBBBH0 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Ds0
                        let XBBBDS0;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XBBBDS0 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbb2d("Φ" + XBBBDS0);
                            xbbbSketch.off("resize").on("resize", function () {
                                if ($("#xbbb").length > 0) {
                                    xbbb2d("Φ" + XBBBDS0);
                                }
                            });
                        }
                        xbbbd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbb2d("Φ" + XBBBDS0);
                                    xbbbSketch.off("resize").on("resize", function () {
                                        if ($("#xbbb").length > 0) {
                                            xbbb2d("Φ" + XBBBDS0);
                                        }
                                    });
                                }
                            }
                        });

                        // D0
                        let XBBBD0;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) >= XBBBDS0) {
                            XBBBD0 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) < XBBBDS0) {
                            south.html("壳体外直径(含保温层) D<sub>0</sub> 不得小于 " + XBBBDS0 + " mm").css("color", "red");
                            return false;
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0);
                            xbbbSketch.off("resize").on("resize", function () {
                                if ($("#xbbb").length > 0) {
                                    xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0);
                                }
                            });
                        }
                        xbbbd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0);
                                    xbbbSketch.off("resize").on("resize", function () {
                                        if ($("#xbbb").length > 0) {
                                            xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0);
                                        }
                                    });
                                }
                            }
                        });

                        // M0
                        let XBBBM0;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            XBBBM0 = parseFloat(rows[4][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Q0
                        let XBBBQ0;
                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                            XBBBQ0 = parseFloat(rows[5][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // FI
                        let XBBBFI;
                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                            XBBBFI = parseFloat(rows[6][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // EQ
                        let XBBBEQ;
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XBBBEQ = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // alphae
                        let XBBBAlphaE;
                        if (XBBBEQ === "0.1g") {
                            XBBBAlphaE = 0.08;
                        }
                        else if (XBBBEQ === "0.15g") {
                            XBBBAlphaE = 0.12;
                        }
                        else if (XBBBEQ === "0.2g") {
                            XBBBAlphaE = 0.16;
                        }
                        else if (XBBBEQ === "0.3g") {
                            XBBBAlphaE = 0.24;
                        }
                        else if (XBBBEQ === "0.4g") {
                            XBBBAlphaE = 0.32;
                        }
                        else {
                            return false;
                        }

                        // 角钢规格
                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                            XBBBSNormVal = rows[12][columns[0][1].field];

                            // AJAX 获取角钢截面特性
                            let XBBBSSB, XBBBSD, XBBBSA, XBBBSAO, XBBBSIXX, XBBBSIYY, XBBBSWMIN, XBBBSZ0;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "gbt_706_2016_get_table_a3_details.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "norms": XBBBSNormVal
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XBBBSSB = parseFloat(result.b);
                                    XBBBSD = parseFloat(result.d);
                                    XBBBSA = 100 * parseFloat(result.sectionArea);
                                    XBBBSAO = parseFloat(result.outerArea);
                                    XBBBSIXX = 10000 * parseFloat(result.bix0);
                                    XBBBSIYY = 10000 * parseFloat(result.biy0);
                                    XBBBSWMIN = 1000 * Math.min(parseFloat(result.wx0), parseFloat(result.wy0));
                                    XBBBSZ0 = 10 * parseFloat(result.z0);

                                    // 获取角钢许用应力、弹性模量、屈服强度
                                    let XBBBOST, XBBBRSTEL, XBBBEST;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XBBBSCategoryVal,
                                            "type": XBBBSTypeVal,
                                            "std": XBBBSSTDVal,
                                            "name": XBBBSNameVal,
                                            "thk": XBBBSD,
                                            "temp": XBBBDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XBBBOST = parseFloat(result.ot);
                                            if (XBBBOST < 0) {
                                                south.html("查询支腿材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBBRSTEL = parseFloat(result.relt);
                                            if (XBBBRSTEL < 0) {
                                                south.html("查询支腿材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBBEST = 1000 * parseFloat(result.et);
                                            if (XBBBEST < 0) {
                                                south.html("查询支腿材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // N
                                            let XBBBN;
                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                XBBBN = parseFloat(rows[13][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // BB
                                            let XBBBBB;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                XBBBBB = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB);
                                                xbbbSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbb").length > 0) {
                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB);
                                                    }
                                                });
                                            }
                                            xbbbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB);
                                                        xbbbSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbb").length > 0) {
                                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // HF
                                            let XBBBHF;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                XBBBHF = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF);
                                                xbbbSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbb").length > 0) {
                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF);
                                                    }
                                                });
                                            }
                                            xbbbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF);
                                                        xbbbSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbb").length > 0) {
                                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // TF1
                                            let XBBBTF1;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                XBBBTF1 = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            //地脚螺栓材料
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                XBBBBNameVal = rows[20][columns[0][1].field];

                                                // AJAX 获取螺栓材料密度、最大最小厚度
                                                let XBBXBBensity, XBBBBThkMin, XBBBBThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": XBBBBCategoryVal,
                                                        "type": XBBBBTypeVal,
                                                        "std": XBBBBSTDVal,
                                                        "name": XBBBBNameVal,
                                                        "temp": XBBBDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        XBBXBBensity = parseFloat(result.density);
                                                        XBBBBThkMin = parseFloat(result.thkMin);
                                                        XBBBBThkMax = parseFloat(result.thkMax);

                                                        // 螺纹规格
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBBBThkMin
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBBBThkMax) {
                                                            let XBBBNorms = rows[21][columns[0][1].field];

                                                            // 获取螺纹小径
                                                            let XBBBDMIN;
                                                            if (XBBBNorms === "M12") {
                                                                XBBBDMIN = 10.106;
                                                            }
                                                            else if (XBBBNorms === "M16") {
                                                                XBBBDMIN = 13.835;
                                                            }
                                                            else if (XBBBNorms === "M20") {
                                                                XBBBDMIN = 17.294;
                                                            }
                                                            else if (XBBBNorms === "M22") {
                                                                XBBBDMIN = 19.294;
                                                            }
                                                            else if (XBBBNorms === "M24") {
                                                                XBBBDMIN = 20.752;
                                                            }
                                                            else if (XBBBNorms === "M27") {
                                                                XBBBDMIN = 23.752;
                                                            }
                                                            else if (XBBBNorms === "M30") {
                                                                XBBBDMIN = 26.211;
                                                            }
                                                            else if (XBBBNorms === "M36") {
                                                                XBBBDMIN = 31.670;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 螺栓设计应力
                                                            let XBBBOBTAllow;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": XBBBBCategoryVal,
                                                                    "type": XBBBBTypeVal,
                                                                    "std": XBBBBSTDVal,
                                                                    "name": XBBBBNameVal,
                                                                    "thk": parseFloat(XBBBNorms.substring(1)),
                                                                    "temp": XBBBDT,
                                                                    "highLow": 2,
                                                                    "isTube": 0,
                                                                    "od": parseFloat(XBBBNorms.substring(1))
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    XBBBOBTAllow = parseFloat(result.ot);
                                                                    if (XBBBOBTAllow < 0) {
                                                                        south.html("查询螺栓材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // nbt
                                                                    let XBBBNBT;
                                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                                        XBBBNBT = parseFloat(rows[22][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                        && parseFloat(rows[23][columns[0][1].field]) < XBBBDMIN / 2) {
                                                                        let XBBBCB2 = parseFloat(rows[23][columns[0][1].field]);

                                                                        // 底板材料
                                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                            XBBBDNameVal = rows[27][columns[0][1].field];

                                                                            // AJAX 获取底板材料密度、最大最小厚度
                                                                            let XBBBDDensity, XBBBDThkMin, XBBBDThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": XBBBDCategoryVal,
                                                                                    "type": XBBBDTypeVal,
                                                                                    "std": XBBBDSTDVal,
                                                                                    "name": XBBBDNameVal,
                                                                                    "temp": XBBBDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    XBBBDDensity = parseFloat(result.density);
                                                                                    XBBBDThkMin = parseFloat(result.thkMin);
                                                                                    XBBBDThkMax = parseFloat(result.thkMax);

                                                                                    // thkdn
                                                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBBDThkMin
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBBDThkMax) {
                                                                                        let XBBBTHKDN = parseFloat(rows[28][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN);
                                                                                            xbbbSketch.off("resize").on("resize", function () {
                                                                                                if ($("#xbbb").length > 0) {
                                                                                                    xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        xbbbd2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN);
                                                                                                    xbbbSketch.off("resize").on("resize", function () {
                                                                                                        if ($("#xbbb").length > 0) {
                                                                                                            xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 底板设计应力、负偏差
                                                                                        let XBBBODT, XBBBCD1;
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "category": XBBBDCategoryVal,
                                                                                                "type": XBBBDTypeVal,
                                                                                                "std": XBBBDSTDVal,
                                                                                                "name": XBBBDNameVal,
                                                                                                "thk": XBBBTHKDN,
                                                                                                "temp": XBBBDT,
                                                                                                "highLow": 2,
                                                                                                "isTube": 0,
                                                                                                "od": 100000
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                            },
                                                                                            success: function (result) {

                                                                                                XBBBODT = parseFloat(result.ot);
                                                                                                if (XBBBODT < 0) {
                                                                                                    south.html("查询底板材料设计温度许用应力失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }
                                                                                                XBBBCD1 = parseFloat(result.c1);
                                                                                                if (XBBBCD1 < 0) {
                                                                                                    south.html("查询底板材料厚度负偏差失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }

                                                                                                // 腐蚀裕量
                                                                                                if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) < XBBBTHKDN) {
                                                                                                    let XBBBCD2 = parseFloat(rows[29][columns[0][1].field]);

                                                                                                    // d1
                                                                                                    let XBBBD1;
                                                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) >= XBBBSSB) {
                                                                                                        XBBBD1 = parseFloat(rows[30][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) < XBBBSSB) {
                                                                                                        south.html("底板长度d1不得小于 " + XBBBSSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // d2
                                                                                                    let XBBBD2;
                                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= XBBBSSB) {
                                                                                                        XBBBD2 = parseFloat(rows[31][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) < XBBBSSB) {
                                                                                                        south.html("底板宽度d2不得小于 " + XBBBSSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // H
                                                                                                    let XBBBH;
                                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                                                                        XBBBH = parseFloat(rows[32][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH);
                                                                                                        xbbbSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbb").length > 0) {
                                                                                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbbd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH);
                                                                                                                xbbbSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbb").length > 0) {
                                                                                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // HC
                                                                                                    let XBBBHC;
                                                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) >= XBBBH) {
                                                                                                        XBBBHC = parseFloat(rows[33][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) < XBBBH) {
                                                                                                        south.html("底板下表面到设备质心高度 Hc 不得小于 " + XBBBH + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH, XBBBHC);
                                                                                                        xbbbSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbb").length > 0) {
                                                                                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH, XBBBHC);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbbd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH, XBBBHC);
                                                                                                                xbbbSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbb").length > 0) {
                                                                                                                        xbbb2d("Φ" + XBBBDS0, "Φ" + XBBBD0, XBBBBB, XBBBHF, XBBBTHKDN, XBBBH, XBBBHC);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // OC1ALLOW
                                                                                                    let XBBBOC1ALLOW;
                                                                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                                                                        XBBBOC1ALLOW = parseFloat(rows[34][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 载荷计算
                                                                                                    let XBBBPW = 1.2 * XBBBFI * XBBBQ0 * XBBBD0 * XBBBH0 / 1000000;
                                                                                                    let XBBBG = 9.8;
                                                                                                    let XBBBPE = XBBBAlphaE * XBBBM0 * XBBBG;
                                                                                                    let XBBBFH = Math.max(XBBBPW, XBBBPE + 0.25 * XBBBPW);
                                                                                                    let XBBBW1 = XBBBM0 * XBBBG;
                                                                                                    let XBBBR = XBBBFH / XBBBN;
                                                                                                    let XBBBS = XBBBSSB - XBBBSD;
                                                                                                    let XBBBDB = XBBBDS0 + 2 * (XBBBS / Math.sqrt(2) - Math.sqrt(2) * (XBBBSZ0 - XBBBSD)) - (XBBBDS0 - Math.sqrt(XBBBDS0 * XBBBDS0 - 2 * XBBBS * XBBBS));
                                                                                                    let XBBBFL1 = 4 * XBBBFH * XBBBHC / XBBBN / XBBBDB - XBBBW1 / XBBBN;
                                                                                                    let XBBBFL2 = XBBBW1 / XBBBN + 4 * XBBBFH * XBBBHC / XBBBN / XBBBDB;

                                                                                                    // 支腿计算
                                                                                                    let XBBBIMIN = Math.min(XBBBSIXX, XBBBSIYY);
                                                                                                    let XBBBIH = Math.sqrt(XBBBIMIN / XBBBSA);
                                                                                                    let XBBBLamuda = 0.7 * XBBBH / XBBBIH;
                                                                                                    let XBBBLamudaH = Math.sqrt((Math.PI * Math.PI * XBBBEST) / (0.6 * XBBBRSTEL));
                                                                                                    let XBBBNS = 3 / 2 + 2 / 3 * (XBBBLamuda / XBBBLamudaH) * (XBBBLamuda / XBBBLamudaH);
                                                                                                    let XBBBEta = 1.0;
                                                                                                    let XBBBOCRALLOW;
                                                                                                    if (XBBBLamuda <= XBBBLamudaH) {
                                                                                                        XBBBOCRALLOW = (1.2 * (1 - 0.4 * (XBBBLamuda / XBBBLamudaH) * (XBBBLamuda / XBBBLamudaH)) * XBBBRSTEL) / (XBBBNS * XBBBEta);
                                                                                                    }
                                                                                                    else {
                                                                                                        XBBBOCRALLOW = 0.227 * XBBBRSTEL / ((XBBBLamuda / XBBBLamudaH) * (XBBBLamuda / XBBBLamudaH));
                                                                                                    }
                                                                                                    south.html(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "支腿许用压应力：" + XBBBOCRALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBBOC = XBBBFL2 / XBBBSA;
                                                                                                    let XBBBOCCHK;
                                                                                                    if (XBBBOC <= XBBBOCRALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBBOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOCCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBBOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOCCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBBTau = XBBBR / XBBBSA;
                                                                                                    let XBBBTauAllow = 0.6 * XBBBOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用剪应力：" + XBBBTauAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBBTauCHK;
                                                                                                    if (XBBBTau <= XBBBTauAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBBTau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBTauCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBBTau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBTauCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBBL1 = XBBBH + XBBBHF / 2 + 50;
                                                                                                    let XBBBE = (XBBBDB - XBBBDS0) / 2;
                                                                                                    let XBBBOB = (XBBBR * XBBBL1 - XBBBFL2 * XBBBE) / XBBBSWMIN;
                                                                                                    let XBBBOBAllow = 1.5 * XBBBOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用弯曲应力：" + XBBBOBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBBOBCHK;
                                                                                                    if (XBBBOB <= XBBBOBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBBOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOBCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBBOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOBCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBBTotalCHK;
                                                                                                    if ((Math.abs(XBBBOC / XBBBOCRALLOW) + Math.abs(XBBBOB / XBBBOBAllow)) <= 1) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：合格" +
                                                                                                            "</span>");
                                                                                                        XBBBTotalCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：不合格" +
                                                                                                            "</span>");
                                                                                                        XBBBTotalCHK = "不合格";
                                                                                                    }

                                                                                                    // 地脚螺栓计算及校核
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用拉应力：" + XBBBOBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBBABT = Math.PI / 4 * (XBBBDMIN - 2 * XBBBCB2) * (XBBBDMIN - 2 * XBBBCB2);
                                                                                                    let XBBBOBT = Math.max(0, XBBBFL1 / (XBBBNBT * XBBBABT));
                                                                                                    let XBBBOBTCHK;
                                                                                                    if (XBBBOBT <= XBBBOBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBBOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBBOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOBTCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBBTauBT = Math.max(0, (XBBBFH - 0.4 * XBBBW1) / (XBBBN * XBBBNBT * XBBBABT));
                                                                                                    let XBBBTauBTAllow = 0.6 * XBBBOBTAllow;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用剪应力：" + XBBBTauBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBBTauBTCHK;
                                                                                                    if (XBBBTauBT <= XBBBTauBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBBTauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBTauBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBBTauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBTauBTCHK = "不合格";
                                                                                                    }

                                                                                                    // 基础应力计算及校核
                                                                                                    let XBBBOC1 = XBBBFL2 / (XBBBD1 * XBBBD2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "基础许用压应力：" + XBBBOC1ALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBBOC1CHK;
                                                                                                    if (XBBBOC1 <= XBBBOC1ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBBOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOC1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBBOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOC1CHK = "不合格";
                                                                                                    }

                                                                                                    // 底板计算及校核
                                                                                                    let XBBBTHKDC = XBBBBB * Math.sqrt(3 * XBBBOC1 / XBBBODT);
                                                                                                    let XBBBTHKDD = XBBBTHKDC + XBBBCD2;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "底板所需厚度：" + (XBBBTHKDD + XBBBCD1).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let XBBBTHKDCHK;
                                                                                                    if ((XBBBTHKDD + XBBBCD1) <= XBBBTHKDN) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBBTHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBBTHKDCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBBTHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBBTHKDCHK = "不合格";
                                                                                                    }

                                                                                                    // 装配焊缝
                                                                                                    let XBBBFai = 0.49;
                                                                                                    let XBBBBAllow = 1.5 * XBBBOST * XBBBFai;
                                                                                                    let XBBBHF1 = XBBBHF - 10;
                                                                                                    let XBBBZ = 2 * XBBBHF1 * XBBBHF1 / 6 * XBBBTF1 / Math.sqrt(2);

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用弯曲应力：" + XBBBBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBBOF = XBBBR * XBBBL1 / XBBBZ;
                                                                                                    let XBBBOFCHK;
                                                                                                    if (XBBBOF <= XBBBBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBBOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBBOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOFCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBBAF = 2 * XBBBHF1 * XBBBTF1 / Math.sqrt(2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用剪应力：" + XBBBBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBBTauF = XBBBFL2 / XBBBAF;
                                                                                                    let XBBBTauFCHK;
                                                                                                    if (XBBBTauF <= XBBBBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBBTauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBTauFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBBTauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBTauFCHK = "不合格";
                                                                                                    }

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用当量应力：" + XBBBBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBBOT = Math.sqrt(XBBBOF * XBBBOF + 3 * XBBBTauF * XBBBTauF);
                                                                                                    let XBBBOTCHK;
                                                                                                    if (XBBBOT <= XBBBBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBBOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOTCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBBOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBBOTCHK = "不合格";
                                                                                                    }

                                                                                                    // docx
                                                                                                    let XBBBPayJS = $('#payjs');

                                                                                                    function getDocx() {
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "xbbbdocx.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                ribbonName: "XBBB",

                                                                                                                t: XBBBDT,

                                                                                                                h0: XBBBH0,
                                                                                                                d0: XBBBD0,
                                                                                                                ds0: XBBBDS0,
                                                                                                                m0: XBBBM0,

                                                                                                                q0: XBBBQ0,
                                                                                                                fi: XBBBFI,
                                                                                                                eq: XBBBEQ,

                                                                                                                stds: XBBBSSTDVal,
                                                                                                                names: XBBBSNameVal,
                                                                                                                n: XBBBN,
                                                                                                                norms: XBBBSNormVal,
                                                                                                                bb: XBBBBB,
                                                                                                                hf: XBBBHF,
                                                                                                                tf1: XBBBTF1,

                                                                                                                stdb: XBBBBSTDVal,
                                                                                                                nameb: XBBBBNameVal,
                                                                                                                normb: XBBBNorms,
                                                                                                                nbt: XBBBNBT,
                                                                                                                cb2: XBBBCB2,

                                                                                                                stdd: XBBBDSTDVal,
                                                                                                                named: XBBBDNameVal,
                                                                                                                cd2: XBBBCD2,
                                                                                                                thkdn: XBBBTHKDN,
                                                                                                                d1: XBBBD1,
                                                                                                                d2: XBBBD2,
                                                                                                                h: XBBBH,
                                                                                                                hc: XBBBHC,

                                                                                                                oc1allow: XBBBOC1ALLOW,

                                                                                                                ostallow: XBBBOST.toFixed(4),
                                                                                                                rstel: XBBBRSTEL.toFixed(4),
                                                                                                                est: (XBBBEST / 1000).toFixed(4),
                                                                                                                sb: XBBBSSB.toFixed(4),
                                                                                                                d: XBBBSD.toFixed(4),
                                                                                                                a: XBBBSA.toFixed(4),
                                                                                                                densitys: XBBBSDensity.toFixed(4),
                                                                                                                ao: XBBBSAO.toFixed(4),
                                                                                                                ixx: XBBBSIXX.toFixed(4),
                                                                                                                iyy: XBBBSIYY.toFixed(4),
                                                                                                                wmin: XBBBSWMIN.toFixed(4),
                                                                                                                z0: XBBBSZ0.toFixed(4),

                                                                                                                densityb: XBBXBBensity.toFixed(4),
                                                                                                                obtallow: XBBBOBTAllow.toFixed(4),

                                                                                                                densityd: XBBBDDensity.toFixed(4),
                                                                                                                cd1: XBBBCD1.toFixed(4),
                                                                                                                odtallow: XBBBODT.toFixed(4),

                                                                                                                pw: XBBBPW.toFixed(4),
                                                                                                                alphae: XBBBAlphaE.toFixed(4),
                                                                                                                g: XBBBG.toFixed(4),
                                                                                                                pe: XBBBPE.toFixed(4),
                                                                                                                fh: XBBBFH.toFixed(4),
                                                                                                                w1: XBBBW1.toFixed(4),
                                                                                                                r: XBBBR.toFixed(4),
                                                                                                                s: XBBBS.toFixed(4),
                                                                                                                db: XBBBDB.toFixed(4),
                                                                                                                fl1: XBBBFL1.toFixed(4),
                                                                                                                fl2: XBBBFL2.toFixed(4),

                                                                                                                imin: XBBBIMIN.toFixed(4),
                                                                                                                ih: XBBBIH.toFixed(4),
                                                                                                                lamuda: XBBBLamuda.toFixed(4),
                                                                                                                lamudah: XBBBLamudaH.toFixed(4),
                                                                                                                ns: XBBBNS.toFixed(4),
                                                                                                                eta: XBBBEta.toFixed(4),
                                                                                                                ocrallow: XBBBOCRALLOW.toFixed(4),
                                                                                                                oc: XBBBOC.toFixed(4),
                                                                                                                occhk: XBBBOCCHK,
                                                                                                                tau: XBBBTau.toFixed(4),
                                                                                                                tauallow: XBBBTauAllow.toFixed(4),
                                                                                                                tauchk: XBBBTauCHK,
                                                                                                                l1: XBBBL1.toFixed(4),
                                                                                                                e: XBBBE.toFixed(4),
                                                                                                                ob: XBBBOB.toFixed(4),
                                                                                                                oballow: XBBBOBAllow.toFixed(4),
                                                                                                                obchk: XBBBOBCHK,
                                                                                                                totalchk: XBBBTotalCHK,

                                                                                                                dmin: XBBBDMIN.toFixed(4),
                                                                                                                abt: XBBBABT.toFixed(4),
                                                                                                                obt: XBBBOBT.toFixed(4),
                                                                                                                obtchk: XBBBOBTCHK,
                                                                                                                taubt: XBBBTauBT.toFixed(4),
                                                                                                                taubtallow: XBBBTauBTAllow.toFixed(4),
                                                                                                                taubtchk: XBBBTauBTCHK,

                                                                                                                oc1: XBBBOC1.toFixed(4),
                                                                                                                oc1chk: XBBBOC1CHK,

                                                                                                                thkdc: XBBBTHKDC.toFixed(4),
                                                                                                                thkdd: XBBBTHKDD.toFixed(4),
                                                                                                                thkdchk: XBBBTHKDCHK,

                                                                                                                fai: XBBBFai.toFixed(4),
                                                                                                                ballow: XBBBBAllow.toFixed(4),
                                                                                                                hf1: XBBBHF1.toFixed(4),
                                                                                                                z: XBBBZ.toFixed(4),
                                                                                                                of: XBBBOF.toFixed(4),
                                                                                                                ofchk: XBBBOFCHK,
                                                                                                                af: XBBBAF.toFixed(4),
                                                                                                                tauf: XBBBTauF.toFixed(4),
                                                                                                                taufchk: XBBBTauFCHK,
                                                                                                                ot: XBBBOT.toFixed(4),
                                                                                                                otchk: XBBBOTCHK
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
                                                                                                                    let query = null,
                                                                                                                        status;
                                                                                                                    XBBBPayJS.dialog({
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
                                                                                                                                XBBBPayJS.dialog("close");
                                                                                                                                XBBBPayJS.dialog("clear");
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
                                                                                                                                            XBBBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                    XBBBPayJS.dialog('close');
                                                                                                                                                    XBBBPayJS.dialog('clear');
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
                                                                                                else if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) >= XBBBTHKDN) {
                                                                                                    south.html("底板腐蚀裕量不得大于 " + XBBBTHKDN + " mm").css("color", "red");
                                                                                                    return false;
                                                                                                }
                                                                                                else {
                                                                                                    return false;
                                                                                                }
                                                                                            },
                                                                                            error: function () {
                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBBDThkMin) {
                                                                                        south.html("底板名义厚度 δdn 不得小于等于 " + XBBBDThkMin).css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBBDThkMax) {
                                                                                        south.html("底板名义厚度 δdn 不得大于 " + XBBBDThkMax).css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }
                                                                                },
                                                                                error: function () {
                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                        "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                        && parseFloat(rows[23][columns[0][1].field]) >= XBBBDMIN / 2) {
                                                                        south.html("螺栓腐蚀裕量不得大于 " + XBBBDMIN / 2 + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }
                                                                },
                                                                error: function () {
                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                }
                                                            });
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBBBThkMin) {
                                                            south.html("螺栓规格不得小于等于 M" + XBBBBThkMin).css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBBBThkMax) {
                                                            south.html("螺栓规格不得大于 M" + XBBBBThkMax).css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    },
                                                    error: function () {
                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                            "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                    }
                                                });
                                            }
                                            else {
                                                return false;
                                            }
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