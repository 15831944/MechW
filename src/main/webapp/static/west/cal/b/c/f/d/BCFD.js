$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfdSketch = $("#d2");
    let bcfdModel = $("#d3");
    let bcfdd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfd'></table>");
    let pg = $("#bcfd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/d/BCFD.json", function (result) {

        let BCFDDT,
            BCFDSCategory, BCFDSCategoryVal, BCFDSType, BCFDSTypeVal, BCFDSSTD, BCFDSSTDVal, BCFDSName, BCFDSNameVal,
            BCFDJCategory, BCFDJCategoryVal, BCFDJType, BCFDJTypeVal, BCFDJSTD, BCFDJSTDVal, BCFDJName, BCFDJNameVal,
            columns, rows, ed;

        function bcfd2d(dsi = "ϕDsi", di = "ϕDi", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcfdSketch.empty();

            let width = bcfdSketch.width();
            let height = bcfdSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFDSVG").attr("height", height);

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
            drawLine(padding - thk, height / 2 - ri + thk, padding - thk, height / 2 + sh);
            drawLine(padding - thk, height / 2 - ri + thk, padding, height / 2 - ri + thk);
            drawLine(padding, height / 2 - ri, padding, height / 2 + sh);
            drawLine(padding + 2 * wg, height / 2 - ri, padding + 2 * wg, height / 2 + sh);
            drawLine(padding + 2 * wg + thk, height / 2 - ri + thk, padding + 2 * wg + thk, height / 2 + sh);
            drawLine(padding + 2 * wg, height / 2 - ri + thk, padding + 2 * wg + thk, height / 2 - ri + thk);
            // 顶部
            drawLine(padding + thk, height / 2 - ri, padding + 2 * wg - thk, height / 2 - ri);
            drawLine(padding + thk, height / 2 - ri, padding + thk, height / 2 - ro);
            drawLine(padding, height / 2 - ri, padding + thk, height / 2 - ri);
            drawLine(padding + thk, height / 2 - ro, padding + 2 * wg - thk, height / 2 - ro);
            drawLine(padding + 2 * wg - thk, height / 2 - ri, padding + 2 * wg - thk, height / 2 - ro);
            drawLine(padding + 2 * wg - thk, height / 2 - ri, padding + 2 * wg, height / 2 - ri);
            // 顶部加强筋
            // 左侧
            // 水平
            drawLine(padding + thk, height / 2 - ro - 3 * thk, padding + wg, height / 2 - ro - 3 * thk);
            // 竖直边
            drawLine(padding + thk, height / 2 - ro, padding + thk, height / 2 - ro - 3 * thk);
            // 中心圆竖线
            drawLine(padding + wg - wg / 3, height / 2 - ro, padding + wg - wg / 3, height / 2 - ro - 3 * thk);
            drawLine(padding + wg - wg / 3 - thk, height / 2 - ro, padding + wg - wg / 3 - thk, height / 2 - ro - 3 * thk);
            // 左侧角钢
            svg.append("path").attr("d", line([
                {x: padding, y: height / 2},
                {x: padding + thk, y: height / 2},
                {x: padding + thk, y: height / 2 - ri + thk},
                {x: padding + 4 * thk, y: height / 2 - ri + thk},
                {x: padding + 4 * thk, y: height / 2 - ri}
            ])).classed("sketch", true);

            // 右侧
            // 中心圆
            drawLine(padding + wg + wg / 3, height / 2 - ri, padding + wg + wg / 3, height / 2 - ri + 3 * thk);
            drawLine(padding + wg + wg / 3 + thk, height / 2 - ri, padding + wg + wg / 3 + thk, height / 2 - ri + 3 * thk);
            // 水平线
            drawLine(padding + wg, height / 2 - ri + 3 * thk, width / 2 - thk, height / 2 - ri + 3 * thk);
            // 右侧角钢
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg, y: height / 2},
                {x: padding + 2 * wg - thk, y: height / 2},
                {x: padding + 2 * wg - thk, y: height / 2 - ri + thk},
                {x: padding + 2 * wg - 4 * thk, y: height / 2 - ri + thk},
                {x: padding + 2 * wg - 4 * thk, y: height / 2 - ri}
            ])).classed("sketch", true);

            // dsi
            dimBottomH(padding, height / 2 + sh + 30, padding + 2 * wg, height / 2 + sh + 30, dsi, "BCFDSketchDSI");
            drawLine(padding, height / 2 + sh + 3, padding, height / 2 + sh + 33);
            drawLine(padding + 2 * wg, height / 2 + sh + 3, padding + 2 * wg, height / 2 + sh + 33);

            // di
            dimTopH(padding + wg - wg / 3, height / 2 - ro - 3 * thk, padding + wg + wg / 3, height / 2 - ro - 3 * thk, di, "BCFDSketchDI");

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
                {x: padding + wg + wg / 3 + thk + 15 + 30, y: height / 2 - ro - 3 * thk - 30}
            ])).attr("id", "BCFDSketchTHKJN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFDSketchTHKJN1")
                .attr("startOffset", "50%").text(thkjn);
            drawLine(padding + wg + wg / 3, height / 2 - ro - 3 * thk - 3, padding + wg + wg / 3, height / 2 - ro - 3);
            drawLine(padding + wg + wg / 3 + thk, height / 2 - ro - 3 * thk - 3, padding + wg + wg / 3 + thk, height / 2 - ro - 3);

            // hj1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.25 * wg, y: height / 2 - ro - 3 * thk},
                    {x: padding + 0.25 * wg + 3, y: height / 2 - ro - 3 * thk - 15},
                    {x: padding + 0.25 * wg - 3, y: height / 2 - ro - 3 * thk - 15},
                    {x: padding + 0.25 * wg, y: height / 2 - ro - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.25 * wg, y: height / 2 - ro},
                    {x: padding + 0.25 * wg + 3, y: height / 2 - ro + 15},
                    {x: padding + 0.25 * wg - 3, y: height / 2 - ro + 15},
                    {x: padding + 0.25 * wg, y: height / 2 - ro}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.25 * wg, y: height / 2 - ro - 3 * thk},
                {x: padding + 0.25 * wg, y: height / 2 - ro + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.25 * wg, y: height / 2 - ro - 3 * thk - 15},
                {x: padding + 0.25 * wg, y: height / 2 - ro - 3 * thk - 15 - 40}
            ])).attr("id", "BCFDSketchHJ1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFDSketchHJ1").attr("startOffset", "50%").text(hj);

            // hj2
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2 - ri},
                    {x: padding + 1.5 * wg + 3, y: height / 2 - ri - 15},
                    {x: padding + 1.5 * wg - 3, y: height / 2 - ri - 15},
                    {x: padding + 1.5 * wg, y: height / 2 - ri}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2 - ri + 3 * thk},
                    {x: padding + 1.5 * wg + 3, y: height / 2 - ri + 3 * thk + 15},
                    {x: padding + 1.5 * wg - 3, y: height / 2 - ri + 3 * thk + 15},
                    {x: padding + 1.5 * wg, y: height / 2 - ri + 3 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: height / 2 - ri - 15 - 10},
                {x: padding + 1.5 * wg, y: height / 2 - ri + 3 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: height / 2 - ri + 3 * thk + 15 + 40},
                {x: padding + 1.5 * wg, y: height / 2 - ri + 3 * thk + 15}
            ])).attr("id", "BCFDSketchHJ2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFDSketchHJ2").attr("startOffset", "50%").text(hj);

            // thksn
            let cx1 = padding + 2 * wg - 6 * thk;
            let cy1 = height / 2;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ri, y: cy1},
                    {x: cx1 + ri - 10, y: cy1 - 2},
                    {x: cx1 + ri - 10, y: cy1 + 2},
                    {x: cx1 + ri, y: cy1}
                ])).attr("transform", "rotate(" + -90 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ro, y: cy1},
                    {x: cx1 + ro + 10, y: cy1 - 2},
                    {x: cx1 + ro + 10, y: cy1 + 2},
                    {x: cx1 + ro, y: cy1}
                ])).attr("transform", "rotate(" + -90 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 + ri - 10 - 10, y: cy1},
                    {x: cx1 + ro, y: cy1}
                ])).attr("transform", "rotate(" + -90 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 + ro + 10, y: cy1},
                    {x: cx1 + ro + 10 + 40, y: cy1}
                ])).attr("transform", "rotate(" + -90 + ", " + cx1 + " " + cy1 + ")")
                .attr("id", "BCFDSketchTHKSN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFDSketchTHKSN")
                .attr("startOffset", "50%").text(thksn);

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
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 - r0 / 3) + " "
                + "A" + (r0 / 3) + " " + (r0 / 3) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 + r0 / 3)
            ).attr("stroke-dasharray", "5,5,5").classed("sketch", true);
            drawArc(r0 / 3 + thk, r0 / 3 + thk, cx0, cy0 + r0 / 3 + thk, cx0, cy0 - r0 / 3 - thk);
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 - r0 / 3 - thk) + " "
                + "A" + (r0 / 3 + thk) + " " + (r0 / 3 + thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 + r0 / 3 + thk)
            ).attr("stroke-dasharray", "5,5,5").classed("sketch", true);

            // 中部两个圆
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 + r0 - 2 * thk) + " "
                + "A" + (r0 - 2 * thk) + " " + (r0 - 2 * thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 - r0 + 2 * thk)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 - r0 + 2 * thk) + " "
                + "A" + (r0 - 2 * thk) + " " + (r0 - 2 * thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 + r0 - 2 * thk)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 + r0 - thk) + " "
                + "A" + (r0 - thk) + " " + (r0 - thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 - r0 + thk)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 - r0 + thk) + " "
                + "A" + (r0 - thk) + " " + (r0 - thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 + r0 - thk)
            ).classed("sketch", true);
            // 中心线
            drawCenterLine(cx0 - r0 - 10, cy0, cx0 + r0 + 10, cy0);
            drawCenterLine(cx0, cy0 - r0 - 10, cx0, cy0 + r0 + 10);
            // 筋板
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("stroke-dasharray", "5,5,5")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("stroke-dasharray", "5,5,5")
                .attr("transform", "rotate(" + 60 + ", " + cx0 + " " + cy0 + ")")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + 120 + ", " + cx0 + " " + cy0 + ")")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("stroke-dasharray", "5,5,5")
                .attr("transform", "rotate(" + -60 + ", " + cx0 + " " + cy0 + ")")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + -120 + ", " + cx0 + " " + cy0 + ")")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - 2 * thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + 180 + ", " + cx0 + " " + cy0 + ")")
                .classed("sketch", true);

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
            ])).attr("id", "BCFDSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFDSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFDSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFDSketchAX").attr("startOffset", "50%").text("A向");

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
            ])).attr("id", "BCFDSketchTHKJN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFDSketchTHKJN2").attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = bcfdd2d3.tabs('getTabIndex', bcfdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfd").length > 0) {
                    bcfd2d();
                }
            });
        }
        bcfdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfd").length > 0) {
                            bcfd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号4筋板加强圆平盖计算",
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
                    $(ed.target).combobox("loadData", BCFDSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFDSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFDSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFDSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFDJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFDJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFDJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFDJName);
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
                    bcfdSketch.empty();

                    // model
                    bcfdModel.empty();

                    // sketch
                    currentTabIndex = bcfdd2d3.tabs('getTabIndex', bcfdd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcfd2d();
                        bcfdSketch.off("resize").on("resize", function () {
                            if ($("#bcfd").length > 0) {
                                bcfd2d();
                            }
                        });
                    }
                    bcfdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfd2d();
                                bcfdSketch.off("resize").on("resize", function () {
                                    if ($("#bcfd").length > 0) {
                                        bcfd2d();
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

                        BCFDDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFDSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFDSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFDSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFDJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFDJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFDJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFDJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFDSCategory = [];
                                BCFDJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFDSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFDJCategory[index] = {
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

                        BCFDSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFDSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFDSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFDSCategoryVal,
                                temp: BCFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFDSType = [];
                                $(result).each(function (index, element) {
                                    BCFDSType[index] = {
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

                        BCFDSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFDSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFDSCategoryVal,
                                type: BCFDSTypeVal,
                                temp: BCFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFDSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFDSSTD[index] = {
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

                        BCFDSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFDSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFDSCategoryVal,
                                type: BCFDSTypeVal,
                                std: BCFDSSTDVal,
                                temp: BCFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFDSName = [];
                                $(result).each(function (index, element) {
                                    BCFDSName[index] = {
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

                        BCFDJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFDJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFDJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFDJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFDJCategoryVal,
                                temp: BCFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFDJType = [];
                                $(result).each(function (index, element) {
                                    BCFDJType[index] = {
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

                        BCFDJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFDJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFDJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFDJCategoryVal,
                                type: BCFDJTypeVal,
                                temp: BCFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFDJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFDJSTD[index] = {
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

                        BCFDJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFDJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFDJCategoryVal,
                                type: BCFDJTypeVal,
                                std: BCFDJSTDVal,
                                temp: BCFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFDJName = [];
                                $(result).each(function (index, element) {
                                    BCFDJName[index] = {
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
                        let BCFDPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFDPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFDPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFDPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFDTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFDTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFDSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFDSDensity, BCFDSThkMin, BCFDSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFDSCategoryVal,
                                    "type": BCFDSTypeVal,
                                    "std": BCFDSSTDVal,
                                    "name": BCFDSNameVal,
                                    "temp": BCFDDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFDSDensity = parseFloat(result.density);
                                    BCFDSThkMin = parseFloat(result.thkMin);
                                    BCFDSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFDDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFDDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1));
                                        bcfdSketch.off("resize").on("resize", function () {
                                            if ($("#bcfd").length > 0) {
                                                bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1));
                                            }
                                        });
                                    }
                                    bcfdd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1));
                                                bcfdSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfd").length > 0) {
                                                        bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFDTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFDSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFDSThkMax) {
                                        BCFDTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFDSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFDSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFDSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFDSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN);
                                        bcfdSketch.off("resize").on("resize", function () {
                                            if ($("#bcfd").length > 0) {
                                                bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN);
                                            }
                                        });
                                    }
                                    bcfdd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN);
                                                bcfdSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfd").length > 0) {
                                                        bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFDOST, BCFDOS, BCFDRSEL, BCFDCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFDSCategoryVal,
                                            "type": BCFDSTypeVal,
                                            "std": BCFDSSTDVal,
                                            "name": BCFDSNameVal,
                                            "thk": BCFDTHKSN,
                                            "temp": BCFDDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFDOST = parseFloat(result.ot);
                                            if (BCFDOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFDOS = parseFloat(result.o);
                                            if (BCFDOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFDRSEL = parseFloat(result.rel);
                                            if (BCFDRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFDCS1 = parseFloat(result.c1);
                                            if (BCFDCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFDCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFDTHKSN) {
                                                BCFDCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFDTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFDTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFDES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFDES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFDJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFDJDensity, BCFDJThkMin, BCFDJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFDJCategoryVal,
                                                        "type": BCFDJTypeVal,
                                                        "std": BCFDJSTDVal,
                                                        "name": BCFDJNameVal,
                                                        "temp": BCFDDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFDJDensity = parseFloat(result.density);
                                                        BCFDJThkMin = parseFloat(result.thkMin);
                                                        BCFDJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFDTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFDJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFDJThkMax) {
                                                            BCFDTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFDJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFDJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFDJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFDJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN);
                                                            bcfdSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfd").length > 0) {
                                                                    bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfdd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN);
                                                                    bcfdSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfd").length > 0) {
                                                                            bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFDOJT, BCFDOJ, BCFDRJEL, BCFDCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFDJCategoryVal,
                                                                "type": BCFDJTypeVal,
                                                                "std": BCFDJSTDVal,
                                                                "name": BCFDJNameVal,
                                                                "thk": BCFDTHKJN,
                                                                "temp": BCFDDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFDOJT = parseFloat(result.ot);
                                                                if (BCFDOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFDOJ = parseFloat(result.o);
                                                                if (BCFDOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFDRJEL = parseFloat(result.rel);
                                                                if (BCFDRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFDCJ1 = parseFloat(result.c1);
                                                                if (BCFDCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFDHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFDTHKJN) {
                                                                    BCFDHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFDTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFDTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN, BCFDHJ);
                                                                    bcfdSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfd").length > 0) {
                                                                            bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN, BCFDHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfdd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN, BCFDHJ);
                                                                            bcfdSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfd").length > 0) {
                                                                                    bcfd2d("Φ" + BCFDDSI, "Φ" + (BCFDDSI / 3).toFixed(1), BCFDTHKSN, BCFDTHKJN, BCFDHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFDCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFDTHKJN) {
                                                                    BCFDCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFDTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFDTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFDPC = BCFDPD + BCFDPS;

                                                                let BCFDCS = BCFDCS1 + BCFDCS2;
                                                                let BCFDTHKSE = BCFDTHKSN - BCFDCS;
                                                                let BCFDDC = BCFDDSI + 2 * BCFDCS2;

                                                                let BCFDCJ = BCFDCJ1 + BCFDCJ2;
                                                                let BCFDTHKJE = BCFDTHKJN - BCFDCJ;
                                                                let BCFDHJE = BCFDHJ - BCFDCJ2;

                                                                let BCFDKP = 0.03;
                                                                let BCFDTHKSC = BCFDDC * Math.sqrt(BCFDKP * BCFDPC / (BCFDOST * BCFDES));
                                                                let BCFDTHKSD = BCFDTHKSC + BCFDCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFDTHKSD + BCFDCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFDTHKSCHK;
                                                                if (BCFDTHKSN >= (BCFDTHKSD + BCFDCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFDTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFDTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFDTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFDTHKSCHK = "不合格";
                                                                }

                                                                let BCFDZX = 0.01 * BCFDPC * BCFDDC * BCFDDC * BCFDDC / BCFDOST;
                                                                let BCFDLS = 20 * BCFDTHKSE;
                                                                let BCFDE1 = (BCFDTHKJE * (BCFDHJE + BCFDTHKSE) * (BCFDHJE + BCFDTHKSE) + (BCFDLS - BCFDTHKJE) * BCFDTHKSE * BCFDTHKSE)
                                                                    / (2 * (BCFDTHKJE * (BCFDHJE + BCFDTHKSE) + (BCFDLS - BCFDTHKJE) * BCFDTHKSE));
                                                                let BCFDE2 = BCFDHJE + BCFDTHKSE - BCFDE1;
                                                                let BCFDI = (BCFDLS * BCFDE1 * BCFDE1 * BCFDE1 - (BCFDLS - BCFDTHKJE) * (BCFDE1 - BCFDTHKSE) * (BCFDE1 - BCFDTHKSE) * (BCFDE1 - BCFDTHKSE) + BCFDTHKJE * BCFDE2 * BCFDE2 * BCFDE2) / 3;
                                                                let BCFDZACT = BCFDI / Math.max(BCFDE1, BCFDE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFDZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFDZCHK;
                                                                if (BCFDZACT >= BCFDZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFDZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFDZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFDZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFDZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFDTestPT;
                                                                if (BCFDTest === "液压试验") {
                                                                    BCFDTestPT = Math.max(1.25 * BCFDPD * BCFDOS / BCFDOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFDTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFDTest === "气压试验") {
                                                                    BCFDTestPT = Math.max(1.10 * BCFDPD * BCFDOS / BCFDOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFDTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }

                                                                // MAWP
                                                                let BCFDMAWP = BCFDTHKSE * BCFDTHKSE * BCFDOST * BCFDES / (BCFDKP * BCFDDC * BCFDDC) - BCFDPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFDMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFDPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfddocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFD",

                                                                            t: BCFDDT,
                                                                            pd: BCFDPD,
                                                                            ps: BCFDPS,

                                                                            stds: BCFDSSTDVal,
                                                                            names: BCFDSNameVal,
                                                                            dsi: BCFDDSI,
                                                                            thksn: BCFDTHKSN,
                                                                            cs2: BCFDCS2,
                                                                            es: BCFDES,

                                                                            stdj: BCFDJSTDVal,
                                                                            namej: BCFDJNameVal,
                                                                            thkjn: BCFDTHKJN,
                                                                            hj: BCFDHJ,
                                                                            cj2: BCFDCJ2,

                                                                            test: BCFDTest,

                                                                            ds: BCFDSDensity.toFixed(4),
                                                                            rsel: BCFDRSEL.toFixed(4),
                                                                            cs1: BCFDCS1.toFixed(4),
                                                                            ost: BCFDOST.toFixed(4),
                                                                            os: BCFDOS.toFixed(4),

                                                                            dj: BCFDJDensity.toFixed(4),
                                                                            rjel: BCFDRJEL.toFixed(4),
                                                                            cj1: BCFDCJ1.toFixed(4),
                                                                            ojt: BCFDOJT.toFixed(4),
                                                                            oj: BCFDOJ.toFixed(4),

                                                                            pc: BCFDPC.toFixed(4),

                                                                            cs: BCFDCS.toFixed(4),
                                                                            thkse: BCFDTHKSE.toFixed(4),
                                                                            dc: BCFDDC.toFixed(4),

                                                                            cj: BCFDCJ.toFixed(4),
                                                                            thkje: BCFDTHKJE.toFixed(4),
                                                                            hje: BCFDHJE.toFixed(4),

                                                                            kp: BCFDKP.toFixed(4),

                                                                            thksc: BCFDTHKSC.toFixed(4),
                                                                            thksd: BCFDTHKSD.toFixed(4),
                                                                            thkschk: BCFDTHKSCHK,

                                                                            zx: BCFDZX.toFixed(4),
                                                                            ls: BCFDLS.toFixed(4),
                                                                            e1: BCFDE1.toFixed(4),
                                                                            e2: BCFDE2.toFixed(4),
                                                                            i: BCFDI.toFixed(4),
                                                                            zact: BCFDZACT.toFixed(4),
                                                                            zchk: BCFDZCHK,

                                                                            pt: BCFDTestPT.toFixed(4),
                                                                            mawp: BCFDMAWP.toFixed(4)
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
                                                                                BCFDPayJS.dialog({
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
                                                                                            BCFDPayJS.dialog("close");
                                                                                            BCFDPayJS.dialog("clear");
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
                                                                                                        BCFDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFDPayJS.dialog('close');
                                                                                                                BCFDPayJS.dialog('clear');
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