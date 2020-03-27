$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfhSketch = $("#d2");
    let bcfhModel = $("#d3");
    let bcfhd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfh'></table>");
    let pg = $("#bcfh");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/c/f/h/BCFH.json", function (result) {

        let BCFHDT,
            BCFHSCategory, BCFHSCategoryVal, BCFHSType, BCFHSTypeVal, BCFHSSTD, BCFHSSTDVal, BCFHSName, BCFHSNameVal,
            BCFHJCategory, BCFHJCategoryVal, BCFHJType, BCFHJTypeVal, BCFHJSTD, BCFHJSTDVal, BCFHJName, BCFHJNameVal,
            columns, rows, ed;

        function bcfh2d(dsi = "ϕDsi", di = "ϕDi", thksn = "δsn", r = "r", thkjn = "δjn", hj = "hj") {

            bcfhSketch.empty();

            let width = bcfhSketch.width();
            let height = bcfhSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFHSVG").attr("height", height);

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
            let padding = 45;
            let thk = 6;
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

            // 封头 sketch
            let ri = 4 * thk;
            let ro = ri + thk;
            let sh = 2 * thk;
            // 直边段
            drawLine(padding - thk, height / 2 + sh, padding + 2 * wg + thk, height / 2 + sh);
            drawCenterLine(padding - thk, height / 2, padding + 2 * wg + thk, height / 2);
            drawLine(padding - thk, height / 2, padding - thk, height / 2 + sh);
            drawLine(padding, height / 2, padding, height / 2 + sh);
            drawLine(padding + 2 * wg, height / 2, padding + 2 * wg, height / 2 + sh);
            drawLine(padding + 2 * wg + thk, height / 2, padding + 2 * wg + thk, height / 2 + sh);
            // 顶部
            drawLine(padding + ri, height / 2 - ri, padding + 2 * wg - ri, height / 2 - ri);
            drawLine(padding + ri, height / 2 - ro, padding + 2 * wg - ri, height / 2 - ro);
            // 圆弧段
            drawArc(ri, ri, padding, height / 2, padding + ri, height / 2 - ri);
            drawArc(ro, ro, padding - thk, height / 2, padding + ri, height / 2 - ro);
            drawArc(ri, ri, padding + 2 * wg - ri, height / 2 - ri, padding + 2 * wg, height / 2);
            drawArc(ro, ro, padding + 2 * wg - ri, height / 2 - ro, padding + 2 * wg + thk, height / 2);
            // 顶部加强筋
            drawLine(padding + ri, height / 2 - ro - 3 * thk, width / 2 - ri, height / 2 - ro - 3 * thk);
            drawLine(padding + ri, height / 2 - ro, padding + ri, height / 2 - ro - 3 * thk);
            drawLine(width / 2 - ri, height / 2 - ro, width / 2 - ri, height / 2 - ro - 3 * thk);
            drawLine(padding + wg - wg / 3, height / 2 - ro, padding + wg - wg / 3, height / 2 - ro - 3 * thk);
            drawLine(padding + wg - wg / 3 - thk, height / 2 - ro, padding + wg - wg / 3 - thk, height / 2 - ro - 3 * thk);
            drawLine(padding + wg + wg / 3, height / 2 - ro, padding + wg + wg / 3, height / 2 - ro - 3 * thk);
            drawLine(padding + wg + wg / 3 + thk, height / 2 - ro, padding + wg + wg / 3 + thk, height / 2 - ro - 3 * thk);

            // dsi
            dimBottomH(padding, height / 2 + sh, padding + 2 * wg, height / 2 + sh, dsi, "BCFHSketchDSI");

            // di
            dimTopH(padding + wg - wg / 3, height / 2 - ro - 3 * thk, padding + wg + wg / 3, height / 2 - ro - 3 * thk, di, "BCFHSketchDI");

            // thkjn
            extLineTopV(padding + wg + wg / 3 + thk, height / 2 - ro - 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg + wg / 3 + thk, y: height / 2 - ro - 3 * thk - 30},
                    {x: padding + wg + wg / 3 + thk + 15, y: height / 2 - ro - 3 * thk - 27},
                    {x: padding + wg + wg / 3 + thk + 15, y: height / 2 - ro - 3 * thk - 33},
                    {x: padding + wg + wg / 3 + thk, y: height / 2 - ro - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg + wg / 3, y: height / 2 - ro - 3 * thk - 30},
                {x: padding + wg + wg / 3 + thk, y: height / 2 - ro - 3 * thk - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg + wg / 3 + thk + 15, y: height / 2 - ro - 3 * thk - 30},
                {x: padding + wg + wg / 3 + thk + 15 + 40, y: height / 2 - ro - 3 * thk - 30}
            ])).attr("id", "BCFHSketchTHKJN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFHSketchTHKJN1")
                .attr("startOffset", "50%").text(thkjn);

            // hj
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: height / 2 - ro - 3 * thk},
                    {x: padding + 0.5 * wg + 3, y: height / 2 - ro - 3 * thk - 15},
                    {x: padding + 0.5 * wg - 3, y: height / 2 - ro - 3 * thk - 15},
                    {x: padding + 0.5 * wg, y: height / 2 - ro - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: height / 2 - ro},
                    {x: padding + 0.5 * wg + 3, y: height / 2 - ro + 15},
                    {x: padding + 0.5 * wg - 3, y: height / 2 - ro + 15},
                    {x: padding + 0.5 * wg, y: height / 2 - ro}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: height / 2 - ro - 3 * thk},
                {x: padding + 0.5 * wg, y: height / 2 - ro + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: height / 2 - ro - 3 * thk - 15},
                {x: padding + 0.5 * wg, y: height / 2 - ro - 3 * thk - 15 - 40}
            ])).attr("id", "BCFHSketchHJ").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFHSketchHJ").attr("startOffset", "50%").text(hj);

            // thksn
            let cx1 = padding + 2 * wg - ri;
            let cy1 = height / 2;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ri, y: cy1},
                    {x: cx1 + ri - 10, y: cy1 - 2},
                    {x: cx1 + ri - 10, y: cy1 + 2},
                    {x: cx1 + ri, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ro, y: cy1},
                    {x: cx1 + ro + 10, y: cy1 - 2},
                    {x: cx1 + ro + 10, y: cy1 + 2},
                    {x: cx1 + ro, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 + ri - 10 - 10, y: cy1},
                    {x: cx1 + ro, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 + ro + 10, y: cy1},
                    {x: cx1 + ro + 10 + 40, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")")
                .attr("id", "BCFHSketchTHKSN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFHSketchTHKSN")
                .attr("startOffset", "50%").text(thksn);

            // r
            let cx2 = padding + ri;
            let cy2 = height / 2;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2 - ri, y: cy2},
                    {x: cx2 - ri + 10, y: cy2 - 2},
                    {x: cx2 - ri + 10, y: cy2 + 2},
                    {x: cx2 - ri, y: cy2}
                ])).attr("transform", "rotate(" + 45 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - ro - thk, y: cy2},
                    {x: cx2, y: cy2}
                ])).attr("transform", "rotate(" + 45 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - 0.707 * (ro + thk) - 40, y: cy2 - 0.707 * (ro + thk)},
                    {x: cx2 - 0.707 * (ro + thk), y: cy2 - 0.707 * (ro + thk)}
                ])).attr("id", "BCFHSketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFHSketchR")
                .attr("startOffset", "50%").text(r);

            drawCenterLine(width / 2 - wg, height / 2 + sh + 10, width / 2 - wg, height / 2 - ro - 3 * thk - 10);

            // 俯视图
            let r0 = Math.min(hg, wg);
            let cx0 = padding + 3 * wg;
            let cy0 = padding + 2 * hg;
            // 外圆
            drawArc(r0, r0, cx0, cy0 + r0, cx0, cy0 - r0);
            drawArc(r0, r0, cx0, cy0 - r0, cx0, cy0 + r0);
            // 中心圆
            drawArc(r0 / 3, r0 / 3, cx0, cy0 + r0 / 3, cx0, cy0 - r0 / 3);
            drawArc(r0 / 3, r0 / 3, cx0, cy0 - r0 / 3, cx0, cy0 + r0 / 3);
            drawArc(r0 / 3 + thk, r0 / 3 + thk, cx0, cy0 + r0 / 3 + thk, cx0, cy0 - r0 / 3 - thk);
            drawArc(r0 / 3 + thk, r0 / 3 + thk, cx0, cy0 - r0 / 3 - thk, cx0, cy0 + r0 / 3 + thk);
            // 虚线圆
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 + r0 - 2 * thk) + " "
                + "A" + (r0 - 2 * thk) + " " + (r0 - 2 * thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 - r0 + 2 * thk)
            ).attr("stroke-dasharray", "5,5,5").classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 - r0 + 2 * thk) + " "
                + "A" + (r0 - 2 * thk) + " " + (r0 - 2 * thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 + r0 - 2 * thk)
            ).attr("stroke-dasharray", "5,5,5").classed("sketch", true);
            // 中心线
            drawCenterLine(cx0 - r0 - 10, cy0, cx0 + r0 + 10, cy0);
            drawCenterLine(cx0, cy0 - r0 - 10, cx0, cy0 + r0 + 10);
            // 筋板
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + 60 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + 120 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + -60 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + -120 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 - thk / 2},
                {x: cx0 + r0 - 10, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + 180 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);

            // A 向
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: padding + 0.75 * hg},
                    {x: padding + wg + 3, y: padding + 0.75 * hg - 15},
                    {x: padding + wg - 3, y: padding + 0.75 * hg - 15},
                    {x: padding + wg, y: padding + 0.75 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 0.75 * hg},
                {x: padding + wg, y: padding + 0.75 * hg - 35}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFHSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFHSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFHSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFHSketchAX").attr("startOffset", "50%").text("A向");

            // 筋板 thkjn
            let startX = cx0 + r0 - 10;
            let startY = cy0 + thk / 2;
            let endX = cx0 + r0 - 10;
            let endY = cy0 - thk / 2;
            extLineRightH(startX, startY);
            extLineRightH(endX, endY);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: startX + 30, y: startY},
                    {x: startX + 27, y: startY + 15},
                    {x: startX + 33, y: startY + 15},
                    {x: startX + 30, y: startY}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: endX + 30, y: endY},
                    {x: endX + 27, y: endY - 15},
                    {x: endX + 33, y: endY - 15},
                    {x: endX + 30, y: endY}
                ]));
            svg.append("path").attr("d", line([
                {x: startX + 30, y: endY},
                {x: endX + 30, y: startY + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: startX + 30, y: endY - 15},
                {x: endX + 30, y: endY - 15 - 40}
            ])).attr("id", "BCFHSketchTHKJN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFHSketchTHKJN2").attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = bcfhd2d3.tabs('getTabIndex', bcfhd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfh2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfh").length > 0) {
                    bcfh2d();
                }
            });
        }
        bcfhd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfh2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfh").length > 0) {
                            bcfh2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号8筋板加强圆平盖计算",
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
                    $(ed.target).combobox("loadData", BCFHSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFHSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFHSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFHSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFHJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFHJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFHJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFHJName);
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
                    bcfhSketch.empty();

                    // model
                    bcfhModel.empty();

                    // index
                    currentTabIndex = bcfhd2d3.tabs('getTabIndex', bcfhd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcfh2d();
                        bcfhSketch.off("resize").on("resize", function () {
                            if ($("#bcfh").length > 0) {
                                bcfh2d();
                            }
                        });
                    }
                    bcfhd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfh2d();
                                bcfhSketch.off("resize").on("resize", function () {
                                    if ($("#bcfh").length > 0) {
                                        bcfh2d();
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

                        BCFHDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFHSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFHSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFHSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFHSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFHJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFHJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFHJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFHJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFHSCategory = [];
                                BCFHJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFHDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFHSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFHJCategory[index] = {
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

                        BCFHSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFHSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFHSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFHSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFHSCategoryVal,
                                temp: BCFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFHSType = [];
                                $(result).each(function (index, element) {
                                    BCFHSType[index] = {
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

                        BCFHSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFHSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFHSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFHSCategoryVal,
                                type: BCFHSTypeVal,
                                temp: BCFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFHSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFHSSTD[index] = {
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

                        BCFHSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFHSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFHSCategoryVal,
                                type: BCFHSTypeVal,
                                std: BCFHSSTDVal,
                                temp: BCFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFHSName = [];
                                $(result).each(function (index, element) {
                                    BCFHSName[index] = {
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

                        BCFHJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFHJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFHJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFHJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFHJCategoryVal,
                                temp: BCFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFHJType = [];
                                $(result).each(function (index, element) {
                                    BCFHJType[index] = {
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

                        BCFHJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFHJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFHJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFHJCategoryVal,
                                type: BCFHJTypeVal,
                                temp: BCFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFHJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFHJSTD[index] = {
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

                        BCFHJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFHJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFHJCategoryVal,
                                type: BCFHJTypeVal,
                                std: BCFHJSTDVal,
                                temp: BCFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFHJName = [];
                                $(result).each(function (index, element) {
                                    BCFHJName[index] = {
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

                        // pd
                        let BCFHPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFHPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFHPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFHPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFHTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFHTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFHSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFHSDensity, BCFHSThkMin, BCFHSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFHSCategoryVal,
                                    "type": BCFHSTypeVal,
                                    "std": BCFHSSTDVal,
                                    "name": BCFHSNameVal,
                                    "temp": BCFHDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {


                                    BCFHSDensity = parseFloat(result.density);
                                    BCFHSThkMin = parseFloat(result.thkMin);
                                    BCFHSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFHDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFHDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1));
                                        bcfhSketch.off("resize").on("resize", function () {
                                            if ($("#bcfh").length > 0) {
                                                bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1));
                                            }
                                        });
                                    }
                                    bcfhd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1));
                                                bcfhSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfh").length > 0) {
                                                        bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFHTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFHSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFHSThkMax) {
                                        BCFHTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFHSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFHSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFHSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFHSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN);
                                        bcfhSketch.off("resize").on("resize", function () {
                                            if ($("#bcfh").length > 0) {
                                                bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN);
                                            }
                                        });
                                    }
                                    bcfhd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN);
                                                bcfhSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfh").length > 0) {
                                                        bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFHOST, BCFHOS, BCFHRSEL, BCFHCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFHSCategoryVal,
                                            "type": BCFHSTypeVal,
                                            "std": BCFHSSTDVal,
                                            "name": BCFHSNameVal,
                                            "thk": BCFHTHKSN,
                                            "temp": BCFHDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFHOST = parseFloat(result.ot);
                                            if (BCFHOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFHOS = parseFloat(result.o);
                                            if (BCFHOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFHRSEL = parseFloat(result.rel);
                                            if (BCFHRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFHCS1 = parseFloat(result.c1);
                                            if (BCFHCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFHCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFHTHKSN) {
                                                BCFHCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFHTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFHTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFHES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFHES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFHJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFHJDensity, BCFHJThkMin, BCFHJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFHJCategoryVal,
                                                        "type": BCFHJTypeVal,
                                                        "std": BCFHJSTDVal,
                                                        "name": BCFHJNameVal,
                                                        "temp": BCFHDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFHJDensity = parseFloat(result.density);
                                                        BCFHJThkMin = parseFloat(result.thkMin);
                                                        BCFHJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFHTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFHJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFHJThkMax) {
                                                            BCFHTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFHJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFHJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFHJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFHJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN);
                                                            bcfhSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfh").length > 0) {
                                                                    bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfhd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN);
                                                                    bcfhSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfh").length > 0) {
                                                                            bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFHOJT, BCFHOJ, BCFHRJEL, BCFHCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFHJCategoryVal,
                                                                "type": BCFHJTypeVal,
                                                                "std": BCFHJSTDVal,
                                                                "name": BCFHJNameVal,
                                                                "thk": BCFHTHKJN,
                                                                "temp": BCFHDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFHOJT = parseFloat(result.ot);
                                                                if (BCFHOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFHOJ = parseFloat(result.o);
                                                                if (BCFHOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFHRJEL = parseFloat(result.rel);
                                                                if (BCFHRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFHCJ1 = parseFloat(result.c1);
                                                                if (BCFHCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFHHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFHTHKJN) {
                                                                    BCFHHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFHTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFHTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN, BCFHHJ);
                                                                    bcfhSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfh").length > 0) {
                                                                            bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN, BCFHHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfhd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN, BCFHHJ);
                                                                            bcfhSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfh").length > 0) {
                                                                                    bcfh2d("Φ" + BCFHDSI, "Φ" + (BCFHDSI / 3).toFixed(1), BCFHTHKSN, "r≥" + BCFHTHKSN, BCFHTHKJN, BCFHHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFHCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFHTHKJN) {
                                                                    BCFHCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFHTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFHTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFHPC = BCFHPD + BCFHPS;

                                                                let BCFHCS = BCFHCS1 + BCFHCS2;
                                                                let BCFHTHKSE = BCFHTHKSN - BCFHCS;
                                                                let BCFHDC = BCFHDSI + 2 * BCFHCS2;

                                                                let BCFHCJ = BCFHCJ1 + BCFHCJ2;
                                                                let BCFHTHKJE = BCFHTHKJN - BCFHCJ;
                                                                let BCFHHJE = BCFHHJ - BCFHCJ2;

                                                                let BCFHKP = 0.03;
                                                                let BCFHTHKSC = BCFHDC * Math.sqrt(BCFHKP * BCFHPC / (BCFHOST * BCFHES));
                                                                let BCFHTHKSD = BCFHTHKSC + BCFHCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFHTHKSD + BCFHCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFHTHKSCHK;
                                                                if (BCFHTHKSN >= (BCFHTHKSD + BCFHCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFHTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFHTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFHTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFHTHKSCHK = "不合格";
                                                                }

                                                                let BCFHZX = 0.01 * BCFHPC * BCFHDC * BCFHDC * BCFHDC / BCFHOST;
                                                                let BCFHLS = 20 * BCFHTHKSE;
                                                                let BCFHE1 = (BCFHTHKJE * (BCFHHJE + BCFHTHKSE) * (BCFHHJE + BCFHTHKSE) + (BCFHLS - BCFHTHKJE) * BCFHTHKSE * BCFHTHKSE)
                                                                    / (2 * (BCFHTHKJE * (BCFHHJE + BCFHTHKSE) + (BCFHLS - BCFHTHKJE) * BCFHTHKSE));
                                                                let BCFHE2 = BCFHHJE + BCFHTHKSE - BCFHE1;
                                                                let BCFHI = (BCFHLS * BCFHE1 * BCFHE1 * BCFHE1 - (BCFHLS - BCFHTHKJE) * (BCFHE1 - BCFHTHKSE) * (BCFHE1 - BCFHTHKSE) * (BCFHE1 - BCFHTHKSE) + BCFHTHKJE * BCFHE2 * BCFHE2 * BCFHE2) / 3;
                                                                let BCFHZACT = BCFHI / Math.max(BCFHE1, BCFHE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFHZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFHZCHK;
                                                                if (BCFHZACT >= BCFHZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFHZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFHZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFHZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFHZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFHTestPT;
                                                                if (BCFHTest === "液压试验") {
                                                                    BCFHTestPT = Math.max(1.25 * BCFHPD * BCFHOS / BCFHOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFHTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFHTest === "气压试验") {
                                                                    BCFHTestPT = Math.max(1.10 * BCFHPD * BCFHOS / BCFHOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFHTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                // MAWP
                                                                let BCFHMAWP = BCFHTHKSE * BCFHTHKSE * BCFHOST * BCFHES / (BCFHKP * BCFHDC * BCFHDC) - BCFHPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFHMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFHPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfhdocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFH",

                                                                            t: BCFHDT,
                                                                            pd: BCFHPD,
                                                                            ps: BCFHPS,

                                                                            stds: BCFHSSTDVal,
                                                                            names: BCFHSNameVal,
                                                                            dsi: BCFHDSI,
                                                                            thksn: BCFHTHKSN,
                                                                            cs2: BCFHCS2,
                                                                            es: BCFHES,

                                                                            stdj: BCFHJSTDVal,
                                                                            namej: BCFHJNameVal,
                                                                            thkjn: BCFHTHKJN,
                                                                            hj: BCFHHJ,
                                                                            cj2: BCFHCJ2,

                                                                            test: BCFHTest,

                                                                            ds: BCFHSDensity.toFixed(4),
                                                                            rsel: BCFHRSEL.toFixed(4),
                                                                            cs1: BCFHCS1.toFixed(4),
                                                                            ost: BCFHOST.toFixed(4),
                                                                            os: BCFHOS.toFixed(4),

                                                                            dj: BCFHJDensity.toFixed(4),
                                                                            rjel: BCFHRJEL.toFixed(4),
                                                                            cj1: BCFHCJ1.toFixed(4),
                                                                            ojt: BCFHOJT.toFixed(4),
                                                                            oj: BCFHOJ.toFixed(4),

                                                                            pc: BCFHPC.toFixed(4),

                                                                            cs: BCFHCS.toFixed(4),
                                                                            thkse: BCFHTHKSE.toFixed(4),
                                                                            dc: BCFHDC.toFixed(4),

                                                                            cj: BCFHCJ.toFixed(4),
                                                                            thkje: BCFHTHKJE.toFixed(4),
                                                                            hje: BCFHHJE.toFixed(4),

                                                                            kp: BCFHKP.toFixed(4),

                                                                            thksc: BCFHTHKSC.toFixed(4),
                                                                            thksd: BCFHTHKSD.toFixed(4),
                                                                            thkschk: BCFHTHKSCHK,

                                                                            zx: BCFHZX.toFixed(4),
                                                                            ls: BCFHLS.toFixed(4),
                                                                            e1: BCFHE1.toFixed(4),
                                                                            e2: BCFHE2.toFixed(4),
                                                                            i: BCFHI.toFixed(4),
                                                                            zact: BCFHZACT.toFixed(4),
                                                                            zchk: BCFHZCHK,

                                                                            pt: BCFHTestPT.toFixed(4),
                                                                            mawp: BCFHMAWP.toFixed(4)
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
                                                                                BCFHPayJS.dialog({
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
                                                                                            BCFHPayJS.dialog("close");
                                                                                            BCFHPayJS.dialog("clear");
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
                                                                                                        BCFHPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFHPayJS.dialog('close');
                                                                                                                BCFHPayJS.dialog('clear');
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
        })
    });
});