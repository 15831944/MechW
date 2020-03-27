$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cadad2 = $("#d2");
    let cadad3 = $("#d3");
    let cadad2d3 = $('#d2d3');

    $("#cal").html("<table id='cada'></table>");
    let pg = $("#cada");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/d/a/CADA.json", function (result) {

        let CADADT;
        let CADASCategory, CADASCategoryVal, CADASType, CADASTypeVal, CADASSTD, CADASSTDVal, CADASName,
            CADAJCategory, CADAJCategoryVal, CADAJType, CADAJTypeVal, CADAJSTD, CADAJSTDVal, CADAJName;
        let columns, rows, ed;

        // 2D Sketch
        function cada2d(dsi = "ϕDsi", thksn = "δsn", j = "j", t = "t", thkjn = "δjn") {

            cadad2.empty();

            let width = cadad2.width();
            let height = cadad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CADASVG")
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

            drawArc(innerR, innerR, centerX, centerY - innerR, centerX, centerY + innerR);
            drawArc(innerR, innerR, centerX, centerY + innerR, centerX, centerY - innerR);
            drawArc(outerR, outerR, centerX, centerY - outerR, centerX, centerY + outerR);
            drawArc(outerR, outerR, centerX, centerY + outerR, centerX, centerY - outerR);

            drawCenterLine(centerX - outerR - 10, centerY, centerX + outerR + 10, centerY);
            drawCenterLine(centerX, centerY - outerR - 10, centerX, centerY + outerR + 10);

            // 角钢内外直边
            let innerL = 25;
            let thk = 12;
            let outerL = innerL + thk;

            // 差距
            let delta = outerR - Math.sqrt(outerR * outerR - innerL * innerL);

            // 0 型钢内壁
            let cx0 = centerX - outerR + delta, cy0 = centerY;
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true);
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true);
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true);
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 - 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);

            // 0 型钢内壁
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerX + " " + centerY + ")");
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerX + " " + centerY + ")");
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerX + " " + centerY + ")");
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 + 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true)
                .attr("transform", "rotate(" + -45 + ", " + centerX + " " + centerY + ")");

            // 0 型钢内壁
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -90 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -90 + ", " + centerX + " " + centerY + ")");
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -90 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -90 + ", " + centerX + " " + centerY + ")");
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -90 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -90 + ", " + centerX + " " + centerY + ")");
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 - 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true)
                .attr("transform", "rotate(" + -90 + ", " + centerX + " " + centerY + ")");

            // 0 型钢内壁
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -135 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -135 + ", " + centerX + " " + centerY + ")");
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -135 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -135 + ", " + centerX + " " + centerY + ")");
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -135 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -135 + ", " + centerX + " " + centerY + ")");
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 + 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true)
                .attr("transform", "rotate(" + -135 + ", " + centerX + " " + centerY + ")");

            // 0 型钢内壁
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -180 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -180 + ", " + centerX + " " + centerY + ")");
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -180 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -180 + ", " + centerX + " " + centerY + ")");
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -180 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -180 + ", " + centerX + " " + centerY + ")");
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 - 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true)
                .attr("transform", "rotate(" + -180 + ", " + centerX + " " + centerY + ")");

            // 0 型钢内壁
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -225 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -225 + ", " + centerX + " " + centerY + ")");
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -225 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -225 + ", " + centerX + " " + centerY + ")");
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -225 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -225 + ", " + centerX + " " + centerY + ")");
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 + 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true)
                .attr("transform", "rotate(" + -225 + ", " + centerX + " " + centerY + ")");

            // 0 型钢内壁
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -270 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -270 + ", " + centerX + " " + centerY + ")");
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -270 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -270 + ", " + centerX + " " + centerY + ")");
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -270 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -270 + ", " + centerX + " " + centerY + ")");
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 - 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true)
                .attr("transform", "rotate(" + -270 + ", " + centerX + " " + centerY + ")");

            // 0 型钢内壁
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 - innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -315 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - innerL, y: cy0},
                {x: cx0, y: cy0 + innerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -315 + ", " + centerX + " " + centerY + ")");
            // 0 型钢外壁
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 - outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -315 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0 - outerL, y: cy0},
                {x: cx0, y: cy0 + outerL}
            ])).classed("sketch", true).attr("transform", "rotate(" + -315 + ", " + centerX + " " + centerY + ")");
            // 焊缝线
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - innerL},
                {x: cx0 - 0.5 * thk, y: cy0 - innerL - 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -315 + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 + innerL},
                {x: cx0 - 0.5 * thk, y: cy0 + innerL + 0.5 * thk}
            ])).classed("sketch", true).attr("transform", "rotate(" + -315 + ", " + centerX + " " + centerY + ")");
            //中心线
            svg.append("path").attr("d", line([
                {x: cx0 - outerL - 10, y: cy0},
                {x: cx0 + 10, y: cy0}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true)
                .attr("transform", "rotate(" + -315 + ", " + centerX + " " + centerY + ")");

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
                {x: centerX + outerR + 15 + 40, y: centerY}
            ])).attr("id", "CADASketchTHKSN").classed("sketch", true)
                .attr("transform", "rotate(" + -22.5 + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CADASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // j
            let x0 = centerX - 0.707 * outerR + 0.707 * delta - 0.707 * (innerL + thk);
            let y0 = centerY - 0.707 * outerR + 0.707 * delta - 0.707 * (innerL + thk);
            let x1 = x0 + outerL + 0.5 * thk;
            let y1 = y0;
            svg.append("path").attr("d", line([
                {x: x0, y: y0 - 3},
                {x: x0, y: y0 - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: x1, y: y1 - 3},
                {x: x1, y: y1 - 40}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: x0, y: y0 - 30},
                    {x: x0 - 15, y: y0 - 30 - 3},
                    {x: x0 - 15, y: y0 - 30 + 3},
                    {x: x0, y: y0 - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: x1, y: y1 - 30},
                    {x: x1 + 15, y: y1 - 30 - 3},
                    {x: x1 + 15, y: y1 - 30 + 3},
                    {x: x1, y: y1 - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: x0, y: y0 - 30},
                {x: x1 + 15 + 10, y: y0 - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: x0 - 15 - 40, y: y0 - 30},
                {x: x0 - 15, y: y0 - 30}
            ])).attr("id", "CADASketchJ").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CADASketchJ").attr("startOffset", "50%").text(j);

            // t
            svg.append("path").attr("d", line([
                {x: x0 - 40, y: y0},
                {x: x0 - 3, y: y0}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: x0 - 40, y: y0 + 0.707 * thk},
                {x: x0 - 3 + 0.707 * thk, y: y0 + 0.707 * thk}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: x0 - 30, y: y0},
                    {x: x0 - 30 - 3, y: y0 - 15},
                    {x: x0 - 30 + 3, y: y0 - 15},
                    {x: x0 - 30, y: y0}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: x0 - 30, y: y0 + 0.707 * thk},
                    {x: x0 - 30 - 3, y: y0 + 0.707 * thk + 15},
                    {x: x0 - 30 + 3, y: y0 + 0.707 * thk + 15},
                    {x: x0 - 30, y: y0 + 0.707 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: x0 - 30, y: y0 - 15 - 10},
                {x: x0 - 30, y: y0 + 0.707 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: x0 - 30, y: y0 + 0.707 * thk + 15 + 40},
                {x: x0 - 30, y: y0 + 0.707 * thk + 15}
            ])).attr("id", "CADASketchTHKJN").classed("sketch", true);
            svg.append("g").append("text")
                .attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CADASketchTHKJN").attr("startOffset", "50%").text(thkjn);

            // t
            dimLeftV(cx0 - delta - 3 - outerL, cy0 + innerL + 0.5 * thk, cx0 - delta - 3 - outerL, cy0 - innerL - 0.5 * thk, t, "CADASketchT");
            drawLine(cx0 - delta - 3 - outerL - 3, cy0 + innerL + 0.5 * thk, cx0 - delta - 3 - 3, cy0 + innerL + 0.5 * thk);
            drawLine(cx0 - delta - 3 - outerL - 3, cy0 - innerL - 0.5 * thk, cx0 - delta - 3 - 3, cy0 - innerL - 0.5 * thk);

        }

        currentTabIndex = cadad2d3.tabs('getTabIndex', cadad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cada2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cada").length > 0) {
                    cada2d();
                }
            });
        }
        cadad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cada2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cada").length > 0) {
                            cada2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 分隔式轴线型钢夹套校核",
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
                    $(ed.target).combobox("loadData", CADASCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CADASType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CADASSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CADASName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", CADAJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", CADAJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CADAJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CADAJName);
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
                    cadad2.empty();

                    // model
                    cadad3.empty();

                    // sketch
                    currentTabIndex = cadad2d3.tabs('getTabIndex', cadad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        cada2d();
                        cadad2.off("resize").on("resize", function () {
                            if ($("#cada").length > 0) {
                                cada2d();
                            }
                        });
                    }
                    cadad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cada2d();
                                cadad2.off("resize").on("resize", function () {
                                    if ($("#cada").length > 0) {
                                        cada2d();
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

                        CADADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CADASCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CADASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CADASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADASName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        CADAJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CADAJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CADAJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADAJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CADADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADASCategory = [];
                                CADAJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CADADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CADASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CADAJCategory[index] = {
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

                        CADASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CADASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CADASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADASCategoryVal,
                                temp: CADADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADASType = [];
                                $(result).each(function (index, element) {
                                    CADASType[index] = {
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

                        CADASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CADASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADASCategoryVal,
                                type: CADASTypeVal,
                                temp: CADADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADASSTD = [];
                                $(result).each(function (index, element) {
                                    CADASSTD[index] = {
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

                        CADASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CADASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADASCategoryVal,
                                type: CADASTypeVal,
                                std: CADASSTDVal,
                                temp: CADADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADASName = [];
                                $(result).each(function (index, element) {
                                    CADASName[index] = {
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

                        CADAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CADAJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CADAJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADAJCategoryVal,
                                temp: CADADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADAJType = [];
                                $(result).each(function (index, element) {
                                    CADAJType[index] = {
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

                        CADAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CADAJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADAJCategoryVal,
                                type: CADAJTypeVal,
                                temp: CADADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADAJSTD = [];
                                $(result).each(function (index, element) {
                                    CADAJSTD[index] = {
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

                        CADAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CADAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CADAJCategoryVal,
                                type: CADAJTypeVal,
                                std: CADAJSTDVal,
                                temp: CADADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CADAJName = [];
                                $(result).each(function (index, element) {
                                    CADAJName[index] = {
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
                            let CADATest = rows[1][columns[0][1].field];

                            // 筒体材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CADASNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取筒体材料密度、最大最小厚度
                                let CADASDensity, CADASThkMin, CADASThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CADASCategoryVal,
                                        "type": CADASTypeVal,
                                        "std": CADASSTDVal,
                                        "name": CADASNameVal,
                                        "temp": CADADT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        CADASDensity = parseFloat(result.density);
                                        CADASThkMin = parseFloat(result.thkMin);
                                        CADASThkMax = parseFloat(result.thkMax);

                                        // 筒体设计压力
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CADAPSD = parseFloat(rows[6][columns[0][1].field]);

                                            // 筒体静压力
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let CADAPSS = parseFloat(rows[7][columns[0][1].field]);

                                                // 筒体计算压力
                                                let CADAPSC = CADAPSD + CADAPSS;

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CADADSI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        cada2d("ϕ" + CADADSI);
                                                        cadad2.off("resize").on("resize", function () {
                                                            if ($("#cada").length > 0) {
                                                                cada2d("ϕ" + CADADSI);
                                                            }
                                                        });
                                                    }
                                                    cadad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                cada2d("ϕ" + CADADSI);
                                                                cadad2.off("resize").on("resize", function () {
                                                                    if ($("#cada").length > 0) {
                                                                        cada2d("ϕ" + CADADSI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CADASThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CADASThkMax) {
                                                        let CADATHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            cada2d("ϕ" + CADADSI, CADATHKSN);
                                                            cadad2.off("resize").on("resize", function () {
                                                                if ($("#cada").length > 0) {
                                                                    cada2d("ϕ" + CADADSI, CADATHKSN);
                                                                }
                                                            });
                                                        }
                                                        cadad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    cada2d("ϕ" + CADADSI, CADATHKSN);
                                                                    cadad2.off("resize").on("resize", function () {
                                                                        if ($("#cada").length > 0) {
                                                                            cada2d("ϕ" + CADADSI, CADATHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 筒体外直径
                                                        let CADADSO = CADADSI + 2 * CADATHKSN;

                                                        // 筒体材料物性
                                                        let CADASOT, CADASO, CADASOT1, CADASREL, CADACS1, CADAEST;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CADASCategoryVal,
                                                                "type": CADASTypeVal,
                                                                "std": CADASSTDVal,
                                                                "name": CADASNameVal,
                                                                "thk": CADATHKSN,
                                                                "temp": CADADT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CADADSO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CADASOT = parseFloat(result.ot);
                                                                if (CADASOT < 0) {
                                                                    south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADASO = parseFloat(result.o);
                                                                if (CADASO < 0) {
                                                                    south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADASREL = parseFloat(result.rel);
                                                                if (CADASREL < 0) {
                                                                    south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADACS1 = parseFloat(result.c1);
                                                                if (CADACS1 < 0) {
                                                                    south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADAEST = 1000 * parseFloat(result.et);
                                                                if (CADAEST < 0) {
                                                                    south.html("查询筒体材料弹性模量失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CADASOT1 = parseFloat(result.ot1);

                                                                // 焊接接头系数
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                                    let CADAES = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) < CADATHKSN) {
                                                                        let CADACS2 = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量
                                                                        let CADACS = CADACS1 + CADACS2;

                                                                        // 筒体有效厚度
                                                                        let CADATHKSE = CADATHKSN - CADACS;

                                                                        // 夹套材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let CADAJNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取夹套材料密度、最大最小厚度
                                                                            let CADAJDensity, CADAJThkMin, CADAJThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_gbt_150_2011_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": CADAJCategoryVal,
                                                                                    "type": CADAJTypeVal,
                                                                                    "std": CADAJSTDVal,
                                                                                    "name": CADAJNameVal,
                                                                                    "temp": CADADT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    CADAJDensity = parseFloat(result.density);
                                                                                    CADAJThkMin = parseFloat(result.thkMin);
                                                                                    CADAJThkMax = parseFloat(result.thkMax);

                                                                                    // 夹套设计压力
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let CADAPJD = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // 夹套静压力
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                            let CADAPJS = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // 夹套计算压力
                                                                                            let CADAPJC = CADAPJD + CADAPJS;

                                                                                            // 尺寸j
                                                                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                                                let CADAJ = parseFloat(rows[18][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ);
                                                                                                    cadad2.off("resize").on("resize", function () {
                                                                                                        if ($("#cada").length > 0) {
                                                                                                            cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cadad2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ);
                                                                                                            cadad2.off("resize").on("resize", function () {
                                                                                                                if ($("#cada").length > 0) {
                                                                                                                    cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                // 尺寸T
                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                    && parseFloat(rows[19][columns[0][1].field]) > CADAJ) {
                                                                                                    let CADAT = parseFloat(rows[19][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT);
                                                                                                        cadad2.off("resize").on("resize", function () {
                                                                                                            if ($("#cada").length > 0) {
                                                                                                                cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    cadad2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT);
                                                                                                                cadad2.off("resize").on("resize", function () {
                                                                                                                    if ($("#cada").length > 0) {
                                                                                                                        cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 三角形限制的最大厚度
                                                                                                    let CADALargeTHKJN = 0.707 * CADAJ;

                                                                                                    // 夹套名义厚度
                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) > CADAJThkMin
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.min(CADAJThkMax, CADALargeTHKJN)) {
                                                                                                        let CADATHKJN = parseFloat(rows[20][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT, CADATHKJN);
                                                                                                            cadad2.off("resize").on("resize", function () {
                                                                                                                if ($("#cada").length > 0) {
                                                                                                                    cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT, CADATHKJN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        cadad2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT, CADATHKJN);
                                                                                                                    cadad2.off("resize").on("resize", function () {
                                                                                                                        if ($("#cada").length > 0) {
                                                                                                                            cada2d("ϕ" + CADADSI, CADATHKSN, CADAJ, CADAT, CADATHKJN);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        // 夹套外直径
                                                                                                        let CADADJO = CADAJ;

                                                                                                        // 夹套材料物性
                                                                                                        let CADAJOT,
                                                                                                            CADAJO,
                                                                                                            CADAJOT1,
                                                                                                            CADAJREL,
                                                                                                            CADACJ1,
                                                                                                            CADAEJT;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": CADAJCategoryVal,
                                                                                                                "type": CADAJTypeVal,
                                                                                                                "std": CADAJSTDVal,
                                                                                                                "name": CADAJNameVal,
                                                                                                                "thk": CADATHKJN,
                                                                                                                "temp": CADADT,
                                                                                                                "highLow": 3,
                                                                                                                "isTube": 0,
                                                                                                                "od": CADADJO
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                CADAJOT = parseFloat(result.ot);
                                                                                                                if (CADAJOT < 0) {
                                                                                                                    south.html("查询夹套材料设计温度许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADAJO = parseFloat(result.o);
                                                                                                                if (CADAJO < 0) {
                                                                                                                    south.html("查询夹套材料常温许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADAJREL = parseFloat(result.rel);
                                                                                                                if (CADAJREL < 0) {
                                                                                                                    south.html("查询夹套材料常温屈服强度失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADACJ1 = parseFloat(result.c1);
                                                                                                                if (CADACJ1 < 0) {
                                                                                                                    south.html("查询夹套材料厚度负偏差失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADAEJT = 1000 * parseFloat(result.et);
                                                                                                                if (CADAEJT < 0) {
                                                                                                                    south.html("查询夹套材料弹性模量失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CADAJOT1 = parseFloat(result.ot1);

                                                                                                                // 夹套腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) < CADATHKJN) {
                                                                                                                    let CADACJ2 = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                    // 夹套厚度附加量
                                                                                                                    let CADACJ = CADACJ1 + CADACJ2;

                                                                                                                    // 夹套有效厚度
                                                                                                                    let CADATHKJE = CADATHKJN - CADACJ;

                                                                                                                    // 筒体计算厚度1
                                                                                                                    let CADATHKSC1 = CADAT * Math.sqrt(Math.max(CADAPSC, CADAPJC) / (2 * CADASOT * CADAES)) + (CADADSI * CADAPSC) / (8 * CADASOT * CADAES);

                                                                                                                    // 筒体计算厚度2
                                                                                                                    let CADATHKSC2 = (CADADSI * CADAPSC) / (2 * CADASOT * CADAES - CADAPSC);

                                                                                                                    // 容器筒体厚度
                                                                                                                    let CADATHKSC = Math.max(CADATHKSC1, CADATHKSC2);
                                                                                                                    let CADATHKSD = CADATHKSC + CADACS2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.html(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "容器筒体所需厚度：" + (CADATHKSD + CADACS1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 容器筒体厚度校核
                                                                                                                    let CADATHKSCHK;
                                                                                                                    if (CADATHKSN >= (CADATHKSD + CADACS1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADATHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADATHKSCHK = "合格";
                                                                                                                    } else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADATHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADATHKSCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 夹套计算厚度
                                                                                                                    let CADATHKJC = CADAJ * Math.sqrt(CADAPJC / (2 * CADASOT * CADAES));
                                                                                                                    let CADATHKJD = CADATHKJC + CADACJ2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套所需厚度：" + (CADATHKJD + CADACJ1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 容器筒体厚度校核
                                                                                                                    let CADATHKJCHK;
                                                                                                                    if (CADATHKJN >= (CADATHKJD + CADACJ1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADATHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADATHKJCHK = "合格";
                                                                                                                    } else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CADATHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CADATHKJCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 试验压力
                                                                                                                    let CADAPJT;
                                                                                                                    if (CADATest === "液压试验") {
                                                                                                                        CADAPJT = 1.25 * CADAPJD * Math.min(CADASO / Math.max(CADASOT, CADASOT1), CADAJO / Math.max(CADAJOT, CADAJOT1));
                                                                                                                    }
                                                                                                                    else if (CADATest === "气压试验") {
                                                                                                                        CADAPJT = 1.10 * CADAPJD * Math.min(CADASO / Math.max(CADASOT, CADASOT1), CADAJO / Math.max(CADAJOT, CADAJOT1));
                                                                                                                    }
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套试验压力：" + CADAPJT.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // docx
                                                                                                                    let CADAPayJS = $('#payjs');

                                                                                                                    function getDocx() {
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "cadadocx.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                ribbonName: "CADA",

                                                                                                                                dt: CADADT,
                                                                                                                                test: CADATest,
                                                                                                                                sstd: CADASSTDVal,
                                                                                                                                sname: CADASNameVal,
                                                                                                                                psd: CADAPSD,
                                                                                                                                pss: CADAPSS,
                                                                                                                                dsi: CADADSI,
                                                                                                                                thksn: CADATHKSN,
                                                                                                                                es: CADAES,
                                                                                                                                cs2: CADACS2,
                                                                                                                                jstd: CADAJSTDVal,
                                                                                                                                jname: CADAJNameVal,
                                                                                                                                pjd: CADAPJD,
                                                                                                                                pjs: CADAPJS,
                                                                                                                                j: CADAJ,
                                                                                                                                t: CADAT,
                                                                                                                                thkjn: CADATHKJN,
                                                                                                                                cj2: CADACJ2,
                                                                                                                                densitys: CADASDensity.toFixed(4),
                                                                                                                                densityj: CADAJDensity.toFixed(4),
                                                                                                                                ost: CADASOT.toFixed(4),
                                                                                                                                ojt: CADAJOT.toFixed(4),
                                                                                                                                os: CADASO.toFixed(4),
                                                                                                                                oj: CADAJO.toFixed(4),
                                                                                                                                ost1: CADASOT1.toFixed(4),
                                                                                                                                ojt1: CADAJOT1.toFixed(4),
                                                                                                                                rsel: CADASREL.toFixed(4),
                                                                                                                                rjel: CADAJREL.toFixed(4),
                                                                                                                                est: (CADAEST / 1000).toFixed(4),
                                                                                                                                ejt: (CADAEJT / 1000).toFixed(4),
                                                                                                                                cs1: CADACS1.toFixed(4),
                                                                                                                                cj1: CADACJ1.toFixed(4),
                                                                                                                                cs: CADACS.toFixed(4),
                                                                                                                                thkse: CADATHKSE.toFixed(4),
                                                                                                                                psc: CADAPSC.toFixed(4),
                                                                                                                                cj: CADACJ.toFixed(4),
                                                                                                                                thkje: CADATHKJE.toFixed(4),
                                                                                                                                pjc: CADAPJC.toFixed(4),
                                                                                                                                thksc1: CADATHKSC1.toFixed(4),
                                                                                                                                thksc2: CADATHKSC2.toFixed(4),
                                                                                                                                thksd: CADATHKSD.toFixed(4),
                                                                                                                                thkschk: CADATHKSCHK,
                                                                                                                                thkjc: CADATHKJC.toFixed(4),
                                                                                                                                thkjd: CADATHKJD.toFixed(4),
                                                                                                                                thkjchk: CADATHKJCHK,
                                                                                                                                pjt: CADAPJT.toFixed(4)
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
                                                                                                                                    CADAPayJS.dialog({
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
                                                                                                                                                CADAPayJS.dialog("close");
                                                                                                                                                CADAPayJS.dialog("clear");
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
                                                                                                                                                            CADAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                    CADAPayJS.dialog('close');
                                                                                                                                                                    CADAPayJS.dialog('clear');
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
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) >= CADATHKJN) {
                                                                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CADATHKJN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) <= CADAJThkMin) {
                                                                                                        south.html("夹套名义厚度不能小于等于 " + CADAJThkMin + " mm").css("color", "red");
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.min(CADAJThkMax, CADALargeTHKJN)) {
                                                                                                        south.html("夹套名义厚度不能大于 " + Math.min(CADAJThkMax, CADALargeTHKJN).toFixed(4) + " mm").css("color", "red");
                                                                                                    }
                                                                                                }
                                                                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                    && parseFloat(rows[19][columns[0][1].field]) <= CADAJ) {
                                                                                                    south.html("尺寸 t 不能小于等于 " + CADAJ + " mm").css("color", "red");
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
                                                                        && parseFloat(rows[11][columns[0][1].field]) >= CADATHKSN) {
                                                                        south.html("筒体腐蚀裕量不能大于等于 " + CADATHKSN + " mm").css("color", "red");
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
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CADASThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + CADASThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CADASThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + CADASThkMax + " mm").css("color", "red");
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