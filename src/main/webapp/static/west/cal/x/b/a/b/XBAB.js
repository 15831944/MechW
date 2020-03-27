$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbabd2 = $("#d2");
    let xbabd3 = $("#d3");
    let xbabd2d3 = $('#d2d3');

    $("#cal").html("<table id='xbab'></table>");
    let pg = $("#xbab");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/a/b/XBAB.json", function (result) {

        // design temp
        let XBABDT;

        // material
        let XBABSCategory, XBABSCategoryVal, XBABSType, XBABSTypeVal, XBABSSTD, XBABSSTDVal, XBABSName, XBABSNameVal,
            XBABDCategory, XBABDCategoryVal, XBABDType, XBABDTypeVal, XBABDSTD, XBABDSTDVal, XBABDName, XBABDNameVal,
            XBABBCategory, XBABBCategoryVal, XBABBType, XBABBTypeVal, XBABBSTD, XBABBSTDVal, XBABBName, XBABBNameVal,
            XBABCCategory, XBABCCategoryVal, XBABCType, XBABCTypeVal, XBABCSTD, XBABCSTDVal, XBABCName, XBABCNameVal;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function xbab2d(dsi = "Dsi", thksn = "δsn",
                        thkdn = "δdn",
                        thkbn = "δbn", wb = "Wb", lb = "Lb", sh = "h", ld = "Ld", bh = "H",
                        dl = "垫板最小宽度") {

            xbabd2.empty();

            let width = xbabd2.width();
            let height = xbabd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "XBABSVG")
                .attr("width", width).attr("height", height);

            // X 轴比例尺
            let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

            // Y 轴比例尺
            let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

            // 轮廓线对象
            let line = d3.line().x(function (d) {
                return xScale(d.x);
            }).y(function (d) {
                return yScale(d.y);
            });

            // 图形边距
            let padding = 20;
            let thk = 10;

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

            let widthgap = (width - 2 * padding) / 6;
            let heightgap = (height - 2 * padding) / 4;

            // 壳体
            drawLine(padding + 2 * widthgap, padding, padding + 2 * widthgap, height - padding);
            drawLine(padding + 2 * widthgap + thk, padding, padding + 2 * widthgap + thk, height - padding);
            drawLine(padding + 4 * widthgap, padding, padding + 4 * widthgap, height - padding);
            drawLine(padding + 4 * widthgap - thk, padding, padding + 4 * widthgap - thk, height - padding);
            drawCenterLine(width / 2, padding - 10, width / 2, height - padding - 0.25 * heightgap - 16);
            drawCenterLine(width / 2, height - padding - 0.25 * heightgap + 4, width / 2, height - padding + 10);

            // 垫板
            drawLine(padding + 2 * widthgap - thk, padding + 0.5 * heightgap, padding + 2 * widthgap - thk, height - padding - 0.5 * heightgap);
            drawLine(padding + 2 * widthgap - thk, padding + 0.5 * heightgap, padding + 2 * widthgap, padding + 0.5 * heightgap);
            drawLine(padding + 2 * widthgap - thk, height - padding - 0.5 * heightgap, padding + 2 * widthgap, height - padding - 0.5 * heightgap);
            drawLine(padding + 4 * widthgap + thk, padding + 0.5 * heightgap, padding + 4 * widthgap + thk, height - padding - 0.5 * heightgap);
            drawLine(padding + 4 * widthgap, padding + 0.5 * heightgap, padding + 4 * widthgap + thk, padding + 0.5 * heightgap);
            drawLine(padding + 4 * widthgap, height - padding - 0.5 * heightgap, padding + 4 * widthgap + thk, height - padding - 0.5 * heightgap);

            // 上刚性环
            drawLine(padding + 4 * widthgap + thk, padding + heightgap, padding + 4.5 * widthgap, padding + heightgap);
            drawLine(padding + 4 * widthgap + thk, padding + heightgap - thk, padding + 4.5 * widthgap, padding + heightgap - thk);
            drawLine(padding + 4.5 * widthgap, padding + heightgap, padding + 4.5 * widthgap, padding + heightgap - thk);
            drawLine(padding + 2 * widthgap - thk, padding + heightgap, padding + 1.5 * widthgap, padding + heightgap);
            drawLine(padding + 2 * widthgap - thk, padding + heightgap - thk, padding + 1.5 * widthgap, padding + heightgap - thk);
            drawLine(padding + 1.5 * widthgap, padding + heightgap, padding + 1.5 * widthgap, padding + heightgap - thk);

            // 下刚性环
            drawLine(padding + 4 * widthgap + thk, height - padding - heightgap, padding + 5 * widthgap, height - padding - heightgap);
            drawLine(padding + 4 * widthgap + thk, height - padding - heightgap + thk, padding + 5 * widthgap, height - padding - heightgap + thk);
            drawLine(padding + 5 * widthgap, height - padding - heightgap, padding + 5 * widthgap, height - padding - heightgap + thk);
            drawLine(padding + widthgap, height - padding - heightgap, padding + 2 * widthgap - thk, height - padding - heightgap);
            drawLine(padding + widthgap, height - padding - heightgap + thk, padding + 2 * widthgap - thk, height - padding - heightgap + thk);
            drawLine(padding + widthgap, height - padding - heightgap, padding + widthgap, height - padding - heightgap + thk);

            // 筋板
            drawLine(padding + 4.5 * widthgap, padding + heightgap, padding + 5 * widthgap, height - padding - heightgap);
            drawLine(padding + 1.5 * widthgap, padding + heightgap, padding + widthgap, height - padding - heightgap);

            // B.C.D
            drawCenterLine(padding + 1.5 * widthgap, height - padding - heightgap - 20, padding + 1.5 * widthgap, height - padding - heightgap + thk + 20);
            drawCenterLine(width - padding - 1.5 * widthgap, height - padding - heightgap - 20, width - padding - 1.5 * widthgap, height - padding - heightgap + thk + 20);

            // DSI
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap + thk, y: height - padding - 0.25 * heightgap},
                    {x: padding + 2 * widthgap + thk + 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: padding + 2 * widthgap + thk + 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: padding + 2 * widthgap + thk, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - 2 * widthgap - thk, y: height - padding - 0.25 * heightgap},
                    {x: width - padding - 2 * widthgap - thk - 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: width - padding - 2 * widthgap - thk - 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: width - padding - 2 * widthgap - thk, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + thk + 15, y: height - padding - 0.25 * heightgap},
                {x: width - padding - 2 * widthgap - thk - 15, y: height - padding - 0.25 * heightgap}
            ])).attr("id", "XBABSketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchDSI").attr("startOffset", "50%")
                .text(dsi);

            // THKSN
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap, y: height - padding - 0.25 * heightgap},
                {x: padding + 2 * widthgap + thk, y: height - padding - 0.25 * heightgap}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap, y: height - padding - 0.25 * heightgap},
                    {x: padding + 2 * widthgap - 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: padding + 2 * widthgap - 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: padding + 2 * widthgap, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap - 15 - 40, y: height - padding - 0.25 * heightgap},
                {x: padding + 2 * widthgap - 15, y: height - padding - 0.25 * heightgap}
            ])).attr("id", "XBABSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchTHKSN").attr("startOffset", "50%")
                .text(thksn);

            // LB
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap + thk, y: height - padding - 0.5 * heightgap + 3},
                {x: padding + 4 * widthgap + thk, y: height - padding - 0.5 * heightgap + 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 5 * widthgap, y: height - padding - heightgap + thk + 3},
                {x: padding + 5 * widthgap, y: height - padding - 0.5 * heightgap + 40}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 4 * widthgap + thk, y: height - padding - 0.5 * heightgap + 30},
                    {x: padding + 4 * widthgap + thk + 15, y: height - padding - 0.5 * heightgap + 30 + 3},
                    {x: padding + 4 * widthgap + thk + 15, y: height - padding - 0.5 * heightgap + 30 - 3},
                    {x: padding + 4 * widthgap + thk, y: height - padding - 0.5 * heightgap + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 5 * widthgap, y: height - padding - 0.5 * heightgap + 30},
                    {x: padding + 5 * widthgap - 15, y: height - padding - 0.5 * heightgap + 30 + 3},
                    {x: padding + 5 * widthgap - 15, y: height - padding - 0.5 * heightgap + 30 - 3},
                    {x: padding + 5 * widthgap, y: height - padding - 0.5 * heightgap + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap + thk + 15, y: height - padding - 0.5 * heightgap + 30},
                {x: padding + 5 * widthgap - 15, y: height - padding - 0.5 * heightgap + 30}
            ])).attr("id", "XBABSketchLB").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchLB").attr("startOffset", "50%")
                .text(lb);

            // THKBN SH
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 30, y: height - padding - heightgap + thk + 15 + 40},
                {x: padding + widthgap - 30, y: height - padding - heightgap + thk + 15}
            ])).attr("id", "XBABSketchTHKBN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchTHKBN1").attr("startOffset", "50%")
                .text(thkbn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + widthgap - 30, y: height - padding - heightgap + thk},
                    {x: padding + widthgap - 30 + 3, y: height - padding - heightgap + thk + 15},
                    {x: padding + widthgap - 30 - 3, y: height - padding - heightgap + thk + 15},
                    {x: padding + widthgap - 30, y: height - padding - heightgap + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 3, y: height - padding - heightgap + thk},
                {x: padding + widthgap - 40, y: height - padding - heightgap + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 3, y: height - padding - heightgap},
                {x: padding + widthgap - 40, y: height - padding - heightgap}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 30, y: height - padding - heightgap + thk},
                {x: padding + widthgap - 30, y: height - padding - heightgap}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + widthgap - 30, y: height - padding - heightgap},
                    {x: padding + widthgap - 30 + 3, y: height - padding - heightgap - 15},
                    {x: padding + widthgap - 30 - 3, y: height - padding - heightgap - 15},
                    {x: padding + widthgap - 30, y: height - padding - heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 30, y: height - padding - heightgap - 15},
                {x: padding + widthgap - 30, y: padding + heightgap + 15}
            ])).attr("id", "XBABSketchSH").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchSH").attr("startOffset", "50%")
                .text(sh);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + widthgap - 30, y: padding + heightgap},
                    {x: padding + widthgap - 30 + 3, y: padding + heightgap + 15},
                    {x: padding + widthgap - 30 - 3, y: padding + heightgap + 15},
                    {x: padding + widthgap - 30, y: padding + heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * widthgap - 3, y: padding + heightgap},
                {x: padding + widthgap - 40, y: padding + heightgap}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * widthgap - 3, y: padding + heightgap - thk},
                {x: padding + widthgap - 40, y: padding + heightgap - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 30, y: padding + heightgap - thk},
                {x: padding + widthgap - 30, y: padding + heightgap}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + widthgap - 30, y: padding + heightgap - thk},
                    {x: padding + widthgap - 30 + 3, y: padding + heightgap - thk - 15},
                    {x: padding + widthgap - 30 - 3, y: padding + heightgap - thk - 15},
                    {x: padding + widthgap - 30, y: padding + heightgap - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 30, y: padding + heightgap - thk - 15},
                {x: padding + widthgap - 30, y: padding + heightgap - thk - 15 - 40}
            ])).attr("id", "XBABSketchTHKBN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchTHKBN2").attr("startOffset", "50%")
                .text(thkbn);

            // LD
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + widthgap, y: height - padding - heightgap + thk + 20 + 30},
                    {x: padding + widthgap + 15, y: height - padding - heightgap + thk + 20 + 30 + 3},
                    {x: padding + widthgap + 15, y: height - padding - heightgap + thk + 20 + 30 - 3},
                    {x: padding + widthgap, y: height - padding - heightgap + thk + 20 + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * widthgap, y: height - padding - heightgap + thk + 20 + 30},
                    {x: padding + 1.5 * widthgap - 15, y: height - padding - heightgap + thk + 20 + 30 + 3},
                    {x: padding + 1.5 * widthgap - 15, y: height - padding - heightgap + thk + 20 + 30 - 3},
                    {x: padding + 1.5 * widthgap, y: height - padding - heightgap + thk + 20 + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * widthgap, y: height - padding - heightgap + thk + 20 + 3},
                {x: padding + 1.5 * widthgap, y: height - padding - heightgap + thk + 20 + 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + widthgap, y: height - padding - heightgap + thk + 3},
                {x: padding + widthgap, y: height - padding - heightgap + thk + 20 + 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + widthgap + 15, y: height - padding - heightgap + thk + 20 + 30},
                {x: padding + 1.5 * widthgap - 15, y: height - padding - heightgap + thk + 20 + 30}
            ])).attr("id", "XBABSketchLD").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchLD").attr("startOffset", "50%")
                .text(ld);

            // DL1
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap - thk + 3, y: height - padding - heightgap + thk},
                {x: padding + 2 * widthgap + 60, y: height - padding - heightgap + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 3, y: height - padding - 0.5 * heightgap},
                {x: padding + 2 * widthgap + 60, y: height - padding - 0.5 * heightgap}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 50, y: height - padding - 0.5 * heightgap + 15},
                {x: padding + 2 * widthgap + 50, y: height - padding - 0.5 * heightgap + 15 + 6}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap + 50, y: height - padding - 0.5 * heightgap},
                    {x: padding + 2 * widthgap + 50 + 3, y: height - padding - 0.5 * heightgap + 15},
                    {x: padding + 2 * widthgap + 50 - 3, y: height - padding - 0.5 * heightgap + 15},
                    {x: padding + 2 * widthgap + 50, y: height - padding - 0.5 * heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 50, y: height - padding - heightgap + thk},
                {x: padding + 2 * widthgap + 50, y: height - padding - 0.5 * heightgap}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap + 50, y: height - padding - heightgap + thk},
                    {x: padding + 2 * widthgap + 50 + 3, y: height - padding - heightgap + thk - 15},
                    {x: padding + 2 * widthgap + 50 - 3, y: height - padding - heightgap + thk - 15},
                    {x: padding + 2 * widthgap + 50, y: height - padding - heightgap + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 50, y: height - padding - heightgap + thk - 15},
                {x: padding + 2 * widthgap + 50, y: height - padding - heightgap + thk - 15 - 80}
            ])).attr("id", "XBABSketchDL1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchDL1").attr("startOffset", "50%")
                .text(dl);

            // DL2
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap - thk + 3, y: padding + heightgap - thk},
                {x: padding + 2 * widthgap + 60, y: padding + heightgap - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 3, y: padding + 0.5 * heightgap},
                {x: padding + 2 * widthgap + 60, y: padding + 0.5 * heightgap}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 50, y: padding + 0.5 * heightgap - 15},
                {x: padding + 2 * widthgap + 50, y: padding + 0.5 * heightgap - 15 - 10}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap + 50, y: padding + 0.5 * heightgap},
                    {x: padding + 2 * widthgap + 50 + 3, y: padding + 0.5 * heightgap - 15},
                    {x: padding + 2 * widthgap + 50 - 3, y: padding + 0.5 * heightgap - 15},
                    {x: padding + 2 * widthgap + 50, y: padding + 0.5 * heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 50, y: padding + heightgap - thk},
                {x: padding + 2 * widthgap + 50, y: padding + 0.5 * heightgap}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap + 50, y: padding + heightgap - thk},
                    {x: padding + 2 * widthgap + 50 + 3, y: padding + heightgap - thk + 15},
                    {x: padding + 2 * widthgap + 50 - 3, y: padding + heightgap - thk + 15},
                    {x: padding + 2 * widthgap + 50, y: padding + heightgap - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 50, y: padding + heightgap - thk + 15 + 80},
                {x: padding + 2 * widthgap + 50, y: padding + heightgap - thk + 15}
            ])).attr("id", "XBABSketchDL2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchDL2").attr("startOffset", "50%")
                .text(dl);

            // THKDN WD
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap + thk, y: padding + 0.5 * heightgap - 3},
                {x: padding + 4 * widthgap + thk, y: padding + 0.5 * heightgap - 40}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 4 * widthgap, y: padding + 0.5 * heightgap - 30},
                    {x: padding + 4 * widthgap - 15, y: padding + 0.5 * heightgap - 30 - 3},
                    {x: padding + 4 * widthgap - 15, y: padding + 0.5 * heightgap - 30 + 3},
                    {x: padding + 4 * widthgap, y: padding + 0.5 * heightgap - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap - 15 - 50, y: padding + 0.5 * heightgap - 30},
                {x: padding + 4 * widthgap - 15, y: padding + 0.5 * heightgap - 30}
            ])).attr("id", "XBABSketchTHKBN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchTHKBN").attr("startOffset", "50%")
                .text(thkdn);
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap + thk, y: padding + 0.5 * heightgap - 30},
                {x: padding + 4 * widthgap, y: padding + 0.5 * heightgap - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4.5 * widthgap, y: padding + heightgap - thk - 3},
                {x: padding + 4.5 * widthgap, y: padding + 0.5 * heightgap - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap + thk, y: padding + 0.5 * heightgap - 30},
                {x: padding + 4.5 * widthgap, y: padding + 0.5 * heightgap - 30}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 4.5 * widthgap, y: padding + 0.5 * heightgap - 30},
                    {x: padding + 4.5 * widthgap + 15, y: padding + 0.5 * heightgap - 30 - 3},
                    {x: padding + 4.5 * widthgap + 15, y: padding + 0.5 * heightgap - 30 + 3},
                    {x: padding + 4.5 * widthgap, y: padding + 0.5 * heightgap - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 4.5 * widthgap + 15, y: padding + 0.5 * heightgap - 30},
                {x: padding + 4.5 * widthgap + 15 + 45, y: padding + 0.5 * heightgap - 30}
            ])).attr("id", "XBABSketchWB").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchWB").attr("startOffset", "50%")
                .text(wb);
            svg.append("path").attr("d", "M "
                + (padding + 4 * widthgap + thk) + " " + (padding + 0.5 * heightgap - 30 - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (padding + 4 * widthgap + thk) + " " + (padding + 0.5 * heightgap - 30 + 2)
            ).classed("arrow sketch", true);
            svg.append("path").attr("d", "M "
                + (padding + 4 * widthgap + thk) + " " + (padding + 0.5 * heightgap - 30 + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (padding + 4 * widthgap + thk) + " " + (padding + 0.5 * heightgap - 30 - 2)
            ).classed("arrow sketch", true);

            // BH
            svg.append("path").attr("d", line([
                {x: padding + 5 * widthgap + 3, y: height - padding - heightgap + thk},
                {x: padding + 5 * widthgap + 40, y: height - padding - heightgap + thk}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 5 * widthgap + 30, y: height - padding - heightgap + thk},
                    {x: padding + 5 * widthgap + 30 + 3, y: height - padding - heightgap + thk + 15},
                    {x: padding + 5 * widthgap + 30 - 3, y: height - padding - heightgap + thk + 15},
                    {x: padding + 5 * widthgap + 30, y: height - padding - heightgap + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 5 * widthgap + 30, y: height - padding - heightgap + thk + 15 + 60},
                {x: padding + 5 * widthgap + 30, y: height - padding - heightgap + thk + 15}
            ])).attr("id", "XBABSketchBH").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBABSketchBH").attr("startOffset", "50%")
                .text(bh);

        }

        currentTabIndex = xbabd2d3.tabs('getTabIndex', xbabd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbab2d();
            xbabd2.off("resize").on("resize", function () {
                if (pg.length > 0) {
                    xbab2d();
                }
            });
        }
        xbabd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbab2d();
                    xbabd2.off("resize").on("resize", function () {
                        if (pg.length > 0) {
                            xbab2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 带刚性环、带垫板的耳座强度校核",
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

                if (index === 9) {
                    $(ed.target).combobox("loadData", XBABSCategory);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", XBABSType);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", XBABSSTD);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", XBABSName);
                }

                else if (index === 16) {
                    $(ed.target).combobox("loadData", XBABDCategory);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", XBABDType);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", XBABDSTD);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", XBABDName);
                }

                else if (index === 22) {
                    $(ed.target).combobox("loadData", XBABBCategory);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", XBABBType);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", XBABBSTD);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", XBABBName);
                }

                else if (index === 33) {
                    $(ed.target).combobox("loadData", XBABCCategory);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", XBABCType);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", XBABCSTD);
                }
                else if (index === 36) {
                    $(ed.target).combobox("loadData", XBABCName);
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

                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    xbabd2.empty();
                    xbabd3.empty();

                    // sketch
                    currentTabIndex = xbabd2d3.tabs('getTabIndex', xbabd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xbab2d();
                        xbabd2.off("resize").on("resize", function () {
                            if (pg.length > 0) {
                                xbab2d();
                            }
                        });
                    }
                    xbabd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbab2d();
                                xbabd2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbab2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // t → category
                    if (index === 0) {

                        XBABDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBABSCategory = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBABSType = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBABSSTD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBABSName = null;

                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        XBABDCategory = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBABDType = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBABDSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBABDName = null;

                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XBABBCategory = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        XBABBType = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBABBSTD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBABBName = null;

                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        XBABCCategory = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        XBABCType = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        XBABCSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        XBABCName = null;

                        // category list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABSCategory = [];
                                XBABDCategory = [];
                                XBABBCategory = [];
                                XBABCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XBABDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XBABSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBABDCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBABBCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBABCCategory[index] = {
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

                    // category → type
                    if (index === 9) {

                        XBABSCategoryVal = changes.value;

                        // clear type、std、name
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBABSType = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBABSSTD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBABSName = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABSCategoryVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABSType = [];
                                $(result).each(function (index, element) {
                                    XBABSType[index] = {
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
                    // type → std
                    if (index === 10) {

                        XBABSTypeVal = changes.value;

                        // clear std、name
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBABSSTD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBABSName = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABSCategoryVal,
                                type: XBABSTypeVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABSSTD = [];
                                $(result).each(function (index, element) {
                                    XBABSSTD[index] = {
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
                    // std → Name
                    if (index === 11) {

                        XBABSSTDVal = changes.value;

                        // clear name
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBABSName = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABSCategoryVal,
                                type: XBABSTypeVal,
                                std: XBABSSTDVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABSName = [];
                                $(result).each(function (index, element) {
                                    XBABSName[index] = {
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

                    // category → type
                    if (index === 16) {

                        XBABDCategoryVal = changes.value;

                        // clear type、std、name
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBABDType = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBABDSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBABDName = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABDCategoryVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABDType = [];
                                $(result).each(function (index, element) {
                                    XBABDType[index] = {
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
                    // type → std
                    if (index === 17) {

                        XBABDTypeVal = changes.value;

                        // clear std、name
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBABDSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBABDName = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABDCategoryVal,
                                type: XBABDTypeVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABDSTD = [];
                                $(result).each(function (index, element) {
                                    XBABDSTD[index] = {
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
                    // std → Name
                    if (index === 18) {

                        XBABDSTDVal = changes.value;

                        // clear name
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBABDName = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABDCategoryVal,
                                type: XBABDTypeVal,
                                std: XBABDSTDVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABDName = [];
                                $(result).each(function (index, element) {
                                    XBABDName[index] = {
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

                    // category → type
                    if (index === 22) {

                        XBABBCategoryVal = changes.value;

                        // clear type、std、name
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        XBABBType = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBABBSTD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBABBName = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABBCategoryVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABBType = [];
                                $(result).each(function (index, element) {
                                    XBABBType[index] = {
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
                    // type → std
                    if (index === 23) {

                        XBABBTypeVal = changes.value;

                        // clear std、name
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        XBABBSTD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBABBName = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABBCategoryVal,
                                type: XBABBTypeVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABBSTD = [];
                                $(result).each(function (index, element) {
                                    XBABBSTD[index] = {
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
                    // std → Name
                    if (index === 24) {

                        XBABBSTDVal = changes.value;

                        // clear name
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        XBABBName = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABBCategoryVal,
                                type: XBABBTypeVal,
                                std: XBABBSTDVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABBName = [];
                                $(result).each(function (index, element) {
                                    XBABBName[index] = {
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

                    // category → type
                    if (index === 33) {

                        XBABCCategoryVal = changes.value;

                        // clear type、std、name
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        XBABCType = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        XBABCSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        XBABCName = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABCCategoryVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABCType = [];
                                $(result).each(function (index, element) {
                                    XBABCType[index] = {
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
                    // type → std
                    if (index === 34) {

                        XBABCTypeVal = changes.value;

                        // clear std、name
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        XBABCSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        XBABCName = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABCCategoryVal,
                                type: XBABCTypeVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABCSTD = [];
                                $(result).each(function (index, element) {
                                    XBABCSTD[index] = {
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
                    // std → Name
                    if (index === 35) {

                        XBABCSTDVal = changes.value;

                        // clear name
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        XBABCName = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBABCCategoryVal,
                                type: XBABCTypeVal,
                                std: XBABCSTDVal,
                                temp: XBABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBABCName = [];
                                $(result).each(function (index, element) {
                                    XBABCName[index] = {
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

                    // 业务逻辑
                    let XBABN;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        XBABN = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Q0
                    let XBABQ0;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        XBABQ0 = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // F0
                    let XBABF0;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        XBABF0 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // M0
                    let XBABM0;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        XBABM0 = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H0
                    let XBABH0;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        XBABH0 = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // D0
                    let XBABD0;
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        XBABD0 = parseFloat(rows[6][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // G0
                    let XBABG0;
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        XBABG0 = parseFloat(rows[7][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // S0
                    let XBABS0;
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        XBABS0 = parseFloat(rows[8][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // SNameVal
                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                        XBABSNameVal = rows[12][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let XBABSDensity, XBABSThkMin, XBABSThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": XBABSCategoryVal,
                            "type": XBABSTypeVal,
                            "std": XBABSSTDVal,
                            "name": XBABSNameVal,
                            "temp": XBABDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            XBABSDensity = parseFloat(result.density);
                            XBABSThkMin = parseFloat(result.thkMin);
                            XBABSThkMax = parseFloat(result.thkMax);

                            // CS2
                            let XBABCS2;
                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) < XBABSThkMax) {
                                XBABCS2 = parseFloat(rows[13][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) >= XBABSThkMax) {
                                south.html("筒体腐蚀裕量不能大于等于 " + XBABSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // DSI
                            let XBABDSI;
                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                XBABDSI = parseFloat(rows[14][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbab2d("Φ" + XBABDSI);
                                xbabd2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbab2d("Φ" + XBABDSI);
                                    }
                                });
                            }
                            xbabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbab2d("Φ" + XBABDSI);
                                        xbabd2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbab2d("Φ" + XBABDSI);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKSN
                            let XBABTHKSN;
                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) > Math.max(XBABSThkMin, XBABCS2)
                                && parseFloat(rows[15][columns[0][1].field]) <= XBABSThkMax) {
                                XBABTHKSN = parseFloat(rows[15][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) <= Math.max(XBABSThkMin, XBABCS2)) {
                                south.html("筒体名义厚度 δsn 不能小于等于 " + Math.max(XBABSThkMin, XBABCS2) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) > XBABSThkMax) {
                                south.html("筒体名义厚度 δsn 不能大于 " + XBABSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbab2d("Φ" + XBABDSI, XBABTHKSN);
                                xbabd2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbab2d("Φ" + XBABDSI, XBABTHKSN);
                                    }
                                });
                            }
                            xbabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbab2d("Φ" + XBABDSI, XBABTHKSN);
                                        xbabd2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbab2d("Φ" + XBABDSI, XBABTHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            let XBABOST, XBABCS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XBABSCategoryVal,
                                    "type": XBABSTypeVal,
                                    "std": XBABSSTDVal,
                                    "name": XBABSNameVal,
                                    "thk": XBABTHKSN,
                                    "temp": XBABDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": XBABDSI + 2 * XBABTHKSN
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XBABOST = parseFloat(result.ot);
                                    if (XBABOST < 0) {
                                        south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    XBABCS1 = parseFloat(result.c1);
                                    if (XBABCS1 < 0) {
                                        south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // DNameVal
                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                        XBABDNameVal = rows[19][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    let XBABDDensity, XBABDThkMin, XBABDThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XBABDCategoryVal,
                                            "type": XBABDTypeVal,
                                            "std": XBABDSTDVal,
                                            "name": XBABDNameVal,
                                            "temp": XBABDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XBABDDensity = parseFloat(result.density);
                                            XBABDThkMin = parseFloat(result.thkMin);
                                            XBABDThkMax = parseFloat(result.thkMax);

                                            // CD2
                                            let XBABCD2;
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) < XBABDThkMax) {
                                                XBABCD2 = parseFloat(rows[20][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) >= XBABDThkMax) {
                                                south.html("垫板腐蚀裕量不能大于等于 " + XBABDThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // THKDN
                                            let XBABTHKDN;
                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                && parseFloat(rows[21][columns[0][1].field]) > Math.max(XBABDThkMin, XBABCD2)
                                                && parseFloat(rows[21][columns[0][1].field]) <= XBABDThkMax) {
                                                XBABTHKDN = parseFloat(rows[21][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                && parseFloat(rows[21][columns[0][1].field]) <= Math.max(XBABDThkMin, XBABCD2)) {
                                                south.html("垫板名义厚度 δdn 不能小于等于 " + Math.max(XBABDThkMin, XBABCD2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                && parseFloat(rows[21][columns[0][1].field]) > XBABDThkMax) {
                                                south.html("垫板名义厚度 δdn 不能大于 " + XBABDThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN);
                                                xbabd2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN);
                                                    }
                                                });
                                            }
                                            xbabd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN);
                                                        xbabd2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let XBABODT, XBABCD1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XBABDCategoryVal,
                                                    "type": XBABDTypeVal,
                                                    "std": XBABDSTDVal,
                                                    "name": XBABDNameVal,
                                                    "thk": XBABTHKDN,
                                                    "temp": XBABDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": XBABDSI + 2 * XBABTHKSN + 2 * XBABTHKDN
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XBABODT = parseFloat(result.ot);
                                                    if (XBABODT < 0) {
                                                        south.html("查询垫板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    XBABCD1 = parseFloat(result.c1);
                                                    if (XBABCD1 < 0) {
                                                        south.html("查询垫板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // BNameVal
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        XBABBNameVal = rows[25][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let XBABBDensity, XBABBThkMin, XBABBThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_gbt_150_2011_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": XBABBCategoryVal,
                                                            "type": XBABBTypeVal,
                                                            "std": XBABBSTDVal,
                                                            "name": XBABBNameVal,
                                                            "temp": XBABDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            XBABBDensity = parseFloat(result.density);
                                                            XBABBThkMin = parseFloat(result.thkMin);
                                                            XBABBThkMax = parseFloat(result.thkMax);

                                                            // CB2
                                                            let XBABCB2;
                                                            if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                && parseFloat(rows[26][columns[0][1].field]) < XBABBThkMax) {
                                                                XBABCB2 = parseFloat(rows[26][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                && parseFloat(rows[26][columns[0][1].field]) >= XBABBThkMax) {
                                                                south.html("刚性环腐蚀裕量不能大于等于 " + XBABBThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // THKBN
                                                            let XBABTHKBN;
                                                            if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                && parseFloat(rows[27][columns[0][1].field]) > Math.max(XBABBThkMin, XBABCB2)
                                                                && parseFloat(rows[27][columns[0][1].field]) <= XBABBThkMax) {
                                                                XBABTHKBN = parseFloat(rows[27][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                && parseFloat(rows[27][columns[0][1].field]) <= Math.max(XBABBThkMin, XBABCB2)) {
                                                                south.html("刚性环名义厚度 δbn 不能小于等于 " + Math.max(XBABBThkMin, XBABCB2) + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                && parseFloat(rows[27][columns[0][1].field]) > XBABBThkMax) {
                                                                south.html("刚性环名义厚度 δbn 不能大于 " + XBABBThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN);
                                                                xbabd2.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN);
                                                                    }
                                                                });
                                                            }
                                                            xbabd2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN);
                                                                        xbabd2.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            let XBABOBT, XBABCB1;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_gbt_150_2011_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": XBABBCategoryVal,
                                                                    "type": XBABBTypeVal,
                                                                    "std": XBABBSTDVal,
                                                                    "name": XBABBNameVal,
                                                                    "thk": XBABTHKBN,
                                                                    "temp": XBABDT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    XBABOBT = parseFloat(result.ot);
                                                                    if (XBABOBT < 0) {
                                                                        south.html("查询刚性环材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    XBABCB1 = parseFloat(result.c1);
                                                                    if (XBABCB1 < 0) {
                                                                        south.html("查询刚性环材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // WB
                                                                    let XBABWB;
                                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                                                        XBABWB = parseFloat(rows[28][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB);
                                                                        xbabd2.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbabd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB);
                                                                                xbabd2.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // LB
                                                                    let XBABLB;
                                                                    if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                        && parseFloat(rows[29][columns[0][1].field]) >= XBABWB) {
                                                                        XBABLB = parseFloat(rows[29][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                        && parseFloat(rows[29][columns[0][1].field]) < XBABWB) {
                                                                        south.html("下刚性环宽度 Lb 不能小于 " + XBABWB + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB);
                                                                        xbabd2.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbabd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB);
                                                                                xbabd2.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // SH
                                                                    let XBABSH;
                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                        XBABSH = parseFloat(rows[30][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH);
                                                                        xbabd2.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbabd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH);
                                                                                xbabd2.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // LD
                                                                    let XBABLD;
                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                        && parseFloat(rows[31][columns[0][1].field]) < XBABLB) {
                                                                        XBABLD = parseFloat(rows[31][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                        && parseFloat(rows[31][columns[0][1].field]) >= XBABLB) {
                                                                        south.html("下刚性环螺栓外侧宽度 Ld 不得大于" + XBABLB + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD);
                                                                        xbabd2.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD);
                                                                            }
                                                                        });
                                                                    }
                                                                    xbabd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD);
                                                                                xbabd2.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // BH
                                                                    let XBABBH;
                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                                        XBABBH = parseFloat(rows[32][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // CNameVal
                                                                    if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                                        XBABCNameVal = rows[36][columns[0][1].field];
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    let XBABCDensity, XBABCThkMin, XBABCThkMax;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_gbt_150_2011_index.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": XBABCCategoryVal,
                                                                            "type": XBABCTypeVal,
                                                                            "std": XBABCSTDVal,
                                                                            "name": XBABCNameVal,
                                                                            "temp": XBABDT
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {
                                                                            XBABCDensity = parseFloat(result.density);
                                                                            XBABCThkMin = parseFloat(result.thkMin);
                                                                            XBABCThkMax = parseFloat(result.thkMax);

                                                                            // CC2
                                                                            let XBABCC2;
                                                                            if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                && parseFloat(rows[37][columns[0][1].field]) < XBABCThkMax) {
                                                                                XBABCC2 = parseFloat(rows[37][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                && parseFloat(rows[37][columns[0][1].field]) >= XBABCThkMax) {
                                                                                south.html("筋板腐蚀裕量不能大于等于 " + XBABCThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // THKCN
                                                                            let XBABTHKCN;
                                                                            if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                && parseFloat(rows[38][columns[0][1].field]) > Math.max(XBABCThkMin, XBABCC2)
                                                                                && parseFloat(rows[38][columns[0][1].field]) <= XBABCThkMax) {
                                                                                XBABTHKCN = parseFloat(rows[38][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                && parseFloat(rows[38][columns[0][1].field]) <= Math.max(XBABCThkMin, XBABCC2)) {
                                                                                south.html("筋板名义厚度 δcn 不能小于等于 " + Math.max(XBABCThkMin, XBABCC2) + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                && parseFloat(rows[38][columns[0][1].field]) > XBABCThkMax) {
                                                                                south.html("筋板名义厚度 δcn 不能大于 " + XBABCThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            let XBABOCT, XBABCC1;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_gbt_150_2011_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": XBABCCategoryVal,
                                                                                    "type": XBABCTypeVal,
                                                                                    "std": XBABCSTDVal,
                                                                                    "name": XBABCNameVal,
                                                                                    "thk": XBABTHKCN,
                                                                                    "temp": XBABDT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": 100000
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    XBABOCT = parseFloat(result.ot);
                                                                                    if (XBABOCT < 0) {
                                                                                        south.html("查询筋板材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    XBABCC1 = parseFloat(result.c1);
                                                                                    if (XBABCC1 < 0) {
                                                                                        south.html("查询筋板材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // α
                                                                                    let XBABAlpha;
                                                                                    if (!jQuery.isEmptyObject(rows[39][columns[0][1].field])) {
                                                                                        XBABAlpha = parseFloat(rows[39][columns[0][1].field]);
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    let Rad = XBABAlpha / 180 * Math.PI;

                                                                                    // b2
                                                                                    let XBABB2;
                                                                                    if (!jQuery.isEmptyObject(rows[40][columns[0][1].field])) {
                                                                                        XBABB2 = parseFloat(rows[40][columns[0][1].field]);
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // U
                                                                                    let XBABU;
                                                                                    if (!jQuery.isEmptyObject(rows[41][columns[0][1].field])) {
                                                                                        if (rows[41][columns[0][1].field] === "0.1g") {
                                                                                            XBABU = 0.08;
                                                                                        }
                                                                                        else if (rows[41][columns[0][1].field] === "0.15g") {
                                                                                            XBABU = 0.12;
                                                                                        }
                                                                                        else if (rows[41][columns[0][1].field] === "0.2g") {
                                                                                            XBABU = 0.16;
                                                                                        }
                                                                                        else if (rows[41][columns[0][1].field] === "0.3g") {
                                                                                            XBABU = 0.24;
                                                                                        }
                                                                                        else if (rows[41][columns[0][1].field] === "0.4g") {
                                                                                            XBABU = 0.32;
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // 过程参数
                                                                                    let XBABG = 9.8;
                                                                                    let XBABK;
                                                                                    if (XBABN <= 3) {
                                                                                        XBABK = 1.0;
                                                                                    }
                                                                                    else if (XBABN > 3) {
                                                                                        XBABK = 0.83;
                                                                                    }

                                                                                    let XBABDSO = XBABDSI + 2 * XBABTHKSN;
                                                                                    let XBABCS = XBABCS1 + XBABCS2;
                                                                                    let XBABTHKSE = XBABTHKSN - XBABCS;
                                                                                    let XBABLSS = 1.1 * Math.sqrt(XBABDSO * XBABTHKSE);
                                                                                    let XBABDDO = XBABDSO + 2 * XBABTHKDN;
                                                                                    let XBABCD = XBABCD1 + XBABCD2;
                                                                                    let XBABTHKDE = XBABTHKDN - XBABCD;
                                                                                    let XBABLDS = 1.1 * Math.sqrt(XBABDDO * XBABTHKDE);
                                                                                    let XBABCB = XBABCB1 + XBABCB2;
                                                                                    let XBABTHKBE = XBABTHKBN - XBABCB;
                                                                                    south.html(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "垫板伸出刚性环外最小宽度：" + ((XBABLDS - XBABTHKBN) / 2).toFixed(2) + " mm" +
                                                                                        "</span>");

                                                                                    // Sketch
                                                                                    if (currentTabIndex === 0) {
                                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD, XBABBH, ">=" + ((XBABLDS - XBABTHKBN) / 2).toFixed(2));
                                                                                        xbabd2.off("resize").on("resize", function () {
                                                                                            if (pg.length > 0) {
                                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD, XBABBH, ">=" + ((XBABLDS - XBABTHKBN) / 2).toFixed(2));
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    xbabd2d3.tabs({
                                                                                        onSelect: function (title, index) {
                                                                                            if (index === 0) {
                                                                                                xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD, XBABBH, ">=" + ((XBABLDS - XBABTHKBN) / 2).toFixed(2));
                                                                                                xbabd2.off("resize").on("resize", function () {
                                                                                                    if (pg.length > 0) {
                                                                                                        xbab2d("Φ" + XBABDSI, XBABTHKSN, XBABTHKDN, XBABTHKBN, XBABWB, XBABLB, XBABSH, XBABLD, XBABBH, ">=" + ((XBABLDS - XBABTHKBN) / 2).toFixed(2));
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    });

                                                                                    // 安装尺寸计算
                                                                                    let XBABDB = XBABDDO + 2 * XBABLB - 2 * XBABLD;
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "耳座安装尺寸：" + XBABDB.toFixed(2) + " mm" +
                                                                                        "</span>");

                                                                                    // 作用力
                                                                                    let XBABB = (XBABDB - XBABDSO) / 2;
                                                                                    let XBABPW = 1.2 * XBABF0 * XBABQ0 * XBABD0 * XBABH0 / 1000000;
                                                                                    let XBABPE = XBABU * XBABM0 * XBABG;
                                                                                    let XBABP = Math.max(XBABPW, XBABPE + 0.25 * XBABPW);
                                                                                    let XBABFB = 4 * (XBABP * XBABBH + XBABG0 * XBABG * XBABS0) / XBABDB / XBABN + (XBABM0 * XBABG + XBABG0 * XBABG) / XBABN / XBABK;
                                                                                    let XBABF = XBABFB * XBABB / (XBABSH + XBABTHKBN);

                                                                                    // 截面特性
                                                                                    let XBABA = XBABWB * XBABTHKBE + XBABTHKDE * XBABLDS + XBABTHKSE * XBABLSS;
                                                                                    let XBABAX = (XBABWB * XBABWB * XBABTHKBE / 2 + XBABTHKDE * XBABLDS * (XBABWB + XBABTHKDE / 2) + XBABTHKSE * XBABLSS * (XBABWB + XBABTHKDE + XBABTHKSE / 2)) / (XBABWB * XBABTHKBE + XBABTHKDE * XBABLDS + XBABTHKSE * XBABLSS);
                                                                                    let XBABDS = XBABDSO + 2 * (XBABTHKDE + XBABWB - XBABAX);
                                                                                    let XBABA1 = XBABAX - XBABWB / 2;
                                                                                    let XBABI1 = XBABWB * XBABWB * XBABWB * XBABTHKBE / 12 + XBABWB * XBABTHKBE * XBABA1 * XBABA1;
                                                                                    let XBABA2 = XBABWB + XBABTHKDE / 2 - XBABAX;
                                                                                    let XBABI2 = XBABTHKDE * XBABTHKDE * XBABTHKDE * XBABLDS / 12 + XBABTHKDE * XBABLDS * XBABA2 * XBABA2;
                                                                                    let XBABA3 = XBABWB + XBABTHKDE + XBABTHKSE / 2 - XBABAX;
                                                                                    let XBABI3 = XBABTHKSE * XBABTHKSE * XBABTHKSE * XBABLSS / 12 + XBABTHKSE * XBABLSS * XBABA3 * XBABA3;
                                                                                    let XBABI = XBABI1 + XBABI2 + XBABI3;

                                                                                    // 组合截面应力计算
                                                                                    let XBABORALLOW = Math.min(XBABOST, XBABOBT, XBABODT);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "支座处刚性环截面许用应力：" + XBABORALLOW.toFixed(4) + " MPa" +
                                                                                        "</span>");
                                                                                    let XBABTHETA = Math.PI / XBABN;
                                                                                    let XBABRS = XBABDS / 2;
                                                                                    let XBABMR = -0.5 * XBABF * XBABRS * (1 / XBABTHETA - 1 / Math.tan(XBABTHETA));
                                                                                    let XBABTR = 0.5 * XBABF / Math.tan(XBABTHETA);
                                                                                    let XBABOR = Math.abs(XBABMR) * XBABAX / XBABI + XBABTR / XBABA;
                                                                                    let XBABORCHK;
                                                                                    if (XBABOR <= XBABORALLOW) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际应力：" + XBABOR.toFixed(4) + " MPa" +
                                                                                            "</span>");
                                                                                        XBABORCHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际应力：" + XBABOR.toFixed(4) + " MPa" +
                                                                                            "</span>");
                                                                                        XBABORCHK = "不合格";
                                                                                    }

                                                                                    let XBABOTALLOW = Math.min(XBABOST, XBABOBT, XBABODT);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "支座中间处刚性环截面许用应力：" + XBABOTALLOW.toFixed(4) + " MPa" +
                                                                                        "</span>");
                                                                                    let XBABMT = 0.5 * XBABF * XBABRS * (1 / Math.sin(XBABTHETA) - 1 / XBABTHETA);
                                                                                    let XBABTT = XBABF / (2 * Math.sin(XBABTHETA));
                                                                                    let XBABOT = Math.abs(XBABMT) * XBABAX / XBABI + XBABTT / XBABA;
                                                                                    let XBABOTCHK;
                                                                                    if (XBABOT <= XBABOTALLOW) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际应力：" + XBABOT.toFixed(4) + " MPa" +
                                                                                            "</span>");
                                                                                        XBABOTCHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际应力：" + XBABOT.toFixed(4) + " MPa" +
                                                                                            "</span>");
                                                                                        XBABOTCHK = "不合格";
                                                                                    }

                                                                                    // 筋板校核
                                                                                    let XBABCC = XBABCC1 + XBABCC2;
                                                                                    let XBABTHKCE = XBABTHKCN - XBABCC;
                                                                                    let XBABR = 0.289 * XBABTHKCE;
                                                                                    let XBABL2 = XBABSH / Math.sin(Rad);
                                                                                    let XBABOCMaxAllow = XBABOCT / (1 + (XBABL2 / XBABR) * (XBABL2 / XBABR) / (140 * XBABOCT));
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "筋板许用压缩应力：" + XBABOCMaxAllow.toFixed(4) + " MPa" +
                                                                                        "</span>");
                                                                                    let XBABFR = XBABFB / (2 * Math.sin(Rad));
                                                                                    let XBABL1 = XBABLB * Math.sin(Rad);
                                                                                    let XBABE = (XBABLB / 2 - XBABLD) * Math.sin(Rad);
                                                                                    let XBABOCMax = XBABFR / (XBABL1 * XBABTHKCE) + 6 * XBABE * XBABFR / (XBABL1 * XBABL1 * XBABTHKCE);
                                                                                    let XBABOCMaxCHK;
                                                                                    if (XBABOCMax <= XBABOCMaxAllow) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "筋板实际压缩应力：" + XBABOCMax.toFixed(4) + " MPa" +
                                                                                            "</span>");
                                                                                        XBABOCMaxCHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "筋板实际压缩应力：" + XBABOCMax.toFixed(4) + " MPa" +
                                                                                            "</span>");
                                                                                        XBABOCMaxCHK = "不合格";
                                                                                    }

                                                                                    // docx
                                                                                    let XBABPayJS = $('#payjs');

                                                                                    function getDocx() {
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "xbabdocx.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                ribbonName: "XBAB",

                                                                                                t: XBABDT,
                                                                                                n: XBABN,
                                                                                                q0: XBABQ0,
                                                                                                f0: XBABF0,
                                                                                                m0: XBABM0,
                                                                                                h0: XBABH0,
                                                                                                d0: XBABD0,
                                                                                                g0: XBABG0,
                                                                                                s0: XBABS0,
                                                                                                sstd: XBABSSTDVal,
                                                                                                sname: XBABSNameVal,
                                                                                                cs2: XBABCS2,
                                                                                                dsi: XBABDSI,
                                                                                                thksn: XBABTHKSN,
                                                                                                dstd: XBABDSTDVal,
                                                                                                dname: XBABDNameVal,
                                                                                                thkdn: XBABTHKDN,
                                                                                                cd2: XBABCD2,
                                                                                                bstd: XBABBSTDVal,
                                                                                                bname: XBABBNameVal,
                                                                                                wb: XBABWB,
                                                                                                lb: XBABLB,
                                                                                                thkbn: XBABTHKBN,
                                                                                                cb2: XBABCB2,
                                                                                                sh: XBABSH,
                                                                                                bh: XBABBH,
                                                                                                ld: XBABLD,

                                                                                                cstd: XBABCSTDVal,
                                                                                                cname: XBABCNameVal,
                                                                                                alpha: XBABAlpha,
                                                                                                thkcn: XBABTHKCN,
                                                                                                b2: XBABB2,
                                                                                                cc2: XBABCC2,
                                                                                                u: XBABU,

                                                                                                densitys: XBABSDensity.toFixed(4),
                                                                                                cs1: XBABCS1.toFixed(4),
                                                                                                ost: XBABOST.toFixed(4),

                                                                                                densityb: XBABBDensity.toFixed(4),
                                                                                                cb1: XBABCB1.toFixed(4),
                                                                                                obt: XBABOBT.toFixed(4),

                                                                                                densityd: XBABDDensity.toFixed(4),
                                                                                                odt: XBABODT.toFixed(4),
                                                                                                cd1: XBABCD1.toFixed(4),

                                                                                                densityc: XBABCDensity.toFixed(4),
                                                                                                oct: XBABOCT.toFixed(4),
                                                                                                cc1: XBABCC1.toFixed(4),

                                                                                                g: XBABG.toFixed(4),
                                                                                                k: XBABK.toFixed(4),

                                                                                                dso: XBABDSO.toFixed(4),
                                                                                                cs: XBABCS.toFixed(4),
                                                                                                thkse: XBABTHKSE.toFixed(4),
                                                                                                lss: XBABLSS.toFixed(4),
                                                                                                ddo: XBABDDO.toFixed(4),
                                                                                                cd: XBABCD.toFixed(4),
                                                                                                thkde: XBABTHKDE.toFixed(4),
                                                                                                lds: XBABLDS.toFixed(4),
                                                                                                cb: XBABCB.toFixed(4),
                                                                                                thkbe: XBABTHKBE.toFixed(4),
                                                                                                db: XBABDB.toFixed(4),
                                                                                                b: XBABB.toFixed(4),
                                                                                                pw: XBABPW.toFixed(4),

                                                                                                pe: XBABPE.toFixed(4),
                                                                                                p: XBABP.toFixed(4),

                                                                                                fb: XBABFB.toFixed(4),
                                                                                                f: XBABF.toFixed(4),
                                                                                                a: XBABA.toFixed(4),
                                                                                                ax: XBABAX.toFixed(4),
                                                                                                ds: XBABDS.toFixed(4),
                                                                                                a1: XBABA1.toFixed(4),
                                                                                                i1: XBABI1.toFixed(4),
                                                                                                a2: XBABA2.toFixed(4),
                                                                                                i2: XBABI2.toFixed(4),
                                                                                                a3: XBABA3.toFixed(4),
                                                                                                i3: XBABI3.toFixed(4),
                                                                                                i: XBABI.toFixed(4),
                                                                                                theta: XBABTHETA.toFixed(4),
                                                                                                rs: XBABRS.toFixed(4),
                                                                                                mr: XBABMR.toFixed(4),
                                                                                                tr: XBABTR.toFixed(4),
                                                                                                or: XBABOR.toFixed(4),
                                                                                                orallow: XBABORALLOW.toFixed(4),
                                                                                                orallowchk: XBABORCHK,
                                                                                                mt: XBABMT.toFixed(4),
                                                                                                tt: XBABTT.toFixed(4),
                                                                                                ot: XBABOT.toFixed(4),
                                                                                                otallow: XBABOTALLOW.toFixed(4),
                                                                                                otallowchk: XBABOTCHK,

                                                                                                cc: XBABCC.toFixed(4),
                                                                                                thkce: XBABTHKCE.toFixed(4),
                                                                                                r: XBABR.toFixed(4),
                                                                                                l2: XBABL2.toFixed(4),
                                                                                                ocmaxallow: XBABOCMaxAllow.toFixed(4),
                                                                                                fr: XBABFR.toFixed(4),
                                                                                                l1: XBABL1.toFixed(4),
                                                                                                e: XBABE.toFixed(4),
                                                                                                ocmax: XBABOCMax.toFixed(4),
                                                                                                ocmaxchk: XBABOCMaxCHK
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
                                                                                                    XBABPayJS.dialog({
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
                                                                                                                XBABPayJS.dialog("close");
                                                                                                                XBABPayJS.dialog("clear");
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
                                                                                                                            XBABPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                    XBABPayJS.dialog('close');
                                                                                                                                    XBABPayJS.dialog('clear');
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
                                                                                        "<span style='color:red;'>&ensp;筋板材料力学特性获取失败，请检查网络后重试</span>");
                                                                                }
                                                                            });
                                                                        },
                                                                        error: function () {
                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                "<span style='color:red;'>&ensp;筋板材料物理性质获取失败，请检查网络后重试</span>");
                                                                        }
                                                                    });
                                                                },
                                                                error: function () {
                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                        "<span style='color:red;'>&ensp;刚性环材料力学特性获取失败，请检查网络后重试</span>");
                                                                }
                                                            });
                                                        },
                                                        error: function () {
                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                "<span style='color:red;'>&ensp;刚性环材料物理性质获取失败，请检查网络后重试</span>");
                                                        }
                                                    });
                                                },
                                                error: function () {
                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                        "<span style='color:red;'>&ensp;垫板材料力学特性获取失败，请检查网络后重试</span>");
                                                }
                                            });
                                        },
                                        error: function () {
                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                "<span style='color:red;'>&ensp;垫板材料物理性质获取失败，请检查网络后重试</span>");
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;筒体材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;筒体材料物理性质获取失败，请检查网络后重试</span>");
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