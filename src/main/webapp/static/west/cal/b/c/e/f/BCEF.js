$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcefSketch = $("#d2");
    let bcefModel = $("#d3");
    let bcefd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcef'></table>");
    let pg = $("#bcef");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/e/f/BCEF.json", function (result) {

        let BCEFDT,
            BCEFSCategory, BCEFSCategoryVal, BCEFSType, BCEFSTypeVal, BCEFSSTD, BCEFSSTDVal, BCEFSName, BCEFSNameVal,
            BCEFCCategory, BCEFCCategoryVal, BCEFCType, BCEFCTypeVal, BCEFCSTD, BCEFCSTDVal, BCEFCName, BCEFCNameVal,
            BCEFRCategory, BCEFRCategoryVal, BCEFRType, BCEFRTypeVal, BCEFRSTD, BCEFRSTDVal, BCEFRName, BCEFRNameVal,
            columns, rows, ed;

        function bcef2d(dsi = "ϕDsi", thksn = "δsn", alpha = "α", thkcn = "δcn", thkrn = "δrn", hrn = "Hrn", ti = "Σti") {

            bcefSketch.empty();

            let width = bcefSketch.width();
            let height = bcefSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCEFSVG").attr("height", height);

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
                ])).attr("id", "BCEBSketchDI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#BCEBSketchDI").attr("startOffset", "50%").text(text);

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

            let padding = 80;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 10;

            // 筒体
            drawLine(padding, padding + hg - 5 * thk, padding, padding + 4 * hg);
            drawLine(padding - thk, padding + hg - 5 * thk, padding - thk, padding + 4 * hg);
            drawLine(padding + 2 * wg, padding + hg - 5 * thk, padding + 2 * wg, padding + 4 * hg);
            drawLine(padding + 2 * wg + thk, padding + hg - 5 * thk, padding + 2 * wg + thk, padding + 4 * hg);
            drawLine(padding - thk, padding + hg - 5 * thk, padding + 2 * wg + thk, padding + hg - 5 * thk);
            drawLine(padding - thk, padding + 4 * hg, padding + 2 * wg + thk, padding + 4 * hg);

            drawCenterLine(padding + wg, padding + hg - 5 * thk - 10, padding + wg, height / 2 + hg - 20);
            drawCenterLine(padding + wg, height / 2 + hg + 5, padding + wg, height - padding);

            // dsi
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding, y: height / 2 + hg},
                    {x: padding + 15, y: height / 2 + hg + 3},
                    {x: padding + 15, y: height / 2 + hg - 3},
                    {x: padding, y: height / 2 + hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg, y: height / 2 + hg},
                    {x: padding + 2 * wg - 15, y: height / 2 + hg + 3},
                    {x: padding + 2 * wg - 15, y: height / 2 + hg - 3},
                    {x: padding + 2 * wg, y: height / 2 + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 15, y: height / 2 + hg},
                {x: padding + 2 * wg - 15, y: height / 2 + hg}
            ])).attr("id", "BCEFSketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchDSI").attr("startOffset", "50%").text(dsi);

            // thksn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - thk, y: height / 2 + hg},
                    {x: padding - thk - 15, y: height / 2 + hg + 3},
                    {x: padding - thk - 15, y: height / 2 + hg - 3},
                    {x: padding - thk, y: height / 2 + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding - thk, y: height / 2 + hg},
                {x: padding, y: height / 2 + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding - thk - 15 - 40, y: height / 2 + hg},
                {x: padding - thk - 15, y: height / 2 + hg}
            ])).attr("id", "BCEFSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 锥壳
            let sr = 0.3 * wg;
            drawLine(padding, padding + hg, padding + wg - sr, padding + hg - 3 * thk);
            drawLine(padding + 2 * wg, padding + hg, padding + wg + sr, padding + hg - 3 * thk);
            drawLine(padding + wg - sr, padding + hg - 3 * thk, padding + wg + sr, padding + hg - 3 * thk);

            let rad = Math.atan(0.7 * wg / (3 * thk));

            drawLine(padding, padding + hg - thk / Math.sin(rad), padding + wg - sr - thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad));
            drawLine(padding + 2 * wg, padding + hg - thk / Math.sin(rad), padding + wg + sr + thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad));
            drawLine(padding + wg - sr - thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad), padding + wg + sr + thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad));

            drawLine(padding + wg - sr, padding + hg - 3 * thk, padding + wg - sr, padding + hg - 3 * thk - thk * Math.sin(rad));
            drawLine(padding + wg + sr, padding + hg - 3 * thk, padding + wg + sr, padding + hg - 3 * thk - thk * Math.sin(rad));

            // alpha
            let cr = 0.5 * wg / Math.sin(rad);
            let cx0 = padding + wg;
            let cy0 = padding + hg - wg / Math.tan(rad);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: cy0 + cr},
                    {x: padding + wg - 15, y: cy0 + cr + 3},
                    {x: padding + wg - 15, y: cy0 + cr - 3},
                    {x: padding + wg, y: cy0 + cr}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: cy0 + cr},
                    {x: padding + wg + 15, y: cy0 + cr + 3},
                    {x: padding + wg + 15, y: cy0 + cr - 3},
                    {x: padding + wg, y: cy0 + cr}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", "M "
                + (cx0 - cr * Math.sin(rad)) + " " + (cy0 + cr * Math.cos(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0) + " " + (cy0 + cr)
            ).attr("id", "BCEFSketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchALPHA").attr("startOffset", "50%").text(alpha);

            // thkcn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk},
                    {x: cx0 + cr + 3, y: cy0 - thk - 15},
                    {x: cx0 + cr - 3, y: cy0 - thk - 15},
                    {x: cx0 + cr, y: cy0 - thk}
                ])).attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + cr, y: cy0 - thk - 15 - 10},
                {x: cx0 + cr, y: cy0}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + cr, y: cy0 + 15 + 40},
                {x: cx0 + cr, y: cy0 + 15}
            ])).attr("id", "BCEFSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchTHKCN").attr("startOffset", "50%").text(thkcn);

            // 加强圈
            // 左侧
            svg.append("path").attr("d", line([
                {x: padding - 2 * thk, y: padding + hg},
                {x: padding - 5 * thk, y: padding + hg},
                {x: padding - 5 * thk, y: padding + hg - thk},
                {x: padding - 2 * thk, y: padding + hg - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding - thk, y: padding + hg - 2 * thk},
                {x: padding - 2 * thk, y: padding + hg - thk},
                {x: padding - thk, y: padding + hg - 0.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding - thk, y: padding + hg - 0.5 * thk},
                {x: padding - 2 * thk, y: padding + hg},
                {x: padding - thk, y: padding + hg + thk}
            ])).classed("sketch", true);
            // 右
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + 2 * thk, y: padding + hg},
                {x: padding + 2 * wg + 5 * thk, y: padding + hg},
                {x: padding + 2 * wg + 5 * thk, y: padding + hg - thk},
                {x: padding + 2 * wg + 2 * thk, y: padding + hg - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + thk, y: padding + hg - 2 * thk},
                {x: padding + 2 * wg + 2 * thk, y: padding + hg - thk},
                {x: padding + 2 * wg + thk, y: padding + hg - 0.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + thk, y: padding + hg - 0.5 * thk},
                {x: padding + 2 * wg + 2 * thk, y: padding + hg},
                {x: padding + 2 * wg + thk, y: padding + hg + thk}
            ])).classed("sketch", true);

            // hrn
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + thk, y: padding + hg - 5 * thk - 3},
                {x: padding + 2 * wg + thk, y: padding + hg - 5 * thk - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + 5 * thk, y: padding + hg - thk - 3},
                {x: padding + 2 * wg + 5 * thk, y: padding + hg - 5 * thk - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + thk, y: padding + hg - 5 * thk - 30},
                {x: padding + 2 * wg + 5 * thk + 15 + 10, y: padding + hg - 5 * thk - 30}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + thk, y: padding + hg - 5 * thk - 30},
                    {x: padding + 2 * wg + thk - 15, y: padding + hg - 5 * thk - 30 + 3},
                    {x: padding + 2 * wg + thk - 15, y: padding + hg - 5 * thk - 30 - 3},
                    {x: padding + 2 * wg + thk, y: padding + hg - 5 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + 5 * thk, y: padding + hg - 5 * thk - 30},
                    {x: padding + 2 * wg + 5 * thk + 15, y: padding + hg - 5 * thk - 30 + 3},
                    {x: padding + 2 * wg + 5 * thk + 15, y: padding + hg - 5 * thk - 30 - 3},
                    {x: padding + 2 * wg + 5 * thk, y: padding + hg - 5 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + thk - 15 - 40, y: padding + hg - 5 * thk - 30},
                {x: padding + 2 * wg + thk - 15, y: padding + hg - 5 * thk - 30}
            ])).attr("id", "BCEFSketchHRN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchHRN").attr("startOffset", "50%").text(hrn);

            // thkrn
            extLineRightH(padding + 2 * wg + 5 * thk, padding + hg - thk);
            extLineRightH(padding + 2 * wg + 5 * thk, padding + hg);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg - thk},
                    {x: padding + 2 * wg + 5 * thk + 27, y: padding + hg - thk - 15},
                    {x: padding + 2 * wg + 5 * thk + 33, y: padding + hg - thk - 15},
                    {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg},
                    {x: padding + 2 * wg + 5 * thk + 27, y: padding + hg + 15},
                    {x: padding + 2 * wg + 5 * thk + 33, y: padding + hg + 15},
                    {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg},
                {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg - thk - 15 - 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg + 15 + 40},
                {x: padding + 2 * wg + 5 * thk + 30, y: padding + hg + 15}
            ])).attr("id", "BCEFSketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchTHKRN")
                .attr("startOffset", "50%").text(thkrn);

            // 焊缝细节
            drawLine(padding + 3.75 * wg, padding + hg, padding + 3.75 * wg, padding + 3 * hg);
            drawLine(padding + 3.75 * wg - thk, padding + hg, padding + 3.75 * wg - thk, padding + 3 * hg);
            svg.append("path").attr("d", line([
                {x: padding + 3.75 * wg - thk, y: height / 2 - 1.5 * thk - thk},
                {x: padding + 3.75 * wg - 2 * thk, y: height / 2 - 1.5 * thk},
                {x: padding + 3.75 * wg - thk, y: height / 2 - thk / 2},
                {x: padding + 3.75 * wg - thk, y: height / 2 + thk / 2},
                {x: padding + 3.75 * wg - 2 * thk, y: height / 2 + 1.5 * thk},
                {x: padding + 3.75 * wg - thk, y: height / 2 + 1.5 * thk + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3.75 * wg - 2 * thk, y: height / 2 - 1.5 * thk},
                {x: padding + 3.75 * wg - 8 * thk, y: height / 2 - 1.5 * thk},
                {x: padding + 3.75 * wg - 8 * thk, y: height / 2 + 1.5 * thk},
                {x: padding + 3.75 * wg - 2 * thk, y: height / 2 + 1.5 * thk}
            ])).classed("sketch", true);

            // ti1
            extLineRightH(padding + 3.75 * wg - thk, height / 2 - 0.5 * thk);
            extLineRightH(padding + 3.75 * wg - thk, height / 2 - 2.5 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 2.5 * thk},
                    {x: padding + 3.75 * wg - thk + 28, y: height / 2 - 2.5 * thk - 10},
                    {x: padding + 3.75 * wg - thk + 32, y: height / 2 - 2.5 * thk - 10},
                    {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 2.5 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 0.5 * thk},
                    {x: padding + 3.75 * wg - thk + 28, y: height / 2 - 0.5 * thk + 10},
                    {x: padding + 3.75 * wg - thk + 32, y: height / 2 - 0.5 * thk + 10},
                    {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 0.5 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 0.5 * thk + 10 + 5},
                {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 2.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 2.5 * thk - 10},
                {x: padding + 3.75 * wg - thk + 30, y: height / 2 - 2.5 * thk - 10 - 40}
            ])).attr("id", "BCEFSketchTI1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchTI1")
                .attr("startOffset", "50%").text("ti");

            // ti2
            drawLine(padding + 3.75 * wg - thk + 3, height / 2 + 2.5 * thk + 3, padding + 3.75 * wg - thk + 40, height / 2 + 2.5 * thk + 40);
            drawLine(padding + 3.75 * wg - thk + 3, height / 2 + 0.5 * thk + 3, padding + 3.75 * wg - thk + 40 + thk, height / 2 + 0.5 * thk + 40 + thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3.75 * wg - thk + 40, y: height / 2 + 0.5 * thk + 40},
                    {x: padding + 3.75 * wg - thk + 40 + 10, y: height / 2 + 0.5 * thk + 40 + 2},
                    {x: padding + 3.75 * wg - thk + 40 + 10, y: height / 2 + 0.5 * thk + 40 - 2},
                    {x: padding + 3.75 * wg - thk + 40, y: height / 2 + 0.5 * thk + 40}
                ])).attr("transform", "rotate(" + -45 + ", " + (padding + 3.75 * wg - thk + 40) + " " + (height / 2 + 0.5 * thk + 40) + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3.75 * wg - 2 * thk + 40, y: height / 2 + 1.5 * thk + 40},
                    {x: padding + 3.75 * wg - 2 * thk + 40 + 10, y: height / 2 + 1.5 * thk + 40 + 2},
                    {x: padding + 3.75 * wg - 2 * thk + 40 + 10, y: height / 2 + 1.5 * thk + 40 - 2},
                    {x: padding + 3.75 * wg - 2 * thk + 40, y: height / 2 + 1.5 * thk + 40}
                ])).attr("transform", "rotate(" + 135 + ", " + (padding + 3.75 * wg - 2 * thk + 40) + " " + (height / 2 + 1.5 * thk + 40) + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 3.75 * wg - 2 * thk + 40 - 10 - 8, y: height / 2 + 1.5 * thk + 40},
                    {x: padding + 3.75 * wg - 2 * thk + 40 + 2 * thk, y: height / 2 + 1.5 * thk + 40}
                ])).attr("transform", "rotate(" + -45 + ", " + (padding + 3.75 * wg - 2 * thk + 40) + " " + (height / 2 + 1.5 * thk + 40) + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 3.75 * wg - thk + 40 + 10, y: height / 2 + 0.5 * thk + 40},
                    {x: padding + 3.75 * wg - thk + 40 + 10 + 40, y: height / 2 + 0.5 * thk + 40}
                ])).attr("id", "BCEFSketchTI2").attr("transform", "rotate(" + -45 + ", " + (padding + 3.75 * wg - thk + 40) + " " + (height / 2 + 0.5 * thk + 40) + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchTI2")
                .attr("startOffset", "50%").text("ti");

            // ti
            svg.append("path")
                .attr("d", line([
                    {x: padding + 3.75 * wg - 6 * thk - 30, y: height - padding - hg},
                    {x: padding + 3.75 * wg - 6 * thk + 30, y: height - padding - hg}
                ])).attr("id", "BCEFSketchTIT");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEFSketchTIT")
                .attr("startOffset", "50%").text(ti);
        }

        currentTabIndex = bcefd2d3.tabs('getTabIndex', bcefd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            bcef2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcef").length > 0) {
                    bcef2d();
                }
            });
        }
        bcefd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcef2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcef").length > 0) {
                            bcef2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 大锥角(α≥70°)带加强圈锥壳计算",
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

                if (index === 4) {
                    $(ed.target).combobox("loadData", BCEFSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCEFSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCEFSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCEFSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCEFCCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCEFCType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCEFCSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCEFCName);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BCEFRCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCEFRType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCEFRSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BCEFRName);
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

                    // sketch
                    bcefSketch.empty();

                    // model
                    bcefModel.empty();

                    // sketch
                    currentTabIndex = bcefd2d3.tabs('getTabIndex', bcefd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcef2d();
                        bcefSketch.off("resize").on("resize", function () {
                            if ($("#bcef").length > 0) {
                                bcef2d();
                            }
                        });
                    }
                    bcefd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcef2d();
                                bcefSketch.off("resize").on("resize", function () {
                                    if ($("#bcef").length > 0) {
                                        bcef2d();
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
                    if (index === 1) {

                        BCEFDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCEFSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEFSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEFSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCEFCCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCEFCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEFCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEFCName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCEFRCategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCEFRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCEFRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCEFRName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFSCategory = [];
                                BCEFCCategory = [];
                                BCEFRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCEFDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCEFSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCEFCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCEFRCategory[index] = {
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

                    // category 改变，重新加载type
                    else if (index === 4) {

                        BCEFSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEFSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEFSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFSCategoryVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFSType = [];
                                $(result).each(function (index, element) {
                                    BCEFSType[index] = {
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

                    // type 改变，重新加载 std
                    else if (index === 5) {

                        BCEFSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEFSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFSCategoryVal,
                                type: BCEFSTypeVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFSSTD = [];
                                $(result).each(function (index, element) {
                                    BCEFSSTD[index] = {
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

                    // std 改变，重新加载 Name
                    else if (index === 6) {

                        BCEFSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEFSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFSCategoryVal,
                                type: BCEFSTypeVal,
                                std: BCEFSSTDVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFSName = [];
                                $(result).each(function (index, element) {
                                    BCEFSName[index] = {
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

                    // category 改变，重新加载type
                    else if (index === 12) {

                        BCEFCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCEFCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEFCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEFCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFCCategoryVal,
                                temp: BCEFDT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFCType = [];
                                $(result).each(function (index, element) {
                                    BCEFCType[index] = {
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

                    // type 改变，重新加载 std
                    else if (index === 13) {

                        BCEFCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEFCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEFCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFCCategoryVal,
                                type: BCEFCTypeVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFCSTD = [];
                                $(result).each(function (index, element) {
                                    BCEFCSTD[index] = {
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

                    // std 改变，重新加载 Name
                    else if (index === 14) {

                        BCEFCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEFCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFCCategoryVal,
                                type: BCEFCTypeVal,
                                std: BCEFCSTDVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFCName = [];
                                $(result).each(function (index, element) {
                                    BCEFCName[index] = {
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

                    // category 改变，重新加载type
                    else if (index === 20) {

                        BCEFRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCEFRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCEFRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCEFRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFRCategoryVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFRType = [];
                                $(result).each(function (index, element) {
                                    BCEFRType[index] = {
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

                    // type 改变，重新加载 std
                    else if (index === 21) {

                        BCEFRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCEFRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCEFRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFRCategoryVal,
                                type: BCEFRTypeVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFRSTD = [];
                                $(result).each(function (index, element) {
                                    BCEFRSTD[index] = {
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

                    // std 改变，重新加载 Name
                    else if (index === 22) {

                        BCEFRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCEFRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEFRCategoryVal,
                                type: BCEFRTypeVal,
                                std: BCEFRSTDVal,
                                temp: BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEFRName = [];
                                $(result).each(function (index, element) {
                                    BCEFRName[index] = {
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

                    // name 及其他修改项改变，获取数据，并计算
                    else {

                        // 设计压力
                        let BCEFPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCEFPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BCEFPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCEFPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCEFTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCEFTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCEFSNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let BCEFDS, BCEFSThkMin, BCEFSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BCEFSCategoryVal,
                                "type": BCEFSTypeVal,
                                "std": BCEFSSTDVal,
                                "name": BCEFSNameVal,
                                "temp": BCEFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BCEFDS = parseFloat(result.density);
                                BCEFSThkMin = parseFloat(result.thkMin);
                                BCEFSThkMax = parseFloat(result.thkMax);

                                // 筒体内直径
                                let BCEFDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    BCEFDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcef2d("ϕ" + BCEFDSI);
                                    bcefSketch.off("resize").on("resize", function () {
                                        if ($("#bcef").length > 0) {
                                            bcef2d("ϕ" + BCEFDSI);
                                        }
                                    });
                                }
                                bcefd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcef2d("ϕ" + BCEFDSI);
                                            bcefSketch.off("resize").on("resize", function () {
                                                if ($("#bcef").length > 0) {
                                                    bcef2d("ϕ" + BCEFDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 筒体名义厚度
                                let BCEFTHKSN;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > BCEFSThkMin
                                    && parseFloat(rows[9][columns[0][1].field]) <= BCEFSThkMax) {
                                    BCEFTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= BCEFSThkMin) {
                                    south.html("筒体材料厚度不能小于等于 " + BCEFSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > BCEFSThkMax) {
                                    south.html("筒体材料厚度不能大于 " + BCEFSThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN);
                                    bcefSketch.off("resize").on("resize", function () {
                                        if ($("#bcef").length > 0) {
                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN);
                                        }
                                    });
                                }
                                bcefd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN);
                                            bcefSketch.off("resize").on("resize", function () {
                                                if ($("#bcef").length > 0) {
                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCEFOST, BCEFOS, BCEFRSEL, BCEFCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BCEFSCategoryVal,
                                        "type": BCEFSTypeVal,
                                        "std": BCEFSSTDVal,
                                        "name": BCEFSNameVal,
                                        "thk": BCEFTHKSN,
                                        "temp": BCEFDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BCEFDSI + 2 * BCEFTHKSN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BCEFOST = parseFloat(result.ot);
                                        if (BCEFOST < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEFOS = parseFloat(result.o);
                                        if (BCEFOS < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEFRSEL = parseFloat(result.rel);
                                        if (BCEFRSEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEFCS1 = parseFloat(result.c1);
                                        if (BCEFCS1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // 筒体焊接接头系数
                                        let BCEFES;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                            BCEFES = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 筒体腐蚀裕量
                                        let BCEFCS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < BCEFTHKSN) {
                                            BCEFCS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= BCEFTHKSN) {
                                            south.html("筒体腐蚀裕量不能大于等于 " + BCEFTHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 封头材料名称
                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                            BCEFCNameVal = rows[15][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取封头材料密度、最大最小厚度
                                        let BCEFDC, BCEFCThkMin, BCEFCThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCEFCCategoryVal,
                                                "type": BCEFCTypeVal,
                                                "std": BCEFCSTDVal,
                                                "name": BCEFCNameVal,
                                                "temp": BCEFDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCEFDC = parseFloat(result.density);
                                                BCEFCThkMin = parseFloat(result.thkMin);
                                                BCEFCThkMax = parseFloat(result.thkMax);

                                                // 半顶角 alpha
                                                let BCEFALPHA;
                                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                    BCEFALPHA = parseFloat(rows[16][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°");
                                                    bcefSketch.off("resize").on("resize", function () {
                                                        if ($("#bcef").length > 0) {
                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°");
                                                        }
                                                    });
                                                }
                                                bcefd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°");
                                                            bcefSketch.off("resize").on("resize", function () {
                                                                if ($("#bcef").length > 0) {
                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 封头名义厚度
                                                let BCEFTHKCN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCEFCThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCEFCThkMax) {
                                                    BCEFTHKCN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCEFCThkMin) {
                                                    south.html("封头材料厚度不能小于等于 " + BCEFCThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCEFCThkMax) {
                                                    south.html("封头材料厚度不能大于 " + BCEFCThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN);
                                                    bcefSketch.off("resize").on("resize", function () {
                                                        if ($("#bcef").length > 0) {
                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN);
                                                        }
                                                    });
                                                }
                                                bcefd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN);
                                                            bcefSketch.off("resize").on("resize", function () {
                                                                if ($("#bcef").length > 0) {
                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BCEFOCT, BCEFOC, BCEFRCEL, BCEFCC1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCEFCCategoryVal,
                                                        "type": BCEFCTypeVal,
                                                        "std": BCEFCSTDVal,
                                                        "name": BCEFCNameVal,
                                                        "thk": BCEFTHKCN,
                                                        "temp": BCEFDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BCEFDSI
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCEFOCT = parseFloat(result.ot);
                                                        if (BCEFOCT < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEFOC = parseFloat(result.o);
                                                        if (BCEFOC < 0) {
                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEFRCEL = parseFloat(result.rel);
                                                        if (BCEFRCEL < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEFCC1 = parseFloat(result.c1);
                                                        if (BCEFCC1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // 封头焊接接头系数
                                                        let BCEFEC;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                            BCEFEC = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 封头腐蚀裕量
                                                        let BCEFCC2;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) < BCEFTHKCN) {
                                                            BCEFCC2 = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) >= BCEFTHKCN) {
                                                            south.html("封头腐蚀裕量不能大于等于 " + BCEFTHKCN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 加强圈材料名称
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            BCEFRNameVal = rows[23][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // AJAX 获取加强圈材料密度、最大最小厚度
                                                        let BCEFDR, BCEFRThkMin, BCEFRThkMax;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_index.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCEFRCategoryVal,
                                                                "type": BCEFRTypeVal,
                                                                "std": BCEFRSTDVal,
                                                                "name": BCEFRNameVal,
                                                                "temp": BCEFDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCEFDR = parseFloat(result.density);
                                                                BCEFRThkMin = parseFloat(result.thkMin);
                                                                BCEFRThkMax = parseFloat(result.thkMax);

                                                                // 加强圈名义厚度
                                                                let BCEFTHKRN;
                                                                if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > BCEFRThkMin
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= BCEFRThkMax) {
                                                                    BCEFTHKRN = parseFloat(rows[24][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= BCEFRThkMin) {
                                                                    south.html("加强圈材料厚度不能小于等于 " + BCEFRThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > BCEFRThkMax) {
                                                                    south.html("加强圈材料厚度不能大于 " + BCEFRThkMax + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN);
                                                                    bcefSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcef").length > 0) {
                                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                bcefd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN);
                                                                            bcefSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcef").length > 0) {
                                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                let BCEFORT, BCEFOR, BCEFRREL, BCEFCR1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCEFRCategoryVal,
                                                                        "type": BCEFRTypeVal,
                                                                        "std": BCEFRSTDVal,
                                                                        "name": BCEFRNameVal,
                                                                        "thk": BCEFTHKRN,
                                                                        "temp": BCEFDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": 100000
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCEFORT = parseFloat(result.ot);
                                                                        if (BCEFORT < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCEFOR = parseFloat(result.o);
                                                                        if (BCEFOR < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCEFRREL = parseFloat(result.rel);
                                                                        if (BCEFRREL < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCEFCR1 = parseFloat(result.c1);
                                                                        if (BCEFCR1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 加强圈高度
                                                                        let BCEFHRN;
                                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) <= 16 * BCEFTHKRN) {
                                                                            BCEFHRN = parseFloat(rows[25][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) > 16 * BCEFTHKRN) {
                                                                            south.html("加强圈高度不能大于 " + 16 * BCEFTHKRN + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN);
                                                                            bcefSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcef").length > 0) {
                                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN);
                                                                                }
                                                                            });
                                                                        }
                                                                        bcefd2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN);
                                                                                    bcefSketch.off("resize").on("resize", function () {
                                                                                        if ($("#bcef").length > 0) {
                                                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // 加强圈腐蚀裕量
                                                                        let BCEFCR2;
                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) < BCEFTHKRN / 2) {
                                                                            BCEFCR2 = parseFloat(rows[26][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) >= BCEFTHKRN / 2) {
                                                                            south.html("加强圈腐蚀裕量不能大于等于 " + BCEFTHKRN / 2 + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 过程参数
                                                                        let BCEFPC = BCEFPD + BCEFPS;
                                                                        let BCEFCS = BCEFCS1 + BCEFCS2;
                                                                        let BCEFTHKSE = BCEFTHKSN - BCEFCS;
                                                                        let BCEFCC = BCEFCC1 + BCEFCC2;
                                                                        let BCEFTHKCE = BCEFTHKCN - BCEFCC;
                                                                        let BCEFCR = BCEFCR1 + 2 * BCEFCR2;
                                                                        let BCEFTHKRE = BCEFTHKRN - BCEFCR;
                                                                        let BCEFHRE = BCEFHRN - BCEFCR2;
                                                                        let BCEFAACT = BCEFTHKRE * BCEFHRE;

                                                                        // 封头计算及校核
                                                                        let BCEFTHKCC = BCEFPC * BCEFDSI / (2 * BCEFOCT * BCEFEC - BCEFPC) / Math.cos(BCEFALPHA / 180 * Math.PI);
                                                                        let BCEFTHKCD = BCEFTHKCC + BCEFCC2;
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "封头所需厚度：" + (BCEFTHKCD + BCEFCC1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        let BCEFTHKCCHK;
                                                                        if (BCEFTHKCN >= (BCEFTHKCD + BCEFCC1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEFTHKCN + " mm" +
                                                                                "</span>");
                                                                            BCEFTHKCCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEFTHKCN + " mm" +
                                                                                "</span>");
                                                                            BCEFTHKCCHK = "不合格";
                                                                        }

                                                                        // 筒体计算及校核
                                                                        let BCEFTHKSC = BCEFPC * BCEFDSI / (2 * BCEFOST * BCEFES - BCEFPC);
                                                                        let BCEFTHKSD = BCEFTHKSC + BCEFCS2;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "筒体所需厚度：" + (BCEFTHKSD + BCEFCS1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        let BCEFTHKSCHK;
                                                                        if (BCEFTHKSN >= (BCEFTHKSD + BCEFCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEFTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCEFTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEFTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCEFTHKSCHK = "不合格";
                                                                        }

                                                                        // 加强圈计算及校核
                                                                        let BCEFBETAA = (2 * BCEFOST * BCEFES / BCEFPC - 1) * BCEFTHKSE / BCEFDSI;
                                                                        let BCEFBETA = 0.4 * Math.sqrt(BCEFDSI / BCEFTHKSE) * Math.tan(BCEFALPHA / 180 * Math.PI) - 0.25;
                                                                        let BCEFAR = BCEFPC * BCEFDSI * BCEFDSI * Math.tan(BCEFALPHA / 180 * Math.PI)
                                                                            / (8 * BCEFOCT * BCEFEC)
                                                                            * (1 - (BCEFBETAA + 0.25) / (BCEFBETA + 0.25));
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "加强圈所需截面积：" + BCEFAR.toFixed(2) + " mm²" +
                                                                            "</span>");
                                                                        let BCEFACHK;
                                                                        if (BCEFAACT >= BCEFAR) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际截面积：" + BCEFAACT.toFixed(2) + " mm²" +
                                                                                "</span>");
                                                                            BCEFACHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际截面积：" + BCEFAACT.toFixed(2) + " mm²" +
                                                                                "</span>");
                                                                            BCEFACHK = "不合格";
                                                                        }
                                                                        let BCEFTI = 4 * BCEFAR / BCEFDSI;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "加强圈承载焊缝最小有效宽度∑ti：" + BCEFTI.toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN, "Σti≥" + BCEFTI.toFixed(2));
                                                                            bcefSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcef").length > 0) {
                                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN, "Σti≥" + BCEFTI.toFixed(2));
                                                                                }
                                                                            });
                                                                        }
                                                                        bcefd2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN, "Σti≥" + BCEFTI.toFixed(2));
                                                                                    bcefSketch.off("resize").on("resize", function () {
                                                                                        if ($("#bcef").length > 0) {
                                                                                            bcef2d("ϕ" + BCEFDSI, BCEFTHKSN, BCEFALPHA + "°", BCEFTHKCN, BCEFTHKRN, BCEFHRN, "Σti≥" + BCEFTI.toFixed(2));
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // 压力试验
                                                                        let BCEFPCT, BCEFPST, BCEFPT;
                                                                        if (BCEFTest === "液压试验") {
                                                                            BCEFPCT = Math.max(1.25 * BCEFPD * BCEFOC / BCEFOCT, 0.05);
                                                                            BCEFPST = Math.max(1.25 * BCEFPD * BCEFOS / BCEFOST, 0.05);
                                                                            BCEFPT = Math.min(BCEFPCT, BCEFPST);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCEFPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (BCEFTest === "气压试验") {
                                                                            BCEFPCT = Math.max(1.10 * BCEFPD * BCEFOC / BCEFOCT, 0.05);
                                                                            BCEFPST = Math.max(1.10 * BCEFPD * BCEFOS / BCEFOST, 0.05);
                                                                            BCEFPT = Math.min(BCEFPCT, BCEFPST);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCEFPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }

                                                                        // MAWP
                                                                        let BCEFB2 = 1.6 * BCEFAACT / (BCEFTHKSE * Math.sqrt(BCEFDSI * BCEFTHKSE)) * (BCEFOCT * BCEFEC) / (BCEFOST * BCEFES);
                                                                        let BCEFB3 = 0.25;
                                                                        let BCEFBETA0 = ((0.4 * Math.sqrt(BCEFDSI / BCEFTHKSE) * Math.tan(BCEFALPHA / 180 * Math.PI)) - BCEFB3) / (BCEFB2 + 1);
                                                                        let BCEFBETA2 = Math.max(0.5, BCEFBETA0);
                                                                        let BCEFMAWPR = (2 * BCEFOST * BCEFES * BCEFTHKSE) / (BCEFDSI * BCEFBETA2 + BCEFTHKSE) - BCEFPS;
                                                                        let BCEFMAWPS = (2 * BCEFOST * BCEFES * BCEFTHKSE) / (BCEFDSI + BCEFTHKSE) - BCEFPS;
                                                                        let BCEFMAWPC = (2 * BCEFOCT * BCEFEC * BCEFTHKCE) / (BCEFDSI / Math.cos(BCEFALPHA / 180 * Math.PI) + BCEFTHKCE) - BCEFPS;
                                                                        let BCEFMAWP = Math.min(BCEFMAWPC, BCEFMAWPR, BCEFMAWPS);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "MAWP：" + BCEFMAWP.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                        // docx
                                                                        let BCEFPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "bcefdocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "BCEF",

                                                                                    pd: BCEFPD,
                                                                                    t: BCEFDT,
                                                                                    ps: BCEFPS,

                                                                                    stds: BCEFSSTDVal,
                                                                                    names: BCEFSNameVal,
                                                                                    dsi: BCEFDSI,
                                                                                    thksn: BCEFTHKSN,
                                                                                    es: BCEFES,
                                                                                    cs2: BCEFCS2,

                                                                                    stdc: BCEFCSTDVal,
                                                                                    namec: BCEFCNameVal,
                                                                                    alpha: BCEFALPHA,
                                                                                    thkcn: BCEFTHKCN,
                                                                                    cc2: BCEFCC2,
                                                                                    ec: BCEFEC,

                                                                                    stdr: BCEFRSTDVal,
                                                                                    namer: BCEFRNameVal,
                                                                                    thkrn: BCEFTHKRN,
                                                                                    hrn: BCEFHRN,
                                                                                    cr2: BCEFCR2,

                                                                                    test: BCEFTest,

                                                                                    ds: BCEFDS.toFixed(4),
                                                                                    cs1: BCEFCS1.toFixed(4),
                                                                                    ost: BCEFOST.toFixed(4),
                                                                                    os: BCEFOS.toFixed(4),
                                                                                    rsel: BCEFRSEL.toFixed(4),

                                                                                    dc: BCEFDC.toFixed(4),
                                                                                    cc1: BCEFCC1.toFixed(4),
                                                                                    oct: BCEFOCT.toFixed(4),
                                                                                    oc: BCEFOC.toFixed(4),
                                                                                    rcel: BCEFRCEL.toFixed(4),

                                                                                    dr: BCEFDR.toFixed(4),
                                                                                    cr1: BCEFCR1.toFixed(4),

                                                                                    pc: BCEFPC.toFixed(4),

                                                                                    cs: BCEFCS,
                                                                                    thkse: BCEFTHKSE.toFixed(4),

                                                                                    cc: BCEFCC.toFixed(4),
                                                                                    thkce: BCEFTHKCE.toFixed(4),

                                                                                    cr: BCEFCR.toFixed(4),
                                                                                    thkre: BCEFTHKRE.toFixed(4),
                                                                                    hre: BCEFHRE.toFixed(4),
                                                                                    aact: BCEFAACT.toFixed(4),

                                                                                    thkcc: BCEFTHKCC.toFixed(4),
                                                                                    thkcd: BCEFTHKCD.toFixed(4),
                                                                                    thkcchk: BCEFTHKCCHK,

                                                                                    thksc: BCEFTHKSC.toFixed(4),
                                                                                    thksd: BCEFTHKSD.toFixed(4),
                                                                                    thkschk: BCEFTHKSCHK,

                                                                                    betaa: BCEFBETAA.toFixed(4),
                                                                                    beta: BCEFBETA.toFixed(4),
                                                                                    ar: BCEFAR.toFixed(4),
                                                                                    achk: BCEFACHK,
                                                                                    ti: BCEFTI.toFixed(4),

                                                                                    pct: BCEFPCT.toFixed(4),
                                                                                    pst: BCEFPST.toFixed(4),
                                                                                    pt: BCEFPT.toFixed(4),

                                                                                    b2: BCEFB2.toFixed(4),
                                                                                    b3: BCEFB3.toFixed(4),
                                                                                    beta0: BCEFBETA0.toFixed(4),
                                                                                    beta2: BCEFBETA2.toFixed(4),
                                                                                    mawpr: BCEFMAWPR.toFixed(4),
                                                                                    mawpc: BCEFMAWPC.toFixed(4),
                                                                                    mawps: BCEFMAWPS.toFixed(4),
                                                                                    mawp: BCEFMAWP.toFixed(4)
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
                                                                                        BCEFPayJS.dialog({
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
                                                                                                    BCEFPayJS.dialog("close");
                                                                                                    BCEFPayJS.dialog("clear");
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
                                                                                                                BCEFPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        BCEFPayJS.dialog('close');
                                                                                                                        BCEFPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});