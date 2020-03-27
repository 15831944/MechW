$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcflSketch = $("#d2");
    let bcflModel = $("#d3");
    let bcfld2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfl'></table>");
    let pg = $("#bcfl");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/l/BCFL.json", function (result) {

        let BCFLDT,
            BCFLSCategory, BCFLSCategoryVal, BCFLSType, BCFLSTypeVal, BCFLSSTD, BCFLSSTDVal, BCFLSName, BCFLSNameVal,
            BCFLJCategory, BCFLJCategoryVal, BCFLJType, BCFLJTypeVal, BCFLJSTD, BCFLJSTDVal, BCFLJName, BCFLJNameVal,
            columns, rows, ed;

        function bcfl2d(dsi = "ϕDsi", ls = "0.4Dsi", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcflSketch.empty();

            let width = bcflSketch.width();
            let height = bcflSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFLSVG").attr("height", height);

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

            /*
            左侧筒体
             */
            drawLine(padding, padding + 3 * hg, padding, height / 2 - 3 * thk);
            drawLine(padding + thk, padding + 3 * hg, padding + thk, height / 2 - 3 * thk);
            drawLine(width / 2, padding + 3 * hg, width / 2, height / 2 - 3 * thk);
            drawLine(width / 2 - thk, padding + 3 * hg, width / 2 - thk, height / 2 - 3 * thk);
            drawLine(padding, height / 2 - 3 * thk, width / 2, height / 2 - 3 * thk);
            drawLine(padding, padding + 3 * hg, width / 2, padding + 3 * hg);
            drawCenterLine(padding + wg, height / 2 - 3 * thk - 10, padding + wg, height / 2 + hg + 10);

            /*
            左侧加强筋
             */
            drawLine(padding + 0.7 * wg - thk / 2, height / 2 - 3 * thk, padding + 0.7 * wg - thk / 2, height / 2);
            drawLine(padding + 0.7 * wg + thk / 2, height / 2 - 3 * thk, padding + 0.7 * wg + thk / 2, height / 2);
            drawLine(padding + 1.3 * wg - thk / 2, height / 2 - 3 * thk, padding + 1.3 * wg - thk / 2, height / 2);
            drawLine(padding + 1.3 * wg + thk / 2, height / 2 - 3 * thk, padding + 1.3 * wg + thk / 2, height / 2);

            /*
            左侧平盖
             */
            drawLine(padding + thk, height / 2, width / 2 - thk, height / 2);
            drawLine(padding + thk, height / 2 + thk, width / 2 - thk, height / 2 + thk);

            /*
            右侧筒体
             */
            let r0 = Math.min(wg, hg);
            let cx0 = padding + 3 * wg;
            let cy0 = height / 2;
            drawArc(r0, r0, cx0, cy0 + r0, cx0, cy0 - r0);
            drawArc(r0, r0, cx0, cy0 - r0, cx0, cy0 + r0);
            drawArc(r0 - thk, r0 - thk, cx0, cy0 + r0 - thk, cx0, cy0 - r0 + thk);
            drawArc(r0 - thk, r0 - thk, cx0, cy0 - r0 + thk, cx0, cy0 + r0 - thk);
            drawCenterLine(cx0 - r0 - 10, cy0, cx0 + r0 + 10, cy0);
            drawCenterLine(cx0, cy0 - r0 - 10, cx0, cy0 + r0 + 10);

            /*
            右侧竖直加强筋
             */
            drawLine(cx0 - 0.3 * r0 - thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 - 0.3 * r0 - thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 - 0.3 * r0 + thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawLine(cx0 + 0.3 * r0 - thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 + 0.3 * r0 - thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 + 0.3 * r0 + thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawCenterLine(cx0 - 0.3 * r0, cy0 - r0 + thk + 0.046 * r0 - 10, cx0 - 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10);
            drawCenterLine(cx0 + 0.3 * r0, cy0 - r0 + thk + 0.046 * r0 - 10, cx0 + 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10);
            dimBottomH(cx0 - 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10, cx0 + 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10, ls, "BCFLSketchLS1");

            /*
            右侧水平加强筋
             */
            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 - 0.3 * r0 - thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 - thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 - thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 - thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 - thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 - 0.3 * r0 - thk / 2);

            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 - 0.3 * r0 + thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 + thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 + thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 + thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 + thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 - 0.3 * r0 + thk / 2);

            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 + 0.3 * r0 - thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 - thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 - thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 - thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 - thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 + 0.3 * r0 - thk / 2);

            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 + 0.3 * r0 + thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 + thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 + thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 + thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 + thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 + 0.3 * r0 + thk / 2);

            drawCenterLine(cx0 - r0 + thk + 0.046 * r0 - 10, cy0 - 0.3 * r0, cx0 + r0 - thk - 0.046 * r0 + 10, cy0 - 0.3 * r0);
            drawCenterLine(cx0 - r0 + thk + 0.046 * r0 - 10, cy0 + 0.3 * r0, cx0 + r0 - thk - 0.046 * r0 + 10, cy0 + 0.3 * r0);
            dimLeftV(cx0 - r0 + thk + 0.046 * r0 - 10, cy0 + 0.3 * r0, cx0 - r0 + thk + 0.046 * r0 - 10, cy0 - 0.3 * r0, ls, "BCFLSketchLS2");

            // dsi
            dimBottomH(padding + thk, height / 2 + hg, width / 2 - thk, height / 2 + hg, dsi, "BCFLSketchDSI");

            // thksn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: height / 2},
                    {x: padding + 0.5 * wg + 3, y: height / 2 - 15},
                    {x: padding + 0.5 * wg - 3, y: height / 2 - 15},
                    {x: padding + 0.5 * wg, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: height / 2 + thk},
                    {x: padding + 0.5 * wg + 3, y: height / 2 + thk + 15},
                    {x: padding + 0.5 * wg - 3, y: height / 2 + thk + 15},
                    {x: padding + 0.5 * wg, y: height / 2 + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: height / 2},
                {x: padding + 0.5 * wg, y: height / 2 + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: height / 2 - 15},
                {x: padding + 0.5 * wg, y: height / 2 - 15 - 35}
            ])).attr("id", "BCFLSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFLSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // hj
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2 - 3 * thk},
                    {x: padding + 1.5 * wg + 3, y: height / 2 - 3 * thk - 15},
                    {x: padding + 1.5 * wg - 3, y: height / 2 - 3 * thk - 15},
                    {x: padding + 1.5 * wg, y: height / 2 - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2},
                    {x: padding + 1.5 * wg + 3, y: height / 2 + 15},
                    {x: padding + 1.5 * wg - 3, y: height / 2 + 15},
                    {x: padding + 1.5 * wg, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: height / 2 - 3 * thk},
                {x: padding + 1.5 * wg, y: height / 2 + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: height / 2 - 3 * thk - 15},
                {x: padding + 1.5 * wg, y: height / 2 - 3 * thk - 15 - 35}
            ])).attr("id", "BCFLSketchHJ").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFLSketchHJ").attr("startOffset", "50%").text(hj);

            // thkjn
            extLineTopV(padding + 0.7 * wg + thk / 2, height / 2 - 3 * thk);
            extLineTopV(padding + 0.7 * wg - thk / 2, height / 2 - 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.7 * wg + thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + 0.7 * wg + thk / 2 + 15, y: height / 2 - 3 * thk - 27},
                    {x: padding + 0.7 * wg + thk / 2 + 15, y: height / 2 - 3 * thk - 33},
                    {x: padding + 0.7 * wg + thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.7 * wg - thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + 0.7 * wg - thk / 2 - 15, y: height / 2 - 3 * thk - 27},
                    {x: padding + 0.7 * wg - thk / 2 - 15, y: height / 2 - 3 * thk - 33},
                    {x: padding + 0.7 * wg - thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.7 * wg - thk / 2 - 15 - 10, y: height / 2 - 3 * thk - 30},
                {x: padding + 0.7 * wg + thk / 2, y: height / 2 - 3 * thk - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.7 * wg + thk / 2 + 15, y: height / 2 - 3 * thk - 30},
                {x: padding + 0.7 * wg + thk / 2 + 15 + 40, y: height / 2 - 3 * thk - 30}
            ])).attr("id", "BCFLSketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFLSketchTHKJN")
                .attr("startOffset", "50%").text(thkjn);

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
            ])).attr("id", "BCFLSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFLSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFLSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFLSketchAX").attr("startOffset", "50%").text("A向");

        }

        currentTabIndex = bcfld2d3.tabs('getTabIndex', bcfld2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            bcfl2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfl").length > 0) {
                    bcfl2d();
                }
            });
        }
        bcfld2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfl2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfl").length > 0) {
                            bcfl2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号12筋板加强圆平盖计算",
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
                    align: "left",
                    styler: function (value, row, index) {
                    }
                },
                {
                    field: 'value',
                    title: '值',
                    width: 153,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function (value, row, index) {
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
                    $(ed.target).combobox("loadData", BCFLSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFLSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFLSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFLSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFLJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFLJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFLJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFLJName);
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
                    bcflSketch.empty();

                    // model
                    bcflModel.empty();

                    // sketch
                    currentTabIndex = bcfld2d3.tabs('getTabIndex', bcfld2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcfl2d();
                        bcflSketch.off("resize").on("resize", function () {
                            if ($("#bcfl").length > 0) {
                                bcfl2d();
                            }
                        });
                    }
                    bcfld2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfl2d();
                                bcflSketch.off("resize").on("resize", function () {
                                    if ($("#bcfl").length > 0) {
                                        bcfl2d();
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

                        BCFLDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFLSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFLSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFLSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFLSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFLJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFLJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFLJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFLJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFLDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFLSCategory = [];
                                BCFLJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFLDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFLSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFLJCategory[index] = {
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

                        BCFLSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFLSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFLSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFLSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFLSCategoryVal,
                                temp: BCFLDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFLSType = [];
                                $(result).each(function (index, element) {
                                    BCFLSType[index] = {
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

                        BCFLSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFLSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFLSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFLSCategoryVal,
                                type: BCFLSTypeVal,
                                temp: BCFLDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFLSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFLSSTD[index] = {
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

                        BCFLSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFLSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFLSCategoryVal,
                                type: BCFLSTypeVal,
                                std: BCFLSSTDVal,
                                temp: BCFLDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFLSName = [];
                                $(result).each(function (index, element) {
                                    BCFLSName[index] = {
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

                        BCFLJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFLJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFLJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFLJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFLJCategoryVal,
                                temp: BCFLDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFLJType = [];
                                $(result).each(function (index, element) {
                                    BCFLJType[index] = {
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

                        BCFLJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFLJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFLJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFLJCategoryVal,
                                type: BCFLJTypeVal,
                                temp: BCFLDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFLJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFLJSTD[index] = {
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

                        BCFLJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFLJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFLJCategoryVal,
                                type: BCFLJTypeVal,
                                std: BCFLJSTDVal,
                                temp: BCFLDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFLJName = [];
                                $(result).each(function (index, element) {
                                    BCFLJName[index] = {
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
                        let BCFLPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFLPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFLPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFLPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFLTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFLTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFLSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFLSDensity, BCFLSThkMin, BCFLSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFLSCategoryVal,
                                    "type": BCFLSTypeVal,
                                    "std": BCFLSSTDVal,
                                    "name": BCFLSNameVal,
                                    "temp": BCFLDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFLSDensity = parseFloat(result.density);
                                    BCFLSThkMin = parseFloat(result.thkMin);
                                    BCFLSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFLDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFLDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1));
                                        bcflSketch.off("resize").on("resize", function () {
                                            if ($("#bcfl").length > 0) {
                                                bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1));
                                            }
                                        });
                                    }
                                    bcfld2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1));
                                                bcflSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfl").length > 0) {
                                                        bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFLTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFLSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFLSThkMax) {
                                        BCFLTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFLSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFLSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFLSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFLSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN);
                                        bcflSketch.off("resize").on("resize", function () {
                                            if ($("#bcfl").length > 0) {
                                                bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN);
                                            }
                                        });
                                    }
                                    bcfld2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN);
                                                bcflSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfl").length > 0) {
                                                        bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFLOST, BCFLOS, BCFLRSEL, BCFLCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFLSCategoryVal,
                                            "type": BCFLSTypeVal,
                                            "std": BCFLSSTDVal,
                                            "name": BCFLSNameVal,
                                            "thk": BCFLTHKSN,
                                            "temp": BCFLDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFLOST = parseFloat(result.ot);
                                            if (BCFLOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFLOS = parseFloat(result.o);
                                            if (BCFLOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFLRSEL = parseFloat(result.rel);
                                            if (BCFLRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFLCS1 = parseFloat(result.c1);
                                            if (BCFLCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFLCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFLTHKSN) {
                                                BCFLCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFLTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFLTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFLES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFLES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFLJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFLJDensity, BCFLJThkMin, BCFLJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFLJCategoryVal,
                                                        "type": BCFLJTypeVal,
                                                        "std": BCFLJSTDVal,
                                                        "name": BCFLJNameVal,
                                                        "temp": BCFLDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFLJDensity = parseFloat(result.density);
                                                        BCFLJThkMin = parseFloat(result.thkMin);
                                                        BCFLJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFLTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFLJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFLJThkMax) {
                                                            BCFLTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFLJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFLJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFLJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFLJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN);
                                                            bcflSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfl").length > 0) {
                                                                    bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfld2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN);
                                                                    bcflSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfl").length > 0) {
                                                                            bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFLOJT, BCFLOJ, BCFLRJEL, BCFLCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFLJCategoryVal,
                                                                "type": BCFLJTypeVal,
                                                                "std": BCFLJSTDVal,
                                                                "name": BCFLJNameVal,
                                                                "thk": BCFLTHKJN,
                                                                "temp": BCFLDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFLOJT = parseFloat(result.ot);
                                                                if (BCFLOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFLOJ = parseFloat(result.o);
                                                                if (BCFLOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFLRJEL = parseFloat(result.rel);
                                                                if (BCFLRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFLCJ1 = parseFloat(result.c1);
                                                                if (BCFLCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFLHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFLTHKJN) {
                                                                    BCFLHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFLTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFLTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN, BCFLHJ);
                                                                    bcflSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfl").length > 0) {
                                                                            bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN, BCFLHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfld2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN, BCFLHJ);
                                                                            bcflSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfl").length > 0) {
                                                                                    bcfl2d("Φ" + BCFLDSI, (0.4 * BCFLDSI).toFixed(1), BCFLTHKSN, BCFLTHKJN, BCFLHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFLCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFLTHKJN) {
                                                                    BCFLCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFLTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFLTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFLPC = BCFLPD + BCFLPS;

                                                                let BCFLCS = BCFLCS1 + BCFLCS2;
                                                                let BCFLTHKSE = BCFLTHKSN - BCFLCS;
                                                                let BCFLDC = BCFLDSI + 2 * BCFLCS2;

                                                                let BCFLCJ = BCFLCJ1 + BCFLCJ2;
                                                                let BCFLTHKJE = BCFLTHKJN - BCFLCJ;
                                                                let BCFLHJE = BCFLHJ - BCFLCJ2;

                                                                let BCFLKP = 0.032;
                                                                let BCFLTHKSC = BCFLDC * Math.sqrt(BCFLKP * BCFLPC / (BCFLOST * BCFLES));
                                                                let BCFLTHKSD = BCFLTHKSC + BCFLCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFLTHKSD + BCFLCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFLTHKSCHK;
                                                                if (BCFLTHKSN >= (BCFLTHKSD + BCFLCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFLTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFLTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFLTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFLTHKSCHK = "不合格";
                                                                }

                                                                let BCFLZX = 0.019 * BCFLPC * BCFLDC * BCFLDC * BCFLDC / BCFLOST;
                                                                let BCFLLS = 20 * BCFLTHKSE;
                                                                let BCFLE1 = (BCFLTHKJE * (BCFLHJE + BCFLTHKSE) * (BCFLHJE + BCFLTHKSE) + (BCFLLS - BCFLTHKJE) * BCFLTHKSE * BCFLTHKSE)
                                                                    / (2 * (BCFLTHKJE * (BCFLHJE + BCFLTHKSE) + (BCFLLS - BCFLTHKJE) * BCFLTHKSE));
                                                                let BCFLE2 = BCFLHJE + BCFLTHKSE - BCFLE1;
                                                                let BCFLI = (BCFLLS * BCFLE1 * BCFLE1 * BCFLE1 - (BCFLLS - BCFLTHKJE) * (BCFLE1 - BCFLTHKSE) * (BCFLE1 - BCFLTHKSE) * (BCFLE1 - BCFLTHKSE) + BCFLTHKJE * BCFLE2 * BCFLE2 * BCFLE2) / 3;
                                                                let BCFLZACT = BCFLI / Math.max(BCFLE1, BCFLE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFLZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFLZCHK;
                                                                if (BCFLZACT >= BCFLZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFLZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFLZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFLZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFLZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFLTestPT;
                                                                if (BCFLTest === "液压试验") {
                                                                    BCFLTestPT = Math.max(1.25 * BCFLPD * BCFLOS / BCFLOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFLTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFLTest === "气压试验") {
                                                                    BCFLTestPT = Math.max(1.10 * BCFLPD * BCFLOS / BCFLOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFLTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }

                                                                // MAWP
                                                                let BCFLMAWP = BCFLTHKSE * BCFLTHKSE * BCFLOST * BCFLES / (BCFLKP * BCFLDC * BCFLDC) - BCFLPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFLMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFLPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfldocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFL",

                                                                            t: BCFLDT,
                                                                            pd: BCFLPD,
                                                                            ps: BCFLPS,

                                                                            stds: BCFLSSTDVal,
                                                                            names: BCFLSNameVal,
                                                                            dsi: BCFLDSI,
                                                                            thksn: BCFLTHKSN,
                                                                            cs2: BCFLCS2,
                                                                            es: BCFLES,

                                                                            stdj: BCFLJSTDVal,
                                                                            namej: BCFLJNameVal,
                                                                            thkjn: BCFLTHKJN,
                                                                            hj: BCFLHJ,
                                                                            cj2: BCFLCJ2,

                                                                            test: BCFLTest,

                                                                            ds: BCFLSDensity.toFixed(4),
                                                                            rsel: BCFLRSEL.toFixed(4),
                                                                            cs1: BCFLCS1.toFixed(4),
                                                                            ost: BCFLOST.toFixed(4),
                                                                            os: BCFLOS.toFixed(4),

                                                                            dj: BCFLJDensity.toFixed(4),
                                                                            rjel: BCFLRJEL.toFixed(4),
                                                                            cj1: BCFLCJ1.toFixed(4),
                                                                            ojt: BCFLOJT.toFixed(4),
                                                                            oj: BCFLOJ.toFixed(4),

                                                                            pc: BCFLPC.toFixed(4),

                                                                            cs: BCFLCS.toFixed(4),
                                                                            thkse: BCFLTHKSE.toFixed(4),
                                                                            dc: BCFLDC.toFixed(4),

                                                                            cj: BCFLCJ.toFixed(4),
                                                                            thkje: BCFLTHKJE.toFixed(4),
                                                                            hje: BCFLHJE.toFixed(4),

                                                                            kp: BCFLKP.toFixed(4),

                                                                            thksc: BCFLTHKSC.toFixed(4),
                                                                            thksd: BCFLTHKSD.toFixed(4),
                                                                            thkschk: BCFLTHKSCHK,

                                                                            zx: BCFLZX.toFixed(4),
                                                                            ls: BCFLLS.toFixed(4),
                                                                            e1: BCFLE1.toFixed(4),
                                                                            e2: BCFLE2.toFixed(4),
                                                                            i: BCFLI.toFixed(4),
                                                                            zact: BCFLZACT.toFixed(4),
                                                                            zchk: BCFLZCHK,

                                                                            pt: BCFLTestPT.toFixed(4),
                                                                            mawp: BCFLMAWP.toFixed(4)
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
                                                                                BCFLPayJS.dialog({
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
                                                                                            BCFLPayJS.dialog("close");
                                                                                            BCFLPayJS.dialog("clear");
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
                                                                                                        BCFLPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFLPayJS.dialog('close');
                                                                                                                BCFLPayJS.dialog('clear');
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