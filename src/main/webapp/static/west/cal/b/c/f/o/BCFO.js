$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfoSketch = $("#d2");
    let bcfoModel = $("#d3");
    let bcfod2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfo'></table>");
    let pg = $("#bcfo");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/o/BCFO.json", function (result) {

        let BCFODT,
            BCFOSCategory, BCFOSCategoryVal, BCFOSType, BCFOSTypeVal, BCFOSSTD, BCFOSSTDVal, BCFOSName, BCFOSNameVal,
            BCFOJCategory, BCFOJCategoryVal, BCFOJType, BCFOJTypeVal, BCFOJSTD, BCFOJSTDVal, BCFOJName, BCFOJNameVal,
            columns, rows, ed;

        function bcfo2d(dsi = "ϕDsi", di = "ϕDi", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcfoSketch.empty();

            let width = bcfoSketch.width();
            let height = bcfoSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFOSVG").attr("height", height);

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
            drawLine(padding - thk, height / 2 - ro - 3 * thk, padding - thk, height / 2 + sh);
            drawLine(padding, height / 2 - ro - 3 * thk, padding, height / 2 + sh);
            drawLine(padding + 2 * wg, height / 2 - ro - 3 * thk, padding + 2 * wg, height / 2 + sh);
            drawLine(padding + 2 * wg + thk, height / 2 - ro - 3 * thk, padding + 2 * wg + thk, height / 2 + sh);
            // 顶部
            drawLine(padding, height / 2 - ri, padding + 2 * wg, height / 2 - ri);
            drawLine(padding, height / 2 - ro, padding + 2 * wg, height / 2 - ro);
            // 顶部加强筋
            drawLine(padding - thk, height / 2 - ro - 3 * thk, width / 2 + thk, height / 2 - ro - 3 * thk);
            drawLine(padding + wg - wg / 3, height / 2 - ro, padding + wg - wg / 3, height / 2 - ro - 3 * thk);
            drawLine(padding + wg - wg / 3 - thk, height / 2 - ro, padding + wg - wg / 3 - thk, height / 2 - ro - 3 * thk);
            drawLine(padding + wg + wg / 3, height / 2 - ro, padding + wg + wg / 3, height / 2 - ro - 3 * thk);
            drawLine(padding + wg + wg / 3 + thk, height / 2 - ro, padding + wg + wg / 3 + thk, height / 2 - ro - 3 * thk);

            // dsi
            dimBottomH(padding, height / 2 + sh, padding + 2 * wg, height / 2 + sh, dsi, "BCFOSketchDSI");

            // di
            dimTopH(padding + wg - wg / 3, height / 2 - ro - 3 * thk, padding + wg + wg / 3, height / 2 - ro - 3 * thk, di, "BCFOSketchDI");

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
            ])).attr("id", "BCFOSketchTHKJN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFOSketchTHKJN1")
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
            ])).attr("id", "BCFOSketchHJ").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFOSketchHJ").attr("startOffset", "50%").text(hj);

            // thksn
            let cx1 = padding + 2 * wg - ri;
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
                .attr("id", "BCFOSketchTHKSN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFOSketchTHKSN")
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
            drawArc(r0 / 3, r0 / 3, cx0, cy0 - r0 / 3, cx0, cy0 + r0 / 3);
            drawArc(r0 / 3 + thk, r0 / 3 + thk, cx0, cy0 + r0 / 3 + thk, cx0, cy0 - r0 / 3 - thk);
            drawArc(r0 / 3 + thk, r0 / 3 + thk, cx0, cy0 - r0 / 3 - thk, cx0, cy0 + r0 / 3 + thk);
            // 虚线圆
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
                {x: cx0 + r0 - thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + 60 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + 120 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + -60 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 + thk / 2},
                {x: cx0 + r0 / 3 + thk, y: cy0 + thk / 2}
            ])).attr("transform", "rotate(" + -120 + ", " + cx0 + " " + cy0 + ")").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 + r0 / 3 + thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 - thk / 2},
                {x: cx0 + r0 - thk, y: cy0 + thk / 2},
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
            ])).attr("id", "BCFOSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFOSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFOSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFOSketchAX").attr("startOffset", "50%").text("A向");

            // 筋板 thkjn
            let startX = cx0 + r0 - thk;
            let startY = cy0 + thk / 2;
            let endX = cx0 + r0 - thk;
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
            ])).attr("id", "BCFOSketchTHKJN2").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFOSketchTHKJN2").attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = bcfod2d3.tabs('getTabIndex', bcfod2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            bcfo2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfo").length > 0) {
                    bcfo2d();
                }
            });
        }
        bcfod2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfo2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfo").length > 0) {
                            bcfo2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号15筋板加强圆平盖计算",
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
                    $(ed.target).combobox("loadData", BCFOSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFOSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFOSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFOSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFOJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFOJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFOJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFOJName);
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
                    bcfoSketch.empty();

                    // model
                    bcfoModel.empty();

                    // sketch
                    currentTabIndex = bcfod2d3.tabs('getTabIndex', bcfod2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcfo2d();
                        bcfoSketch.off("resize").on("resize", function () {
                            if ($("#bcfo").length > 0) {
                                bcfo2d();
                            }
                        });
                    }
                    bcfod2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfo2d();
                                bcfoSketch.off("resize").on("resize", function () {
                                    if ($("#bcfo").length > 0) {
                                        bcfo2d();
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

                        BCFODT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFOSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFOSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFOSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFOSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFOJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFOJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFOJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFOJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFODT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFOSCategory = [];
                                BCFOJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFODT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFOSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFOJCategory[index] = {
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

                        BCFOSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFOSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFOSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFOSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFOSCategoryVal,
                                temp: BCFODT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFOSType = [];
                                $(result).each(function (index, element) {
                                    BCFOSType[index] = {
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

                        BCFOSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFOSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFOSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFOSCategoryVal,
                                type: BCFOSTypeVal,
                                temp: BCFODT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFOSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFOSSTD[index] = {
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

                        BCFOSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFOSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFOSCategoryVal,
                                type: BCFOSTypeVal,
                                std: BCFOSSTDVal,
                                temp: BCFODT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFOSName = [];
                                $(result).each(function (index, element) {
                                    BCFOSName[index] = {
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

                        BCFOJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFOJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFOJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFOJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFOJCategoryVal,
                                temp: BCFODT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFOJType = [];
                                $(result).each(function (index, element) {
                                    BCFOJType[index] = {
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

                        BCFOJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFOJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFOJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFOJCategoryVal,
                                type: BCFOJTypeVal,
                                temp: BCFODT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFOJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFOJSTD[index] = {
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

                        BCFOJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFOJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFOJCategoryVal,
                                type: BCFOJTypeVal,
                                std: BCFOJSTDVal,
                                temp: BCFODT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFOJName = [];
                                $(result).each(function (index, element) {
                                    BCFOJName[index] = {
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
                        let BCFOPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFOPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFOPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFOPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFOTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFOTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFOSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFOSDensity, BCFOSThkMin, BCFOSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFOSCategoryVal,
                                    "type": BCFOSTypeVal,
                                    "std": BCFOSSTDVal,
                                    "name": BCFOSNameVal,
                                    "temp": BCFODT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFOSDensity = parseFloat(result.density);
                                    BCFOSThkMin = parseFloat(result.thkMin);
                                    BCFOSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFODSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFODSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1));
                                        bcfoSketch.off("resize").on("resize", function () {
                                            if ($("#bcfo").length > 0) {
                                                bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1));
                                            }
                                        });
                                    }
                                    bcfod2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1));
                                                bcfoSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfo").length > 0) {
                                                        bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFOTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFOSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFOSThkMax) {
                                        BCFOTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFOSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFOSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFOSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFOSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN);
                                        bcfoSketch.off("resize").on("resize", function () {
                                            if ($("#bcfo").length > 0) {
                                                bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN);
                                            }
                                        });
                                    }
                                    bcfod2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN);
                                                bcfoSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfo").length > 0) {
                                                        bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFOOST, BCFOOS, BCFORSEL, BCFOCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFOSCategoryVal,
                                            "type": BCFOSTypeVal,
                                            "std": BCFOSSTDVal,
                                            "name": BCFOSNameVal,
                                            "thk": BCFOTHKSN,
                                            "temp": BCFODT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFOOST = parseFloat(result.ot);
                                            if (BCFOOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFOOS = parseFloat(result.o);
                                            if (BCFOOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFORSEL = parseFloat(result.rel);
                                            if (BCFORSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFOCS1 = parseFloat(result.c1);
                                            if (BCFOCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFOCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFOTHKSN) {
                                                BCFOCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFOTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFOTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFOES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFOES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFOJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFOJDensity, BCFOJThkMin, BCFOJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFOJCategoryVal,
                                                        "type": BCFOJTypeVal,
                                                        "std": BCFOJSTDVal,
                                                        "name": BCFOJNameVal,
                                                        "temp": BCFODT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFOJDensity = parseFloat(result.density);
                                                        BCFOJThkMin = parseFloat(result.thkMin);
                                                        BCFOJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFOTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFOJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFOJThkMax) {
                                                            BCFOTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFOJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFOJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFOJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFOJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN);
                                                            bcfoSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfo").length > 0) {
                                                                    bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfod2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN);
                                                                    bcfoSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfo").length > 0) {
                                                                            bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFOOJT, BCFOOJ, BCFORJEL, BCFOCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFOJCategoryVal,
                                                                "type": BCFOJTypeVal,
                                                                "std": BCFOJSTDVal,
                                                                "name": BCFOJNameVal,
                                                                "thk": BCFOTHKJN,
                                                                "temp": BCFODT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFOOJT = parseFloat(result.ot);
                                                                if (BCFOOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFOOJ = parseFloat(result.o);
                                                                if (BCFOOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFORJEL = parseFloat(result.rel);
                                                                if (BCFORJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFOCJ1 = parseFloat(result.c1);
                                                                if (BCFOCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFOHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFOTHKJN) {
                                                                    BCFOHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFOTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFOTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN, BCFOHJ);
                                                                    bcfoSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfo").length > 0) {
                                                                            bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN, BCFOHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfod2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN, BCFOHJ);
                                                                            bcfoSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfo").length > 0) {
                                                                                    bcfo2d("Φ" + BCFODSI, "Φ" + (BCFODSI / 3).toFixed(1), BCFOTHKSN, BCFOTHKJN, BCFOHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFOCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFOTHKJN) {
                                                                    BCFOCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFOTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFOTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFOPC = BCFOPD + BCFOPS;

                                                                let BCFOCS = BCFOCS1 + BCFOCS2;
                                                                let BCFOTHKSE = BCFOTHKSN - BCFOCS;
                                                                let BCFODC = BCFODSI + 2 * BCFOCS2;

                                                                let BCFOCJ = BCFOCJ1 + BCFOCJ2;
                                                                let BCFOTHKJE = BCFOTHKJN - BCFOCJ;
                                                                let BCFOHJE = BCFOHJ - BCFOCJ2;

                                                                let BCFOKP = 0.03;
                                                                let BCFOTHKSC = BCFODC * Math.sqrt(BCFOKP * BCFOPC / (BCFOOST * BCFOES));
                                                                let BCFOTHKSD = BCFOTHKSC + BCFOCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFOTHKSD + BCFOCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFOTHKSCHK;
                                                                if (BCFOTHKSN >= (BCFOTHKSD + BCFOCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFOTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFOTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFOTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFOTHKSCHK = "不合格";
                                                                }

                                                                let BCFOZX = 0.01 * BCFOPC * BCFODC * BCFODC * BCFODC / BCFOOST;
                                                                let BCFOLS = 20 * BCFOTHKSE;
                                                                let BCFOE1 = (BCFOTHKJE * (BCFOHJE + BCFOTHKSE) * (BCFOHJE + BCFOTHKSE) + (BCFOLS - BCFOTHKJE) * BCFOTHKSE * BCFOTHKSE)
                                                                    / (2 * (BCFOTHKJE * (BCFOHJE + BCFOTHKSE) + (BCFOLS - BCFOTHKJE) * BCFOTHKSE));
                                                                let BCFOE2 = BCFOHJE + BCFOTHKSE - BCFOE1;
                                                                let BCFOI = (BCFOLS * BCFOE1 * BCFOE1 * BCFOE1 - (BCFOLS - BCFOTHKJE) * (BCFOE1 - BCFOTHKSE) * (BCFOE1 - BCFOTHKSE) * (BCFOE1 - BCFOTHKSE) + BCFOTHKJE * BCFOE2 * BCFOE2 * BCFOE2) / 3;
                                                                let BCFOZACT = BCFOI / Math.max(BCFOE1, BCFOE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFOZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFOZCHK;
                                                                if (BCFOZACT >= BCFOZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFOZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFOZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFOZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFOZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFOTestPT;
                                                                if (BCFOTest === "液压试验") {
                                                                    BCFOTestPT = Math.max(1.25 * BCFOPD * BCFOOS / BCFOOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFOTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFOTest === "气压试验") {
                                                                    BCFOTestPT = Math.max(1.10 * BCFOPD * BCFOOS / BCFOOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFOTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                // MAWP
                                                                let BCFOMAWP = BCFOTHKSE * BCFOTHKSE * BCFOOST * BCFOES / (BCFOKP * BCFODC * BCFODC) - BCFOPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFOMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFOPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfodocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFO",

                                                                            t: BCFODT,
                                                                            pd: BCFOPD,
                                                                            ps: BCFOPS,

                                                                            stds: BCFOSSTDVal,
                                                                            names: BCFOSNameVal,
                                                                            dsi: BCFODSI,
                                                                            thksn: BCFOTHKSN,
                                                                            cs2: BCFOCS2,
                                                                            es: BCFOES,

                                                                            stdj: BCFOJSTDVal,
                                                                            namej: BCFOJNameVal,
                                                                            thkjn: BCFOTHKJN,
                                                                            hj: BCFOHJ,
                                                                            cj2: BCFOCJ2,

                                                                            test: BCFOTest,

                                                                            ds: BCFOSDensity.toFixed(4),
                                                                            rsel: BCFORSEL.toFixed(4),
                                                                            cs1: BCFOCS1.toFixed(4),
                                                                            ost: BCFOOST.toFixed(4),
                                                                            os: BCFOOS.toFixed(4),

                                                                            dj: BCFOJDensity.toFixed(4),
                                                                            rjel: BCFORJEL.toFixed(4),
                                                                            cj1: BCFOCJ1.toFixed(4),
                                                                            ojt: BCFOOJT.toFixed(4),
                                                                            oj: BCFOOJ.toFixed(4),

                                                                            pc: BCFOPC.toFixed(4),

                                                                            cs: BCFOCS.toFixed(4),
                                                                            thkse: BCFOTHKSE.toFixed(4),
                                                                            dc: BCFODC.toFixed(4),

                                                                            cj: BCFOCJ.toFixed(4),
                                                                            thkje: BCFOTHKJE.toFixed(4),
                                                                            hje: BCFOHJE.toFixed(4),

                                                                            kp: BCFOKP.toFixed(4),

                                                                            thksc: BCFOTHKSC.toFixed(4),
                                                                            thksd: BCFOTHKSD.toFixed(4),
                                                                            thkschk: BCFOTHKSCHK,

                                                                            zx: BCFOZX.toFixed(4),
                                                                            ls: BCFOLS.toFixed(4),
                                                                            e1: BCFOE1.toFixed(4),
                                                                            e2: BCFOE2.toFixed(4),
                                                                            i: BCFOI.toFixed(4),
                                                                            zact: BCFOZACT.toFixed(4),
                                                                            zchk: BCFOZCHK,

                                                                            pt: BCFOTestPT.toFixed(4),
                                                                            mawp: BCFOMAWP.toFixed(4)
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
                                                                                BCFOPayJS.dialog({
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
                                                                                            BCFOPayJS.dialog("close");
                                                                                            BCFOPayJS.dialog("clear");
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
                                                                                                        BCFOPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFOPayJS.dialog('close');
                                                                                                                BCFOPayJS.dialog('clear');
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