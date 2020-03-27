$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbbcSketch = $("#d2");
    let xbbcModel = $("#d3");
    let xbbcd2d3 = $('#d2d3');

    $("#cal").html("<table id='xbbc'></table>");
    let pg = $("#xbbc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/b/c/XBBC.json", function (result) {

        let XBBCDT,
            XBBCSCategory, XBBCSCategoryVal, XBBCSType, XBBCSTypeVal, XBBCSSTD, XBBCSSTDVal, XBBCSName, XBBCSNameVal,
            XBBCSNorm, XBBCSNormVal,
            XBBCSDensity, XBBCSThkMax, XBBCSThkMin,
            XBBCBCategory, XBBCBCategoryVal, XBBCBType, XBBCBTypeVal, XBBCBSTD, XBBCBSTDVal, XBBCBName, XBBCBNameVal,
            XBBCDCategory, XBBCDCategoryVal, XBBCDType, XBBCDTypeVal, XBBCDSTD, XBBCDSTDVal, XBBCDName, XBBCDNameVal,
            columns, rows, ed;

        function xbbc2d(ds0 = "ΦDs0", d0 = "ΦD0", b = "B", hf = "hf",
                        thkdn = "δdn", h = "H", hc = "Hc") {

            xbbcSketch.empty();

            let width = xbbcSketch.width();
            let height = xbbcSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XBBCSVG").attr("height", height);

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
            dimTopH(xaxis - gg / 2 - 10, height / 2, xaxis + gg / 2 + 10, height / 2, d0, "XBBCSketchD0");
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8, xaxis - gg / 2, height / 2 - 8 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 5, xaxis - gg / 2, height / 2 - 8 - 5 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 10, xaxis - gg / 2, height / 2 - 8 - 5 - 10);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 15, xaxis - gg / 2, height / 2 - 8 - 5 - 15);
            drawLine(xaxis + gg / 2, height / 2 - 8, xaxis + gg / 2 + 10, height / 2 - 8 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 5, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 10, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 10);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 15, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 15);

            //ds0
            dimTopH(xaxis - gg / 2, height / 2 - 20, xaxis + gg / 2, height / 2 - 20, ds0, "XBBCSketchDS0");

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
            ])).attr("id", "XBBCSketchB").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBCSketchB")
                .attr("startOffset", "50%").text(b);

            // hf
            dimRightV(xaxis - gg / 2, height - padding - hg - 5 - 5, xaxis - gg / 2, height / 2 + 0.4 * hg, hf, "XBBCSketchHF");

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
            ])).attr("id", "XBBCSketchTHKDN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBCSketchTHKDN").attr("startOffset", "50%").text(thkdn);

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
                ])).classed("sketch", true).attr("id", "XBBCSketch50");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBCSketch50")
                .attr("startOffset", "50%").text("50mm不焊");

            // H
            dimLeftV(xaxis - gg / 2 - sdo - 10 - 40 + 3, height - padding + thk, xaxis - gg / 2 - sdo - 10 - 40 + 3, padding + 3 * hg - 5, h, "XBBCSketchH");
            drawLine(xaxis - gg / 2 - sdo - 10 - 40 - 3, padding + 3 * hg - 5, xaxis - gg / 2 - 3, padding + 3 * hg - 5);

            // hc
            dimRightV(xaxis + gg / 2 + sdo + 10, height - padding + thk,
                xaxis + gg / 2 + sdo + 10, height / 2,
                hc, "XBBCSketchHC");
            drawLine(xaxis + gg / 2 + sdo + 10 + 3, height / 2, padding + 2 * wg + 2 + 3, height / 2);
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo + 10 + 40, y: height / 2},
                {x: xaxis + gg / 2 + sdo + 10 + 40 + 30, y: height / 2}
            ])).attr("id", "XBBCSketchCG");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBCSketchCG")
                .attr("startOffset", "50%").text("C.G.");
        }

        currentTabIndex = xbbcd2d3.tabs('getTabIndex', xbbcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbbc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xbbc").length > 0) {
                    xbbc2d();
                }
            });
        }
        xbbcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbbc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xbbc").length > 0) {
                            xbbc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "JB/T 4712.2-2007 槽钢腿式支座计算",
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
                    $(ed.target).combobox("loadData", XBBCSCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", XBBCSType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", XBBCSSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", XBBCSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", XBBCSNorm);
                }

                else if (index === 17) {
                    $(ed.target).combobox("loadData", XBBCBCategory);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", XBBCBType);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", XBBCBSTD);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", XBBCBName);
                }

                else if (index === 24) {
                    $(ed.target).combobox("loadData", XBBCDCategory);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", XBBCDType);
                }
                else if (index === 26) {
                    $(ed.target).combobox("loadData", XBBCDSTD);
                }
                else if (index === 27) {
                    $(ed.target).combobox("loadData", XBBCDName);
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
                    xbbcSketch.empty();
                    xbbcModel.empty();

                    // sketch
                    currentTabIndex = xbbcd2d3.tabs('getTabIndex', xbbcd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xbbc2d();
                        xbbcSketch.off("resize").on("resize", function () {
                            if ($("#xbbc").length > 0) {
                                xbbc2d();
                            }
                        });
                    }
                    xbbcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbbc2d();
                                xbbcSketch.off("resize").on("resize", function () {
                                    if ($("#xbbc").length > 0) {
                                        xbbc2d();
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

                        XBBCDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XBBCSCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBCSType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBCSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBCSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBCSNorm = null;

                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBBCBCategory = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBCBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBCBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBCBName = null;

                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBBCDCategory = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBCDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBCDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBCDName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCSCategory = [];
                                XBBCBCategory = [];
                                XBBCDCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XBBCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XBBCSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBCDCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBCBCategory[index] = {
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

                        XBBCSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBCSType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBCSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBCSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBCSNorm = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCSCategoryVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCSType = [];
                                $(result).each(function (index, element) {
                                    XBBCSType[index] = {
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

                        XBBCSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBCSSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBCSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBCSNorm = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCSCategoryVal,
                                type: XBBCSTypeVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCSSTD = [];
                                $(result).each(function (index, element) {
                                    XBBCSSTD[index] = {
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

                        XBBCSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBBCSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBCSNorm = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCSCategoryVal,
                                type: XBBCSTypeVal,
                                std: XBBCSSTDVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCSName = [];
                                $(result).each(function (index, element) {
                                    XBBCSName[index] = {
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

                        XBBCSNameVal = changes.value;

                        // 将 norms 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBBCSNorm = null;

                        // AJAX 获取材料密度、最大最小厚度
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": XBBCSCategoryVal,
                                "type": XBBCSTypeVal,
                                "std": XBBCSSTDVal,
                                "name": XBBCSNameVal,
                                "temp": XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                XBBCSDensity = parseFloat(result.density);
                                XBBCSThkMin = parseFloat(result.thkMin);
                                XBBCSThkMax = parseFloat(result.thkMax);

                                // 获取 norm 列表
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "gbt_706_2016_list_table_a2_norms.action",
                                    async: false,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        thkMax: XBBCSThkMax,
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        XBBCSNorm = [];
                                        $(result).each(function (index, element) {
                                            XBBCSNorm[index] = {
                                                "value": element,
                                                "text": element
                                            };
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;槽钢规格获取失败，请检查网络后重试</span>");
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

                        XBBCBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBBCBType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBCBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBCBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCBCategoryVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCBType = [];
                                $(result).each(function (index, element) {
                                    XBBCBType[index] = {
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

                        XBBCBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBBCBSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBCBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCBCategoryVal,
                                type: XBBCBTypeVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCBSTD = [];
                                $(result).each(function (index, element) {
                                    XBBCBSTD[index] = {
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

                        XBBCBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XBBCBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCBCategoryVal,
                                type: XBBCBTypeVal,
                                std: XBBCBSTDVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCBName = [];
                                $(result).each(function (index, element) {
                                    XBBCBName[index] = {
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

                        XBBCDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBBCDType = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBCDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBCDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCDCategoryVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCDType = [];
                                $(result).each(function (index, element) {
                                    XBBCDType[index] = {
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

                        XBBCDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        XBBCDSTD = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBCDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCDCategoryVal,
                                type: XBBCDTypeVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCDSTD = [];
                                $(result).each(function (index, element) {
                                    XBBCDSTD[index] = {
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

                        XBBCDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBBCDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBCDCategoryVal,
                                type: XBBCDTypeVal,
                                std: XBBCDSTDVal,
                                temp: XBBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBCDName = [];
                                $(result).each(function (index, element) {
                                    XBBCDName[index] = {
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
                        let XBBCH0;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XBBCH0 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Ds0
                        let XBBCDS0;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            XBBCDS0 = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbc2d("Φ" + XBBCDS0);
                            xbbcSketch.off("resize").on("resize", function () {
                                if ($("#xbbc").length > 0) {
                                    xbbc2d("Φ" + XBBCDS0);
                                }
                            });
                        }
                        xbbcd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbc2d("Φ" + XBBCDS0);
                                    xbbcSketch.off("resize").on("resize", function () {
                                        if ($("#xbbc").length > 0) {
                                            xbbc2d("Φ" + XBBCDS0);
                                        }
                                    });
                                }
                            }
                        });

                        // D0
                        let XBBCD0;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) >= XBBCDS0) {
                            XBBCD0 = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                            && parseFloat(rows[3][columns[0][1].field]) < XBBCDS0) {
                            south.html("壳体外直径(含保温层) D<sub>0</sub> 不得小于 " + XBBCDS0 + " mm").css("color", "red");
                            return false;
                        }
                        else {
                            return false;
                        }

                        // Sketch
                        if (currentTabIndex === 0) {
                            xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0);
                            xbbcSketch.off("resize").on("resize", function () {
                                if ($("#xbbc").length > 0) {
                                    xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0);
                                }
                            });
                        }
                        xbbcd2d3.tabs({
                            onSelect: function (title, index) {
                                if (index === 0) {
                                    xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0);
                                    xbbcSketch.off("resize").on("resize", function () {
                                        if ($("#xbbc").length > 0) {
                                            xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0);
                                        }
                                    });
                                }
                            }
                        });

                        // M0
                        let XBBCM0;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            XBBCM0 = parseFloat(rows[4][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Q0
                        let XBBCQ0;
                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                            XBBCQ0 = parseFloat(rows[5][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // FI
                        let XBBCFI;
                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                            XBBCFI = parseFloat(rows[6][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // EQ
                        let XBBCEQ;
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            XBBCEQ = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // alphae
                        let XBBCAlphaE;
                        if (XBBCEQ === "0.1g") {
                            XBBCAlphaE = 0.08;
                        }
                        else if (XBBCEQ === "0.15g") {
                            XBBCAlphaE = 0.12;
                        }
                        else if (XBBCEQ === "0.2g") {
                            XBBCAlphaE = 0.16;
                        }
                        else if (XBBCEQ === "0.3g") {
                            XBBCAlphaE = 0.24;
                        }
                        else if (XBBCEQ === "0.4g") {
                            XBBCAlphaE = 0.32;
                        }
                        else {
                            return false;
                        }

                        // 槽钢规格
                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                            XBBCSNormVal = rows[12][columns[0][1].field];

                            // AJAX 获取角钢截面特性
                            let XBBCSSH, XBBCSSB, XBBCSD, XBBCSTM, XBBCSA, XBBCSAO, XBBCSIXX, XBBCSIYY, XBBCSWMIN,
                                XBBCSZ0;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "gbt_706_2016_get_table_a2_details.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "norms": XBBCSNormVal
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XBBCSSH = parseFloat(result.h);
                                    XBBCSSB = parseFloat(result.b);
                                    XBBCSD = parseFloat(result.d);
                                    XBBCSTM = parseFloat(result.t);
                                    XBBCSA = 100 * parseFloat(result.sectionArea);
                                    XBBCSAO = parseFloat(result.outerArea);
                                    XBBCSIXX = 10000 * parseFloat(result.bix);
                                    XBBCSIYY = 10000 * parseFloat(result.biy);
                                    XBBCSWMIN = 1000 * Math.min(parseFloat(result.wx), parseFloat(result.wy));
                                    XBBCSZ0 = 10 * parseFloat(result.z0);

                                    // 获取型钢许用应力、弹性模量、屈服强度
                                    let XBBCOST, XBBCRSTEL, XBBCEST;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_relt_et_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XBBCSCategoryVal,
                                            "type": XBBCSTypeVal,
                                            "std": XBBCSSTDVal,
                                            "name": XBBCSNameVal,
                                            "thk": XBBCSD,
                                            "temp": XBBCDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XBBCOST = parseFloat(result.ot);
                                            if (XBBCOST < 0) {
                                                south.html("查询支腿材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBCRSTEL = parseFloat(result.relt);
                                            if (XBBCRSTEL < 0) {
                                                south.html("查询支腿材料设计温度屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            XBBCEST = 1000 * parseFloat(result.et);
                                            if (XBBCEST < 0) {
                                                south.html("查询支腿材料设计温度弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // N
                                            let XBBCN;
                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                XBBCN = parseFloat(rows[13][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // BB
                                            let XBBCBB;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                XBBCBB = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB);
                                                xbbcSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbc").length > 0) {
                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB);
                                                    }
                                                });
                                            }
                                            xbbcd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB);
                                                        xbbcSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbc").length > 0) {
                                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // HF
                                            let XBBCHF;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                XBBCHF = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF);
                                                xbbcSketch.off("resize").on("resize", function () {
                                                    if ($("#xbbc").length > 0) {
                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF);
                                                    }
                                                });
                                            }
                                            xbbcd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF);
                                                        xbbcSketch.off("resize").on("resize", function () {
                                                            if ($("#xbbc").length > 0) {
                                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // TF1
                                            let XBBCTF1;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                XBBCTF1 = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            //地脚螺栓材料
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                XBBCBNameVal = rows[20][columns[0][1].field];

                                                // AJAX 获取螺栓材料密度、最大最小厚度
                                                let XBBCBDensity, XBBCBThkMin, XBBCBThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": XBBCBCategoryVal,
                                                        "type": XBBCBTypeVal,
                                                        "std": XBBCBSTDVal,
                                                        "name": XBBCBNameVal,
                                                        "temp": XBBCDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        XBBCBDensity = parseFloat(result.density);
                                                        XBBCBThkMin = parseFloat(result.thkMin);
                                                        XBBCBThkMax = parseFloat(result.thkMax);

                                                        // 螺纹规格
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBCBThkMin
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBCBThkMax) {
                                                            let XBBCNorms = rows[21][columns[0][1].field];

                                                            // 获取螺纹小径
                                                            let XBBCDMIN;
                                                            if (XBBCNorms === "M12") {
                                                                XBBCDMIN = 10.106;
                                                            }
                                                            else if (XBBCNorms === "M16") {
                                                                XBBCDMIN = 13.835;
                                                            }
                                                            else if (XBBCNorms === "M20") {
                                                                XBBCDMIN = 17.294;
                                                            }
                                                            else if (XBBCNorms === "M22") {
                                                                XBBCDMIN = 19.294;
                                                            }
                                                            else if (XBBCNorms === "M24") {
                                                                XBBCDMIN = 20.752;
                                                            }
                                                            else if (XBBCNorms === "M27") {
                                                                XBBCDMIN = 23.752;
                                                            }
                                                            else if (XBBCNorms === "M30") {
                                                                XBBCDMIN = 26.211;
                                                            }
                                                            else if (XBBCNorms === "M36") {
                                                                XBBCDMIN = 31.670;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 螺栓设计应力
                                                            let XBBCOBTAllow;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": XBBCBCategoryVal,
                                                                    "type": XBBCBTypeVal,
                                                                    "std": XBBCBSTDVal,
                                                                    "name": XBBCBNameVal,
                                                                    "thk": parseFloat(XBBCNorms.substring(1)),
                                                                    "temp": XBBCDT,
                                                                    "highLow": 2,
                                                                    "isTube": 0,
                                                                    "od": parseFloat(XBBCNorms.substring(1))
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    XBBCOBTAllow = parseFloat(result.ot);
                                                                    if (XBBCOBTAllow < 0) {
                                                                        south.html("查询螺栓材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // nbt
                                                                    let XBBCNBT;
                                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                                        XBBCNBT = parseFloat(rows[22][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                        && parseFloat(rows[23][columns[0][1].field]) < XBBCDMIN / 2) {
                                                                        let XBBCCB2 = parseFloat(rows[23][columns[0][1].field]);

                                                                        // 底板材料
                                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                            XBBCDNameVal = rows[27][columns[0][1].field];

                                                                            // AJAX 获取底板材料密度、最大最小厚度
                                                                            let XBBCDDensity, XBBCDThkMin, XBBCDThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": XBBCDCategoryVal,
                                                                                    "type": XBBCDTypeVal,
                                                                                    "std": XBBCDSTDVal,
                                                                                    "name": XBBCDNameVal,
                                                                                    "temp": XBBCDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    XBBCDDensity = parseFloat(result.density);
                                                                                    XBBCDThkMin = parseFloat(result.thkMin);
                                                                                    XBBCDThkMax = parseFloat(result.thkMax);

                                                                                    // thkdn
                                                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBCDThkMin
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBCDThkMax) {
                                                                                        let XBBCTHKDN = parseFloat(rows[28][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN);
                                                                                            xbbcSketch.off("resize").on("resize", function () {
                                                                                                if ($("#xbbc").length > 0) {
                                                                                                    xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        xbbcd2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN);
                                                                                                    xbbcSketch.off("resize").on("resize", function () {
                                                                                                        if ($("#xbbc").length > 0) {
                                                                                                            xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 底板设计应力、负偏差
                                                                                        let XBBCODT, XBBCCD1;
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "category": XBBCDCategoryVal,
                                                                                                "type": XBBCDTypeVal,
                                                                                                "std": XBBCDSTDVal,
                                                                                                "name": XBBCDNameVal,
                                                                                                "thk": XBBCTHKDN,
                                                                                                "temp": XBBCDT,
                                                                                                "highLow": 2,
                                                                                                "isTube": 0,
                                                                                                "od": 100000
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                            },
                                                                                            success: function (result) {

                                                                                                XBBCODT = parseFloat(result.ot);
                                                                                                if (XBBCODT < 0) {
                                                                                                    south.html("查询底板材料设计温度许用应力失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }
                                                                                                XBBCCD1 = parseFloat(result.c1);
                                                                                                if (XBBCCD1 < 0) {
                                                                                                    south.html("查询底板材料厚度负偏差失败！").css("color", "red");
                                                                                                    return false;
                                                                                                }

                                                                                                // 腐蚀裕量
                                                                                                if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) < XBBCTHKDN) {
                                                                                                    let XBBCCD2 = parseFloat(rows[29][columns[0][1].field]);

                                                                                                    // d1
                                                                                                    let XBBCD1;
                                                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) >= XBBCSSB) {
                                                                                                        XBBCD1 = parseFloat(rows[30][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                                                        && parseFloat(rows[30][columns[0][1].field]) < XBBCSSB) {
                                                                                                        south.html("底板长度d1不得小于 " + XBBCSSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // d2
                                                                                                    let XBBCD2;
                                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= XBBCSSB) {
                                                                                                        XBBCD2 = parseFloat(rows[31][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                                        && parseFloat(rows[31][columns[0][1].field]) < XBBCSSB) {
                                                                                                        south.html("底板宽度d2不得小于 " + XBBCSSB + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // H
                                                                                                    let XBBCH;
                                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                                                                        XBBCH = parseFloat(rows[32][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH);
                                                                                                        xbbcSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbc").length > 0) {
                                                                                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbcd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH);
                                                                                                                xbbcSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbc").length > 0) {
                                                                                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // HC
                                                                                                    let XBBCHC;
                                                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) >= XBBCH) {
                                                                                                        XBBCHC = parseFloat(rows[33][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                        && parseFloat(rows[33][columns[0][1].field]) < XBBCH) {
                                                                                                        south.html("底板下表面到设备质心高度 Hc 不得小于 " + XBBCH + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH, XBBCHC);
                                                                                                        xbbcSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#xbbc").length > 0) {
                                                                                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH, XBBCHC);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    xbbcd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH, XBBCHC);
                                                                                                                xbbcSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#xbbc").length > 0) {
                                                                                                                        xbbc2d("Φ" + XBBCDS0, "Φ" + XBBCD0, XBBCBB, XBBCHF, XBBCTHKDN, XBBCH, XBBCHC);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // OC1ALLOW
                                                                                                    let XBBCOC1ALLOW;
                                                                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                                                                        XBBCOC1ALLOW = parseFloat(rows[34][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 载荷计算
                                                                                                    let XBBCPW = 1.2 * XBBCFI * XBBCQ0 * XBBCD0 * XBBCH0 / 1000000;
                                                                                                    let XBBCG = 9.8;
                                                                                                    let XBBCPE = XBBCAlphaE * XBBCM0 * XBBCG;
                                                                                                    let XBBCFH = Math.max(XBBCPW, XBBCPE + 0.25 * XBBCPW);
                                                                                                    let XBBCW1 = XBBCM0 * XBBCG;
                                                                                                    let XBBCR = XBBCFH / XBBCN;
                                                                                                    let XBBCDB = 2 * (XBBCSSB - XBBCSZ0) + Math.sqrt(XBBCDS0 * XBBCDS0 - (XBBCSSH - 2 * XBBCSTM) * (XBBCSSH - 2 * XBBCSTM));
                                                                                                    let XBBCFL1 = 4 * XBBCFH * XBBCHC / XBBCN / XBBCDB - XBBCW1 / XBBCN;
                                                                                                    let XBBCFL2 = XBBCW1 / XBBCN + 4 * XBBCFH * XBBCHC / XBBCN / XBBCDB;

                                                                                                    // 支腿计算
                                                                                                    let XBBCIMIN = Math.min(XBBCSIXX, XBBCSIYY);
                                                                                                    let XBBCIH = Math.sqrt(XBBCIMIN / XBBCSA);
                                                                                                    let XBBCLamuda = 0.7 * XBBCH / XBBCIH;
                                                                                                    let XBBCLamudaH = Math.sqrt((Math.PI * Math.PI * XBBCEST) / (0.6 * XBBCRSTEL));
                                                                                                    let XBBCNS = 3 / 2 + 2 / 3 * (XBBCLamuda / XBBCLamudaH) * (XBBCLamuda / XBBCLamudaH);
                                                                                                    let XBBCEta = 1.0;
                                                                                                    let XBBCOCRALLOW;
                                                                                                    if (XBBCLamuda <= XBBCLamudaH) {
                                                                                                        XBBCOCRALLOW = (1.2 * (1 - 0.4 * (XBBCLamuda / XBBCLamudaH) * (XBBCLamuda / XBBCLamudaH)) * XBBCRSTEL) / (XBBCNS * XBBCEta);
                                                                                                    }
                                                                                                    else {
                                                                                                        XBBCOCRALLOW = 0.227 * XBBCRSTEL / ((XBBCLamuda / XBBCLamudaH) * (XBBCLamuda / XBBCLamudaH));
                                                                                                    }
                                                                                                    south.html(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "支腿许用压应力：" + XBBCOCRALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBCOC = XBBCFL2 / XBBCSA;
                                                                                                    let XBBCOCCHK;
                                                                                                    if (XBBCOC <= XBBCOCRALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBCOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOCCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBCOC.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOCCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBCTau = XBBCR / XBBCSA;
                                                                                                    let XBBCTauAllow = 0.6 * XBBCOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用剪应力：" + XBBCTauAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBCTauCHK;
                                                                                                    if (XBBCTau <= XBBCTauAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBCTau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCTauCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBCTau.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCTauCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBCL1 = XBBCH + XBBCHF / 2 + 50;
                                                                                                    let XBBCE = (XBBCDB - XBBCDS0) / 2;
                                                                                                    let XBBCOB = (XBBCR * XBBCL1 - XBBCFL2 * XBBCE) / XBBCSWMIN;
                                                                                                    let XBBCOBAllow = 1.5 * XBBCOST;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿许用弯曲应力：" + XBBCOBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");

                                                                                                    let XBBCOBCHK;
                                                                                                    if (XBBCOB <= XBBCOBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBCOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOBCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBCOB.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOBCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBCTotalCHK;
                                                                                                    if ((Math.abs(XBBCOC / XBBCOCRALLOW) + Math.abs(XBBCOB / XBBCOBAllow)) <= 1) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：合格" +
                                                                                                            "</span>");
                                                                                                        XBBCTotalCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "支腿钢结构综合评价：不合格" +
                                                                                                            "</span>");
                                                                                                        XBBCTotalCHK = "不合格";
                                                                                                    }

                                                                                                    // 地脚螺栓计算及校核
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用拉应力：" + XBBCOBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBCABT = Math.PI / 4 * (XBBCDMIN - 2 * XBBCCB2) * (XBBCDMIN - 2 * XBBCCB2);
                                                                                                    let XBBCOBT = Math.max(0, XBBCFL1 / (XBBCNBT * XBBCABT));
                                                                                                    let XBBCOBTCHK;
                                                                                                    if (XBBCOBT <= XBBCOBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBCOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际拉应力：" + XBBCOBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOBTCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBCTauBT = Math.max(0, (XBBCFH - 0.4 * XBBCW1) / (XBBCN * XBBCNBT * XBBCABT));
                                                                                                    let XBBCTauBTAllow = 0.6 * XBBCOBTAllow;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "地脚螺栓许用剪应力：" + XBBCTauBTAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBCTauBTCHK;
                                                                                                    if (XBBCTauBT <= XBBCTauBTAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBCTauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCTauBTCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBCTauBT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCTauBTCHK = "不合格";
                                                                                                    }

                                                                                                    // 基础应力计算及校核
                                                                                                    let XBBCOC1 = XBBCFL2 / (XBBCD1 * XBBCD2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "基础许用压应力：" + XBBCOC1ALLOW.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBCOC1CHK;
                                                                                                    if (XBBCOC1 <= XBBCOC1ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBCOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOC1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际压应力：" + XBBCOC1.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOC1CHK = "不合格";
                                                                                                    }

                                                                                                    // 底板计算及校核
                                                                                                    let XBBCTHKDC = XBBCBB * Math.sqrt(3 * XBBCOC1 / XBBCODT);
                                                                                                    let XBBCTHKDD = XBBCTHKDC + XBBCCD2;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "底板所需厚度：" + (XBBCTHKDD + XBBCCD1).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let XBBCTHKDCHK;
                                                                                                    if ((XBBCTHKDD + XBBCCD1) <= XBBCTHKDN) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBCTHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBCTHKDCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + XBBCTHKDN + " mm" +
                                                                                                            "</span>");
                                                                                                        XBBCTHKDCHK = "不合格";
                                                                                                    }

                                                                                                    // 装配焊缝
                                                                                                    let XBBCFai = 0.49;
                                                                                                    let XBBCBAllow = 1.5 * XBBCOST * XBBCFai;
                                                                                                    let XBBCHF1 = XBBCHF - 10;
                                                                                                    let XBBCZ = 2 * XBBCHF1 * XBBCHF1 / 6 * XBBCTF1 / Math.sqrt(2);

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用弯曲应力：" + XBBCBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBCOF = XBBCR * XBBCL1 / XBBCZ;
                                                                                                    let XBBCOFCHK;
                                                                                                    if (XBBCOF <= XBBCBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBCOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际弯曲应力：" + XBBCOF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOFCHK = "不合格";
                                                                                                    }

                                                                                                    let XBBCAF = 2 * XBBCHF1 * XBBCTF1 / Math.sqrt(2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用剪应力：" + XBBCBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBCTauF = XBBCFL2 / XBBCAF;
                                                                                                    let XBBCTauFCHK;
                                                                                                    if (XBBCTauF <= XBBCBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBCTauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCTauFCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际剪应力：" + XBBCTauF.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCTauFCHK = "不合格";
                                                                                                    }

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "支腿装配焊缝许用当量应力：" + XBBCBAllow.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    let XBBCOT = Math.sqrt(XBBCOF * XBBCOF + 3 * XBBCTauF * XBBCTauF);
                                                                                                    let XBBCOTCHK;
                                                                                                    if (XBBCOT <= XBBCBAllow) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBCOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOTCHK = "合格";
                                                                                                    } else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际当量应力：" + XBBCOT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        XBBCOTCHK = "不合格";
                                                                                                    }

                                                                                                    // docx
                                                                                                    let XBBCPayJS = $('#payjs');

                                                                                                    function getDocx() {
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "xbbcdocx.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                ribbonName: "XBBC",

                                                                                                                t: XBBCDT,

                                                                                                                h0: XBBCH0,
                                                                                                                d0: XBBCD0,
                                                                                                                ds0: XBBCDS0,
                                                                                                                m0: XBBCM0,

                                                                                                                q0: XBBCQ0,
                                                                                                                fi: XBBCFI,
                                                                                                                eq: XBBCEQ,

                                                                                                                stds: XBBCSSTDVal,
                                                                                                                names: XBBCSNameVal,
                                                                                                                n: XBBCN,
                                                                                                                norms: XBBCSNormVal,
                                                                                                                bb: XBBCBB,
                                                                                                                hf: XBBCHF,
                                                                                                                tf1: XBBCTF1,

                                                                                                                stdb: XBBCBSTDVal,
                                                                                                                nameb: XBBCBNameVal,
                                                                                                                normb: XBBCNorms,
                                                                                                                nbt: XBBCNBT,
                                                                                                                cb2: XBBCCB2,

                                                                                                                stdd: XBBCDSTDVal,
                                                                                                                named: XBBCDNameVal,
                                                                                                                cd2: XBBCCD2,
                                                                                                                thkdn: XBBCTHKDN,
                                                                                                                d1: XBBCD1,
                                                                                                                d2: XBBCD2,
                                                                                                                h: XBBCH,
                                                                                                                hc: XBBCHC,

                                                                                                                oc1allow: XBBCOC1ALLOW,

                                                                                                                ostallow: XBBCOST.toFixed(4),
                                                                                                                rstel: XBBCRSTEL.toFixed(4),
                                                                                                                est: (XBBCEST / 1000).toFixed(4),
                                                                                                                sh: XBBCSSH.toFixed(4),
                                                                                                                sb: XBBCSSB.toFixed(4),
                                                                                                                d: XBBCSD.toFixed(4),
                                                                                                                tm: XBBCSTM.toFixed(4),
                                                                                                                a: XBBCSA.toFixed(4),
                                                                                                                densitys: XBBCSDensity.toFixed(4),
                                                                                                                ao: XBBCSAO.toFixed(4),
                                                                                                                ixx: XBBCSIXX.toFixed(4),
                                                                                                                iyy: XBBCSIYY.toFixed(4),
                                                                                                                wmin: XBBCSWMIN.toFixed(4),
                                                                                                                z0: XBBCSZ0.toFixed(4),

                                                                                                                densityb: XBBCBDensity.toFixed(4),
                                                                                                                obtallow: XBBCOBTAllow.toFixed(4),

                                                                                                                densityd: XBBCDDensity.toFixed(4),
                                                                                                                cd1: XBBCCD1.toFixed(4),
                                                                                                                odtallow: XBBCODT.toFixed(4),

                                                                                                                pw: XBBCPW.toFixed(4),
                                                                                                                alphae: XBBCAlphaE.toFixed(4),
                                                                                                                g: XBBCG.toFixed(4),
                                                                                                                pe: XBBCPE.toFixed(4),
                                                                                                                fh: XBBCFH.toFixed(4),
                                                                                                                w1: XBBCW1.toFixed(4),
                                                                                                                r: XBBCR.toFixed(4),
                                                                                                                db: XBBCDB.toFixed(4),
                                                                                                                fl1: XBBCFL1.toFixed(4),
                                                                                                                fl2: XBBCFL2.toFixed(4),

                                                                                                                imin: XBBCIMIN.toFixed(4),
                                                                                                                ih: XBBCIH.toFixed(4),
                                                                                                                lamuda: XBBCLamuda.toFixed(4),
                                                                                                                lamudah: XBBCLamudaH.toFixed(4),
                                                                                                                ns: XBBCNS.toFixed(4),
                                                                                                                eta: XBBCEta.toFixed(4),
                                                                                                                ocrallow: XBBCOCRALLOW.toFixed(4),
                                                                                                                oc: XBBCOC.toFixed(4),
                                                                                                                occhk: XBBCOCCHK,
                                                                                                                tau: XBBCTau.toFixed(4),
                                                                                                                tauallow: XBBCTauAllow.toFixed(4),
                                                                                                                tauchk: XBBCTauCHK,
                                                                                                                l1: XBBCL1.toFixed(4),
                                                                                                                e: XBBCE.toFixed(4),
                                                                                                                ob: XBBCOB.toFixed(4),
                                                                                                                oballow: XBBCOBAllow.toFixed(4),
                                                                                                                obchk: XBBCOBCHK,
                                                                                                                totalchk: XBBCTotalCHK,

                                                                                                                dmin: XBBCDMIN.toFixed(4),
                                                                                                                abt: XBBCABT.toFixed(4),
                                                                                                                obt: XBBCOBT.toFixed(4),
                                                                                                                obtchk: XBBCOBTCHK,
                                                                                                                taubt: XBBCTauBT.toFixed(4),
                                                                                                                taubtallow: XBBCTauBTAllow.toFixed(4),
                                                                                                                taubtchk: XBBCTauBTCHK,

                                                                                                                oc1: XBBCOC1.toFixed(4),
                                                                                                                oc1chk: XBBCOC1CHK,

                                                                                                                thkdc: XBBCTHKDC.toFixed(4),
                                                                                                                thkdd: XBBCTHKDD.toFixed(4),
                                                                                                                thkdchk: XBBCTHKDCHK,

                                                                                                                fai: XBBCFai.toFixed(4),
                                                                                                                ballow: XBBCBAllow.toFixed(4),
                                                                                                                hf1: XBBCHF1.toFixed(4),
                                                                                                                z: XBBCZ.toFixed(4),
                                                                                                                of: XBBCOF.toFixed(4),
                                                                                                                ofchk: XBBCOFCHK,
                                                                                                                af: XBBCAF.toFixed(4),
                                                                                                                tauf: XBBCTauF.toFixed(4),
                                                                                                                taufchk: XBBCTauFCHK,
                                                                                                                ot: XBBCOT.toFixed(4),
                                                                                                                otchk: XBBCOTCHK
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
                                                                                                                    XBBCPayJS.dialog({
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
                                                                                                                                XBBCPayJS.dialog("close");
                                                                                                                                XBBCPayJS.dialog("clear");
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
                                                                                                                                            XBBCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                    XBBCPayJS.dialog('close');
                                                                                                                                                    XBBCPayJS.dialog('clear');
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
                                                                                                    && parseFloat(rows[29][columns[0][1].field]) >= XBBCTHKDN) {
                                                                                                    south.html("底板腐蚀裕量不得大于 " + XBBCTHKDN + " mm").css("color", "red");
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
                                                                                        && parseFloat(rows[28][columns[0][1].field]) <= XBBCDThkMin) {
                                                                                        south.html("底板名义厚度 δdn 不得小于等于 " + XBBCDThkMin).css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                        && parseFloat(rows[28][columns[0][1].field]) > XBBCDThkMax) {
                                                                                        south.html("底板名义厚度 δdn 不得大于 " + XBBCDThkMax).css("color", "red");
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
                                                                        && parseFloat(rows[23][columns[0][1].field]) >= XBBCDMIN / 2) {
                                                                        south.html("螺栓腐蚀裕量不得大于 " + XBBCDMIN / 2 + " mm").css("color", "red");
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
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) <= XBBCBThkMin) {
                                                            south.html("螺栓规格不得小于等于 M" + XBBCBThkMin).css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                            && parseFloat(rows[21][columns[0][1].field].substring(1)) > XBBCBThkMax) {
                                                            south.html("螺栓规格不得大于 M" + XBBCBThkMax).css("color", "red");
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