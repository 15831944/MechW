$(document).ready(function () {
    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbbaSketch = $("#d2");
    let xbbaModel = $("#d3");
    let xbbad2d3 = $('#d2d3');

    $("#cal").html("<table id='xbba'></table>");
    let pg = $("#xbba");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/b/a/XBBA.json", function (result) {

        let XBBADT,
            XBBASCategory, XBBASCategoryVal, XBBASType, XBBASTypeVal, XBBASSTD, XBBASSTDVal, XBBASName, XBBASNameVal,
            XBBABCategory, XBBABCategoryVal, XBBABType, XBBABTypeVal, XBBABSTD, XBBABSTDVal, XBBABName, XBBABNameVal,
            XBBADCategory, XBBADCategoryVal, XBBADType, XBBADTypeVal, XBBADSTD, XBBADSTDVal, XBBADName, XBBADNameVal,
            columns, rows, ed;

        function xbba2d(d0 = "ΦD0",
                        dout = "Φdo", thksn = "δsn", e = "e", db = "ΦDB", b = "B", hf = "hf",
                        thkdn = "δdn", d1 = "d1", d2 = "d2", h = "H", hc = "Hc") {

            xbbaSketch.empty();

            let width = xbbaSketch.width();
            let height = xbbaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XBBASVG").attr("height", height);

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

            // 底板及其标注
            let ro = gg / 3;
            let ri = ro - thk;
            let cx = padding + 3 * wg;
            let cy = height / 2;
            let basePlateLength = 1.5 * ro;
            drawArc(ro, ro, cx, cy - ro, cx, cy + ro);
            drawArc(ro, ro, cx, cy + ro, cx, cy - ro);
            drawArc(ri, ri, cx, cy - ri, cx, cy + ri);
            drawArc(ri, ri, cx, cy + ri, cx, cy - ri);
            svg.append("path").attr("d", line([
                {x: cx - basePlateLength, y: cy - basePlateLength},
                {x: cx + basePlateLength, y: cy - basePlateLength},
                {x: cx + basePlateLength, y: cy + basePlateLength},
                {x: cx - basePlateLength, y: cy + basePlateLength},
                {x: cx - basePlateLength, y: cy - basePlateLength}
            ])).classed("sketch", true);
            drawCenterLine(cx - basePlateLength - 10, cy, cx + basePlateLength + 10, cy);
            drawCenterLine(cx, cy - basePlateLength - 10, cx, cy + basePlateLength + 10);
            // d1 d2
            dimBottomH(cx - basePlateLength, cy + basePlateLength, cx + basePlateLength, cy + basePlateLength, d1, "XBBASketchD1");
            dimRightV(cx + basePlateLength, cy + basePlateLength, cx + basePlateLength, cy - basePlateLength, d2, "XBBASketchD2");
            // dout thksn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + ro, y: cy},
                    {x: cx + ro + 15, y: cy - 3},
                    {x: cx + ro + 15, y: cy + 3},
                    {x: cx + ro, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + ro + 15, y: cy},
                    {x: cx + ro + 15 + 50, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path")
                .attr("d", line([
                    {x: cx + 0.707 * (ro + 15 + 50), y: cy - 0.707 * (ro + 15 + 50)},
                    {x: cx + 0.707 * (ro + 15 + 50) + 80, y: cy - 0.707 * (ro + 15 + 50)}
                ])).classed("sketch", true).attr("id", "XBBASketchDOUT");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBASketchDOUT")
                .attr("startOffset", "50%").text(dout + "×" + thksn);

            // 设备及标注
            let xaxis = padding + wg;
            drawArc(gg / 2, gg / 4, xaxis - gg / 2, padding + hg, xaxis + gg / 2, padding + hg);
            drawArc(gg / 2, gg / 4, xaxis + gg / 2, padding + 3 * hg, xaxis - gg / 2, padding + 3 * hg);
            drawLine(xaxis - gg / 2, padding + hg, xaxis - gg / 2, padding + 3 * hg);
            drawLine(xaxis + gg / 2, padding + hg, xaxis + gg / 2, padding + 3 * hg);
            drawCenterLine(xaxis - gg / 2, padding + hg, xaxis + gg / 2, padding + hg);
            drawLine(xaxis - gg / 2, padding + hg + 5, xaxis + gg / 2, padding + hg + 5);
            drawCenterLine(xaxis - gg / 2, padding + 3 * hg, xaxis + gg / 2, padding + 3 * hg);
            drawLine(xaxis - gg / 2, padding + 3 * hg - 5, xaxis + gg / 2, padding + 3 * hg - 5);

            //d0
            dimTopH(xaxis - gg / 2 - 10, height / 2, xaxis + gg / 2 + 10, height / 2, d0, "XBBASketchD0");
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8, xaxis - gg / 2, height / 2 - 8 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 5, xaxis - gg / 2, height / 2 - 8 - 5 - 5);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 10, xaxis - gg / 2, height / 2 - 8 - 5 - 10);
            drawLine(xaxis - gg / 2 - 10, height / 2 - 8 - 15, xaxis - gg / 2, height / 2 - 8 - 5 - 15);
            drawLine(xaxis + gg / 2, height / 2 - 8, xaxis + gg / 2 + 10, height / 2 - 8 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 5, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 5);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 10, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 10);
            drawLine(xaxis + gg / 2, height / 2 - 8 - 15, xaxis + gg / 2 + 10, height / 2 - 8 - 5 - 15);

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
            drawCenterLine(xaxis - gg / 2 - sdo / 2, height / 2 + 0.4 * hg + sdo / 2 - 5, xaxis - gg / 2 - sdo / 2, height - padding + thk + 5);

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
            drawCenterLine(xaxis + gg / 2 + sdo / 2, height / 2 + 0.4 * hg + sdo / 2 - 5, xaxis + gg / 2 + sdo / 2, height - padding + thk + 5);

            // db
            dimBottomH(xaxis - gg / 2 - sdo / 2, height - padding + thk + 5, xaxis + gg / 2 + sdo / 2, height - padding + thk + 5, db, "XBBASketchDB");

            // H
            dimLeftV(xaxis - gg / 2 - sdo - 10 - 40 + 3, height - padding + thk, xaxis - gg / 2 - sdo - 10 - 40 + 3, padding + 3 * hg - 5, h, "XBBASketchH");
            drawLine(xaxis - gg / 2 - sdo - 10 - 40 - 3, padding + 3 * hg - 5, xaxis - gg / 2 - 3, padding + 3 * hg - 5);

            // hf
            dimRightV(xaxis - gg / 2, height - padding - hg - 5 - 5, xaxis - gg / 2, height / 2 + 0.4 * hg, hf, "XBBASketchHF1");
            dimLeftV(xaxis + gg / 2, height - padding - hg - 5 - 5, xaxis + gg / 2, height / 2 + 0.4 * hg, hf, "XBBASketchHF2");

            // cg
            svg.append("path").attr("d", "M "
                + (padding + wg) + " " + (height / 2 + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (padding + wg) + " " + (height / 2 - 2)
            ).classed("sketch arrow", true);
            svg.append("path").attr("d", "M "
                + (padding + wg) + " " + (height / 2 - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (padding + wg) + " " + (height / 2 + 2)
            ).classed("sketch arrow", true);

            // hc
            dimRightV(xaxis + gg / 2 + sdo + 10, height - padding + thk,
                xaxis + gg / 2 + sdo + 10, height / 2,
                hc, "XBBASketchHC");
            drawLine(xaxis + gg / 2 + sdo + 10 + 3, height / 2, padding + wg + 2 + 3, height / 2);
            svg.append("path").attr("d", line([
                {x: xaxis + gg / 2 + sdo + 10 + 40, y: height / 2},
                {x: xaxis + gg / 2 + sdo + 10 + 40 + 30, y: height / 2}
            ])).attr("id", "XBBASketchCG");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 0).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBASketchCG")
                .attr("startOffset", "50%").text("C.G.");

            // E
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xaxis - gg / 2, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20},
                    {x: xaxis - gg / 2 + 10, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 18},
                    {x: xaxis - gg / 2 + 10, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 22},
                    {x: xaxis - gg / 2, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xaxis - gg / 2 - sdo / 2, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20},
                    {x: xaxis - gg / 2 - sdo / 2 - 10, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 18},
                    {x: xaxis - gg / 2 - sdo / 2 - 10, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 22},
                    {x: xaxis - gg / 2 - sdo / 2, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20}
                ]));
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo / 2, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20},
                {x: xaxis - gg / 2 + 10 + 5, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo / 2, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 25},
                {x: xaxis - gg / 2 - sdo / 2, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 3}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xaxis - gg / 2 - sdo / 2 - 10 - 40, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20},
                {x: xaxis - gg / 2 - sdo / 2 - 10, y: height / 2 + 0.4 * hg + sdo / 2 - 5 - 20}
            ])).attr("id", "XBBASketchE").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBASketchE")
                .attr("startOffset", "50%").text(e);

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
            ])).attr("id", "XBBASketchB").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBASketchB")
                .attr("startOffset", "50%").text(b);

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
            ])).attr("id", "XBBASketchTHKDN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBASketchTHKDN").attr("startOffset", "50%").text(thkdn);

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
                ])).classed("sketch", true).attr("id", "XBBASketch50");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBBASketch50")
                .attr("startOffset", "50%").text("50mm不焊");

        }

        currentTabIndex = xbbad2d3.tabs('getTabIndex', xbbad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xbba").length > 0) {
                    xbba2d();
                }
            });
        }
        xbbad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xbba").length > 0) {
                            xbba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "JB/T 4712.2-2007 管制腿座计算",
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

                if (index === 7) {
                    $(ed.target).combobox("loadData", XBBASCategory);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", XBBASType);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", XBBASSTD);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", XBBASName);
                }

                else if (index === 20) {
                    $(ed.target).combobox("loadData", XBBABCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", XBBABType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", XBBABSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", XBBABName);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", XBBADCategory);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", XBBADType);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", XBBADSTD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", XBBADName);
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
                    xbbaSketch.empty();
                    xbbaModel.empty();

                    // sketch
                    currentTabIndex = xbbad2d3.tabs('getTabIndex', xbbad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xbba2d();
                        xbbaSketch.off("resize").on("resize", function () {
                            if ($("#xbba").length > 0) {
                                xbba2d();
                            }
                        });
                    }
                    xbbad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbba2d();
                                xbbaSketch.off("resize").on("resize", function () {
                                    if ($("#xbba").length > 0) {
                                        xbba2d();
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

                        XBBADT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XBBASCategory = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XBBASType = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBASSTD = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBASName = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        XBBABCategory = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XBBABType = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        XBBABSTD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBBABName = null;

                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        XBBADCategory = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XBBADType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBBADSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        XBBADName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBASCategory = [];
                                XBBABCategory = [];
                                XBBADCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XBBADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XBBASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBADCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBBABCategory[index] = {
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
                    if (index === 7) {

                        XBBASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XBBASType = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBASSTD = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBASCategoryVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBASType = [];
                                $(result).each(function (index, element) {
                                    let i = 0;
                                    if (element === "管材") {
                                        XBBASType[i] = {
                                            "value": element,
                                            "text": element
                                        };
                                        i++;
                                    }

                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }
                    // type std
                    if (index === 8) {

                        XBBASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBBASSTD = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBASCategoryVal,
                                type: XBBASTypeVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBASSTD = [];
                                $(result).each(function (index, element) {
                                    XBBASSTD[index] = {
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
                    if (index === 9) {

                        XBBASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBBASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBASCategoryVal,
                                type: XBBASTypeVal,
                                std: XBBASSTDVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBASName = [];
                                $(result).each(function (index, element) {
                                    XBBASName[index] = {
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
                    if (index === 20) {

                        XBBABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        XBBABType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XBBABSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        XBBABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBABCategoryVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBABType = [];
                                $(result).each(function (index, element) {
                                    XBBABType[index] = {
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
                    if (index === 21) {

                        XBBABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XBBABSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        XBBABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBABCategoryVal,
                                type: XBBABTypeVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBABSTD = [];
                                $(result).each(function (index, element) {
                                    XBBABSTD[index] = {
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
                    if (index === 22) {

                        XBBABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        XBBABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBABCategoryVal,
                                type: XBBABTypeVal,
                                std: XBBABSTDVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBABName = [];
                                $(result).each(function (index, element) {
                                    XBBABName[index] = {
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
                    if (index === 27) {

                        XBBADCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        XBBADType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XBBADSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBBADName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBADCategoryVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBADType = [];
                                $(result).each(function (index, element) {
                                    XBBADType[index] = {
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
                    if (index === 28) {

                        XBBADTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XBBADSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBBADName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBADCategoryVal,
                                type: XBBADTypeVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBADSTD = [];
                                $(result).each(function (index, element) {
                                    XBBADSTD[index] = {
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
                    if (index === 29) {

                        XBBADSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBBADName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBBADCategoryVal,
                                type: XBBADTypeVal,
                                std: XBBADSTDVal,
                                temp: XBBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBBADName = [];
                                $(result).each(function (index, element) {
                                    XBBADName[index] = {
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

                    // H0
                    let XBBAH0;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        XBBAH0 = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // D0
                    let XBBAD0;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        XBBAD0 = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        xbba2d("Φ" + XBBAD0);
                        xbbaSketch.off("resize").on("resize", function () {
                            if ($("#xbba").length > 0) {
                                xbba2d("Φ" + XBBAD0);
                            }
                        });
                    }
                    xbbad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbba2d("Φ" + XBBAD0);
                                xbbaSketch.off("resize").on("resize", function () {
                                    if ($("#xbba").length > 0) {
                                        xbba2d("Φ" + XBBAD0);
                                    }
                                });
                            }
                        }
                    });

                    // M0
                    let XBBAM0;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        XBBAM0 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Q0
                    let XBBAQ0;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        XBBAQ0 = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // FI
                    let XBBAFI;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        XBBAFI = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // EQ
                    let XBBAEQ;
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        XBBAEQ = rows[6][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // alphae
                    let XBBAAlphaE;
                    if (XBBAEQ === "0.1g") {
                        XBBAAlphaE = 0.08;
                    }
                    else if (XBBAEQ === "0.15g") {
                        XBBAAlphaE = 0.12;
                    }
                    else if (XBBAEQ === "0.2g") {
                        XBBAAlphaE = 0.16;
                    }
                    else if (XBBAEQ === "0.3g") {
                        XBBAAlphaE = 0.24;
                    }
                    else if (XBBAEQ === "0.4g") {
                        XBBAAlphaE = 0.32;
                    }
                    else {
                        return false;
                    }

                    // 支腿材料名称
                    if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                        XBBASNameVal = rows[10][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度
                    let XBBASDensity, XBBASThkMax, XBBASThkMin;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": XBBASCategoryVal,
                            "type": XBBASTypeVal,
                            "std": XBBASSTDVal,
                            "name": XBBASNameVal,
                            "temp": XBBADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            XBBASDensity = parseFloat(result.density);
                            XBBASThkMin = parseFloat(result.thkMin);
                            XBBASThkMax = parseFloat(result.thkMax);

                            // N
                            let XBBAN;
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                XBBAN = parseFloat(rows[11][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // dout
                            let XBBADOUT;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                XBBADOUT = parseFloat(rows[12][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT);
                                xbbaSketch.off("resize").on("resize", function () {
                                    if ($("#xbba").length > 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT);
                                    }
                                });
                            }
                            xbbad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT);
                                        xbbaSketch.off("resize").on("resize", function () {
                                            if ($("#xbba").length > 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT);
                                            }
                                        });
                                    }
                                }
                            });

                            // thksn
                            let XBBATHKSN;
                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > XBBASThkMin
                                && parseFloat(rows[13][columns[0][1].field]) <= Math.min(XBBASThkMax, XBBADOUT / 2)) {
                                XBBATHKSN = parseFloat(rows[13][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) <= XBBASThkMin) {
                                south.html("支腿名义厚度 δsn 不能小于等于 " + XBBASThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > Math.min(XBBASThkMax, XBBADOUT / 2)) {
                                south.html("支腿名义厚度 δsn 不能大于 " + Math.min(XBBASThkMax, XBBADOUT / 2) + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN);
                                xbbaSketch.off("resize").on("resize", function () {
                                    if ($("#xbba").length > 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN);
                                    }
                                });
                            }
                            xbbad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN);
                                        xbbaSketch.off("resize").on("resize", function () {
                                            if ($("#xbba").length > 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            // ajax
                            let XBBAOST, XBBARSTEL, XBBAEST, XBBACS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_relt_et_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XBBASCategoryVal,
                                    "type": XBBASTypeVal,
                                    "std": XBBASSTDVal,
                                    "name": XBBASNameVal,
                                    "thk": XBBATHKSN,
                                    "temp": XBBADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": XBBADOUT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XBBAOST = parseFloat(result.ot);
                                    if (XBBAOST < 0) {
                                        south.html("查询支腿材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    XBBACS1 = parseFloat(result.c1);
                                    if (XBBACS1 < 0) {
                                        south.html("查询支腿材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    XBBARSTEL = parseFloat(result.relt);
                                    if (XBBARSTEL < 0) {
                                        south.html("查询支腿材料设计温度屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    XBBAEST = 1000 * parseFloat(result.et);
                                    if (XBBAEST < 0) {
                                        south.html("查询支腿材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // 支腿腐蚀裕量
                                    let XBBACS2;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) < XBBATHKSN) {
                                        XBBACS2 = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) >= XBBATHKSN) {
                                        south.html("支腿腐蚀裕量不能大于等于 " + XBBATHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // E
                                    let XBBAE;
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                        XBBAE = parseFloat(rows[15][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE);
                                        xbbaSketch.off("resize").on("resize", function () {
                                            if ($("#xbba").length > 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE);
                                            }
                                        });
                                    }
                                    xbbad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE);
                                                xbbaSketch.off("resize").on("resize", function () {
                                                    if ($("#xbba").length > 0) {
                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // DB
                                    let XBBADB;
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                        XBBADB = parseFloat(rows[16][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB);
                                        xbbaSketch.off("resize").on("resize", function () {
                                            if ($("#xbba").length > 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB);
                                            }
                                        });
                                    }
                                    xbbad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB);
                                                xbbaSketch.off("resize").on("resize", function () {
                                                    if ($("#xbba").length > 0) {
                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // B
                                    let XBBAB;
                                    if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                        XBBAB = parseFloat(rows[17][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB);
                                        xbbaSketch.off("resize").on("resize", function () {
                                            if ($("#xbba").length > 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB);
                                            }
                                        });
                                    }
                                    xbbad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB);
                                                xbbaSketch.off("resize").on("resize", function () {
                                                    if ($("#xbba").length > 0) {
                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // HF
                                    let XBBAHF;
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        XBBAHF = parseFloat(rows[18][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF);
                                        xbbaSketch.off("resize").on("resize", function () {
                                            if ($("#xbba").length > 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF);
                                            }
                                        });
                                    }
                                    xbbad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF);
                                                xbbaSketch.off("resize").on("resize", function () {
                                                    if ($("#xbba").length > 0) {
                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // TF1
                                    let XBBATF1;
                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                        XBBATF1 = parseFloat(rows[19][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    //地脚螺栓材料
                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                        XBBABNameVal = rows[23][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取螺栓材料密度、最大最小厚度
                                    let XBBABDensity, XBBABThkMin, XBBABThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XBBABCategoryVal,
                                            "type": XBBABTypeVal,
                                            "std": XBBABSTDVal,
                                            "name": XBBABNameVal,
                                            "temp": XBBADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XBBABDensity = parseFloat(result.density);
                                            XBBABThkMin = parseFloat(result.thkMin);
                                            XBBABThkMax = parseFloat(result.thkMax);

                                            // 螺纹规格
                                            let XBBANorms;
                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field].substring(1)) > XBBABThkMin
                                                && parseFloat(rows[24][columns[0][1].field].substring(1)) <= XBBABThkMax) {
                                                XBBANorms = rows[24][columns[0][1].field];
                                            }
                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field].substring(1)) <= XBBABThkMin) {
                                                south.html("螺栓规格不得小于等于 M" + XBBABThkMin).css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field].substring(1)) > XBBABThkMax) {
                                                south.html("螺栓规格不得大于 M" + XBBABThkMax).css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 获取螺纹小径
                                            let XBBADMIN;
                                            if (XBBANorms === "M12") {
                                                XBBADMIN = 10.106;
                                            }
                                            else if (XBBANorms === "M16") {
                                                XBBADMIN = 13.835;
                                            }
                                            else if (XBBANorms === "M20") {
                                                XBBADMIN = 17.294;
                                            }
                                            else if (XBBANorms === "M22") {
                                                XBBADMIN = 19.294;
                                            }
                                            else if (XBBANorms === "M24") {
                                                XBBADMIN = 20.752;
                                            }
                                            else if (XBBANorms === "M27") {
                                                XBBADMIN = 23.752;
                                            }
                                            else if (XBBANorms === "M30") {
                                                XBBADMIN = 26.211;
                                            }
                                            else if (XBBANorms === "M36") {
                                                XBBADMIN = 31.670;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 螺栓设计应力
                                            let XBBAOBTAllow;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XBBABCategoryVal,
                                                    "type": XBBABTypeVal,
                                                    "std": XBBABSTDVal,
                                                    "name": XBBABNameVal,
                                                    "thk": parseFloat(XBBANorms.substring(1)),
                                                    "temp": XBBADT,
                                                    "highLow": 2,
                                                    "isTube": 0,
                                                    "od": parseFloat(XBBANorms.substring(1))
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XBBAOBTAllow = parseFloat(result.ot);
                                                    if (XBBAOBTAllow < 0) {
                                                        south.html("查询螺栓材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // nbt
                                                    let XBBANBT;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        XBBANBT = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 腐蚀裕量
                                                    let XBBACB2;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                        && parseFloat(rows[26][columns[0][1].field]) < XBBADMIN / 2) {
                                                        XBBACB2 = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                        && parseFloat(rows[26][columns[0][1].field]) >= XBBADMIN / 2) {
                                                        south.html("螺栓腐蚀裕量不得大于 " + XBBADMIN / 2 + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 底板材料
                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                        XBBADNameVal = rows[30][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // AJAX 获取底板材料密度、最大最小厚度
                                                    let XBBADDensity, XBBADThkMin, XBBADThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": XBBADCategoryVal,
                                                            "type": XBBADTypeVal,
                                                            "std": XBBADSTDVal,
                                                            "name": XBBADNameVal,
                                                            "temp": XBBADT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            XBBADDensity = parseFloat(result.density);
                                                            XBBADThkMin = parseFloat(result.thkMin);
                                                            XBBADThkMax = parseFloat(result.thkMax);

                                                            // thkdn
                                                            let XBBATHKDN;
                                                            if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                && parseFloat(rows[31][columns[0][1].field]) > XBBADThkMin
                                                                && parseFloat(rows[31][columns[0][1].field]) <= XBBADThkMax) {
                                                                XBBATHKDN = parseFloat(rows[31][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                && parseFloat(rows[31][columns[0][1].field]) <= XBBADThkMin) {
                                                                south.html("底板名义厚度 δdn 不得小于等于 " + XBBADThkMin).css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                && parseFloat(rows[31][columns[0][1].field]) > XBBADThkMax) {
                                                                south.html("底板名义厚度 δdn 不得大于 " + XBBADThkMax).css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN);
                                                                xbbaSketch.off("resize").on("resize", function () {
                                                                    if ($("#xbba").length > 0) {
                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN);
                                                                    }
                                                                });
                                                            }
                                                            xbbad2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN);
                                                                        xbbaSketch.off("resize").on("resize", function () {
                                                                            if ($("#xbba").length > 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 底板设计应力、负偏差
                                                            let XBBAODT, XBBACD1;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": XBBADCategoryVal,
                                                                    "type": XBBADTypeVal,
                                                                    "std": XBBADSTDVal,
                                                                    "name": XBBADNameVal,
                                                                    "thk": XBBATHKDN,
                                                                    "temp": XBBADT,
                                                                    "highLow": 2,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    XBBAODT = parseFloat(result.ot);
                                                                    if (XBBAODT < 0) {
                                                                        south.html("查询底板材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    XBBACD1 = parseFloat(result.c1);
                                                                    if (XBBACD1 < 0) {
                                                                        south.html("查询底板材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 腐蚀裕量
                                                                    let XBBACD2;
                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                        && parseFloat(rows[32][columns[0][1].field]) < XBBATHKDN) {
                                                                        XBBACD2 = parseFloat(rows[32][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                        && parseFloat(rows[32][columns[0][1].field]) >= XBBATHKDN) {
                                                                        south.html("底板腐蚀裕量不得大于 " + XBBATHKDN + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // d1
                                                                    let XBBAD1;
                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                        && parseFloat(rows[33][columns[0][1].field]) >= XBBADOUT) {
                                                                        XBBAD1 = parseFloat(rows[33][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                        && parseFloat(rows[33][columns[0][1].field]) < XBBADOUT) {
                                                                        south.html("底板长度d1不得小于 " + XBBADOUT + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1);
                                                                        xbbaSketch.off("resize").on("resize", function () {
                                                                            if ($("#xbba").length > 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbbad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1);
                                                                                xbbaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#xbba").length > 0) {
                                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // d2
                                                                    let XBBAD2;
                                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                        && parseFloat(rows[34][columns[0][1].field]) >= XBBADOUT) {
                                                                        XBBAD2 = parseFloat(rows[34][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                        && parseFloat(rows[34][columns[0][1].field]) < XBBADOUT) {
                                                                        south.html("底板宽度d2不得小于 " + XBBADOUT + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2);
                                                                        xbbaSketch.off("resize").on("resize", function () {
                                                                            if ($("#xbba").length > 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbbad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2);
                                                                                xbbaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#xbba").length > 0) {
                                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // H
                                                                    let XBBAH;
                                                                    if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                                        XBBAH = parseFloat(rows[35][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH);
                                                                        xbbaSketch.off("resize").on("resize", function () {
                                                                            if ($("#xbba").length > 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbbad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH);
                                                                                xbbaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#xbba").length > 0) {
                                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // HC
                                                                    let XBBAHC;
                                                                    if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                        && parseFloat(rows[36][columns[0][1].field]) >= XBBAH) {
                                                                        XBBAHC = parseFloat(rows[36][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                        && parseFloat(rows[36][columns[0][1].field]) < XBBAH) {
                                                                        south.html("高度Hc不得小于 " + XBBAH + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH, XBBAHC);
                                                                        xbbaSketch.off("resize").on("resize", function () {
                                                                            if ($("#xbba").length > 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH, XBBAHC);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbbad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH, XBBAHC);
                                                                                xbbaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#xbba").length > 0) {
                                                                                        xbba2d("Φ" + XBBAD0, "Φ" + XBBADOUT, XBBATHKSN, XBBAE, XBBADB, XBBAB, XBBAHF, XBBATHKDN, XBBAD1, XBBAD2, XBBAH, XBBAHC);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // OC1ALLOW
                                                                    let XBBAOC1ALLOW;
                                                                    if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])) {
                                                                        XBBAOC1ALLOW = parseFloat(rows[37][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 载荷计算
                                                                    let XBBAPW = 1.2 * XBBAFI * XBBAQ0 * XBBAD0 * XBBAH0 / 1000000;
                                                                    let XBBAG = 9.8;
                                                                    let XBBAPE = XBBAAlphaE * XBBAM0 * XBBAG;
                                                                    let XBBAFH = Math.max(XBBAPW, XBBAPE + 0.25 * XBBAPW);
                                                                    let XBBAW1 = XBBAM0 * XBBAG;
                                                                    let XBBAR = XBBAFH / XBBAN;
                                                                    let XBBAFL1 = 4 * XBBAFH * XBBAHC / XBBAN / XBBADB - XBBAW1 / XBBAN;
                                                                    let XBBAFL2 = XBBAW1 / XBBAN + 4 * XBBAFH * XBBAHC / XBBAN / XBBADB;

                                                                    // 支腿计算
                                                                    let XBBACS = XBBACS1 + XBBACS2;
                                                                    let XBBATHKSE = XBBATHKSN - XBBACS;
                                                                    let XBBAA = Math.PI * (XBBADOUT - XBBATHKSN) * XBBATHKSE;
                                                                    let XBBAIXX = Math.PI / 64 * (Math.pow(XBBADOUT, 4) - Math.pow(XBBADOUT - 2 * XBBATHKSE, 4));
                                                                    let XBBAIYY = Math.PI / 64 * (Math.pow(XBBADOUT, 4) - Math.pow(XBBADOUT - 2 * XBBATHKSE, 4));
                                                                    let XBBAWMIN = Math.PI / 32 / XBBADOUT * (Math.pow(XBBADOUT, 4) - Math.pow(XBBADOUT - 2 * XBBATHKSE, 4));
                                                                    let XBBAIMIN = Math.min(XBBAIXX, XBBAIYY);
                                                                    let XBBAIH = Math.sqrt(XBBAIMIN / XBBAA);
                                                                    let XBBALamuda = 0.7 * XBBAH / XBBAIH;
                                                                    let XBBALamudaH = Math.sqrt((Math.PI * Math.PI * XBBAEST) / (0.6 * XBBARSTEL));
                                                                    let XBBANS = 3 / 2 + 2 / 3 * (XBBALamuda / XBBALamudaH) * (XBBALamuda / XBBALamudaH);
                                                                    let XBBAEta = 1.0;

                                                                    let XBBAOCRALLOW;
                                                                    if (XBBALamuda <= XBBALamudaH) {
                                                                        XBBAOCRALLOW = (1.2 * (1 - 0.4 * (XBBALamuda / XBBALamudaH) * (XBBALamuda / XBBALamudaH)) * XBBARSTEL) / (XBBANS * XBBAEta);
                                                                    }
                                                                    else {
                                                                        XBBAOCRALLOW = 0.227 * XBBARSTEL / ((XBBALamuda / XBBALamudaH) * (XBBALamuda / XBBALamudaH));
                                                                    }
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "支腿许用压应力：" + XBBAOCRALLOW.toFixed(2) + " MPa" +
                                                                        "</span>");
                                                                    let XBBAOC = XBBAFL2 / XBBAA;
                                                                    let XBBAOCCHK;
                                                                    if (XBBAOC <= XBBAOCRALLOW) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际压应力：" + XBBAOC.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOCCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际压应力：" + XBBAOC.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOCCHK = "不合格";
                                                                    }

                                                                    let XBBATau = XBBAR / XBBAA;
                                                                    let XBBATauAllow = 0.6 * XBBAOST;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "支腿许用剪应力：" + XBBATauAllow.toFixed(2) + " MPa" +
                                                                        "</span>");

                                                                    let XBBATauCHK;
                                                                    if (XBBATau <= XBBATauAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XBBATau.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBATauCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XBBATau.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBATauCHK = "不合格";
                                                                    }

                                                                    let XBBAL1 = XBBAH + XBBAHF / 2 + 50;
                                                                    let XBBAOB = (XBBAR * XBBAL1 - XBBAFL2 * XBBAE) / XBBAWMIN;
                                                                    let XBBAOBAllow = 1.5 * XBBAOST;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "支腿许用弯曲应力：" + XBBAOBAllow.toFixed(2) + " MPa" +
                                                                        "</span>");

                                                                    let XBBAOBCHK;
                                                                    if (XBBAOB <= XBBAOBAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际弯曲应力：" + XBBAOB.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOBCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际弯曲应力：" + XBBAOB.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOBCHK = "不合格";
                                                                    }

                                                                    let XBBATotalCHK;
                                                                    if ((Math.abs(XBBAOC / XBBAOCRALLOW) + Math.abs(XBBAOB / XBBAOBAllow)) <= 1) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "支腿钢结构综合评价：合格" +
                                                                            "</span>");
                                                                        XBBATotalCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "支腿钢结构综合评价：不合格" +
                                                                            "</span>");
                                                                        XBBATotalCHK = "不合格";
                                                                    }

                                                                    // 地脚螺栓计算及校核
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "地脚螺栓许用拉应力：" + XBBAOBTAllow.toFixed(2) + " MPa" +
                                                                        "</span>");
                                                                    let XBBAABT = Math.PI / 4 * (XBBADMIN - 2 * XBBACB2) * (XBBADMIN - 2 * XBBACB2);
                                                                    let XBBAOBT = Math.max(0, XBBAFL1 / (XBBANBT * XBBAABT));
                                                                    let XBBAOBTCHK;
                                                                    if (XBBAOBT <= XBBAOBTAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际拉应力：" + XBBAOBT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOBTCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际拉应力：" + XBBAOBT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOBTCHK = "不合格";
                                                                    }

                                                                    let XBBATauBT = Math.max(0, (XBBAFH - 0.4 * XBBAW1) / (XBBAN * XBBANBT * XBBAABT));
                                                                    let XBBATauBTAllow = 0.6 * XBBAOBTAllow;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "地脚螺栓许用剪应力：" + XBBATauBTAllow.toFixed(2) + " MPa" +
                                                                        "</span>");
                                                                    let XBBATauBTCHK;
                                                                    if (XBBATauBT <= XBBATauBTAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XBBATauBT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBATauBTCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XBBATauBT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBATauBTCHK = "不合格";
                                                                    }

                                                                    // 基础应力计算及校核
                                                                    let XBBAOC1 = XBBAFL2 / (XBBAD1 * XBBAD2);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "基础许用压应力：" + XBBAOC1ALLOW.toFixed(2) + " MPa" +
                                                                        "</span>");
                                                                    let XBBAOC1CHK;
                                                                    if (XBBAOC1 <= XBBAOC1ALLOW) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际压应力：" + XBBAOC1.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOC1CHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际压应力：" + XBBAOC1.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOC1CHK = "不合格";
                                                                    }

                                                                    // 底板计算及校核
                                                                    let XBBATHKDC = XBBAB * Math.sqrt(3 * XBBAOC1 / XBBAODT);
                                                                    let XBBATHKDD = XBBATHKDC + XBBACD2;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "底板所需厚度：" + (XBBATHKDD + XBBACD1).toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    let XBBATHKDCHK;
                                                                    if ((XBBATHKDD + XBBACD1) <= XBBATHKDN) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + XBBATHKDN + " mm" +
                                                                            "</span>");
                                                                        XBBATHKDCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + XBBATHKDN + " mm" +
                                                                            "</span>");
                                                                        XBBATHKDCHK = "不合格";
                                                                    }

                                                                    // 装配焊缝
                                                                    let XBBAFai = 0.49;
                                                                    let XBBABAllow = 1.5 * XBBAOST * XBBAFai;
                                                                    let XBBAHF1 = XBBAHF - 10;
                                                                    let XBBAZ = 2 * XBBAHF1 * XBBAHF1 / 6 * XBBATF1 / Math.sqrt(2);

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "支腿装配焊缝许用弯曲应力：" + XBBABAllow.toFixed(2) + " MPa" +
                                                                        "</span>");
                                                                    let XBBAOF = XBBAR * XBBAL1 / XBBAZ;
                                                                    let XBBAOFCHK;
                                                                    if (XBBAOF <= XBBABAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际弯曲应力：" + XBBAOF.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOFCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际弯曲应力：" + XBBAOF.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOFCHK = "不合格";
                                                                    }

                                                                    let XBBAAF = 2 * XBBAHF1 * XBBATF1 / Math.sqrt(2);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "支腿装配焊缝许用剪应力：" + XBBABAllow.toFixed(2) + " MPa" +
                                                                        "</span>");
                                                                    let XBBATauF = XBBAFL2 / XBBAAF;
                                                                    let XBBATauFCHK;
                                                                    if (XBBATauF <= XBBABAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XBBATauF.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBATauFCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XBBATauF.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBATauFCHK = "不合格";
                                                                    }

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "支腿装配焊缝许用当量应力：" + XBBABAllow.toFixed(2) + " MPa" +
                                                                        "</span>");
                                                                    let XBBAOT = Math.sqrt(XBBAOF * XBBAOF + 3 * XBBATauF * XBBATauF);
                                                                    let XBBAOTCHK;
                                                                    if (XBBAOT <= XBBABAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际当量应力：" + XBBAOT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOTCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际当量应力：" + XBBAOT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        XBBAOTCHK = "不合格";
                                                                    }

                                                                    // docx
                                                                    let XBBAPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "xbbadocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "XBBA",

                                                                                t: XBBADT,

                                                                                h0: XBBAH0,
                                                                                d0: XBBAD0,
                                                                                m0: XBBAM0,

                                                                                q0: XBBAQ0,
                                                                                fi: XBBAFI,
                                                                                eq: XBBAEQ,

                                                                                stds: XBBASSTDVal,
                                                                                names: XBBASNameVal,
                                                                                n: XBBAN,
                                                                                dout: XBBADOUT,
                                                                                thksn: XBBATHKSN,
                                                                                cs2: XBBACS2,
                                                                                e: XBBAE,
                                                                                db: XBBADB,
                                                                                b: XBBAB,
                                                                                hf: XBBAHF,
                                                                                tf1: XBBATF1,

                                                                                stdb: XBBABSTDVal,
                                                                                nameb: XBBABNameVal,
                                                                                norms: XBBANorms,
                                                                                nbt: XBBANBT,
                                                                                cb2: XBBACB2,

                                                                                stdd: XBBADSTDVal,
                                                                                named: XBBADNameVal,
                                                                                cd2: XBBACD2,
                                                                                thkdn: XBBATHKDN,
                                                                                d1: XBBAD1,
                                                                                d2: XBBAD2,
                                                                                h: XBBAH,
                                                                                hc: XBBAHC,

                                                                                oc1allow: XBBAOC1ALLOW,

                                                                                densitys: XBBASDensity.toFixed(4),
                                                                                cs1: XBBACS1.toFixed(4),
                                                                                ostallow: XBBAOST.toFixed(4),
                                                                                rstel: XBBARSTEL.toFixed(4),
                                                                                est: (XBBAEST / 1000).toFixed(4),

                                                                                densityb: XBBABDensity.toFixed(4),
                                                                                obtallow: XBBAOBTAllow.toFixed(4),

                                                                                densityd: XBBADDensity.toFixed(4),
                                                                                cd1: XBBACD1.toFixed(4),
                                                                                odtallow: XBBAODT.toFixed(4),

                                                                                pw: XBBAPW.toFixed(4),
                                                                                alphae: XBBAAlphaE.toFixed(4),
                                                                                g: XBBAG.toFixed(4),
                                                                                pe: XBBAPE.toFixed(4),
                                                                                fh: XBBAFH.toFixed(4),
                                                                                w1: XBBAW1.toFixed(4),
                                                                                r: XBBAR.toFixed(4),
                                                                                fl1: XBBAFL1.toFixed(4),
                                                                                fl2: XBBAFL2.toFixed(4),

                                                                                cs: XBBACS.toFixed(4),
                                                                                thkse: XBBATHKSE.toFixed(4),
                                                                                a: XBBAA.toFixed(4),
                                                                                ixx: XBBAIXX.toFixed(4),
                                                                                iyy: XBBAIYY.toFixed(4),
                                                                                wmin: XBBAWMIN.toFixed(4),
                                                                                imin: XBBAIMIN.toFixed(4),
                                                                                ih: XBBAIH.toFixed(4),
                                                                                lamuda: XBBALamuda.toFixed(4),
                                                                                lamudah: XBBALamudaH.toFixed(4),
                                                                                ns: XBBANS.toFixed(4),
                                                                                eta: XBBAEta.toFixed(4),
                                                                                ocrallow: XBBAOCRALLOW.toFixed(4),
                                                                                oc: XBBAOC.toFixed(4),
                                                                                occhk: XBBAOCCHK,
                                                                                tau: XBBATau.toFixed(4),
                                                                                tauallow: XBBATauAllow.toFixed(4),
                                                                                tauchk: XBBATauCHK,
                                                                                l1: XBBAL1.toFixed(4),
                                                                                ob: XBBAOB.toFixed(4),
                                                                                oballow: XBBAOBAllow.toFixed(4),
                                                                                obchk: XBBAOBCHK,
                                                                                totalchk: XBBATotalCHK,

                                                                                dmin: XBBADMIN.toFixed(4),
                                                                                abt: XBBAABT.toFixed(4),
                                                                                obt: XBBAOBT.toFixed(4),
                                                                                obtchk: XBBAOBTCHK,
                                                                                taubt: XBBATauBT.toFixed(4),
                                                                                taubtallow: XBBATauBTAllow.toFixed(4),
                                                                                taubtchk: XBBATauBTCHK,

                                                                                oc1: XBBAOC1.toFixed(4),
                                                                                oc1chk: XBBAOC1CHK,

                                                                                thkdc: XBBATHKDC.toFixed(4),
                                                                                thkdd: XBBATHKDD.toFixed(4),
                                                                                thkdchk: XBBATHKDCHK,

                                                                                fai: XBBAFai.toFixed(4),
                                                                                ballow: XBBABAllow.toFixed(4),
                                                                                hf1: XBBAHF1.toFixed(4),
                                                                                z: XBBAZ.toFixed(4),
                                                                                of: XBBAOF.toFixed(4),
                                                                                ofchk: XBBAOFCHK,
                                                                                af: XBBAAF.toFixed(4),
                                                                                tauf: XBBATauF.toFixed(4),
                                                                                taufchk: XBBATauFCHK,
                                                                                ot: XBBAOT.toFixed(4),
                                                                                otchk: XBBAOTCHK
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
                                                                                    XBBAPayJS.dialog({
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
                                                                                                XBBAPayJS.dialog("close");
                                                                                                XBBAPayJS.dialog("clear");
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
                                                                                                            XBBAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    XBBAPayJS.dialog('close');
                                                                                                                    XBBAPayJS.dialog('clear');
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
                                                                "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});