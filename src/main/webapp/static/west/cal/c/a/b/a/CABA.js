$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cabad2 = $("#d2");
    let cabad3 = $("#d3");
    let cabad2d3 = $('#d2d3');

    $("#cal").html("<table id='caba'></table>");
    let pg = $("#caba");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/b/a/CABA.json", function (result) {

        let CABADT;
        let CABASCategory, CABASCategoryVal, CABASType, CABASTypeVal, CABASSTD, CABASSTDVal, CABASName,
            CABAJCategory, CABAJCategoryVal, CABAJType, CABAJTypeVal, CABAJSTD, CABAJSTDVal, CABAJName;
        let columns, rows, ed;

        // 2D Sketch
        function caba2d(dsi = "ϕDsi", thksn = "δsn", tp = "tp", dpo = "ϕdpo", e = "e", thkjn = "δjn") {

            cabad2.empty();

            let width = cabad2.width();
            let height = cabad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CABASVG")
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
            let CABAL = height - 2 * padding;
            let CABADSI = Math.min(CABAL / 2, width - 2 * padding - 4 * thickness - 100);

            // 内筒及端部体轮廓
            drawLine(width / 2 - CABADSI / 2, height / 2 - CABAL / 2, width / 2 - CABADSI / 2, height / 2 + CABAL / 2);
            drawLine(width / 2 + CABADSI / 2, height / 2 - CABAL / 2, width / 2 + CABADSI / 2, height / 2 + CABAL / 2);
            drawLine(width / 2 - CABADSI / 2 - thickness, height / 2 - CABAL / 2, width / 2 - CABADSI / 2 - thickness, height / 2 + CABAL / 2);
            drawLine(width / 2 + CABADSI / 2 + thickness, height / 2 - CABAL / 2, width / 2 + CABADSI / 2 + thickness, height / 2 + CABAL / 2);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABAL / 2, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABAL / 2);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABAL / 2, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABAL / 2);

            // 轴向间距
            let CABATP = CABAL / 5;

            // 短管直径
            let CABARPO = CABATP / 4;
            let CABARPI = CABARPO - 5;

            // 外筒体
            // 左侧内壁
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - CABARPO, width / 2 - CABADSI / 2 - thickness - 30, height / 2 - CABATP + CABARPO);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - CABATP - CABARPO, width / 2 - CABADSI / 2 - thickness - 30, height / 2 - 2 * CABATP + CABARPO);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - 2 * CABATP - CABARPO, width / 2 - CABADSI / 2 - thickness - 30, height / 2 - CABAL / 2);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABARPO, width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABATP - CABARPO);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABATP + CABARPO, width / 2 - CABADSI / 2 - thickness - 30, height / 2 + 2 * CABATP - CABARPO);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + 2 * CABATP + CABARPO, width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABAL / 2);

            // 左侧外壁
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABARPO + 5, width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABATP + CABARPO - 5);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABATP - CABARPO + 5, width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - 2 * CABATP + CABARPO - 5);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - 2 * CABATP - CABARPO + 5, width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABAL / 2);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABARPO - 5, width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABATP - CABARPO + 5);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABATP + CABARPO - 5, width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + 2 * CABATP - CABARPO + 5);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + 2 * CABATP + CABARPO - 5, width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABAL / 2);

            // 右侧内壁
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - CABARPO, width / 2 + CABADSI / 2 + thickness + 30, height / 2 - CABATP + CABARPO);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - CABATP - CABARPO, width / 2 + CABADSI / 2 + thickness + 30, height / 2 - 2 * CABATP + CABARPO);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - 2 * CABATP - CABARPO, width / 2 + CABADSI / 2 + thickness + 30, height / 2 - CABAL / 2);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABARPO, width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABATP - CABARPO);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABATP + CABARPO, width / 2 + CABADSI / 2 + thickness + 30, height / 2 + 2 * CABATP - CABARPO);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + 2 * CABATP + CABARPO, width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABAL / 2);

            // 右侧外壁
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABARPO + 5, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABATP + CABARPO - 5);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABATP - CABARPO + 5, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - 2 * CABATP + CABARPO - 5);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - 2 * CABATP - CABARPO + 5, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABAL / 2);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABARPO - 5, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABATP - CABARPO + 5);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABATP + CABARPO - 5, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + 2 * CABATP - CABARPO + 5);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + 2 * CABATP + CABARPO - 5, width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABAL / 2);

            drawCenterLine(width / 2, padding - 10, width / 2, height - padding + 10);

            // 左侧短管
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 - CABARPO + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 - CABARPI + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 + CABARPI - 10);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 + CABARPO - 10);
            drawCenterLine(width / 2 - CABADSI / 2 - 2 * thickness - 30 - 10, height / 2, width / 2 - CABADSI / 2 + 10, height / 2);

            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABATP - CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 + CABATP - CABARPO + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABATP - CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 + CABATP - CABARPI + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABATP + CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 + CABATP + CABARPI - 10);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABATP + CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 + CABATP + CABARPO - 10);
            drawCenterLine(width / 2 - CABADSI / 2 - 2 * thickness - 30 - 10, height / 2 + CABATP, width / 2 - CABADSI / 2 + 10, height / 2 + CABATP);

            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - CABATP - CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 - CABATP - CABARPO + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABATP - CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 - CABATP - CABARPI + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - CABATP + CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 - CABATP + CABARPI - 10);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - CABATP + CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 - CABATP + CABARPO - 10);
            drawCenterLine(width / 2 - CABADSI / 2 - 2 * thickness - 30 - 10, height / 2 - CABATP, width / 2 - CABADSI / 2 + 10, height / 2 - CABATP);

            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + 2 * CABATP - CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 + 2 * CABATP - CABARPO + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + 2 * CABATP - CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 + 2 * CABATP - CABARPI + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + 2 * CABATP + CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 + 2 * CABATP + CABARPI - 10);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + 2 * CABATP + CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 + 2 * CABATP + CABARPO - 10);
            drawCenterLine(width / 2 - CABADSI / 2 - 2 * thickness - 30 - 10, height / 2 + 2 * CABATP, width / 2 - CABADSI / 2 + 10, height / 2 + 2 * CABATP);

            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - 2 * CABATP - CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 - 2 * CABATP - CABARPO + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - 2 * CABATP - CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 - 2 * CABATP - CABARPI + 10);
            drawLine(width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 - 2 * CABATP + CABARPI, width / 2 - CABADSI / 2 - thickness, height / 2 - 2 * CABATP + CABARPI - 10);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 - 2 * CABATP + CABARPO, width / 2 - CABADSI / 2 - thickness, height / 2 - 2 * CABATP + CABARPO - 10);
            drawCenterLine(width / 2 - CABADSI / 2 - 2 * thickness - 30 - 10, height / 2 - 2 * CABATP, width / 2 - CABADSI / 2 + 10, height / 2 - 2 * CABATP);

            // 右侧短管
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 - CABARPO + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 - CABARPI + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 + CABARPI - 10);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 + CABARPO - 10);
            drawCenterLine(width / 2 + CABADSI / 2 + 2 * thickness + 30 + 3, height / 2, width / 2 + CABADSI / 2 - 3, height / 2);

            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABATP - CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 + CABATP - CABARPO + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABATP - CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 + CABATP - CABARPI + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + CABATP + CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 + CABATP + CABARPI - 10);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABATP + CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 + CABATP + CABARPO - 10);
            drawCenterLine(width / 2 + CABADSI / 2 + 2 * thickness + 30 + 10, height / 2 + CABATP, width / 2 + CABADSI / 2 - 10, height / 2 + CABATP);

            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - CABATP - CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 - CABATP - CABARPO + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABATP - CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 - CABATP - CABARPI + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - CABATP + CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 - CABATP + CABARPI - 10);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - CABATP + CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 - CABATP + CABARPO - 10);
            drawCenterLine(width / 2 + CABADSI / 2 + 2 * thickness + 30 + 10, height / 2 - CABATP, width / 2 + CABADSI / 2 - 10, height / 2 - CABATP);

            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + 2 * CABATP - CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 + 2 * CABATP - CABARPO + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + 2 * CABATP - CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 + 2 * CABATP - CABARPI + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 + 2 * CABATP + CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 + 2 * CABATP + CABARPI - 10);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 + 2 * CABATP + CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 + 2 * CABATP + CABARPO - 10);
            drawCenterLine(width / 2 + CABADSI / 2 + 2 * thickness + 30 + 10, height / 2 + 2 * CABATP, width / 2 + CABADSI / 2 - 10, height / 2 + 2 * CABATP);

            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - 2 * CABATP - CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 - 2 * CABATP - CABARPO + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - 2 * CABATP - CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 - 2 * CABATP - CABARPI + 10);
            drawLine(width / 2 + CABADSI / 2 + 2 * thickness + 30, height / 2 - 2 * CABATP + CABARPI, width / 2 + CABADSI / 2 + thickness, height / 2 - 2 * CABATP + CABARPI - 10);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30, height / 2 - 2 * CABATP + CABARPO, width / 2 + CABADSI / 2 + thickness, height / 2 - 2 * CABATP + CABARPO - 10);
            drawCenterLine(width / 2 + CABADSI / 2 + 2 * thickness + 30 + 10, height / 2 - 2 * CABATP, width / 2 + CABADSI / 2 - 10, height / 2 - 2 * CABATP);

            // 内筒体内直径
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CABADSI / 2, y: padding + CABATP},
                    {x: width / 2 - CABADSI / 2 + 15, y: padding + CABATP - 3},
                    {x: width / 2 - CABADSI / 2 + 15, y: padding + CABATP + 3},
                    {x: width / 2 - CABADSI / 2, y: padding + CABATP}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2, y: padding + CABATP},
                    {x: width / 2 + CABADSI / 2 - 15, y: padding + CABATP - 3},
                    {x: width / 2 + CABADSI / 2 - 15, y: padding + CABATP + 3},
                    {x: width / 2 + CABADSI / 2, y: padding + CABATP}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - CABADSI / 2 + 15, y: padding + CABATP},
                {x: width / 2 + CABADSI / 2 - 15, y: padding + CABATP}
            ]))
                .attr("id", "CABASketchDSI").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CABASketchDSI")
                .attr("startOffset", "30%").text(dsi);

            // 内筒体厚度
            drawLine(width / 2 - CABADSI / 2, padding + CABATP, width / 2 - CABADSI / 2 - thickness, padding + CABATP);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CABADSI / 2 - thickness, y: padding + CABATP},
                    {x: width / 2 - CABADSI / 2 - thickness - 15, y: padding + CABATP - 3},
                    {x: width / 2 - CABADSI / 2 - thickness - 15, y: padding + CABATP + 3},
                    {x: width / 2 - CABADSI / 2 - thickness, y: padding + CABATP}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - CABADSI / 2 - thickness - 15 - 70, y: padding + CABATP},
                {x: width / 2 - CABADSI / 2 - thickness - 15, y: padding + CABATP}
            ]))
                .attr("id", "CABASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CABASketchTHKSN")
                .attr("startOffset", "30%").text(thksn);

            // 垂直节距
            dimLeftV(width / 2 - CABADSI / 2 - 2 * thickness - 30 - 10, height / 2, width / 2 - CABADSI / 2 - 2 * thickness - 30 - 10, height / 2 - CABATP, tp, "CABASketchTP");

            // e
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + thickness, y: height / 2 + CABATP - CABARPO - 20},
                    {x: width / 2 + CABADSI / 2 + thickness - 15, y: height / 2 + CABATP - CABARPO - 17},
                    {x: width / 2 + CABADSI / 2 + thickness - 15, y: height / 2 + CABATP - CABARPO - 23},
                    {x: width / 2 + CABADSI / 2 + thickness, y: height / 2 + CABATP - CABARPO - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + thickness + 30, y: height / 2 + CABATP - CABARPO - 20},
                    {x: width / 2 + CABADSI / 2 + thickness + 30 + 15, y: height / 2 + CABATP - CABARPO - 17},
                    {x: width / 2 + CABADSI / 2 + thickness + 30 + 15, y: height / 2 + CABATP - CABARPO - 23},
                    {x: width / 2 + CABADSI / 2 + thickness + 30, y: height / 2 + CABATP - CABARPO - 20}
                ]));
            drawLine(width / 2 + CABADSI / 2 + thickness, height / 2 + CABATP - CABARPO - 20, width / 2 + CABADSI / 2 + thickness + 30, height / 2 + CABATP - CABARPO - 20);
            drawLine(width / 2 + CABADSI / 2 + thickness + 30 + 30, height / 2 + CABATP - CABARPO - 20, width / 2 + CABADSI / 2 + thickness + 30 + 15, height / 2 + CABATP - CABARPO - 20);
            svg.append("path").attr("d", line([
                {x: width / 2 + CABADSI / 2 + thickness - 15 - 40, y: height / 2 + CABATP - CABARPO - 20},
                {x: width / 2 + CABADSI / 2 + thickness - 15, y: height / 2 + CABATP - CABARPO - 20}
            ])).attr("id", "CABASketchE").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CABASketchE").attr("startOffset", "50%").text(e);

            // THKJN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CABADSI / 2 - 2 * thickness - 30, y: height / 2 + CABATP - CABARPO - 20},
                    {x: width / 2 - CABADSI / 2 - 2 * thickness - 30 - 15, y: height / 2 + CABATP - CABARPO - 17},
                    {x: width / 2 - CABADSI / 2 - 2 * thickness - 30 - 15, y: height / 2 + CABATP - CABARPO - 23},
                    {x: width / 2 - CABADSI / 2 - 2 * thickness - 30, y: height / 2 + CABATP - CABARPO - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CABADSI / 2 - thickness - 30, y: height / 2 + CABATP - CABARPO - 20},
                    {x: width / 2 - CABADSI / 2 - thickness - 30 + 15, y: height / 2 + CABATP - CABARPO - 17},
                    {x: width / 2 - CABADSI / 2 - thickness - 30 + 15, y: height / 2 + CABATP - CABARPO - 23},
                    {x: width / 2 - CABADSI / 2 - thickness - 30, y: height / 2 + CABATP - CABARPO - 20}
                ]));
            drawLine(width / 2 - CABADSI / 2 - thickness - 30, height / 2 + CABATP - CABARPO - 20, width / 2 - CABADSI / 2 - 2 * thickness - 30, height / 2 + CABATP - CABARPO - 20);
            drawLine(width / 2 - CABADSI / 2 - thickness - 30 + 30, height / 2 + CABATP - CABARPO - 20, width / 2 - CABADSI / 2 - thickness - 30 + 15, height / 2 + CABATP - CABARPO - 20);
            svg.append("path").attr("d", line([
                {x: width / 2 - CABADSI / 2 - 2 * thickness - 30 - 15 - 40, y: height / 2 + CABATP - CABARPO - 20},
                {x: width / 2 - CABADSI / 2 - 2 * thickness - 30 - 15, y: height / 2 + CABATP - CABARPO - 20}
            ])).attr("id", "CABASketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CABASketchTHKJN").attr("startOffset", "50%").text(thkjn);

            // 锥体端部外直径
            extLineRightH(width / 2 - CABADSI / 2 - thickness, height / 2 + 2 * CABATP + CABARPO - 10);
            extLineRightH(width / 2 - CABADSI / 2 - thickness, height / 2 + 2 * CABATP - CABARPO + 10);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CABADSI / 2 - thickness + 30, y: height / 2 + 2 * CABATP + CABARPO - 10},
                    {x: width / 2 - CABADSI / 2 - thickness + 27, y: height / 2 + 2 * CABATP + CABARPO - 10 + 15},
                    {x: width / 2 - CABADSI / 2 - thickness + 33, y: height / 2 + 2 * CABATP + CABARPO - 10 + 15},
                    {x: width / 2 - CABADSI / 2 - thickness + 30, y: height / 2 + 2 * CABATP + CABARPO - 10}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - CABADSI / 2 - thickness + 30, y: height / 2 + 2 * CABATP - CABARPO + 10},
                    {x: width / 2 - CABADSI / 2 - thickness + 27, y: height / 2 + 2 * CABATP - CABARPO + 10 - 15},
                    {x: width / 2 - CABADSI / 2 - thickness + 33, y: height / 2 + 2 * CABATP - CABARPO + 10 - 15},
                    {x: width / 2 - CABADSI / 2 - thickness + 30, y: height / 2 + 2 * CABATP - CABARPO + 10}
                ]));
            drawLine(width / 2 - CABADSI / 2 - thickness + 30, height / 2 + 2 * CABATP - CABARPO + 10, width / 2 - CABADSI / 2 - thickness + 30, height / 2 + 2 * CABATP + CABARPO - 10 + 15 + 10);
            svg.append("path").attr("d", line([
                {x: width / 2 - CABADSI / 2 - thickness + 30, y: height / 2 + 2 * CABATP - CABARPO + 10 - 15},
                {x: width / 2 - CABADSI / 2 - thickness + 30, y: height / 2 + 2 * CABATP - CABARPO + 10 - 15 - 45}
            ])).attr("id", "CABASketchDPO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CABASketchDPO")
                .attr("startOffset", "50%").text(dpo);

            // 半顶角标注
            let r = Math.sqrt(10 * 10 + 35 * 35) * CABARPI / 10;
            let centerX = width / 2 + CABADSI / 2 + 2 * thickness + 30 - r;
            let centerY = height / 2;
            let halfAngle = Math.atan(10 / 35) / Math.PI * 180;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30 - 2, y: height / 2 + 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30 + 2, y: height / 2 + 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2}
                ])).attr("transform", "rotate(" + halfAngle + ", " + centerX + " " + centerY + ")");

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30 - 2, y: height / 2 - 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30 + 2, y: height / 2 - 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2}
                ])).attr("transform", "rotate(" + -halfAngle + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2 - 10 - 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2 - 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2}
                ])).attr("transform", "rotate(" + -halfAngle + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 7, y: height / 2},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30 + 10, y: height / 2}
                ])).attr("transform", "rotate(" + -halfAngle + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 7, y: height / 2},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30 + 10, y: height / 2}
                ])).attr("transform", "rotate(" + halfAngle + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2 + 10 + 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2 + 10},
                    {x: width / 2 + CABADSI / 2 + 2 * thickness + 30 + 30, y: height / 2}
                ])).attr("transform", "rotate(" + halfAngle + ", " + centerX + " " + centerY + ")");

            svg.append("path").attr("d", "M "
                + (centerX + (r + 30) * Math.cos(halfAngle / 180 * Math.PI)) + " " + (centerY - (r + 30) * Math.sin(halfAngle / 180 * Math.PI)) + " "
                + "A" + r + " " + r + " "
                + "1 0 1" + " "
                + (centerX + (r + 30) * Math.cos(halfAngle / 180 * Math.PI)) + " " + (centerY + (r + 30) * Math.sin(halfAngle / 180 * Math.PI))
            ).classed("sketch", true).attr("id", "AAFASketchA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#AAFASketchA").attr("startOffset", "50%").text("60°-90°");
        }

        currentTabIndex = cabad2d3.tabs('getTabIndex', cabad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            caba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#caba").length > 0) {
                    caba2d();
                }
            });
        }
        cabad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    caba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#caba").length > 0) {
                            caba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 蜂窝锥体夹套圆筒强度校核",
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
                    $(ed.target).combobox("loadData", CABASCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CABASType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CABASSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CABASName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CABAJCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CABAJType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", CABAJSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", CABAJName);
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
                    cabad2.empty();

                    // model
                    cabad3.empty();

                    // sketch
                    currentTabIndex = cabad2d3.tabs('getTabIndex', cabad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        caba2d();
                        cabad2.off("resize").on("resize", function () {
                            if ($("#caba").length > 0) {
                                caba2d();
                            }
                        });
                    }
                    cabad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                caba2d();
                                cabad2.off("resize").on("resize", function () {
                                    if ($("#caba").length > 0) {
                                        caba2d();
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

                        CABADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CABASCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CABASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CABASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CABASName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CABAJCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CABAJType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CABAJSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CABAJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CABASCategory = [];
                                CABAJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CABADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CABASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CABAJCategory[index] = {
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

                        CABASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CABASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CABASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CABASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CABASCategoryVal,
                                temp: CABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CABASType = [];
                                $(result).each(function (index, element) {
                                    CABASType[index] = {
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

                        CABASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CABASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CABASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CABASCategoryVal,
                                type: CABASTypeVal,
                                temp: CABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CABASSTD = [];
                                $(result).each(function (index, element) {
                                    CABASSTD[index] = {
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

                        CABASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CABASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CABASCategoryVal,
                                type: CABASTypeVal,
                                std: CABASSTDVal,
                                temp: CABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CABASName = [];
                                $(result).each(function (index, element) {
                                    CABASName[index] = {
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

                        CABAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CABAJType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CABAJSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CABAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CABAJCategoryVal,
                                temp: CABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CABAJType = [];
                                $(result).each(function (index, element) {
                                    CABAJType[index] = {
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

                        CABAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CABAJSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CABAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CABAJCategoryVal,
                                type: CABAJTypeVal,
                                temp: CABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CABAJSTD = [];
                                $(result).each(function (index, element) {
                                    CABAJSTD[index] = {
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

                        CABAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CABAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CABAJCategoryVal,
                                type: CABAJTypeVal,
                                std: CABAJSTDVal,
                                temp: CABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CABAJName = [];
                                $(result).each(function (index, element) {
                                    CABAJName[index] = {
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
                            let CABATest = rows[1][columns[0][1].field];

                            // 筒体材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CABASNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取筒体材料密度、最大最小厚度
                                let CABASDensity, CABASThkMin, CABASThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CABASCategoryVal,
                                        "type": CABASTypeVal,
                                        "std": CABASSTDVal,
                                        "name": CABASNameVal,
                                        "temp": CABADT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        CABASDensity = parseFloat(result.density);
                                        CABASThkMin = parseFloat(result.thkMin);
                                        CABASThkMax = parseFloat(result.thkMax);

                                        // 筒体设计压力
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CABAPSD = parseFloat(rows[6][columns[0][1].field]);

                                            // 筒体静压力
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let CABAPSS = parseFloat(rows[7][columns[0][1].field]);

                                                // 筒体计算压力
                                                let CABAPSC = CABAPSD + CABAPSS;

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CABADSI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        caba2d("Φ" + CABADSI);
                                                        cabad2.off("resize").on("resize", function () {
                                                            if ($("#caba").length > 0) {
                                                                caba2d("Φ" + CABADSI);
                                                            }
                                                        });
                                                    }
                                                    cabad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                caba2d("Φ" + CABADSI);
                                                                cabad2.off("resize").on("resize", function () {
                                                                    if ($("#caba").length > 0) {
                                                                        caba2d("Φ" + CABADSI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CABASThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CABASThkMax) {
                                                        let CABATHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            caba2d("Φ" + CABADSI, CABATHKSN);
                                                            cabad2.off("resize").on("resize", function () {
                                                                if ($("#caba").length > 0) {
                                                                    caba2d("Φ" + CABADSI, CABATHKSN);
                                                                }
                                                            });
                                                        }
                                                        cabad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    caba2d("Φ" + CABADSI, CABATHKSN);
                                                                    cabad2.off("resize").on("resize", function () {
                                                                        if ($("#caba").length > 0) {
                                                                            caba2d("Φ" + CABADSI, CABATHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 筒体外直径
                                                        let CABADSO = CABADSI + 2 * CABATHKSN;

                                                        // 筒体材料物性
                                                        let CABASOT, CABASO, CABASOT1, CABASREL, CABACS1, CABAEST;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CABASCategoryVal,
                                                                "type": CABASTypeVal,
                                                                "std": CABASSTDVal,
                                                                "name": CABASNameVal,
                                                                "thk": CABATHKSN,
                                                                "temp": CABADT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CABADSO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CABASOT = parseFloat(result.ot);
                                                                if (CABASOT < 0) {
                                                                    south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CABASO = parseFloat(result.o);
                                                                if (CABASO < 0) {
                                                                    south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CABASREL = parseFloat(result.rel);
                                                                if (CABASREL < 0) {
                                                                    south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CABACS1 = parseFloat(result.c1);
                                                                if (CABACS1 < 0) {
                                                                    south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CABAEST = 1000 * parseFloat(result.et);
                                                                if (CABAEST < 0) {
                                                                    south.html("查询筒体材料弹性模量失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CABASOT1 = parseFloat(result.ot1);

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < CABATHKSN) {
                                                                    let CABACS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体厚度附加量
                                                                    let CABACS = CABACS1 + CABACS2;

                                                                    // 筒体有效厚度
                                                                    let CABATHKSE = CABATHKSN - CABACS;

                                                                    // 轴向节距 tp
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let CABATP = parseFloat(rows[11][columns[0][1].field]);

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            caba2d("Φ" + CABADSI, CABATHKSN, CABATP);
                                                                            cabad2.off("resize").on("resize", function () {
                                                                                if ($("#caba").length > 0) {
                                                                                    caba2d("Φ" + CABADSI, CABATHKSN, CABATP);
                                                                                }
                                                                            });
                                                                        }
                                                                        cabad2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    caba2d("Φ" + CABADSI, CABATHKSN, CABATP);
                                                                                    cabad2.off("resize").on("resize", function () {
                                                                                        if ($("#caba").length > 0) {
                                                                                            caba2d("Φ" + CABADSI, CABATHKSN, CABATP);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // 周向节距 tT
                                                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                            let CABATT = parseFloat(rows[12][columns[0][1].field]);

                                                                            // 节距比
                                                                            let CABATPTT = CABATP / CABATT;

                                                                            south.html("<span style='color:#444444;'>" +
                                                                                "短管许用节距比：[0.8, 1.25]" +
                                                                                "</span>");

                                                                            // 节距比校核
                                                                            let CABATPTTCHK;
                                                                            if (CABATPTT >= 0.8 && CABATPTT <= 1.25) {
                                                                                CABATPTTCHK = "合格";
                                                                                south.append("<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "实际节距比：" + CABATPTT.toFixed(2) +
                                                                                    "</span>");
                                                                            }
                                                                            else {
                                                                                CABATPTTCHK = "不合格";
                                                                                south.append("<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "实际节距比：" + CABATPTT.toFixed(2) +
                                                                                    "</span>");
                                                                            }

                                                                            // 有效节距
                                                                            let CABATO = Math.sqrt(CABATP * CABATT);

                                                                            // 端部外直径
                                                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                                && parseFloat(rows[13][columns[0][1].field]) < Math.min(CABATP, CABATT)) {
                                                                                let CABADPO = parseFloat(rows[13][columns[0][1].field]);

                                                                                // Sketch
                                                                                if (currentTabIndex === 0) {
                                                                                    caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO);
                                                                                    cabad2.off("resize").on("resize", function () {
                                                                                        if ($("#caba").length > 0) {
                                                                                            caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO);
                                                                                        }
                                                                                    });
                                                                                }
                                                                                cabad2d3.tabs({
                                                                                    onSelect: function (title, index) {
                                                                                        if (index === 0) {
                                                                                            caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO);
                                                                                            cabad2.off("resize").on("resize", function () {
                                                                                                if ($("#caba").length > 0) {
                                                                                                    caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                });

                                                                                // 夹套材料名称
                                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                    let CABAJNameVal = rows[17][columns[0][1].field];

                                                                                    // AJAX 获取夹套材料密度、最大最小厚度
                                                                                    let CABAJDensity, CABAJThkMin,
                                                                                        CABAJThkMax;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_gbt_150_2011_index.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": CABAJCategoryVal,
                                                                                            "type": CABAJTypeVal,
                                                                                            "std": CABAJSTDVal,
                                                                                            "name": CABAJNameVal,
                                                                                            "temp": CABADT
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {
                                                                                            CABAJDensity = parseFloat(result.density);
                                                                                            CABAJThkMin = parseFloat(result.thkMin);
                                                                                            CABAJThkMax = parseFloat(result.thkMax);

                                                                                            // 夹套设计压力
                                                                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                                                let CABAPJD = parseFloat(rows[18][columns[0][1].field]);

                                                                                                // 夹套静压力
                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                    let CABAPJS = parseFloat(rows[19][columns[0][1].field]);

                                                                                                    // 夹套计算压力
                                                                                                    let CABAPJC = CABAPJD + CABAPJS;

                                                                                                    // 夹套腔体厚度 e
                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                                                                        let CABAE = parseFloat(rows[20][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE);
                                                                                                            cabad2.off("resize").on("resize", function () {
                                                                                                                if ($("#caba").length > 0) {
                                                                                                                    caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        cabad2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE);
                                                                                                                    cabad2.off("resize").on("resize", function () {
                                                                                                                        if ($("#caba").length > 0) {
                                                                                                                            caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        // 夹套名义厚度
                                                                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > CABAJThkMin
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= CABAJThkMax) {
                                                                                                            let CABATHKJN = parseFloat(rows[21][columns[0][1].field]);

                                                                                                            // Sketch
                                                                                                            if (currentTabIndex === 0) {
                                                                                                                caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE, CABATHKJN);
                                                                                                                cabad2.off("resize").on("resize", function () {
                                                                                                                    if ($("#caba").length > 0) {
                                                                                                                        caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE, CABATHKJN);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                            cabad2d3.tabs({
                                                                                                                onSelect: function (title, index) {
                                                                                                                    if (index === 0) {
                                                                                                                        caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE, CABATHKJN);
                                                                                                                        cabad2.off("resize").on("resize", function () {
                                                                                                                            if ($("#caba").length > 0) {
                                                                                                                                caba2d("Φ" + CABADSI, CABATHKSN, CABATP, "Φ" + CABADPO, CABAE, CABATHKJN);
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }
                                                                                                                }
                                                                                                            });

                                                                                                            // 锥体内直径
                                                                                                            let CABADPI = CABADPO - 2 * CABATHKJN;

                                                                                                            // 夹套内直径
                                                                                                            let CABADJI = CABADSO + 2 * CABAE;

                                                                                                            // 夹套外直径
                                                                                                            let CABADJO = CABADJI + 2 * CABATHKJN;

                                                                                                            // 夹套材料物性
                                                                                                            let CABAJOT,
                                                                                                                CABAJO,
                                                                                                                CABAJOT1,
                                                                                                                CABAJREL,
                                                                                                                CABACJ1,
                                                                                                                CABAEJT;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "category": CABAJCategoryVal,
                                                                                                                    "type": CABAJTypeVal,
                                                                                                                    "std": CABAJSTDVal,
                                                                                                                    "name": CABAJNameVal,
                                                                                                                    "thk": CABATHKJN,
                                                                                                                    "temp": CABADT,
                                                                                                                    "highLow": 3,
                                                                                                                    "isTube": 0,
                                                                                                                    "od": CABADJO
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    CABAJOT = parseFloat(result.ot);
                                                                                                                    if (CABAJOT < 0) {
                                                                                                                        south.html("查询夹套材料设计温度许用应力失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    CABAJO = parseFloat(result.o);
                                                                                                                    if (CABAJO < 0) {
                                                                                                                        south.html("查询夹套材料常温许用应力失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    CABAJREL = parseFloat(result.rel);
                                                                                                                    if (CABAJREL < 0) {
                                                                                                                        south.html("查询夹套材料常温屈服强度失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    CABACJ1 = parseFloat(result.c1);
                                                                                                                    if (CABACJ1 < 0) {
                                                                                                                        south.html("查询夹套材料厚度负偏差失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    CABAEJT = 1000 * parseFloat(result.et);
                                                                                                                    if (CABAEJT < 0) {
                                                                                                                        south.html("查询夹套材料弹性模量失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    CABAJOT1 = parseFloat(result.ot1);

                                                                                                                    // 夹套腐蚀裕量
                                                                                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                                                                                        && parseFloat(rows[22][columns[0][1].field]) < CABATHKJN) {
                                                                                                                        let CABACJ2 = parseFloat(rows[22][columns[0][1].field]);

                                                                                                                        // 夹套厚度附加量
                                                                                                                        let CABACJ = CABACJ1 + CABACJ2;

                                                                                                                        // 夹套有效厚度
                                                                                                                        let CABATHKJE = CABATHKJN - CABACJ;

                                                                                                                        // 夹套计算长度 l
                                                                                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                                                                            let CABAL = parseFloat(rows[23][columns[0][1].field]);

                                                                                                                            // 短管许用圆心角
                                                                                                                            let CABATHKTALLOW = 30 * Math.min(1, 4 * Math.sqrt(CABAL / CABADSI) * Math.pow(CABATHKSE / CABADSI, 1 / 4));
                                                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "锥体许用周向圆心角：" + CABATHKTALLOW.toFixed(2) + "°" +
                                                                                                                                "</span>");

                                                                                                                            // 短管实际周向圆心角
                                                                                                                            let CABATHKT = 2 * CABATT / (Math.PI * (CABADSI + CABADJI)) * 360;

                                                                                                                            // 短管圆心角校核
                                                                                                                            let CABATHKTCHK;
                                                                                                                            if (CABATHKT <= CABATHKTALLOW) {
                                                                                                                                CABATHKTCHK = "合格";
                                                                                                                                south.append("<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际周向圆心角：" + CABATHKT.toFixed(2) + "°" +
                                                                                                                                    "</span>");
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                CABATHKTCHK = "不合格";
                                                                                                                                south.append("<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际周向圆心角：" + CABATHKT.toFixed(2) + "°" +
                                                                                                                                    "</span>");
                                                                                                                            }

                                                                                                                            // 夹套内最大允许工作压力
                                                                                                                            let CABAF1 = Math.PI / 2 * (1 + 1.3 * (1.8 + 2.3 * CABADPO / CABATO) / (Math.log(CABATO / CABADPO)));
                                                                                                                            let CABAPS2 = CABASOT * CABATHKSE * CABATHKSE / (CABATP * CABATT) * CABAF1 * (1 - Math.pow((CABAPSC - CABADSI) / (2 * CABASOT * CABATHKSE), 2));
                                                                                                                            let CABAM = 1.0;
                                                                                                                            let CABAF2 = CABAF1;
                                                                                                                            let CABAPJ2 = CABAJOT * CABATHKJE * CABATHKJE / CABATP / CABATT * CABAF2;
                                                                                                                            let CABAPMAWP = Math.min(CABAPS2, CABAPJ2) - CABAPJS;
                                                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "夹套内最大允许工作压力：" + CABAPMAWP.toFixed(4) + " MPa" +
                                                                                                                                "</span>");

                                                                                                                            // 夹套内压校核
                                                                                                                            let CABAPJDCHK;
                                                                                                                            if (CABAPJD <= CABAPMAWP) {
                                                                                                                                CABAPJDCHK = "合格";
                                                                                                                                south.append("<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "夹套内设计压力：" + CABAPJD.toFixed(4) + " MPa" +
                                                                                                                                    "</span>");
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                CABAPJDCHK = "不合格";
                                                                                                                                south.append("<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "夹套内设计压力：" + CABAPJD.toFixed(4) + " MPa" +
                                                                                                                                    "</span>");
                                                                                                                            }

                                                                                                                            // 计算节距 T1
                                                                                                                            let CABAT1 = CABATHKSE * Math.sqrt(CABASOT / CABAPJC * CABAF1 * (1 - Math.pow((CABAPSC - CABADSI) / (2 * CABASOT * CABATHKSE), 2)));

                                                                                                                            // 计算节距 T2
                                                                                                                            let CABAT2 = CABATHKJE * Math.sqrt(CABAJOT / CABAPJC * CABAF2);

                                                                                                                            south.append("<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "蜂窝短管许用最小计算节距：" + Math.min(CABAT1, CABAT2).toFixed(4) + " mm" +
                                                                                                                                "</span>");

                                                                                                                            // 节距校核
                                                                                                                            let CABATOCHK;
                                                                                                                            if (CABATO <= Math.min(CABAT1, CABAT2).toFixed(4)) {
                                                                                                                                CABATOCHK = "合格";
                                                                                                                                south.append("<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际计算节距：" + CABATO.toFixed(4) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                            } else {
                                                                                                                                CABATOCHK = "不合格";
                                                                                                                                south.append("<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际计算节距：" + CABATO.toFixed(4) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                            }

                                                                                                                            // 容器筒体厚度
                                                                                                                            let CABATHKSC = CABATO * Math.sqrt(CABAPJC / CABASOT / CABAF1 + Math.pow(CABAPSC * CABADSI / (2 * CABASOT * CABATO), 2));
                                                                                                                            let CABATHKSD = CABATHKSC + CABACS2;

                                                                                                                            // 所需厚度提示信息
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "容器筒体所需厚度：" + (CABATHKSD + CABACS1).toFixed(2) + " mm" +
                                                                                                                                "</span>");

                                                                                                                            // 容器筒体厚度校核
                                                                                                                            let CABATHKSCHK;
                                                                                                                            if (CABATHKSN >= (CABATHKSD + CABACS1).toFixed(2)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + CABATHKSN + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                CABATHKSCHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + CABATHKSN + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                CABATHKSCHK = "不合格";
                                                                                                                            }

                                                                                                                            // 夹套厚度
                                                                                                                            let CABATHKJC = CABATO * Math.sqrt(CABAPJC / CABAJOT / CABAF2);
                                                                                                                            let CABATHKJD = CABATHKJC + CABACJ2;

                                                                                                                            // 所需厚度提示信息
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "夹套所需厚度：" + (CABATHKJD + CABACJ1).toFixed(2) + " mm" +
                                                                                                                                "</span>");

                                                                                                                            // 夹套厚度校核
                                                                                                                            let CABATHKJCHK;
                                                                                                                            if (CABATHKJN >= (CABATHKJD + CABACJ1).toFixed(2)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + CABATHKJN + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                CABATHKJCHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + CABATHKJN + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                CABATHKJCHK = "不合格";
                                                                                                                            }

                                                                                                                            // 夹套边缘距离计算
                                                                                                                            let CABATLALLOW = CABATP * Math.min(1, 0.5 + Math.sqrt(CABATT / CABATP / CABAF2));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "夹套边缘至第一排蜂窝短管中心线的最大轴向距离：" + CABATLALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");

                                                                                                                            let CABATKALLOW = CABATT * Math.min(1, 0.5 + Math.sqrt(CABATP / CABATT / CABAF2));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "夹套边缘至第一排蜂窝短管中心线的最大周向距离：" + CABATKALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");

                                                                                                                            // 锥体厚度
                                                                                                                            let CABAU = 1 - Math.PI / 4 * (CABADPO / CABATO) * (CABADPO / CABATO);
                                                                                                                            let CABATHKPC = (CABAPJC * CABATP * CABATT * CABAU) / (0.7 * Math.PI * (CABADPO - CABATHKJN) * Math.min(CABASOT, CABAJOT));
                                                                                                                            let CABATHKPD = CABATHKPC + CABACJ2;

                                                                                                                            // 所需厚度提示信息
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "锥体所需厚度：" + (CABATHKPD + CABACJ1).toFixed(2) + " mm" +
                                                                                                                                "</span>");

                                                                                                                            // 短管厚度校核
                                                                                                                            let CABATHKPCHK;
                                                                                                                            if (CABATHKJN >= (CABATHKPD + CABACJ1).toFixed(2)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + CABATHKJN + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                CABATHKPCHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + CABATHKJN + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                CABATHKPCHK = "不合格";
                                                                                                                            }

                                                                                                                            // 角焊缝校核
                                                                                                                            let CABAAALLOW = CABATHKJN;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "锥体与容器连接处角焊缝最小尺寸：" + CABAAALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");

                                                                                                                            // 试验压力
                                                                                                                            let CABAPJT;
                                                                                                                            if (CABATest === "液压试验") {
                                                                                                                                CABAPJT = 1.25 * CABAPJD * Math.min(CABASO / Math.max(CABASOT, CABASOT1), CABAJO / Math.max(CABAJOT, CABAJOT1));
                                                                                                                            }
                                                                                                                            else if (CABATest === "气压试验") {
                                                                                                                                CABAPJT = 1.10 * CABAPJD * Math.min(CABASO / Math.max(CABASOT, CABASOT1), CABAJO / Math.max(CABAJOT, CABAJOT1));
                                                                                                                            }
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "夹套试验压力：" + CABAPJT.toFixed(4) + " MPa" +
                                                                                                                                "</span>");

                                                                                                                            // 内筒体失稳校核
                                                                                                                            let CABATHKSEDSI = -1;
                                                                                                                            let CABATHKSEDSIALLOW = -1;
                                                                                                                            let CABATHKSEDSICHK = "/";
                                                                                                                            if (CABAPSD < 0) {
                                                                                                                                CABATHKSEDSI = CABATHKSE / CABADSI;
                                                                                                                                CABATHKSEDSIALLOW = Math.pow(4.5 * Math.abs(CABAPSC) / CABAEST * (CABATHKT / 360) * (CABATHKT / 360), 1 / 3);

                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "内筒体失稳临界厚径比：" + CABATHKSEDSIALLOW.toFixed(4) +
                                                                                                                                    "</span>");

                                                                                                                                // 厚径比校核
                                                                                                                                if (CABATHKSEDSI >= CABATHKSEDSIALLOW.toFixed(4)) {
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "实际厚径比：" + CABATHKSEDSI.toFixed(4) +
                                                                                                                                        "</span>");
                                                                                                                                    CABATHKSEDSICHK = "合格";
                                                                                                                                } else {
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "实际厚径比：" + CABATHKSEDSI.toFixed(4) +
                                                                                                                                        "</span>");
                                                                                                                                    CABATHKSEDSICHK = "不合格";
                                                                                                                                }

                                                                                                                            }

                                                                                                                            // docx
                                                                                                                            let CABAPayJS = $('#payjs');

                                                                                                                            function getDocx() {
                                                                                                                                $.ajax({
                                                                                                                                    type: "POST",
                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                    url: "cabadocx.action",
                                                                                                                                    async: true,
                                                                                                                                    dataType: "json",
                                                                                                                                    data: JSON.stringify({
                                                                                                                                        ribbonName: "CABA",

                                                                                                                                        t: CABADT,
                                                                                                                                        test: CABATest,
                                                                                                                                        sstd: CABASSTDVal,
                                                                                                                                        sname: CABASNameVal,
                                                                                                                                        psd: CABAPSD,
                                                                                                                                        pss: CABAPSS,
                                                                                                                                        dsi: CABADSI,
                                                                                                                                        thksn: CABATHKSN,
                                                                                                                                        cs2: CABACS2,
                                                                                                                                        jstd: CABAJSTDVal,
                                                                                                                                        jname: CABAJNameVal,
                                                                                                                                        pjd: CABAPJD,
                                                                                                                                        pjs: CABAPJS,
                                                                                                                                        e: CABAE,
                                                                                                                                        l: CABAL,
                                                                                                                                        thkjn: CABATHKJN,
                                                                                                                                        cj2: CABACJ2,
                                                                                                                                        tp: CABATP,
                                                                                                                                        tt: CABATT,
                                                                                                                                        dpo: CABADPO,
                                                                                                                                        densitys: CABASDensity,
                                                                                                                                        densityj: CABAJDensity,
                                                                                                                                        ost: CABASOT.toFixed(4),
                                                                                                                                        ojt: CABAJOT.toFixed(4),
                                                                                                                                        os: CABASO.toFixed(4),
                                                                                                                                        oj: CABAJO.toFixed(4),
                                                                                                                                        ost1: CABASOT1.toFixed(4),
                                                                                                                                        ojt1: CABAJOT1.toFixed(4),
                                                                                                                                        rsel: CABASREL.toFixed(4),
                                                                                                                                        rjel: CABAJREL.toFixed(4),
                                                                                                                                        est: (CABAEST / 1000).toFixed(4),
                                                                                                                                        ejt: (CABAEJT / 1000).toFixed(4),
                                                                                                                                        cs1: CABACS1.toFixed(4),
                                                                                                                                        cj1: CABACJ1.toFixed(4),
                                                                                                                                        cs: CABACS.toFixed(4),
                                                                                                                                        thkse: CABATHKSE.toFixed(4),
                                                                                                                                        psc: CABAPSC,
                                                                                                                                        dji: CABADJI,
                                                                                                                                        cj: CABACJ.toFixed(4),
                                                                                                                                        thkje: CABATHKJE,
                                                                                                                                        pjc: CABAPJC,
                                                                                                                                        dpi: CABADPI,
                                                                                                                                        to: CABATO.toFixed(4),
                                                                                                                                        thkt: CABATHKT.toFixed(4),
                                                                                                                                        thktallow: CABATHKTALLOW.toFixed(4),
                                                                                                                                        thktchk: CABATHKTCHK,
                                                                                                                                        tptt: CABATPTT.toFixed(4),
                                                                                                                                        tpttchk: CABATPTTCHK,
                                                                                                                                        f1: CABAF1.toFixed(4),
                                                                                                                                        ps2: CABAPS2.toFixed(4),
                                                                                                                                        m: CABAM.toFixed(4),
                                                                                                                                        f2: CABAF2.toFixed(4),
                                                                                                                                        pj2: CABAPJ2.toFixed(4),
                                                                                                                                        pmawp: CABAPMAWP.toFixed(4),
                                                                                                                                        pjdchk: CABAPJDCHK,
                                                                                                                                        t1: CABAT1.toFixed(4),
                                                                                                                                        t2: CABAT2.toFixed(4),
                                                                                                                                        tochk: CABATOCHK,
                                                                                                                                        thksc: CABATHKSC.toFixed(4),
                                                                                                                                        thksd: CABATHKSD.toFixed(4),
                                                                                                                                        thkschk: CABATHKSCHK,
                                                                                                                                        thksedsi: CABATHKSEDSI.toFixed(4),
                                                                                                                                        thksedsiallow: CABATHKSEDSIALLOW.toFixed(4),
                                                                                                                                        thksedsichk: CABATHKSEDSICHK,
                                                                                                                                        thkjc: CABATHKJC.toFixed(4),
                                                                                                                                        thkjd: CABATHKJD.toFixed(4),
                                                                                                                                        thkjchk: CABATHKJCHK,
                                                                                                                                        tl: CABATLALLOW.toFixed(4),
                                                                                                                                        tk: CABATKALLOW.toFixed(4),
                                                                                                                                        u: CABAU.toFixed(4),
                                                                                                                                        thkpc: CABATHKPC.toFixed(4),
                                                                                                                                        thkpd: CABATHKPD.toFixed(4),
                                                                                                                                        thkpchk: CABATHKPCHK,
                                                                                                                                        aallow: CABAAALLOW.toFixed(4),
                                                                                                                                        pjt: CABAPJT.toFixed(4)
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
                                                                                                                                            CABAPayJS.dialog({
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
                                                                                                                                                        CABAPayJS.dialog("close");
                                                                                                                                                        CABAPayJS.dialog("clear");
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
                                                                                                                                                                    CABAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                            CABAPayJS.dialog('close');
                                                                                                                                                                            CABAPayJS.dialog('clear');
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
                                                                                                                    else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                                                                                        && parseFloat(rows[22][columns[0][1].field]) >= CABATHKJN) {
                                                                                                                        south.html("夹套腐蚀裕量不能大于等于 " + CABATHKJN + " mm").css("color", "red");
                                                                                                                    }
                                                                                                                },
                                                                                                                error: function () {
                                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= CABAJThkMin) {
                                                                                                            south.html("夹套名义厚度不能小于等于 " + CABAJThkMin + " mm").css("color", "red");
                                                                                                        }
                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > CABAJThkMax) {
                                                                                                            south.html("夹套名义厚度不能大于 " + CABAJThkMax + " mm").css("color", "red");
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
                                                                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                                && parseFloat(rows[13][columns[0][1].field]) >= Math.min(CABATP, CABATT)) {
                                                                                south.html("锥体端部外直径 dpo 不能大于等于 " + Math.min(CABATP, CABATT) + " mm").css("color", "red");
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= CABATHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + CABATHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CABASThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + CABASThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CABASThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + CABASThkMax + " mm").css("color", "red");
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