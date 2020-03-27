$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aagbSketch = $("#d2");
    let aagbModel = $("#d3");
    let aagbd2d3 = $('#d2d3');

    $("#cal").html("<table id='aagb'></table>");
    let pg = $("#aagb");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/a/a/g/b/AAGB.json", function (result) {

        let AAGBDT,
            AAGBSCategory, AAGBSCategoryVal, AAGBSType, AAGBSTypeVal, AAGBSSTD, AAGBSSTDVal, AAGBSName, AAGBSNameVal,
            AAGBCCategory, AAGBCCategoryVal, AAGBCType, AAGBCTypeVal, AAGBCSTD, AAGBCSTDVal, AAGBCName, AAGBCNameVal,
            AAGBRCategory, AAGBRCategoryVal, AAGBRType, AAGBRTypeVal, AAGBRSTD, AAGBRSTDVal, AAGBRName, AAGBRNameVal,
            columns, rows, ed;

        function aagb2d(dsi = "ϕDsi", thksn = "δsn", alpha = "α", thkcn = "δcn", thkrn = "δrn", hrn = "Hrn", ti = "Σti") {

            aagbSketch.empty();

            let width = aagbSketch.width();
            let height = aagbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAGBSVG").attr("height", height);

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
            ])).attr("id", "AAGBSketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchDSI").attr("startOffset", "50%").text(dsi);

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
            ])).attr("id", "AAGBSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ).attr("id", "AAGBSketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "AAGBSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchTHKCN").attr("startOffset", "50%").text(thkcn);

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
            ])).attr("id", "AAGBSketchHRN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchHRN").attr("startOffset", "50%").text(hrn);

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
            ])).attr("id", "AAGBSketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchTHKRN")
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
            ])).attr("id", "AAGBSketchTI1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchTI1")
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
                ])).attr("id", "AAGBSketchTI2").attr("transform", "rotate(" + -45 + ", " + (padding + 3.75 * wg - thk + 40) + " " + (height / 2 + 0.5 * thk + 40) + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchTI2")
                .attr("startOffset", "50%").text("ti");

            // ti
            svg.append("path")
                .attr("d", line([
                    {x: padding + 3.75 * wg - 6 * thk - 30, y: height - padding - hg},
                    {x: padding + 3.75 * wg - 6 * thk + 30, y: height - padding - hg}
                ])).attr("id", "AAGBSketchTIT");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGBSketchTIT")
                .attr("startOffset", "50%").text(ti);
        }

        currentTabIndex = aagbd2d3.tabs('getTabIndex', aagbd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            aagb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aagb").length > 0) {
                    aagb2d();
                }
            });
        }
        aagbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aagb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aagb").length > 0) {
                            aagb2d();
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
                    $(ed.target).combobox("loadData", AAGBSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAGBSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAGBSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAGBSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", AAGBCCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAGBCType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAGBCSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAGBCName);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", AAGBRCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", AAGBRType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", AAGBRSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", AAGBRName);
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
                    aagbSketch.empty();

                    // model
                    aagbModel.empty();

                    // sketch
                    currentTabIndex = aagbd2d3.tabs('getTabIndex', aagbd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        aagb2d();
                        aagbSketch.off("resize").on("resize", function () {
                            if ($("#aagb").length > 0) {
                                aagb2d();
                            }
                        });
                    }
                    aagbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aagb2d();
                                aagbSketch.off("resize").on("resize", function () {
                                    if ($("#aagb").length > 0) {
                                        aagb2d();
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

                        AAGBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAGBSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAGBSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGBSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGBSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        AAGBCCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAGBCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAGBCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGBCName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        AAGBRCategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAGBRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAGBRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAGBRName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBSCategory = [];
                                AAGBCCategory = [];
                                AAGBRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAGBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAGBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAGBCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAGBRCategory[index] = {
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

                        AAGBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAGBSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGBSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBSCategoryVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBSType = [];
                                $(result).each(function (index, element) {
                                    AAGBSType[index] = {
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

                        AAGBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGBSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBSCategoryVal,
                                type: AAGBSTypeVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBSSTD = [];
                                $(result).each(function (index, element) {
                                    AAGBSSTD[index] = {
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

                        AAGBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBSCategoryVal,
                                type: AAGBSTypeVal,
                                std: AAGBSSTDVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBSName = [];
                                $(result).each(function (index, element) {
                                    AAGBSName[index] = {
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

                        AAGBCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAGBCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAGBCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGBCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBCCategoryVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBCType = [];
                                $(result).each(function (index, element) {
                                    AAGBCType[index] = {
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

                        AAGBCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAGBCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGBCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBCCategoryVal,
                                type: AAGBCTypeVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBCSTD = [];
                                $(result).each(function (index, element) {
                                    AAGBCSTD[index] = {
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

                        AAGBCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGBCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBCCategoryVal,
                                type: AAGBCTypeVal,
                                std: AAGBCSTDVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBCName = [];
                                $(result).each(function (index, element) {
                                    AAGBCName[index] = {
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

                        AAGBRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAGBRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAGBRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAGBRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBRCategoryVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBRType = [];
                                $(result).each(function (index, element) {
                                    AAGBRType[index] = {
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

                        AAGBRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAGBRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAGBRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBRCategoryVal,
                                type: AAGBRTypeVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBRSTD = [];
                                $(result).each(function (index, element) {
                                    AAGBRSTD[index] = {
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

                        AAGBRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAGBRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGBRCategoryVal,
                                type: AAGBRTypeVal,
                                std: AAGBRSTDVal,
                                temp: AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGBRName = [];
                                $(result).each(function (index, element) {
                                    AAGBRName[index] = {
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
                        let AAGBPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAGBPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAGBPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAGBPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAGBTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAGBTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAGBSNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let AAGBDS, AAGBSThkMin, AAGBSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAGBSCategoryVal,
                                "type": AAGBSTypeVal,
                                "std": AAGBSSTDVal,
                                "name": AAGBSNameVal,
                                "temp": AAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAGBDS = parseFloat(result.density);
                                AAGBSThkMin = parseFloat(result.thkMin);
                                AAGBSThkMax = parseFloat(result.thkMax);

                                // 筒体内直径
                                let AAGBDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAGBDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aagb2d("ϕ" + AAGBDSI);
                                    aagbSketch.off("resize").on("resize", function () {
                                        if ($("#aagb").length > 0) {
                                            aagb2d("ϕ" + AAGBDSI);
                                        }
                                    });
                                }
                                aagbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aagb2d("ϕ" + AAGBDSI);
                                            aagbSketch.off("resize").on("resize", function () {
                                                if ($("#aagb").length > 0) {
                                                    aagb2d("ϕ" + AAGBDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 筒体名义厚度
                                let AAGBTHKSN;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAGBSThkMin
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAGBSThkMax) {
                                    AAGBTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAGBSThkMin) {
                                    south.html("筒体材料厚度不能小于等于 " + AAGBSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAGBSThkMax) {
                                    south.html("筒体材料厚度不能大于 " + AAGBSThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN);
                                    aagbSketch.off("resize").on("resize", function () {
                                        if ($("#aagb").length > 0) {
                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN);
                                        }
                                    });
                                }
                                aagbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN);
                                            aagbSketch.off("resize").on("resize", function () {
                                                if ($("#aagb").length > 0) {
                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAGBOST, AAGBOS, AAGBOST1, AAGBRSEL, AAGBCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAGBSCategoryVal,
                                        "type": AAGBSTypeVal,
                                        "std": AAGBSSTDVal,
                                        "name": AAGBSNameVal,
                                        "thk": AAGBTHKSN,
                                        "temp": AAGBDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAGBDSI + 2 * AAGBTHKSN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAGBOST = parseFloat(result.ot);
                                        if (AAGBOST < 0) {
                                            south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGBOS = parseFloat(result.o);
                                        if (AAGBOS < 0) {
                                            south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGBRSEL = parseFloat(result.rel);
                                        if (AAGBRSEL < 0) {
                                            south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGBCS1 = parseFloat(result.c1);
                                        if (AAGBCS1 < 0) {
                                            south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGBOST1 = parseFloat(result.ot1);

                                        // 筒体焊接接头系数
                                        let AAGBES;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                            AAGBES = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 筒体腐蚀裕量
                                        let AAGBCS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < AAGBTHKSN) {
                                            AAGBCS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= AAGBTHKSN) {
                                            south.html("筒体腐蚀裕量不能大于等于 " + AAGBTHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 封头材料名称
                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                            AAGBCNameVal = rows[15][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取封头材料密度、最大最小厚度
                                        let AAGBDC, AAGBCThkMin, AAGBCThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": AAGBCCategoryVal,
                                                "type": AAGBCTypeVal,
                                                "std": AAGBCSTDVal,
                                                "name": AAGBCNameVal,
                                                "temp": AAGBDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                AAGBDC = parseFloat(result.density);
                                                AAGBCThkMin = parseFloat(result.thkMin);
                                                AAGBCThkMax = parseFloat(result.thkMax);

                                                // 半顶角 alpha
                                                let AAGBALPHA;
                                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                    AAGBALPHA = parseFloat(rows[16][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°");
                                                    aagbSketch.off("resize").on("resize", function () {
                                                        if ($("#aagb").length > 0) {
                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°");
                                                        }
                                                    });
                                                }
                                                aagbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°");
                                                            aagbSketch.off("resize").on("resize", function () {
                                                                if ($("#aagb").length > 0) {
                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 封头名义厚度
                                                let AAGBTHKCN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAGBCThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAGBCThkMax) {
                                                    AAGBTHKCN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAGBCThkMin) {
                                                    south.html("封头材料厚度不能小于等于 " + AAGBCThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAGBCThkMax) {
                                                    south.html("封头材料厚度不能大于 " + AAGBCThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN);
                                                    aagbSketch.off("resize").on("resize", function () {
                                                        if ($("#aagb").length > 0) {
                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN);
                                                        }
                                                    });
                                                }
                                                aagbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN);
                                                            aagbSketch.off("resize").on("resize", function () {
                                                                if ($("#aagb").length > 0) {
                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let AAGBOCT, AAGBOC, AAGBOCT1, AAGBRCEL, AAGBCC1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAGBCCategoryVal,
                                                        "type": AAGBCTypeVal,
                                                        "std": AAGBCSTDVal,
                                                        "name": AAGBCNameVal,
                                                        "thk": AAGBTHKCN,
                                                        "temp": AAGBDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": AAGBDSI
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAGBOCT = parseFloat(result.ot);
                                                        if (AAGBOCT < 0) {
                                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGBOC = parseFloat(result.o);
                                                        if (AAGBOC < 0) {
                                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGBRCEL = parseFloat(result.rel);
                                                        if (AAGBRCEL < 0) {
                                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGBCC1 = parseFloat(result.c1);
                                                        if (AAGBCC1 < 0) {
                                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGBOCT1 = parseFloat(result.ot1);

                                                        // 封头焊接接头系数
                                                        let AAGBEC;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                            AAGBEC = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 封头腐蚀裕量
                                                        let AAGBCC2;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) < AAGBTHKCN) {
                                                            AAGBCC2 = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) >= AAGBTHKCN) {
                                                            south.html("封头腐蚀裕量不能大于等于 " + AAGBTHKCN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 加强圈材料名称
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            AAGBRNameVal = rows[23][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // AJAX 获取加强圈材料密度、最大最小厚度
                                                        let AAGBDR, AAGBRThkMin, AAGBRThkMax;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_index.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": AAGBRCategoryVal,
                                                                "type": AAGBRTypeVal,
                                                                "std": AAGBRSTDVal,
                                                                "name": AAGBRNameVal,
                                                                "temp": AAGBDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                AAGBDR = parseFloat(result.density);
                                                                AAGBRThkMin = parseFloat(result.thkMin);
                                                                AAGBRThkMax = parseFloat(result.thkMax);

                                                                // 加强圈名义厚度
                                                                let AAGBTHKRN;
                                                                if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > AAGBRThkMin
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= AAGBRThkMax) {
                                                                    AAGBTHKRN = parseFloat(rows[24][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= AAGBRThkMin) {
                                                                    south.html("加强圈材料厚度不能小于等于 " + AAGBRThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > AAGBRThkMax) {
                                                                    south.html("加强圈材料厚度不能大于 " + AAGBRThkMax + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN);
                                                                    aagbSketch.off("resize").on("resize", function () {
                                                                        if ($("#aagb").length > 0) {
                                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                aagbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN);
                                                                            aagbSketch.off("resize").on("resize", function () {
                                                                                if ($("#aagb").length > 0) {
                                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                let AAGBORT, AAGBOR, AAGBORT1, AAGBRREL, AAGBCR1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": AAGBRCategoryVal,
                                                                        "type": AAGBRTypeVal,
                                                                        "std": AAGBRSTDVal,
                                                                        "name": AAGBRNameVal,
                                                                        "thk": AAGBTHKRN,
                                                                        "temp": AAGBDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": 100000
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        AAGBORT = parseFloat(result.ot);
                                                                        if (AAGBORT < 0) {
                                                                            south.html("查询加强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAGBOR = parseFloat(result.o);
                                                                        if (AAGBOR < 0) {
                                                                            south.html("查询加强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAGBRREL = parseFloat(result.rel);
                                                                        if (AAGBRREL < 0) {
                                                                            south.html("查询加强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAGBCR1 = parseFloat(result.c1);
                                                                        if (AAGBCR1 < 0) {
                                                                            south.html("查询加强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAGBORT1 = parseFloat(result.ot1);

                                                                        // 加强圈高度
                                                                        let AAGBHRN;
                                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) <= 16 * AAGBTHKRN) {
                                                                            AAGBHRN = parseFloat(rows[25][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) > 16 * AAGBTHKRN) {
                                                                            south.html("加强圈高度不能大于 " + 16 * AAGBTHKRN + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN);
                                                                            aagbSketch.off("resize").on("resize", function () {
                                                                                if ($("#aagb").length > 0) {
                                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN);
                                                                                }
                                                                            });
                                                                        }
                                                                        aagbd2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN);
                                                                                    aagbSketch.off("resize").on("resize", function () {
                                                                                        if ($("#aagb").length > 0) {
                                                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // 加强圈腐蚀裕量
                                                                        let AAGBCR2;
                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) < AAGBTHKRN / 2) {
                                                                            AAGBCR2 = parseFloat(rows[26][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) >= AAGBTHKRN / 2) {
                                                                            south.html("加强圈腐蚀裕量不能大于等于 " + AAGBTHKRN / 2 + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 过程参数
                                                                        let AAGBPC = AAGBPD + AAGBPS;
                                                                        let AAGBCS = AAGBCS1 + AAGBCS2;
                                                                        let AAGBTHKSE = AAGBTHKSN - AAGBCS;
                                                                        let AAGBCC = AAGBCC1 + AAGBCC2;
                                                                        let AAGBTHKCE = AAGBTHKCN - AAGBCC;
                                                                        let AAGBCR = AAGBCR1 + 2 * AAGBCR2;
                                                                        let AAGBTHKRE = AAGBTHKRN - AAGBCR;
                                                                        let AAGBHRE = AAGBHRN - AAGBCR2;
                                                                        let AAGBAACT = AAGBTHKRE * AAGBHRE;

                                                                        // 封头计算及校核
                                                                        let AAGBTHKCC = AAGBPC * AAGBDSI / (2 * AAGBOCT * AAGBEC - AAGBPC) / Math.cos(AAGBALPHA / 180 * Math.PI);
                                                                        let AAGBTHKCD = AAGBTHKCC + AAGBCC2;
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "封头所需厚度：" + (AAGBTHKCD + AAGBCC1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        let AAGBTHKCCHK;
                                                                        if (AAGBTHKCN >= (AAGBTHKCD + AAGBCC1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + AAGBTHKCN + " mm" +
                                                                                "</span>");
                                                                            AAGBTHKCCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + AAGBTHKCN + " mm" +
                                                                                "</span>");
                                                                            AAGBTHKCCHK = "不合格";
                                                                        }

                                                                        // 筒体计算及校核
                                                                        let AAGBTHKSC = AAGBPC * AAGBDSI / (2 * AAGBOST * AAGBES - AAGBPC);
                                                                        let AAGBTHKSD = AAGBTHKSC + AAGBCS2;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "筒体所需厚度：" + (AAGBTHKSD + AAGBCS1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        let AAGBTHKSCHK;
                                                                        if (AAGBTHKSN >= (AAGBTHKSD + AAGBCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + AAGBTHKSN + " mm" +
                                                                                "</span>");
                                                                            AAGBTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + AAGBTHKSN + " mm" +
                                                                                "</span>");
                                                                            AAGBTHKSCHK = "不合格";
                                                                        }

                                                                        // 加强圈计算及校核
                                                                        let AAGBBETAA = (2 * AAGBOST * AAGBES / AAGBPC - 1) * AAGBTHKSE / AAGBDSI;
                                                                        let AAGBBETA = 0.4 * Math.sqrt(AAGBDSI / AAGBTHKSE) * Math.tan(AAGBALPHA / 180 * Math.PI) - 0.25;
                                                                        let AAGBAR = AAGBPC * AAGBDSI * AAGBDSI * Math.tan(AAGBALPHA / 180 * Math.PI)
                                                                            / (8 * AAGBOCT * AAGBEC)
                                                                            * (1 - (AAGBBETAA + 0.25) / (AAGBBETA + 0.25));
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "加强圈所需截面积：" + AAGBAR.toFixed(2) + " mm²" +
                                                                            "</span>");
                                                                        let AAGBACHK;
                                                                        if (AAGBAACT >= AAGBAR) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际截面积：" + AAGBAACT.toFixed(2) + " mm²" +
                                                                                "</span>");
                                                                            AAGBACHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际截面积：" + AAGBAACT.toFixed(2) + " mm²" +
                                                                                "</span>");
                                                                            AAGBACHK = "不合格";
                                                                        }
                                                                        let AAGBTI = 4 * AAGBAR / AAGBDSI;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "加强圈承载焊缝最小有效宽度∑ti：" + AAGBTI.toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN, "Σti≥" + AAGBTI.toFixed(2));
                                                                            aagbSketch.off("resize").on("resize", function () {
                                                                                if ($("#aagb").length > 0) {
                                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN, "Σti≥" + AAGBTI.toFixed(2));
                                                                                }
                                                                            });
                                                                        }
                                                                        aagbd2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN, "Σti≥" + AAGBTI.toFixed(2));
                                                                                    aagbSketch.off("resize").on("resize", function () {
                                                                                        if ($("#aagb").length > 0) {
                                                                                            aagb2d("ϕ" + AAGBDSI, AAGBTHKSN, AAGBALPHA + "°", AAGBTHKCN, AAGBTHKRN, AAGBHRN, "Σti≥" + AAGBTI.toFixed(2));
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // 压力试验
                                                                        let AAGBPCT, AAGBPST, AAGBPT;
                                                                        if (AAGBTest === "液压试验") {
                                                                            AAGBPCT = 1.25 * AAGBPD * AAGBOC / Math.max(AAGBOCT, AAGBOCT1);
                                                                            AAGBPST = 1.25 * AAGBPD * AAGBOS / Math.max(AAGBOST, AAGBOST1);
                                                                            AAGBPT = Math.min(AAGBPCT, AAGBPST);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + AAGBPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (AAGBTest === "气压试验") {
                                                                            AAGBPCT = 1.1 * AAGBPD * AAGBOC / Math.max(AAGBOCT, AAGBOCT1);
                                                                            AAGBPST = 1.1 * AAGBPD * AAGBOS / Math.max(AAGBOST, AAGBOST1);
                                                                            AAGBPT = Math.min(AAGBPCT, AAGBPST);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + AAGBPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }

                                                                        // MAWP
                                                                        let AAGBB2 = 1.6 * AAGBAACT / (AAGBTHKSE * Math.sqrt(AAGBDSI * AAGBTHKSE)) * (AAGBOCT * AAGBEC) / (AAGBOST * AAGBES);
                                                                        let AAGBB3 = 0.25;
                                                                        let AAGBBETA0 = ((0.4 * Math.sqrt(AAGBDSI / AAGBTHKSE) * Math.tan(AAGBALPHA / 180 * Math.PI)) - AAGBB3) / (AAGBB2 + 1);
                                                                        let AAGBBETA2 = Math.max(0.5, AAGBBETA0);
                                                                        let AAGBMAWPR = (2 * AAGBOST * AAGBES * AAGBTHKSE) / (AAGBDSI * AAGBBETA2 + AAGBTHKSE) - AAGBPS;
                                                                        let AAGBMAWPS = (2 * AAGBOST * AAGBES * AAGBTHKSE) / (AAGBDSI + AAGBTHKSE) - AAGBPS;
                                                                        let AAGBMAWPC = (2 * AAGBOCT * AAGBEC * AAGBTHKCE) / (AAGBDSI / Math.cos(AAGBALPHA / 180 * Math.PI) + AAGBTHKCE) - AAGBPS;
                                                                        let AAGBMAWP = Math.min(AAGBMAWPC, AAGBMAWPR, AAGBMAWPS);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "MAWP：" + AAGBMAWP.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                        // docx
                                                                        let AAGBPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "aagbdocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "AAGB",

                                                                                    pd: AAGBPD,
                                                                                    t: AAGBDT,
                                                                                    ps: AAGBPS,

                                                                                    stds: AAGBSSTDVal,
                                                                                    names: AAGBSNameVal,
                                                                                    dsi: AAGBDSI,
                                                                                    thksn: AAGBTHKSN,
                                                                                    es: AAGBES,
                                                                                    cs2: AAGBCS2,

                                                                                    stdc: AAGBCSTDVal,
                                                                                    namec: AAGBCNameVal,
                                                                                    alpha: AAGBALPHA,
                                                                                    thkcn: AAGBTHKCN,
                                                                                    cc2: AAGBCC2,
                                                                                    ec: AAGBEC,

                                                                                    stdr: AAGBRSTDVal,
                                                                                    namer: AAGBRNameVal,
                                                                                    thkrn: AAGBTHKRN,
                                                                                    hrn: AAGBHRN,
                                                                                    cr2: AAGBCR2,

                                                                                    test: AAGBTest,

                                                                                    ds: AAGBDS.toFixed(4),
                                                                                    cs1: AAGBCS1.toFixed(4),
                                                                                    ost: AAGBOST.toFixed(4),
                                                                                    os: AAGBOS.toFixed(4),
                                                                                    rsel: AAGBRSEL.toFixed(4),
                                                                                    ost1: AAGBOST1.toFixed(4),

                                                                                    dc: AAGBDC.toFixed(4),
                                                                                    cc1: AAGBCC1.toFixed(4),
                                                                                    oct: AAGBOCT.toFixed(4),
                                                                                    oc: AAGBOC.toFixed(4),
                                                                                    rcel: AAGBRCEL.toFixed(4),
                                                                                    oct1: AAGBOCT1.toFixed(4),

                                                                                    dr: AAGBDR.toFixed(4),
                                                                                    cr1: AAGBCR1.toFixed(4),

                                                                                    pc: AAGBPC.toFixed(4),

                                                                                    cs: AAGBCS,
                                                                                    thkse: AAGBTHKSE.toFixed(4),

                                                                                    cc: AAGBCC.toFixed(4),
                                                                                    thkce: AAGBTHKCE.toFixed(4),

                                                                                    cr: AAGBCR.toFixed(4),
                                                                                    thkre: AAGBTHKRE.toFixed(4),
                                                                                    hre: AAGBHRE.toFixed(4),
                                                                                    aact: AAGBAACT.toFixed(4),

                                                                                    thkcc: AAGBTHKCC.toFixed(4),
                                                                                    thkcd: AAGBTHKCD.toFixed(4),
                                                                                    thkcchk: AAGBTHKCCHK,

                                                                                    thksc: AAGBTHKSC.toFixed(4),
                                                                                    thksd: AAGBTHKSD.toFixed(4),
                                                                                    thkschk: AAGBTHKSCHK,

                                                                                    betaa: AAGBBETAA.toFixed(4),
                                                                                    beta: AAGBBETA.toFixed(4),
                                                                                    ar: AAGBAR.toFixed(4),
                                                                                    achk: AAGBACHK,
                                                                                    ti: AAGBTI.toFixed(4),

                                                                                    pct: AAGBPCT.toFixed(4),
                                                                                    pst: AAGBPST.toFixed(4),
                                                                                    pt: AAGBPT.toFixed(4),

                                                                                    b2: AAGBB2.toFixed(4),
                                                                                    b3: AAGBB3.toFixed(4),
                                                                                    beta0: AAGBBETA0.toFixed(4),
                                                                                    beta2: AAGBBETA2.toFixed(4),
                                                                                    mawpr: AAGBMAWPR.toFixed(4),
                                                                                    mawpc: AAGBMAWPC.toFixed(4),
                                                                                    mawps: AAGBMAWPS.toFixed(4),
                                                                                    mawp: AAGBMAWP.toFixed(4)
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
                                                                                        AAGBPayJS.dialog({
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
                                                                                                    AAGBPayJS.dialog("close");
                                                                                                    AAGBPayJS.dialog("clear");
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
                                                                                                                AAGBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        AAGBPayJS.dialog('close');
                                                                                                                        AAGBPayJS.dialog('clear');
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