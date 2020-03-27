$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbbdSketch = $("#d2");
    let xbbdModel = $("#d3");
    let xbbdd2d3 = $('#d2d3');

    $("#cal").html("<table id='xbbd'></table>");
    let pg = $("#xbbd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/b/d/XBBD.json", function (result) {

        let XBBDDT,
            XBBDSCategory, XBBDSCategoryVal, XBBDSType, XBBDSTypeVal, XBBDSSTD, XBBDSSTDVal, XBBDSName, XBBDSNameVal,
            XBBDSNorm, XBBDSNormVal,
            XBBDSDensity, XBBDSThkMax, XBBDSThkMin,
            XBBDBCategory, XBBDBCategoryVal, XBBDBType, XBBDBTypeVal, XBBDBSTD, XBBDBSTDVal, XBBDBName, XBBDBNameVal,
            XBBDDCategory, XBBDDCategoryVal, XBBDDType, XBBDDTypeVal, XBBDDSTD, XBBDDSTDVal, XBBDDName, XBBDDNameVal,
            columns, rows, ed;

        function xbbd2d(ds0 = "ΦDs0", d0 = "ΦD0", b = "B", hf = "hf",
                        thkdn = "δdn", h = "H", hc = "Hc") {

            xbbdSketch.empty();

            let width = xbbdSketch.width();
            let height = xbbdSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XBBDSVG").attr("height", height);

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
                {x: xaxis - gg / 2 - sdo / 2 + 1, y: height / 2 + 0.4 * hg + sdo / 2 - 1},
                {x: xaxis - gg / 2 - sdo / 2 + 1, y: height - padding}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5,5");
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo / 2 - 1, y: height / 2 + 0.4 * hg + sdo / 2 + 1},
                {x: xaxis - gg / 2 - sdo / 2 - 1, y: height - padding}
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
                {x: xaxis + gg / 2 + sdo / 2 + 1, y: height / 2 + 0.4 * hg + sdo / 2 + 1},
                {x: xaxis + gg / 2 + sdo / 2 + 1, y: height - padding}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5,5");
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo / 2 - 1, y: height / 2 + 0.4 * hg + sdo / 2 - 1},
                {x: xaxis + gg / 2 + sdo / 2 - 1, y: height - padding}
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
            dimTopH(xaxis - gg / 2 - 10, height / 2, xaxis + gg / 2 + 10, height / 2, d0, "XBBDSketchD0");
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8, xaxis - gg / 2, height / 2 - 8 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 5, xaxis - gg / 2, height / 2 - 8 - 5 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 10, xaxis - gg / 2, height / 2 - 8 - 5 - 10);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 15, xaxis - gg / 2, height / 2 - 8 - 5 - 15);
            drawLine(xaxis + gg / 2, height / 2 - 8, xaxis + gg / 2 + 10, height / 2 - 8 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 5, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 10, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 10);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 15, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 15);

            //ds0
            dimTopH(xaxis - gg / 2, height / 2 - 20, xaxis + gg / 2, height / 2 - 20, ds0, "XBBDSketchDS0");

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
            ])).attr("id", "XBBDSketchB").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBDSketchB")
                .attr("startOffset", "50%").text(b);

            // hf
            dimRightV(xaxis - gg / 2, height - padding - hg - 5 - 5, xaxis - gg / 2, height / 2 + 0.4 * hg, hf, "XBBDSketchHF");

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
            ])).attr("id", "XBBDSketchTHKDN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBDSketchTHKDN").attr("startOffset", "50%").text(thkdn);

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
                ])).classed("sketch", true).attr("id", "XBBDSketch50");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBDSketch50")
                .attr("startOffset", "50%").text("50mm不焊");

            // H
            dimLeftV(xaxis - gg / 2 - sdo - 10 - 40 + 3, height - padding + thk, xaxis - gg / 2 - sdo - 10 - 40 + 3, padding + 3 * hg - 5, h, "XBBDSketchH");
            drawLine(xaxis - gg / 2 - sdo - 10 - 40 - 3, padding + 3 * hg - 5, xaxis - gg / 2 - 3, padding + 3 * hg - 5);

            // hc
            dimRightV(xaxis + gg / 2 + sdo + 10, height - padding + thk,
                xaxis + gg / 2 + sdo + 10, height / 2,
                hc, "XBBDSketchHC");
            drawLine(xaxis + gg / 2 + sdo + 10 + 3, height / 2, padding + 2 * wg + 2 + 3, height / 2);
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo + 10 + 40, y: height / 2},
                {x: xaxis + gg / 2 + sdo + 10 + 40 + 30, y: height / 2}
            ])).attr("id", "XBBDSketchCG");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBDSketchCG")
                .attr("startOffset", "50%").text("C.G.");
        }

        currentTabIndex = xbbdd2d3.tabs('getTabIndex', xbbdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbbd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xbbd").length > 0) {
                    xbbd2d();
                }
            });
        }
        xbbdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbbd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xbbd").length > 0) {
                            xbbd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "JB/T 4712.2-2007 工字钢腿式支座计算",
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
                    $(ed.target).combobox("loadData", XBBDSCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", XBBDSType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", XBBDSSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", XBBDSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", XBBDSNorm);
                }

                else if (index === 17) {
                    $(ed.target).combobox("loadData", XBBDBCategory);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", XBBDBType);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", XBBDBSTD);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", XBBDBName);
                }

                else if (index === 24) {
                    $(ed.target).combobox("loadData", XBBDDCategory);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", XBBDDType);
                }
                else if (index === 26) {
                    $(ed.target).combobox("loadData", XBBDDSTD);
                }
                else if (index === 27) {
                    $(ed.target).combobox("loadData", XBBDDName);
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
                    xbbdSketch.empty();
                    xbbdModel.empty();

                    // sketch
                    currentTabIndex = xbbdd2d3.tabs('getTabIndex', xbbdd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        xbbd2d();
                        xbbdSketch.off("resize").on("resize", function () {
                            if ($("#xbbd").length > 0) {
                                xbbd2d();
                            }
                        });
                    }
                    xbbdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbbd2d();
                                xbbdSketch.off("resize").on("resize", function () {
                                    if ($("#xbbd").length > 0) {
                                        xbbd2d();
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

                        XBBDDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XBBDSCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBDSType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBDSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBDSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBDSNorm = null;

                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBBDBCategory = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBDBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBDBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBDBName = null;

                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBBDDCategory = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBDDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBDDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBDDName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDSCategory = [];
                                XBBDBCategory = [];
                                XBBDDCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XBBDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XBBDSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBDDCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBDBCategory[index] = {
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

                        XBBDSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBDSType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBDSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBDSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBDSNorm = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDSCategoryVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDSType = [];
                                $(result).each(function (index, element) {
                                    XBBDSType[index] = {
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

                        XBBDSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBDSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBDSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBDSNorm = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDSCategoryVal,
                                type: XBBDSTypeVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDSSTD = [];
                                $(result).each(function (index, element) {
                                    XBBDSSTD[index] = {
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

                        XBBDSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBDSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBDSNorm = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDSCategoryVal,
                                type: XBBDSTypeVal,
                                std: XBBDSSTDVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDSName = [];
                                $(result).each(function (index, element) {
                                    XBBDSName[index] = {
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

                        XBBDSNameVal = changes.value;

                        // 将 norms 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBDSNorm = null;

                        // AJAX 获取材料密度、最大最小厚度
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": XBBDSCategoryVal,
                                "type": XBBDSTypeVal,
                                "std": XBBDSSTDVal,
                                "name": XBBDSNameVal,
                                "temp": XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                XBBDSDensity = parseFloat(result.density);
                                XBBDSThkMin = parseFloat(result.thkMin);
                                XBBDSThkMax = parseFloat(result.thkMax);

                                // 获取 norm 列表
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "gbt_706_2016_list_table_a1_norms.action",
                                    async: false,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        thkMax: XBBDSThkMax,
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        XBBDSNorm = [];
                                        $(result).each(function (index, element) {
                                            XBBDSNorm[index] = {
                                                "value": element,
                                                "text": element
                                            };
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;工字钢规格获取失败，请检查网络后重试</span>");
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

                        XBBDBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBDBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBDBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBDBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDBCategoryVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDBType = [];
                                $(result).each(function (index, element) {
                                    XBBDBType[index] = {
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

                        XBBDBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBDBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBDBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDBCategoryVal,
                                type: XBBDBTypeVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDBSTD = [];
                                $(result).each(function (index, element) {
                                    XBBDBSTD[index] = {
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

                        XBBDBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBDBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDBCategoryVal,
                                type: XBBDBTypeVal,
                                std: XBBDBSTDVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDBName = [];
                                $(result).each(function (index, element) {
                                    XBBDBName[index] = {
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

                        XBBDDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBDDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBDDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBDDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDDCategoryVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDDType = [];
                                $(result).each(function (index, element) {
                                    XBBDDType[index] = {
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

                        XBBDDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBDDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBDDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDDCategoryVal,
                                type: XBBDDTypeVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDDSTD = [];
                                $(result).each(function (index, element) {
                                    XBBDDSTD[index] = {
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

                        XBBDDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBDDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBDDCategoryVal,
                                type: XBBDDTypeVal,
                                std: XBBDDSTDVal,
                                temp: XBBDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBDDName = [];
                                $(result).each(function (index, element) {
                                    XBBDDName[index] = {
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
                        let XBBDH0;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XBBDH0 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Ds0
                        let XBBDDS0;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XBBDDS0 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbd2d("Φ" + XBBDDS0);
                            xbbdSketch.off("resize").on("resize", function () {
                                if ($("#xbbd").length > 0) {
                                    xbbd2d("Φ" + XBBDDS0);
                                }
                            });
                        }
                        xbbdd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbd2d("Φ" + XBBDDS0);
                                    xbbdSketch.off("resize").on("resize", function () {
                                        if ($("#xbbd").length > 0) {
                                            xbbd2d("Φ" + XBBDDS0);
                                        }
                                    });
                                }
                            }
                        });

                        // D0
                        let XBBDD0;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) >= XBBDDS0) {
                            XBBDD0 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) < XBBDDS0) {
                            south.html("壳体外直径(含保温层) D<sub>0</sub> 不得小于 " + XBBDDS0 + " mm").css("color", "red");
                            return false;
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0);
                            xbbdSketch.off("resize").on("resize", function () {
                                if ($("#xbbd").length > 0) {
                                    xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0);
                                }
                            });
                        }
                        xbbdd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0);
                                    xbbdSketch.off("resize").on("resize", function () {
                                        if ($("#xbbd").length > 0) {
                                            xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0);
                                        }
                                    });
                                }
                            }
                        });

                        // M0
                        let XBBDM0;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            XBBDM0 = parseFloat(rows[4][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Q0
                        let XBBDQ0;
                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                            XBBDQ0 = parseFloat(rows[5][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // FI
                        let XBBDFI;
                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                            XBBDFI = parseFloat(rows[6][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // EQ
                        let XBBDEQ;
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XBBDEQ = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // alphae
                        let XBBDAlphaE;
                        if (XBBDEQ === "0.1g") {
                            XBBDAlphaE = 0.08;
                        }
                        else if (XBBDEQ === "0.15g") {
                            XBBDAlphaE = 0.12;
                        }
                        else if (XBBDEQ === "0.2g") {
                            XBBDAlphaE = 0.16;
                        }
                        else if (XBBDEQ === "0.3g") {
                            XBBDAlphaE = 0.24;
                        }
                        else if (XBBDEQ === "0.4g") {
                            XBBDAlphaE = 0.32;
                        }
                        else {
                            return false;
                        }

                        // 工字钢规格
                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                            XBBDSNormVal = rows[12][columns[0][1].field];

                            // AJAX 获取工字钢截面特性
                            let XBBDSSH, XBBDSSB, XBBDSD, XBBDSTM, XBBDSA, XBBDSAO, XBBDSIXX, XBBDSIYY, XBBDSWMIN;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "gbt_706_2016_get_table_a1_details.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "norms": XBBDSNormVal
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XBBDSSH = parseFloat(result.h);
                                    XBBDSSB = parseFloat(result.b);
                                    XBBDSD = parseFloat(result.d);
                                    XBBDSTM = parseFloat(result.t);
                                    XBBDSA = 100 * parseFloat(result.sectionArea);
                                    XBBDSAO = parseFloat(result.outerArea);
                                    XBBDSIXX = 10000 * parseFloat(result.bix);
                                    XBBDSIYY = 10000 * parseFloat(result.biy);
                                    XBBDSWMIN = 1000 * Math.min(parseFloat(result.wx), parseFloat(result.wy));

                                    // 获取工字钢许用应力、弹性模量、屈服强度
                                    let XBBDOST, XBBDRSTEL, XBBDEST;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XBBDSCategoryVal,
                                            "type": XBBDSTypeVal,
                                            "std": XBBDSSTDVal,
                                            "name": XBBDSNameVal,
                                            "thk": XBBDSD,
                                            "temp": XBBDDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XBBDOST = parseFloat(result.ot);
                                            if (XBBDOST < 0) {
                                                south.html("查询支腿材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBDRSTEL = parseFloat(result.relt);
                                            if (XBBDRSTEL < 0) {
                                                south.html("查询支腿材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBDEST = 1000 * parseFloat(result.et);
                                            if (XBBDEST < 0) {
                                                south.html("查询支腿材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // N
                                            let XBBDN;
                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                XBBDN = parseFloat(rows[13][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // BB
                                            let XBBDBB;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                XBBDBB = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB);
                                                xbbdSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbd").length > 0) {
                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB);
                                                    }
                                                });
                                            }
                                            xbbdd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB);
                                                        xbbdSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbd").length > 0) {
                                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // HF
                                            let XBBDHF;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                XBBDHF = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF);
                                                xbbdSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbd").length > 0) {
                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF);
                                                    }
                                                });
                                            }
                                            xbbdd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF);
                                                        xbbdSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbd").length > 0) {
                                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // TF1
                                            let XBBDTF1;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                XBBDTF1 = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            //地脚螺栓材料
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                XBBDBNameVal = rows[20][columns[0][1].field];

                                                // AJAX 获取螺栓材料密度、最大最小厚度
                                                let XBBDBDensity, XBBDBThkMin, XBBDBThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": XBBDBCategoryVal,
                                                        "type": XBBDBTypeVal,
                                                        "std": XBBDBSTDVal,
                                                        "name": XBBDBNameVal,
                                                        "temp": XBBDDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        XBBDBDensity = parseFloat(result.density);
                                                        XBBDBThkMin = parseFloat(result.thkMin);
                                                        XBBDBThkMax = parseFloat(result.thkMax);

                                                        // 螺纹规格
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBDBThkMin
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBDBThkMax) {
                                                            let XBBDNorms = rows[21][columns[0][1].field];

                                                            // 获取螺纹小径
                                                            let XBBDDMIN;
                                                            if (XBBDNorms === "M12") {
                                                                XBBDDMIN = 10.106;
                                                            }
                                                            else if (XBBDNorms === "M16") {
                                                                XBBDDMIN = 13.835;
                                                            }
                                                            else if (XBBDNorms === "M20") {
                                                                XBBDDMIN = 17.294;
                                                            }
                                                            else if (XBBDNorms === "M22") {
                                                                XBBDDMIN = 19.294;
                                                            }
                                                            else if (XBBDNorms === "M24") {
                                                                XBBDDMIN = 20.752;
                                                            }
                                                            else if (XBBDNorms === "M27") {
                                                                XBBDDMIN = 23.752;
                                                            }
                                                            else if (XBBDNorms === "M30") {
                                                                XBBDDMIN = 26.211;
                                                            }
                                                            else if (XBBDNorms === "M36") {
                                                                XBBDDMIN = 31.670;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 螺栓设计应力
                                                            let XBBDOBTAllow;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": XBBDBCategoryVal,
                                                                    "type": XBBDBTypeVal,
                                                                    "std": XBBDBSTDVal,
                                                                    "name": XBBDBNameVal,
                                                                    "thk": parseFloat(XBBDNorms.substring(1)),
                                                                    "temp": XBBDDT,
                                                                    "highLow": 2,
                                                                    "isTube": 0,
                                                                    "od": parseFloat(XBBDNorms.substring(1))
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    XBBDOBTAllow = parseFloat(result.ot);
                                                                    if (XBBDOBTAllow < 0) {
                                                                        south.html("查询螺栓材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // nbt
                                                                    let XBBDNBT;
                                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                                        XBBDNBT = parseFloat(rows[22][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                        && parseFloat(rows[23][columns[0][1].field]) < XBBDDMIN / 2) {
                                                                        let XBBDCB2 = parseFloat(rows[23][columns[0][1].field]);

                                                                        // 底板材料
                                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                            XBBDDNameVal = rows[27][columns[0][1].field];

                                                                            // AJAX 获取底板材料密度、最大最小厚度
                                                                            let XBBDDDensity, XBBDDThkMin, XBBDDThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": XBBDDCategoryVal,
                                                                                    "type": XBBDDTypeVal,
                                                                                    "std": XBBDDSTDVal,
                                                                                    "name": XBBDDNameVal,
                                                                                    "temp": XBBDDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    XBBDDDensity = parseFloat(result.density);
                                                                                    XBBDDThkMin = parseFloat(result.thkMin);
                                                                                    XBBDDThkMax = parseFloat(result.thkMax);

                                                                                    // thkdn
                                                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBDDThkMin
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBDDThkMax) {
                                                                                        let XBBDTHKDN = parseFloat(rows[28][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN);
                                                                                            xbbdSketch.off("resize").on("resize", function () {
                                                                                                if ($("#xbbd").length > 0) {
                                                                                                    xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        xbbdd2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN);
                                                                                                    xbbdSketch.off("resize").on("resize", function () {
                                                                                                        if ($("#xbbd").length > 0) {
                                                                                                            xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 底板设计应力、负偏差
                                                                                        let XBBDODT, XBBDCD1;
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "category": XBBDDCategoryVal,
                                                                                                "type": XBBDDTypeVal,
                                                                                                "std": XBBDDSTDVal,
                                                                                                "name": XBBDDNameVal,
                                                                                                "thk": XBBDTHKDN,
                                                                                                "temp": XBBDDT,
                                                                                                "highLow": 2,
                                                                                                "isTube": 0,
                                                                                                "od": 100000
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                            },
                                                                                            success: function (result) {

                                                                                                XBBDODT = parseFloat(result.ot);
                                                                                                if (XBBDODT < 0) {
                                                                                                    south.html("查询底板材料设计温度许用应力失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }
                                                                                                XBBDCD1 = parseFloat(result.c1);
                                                                                                if (XBBDCD1 < 0) {
                                                                                                    south.html("查询底板材料厚度负偏差失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }

                                                                                                // 腐蚀裕量
                                                                                                if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) < XBBDTHKDN) {
                                                                                                    let XBBDCD2 = parseFloat(rows[29][columns[0][1].field]);

                                                                                                    // d1
                                                                                                    let XBBDD1;
                                                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) >= XBBDSSB) {
                                                                                                        XBBDD1 = parseFloat(rows[30][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) < XBBDSSB) {
                                                                                                        south.html("底板长度d1不得小于 " + XBBDSSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // d2
                                                                                                    let XBBDD2;
                                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= XBBDSSB) {
                                                                                                        XBBDD2 = parseFloat(rows[31][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) < XBBDSSB) {
                                                                                                        south.html("底板宽度d2不得小于 " + XBBDSSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // H
                                                                                                    let XBBDH;
                                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                                                                        XBBDH = parseFloat(rows[32][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH);
                                                                                                        xbbdSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbd").length > 0) {
                                                                                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbdd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH);
                                                                                                                xbbdSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbd").length > 0) {
                                                                                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // HC
                                                                                                    let XBBDHC;
                                                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) >= XBBDH) {
                                                                                                        XBBDHC = parseFloat(rows[33][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) < XBBDH) {
                                                                                                        south.html("底板下表面到设备质心高度 Hc 不得小于 " + XBBDH + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH, XBBDHC);
                                                                                                        xbbdSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbd").length > 0) {
                                                                                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH, XBBDHC);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbdd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH, XBBDHC);
                                                                                                                xbbdSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbd").length > 0) {
                                                                                                                        xbbd2d("Φ" + XBBDDS0, "Φ" + XBBDD0, XBBDBB, XBBDHF, XBBDTHKDN, XBBDH, XBBDHC);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // OC1ALLOW
                                                                                                    let XBBDOC1ALLOW;
                                                                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                                                                        XBBDOC1ALLOW = parseFloat(rows[34][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 载荷计算
                                                                                                    let XBBDPW = 1.2 * XBBDFI * XBBDQ0 * XBBDD0 * XBBDH0 / 1000000;
                                                                                                    let XBBDG = 9.8;
                                                                                                    let XBBDPE = XBBDAlphaE * XBBDM0 * XBBDG;
                                                                                                    let XBBDFH = Math.max(XBBDPW, XBBDPE + 0.25 * XBBDPW);
                                                                                                    let XBBDW1 = XBBDM0 * XBBDG;
                                                                                                    let XBBDR = XBBDFH / XBBDN;
                                                                                                    let XBBDDB = XBBDSSB + Math.sqrt(XBBDDS0 * XBBDDS0 - (XBBDSSH - 2 * XBBDSTM) * (XBBDSSH - 2 * XBBDSTM));
                                                                                                    let XBBDFL1 = 4 * XBBDFH * XBBDHC / XBBDN / XBBDDB - XBBDW1 / XBBDN;
                                                                                                    let XBBDFL2 = XBBDW1 / XBBDN + 4 * XBBDFH * XBBDHC / XBBDN / XBBDDB;

                                                                                                    // 支腿计算
                                                                                                    let XBBDIMIN = Math.min(XBBDSIXX, XBBDSIYY);
                                                                                                    let XBBDIH = Math.sqrt(XBBDIMIN / XBBDSA);
                                                                                                    let XBBDLamuda = 0.7 * XBBDH / XBBDIH;
                                                                                                    let XBBDLamudaH = Math.sqrt((Math.PI * Math.PI * XBBDEST) / (0.6 * XBBDRSTEL));
                                                                                                    let XBBDNS = 3 / 2 + 2 / 3 * (XBBDLamuda / XBBDLamudaH) * (XBBDLamuda / XBBDLamudaH);
                                                                                                    let XBBDEta = 1.0;
                                                                                                    let XBBDOCRALLOW;
                                                                                                    if (XBBDLamuda <= XBBDLamudaH) {
                                                                                                        XBBDOCRALLOW = (1.2 * (1 - 0.4 * (XBBDLamuda / XBBDLamudaH) * (XBBDLamuda / XBBDLamudaH)) * XBBDRSTEL) / (XBBDNS * XBBDEta);
                                                                                                    }
                                                                                                    else {
                                                                                                        XBBDOCRALLOW = 0.227 * XBBDRSTEL / ((XBBDLamuda / XBBDLamudaH) * (XBBDLamuda / XBBDLamudaH));
                                                                                                    }
                                                                                                    south.html(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "支腿许用压应力：" + XBBDOCRALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBDOC = XBBDFL2 / XBBDSA;
                                                                                                    let XBBDOCCHK;
                                                                                                    if (XBBDOC <= XBBDOCRALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBDOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOCCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBDOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOCCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBDTau = XBBDR / XBBDSA;
                                                                                                    let XBBDTauAllow = 0.6 * XBBDOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用剪应力：" + XBBDTauAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBDTauCHK;
                                                                                                    if (XBBDTau <= XBBDTauAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBDTau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDTauCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBDTau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDTauCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBDL1 = XBBDH + XBBDHF / 2 + 50;
                                                                                                    let XBBDE = (XBBDDB - XBBDDS0) / 2;
                                                                                                    let XBBDOB = (XBBDR * XBBDL1 - XBBDFL2 * XBBDE) / XBBDSWMIN;
                                                                                                    let XBBDOBAllow = 1.5 * XBBDOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用弯曲应力：" + XBBDOBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBDOBCHK;
                                                                                                    if (XBBDOB <= XBBDOBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBDOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOBCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBDOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOBCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBDTotalCHK;
                                                                                                    if ((Math.abs(XBBDOC / XBBDOCRALLOW) + Math.abs(XBBDOB / XBBDOBAllow)) <= 1) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：合格" +
                                                                                                            "</span>");
                                                                                                        XBBDTotalCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：不合格" +
                                                                                                            "</span>");
                                                                                                        XBBDTotalCHK = "不合格";
                                                                                                    }

                                                                                                    // 地脚螺栓计算及校核
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用拉应力：" + XBBDOBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBDABT = Math.PI / 4 * (XBBDDMIN - 2 * XBBDCB2) * (XBBDDMIN - 2 * XBBDCB2);
                                                                                                    let XBBDOBT = Math.max(0, XBBDFL1 / (XBBDNBT * XBBDABT));
                                                                                                    let XBBDOBTCHK;
                                                                                                    if (XBBDOBT <= XBBDOBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBDOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBDOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOBTCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBDTauBT = Math.max(0, (XBBDFH - 0.4 * XBBDW1) / (XBBDN * XBBDNBT * XBBDABT));
                                                                                                    let XBBDTauBTAllow = 0.6 * XBBDOBTAllow;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用剪应力：" + XBBDTauBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBDTauBTCHK;
                                                                                                    if (XBBDTauBT <= XBBDTauBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBDTauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDTauBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBDTauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDTauBTCHK = "不合格";
                                                                                                    }

                                                                                                    // 基础应力计算及校核
                                                                                                    let XBBDOC1 = XBBDFL2 / (XBBDD1 * XBBDD2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "基础许用压应力：" + XBBDOC1ALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBDOC1CHK;
                                                                                                    if (XBBDOC1 <= XBBDOC1ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBDOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOC1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBDOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOC1CHK = "不合格";
                                                                                                    }

                                                                                                    // 底板计算及校核
                                                                                                    let XBBDTHKDC = XBBDBB * Math.sqrt(3 * XBBDOC1 / XBBDODT);
                                                                                                    let XBBDTHKDD = XBBDTHKDC + XBBDCD2;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "底板所需厚度：" + (XBBDTHKDD + XBBDCD1).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let XBBDTHKDCHK;
                                                                                                    if ((XBBDTHKDD + XBBDCD1) <= XBBDTHKDN) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBDTHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBDTHKDCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBDTHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBDTHKDCHK = "不合格";
                                                                                                    }

                                                                                                    // 装配焊缝
                                                                                                    let XBBDFai = 0.49;
                                                                                                    let XBBDBAllow = 1.5 * XBBDOST * XBBDFai;
                                                                                                    let XBBDHF1 = XBBDHF - 10;
                                                                                                    let XBBDZ = 2 * XBBDHF1 * XBBDHF1 / 6 * XBBDTF1 / Math.sqrt(2);

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用弯曲应力：" + XBBDBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBDOF = XBBDR * XBBDL1 / XBBDZ;
                                                                                                    let XBBDOFCHK;
                                                                                                    if (XBBDOF <= XBBDBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBDOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBDOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOFCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBDAF = 2 * XBBDHF1 * XBBDTF1 / Math.sqrt(2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用剪应力：" + XBBDBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBDTauF = XBBDFL2 / XBBDAF;
                                                                                                    let XBBDTauFCHK;
                                                                                                    if (XBBDTauF <= XBBDBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBDTauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDTauFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBDTauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDTauFCHK = "不合格";
                                                                                                    }

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用当量应力：" + XBBDBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBDOT = Math.sqrt(XBBDOF * XBBDOF + 3 * XBBDTauF * XBBDTauF);
                                                                                                    let XBBDOTCHK;
                                                                                                    if (XBBDOT <= XBBDBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBDOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOTCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBDOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBDOTCHK = "不合格";
                                                                                                    }

                                                                                                    // docx
                                                                                                    let XBBDPayJS = $('#payjs');

                                                                                                    function getDocx() {
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "xbbddocx.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                ribbonName: "XBBD",

                                                                                                                t: XBBDDT,

                                                                                                                h0: XBBDH0,
                                                                                                                d0: XBBDD0,
                                                                                                                ds0: XBBDDS0,
                                                                                                                m0: XBBDM0,

                                                                                                                q0: XBBDQ0,
                                                                                                                fi: XBBDFI,
                                                                                                                eq: XBBDEQ,

                                                                                                                stds: XBBDSSTDVal,
                                                                                                                names: XBBDSNameVal,
                                                                                                                n: XBBDN,
                                                                                                                norms: XBBDSNormVal,
                                                                                                                bb: XBBDBB,
                                                                                                                hf: XBBDHF,
                                                                                                                tf1: XBBDTF1,

                                                                                                                stdb: XBBDBSTDVal,
                                                                                                                nameb: XBBDBNameVal,
                                                                                                                normb: XBBDNorms,
                                                                                                                nbt: XBBDNBT,
                                                                                                                cb2: XBBDCB2,

                                                                                                                stdd: XBBDDSTDVal,
                                                                                                                named: XBBDDNameVal,
                                                                                                                cd2: XBBDCD2,
                                                                                                                thkdn: XBBDTHKDN,
                                                                                                                d1: XBBDD1,
                                                                                                                d2: XBBDD2,
                                                                                                                h: XBBDH,
                                                                                                                hc: XBBDHC,

                                                                                                                oc1allow: XBBDOC1ALLOW,

                                                                                                                ostallow: XBBDOST.toFixed(4),
                                                                                                                rstel: XBBDRSTEL.toFixed(4),
                                                                                                                est: (XBBDEST / 1000).toFixed(4),
                                                                                                                sh: XBBDSSH.toFixed(4),
                                                                                                                sb: XBBDSSB.toFixed(4),
                                                                                                                d: XBBDSD.toFixed(4),
                                                                                                                tm: XBBDSTM.toFixed(4),
                                                                                                                a: XBBDSA.toFixed(4),
                                                                                                                densitys: XBBDSDensity.toFixed(4),
                                                                                                                ao: XBBDSAO.toFixed(4),
                                                                                                                ixx: XBBDSIXX.toFixed(4),
                                                                                                                iyy: XBBDSIYY.toFixed(4),
                                                                                                                wmin: XBBDSWMIN.toFixed(4),

                                                                                                                densityb: XBBDBDensity.toFixed(4),
                                                                                                                obtallow: XBBDOBTAllow.toFixed(4),

                                                                                                                densityd: XBBDDDensity.toFixed(4),
                                                                                                                cd1: XBBDCD1.toFixed(4),
                                                                                                                odtallow: XBBDODT.toFixed(4),

                                                                                                                pw: XBBDPW.toFixed(4),
                                                                                                                alphae: XBBDAlphaE.toFixed(4),
                                                                                                                g: XBBDG.toFixed(4),
                                                                                                                pe: XBBDPE.toFixed(4),
                                                                                                                fh: XBBDFH.toFixed(4),
                                                                                                                w1: XBBDW1.toFixed(4),
                                                                                                                r: XBBDR.toFixed(4),
                                                                                                                db: XBBDDB.toFixed(4),
                                                                                                                fl1: XBBDFL1.toFixed(4),
                                                                                                                fl2: XBBDFL2.toFixed(4),

                                                                                                                imin: XBBDIMIN.toFixed(4),
                                                                                                                ih: XBBDIH.toFixed(4),
                                                                                                                lamuda: XBBDLamuda.toFixed(4),
                                                                                                                lamudah: XBBDLamudaH.toFixed(4),
                                                                                                                ns: XBBDNS.toFixed(4),
                                                                                                                eta: XBBDEta.toFixed(4),
                                                                                                                ocrallow: XBBDOCRALLOW.toFixed(4),
                                                                                                                oc: XBBDOC.toFixed(4),
                                                                                                                occhk: XBBDOCCHK,
                                                                                                                tau: XBBDTau.toFixed(4),
                                                                                                                tauallow: XBBDTauAllow.toFixed(4),
                                                                                                                tauchk: XBBDTauCHK,
                                                                                                                l1: XBBDL1.toFixed(4),
                                                                                                                e: XBBDE.toFixed(4),
                                                                                                                ob: XBBDOB.toFixed(4),
                                                                                                                oballow: XBBDOBAllow.toFixed(4),
                                                                                                                obchk: XBBDOBCHK,
                                                                                                                totalchk: XBBDTotalCHK,

                                                                                                                dmin: XBBDDMIN.toFixed(4),
                                                                                                                abt: XBBDABT.toFixed(4),
                                                                                                                obt: XBBDOBT.toFixed(4),
                                                                                                                obtchk: XBBDOBTCHK,
                                                                                                                taubt: XBBDTauBT.toFixed(4),
                                                                                                                taubtallow: XBBDTauBTAllow.toFixed(4),
                                                                                                                taubtchk: XBBDTauBTCHK,

                                                                                                                oc1: XBBDOC1.toFixed(4),
                                                                                                                oc1chk: XBBDOC1CHK,

                                                                                                                thkdc: XBBDTHKDC.toFixed(4),
                                                                                                                thkdd: XBBDTHKDD.toFixed(4),
                                                                                                                thkdchk: XBBDTHKDCHK,

                                                                                                                fai: XBBDFai.toFixed(4),
                                                                                                                ballow: XBBDBAllow.toFixed(4),
                                                                                                                hf1: XBBDHF1.toFixed(4),
                                                                                                                z: XBBDZ.toFixed(4),
                                                                                                                of: XBBDOF.toFixed(4),
                                                                                                                ofchk: XBBDOFCHK,
                                                                                                                af: XBBDAF.toFixed(4),
                                                                                                                tauf: XBBDTauF.toFixed(4),
                                                                                                                taufchk: XBBDTauFCHK,
                                                                                                                ot: XBBDOT.toFixed(4),
                                                                                                                otchk: XBBDOTCHK
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
                                                                                                                    XBBDPayJS.dialog({
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
                                                                                                                                XBBDPayJS.dialog("close");
                                                                                                                                XBBDPayJS.dialog("clear");
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
                                                                                                                                            XBBDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                    XBBDPayJS.dialog('close');
                                                                                                                                                    XBBDPayJS.dialog('clear');
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
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) >= XBBDTHKDN) {
                                                                                                    south.html("底板腐蚀裕量不得大于 " + XBBDTHKDN + " mm").css("color", "red");
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
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBDDThkMin) {
                                                                                        south.html("底板名义厚度 δdn 不得小于等于 " + XBBDDThkMin).css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBDDThkMax) {
                                                                                        south.html("底板名义厚度 δdn 不得大于 " + XBBDDThkMax).css("color", "red");
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
                                                                        && parseFloat(rows[23][columns[0][1].field]) >= XBBDDMIN / 2) {
                                                                        south.html("螺栓腐蚀裕量不得大于 " + XBBDDMIN / 2 + " mm").css("color", "red");
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
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBDBThkMin) {
                                                            south.html("螺栓规格不得小于等于 M" + XBBDBThkMin).css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBDBThkMax) {
                                                            south.html("螺栓规格不得大于 M" + XBBDBThkMax).css("color", "red");
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