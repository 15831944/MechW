$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aceaSketch = $("#d2");
    let aceaModel = $("#d3");
    let acead2d3 = $('#d2d3');

    $("#cal").html("<table id='acea'></table>");
    let pg = $("#acea");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/e/a/ACEA.json", function (result) {

        let ACEADT,
            ACEASCategory, ACEASCategoryVal, ACEASType, ACEASTypeVal, ACEASSTD, ACEASSTDVal, ACEASName, ACEASNameVal,
            ACEAPCategory, ACEAPCategoryVal, ACEAPType, ACEAPTypeVal, ACEAPSTD, ACEAPSTDVal, ACEAPName, ACEAPNameVal,
            ACEARCategory, ACEARCategoryVal, ACEARType, ACEARTypeVal, ACEARSTD, ACEARSTDVal, ACEARName, ACEARNameVal,
            columns, rows, ed;

        // Sketch
        function acea2d(pipeType = "插入式", dsi = "ΦDsi", theta = "θ", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", l = "L",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            aceaSketch.empty();
            let width = aceaSketch.width();
            let height = aceaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACEASVG").attr("height", height);

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
            if (pipeType === "插入式") {

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
            }
            else if (pipeType === "安放式") {

                /*
            左侧主视图
             */
                drawCenterLine(padding + wg, padding + hg - 10, padding + wg, padding + 2 * hg + thk + 10);
                // 左侧接管
                svg.append("path").attr("d", line([
                    {x: padding + 0.5 * wg - thk, y: padding + 2 * hg},
                    {x: padding + 0.5 * wg - thk, y: padding + hg},
                    {x: padding + 0.5 * wg, y: padding + hg},
                    {x: padding + 0.5 * wg, y: padding + 2 * hg + thk}
                ])).classed("sketch", true);
                // 右侧接管
                svg.append("path").attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 2 * hg + thk},
                    {x: padding + 1.5 * wg, y: padding + hg},
                    {x: padding + 1.5 * wg + thk, y: padding + hg},
                    {x: padding + 1.5 * wg + thk, y: padding + 2 * hg}
                ])).classed("sketch", true);

                drawLine(padding + 0.5 * wg, padding + hg, padding + 1.5 * wg, padding + hg);

                // 椭圆封头
                drawLine(padding - 2 * thk, padding + 2 * hg, padding + 2 * wg + 2 * thk, padding + 2 * hg);
                drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 2 * wg + 2 * thk, padding + 2 * hg + thk);
            }

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
            ])).attr("id", "ACEASketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACEASketchDSI").attr("startOffset", "50%").text(dsi);

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
            ])).attr("id", "ACEASketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACEASketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "ACEASketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACEASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACEASketchDPO");

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
            ])).attr("id", "ACEASketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACEASketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACEASketchHPO");

            // hpi
            if (pipeType === "插入式") {
                dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "ACEASketchHPI");
            }

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
            ).classed("sketch", true).attr("id", "ACEASketchTHETA");
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACEASketchTHETA")
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
            ])).attr("id", "ACEASketchl").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACEASketchl")
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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACEASketchDRO");
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
                ])).attr("id", "ACEASketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACEASketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }
        }

        currentTabIndex = acead2d3.tabs('getTabIndex', acead2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acea2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acea").length > 0) {
                    acea2d();
                }
            });
        }
        acead2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acea2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acea").length > 0) {
                            acea2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 锥壳段接管开孔补强计算",
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
                if (index === 28 || index === 29 || index === 30 || index === 31 || index === 32 || index === 33 || index === 34
                    || index === 37) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 6) {
                    $(ed.target).combobox("loadData", ACEASCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACEASType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACEASSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", ACEASName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", ACEAPCategory);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", ACEAPType);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", ACEAPSTD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", ACEAPName);
                }

                else if (index === 28) {
                    $(ed.target).combobox("loadData", ACEARCategory);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", ACEARType);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", ACEARSTD);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", ACEARName);
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
                    aceaSketch.empty();
                    aceaModel.empty();

                    // sketch
                    currentTabIndex = acead2d3.tabs('getTabIndex', acead2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acea2d();
                        aceaSketch.off("resize").on("resize", function () {
                            if ($("#acea").length > 0) {
                                acea2d();
                            }
                        });
                    }
                    acead2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acea2d();
                                aceaSketch.off("resize").on("resize", function () {
                                    if ($("#acea").length > 0) {
                                        acea2d();
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

                        ACEADT = parseFloat(changes.value);

                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACEASCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACEASType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACEASSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        ACEASName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        ACEAPCategory = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACEAPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACEAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACEAPName = null;

                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACEARCategory = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACEARType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACEARSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACEARName = null;

                        if (rows[27][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEASCategory = [];
                                ACEAPCategory = [];
                                ACEARCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACEADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACEASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACEAPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACEARCategory[index] = {
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
                    if (index === 6) {

                        ACEASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACEASType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACEASSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        ACEASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEASCategoryVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEASType = [];
                                $(result).each(function (index, element) {
                                    ACEASType[index] = {
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
                    if (index === 7) {

                        ACEASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACEASSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        ACEASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEASCategoryVal,
                                type: ACEASTypeVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEASSTD = [];
                                $(result).each(function (index, element) {
                                    ACEASSTD[index] = {
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
                    if (index === 8) {

                        ACEASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        ACEASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEASCategoryVal,
                                type: ACEASTypeVal,
                                std: ACEASSTDVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEASName = [];
                                $(result).each(function (index, element) {
                                    ACEASName[index] = {
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
                    if (index === 15) {

                        ACEAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACEAPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACEAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACEAPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEAPCategoryVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEAPType = [];
                                $(result).each(function (index, element) {
                                    ACEAPType[index] = {
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
                    if (index === 16) {

                        ACEAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACEAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACEAPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEAPCategoryVal,
                                type: ACEAPTypeVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEAPSTD = [];
                                $(result).each(function (index, element) {
                                    ACEAPSTD[index] = {
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
                    if (index === 17) {

                        ACEAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACEAPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEAPCategoryVal,
                                type: ACEAPTypeVal,
                                std: ACEAPSTDVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEAPName = [];
                                $(result).each(function (index, element) {
                                    ACEAPName[index] = {
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
                    if (index === 28) {

                        ACEARCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACEARType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACEARSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACEARName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEARCategoryVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEARType = [];
                                $(result).each(function (index, element) {
                                    ACEARType[index] = {
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
                    if (index === 29) {

                        ACEARTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACEARSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACEARName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEARCategoryVal,
                                type: ACEARTypeVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEARSTD = [];
                                $(result).each(function (index, element) {
                                    ACEARSTD[index] = {
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
                    if (index === 30) {

                        ACEARSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACEARName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACEARCategoryVal,
                                type: ACEARTypeVal,
                                std: ACEARSTDVal,
                                temp: ACEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACEARName = [];
                                $(result).each(function (index, element) {
                                    ACEARName[index] = {
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

                    /*
                        此处代码仅处理 UI，和 value 业务逻辑没关系
                         */
                    // UI - HPI
                    if (index === 1) {
                        if (rows[1][columns[0][1].field] === "插入式") {
                            pg.datagrid('options').finder.getTr(this, 22).show();
                        }
                        else if (rows[1][columns[0][1].field] === "安放式") {
                            pg.datagrid('options').finder.getTr(this, 22).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsPAD
                    if (index === 27) {
                        if (rows[27][columns[0][1].field] === "是") {
                            pg.propertygrid('options').finder.getTr(this, 28).show();
                            pg.propertygrid('options').finder.getTr(this, 29).show();
                            pg.propertygrid('options').finder.getTr(this, 30).show();
                            pg.propertygrid('options').finder.getTr(this, 31).show();
                            pg.propertygrid('options').finder.getTr(this, 32).show();
                            pg.propertygrid('options').finder.getTr(this, 33).show();
                            pg.propertygrid('options').finder.getTr(this, 34).show();
                        }
                        else if (rows[27][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsB
                    if (index === 36) {
                        if (rows[36][columns[0][1].field] === "是") {
                            pg.datagrid('options').finder.getTr(this, 37).show();
                        }
                        else if (rows[36][columns[0][1].field] === "否") {
                            pg.datagrid('options').finder.getTr(this, 37).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    // Tag
                    let ACEATag = "符号标记";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACEATag = rows[0][columns[0][1].field];
                    }

                    let ACEAPipeType;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACEAPipeType = rows[1][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        acea2d(ACEAPipeType);
                        aceaSketch.off("resize").on("resize", function () {
                            if ($("#acea").length > 0) {
                                acea2d(ACEAPipeType);
                            }
                        });
                    }
                    acead2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acea2d(ACEAPipeType);
                                aceaSketch.off("resize").on("resize", function () {
                                    if ($("#acea").length > 0) {
                                        acea2d(ACEAPipeType);
                                    }
                                });
                            }
                        }
                    });

                    // 设计压力
                    let ACEAPD;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        ACEAPD = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACEAPS;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACEAPS = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACEATest;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        ACEATest = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 锥壳材料名称
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        ACEASNameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取锥壳材料密度、最大最小厚度
                    let ACEADS, ACEASThkMin, ACEASThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACEASCategoryVal,
                            "type": ACEASTypeVal,
                            "std": ACEASSTDVal,
                            "name": ACEASNameVal,
                            "temp": ACEADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACEADS = parseFloat(result.density);
                            ACEASThkMin = parseFloat(result.thkMin);
                            ACEASThkMax = parseFloat(result.thkMax);

                            let ACEADSI;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                ACEADSI = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acea2d(ACEAPipeType, "Φ" + ACEADSI);
                                aceaSketch.off("resize").on("resize", function () {
                                    if ($("#acea").length > 0) {
                                        acea2d(ACEAPipeType, "Φ" + ACEADSI);
                                    }
                                });
                            }
                            acead2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acea2d(ACEAPipeType, "Φ" + ACEADSI);
                                        aceaSketch.off("resize").on("resize", function () {
                                            if ($("#acea").length > 0) {
                                                acea2d(ACEAPipeType, "Φ" + ACEADSI);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACEATHETA;
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                ACEATHETA = parseFloat(rows[11][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°");
                                aceaSketch.off("resize").on("resize", function () {
                                    if ($("#acea").length > 0) {
                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°");
                                    }
                                });
                            }
                            acead2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°");
                                        aceaSketch.off("resize").on("resize", function () {
                                            if ($("#acea").length > 0) {
                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°");
                                            }
                                        });
                                    }
                                }
                            });

                            // THKSN
                            let ACEATHKSN;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACEASThkMin
                                && parseFloat(rows[12][columns[0][1].field]) <= ACEASThkMax) {
                                ACEATHKSN = parseFloat(rows[12][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) <= ACEASThkMin) {
                                south.html("锥壳材料厚度不能小于等于 " + ACEASThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACEASThkMax) {
                                south.html("锥壳材料厚度不能大于 " + ACEASThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN);
                                aceaSketch.off("resize").on("resize", function () {
                                    if ($("#acea").length > 0) {
                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN);
                                    }
                                });
                            }
                            acead2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN);
                                        aceaSketch.off("resize").on("resize", function () {
                                            if ($("#acea").length > 0) {
                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            /*
                            获取锥壳力学特性
                             */
                            let ACEAOST, ACEAOS, ACEAOST1, ACEARSEL, ACEACS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACEASCategoryVal,
                                    "type": ACEASTypeVal,
                                    "std": ACEASSTDVal,
                                    "name": ACEASNameVal,
                                    "thk": ACEATHKSN,
                                    "temp": ACEADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACEADSI + 2 * ACEATHKSN
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACEAOST = parseFloat(result.ot);
                                    if (ACEAOST < 0) {
                                        south.html("查询锥壳材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACEAOS = parseFloat(result.o);
                                    if (ACEAOS < 0) {
                                        south.html("查询锥壳材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACEARSEL = parseFloat(result.rel);
                                    if (ACEARSEL < 0) {
                                        south.html("查询锥壳材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACEACS1 = parseFloat(result.c1);
                                    if (ACEACS1 < 0) {
                                        south.html("查询锥壳材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACEAOST1 = parseFloat(result.ot1);

                                    let ACEACS2;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < ACEATHKSN) {
                                        ACEACS2 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= ACEATHKSN) {
                                        south.html("锥壳腐蚀裕量不能大于等于 " + ACEATHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACEAES;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        ACEAES = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        ACEAPNameVal = rows[18][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACEADP, ACEAPThkMin, ACEAPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACEAPCategoryVal,
                                            "type": ACEAPTypeVal,
                                            "std": ACEAPSTDVal,
                                            "name": ACEAPNameVal,
                                            "temp": ACEADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACEADP = parseFloat(result.density);
                                            ACEAPThkMin = parseFloat(result.thkMin);
                                            ACEAPThkMax = parseFloat(result.thkMax);

                                            let ACEADPO;
                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                ACEADPO = parseFloat(rows[19][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                    "Φ" + ACEADPO);
                                                aceaSketch.off("resize").on("resize", function () {
                                                    if ($("#acea").length > 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO);
                                                    }
                                                });
                                            }
                                            acead2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO);
                                                        aceaSketch.off("resize").on("resize", function () {
                                                            if ($("#acea").length > 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACEATHKPN;
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > ACEAPThkMin
                                                && parseFloat(rows[20][columns[0][1].field]) <= Math.min(ACEAPThkMax, ACEADPO / 2)) {
                                                ACEATHKPN = parseFloat(rows[20][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) <= ACEAPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACEAPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > Math.min(ACEAPThkMax, ACEADPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACEAPThkMax, ACEADPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                    "Φ" + ACEADPO, ACEATHKPN);
                                                aceaSketch.off("resize").on("resize", function () {
                                                    if ($("#acea").length > 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO, ACEATHKPN);
                                                    }
                                                });
                                            }
                                            acead2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO, ACEATHKPN);
                                                        aceaSketch.off("resize").on("resize", function () {
                                                            if ($("#acea").length > 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACEAOPT, ACEAOP, ACEAOPT1, ACEARPEL, ACEACP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACEAPCategoryVal,
                                                    "type": ACEAPTypeVal,
                                                    "std": ACEAPSTDVal,
                                                    "name": ACEAPNameVal,
                                                    "thk": ACEATHKPN,
                                                    "temp": ACEADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACEADPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACEAOPT = parseFloat(result.ot);
                                                    if (ACEAOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACEAOP = parseFloat(result.o);
                                                    if (ACEAOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACEARPEL = parseFloat(result.rel);
                                                    if (ACEARPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACEACP1 = parseFloat(result.c1);
                                                    if (ACEACP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACEAOPT1 = parseFloat(result.ot1);

                                                    let ACEAHPO;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        ACEAHPO = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO);
                                                        aceaSketch.off("resize").on("resize", function () {
                                                            if ($("#acea").length > 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO);
                                                            }
                                                        });
                                                    }
                                                    acead2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO);
                                                                aceaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acea").length > 0) {
                                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACEAHPI = 0.0;
                                                    if (ACEAPipeType === "插入式") {
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                            ACEAHPI = parseFloat(rows[22][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI);
                                                        aceaSketch.off("resize").on("resize", function () {
                                                            if ($("#acea").length > 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI);
                                                            }
                                                        });
                                                    }
                                                    acead2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI);
                                                                aceaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acea").length > 0) {
                                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACEAALPHA;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                        ACEAALPHA = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°");
                                                        aceaSketch.off("resize").on("resize", function () {
                                                            if ($("#acea").length > 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    acead2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°");
                                                                aceaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acea").length > 0) {
                                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACEAL;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) < (ACEADSI + 2 * ACEATHKSN - ACEADPO) / 2) {
                                                        ACEAL = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) >= (ACEADSI + 2 * ACEATHKSN - ACEADPO) / 2) {
                                                        south.html("接管轴线到封头轴线距离 L 不能大于等于 " + (ACEADSI + 2 * ACEATHKSN - ACEADPO) / 2 + " mm!").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL);
                                                        aceaSketch.off("resize").on("resize", function () {
                                                            if ($("#acea").length > 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL);
                                                            }
                                                        });
                                                    }
                                                    acead2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL);
                                                                aceaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acea").length > 0) {
                                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACEACP2;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                        && parseFloat(rows[25][columns[0][1].field]) < ACEATHKPN) {
                                                        ACEACP2 = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                        && parseFloat(rows[25][columns[0][1].field]) >= ACEATHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACEATHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACEAEP;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        ACEAEP = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACEAIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                        ACEAIsPAD = rows[27][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                            ACEAIsPAD);
                                                        aceaSketch.off("resize").on("resize", function () {
                                                            if ($("#acea").length > 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                    ACEAIsPAD);
                                                            }
                                                        });
                                                    }
                                                    acead2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                    "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                    ACEAIsPAD);
                                                                aceaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acea").length > 0) {
                                                                        acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                            "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                            ACEAIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACEADR = -1.0, ACEARThkMin = -1.0, ACEARThkMax = -1.0;
                                                    let ACEADRO = -1.0, ACEATHKRN = -1.0, ACEACR2 = -1.0;
                                                    let ACEAORT = -1.0, ACEAOR = -1.0, ACEAORT1 = -1.0, ACEARREL = -1.0,
                                                        ACEACR1 = -1.0;
                                                    if (ACEAIsPAD === "是") {

                                                        if (ACEATHKSN > 38) {
                                                            south.html("锥壳厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (ACEASCategoryVal === "碳素钢和低合金钢" && ACEARSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                            ACEARNameVal = rows[31][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_index.action",
                                                            async: false,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": ACEARCategoryVal,
                                                                "type": ACEARTypeVal,
                                                                "std": ACEARSTDVal,
                                                                "name": ACEARNameVal,
                                                                "temp": ACEADT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACEADR = parseFloat(result.density);
                                                                ACEARThkMin = parseFloat(result.thkMin);
                                                                ACEARThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) > ACEADPO) {
                                                                    ACEADRO = parseFloat(rows[32][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) <= ACEADPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACEADPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                        "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                        ACEAIsPAD, "Φ" + ACEADRO);
                                                                    aceaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acea").length > 0) {
                                                                            acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                                "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                                ACEAIsPAD, "Φ" + ACEADRO);
                                                                        }
                                                                    });
                                                                }
                                                                acead2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                                "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                                ACEAIsPAD, "Φ" + ACEADRO);
                                                                            aceaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acea").length > 0) {
                                                                                    acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                                        "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                                        ACEAIsPAD, "Φ" + ACEADRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // THKRN
                                                                if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                    && parseFloat(rows[33][columns[0][1].field]) > ACEARThkMin
                                                                    && parseFloat(rows[33][columns[0][1].field]) <= Math.min(ACEARThkMax, 1.5 * ACEATHKSN)) {
                                                                    ACEATHKRN = parseFloat(rows[33][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                    && parseFloat(rows[33][columns[0][1].field]) <= ACEARThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACEARThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                    && parseFloat(rows[33][columns[0][1].field]) > Math.min(ACEARThkMax, 1.5 * ACEATHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACEARThkMax, 1.5 * ACEATHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                        "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                        ACEAIsPAD, "Φ" + ACEADRO, ACEATHKRN);
                                                                    aceaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acea").length > 0) {
                                                                            acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                                "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                                ACEAIsPAD, "Φ" + ACEADRO, ACEATHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                acead2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                                "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                                ACEAIsPAD, "Φ" + ACEADRO, ACEATHKRN);
                                                                            aceaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acea").length > 0) {
                                                                                    acea2d(ACEAPipeType, "Φ" + ACEADSI, ACEATHETA + "°", ACEATHKSN,
                                                                                        "Φ" + ACEADPO, ACEATHKPN, ACEAHPO, ACEAHPI, ACEAALPHA + "°", ACEAL,
                                                                                        ACEAIsPAD, "Φ" + ACEADRO, ACEATHKRN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                    async: false,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": ACEARCategoryVal,
                                                                        "type": ACEARTypeVal,
                                                                        "std": ACEARSTDVal,
                                                                        "name": ACEARNameVal,
                                                                        "thk": ACEATHKRN,
                                                                        "temp": ACEADT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACEADRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACEAORT = parseFloat(result.ot);
                                                                        if (ACEAORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACEAOR = parseFloat(result.o);
                                                                        if (ACEAOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACEARREL = parseFloat(result.rel);
                                                                        if (ACEARREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACEACR1 = parseFloat(result.c1);
                                                                        if (ACEACR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACEAORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                            && parseFloat(rows[34][columns[0][1].field]) < ACEATHKRN) {
                                                                            ACEACR2 = parseFloat(rows[34][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                            && parseFloat(rows[34][columns[0][1].field]) >= ACEATHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACEATHKRN + " mm").css("color", "red");
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
                                                        if (ACEACR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACEAA3;
                                                    if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                        ACEAA3 = parseFloat(rows[35][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACEAIsB;
                                                    if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                        ACEAIsB = rows[36][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACEABS = -1.0;
                                                    if (ACEAIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[37][columns[0][1].field]) > ACEADPO) {
                                                            ACEABS = parseFloat(rows[37][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[37][columns[0][1].field]) <= ACEADPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACEADPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */

                                                    let ACEAPC = ACEAPD + ACEAPS;

                                                    // 锥壳
                                                    let ACEACS = ACEACS1 + ACEACS2;
                                                    let ACEATHKSE = ACEATHKSN - ACEACS;
                                                    let ACEADSM = ACEADSI + ACEATHKSN;
                                                    let ACEARSM = ACEADSM / 2;

                                                    // 接管
                                                    let ACEACP = ACEACP1 + ACEACP2;
                                                    let ACEATHKPE = ACEATHKPN - ACEACP;
                                                    let ACEADPC;
                                                    if (ACEAPipeType === "插入式") {
                                                        ACEADPC = ACEADPO - 2 * ACEATHKPN + 2 * ACEACP;
                                                    }
                                                    else if (ACEAPipeType === "安放式") {
                                                        ACEADPC = ACEADPO - 2 * ACEATHKPN + 2 * ACEACP1 + 2 * ACEACS2;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACEASA = ACEADPC / Math.cos(ACEAALPHA / 180 * Math.PI);

                                                    let ACEASB = ACEADPC * ACEARSM / Math.sqrt(ACEARSM * ACEARSM - ACEAL * ACEAL);
                                                    let ACEAK = Math.max(ACEASA / ACEASB, ACEASB / ACEASA);
                                                    if (ACEAK > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACEADOP = ACEASA;
                                                    if (ACEADOP > ACEADSI / 3) {
                                                        south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                        return false;
                                                    }
                                                    let ACEAFP = Math.min(1.0, ACEAOPT / ACEAOST);

                                                    // 补强圈
                                                    let ACEACR = -1.0, ACEATHKRE = -1.0, ACEAFR = -1.0;
                                                    if (ACEAIsPAD === "是") {
                                                        ACEACR = ACEACR1 + ACEACR2;
                                                        ACEATHKRE = ACEATHKRN - ACEACR;
                                                        ACEAFR = Math.min(1.0, ACEAORT / ACEAOST);
                                                    }

                                                    /*
                                                    锥壳内压强度校核
                                                     */
                                                    let ACEATHKSC = ACEAPC * ACEADSI / (2 * ACEAOST * ACEAES - ACEAPC) / Math.cos(ACEATHETA / 180 * Math.PI);
                                                    let ACEATHKSD = ACEATHKSC + ACEACS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "锥壳开孔处内压所需厚度：" + (ACEATHKSD + ACEACS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACEATHKSCHK;
                                                    if (ACEATHKSN >= (ACEATHKSD + ACEACS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACEATHKSN + " mm" +
                                                            "</span>");
                                                        ACEATHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACEATHKSN + " mm" +
                                                            "</span>");
                                                        ACEATHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACEATHKPC = ACEAPC * ACEADPO / (2 * ACEAOPT * ACEAEP + ACEAPC);
                                                    let ACEATHKPD = ACEATHKPC + ACEACP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACEATHKPD + ACEACP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACEATHKPCHK;
                                                    if (ACEATHKPN >= (ACEATHKPD + ACEACP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACEATHKPN + " mm" +
                                                            "</span>");
                                                        ACEATHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACEATHKPN + " mm" +
                                                            "</span>");
                                                        ACEATHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACEABA;
                                                    if (ACEAPipeType === "插入式") {
                                                        ACEABA = ACEADOP * ACEATHKSC + 2 * ACEATHKSC * ACEATHKPE * (1 - ACEAFP);
                                                    }
                                                    else if (ACEAPipeType === "安放式") {
                                                        ACEABA = ACEADOP * ACEATHKSC;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACEABA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 锥壳
                                                    let ACEABB;
                                                    if (ACEAIsB === "是") {
                                                        ACEABB = Math.min(Math.max(2 * ACEADOP, ACEADOP + 2 * ACEATHKSN + 2 * ACEATHKPN), ACEABS);
                                                    }
                                                    else if (ACEAIsB === "否") {
                                                        ACEABB = Math.max(2 * ACEADOP, ACEADOP + 2 * ACEATHKSN + 2 * ACEATHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACEAA1;
                                                    if (ACEAPipeType === "插入式") {
                                                        ACEAA1 = (ACEABB - ACEADOP) * (ACEATHKSE - ACEATHKSC) - 2 * ACEATHKPE * (ACEATHKSE - ACEATHKSC) * (1 - ACEAFP);
                                                    }
                                                    else if (ACEAPipeType === "安放式") {
                                                        ACEAA1 = (ACEABB - ACEADOP) * (ACEATHKSE - ACEATHKSC);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    // 接管
                                                    let ACEAHP1 = Math.min(ACEAHPO, Math.sqrt(ACEADOP * ACEATHKPN));
                                                    let ACEAHP2 = 0, ACEAA2;
                                                    if (ACEAPipeType === "插入式") {
                                                        ACEAHP2 = Math.min(ACEAHPI, Math.sqrt(ACEADOP * ACEATHKPN));
                                                        ACEAA2 = 2 * ACEAHP1 * (ACEATHKPE - ACEATHKPC) * ACEAFP + 2 * ACEAHP2 * (ACEATHKPE - ACEACP2) * ACEAFP;
                                                    }
                                                    else if (ACEAPipeType === "安放式") {
                                                        ACEAA2 = 2 * ACEAHP1 * (ACEATHKPE - ACEATHKPC) * ACEAFP;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 补强圈
                                                    let ACEAA4 = 0.0, ACEADRE = -1.0;
                                                    if (ACEAIsPAD === "是") {
                                                        ACEADRE = Math.min(ACEADRO, ACEABB);
                                                        ACEAA4 = (ACEADRE - ACEADPO) * ACEATHKRE * ACEAFR;
                                                    }

                                                    // Ae
                                                    let ACEAAE = ACEAA1 + ACEAA2 + ACEAA3 + ACEAA4;
                                                    let ACEAACHK;
                                                    if (ACEAAE >= ACEABA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACEAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACEAACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACEAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACEAACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACEAETA, ACEAPST, ACEAPPT, ACEAPT;
                                                    if (ACEATest === "液压试验") {
                                                        ACEAETA = 1.25;
                                                        ACEAPST = ACEAETA * ACEAPD * ACEAOS / Math.max(ACEAOST, ACEAOST1);
                                                        ACEAPPT = ACEAETA * ACEAPD * ACEAOP / Math.max(ACEAOPT, ACEAOPT1);
                                                        ACEAPT = Math.min(ACEAPST, ACEAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACEAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACEATest === "气压试验") {
                                                        ACEAETA = 1.10;
                                                        ACEAPST = ACEAETA * ACEAPD * ACEAOS / Math.max(ACEAOST, ACEAOST1);
                                                        ACEAPPT = ACEAETA * ACEAPD * ACEAOP / Math.max(ACEAOPT, ACEAOPT1);
                                                        ACEAPT = Math.min(ACEAPST, ACEAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACEAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */
                                                    // 锥壳
                                                    let ACEAMAWPS = 2 * ACEATHKSE * ACEAOST * ACEAES / (ACEADSI / Math.cos(ACEATHETA / 180 * Math.PI) + ACEATHKSE) - ACEAPS;

                                                    // 接管
                                                    let ACEAMAWPP = 2 * ACEATHKPE * ACEAOPT * ACEAEP / (ACEADPO - ACEATHKPE) - ACEAPS;

                                                    // 开孔补强
                                                    let ACEAMAWPA1 = -1, ACEAMAWPA2 = -1,
                                                        ACEAMAWPA3 = ACEAA3, ACEAMAWPA4 = ACEAA4,
                                                        ACEAMAWPA = -1, ACEAMAWPAE = -1,
                                                        ACEAMAWPRC = ACEAPC;
                                                    let ACEAMAWPTHKSC, ACEAMAWPTHKPC;
                                                    while (ACEAMAWPAE >= ACEAMAWPA) {

                                                        ACEAMAWPRC += 0.0001;

                                                        // 锥壳计算厚度
                                                        ACEAMAWPTHKSC = ACEAMAWPRC * ACEADSI / (2 * ACEAOST * ACEAES - ACEAPC) / Math.cos(ACEATHETA / 180 * Math.PI);

                                                        // 所需补强面积
                                                        if (ACEAPipeType === "插入式") {
                                                            ACEAMAWPA = ACEADOP * ACEAMAWPTHKSC + 2 * ACEAMAWPTHKSC * ACEATHKPE * (1 - ACEAFP);
                                                        }
                                                        else if (ACEAPipeType === "安放式") {
                                                            ACEAMAWPA = ACEADOP * ACEAMAWPTHKSC;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 封头剩余面积 A1
                                                        if (ACEAPipeType === "插入式") {
                                                            ACEAMAWPA1 = (ACEABB - ACEADOP) * (ACEATHKSE - ACEAMAWPTHKSC) - 2 * ACEATHKPE * (ACEATHKSE - ACEAMAWPTHKSC) * (1 - ACEAFP);
                                                        }
                                                        else if (ACEAPipeType === "安放式") {
                                                            ACEAMAWPA1 = (ACEABB - ACEADOP) * (ACEATHKSE - ACEAMAWPTHKSC);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 接管计算厚度
                                                        ACEAMAWPTHKPC = ACEAMAWPRC * ACEADPO / (2 * ACEAOPT * ACEAEP + ACEAPC);

                                                        // 接管剩余面积 A2
                                                        if (ACEAPipeType === "插入式") {
                                                            ACEAMAWPA2 = 2 * ACEAHP1 * (ACEATHKPE - ACEAMAWPTHKPC) * ACEAFP + 2 * ACEAHP2 * (ACEATHKPE - ACEACP2) * ACEAFP;
                                                        }
                                                        else if (ACEAPipeType === "安放式") {
                                                            ACEAMAWPA2 = 2 * ACEAHP1 * (ACEATHKPE - ACEAMAWPTHKPC) * ACEAFP;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 有效面积 AE
                                                        ACEAMAWPAE = ACEAMAWPA1 + ACEAMAWPA2 + ACEAMAWPA3 + ACEAMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACEAMAWPR = ACEAMAWPRC - ACEAPS - 0.0001;
                                                    let ACEAMAWP = Math.min(ACEAMAWPS, ACEAMAWPP, ACEAMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACEAMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACEAPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "aceadocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACEA",

                                                                pipeType: ACEAPipeType,
                                                                isPad: ACEAIsPAD,
                                                                isB: ACEAIsB,

                                                                tag: ACEATag,
                                                                pd: ACEAPD,
                                                                t: ACEADT,
                                                                ps: ACEAPS,
                                                                test: ACEATest,

                                                                stds: ACEASSTDVal,
                                                                names: ACEASNameVal,
                                                                dsi: ACEADSI,
                                                                theta: ACEATHETA,
                                                                thksn: ACEATHKSN,
                                                                cs2: ACEACS2,
                                                                es: ACEAES,

                                                                stdp: ACEAPSTDVal,
                                                                namep: ACEAPNameVal,
                                                                dpo: ACEADPO,
                                                                thkpn: ACEATHKPN,
                                                                hpo: ACEAHPO,
                                                                hpi: ACEAHPI,
                                                                alpha: ACEAALPHA,
                                                                l: ACEAL,
                                                                cp2: ACEACP2,
                                                                ep: ACEAEP,

                                                                stdr: ACEARSTDVal,
                                                                namer: ACEARNameVal,
                                                                dro: ACEADRO,
                                                                thkrn: ACEATHKRN,
                                                                cr2: ACEACR2,

                                                                a3: ACEAA3,
                                                                bs: ACEABS,

                                                                ds: ACEADS.toFixed(4),
                                                                cs1: ACEACS1.toFixed(4),
                                                                rsel: ACEARSEL.toFixed(4),
                                                                ost: ACEAOST.toFixed(4),
                                                                os: ACEAOS.toFixed(4),
                                                                ost1: ACEAOST1.toFixed(4),

                                                                dp: ACEADP.toFixed(4),
                                                                cp1: ACEACP1.toFixed(4),
                                                                rpel: ACEARPEL.toFixed(4),
                                                                opt: ACEAOPT.toFixed(4),
                                                                op: ACEAOP.toFixed(4),
                                                                opt1: ACEAOPT1.toFixed(4),

                                                                dr: ACEADR.toFixed(4),
                                                                cr1: ACEACR1.toFixed(4),
                                                                rrel: ACEARREL.toFixed(4),
                                                                ort: ACEAORT.toFixed(4),
                                                                or: ACEAOR.toFixed(4),
                                                                ort1: ACEAORT1.toFixed(4),

                                                                pc: ACEAPC.toFixed(4),
                                                                cs: ACEACS.toFixed(4),
                                                                thkse: ACEATHKSE.toFixed(4),
                                                                dsm: ACEADSM.toFixed(4),
                                                                rsm: ACEARSM.toFixed(4),

                                                                cp: ACEACP.toFixed(4),
                                                                thkpe: ACEATHKPE.toFixed(4),
                                                                dpc: ACEADPC.toFixed(4),
                                                                sa: ACEASA.toFixed(4),
                                                                sb: ACEASB.toFixed(4),
                                                                k: ACEAK.toFixed(4),
                                                                dop: ACEADOP.toFixed(4),
                                                                fp: ACEAFP.toFixed(4),

                                                                cr: ACEACR.toFixed(4),
                                                                thkre: ACEATHKRE.toFixed(4),
                                                                fr: ACEAFR.toFixed(4),

                                                                thksc: ACEATHKSC.toFixed(4),
                                                                thksd: ACEATHKSD.toFixed(4),
                                                                thkschk: ACEATHKSCHK,

                                                                thkpc: ACEATHKPC.toFixed(4),
                                                                thkpd: ACEATHKPD.toFixed(4),
                                                                thkpchk: ACEATHKPCHK,

                                                                ba: ACEABA.toFixed(4),
                                                                bb: ACEABB.toFixed(4),
                                                                a1: ACEAA1.toFixed(4),
                                                                hp1: ACEAHP1.toFixed(4),
                                                                hp2: ACEAHP2.toFixed(4),
                                                                a2: ACEAA2.toFixed(4),
                                                                dre: ACEADRE.toFixed(4),
                                                                a4: ACEAA4.toFixed(4),
                                                                ae: ACEAAE.toFixed(4),
                                                                achk: ACEAACHK,

                                                                eta: ACEAETA.toFixed(4),
                                                                pst: ACEAPST.toFixed(4),
                                                                ppt: ACEAPPT.toFixed(4),
                                                                pt: ACEAPT.toFixed(4),

                                                                mawps: ACEAMAWPS.toFixed(4),
                                                                mawpp: ACEAMAWPP.toFixed(4),
                                                                mawpa1: ACEAMAWPA1.toFixed(0),
                                                                mawpa2: ACEAMAWPA2.toFixed(0),
                                                                mawpa3: ACEAMAWPA3,
                                                                mawpa4: ACEAMAWPA4.toFixed(0),
                                                                mawpa: ACEAMAWPA.toFixed(0),
                                                                mawpae: ACEAMAWPAE.toFixed(0),
                                                                mawpr: ACEAMAWPR.toFixed(4),
                                                                mawp: ACEAMAWP.toFixed(4)
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
                                                                    ACEAPayJS.dialog({
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
                                                                                ACEAPayJS.dialog("close");
                                                                                ACEAPayJS.dialog("clear");
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
                                                                                            ACEAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACEAPayJS.dialog('close');
                                                                                                    ACEAPayJS.dialog('clear');
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 28).hide();
                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
                pg.propertygrid('options').finder.getTr(this, 37).hide();
            }
        });
    });
});