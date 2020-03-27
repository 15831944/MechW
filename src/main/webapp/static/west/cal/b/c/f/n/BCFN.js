$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfnSketch = $("#d2");
    let bcfnModel = $("#d3");
    let bcfnd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfn'></table>");
    let pg = $("#bcfn");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/n/BCFN.json", function (result) {

        let BCFNDT,
            BCFNSCategory, BCFNSCategoryVal, BCFNSType, BCFNSTypeVal, BCFNSSTD, BCFNSSTDVal, BCFNSName, BCFNSNameVal,
            BCFNJCategory, BCFNJCategoryVal, BCFNJType, BCFNJTypeVal, BCFNJSTD, BCFNJSTDVal, BCFNJName, BCFNJNameVal,
            columns, rows, ed;

        function bcfn2d(dsi = "ϕDsi", ls = "Dsi/5", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcfnSketch.empty();

            let width = bcfnSketch.width();
            let height = bcfnSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFNSVG").attr("height", height);

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
                        {x: startX + 10, y: startY + 28},
                        {x: startX + 10, y: startY + 32},
                        {x: startX, y: startY + 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY + 30},
                        {x: endX - 10, y: endY + 28},
                        {x: endX - 10, y: endY + 32},
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
                        {x: startX - 28, y: startY - 10},
                        {x: startX - 32, y: startY - 10},
                        {x: startX - 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 28, y: endY + 10},
                        {x: endX - 32, y: endY + 10},
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
            drawLine(padding + 0.4 * wg - thk / 2, height / 2 - 3 * thk, padding + 0.4 * wg - thk / 2, height / 2);
            drawLine(padding + 0.4 * wg + thk / 2, height / 2 - 3 * thk, padding + 0.4 * wg + thk / 2, height / 2);
            drawLine(padding + 0.8 * wg - thk / 2, height / 2 - 3 * thk, padding + 0.8 * wg - thk / 2, height / 2);
            drawLine(padding + 0.8 * wg + thk / 2, height / 2 - 3 * thk, padding + 0.8 * wg + thk / 2, height / 2);
            drawLine(padding + 1.2 * wg - thk / 2, height / 2 - 3 * thk, padding + 1.2 * wg - thk / 2, height / 2);
            drawLine(padding + 1.2 * wg + thk / 2, height / 2 - 3 * thk, padding + 1.2 * wg + thk / 2, height / 2);
            drawLine(padding + 1.6 * wg - thk / 2, height / 2 - 3 * thk, padding + 1.6 * wg - thk / 2, height / 2);
            drawLine(padding + 1.6 * wg + thk / 2, height / 2 - 3 * thk, padding + 1.6 * wg + thk / 2, height / 2);

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
            drawLine(cx0 - 0.6 * r0 - thk / 2, cy0 - r0 + thk + 0.2 * r0 + thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 + r0 - thk - 0.2 * r0 - thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 - r0 + thk + 0.2 * r0, cx0 - 0.6 * r0 + thk / 2, cy0 + r0 - thk - 0.2 * r0);
            drawCenterLine(cx0 - 0.6 * r0, cy0 - r0 + thk + 0.2 * r0 - 10, cx0 - 0.6 * r0, cy0 + r0 - thk - 0.2 * r0 + 10);

            drawLine(cx0 - 0.2 * r0 - thk / 2, cy0 - r0 + thk + 0.02 * r0, cx0 - 0.2 * r0 - thk / 2, cy0 + r0 - thk - 0.02 * r0);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 - r0 + thk + 0.02 * r0, cx0 - 0.2 * r0 + thk / 2, cy0 + r0 - thk - 0.02 * r0);
            drawCenterLine(cx0 - 0.2 * r0, cy0 - r0 + thk + 0.02 * r0 - 10, cx0 - 0.2 * r0, cy0 + r0 - thk - 0.02 * r0 + 10);

            drawLine(cx0 + 0.2 * r0 - thk / 2, cy0 - r0 + thk + 0.02 * r0, cx0 + 0.2 * r0 - thk / 2, cy0 + r0 - thk - 0.02 * r0);
            drawLine(cx0 + 0.2 * r0 + thk / 2, cy0 - r0 + thk + 0.02 * r0, cx0 + 0.2 * r0 + thk / 2, cy0 + r0 - thk - 0.02 * r0);
            drawCenterLine(cx0 + 0.2 * r0, cy0 - r0 + thk + 0.02 * r0 - 10, cx0 + 0.2 * r0, cy0 + r0 - thk - 0.02 * r0 + 10);

            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 - r0 + thk + 0.2 * r0, cx0 + 0.6 * r0 - thk / 2, cy0 + r0 - thk - 0.2 * r0);
            drawLine(cx0 + 0.6 * r0 + thk / 2, cy0 - r0 + thk + 0.2 * r0 + thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 + r0 - thk - 0.2 * r0 - thk / 2);
            drawCenterLine(cx0 + 0.6 * r0, cy0 - r0 + thk + 0.2 * r0 - 10, cx0 + 0.6 * r0, cy0 + r0 - thk - 0.2 * r0 + 10);

            dimBottomH(cx0 - 0.6 * r0, cy0 + r0 - thk - 0.02 * r0 + 10, cx0 - 0.2 * r0, cy0 + r0 - thk - 0.02 * r0 + 10, ls, "BCFNSketchLS1");
            dimBottomH(cx0 - 0.2 * r0, cy0 + r0 - thk - 0.02 * r0 + 10, cx0 + 0.2 * r0, cy0 + r0 - thk - 0.02 * r0 + 10, ls, "BCFNSketchLS2");
            dimBottomH(cx0 + 0.2 * r0, cy0 + r0 - thk - 0.02 * r0 + 10, cx0 + 0.6 * r0, cy0 + r0 - thk - 0.02 * r0 + 10, ls, "BCFNSketchLS3");
            drawLine(cx0 - 0.6 * r0, cy0 + r0 - thk - 0.2 * r0 + 10 + 3, cx0 - 0.6 * r0, cy0 + r0 - thk - 0.02 * r0 + 13);
            drawLine(cx0 + 0.6 * r0, cy0 + r0 - thk - 0.2 * r0 + 10 + 3, cx0 + 0.6 * r0, cy0 + r0 - thk - 0.02 * r0 + 13);

            /*
            右侧水平加强筋
             */
            drawLine(cx0 - r0 + thk + 0.2 * r0 + thk / 2, cy0 - 0.6 * r0 - thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 - 0.6 * r0 - thk / 2);
            drawLine(cx0 - r0 + thk + 0.2 * r0, cy0 - 0.6 * r0 + thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 - 0.6 * r0 + thk / 2);
            drawLine(cx0 - r0 + thk + 0.02 * r0, cy0 - 0.2 * r0 - thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 - 0.2 * r0 - thk / 2);
            drawLine(cx0 - r0 + thk + 0.02 * r0, cy0 - 0.2 * r0 + thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 - 0.2 * r0 + thk / 2);
            drawLine(cx0 - r0 + thk + 0.02 * r0, cy0 + 0.2 * r0 - thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 + 0.2 * r0 - thk / 2);
            drawLine(cx0 - r0 + thk + 0.02 * r0, cy0 + 0.2 * r0 + thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 + 0.2 * r0 + thk / 2);
            drawLine(cx0 - r0 + thk + 0.2 * r0 + thk / 2, cy0 + 0.6 * r0 + thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 + 0.6 * r0 + thk / 2);
            drawLine(cx0 - r0 + thk + 0.2 * r0, cy0 + 0.6 * r0 - thk / 2, cx0 - 0.6 * r0 - thk / 2, cy0 + 0.6 * r0 - thk / 2);

            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 - 0.6 * r0 - thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 - 0.6 * r0 - thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 - 0.6 * r0 + thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 - 0.6 * r0 + thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 - 0.2 * r0 - thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 - 0.2 * r0 - thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 - 0.2 * r0 + thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 - 0.2 * r0 + thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 + 0.2 * r0 - thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 + 0.2 * r0 - thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 + 0.2 * r0 + thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 + 0.2 * r0 + thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 + 0.6 * r0 + thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 + 0.6 * r0 + thk / 2);
            drawLine(cx0 - 0.6 * r0 + thk / 2, cy0 + 0.6 * r0 - thk / 2, cx0 - 0.2 * r0 - thk / 2, cy0 + 0.6 * r0 - thk / 2);

            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 - 0.6 * r0 - thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 - 0.6 * r0 - thk / 2);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 - 0.6 * r0 + thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 - 0.6 * r0 + thk / 2);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 - 0.2 * r0 - thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 - 0.2 * r0 - thk / 2);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 - 0.2 * r0 + thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 - 0.2 * r0 + thk / 2);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 + 0.2 * r0 - thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 + 0.2 * r0 - thk / 2);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 + 0.2 * r0 + thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 + 0.2 * r0 + thk / 2);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 + 0.6 * r0 + thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 + 0.6 * r0 + thk / 2);
            drawLine(cx0 - 0.2 * r0 + thk / 2, cy0 + 0.6 * r0 - thk / 2, cx0 + 0.2 * r0 - thk / 2, cy0 + 0.6 * r0 - thk / 2);

            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 - 0.6 * r0 - thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 - 0.6 * r0 - thk / 2);
            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 - 0.6 * r0 + thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 - 0.6 * r0 + thk / 2);
            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 - 0.2 * r0 - thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 - 0.2 * r0 - thk / 2);
            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 - 0.2 * r0 + thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 - 0.2 * r0 + thk / 2);
            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 + 0.2 * r0 - thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 + 0.2 * r0 - thk / 2);
            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 + 0.2 * r0 + thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 + 0.2 * r0 + thk / 2);
            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 + 0.6 * r0 + thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 + 0.6 * r0 + thk / 2);
            drawLine(cx0 + 0.6 * r0 - thk / 2, cy0 + 0.6 * r0 - thk / 2, cx0 + 0.2 * r0 + thk / 2, cy0 + 0.6 * r0 - thk / 2);

            drawLine(cx0 + r0 - thk - 0.2 * r0 - thk / 2, cy0 - 0.6 * r0 - thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 - 0.6 * r0 - thk / 2);
            drawLine(cx0 + r0 - thk - 0.2 * r0, cy0 - 0.6 * r0 + thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 - 0.6 * r0 + thk / 2);
            drawLine(cx0 + r0 - thk - 0.02 * r0, cy0 - 0.2 * r0 - thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 - 0.2 * r0 - thk / 2);
            drawLine(cx0 + r0 - thk - 0.02 * r0, cy0 - 0.2 * r0 + thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 - 0.2 * r0 + thk / 2);
            drawLine(cx0 + r0 - thk - 0.02 * r0, cy0 + 0.2 * r0 - thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 + 0.2 * r0 - thk / 2);
            drawLine(cx0 + r0 - thk - 0.02 * r0, cy0 + 0.2 * r0 + thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 + 0.2 * r0 + thk / 2);
            drawLine(cx0 + r0 - thk - 0.2 * r0 - thk / 2, cy0 + 0.6 * r0 + thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 + 0.6 * r0 + thk / 2);
            drawLine(cx0 + r0 - thk - 0.2 * r0, cy0 + 0.6 * r0 - thk / 2, cx0 + 0.6 * r0 + thk / 2, cy0 + 0.6 * r0 - thk / 2);

            drawCenterLine(cx0 - r0 + thk + 0.2 * r0 - 10, cy0 - 0.6 * r0, cx0 + r0 - thk - 0.2 * r0 + 10, cy0 - 0.6 * r0);
            drawCenterLine(cx0 - r0 + thk + 0.02 * r0 - 10, cy0 - 0.2 * r0, cx0 + r0 - thk - 0.02 * r0 + 10, cy0 - 0.2 * r0);
            drawCenterLine(cx0 - r0 + thk + 0.02 * r0 - 10, cy0 + 0.2 * r0, cx0 + r0 - thk - 0.02 * r0 + 10, cy0 + 0.2 * r0);
            drawCenterLine(cx0 - r0 + thk + 0.2 * r0 - 10, cy0 + 0.6 * r0, cx0 + r0 - thk - 0.2 * r0 + 10, cy0 + 0.6 * r0);

            dimLeftV(cx0 - r0 + thk + 0.02 * r0 - 10, cy0 + 0.6 * r0, cx0 - r0 + thk + 0.02 * r0 - 10, cy0 + 0.2 * r0, ls, "BCFNSketchLS4");
            dimLeftV(cx0 - r0 + thk + 0.02 * r0 - 10, cy0 + 0.2 * r0, cx0 - r0 + thk + 0.02 * r0 - 10, cy0 - 0.2 * r0, ls, "BCFNSketchLS5");
            dimLeftV(cx0 - r0 + thk + 0.02 * r0 - 10, cy0 - 0.2 * r0, cx0 - r0 + thk + 0.02 * r0 - 10, cy0 - 0.6 * r0, ls, "BCFNSketchLS6");
            drawLine(cx0 - r0 + thk + 0.2 * r0 - 10 - 3, cy0 - 0.6 * r0, cx0 - r0 + thk + 0.02 * r0 - 13, cy0 - 0.6 * r0);
            drawLine(cx0 - r0 + thk + 0.2 * r0 - 10 - 3, cy0 + 0.6 * r0, cx0 - r0 + thk + 0.02 * r0 - 13, cy0 + 0.6 * r0);

            // dsi
            dimBottomH(padding + thk, height / 2 + hg, width / 2 - thk, height / 2 + hg, dsi, "BCFNSketchDSI");

            // thksn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.25 * wg, y: height / 2},
                    {x: padding + 0.25 * wg + 2, y: height / 2 - 10},
                    {x: padding + 0.25 * wg - 2, y: height / 2 - 10},
                    {x: padding + 0.25 * wg, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.25 * wg, y: height / 2 + thk},
                    {x: padding + 0.25 * wg + 2, y: height / 2 + thk + 10},
                    {x: padding + 0.25 * wg - 2, y: height / 2 + thk + 10},
                    {x: padding + 0.25 * wg, y: height / 2 + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.25 * wg, y: height / 2 - 10 - 10},
                {x: padding + 0.25 * wg, y: height / 2 + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.25 * wg, y: height / 2 + thk + 10 + 35},
                {x: padding + 0.25 * wg, y: height / 2 + thk + 10}
            ])).attr("id", "BCFNSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFNSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // hj
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.75 * wg, y: height / 2 - 3 * thk},
                    {x: padding + 1.75 * wg + 2, y: height / 2 - 3 * thk - 10},
                    {x: padding + 1.75 * wg - 2, y: height / 2 - 3 * thk - 10},
                    {x: padding + 1.75 * wg, y: height / 2 - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.75 * wg, y: height / 2},
                    {x: padding + 1.75 * wg + 2, y: height / 2 + 10},
                    {x: padding + 1.75 * wg - 2, y: height / 2 + 10},
                    {x: padding + 1.75 * wg, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.75 * wg, y: height / 2 - 3 * thk},
                {x: padding + 1.75 * wg, y: height / 2 + 10 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.75 * wg, y: height / 2 - 3 * thk - 10},
                {x: padding + 1.75 * wg, y: height / 2 - 3 * thk - 10 - 35}
            ])).attr("id", "BCFNSketchHJ").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFNSketchHJ").attr("startOffset", "50%").text(hj);

            // thkjn
            extLineTopV(padding + 0.8 * wg + thk / 2, height / 2 - 3 * thk);
            extLineTopV(padding + 0.8 * wg - thk / 2, height / 2 - 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.8 * wg + thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + 0.8 * wg + thk / 2 + 10, y: height / 2 - 3 * thk - 28},
                    {x: padding + 0.8 * wg + thk / 2 + 10, y: height / 2 - 3 * thk - 32},
                    {x: padding + 0.8 * wg + thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.8 * wg - thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + 0.8 * wg - thk / 2 - 10, y: height / 2 - 3 * thk - 28},
                    {x: padding + 0.8 * wg - thk / 2 - 10, y: height / 2 - 3 * thk - 32},
                    {x: padding + 0.8 * wg - thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.8 * wg - thk / 2 - 10 - 10, y: height / 2 - 3 * thk - 30},
                {x: padding + 0.8 * wg + thk / 2, y: height / 2 - 3 * thk - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.8 * wg + thk / 2 + 10, y: height / 2 - 3 * thk - 30},
                {x: padding + 0.8 * wg + thk / 2 + 10 + 40, y: height / 2 - 3 * thk - 30}
            ])).attr("id", "BCFNSketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFNSketchTHKJN")
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
            ])).attr("id", "BCFNSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFNSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFNSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFNSketchAX").attr("startOffset", "50%").text("A向");

        }

        currentTabIndex = bcfnd2d3.tabs('getTabIndex', bcfnd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            bcfn2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfn").length > 0) {
                    bcfn2d();
                }
            });
        }
        bcfnd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfn2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfn").length > 0) {
                            bcfn2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号14筋板加强圆平盖计算",
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
                    $(ed.target).combobox("loadData", BCFNSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFNSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFNSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFNSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFNJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFNJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFNJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFNJName);
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
                    bcfnSketch.empty();

                    // model
                    bcfnModel.empty();

                    // sketch
                    currentTabIndex = bcfnd2d3.tabs('getTabIndex', bcfnd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcfn2d();
                        bcfnSketch.off("resize").on("resize", function () {
                            if ($("#bcfn").length > 0) {
                                bcfn2d();
                            }
                        });
                    }
                    bcfnd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfn2d();
                                bcfnSketch.off("resize").on("resize", function () {
                                    if ($("#bcfn").length > 0) {
                                        bcfn2d();
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

                        BCFNDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFNSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFNSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFNSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFNSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFNJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFNJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFNJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFNJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFNDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFNSCategory = [];
                                BCFNJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFNDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFNSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFNJCategory[index] = {
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

                        BCFNSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFNSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFNSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFNSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFNSCategoryVal,
                                temp: BCFNDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFNSType = [];
                                $(result).each(function (index, element) {
                                    BCFNSType[index] = {
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

                        BCFNSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFNSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFNSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFNSCategoryVal,
                                type: BCFNSTypeVal,
                                temp: BCFNDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFNSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFNSSTD[index] = {
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

                        BCFNSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFNSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFNSCategoryVal,
                                type: BCFNSTypeVal,
                                std: BCFNSSTDVal,
                                temp: BCFNDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFNSName = [];
                                $(result).each(function (index, element) {
                                    BCFNSName[index] = {
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

                        BCFNJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFNJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFNJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFNJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFNJCategoryVal,
                                temp: BCFNDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFNJType = [];
                                $(result).each(function (index, element) {
                                    BCFNJType[index] = {
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

                        BCFNJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFNJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFNJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFNJCategoryVal,
                                type: BCFNJTypeVal,
                                temp: BCFNDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFNJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFNJSTD[index] = {
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

                        BCFNJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFNJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFNJCategoryVal,
                                type: BCFNJTypeVal,
                                std: BCFNJSTDVal,
                                temp: BCFNDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFNJName = [];
                                $(result).each(function (index, element) {
                                    BCFNJName[index] = {
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
                        let BCFNPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFNPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFNPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFNPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFNTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFNTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFNSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFNSDensity, BCFNSThkMin, BCFNSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFNSCategoryVal,
                                    "type": BCFNSTypeVal,
                                    "std": BCFNSSTDVal,
                                    "name": BCFNSNameVal,
                                    "temp": BCFNDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFNSDensity = parseFloat(result.density);
                                    BCFNSThkMin = parseFloat(result.thkMin);
                                    BCFNSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFNDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFNDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI);
                                        bcfnSketch.off("resize").on("resize", function () {
                                            if ($("#bcfn").length > 0) {
                                                bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI);
                                            }
                                        });
                                    }
                                    bcfnd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI);
                                                bcfnSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfn").length > 0) {
                                                        bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFNTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFNSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFNSThkMax) {
                                        BCFNTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFNSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFNSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFNSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFNSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN);
                                        bcfnSketch.off("resize").on("resize", function () {
                                            if ($("#bcfn").length > 0) {
                                                bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN);
                                            }
                                        });
                                    }
                                    bcfnd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN);
                                                bcfnSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfn").length > 0) {
                                                        bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFNOST, BCFNOS, BCFNRSEL, BCFNCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFNSCategoryVal,
                                            "type": BCFNSTypeVal,
                                            "std": BCFNSSTDVal,
                                            "name": BCFNSNameVal,
                                            "thk": BCFNTHKSN,
                                            "temp": BCFNDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFNOST = parseFloat(result.ot);
                                            if (BCFNOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFNOS = parseFloat(result.o);
                                            if (BCFNOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFNRSEL = parseFloat(result.rel);
                                            if (BCFNRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFNCS1 = parseFloat(result.c1);
                                            if (BCFNCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFNCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFNTHKSN) {
                                                BCFNCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFNTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFNTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFNES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFNES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFNJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFNJDensity, BCFNJThkMin, BCFNJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFNJCategoryVal,
                                                        "type": BCFNJTypeVal,
                                                        "std": BCFNJSTDVal,
                                                        "name": BCFNJNameVal,
                                                        "temp": BCFNDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFNJDensity = parseFloat(result.density);
                                                        BCFNJThkMin = parseFloat(result.thkMin);
                                                        BCFNJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFNTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFNJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFNJThkMax) {
                                                            BCFNTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFNJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFNJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFNJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFNJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN);
                                                            bcfnSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfn").length > 0) {
                                                                    bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfnd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN);
                                                                    bcfnSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfn").length > 0) {
                                                                            bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFNOJT, BCFNOJ, BCFNRJEL, BCFNCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFNJCategoryVal,
                                                                "type": BCFNJTypeVal,
                                                                "std": BCFNJSTDVal,
                                                                "name": BCFNJNameVal,
                                                                "thk": BCFNTHKJN,
                                                                "temp": BCFNDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFNOJT = parseFloat(result.ot);
                                                                if (BCFNOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFNOJ = parseFloat(result.o);
                                                                if (BCFNOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFNRJEL = parseFloat(result.rel);
                                                                if (BCFNRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFNCJ1 = parseFloat(result.c1);
                                                                if (BCFNCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFNHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFNTHKJN) {
                                                                    BCFNHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFNTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFNTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN, BCFNHJ);
                                                                    bcfnSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfn").length > 0) {
                                                                            bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN, BCFNHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfnd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN, BCFNHJ);
                                                                            bcfnSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfn").length > 0) {
                                                                                    bcfn2d("Φ" + BCFNDSI, 0.2 * BCFNDSI, BCFNTHKSN, BCFNTHKJN, BCFNHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFNCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFNTHKJN) {
                                                                    BCFNCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFNTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFNTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFNPC = BCFNPD + BCFNPS;

                                                                let BCFNCS = BCFNCS1 + BCFNCS2;
                                                                let BCFNTHKSE = BCFNTHKSN - BCFNCS;
                                                                let BCFNDC = BCFNDSI + 2 * BCFNCS2;

                                                                let BCFNCJ = BCFNCJ1 + BCFNCJ2;
                                                                let BCFNTHKJE = BCFNTHKJN - BCFNCJ;
                                                                let BCFNHJE = BCFNHJ - BCFNCJ2;

                                                                let BCFNKP = 0.012;
                                                                let BCFNTHKSC = BCFNDC * Math.sqrt(BCFNKP * BCFNPC / (BCFNOST * BCFNES));
                                                                let BCFNTHKSD = BCFNTHKSC + BCFNCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFNTHKSD + BCFNCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFNTHKSCHK;
                                                                if (BCFNTHKSN >= (BCFNTHKSD + BCFNCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFNTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFNTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFNTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFNTHKSCHK = "不合格";
                                                                }

                                                                let BCFNZX = 0.014 * BCFNPC * BCFNDC * BCFNDC * BCFNDC / BCFNOST;
                                                                let BCFNLS = 20 * BCFNTHKSE;
                                                                let BCFNE1 = (BCFNTHKJE * (BCFNHJE + BCFNTHKSE) * (BCFNHJE + BCFNTHKSE) + (BCFNLS - BCFNTHKJE) * BCFNTHKSE * BCFNTHKSE)
                                                                    / (2 * (BCFNTHKJE * (BCFNHJE + BCFNTHKSE) + (BCFNLS - BCFNTHKJE) * BCFNTHKSE));
                                                                let BCFNE2 = BCFNHJE + BCFNTHKSE - BCFNE1;
                                                                let BCFNI = (BCFNLS * BCFNE1 * BCFNE1 * BCFNE1 - (BCFNLS - BCFNTHKJE) * (BCFNE1 - BCFNTHKSE) * (BCFNE1 - BCFNTHKSE) * (BCFNE1 - BCFNTHKSE) + BCFNTHKJE * BCFNE2 * BCFNE2 * BCFNE2) / 3;
                                                                let BCFNZACT = BCFNI / Math.max(BCFNE1, BCFNE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFNZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFNZCHK;
                                                                if (BCFNZACT >= BCFNZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFNZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFNZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFNZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFNZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFNTestPT;
                                                                if (BCFNTest === "液压试验") {
                                                                    BCFNTestPT = Math.max(1.25 * BCFNPD * BCFNOS / BCFNOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFNTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFNTest === "气压试验") {
                                                                    BCFNTestPT = Math.max(1.10 * BCFNPD * BCFNOS / BCFNOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFNTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }

                                                                // MAWP
                                                                let BCFNMAWP = BCFNTHKSE * BCFNTHKSE * BCFNOST * BCFNES / (BCFNKP * BCFNDC * BCFNDC) - BCFNPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFNMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFNPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfndocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFN",

                                                                            t: BCFNDT,
                                                                            pd: BCFNPD,
                                                                            ps: BCFNPS,

                                                                            stds: BCFNSSTDVal,
                                                                            names: BCFNSNameVal,
                                                                            dsi: BCFNDSI,
                                                                            thksn: BCFNTHKSN,
                                                                            cs2: BCFNCS2,
                                                                            es: BCFNES,

                                                                            stdj: BCFNJSTDVal,
                                                                            namej: BCFNJNameVal,
                                                                            thkjn: BCFNTHKJN,
                                                                            hj: BCFNHJ,
                                                                            cj2: BCFNCJ2,

                                                                            test: BCFNTest,

                                                                            ds: BCFNSDensity.toFixed(4),
                                                                            rsel: BCFNRSEL.toFixed(4),
                                                                            cs1: BCFNCS1.toFixed(4),
                                                                            ost: BCFNOST.toFixed(4),
                                                                            os: BCFNOS.toFixed(4),

                                                                            dj: BCFNJDensity.toFixed(4),
                                                                            rjel: BCFNRJEL.toFixed(4),
                                                                            cj1: BCFNCJ1.toFixed(4),
                                                                            ojt: BCFNOJT.toFixed(4),
                                                                            oj: BCFNOJ.toFixed(4),

                                                                            pc: BCFNPC.toFixed(4),

                                                                            cs: BCFNCS.toFixed(4),
                                                                            thkse: BCFNTHKSE.toFixed(4),
                                                                            dc: BCFNDC.toFixed(4),

                                                                            cj: BCFNCJ.toFixed(4),
                                                                            thkje: BCFNTHKJE.toFixed(4),
                                                                            hje: BCFNHJE.toFixed(4),

                                                                            kp: BCFNKP.toFixed(4),

                                                                            thksc: BCFNTHKSC.toFixed(4),
                                                                            thksd: BCFNTHKSD.toFixed(4),
                                                                            thkschk: BCFNTHKSCHK,

                                                                            zx: BCFNZX.toFixed(4),
                                                                            ls: BCFNLS.toFixed(4),
                                                                            e1: BCFNE1.toFixed(4),
                                                                            e2: BCFNE2.toFixed(4),
                                                                            i: BCFNI.toFixed(4),
                                                                            zact: BCFNZACT.toFixed(4),
                                                                            zchk: BCFNZCHK,

                                                                            pt: BCFNTestPT.toFixed(4),
                                                                            mawp: BCFNMAWP.toFixed(4)
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
                                                                                BCFNPayJS.dialog({
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
                                                                                            BCFNPayJS.dialog("close");
                                                                                            BCFNPayJS.dialog("clear");
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
                                                                                                        BCFNPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFNPayJS.dialog('close');
                                                                                                                BCFNPayJS.dialog('clear');
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