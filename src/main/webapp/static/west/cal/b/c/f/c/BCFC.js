$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfcSketch = $("#d2");
    let bcfcModel = $("#d3");
    let bcfcd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfc'></table>");
    let pg = $("#bcfc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/c/BCFC.json", function (result) {

        let BCFCDT,
            BCFCSCategory, BCFCSCategoryVal, BCFCSType, BCFCSTypeVal, BCFCSSTD, BCFCSSTDVal, BCFCSName, BCFCSNameVal,
            BCFCJCategory, BCFCJCategoryVal, BCFCJType, BCFCJTypeVal, BCFCJSTD, BCFCJSTDVal, BCFCJName, BCFCJNameVal,
            columns, rows, ed;

        function bcfc2d(dsi = "ϕDsi", di = "ϕDi", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcfcSketch.empty();

            let width = bcfcSketch.width();
            let height = bcfcSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFCSVG").attr("height", height);

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
            drawLine(padding - thk, height / 2 - ri, padding - thk, height / 2 + sh);
            drawLine(padding, height / 2 - ri, padding, height / 2 + sh);
            drawLine(padding + 2 * wg, height / 2 - ri, padding + 2 * wg, height / 2 + sh);
            drawLine(padding + 2 * wg + thk, height / 2 - ri, padding + 2 * wg + thk, height / 2 + sh);
            // 顶部
            drawLine(padding - 2 * thk, height / 2 - ri, padding + 2 * wg + 2 * thk, height / 2 - ri);
            drawLine(padding - 2 * thk, height / 2 - ri, padding - 2 * thk, height / 2 - ro);
            drawLine(padding - 2 * thk, height / 2 - ro, padding + 2 * wg + 2 * thk, height / 2 - ro);
            drawLine(padding + 2 * wg + 2 * thk, height / 2 - ri, padding + 2 * wg + 2 * thk, height / 2 - ro);
            // 顶部加强筋
            // 左侧
            // 水平
            drawLine(padding - 2 * thk, height / 2 - ro - 3 * thk, padding + wg, height / 2 - ro - 3 * thk);
            // 竖直边
            drawLine(padding - 2 * thk, height / 2 - ro, padding - 2 * thk, height / 2 - ro - 3 * thk);
            // 中心圆竖线
            drawLine(padding + wg - wg / 3, height / 2 - ro, padding + wg - wg / 3, height / 2 - ro - 3 * thk);
            drawLine(padding + wg - wg / 3 - thk, height / 2 - ro, padding + wg - wg / 3 - thk, height / 2 - ro - 3 * thk);

            // 右侧
            // 中心圆
            drawLine(padding + wg + wg / 3, height / 2 - ri, padding + wg + wg / 3, height / 2 - ri + 3 * thk);
            drawLine(padding + wg + wg / 3 + thk, height / 2 - ri, padding + wg + wg / 3 + thk, height / 2 - ri + 3 * thk);
            // 水平线
            drawLine(padding + wg, height / 2 - ri + 3 * thk, width / 2, height / 2 - ri + 3 * thk);

            // dsi
            dimBottomH(padding, height / 2 + sh + 30, padding + 2 * wg, height / 2 + sh + 30, dsi, "BCFCSketchDSI");
            drawLine(padding, height / 2 + sh + 3, padding, height / 2 + sh + 33);
            drawLine(padding + 2 * wg, height / 2 + sh + 3, padding + 2 * wg, height / 2 + sh + 33);

            // di
            dimTopH(padding + wg - wg / 3, height / 2 - ro - 3 * thk, padding + wg + wg / 3, height / 2 - ro - 3 * thk, di, "BCFCSketchDI");

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
            ])).attr("id", "BCFCSketchTHKJN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFCSketchTHKJN1")
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
            ])).attr("id", "BCFCSketchHJ1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFCSketchHJ1").attr("startOffset", "50%").text(hj);

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
            ])).attr("id", "BCFCSketchHJ2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFCSketchHJ2").attr("startOffset", "50%").text(hj);

            // thksn
            let cx1 = padding + 2 * wg - 0.25 * ri;
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
                .attr("id", "BCFCSketchTHKSN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFCSketchTHKSN")
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
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 + r0 - thk) + " "
                + "A" + (r0 - thk) + " " + (r0 - thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 - r0 + thk)
            ).attr("stroke-dasharray", "5,5,5").classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 - r0 + thk) + " "
                + "A" + (r0 - thk) + " " + (r0 - thk) + " "
                + "1 0 1" + " "
                + (cx0) + " " + (cy0 + r0 - thk)
            ).attr("stroke-dasharray", "5,5,5").classed("sketch", true);
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
                {x: cx0 + r0, y: cy0 - thk / 2},
                {x: cx0 + r0, y: cy0 + thk / 2},
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
                {x: cx0 + r0, y: cy0 - thk / 2},
                {x: cx0 + r0, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ]))
                .attr("transform", "rotate(" + -120 + ", " + cx0 + " " + cy0 + ")")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0, y: cy0 - thk / 2},
                {x: cx0 + r0, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ]))
                .attr("transform", "rotate(" + 180 + ", " + cx0 + " " + cy0 + ")")
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
            ])).attr("id", "BCFCSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFCSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFCSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFCSketchAX").attr("startOffset", "50%").text("A向");

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
            ])).attr("id", "BCFCSketchTHKJN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFCSketchTHKJN2").attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = bcfcd2d3.tabs('getTabIndex', bcfcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfc").length > 0) {
                    bcfc2d();
                }
            });
        }
        bcfcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfc").length > 0) {
                            bcfc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号3筋板加强圆平盖计算",
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
                    $(ed.target).combobox("loadData", BCFCSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFCSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFCSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFCSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFCJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFCJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFCJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFCJName);
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
                    bcfcSketch.empty();

                    // model
                    bcfcModel.empty();

                    // sketch
                    currentTabIndex = bcfcd2d3.tabs('getTabIndex', bcfcd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcfc2d();
                        bcfcSketch.off("resize").on("resize", function () {
                            if ($("#bcfc").length > 0) {
                                bcfc2d();
                            }
                        });
                    }
                    bcfcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfc2d();
                                bcfcSketch.off("resize").on("resize", function () {
                                    if ($("#bcfc").length > 0) {
                                        bcfc2d();
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

                        BCFCDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFCSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFCSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFCSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFCJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFCJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFCJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFCJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFCSCategory = [];
                                BCFCJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFCSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFCJCategory[index] = {
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

                        BCFCSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFCSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFCSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFCSCategoryVal,
                                temp: BCFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFCSType = [];
                                $(result).each(function (index, element) {
                                    BCFCSType[index] = {
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

                        BCFCSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFCSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFCSCategoryVal,
                                type: BCFCSTypeVal,
                                temp: BCFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFCSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFCSSTD[index] = {
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

                        BCFCSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFCSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFCSCategoryVal,
                                type: BCFCSTypeVal,
                                std: BCFCSSTDVal,
                                temp: BCFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFCSName = [];
                                $(result).each(function (index, element) {
                                    BCFCSName[index] = {
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

                        BCFCJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFCJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFCJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFCJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFCJCategoryVal,
                                temp: BCFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFCJType = [];
                                $(result).each(function (index, element) {
                                    BCFCJType[index] = {
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

                        BCFCJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFCJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFCJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFCJCategoryVal,
                                type: BCFCJTypeVal,
                                temp: BCFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFCJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFCJSTD[index] = {
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

                        BCFCJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFCJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFCJCategoryVal,
                                type: BCFCJTypeVal,
                                std: BCFCJSTDVal,
                                temp: BCFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFCJName = [];
                                $(result).each(function (index, element) {
                                    BCFCJName[index] = {
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
                        let BCFCPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFCPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFCPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFCPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFCTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFCTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFCSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFCSDensity, BCFCSThkMin, BCFCSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFCSCategoryVal,
                                    "type": BCFCSTypeVal,
                                    "std": BCFCSSTDVal,
                                    "name": BCFCSNameVal,
                                    "temp": BCFCDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFCSDensity = parseFloat(result.density);
                                    BCFCSThkMin = parseFloat(result.thkMin);
                                    BCFCSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFCDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFCDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1));
                                        bcfcSketch.off("resize").on("resize", function () {
                                            if ($("#bcfc").length > 0) {
                                                bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1));
                                            }
                                        });
                                    }
                                    bcfcd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1));
                                                bcfcSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfc").length > 0) {
                                                        bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFCTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFCSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFCSThkMax) {
                                        BCFCTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFCSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFCSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFCSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFCSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN);
                                        bcfcSketch.off("resize").on("resize", function () {
                                            if ($("#bcfc").length > 0) {
                                                bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN);
                                            }
                                        });
                                    }
                                    bcfcd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN);
                                                bcfcSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfc").length > 0) {
                                                        bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFCOST, BCFCOS, BCFCRSEL, BCFCCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFCSCategoryVal,
                                            "type": BCFCSTypeVal,
                                            "std": BCFCSSTDVal,
                                            "name": BCFCSNameVal,
                                            "thk": BCFCTHKSN,
                                            "temp": BCFCDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFCOST = parseFloat(result.ot);
                                            if (BCFCOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFCOS = parseFloat(result.o);
                                            if (BCFCOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFCRSEL = parseFloat(result.rel);
                                            if (BCFCRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFCCS1 = parseFloat(result.c1);
                                            if (BCFCCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFCCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFCTHKSN) {
                                                BCFCCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFCTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFCTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFCES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFCES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFCJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFCJDensity, BCFCJThkMin, BCFCJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFCJCategoryVal,
                                                        "type": BCFCJTypeVal,
                                                        "std": BCFCJSTDVal,
                                                        "name": BCFCJNameVal,
                                                        "temp": BCFCDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFCJDensity = parseFloat(result.density);
                                                        BCFCJThkMin = parseFloat(result.thkMin);
                                                        BCFCJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFCTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFCJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFCJThkMax) {
                                                            BCFCTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFCJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFCJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFCJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFCJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN);
                                                            bcfcSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfc").length > 0) {
                                                                    bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN);
                                                                    bcfcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfc").length > 0) {
                                                                            bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFCOJT, BCFCOJ, BCFCRJEL, BCFCCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFCJCategoryVal,
                                                                "type": BCFCJTypeVal,
                                                                "std": BCFCJSTDVal,
                                                                "name": BCFCJNameVal,
                                                                "thk": BCFCTHKJN,
                                                                "temp": BCFCDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFCOJT = parseFloat(result.ot);
                                                                if (BCFCOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFCOJ = parseFloat(result.o);
                                                                if (BCFCOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFCRJEL = parseFloat(result.rel);
                                                                if (BCFCRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFCCJ1 = parseFloat(result.c1);
                                                                if (BCFCCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFCHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFCTHKJN) {
                                                                    BCFCHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFCTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFCTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN, BCFCHJ);
                                                                    bcfcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfc").length > 0) {
                                                                            bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN, BCFCHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfcd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN, BCFCHJ);
                                                                            bcfcSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfc").length > 0) {
                                                                                    bcfc2d("Φ" + BCFCDSI, "Φ" + (BCFCDSI / 3).toFixed(1), BCFCTHKSN, BCFCTHKJN, BCFCHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFCCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFCTHKJN) {
                                                                    BCFCCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFCTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFCTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFCPC = BCFCPD + BCFCPS;

                                                                let BCFCCS = BCFCCS1 + BCFCCS2;
                                                                let BCFCTHKSE = BCFCTHKSN - BCFCCS;
                                                                let BCFCDC = BCFCDSI + 2 * BCFCCS2;

                                                                let BCFCCJ = BCFCCJ1 + BCFCCJ2;
                                                                let BCFCTHKJE = BCFCTHKJN - BCFCCJ;
                                                                let BCFCHJE = BCFCHJ - BCFCCJ2;

                                                                let BCFCKP = 0.03;
                                                                let BCFCTHKSC = BCFCDC * Math.sqrt(BCFCKP * BCFCPC / (BCFCOST * BCFCES));
                                                                let BCFCTHKSD = BCFCTHKSC + BCFCCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFCTHKSD + BCFCCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFCTHKSCHK;
                                                                if (BCFCTHKSN >= (BCFCTHKSD + BCFCCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFCTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFCTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFCTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFCTHKSCHK = "不合格";
                                                                }

                                                                let BCFCZX = 0.01 * BCFCPC * BCFCDC * BCFCDC * BCFCDC / BCFCOST;
                                                                let BCFCLS = 20 * BCFCTHKSE;
                                                                let BCFCE1 = (BCFCTHKJE * (BCFCHJE + BCFCTHKSE) * (BCFCHJE + BCFCTHKSE) + (BCFCLS - BCFCTHKJE) * BCFCTHKSE * BCFCTHKSE)
                                                                    / (2 * (BCFCTHKJE * (BCFCHJE + BCFCTHKSE) + (BCFCLS - BCFCTHKJE) * BCFCTHKSE));
                                                                let BCFCE2 = BCFCHJE + BCFCTHKSE - BCFCE1;
                                                                let BCFCI = (BCFCLS * BCFCE1 * BCFCE1 * BCFCE1 - (BCFCLS - BCFCTHKJE) * (BCFCE1 - BCFCTHKSE) * (BCFCE1 - BCFCTHKSE) * (BCFCE1 - BCFCTHKSE) + BCFCTHKJE * BCFCE2 * BCFCE2 * BCFCE2) / 3;
                                                                let BCFCZACT = BCFCI / Math.max(BCFCE1, BCFCE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFCZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFCZCHK;
                                                                if (BCFCZACT >= BCFCZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFCZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFCZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFCZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFCZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFCTestPT;
                                                                if (BCFCTest === "液压试验") {
                                                                    BCFCTestPT = Math.max(1.25 * BCFCPD * BCFCOS / BCFCOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFCTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFCTest === "气压试验") {
                                                                    BCFCTestPT = Math.max(1.10 * BCFCPD * BCFCOS / BCFCOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFCTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }

                                                                // MAWP
                                                                let BCFCMAWP = BCFCTHKSE * BCFCTHKSE * BCFCOST * BCFCES / (BCFCKP * BCFCDC * BCFCDC) - BCFCPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFCMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFCPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfcdocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFC",

                                                                            t: BCFCDT,
                                                                            pd: BCFCPD,
                                                                            ps: BCFCPS,

                                                                            stds: BCFCSSTDVal,
                                                                            names: BCFCSNameVal,
                                                                            dsi: BCFCDSI,
                                                                            thksn: BCFCTHKSN,
                                                                            cs2: BCFCCS2,
                                                                            es: BCFCES,

                                                                            stdj: BCFCJSTDVal,
                                                                            namej: BCFCJNameVal,
                                                                            thkjn: BCFCTHKJN,
                                                                            hj: BCFCHJ,
                                                                            cj2: BCFCCJ2,

                                                                            test: BCFCTest,

                                                                            ds: BCFCSDensity.toFixed(4),
                                                                            rsel: BCFCRSEL.toFixed(4),
                                                                            cs1: BCFCCS1.toFixed(4),
                                                                            ost: BCFCOST.toFixed(4),
                                                                            os: BCFCOS.toFixed(4),

                                                                            dj: BCFCJDensity.toFixed(4),
                                                                            rjel: BCFCRJEL.toFixed(4),
                                                                            cj1: BCFCCJ1.toFixed(4),
                                                                            ojt: BCFCOJT.toFixed(4),
                                                                            oj: BCFCOJ.toFixed(4),

                                                                            pc: BCFCPC.toFixed(4),

                                                                            cs: BCFCCS.toFixed(4),
                                                                            thkse: BCFCTHKSE.toFixed(4),
                                                                            dc: BCFCDC.toFixed(4),

                                                                            cj: BCFCCJ.toFixed(4),
                                                                            thkje: BCFCTHKJE.toFixed(4),
                                                                            hje: BCFCHJE.toFixed(4),

                                                                            kp: BCFCKP.toFixed(4),

                                                                            thksc: BCFCTHKSC.toFixed(4),
                                                                            thksd: BCFCTHKSD.toFixed(4),
                                                                            thkschk: BCFCTHKSCHK,

                                                                            zx: BCFCZX.toFixed(4),
                                                                            ls: BCFCLS.toFixed(4),
                                                                            e1: BCFCE1.toFixed(4),
                                                                            e2: BCFCE2.toFixed(4),
                                                                            i: BCFCI.toFixed(4),
                                                                            zact: BCFCZACT.toFixed(4),
                                                                            zchk: BCFCZCHK,

                                                                            pt: BCFCTestPT.toFixed(4),
                                                                            mawp: BCFCMAWP.toFixed(4)
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
                                                                                BCFCPayJS.dialog({
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
                                                                                            BCFCPayJS.dialog("close");
                                                                                            BCFCPayJS.dialog("clear");
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
                                                                                                        BCFCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFCPayJS.dialog('close');
                                                                                                                BCFCPayJS.dialog('clear');
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