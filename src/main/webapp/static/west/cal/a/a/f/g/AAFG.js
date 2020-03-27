/*
一个问题：当锥壳同时需要内压加强计算和轴向载荷加强计算时，内压加强需要设置加强段，轴向载荷计算时，额外加强面积是否考虑加强段的额外厚度？
本程序偏保守计，轴向载荷可用加强面积计算时，不计内压加强带来的加强段，只考虑锥壳及筒体非加强段名义厚度。
 */
$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aafgSketch = $("#d2");
    let aafgModel = $("#d3");
    let aafgd2d3 = $('#d2d3');

    $("#cal").html("<table id='aafg'></table>");
    let pg = $("#aafg");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/g/AAFG.json", function (result) {

        let AAFGDT,
            AAFGCCategory, AAFGCCategoryVal, AAFGCType, AAFGCTypeVal, AAFGCSTD, AAFGCSTDVal, AAFGCName, AAFGCNameVal,
            AAFGPCategory, AAFGPCategoryVal, AAFGPType, AAFGPTypeVal, AAFGPSTD, AAFGPSTDVal, AAFGPName, AAFGPNameVal,
            columns, rows, ed;
        let AAFGIsPAxial = "否";

        function aafg2d(dsi = "ΦDsi", alpha = "α", thkcn = "δcn", r = "r", dpi = "ΦDpi", thkpn = "δpn") {

            aafgSketch.empty();

            let width = aafgSketch.width();
            let height = aafgSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFGSVG").attr("height", height);

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
            let padding = 40;
            let thk = 10;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let ri = 3 * thk;
            let ro = ri + thk;
            let rad = Math.atan((hg - ri) / (2 * wg)) + Math.asin(ri / Math.sqrt((hg - ri) * (hg - ri) + (2 * wg) * (2 * wg)));
            let deg = rad / Math.PI * 180;

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

            // 上部非加强图形-左侧
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + 3 * wg - ri * Math.sin(rad), y: padding + ri - ri * Math.cos(rad)},
                {x: padding + 3 * wg - ro * Math.sin(rad), y: padding + ri - ro * Math.cos(rad)},
                {x: padding + wg, y: padding + hg - thk},
                {x: padding + 0.5 * wg, y: padding + hg - thk},
                {x: padding + 0.5 * wg, y: padding + hg}
            ])).classed("sketch", true);
            // 上部非加强图形-右侧
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding},
                {x: padding + 3.5 * wg, y: padding},
                {x: padding + 3.5 * wg, y: padding - thk},
                {x: padding + 3 * wg, y: padding - thk}
            ])).classed("sketch", true);
            // 圆弧
            drawArc(ri, ri, padding + 3 * wg - ri * Math.sin(rad), padding + ri - ri * Math.cos(rad), padding + 3 * wg, padding);
            drawArc(ro, ro, padding + 3 * wg - ro * Math.sin(rad), padding + ri - ro * Math.cos(rad), padding + 3 * wg, padding - thk);

            // 上部竖线
            drawLine(padding + 0.5 * wg, padding + hg - thk, padding + 0.5 * wg, height / 2);
            drawLine(padding + wg, padding + hg - thk, padding + wg, height / 2);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk}
            ])).attr("stroke-dasharray", "5,5,5").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - ri * Math.sin(rad), y: padding + ri - ri * Math.cos(rad)},
                {x: padding + 3 * wg - ri * Math.sin(rad), y: padding + 4 * hg - ri + ri * Math.cos(rad)}
            ])).attr("stroke-dasharray", "5,5,5").classed("sketch", true);
            drawLine(padding + 3.5 * wg, padding - thk, padding + 3.5 * wg, height / 2);

            // 下部加强图形
            let tan = Math.tan(rad);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: padding + 3 * hg},
                {x: padding + wg, y: padding + 3 * hg},
                {x: padding + 3 * wg - ri * Math.sin(rad), y: padding + 4 * hg - ri + ri * Math.cos(rad)},
                {x: padding + 3 * wg - ro * Math.sin(rad), y: padding + 4 * hg - ri + ro * Math.cos(rad)},
                {x: padding + wg + 5 * thk, y: padding + 3 * hg + thk + 5 * thk * tan},
                {x: padding + wg + 3 * thk, y: padding + 3 * hg + 2 * thk + 3 * thk * tan},
                {x: padding + wg, y: padding + 3 * hg + 2 * thk},
                {x: padding + wg - 3 * thk, y: padding + 3 * hg + 2 * thk},
                {x: padding + wg - 5 * thk, y: padding + 3 * hg + thk},
                {x: padding + 0.5 * wg, y: padding + 3 * hg + thk},
                {x: padding + 0.5 * wg, y: padding + 3 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding + 4 * hg},
                {x: padding + 3.5 * wg, y: padding + 4 * hg},
                {x: padding + 3.5 * wg, y: padding + 4 * hg + thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk}
            ])).classed("sketch", true);

            // 下半部竖线
            drawLine(padding + 0.5 * wg, padding + 3 * hg + thk, padding + 0.5 * wg, height / 2);
            drawLine(padding + wg - 5 * thk, padding + 3 * hg + thk, padding + wg - 5 * thk, height / 2);
            drawLine(padding + wg, padding + 3 * hg + 2 * thk, padding + wg, height / 2);
            drawLine(padding + wg + 5 * thk, padding + 3 * hg + thk + 5 * thk * tan, padding + wg + 5 * thk, height / 2);
            drawLine(padding + 3.5 * wg, padding + 4 * hg, padding + 3.5 * wg, height / 2);
            // 圆弧
            drawArc(ri, ri, padding + 3 * wg, padding + 4 * hg, padding + 3 * wg - ri * Math.sin(rad), padding + 4 * hg - ri + ri * Math.cos(rad));
            drawArc(ro, ro, padding + 3 * wg, padding + 4 * hg + thk, padding + 3 * wg - ro * Math.sin(rad), padding + 4 * hg - ri + ro * Math.cos(rad));

            // dsi
            dimRightV(padding + 3.5 * wg, padding + 4 * hg, padding + 3.5 * wg, padding, dsi, "AAFGSketchDSI");

            // dpi
            dimLeftV(padding + 0.5 * wg, padding + 3 * hg, padding + 0.5 * wg, padding + hg, dpi, "AAFGSketchDPI");

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
            ])).attr("id", "AAFGSketchTHKPN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFGSketchTHKPN1")
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
            ])).attr("id", "AAFGSketchTHKPN2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFGSketchTHKPN2")
                .attr("startOffset", "50%").text(thkpn);

            // alpha
            let cx0 = padding + 3 * wg - ri * Math.sin(rad) - (height / 2 - (padding + ri - ri * Math.cos(rad))) / Math.tan(rad);
            let cy0 = height / 2;
            let cr = width / 2 - cx0;

            // alpha1
            svg.append("path").attr("d", "M "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 + cr * Math.sin(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr) + " " + (cy0)
            ).classed("sketch", true).attr("id", "AAFGSketchALPHA1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFGSketchALPHA1")
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
            ).classed("sketch", true).attr("id", "AAFGSketchALPHA2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFGSketchALPHA2")
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
                .attr("id", "AAFGSketchTHKCN1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFGSketchTHKCN1")
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
                .attr("id", "AAFGSketchTHKCN2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFGSketchTHKCN2")
                .attr("startOffset", "50%").text(thkcn);

            // r
            let cx1 = padding + 3 * wg;
            let cy1 = padding + ri;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1 - ri},
                    {x: cx1 - 3, y: cy1 - ri + 15},
                    {x: cx1 + 3, y: cy1 - ri + 15},
                    {x: cx1, y: cy1 - ri}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1},
                    {x: cx1, y: cy1 - ri}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1},
                    {x: cx1 + 40, y: cy1}
                ])).attr("id", "AAFGSketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFGSketchR")
                .attr("startOffset", "50%").text(r);
        }

        currentTabIndex = aafgd2d3.tabs('getTabIndex', aafgd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aafg2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aafg").length > 0) {
                    aafg2d();
                }
            });
        }
        aafgd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aafg2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aafg").length > 0) {
                            aafg2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 大端有折边、小端无折边锥壳(10°≤α≤45°)",
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
                if (index === 23) {
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
                    $(ed.target).combobox("loadData", AAFGCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAFGCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAFGCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFGCName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAFGPCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAFGPType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", AAFGPSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", AAFGPName);
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
                    aafgSketch.empty();

                    // model
                    aafgModel.empty();

                    // sketch
                    currentTabIndex = aafgd2d3.tabs('getTabIndex', aafgd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        aafg2d();
                        aafgSketch.off("resize").on("resize", function () {
                            if ($("#aafg").length > 0) {
                                aafg2d();
                            }
                        });
                    }
                    aafgd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aafg2d();
                                aafgSketch.off("resize").on("resize", function () {
                                    if ($("#aafg").length > 0) {
                                        aafg2d();
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

                        AAFGDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAFGCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFGCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFGCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFGCName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAFGPCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFGPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFGPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFGPName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFGCCategory = [];
                                AAFGPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFGDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFGCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAFGPCategory[index] = {
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

                        AAFGCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFGCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFGCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFGCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFGCCategoryVal,
                                temp: AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFGCType = [];
                                $(result).each(function (index, element) {
                                    AAFGCType[index] = {
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

                        AAFGCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFGCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFGCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFGCCategoryVal,
                                type: AAFGCTypeVal,
                                temp: AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFGCSTD = [];
                                $(result).each(function (index, element) {
                                    AAFGCSTD[index] = {
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

                        AAFGCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFGCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFGCCategoryVal,
                                type: AAFGCTypeVal,
                                std: AAFGCSTDVal,
                                temp: AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFGCName = [];
                                $(result).each(function (index, element) {
                                    AAFGCName[index] = {
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

                        AAFGPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFGPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFGPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFGPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFGPCategoryVal,
                                temp: AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFGPType = [];
                                $(result).each(function (index, element) {
                                    AAFGPType[index] = {
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

                        AAFGPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFGPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFGPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFGPCategoryVal,
                                type: AAFGPTypeVal,
                                temp: AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFGPSTD = [];
                                $(result).each(function (index, element) {
                                    AAFGPSTD[index] = {
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

                        AAFGPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFGPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFGPCategoryVal,
                                type: AAFGPTypeVal,
                                std: AAFGPSTDVal,
                                temp: AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFGPName = [];
                                $(result).each(function (index, element) {
                                    AAFGPName[index] = {
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

                        if (index === 22) {
                            if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                AAFGIsPAxial = rows[22][columns[0][1].field];
                                if (AAFGIsPAxial === "是") {
                                    pg.datagrid('options').finder.getTr(this, 23).show();
                                }
                                else if (AAFGIsPAxial === "否") {
                                    pg.datagrid('options').finder.getTr(this, 23).hide();
                                }
                            }
                        }

                        // 设计压力
                        let AAFGPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAFGPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAFGPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAFGPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAFGTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAFGTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 锥壳材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAFGCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let AAFGDC, AAFGCThkMin, AAFGCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAFGCCategoryVal,
                                "type": AAFGCTypeVal,
                                "std": AAFGCSTDVal,
                                "name": AAFGCNameVal,
                                "temp": AAFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAFGDC = parseFloat(result.density);
                                AAFGCThkMin = parseFloat(result.thkMin);
                                AAFGCThkMax = parseFloat(result.thkMax);

                                // DSI
                                let AAFGDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAFGDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafg2d("Φ" + AAFGDSI);
                                    aafgSketch.off("resize").on("resize", function () {
                                        if ($("#aafg").length > 0) {
                                            aafg2d("Φ" + AAFGDSI);
                                        }
                                    });
                                }
                                aafgd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafg2d("Φ" + AAFGDSI);
                                            aafgSketch.off("resize").on("resize", function () {
                                                if ($("#aafg").length > 0) {
                                                    aafg2d("Φ" + AAFGDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 半顶角α
                                let AAFGALPHA;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    AAFGALPHA = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°");
                                    aafgSketch.off("resize").on("resize", function () {
                                        if ($("#aafg").length > 0) {
                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°");
                                        }
                                    });
                                }
                                aafgd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°");
                                            aafgSketch.off("resize").on("resize", function () {
                                                if ($("#aafg").length > 0) {
                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                // 锥壳名义厚度
                                let AAFGTHKCN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFGCThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFGCThkMax) {
                                    AAFGTHKCN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFGCThkMin) {
                                    south.html("锥壳材料厚度不能小于等于 " + AAFGCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFGCThkMax) {
                                    south.html("锥壳材料厚度不能大于 " + AAFGCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN);
                                    aafgSketch.off("resize").on("resize", function () {
                                        if ($("#aafg").length > 0) {
                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN);
                                        }
                                    });
                                }
                                aafgd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN);
                                            aafgSketch.off("resize").on("resize", function () {
                                                if ($("#aafg").length > 0) {
                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAFGOCT, AAFGOC, AAFGOCT1, AAFGRCEL, AAFGCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAFGCCategoryVal,
                                        "type": AAFGCTypeVal,
                                        "std": AAFGCSTDVal,
                                        "name": AAFGCNameVal,
                                        "thk": AAFGTHKCN,
                                        "temp": AAFGDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAFGDSI + 2 * AAFGTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAFGOCT = parseFloat(result.ot);
                                        if (AAFGOCT < 0) {
                                            south.html("查询锥壳材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFGOC = parseFloat(result.o);
                                        if (AAFGOC < 0) {
                                            south.html("查询锥壳材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFGRCEL = parseFloat(result.rel);
                                        if (AAFGRCEL < 0) {
                                            south.html("查询锥壳材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFGCC1 = parseFloat(result.c1);
                                        if (AAFGCC1 < 0) {
                                            south.html("查询锥壳材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFGOCT1 = parseFloat(result.ot1);

                                        // R
                                        let AAFGR;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= Math.max(0.1 * AAFGDSI, 3 * AAFGTHKCN)) {
                                            AAFGR = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < Math.max(0.1 * AAFGDSI, 3 * AAFGTHKCN)) {
                                            south.html("锥壳大端转角内半径 r 不能小于 " + Math.max(0.1 * AAFGDSI, 3 * AAFGTHKCN).toFixed(2) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR);
                                            aafgSketch.off("resize").on("resize", function () {
                                                if ($("#aafg").length > 0) {
                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR);
                                                }
                                            });
                                        }
                                        aafgd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR);
                                                    aafgSketch.off("resize").on("resize", function () {
                                                        if ($("#aafg").length > 0) {
                                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 锥壳腐蚀裕量
                                        let AAFGCC2;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < AAFGTHKCN) {
                                            AAFGCC2 = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= AAFGTHKCN) {
                                            south.html("锥壳腐蚀裕量不能大于等于 " + AAFGTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 锥壳焊接接头系数
                                        let AAFGEC;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            AAFGEC = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 小端筒体材料名称
                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                            AAFGPNameVal = rows[17][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        let AAFGDP, AAFGPThkMin, AAFGPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": AAFGPCategoryVal,
                                                "type": AAFGPTypeVal,
                                                "std": AAFGPSTDVal,
                                                "name": AAFGPNameVal,
                                                "temp": AAFGDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                AAFGDP = parseFloat(result.density);
                                                AAFGPThkMin = parseFloat(result.thkMin);
                                                AAFGPThkMax = parseFloat(result.thkMax);

                                                // DPI
                                                let AAFGDPI;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) < AAFGDSI) {
                                                    AAFGDPI = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) >= AAFGDSI) {
                                                    south.html("小端筒体内直径Dpi不能大于等于 " + AAFGDSI + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI);
                                                    aafgSketch.off("resize").on("resize", function () {
                                                        if ($("#aafg").length > 0) {
                                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI);
                                                        }
                                                    });
                                                }
                                                aafgd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI);
                                                            aafgSketch.off("resize").on("resize", function () {
                                                                if ($("#aafg").length > 0) {
                                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 小端筒体名义厚度
                                                let AAFGTHKPN;
                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) > AAFGPThkMin
                                                    && parseFloat(rows[19][columns[0][1].field]) <= AAFGPThkMax) {
                                                    AAFGTHKPN = parseFloat(rows[19][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) <= AAFGPThkMin) {
                                                    south.html("小端筒体材料厚度不能小于等于 " + AAFGPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) > AAFGPThkMax) {
                                                    south.html("小端筒体材料厚度不能大于 " + AAFGPThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI, AAFGTHKPN);
                                                    aafgSketch.off("resize").on("resize", function () {
                                                        if ($("#aafg").length > 0) {
                                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI, AAFGTHKPN);
                                                        }
                                                    });
                                                }
                                                aafgd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI, AAFGTHKPN);
                                                            aafgSketch.off("resize").on("resize", function () {
                                                                if ($("#aafg").length > 0) {
                                                                    aafg2d("Φ" + AAFGDSI, AAFGALPHA + "°", AAFGTHKCN, "R" + AAFGR, "Φ" + AAFGDPI, AAFGTHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let AAFGOPT, AAFGOP, AAFGOPT1, AAFGRPEL, AAFGCP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAFGPCategoryVal,
                                                        "type": AAFGPTypeVal,
                                                        "std": AAFGPSTDVal,
                                                        "name": AAFGPNameVal,
                                                        "thk": AAFGTHKPN,
                                                        "temp": AAFGDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": AAFGDPI + 2 * AAFGTHKPN
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAFGOPT = parseFloat(result.ot);
                                                        if (AAFGOPT < 0) {
                                                            south.html("查询小端筒体材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFGOP = parseFloat(result.o);
                                                        if (AAFGOP < 0) {
                                                            south.html("查询小端筒体材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFGRPEL = parseFloat(result.rel);
                                                        if (AAFGRPEL < 0) {
                                                            south.html("查询小端筒体材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFGCP1 = parseFloat(result.c1);
                                                        if (AAFGCP1 < 0) {
                                                            south.html("查询小端筒体材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFGOPT1 = parseFloat(result.ot1);

                                                        // 小端筒体腐蚀裕量
                                                        let AAFGCP2;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                            && parseFloat(rows[20][columns[0][1].field]) < AAFGTHKPN) {
                                                            AAFGCP2 = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                            && parseFloat(rows[20][columns[0][1].field]) >= AAFGTHKPN) {
                                                            south.html("小端筒体腐蚀裕量不能大于等于 " + AAFGTHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 小端筒体焊接接头系数
                                                        let AAFGEP;
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                            AAFGEP = parseFloat(rows[21][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 小端轴向外载荷
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                            AAFGIsPAxial = rows[22][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let AAFGPC = AAFGPD + AAFGPS;
                                                        let AAFGCC = AAFGCC1 + AAFGCC2;
                                                        let AAFGTHKCE = AAFGTHKCN - AAFGCC;
                                                        let AAFGRDSI = AAFGR / AAFGDSI;
                                                        let AAFGCP = AAFGCP1 + AAFGCP2;
                                                        let AAFGTHKPE = AAFGTHKPN - AAFGCP;
                                                        let AAFGDPO = AAFGDPI + 2 * AAFGTHKPN;
                                                        let AAFGDPM = AAFGDPI + AAFGTHKPN;
                                                        let AAFGRPM = AAFGDPM / 2;

                                                        let AAFGTHKSC = AAFGPC * AAFGDSI / (2 * AAFGOCT * AAFGEC - AAFGPC);

                                                        // 获取系数 k
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "gbt_150_2011_table_5_6_get_k.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "alpha": AAFGALPHA,
                                                                "rdil": AAFGRDSI.toFixed(4)
                                                            }),
                                                            beforeSend: function () {
                                                                south.html("<i class='fa fa-spinner fa-pulse fa-fw' style='color:#18bc9c;'></i>" +
                                                                    "<span style='color:#18bc9c;'>&ensp;正在查表5-6获取K值</span>");
                                                            },
                                                            success: function (result) {
                                                                south.html("<i class='fa fa-check' style='color:#18bc9c;'></i>" +
                                                                    "<span style='color:#18bc9c;'>&ensp;查表5-6获取K值成功！</span>");

                                                                let AAFGK = parseFloat(result);

                                                                let AAFGTHKCRC = AAFGK * AAFGPC * AAFGDSI / (2 * AAFGOCT * AAFGEC - 0.5 * AAFGPC);
                                                                let AAFGF = (1 - 2 * AAFGRDSI * (1 - Math.cos(AAFGALPHA / 180 * Math.PI))) / (2 * Math.cos(AAFGALPHA / 180 * Math.PI));
                                                                let AAFGTHKCC = AAFGF * AAFGPC * AAFGDSI / (AAFGOCT * AAFGEC - 0.5 * AAFGPC);
                                                                let AAFGTHKCD = Math.max(AAFGTHKCRC, AAFGTHKCC, AAFGTHKSC, 0.003 * AAFGDSI) + AAFGCC2;
                                                                let AAFGTHKCCHK;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "锥形封头所需厚度：" + (AAFGTHKCD + AAFGCC1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                if (AAFGTHKCN >= (AAFGTHKCD + AAFGCC1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + AAFGTHKCN + " mm" +
                                                                        "</span>");
                                                                    AAFGTHKCCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + AAFGTHKCN + " mm" +
                                                                        "</span>");
                                                                    AAFGTHKCCHK = "不合格";
                                                                }

                                                                // 小端筒体厚度计算
                                                                let AAFGTHKPC = AAFGPC * AAFGDPI / (2 * AAFGOPT * AAFGEP - AAFGPC);
                                                                let AAFGTHKPD = AAFGTHKPC + AAFGCP2;
                                                                let AAFGTHKPCHK;

                                                                // 小端内压加强设计
                                                                let AAFGPCOCTEC = AAFGPC / (AAFGOCT * AAFGEC);
                                                                let AAFGALPHAALLOW;
                                                                if (AAFGPCOCTEC < 0.002 || AAFGPCOCTEC > 0.10) {
                                                                    south.html("查图 5-13 超界，程序无法计算！").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (AAFGPCOCTEC === 0.002) {
                                                                    AAFGALPHAALLOW = 0.704;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.002 && AAFGPCOCTEC < 0.003) {
                                                                    AAFGALPHAALLOW = 0.704 + (AAFGPCOCTEC - 0.002) / (0.003 - 0.002) * (0.933 - 0.704);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.003) {
                                                                    AAFGALPHAALLOW = 0.933;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.003 && AAFGPCOCTEC < 0.004) {
                                                                    AAFGALPHAALLOW = 0.933 + (AAFGPCOCTEC - 0.003) / (0.004 - 0.003) * (1.1 - 0.933);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.004) {
                                                                    AAFGALPHAALLOW = 1.1;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.004 && AAFGPCOCTEC < 0.005) {
                                                                    AAFGALPHAALLOW = 1.1 + (AAFGPCOCTEC - 0.004) / (0.005 - 0.004) * (1.247 - 1.1);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.005) {
                                                                    AAFGALPHAALLOW = 1.247;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.005 && AAFGPCOCTEC < 0.006) {
                                                                    AAFGALPHAALLOW = 1.247 + (AAFGPCOCTEC - 0.005) / (0.006 - 0.005) * (1.375 - 1.247);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.006) {
                                                                    AAFGALPHAALLOW = 1.375;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.006 && AAFGPCOCTEC < 0.007) {
                                                                    AAFGALPHAALLOW = 1.375 + (AAFGPCOCTEC - 0.006) / (0.007 - 0.006) * (1.49 - 1.375);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.007) {
                                                                    AAFGALPHAALLOW = 1.49;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.007 && AAFGPCOCTEC < 0.008) {
                                                                    AAFGALPHAALLOW = 1.49 + (AAFGPCOCTEC - 0.007) / (0.008 - 0.007) * (1.605 - 1.49);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.008) {
                                                                    AAFGALPHAALLOW = 1.605;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.008 && AAFGPCOCTEC < 0.009) {
                                                                    AAFGALPHAALLOW = 1.605 + (AAFGPCOCTEC - 0.008) / (0.009 - 0.008) * (1.686 - 1.605);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.009) {
                                                                    AAFGALPHAALLOW = 1.686;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.009 && AAFGPCOCTEC < 0.010) {
                                                                    AAFGALPHAALLOW = 1.686 + (AAFGPCOCTEC - 0.009) / (0.010 - 0.009) * (1.774 - 1.686);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.010) {
                                                                    AAFGALPHAALLOW = 1.774;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.010 && AAFGPCOCTEC < 0.015) {
                                                                    AAFGALPHAALLOW = 1.774 + (AAFGPCOCTEC - 0.010) / (0.015 - 0.010) * (2.147 - 1.774);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.015) {
                                                                    AAFGALPHAALLOW = 2.147;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.015 && AAFGPCOCTEC < 0.020) {
                                                                    AAFGALPHAALLOW = 2.147 + (AAFGPCOCTEC - 0.015) / (0.02 - 0.015) * (2.5 - 2.147);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.020) {
                                                                    AAFGALPHAALLOW = 2.5;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.020 && AAFGPCOCTEC < 0.030) {
                                                                    AAFGALPHAALLOW = 2.5 + (AAFGPCOCTEC - 0.02) / (0.03 - 0.02) * (3.03 - 2.5);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.030) {
                                                                    AAFGALPHAALLOW = 3.03;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.030 && AAFGPCOCTEC < 0.040) {
                                                                    AAFGALPHAALLOW = 3.03 + (AAFGPCOCTEC - 0.03) / (0.04 - 0.03) * (3.48 - 3.03);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.040) {
                                                                    AAFGALPHAALLOW = 3.48;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.040 && AAFGPCOCTEC < 0.050) {
                                                                    AAFGALPHAALLOW = 3.48 + (AAFGPCOCTEC - 0.04) / (0.05 - 0.04) * (3.86 - 3.48);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.050) {
                                                                    AAFGALPHAALLOW = 3.86;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.050 && AAFGPCOCTEC < 0.060) {
                                                                    AAFGALPHAALLOW = 3.86 + (AAFGPCOCTEC - 0.05) / (0.06 - 0.05) * (4.215 - 3.86);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.060) {
                                                                    AAFGALPHAALLOW = 4.215;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.060 && AAFGPCOCTEC < 0.070) {
                                                                    AAFGALPHAALLOW = 4.215 + (AAFGPCOCTEC - 0.06) / (0.07 - 0.06) * (4.553 - 4.215);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.070) {
                                                                    AAFGALPHAALLOW = 4.553;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.070 && AAFGPCOCTEC < 0.080) {
                                                                    AAFGALPHAALLOW = 4.553 + (AAFGPCOCTEC - 0.07) / (0.08 - 0.07) * (4.855 - 4.553);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.080) {
                                                                    AAFGALPHAALLOW = 4.855;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.080 && AAFGPCOCTEC < 0.090) {
                                                                    AAFGALPHAALLOW = 4.855 + (AAFGPCOCTEC - 0.08) / (0.09 - 0.08) * (5.06 - 4.855);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.090) {
                                                                    AAFGALPHAALLOW = 5.06;
                                                                }
                                                                else if (AAFGPCOCTEC > 0.090 && AAFGPCOCTEC < 0.100) {
                                                                    AAFGALPHAALLOW = 5.06 + (AAFGPCOCTEC - 0.09) / (0.10 - 0.09) * (5.235 - 5.06);
                                                                }
                                                                else if (AAFGPCOCTEC === 0.100) {
                                                                    AAFGALPHAALLOW = 5.235;
                                                                }
                                                                let AAFGALPHACHK = -1,
                                                                    AAFGTHKPCRPM = -1, AAFGQ2 = -1,
                                                                    AAFGTHKPRC = -1, AAFGTHKPRD = -1,
                                                                    AAFGLPRC = -1, AAFGLPRS = -1;
                                                                if (AAFGALPHA < AAFGALPHAALLOW) {

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "小端圆筒所需厚度：" + (AAFGTHKPD + AAFGCP1).toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    if (AAFGTHKPN >= (AAFGTHKPD + AAFGCP1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAFGTHKPN + " mm" +
                                                                            "</span>");
                                                                        AAFGTHKPCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAFGTHKPN + " mm" +
                                                                            "</span>");
                                                                        AAFGTHKPCHK = "不合格";
                                                                    }

                                                                    AAFGALPHACHK = "否";
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
                                                                        "小端圆筒(非加强段)所需厚度：" + (AAFGTHKPD + AAFGCP1).toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    if (AAFGTHKPN >= (AAFGTHKPD + AAFGCP1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAFGTHKPN + " mm" +
                                                                            "</span>");
                                                                        AAFGTHKPCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAFGTHKPN + " mm" +
                                                                            "</span>");
                                                                        AAFGTHKPCHK = "不合格";
                                                                    }

                                                                    AAFGALPHACHK = "是";
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "锥壳小端与筒体连接处是否进行内压加强计算？：是" +
                                                                        "</span>");

                                                                    AAFGTHKPCRPM = AAFGTHKPC / AAFGRPM;

                                                                    // 查图参数
                                                                    if (AAFGTHKPCRPM > 0.1 || AAFGTHKPCRPM < 0.002) {
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
                                                                            "alpha": AAFGALPHA,
                                                                            "thkrs": Math.max(AAFGTHKPCRPM, 0.002)
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            AAFGQ2 = parseFloat(result);
                                                                            if (AAFGTHKPCRPM >= 0.002) {
                                                                                AAFGTHKPRC = AAFGQ2 * AAFGTHKPC;
                                                                            }
                                                                            else {
                                                                                AAFGTHKPRC = 0.001 * AAFGQ2 * AAFGDPI;
                                                                            }

                                                                            AAFGTHKPRD = Math.max(AAFGTHKCC, AAFGTHKPRC, 0.003 * AAFGDPI) + Math.max(AAFGCC2, AAFGCP2);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳与小端筒体连接处加强段设计厚度：" + AAFGTHKPRD.toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            AAFGLPRC = Math.sqrt(2 * AAFGDPI * AAFGTHKPRC / Math.cos(AAFGALPHA / 180 * Math.PI));
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "锥壳小端加强段最小长度：" + AAFGLPRC.toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            AAFGLPRS = Math.sqrt(2 * AAFGDPI * AAFGTHKPRC);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "小端筒体加强段最小长度：" + AAFGLPRS.toFixed(2) + " mm" +
                                                                                "</span>");
                                                                        },
                                                                        error: function () {
                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                "<span style='color:red;'>&ensp;查图5-14获取Q2值获取失败，请检查网络后重试</span>");
                                                                        }
                                                                    });
                                                                }

                                                                // 小端轴向载荷计算
                                                                let AAFGBFP = -1, AAFGSFP = -1, AAFGQP = -1,
                                                                    AAFGPCOPTEP = -1, AAFGDELTAP = -1,
                                                                    AAFGDELTAPCHK = -1,
                                                                    AAFGKP = -1, AAFGARP = -1, AAFGAEP = -1,
                                                                    AAFGAPCHK = -1, AAFGAP = -1,
                                                                    AAFGWRP = -1, AAFGLRP = -1;
                                                                if (AAFGIsPAxial === "是") {

                                                                    // BFP
                                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                        AAFGBFP = parseFloat(rows[23][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    AAFGSFP = AAFGBFP / (Math.PI * AAFGDPM);
                                                                    AAFGQP = AAFGPC * AAFGDPO / 4 + AAFGSFP;
                                                                    if (AAFGQP < 0) {
                                                                        south.html("考虑内压+轴向载荷后，小端轴向总应力为负，程序无法计算！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    AAFGPCOPTEP = AAFGPC / (AAFGOPT * AAFGEP);

                                                                    // Δ
                                                                    if (AAFGPCOPTEP < 0.002) {
                                                                        south.html("查表 5-5 超界，程序无法计算！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (AAFGPCOPTEP === 0.002) {
                                                                        AAFGDELTAP = 4;
                                                                    }
                                                                    else if (AAFGPCOPTEP > 0.002 && AAFGPCOPTEP < 0.005) {
                                                                        AAFGDELTAP = 4 + (AAFGPCOPTEP - 0.002) / (0.005 - 0.002) * (6 - 4);
                                                                    }
                                                                    else if (AAFGPCOPTEP === 0.005) {
                                                                        AAFGDELTAP = 6;
                                                                    }
                                                                    else if (AAFGPCOPTEP > 0.005 && AAFGPCOPTEP < 0.010) {
                                                                        AAFGDELTAP = 6 + (AAFGPCOPTEP - 0.005) / (0.010 - 0.005) * (9 - 6);
                                                                    }
                                                                    else if (AAFGPCOPTEP === 0.010) {
                                                                        AAFGDELTAP = 9;
                                                                    }
                                                                    else if (AAFGPCOPTEP > 0.010 && AAFGPCOPTEP < 0.020) {
                                                                        AAFGDELTAP = 9 + (AAFGPCOPTEP - 0.010) / (0.020 - 0.010) * (12.5 - 9);
                                                                    }
                                                                    else if (AAFGPCOPTEP === 0.020) {
                                                                        AAFGDELTAP = 12.5;
                                                                    }
                                                                    else if (AAFGPCOPTEP > 0.020 && AAFGPCOPTEP < 0.040) {
                                                                        AAFGDELTAP = 12.5 + (AAFGPCOPTEP - 0.020) / (0.040 - 0.020) * (17.5 - 12.5);
                                                                    }
                                                                    else if (AAFGPCOPTEP === 0.040) {
                                                                        AAFGDELTAP = 17.5;
                                                                    }
                                                                    else if (AAFGPCOPTEP > 0.040 && AAFGPCOPTEP < 0.080) {
                                                                        AAFGDELTAP = 17.5 + (AAFGPCOPTEP - 0.040) / (0.080 - 0.040) * (24 - 17.5);
                                                                    }
                                                                    else if (AAFGPCOPTEP === 0.080) {
                                                                        AAFGDELTAP = 24;
                                                                    }
                                                                    else if (AAFGPCOPTEP > 0.080 && AAFGPCOPTEP < 0.10) {
                                                                        AAFGDELTAP = 24 + (AAFGPCOPTEP - 0.080) / (0.10 - 0.080) * (27 - 24);
                                                                    }
                                                                    else if (AAFGPCOPTEP === 0.10) {
                                                                        AAFGDELTAP = 27;
                                                                    }
                                                                    else if (AAFGPCOPTEP > 0.10 && AAFGPCOPTEP < 0.125) {
                                                                        AAFGDELTAP = 27 + (AAFGPCOPTEP - 0.10) / (0.125 - 0.10) * (30 - 27);
                                                                    }
                                                                    else if (AAFGPCOPTEP >= 0.125) {
                                                                        AAFGDELTAP = 30;
                                                                    }

                                                                    if (AAFGALPHA <= AAFGDELTAP) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "锥壳小端是否进行内压+轴向载荷下的加强计算？：否" +
                                                                            "</span>");
                                                                        AAFGDELTAPCHK = "否";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "锥壳小端是否进行内压+轴向载荷下的加强计算？：是" +
                                                                            "</span>");
                                                                        AAFGDELTAPCHK = "是";

                                                                        AAFGKP = 1.0;
                                                                        AAFGARP = AAFGKP * AAFGQP * AAFGDPI * Math.tan(AAFGALPHA / 180 * Math.PI) / (2 * AAFGOPT) * (1 - AAFGDELTAP / AAFGALPHA);
                                                                        AAFGAEP = 0.55 * (AAFGTHKPE - AAFGTHKPC) * Math.sqrt(AAFGDPI * AAFGTHKPE)
                                                                            + 0.55 * (AAFGTHKCE - AAFGTHKCC) * Math.sqrt(AAFGDPI * AAFGTHKCE / Math.cos(AAFGALPHA / 180 * Math.PI));

                                                                        if (AAFGAEP >= AAFGARP) {
                                                                            AAFGAPCHK = "否";
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "小端连接处是否需要设置加强圈？：否" +
                                                                                "</span>");
                                                                        }
                                                                        else {
                                                                            AAFGAPCHK = "是";
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "小端连接处是否需要设置加强圈？：是" +
                                                                                "</span>");

                                                                            AAFGAP = AAFGARP - AAFGAEP;
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "小端加强圈所需截面积：" + AAFGAP.toFixed(2) + " mm²" +
                                                                                "</span>");

                                                                            AAFGWRP = Math.sqrt(AAFGDPI / 2 * AAFGTHKPE);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "加强圈边缘到锥壳和小端筒体连接处许用最大距离：" + AAFGWRP.toFixed(2) + " mm" +
                                                                                "</span>");

                                                                            AAFGLRP = 0.25 * Math.sqrt(AAFGDPI / 2 * AAFGTHKPE);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "加强圈形心到锥壳和小端筒体连接处许用最大距离：" + AAFGLRP.toFixed(2) + " mm" +
                                                                                "</span>");
                                                                        }
                                                                    }
                                                                }

                                                                // 压力试验
                                                                let AAFGETA, AAFGPCT, AAFGPPT, AAFGPT;
                                                                if (AAFGTest === "液压试验") {
                                                                    AAFGETA = 1.25;
                                                                    AAFGPCT = AAFGETA * AAFGPD * AAFGOC / Math.max(AAFGOCT, AAFGOCT1);
                                                                    AAFGPPT = AAFGETA * AAFGPD * AAFGOP / Math.max(AAFGOPT, AAFGOPT1);
                                                                    AAFGPT = Math.min(AAFGPCT, AAFGPPT);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + AAFGPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (AAFGTest === "气压试验") {
                                                                    AAFGETA = 1.10;
                                                                    AAFGPCT = AAFGETA * AAFGPD * AAFGOC / Math.max(AAFGOCT, AAFGOCT1);
                                                                    AAFGPPT = AAFGETA * AAFGPD * AAFGOP / Math.max(AAFGOPT, AAFGOPT1);
                                                                    AAFGPT = Math.min(AAFGPCT, AAFGPPT);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + AAFGPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // docx
                                                                let AAFGPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "aafgdocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "AAFG",

                                                                            pd: AAFGPD,
                                                                            t: AAFGDT,
                                                                            ps: AAFGPS,
                                                                            test: AAFGTest,

                                                                            stdc: AAFGCSTDVal,
                                                                            namec: AAFGCNameVal,
                                                                            dsi: AAFGDSI,
                                                                            r: AAFGR,
                                                                            thkcn: AAFGTHKCN,
                                                                            alpha: AAFGALPHA,
                                                                            cc2: AAFGCC2,
                                                                            ec: AAFGEC,

                                                                            stdp: AAFGPSTDVal,
                                                                            namep: AAFGPNameVal,
                                                                            dpi: AAFGDPI,
                                                                            thkpn: AAFGTHKPN,
                                                                            cp2: AAFGCP2,
                                                                            ep: AAFGEP,
                                                                            bfp: AAFGBFP,

                                                                            dc: AAFGDC.toFixed(4),
                                                                            rcel: AAFGRCEL.toFixed(4),
                                                                            cc1: AAFGCC1.toFixed(4),
                                                                            oct: AAFGOCT.toFixed(4),
                                                                            oc: AAFGOC.toFixed(4),
                                                                            oct1: AAFGOCT1.toFixed(4),

                                                                            dp: AAFGDP.toFixed(4),
                                                                            rpel: AAFGRPEL.toFixed(4),
                                                                            cp1: AAFGCP1.toFixed(4),
                                                                            opt: AAFGOPT.toFixed(4),
                                                                            op: AAFGOP.toFixed(4),
                                                                            opt1: AAFGOPT1.toFixed(4),

                                                                            pc: AAFGPC.toFixed(4),

                                                                            cc: AAFGCC.toFixed(4),
                                                                            thkce: AAFGTHKCE.toFixed(4),
                                                                            rdsi: AAFGRDSI.toFixed(4),

                                                                            cp: AAFGCP.toFixed(4),
                                                                            thkpe: AAFGTHKPE.toFixed(4),
                                                                            dpo: AAFGDPO.toFixed(4),
                                                                            dpm: AAFGDPM.toFixed(4),
                                                                            rpm: AAFGRPM.toFixed(4),
                                                                            sfp: AAFGSFP.toFixed(4),
                                                                            qp: AAFGQP.toFixed(4),

                                                                            thksc: AAFGTHKSC.toFixed(4),
                                                                            k: AAFGK.toFixed(4),
                                                                            thkcrc: AAFGTHKCRC.toFixed(4),
                                                                            f: AAFGF.toFixed(4),
                                                                            thkcc: AAFGTHKCC.toFixed(4),
                                                                            thkcd: AAFGTHKCD.toFixed(4),
                                                                            thkcchk: AAFGTHKCCHK,

                                                                            thkpc: AAFGTHKPC.toFixed(4),
                                                                            thkpd: AAFGTHKPD.toFixed(4),
                                                                            thkpchk: AAFGTHKPCHK,

                                                                            pcoctec: AAFGPCOCTEC.toFixed(4),
                                                                            alphaallow: AAFGALPHAALLOW.toFixed(4),
                                                                            alphachk: AAFGALPHACHK,
                                                                            thkpcrpm: AAFGTHKPCRPM.toFixed(4),
                                                                            q2: AAFGQ2.toFixed(4),
                                                                            thkprc: AAFGTHKPRC.toFixed(4),
                                                                            thkprd: AAFGTHKPRD.toFixed(4),
                                                                            lprc: AAFGLPRC.toFixed(4),
                                                                            lprs: AAFGLPRS.toFixed(4),

                                                                            pcoptep: AAFGPCOPTEP.toFixed(4),
                                                                            deltap: AAFGDELTAP.toFixed(4),
                                                                            deltapchk: AAFGDELTAPCHK,
                                                                            kp: AAFGKP.toFixed(4),
                                                                            arp: AAFGARP.toFixed(4),
                                                                            aep: AAFGAEP.toFixed(4),
                                                                            apchk: AAFGAPCHK,
                                                                            ap: AAFGAP.toFixed(4),
                                                                            wrp: AAFGWRP.toFixed(4),
                                                                            lrp: AAFGLRP.toFixed(4),

                                                                            eta: AAFGETA.toFixed(4),
                                                                            pct: AAFGPCT.toFixed(4),
                                                                            ppt: AAFGPPT.toFixed(4),
                                                                            pt: AAFGPT.toFixed(4),

                                                                            isPAxial: AAFGIsPAxial
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
                                                                                AAFGPayJS.dialog({
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
                                                                                            AAFGPayJS.dialog("close");
                                                                                            AAFGPayJS.dialog("clear");
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
                                                                                                        AAFGPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                AAFGPayJS.dialog('close');
                                                                                                                AAFGPayJS.dialog('clear');
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
                                                                    "<span style='color:red;'>&ensp;查表5-6获取K值失败，请检查网络后重试</span>");
                                                            }
                                                        });
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
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 23).hide();
            }
        });
    });
});