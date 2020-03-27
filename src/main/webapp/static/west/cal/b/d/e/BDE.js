$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bdeSketch = $("#d2");
    let bdeModel = $("#d3");
    let bded2d3 = $('#d2d3');

    $("#cal").html("<table id='bde'></table>");
    let pg = $("#bde");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/d/e/BDE.json", function (result) {

        let BDEDT,
            BDESCategory, BDESCategoryVal, BDESType, BDESTypeVal, BDESSTD, BDESSTDVal, BDESName, BDESNameVal,
            BDEPCategory, BDEPCategoryVal, BDEPType, BDEPTypeVal, BDEPSTD, BDEPSTDVal, BDEPName, BDEPNameVal,
            BDERCategory, BDERCategoryVal, BDERType, BDERTypeVal, BDERSTD, BDERSTDVal, BDERName, BDERNameVal,
            columns, rows, ed;

        // Sketch
        function bde2d(dsi = "ΦDsi", theta = "θ", thksn = "δsn",
                       dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", l = "L",
                       isPad, dro = "Φdro", thkrn = "δrn") {

            bdeSketch.empty();
            let width = bdeSketch.width();
            let height = bdeSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BDESVG").attr("height", height);

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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
            let padding = 60;
            let thk = 10;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            // 左侧主视图
            /*
                左侧主视图
                 */
            drawCenterLine(padding + wg, padding + hg - 10, padding + wg, padding + 3 * hg + 10);
            // 左侧接管
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - thk, y: padding + hg},
                {x: padding + 0.5 * wg - thk, y: padding + 3 * hg},
                {x: padding + 0.5 * wg, y: padding + 3 * hg},
                {x: padding + 0.5 * wg, y: padding + hg},
                {x: padding + 0.5 * wg - thk, y: padding + hg}
            ])).classed("sketch", true);
            drawLine(padding + 0.5 * wg, padding + hg, padding + wg, padding + hg);
            drawLine(padding + 0.5 * wg, padding + 3 * hg, padding + wg, padding + 3 * hg);
            // 右侧接管
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg},
                {x: padding + 1.5 * wg, y: padding + 2 * hg + thk},
                {x: padding + 1.5 * wg + thk, y: padding + 2 * hg + thk},
                {x: padding + 1.5 * wg + thk, y: padding + hg},
                {x: padding + 1.5 * wg, y: padding + hg}
            ])).classed("sketch", true);
            drawLine(padding + 1.5 * wg, padding + hg, padding + wg, padding + hg);
            drawLine(padding + 1.5 * wg, padding + 2 * hg + thk, padding + wg, padding + 2 * hg + thk);

            // 左侧锥壳
            drawLine(padding - 2 * thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + 2 * hg);
            drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 0.5 * wg - thk, padding + 2 * hg + thk);

            // 右侧锥壳
            drawLine(padding + 2 * wg + 2 * thk, padding + 2 * hg, padding + 1.5 * wg + thk, padding + 2 * hg);
            drawLine(padding + 2 * wg + 2 * thk, padding + 2 * hg + thk, padding + 1.5 * wg + thk, padding + 2 * hg + thk);

            // dsi
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: padding + 2 * hg + thk},
                    {x: padding + wg + 3, y: padding + 2 * hg + thk + 15},
                    {x: padding + wg - 3, y: padding + 2 * hg + thk + 15},
                    {x: padding + wg, y: padding + 2 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 2 * hg + thk + 15 + 60},
                {x: padding + wg, y: padding + 2 * hg + thk + 15}
            ])).attr("id", "BDESketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDESketchDSI").attr("startOffset", "50%").text(dsi);

            // 右下 接管 sketch alpha

            // 接管半径
            let pr = thk / 2;
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: padding + 2.5 * hg},
                {x: padding + 3.5 * wg, y: padding + 2 * hg},
                {x: padding + 3.5 * wg, y: padding + 4 * hg},
                {x: padding + 2.5 * wg, y: padding + 3.5 * hg},
                {x: padding + 2.5 * wg, y: padding + 2.5 * hg}
            ])).classed("sketch", true);
            drawCenterLine(padding + 2.5 * wg - 10, padding + 3 * hg, padding + 3.5 * wg + 10, padding + 3 * hg);
            let halfRad = Math.atan(0.5 * hg / wg);
            let halfAng = halfRad / Math.PI * 180;

            // 开孔中心
            let cx0 = padding + 3 * wg;
            let cy0 = padding + 2.25 * hg;

            // 接管轮廓
            svg.append("path").attr("d", line([
                {x: cx0 - pr, y: cy0 + pr * Math.tan(halfRad)},
                {x: cx0 - pr, y: cy0 - 6 * pr},
                {x: cx0 + pr, y: cy0 - 6 * pr},
                {x: cx0 + pr, y: cy0 - pr * Math.tan(halfRad)}
            ])).classed("sketch", true);

            // 接管中心线
            drawCenterLine(cx0, padding + 2.25 * hg - 6 * pr - 20, cx0, padding + 2.25 * hg + 6 * pr + 20);

            // 开孔中心处法线
            svg.append("path").attr("d", line([
                {x: cx0 - (6 * pr + 20) * Math.sin(halfRad), y: cy0 - (6 * pr + 20) * Math.cos(halfRad)},
                {x: cx0 + (6 * pr + 20) * Math.sin(halfRad), y: cy0 + (6 * pr + 20) * Math.cos(halfRad)}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);

            // 标注 alpha
            svg.append("path").attr("d", "M "
                + (cx0 + (6 * pr + 10) * Math.sin(halfRad)) + " " + (cy0 + (6 * pr + 10) * Math.cos(halfRad)) + " "
                + "A" + (6 * pr + 10) + " " + (6 * pr + 10) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 + (6 * pr + 10))
            ).classed("sketch", true);

            let startX = cx0 + (6 * pr + 10) * Math.sin(halfRad / 2);
            let startY = cy0 + (6 * pr + 10) * Math.cos(halfRad / 2);
            drawLine(startX, startY, startX + 40 * 0.707, startY - 40 * 0.707);
            svg.append("path").attr("d", line([
                {x: startX + 40 * 0.707, y: startY - 40 * 0.707},
                {x: startX + 40 * 0.707 + 40, y: startY - 40 * 0.707}
            ])).attr("id", "BDESketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDESketchALPHA").attr("startOffset", "50%").text(alpha);

            // thksn
            extLineLeftH(padding + 1.5 * wg, padding + 2 * hg);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                    {x: padding + 1.5 * wg - 27, y: padding + 2 * hg - 15},
                    {x: padding + 1.5 * wg - 33, y: padding + 2 * hg - 15},
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk},
                    {x: padding + 1.5 * wg - 27, y: padding + 2 * hg + thk + 15},
                    {x: padding + 1.5 * wg - 33, y: padding + 2 * hg + thk + 15},
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg - 15},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg - 15 - 40}
            ])).attr("id", "BDESketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDESketchTHKSN").attr("startOffset", "50%").text(thksn);

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "BDESketchDPO");

            // thkpn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: padding + 1.5 * hg},
                    {x: padding + 0.5 * wg + 15, y: padding + 1.5 * hg + 3},
                    {x: padding + 0.5 * wg + 15, y: padding + 1.5 * hg - 3},
                    {x: padding + 0.5 * wg, y: padding + 1.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg - thk, y: padding + 1.5 * hg},
                    {x: padding + 0.5 * wg - thk - 15, y: padding + 1.5 * hg + 3},
                    {x: padding + 0.5 * wg - thk - 15, y: padding + 1.5 * hg - 3},
                    {x: padding + 0.5 * wg - thk, y: padding + 1.5 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: padding + 1.5 * hg},
                {x: padding + 0.5 * wg - thk - 15 - 10, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg + 15, y: padding + 1.5 * hg},
                {x: padding + 0.5 * wg + 15 + 40, y: padding + 1.5 * hg}
            ])).attr("id", "BDESketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDESketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "BDESketchHPO");

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "BDESketchHPI");

            // theta
            let cx1 = padding + 3.5 * wg - hg / Math.tan(halfRad);
            let cy1 = padding + 3 * hg;
            let sr = padding + 3 * wg - cx1;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + sr, y: cy1},
                    {x: cx1 + sr + 2, y: cy1 + 10},
                    {x: cx1 + sr - 2, y: cy1 + 10},
                    {x: cx1 + sr, y: cy1}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + sr, y: cy1},
                    {x: cx1 + sr + 2, y: cy1 - 10},
                    {x: cx1 + sr - 2, y: cy1 - 10},
                    {x: cx1 + sr, y: cy1}
                ])).attr("transform", "rotate(" + (halfAng) + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").attr("d", "M "
                + (cx1 + sr * Math.cos(halfRad)) + " " + (cy1 + sr * Math.sin(halfRad)) + " "
                + "A" + sr + " " + sr + " "
                + "1 0 0" + " "
                + (cx1 + sr) + " " + (cy1)
            ).classed("sketch", true).attr("id", "BDESketchTHETA");
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDESketchTHETA")
                .attr("startOffset", "50%").text(theta);

            // l
            let ri = 0.6 * Math.min(hg, wg);
            let xi = padding + 3 * wg;
            let yi = padding + hg;
            drawArc(ri, ri, xi, yi + ri, xi, yi - ri);
            drawArc(ri, ri, xi, yi - ri, xi, yi + ri);
            drawCenterLine(xi, yi + ri + 10, xi, yi - ri - 10);
            drawCenterLine(xi - ri - 10, yi, xi + ri + 10, yi);
            svg.append("path").attr("d", line([
                {x: xi + pr, y: yi - Math.sqrt(ri * ri - pr * pr)},
                {x: xi + pr, y: yi - ri - 2 * pr},
                {x: xi + 2 * pr, y: yi - ri - 2 * pr},
                {x: xi + 2 * pr, y: yi - Math.sqrt(ri * ri - 4 * pr * pr)}
            ])).classed("sketch", true);
            drawCenterLine(xi + 1.5 * pr, yi - ri - 2 * pr - 10, xi + 1.5 * pr, yi - Math.sqrt(ri * ri - 4 * pr * pr) + 10);

            extLineTopV(xi, yi - ri - 2 * pr - 10);
            extLineTopV(xi + 1.5 * pr, yi - ri - 2 * pr - 10);
            drawLine(xi, yi - ri - 2 * pr - 10 - 3, xi, yi - ri - 10 - 3);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xi + 1.5 * pr, y: yi - ri - 2 * pr - 10 - 30},
                    {x: xi + 1.5 * pr + 10, y: yi - ri - 2 * pr - 10 - 28},
                    {x: xi + 1.5 * pr + 10, y: yi - ri - 2 * pr - 10 - 32},
                    {x: xi + 1.5 * pr, y: yi - ri - 2 * pr - 10 - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xi, y: yi - ri - 2 * pr - 10 - 30},
                    {x: xi - 10, y: yi - ri - 2 * pr - 10 - 28},
                    {x: xi - 10, y: yi - ri - 2 * pr - 10 - 32},
                    {x: xi, y: yi - ri - 2 * pr - 10 - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: xi + 1.5 * pr + 10 + 10, y: yi - ri - 2 * pr - 10 - 30},
                {x: xi, y: yi - ri - 2 * pr - 10 - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xi - 10 - 40, y: yi - ri - 2 * pr - 10 - 30},
                {x: xi - 10, y: yi - ri - 2 * pr - 10 - 30}
            ])).attr("id", "BDESketchl").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDESketchl")
                .attr("startOffset", "50%").text(l);

            // 补强圈图形及标记
            let padThk = 0;
            if (isPad === "是") {

                padThk = thk;

                // 左侧补强圈
                svg.append("path").attr("d", line([
                    {x: padding + 0.5 * wg - thk, y: padding + 2 * hg - padThk},
                    {x: padding, y: padding + 2 * hg - padThk},
                    {x: padding, y: padding + 2 * hg}
                ])).classed("sketch", true);

                // 右侧补强圈
                svg.append("path").attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding + 2 * hg - padThk},
                    {x: padding + 2 * wg, y: padding + 2 * hg - padThk},
                    {x: padding + 2 * wg, y: padding + 2 * hg}
                ])).classed("sketch", true);

                // dro
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "BDESketchDRO");
                drawLine(padding, padding + 2 * hg + 3, padding, padding + 3 * hg + 3);
                drawLine(padding + 2 * wg, padding + 2 * hg + 3, padding + 2 * wg, padding + 3 * hg + 3);

                // thkrn
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk},
                        {x: width / 2 - 2 * thk + 3, y: padding + 2 * hg - padThk - 15},
                        {x: width / 2 - 2 * thk - 3, y: padding + 2 * hg - padThk - 15},
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg},
                        {x: width / 2 - 2 * thk + 3, y: padding + 2 * hg + 15},
                        {x: width / 2 - 2 * thk - 3, y: padding + 2 * hg + 15},
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk},
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg + 15 + 10}
                ])).classed("sketch", true);
                svg.append("path").attr("d", line([
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk - 15},
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk - 15 - 40}
                ])).attr("id", "BDESketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#BDESketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }
        }

        currentTabIndex = bded2d3.tabs('getTabIndex', bded2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bde2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bde").length > 0) {
                    bde2d();
                }
            });
        }
        bded2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bde2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bde").length > 0) {
                            bde2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 锥壳接管开孔补强计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 200,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 123,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {
                if (index === 27 || index === 28 || index === 29 || index === 30 || index === 31 || index === 32 || index === 33
                    || index === 36) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 5) {
                    $(ed.target).combobox("loadData", BDESCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BDESType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BDESSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BDESName);
                }

                else if (index === 14) {
                    $(ed.target).combobox("loadData", BDEPCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BDEPType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BDEPSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BDEPName);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BDERCategory);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BDERType);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BDERSTD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BDERName);
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
                    bdeSketch.empty();
                    bdeModel.empty();

                    // sketch
                    currentTabIndex = bded2d3.tabs('getTabIndex', bded2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bde2d();
                        bdeSketch.off("resize").on("resize", function () {
                            if ($("#bde").length > 0) {
                                bde2d();
                            }
                        });
                    }
                    bded2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bde2d();
                                bdeSketch.off("resize").on("resize", function () {
                                    if ($("#bde").length > 0) {
                                        bde2d();
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
                    if (index === 2) {

                        BDEDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BDESCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDESType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDESSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDESName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BDEPCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDEPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDEPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDEPName = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BDERCategory = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDERType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDERSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDERName = null;

                        if (rows[26][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 27).hide();
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDESCategory = [];
                                BDEPCategory = [];
                                BDERCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BDEDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BDESCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDEPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDERCategory[index] = {
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
                    else if (index === 5) {

                        BDESCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDESType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDESSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDESName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDESCategoryVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDESType = [];
                                $(result).each(function (index, element) {
                                    BDESType[index] = {
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
                    else if (index === 6) {

                        BDESTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDESSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDESName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDESCategoryVal,
                                type: BDESTypeVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDESSTD = [];
                                $(result).each(function (index, element) {
                                    BDESSTD[index] = {
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
                    else if (index === 7) {

                        BDESSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDESName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDESCategoryVal,
                                type: BDESTypeVal,
                                std: BDESSTDVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDESName = [];
                                $(result).each(function (index, element) {
                                    BDESName[index] = {
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
                    else if (index === 14) {

                        BDEPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDEPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDEPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDEPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDEPCategoryVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDEPType = [];
                                $(result).each(function (index, element) {
                                    BDEPType[index] = {
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
                    else if (index === 15) {

                        BDEPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDEPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDEPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDEPCategoryVal,
                                type: BDEPTypeVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDEPSTD = [];
                                $(result).each(function (index, element) {
                                    BDEPSTD[index] = {
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
                    else if (index === 16) {

                        BDEPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDEPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDEPCategoryVal,
                                type: BDEPTypeVal,
                                std: BDEPSTDVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDEPName = [];
                                $(result).each(function (index, element) {
                                    BDEPName[index] = {
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
                    else if (index === 27) {

                        BDERCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDERType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDERSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDERName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDERCategoryVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDERType = [];
                                $(result).each(function (index, element) {
                                    BDERType[index] = {
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
                    else if (index === 28) {

                        BDERTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDERSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDERName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDERCategoryVal,
                                type: BDERTypeVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDERSTD = [];
                                $(result).each(function (index, element) {
                                    BDERSTD[index] = {
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
                    else if (index === 29) {

                        BDERSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDERName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDERCategoryVal,
                                type: BDERTypeVal,
                                std: BDERSTDVal,
                                temp: BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDERName = [];
                                $(result).each(function (index, element) {
                                    BDERName[index] = {
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

                        /*
                        此处代码仅处理 UI，和 value 业务逻辑没关系
                         */
                        // UI - IsPAD
                        if (index === 26) {
                            if (rows[26][columns[0][1].field] === "是") {
                                pg.propertygrid('options').finder.getTr(this, 27).show();
                                pg.propertygrid('options').finder.getTr(this, 28).show();
                                pg.propertygrid('options').finder.getTr(this, 29).show();
                                pg.propertygrid('options').finder.getTr(this, 30).show();
                                pg.propertygrid('options').finder.getTr(this, 31).show();
                                pg.propertygrid('options').finder.getTr(this, 32).show();
                                pg.propertygrid('options').finder.getTr(this, 33).show();
                            }
                            else if (rows[26][columns[0][1].field] === "否") {
                                pg.propertygrid('options').finder.getTr(this, 27).hide();
                                pg.propertygrid('options').finder.getTr(this, 28).hide();
                                pg.propertygrid('options').finder.getTr(this, 29).hide();
                                pg.propertygrid('options').finder.getTr(this, 30).hide();
                                pg.propertygrid('options').finder.getTr(this, 31).hide();
                                pg.propertygrid('options').finder.getTr(this, 32).hide();
                                pg.propertygrid('options').finder.getTr(this, 33).hide();
                            }
                            else {
                                return false;
                            }
                        }
                        // UI - IsB
                        if (index === 35) {
                            if (rows[35][columns[0][1].field] === "是") {
                                pg.datagrid('options').finder.getTr(this, 36).show();
                            }
                            else if (rows[35][columns[0][1].field] === "否") {
                                pg.datagrid('options').finder.getTr(this, 36).hide();
                            }
                            else {
                                return false;
                            }
                        }

                        // Tag
                        let BDETag = "符号标记";
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BDETag = rows[0][columns[0][1].field];
                        }

                        // 设计压力
                        let BDEPD;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            BDEPD = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BDEPS;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BDEPS = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Test
                        let BDETest;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            BDETest = rows[4][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 锥壳材料名称
                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                            BDESNameVal = rows[8][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取锥壳材料密度、最大最小厚度
                        let BDEDS, BDESThkMin, BDESThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BDESCategoryVal,
                                "type": BDESTypeVal,
                                "std": BDESSTDVal,
                                "name": BDESNameVal,
                                "temp": BDEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BDEDS = parseFloat(result.density);
                                BDESThkMin = parseFloat(result.thkMin);
                                BDESThkMax = parseFloat(result.thkMax);

                                let BDEDSI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BDEDSI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bde2d("Φ" + BDEDSI);
                                    bdeSketch.off("resize").on("resize", function () {
                                        if ($("#bde").length > 0) {
                                            bde2d("Φ" + BDEDSI);
                                        }
                                    });
                                }
                                bded2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bde2d("Φ" + BDEDSI);
                                            bdeSketch.off("resize").on("resize", function () {
                                                if ($("#bde").length > 0) {
                                                    bde2d("Φ" + BDEDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BDETHETA;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    BDETHETA = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bde2d("Φ" + BDEDSI, BDETHETA + "°");
                                    bdeSketch.off("resize").on("resize", function () {
                                        if ($("#bde").length > 0) {
                                            bde2d("Φ" + BDEDSI, BDETHETA + "°");
                                        }
                                    });
                                }
                                bded2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bde2d("Φ" + BDEDSI, BDETHETA + "°");
                                            bdeSketch.off("resize").on("resize", function () {
                                                if ($("#bde").length > 0) {
                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                // THKSN
                                let BDETHKSN;
                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BDESThkMin
                                    && parseFloat(rows[11][columns[0][1].field]) <= BDESThkMax) {
                                    BDETHKSN = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) <= BDESThkMin) {
                                    south.html("锥壳材料厚度不能小于等于 " + BDESThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BDESThkMax) {
                                    south.html("锥壳材料厚度不能大于 " + BDESThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN);
                                    bdeSketch.off("resize").on("resize", function () {
                                        if ($("#bde").length > 0) {
                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN);
                                        }
                                    });
                                }
                                bded2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN);
                                            bdeSketch.off("resize").on("resize", function () {
                                                if ($("#bde").length > 0) {
                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                /*
                                获取锥壳力学特性
                                 */
                                let BDEOST, BDEOS, BDERSEL, BDECS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BDESCategoryVal,
                                        "type": BDESTypeVal,
                                        "std": BDESSTDVal,
                                        "name": BDESNameVal,
                                        "thk": BDETHKSN,
                                        "temp": BDEDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BDEDSI + 2 * BDETHKSN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BDEOST = parseFloat(result.ot);
                                        if (BDEOST < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDEOS = parseFloat(result.o);
                                        if (BDEOS < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDERSEL = parseFloat(result.rel);
                                        if (BDERSEL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BDECS1 = parseFloat(result.c1);
                                        if (BDECS1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        let BDECS2;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < BDETHKSN) {
                                            BDECS2 = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= BDETHKSN) {
                                            south.html("锥壳腐蚀裕量不能大于等于 " + BDETHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        let BDEES;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            BDEES = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 接管材料名称
                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                            BDEPNameVal = rows[17][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取接管材料密度、最大最小厚度
                                        let BDEDP, BDEPThkMin, BDEPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BDEPCategoryVal,
                                                "type": BDEPTypeVal,
                                                "std": BDEPSTDVal,
                                                "name": BDEPNameVal,
                                                "temp": BDEDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BDEDP = parseFloat(result.density);
                                                BDEPThkMin = parseFloat(result.thkMin);
                                                BDEPThkMax = parseFloat(result.thkMax);

                                                let BDEDPO;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                    BDEDPO = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                        "Φ" + BDEDPO);
                                                    bdeSketch.off("resize").on("resize", function () {
                                                        if ($("#bde").length > 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO);
                                                        }
                                                    });
                                                }
                                                bded2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO);
                                                            bdeSketch.off("resize").on("resize", function () {
                                                                if ($("#bde").length > 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // THKPN
                                                let BDETHKPN;
                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) > BDEPThkMin
                                                    && parseFloat(rows[19][columns[0][1].field]) <= Math.min(BDEPThkMax, BDEDPO / 2)) {
                                                    BDETHKPN = parseFloat(rows[19][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) <= BDEPThkMin) {
                                                    south.html("接管材料厚度不能小于等于 " + BDEPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) > Math.min(BDEPThkMax, BDEDPO / 2)) {
                                                    south.html("接管材料厚度不能大于 " + Math.min(BDEPThkMax, BDEDPO / 2) + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                        "Φ" + BDEDPO, BDETHKPN);
                                                    bdeSketch.off("resize").on("resize", function () {
                                                        if ($("#bde").length > 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO, BDETHKPN);
                                                        }
                                                    });
                                                }
                                                bded2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO, BDETHKPN);
                                                            bdeSketch.off("resize").on("resize", function () {
                                                                if ($("#bde").length > 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BDEOPT, BDEOP, BDERPEL, BDECP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BDEPCategoryVal,
                                                        "type": BDEPTypeVal,
                                                        "std": BDEPSTDVal,
                                                        "name": BDEPNameVal,
                                                        "thk": BDETHKPN,
                                                        "temp": BDEDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BDEDPO
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BDEOPT = parseFloat(result.ot);
                                                        if (BDEOPT < 0) {
                                                            south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDEOP = parseFloat(result.o);
                                                        if (BDEOP < 0) {
                                                            south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDERPEL = parseFloat(result.rel);
                                                        if (BDERPEL < 0) {
                                                            south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDECP1 = parseFloat(result.c1);
                                                        if (BDECP1 < 0) {
                                                            south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        let BDEHPO;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            BDEHPO = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO);
                                                            bdeSketch.off("resize").on("resize", function () {
                                                                if ($("#bde").length > 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO);
                                                                }
                                                            });
                                                        }
                                                        bded2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO);
                                                                    bdeSketch.off("resize").on("resize", function () {
                                                                        if ($("#bde").length > 0) {
                                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDEHPI;
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                            BDEHPI = parseFloat(rows[21][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI);
                                                            bdeSketch.off("resize").on("resize", function () {
                                                                if ($("#bde").length > 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI);
                                                                }
                                                            });
                                                        }
                                                        bded2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI);
                                                                    bdeSketch.off("resize").on("resize", function () {
                                                                        if ($("#bde").length > 0) {
                                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDEALPHA;
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                            BDEALPHA = parseFloat(rows[22][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°");
                                                            bdeSketch.off("resize").on("resize", function () {
                                                                if ($("#bde").length > 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                        bded2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°");
                                                                    bdeSketch.off("resize").on("resize", function () {
                                                                        if ($("#bde").length > 0) {
                                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDEL;
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                            && parseFloat(rows[23][columns[0][1].field]) < (BDEDSI + 2 * BDETHKSN - BDEDPO) / 2) {
                                                            BDEL = parseFloat(rows[23][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                            && parseFloat(rows[23][columns[0][1].field]) >= (BDEDSI + 2 * BDETHKSN - BDEDPO) / 2) {
                                                            south.html("接管轴线到封头轴线距离 L 不能大于等于 " + (BDEDSI + 2 * BDETHKSN - BDEDPO) / 2 + " mm!").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL);
                                                            bdeSketch.off("resize").on("resize", function () {
                                                                if ($("#bde").length > 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL);
                                                                }
                                                            });
                                                        }
                                                        bded2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL);
                                                                    bdeSketch.off("resize").on("resize", function () {
                                                                        if ($("#bde").length > 0) {
                                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDECP2;
                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                            && parseFloat(rows[24][columns[0][1].field]) < BDETHKPN) {
                                                            BDECP2 = parseFloat(rows[24][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                            && parseFloat(rows[24][columns[0][1].field]) >= BDETHKPN) {
                                                            south.html("接管腐蚀裕量不能大于等于 " + BDETHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let BDEEP;
                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                            BDEEP = parseFloat(rows[25][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        这个层次为计算逻辑主线
                                                         */

                                                        // 补强圈分支
                                                        let BDEIsPAD;
                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                            BDEIsPAD = rows[26][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                BDEIsPAD);
                                                            bdeSketch.off("resize").on("resize", function () {
                                                                if ($("#bde").length > 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                        BDEIsPAD);
                                                                }
                                                            });
                                                        }
                                                        bded2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                        "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                        BDEIsPAD);
                                                                    bdeSketch.off("resize").on("resize", function () {
                                                                        if ($("#bde").length > 0) {
                                                                            bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                                BDEIsPAD);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDEDR = -1.0, BDERThkMin = -1.0, BDERThkMax = -1.0;
                                                        let BDEDRO = -1.0, BDETHKRN = -1.0, BDECR2 = -1.0;
                                                        let BDEORT = -1.0, BDEOR = -1.0, BDERREL = -1.0, BDECR1 = -1.0;
                                                        if (BDEIsPAD === "是") {

                                                            if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                BDERNameVal = rows[30][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: false,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BDERCategoryVal,
                                                                    "type": BDERTypeVal,
                                                                    "std": BDERSTDVal,
                                                                    "name": BDERNameVal,
                                                                    "temp": BDEDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BDEDR = parseFloat(result.density);
                                                                    BDERThkMin = parseFloat(result.thkMin);
                                                                    BDERThkMax = parseFloat(result.thkMax);

                                                                    // dro
                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                        && parseFloat(rows[31][columns[0][1].field]) > BDEDPO) {
                                                                        BDEDRO = parseFloat(rows[31][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                        && parseFloat(rows[31][columns[0][1].field]) <= BDEDPO) {
                                                                        south.html("补强圈外直径 Dro 不能小于等于 " + BDEDPO + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                            "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                            BDEIsPAD, "Φ" + BDEDRO);
                                                                        bdeSketch.off("resize").on("resize", function () {
                                                                            if ($("#bde").length > 0) {
                                                                                bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                    "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                                    BDEIsPAD, "Φ" + BDEDRO);
                                                                            }
                                                                        });
                                                                    }
                                                                    bded2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                    "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                                    BDEIsPAD, "Φ" + BDEDRO);
                                                                                bdeSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bde").length > 0) {
                                                                                        bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                            "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                                            BDEIsPAD, "Φ" + BDEDRO);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // THKRN
                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                        && parseFloat(rows[32][columns[0][1].field]) > BDERThkMin
                                                                        && parseFloat(rows[32][columns[0][1].field]) <= Math.min(BDERThkMax, 1.5 * BDETHKSN)) {
                                                                        BDETHKRN = parseFloat(rows[32][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                        && parseFloat(rows[32][columns[0][1].field]) <= BDERThkMin) {
                                                                        south.html("补强圈材料厚度不能小于等于 " + BDERThkMin + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                        && parseFloat(rows[32][columns[0][1].field]) > Math.min(BDERThkMax, 1.5 * BDETHKSN)) {
                                                                        south.html("补强圈材料厚度不能大于 " + Math.min(BDERThkMax, 1.5 * BDETHKSN) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                            "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                            BDEIsPAD, "Φ" + BDEDRO, BDETHKRN);
                                                                        bdeSketch.off("resize").on("resize", function () {
                                                                            if ($("#bde").length > 0) {
                                                                                bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                    "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                                    BDEIsPAD, "Φ" + BDEDRO, BDETHKRN);
                                                                            }
                                                                        });
                                                                    }
                                                                    bded2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                    "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                                    BDEIsPAD, "Φ" + BDEDRO, BDETHKRN);
                                                                                bdeSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bde").length > 0) {
                                                                                        bde2d("Φ" + BDEDSI, BDETHETA + "°", BDETHKSN,
                                                                                            "Φ" + BDEDPO, BDETHKPN, BDEHPO, BDEHPI, BDEALPHA + "°", BDEL,
                                                                                            BDEIsPAD, "Φ" + BDEDRO, BDETHKRN);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                        async: false,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BDERCategoryVal,
                                                                            "type": BDERTypeVal,
                                                                            "std": BDERSTDVal,
                                                                            "name": BDERNameVal,
                                                                            "thk": BDETHKRN,
                                                                            "temp": BDEDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": BDEDRO
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BDEORT = parseFloat(result.ot);
                                                                            if (BDEORT < 0) {
                                                                                south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDEOR = parseFloat(result.o);
                                                                            if (BDEOR < 0) {
                                                                                south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDERREL = parseFloat(result.rel);
                                                                            if (BDERREL < 0) {
                                                                                south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDECR1 = parseFloat(result.c1);
                                                                            if (BDECR1 < 0) {
                                                                                south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 补强圈腐蚀裕量 cr2
                                                                            if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                && parseFloat(rows[33][columns[0][1].field]) < BDETHKRN) {
                                                                                BDECR2 = parseFloat(rows[33][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                && parseFloat(rows[33][columns[0][1].field]) >= BDETHKRN) {
                                                                                south.html("补强圈腐蚀裕量不能大于等于 " + BDETHKRN + " mm").css("color", "red");
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
                                                                },
                                                                error: function () {
                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                        "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                }
                                                            });

                                                            // 判断补强圈数据是否输入完全
                                                            if (BDECR2 < 0) {
                                                                return false;
                                                            }
                                                        }

                                                        // A3
                                                        let BDEA3;
                                                        if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                            BDEA3 = parseFloat(rows[34][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // IsB
                                                        let BDEIsB;
                                                        if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                            BDEIsB = rows[35][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // BS
                                                        let BDEBS = -1.0;
                                                        if (BDEIsB === "是") {

                                                            // 获取 BS
                                                            if (parseFloat(rows[36][columns[0][1].field]) > BDEDPO) {
                                                                BDEBS = parseFloat(rows[36][columns[0][1].field]);
                                                            }
                                                            else if (parseFloat(rows[36][columns[0][1].field]) <= BDEDPO) {
                                                                south.html("指定补强范围 B 不能小于等于 " + BDEDPO + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }
                                                        }

                                                        /*
                                                        过程参数
                                                         */

                                                        let BDEPC = BDEPD + BDEPS;

                                                        // 锥壳
                                                        let BDECS = BDECS1 + BDECS2;
                                                        let BDETHKSE = BDETHKSN - BDECS;
                                                        let BDEDSM = BDEDSI + BDETHKSN;
                                                        let BDERSM = BDEDSM / 2;

                                                        // 接管
                                                        let BDECP = BDECP1 + BDECP2;
                                                        let BDETHKPE = BDETHKPN - BDECP;
                                                        let BDEDPC = BDEDPO - 2 * BDETHKPN + 2 * BDECP;

                                                        let BDESA = BDEDPC / Math.cos(BDEALPHA / 180 * Math.PI);

                                                        let BDESB = BDEDPC * BDERSM / Math.sqrt(BDERSM * BDERSM - BDEL * BDEL);
                                                        let BDEK = Math.max(BDESA / BDESB, BDESB / BDESA);
                                                        if (BDEK > 2) {
                                                            south.html("开孔长短轴之比大于2，程序无法计算！")
                                                                .css("color", "red");
                                                            return false;
                                                        }
                                                        let BDEDOP = BDESA;
                                                        if (BDEDOP > 0.4 * BDEDSI) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                        let BDEFP = Math.min(1.0, BDEOPT / BDEOST);

                                                        // 补强圈
                                                        let BDECR = -1.0, BDETHKRE = -1.0, BDEFR = -1.0;
                                                        if (BDEIsPAD === "是") {
                                                            BDECR = BDECR1 + BDECR2;
                                                            BDETHKRE = BDETHKRN - BDECR;
                                                            BDEFR = Math.min(1.0, BDEORT / BDEOST);
                                                        }

                                                        /*
                                                        锥壳内压强度校核
                                                         */
                                                        let BDETHKSC = BDEPC * BDEDSI / (2 * BDEOST * BDEES) / Math.cos(BDETHETA / 180 * Math.PI);
                                                        let BDETHKSD = BDETHKSC + BDECS2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "锥壳开孔处内压所需厚度：" + (BDETHKSD + BDECS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDETHKSCHK;
                                                        if (BDETHKSN >= (BDETHKSD + BDECS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDETHKSN + " mm" +
                                                                "</span>");
                                                            BDETHKSCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDETHKSN + " mm" +
                                                                "</span>");
                                                            BDETHKSCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        接管内压强度校核
                                                         */
                                                        let BDETHKPC = BDEPC * (BDEDPO - 2 * BDETHKPN) / (2 * BDEOPT * BDEEP);
                                                        let BDETHKPD = BDETHKPC + BDECP2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "接管内压所需厚度：" + (BDETHKPD + BDECP1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDETHKPCHK;
                                                        if (BDETHKPN >= (BDETHKPD + BDECP1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDETHKPN + " mm" +
                                                                "</span>");
                                                            BDETHKPCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDETHKPN + " mm" +
                                                                "</span>");
                                                            BDETHKPCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        开孔补强计算
                                                         */
                                                        let BDEBA = BDEDOP * BDETHKSC + 2 * BDETHKSC * BDETHKPE * (1 - BDEFP);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "开孔所需补强面积：" + BDEBA.toFixed(2) + " mm²" +
                                                            "</span>");

                                                        // 锥壳
                                                        let BDEBB;
                                                        if (BDEIsB === "是") {
                                                            BDEBB = Math.min(Math.max(2 * BDEDOP, BDEDOP + 2 * BDETHKSN + 2 * BDETHKPN), BDEBS);
                                                        }
                                                        else if (BDEIsB === "否") {
                                                            BDEBB = Math.max(2 * BDEDOP, BDEDOP + 2 * BDETHKSN + 2 * BDETHKPN);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let BDEA1 = (BDEBB - BDEDOP) * (BDETHKSE - BDETHKSC) - 2 * BDETHKPE * (BDETHKSE - BDETHKSC) * (1 - BDEFP);

                                                        // 接管
                                                        let BDEHP1 = Math.min(BDEHPO, Math.sqrt(BDEDOP * BDETHKPN));
                                                        let BDEHP2 = Math.min(BDEHPI, Math.sqrt(BDEDOP * BDETHKPN));
                                                        let BDEA2 = 2 * BDEHP1 * (BDETHKPE - BDETHKPC) * BDEFP + 2 * BDEHP2 * (BDETHKPE - BDECP2) * BDEFP;

                                                        // 补强圈
                                                        let BDEA4 = 0.0, BDEDRE = -1.0;
                                                        if (BDEIsPAD === "是") {
                                                            BDEDRE = Math.min(BDEDRO, BDEBB);
                                                            BDEA4 = (BDEDRE - BDEDPO) * BDETHKRE * BDEFR;
                                                        }

                                                        // Ae
                                                        let BDEAE = BDEA1 + BDEA2 + BDEA3 + BDEA4;
                                                        let BDEACHK;
                                                        if (BDEAE >= BDEBA.toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDEAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDEACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDEAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDEACHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        压力试验
                                                         */
                                                        let BDEETA, BDEPST, BDEPPT, BDEPT;
                                                        if (BDETest === "液压试验") {
                                                            BDEETA = 1.25;
                                                            BDEPST = Math.max(BDEETA * BDEPD * BDEOS / BDEOST, 0.05);
                                                            BDEPPT = Math.max(BDEETA * BDEPD * BDEOP / BDEOPT, 0.05);
                                                            BDEPT = Math.min(BDEPST, BDEPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDEPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BDETest === "气压试验") {
                                                            BDEETA = 1.10;
                                                            BDEPST = Math.max(BDEETA * BDEPD * BDEOS / BDEOST, 0.05);
                                                            BDEPPT = Math.max(BDEETA * BDEPD * BDEOP / BDEOPT, 0.05);
                                                            BDEPT = Math.min(BDEPST, BDEPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDEPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        计算 MAWP
                                                         */
                                                        // 锥壳
                                                        let BDEMAWPS = 2 * BDETHKSE * BDEOST * BDEES / (BDEDSI / Math.cos(BDETHETA / 180 * Math.PI)) - BDEPS;

                                                        // 接管
                                                        let BDEMAWPP = 2 * BDETHKPE * BDEOPT * BDEEP / (BDEDPO - 2 * BDETHKPN) - BDEPS;

                                                        // 开孔补强
                                                        let BDEMAWPA1 = -1, BDEMAWPA2 = -1,
                                                            BDEMAWPA3 = BDEA3, BDEMAWPA4 = BDEA4,
                                                            BDEMAWPA = -1, BDEMAWPAE = -1,
                                                            BDEMAWPRC = BDEPC;
                                                        let BDEMAWPTHKSC, BDEMAWPTHKPC;
                                                        while (BDEMAWPAE >= BDEMAWPA) {

                                                            BDEMAWPRC += 0.0001;

                                                            // 锥壳计算厚度
                                                            BDEMAWPTHKSC = BDEMAWPRC * BDEDSI / (2 * BDEOST * BDEES) / Math.cos(BDETHETA / 180 * Math.PI);

                                                            // 所需补强面积
                                                            BDEMAWPA = BDEDOP * BDEMAWPTHKSC + 2 * BDEMAWPTHKSC * BDETHKPE * (1 - BDEFP);

                                                            // 封头剩余面积 A1
                                                            BDEMAWPA1 = (BDEBB - BDEDOP) * (BDETHKSE - BDEMAWPTHKSC) - 2 * BDETHKPE * (BDETHKSE - BDEMAWPTHKSC) * (1 - BDEFP);

                                                            // 接管计算厚度
                                                            BDEMAWPTHKPC = BDEMAWPRC * (BDEDPO - 2 * BDETHKPN) / (2 * BDEOPT * BDEEP);

                                                            // 接管剩余面积 A2
                                                            BDEMAWPA2 = 2 * BDEHP1 * (BDETHKPE - BDEMAWPTHKPC) * BDEFP + 2 * BDEHP2 * (BDETHKPE - BDECP2) * BDEFP;

                                                            // 有效面积 AE
                                                            BDEMAWPAE = BDEMAWPA1 + BDEMAWPA2 + BDEMAWPA3 + BDEMAWPA4;
                                                        }

                                                        // 取用 MAWP
                                                        let BDEMAWPR = BDEMAWPRC - BDEPS - 0.0001;
                                                        let BDEMAWP = Math.min(BDEMAWPS, BDEMAWPP, BDEMAWPR);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "MAWP：" + BDEMAWP.toFixed(4) + " MPa" +
                                                            "</span>");

                                                        // docx
                                                        let BDEPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bdedocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BDE",

                                                                    isPad: BDEIsPAD,
                                                                    isB: BDEIsB,

                                                                    tag: BDETag,
                                                                    pd: BDEPD,
                                                                    t: BDEDT,
                                                                    ps: BDEPS,
                                                                    test: BDETest,

                                                                    stds: BDESSTDVal,
                                                                    names: BDESNameVal,
                                                                    dsi: BDEDSI,
                                                                    theta: BDETHETA,
                                                                    thksn: BDETHKSN,
                                                                    cs2: BDECS2,
                                                                    es: BDEES,

                                                                    stdp: BDEPSTDVal,
                                                                    namep: BDEPNameVal,
                                                                    dpo: BDEDPO,
                                                                    thkpn: BDETHKPN,
                                                                    hpo: BDEHPO,
                                                                    hpi: BDEHPI,
                                                                    alpha: BDEALPHA,
                                                                    l: BDEL,
                                                                    cp2: BDECP2,
                                                                    ep: BDEEP,

                                                                    stdr: BDERSTDVal,
                                                                    namer: BDERNameVal,
                                                                    dro: BDEDRO,
                                                                    thkrn: BDETHKRN,
                                                                    cr2: BDECR2,

                                                                    a3: BDEA3,
                                                                    bs: BDEBS,

                                                                    ds: BDEDS.toFixed(4),
                                                                    cs1: BDECS1.toFixed(4),
                                                                    rsel: BDERSEL.toFixed(4),
                                                                    ost: BDEOST.toFixed(4),
                                                                    os: BDEOS.toFixed(4),

                                                                    dp: BDEDP.toFixed(4),
                                                                    cp1: BDECP1.toFixed(4),
                                                                    rpel: BDERPEL.toFixed(4),
                                                                    opt: BDEOPT.toFixed(4),
                                                                    op: BDEOP.toFixed(4),

                                                                    dr: BDEDR.toFixed(4),
                                                                    cr1: BDECR1.toFixed(4),
                                                                    rrel: BDERREL.toFixed(4),
                                                                    ort: BDEORT.toFixed(4),
                                                                    or: BDEOR.toFixed(4),

                                                                    pc: BDEPC.toFixed(4),
                                                                    cs: BDECS.toFixed(4),
                                                                    thkse: BDETHKSE.toFixed(4),
                                                                    dsm: BDEDSM.toFixed(4),
                                                                    rsm: BDERSM.toFixed(4),

                                                                    cp: BDECP.toFixed(4),
                                                                    thkpe: BDETHKPE.toFixed(4),
                                                                    dpc: BDEDPC.toFixed(4),
                                                                    sa: BDESA.toFixed(4),
                                                                    sb: BDESB.toFixed(4),
                                                                    k: BDEK.toFixed(4),
                                                                    dop: BDEDOP.toFixed(4),
                                                                    fp: BDEFP.toFixed(4),

                                                                    cr: BDECR.toFixed(4),
                                                                    thkre: BDETHKRE.toFixed(4),
                                                                    fr: BDEFR.toFixed(4),

                                                                    thksc: BDETHKSC.toFixed(4),
                                                                    thksd: BDETHKSD.toFixed(4),
                                                                    thkschk: BDETHKSCHK,

                                                                    thkpc: BDETHKPC.toFixed(4),
                                                                    thkpd: BDETHKPD.toFixed(4),
                                                                    thkpchk: BDETHKPCHK,

                                                                    ba: BDEBA.toFixed(4),
                                                                    bb: BDEBB.toFixed(4),
                                                                    a1: BDEA1.toFixed(4),
                                                                    hp1: BDEHP1.toFixed(4),
                                                                    hp2: BDEHP2.toFixed(4),
                                                                    a2: BDEA2.toFixed(4),
                                                                    dre: BDEDRE.toFixed(4),
                                                                    a4: BDEA4.toFixed(4),
                                                                    ae: BDEAE.toFixed(4),
                                                                    achk: BDEACHK,

                                                                    eta: BDEETA.toFixed(4),
                                                                    pst: BDEPST.toFixed(4),
                                                                    ppt: BDEPPT.toFixed(4),
                                                                    pt: BDEPT.toFixed(4),

                                                                    mawps: BDEMAWPS.toFixed(4),
                                                                    mawpp: BDEMAWPP.toFixed(4),
                                                                    mawpa1: BDEMAWPA1.toFixed(0),
                                                                    mawpa2: BDEMAWPA2.toFixed(0),
                                                                    mawpa3: BDEMAWPA3,
                                                                    mawpa4: BDEMAWPA4.toFixed(0),
                                                                    mawpa: BDEMAWPA.toFixed(0),
                                                                    mawpae: BDEMAWPAE.toFixed(0),
                                                                    mawpr: BDEMAWPR.toFixed(4),
                                                                    mawp: BDEMAWP.toFixed(4)
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
                                                                        BDEPayJS.dialog({
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
                                                                                    BDEPayJS.dialog("close");
                                                                                    BDEPayJS.dialog("clear");
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
                                                                                                BDEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BDEPayJS.dialog('close');
                                                                                                        BDEPayJS.dialog('clear');
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
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 27).hide();
                pg.propertygrid('options').finder.getTr(this, 28).hide();
                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 36).hide();
            }
        });
    });
});