$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cadbd2 = $("#d2");
    let cadbd3 = $("#d3");
    let cadbd2d3 = $('#d2d3');

    $("#cal").html("<table id='cadb'></table>");
    let pg = $("#cadb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/d/b/CADB.json", function (result) {

        let CADBDT;
        let CADBSCategory, CADBSCategoryVal, CADBSType, CADBSTypeVal, CADBSSTD, CADBSSTDVal, CADBSName,
            CADBJCategory, CADBJCategoryVal, CADBJType, CADBJTypeVal, CADBJSTD, CADBJSTDVal, CADBJName;
        let columns, rows, ed;

        // 2D Sketch
        function cadb2d(dsi = "ϕDsi", thksn = "δsn", j = "j", t = "t", thkjn = "δjn") {

            cadbd2.empty();

            let width = cadbd2.width();
            let height = cadbd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CADBSVG")
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

            // 图形边距
            let padding = 40;
            let thickness = 8;
            let centerX = width / 2;
            let centerY = height / 2;
            let innerR = Math.min(height - 2 * padding, width - 2 * padding) / 3;
            let outerR = innerR + thickness;

            drawArc(innerR, innerR, centerX, centerY - innerR, centerX + innerR, centerY);
            drawArc(innerR, innerR, centerX, centerY + innerR, centerX, centerY - innerR);
            drawArc(outerR, outerR, centerX, centerY - outerR, centerX + outerR, centerY);
            drawArc(outerR, outerR, centerX, centerY + outerR, centerX, centerY - outerR);

            // 角钢内外直边
            let innerL = 18;
            let thk = 4;
            let outerL = innerL + thk;

            let alpha = Math.atan(outerL / (outerR + outerL)) / Math.PI * 180;

            drawCenterLine(centerX - outerR - outerL - 10, centerY, centerX + outerR + outerL + 10, centerY);
            drawCenterLine(centerX, centerY - outerR - outerL - 10, centerX, centerY + outerR + outerL + 10);

            // 0角钢
            // 竖
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY - outerR - outerL},
                {x: centerX, y: centerY - outerR}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX + thk, y: centerY - outerR - innerL},
                {x: centerX + thk, y: centerY - outerR}
            ])).classed("sketch", true);
            // 横
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY - outerR - outerL},
                {x: centerX + outerL, y: centerY - outerR - outerL}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX + thk, y: centerY - outerR - innerL},
                {x: centerX + outerL - thk * Math.tan(alpha / 180 * Math.PI), y: centerY - outerR - innerL}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX + outerL, y: centerY - outerR - outerL},
                {x: centerX + outerL - thk * Math.tan(alpha / 180 * Math.PI), y: centerY - outerR - innerL}
            ])).classed("sketch", true);

            // 右边90°
            let nr = parseInt(90 / alpha);
            for (let i = 1; i < nr; i++) {
                // 竖
                svg.append("path").attr("d", line([
                    {x: centerX, y: centerY - outerR - outerL},
                    {x: centerX, y: centerY - outerR}
                ])).classed("sketch", true).attr("transform", "rotate(" + i * alpha + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + thk, y: centerY - outerR - innerL},
                    {x: centerX + thk, y: centerY - outerR}
                ])).classed("sketch", true).attr("transform", "rotate(" + i * alpha + ", " + centerX + " " + centerY + ")");
                // 横
                svg.append("path").attr("d", line([
                    {x: centerX, y: centerY - outerR - outerL},
                    {x: centerX + outerL, y: centerY - outerR - outerL}
                ])).classed("sketch", true).attr("transform", "rotate(" + i * alpha + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + thk, y: centerY - outerR - innerL},
                    {x: centerX + outerL - thk * Math.tan(alpha / 180 * Math.PI), y: centerY - outerR - innerL}
                ])).classed("sketch", true).attr("transform", "rotate(" + i * alpha + ", " + centerX + " " + centerY + ")");

                svg.append("path").attr("d", line([
                    {x: centerX + outerL, y: centerY - outerR - outerL},
                    {x: centerX + outerL - thk * Math.tan(alpha / 180 * Math.PI), y: centerY - outerR - innerL}
                ])).classed("sketch", true).attr("transform", "rotate(" + i * alpha + ", " + centerX + " " + centerY + ")");
            }

            // 左边180°
            let nl = parseInt(180 / alpha);
            for (let i = 1; i <= nl; i++) {
                // 竖
                svg.append("path").attr("d", line([
                    {x: centerX, y: centerY - outerR - outerL},
                    {x: centerX, y: centerY - outerR}
                ])).classed("sketch", true).attr("transform", "rotate(" + -i * alpha + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + thk, y: centerY - outerR - innerL},
                    {x: centerX + thk, y: centerY - outerR}
                ])).classed("sketch", true).attr("transform", "rotate(" + -i * alpha + ", " + centerX + " " + centerY + ")");
                // 横
                svg.append("path").attr("d", line([
                    {x: centerX, y: centerY - outerR - outerL},
                    {x: centerX + outerL, y: centerY - outerR - outerL}
                ])).classed("sketch", true).attr("transform", "rotate(" + -i * alpha + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + thk, y: centerY - outerR - innerL},
                    {x: centerX + outerL - thk * Math.tan(alpha / 180 * Math.PI), y: centerY - outerR - innerL}
                ])).classed("sketch", true).attr("transform", "rotate(" + -i * alpha + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + outerL, y: centerY - outerR - outerL},
                    {x: centerX + outerL - thk * Math.tan(alpha / 180 * Math.PI), y: centerY - outerR - innerL}
                ])).classed("sketch", true).attr("transform", "rotate(" + -i * alpha + ", " + centerX + " " + centerY + ")");
            }

            // DSI
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + innerR, y: centerY},
                    {x: centerX + innerR - 15, y: centerY - 3},
                    {x: centerX + innerR - 15, y: centerY + 3},
                    {x: centerX + innerR, y: centerY}
                ])).attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX - innerR, y: centerY},
                    {x: centerX - innerR + 15, y: centerY - 3},
                    {x: centerX - innerR + 15, y: centerY + 3},
                    {x: centerX - innerR, y: centerY}
                ])).attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX - innerR + 15, y: centerY},
                {x: centerX + innerR - 15, y: centerY}
            ])).attr("id", "CADASketchDSI").classed("sketch", true)
                .attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CADASketchDSI").attr("startOffset", "75%").text(dsi)
                .attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");

            // 内筒体厚度
            svg.append("path").attr("d", line([
                {x: centerX + innerR, y: centerY},
                {x: centerX + outerR, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + outerR, y: centerY},
                    {x: centerX + outerR + 15, y: centerY - 3},
                    {x: centerX + outerR + 15, y: centerY + 3},
                    {x: centerX + outerR, y: centerY}
                ])).attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + outerR + 15, y: centerY},
                {x: centerX + outerR + 15 + 60, y: centerY}
            ])).attr("id", "CADASketchTHKSN").classed("sketch", true)
                .attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CADASketchTHKSN").attr("startOffset", "65%").text(thksn);

            // J
            svg.append("path").attr("d", line([
                {x: centerX + outerR, y: centerY + 40},
                {x: centerX + outerR, y: centerY + 3}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI), y: centerY + 40},
                {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI), y: centerY + 3}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + outerR, y: centerY + 30},
                    {x: centerX + outerR - 15, y: centerY + 27},
                    {x: centerX + outerR - 15, y: centerY + 33},
                    {x: centerX + outerR, y: centerY + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI), y: centerY + 30},
                    {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI) + 15, y: centerY + 27},
                    {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI) + 15, y: centerY + 33},
                    {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI), y: centerY + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: centerX + outerR - 15 - 10, y: centerY + 30},
                {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI), y: centerY + 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI) + 15, y: centerY + 30},
                {x: centerX + outerR + outerL + thk * Math.tan(alpha / 180 * Math.PI) + 15 + 45, y: centerY + 30}
            ])).attr("id", "CADBSketchJ").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CADBSketchJ").attr("startOffset", "50%").text(j);

            // t
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY - outerR - outerL - 10 - 3},
                {x: centerX, y: centerY - outerR - outerL - 10 - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX + outerL, y: centerY - outerR - outerL - 10 - 3},
                {x: centerX + outerL, y: centerY - outerR - outerL - 10 - 40}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX, y: centerY - outerR - outerL - 10 - 30},
                    {x: centerX - 15, y: centerY - outerR - outerL - 10 - 27},
                    {x: centerX - 15, y: centerY - outerR - outerL - 10 - 33},
                    {x: centerX, y: centerY - outerR - outerL - 10 - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + outerL, y: centerY - outerR - outerL - 10 - 30},
                    {x: centerX + outerL + 15, y: centerY - outerR - outerL - 10 - 27},
                    {x: centerX + outerL + 15, y: centerY - outerR - outerL - 10 - 33},
                    {x: centerX + outerL, y: centerY - outerR - outerL - 10 - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: centerX - 15 - 10, y: centerY - outerR - outerL - 10 - 30},
                {x: centerX + outerL, y: centerY - outerR - outerL - 10 - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX + outerL + 15, y: centerY - outerR - outerL - 10 - 30},
                {x: centerX + outerL + 15 + 45, y: centerY - outerR - outerL - 10 - 30}
            ])).attr("id", "CADBSketchT").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CADBSketchT")
                .attr("startOffset", "50%").text(t);
            drawLine(centerX + outerL, centerY - outerR - outerL - 10 - 3, centerX + outerL, centerY - outerR - outerL - 3);

            // thkjn
            svg.append("path").attr("d", line([
                {x: centerX + thk, y: centerY - outerR + 3},
                {x: centerX + thk, y: centerY - outerR + 60}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX, y: centerY - outerR + 50},
                    {x: centerX - 15, y: centerY - outerR + 47},
                    {x: centerX - 15, y: centerY - outerR + 53},
                    {x: centerX, y: centerY - outerR + 50}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + thk, y: centerY - outerR + 50},
                    {x: centerX + thk + 15, y: centerY - outerR + 47},
                    {x: centerX + thk + 15, y: centerY - outerR + 53},
                    {x: centerX + thk, y: centerY - outerR + 50}
                ]));
            svg.append("path").attr("d", line([
                {x: centerX + thk + 15 + 10, y: centerY - outerR + 50},
                {x: centerX, y: centerY - outerR + 50}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: centerX - 15 - 40, y: centerY - outerR + 50},
                {x: centerX - 15, y: centerY - outerR + 50}
            ])).attr("id", "CADBSketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CADBSketchTHKJN")
                .attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = cadbd2d3.tabs('getTabIndex', cadbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cadb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cadb").length > 0) {
                    cadb2d();
                }
            });
        }
        cadbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cadb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cadb").length > 0) {
                            cadb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 互搭式轴线型钢夹套校核",
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
                    $(ed.target).combobox("loadData", CADBSCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CADBSType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CADBSSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CADBSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", CADBJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", CADBJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CADBJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CADBJName);
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
                    cadbd2.empty();

                    // model
                    cadbd3.empty();

                    // sketch
                    currentTabIndex = cadbd2d3.tabs('getTabIndex', cadbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        cadb2d();
                        cadbd2.off("resize").on("resize", function () {
                            if ($("#cadb").length > 0) {
                                cadb2d();
                            }
                        });
                    }
                    cadbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cadb2d();
                                cadbd2.off("resize").on("resize", function () {
                                    if ($("#cadb").length > 0) {
                                        cadb2d();
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

                        CADBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CADBSCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CADBSType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CADBSSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADBSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        CADBJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CADBJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CADBJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADBJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CADBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADBSCategory = [];
                                CADBJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CADBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CADBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CADBJCategory[index] = {
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

                        CADBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CADBSType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CADBSSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADBSCategoryVal,
                                temp: CADBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADBSType = [];
                                $(result).each(function (index, element) {
                                    CADBSType[index] = {
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

                        CADBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CADBSSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADBSCategoryVal,
                                type: CADBSTypeVal,
                                temp: CADBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADBSSTD = [];
                                $(result).each(function (index, element) {
                                    CADBSSTD[index] = {
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

                        CADBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADBSCategoryVal,
                                type: CADBSTypeVal,
                                std: CADBSSTDVal,
                                temp: CADBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADBSName = [];
                                $(result).each(function (index, element) {
                                    CADBSName[index] = {
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

                        CADBJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CADBJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CADBJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADBJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADBJCategoryVal,
                                temp: CADBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADBJType = [];
                                $(result).each(function (index, element) {
                                    CADBJType[index] = {
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

                        CADBJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CADBJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADBJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADBJCategoryVal,
                                type: CADBJTypeVal,
                                temp: CADBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADBJSTD = [];
                                $(result).each(function (index, element) {
                                    CADBJSTD[index] = {
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

                        CADBJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADBJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADBJCategoryVal,
                                type: CADBJTypeVal,
                                std: CADBJSTDVal,
                                temp: CADBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADBJName = [];
                                $(result).each(function (index, element) {
                                    CADBJName[index] = {
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
                            let CADBTest = rows[1][columns[0][1].field];

                            // 筒体材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CADBSNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取筒体材料密度、最大最小厚度
                                let CADBSDensity, CADBSThkMin, CADBSThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CADBSCategoryVal,
                                        "type": CADBSTypeVal,
                                        "std": CADBSSTDVal,
                                        "name": CADBSNameVal,
                                        "temp": CADBDT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        CADBSDensity = parseFloat(result.density);
                                        CADBSThkMin = parseFloat(result.thkMin);
                                        CADBSThkMax = parseFloat(result.thkMax);

                                        // 筒体设计压力
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CADBPSD = parseFloat(rows[6][columns[0][1].field]);

                                            // 筒体静压力
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let CADBPSS = parseFloat(rows[7][columns[0][1].field]);

                                                // 筒体计算压力
                                                let CADBPSC = CADBPSD + CADBPSS;

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CADBDSI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        cadb2d("ϕ" + CADBDSI);
                                                        cadbd2.off("resize").on("resize", function () {
                                                            if ($("#cadb").length > 0) {
                                                                cadb2d("ϕ" + CADBDSI);
                                                            }
                                                        });
                                                    }
                                                    cadbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                cadb2d("ϕ" + CADBDSI);
                                                                cadbd2.off("resize").on("resize", function () {
                                                                    if ($("#cadb").length > 0) {
                                                                        cadb2d("ϕ" + CADBDSI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CADBSThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CADBSThkMax) {
                                                        let CADBTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            cadb2d("ϕ" + CADBDSI, CADBTHKSN);
                                                            cadbd2.off("resize").on("resize", function () {
                                                                if ($("#cadb").length > 0) {
                                                                    cadb2d("ϕ" + CADBDSI, CADBTHKSN);
                                                                }
                                                            });
                                                        }
                                                        cadbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    cadb2d("ϕ" + CADBDSI, CADBTHKSN);
                                                                    cadbd2.off("resize").on("resize", function () {
                                                                        if ($("#cadb").length > 0) {
                                                                            cadb2d("ϕ" + CADBDSI, CADBTHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 筒体外直径
                                                        let CADBDSO = CADBDSI + 2 * CADBTHKSN;

                                                        // 筒体材料物性
                                                        let CADBSOT, CADBSO, CADBSOT1, CADBSREL, CADBCS1, CADBEST;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CADBSCategoryVal,
                                                                "type": CADBSTypeVal,
                                                                "std": CADBSSTDVal,
                                                                "name": CADBSNameVal,
                                                                "thk": CADBTHKSN,
                                                                "temp": CADBDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CADBDSO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CADBSOT = parseFloat(result.ot);
                                                                if (CADBSOT < 0) {
                                                                    south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADBSO = parseFloat(result.o);
                                                                if (CADBSO < 0) {
                                                                    south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADBSREL = parseFloat(result.rel);
                                                                if (CADBSREL < 0) {
                                                                    south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADBCS1 = parseFloat(result.c1);
                                                                if (CADBCS1 < 0) {
                                                                    south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADBEST = 1000 * parseFloat(result.et);
                                                                if (CADBEST < 0) {
                                                                    south.html("查询筒体材料弹性模量失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADBSOT1 = parseFloat(result.ot1);

                                                                // 焊接接头系数
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                                    let CADBES = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) < CADBTHKSN) {
                                                                        let CADBCS2 = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量
                                                                        let CADBCS = CADBCS1 + CADBCS2;

                                                                        // 筒体有效厚度
                                                                        let CADBTHKSE = CADBTHKSN - CADBCS;

                                                                        // 夹套材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let CADBJNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取夹套材料密度、最大最小厚度
                                                                            let CADBJDensity, CADBJThkMin, CADBJThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_gbt_150_2011_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": CADBJCategoryVal,
                                                                                    "type": CADBJTypeVal,
                                                                                    "std": CADBJSTDVal,
                                                                                    "name": CADBJNameVal,
                                                                                    "temp": CADBDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    CADBJDensity = parseFloat(result.density);
                                                                                    CADBJThkMin = parseFloat(result.thkMin);
                                                                                    CADBJThkMax = parseFloat(result.thkMax);

                                                                                    // 夹套设计压力
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let CADBPJD = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // 夹套静压力
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                            let CADBPJS = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // 夹套计算压力
                                                                                            let CADBPJC = CADBPJD + CADBPJS;

                                                                                            // 尺寸j
                                                                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                                                let CADBJ = parseFloat(rows[18][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ);
                                                                                                    cadbd2.off("resize").on("resize", function () {
                                                                                                        if ($("#cadb").length > 0) {
                                                                                                            cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cadbd2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ);
                                                                                                            cadbd2.off("resize").on("resize", function () {
                                                                                                                if ($("#cadb").length > 0) {
                                                                                                                    cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                // 尺寸T
                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                    let CADBT = parseFloat(rows[19][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT);
                                                                                                        cadbd2.off("resize").on("resize", function () {
                                                                                                            if ($("#cadb").length > 0) {
                                                                                                                cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    cadbd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT);
                                                                                                                cadbd2.off("resize").on("resize", function () {
                                                                                                                    if ($("#cadb").length > 0) {
                                                                                                                        cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 夹套名义厚度
                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) > CADBJThkMin
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) < Math.min(CADBJ, CADBT)) {
                                                                                                        let CADBTHKJN = parseFloat(rows[20][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT, CADBTHKJN);
                                                                                                            cadbd2.off("resize").on("resize", function () {
                                                                                                                if ($("#cadb").length > 0) {
                                                                                                                    cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT, CADBTHKJN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        cadbd2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT, CADBTHKJN);
                                                                                                                    cadbd2.off("resize").on("resize", function () {
                                                                                                                        if ($("#cadb").length > 0) {
                                                                                                                            cadb2d("ϕ" + CADBDSI, CADBTHKSN, CADBJ, CADBT, CADBTHKJN);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        // 夹套外直径
                                                                                                        let CADBDJO = CADBDSO + 2 * CADBJ;

                                                                                                        // 夹套内直径
                                                                                                        let CADBDJI = CADBDJO - 2 * CADBTHKJN;

                                                                                                        // 夹套材料物性
                                                                                                        let CADBJOT,
                                                                                                            CADBJO,
                                                                                                            CADBJOT1,
                                                                                                            CADBJREL,
                                                                                                            CADBCJ1,
                                                                                                            CADBEJT;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": CADBJCategoryVal,
                                                                                                                "type": CADBJTypeVal,
                                                                                                                "std": CADBJSTDVal,
                                                                                                                "name": CADBJNameVal,
                                                                                                                "thk": CADBTHKJN,
                                                                                                                "temp": CADBDT,
                                                                                                                "highLow": 3,
                                                                                                                "isTube": 0,
                                                                                                                "od": CADBDJO
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                CADBJOT = parseFloat(result.ot);
                                                                                                                if (CADBJOT < 0) {
                                                                                                                    south.html("查询夹套材料设计温度许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADBJO = parseFloat(result.o);
                                                                                                                if (CADBJO < 0) {
                                                                                                                    south.html("查询夹套材料常温许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADBJREL = parseFloat(result.rel);
                                                                                                                if (CADBJREL < 0) {
                                                                                                                    south.html("查询夹套材料常温屈服强度失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADBCJ1 = parseFloat(result.c1);
                                                                                                                if (CADBCJ1 < 0) {
                                                                                                                    south.html("查询夹套材料厚度负偏差失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADBEJT = 1000 * parseFloat(result.et);
                                                                                                                if (CADBEJT < 0) {
                                                                                                                    south.html("查询夹套材料弹性模量失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADBJOT1 = parseFloat(result.ot1);

                                                                                                                // 夹套腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) < CADBTHKJN) {
                                                                                                                    let CADBCJ2 = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                    // 夹套厚度附加量
                                                                                                                    let CADBCJ = CADBCJ1 + CADBCJ2;

                                                                                                                    // 夹套有效厚度
                                                                                                                    let CADBTHKJE = CADBTHKJN - CADBCJ;

                                                                                                                    // 筒体计算厚度1
                                                                                                                    let CADBTHKSC1 = CADBT * Math.sqrt(Math.max(CADBPSC, CADBPJC) / (2 * CADBSOT * CADBES)) + (CADBDSI * CADBPSC) / (8 * CADBSOT * CADBES);

                                                                                                                    // 筒体计算厚度2
                                                                                                                    let CADBTHKSC2 = (CADBDSI * CADBPSC) / (2 * CADBSOT * CADBES - CADBPSC);

                                                                                                                    // 容器筒体厚度
                                                                                                                    let CADBTHKSC = Math.max(CADBTHKSC1, CADBTHKSC2);
                                                                                                                    let CADBTHKSD = CADBTHKSC + CADBCS2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.html(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "容器筒体所需厚度：" + (CADBTHKSD + CADBCS1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 容器筒体厚度校核
                                                                                                                    let CADBTHKSCHK;
                                                                                                                    if (CADBTHKSN >= (CADBTHKSD + CADBCS1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADBTHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADBTHKSCHK = "合格";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADBTHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADBTHKSCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 夹套计算厚度1\2\3
                                                                                                                    let CADBTHKJC1 = CADBJ * Math.sqrt(CADBPJC / (2 * CADBSOT * CADBES));
                                                                                                                    let CADBTHKJC2 = CADBT * Math.sqrt(CADBPJC / (2 * CADBSOT * CADBES));
                                                                                                                    let CADBTHKJC3 = CADBPJC * CADBDJI / (2 * CADBSOT * CADBES);
                                                                                                                    let CADBTHKJC = Math.max(CADBTHKJC1, CADBTHKJC2, CADBTHKJC3);
                                                                                                                    let CADBTHKJD = CADBTHKJC + CADBCJ2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套所需厚度：" + (CADBTHKJD + CADBCJ1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 夹套厚度校核
                                                                                                                    let CADBTHKJCHK;
                                                                                                                    if (CADBTHKJN >= (CADBTHKJD + CADBCJ1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADBTHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADBTHKJCHK = "合格";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADBTHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADBTHKJCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 试验压力
                                                                                                                    let CADBPJT;
                                                                                                                    if (CADBTest === "液压试验") {
                                                                                                                        CADBPJT = 1.25 * CADBPJD * Math.min(CADBSO / Math.max(CADBSOT, CADBSOT1), CADBJO / Math.max(CADBJOT, CADBJOT1));
                                                                                                                    }
                                                                                                                    else if (CADBTest === "气压试验") {
                                                                                                                        CADBPJT = 1.10 * CADBPJD * Math.min(CADBSO / Math.max(CADBSOT, CADBSOT1), CADBJO / Math.max(CADBJOT, CADBJOT1));
                                                                                                                    }
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套试验压力：" + CADBPJT.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // docx
                                                                                                                    let CADBPayJS = $('#payjs');

                                                                                                                    function getDocx() {
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "cadbdocx.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                ribbonName: "CADB",

                                                                                                                                dt: CADBDT,
                                                                                                                                test: CADBTest,
                                                                                                                                sstd: CADBSSTDVal,
                                                                                                                                sname: CADBSNameVal,
                                                                                                                                psd: CADBPSD,
                                                                                                                                pss: CADBPSS,
                                                                                                                                dsi: CADBDSI,
                                                                                                                                thksn: CADBTHKSN,
                                                                                                                                es: CADBES,
                                                                                                                                cs2: CADBCS2,
                                                                                                                                jstd: CADBJSTDVal,
                                                                                                                                jname: CADBJNameVal,
                                                                                                                                pjd: CADBPJD,
                                                                                                                                pjs: CADBPJS,
                                                                                                                                j: CADBJ,
                                                                                                                                t: CADBT,
                                                                                                                                thkjn: CADBTHKJN,
                                                                                                                                cj2: CADBCJ2,
                                                                                                                                densitys: CADBSDensity.toFixed(4),
                                                                                                                                densityj: CADBJDensity.toFixed(4),
                                                                                                                                ost: CADBSOT.toFixed(4),
                                                                                                                                ojt: CADBJOT.toFixed(4),
                                                                                                                                os: CADBSO.toFixed(4),
                                                                                                                                oj: CADBJO.toFixed(4),
                                                                                                                                ost1: CADBSOT1.toFixed(4),
                                                                                                                                ojt1: CADBJOT1.toFixed(4),
                                                                                                                                rsel: CADBSREL.toFixed(4),
                                                                                                                                rjel: CADBJREL.toFixed(4),
                                                                                                                                est: (CADBEST / 1000).toFixed(4),
                                                                                                                                ejt: (CADBEJT / 1000).toFixed(4),
                                                                                                                                cs1: CADBCS1.toFixed(4),
                                                                                                                                cj1: CADBCJ1.toFixed(4),
                                                                                                                                cs: CADBCS.toFixed(4),
                                                                                                                                thkse: CADBTHKSE.toFixed(4),
                                                                                                                                psc: CADBPSC.toFixed(4),
                                                                                                                                cj: CADBCJ.toFixed(4),
                                                                                                                                thkje: CADBTHKJE.toFixed(4),
                                                                                                                                pjc: CADBPJC.toFixed(4),
                                                                                                                                dji: CADBDJI.toFixed(4),
                                                                                                                                thksc1: CADBTHKSC1.toFixed(4),
                                                                                                                                thksc2: CADBTHKSC2.toFixed(4),
                                                                                                                                thksd: CADBTHKSD.toFixed(4),
                                                                                                                                thkschk: CADBTHKSCHK,
                                                                                                                                thkjc1: CADBTHKJC1.toFixed(4),
                                                                                                                                thkjc2: CADBTHKJC2.toFixed(4),
                                                                                                                                thkjc3: CADBTHKJC3.toFixed(4),
                                                                                                                                thkjc: CADBTHKJC.toFixed(4),
                                                                                                                                thkjd: CADBTHKJD.toFixed(4),
                                                                                                                                thkjchk: CADBTHKJCHK,
                                                                                                                                pjt: CADBPJT.toFixed(4)
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
                                                                                                                                    CADBPayJS.dialog({
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
                                                                                                                                                CADBPayJS.dialog("close");
                                                                                                                                                CADBPayJS.dialog("clear");
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
                                                                                                                                                            CADBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                    CADBPayJS.dialog('close');
                                                                                                                                                                    CADBPayJS.dialog('clear');
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
                                                                                                                else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) >= CADBTHKJN) {
                                                                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CADBTHKJN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) <= CADBJThkMin) {
                                                                                                        south.html("夹套名义厚度不能小于等于 " + CADBJThkMin + " mm").css("color", "red");
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) >= Math.min(CADBJ, CADBT)) {
                                                                                                        south.html("夹套名义厚度不能大于等于 " + Math.min(CADBJ, CADBT).toFixed(4) + " mm").css("color", "red");
                                                                                                    }
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
                                                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) >= CADBTHKSN) {
                                                                        south.html("筒体腐蚀裕量不能大于等于 " + CADBTHKSN + " mm").css("color", "red");
                                                                    }
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CADBSThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + CADBSThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CADBSThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + CADBSThkMax + " mm").css("color", "red");
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