$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfmSketch = $("#d2");
    let bcfmModel = $("#d3");
    let bcfmd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfm'></table>");
    let pg = $("#bcfm");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/m/BCFM.json", function (result) {

        let BCFMDT,
            BCFMSCategory, BCFMSCategoryVal, BCFMSType, BCFMSTypeVal, BCFMSSTD, BCFMSSTDVal, BCFMSName, BCFMSNameVal,
            BCFMJCategory, BCFMJCategoryVal, BCFMJType, BCFMJTypeVal, BCFMJSTD, BCFMJSTDVal, BCFMJName, BCFMJNameVal,
            columns, rows, ed;

        function bcfm2d(dsi = "ϕDsi", ls = "Dsi/2", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcfmSketch.empty();

            let width = bcfmSketch.width();
            let height = bcfmSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFMSVG").attr("height", height);

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
            drawLine(padding + wg - thk / 2, height / 2 - 3 * thk, padding + wg - thk / 2, height / 2);
            drawLine(padding + wg + thk / 2, height / 2 - 3 * thk, padding + wg + thk / 2, height / 2);
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
            drawLine(cx0 - thk / 2, cy0 - r0 + thk, cx0 - thk / 2, cy0 + r0 - thk);
            drawLine(cx0 + thk / 2, cy0 - r0 + thk, cx0 + thk / 2, cy0 + r0 - thk);
            drawLine(cx0 + 0.3 * r0 - thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 + 0.3 * r0 - thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 + 0.3 * r0 + thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawCenterLine(cx0 - 0.3 * r0, cy0 - r0 + thk + 0.046 * r0 - 10, cx0 - 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10);
            drawCenterLine(cx0 + 0.3 * r0, cy0 - r0 + thk + 0.046 * r0 - 10, cx0 + 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10);
            dimBottomH(cx0 - 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10, cx0 + 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10, ls, "BCFMSketchLS1");

            /*
            右侧水平加强筋
             */
            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 - 0.3 * r0 - thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 - thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 - thk / 2, cx0 - thk / 2, cy0 - 0.3 * r0 - thk / 2);
            drawLine(cx0 + thk / 2, cy0 - 0.3 * r0 - thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 - thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 - thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 - 0.3 * r0 - thk / 2);

            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 - 0.3 * r0 + thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 + thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 + thk / 2, cx0 - thk / 2, cy0 - 0.3 * r0 + thk / 2);
            drawLine(cx0 + thk / 2, cy0 - 0.3 * r0 + thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 - 0.3 * r0 + thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 - 0.3 * r0 + thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 - 0.3 * r0 + thk / 2);

            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 + 0.3 * r0 - thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 - thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 - thk / 2, cx0 - thk / 2, cy0 + 0.3 * r0 - thk / 2);
            drawLine(cx0 + thk / 2, cy0 + 0.3 * r0 - thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 - thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 - thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 + 0.3 * r0 - thk / 2);

            drawLine(cx0 - r0 + thk + 0.046 * r0, cy0 + 0.3 * r0 + thk / 2, cx0 - 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 + thk / 2);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 + thk / 2, cx0 - thk / 2, cy0 + 0.3 * r0 + thk / 2);
            drawLine(cx0 + thk / 2, cy0 + 0.3 * r0 + thk / 2, cx0 + 0.3 * r0 - thk / 2, cy0 + 0.3 * r0 + thk / 2);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 + 0.3 * r0 + thk / 2, cx0 + r0 - thk - 0.046 * r0, cy0 + 0.3 * r0 + thk / 2);

            drawCenterLine(cx0 - r0 + thk + 0.046 * r0 - 10, cy0 - 0.3 * r0, cx0 + r0 - thk - 0.046 * r0 + 10, cy0 - 0.3 * r0);
            drawCenterLine(cx0 - r0 + thk + 0.046 * r0 - 10, cy0 + 0.3 * r0, cx0 + r0 - thk - 0.046 * r0 + 10, cy0 + 0.3 * r0);
            dimLeftV(cx0 - r0 + thk + 0.046 * r0 - 10, cy0 + 0.3 * r0, cx0 - r0 + thk + 0.046 * r0 - 10, cy0 - 0.3 * r0, ls, "BCFMSketchLS2");

            // dsi
            dimBottomH(padding + thk, height / 2 + hg, width / 2 - thk, height / 2 + hg, dsi, "BCFMSketchDSI");

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
            ])).attr("id", "BCFMSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFMSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ])).attr("id", "BCFMSketchHJ").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFMSketchHJ").attr("startOffset", "50%").text(hj);

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
            ])).attr("id", "BCFMSketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFMSketchTHKJN")
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
            ])).attr("id", "BCFMSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFMSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFMSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFMSketchAX").attr("startOffset", "50%").text("A向");

        }

        currentTabIndex = bcfmd2d3.tabs('getTabIndex', bcfmd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            bcfm2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfm").length > 0) {
                    bcfm2d();
                }
            });
        }
        bcfmd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfm2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfm").length > 0) {
                            bcfm2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号13筋板加强圆平盖计算",
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
                    $(ed.target).combobox("loadData", BCFMSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFMSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFMSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFMSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFMJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFMJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFMJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFMJName);
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
                    bcfmSketch.empty();

                    // model
                    bcfmModel.empty();

                    // sketch
                    currentTabIndex = bcfmd2d3.tabs('getTabIndex', bcfmd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcfm2d();
                        bcfmSketch.off("resize").on("resize", function () {
                            if ($("#bcfm").length > 0) {
                                bcfm2d();
                            }
                        });
                    }
                    bcfmd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfm2d();
                                bcfmSketch.off("resize").on("resize", function () {
                                    if ($("#bcfm").length > 0) {
                                        bcfm2d();
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

                        BCFMDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFMSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFMSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFMSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFMSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFMJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFMJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFMJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFMJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFMDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFMSCategory = [];
                                BCFMJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFMDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFMSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFMJCategory[index] = {
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

                        BCFMSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFMSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFMSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFMSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFMSCategoryVal,
                                temp: BCFMDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFMSType = [];
                                $(result).each(function (index, element) {
                                    BCFMSType[index] = {
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

                        BCFMSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFMSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFMSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFMSCategoryVal,
                                type: BCFMSTypeVal,
                                temp: BCFMDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFMSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFMSSTD[index] = {
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

                        BCFMSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFMSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFMSCategoryVal,
                                type: BCFMSTypeVal,
                                std: BCFMSSTDVal,
                                temp: BCFMDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFMSName = [];
                                $(result).each(function (index, element) {
                                    BCFMSName[index] = {
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

                        BCFMJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFMJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFMJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFMJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFMJCategoryVal,
                                temp: BCFMDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFMJType = [];
                                $(result).each(function (index, element) {
                                    BCFMJType[index] = {
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

                        BCFMJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFMJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFMJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFMJCategoryVal,
                                type: BCFMJTypeVal,
                                temp: BCFMDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFMJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFMJSTD[index] = {
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

                        BCFMJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFMJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFMJCategoryVal,
                                type: BCFMJTypeVal,
                                std: BCFMJSTDVal,
                                temp: BCFMDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFMJName = [];
                                $(result).each(function (index, element) {
                                    BCFMJName[index] = {
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
                        let BCFMPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFMPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFMPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFMPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFMTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFMTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFMSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFMSDensity, BCFMSThkMin, BCFMSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFMSCategoryVal,
                                    "type": BCFMSTypeVal,
                                    "std": BCFMSSTDVal,
                                    "name": BCFMSNameVal,
                                    "temp": BCFMDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFMSDensity = parseFloat(result.density);
                                    BCFMSThkMin = parseFloat(result.thkMin);
                                    BCFMSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFMDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFMDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI);
                                        bcfmSketch.off("resize").on("resize", function () {
                                            if ($("#bcfm").length > 0) {
                                                bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI);
                                            }
                                        });
                                    }
                                    bcfmd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI);
                                                bcfmSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfm").length > 0) {
                                                        bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFMTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFMSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFMSThkMax) {
                                        BCFMTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFMSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFMSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFMSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFMSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN);
                                        bcfmSketch.off("resize").on("resize", function () {
                                            if ($("#bcfm").length > 0) {
                                                bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN);
                                            }
                                        });
                                    }
                                    bcfmd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN);
                                                bcfmSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfm").length > 0) {
                                                        bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFMOST, BCFMOS, BCFMRSEL, BCFMCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFMSCategoryVal,
                                            "type": BCFMSTypeVal,
                                            "std": BCFMSSTDVal,
                                            "name": BCFMSNameVal,
                                            "thk": BCFMTHKSN,
                                            "temp": BCFMDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFMOST = parseFloat(result.ot);
                                            if (BCFMOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFMOS = parseFloat(result.o);
                                            if (BCFMOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFMRSEL = parseFloat(result.rel);
                                            if (BCFMRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFMCS1 = parseFloat(result.c1);
                                            if (BCFMCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFMCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFMTHKSN) {
                                                BCFMCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFMTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFMTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFMES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFMES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFMJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFMJDensity, BCFMJThkMin, BCFMJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFMJCategoryVal,
                                                        "type": BCFMJTypeVal,
                                                        "std": BCFMJSTDVal,
                                                        "name": BCFMJNameVal,
                                                        "temp": BCFMDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFMJDensity = parseFloat(result.density);
                                                        BCFMJThkMin = parseFloat(result.thkMin);
                                                        BCFMJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFMTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFMJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFMJThkMax) {
                                                            BCFMTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFMJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFMJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFMJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFMJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN);
                                                            bcfmSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfm").length > 0) {
                                                                    bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfmd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN);
                                                                    bcfmSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfm").length > 0) {
                                                                            bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFMOJT, BCFMOJ, BCFMRJEL, BCFMCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFMJCategoryVal,
                                                                "type": BCFMJTypeVal,
                                                                "std": BCFMJSTDVal,
                                                                "name": BCFMJNameVal,
                                                                "thk": BCFMTHKJN,
                                                                "temp": BCFMDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFMOJT = parseFloat(result.ot);
                                                                if (BCFMOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFMOJ = parseFloat(result.o);
                                                                if (BCFMOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFMRJEL = parseFloat(result.rel);
                                                                if (BCFMRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFMCJ1 = parseFloat(result.c1);
                                                                if (BCFMCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFMHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFMTHKJN) {
                                                                    BCFMHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFMTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFMTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN, BCFMHJ);
                                                                    bcfmSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfm").length > 0) {
                                                                            bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN, BCFMHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfmd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN, BCFMHJ);
                                                                            bcfmSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfm").length > 0) {
                                                                                    bcfm2d("Φ" + BCFMDSI, 0.5 * BCFMDSI, BCFMTHKSN, BCFMTHKJN, BCFMHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFMCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFMTHKJN) {
                                                                    BCFMCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFMTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFMTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFMPC = BCFMPD + BCFMPS;

                                                                let BCFMCS = BCFMCS1 + BCFMCS2;
                                                                let BCFMTHKSE = BCFMTHKSN - BCFMCS;
                                                                let BCFMDC = BCFMDSI + 2 * BCFMCS2;

                                                                let BCFMCJ = BCFMCJ1 + BCFMCJ2;
                                                                let BCFMTHKJE = BCFMTHKJN - BCFMCJ;
                                                                let BCFMHJE = BCFMHJ - BCFMCJ2;

                                                                let BCFMKP = 0.018;
                                                                let BCFMTHKSC = BCFMDC * Math.sqrt(BCFMKP * BCFMPC / (BCFMOST * BCFMES));
                                                                let BCFMTHKSD = BCFMTHKSC + BCFMCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFMTHKSD + BCFMCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFMTHKSCHK;
                                                                if (BCFMTHKSN >= (BCFMTHKSD + BCFMCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFMTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFMTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFMTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFMTHKSCHK = "不合格";
                                                                }

                                                                let BCFMZX = 0.018 * BCFMPC * BCFMDC * BCFMDC * BCFMDC / BCFMOST;
                                                                let BCFMLS = 20 * BCFMTHKSE;
                                                                let BCFME1 = (BCFMTHKJE * (BCFMHJE + BCFMTHKSE) * (BCFMHJE + BCFMTHKSE) + (BCFMLS - BCFMTHKJE) * BCFMTHKSE * BCFMTHKSE)
                                                                    / (2 * (BCFMTHKJE * (BCFMHJE + BCFMTHKSE) + (BCFMLS - BCFMTHKJE) * BCFMTHKSE));
                                                                let BCFME2 = BCFMHJE + BCFMTHKSE - BCFME1;
                                                                let BCFMI = (BCFMLS * BCFME1 * BCFME1 * BCFME1 - (BCFMLS - BCFMTHKJE) * (BCFME1 - BCFMTHKSE) * (BCFME1 - BCFMTHKSE) * (BCFME1 - BCFMTHKSE) + BCFMTHKJE * BCFME2 * BCFME2 * BCFME2) / 3;
                                                                let BCFMZACT = BCFMI / Math.max(BCFME1, BCFME2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFMZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFMZCHK;
                                                                if (BCFMZACT >= BCFMZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFMZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFMZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFMZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFMZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFMTestPT;
                                                                if (BCFMTest === "液压试验") {
                                                                    BCFMTestPT = Math.max(1.25 * BCFMPD * BCFMOS / BCFMOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFMTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFMTest === "气压试验") {
                                                                    BCFMTestPT = Math.max(1.10 * BCFMPD * BCFMOS / BCFMOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFMTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }

                                                                // MAWP
                                                                let BCFMMAWP = BCFMTHKSE * BCFMTHKSE * BCFMOST * BCFMES / (BCFMKP * BCFMDC * BCFMDC) - BCFMPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFMMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFMPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfmdocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFM",

                                                                            t: BCFMDT,
                                                                            pd: BCFMPD,
                                                                            ps: BCFMPS,

                                                                            stds: BCFMSSTDVal,
                                                                            names: BCFMSNameVal,
                                                                            dsi: BCFMDSI,
                                                                            thksn: BCFMTHKSN,
                                                                            cs2: BCFMCS2,
                                                                            es: BCFMES,

                                                                            stdj: BCFMJSTDVal,
                                                                            namej: BCFMJNameVal,
                                                                            thkjn: BCFMTHKJN,
                                                                            hj: BCFMHJ,
                                                                            cj2: BCFMCJ2,

                                                                            test: BCFMTest,

                                                                            ds: BCFMSDensity.toFixed(4),
                                                                            rsel: BCFMRSEL.toFixed(4),
                                                                            cs1: BCFMCS1.toFixed(4),
                                                                            ost: BCFMOST.toFixed(4),
                                                                            os: BCFMOS.toFixed(4),

                                                                            dj: BCFMJDensity.toFixed(4),
                                                                            rjel: BCFMRJEL.toFixed(4),
                                                                            cj1: BCFMCJ1.toFixed(4),
                                                                            ojt: BCFMOJT.toFixed(4),
                                                                            oj: BCFMOJ.toFixed(4),

                                                                            pc: BCFMPC.toFixed(4),

                                                                            cs: BCFMCS.toFixed(4),
                                                                            thkse: BCFMTHKSE.toFixed(4),
                                                                            dc: BCFMDC.toFixed(4),

                                                                            cj: BCFMCJ.toFixed(4),
                                                                            thkje: BCFMTHKJE.toFixed(4),
                                                                            hje: BCFMHJE.toFixed(4),

                                                                            kp: BCFMKP.toFixed(4),

                                                                            thksc: BCFMTHKSC.toFixed(4),
                                                                            thksd: BCFMTHKSD.toFixed(4),
                                                                            thkschk: BCFMTHKSCHK,

                                                                            zx: BCFMZX.toFixed(4),
                                                                            ls: BCFMLS.toFixed(4),
                                                                            e1: BCFME1.toFixed(4),
                                                                            e2: BCFME2.toFixed(4),
                                                                            i: BCFMI.toFixed(4),
                                                                            zact: BCFMZACT.toFixed(4),
                                                                            zchk: BCFMZCHK,

                                                                            pt: BCFMTestPT.toFixed(4),
                                                                            mawp: BCFMMAWP.toFixed(4)
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
                                                                                BCFMPayJS.dialog({
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
                                                                                            BCFMPayJS.dialog("close");
                                                                                            BCFMPayJS.dialog("clear");
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
                                                                                                        BCFMPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFMPayJS.dialog('close');
                                                                                                                BCFMPayJS.dialog('clear');
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