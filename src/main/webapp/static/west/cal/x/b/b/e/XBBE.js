$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbbeSketch = $("#d2");
    let xbbeModel = $("#d3");
    let xbbed2d3 = $('#d2d3');

    $("#cal").html("<table id='xbbe'></table>");
    let pg = $("#xbbe");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/b/e/XBBE.json", function (result) {

        let XBBEDT,
            XBBESCategory, XBBESCategoryVal, XBBESType, XBBESTypeVal, XBBESSTD, XBBESSTDVal, XBBESName, XBBESNameVal,
            XBBESNorm, XBBESNormVal,
            XBBESDensity, XBBESThkMax, XBBESThkMin,
            XBBEBCategory, XBBEBCategoryVal, XBBEBType, XBBEBTypeVal, XBBEBSTD, XBBEBSTDVal, XBBEBName, XBBEBNameVal,
            XBBEDCategory, XBBEDCategoryVal, XBBEDType, XBBEDTypeVal, XBBEDSTD, XBBEDSTDVal, XBBEDName, XBBEDNameVal,
            columns, rows, ed;

        function xbbe2d(ds0 = "ΦDs0", d0 = "ΦD0", b = "B", hf = "hf",
                        thkdn = "δdn", h = "H", hc = "Hc") {

            xbbeSketch.empty();

            let width = xbbeSketch.width();
            let height = xbbeSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XBBESVG").attr("height", height);

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
            dimTopH(xaxis - gg / 2 - 10, height / 2, xaxis + gg / 2 + 10, height / 2, d0, "XBBESketchD0");
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8, xaxis - gg / 2, height / 2 - 8 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 5, xaxis - gg / 2, height / 2 - 8 - 5 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 10, xaxis - gg / 2, height / 2 - 8 - 5 - 10);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 15, xaxis - gg / 2, height / 2 - 8 - 5 - 15);
            drawLine(xaxis + gg / 2, height / 2 - 8, xaxis + gg / 2 + 10, height / 2 - 8 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 5, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 10, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 10);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 15, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 15);

            //ds0
            dimTopH(xaxis - gg / 2, height / 2 - 20, xaxis + gg / 2, height / 2 - 20, ds0, "XBBESketchDS0");

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
            ])).attr("id", "XBBESketchB").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBESketchB")
                .attr("startOffset", "50%").text(b);

            // hf
            dimRightV(xaxis - gg / 2, height - padding - hg - 5 - 5, xaxis - gg / 2, height / 2 + 0.4 * hg, hf, "XBBESketchHF");

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
            ])).attr("id", "XBBESketchTHKDN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBESketchTHKDN").attr("startOffset", "50%").text(thkdn);

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
                ])).classed("sketch", true).attr("id", "XBBESketch50");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBESketch50")
                .attr("startOffset", "50%").text("50mm不焊");

            // H
            dimLeftV(xaxis - gg / 2 - sdo - 10 - 40 + 3, height - padding + thk, xaxis - gg / 2 - sdo - 10 - 40 + 3, padding + 3 * hg - 5, h, "XBBESketchH");
            drawLine(xaxis - gg / 2 - sdo - 10 - 40 - 3, padding + 3 * hg - 5, xaxis - gg / 2 - 3, padding + 3 * hg - 5);

            // hc
            dimRightV(xaxis + gg / 2 + sdo + 10, height - padding + thk,
                xaxis + gg / 2 + sdo + 10, height / 2,
                hc, "XBBESketchHC");
            drawLine(xaxis + gg / 2 + sdo + 10 + 3, height / 2, padding + 2 * wg + 2 + 3, height / 2);
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo + 10 + 40, y: height / 2},
                {x: xaxis + gg / 2 + sdo + 10 + 40 + 30, y: height / 2}
            ])).attr("id", "XBBESketchCG");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBESketchCG")
                .attr("startOffset", "50%").text("C.G.");
        }

        currentTabIndex = xbbed2d3.tabs('getTabIndex', xbbed2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbbe2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xbbe").length > 0) {
                    xbbe2d();
                }
            });
        }
        xbbed2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbbe2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xbbe").length > 0) {
                            xbbe2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "JB/T 4712.2-2007 H型钢腿式支座计算",
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
                    $(ed.target).combobox("loadData", XBBESCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", XBBESType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", XBBESSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", XBBESName);
                }

                else if (index === 12) {
                    $(ed.target).combobox("loadData", XBBESNorm);
                }

                else if (index === 17) {
                    $(ed.target).combobox("loadData", XBBEBCategory);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", XBBEBType);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", XBBEBSTD);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", XBBEBName);
                }

                else if (index === 24) {
                    $(ed.target).combobox("loadData", XBBEDCategory);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", XBBEDType);
                }
                else if (index === 26) {
                    $(ed.target).combobox("loadData", XBBEDSTD);
                }
                else if (index === 27) {
                    $(ed.target).combobox("loadData", XBBEDName);
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
                    xbbeSketch.empty();
                    xbbeModel.empty();

                    // sketch
                    currentTabIndex = xbbed2d3.tabs('getTabIndex', xbbed2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        xbbe2d();
                        xbbeSketch.off("resize").on("resize", function () {
                            if ($("#xbbe").length > 0) {
                                xbbe2d();
                            }
                        });
                    }
                    xbbed2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbbe2d();
                                xbbeSketch.off("resize").on("resize", function () {
                                    if ($("#xbbe").length > 0) {
                                        xbbe2d();
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

                        XBBEDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XBBESCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBESType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBESSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBESName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBESNorm = null;

                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBBEBCategory = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBEBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBEBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBEBName = null;

                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBBEDCategory = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBEDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBEDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBEDName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBESCategory = [];
                                XBBEBCategory = [];
                                XBBEDCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XBBEDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XBBESCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBEDCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBEBCategory[index] = {
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

                        XBBESCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBESType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBESSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBESName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBESNorm = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBESCategoryVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBESType = [];
                                $(result).each(function (index, element) {
                                    XBBESType[index] = {
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

                        XBBESTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBESSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBESName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBESNorm = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBESCategoryVal,
                                type: XBBESTypeVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBESSTD = [];
                                $(result).each(function (index, element) {
                                    XBBESSTD[index] = {
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

                        XBBESSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBESName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBESNorm = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBESCategoryVal,
                                type: XBBESTypeVal,
                                std: XBBESSTDVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBESName = [];
                                $(result).each(function (index, element) {
                                    XBBESName[index] = {
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

                        XBBESNameVal = changes.value;

                        // 将 norms 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBESNorm = null;

                        // AJAX 获取材料密度、最大最小厚度
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": XBBESCategoryVal,
                                "type": XBBESTypeVal,
                                "std": XBBESSTDVal,
                                "name": XBBESNameVal,
                                "temp": XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                XBBESDensity = parseFloat(result.density);
                                XBBESThkMin = parseFloat(result.thkMin);
                                XBBESThkMax = parseFloat(result.thkMax);

                                // 获取 norm 列表
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "gbt_11263_2017_list_table_1_norms.action",
                                    async: false,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        thkMax: XBBESThkMax,
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        XBBESNorm = [];
                                        $(result).each(function (index, element) {
                                            XBBESNorm[index] = {
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

                        XBBEBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBEBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBEBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBEBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBEBCategoryVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBEBType = [];
                                $(result).each(function (index, element) {
                                    XBBEBType[index] = {
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

                        XBBEBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBEBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBEBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBEBCategoryVal,
                                type: XBBEBTypeVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBEBSTD = [];
                                $(result).each(function (index, element) {
                                    XBBEBSTD[index] = {
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

                        XBBEBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBEBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBEBCategoryVal,
                                type: XBBEBTypeVal,
                                std: XBBEBSTDVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBEBName = [];
                                $(result).each(function (index, element) {
                                    XBBEBName[index] = {
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

                        XBBEDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBEDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBEDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBEDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBEDCategoryVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBEDType = [];
                                $(result).each(function (index, element) {
                                    XBBEDType[index] = {
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

                        XBBEDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBEDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBEDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBEDCategoryVal,
                                type: XBBEDTypeVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBEDSTD = [];
                                $(result).each(function (index, element) {
                                    XBBEDSTD[index] = {
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

                        XBBEDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBEDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBEDCategoryVal,
                                type: XBBEDTypeVal,
                                std: XBBEDSTDVal,
                                temp: XBBEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBEDName = [];
                                $(result).each(function (index, element) {
                                    XBBEDName[index] = {
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
                        let XBBEH0;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XBBEH0 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Ds0
                        let XBBEDS0;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XBBEDS0 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbe2d("Φ" + XBBEDS0);
                            xbbeSketch.off("resize").on("resize", function () {
                                if ($("#xbbe").length > 0) {
                                    xbbe2d("Φ" + XBBEDS0);
                                }
                            });
                        }
                        xbbed2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbe2d("Φ" + XBBEDS0);
                                    xbbeSketch.off("resize").on("resize", function () {
                                        if ($("#xbbe").length > 0) {
                                            xbbe2d("Φ" + XBBEDS0);
                                        }
                                    });
                                }
                            }
                        });

                        // D0
                        let XBBED0;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) >= XBBEDS0) {
                            XBBED0 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) < XBBEDS0) {
                            south.html("壳体外直径(含保温层) D<sub>0</sub> 不得小于 " + XBBEDS0 + " mm").css("color", "red");
                            return false;
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0);
                            xbbeSketch.off("resize").on("resize", function () {
                                if ($("#xbbe").length > 0) {
                                    xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0);
                                }
                            });
                        }
                        xbbed2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0);
                                    xbbeSketch.off("resize").on("resize", function () {
                                        if ($("#xbbe").length > 0) {
                                            xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0);
                                        }
                                    });
                                }
                            }
                        });

                        // M0
                        let XBBEM0;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            XBBEM0 = parseFloat(rows[4][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Q0
                        let XBBEQ0;
                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                            XBBEQ0 = parseFloat(rows[5][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // FI
                        let XBBEFI;
                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                            XBBEFI = parseFloat(rows[6][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // EQ
                        let XBBEEQ;
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XBBEEQ = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // alphae
                        let XBBEAlphaE;
                        if (XBBEEQ === "0.1g") {
                            XBBEAlphaE = 0.08;
                        }
                        else if (XBBEEQ === "0.15g") {
                            XBBEAlphaE = 0.12;
                        }
                        else if (XBBEEQ === "0.2g") {
                            XBBEAlphaE = 0.16;
                        }
                        else if (XBBEEQ === "0.3g") {
                            XBBEAlphaE = 0.24;
                        }
                        else if (XBBEEQ === "0.4g") {
                            XBBEAlphaE = 0.32;
                        }
                        else {
                            return false;
                        }

                        // H型钢规格
                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                            XBBESNormVal = rows[12][columns[0][1].field];

                            // AJAX 获取工字钢截面特性
                            let XBBESSH, XBBESSB, XBBET1, XBBET2, XBBESA, XBBESAO, XBBESIXX, XBBESIYY, XBBESWMIN;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "gbt_11263_2017_get_table_1_details.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "norms": XBBESNormVal
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XBBESSH = parseFloat(result.h);
                                    XBBESSB = parseFloat(result.b);
                                    XBBET1 = parseFloat(result.t1);
                                    XBBET2 = parseFloat(result.t2);
                                    XBBESA = 100 * parseFloat(result.sectionArea);
                                    XBBESAO = parseFloat(result.outerArea);
                                    XBBESIXX = 10000 * parseFloat(result.bix);
                                    XBBESIYY = 10000 * parseFloat(result.biy);
                                    XBBESWMIN = 1000 * Math.min(parseFloat(result.wx), parseFloat(result.wy));

                                    // 获取工字钢许用应力、弹性模量、屈服强度
                                    let XBBEOST, XBBERSTEL, XBBEEST;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XBBESCategoryVal,
                                            "type": XBBESTypeVal,
                                            "std": XBBESSTDVal,
                                            "name": XBBESNameVal,
                                            "thk": XBBET2,
                                            "temp": XBBEDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XBBEOST = parseFloat(result.ot);
                                            if (XBBEOST < 0) {
                                                south.html("查询支腿材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBERSTEL = parseFloat(result.relt);
                                            if (XBBERSTEL < 0) {
                                                south.html("查询支腿材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBEEST = 1000 * parseFloat(result.et);
                                            if (XBBEEST < 0) {
                                                south.html("查询支腿材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // N
                                            let XBBEN;
                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                XBBEN = parseFloat(rows[13][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // BB
                                            let XBBEBB;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                XBBEBB = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB);
                                                xbbeSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbe").length > 0) {
                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB);
                                                    }
                                                });
                                            }
                                            xbbed2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB);
                                                        xbbeSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbe").length > 0) {
                                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // HF
                                            let XBBEHF;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                XBBEHF = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF);
                                                xbbeSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbe").length > 0) {
                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF);
                                                    }
                                                });
                                            }
                                            xbbed2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF);
                                                        xbbeSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbe").length > 0) {
                                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // TF1
                                            let XBBETF1;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                XBBETF1 = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            //地脚螺栓材料
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                XBBEBNameVal = rows[20][columns[0][1].field];

                                                // AJAX 获取螺栓材料密度、最大最小厚度
                                                let XBBEBDensity, XBBEBThkMin, XBBEBThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": XBBEBCategoryVal,
                                                        "type": XBBEBTypeVal,
                                                        "std": XBBEBSTDVal,
                                                        "name": XBBEBNameVal,
                                                        "temp": XBBEDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        XBBEBDensity = parseFloat(result.density);
                                                        XBBEBThkMin = parseFloat(result.thkMin);
                                                        XBBEBThkMax = parseFloat(result.thkMax);

                                                        // 螺纹规格
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBEBThkMin
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBEBThkMax) {
                                                            let XBBENorms = rows[21][columns[0][1].field];

                                                            // 获取螺纹小径
                                                            let XBBEDMIN;
                                                            if (XBBENorms === "M12") {
                                                                XBBEDMIN = 10.106;
                                                            }
                                                            else if (XBBENorms === "M16") {
                                                                XBBEDMIN = 13.835;
                                                            }
                                                            else if (XBBENorms === "M20") {
                                                                XBBEDMIN = 17.294;
                                                            }
                                                            else if (XBBENorms === "M22") {
                                                                XBBEDMIN = 19.294;
                                                            }
                                                            else if (XBBENorms === "M24") {
                                                                XBBEDMIN = 20.752;
                                                            }
                                                            else if (XBBENorms === "M27") {
                                                                XBBEDMIN = 23.752;
                                                            }
                                                            else if (XBBENorms === "M30") {
                                                                XBBEDMIN = 26.211;
                                                            }
                                                            else if (XBBENorms === "M36") {
                                                                XBBEDMIN = 31.670;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 螺栓设计应力
                                                            let XBBEOBTAllow;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": XBBEBCategoryVal,
                                                                    "type": XBBEBTypeVal,
                                                                    "std": XBBEBSTDVal,
                                                                    "name": XBBEBNameVal,
                                                                    "thk": parseFloat(XBBENorms.substring(1)),
                                                                    "temp": XBBEDT,
                                                                    "highLow": 2,
                                                                    "isTube": 0,
                                                                    "od": parseFloat(XBBENorms.substring(1))
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    XBBEOBTAllow = parseFloat(result.ot);
                                                                    if (XBBEOBTAllow < 0) {
                                                                        south.html("查询螺栓材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // nbt
                                                                    let XBBENBT;
                                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                                        XBBENBT = parseFloat(rows[22][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                        && parseFloat(rows[23][columns[0][1].field]) < XBBEDMIN / 2) {
                                                                        let XBBECB2 = parseFloat(rows[23][columns[0][1].field]);

                                                                        // 底板材料
                                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                            XBBEDNameVal = rows[27][columns[0][1].field];

                                                                            // AJAX 获取底板材料密度、最大最小厚度
                                                                            let XBBEDDensity, XBBEDThkMin, XBBEDThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": XBBEDCategoryVal,
                                                                                    "type": XBBEDTypeVal,
                                                                                    "std": XBBEDSTDVal,
                                                                                    "name": XBBEDNameVal,
                                                                                    "temp": XBBEDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    XBBEDDensity = parseFloat(result.density);
                                                                                    XBBEDThkMin = parseFloat(result.thkMin);
                                                                                    XBBEDThkMax = parseFloat(result.thkMax);

                                                                                    // thkdn
                                                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBEDThkMin
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBEDThkMax) {
                                                                                        let XBBETHKDN = parseFloat(rows[28][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN);
                                                                                            xbbeSketch.off("resize").on("resize", function () {
                                                                                                if ($("#xbbe").length > 0) {
                                                                                                    xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        xbbed2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN);
                                                                                                    xbbeSketch.off("resize").on("resize", function () {
                                                                                                        if ($("#xbbe").length > 0) {
                                                                                                            xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 底板设计应力、负偏差
                                                                                        let XBBEODT, XBBECD1;
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "category": XBBEDCategoryVal,
                                                                                                "type": XBBEDTypeVal,
                                                                                                "std": XBBEDSTDVal,
                                                                                                "name": XBBEDNameVal,
                                                                                                "thk": XBBETHKDN,
                                                                                                "temp": XBBEDT,
                                                                                                "highLow": 2,
                                                                                                "isTube": 0,
                                                                                                "od": 100000
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                            },
                                                                                            success: function (result) {

                                                                                                XBBEODT = parseFloat(result.ot);
                                                                                                if (XBBEODT < 0) {
                                                                                                    south.html("查询底板材料设计温度许用应力失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }
                                                                                                XBBECD1 = parseFloat(result.c1);
                                                                                                if (XBBECD1 < 0) {
                                                                                                    south.html("查询底板材料厚度负偏差失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }

                                                                                                // 腐蚀裕量
                                                                                                if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) < XBBETHKDN) {
                                                                                                    let XBBECD2 = parseFloat(rows[29][columns[0][1].field]);

                                                                                                    // d1
                                                                                                    let XBBED1;
                                                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) >= XBBESSB) {
                                                                                                        XBBED1 = parseFloat(rows[30][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) < XBBESSB) {
                                                                                                        south.html("底板长度d1不得小于 " + XBBESSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // d2
                                                                                                    let XBBED2;
                                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= XBBESSB) {
                                                                                                        XBBED2 = parseFloat(rows[31][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) < XBBESSB) {
                                                                                                        south.html("底板宽度d2不得小于 " + XBBESSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // H
                                                                                                    let XBBEH;
                                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                                                                        XBBEH = parseFloat(rows[32][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH);
                                                                                                        xbbeSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbe").length > 0) {
                                                                                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbed2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH);
                                                                                                                xbbeSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbe").length > 0) {
                                                                                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // HC
                                                                                                    let XBBEHC;
                                                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) >= XBBEH) {
                                                                                                        XBBEHC = parseFloat(rows[33][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) < XBBEH) {
                                                                                                        south.html("底板下表面到设备质心高度 Hc 不得小于 " + XBBEH + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH, XBBEHC);
                                                                                                        xbbeSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbe").length > 0) {
                                                                                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH, XBBEHC);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbed2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH, XBBEHC);
                                                                                                                xbbeSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbe").length > 0) {
                                                                                                                        xbbe2d("Φ" + XBBEDS0, "Φ" + XBBED0, XBBEBB, XBBEHF, XBBETHKDN, XBBEH, XBBEHC);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // OC1ALLOW
                                                                                                    let XBBEOC1ALLOW;
                                                                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                                                                        XBBEOC1ALLOW = parseFloat(rows[34][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 载荷计算
                                                                                                    let XBBEPW = 1.2 * XBBEFI * XBBEQ0 * XBBED0 * XBBEH0 / 1000000;
                                                                                                    let XBBEG = 9.8;
                                                                                                    let XBBEPE = XBBEAlphaE * XBBEM0 * XBBEG;
                                                                                                    let XBBEFH = Math.max(XBBEPW, XBBEPE + 0.25 * XBBEPW);
                                                                                                    let XBBEW1 = XBBEM0 * XBBEG;
                                                                                                    let XBBER = XBBEFH / XBBEN;
                                                                                                    let XBBEDB = XBBESSB + Math.sqrt(XBBEDS0 * XBBEDS0 - (XBBESSH - 2 * XBBET2) * (XBBESSH - 2 * XBBET2));
                                                                                                    let XBBEFL1 = 4 * XBBEFH * XBBEHC / XBBEN / XBBEDB - XBBEW1 / XBBEN;
                                                                                                    let XBBEFL2 = XBBEW1 / XBBEN + 4 * XBBEFH * XBBEHC / XBBEN / XBBEDB;

                                                                                                    // 支腿计算
                                                                                                    let XBBEIMIN = Math.min(XBBESIXX, XBBESIYY);
                                                                                                    let XBBEIH = Math.sqrt(XBBEIMIN / XBBESA);
                                                                                                    let XBBELamuda = 0.7 * XBBEH / XBBEIH;
                                                                                                    let XBBELamudaH = Math.sqrt((Math.PI * Math.PI * XBBEEST) / (0.6 * XBBERSTEL));
                                                                                                    let XBBENS = 3 / 2 + 2 / 3 * (XBBELamuda / XBBELamudaH) * (XBBELamuda / XBBELamudaH);
                                                                                                    let XBBEEta = 1.0;
                                                                                                    let XBBEOCRALLOW;
                                                                                                    if (XBBELamuda <= XBBELamudaH) {
                                                                                                        XBBEOCRALLOW = (1.2 * (1 - 0.4 * (XBBELamuda / XBBELamudaH) * (XBBELamuda / XBBELamudaH)) * XBBERSTEL) / (XBBENS * XBBEEta);
                                                                                                    }
                                                                                                    else {
                                                                                                        XBBEOCRALLOW = 0.227 * XBBERSTEL / ((XBBELamuda / XBBELamudaH) * (XBBELamuda / XBBELamudaH));
                                                                                                    }
                                                                                                    south.html(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "支腿许用压应力：" + XBBEOCRALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBEOC = XBBEFL2 / XBBESA;
                                                                                                    let XBBEOCCHK;
                                                                                                    if (XBBEOC <= XBBEOCRALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBEOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOCCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBEOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOCCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBETau = XBBER / XBBESA;
                                                                                                    let XBBETauAllow = 0.6 * XBBEOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用剪应力：" + XBBETauAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBETauCHK;
                                                                                                    if (XBBETau <= XBBETauAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBETau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBETauCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBETau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBETauCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBEL1 = XBBEH + XBBEHF / 2 + 50;
                                                                                                    let XBBEE = (XBBEDB - XBBEDS0) / 2;
                                                                                                    let XBBEOB = (XBBER * XBBEL1 - XBBEFL2 * XBBEE) / XBBESWMIN;
                                                                                                    let XBBEOBAllow = 1.5 * XBBEOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用弯曲应力：" + XBBEOBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBEOBCHK;
                                                                                                    if (XBBEOB <= XBBEOBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBEOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOBCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBEOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOBCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBETotalCHK;
                                                                                                    if ((Math.abs(XBBEOC / XBBEOCRALLOW) + Math.abs(XBBEOB / XBBEOBAllow)) <= 1) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：合格" +
                                                                                                            "</span>");
                                                                                                        XBBETotalCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：不合格" +
                                                                                                            "</span>");
                                                                                                        XBBETotalCHK = "不合格";
                                                                                                    }

                                                                                                    // 地脚螺栓计算及校核
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用拉应力：" + XBBEOBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBEABT = Math.PI / 4 * (XBBEDMIN - 2 * XBBECB2) * (XBBEDMIN - 2 * XBBECB2);
                                                                                                    let XBBEOBT = Math.max(0, XBBEFL1 / (XBBENBT * XBBEABT));
                                                                                                    let XBBEOBTCHK;
                                                                                                    if (XBBEOBT <= XBBEOBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBEOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBEOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOBTCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBETauBT = Math.max(0, (XBBEFH - 0.4 * XBBEW1) / (XBBEN * XBBENBT * XBBEABT));
                                                                                                    let XBBETauBTAllow = 0.6 * XBBEOBTAllow;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用剪应力：" + XBBETauBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBETauBTCHK;
                                                                                                    if (XBBETauBT <= XBBETauBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBETauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBETauBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBETauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBETauBTCHK = "不合格";
                                                                                                    }

                                                                                                    // 基础应力计算及校核
                                                                                                    let XBBEOC1 = XBBEFL2 / (XBBED1 * XBBED2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "基础许用压应力：" + XBBEOC1ALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBEOC1CHK;
                                                                                                    if (XBBEOC1 <= XBBEOC1ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBEOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOC1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBEOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOC1CHK = "不合格";
                                                                                                    }

                                                                                                    // 底板计算及校核
                                                                                                    let XBBETHKDC = XBBEBB * Math.sqrt(3 * XBBEOC1 / XBBEODT);
                                                                                                    let XBBETHKDD = XBBETHKDC + XBBECD2;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "底板所需厚度：" + (XBBETHKDD + XBBECD1).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let XBBETHKDCHK;
                                                                                                    if ((XBBETHKDD + XBBECD1) <= XBBETHKDN) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBETHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBETHKDCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBETHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBETHKDCHK = "不合格";
                                                                                                    }

                                                                                                    // 装配焊缝
                                                                                                    let XBBEFai = 0.49;
                                                                                                    let XBBEBAllow = 1.5 * XBBEOST * XBBEFai;
                                                                                                    let XBBEHF1 = XBBEHF - 10;
                                                                                                    let XBBEZ = 2 * XBBEHF1 * XBBEHF1 / 6 * XBBETF1 / Math.sqrt(2);

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用弯曲应力：" + XBBEBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBEOF = XBBER * XBBEL1 / XBBEZ;
                                                                                                    let XBBEOFCHK;
                                                                                                    if (XBBEOF <= XBBEBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBEOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBEOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOFCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBEAF = 2 * XBBEHF1 * XBBETF1 / Math.sqrt(2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用剪应力：" + XBBEBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBETauF = XBBEFL2 / XBBEAF;
                                                                                                    let XBBETauFCHK;
                                                                                                    if (XBBETauF <= XBBEBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBETauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBETauFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBETauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBETauFCHK = "不合格";
                                                                                                    }

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用当量应力：" + XBBEBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBEOT = Math.sqrt(XBBEOF * XBBEOF + 3 * XBBETauF * XBBETauF);
                                                                                                    let XBBEOTCHK;
                                                                                                    if (XBBEOT <= XBBEBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBEOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOTCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBEOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBEOTCHK = "不合格";
                                                                                                    }

                                                                                                    // docx
                                                                                                    let XBBEPayJS = $('#payjs');

                                                                                                    function getDocx() {
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "xbbedocx.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                ribbonName: "XBBE",

                                                                                                                t: XBBEDT,

                                                                                                                h0: XBBEH0,
                                                                                                                d0: XBBED0,
                                                                                                                ds0: XBBEDS0,
                                                                                                                m0: XBBEM0,

                                                                                                                q0: XBBEQ0,
                                                                                                                fi: XBBEFI,
                                                                                                                eq: XBBEEQ,

                                                                                                                stds: XBBESSTDVal,
                                                                                                                names: XBBESNameVal,
                                                                                                                n: XBBEN,
                                                                                                                norms: XBBESNormVal,
                                                                                                                bb: XBBEBB,
                                                                                                                hf: XBBEHF,
                                                                                                                tf1: XBBETF1,

                                                                                                                stdb: XBBEBSTDVal,
                                                                                                                nameb: XBBEBNameVal,
                                                                                                                normb: XBBENorms,
                                                                                                                nbt: XBBENBT,
                                                                                                                cb2: XBBECB2,

                                                                                                                stdd: XBBEDSTDVal,
                                                                                                                named: XBBEDNameVal,
                                                                                                                cd2: XBBECD2,
                                                                                                                thkdn: XBBETHKDN,
                                                                                                                d1: XBBED1,
                                                                                                                d2: XBBED2,
                                                                                                                h: XBBEH,
                                                                                                                hc: XBBEHC,

                                                                                                                oc1allow: XBBEOC1ALLOW,

                                                                                                                ostallow: XBBEOST.toFixed(4),
                                                                                                                rstel: XBBERSTEL.toFixed(4),
                                                                                                                est: (XBBEEST / 1000).toFixed(4),
                                                                                                                sh: XBBESSH.toFixed(4),
                                                                                                                sb: XBBESSB.toFixed(4),
                                                                                                                t1: XBBET1.toFixed(4),
                                                                                                                t2: XBBET2.toFixed(4),
                                                                                                                a: XBBESA.toFixed(4),
                                                                                                                densitys: XBBESDensity.toFixed(4),
                                                                                                                ao: XBBESAO.toFixed(4),
                                                                                                                ixx: XBBESIXX.toFixed(4),
                                                                                                                iyy: XBBESIYY.toFixed(4),
                                                                                                                wmin: XBBESWMIN.toFixed(4),

                                                                                                                densityb: XBBEBDensity.toFixed(4),
                                                                                                                obtallow: XBBEOBTAllow.toFixed(4),

                                                                                                                densityd: XBBEDDensity.toFixed(4),
                                                                                                                cd1: XBBECD1.toFixed(4),
                                                                                                                odtallow: XBBEODT.toFixed(4),

                                                                                                                pw: XBBEPW.toFixed(4),
                                                                                                                alphae: XBBEAlphaE.toFixed(4),
                                                                                                                g: XBBEG.toFixed(4),
                                                                                                                pe: XBBEPE.toFixed(4),
                                                                                                                fh: XBBEFH.toFixed(4),
                                                                                                                w1: XBBEW1.toFixed(4),
                                                                                                                r: XBBER.toFixed(4),
                                                                                                                db: XBBEDB.toFixed(4),
                                                                                                                fl1: XBBEFL1.toFixed(4),
                                                                                                                fl2: XBBEFL2.toFixed(4),

                                                                                                                imin: XBBEIMIN.toFixed(4),
                                                                                                                ih: XBBEIH.toFixed(4),
                                                                                                                lamuda: XBBELamuda.toFixed(4),
                                                                                                                lamudah: XBBELamudaH.toFixed(4),
                                                                                                                ns: XBBENS.toFixed(4),
                                                                                                                eta: XBBEEta.toFixed(4),
                                                                                                                ocrallow: XBBEOCRALLOW.toFixed(4),
                                                                                                                oc: XBBEOC.toFixed(4),
                                                                                                                occhk: XBBEOCCHK,
                                                                                                                tau: XBBETau.toFixed(4),
                                                                                                                tauallow: XBBETauAllow.toFixed(4),
                                                                                                                tauchk: XBBETauCHK,
                                                                                                                l1: XBBEL1.toFixed(4),
                                                                                                                e: XBBEE.toFixed(4),
                                                                                                                ob: XBBEOB.toFixed(4),
                                                                                                                oballow: XBBEOBAllow.toFixed(4),
                                                                                                                obchk: XBBEOBCHK,
                                                                                                                totalchk: XBBETotalCHK,

                                                                                                                dmin: XBBEDMIN.toFixed(4),
                                                                                                                abt: XBBEABT.toFixed(4),
                                                                                                                obt: XBBEOBT.toFixed(4),
                                                                                                                obtchk: XBBEOBTCHK,
                                                                                                                taubt: XBBETauBT.toFixed(4),
                                                                                                                taubtallow: XBBETauBTAllow.toFixed(4),
                                                                                                                taubtchk: XBBETauBTCHK,

                                                                                                                oc1: XBBEOC1.toFixed(4),
                                                                                                                oc1chk: XBBEOC1CHK,

                                                                                                                thkdc: XBBETHKDC.toFixed(4),
                                                                                                                thkdd: XBBETHKDD.toFixed(4),
                                                                                                                thkdchk: XBBETHKDCHK,

                                                                                                                fai: XBBEFai.toFixed(4),
                                                                                                                ballow: XBBEBAllow.toFixed(4),
                                                                                                                hf1: XBBEHF1.toFixed(4),
                                                                                                                z: XBBEZ.toFixed(4),
                                                                                                                of: XBBEOF.toFixed(4),
                                                                                                                ofchk: XBBEOFCHK,
                                                                                                                af: XBBEAF.toFixed(4),
                                                                                                                tauf: XBBETauF.toFixed(4),
                                                                                                                taufchk: XBBETauFCHK,
                                                                                                                ot: XBBEOT.toFixed(4),
                                                                                                                otchk: XBBEOTCHK
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
                                                                                                                    XBBEPayJS.dialog({
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
                                                                                                                                XBBEPayJS.dialog("close");
                                                                                                                                XBBEPayJS.dialog("clear");
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
                                                                                                                                            XBBEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                    XBBEPayJS.dialog('close');
                                                                                                                                                    XBBEPayJS.dialog('clear');
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
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) >= XBBETHKDN) {
                                                                                                    south.html("底板腐蚀裕量不得大于 " + XBBETHKDN + " mm").css("color", "red");
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
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBEDThkMin) {
                                                                                        south.html("底板名义厚度 δdn 不得小于等于 " + XBBEDThkMin).css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBEDThkMax) {
                                                                                        south.html("底板名义厚度 δdn 不得大于 " + XBBEDThkMax).css("color", "red");
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
                                                                        && parseFloat(rows[23][columns[0][1].field]) >= XBBEDMIN / 2) {
                                                                        south.html("螺栓腐蚀裕量不得大于 " + XBBEDMIN / 2 + " mm").css("color", "red");
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
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBEBThkMin) {
                                                            south.html("螺栓规格不得小于等于 M" + XBBEBThkMin).css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBEBThkMax) {
                                                            south.html("螺栓规格不得大于 M" + XBBEBThkMax).css("color", "red");
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