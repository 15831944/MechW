/*
一个问题：当锥壳同时需要内压加强计算和轴向载荷加强计算时，内压加强需要设置加强段，轴向载荷计算时，额外加强面积是否考虑加强段的额外厚度？
本程序偏保守计，轴向载荷可用加强面积计算时，不计内压加强带来的加强段，只考虑锥壳及筒体非加强段名义厚度。
 */

$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aaffSketch = $("#d2");
    let aaffModel = $("#d3");
    let aaffd2d3 = $('#d2d3');

    $("#cal").html("<table id='aaff'></table>");
    let pg = $("#aaff");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/f/AAFF.json", function (result) {

        let AAFFDT,
            AAFFSCategory, AAFFSCategoryVal, AAFFSType, AAFFSTypeVal, AAFFSSTD, AAFFSSTDVal, AAFFSName, AAFFSNameVal,
            AAFFCCategory, AAFFCCategoryVal, AAFFCType, AAFFCTypeVal, AAFFCSTD, AAFFCSTDVal, AAFFCName, AAFFCNameVal,
            AAFFPCategory, AAFFPCategoryVal, AAFFPType, AAFFPTypeVal, AAFFPSTD, AAFFPSTDVal, AAFFPName, AAFFPNameVal,
            columns, rows, ed;
        let AAFFIsSAxial = "否", AAFFIsPAxial = "否";

        function aaff2d(dsi = "ΦDsi", thksn = "δsn", alpha = "α", thkcn = "δcn", dpi = "ΦDpi", thkpn = "δpn") {

            aaffSketch.empty();

            let width = aaffSketch.width();
            let height = aaffSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFFSVG").attr("height", height);

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
            let padding = 80;
            let thk = 10;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAEBSketchDI").attr("startOffset", "50%").text(text);

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

            // 中心线
            drawCenterLine(padding + 0.5 * wg - 10, height / 2, padding + 3.5 * wg + 10, height / 2);

            // 上部非加强图形
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + 3 * wg, y: padding},
                {x: padding + 3.5 * wg, y: padding},
                {x: padding + 3.5 * wg, y: padding - thk},
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + wg, y: padding + hg - thk},
                {x: padding + 0.5 * wg, y: padding + hg - thk},
                {x: padding + 0.5 * wg, y: padding + hg}
            ])).classed("sketch", true);

            // 上部竖线
            drawLine(padding + 0.5 * wg, padding + hg - thk, padding + 0.5 * wg, height / 2);
            drawLine(padding + wg, padding + hg - thk, padding + wg, height / 2);
            drawLine(padding + 3 * wg, padding - thk, padding + 3 * wg, height / 2);
            drawLine(padding + 3.5 * wg, padding - thk, padding + 3.5 * wg, height / 2);

            // 下部加强图形
            let tan = hg / (2 * wg);
            let rad = Math.atan(hg / (2 * wg));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: padding + 3 * hg},
                {x: padding + wg, y: padding + 3 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg},
                {x: padding + 3.5 * wg, y: padding + 4 * hg},
                {x: padding + 3.5 * wg, y: padding + 4 * hg + thk},
                {x: padding + 3 * wg + 5 * thk, y: padding + 4 * hg + thk},
                {x: padding + 3 * wg + 3 * thk, y: padding + 4 * hg + 2 * thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + 2 * thk},
                {x: padding + 3 * wg - 3 * thk, y: padding + 4 * hg + 2 * thk - tan * 3 * thk},
                {x: padding + 3 * wg - 5 * thk, y: padding + 4 * hg + thk - tan * 5 * thk},
                {x: padding + wg + 5 * thk, y: padding + 3 * hg + thk + 5 * thk * tan},
                {x: padding + wg + 3 * thk, y: padding + 3 * hg + 2 * thk + 3 * thk * tan},
                {x: padding + wg, y: padding + 3 * hg + 2 * thk},
                {x: padding + wg - 3 * thk, y: padding + 3 * hg + 2 * thk},
                {x: padding + wg - 5 * thk, y: padding + 3 * hg + thk},
                {x: padding + 0.5 * wg, y: padding + 3 * hg + thk},
                {x: padding + 0.5 * wg, y: padding + 3 * hg}
            ])).classed("sketch", true);

            // 下半部竖线
            drawLine(padding + 0.5 * wg, padding + 3 * hg + thk, padding + 0.5 * wg, height / 2);
            drawLine(padding + wg - 5 * thk, padding + 3 * hg + thk, padding + wg - 5 * thk, height / 2);
            drawLine(padding + wg, padding + 3 * hg + 2 * thk, padding + wg, height / 2);
            drawLine(padding + wg + 5 * thk, padding + 3 * hg + thk + 5 * thk * tan, padding + wg + 5 * thk, height / 2);
            drawLine(padding + 3 * wg - 5 * thk, padding + 4 * hg + thk - tan * 5 * thk, padding + 3 * wg - 5 * thk, height / 2);
            drawLine(padding + 3 * wg, padding + 4 * hg + 2 * thk, padding + 3 * wg, height / 2);
            drawLine(padding + 3 * wg + 5 * thk, padding + 4 * hg + thk, padding + 3 * wg + 5 * thk, height / 2);
            drawLine(padding + 3.5 * wg, padding + 4 * hg, padding + 3.5 * wg, height / 2);

            // dsi
            dimRightV(padding + 3.5 * wg, padding + 4 * hg, padding + 3.5 * wg, padding, dsi, "AAFFSketchDSI");

            // thksn1
            extLineRightH(padding + 3.5 * wg, padding - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3.5 * wg + 30, y: padding - thk},
                    {x: padding + 3.5 * wg + 27, y: padding - thk - 15},
                    {x: padding + 3.5 * wg + 33, y: padding - thk - 15},
                    {x: padding + 3.5 * wg + 30, y: padding - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3.5 * wg + 30, y: padding - thk},
                {x: padding + 3.5 * wg + 30, y: padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3.5 * wg + 30, y: padding - thk - 15},
                {x: padding + 3.5 * wg + 30, y: padding - thk - 15 - 40}
            ])).attr("id", "AAFFSketchTHKSN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchTHKSN1")
                .attr("startOffset", "50%").text(thksn);

            // thksn2
            extLineRightH(padding + 3.5 * wg, padding + 4 * hg + thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3.5 * wg + 30, y: padding + 4 * hg + thk},
                    {x: padding + 3.5 * wg + 27, y: padding + 4 * hg + thk + 15},
                    {x: padding + 3.5 * wg + 33, y: padding + 4 * hg + thk + 15},
                    {x: padding + 3.5 * wg + 30, y: padding + 4 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3.5 * wg + 30, y: padding + 4 * hg + thk},
                {x: padding + 3.5 * wg + 30, y: padding + 4 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3.5 * wg + 30, y: padding + 4 * hg + thk + 15 + 40},
                {x: padding + 3.5 * wg + 30, y: padding + 4 * hg + thk + 15}
            ])).attr("id", "AAFFSketchTHKSN2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchTHKSN2")
                .attr("startOffset", "50%").text(thksn);

            // dpi
            dimLeftV(padding + 0.5 * wg, padding + 3 * hg, padding + 0.5 * wg, padding + hg, dpi, "AAFFSketchDPI");

            // thkpn1
            extLineLeftH(padding + 0.5 * wg, padding + hg - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg - 30, y: padding + hg - thk},
                    {x: padding + 0.5 * wg - 27, y: padding + hg - thk - 15},
                    {x: padding + 0.5 * wg - 33, y: padding + hg - thk - 15},
                    {x: padding + 0.5 * wg - 30, y: padding + hg - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - 30, y: padding + hg - thk},
                {x: padding + 0.5 * wg - 30, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - 30, y: padding + hg - thk - 15},
                {x: padding + 0.5 * wg - 30, y: padding + hg - thk - 15 - 40}
            ])).attr("id", "AAFFSketchTHKPN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchTHKPN1")
                .attr("startOffset", "50%").text(thkpn);

            // thkpn2
            extLineLeftH(padding + 0.5 * wg, padding + 3 * hg + thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg - 30, y: padding + 3 * hg + thk},
                    {x: padding + 0.5 * wg - 27, y: padding + 3 * hg + thk + 15},
                    {x: padding + 0.5 * wg - 33, y: padding + 3 * hg + thk + 15},
                    {x: padding + 0.5 * wg - 30, y: padding + 3 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - 30, y: padding + 3 * hg + thk},
                {x: padding + 0.5 * wg - 30, y: padding + 3 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - 30, y: padding + 3 * hg + thk + 15 + 40},
                {x: padding + 0.5 * wg - 30, y: padding + 3 * hg + thk + 15}
            ])).attr("id", "AAFFSketchTHKPN2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchTHKPN2")
                .attr("startOffset", "50%").text(thkpn);

            // alpha
            let cx0 = padding + 3 * wg - 2 * hg / tan;
            let cy0 = height / 2;
            let cr = width / 2 - cx0;

            // alpha1
            svg.append("path").attr("d", "M "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 + cr * Math.sin(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr) + " " + (cy0)
            ).classed("sketch", true).attr("id", "AAFFSketchALPHA1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchALPHA1")
                .attr("startOffset", "50%").text(alpha);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 - 15},
                    {x: cx0 + cr + 3, y: cy0 - 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ]));

            // alpha2
            svg.append("path").attr("d", "M "
                + (cx0 + cr) + " " + (cy0) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 - cr * Math.sin(rad))
            ).classed("sketch", true).attr("id", "AAFFSketchALPHA2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchALPHA2")
                .attr("startOffset", "50%").text(alpha);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 - 15},
                    {x: cx0 + cr + 3, y: cy0 - 15},
                    {x: cx0 + cr, y: cy0}
                ]));

            // thkcn1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)},
                    {x: cx0 + cr - 3, y: cy0 + thk * Math.cos(rad) + 15},
                    {x: cx0 + cr + 3, y: cy0 + thk * Math.cos(rad) + 15},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad) + 15 + 40},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad) + 15}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")")
                .attr("id", "AAFFSketchTHKCN1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchTHKCN1")
                .attr("startOffset", "50%").text(thkcn);

            // thkcn1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad)},
                    {x: cx0 + cr - 3, y: cy0 - thk * Math.cos(rad) - 15},
                    {x: cx0 + cr + 3, y: cy0 - thk * Math.cos(rad) - 15},
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad) - 15},
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad) - 15 - 40}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")")
                .attr("id", "AAFFSketchTHKCN2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFFSketchTHKCN2")
                .attr("startOffset", "50%").text(thkcn);
        }

        currentTabIndex = aaffd2d3.tabs('getTabIndex', aaffd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aaff2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aaff").length > 0) {
                    aaff2d();
                }
            });
        }
        aaffd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aaff2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aaff").length > 0) {
                            aaff2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 大端、小端无折边锥壳(11°≤α≤30°)计算",
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
            rowStyler: function (index) {
                if (index === 29 || index === 31) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {
                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 4) {
                    $(ed.target).combobox("loadData", AAFFSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAFFSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAFFSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFFSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", AAFFCCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAFFCType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAFFCSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAFFCName);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", AAFFPCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", AAFFPType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", AAFFPSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", AAFFPName);
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
                    aaffSketch.empty();

                    // model
                    aaffModel.empty();

                    // sketch
                    currentTabIndex = aaffd2d3.tabs('getTabIndex', aaffd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aaff2d();
                        aaffSketch.off("resize").on("resize", function () {
                            if ($("#aaff").length > 0) {
                                aaff2d();
                            }
                        });
                    }
                    aaffd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aaff2d();
                                aaffSketch.off("resize").on("resize", function () {
                                    if ($("#aaff").length > 0) {
                                        aaff2d();
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

                        AAFFDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAFFSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFFSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFFSName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        AAFFCCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAFFCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAFFCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFFCName = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        AAFFPCategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAFFPType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAFFPSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAFFPName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFSCategory = [];
                                AAFFCCategory = [];
                                AAFFPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFFDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFFSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAFFCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAFFPCategory[index] = {
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

                        AAFFSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFFSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFFSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFSCategoryVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFSType = [];
                                $(result).each(function (index, element) {
                                    AAFFSType[index] = {
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

                        AAFFSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFFSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFFSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFSCategoryVal,
                                type: AAFFSTypeVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFSSTD = [];
                                $(result).each(function (index, element) {
                                    AAFFSSTD[index] = {
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

                        AAFFSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFFSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFSCategoryVal,
                                type: AAFFSTypeVal,
                                std: AAFFSSTDVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFSName = [];
                                $(result).each(function (index, element) {
                                    AAFFSName[index] = {
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

                        AAFFCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAFFCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAFFCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFFCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFCCategoryVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFCType = [];
                                $(result).each(function (index, element) {
                                    AAFFCType[index] = {
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

                        AAFFCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAFFCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFFCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFCCategoryVal,
                                type: AAFFCTypeVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFCSTD = [];
                                $(result).each(function (index, element) {
                                    AAFFCSTD[index] = {
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

                        AAFFCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFFCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFCCategoryVal,
                                type: AAFFCTypeVal,
                                std: AAFFCSTDVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFCName = [];
                                $(result).each(function (index, element) {
                                    AAFFCName[index] = {
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

                        AAFFPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAFFPType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAFFPSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAFFPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFPCategoryVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFPType = [];
                                $(result).each(function (index, element) {
                                    AAFFPType[index] = {
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

                        AAFFPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAFFPSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAFFPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFPCategoryVal,
                                type: AAFFPTypeVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFPSTD = [];
                                $(result).each(function (index, element) {
                                    AAFFPSTD[index] = {
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

                        AAFFPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAFFPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFFPCategoryVal,
                                type: AAFFPTypeVal,
                                std: AAFFPSTDVal,
                                temp: AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFFPName = [];
                                $(result).each(function (index, element) {
                                    AAFFPName[index] = {
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

                        if (index === 28) {
                            if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                AAFFIsSAxial = rows[28][columns[0][1].field];
                                if (AAFFIsSAxial === "是") {
                                    pg.datagrid('options').finder.getTr(this, 29).show();
                                }
                                else if (AAFFIsSAxial === "否") {
                                    pg.datagrid('options').finder.getTr(this, 29).hide();
                                }
                            }
                        }

                        if (index === 30) {
                            if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                AAFFIsPAxial = rows[30][columns[0][1].field];
                                if (AAFFIsPAxial === "是") {
                                    pg.datagrid('options').finder.getTr(this, 31).show();
                                }
                                else if (AAFFIsPAxial === "否") {
                                    pg.datagrid('options').finder.getTr(this, 31).hide();
                                }
                            }
                        }

                        // 设计压力
                        let AAFFPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAFFPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAFFPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAFFPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAFFTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAFFTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 大端筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAFFSNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let AAFFDS, AAFFSThkMin, AAFFSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAFFSCategoryVal,
                                "type": AAFFSTypeVal,
                                "std": AAFFSSTDVal,
                                "name": AAFFSNameVal,
                                "temp": AAFFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAFFDS = parseFloat(result.density);
                                AAFFSThkMin = parseFloat(result.thkMin);
                                AAFFSThkMax = parseFloat(result.thkMax);

                                // DSI
                                let AAFFDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAFFDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aaff2d("Φ" + AAFFDSI);
                                    aaffSketch.off("resize").on("resize", function () {
                                        if ($("#aaff").length > 0) {
                                            aaff2d("Φ" + AAFFDSI);
                                        }
                                    });
                                }
                                aaffd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aaff2d("Φ" + AAFFDSI);
                                            aaffSketch.off("resize").on("resize", function () {
                                                if ($("#aaff").length > 0) {
                                                    aaff2d("Φ" + AAFFDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 大端筒体名义厚度
                                let AAFFTHKSN;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAFFSThkMin
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAFFSThkMax) {
                                    AAFFTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAFFSThkMin) {
                                    south.html("大端筒体材料厚度不能小于等于 " + AAFFSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAFFSThkMax) {
                                    south.html("大端筒体材料厚度不能大于 " + AAFFSThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN);
                                    aaffSketch.off("resize").on("resize", function () {
                                        if ($("#aaff").length > 0) {
                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN);
                                        }
                                    });
                                }
                                aaffd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN);
                                            aaffSketch.off("resize").on("resize", function () {
                                                if ($("#aaff").length > 0) {
                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAFFOST, AAFFOS, AAFFOST1, AAFFRSEL, AAFFCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAFFSCategoryVal,
                                        "type": AAFFSTypeVal,
                                        "std": AAFFSSTDVal,
                                        "name": AAFFSNameVal,
                                        "thk": AAFFTHKSN,
                                        "temp": AAFFDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAFFDSI + 2 * AAFFTHKSN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAFFOST = parseFloat(result.ot);
                                        if (AAFFOST < 0) {
                                            south.html("查询大端筒体材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFFOS = parseFloat(result.o);
                                        if (AAFFOS < 0) {
                                            south.html("查询大端筒体材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFFRSEL = parseFloat(result.rel);
                                        if (AAFFRSEL < 0) {
                                            south.html("查询大端筒体材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFFCS1 = parseFloat(result.c1);
                                        if (AAFFCS1 < 0) {
                                            south.html("查询大端筒体材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFFOST1 = parseFloat(result.ot1);

                                        // 大端筒体腐蚀裕量
                                        let AAFFCS2;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                            && parseFloat(rows[10][columns[0][1].field]) < AAFFTHKSN) {
                                            AAFFCS2 = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                            && parseFloat(rows[10][columns[0][1].field]) >= AAFFTHKSN) {
                                            south.html("大端筒体腐蚀裕量不能大于等于 " + AAFFTHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 大端筒体焊接接头系数
                                        let AAFFES;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                            AAFFES = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 锥壳材料名称
                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                            AAFFCNameVal = rows[15][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        let AAFFDC, AAFFCThkMin, AAFFCThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": AAFFCCategoryVal,
                                                "type": AAFFCTypeVal,
                                                "std": AAFFCSTDVal,
                                                "name": AAFFCNameVal,
                                                "temp": AAFFDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                AAFFDC = parseFloat(result.density);
                                                AAFFCThkMin = parseFloat(result.thkMin);
                                                AAFFCThkMax = parseFloat(result.thkMax);

                                                // 半顶角α
                                                let AAFFALPHA;
                                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                    AAFFALPHA = parseFloat(rows[16][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°");
                                                    aaffSketch.off("resize").on("resize", function () {
                                                        if ($("#aaff").length > 0) {
                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°");
                                                        }
                                                    });
                                                }
                                                aaffd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°");
                                                            aaffSketch.off("resize").on("resize", function () {
                                                                if ($("#aaff").length > 0) {
                                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 锥壳名义厚度
                                                let AAFFTHKCN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAFFCThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAFFCThkMax) {
                                                    AAFFTHKCN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAFFCThkMin) {
                                                    south.html("锥壳材料厚度不能小于等于 " + AAFFCThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAFFCThkMax) {
                                                    south.html("锥壳材料厚度不能大于 " + AAFFCThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN);
                                                    aaffSketch.off("resize").on("resize", function () {
                                                        if ($("#aaff").length > 0) {
                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN);
                                                        }
                                                    });
                                                }
                                                aaffd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN);
                                                            aaffSketch.off("resize").on("resize", function () {
                                                                if ($("#aaff").length > 0) {
                                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let AAFFOCT, AAFFOC, AAFFOCT1, AAFFRCEL, AAFFCC1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAFFCCategoryVal,
                                                        "type": AAFFCTypeVal,
                                                        "std": AAFFCSTDVal,
                                                        "name": AAFFCNameVal,
                                                        "thk": AAFFTHKCN,
                                                        "temp": AAFFDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": AAFFDSI + 2 * AAFFTHKSN
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAFFOCT = parseFloat(result.ot);
                                                        if (AAFFOCT < 0) {
                                                            south.html("查询锥壳材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFFOC = parseFloat(result.o);
                                                        if (AAFFOC < 0) {
                                                            south.html("查询锥壳材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFFRCEL = parseFloat(result.rel);
                                                        if (AAFFRCEL < 0) {
                                                            south.html("查询锥壳材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFFCC1 = parseFloat(result.c1);
                                                        if (AAFFCC1 < 0) {
                                                            south.html("查询锥壳材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFFOCT1 = parseFloat(result.ot1);

                                                        // 锥壳腐蚀裕量
                                                        let AAFFCC2;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) < AAFFTHKCN) {
                                                            AAFFCC2 = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) >= AAFFTHKCN) {
                                                            south.html("锥壳腐蚀裕量不能大于等于 " + AAFFTHKCN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 锥壳焊接接头系数
                                                        let AAFFEC;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                            AAFFEC = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 小端筒体材料名称
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            AAFFPNameVal = rows[23][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let AAFFDP, AAFFPThkMin, AAFFPThkMax;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_index.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": AAFFPCategoryVal,
                                                                "type": AAFFPTypeVal,
                                                                "std": AAFFPSTDVal,
                                                                "name": AAFFPNameVal,
                                                                "temp": AAFFDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                AAFFDP = parseFloat(result.density);
                                                                AAFFPThkMin = parseFloat(result.thkMin);
                                                                AAFFPThkMax = parseFloat(result.thkMax);

                                                                // DPI
                                                                let AAFFDPI;
                                                                if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) < AAFFDSI) {
                                                                    AAFFDPI = parseFloat(rows[24][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) >= AAFFDSI) {
                                                                    south.html("小端筒体内直径Dpi不能大于等于 " + AAFFDSI + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI);
                                                                    aaffSketch.off("resize").on("resize", function () {
                                                                        if ($("#aaff").length > 0) {
                                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI);
                                                                        }
                                                                    });
                                                                }
                                                                aaffd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI);
                                                                            aaffSketch.off("resize").on("resize", function () {
                                                                                if ($("#aaff").length > 0) {
                                                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 小端筒体名义厚度
                                                                let AAFFTHKPN;
                                                                if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                    && parseFloat(rows[25][columns[0][1].field]) > AAFFPThkMin
                                                                    && parseFloat(rows[25][columns[0][1].field]) <= AAFFPThkMax) {
                                                                    AAFFTHKPN = parseFloat(rows[25][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                    && parseFloat(rows[25][columns[0][1].field]) <= AAFFPThkMin) {
                                                                    south.html("小端筒体材料厚度不能小于等于 " + AAFFPThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                    && parseFloat(rows[25][columns[0][1].field]) > AAFFPThkMax) {
                                                                    south.html("小端筒体材料厚度不能大于 " + AAFFPThkMax + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI, AAFFTHKPN);
                                                                    aaffSketch.off("resize").on("resize", function () {
                                                                        if ($("#aaff").length > 0) {
                                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI, AAFFTHKPN);
                                                                        }
                                                                    });
                                                                }
                                                                aaffd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI, AAFFTHKPN);
                                                                            aaffSketch.off("resize").on("resize", function () {
                                                                                if ($("#aaff").length > 0) {
                                                                                    aaff2d("Φ" + AAFFDSI, AAFFTHKSN, AAFFALPHA + "°", AAFFTHKCN, "Φ" + AAFFDPI, AAFFTHKPN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                let AAFFOPT, AAFFOP, AAFFOPT1, AAFFRPEL, AAFFCP1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": AAFFPCategoryVal,
                                                                        "type": AAFFPTypeVal,
                                                                        "std": AAFFPSTDVal,
                                                                        "name": AAFFPNameVal,
                                                                        "thk": AAFFTHKPN,
                                                                        "temp": AAFFDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": AAFFDPI + 2 * AAFFTHKPN
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        AAFFOPT = parseFloat(result.ot);
                                                                        if (AAFFOPT < 0) {
                                                                            south.html("查询小端筒体材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        AAFFOP = parseFloat(result.o);
                                                                        if (AAFFOP < 0) {
                                                                            south.html("查询小端筒体材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        AAFFRPEL = parseFloat(result.rel);
                                                                        if (AAFFRPEL < 0) {
                                                                            south.html("查询小端筒体材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        AAFFCP1 = parseFloat(result.c1);
                                                                        if (AAFFCP1 < 0) {
                                                                            south.html("查询小端筒体材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        AAFFOPT1 = parseFloat(result.ot1);

                                                                        // 小端筒体腐蚀裕量
                                                                        let AAFFCP2;
                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) < AAFFTHKPN) {
                                                                            AAFFCP2 = parseFloat(rows[26][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) >= AAFFTHKPN) {
                                                                            south.html("小端筒体腐蚀裕量不能大于等于 " + AAFFTHKPN + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 小端筒体焊接接头系数
                                                                        let AAFFEP;
                                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                            AAFFEP = parseFloat(rows[27][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 大端轴向外载荷
                                                                        if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                                                            AAFFIsSAxial = rows[28][columns[0][1].field];
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 小端轴向外载荷
                                                                        if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                            AAFFIsPAxial = rows[30][columns[0][1].field];
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 过程参数
                                                                        let AAFFPC = AAFFPD + AAFFPS;

                                                                        let AAFFCS = AAFFCS1 + AAFFCS2;
                                                                        let AAFFTHKSE = AAFFTHKSN - AAFFCS;
                                                                        let AAFFDSO = AAFFDSI + 2 * AAFFTHKSN;
                                                                        let AAFFDSM = AAFFDSI + AAFFTHKSN;
                                                                        let AAFFRSM = AAFFDSM / 2;

                                                                        let AAFFCC = AAFFCC1 + AAFFCC2;
                                                                        let AAFFTHKCE = AAFFTHKCN - AAFFCC;

                                                                        let AAFFCP = AAFFCP1 + AAFFCP2;
                                                                        let AAFFTHKPE = AAFFTHKPN - AAFFCP;
                                                                        let AAFFDPO = AAFFDPI + 2 * AAFFTHKPN;
                                                                        let AAFFDPM = AAFFDPI + AAFFTHKPN;
                                                                        let AAFFRPM = AAFFDPM / 2;

                                                                        // 大端筒体厚度计算
                                                                        let AAFFTHKSC = AAFFPC * AAFFDSI / (2 * AAFFOST * AAFFES - AAFFPC);
                                                                        let AAFFTHKSD = AAFFTHKSC + AAFFCS2;
                                                                        let AAFFTHKSCHK;

                                                                        // 锥壳厚度计算
                                                                        let AAFFTHKCC = AAFFPC * AAFFDSI / (2 * AAFFOCT * AAFFEC - AAFFPC) / Math.cos(AAFFALPHA / 180 * Math.PI);
                                                                        let AAFFTHKCD = AAFFTHKCC + AAFFCC2;
                                                                        let AAFFTHKCCHK;

                                                                        // 小端筒体厚度计算
                                                                        let AAFFTHKPC = AAFFPC * AAFFDPI / (2 * AAFFOPT * AAFFEP - AAFFPC);
                                                                        let AAFFTHKPD = AAFFTHKPC + AAFFCP2;
                                                                        let AAFFTHKPCHK;

                                                                        // 大端内压加强设计
                                                                        let AAFFPCOCTEC = AAFFPC / (AAFFOCT * AAFFEC);
                                                                        let AAFFPCOCTECALLOW;
                                                                        if (AAFFALPHA < 11 || AAFFALPHA > 30) {
                                                                            south.html("查图 5-11 超界，程序无法计算！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else if (AAFFALPHA === 11) {
                                                                            AAFFPCOCTECALLOW = 0.002;
                                                                        }
                                                                        else if (AAFFALPHA > 11 && AAFFALPHA < 13.732) {
                                                                            AAFFPCOCTECALLOW = 0.002 + (AAFFALPHA - 11) / (13.732 - 11) * (0.003 - 0.002);
                                                                        }
                                                                        else if (AAFFALPHA === 13.732) {
                                                                            AAFFPCOCTECALLOW = 0.003;
                                                                        }
                                                                        else if (AAFFALPHA > 13.732 && AAFFALPHA < 15.965) {
                                                                            AAFFPCOCTECALLOW = 0.003 + (AAFFALPHA - 13.732) / (15.965 - 13.732) * (0.004 - 0.003);
                                                                        }
                                                                        else if (AAFFALPHA === 15.965) {
                                                                            AAFFPCOCTECALLOW = 0.004;
                                                                        }
                                                                        else if (AAFFALPHA > 15.965 && AAFFALPHA < 18.144) {
                                                                            AAFFPCOCTECALLOW = 0.004 + (AAFFALPHA - 15.965) / (18.144 - 15.965) * (0.005 - 0.004);
                                                                        }
                                                                        else if (AAFFALPHA === 18.144) {
                                                                            AAFFPCOCTECALLOW = 0.005;
                                                                        }
                                                                        else if (AAFFALPHA > 18.144 && AAFFALPHA < 20) {
                                                                            AAFFPCOCTECALLOW = 0.005 + (AAFFALPHA - 18.144) / (20 - 18.144) * (0.006 - 0.005);
                                                                        }
                                                                        else if (AAFFALPHA === 20) {
                                                                            AAFFPCOCTECALLOW = 0.006;
                                                                        }
                                                                        else if (AAFFALPHA > 20 && AAFFALPHA < 21.74) {
                                                                            AAFFPCOCTECALLOW = 0.006 + (AAFFALPHA - 20) / (21.74 - 20) * (0.007 - 0.006);
                                                                        }
                                                                        else if (AAFFALPHA === 21.74) {
                                                                            AAFFPCOCTECALLOW = 0.007;
                                                                        }
                                                                        else if (AAFFALPHA > 21.74 && AAFFALPHA < 23.5) {
                                                                            AAFFPCOCTECALLOW = 0.007 + (AAFFALPHA - 21.74) / (23.5 - 21.74) * (0.008 - 0.007);
                                                                        }
                                                                        else if (AAFFALPHA === 23.5) {
                                                                            AAFFPCOCTECALLOW = 0.008;
                                                                        }
                                                                        else if (AAFFALPHA > 23.5 && AAFFALPHA < 25) {
                                                                            AAFFPCOCTECALLOW = 0.008 + (AAFFALPHA - 23.5) / (25 - 23.5) * (0.009 - 0.008);
                                                                        }
                                                                        else if (AAFFALPHA === 25) {
                                                                            AAFFPCOCTECALLOW = 0.009;
                                                                        }
                                                                        else if (AAFFALPHA > 25 && AAFFALPHA < 26.6) {
                                                                            AAFFPCOCTECALLOW = 0.009 + (AAFFALPHA - 25) / (26.6 - 25) * (0.010 - 0.009);
                                                                        }
                                                                        else if (AAFFALPHA === 26.6) {
                                                                            AAFFPCOCTECALLOW = 0.010;
                                                                        }
                                                                        else if (AAFFALPHA > 26.6 && AAFFALPHA < 28.1) {
                                                                            AAFFPCOCTECALLOW = 0.010 + (AAFFALPHA - 26.6) / (28.1 - 26.6) * (0.011 - 0.010);
                                                                        }
                                                                        else if (AAFFALPHA === 28.1) {
                                                                            AAFFPCOCTECALLOW = 0.011;
                                                                        }
                                                                        else if (AAFFALPHA > 28.1 && AAFFALPHA < 29.424) {
                                                                            AAFFPCOCTECALLOW = 0.011 + (AAFFALPHA - 28.1) / (29.424 - 28.1) * (0.012 - 0.011);
                                                                        }
                                                                        else if (AAFFALPHA === 29.424) {
                                                                            AAFFPCOCTECALLOW = 0.012;
                                                                        }
                                                                        else if (AAFFALPHA > 29.424 && AAFFALPHA < 30) {
                                                                            AAFFPCOCTECALLOW = 0.012 + (AAFFALPHA - 29.424) / (30 - 29.424) * (0.0126 - 0.012);
                                                                        }
                                                                        else if (AAFFALPHA === 30) {
                                                                            AAFFPCOCTECALLOW = 0.0126;
                                                                        }

                                                                        let AAFFPCOCTECCHK = -1,
                                                                            AAFFTHKSCRSM = -1, AAFFQ1 = -1,
                                                                            AAFFTHKSRC = -1, AAFFTHKSRD = -1,
                                                                            AAFFLSRC = -1, AAFFLSRS = -1;
                                                                        // 大端不需要内压加强段
                                                                        if (AAFFPCOCTEC > AAFFPCOCTECALLOW) {

                                                                            south.html(
                                                                                "<span style='color:#444444;'>" +
                                                                                "大端圆筒所需厚度：" + (AAFFTHKSD + AAFFCS1).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            if (AAFFTHKSN >= (AAFFTHKSD + AAFFCS1).toFixed(2)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKSN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKSCHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKSN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKSCHK = "不合格";
                                                                            }

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳所需厚度：" + (AAFFTHKCD + AAFFCC1).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            if (AAFFTHKCN >= (AAFFTHKCD + AAFFCC1).toFixed(2)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKCN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKCCHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKCN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKCCHK = "不合格";
                                                                            }

                                                                            AAFFPCOCTECCHK = "否";
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳大端与筒体连接处是否进行内压加强计算？：否" +
                                                                                "</span>");
                                                                        }
                                                                        // 大端需要内压加强段
                                                                        else {

                                                                            south.html(
                                                                                "<span style='color:#444444;'>" +
                                                                                "大端圆筒(非加强段)所需厚度：" + (AAFFTHKSD + AAFFCS1).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            if (AAFFTHKSN >= (AAFFTHKSD + AAFFCS1).toFixed(2)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKSN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKSCHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKSN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKSCHK = "不合格";
                                                                            }

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳(非加强段)所需厚度：" + (AAFFTHKCD + AAFFCC1).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            if (AAFFTHKCN >= (AAFFTHKCD + AAFFCC1).toFixed(2)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKCN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKCCHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKCN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKCCHK = "不合格";
                                                                            }

                                                                            AAFFPCOCTECCHK = "是";
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳大端与筒体连接处是否进行内压加强计算？：是" +
                                                                                "</span>");

                                                                            AAFFTHKSCRSM = AAFFTHKSC / AAFFRSM;

                                                                            // 查图参数
                                                                            /*
                                                                            if (AAFFTHKSCRSM > 0.02) {
                                                                                south.html("查图 5-12 超界，程序无法计算！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            */
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "gbt_150_2011_chart_5_12_get_q1.action",
                                                                                async: false,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "alpha": AAFFALPHA,
                                                                                    "thkrl": Math.min(Math.max(AAFFTHKSCRSM, 0.002), 0.02)
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    AAFFQ1 = parseFloat(result);
                                                                                    if (AAFFTHKSCRSM >= 0.002) {
                                                                                        AAFFTHKSRC = AAFFQ1 * AAFFTHKSC;
                                                                                    }
                                                                                    else {
                                                                                        AAFFTHKSRC = 0.001 * AAFFQ1 * AAFFDSI;
                                                                                    }

                                                                                    AAFFTHKSRD = Math.max(AAFFTHKCC, AAFFTHKSRC, 0.003 * AAFFDSI) + Math.max(AAFFCC2, AAFFCS2);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "大端加强段设计厚度：" + AAFFTHKSRD.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    AAFFLSRC = Math.sqrt(2 * AAFFDSI * AAFFTHKSRC / Math.cos(AAFFALPHA / 180 * Math.PI));
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "锥壳大端加强段最小长度：" + AAFFLSRC.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    AAFFLSRS = Math.sqrt(2 * AAFFDSI * AAFFTHKSRC);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "大端筒体加强段最小长度：" + AAFFLSRS.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                },
                                                                                error: function () {
                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                        "<span style='color:red;'>&ensp;查图5-12获取Q1值获取失败，请检查网络后重试</span>");
                                                                                }
                                                                            });
                                                                        }

                                                                        // 大端内压轴向载荷计算
                                                                        let AAFFBFS = -1, AAFFSFS = -1, AAFFQS = -1,
                                                                            AAFFPCOSTES = -1, AAFFDELTAS = -1,
                                                                            AAFFDELTASCHK = -1,
                                                                            AAFFKS = -1, AAFFARS = -1, AAFFAES = -1,
                                                                            AAFFASCHK = -1,
                                                                            AAFFAS = -1, AAFFWRS = -1, AAFFLRS = -1;
                                                                        if (AAFFIsSAxial === "是") {

                                                                            // BFS
                                                                            if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])) {
                                                                                AAFFBFS = parseFloat(rows[29][columns[0][1].field]);
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            AAFFSFS = AAFFBFS / (Math.PI * AAFFDSM);
                                                                            AAFFQS = AAFFPC * AAFFDSO / 4 + AAFFSFS;
                                                                            if (AAFFQS < 0) {
                                                                                south.html("考虑内压+轴向载荷后，大端轴向总应力为负，程序无法计算！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            AAFFPCOSTES = AAFFPC / (AAFFOST * AAFFES);

                                                                            // Δ
                                                                            if (AAFFPCOSTES < 0.002) {
                                                                                south.html("查表 5-5 超界，程序无法计算！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.002) {
                                                                                AAFFDELTAS = 11;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.002 && AAFFPCOSTES < 0.003) {
                                                                                AAFFDELTAS = 11 + (AAFFPCOSTES - 0.002) / (0.003 - 0.002) * (13.5 - 11);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.003) {
                                                                                AAFFDELTAS = 13.5;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.003 && AAFFPCOSTES < 0.004) {
                                                                                AAFFDELTAS = 13.5 + (AAFFPCOSTES - 0.003) / (0.004 - 0.003) * (16 - 13.5);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.004) {
                                                                                AAFFDELTAS = 16;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.004 && AAFFPCOSTES < 0.005) {
                                                                                AAFFDELTAS = 16 + (AAFFPCOSTES - 0.004) / (0.005 - 0.004) * (18 - 16);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.005) {
                                                                                AAFFDELTAS = 18;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.005 && AAFFPCOSTES < 0.006) {
                                                                                AAFFDELTAS = 18 + (AAFFPCOSTES - 0.005) / (0.006 - 0.005) * (19.5 - 18);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.006) {
                                                                                AAFFDELTAS = 19.5;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.006 && AAFFPCOSTES < 0.007) {
                                                                                AAFFDELTAS = 19.5 + (AAFFPCOSTES - 0.006) / (0.007 - 0.006) * (21.5 - 19.5);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.007) {
                                                                                AAFFDELTAS = 21.5;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.007 && AAFFPCOSTES < 0.008) {
                                                                                AAFFDELTAS = 21.5 + (AAFFPCOSTES - 0.007) / (0.008 - 0.007) * (23 - 21.5);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.008) {
                                                                                AAFFDELTAS = 23;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.008 && AAFFPCOSTES < 0.009) {
                                                                                AAFFDELTAS = 23 + (AAFFPCOSTES - 0.008) / (0.009 - 0.008) * (24.5 - 23);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.009) {
                                                                                AAFFDELTAS = 24.5;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.009 && AAFFPCOSTES < 0.010) {
                                                                                AAFFDELTAS = 24.5 + (AAFFPCOSTES - 0.009) / (0.010 - 0.009) * (26 - 24.5);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.010) {
                                                                                AAFFDELTAS = 26;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.010 && AAFFPCOSTES < 0.012) {
                                                                                AAFFDELTAS = 26 + (AAFFPCOSTES - 0.010) / (0.012 - 0.010) * (29 - 26);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.012) {
                                                                                AAFFDELTAS = 29;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.012 && AAFFPCOSTES < 0.013) {
                                                                                AAFFDELTAS = 29 + (AAFFPCOSTES - 0.012) / (0.013 - 0.012) * (30 - 29);
                                                                            }
                                                                            else if (AAFFPCOSTES === 0.013) {
                                                                                AAFFDELTAS = 30;
                                                                            }
                                                                            else if (AAFFPCOSTES > 0.013) {
                                                                                AAFFDELTAS = 30;
                                                                            }

                                                                            if (AAFFALPHA <= AAFFDELTAS) {
                                                                                AAFFDELTASCHK = "否";
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "大端连接处是否进行内压+轴向载荷下的加强计算？：否" +
                                                                                    "</span>");
                                                                            }
                                                                            else {
                                                                                AAFFDELTASCHK = "是";
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "大端连接处是否进行内压+轴向载荷下的加强计算？：是" +
                                                                                    "</span>");

                                                                                AAFFKS = 1.0;
                                                                                AAFFARS = AAFFKS * AAFFQS * AAFFDSI * Math.tan(AAFFALPHA / 180 * Math.PI) / (2 * AAFFOST) * (1 - AAFFDELTAS / AAFFALPHA);
                                                                                AAFFAES = (AAFFTHKSE - AAFFTHKSC) * Math.sqrt(AAFFDSI / 2 * AAFFTHKSE)
                                                                                    + (AAFFTHKCE - AAFFTHKCC) * Math.sqrt(AAFFDSI / 2 * AAFFTHKCE / Math.cos(AAFFALPHA / 180 * Math.PI));

                                                                                if (AAFFAES >= AAFFARS) {
                                                                                    AAFFASCHK = "否";
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "大端连接处是否需要设置加强圈？：否" +
                                                                                        "</span>");
                                                                                }
                                                                                else {
                                                                                    AAFFASCHK = "是";
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "大端连接处是否需要设置加强圈？：是" +
                                                                                        "</span>");

                                                                                    AAFFAS = AAFFARS - AAFFAES;
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "大端加强圈所需截面积：" + AAFFAS.toFixed(2) + " mm²" +
                                                                                        "</span>");

                                                                                    AAFFWRS = Math.sqrt(AAFFDSI / 2 * AAFFTHKSE);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "加强圈边缘到锥壳和大端筒体连接处许用最大距离：" + AAFFWRS.toFixed(2) + " mm" +
                                                                                        "</span>");

                                                                                    AAFFLRS = 0.25 * Math.sqrt(AAFFDSI / 2 * AAFFTHKSE);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "加强圈形心到锥壳和大端筒体连接处许用最大距离：" + AAFFLRS.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                }
                                                                            }
                                                                        }

                                                                        // 小端内压加强设计
                                                                        let AAFFALPHAALLOW;
                                                                        if (AAFFPCOCTEC < 0.002 || AAFFPCOCTEC > 0.10) {
                                                                            south.html("查图 5-13 超界，程序无法计算！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.002) {
                                                                            AAFFALPHAALLOW = 0.704;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.002 && AAFFPCOCTEC < 0.003) {
                                                                            AAFFALPHAALLOW = 0.704 + (AAFFPCOCTEC - 0.002) / (0.003 - 0.002) * (0.933 - 0.704);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.003) {
                                                                            AAFFALPHAALLOW = 0.933;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.003 && AAFFPCOCTEC < 0.004) {
                                                                            AAFFALPHAALLOW = 0.933 + (AAFFPCOCTEC - 0.003) / (0.004 - 0.003) * (1.1 - 0.933);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.004) {
                                                                            AAFFALPHAALLOW = 1.1;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.004 && AAFFPCOCTEC < 0.005) {
                                                                            AAFFALPHAALLOW = 1.1 + (AAFFPCOCTEC - 0.004) / (0.005 - 0.004) * (1.247 - 1.1);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.005) {
                                                                            AAFFALPHAALLOW = 1.247;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.005 && AAFFPCOCTEC < 0.006) {
                                                                            AAFFALPHAALLOW = 1.247 + (AAFFPCOCTEC - 0.005) / (0.006 - 0.005) * (1.375 - 1.247);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.006) {
                                                                            AAFFALPHAALLOW = 1.375;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.006 && AAFFPCOCTEC < 0.007) {
                                                                            AAFFALPHAALLOW = 1.375 + (AAFFPCOCTEC - 0.006) / (0.007 - 0.006) * (1.49 - 1.375);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.007) {
                                                                            AAFFALPHAALLOW = 1.49;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.007 && AAFFPCOCTEC < 0.008) {
                                                                            AAFFALPHAALLOW = 1.49 + (AAFFPCOCTEC - 0.007) / (0.008 - 0.007) * (1.605 - 1.49);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.008) {
                                                                            AAFFALPHAALLOW = 1.605;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.008 && AAFFPCOCTEC < 0.009) {
                                                                            AAFFALPHAALLOW = 1.605 + (AAFFPCOCTEC - 0.008) / (0.009 - 0.008) * (1.686 - 1.605);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.009) {
                                                                            AAFFALPHAALLOW = 1.686;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.009 && AAFFPCOCTEC < 0.010) {
                                                                            AAFFALPHAALLOW = 1.686 + (AAFFPCOCTEC - 0.009) / (0.010 - 0.009) * (1.774 - 1.686);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.010) {
                                                                            AAFFALPHAALLOW = 1.774;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.010 && AAFFPCOCTEC < 0.015) {
                                                                            AAFFALPHAALLOW = 1.774 + (AAFFPCOCTEC - 0.010) / (0.015 - 0.010) * (2.147 - 1.774);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.015) {
                                                                            AAFFALPHAALLOW = 2.147;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.015 && AAFFPCOCTEC < 0.020) {
                                                                            AAFFALPHAALLOW = 2.147 + (AAFFPCOCTEC - 0.015) / (0.02 - 0.015) * (2.5 - 2.147);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.020) {
                                                                            AAFFALPHAALLOW = 2.5;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.020 && AAFFPCOCTEC < 0.030) {
                                                                            AAFFALPHAALLOW = 2.5 + (AAFFPCOCTEC - 0.02) / (0.03 - 0.02) * (3.03 - 2.5);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.030) {
                                                                            AAFFALPHAALLOW = 3.03;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.030 && AAFFPCOCTEC < 0.040) {
                                                                            AAFFALPHAALLOW = 3.03 + (AAFFPCOCTEC - 0.03) / (0.04 - 0.03) * (3.48 - 3.03);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.040) {
                                                                            AAFFALPHAALLOW = 3.48;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.040 && AAFFPCOCTEC < 0.050) {
                                                                            AAFFALPHAALLOW = 3.48 + (AAFFPCOCTEC - 0.04) / (0.05 - 0.04) * (3.86 - 3.48);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.050) {
                                                                            AAFFALPHAALLOW = 3.86;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.050 && AAFFPCOCTEC < 0.060) {
                                                                            AAFFALPHAALLOW = 3.86 + (AAFFPCOCTEC - 0.05) / (0.06 - 0.05) * (4.215 - 3.86);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.060) {
                                                                            AAFFALPHAALLOW = 4.215;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.060 && AAFFPCOCTEC < 0.070) {
                                                                            AAFFALPHAALLOW = 4.215 + (AAFFPCOCTEC - 0.06) / (0.07 - 0.06) * (4.553 - 4.215);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.070) {
                                                                            AAFFALPHAALLOW = 4.553;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.070 && AAFFPCOCTEC < 0.080) {
                                                                            AAFFALPHAALLOW = 4.553 + (AAFFPCOCTEC - 0.07) / (0.08 - 0.07) * (4.855 - 4.553);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.080) {
                                                                            AAFFALPHAALLOW = 4.855;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.080 && AAFFPCOCTEC < 0.090) {
                                                                            AAFFALPHAALLOW = 4.855 + (AAFFPCOCTEC - 0.08) / (0.09 - 0.08) * (5.06 - 4.855);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.090) {
                                                                            AAFFALPHAALLOW = 5.06;
                                                                        }
                                                                        else if (AAFFPCOCTEC > 0.090 && AAFFPCOCTEC < 0.100) {
                                                                            AAFFALPHAALLOW = 5.06 + (AAFFPCOCTEC - 0.09) / (0.10 - 0.09) * (5.235 - 5.06);
                                                                        }
                                                                        else if (AAFFPCOCTEC === 0.100) {
                                                                            AAFFALPHAALLOW = 5.235;
                                                                        }

                                                                        let AAFFALPHACHK = -1,
                                                                            AAFFTHKPCRPM = -1, AAFFQ2 = -1,
                                                                            AAFFTHKPRC = -1, AAFFTHKPRD = -1,
                                                                            AAFFLPRC = -1, AAFFLPRS = -1;
                                                                        if (AAFFALPHA < AAFFALPHAALLOW) {

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "小端圆筒所需厚度：" + (AAFFTHKPD + AAFFCP1).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            if (AAFFTHKPN >= (AAFFTHKPD + AAFFCP1).toFixed(2)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKPN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKPCHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKPN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKPCHK = "不合格";
                                                                            }

                                                                            AAFFALPHACHK = "否";
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳小端与筒体连接处是否进行内压加强计算？：否" +
                                                                                "</span>");
                                                                        }
                                                                        else {

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "小端圆筒(非加强段)所需厚度：" + (AAFFTHKPD + AAFFCP1).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            if (AAFFTHKPN >= (AAFFTHKPD + AAFFCP1).toFixed(2)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKPN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKPCHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + AAFFTHKPN + " mm" +
                                                                                    "</span>");
                                                                                AAFFTHKPCHK = "不合格";
                                                                            }

                                                                            AAFFALPHACHK = "是";
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳小端与筒体连接处是否进行内压加强计算？：是" +
                                                                                "</span>");

                                                                            AAFFTHKPCRPM = AAFFTHKPC / AAFFRPM;

                                                                            // 查图参数
                                                                            if (AAFFTHKPCRPM > 0.1 || AAFFTHKPCRPM < 0.002) {
                                                                                south.html("查图 5-14 超界，程序无法计算！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "gbt_150_2011_chart_5_14_get_q2.action",
                                                                                async: false,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "alpha": AAFFALPHA,
                                                                                    "thkrs": Math.max(AAFFTHKPCRPM, 0.002)
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    AAFFQ2 = parseFloat(result);
                                                                                    if (AAFFTHKPCRPM >= 0.002) {
                                                                                        AAFFTHKPRC = AAFFQ2 * AAFFTHKPC;
                                                                                    }
                                                                                    else {
                                                                                        AAFFTHKPRC = 0.001 * AAFFQ2 * AAFFDPI;
                                                                                    }

                                                                                    AAFFTHKPRD = Math.max(AAFFTHKCC, AAFFTHKPRC, 0.003 * AAFFDPI) + Math.max(AAFFCC2, AAFFCP2);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "锥壳与小端筒体连接处加强段设计厚度：" + AAFFTHKPRD.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    AAFFLPRC = Math.sqrt(2 * AAFFDPI * AAFFTHKPRC / Math.cos(AAFFALPHA / 180 * Math.PI));
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "锥壳小端加强段最小长度：" + AAFFLPRC.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    AAFFLPRS = Math.sqrt(2 * AAFFDPI * AAFFTHKPRC);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "小端筒体加强段最小长度：" + AAFFLPRS.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                },
                                                                                error: function () {
                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                        "<span style='color:red;'>&ensp;查图5-14获取Q2值获取失败，请检查网络后重试</span>");
                                                                                }
                                                                            });
                                                                        }

                                                                        // 小端轴向载荷计算
                                                                        let AAFFBFP = -1, AAFFSFP = -1, AAFFQP = -1,
                                                                            AAFFPCOPTEP = -1, AAFFDELTAP = -1,
                                                                            AAFFDELTAPCHK = -1,
                                                                            AAFFKP = -1, AAFFARP = -1, AAFFAEP = -1,
                                                                            AAFFAPCHK = -1, AAFFAP = -1,
                                                                            AAFFWRP = -1, AAFFLRP = -1;
                                                                        if (AAFFIsPAxial === "是") {

                                                                            // BFP
                                                                            if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                                                AAFFBFP = parseFloat(rows[31][columns[0][1].field]);
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            AAFFSFP = AAFFBFP / (Math.PI * AAFFDPM);
                                                                            AAFFQP = AAFFPC * AAFFDPO / 4 + AAFFSFP;
                                                                            if (AAFFQP < 0) {
                                                                                south.html("考虑内压+轴向载荷后，小端轴向总应力为负，程序无法计算！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            AAFFPCOPTEP = AAFFPC / (AAFFOPT * AAFFEP);

                                                                            // Δ
                                                                            if (AAFFPCOPTEP < 0.002) {
                                                                                south.html("查表 5-5 超界，程序无法计算！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (AAFFPCOPTEP === 0.002) {
                                                                                AAFFDELTAP = 4;
                                                                            }
                                                                            else if (AAFFPCOPTEP > 0.002 && AAFFPCOPTEP < 0.005) {
                                                                                AAFFDELTAP = 4 + (AAFFPCOPTEP - 0.002) / (0.005 - 0.002) * (6 - 4);
                                                                            }
                                                                            else if (AAFFPCOPTEP === 0.005) {
                                                                                AAFFDELTAP = 6;
                                                                            }
                                                                            else if (AAFFPCOPTEP > 0.005 && AAFFPCOPTEP < 0.010) {
                                                                                AAFFDELTAP = 6 + (AAFFPCOPTEP - 0.005) / (0.010 - 0.005) * (9 - 6);
                                                                            }
                                                                            else if (AAFFPCOPTEP === 0.010) {
                                                                                AAFFDELTAP = 9;
                                                                            }
                                                                            else if (AAFFPCOPTEP > 0.010 && AAFFPCOPTEP < 0.020) {
                                                                                AAFFDELTAP = 9 + (AAFFPCOPTEP - 0.010) / (0.020 - 0.010) * (12.5 - 9);
                                                                            }
                                                                            else if (AAFFPCOPTEP === 0.020) {
                                                                                AAFFDELTAP = 12.5;
                                                                            }
                                                                            else if (AAFFPCOPTEP > 0.020 && AAFFPCOPTEP < 0.040) {
                                                                                AAFFDELTAP = 12.5 + (AAFFPCOPTEP - 0.020) / (0.040 - 0.020) * (17.5 - 12.5);
                                                                            }
                                                                            else if (AAFFPCOPTEP === 0.040) {
                                                                                AAFFDELTAP = 17.5;
                                                                            }
                                                                            else if (AAFFPCOPTEP > 0.040 && AAFFPCOPTEP < 0.080) {
                                                                                AAFFDELTAP = 17.5 + (AAFFPCOPTEP - 0.040) / (0.080 - 0.040) * (24 - 17.5);
                                                                            }
                                                                            else if (AAFFPCOPTEP === 0.080) {
                                                                                AAFFDELTAP = 24;
                                                                            }
                                                                            else if (AAFFPCOPTEP > 0.080 && AAFFPCOPTEP < 0.10) {
                                                                                AAFFDELTAP = 24 + (AAFFPCOPTEP - 0.080) / (0.10 - 0.080) * (27 - 24);
                                                                            }
                                                                            else if (AAFFPCOPTEP === 0.10) {
                                                                                AAFFDELTAP = 27;
                                                                            }
                                                                            else if (AAFFPCOPTEP > 0.10 && AAFFPCOPTEP < 0.125) {
                                                                                AAFFDELTAP = 27 + (AAFFPCOPTEP - 0.10) / (0.125 - 0.10) * (30 - 27);
                                                                            }
                                                                            else if (AAFFPCOPTEP >= 0.125) {
                                                                                AAFFDELTAP = 30;
                                                                            }

                                                                            if (AAFFALPHA <= AAFFDELTAP) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "锥壳小端是否进行内压+轴向载荷下的加强计算？：否" +
                                                                                    "</span>");
                                                                                AAFFDELTAPCHK = "否";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "锥壳小端是否进行内压+轴向载荷下的加强计算？：是" +
                                                                                    "</span>");
                                                                                AAFFDELTAPCHK = "是";

                                                                                AAFFKP = 1.0;
                                                                                AAFFARP = AAFFKP * AAFFQP * AAFFDPI * Math.tan(AAFFALPHA / 180 * Math.PI) / (2 * AAFFOPT) * (1 - AAFFDELTAP / AAFFALPHA);
                                                                                AAFFAEP = 0.55 * (AAFFTHKPE - AAFFTHKPC) * Math.sqrt(AAFFDPI * AAFFTHKPE)
                                                                                    + 0.55 * (AAFFTHKCE - AAFFTHKCC) * Math.sqrt(AAFFDPI * AAFFTHKCE / Math.cos(AAFFALPHA / 180 * Math.PI));

                                                                                if (AAFFAEP >= AAFFARP) {
                                                                                    AAFFAPCHK = "否";
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "小端连接处是否需要设置加强圈？：否" +
                                                                                        "</span>");
                                                                                }
                                                                                else {
                                                                                    AAFFAPCHK = "是";
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "小端连接处是否需要设置加强圈？：是" +
                                                                                        "</span>");

                                                                                    AAFFAP = AAFFARP - AAFFAEP;
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "小端加强圈所需截面积：" + AAFFAP.toFixed(2) + " mm²" +
                                                                                        "</span>");

                                                                                    AAFFWRP = Math.sqrt(AAFFDPI / 2 * AAFFTHKPE);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "加强圈边缘到锥壳和小端筒体连接处许用最大距离：" + AAFFWRP.toFixed(2) + " mm" +
                                                                                        "</span>");

                                                                                    AAFFLRP = 0.25 * Math.sqrt(AAFFDPI / 2 * AAFFTHKPE);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "加强圈形心到锥壳和小端筒体连接处许用最大距离：" + AAFFLRP.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                }
                                                                            }
                                                                        }

                                                                        // 压力试验
                                                                        let AAFFETA, AAFFPCT, AAFFPPT, AAFFPST, AAFFPT;
                                                                        if (AAFFTest === "液压试验") {
                                                                            AAFFETA = 1.25;
                                                                            AAFFPCT = AAFFETA * AAFFPD * AAFFOC / Math.max(AAFFOCT, AAFFOCT1);
                                                                            AAFFPPT = AAFFETA * AAFFPD * AAFFOP / Math.max(AAFFOPT, AAFFOPT1);
                                                                            AAFFPST = AAFFETA * AAFFPD * AAFFOS / Math.max(AAFFOST, AAFFOST1);
                                                                            AAFFPT = Math.min(AAFFPCT, AAFFPPT, AAFFPST);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + AAFFPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (AAFFTest === "气压试验") {
                                                                            AAFFETA = 1.10;
                                                                            AAFFPCT = AAFFETA * AAFFPD * AAFFOC / Math.max(AAFFOCT, AAFFOCT1);
                                                                            AAFFPPT = AAFFETA * AAFFPD * AAFFOP / Math.max(AAFFOPT, AAFFOPT1);
                                                                            AAFFPST = AAFFETA * AAFFPD * AAFFOS / Math.max(AAFFOST, AAFFOST1);
                                                                            AAFFPT = Math.min(AAFFPCT, AAFFPPT, AAFFPST);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + AAFFPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // docx
                                                                        let AAFFPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "aaffdocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "AAFF",

                                                                                    pd: AAFFPD,
                                                                                    t: AAFFDT,
                                                                                    ps: AAFFPS,
                                                                                    test: AAFFTest,

                                                                                    stds: AAFFSSTDVal,
                                                                                    names: AAFFSNameVal,
                                                                                    dsi: AAFFDSI,
                                                                                    thksn: AAFFTHKSN,
                                                                                    cs2: AAFFCS2,
                                                                                    es: AAFFES,
                                                                                    bfs: AAFFBFS,

                                                                                    stdc: AAFFCSTDVal,
                                                                                    namec: AAFFCNameVal,
                                                                                    alpha: AAFFALPHA,
                                                                                    thkcn: AAFFTHKCN,
                                                                                    cc2: AAFFCC2,
                                                                                    ec: AAFFEC,

                                                                                    stdp: AAFFPSTDVal,
                                                                                    namep: AAFFPNameVal,
                                                                                    dpi: AAFFDPI,
                                                                                    thkpn: AAFFTHKPN,
                                                                                    cp2: AAFFCP2,
                                                                                    ep: AAFFEP,
                                                                                    bfp: AAFFBFP,

                                                                                    ds: AAFFDS.toFixed(4),
                                                                                    rsel: AAFFRSEL.toFixed(4),
                                                                                    cs1: AAFFCS1.toFixed(4),
                                                                                    ost: AAFFOST.toFixed(4),
                                                                                    os: AAFFOS.toFixed(4),
                                                                                    ost1: AAFFOST1.toFixed(4),

                                                                                    dc: AAFFDC.toFixed(4),
                                                                                    rcel: AAFFRCEL.toFixed(4),
                                                                                    cc1: AAFFCC1.toFixed(4),
                                                                                    oct: AAFFOCT.toFixed(4),
                                                                                    oc: AAFFOC.toFixed(4),
                                                                                    oct1: AAFFOCT1.toFixed(4),

                                                                                    dp: AAFFDP.toFixed(4),
                                                                                    rpel: AAFFRPEL.toFixed(4),
                                                                                    cp1: AAFFCP1.toFixed(4),
                                                                                    opt: AAFFOPT.toFixed(4),
                                                                                    op: AAFFOP.toFixed(4),
                                                                                    opt1: AAFFOPT1.toFixed(4),

                                                                                    pc: AAFFPC.toFixed(4),

                                                                                    cs: AAFFCS.toFixed(4),
                                                                                    thkse: AAFFTHKSE.toFixed(4),
                                                                                    dso: AAFFDSO.toFixed(4),
                                                                                    dsm: AAFFDSM.toFixed(4),
                                                                                    rsm: AAFFRSM.toFixed(4),
                                                                                    sfs: AAFFSFS.toFixed(4),
                                                                                    qs: AAFFQS.toFixed(4),

                                                                                    cc: AAFFCC.toFixed(4),
                                                                                    thkce: AAFFTHKCE.toFixed(4),

                                                                                    cp: AAFFCP.toFixed(4),
                                                                                    thkpe: AAFFTHKPE.toFixed(4),
                                                                                    dpo: AAFFDPO.toFixed(4),
                                                                                    dpm: AAFFDPM.toFixed(4),
                                                                                    rpm: AAFFRPM.toFixed(4),
                                                                                    sfp: AAFFSFP.toFixed(4),
                                                                                    qp: AAFFQP.toFixed(4),

                                                                                    thksc: AAFFTHKSC.toFixed(4),
                                                                                    thksd: AAFFTHKSD.toFixed(4),
                                                                                    thkschk: AAFFTHKSCHK,

                                                                                    thkcc: AAFFTHKCC.toFixed(4),
                                                                                    thkcd: AAFFTHKCD.toFixed(4),
                                                                                    thkcchk: AAFFTHKCCHK,

                                                                                    thkpc: AAFFTHKPC.toFixed(4),
                                                                                    thkpd: AAFFTHKPD.toFixed(4),
                                                                                    thkpchk: AAFFTHKPCHK,

                                                                                    pcoctec: AAFFPCOCTEC.toFixed(4),
                                                                                    pcoctecallow: AAFFPCOCTECALLOW.toFixed(4),
                                                                                    pcoctecchk: AAFFPCOCTECCHK,
                                                                                    thkscrsm: AAFFTHKSCRSM.toFixed(4),
                                                                                    q1: AAFFQ1.toFixed(4),
                                                                                    thksrc: AAFFTHKSRC.toFixed(4),
                                                                                    thksrd: AAFFTHKSRD.toFixed(4),
                                                                                    lsrc: AAFFLSRC.toFixed(4),
                                                                                    lsrs: AAFFLSRS.toFixed(4),

                                                                                    pcostes: AAFFPCOSTES.toFixed(4),
                                                                                    deltas: AAFFDELTAS.toFixed(4),
                                                                                    deltaschk: AAFFDELTASCHK,
                                                                                    ks: AAFFKS.toFixed(4),
                                                                                    ars: AAFFARS.toFixed(4),
                                                                                    aes: AAFFAES.toFixed(4),
                                                                                    aschk: AAFFASCHK,
                                                                                    as: AAFFAS.toFixed(4),
                                                                                    wrs: AAFFWRS.toFixed(4),
                                                                                    lrs: AAFFLRS.toFixed(4),

                                                                                    alphaallow: AAFFALPHAALLOW.toFixed(4),
                                                                                    alphachk: AAFFALPHACHK,
                                                                                    thkpcrpm: AAFFTHKPCRPM.toFixed(4),
                                                                                    q2: AAFFQ2.toFixed(4),
                                                                                    thkprc: AAFFTHKPRC.toFixed(4),
                                                                                    thkprd: AAFFTHKPRD.toFixed(4),
                                                                                    lprc: AAFFLPRC.toFixed(4),
                                                                                    lprs: AAFFLPRS.toFixed(4),

                                                                                    pcoptep: AAFFPCOPTEP.toFixed(4),
                                                                                    deltap: AAFFDELTAP.toFixed(4),
                                                                                    deltapchk: AAFFDELTAPCHK,
                                                                                    kp: AAFFKP.toFixed(4),
                                                                                    arp: AAFFARP.toFixed(4),
                                                                                    aep: AAFFAEP.toFixed(4),
                                                                                    apchk: AAFFAPCHK,
                                                                                    ap: AAFFAP.toFixed(4),
                                                                                    wrp: AAFFWRP.toFixed(4),
                                                                                    lrp: AAFFLRP.toFixed(4),

                                                                                    eta: AAFFETA.toFixed(4),
                                                                                    pct: AAFFPCT.toFixed(4),
                                                                                    ppt: AAFFPPT.toFixed(4),
                                                                                    pst: AAFFPST.toFixed(4),
                                                                                    pt: AAFFPT.toFixed(4),

                                                                                    isSAxial: AAFFIsSAxial,
                                                                                    isPAxial: AAFFIsPAxial
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
                                                                                        AAFFPayJS.dialog({
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
                                                                                                    AAFFPayJS.dialog("close");
                                                                                                    AAFFPayJS.dialog("clear");
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
                                                                                                                AAFFPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        AAFFPayJS.dialog('close');
                                                                                                                        AAFFPayJS.dialog('clear');
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
                                                                            "<span style='color:red;'>&ensp;小端筒体材料力学特性获取失败，请检查网络后重试</span>");
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
                                                            "<span style='color:red;'>&ensp;锥壳材料力学特性获取失败，请检查网络后重试</span>");
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
                                            "<span style='color:red;'>&ensp;大端筒体材料力学特性获取失败，请检查网络后重试</span>");
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
                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
            }
        });
    });
});