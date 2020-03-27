$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbacd2 = $("#d2");
    let xbacd3 = $("#d3");
    let xbacd2d3 = $('#d2d3');

    $("#cal").html("<table id='xbac'></table>");
    let pg = $("#xbac");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/a/c/XBAC.json", function (result) {

        let XBACDT;
        let XBACSCategory, XBACSCategoryVal, XBACSType, XBACSTypeVal, XBACSSTD, XBACSSTDVal, XBACSName, XBACSNameVal,
            XBACBCategory, XBACBCategoryVal, XBACBType, XBACBTypeVal, XBACBSTD, XBACBSTDVal, XBACBName, XBACBNameVal,
            XBACCCategory, XBACCCategoryVal, XBACCType, XBACCTypeVal, XBACCSTD, XBACCSTDVal, XBACCName, XBACCNameVal;
        let columns, rows, ed;

        // 2D Sketch
        function xbac2d(dsi = "Dsi", thksn = "δsn",
                        thkbn = "δbn", wb = "Wb", lb = "Lb", sh = "h", ld = "Ld", bh = "H") {

            xbacd2.empty();

            let width = xbacd2.width();
            let height = xbacd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "XBACSVG")
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
            drawLine(padding + 2 * widthgap - thk, padding, padding + 2 * widthgap - thk, height - padding);
            drawLine(padding + 2 * widthgap, padding, padding + 2 * widthgap, height - padding);
            drawLine(padding + 4 * widthgap, padding, padding + 4 * widthgap, height - padding);
            drawLine(padding + 4 * widthgap + thk, padding, padding + 4 * widthgap + thk, height - padding);
            drawCenterLine(width / 2, padding - 10, width / 2, height - padding - 0.25 * heightgap - 16);
            drawCenterLine(width / 2, height - padding - 0.25 * heightgap + 4, width / 2, height - padding + 10);

            // DSI
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap, y: height - padding - 0.25 * heightgap},
                    {x: padding + 2 * widthgap + 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: padding + 2 * widthgap + 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: padding + 2 * widthgap, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - 2 * widthgap, y: height - padding - 0.25 * heightgap},
                    {x: width - padding - 2 * widthgap - 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: width - padding - 2 * widthgap - 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: width - padding - 2 * widthgap, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap + 15, y: height - padding - 0.25 * heightgap},
                {x: width - padding - 2 * widthgap - 15, y: height - padding - 0.25 * heightgap}
            ])).attr("id", "XBACSketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchDSI").attr("startOffset", "50%")
                .text(dsi);

            // THKSN
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap, y: height - padding - 0.25 * heightgap},
                {x: padding + 2 * widthgap - thk, y: height - padding - 0.25 * heightgap}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthgap - thk, y: height - padding - 0.25 * heightgap},
                    {x: padding + 2 * widthgap - thk - 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: padding + 2 * widthgap - thk - 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: padding + 2 * widthgap - thk, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthgap - thk - 15 - 40, y: height - padding - 0.25 * heightgap},
                {x: padding + 2 * widthgap - thk - 15, y: height - padding - 0.25 * heightgap}
            ])).attr("id", "XBACSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchTHKSN").attr("startOffset", "50%")
                .text(thksn);

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

            // LB
            svg.append("path").attr("d", line([
                {x: padding + 5 * widthgap, y: height - padding - heightgap + 3},
                {x: padding + 5 * widthgap, y: height - padding - 0.25 * heightgap + 10}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 4 * widthgap + thk, y: height - padding - 0.25 * heightgap},
                    {x: padding + 4 * widthgap + thk + 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: padding + 4 * widthgap + thk + 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: padding + 4 * widthgap + thk, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 5 * widthgap, y: height - padding - 0.25 * heightgap},
                    {x: padding + 5 * widthgap - 15, y: height - padding - 0.25 * heightgap + 3},
                    {x: padding + 5 * widthgap - 15, y: height - padding - 0.25 * heightgap - 3},
                    {x: padding + 5 * widthgap, y: height - padding - 0.25 * heightgap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap + thk + 15, y: height - padding - 0.25 * heightgap},
                {x: padding + 5 * widthgap - 15, y: height - padding - 0.25 * heightgap}
            ])).attr("id", "XBACSketchLB").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchLB").attr("startOffset", "50%")
                .text(lb);

            // THKBN SH
            svg.append("path").attr("d", line([
                {x: padding + widthgap - 30, y: height - padding - heightgap + thk + 15 + 40},
                {x: padding + widthgap - 30, y: height - padding - heightgap + thk + 15}
            ])).attr("id", "XBACSketchTHKBN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchTHKBN1").attr("startOffset", "50%")
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
            ])).attr("id", "XBACSketchSH").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchSH").attr("startOffset", "50%")
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
            ])).attr("id", "XBACSketchTHKBN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchTHKBN2").attr("startOffset", "50%")
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
            ])).attr("id", "XBACSketchLD").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchLD").attr("startOffset", "50%")
                .text(ld);

            // WB
            svg.append("path").attr("d", line([
                {x: padding + 4 * widthgap + thk - 15, y: padding + 0.5 * heightgap - 30},
                {x: padding + 4 * widthgap + thk - 15 - 10, y: padding + 0.5 * heightgap - 30}
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
                    {x: padding + 4 * widthgap + thk, y: padding + 0.5 * heightgap - 30},
                    {x: padding + 4 * widthgap + thk - 15, y: padding + 0.5 * heightgap - 30 - 3},
                    {x: padding + 4 * widthgap + thk - 15, y: padding + 0.5 * heightgap - 30 + 3},
                    {x: padding + 4 * widthgap + thk, y: padding + 0.5 * heightgap - 30}
                ]));
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
            ])).attr("id", "XBACSketchWB").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchWB").attr("startOffset", "50%")
                .text(wb);

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
            ])).attr("id", "XBACSketchBH").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBACSketchBH").attr("startOffset", "50%")
                .text(bh);

        }

        currentTabIndex = xbacd2d3.tabs('getTabIndex', xbacd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbac2d();
            xbacd2.off("resize").on("resize", function () {
                if (pg.length > 0) {
                    xbac2d();
                }
            });
        }
        xbacd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbac2d();
                    xbacd2.off("resize").on("resize", function () {
                        if (pg.length > 0) {
                            xbac2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 带刚性环、不带垫板的耳座强度校核",
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
                    $(ed.target).combobox("loadData", XBACSCategory);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", XBACSType);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", XBACSSTD);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", XBACSName);
                }

                else if (index === 16) {
                    $(ed.target).combobox("loadData", XBACBCategory);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", XBACBType);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", XBACBSTD);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", XBACBName);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", XBACCCategory);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", XBACCType);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", XBACCSTD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", XBACCName);
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
                    xbacd2.empty();
                    xbacd3.empty();

                    // sketch
                    currentTabIndex = xbacd2d3.tabs('getTabIndex', xbacd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xbac2d();
                        xbacd2.off("resize").on("resize", function () {
                            if (pg.length > 0) {
                                xbac2d();
                            }
                        });
                    }
                    xbacd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbac2d();
                                xbacd2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbac2d();
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

                        XBACDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        XBACSCategory = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBACSType = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBACSSTD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBACSName = null;

                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        XBACBCategory = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBACBType = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBACBSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBACBName = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        XBACCCategory = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        XBACCType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XBACCSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBACCName = null;

                        // category list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACSCategory = [];
                                XBACBCategory = [];
                                XBACCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XBACDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XBACSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBACBCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XBACCCategory[index] = {
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

                        XBACSCategoryVal = changes.value;

                        // clear type、std、name
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        XBACSType = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBACSSTD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBACSName = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACSCategoryVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACSType = [];
                                $(result).each(function (index, element) {
                                    XBACSType[index] = {
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

                        XBACSTypeVal = changes.value;

                        // clear std、name
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        XBACSSTD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBACSName = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACSCategoryVal,
                                type: XBACSTypeVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACSSTD = [];
                                $(result).each(function (index, element) {
                                    XBACSSTD[index] = {
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

                        XBACSSTDVal = changes.value;

                        // clear name
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XBACSName = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACSCategoryVal,
                                type: XBACSTypeVal,
                                std: XBACSSTDVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACSName = [];
                                $(result).each(function (index, element) {
                                    XBACSName[index] = {
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

                        XBACBCategoryVal = changes.value;

                        // clear type、std、name
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        XBACBType = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBACBSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBACBName = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACBCategoryVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACBType = [];
                                $(result).each(function (index, element) {
                                    XBACBType[index] = {
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

                        XBACBTypeVal = changes.value;

                        // clear std、name
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XBACBSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBACBName = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACBCategoryVal,
                                type: XBACBTypeVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACBSTD = [];
                                $(result).each(function (index, element) {
                                    XBACBSTD[index] = {
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

                        XBACBSTDVal = changes.value;

                        // clear name
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XBACBName = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACBCategoryVal,
                                type: XBACBTypeVal,
                                std: XBACBSTDVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACBName = [];
                                $(result).each(function (index, element) {
                                    XBACBName[index] = {
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
                    if (index === 27) {

                        XBACCCategoryVal = changes.value;

                        // clear type、std、name
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        XBACCType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XBACCSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBACCName = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACCCategoryVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACCType = [];
                                $(result).each(function (index, element) {
                                    XBACCType[index] = {
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
                    if (index === 28) {

                        XBACCTypeVal = changes.value;

                        // clear std、name
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XBACCSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBACCName = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACCCategoryVal,
                                type: XBACCTypeVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACCSTD = [];
                                $(result).each(function (index, element) {
                                    XBACCSTD[index] = {
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
                    if (index === 29) {

                        XBACCSTDVal = changes.value;

                        // clear name
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XBACCName = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XBACCCategoryVal,
                                type: XBACCTypeVal,
                                std: XBACCSTDVal,
                                temp: XBACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XBACCName = [];
                                $(result).each(function (index, element) {
                                    XBACCName[index] = {
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

                    // N
                    let XBACN;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        XBACN = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Q0
                    let XBACQ0;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        XBACQ0 = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // F0
                    let XBACF0;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        XBACF0 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // M0
                    let XBACM0;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        XBACM0 = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H0
                    let XBACH0;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        XBACH0 = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // D0
                    let XBACD0;
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        XBACD0 = parseFloat(rows[6][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // G0
                    let XBACG0;
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        XBACG0 = parseFloat(rows[7][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // S0
                    let XBACS0;
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        XBACS0 = parseFloat(rows[8][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // SNameVal
                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                        XBACSNameVal = rows[12][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let XBACSDensity, XBACSThkMin, XBACSThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": XBACSCategoryVal,
                            "type": XBACSTypeVal,
                            "std": XBACSSTDVal,
                            "name": XBACSNameVal,
                            "temp": XBACDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            XBACSDensity = parseFloat(result.density);
                            XBACSThkMin = parseFloat(result.thkMin);
                            XBACSThkMax = parseFloat(result.thkMax);

                            // CS2
                            let XBACCS2;
                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) < XBACSThkMax) {
                                XBACCS2 = parseFloat(rows[13][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) >= XBACSThkMax) {
                                south.html("筒体腐蚀裕量不能大于等于 " + XBACSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // DSI
                            let XBACDSI;
                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                XBACDSI = parseFloat(rows[14][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbac2d("Φ" + XBACDSI);
                                xbacd2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbac2d("Φ" + XBACDSI);
                                    }
                                });
                            }
                            xbacd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbac2d("Φ" + XBACDSI);
                                        xbacd2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbac2d("Φ" + XBACDSI);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKSN
                            let XBACTHKSN;
                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) > Math.max(XBACSThkMin, XBACCS2)
                                && parseFloat(rows[15][columns[0][1].field]) <= XBACSThkMax) {
                                XBACTHKSN = parseFloat(rows[15][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) <= Math.max(XBACSThkMin, XBACCS2)) {
                                south.html("筒体名义厚度 δsn 不能小于等于 " + Math.max(XBACSThkMin, XBACCS2) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) > XBACSThkMax) {
                                south.html("筒体名义厚度 δsn 不能大于 " + XBACSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbac2d("Φ" + XBACDSI, XBACTHKSN);
                                xbacd2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbac2d("Φ" + XBACDSI, XBACTHKSN);
                                    }
                                });
                            }
                            xbacd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbac2d("Φ" + XBACDSI, XBACTHKSN);
                                        xbacd2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbac2d("Φ" + XBACDSI, XBACTHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            let XBACOST, XBACCS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XBACSCategoryVal,
                                    "type": XBACSTypeVal,
                                    "std": XBACSSTDVal,
                                    "name": XBACSNameVal,
                                    "thk": XBACTHKSN,
                                    "temp": XBACDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": XBACDSI + 2 * XBACTHKSN
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XBACOST = parseFloat(result.ot);
                                    if (XBACOST < 0) {
                                        south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    XBACCS1 = parseFloat(result.c1);
                                    if (XBACCS1 < 0) {
                                        south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // BNameVal
                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                        XBACBNameVal = rows[19][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    let XBACBDensity, XBACBThkMin, XBACBThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": XBACBCategoryVal,
                                            "type": XBACBTypeVal,
                                            "std": XBACBSTDVal,
                                            "name": XBACBNameVal,
                                            "temp": XBACDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            XBACBDensity = parseFloat(result.density);
                                            XBACBThkMin = parseFloat(result.thkMin);
                                            XBACBThkMax = parseFloat(result.thkMax);

                                            // CB2
                                            let XBACCB2;
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) < XBACBThkMax) {
                                                XBACCB2 = parseFloat(rows[20][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) >= XBACBThkMax) {
                                                south.html("刚性环腐蚀裕量不能大于等于 " + XBACBThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // THKBN
                                            let XBACTHKBN;
                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                && parseFloat(rows[21][columns[0][1].field]) > Math.max(XBACBThkMin, XBACCB2)
                                                && parseFloat(rows[21][columns[0][1].field]) <= XBACBThkMax) {
                                                XBACTHKBN = parseFloat(rows[21][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                && parseFloat(rows[21][columns[0][1].field]) <= Math.max(XBACBThkMin, XBACCB2)) {
                                                south.html("刚性环名义厚度 δbn 不能小于等于 " + Math.max(XBACBThkMin, XBACCB2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                && parseFloat(rows[21][columns[0][1].field]) > XBACBThkMax) {
                                                south.html("刚性环名义厚度 δbn 不能大于 " + XBACBThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN);
                                                xbacd2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN);
                                                    }
                                                });
                                            }
                                            xbacd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN);
                                                        xbacd2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let XBACOBT, XBACCB1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": XBACBCategoryVal,
                                                    "type": XBACBTypeVal,
                                                    "std": XBACBSTDVal,
                                                    "name": XBACBNameVal,
                                                    "thk": XBACTHKBN,
                                                    "temp": XBACDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    XBACOBT = parseFloat(result.ot);
                                                    if (XBACOBT < 0) {
                                                        south.html("查询刚性环材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    XBACCB1 = parseFloat(result.c1);
                                                    if (XBACCB1 < 0) {
                                                        south.html("查询刚性环材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // WB
                                                    let XBACWB;
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        XBACWB = parseFloat(rows[22][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB);
                                                        xbacd2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB);
                                                            }
                                                        });
                                                    }
                                                    xbacd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB);
                                                                xbacd2.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // LB
                                                    let XBACLB;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) >= XBACWB) {
                                                        XBACLB = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) < XBACWB) {
                                                        south.html("下刚性环宽度 Lb 不能小于 " + XBACWB + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB);
                                                        xbacd2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB);
                                                            }
                                                        });
                                                    }
                                                    xbacd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB);
                                                                xbacd2.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // SH
                                                    let XBACSH;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                        XBACSH = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH);
                                                        xbacd2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH);
                                                            }
                                                        });
                                                    }
                                                    xbacd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH);
                                                                xbacd2.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // LD
                                                    let XBACLD;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                        && parseFloat(rows[25][columns[0][1].field]) < XBACLB) {
                                                        XBACLD = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                        && parseFloat(rows[25][columns[0][1].field]) >= XBACLB) {
                                                        south.html("下刚性环螺栓外侧宽度 Ld 不得大于" + XBACLB + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD);
                                                        xbacd2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD);
                                                            }
                                                        });
                                                    }
                                                    xbacd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD);
                                                                xbacd2.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // BH
                                                    let XBACBH;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        XBACBH = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD, XBACBH);
                                                        xbacd2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD, XBACBH);
                                                            }
                                                        });
                                                    }
                                                    xbacd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD, XBACBH);
                                                                xbacd2.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        xbac2d("Φ" + XBACDSI, XBACTHKSN, XBACTHKBN, XBACWB, XBACLB, XBACSH, XBACLD, XBACBH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // CNameVal
                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                        XBACCNameVal = rows[30][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let XBACCDensity, XBACCThkMin, XBACCThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_gbt_150_2011_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": XBACCCategoryVal,
                                                            "type": XBACCTypeVal,
                                                            "std": XBACCSTDVal,
                                                            "name": XBACCNameVal,
                                                            "temp": XBACDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            XBACCDensity = parseFloat(result.density);
                                                            XBACCThkMin = parseFloat(result.thkMin);
                                                            XBACCThkMax = parseFloat(result.thkMax);

                                                            // CC2
                                                            let XBACCC2;
                                                            if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                && parseFloat(rows[31][columns[0][1].field]) < XBACCThkMax) {
                                                                XBACCC2 = parseFloat(rows[31][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                && parseFloat(rows[31][columns[0][1].field]) >= XBACCThkMax) {
                                                                south.html("筋板腐蚀裕量不能大于等于 " + XBACCThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // THKCN
                                                            let XBACTHKCN;
                                                            if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                && parseFloat(rows[32][columns[0][1].field]) > Math.max(XBACCThkMin, XBACCC2)
                                                                && parseFloat(rows[32][columns[0][1].field]) <= XBACCThkMax) {
                                                                XBACTHKCN = parseFloat(rows[32][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                && parseFloat(rows[32][columns[0][1].field]) <= Math.max(XBACCThkMin, XBACCC2)) {
                                                                south.html("筋板名义厚度 δcn 不能小于等于 " + Math.max(XBACCThkMin, XBACCC2) + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                && parseFloat(rows[32][columns[0][1].field]) > XBACCThkMax) {
                                                                south.html("筋板名义厚度 δcn 不能大于 " + XBACCThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            let XBACOCT, XBACCC1;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_gbt_150_2011_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": XBACCCategoryVal,
                                                                    "type": XBACCTypeVal,
                                                                    "std": XBACCSTDVal,
                                                                    "name": XBACCNameVal,
                                                                    "thk": XBACTHKCN,
                                                                    "temp": XBACDT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    XBACOCT = parseFloat(result.ot);
                                                                    if (XBACOCT < 0) {
                                                                        south.html("查询筋板材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    XBACCC1 = parseFloat(result.c1);
                                                                    if (XBACCC1 < 0) {
                                                                        south.html("查询筋板材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // α
                                                                    let XBACAlpha;
                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])) {
                                                                        XBACAlpha = parseFloat(rows[33][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    let Rad = XBACAlpha / 180 * Math.PI;

                                                                    // b2
                                                                    let XBACB2;
                                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                                        XBACB2 = parseFloat(rows[34][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // U
                                                                    let XBACU;
                                                                    if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                                        if (rows[35][columns[0][1].field] === "0.1g") {
                                                                            XBACU = 0.08;
                                                                        }
                                                                        else if (rows[35][columns[0][1].field] === "0.15g") {
                                                                            XBACU = 0.12;
                                                                        }
                                                                        else if (rows[35][columns[0][1].field] === "0.2g") {
                                                                            XBACU = 0.16;
                                                                        }
                                                                        else if (rows[35][columns[0][1].field] === "0.3g") {
                                                                            XBACU = 0.24;
                                                                        }
                                                                        else if (rows[35][columns[0][1].field] === "0.4g") {
                                                                            XBACU = 0.32;
                                                                        }
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 过程参数
                                                                    let XBACG = 9.8;
                                                                    let XBACK;
                                                                    if (XBACN <= 3) {
                                                                        XBACK = 1.0;
                                                                    }
                                                                    else if (XBACN > 3) {
                                                                        XBACK = 0.83;
                                                                    }

                                                                    let XBACDSO = XBACDSI + 2 * XBACTHKSN;
                                                                    let XBACCS = XBACCS1 + XBACCS2;
                                                                    let XBACTHKSE = XBACTHKSN - XBACCS;
                                                                    let XBACLSS = 1.1 * Math.sqrt(XBACDSO * XBACTHKSE);
                                                                    let XBACCB = XBACCB1 + XBACCB2;
                                                                    let XBACTHKBE = XBACTHKBN - XBACCB;

                                                                    // 安装尺寸计算
                                                                    let XBACDB = XBACDSO + 2 * XBACLB - 2 * XBACLD;
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "耳座安装尺寸(地脚螺栓中心圆直径)：" + XBACDB.toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    // 作用力
                                                                    let XBACB = (XBACDB - XBACDSO + XBACTHKSE) / 2;
                                                                    let XBACPW = 1.2 * XBACF0 * XBACQ0 * XBACD0 * XBACH0 / 1000000;
                                                                    let XBACPE = XBACU * XBACM0 * XBACG;
                                                                    let XBACP = Math.max(XBACPW, XBACPE + 0.25 * XBACPW);
                                                                    let XBACFB = 4 * (XBACP * XBACBH + XBACG0 * XBACG * XBACS0) / XBACDB / XBACN + (XBACM0 * XBACG + XBACG0 * XBACG) / XBACN / XBACK;

                                                                    let XBACF = XBACFB * XBACB / (XBACSH + XBACTHKBN);

                                                                    // 截面特性
                                                                    let XBACA = XBACWB * XBACTHKBE + XBACTHKSE * XBACLSS;
                                                                    let XBACAX = (XBACWB * XBACWB * XBACTHKBE / 2 + XBACTHKSE * XBACLSS * (XBACWB + XBACTHKSE / 2)) / (XBACWB * XBACTHKBE + XBACTHKSE * XBACLSS);
                                                                    let XBACDS = XBACDSO + 2 * (XBACWB - XBACAX);
                                                                    let XBACA1 = XBACAX - XBACWB / 2;
                                                                    let XBACI1 = XBACWB * XBACWB * XBACWB * XBACTHKBE / 12 + XBACWB * XBACTHKBE * XBACA1 * XBACA1;
                                                                    let XBACA3 = XBACWB + XBACTHKSE / 2 - XBACAX;
                                                                    let XBACI3 = XBACTHKSE * XBACTHKSE * XBACTHKSE * XBACLSS / 12 + XBACTHKSE * XBACLSS * XBACA3 * XBACA3;
                                                                    let XBACI = XBACI1 + XBACI3;

                                                                    // 组合截面应力计算
                                                                    let XBACORALLOW = Math.min(XBACOST, XBACOBT);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "支座处刚性环截面许用应力：" + XBACORALLOW.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    let XBACTHETA = Math.PI / XBACN;
                                                                    let XBACRS = XBACDS / 2;
                                                                    let XBACMR = -0.5 * XBACF * XBACRS * (1 / XBACTHETA - 1 / Math.tan(XBACTHETA));
                                                                    let XBACTR = 0.5 * XBACF / Math.tan(XBACTHETA);
                                                                    let XBACOR = Math.abs(XBACMR) * XBACAX / XBACI + XBACTR / XBACA;
                                                                    let XBACORCHK;
                                                                    if (XBACOR <= XBACORALLOW) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际应力：" + XBACOR.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XBACORCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际应力：" + XBACOR.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XBACORCHK = "不合格";
                                                                    }

                                                                    let XBACOTALLOW = Math.min(XBACOST, XBACOBT);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "支座中间处刚性环截面许用应力：" + XBACOTALLOW.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    let XBACMT = 0.5 * XBACF * XBACRS * (1 / Math.sin(XBACTHETA) - 1 / XBACTHETA);
                                                                    let XBACTT = XBACF / (2 * Math.sin(XBACTHETA));
                                                                    let XBACOT = Math.abs(XBACMT) * XBACAX / XBACI + XBACTT / XBACA;
                                                                    let XBACOTCHK;
                                                                    if (XBACOT <= XBACOTALLOW) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际应力：" + XBACOT.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XBACOTCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际应力：" + XBACOT.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XBACOTCHK = "不合格";
                                                                    }

                                                                    // 筋板校核
                                                                    let XBACCC = XBACCC1 + XBACCC2;
                                                                    let XBACTHKCE = XBACTHKCN - XBACCC;
                                                                    let XBACR = 0.289 * XBACTHKCE;
                                                                    let XBACL2 = XBACSH / Math.sin(Rad);
                                                                    let XBACOCMaxAllow = XBACOCT / (1 + (XBACL2 / XBACR) * (XBACL2 / XBACR) / (140 * XBACOCT));
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "筋板许用压缩应力：" + XBACOCMaxAllow.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    let XBACFR = XBACFB / (2 * Math.sin(Rad));
                                                                    let XBACL1 = XBACLB * Math.sin(Rad);
                                                                    let XBACE = (XBACLB / 2 - XBACLD) * Math.sin(Rad);
                                                                    let XBACOCMax = XBACFR / (XBACL1 * XBACTHKCE) + 6 * XBACE * XBACFR / (XBACL1 * XBACL1 * XBACTHKCE);
                                                                    let XBACOCMaxCHK;
                                                                    if (XBACOCMax <= XBACOCMaxAllow) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "筋板实际压缩应力：" + XBACOCMax.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XBACOCMaxCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "筋板实际压缩应力：" + XBACOCMax.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XBACOCMaxCHK = "不合格";
                                                                    }

                                                                    // docx
                                                                    let XBACPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "xbacdocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "XBAC",

                                                                                t: XBACDT,
                                                                                n: XBACN,
                                                                                q0: XBACQ0,
                                                                                f0: XBACF0,
                                                                                m0: XBACM0,
                                                                                h0: XBACH0,
                                                                                d0: XBACD0,
                                                                                g0: XBACG0,
                                                                                s0: XBACS0,
                                                                                sstd: XBACSSTDVal,
                                                                                sname: XBACSNameVal,
                                                                                cs2: XBACCS2,
                                                                                dsi: XBACDSI,
                                                                                thksn: XBACTHKSN,
                                                                                bstd: XBACBSTDVal,
                                                                                bname: XBACBNameVal,
                                                                                wb: XBACWB,
                                                                                lb: XBACLB,
                                                                                thkbn: XBACTHKBN,
                                                                                cb2: XBACCB2,
                                                                                sh: XBACSH,
                                                                                bh: XBACBH,
                                                                                ld: XBACLD,
                                                                                densitys: XBACSDensity.toFixed(4),
                                                                                cs1: XBACCS1.toFixed(4),
                                                                                ost: XBACOST.toFixed(4),
                                                                                densityb: XBACBDensity.toFixed(4),
                                                                                cb1: XBACCB1.toFixed(4),
                                                                                obt: XBACOBT.toFixed(4),
                                                                                g: XBACG.toFixed(4),
                                                                                dso: XBACDSO.toFixed(4),
                                                                                cs: XBACCS.toFixed(4),
                                                                                thkse: XBACTHKSE.toFixed(4),
                                                                                lss: XBACLSS.toFixed(4),
                                                                                cb: XBACCB.toFixed(4),
                                                                                thkbe: XBACTHKBE.toFixed(4),
                                                                                db: XBACDB.toFixed(4),
                                                                                b: XBACB.toFixed(4),
                                                                                pw: XBACPW.toFixed(4),
                                                                                fb: XBACFB.toFixed(4),
                                                                                f: XBACF.toFixed(4),
                                                                                a: XBACA.toFixed(4),
                                                                                ax: XBACAX.toFixed(4),
                                                                                ds: XBACDS.toFixed(4),
                                                                                a1: XBACA1.toFixed(4),
                                                                                i1: XBACI1.toFixed(4),
                                                                                a3: XBACA3.toFixed(4),
                                                                                i3: XBACI3.toFixed(4),
                                                                                i: XBACI.toFixed(4),
                                                                                theta: XBACTHETA.toFixed(4),
                                                                                rs: XBACRS.toFixed(4),
                                                                                mr: XBACMR.toFixed(4),
                                                                                tr: XBACTR.toFixed(4),
                                                                                or: XBACOR.toFixed(4),
                                                                                orallow: XBACORALLOW.toFixed(4),
                                                                                orallowchk: XBACORCHK,
                                                                                mt: XBACMT.toFixed(4),
                                                                                tt: XBACTT.toFixed(4),
                                                                                ot: XBACOT.toFixed(4),
                                                                                otallow: XBACOTALLOW.toFixed(4),
                                                                                otallowchk: XBACOTCHK,

                                                                                cstd: XBACCSTDVal,
                                                                                cname: XBACCNameVal,
                                                                                alpha: XBACAlpha,
                                                                                thkcn: XBACTHKCN,
                                                                                b2: XBACB2,
                                                                                cc2: XBACCC2,
                                                                                u: XBACU,

                                                                                densityc: XBACCDensity.toFixed(4),
                                                                                oct: XBACOCT.toFixed(4),
                                                                                cc1: XBACCC1.toFixed(4),

                                                                                k: XBACK.toFixed(4),

                                                                                pe: XBACPE.toFixed(4),
                                                                                p: XBACP.toFixed(4),

                                                                                cc: XBACCC.toFixed(4),
                                                                                thkce: XBACTHKCE.toFixed(4),
                                                                                r: XBACR.toFixed(4),
                                                                                l2: XBACL2.toFixed(4),
                                                                                ocmaxallow: XBACOCMaxAllow.toFixed(4),
                                                                                fr: XBACFR.toFixed(4),
                                                                                l1: XBACL1.toFixed(4),
                                                                                e: XBACE.toFixed(4),
                                                                                ocmax: XBACOCMax.toFixed(4),
                                                                                ocmaxchk: XBACOCMaxCHK
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
                                                                                    XBACPayJS.dialog({
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
                                                                                                XBACPayJS.dialog("close");
                                                                                                XBACPayJS.dialog("clear");
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
                                                                                                            XBACPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    XBACPayJS.dialog('close');
                                                                                                                    XBACPayJS.dialog('clear');
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