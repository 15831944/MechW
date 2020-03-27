$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let caaad2 = $("#d2");
    let caaad3 = $("#d3");
    let caaad2d3 = $('#d2d3');

    $("#cal").html("<table id='caaa'></table>");
    let pg = $("#caaa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/a/a/CAAA.json", function (result) {

        let CAAADT;
        let CAAASCategory, CAAASCategoryVal, CAAASType, CAAASTypeVal, CAAASSTD, CAAASSTDVal, CAAASName,
            CAAAPCategory, CAAAPCategoryVal, CAAAPType, CAAAPTypeVal, CAAAPSTD, CAAAPSTDVal, CAAAPName,
            CAAAJCategory, CAAAJCategoryVal, CAAAJType, CAAAJTypeVal, CAAAJSTD, CAAAJSTDVal, CAAAJName;
        let columns, rows, ed;

        // 2D Sketch
        function caaa2d(dsi = "ϕDsi", thksn = "δsn", tp = "tp", dpo = "ϕdpo", thkpn = "δpn", e = "e", thkjn = "δjn") {

            caaad2.empty();

            let width = caaad2.width();
            let height = caaad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CAAASVG")
                .attr("width", width).attr("height", height);

            // X 轴比例尺
            let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

            // Y 轴比例尺
            let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

            // 轮廓线对象
            let line = d3.line().x(function (d) {
                return xScale(d.x);
            }).y(function (d) {
                return yScale(d.y);
            });

            // 图形边距
            let padding = 20;
            let thickness = 5;

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
                ])).attr("id", id).classed("sketch", true);

                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle").append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            // 筒体直径、长度
            let CAAAL = height - 2 * padding;
            let CAAADSI = Math.min(CAAAL / 2, width - 2 * padding - 4 * thickness - 100);

            // 内筒及端部体轮廓
            drawLine(width / 2 - CAAADSI / 2, height / 2 - CAAAL / 2, width / 2 - CAAADSI / 2, height / 2 + CAAAL / 2);
            drawLine(width / 2 + CAAADSI / 2, height / 2 - CAAAL / 2, width / 2 + CAAADSI / 2, height / 2 + CAAAL / 2);
            drawLine(width / 2 - CAAADSI / 2 - thickness, height / 2 - CAAAL / 2, width / 2 - CAAADSI / 2 - thickness, height / 2 + CAAAL / 2);
            drawLine(width / 2 + CAAADSI / 2 + thickness, height / 2 - CAAAL / 2, width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAAL / 2);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 - CAAAL / 2, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 - CAAAL / 2);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + CAAAL / 2, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 + CAAAL / 2);

            // 轴向间距
            let CAAATP = CAAAL / 5;

            // 短管直径
            let CAAARPO = CAAATP / 8;
            let CAAARPI = CAAARPO - 3;

            // 外筒体
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30, height / 2 - CAAARPO, width / 2 - CAAADSI / 2 - thickness - 30, height / 2 - CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30, height / 2 - CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - thickness - 30, height / 2 - 2 * CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30, height / 2 - 2 * CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - thickness - 30, height / 2 - CAAAL / 2);
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30, height / 2 + CAAARPO, width / 2 - CAAADSI / 2 - thickness - 30, height / 2 + CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30, height / 2 + CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - thickness - 30, height / 2 + 2 * CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30, height / 2 + 2 * CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - thickness - 30, height / 2 + CAAAL / 2);

            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 - CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 - CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 - 2 * CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 - 2 * CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 - CAAAL / 2);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + 2 * CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + 2 * CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + CAAAL / 2);

            drawLine(width / 2 + CAAADSI / 2 + thickness + 30, height / 2 - CAAARPO, width / 2 + CAAADSI / 2 + thickness + 30, height / 2 - CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + thickness + 30, height / 2 - CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + thickness + 30, height / 2 - 2 * CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + thickness + 30, height / 2 - 2 * CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + thickness + 30, height / 2 - CAAAL / 2);
            drawLine(width / 2 + CAAADSI / 2 + thickness + 30, height / 2 + CAAARPO, width / 2 + CAAADSI / 2 + thickness + 30, height / 2 + CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + thickness + 30, height / 2 + CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + thickness + 30, height / 2 + 2 * CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + thickness + 30, height / 2 + 2 * CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + thickness + 30, height / 2 + CAAAL / 2);

            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 - CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 - CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 - 2 * CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 - 2 * CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 - CAAAL / 2);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 + CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 + CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 + CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 + 2 * CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 + 2 * CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30, height / 2 + CAAAL / 2);

            drawCenterLine(width / 2, padding - 5, width / 2, height - padding + 5);

            // 左侧短管
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 - CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 + CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAARPO);
            drawCenterLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5 - 3, height / 2, width / 2 - CAAADSI / 2 + 3, height / 2);

            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 + CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAATP - CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 + CAAATP - CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAATP + CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 + CAAATP + CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 + CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + CAAATP + CAAARPO);
            drawCenterLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5 - 3, height / 2 + CAAATP, width / 2 - CAAADSI / 2 + 3, height / 2 + CAAATP);

            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 - CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAATP - CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 - CAAATP - CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAATP + CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 - CAAATP + CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 - CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - CAAATP + CAAARPO);
            drawCenterLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5 - 3, height / 2 - CAAATP, width / 2 - CAAADSI / 2 + 3, height / 2 - CAAATP);

            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + 2 * CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 + 2 * CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + 2 * CAAATP - CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 + 2 * CAAATP - CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + 2 * CAAATP + CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 + 2 * CAAATP + CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + 2 * CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 + 2 * CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + 2 * CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 + 2 * CAAATP + CAAARPO);
            drawCenterLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5 - 3, height / 2 + 2 * CAAATP, width / 2 - CAAADSI / 2 + 3, height / 2 + 2 * CAAATP);

            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - 2 * CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 - 2 * CAAATP - CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - 2 * CAAATP - CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 - 2 * CAAATP - CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - 2 * CAAATP + CAAARPI, width / 2 - CAAADSI / 2 - thickness, height / 2 - 2 * CAAATP + CAAARPI);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - 2 * CAAATP + CAAARPO, width / 2 - CAAADSI / 2 - thickness, height / 2 - 2 * CAAATP + CAAARPO);
            drawLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - 2 * CAAATP - CAAARPO, width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5, height / 2 - 2 * CAAATP + CAAARPO);
            drawCenterLine(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5 - 3, height / 2 - 2 * CAAATP, width / 2 - CAAADSI / 2 + 3, height / 2 - 2 * CAAATP);

            // 右侧短管
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 - CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAARPO);
            drawCenterLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2, width / 2 + CAAADSI / 2 - 3, height / 2);

            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAATP - CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAATP - CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAATP + CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAATP + CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + CAAATP + CAAARPO);
            drawCenterLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 + CAAATP, width / 2 + CAAADSI / 2 - 3, height / 2 + CAAATP);

            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 - CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAATP - CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 - CAAATP - CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAATP + CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 - CAAATP + CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 - CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - CAAATP + CAAARPO);
            drawCenterLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 - CAAATP, width / 2 + CAAADSI / 2 - 3, height / 2 - CAAATP);

            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + 2 * CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 + 2 * CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + 2 * CAAATP - CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 + 2 * CAAATP - CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + 2 * CAAATP + CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 + 2 * CAAATP + CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + 2 * CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 + 2 * CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + 2 * CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 + 2 * CAAATP + CAAARPO);
            drawCenterLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 + 2 * CAAATP, width / 2 + CAAADSI / 2 - 3, height / 2 + 2 * CAAATP);

            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - 2 * CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 - 2 * CAAATP - CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - 2 * CAAATP - CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 - 2 * CAAATP - CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - 2 * CAAATP + CAAARPI, width / 2 + CAAADSI / 2 + thickness, height / 2 - 2 * CAAATP + CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - 2 * CAAATP + CAAARPO, width / 2 + CAAADSI / 2 + thickness, height / 2 - 2 * CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - 2 * CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5, height / 2 - 2 * CAAATP + CAAARPO);
            drawCenterLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 - 2 * CAAATP, width / 2 + CAAADSI / 2 - 3, height / 2 - 2 * CAAATP);

            // 内筒体内直径
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CAAADSI / 2, y: padding + CAAATP},
                    {x: width / 2 - CAAADSI / 2 + 15, y: padding + CAAATP - 3},
                    {x: width / 2 - CAAADSI / 2 + 15, y: padding + CAAATP + 3},
                    {x: width / 2 - CAAADSI / 2, y: padding + CAAATP}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CAAADSI / 2, y: padding + CAAATP},
                    {x: width / 2 + CAAADSI / 2 - 15, y: padding + CAAATP - 3},
                    {x: width / 2 + CAAADSI / 2 - 15, y: padding + CAAATP + 3},
                    {x: width / 2 + CAAADSI / 2, y: padding + CAAATP}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - CAAADSI / 2 + 15, y: padding + CAAATP},
                {x: width / 2 + CAAADSI / 2 - 15, y: padding + CAAATP}
            ])).attr("id", "CAAASketchDSI").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CAAASketchDSI")
                .attr("startOffset", "30%").text(dsi);

            // 内筒体厚度
            drawLine(width / 2 - CAAADSI / 2, padding + CAAATP, width / 2 - CAAADSI / 2 - thickness, padding + CAAATP);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CAAADSI / 2 - thickness, y: padding + CAAATP},
                    {x: width / 2 - CAAADSI / 2 - thickness - 15, y: padding + CAAATP - 3},
                    {x: width / 2 - CAAADSI / 2 - thickness - 15, y: padding + CAAATP + 3},
                    {x: width / 2 - CAAADSI / 2 - thickness, y: padding + CAAATP}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - CAAADSI / 2 - thickness - 15 - 70, y: padding + CAAATP},
                {x: width / 2 - CAAADSI / 2 - thickness - 15, y: padding + CAAATP}
            ])).attr("id", "CAAASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CAAASketchTHKSN")
                .attr("startOffset", "30%").text(thksn);

            // 垂直节距
            dimLeftV(width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5 - 3, height / 2, width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 5 - 3, height / 2 - CAAATP, tp, "CAAASketchTP");

            // 短管外直径
            extLineRightH(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 - 2 * CAAATP + CAAARPO);
            extLineRightH(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 - 2 * CAAATP - CAAARPO);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {
                        x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30,
                        y: height / 2 - 2 * CAAATP + CAAARPO
                    },
                    {
                        x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 27,
                        y: height / 2 - 2 * CAAATP + CAAARPO + 15
                    },
                    {
                        x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 33,
                        y: height / 2 - 2 * CAAATP + CAAARPO + 15
                    },
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - 2 * CAAATP + CAAARPO}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {
                        x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30,
                        y: height / 2 - 2 * CAAATP - CAAARPO
                    },
                    {
                        x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 27,
                        y: height / 2 - 2 * CAAATP - CAAARPO - 15
                    },
                    {
                        x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 33,
                        y: height / 2 - 2 * CAAATP - CAAARPO - 15
                    },
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - 2 * CAAATP - CAAARPO}
                ]));
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - 2 * CAAATP - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - 2 * CAAATP + CAAARPO);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - 2 * CAAATP - CAAARPO - 15, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - 2 * CAAATP - CAAARPO - 30);
            svg.append("path").attr("d", line([
                {
                    x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30,
                    y: height / 2 - 2 * CAAATP + CAAARPO + 15 + 45
                },
                {
                    x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30,
                    y: height / 2 - 2 * CAAATP + CAAARPO + 15
                }
            ])).attr("id", "CAAASketchDPO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAAASketchDPO")
                .attr("startOffset", "50%").text(dpo);

            // 短管厚度
            extLineRightH(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 - CAAARPI);
            extLineRightH(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3, height / 2 - CAAARPO);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - CAAARPO + 3},
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 27, y: height / 2 - CAAARPO + 3 + 15},
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 33, y: height / 2 - CAAARPO + 3 + 15},
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - CAAARPO + 3}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - CAAARPI - 3},
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 27, y: height / 2 - CAAARPI - 3 - 15},
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 33, y: height / 2 - CAAARPI - 3 - 15},
                    {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - CAAARPI - 3}
                ]));
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - CAAARPO, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - CAAARPI);
            drawLine(width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - CAAARPO - 15, width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 8 + 30, height / 2 - CAAARPO - 30);
            svg.append("path").attr("d", line([
                {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - CAAARPI + 15 + 45},
                {x: width / 2 + CAAADSI / 2 + 2 * thickness + 30 + 5 + 3 + 30, y: height / 2 - CAAARPI + 15}
            ])).attr("id", "CAAASketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAAASketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // e
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CAAADSI / 2 + thickness, y: height / 2 + CAAATP - CAAARPO - 20},
                    {x: width / 2 + CAAADSI / 2 + thickness - 15, y: height / 2 + CAAATP - CAAARPO - 17},
                    {x: width / 2 + CAAADSI / 2 + thickness - 15, y: height / 2 + CAAATP - CAAARPO - 23},
                    {x: width / 2 + CAAADSI / 2 + thickness, y: height / 2 + CAAATP - CAAARPO - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CAAADSI / 2 + thickness + 30, y: height / 2 + CAAATP - CAAARPO - 20},
                    {x: width / 2 + CAAADSI / 2 + thickness + 30 + 15, y: height / 2 + CAAATP - CAAARPO - 17},
                    {x: width / 2 + CAAADSI / 2 + thickness + 30 + 15, y: height / 2 + CAAATP - CAAARPO - 23},
                    {x: width / 2 + CAAADSI / 2 + thickness + 30, y: height / 2 + CAAATP - CAAARPO - 20}
                ]));
            drawLine(width / 2 + CAAADSI / 2 + thickness, height / 2 + CAAATP - CAAARPO - 20, width / 2 + CAAADSI / 2 + thickness + 30, height / 2 + CAAATP - CAAARPO - 20);
            drawLine(width / 2 + CAAADSI / 2 + thickness + 30 + 30, height / 2 + CAAATP - CAAARPO - 20, width / 2 + CAAADSI / 2 + thickness + 30 + 15, height / 2 + CAAATP - CAAARPO - 20);
            svg.append("path").attr("d", line([
                {x: width / 2 + CAAADSI / 2 + thickness - 15 - 40, y: height / 2 + CAAATP - CAAARPO - 20},
                {x: width / 2 + CAAADSI / 2 + thickness - 15, y: height / 2 + CAAATP - CAAARPO - 20}
            ])).attr("id", "CAAASketchE").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CAAASketchE").attr("startOffset", "50%").text(e);

            // THKJN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CAAADSI / 2 - 2 * thickness - 30, y: height / 2 + CAAATP - CAAARPO - 20},
                    {x: width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 15, y: height / 2 + CAAATP - CAAARPO - 17},
                    {x: width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 15, y: height / 2 + CAAATP - CAAARPO - 23},
                    {x: width / 2 - CAAADSI / 2 - 2 * thickness - 30, y: height / 2 + CAAATP - CAAARPO - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CAAADSI / 2 - thickness - 30, y: height / 2 + CAAATP - CAAARPO - 20},
                    {x: width / 2 - CAAADSI / 2 - thickness - 30 + 15, y: height / 2 + CAAATP - CAAARPO - 17},
                    {x: width / 2 - CAAADSI / 2 - thickness - 30 + 15, y: height / 2 + CAAATP - CAAARPO - 23},
                    {x: width / 2 - CAAADSI / 2 - thickness - 30, y: height / 2 + CAAATP - CAAARPO - 20}
                ]));
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30, height / 2 + CAAATP - CAAARPO - 20, width / 2 - CAAADSI / 2 - 2 * thickness - 30, height / 2 + CAAATP - CAAARPO - 20);
            drawLine(width / 2 - CAAADSI / 2 - thickness - 30 + 30, height / 2 + CAAATP - CAAARPO - 20, width / 2 - CAAADSI / 2 - thickness - 30 + 15, height / 2 + CAAATP - CAAARPO - 20);
            svg.append("path").attr("d", line([
                {x: width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 15 - 40, y: height / 2 + CAAATP - CAAARPO - 20},
                {x: width / 2 - CAAADSI / 2 - 2 * thickness - 30 - 15, y: height / 2 + CAAATP - CAAARPO - 20}
            ])).attr("id", "CAAASketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CAAASketchTHKJN").attr("startOffset", "50%").text(thkjn);
        }

        currentTabIndex = caaad2d3.tabs('getTabIndex', caaad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            caaa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#caaa").length > 0) {
                    caaa2d();
                }
            });
        }
        caaad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    caaa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#caaa").length > 0) {
                            caaa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 蜂窝短管夹套圆筒强度校核",
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
                        // return "background-color:#efefef;";
                    }
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

                if (index === 2) {
                    $(ed.target).combobox("loadData", CAAASCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CAAASType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CAAASSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CAAASName);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", CAAAPCategory);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", CAAAPType);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", CAAAPSTD);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CAAAPName);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", CAAAJCategory);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", CAAAJType);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", CAAAJSTD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", CAAAJName);
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
                    caaad2.empty();

                    // model
                    caaad3.empty();

                    // sketch
                    currentTabIndex = caaad2d3.tabs('getTabIndex', caaad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        caaa2d();
                        caaad2.off("resize").on("resize", function () {
                            if ($("#caaa").length > 0) {
                                caaa2d();
                            }
                        });
                    }
                    caaad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                caaa2d();
                                caaad2.off("resize").on("resize", function () {
                                    if ($("#caaa").length > 0) {
                                        caaa2d();
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
                    if (index === 0) {

                        CAAADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CAAASCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CAAASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAAASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAAASName = null;

                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        CAAAPCategory = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        CAAAPType = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CAAAPSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAAAPName = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        CAAAJCategory = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        CAAAJType = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        CAAAJSTD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        CAAAJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAASCategory = [];
                                CAAAPCategory = [];
                                CAAAJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CAAADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CAAASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CAAAPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CAAAJCategory[index] = {
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
                    else if (index === 2) {

                        CAAASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CAAASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAAASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAAASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAASCategoryVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAASType = [];
                                $(result).each(function (index, element) {
                                    CAAASType[index] = {
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
                    else if (index === 3) {

                        CAAASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAAASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAAASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAASCategoryVal,
                                type: CAAASTypeVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAASSTD = [];
                                $(result).each(function (index, element) {
                                    CAAASSTD[index] = {
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
                    else if (index === 4) {

                        CAAASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAAASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAASCategoryVal,
                                type: CAAASTypeVal,
                                std: CAAASSTDVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAASName = [];
                                $(result).each(function (index, element) {
                                    CAAASName[index] = {
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
                    else if (index === 11) {

                        CAAAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        CAAAPType = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CAAAPSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAAAPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAAPCategoryVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAAPType = [];
                                $(result).each(function (index, element) {
                                    CAAAPType[index] = {
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
                    else if (index === 12) {

                        CAAAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CAAAPSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAAAPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAAPCategoryVal,
                                type: CAAAPTypeVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAAPSTD = [];
                                $(result).each(function (index, element) {
                                    CAAAPSTD[index] = {
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
                    else if (index === 13) {

                        CAAAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAAAPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAAPCategoryVal,
                                type: CAAAPTypeVal,
                                std: CAAAPSTDVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAAPName = [];
                                $(result).each(function (index, element) {
                                    CAAAPName[index] = {
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
                    else if (index === 21) {

                        CAAAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        CAAAJType = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        CAAAJSTD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        CAAAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAAJCategoryVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAAJType = [];
                                $(result).each(function (index, element) {
                                    CAAAJType[index] = {
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
                    else if (index === 22) {

                        CAAAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        CAAAJSTD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        CAAAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAAJCategoryVal,
                                type: CAAAJTypeVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAAJSTD = [];
                                $(result).each(function (index, element) {
                                    CAAAJSTD[index] = {
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
                    else if (index === 23) {

                        CAAAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        CAAAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAAAJCategoryVal,
                                type: CAAAJTypeVal,
                                std: CAAAJSTDVal,
                                temp: CAAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAAAJName = [];
                                $(result).each(function (index, element) {
                                    CAAAJName[index] = {
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

                        // 试验类型
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let CAAATest = rows[1][columns[0][1].field];

                            // 筒体材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CAAASNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取筒体材料密度、最大最小厚度
                                let CAAASDensity, CAAASThkMin, CAAASThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CAAASCategoryVal,
                                        "type": CAAASTypeVal,
                                        "std": CAAASSTDVal,
                                        "name": CAAASNameVal,
                                        "temp": CAAADT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        CAAASDensity = parseFloat(result.density);
                                        CAAASThkMin = parseFloat(result.thkMin);
                                        CAAASThkMax = parseFloat(result.thkMax);

                                        // 筒体设计压力
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CAAAPSD = parseFloat(rows[6][columns[0][1].field]);

                                            // 筒体静压力
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let CAAAPSS = parseFloat(rows[7][columns[0][1].field]);

                                                // 筒体计算压力
                                                let CAAAPSC = CAAAPSD + CAAAPSS;

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CAAADSI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        caaa2d("ϕ" + CAAADSI);
                                                        caaad2.off("resize").on("resize", function () {
                                                            if ($("#caaa").length > 0) {
                                                                caaa2d("ϕ" + CAAADSI);
                                                            }
                                                        });
                                                    }
                                                    caaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                caaa2d("ϕ" + CAAADSI);
                                                                caaad2.off("resize").on("resize", function () {
                                                                    if ($("#caaa").length > 0) {
                                                                        caaa2d("ϕ" + CAAADSI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAAASThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAAASThkMax) {
                                                        let CAAATHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            caaa2d("ϕ" + CAAADSI, CAAATHKSN);
                                                            caaad2.off("resize").on("resize", function () {
                                                                if ($("#caaa").length > 0) {
                                                                    caaa2d("ϕ" + CAAADSI, CAAATHKSN);
                                                                }
                                                            });
                                                        }
                                                        caaad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    caaa2d("ϕ" + CAAADSI, CAAATHKSN);
                                                                    caaad2.off("resize").on("resize", function () {
                                                                        if ($("#caaa").length > 0) {
                                                                            caaa2d("ϕ" + CAAADSI, CAAATHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 筒体外直径
                                                        let CAAADSO = CAAADSI + 2 * CAAATHKSN;

                                                        // 筒体材料物性
                                                        let CAAASOT, CAAASO, CAAASOT1, CAAASREL, CAAACS1, CAAAEST;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CAAASCategoryVal,
                                                                "type": CAAASTypeVal,
                                                                "std": CAAASSTDVal,
                                                                "name": CAAASNameVal,
                                                                "thk": CAAATHKSN,
                                                                "temp": CAAADT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CAAADSO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CAAASOT = parseFloat(result.ot);
                                                                if (CAAASOT < 0) {
                                                                    south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CAAASO = parseFloat(result.o);
                                                                if (CAAASO < 0) {
                                                                    south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CAAASREL = parseFloat(result.rel);
                                                                if (CAAASREL < 0) {
                                                                    south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CAAACS1 = parseFloat(result.c1);
                                                                if (CAAACS1 < 0) {
                                                                    south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CAAAEST = 1000 * parseFloat(result.et);
                                                                if (CAAAEST < 0) {
                                                                    south.html("查询筒体材料弹性模量失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CAAASOT1 = parseFloat(result.ot1);

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < CAAATHKSN) {
                                                                    let CAAACS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体厚度附加量
                                                                    let CAAACS = CAAACS1 + CAAACS2;

                                                                    // 筒体有效厚度
                                                                    let CAAATHKSE = CAAATHKSN - CAAACS;

                                                                    // 蜂窝短管材料名称
                                                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                                        let CAAAPNameVal = rows[14][columns[0][1].field];

                                                                        // AJAX 获取蜂窝短管材料密度、最大最小厚度
                                                                        let CAAAPDensity, CAAAPThkMin, CAAAPThkMax;
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "web_get_gbt_150_2011_index.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                "category": CAAAPCategoryVal,
                                                                                "type": CAAAPTypeVal,
                                                                                "std": CAAAPSTDVal,
                                                                                "name": CAAAPNameVal,
                                                                                "temp": CAAADT
                                                                            }),
                                                                            beforeSend: function () {
                                                                            },
                                                                            success: function (result) {
                                                                                CAAAPDensity = parseFloat(result.density);
                                                                                CAAAPThkMin = parseFloat(result.thkMin);
                                                                                CAAAPThkMax = parseFloat(result.thkMax);

                                                                                // 轴向节距 tp
                                                                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                                    let CAAATP = parseFloat(rows[15][columns[0][1].field]);

                                                                                    // Sketch
                                                                                    if (currentTabIndex === 0) {
                                                                                        caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP);
                                                                                        caaad2.off("resize").on("resize", function () {
                                                                                            if ($("#caaa").length > 0) {
                                                                                                caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    caaad2d3.tabs({
                                                                                        onSelect: function (title, index) {
                                                                                            if (index === 0) {
                                                                                                caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP);
                                                                                                caaad2.off("resize").on("resize", function () {
                                                                                                    if ($("#caaa").length > 0) {
                                                                                                        caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    });

                                                                                    // 周向节距 tT
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let CAAATT = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // 有效节距
                                                                                        let CAAATO = Math.sqrt(CAAATP * CAAATT);

                                                                                        // 节距比
                                                                                        let CAAATPTT = CAAATP / CAAATT;

                                                                                        south.html("<span style='color:#444444;'>" +
                                                                                            "短管许用节距比：[0.8, 1.25]" +
                                                                                            "</span>");

                                                                                        // 节距比校核
                                                                                        let CAAATPTTCHK;
                                                                                        if (CAAATPTT >= 0.8 && CAAATPTT <= 1.25) {
                                                                                            CAAATPTTCHK = "合格";
                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际节距比：" + CAAATPTT.toFixed(2) +
                                                                                                "</span>");
                                                                                        } else {
                                                                                            CAAATPTTCHK = "不合格";
                                                                                            south.append("<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际节距比：" + CAAATPTT.toFixed(2) +
                                                                                                "</span>");
                                                                                        }

                                                                                        // 短管外直径
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) < Math.min(CAAATP, CAAATT)) {
                                                                                            let CAAADPO = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO);
                                                                                                caaad2.off("resize").on("resize", function () {
                                                                                                    if ($("#caaa").length > 0) {
                                                                                                        caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            caaad2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO);
                                                                                                        caaad2.off("resize").on("resize", function () {
                                                                                                            if ($("#caaa").length > 0) {
                                                                                                                caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            // 短管名义厚度
                                                                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                && parseFloat(rows[18][columns[0][1].field]) > CAAAPThkMin
                                                                                                && parseFloat(rows[18][columns[0][1].field]) <= Math.min(CAAAPThkMax, CAAADPO / 2)) {
                                                                                                let CAAATHKPN = parseFloat(rows[18][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN);
                                                                                                    caaad2.off("resize").on("resize", function () {
                                                                                                        if ($("#caaa").length > 0) {
                                                                                                            caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                caaad2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN);
                                                                                                            caaad2.off("resize").on("resize", function () {
                                                                                                                if ($("#caaa").length > 0) {
                                                                                                                    caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                // 短管内直径
                                                                                                let CAAADPI = CAAADPO - 2 * CAAATHKPN;

                                                                                                // 短管材料物性
                                                                                                let CAAAPOT, CAAAPO,
                                                                                                    CAAAPOT1, CAAAPREL,
                                                                                                    CAAACP1, CAAAEPT;
                                                                                                $.ajax({
                                                                                                    type: "POST",
                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                    url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                                    async: true,
                                                                                                    dataType: "json",
                                                                                                    data: JSON.stringify({
                                                                                                        "category": CAAAPCategoryVal,
                                                                                                        "type": CAAAPTypeVal,
                                                                                                        "std": CAAAPSTDVal,
                                                                                                        "name": CAAAPNameVal,
                                                                                                        "thk": CAAATHKPN,
                                                                                                        "temp": CAAADT,
                                                                                                        "highLow": 3,
                                                                                                        "isTube": 0,
                                                                                                        "od": CAAADPO
                                                                                                    }),
                                                                                                    beforeSend: function () {
                                                                                                    },
                                                                                                    success: function (result) {

                                                                                                        CAAAPOT = parseFloat(result.ot);
                                                                                                        if (CAAAPOT < 0) {
                                                                                                            south.html("查询短管材料设计温度许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }

                                                                                                        CAAAPO = parseFloat(result.o);
                                                                                                        if (CAAAPO < 0) {
                                                                                                            south.html("查询短管材料常温许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }

                                                                                                        CAAAPREL = parseFloat(result.rel);
                                                                                                        if (CAAAPREL < 0) {
                                                                                                            south.html("查询短管材料常温屈服强度失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }

                                                                                                        CAAACP1 = parseFloat(result.c1);
                                                                                                        if (CAAACP1 < 0) {
                                                                                                            south.html("查询短管材料厚度负偏差失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }

                                                                                                        CAAAEPT = 1000 * parseFloat(result.et);
                                                                                                        if (CAAAEPT < 0) {
                                                                                                            south.html("查询短管材料弹性模量失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }

                                                                                                        CAAAPOT1 = parseFloat(result.ot1);

                                                                                                        // 短管腐蚀裕量
                                                                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                            && parseFloat(rows[19][columns[0][1].field]) < CAAATHKPN) {
                                                                                                            let CAAACP2 = parseFloat(rows[19][columns[0][1].field]);

                                                                                                            // 短管厚度附加量
                                                                                                            let CAAACP = CAAACP1 + CAAACP2;

                                                                                                            // 短管有效厚度
                                                                                                            let CAAATHKPE = CAAATHKPN - CAAACP;

                                                                                                            // 角焊缝腰高
                                                                                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                                                                                let CAAAA = parseFloat(rows[20][columns[0][1].field]);

                                                                                                                // 夹套材料名称
                                                                                                                if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                                                                    let CAAAJNameVal = rows[24][columns[0][1].field];

                                                                                                                    // AJAX 获取夹套材料密度、最大最小厚度
                                                                                                                    let CAAAJDensity,
                                                                                                                        CAAAJThkMin,
                                                                                                                        CAAAJThkMax;
                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "web_get_gbt_150_2011_index.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "category": CAAAJCategoryVal,
                                                                                                                            "type": CAAAJTypeVal,
                                                                                                                            "std": CAAAJSTDVal,
                                                                                                                            "name": CAAAJNameVal,
                                                                                                                            "temp": CAAADT
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {
                                                                                                                            CAAAJDensity = parseFloat(result.density);
                                                                                                                            CAAAJThkMin = parseFloat(result.thkMin);
                                                                                                                            CAAAJThkMax = parseFloat(result.thkMax);

                                                                                                                            // 夹套设计压力
                                                                                                                            if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                                                                                                let CAAAPJD = parseFloat(rows[25][columns[0][1].field]);

                                                                                                                                // 夹套静压力
                                                                                                                                if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                                                                                    let CAAAPJS = parseFloat(rows[26][columns[0][1].field]);

                                                                                                                                    // 夹套计算压力
                                                                                                                                    let CAAAPJC = CAAAPJD + CAAAPJS;

                                                                                                                                    // 夹套腔体厚度 e
                                                                                                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                                                                                        let CAAAE = parseFloat(rows[27][columns[0][1].field]);

                                                                                                                                        // Sketch
                                                                                                                                        if (currentTabIndex === 0) {
                                                                                                                                            caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE);
                                                                                                                                            caaad2.off("resize").on("resize", function () {
                                                                                                                                                if ($("#caaa").length > 0) {
                                                                                                                                                    caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE);
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        }
                                                                                                                                        caaad2d3.tabs({
                                                                                                                                            onSelect: function (title, index) {
                                                                                                                                                if (index === 0) {
                                                                                                                                                    caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE);
                                                                                                                                                    caaad2.off("resize").on("resize", function () {
                                                                                                                                                        if ($("#caaa").length > 0) {
                                                                                                                                                            caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE);
                                                                                                                                                        }
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        });

                                                                                                                                        // 短管最小内直径
                                                                                                                                        let CAAADMIN;
                                                                                                                                        if (CAAAE === 25) {
                                                                                                                                            CAAADMIN = 40;
                                                                                                                                        } else if (CAAAE === 50) {
                                                                                                                                            CAAADMIN = 50;
                                                                                                                                        } else {
                                                                                                                                            CAAADMIN = 80;
                                                                                                                                        }

                                                                                                                                        // 短管最小内直径
                                                                                                                                        south.append("<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "短管最小内直径：" + CAAADMIN.toFixed(2) + " mm" +
                                                                                                                                            "</span>");

                                                                                                                                        // 短管内直径校核
                                                                                                                                        let CAAADPICHK;
                                                                                                                                        if (CAAADPI >= CAAADMIN) {
                                                                                                                                            CAAADPICHK = "合格";
                                                                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际内直径：" + CAAADPI.toFixed(2) +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            CAAADPICHK = "不合格";
                                                                                                                                            south.append("<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际内直径：" + CAAADPI.toFixed(2) +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // 夹套名义厚度
                                                                                                                                        if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                                                                            && parseFloat(rows[28][columns[0][1].field]) > CAAAJThkMin
                                                                                                                                            && parseFloat(rows[28][columns[0][1].field]) <= CAAAJThkMax) {
                                                                                                                                            let CAAATHKJN = parseFloat(rows[28][columns[0][1].field]);

                                                                                                                                            // Sketch
                                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                                caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE, CAAATHKJN);
                                                                                                                                                caaad2.off("resize").on("resize", function () {
                                                                                                                                                    if ($("#caaa").length > 0) {
                                                                                                                                                        caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE, CAAATHKJN);
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }
                                                                                                                                            caaad2d3.tabs({
                                                                                                                                                onSelect: function (title, index) {
                                                                                                                                                    if (index === 0) {
                                                                                                                                                        caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE, CAAATHKJN);
                                                                                                                                                        caaad2.off("resize").on("resize", function () {
                                                                                                                                                            if ($("#caaa").length > 0) {
                                                                                                                                                                caaa2d("ϕ" + CAAADSI, CAAATHKSN, CAAATP, "ϕ" + CAAADPO, CAAATHKPN, CAAAE, CAAATHKJN);
                                                                                                                                                            }
                                                                                                                                                        });
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            });

                                                                                                                                            // 夹套内直径
                                                                                                                                            let CAAADJI = CAAADSO + 2 * CAAAE;

                                                                                                                                            // 夹套外直径
                                                                                                                                            let CAAADJO = CAAADSO + 2 * CAAAE + 2 * CAAATHKJN;

                                                                                                                                            // 夹套材料物性
                                                                                                                                            let CAAAJOT,
                                                                                                                                                CAAAJO,
                                                                                                                                                CAAAJOT1,
                                                                                                                                                CAAAJREL,
                                                                                                                                                CAAACJ1,
                                                                                                                                                CAAAEJT;
                                                                                                                                            $.ajax({
                                                                                                                                                type: "POST",
                                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                                url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                                                                                async: true,
                                                                                                                                                dataType: "json",
                                                                                                                                                data: JSON.stringify({
                                                                                                                                                    "category": CAAAJCategoryVal,
                                                                                                                                                    "type": CAAAJTypeVal,
                                                                                                                                                    "std": CAAAJSTDVal,
                                                                                                                                                    "name": CAAAJNameVal,
                                                                                                                                                    "thk": CAAATHKJN,
                                                                                                                                                    "temp": CAAADT,
                                                                                                                                                    "highLow": 3,
                                                                                                                                                    "isTube": 0,
                                                                                                                                                    "od": CAAADJO
                                                                                                                                                }),
                                                                                                                                                beforeSend: function () {
                                                                                                                                                },
                                                                                                                                                success: function (result) {

                                                                                                                                                    CAAAJOT = parseFloat(result.ot);
                                                                                                                                                    if (CAAAJOT < 0) {
                                                                                                                                                        south.html("查询夹套材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                                        return false;
                                                                                                                                                    }

                                                                                                                                                    CAAAJO = parseFloat(result.o);
                                                                                                                                                    if (CAAAJO < 0) {
                                                                                                                                                        south.html("查询夹套材料常温许用应力失败！").css("color", "red");
                                                                                                                                                        return false;
                                                                                                                                                    }

                                                                                                                                                    CAAAJREL = parseFloat(result.rel);
                                                                                                                                                    if (CAAAJREL < 0) {
                                                                                                                                                        south.html("查询夹套材料常温屈服强度失败！").css("color", "red");
                                                                                                                                                        return false;
                                                                                                                                                    }

                                                                                                                                                    CAAACJ1 = parseFloat(result.c1);
                                                                                                                                                    if (CAAACJ1 < 0) {
                                                                                                                                                        south.html("查询夹套材料厚度负偏差失败！").css("color", "red");
                                                                                                                                                        return false;
                                                                                                                                                    }

                                                                                                                                                    CAAAEJT = 1000 * parseFloat(result.et);
                                                                                                                                                    if (CAAAEJT < 0) {
                                                                                                                                                        south.html("查询夹套材料弹性模量失败！").css("color", "red");
                                                                                                                                                        return false;
                                                                                                                                                    }

                                                                                                                                                    CAAAJOT1 = parseFloat(result.ot1);

                                                                                                                                                    // 夹套腐蚀裕量
                                                                                                                                                    if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                                                                                                        && parseFloat(rows[29][columns[0][1].field]) < CAAATHKJN) {
                                                                                                                                                        let CAAACJ2 = parseFloat(rows[29][columns[0][1].field]);

                                                                                                                                                        // 夹套厚度附加量
                                                                                                                                                        let CAAACJ = CAAACJ1 + CAAACJ2;

                                                                                                                                                        // 夹套有效厚度
                                                                                                                                                        let CAAATHKJE = CAAATHKJN - CAAACJ;

                                                                                                                                                        // 夹套计算长度 l
                                                                                                                                                        if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                                                                                                            let CAAAL = parseFloat(rows[30][columns[0][1].field]);

                                                                                                                                                            // 短管许用圆心角
                                                                                                                                                            let CAAATHKTALLOW = 30 * Math.min(1, 4 * Math.sqrt(CAAAL / CAAADSI) * Math.pow(CAAATHKSE / CAAADSI, 1 / 4));
                                                                                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "许用周向圆心角：" + CAAATHKTALLOW.toFixed(2) + "°" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 短管实际周向圆心角
                                                                                                                                                            let CAAATHKT = 2 * CAAATT / (Math.PI * (CAAADSI + CAAADJI)) * 360;

                                                                                                                                                            // 短管圆心角校核
                                                                                                                                                            let CAAATHKTCHK;
                                                                                                                                                            if (CAAATHKT <= CAAATHKTALLOW) {
                                                                                                                                                                CAAATHKTCHK = "合格";
                                                                                                                                                                south.append("<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际周向圆心角：" + CAAATHKT.toFixed(2) + "°" +
                                                                                                                                                                    "</span>");
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                CAAATHKTCHK = "不合格";
                                                                                                                                                                south.append("<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际周向圆心角：" + CAAATHKT.toFixed(2) + "°" +
                                                                                                                                                                    "</span>");
                                                                                                                                                            }

                                                                                                                                                            // 夹套内最大允许工作压力
                                                                                                                                                            let CAAAF1 = Math.PI / 2 * (1 + 1.3 * (1.8 + 2.3 * CAAADPO / CAAATO) / (Math.log(CAAATO / CAAADPO)));
                                                                                                                                                            let CAAAPS2 = CAAASOT * CAAATHKSE * CAAATHKSE / (CAAATP * CAAATT) * CAAAF1 * (1 - Math.pow((CAAAPSC - CAAADSI) / (2 * CAAASOT * CAAATHKSE), 2));
                                                                                                                                                            let CAAAM = Math.min(1, CAAAA / CAAATHKJN * CAAAA / CAAATHKJN, CAAATHKPN / CAAATHKJN * CAAATHKPN / CAAATHKJN);
                                                                                                                                                            let CAAAF2 = Math.PI / 2 * (1 + 1.3 * (1.3 + CAAAM / 2 + (1 + 1.3 * CAAAM) * CAAADPO / CAAATO) / (Math.log(CAAATO / CAAADPO)));
                                                                                                                                                            let CAAAPJ2 = CAAAJOT * CAAATHKJE * CAAATHKJE / CAAATP / CAAATT * CAAAF2;
                                                                                                                                                            let CAAAPMAWP = Math.min(CAAAPS2, CAAAPJ2) - CAAAPJS;
                                                                                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "夹套内最大允许工作压力：" + CAAAPMAWP.toFixed(4) + " MPa" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 夹套内压校核
                                                                                                                                                            let CAAAPJDCHK;
                                                                                                                                                            if (CAAAPJD <= CAAAPMAWP) {
                                                                                                                                                                CAAAPJDCHK = "合格";
                                                                                                                                                                south.append("<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "夹套内设计压力：" + CAAAPJD.toFixed(4) + " MPa" +
                                                                                                                                                                    "</span>");
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                CAAAPJDCHK = "不合格";
                                                                                                                                                                south.append("<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "夹套内设计压力：" + CAAAPJD.toFixed(4) + " MPa" +
                                                                                                                                                                    "</span>");
                                                                                                                                                            }

                                                                                                                                                            // 计算节距 T1
                                                                                                                                                            let CAAAT1 = CAAATHKSE * Math.sqrt(CAAASOT / CAAAPJC * CAAAF1 * (1 - Math.pow((CAAAPSC - CAAADSI) / (2 * CAAASOT * CAAATHKSE), 2)));

                                                                                                                                                            // 计算节距 T2
                                                                                                                                                            let CAAAT2 = CAAATHKJE * Math.sqrt(CAAAJOT / CAAAPJC * CAAAF2);

                                                                                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "蜂窝短管许用最小计算节距：" + Math.min(CAAAT1, CAAAT2).toFixed(4) + " mm" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 节距校核
                                                                                                                                                            let CAAATOCHK;
                                                                                                                                                            if (CAAATO <= Math.min(CAAAT1, CAAAT2).toFixed(4)) {
                                                                                                                                                                CAAATOCHK = "合格";
                                                                                                                                                                south.append("<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际计算节距：" + CAAATO.toFixed(4) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                CAAATOCHK = "不合格";
                                                                                                                                                                south.append("<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际计算节距：" + CAAATO.toFixed(4) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                            }

                                                                                                                                                            // 容器筒体厚度
                                                                                                                                                            let CAAATHKSC = CAAATO * Math.sqrt(CAAAPJC / CAAASOT / CAAAF1 + Math.pow(CAAAPSC * CAAADSI / (2 * CAAASOT * CAAATO), 2));
                                                                                                                                                            let CAAATHKSD = CAAATHKSC + CAAACS2;

                                                                                                                                                            // 所需厚度提示信息
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "容器筒体所需厚度：" + (CAAATHKSD + CAAACS1).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 容器筒体厚度校核
                                                                                                                                                            let CAAATHKSCHK;
                                                                                                                                                            if (CAAATHKSN >= (CAAATHKSD + CAAACS1).toFixed(2)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + CAAATHKSN + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAATHKSCHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + CAAATHKSN + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAATHKSCHK = "不合格";
                                                                                                                                                            }

                                                                                                                                                            // 夹套厚度
                                                                                                                                                            let CAAATHKJC = CAAATO * Math.sqrt(CAAAPJC / CAAAJOT / CAAAF2);
                                                                                                                                                            let CAAATHKJD = CAAATHKJC + CAAACJ2;

                                                                                                                                                            // 所需厚度提示信息
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "夹套所需厚度：" + (CAAATHKJD + CAAACJ1).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 夹套厚度校核
                                                                                                                                                            let CAAATHKJCHK;
                                                                                                                                                            if (CAAATHKJN >= (CAAATHKJD + CAAACJ1).toFixed(2)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + CAAATHKJN + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAATHKJCHK = "合格";
                                                                                                                                                            } else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + CAAATHKJN + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAATHKJCHK = "不合格";
                                                                                                                                                            }

                                                                                                                                                            // 短管厚度
                                                                                                                                                            let CAAAU = 1 - Math.PI / 4 * (CAAADPO / CAAATO) * (CAAADPO / CAAATO);
                                                                                                                                                            let CAAATHKPC = (CAAAPJC * CAAATP * CAAATT * CAAAU) / (Math.PI * CAAADPI * Math.min(CAAASOT, CAAAPOT, CAAAJOT));
                                                                                                                                                            let CAAATHKPD = CAAATHKPC + CAAACP2;

                                                                                                                                                            // 所需厚度提示信息
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "短管所需厚度：" + (CAAATHKPD + CAAACP1).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 短管厚度校核
                                                                                                                                                            let CAAATHKPCHK;
                                                                                                                                                            if (CAAATHKPN >= (CAAATHKPD + CAAACP1).toFixed(2)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + CAAATHKPN + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAATHKPCHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + CAAATHKPN + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAATHKPCHK = "不合格";
                                                                                                                                                            }

                                                                                                                                                            // 夹套边缘距离计算
                                                                                                                                                            let CAAATLALLOW = CAAATP * Math.min(1, 0.5 + Math.sqrt(CAAATT / CAAATP / CAAAF2));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "夹套边缘至第一排蜂窝短管中心线的最大轴向距离：" + CAAATLALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");

                                                                                                                                                            let CAAATKALLOW = CAAATT * Math.min(1, 0.5 + Math.sqrt(CAAATP / CAAATT / CAAAF2));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "夹套边缘至第一排蜂窝短管中心线的最大周向距离：" + CAAATKALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 角焊缝校核
                                                                                                                                                            let CAAAAALLOW = Math.max(1.41 * CAAATHKPC, 0.7 * Math.min(CAAATHKPN, CAAATHKJN));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "蜂窝短管与容器/夹套连接处角焊缝最小腰高：" + CAAAAALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            // 焊缝腰高校核
                                                                                                                                                            let CAAAACHK;
                                                                                                                                                            if (CAAAA >= CAAAAALLOW.toFixed(2)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际腰高：" + CAAAA + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAAACHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际腰高：" + CAAAA + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                CAAAACHK = "不合格";
                                                                                                                                                            }

                                                                                                                                                            // 试验压力
                                                                                                                                                            let CAAAZETA,
                                                                                                                                                                CAAAPJT;
                                                                                                                                                            if (CAAATest === "液压试验") {
                                                                                                                                                                CAAAZETA = 1.25;
                                                                                                                                                                CAAAPJT = CAAAZETA * CAAAPJD * Math.min(CAAASO / Math.max(CAAASOT, CAAASOT1), CAAAJO / Math.max(CAAAJOT, CAAAJOT1), CAAAPO / Math.max(CAAAPOT, CAAAPOT1));
                                                                                                                                                            }
                                                                                                                                                            else if (CAAATest === "气压试验") {
                                                                                                                                                                CAAAZETA = 1.10;
                                                                                                                                                                CAAAPJT = CAAAZETA * CAAAPJD * Math.min(CAAASO / Math.max(CAAASOT, CAAASOT1), CAAAJO / Math.max(CAAAJOT, CAAAJOT1), CAAAPO / Math.max(CAAAPOT, CAAAPOT1));
                                                                                                                                                            }
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "夹套试验压力：" + CAAAPJT.toFixed(4) + " MPa" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // 内筒体失稳校核
                                                                                                                                                            let CAAATHKSEDSI = -1;
                                                                                                                                                            let CAAATHKSEDSIALLOW = -1;
                                                                                                                                                            let CAAATHKSEDSICHK = "/";
                                                                                                                                                            if (CAAAPSD < 0) {
                                                                                                                                                                CAAATHKSEDSI = CAAATHKSE / CAAADSI;
                                                                                                                                                                CAAATHKSEDSIALLOW = Math.pow(4.5 * Math.abs(CAAAPSC) / CAAAEST * (CAAATHKT / 360) * (CAAATHKT / 360), 1 / 3);

                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "内筒体失稳临界厚径比：" + CAAATHKSEDSIALLOW.toFixed(4) +
                                                                                                                                                                    "</span>");

                                                                                                                                                                // 厚径比校核
                                                                                                                                                                if (CAAATHKSEDSI >= CAAATHKSEDSIALLOW.toFixed(4)) {
                                                                                                                                                                    south.append(
                                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                                        "实际厚径比：" + CAAATHKSEDSI.toFixed(4) +
                                                                                                                                                                        "</span>");
                                                                                                                                                                    CAAATHKSEDSICHK = "合格";
                                                                                                                                                                } else {
                                                                                                                                                                    south.append(
                                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                                        "实际厚径比：" + CAAATHKSEDSI.toFixed(4) +
                                                                                                                                                                        "</span>");
                                                                                                                                                                    CAAATHKSEDSICHK = "不合格";
                                                                                                                                                                }
                                                                                                                                                            }

                                                                                                                                                            // docx
                                                                                                                                                            let CAAAPayJS = $('#payjs');

                                                                                                                                                            function getDocx() {
                                                                                                                                                                $.ajax({
                                                                                                                                                                    type: "POST",
                                                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                                                    url: "caaadocx.action",
                                                                                                                                                                    async: true,
                                                                                                                                                                    dataType: "json",
                                                                                                                                                                    data: JSON.stringify({
                                                                                                                                                                        ribbonName: "CAAA",

                                                                                                                                                                        t: CAAADT,
                                                                                                                                                                        sstd: CAAASSTDVal,
                                                                                                                                                                        sname: CAAASNameVal,
                                                                                                                                                                        psd: CAAAPSD,
                                                                                                                                                                        pss: CAAAPSS,
                                                                                                                                                                        dsi: CAAADSI,
                                                                                                                                                                        thksn: CAAATHKSN,
                                                                                                                                                                        cs2: CAAACS2,

                                                                                                                                                                        pstd: CAAAPSTDVal,
                                                                                                                                                                        pname: CAAAPNameVal,
                                                                                                                                                                        tp: CAAATP,
                                                                                                                                                                        tt: CAAATT,
                                                                                                                                                                        dpo: CAAADPO,
                                                                                                                                                                        thkpn: CAAATHKPN,
                                                                                                                                                                        a: CAAAA,
                                                                                                                                                                        cp2: CAAACP2,

                                                                                                                                                                        jstd: CAAAJSTDVal,
                                                                                                                                                                        jname: CAAAJNameVal,
                                                                                                                                                                        pjd: CAAAPJD,
                                                                                                                                                                        pjs: CAAAPJS,
                                                                                                                                                                        e: CAAAE,
                                                                                                                                                                        l: CAAAL,
                                                                                                                                                                        thkjn: CAAATHKJN,
                                                                                                                                                                        cj2: CAAACJ2,

                                                                                                                                                                        test: CAAATest,

                                                                                                                                                                        densitys: CAAASDensity,
                                                                                                                                                                        ost: CAAASOT.toFixed(4),
                                                                                                                                                                        os: CAAASO.toFixed(4),
                                                                                                                                                                        ost1: CAAASOT1.toFixed(4),
                                                                                                                                                                        rsel: CAAASREL.toFixed(4),
                                                                                                                                                                        est: (CAAAEST / 1000).toFixed(4),
                                                                                                                                                                        cs1: CAAACS1.toFixed(4),

                                                                                                                                                                        densityj: CAAAJDensity,
                                                                                                                                                                        ojt: CAAAJOT.toFixed(4),
                                                                                                                                                                        oj: CAAAJO.toFixed(4),
                                                                                                                                                                        ojt1: CAAAJOT1.toFixed(4),
                                                                                                                                                                        rjel: CAAAJREL.toFixed(4),
                                                                                                                                                                        ejt: (CAAAEJT / 1000).toFixed(4),
                                                                                                                                                                        cj1: CAAACJ1.toFixed(4),

                                                                                                                                                                        densityp: CAAAPDensity,
                                                                                                                                                                        opt1: CAAAPOT1.toFixed(4),
                                                                                                                                                                        opt: CAAAPOT.toFixed(4),
                                                                                                                                                                        rpel: CAAAPREL.toFixed(4),
                                                                                                                                                                        op: CAAAPO.toFixed(4),
                                                                                                                                                                        ept: (CAAAEPT / 1000).toFixed(4),
                                                                                                                                                                        cp1: CAAACP1.toFixed(4),

                                                                                                                                                                        cs: CAAACS.toFixed(4),
                                                                                                                                                                        thkse: CAAATHKSE.toFixed(4),
                                                                                                                                                                        psc: CAAAPSC,

                                                                                                                                                                        dji: CAAADJI,
                                                                                                                                                                        cj: CAAACJ.toFixed(4),
                                                                                                                                                                        thkje: CAAATHKJE,
                                                                                                                                                                        pjc: CAAAPJC,

                                                                                                                                                                        dpi: CAAADPI,
                                                                                                                                                                        cp: CAAACP,
                                                                                                                                                                        thkpe: CAAATHKPE,
                                                                                                                                                                        to: CAAATO.toFixed(4),

                                                                                                                                                                        thkt: CAAATHKT.toFixed(4),
                                                                                                                                                                        thktallow: CAAATHKTALLOW.toFixed(4),
                                                                                                                                                                        thktchk: CAAATHKTCHK,
                                                                                                                                                                        tptt: CAAATPTT.toFixed(4),
                                                                                                                                                                        tpttchk: CAAATPTTCHK,
                                                                                                                                                                        dmin: CAAADMIN.toFixed(4),
                                                                                                                                                                        dminchk: CAAADPICHK,

                                                                                                                                                                        f1: CAAAF1.toFixed(4),
                                                                                                                                                                        ps2: CAAAPS2.toFixed(4),
                                                                                                                                                                        m: CAAAM.toFixed(4),
                                                                                                                                                                        f2: CAAAF2.toFixed(4),
                                                                                                                                                                        pj2: CAAAPJ2.toFixed(4),
                                                                                                                                                                        pmawp: CAAAPMAWP.toFixed(4),
                                                                                                                                                                        pmawpchk: CAAAPJDCHK,

                                                                                                                                                                        t1: CAAAT1.toFixed(4),
                                                                                                                                                                        t2: CAAAT2.toFixed(4),
                                                                                                                                                                        tochk: CAAATOCHK,

                                                                                                                                                                        thksc: CAAATHKSC.toFixed(4),
                                                                                                                                                                        thksd: CAAATHKSD.toFixed(4),
                                                                                                                                                                        thkschk: CAAATHKSCHK,

                                                                                                                                                                        thksedsi: CAAATHKSEDSI.toFixed(4),
                                                                                                                                                                        thksedsiallow: CAAATHKSEDSIALLOW.toFixed(4),
                                                                                                                                                                        thksedsichk: CAAATHKSEDSICHK,

                                                                                                                                                                        thkjc: CAAATHKJC.toFixed(4),
                                                                                                                                                                        thkjd: CAAATHKJD.toFixed(4),
                                                                                                                                                                        thkjchk: CAAATHKJCHK,

                                                                                                                                                                        tl: CAAATLALLOW.toFixed(4),
                                                                                                                                                                        tk: CAAATKALLOW.toFixed(4),

                                                                                                                                                                        eta: CAAAU.toFixed(4),
                                                                                                                                                                        thkpc: CAAATHKPC.toFixed(4),
                                                                                                                                                                        thkpd: CAAATHKPD.toFixed(4),
                                                                                                                                                                        thkpchk: CAAATHKPCHK,
                                                                                                                                                                        aallow: CAAAAALLOW.toFixed(4),
                                                                                                                                                                        achk: CAAAACHK,

                                                                                                                                                                        zeta: CAAAZETA.toFixed(4),
                                                                                                                                                                        pjt: CAAAPJT.toFixed(4),
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
                                                                                                                                                                            let query = null,
                                                                                                                                                                                status;
                                                                                                                                                                            CAAAPayJS.dialog({
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
                                                                                                                                                                                        CAAAPayJS.dialog("close");
                                                                                                                                                                                        CAAAPayJS.dialog("clear");
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
                                                                                                                                                                                                    CAAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                                            CAAAPayJS.dialog('close');
                                                                                                                                                                                                            CAAAPayJS.dialog('clear');
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
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                    else if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                                                                                                        && parseFloat(rows[29][columns[0][1].field]) >= CAAATHKJN) {
                                                                                                                                                        south.html("夹套腐蚀裕量不能大于等于 " + CAAATHKJN + " mm").css("color", "red");
                                                                                                                                                    }
                                                                                                                                                },
                                                                                                                                                error: function () {
                                                                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                                                }
                                                                                                                                            });

                                                                                                                                        }
                                                                                                                                        else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                                                                            && parseFloat(rows[28][columns[0][1].field]) <= CAAAJThkMin) {
                                                                                                                                            south.html("夹套名义厚度不能小于等于 " + CAAAJThkMin + " mm").css("color", "red");
                                                                                                                                        }
                                                                                                                                        else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                                                                                                            && parseFloat(rows[28][columns[0][1].field]) > CAAAJThkMax) {
                                                                                                                                            south.html("夹套名义厚度不能大于 " + CAAAJThkMax + " mm").css("color", "red");
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        },
                                                                                                                        error: function () {
                                                                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                            && parseFloat(rows[19][columns[0][1].field]) >= CAAATHKPN) {
                                                                                                            south.html("短管腐蚀裕量不能大于等于 " + CAAATHKPN + " mm").css("color", "red");
                                                                                                        }
                                                                                                    },
                                                                                                    error: function () {
                                                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                && parseFloat(rows[18][columns[0][1].field]) <= CAAAPThkMin) {
                                                                                                south.html("短管名义厚度不能小于等于 " + CAAAPThkMin + " mm").css("color", "red");
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                && parseFloat(rows[18][columns[0][1].field]) > Math.min(CAAAPThkMax, CAAADPO / 2)) {
                                                                                                south.html("短管名义厚度不能大于 " + Math.min(CAAAPThkMax, CAAADPO / 2) + " mm").css("color", "red");
                                                                                            }
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) >= Math.min(CAAATP, CAAATT)) {
                                                                                            south.html("短管外直径 dpo 不能大于等于 " + Math.min(CAAATP, CAAATT) + " mm").css("color", "red");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                            error: function () {
                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                            }
                                                                        });

                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= CAAATHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + CAAATHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });

                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAAASThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + CAAASThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAAASThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + CAAASThkMax + " mm").css("color", "red");
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                    }
                                });
                            }
                        }
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});