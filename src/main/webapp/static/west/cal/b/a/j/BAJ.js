$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bajd2 = $("#d2");
    let bajd3 = $("#d3");
    let bajd2d3 = $('#d2d3');

    $("#cal").html("<table id='baj'></table>");
    let pg = $("#baj");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/j/BAJ.json", function (result) {

        // 设计温度
        let BAJDT;

        // 材料
        let BAJBCategory, BAJBCategoryVal, BAJBType, BAJBTypeVal, BAJBSTD, BAJBSTDVal, BAJBName, BAJBNameVal,
            BAJFCategory, BAJFCategoryVal, BAJFType, BAJFTypeVal, BAJFSTD, BAJFSTDVal, BAJFName, BAJFNameVal;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function baj2d(dg = "Dg", bdb = "Db", lf = "Lf", thkn = "δn", la = "La", le = "Le", ld = "Ld", di = "Di") {

            bajd2.empty();

            let width = bajd2.width();
            let height = bajd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BAJSVG")
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
            let padding = 80;
            let gap = 40;
            let flangewidth = 40;
            let shellthk = 15;
            let gasketthk = 10;
            let radius = 10;
            let boltdistance = 50;

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

            /*
            左侧法兰正视图
             */
            // 法兰外边框
            drawLine(padding, padding, width / 2 - gap, padding);
            drawLine(width / 2 - gap, padding, width / 2 - gap, height - padding);
            drawLine(width / 2 - gap, height - padding, padding, height - padding);
            drawLine(padding, height - padding, padding, padding);
            // 法兰内边框
            drawLine(padding + flangewidth, padding + flangewidth, width / 2 - gap - flangewidth, padding + flangewidth);
            drawLine(width / 2 - gap - flangewidth, padding + flangewidth, width / 2 - gap - flangewidth, height - padding - flangewidth);
            drawLine(width / 2 - gap - flangewidth, height - padding - flangewidth, padding + flangewidth, height - padding - flangewidth);
            drawLine(padding + flangewidth, height - padding - flangewidth, padding + flangewidth, padding + flangewidth);
            // 筒体内壁
            drawLine(padding + flangewidth + shellthk, padding + flangewidth + shellthk, width / 2 - gap - flangewidth - shellthk, padding + flangewidth + shellthk);
            drawLine(width / 2 - gap - flangewidth - shellthk, padding + flangewidth + shellthk, width / 2 - gap - flangewidth - shellthk, height - padding - flangewidth - shellthk);
            drawLine(width / 2 - gap - flangewidth - shellthk, height - padding - flangewidth - shellthk, padding + flangewidth + shellthk, height - padding - flangewidth - shellthk);
            drawLine(padding + flangewidth + shellthk, height - padding - flangewidth - shellthk, padding + flangewidth + shellthk, padding + flangewidth + shellthk);
            // 中心线
            drawCenterLine((width / 2 - gap + padding) / 2, padding - 10, (width / 2 - gap + padding) / 2, height - padding + 10);
            drawCenterLine(padding - 10, height / 2, width / 2 - gap - (width / 2 - gap - padding) / 2 - 46, height / 2);
            drawCenterLine(width / 2 - gap - (width / 2 - gap - padding) / 2 - 23, height / 2, width / 2 - gap + 10, height / 2);
            drawCenterLine(padding + flangewidth / 2, padding + flangewidth / 2, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2);
            drawCenterLine(width / 2 - gap - flangewidth / 2, padding + flangewidth / 2, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2);
            drawCenterLine(width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2, padding + flangewidth / 2, height - padding - flangewidth / 2);
            drawCenterLine(padding + flangewidth / 2, height - padding - flangewidth / 2, padding + flangewidth / 2, padding + flangewidth / 2);
            // 螺栓圆及中心线
            drawArc(radius, radius, padding + flangewidth / 2, padding + flangewidth / 2 - radius, padding + flangewidth / 2, padding + flangewidth / 2 + radius);
            drawArc(radius, radius, padding + flangewidth / 2, padding + flangewidth / 2 + radius, padding + flangewidth / 2, padding + flangewidth / 2 - radius);
            drawArc(radius, radius, padding + flangewidth / 2 + boltdistance, padding + flangewidth / 2 - radius, padding + flangewidth / 2 + boltdistance, padding + flangewidth / 2 + radius);
            drawArc(radius, radius, padding + flangewidth / 2 + boltdistance, padding + flangewidth / 2 + radius, padding + flangewidth / 2 + boltdistance, padding + flangewidth / 2 - radius);
            drawCenterLine(padding + flangewidth / 2 + boltdistance, padding + flangewidth / 2 - radius - 8, padding + flangewidth / 2 + boltdistance, padding + flangewidth / 2 + radius + 8);
            drawArc(radius, radius, padding + flangewidth / 2, padding + flangewidth / 2 + boltdistance - radius, padding + flangewidth / 2, padding + flangewidth / 2 + boltdistance + radius);
            drawArc(radius, radius, padding + flangewidth / 2, padding + flangewidth / 2 + boltdistance + radius, padding + flangewidth / 2, padding + flangewidth / 2 + boltdistance - radius);
            drawCenterLine(padding + flangewidth / 2 - radius - 8, padding + flangewidth / 2 + boltdistance, padding + flangewidth / 2 + radius + 8, padding + flangewidth / 2 + boltdistance);

            drawArc(radius, radius, padding + flangewidth / 2, height - padding - flangewidth / 2 - radius, padding + flangewidth / 2, height - padding - flangewidth / 2 + radius);
            drawArc(radius, radius, padding + flangewidth / 2, height - padding - flangewidth / 2 + radius, padding + flangewidth / 2, height - padding - flangewidth / 2 - radius);
            drawArc(radius, radius, padding + flangewidth / 2 + boltdistance, height - padding - flangewidth / 2 - radius, padding + flangewidth / 2 + boltdistance, height - padding - flangewidth / 2 + radius);
            drawArc(radius, radius, padding + flangewidth / 2 + boltdistance, height - padding - flangewidth / 2 + radius, padding + flangewidth / 2 + boltdistance, height - padding - flangewidth / 2 - radius);
            drawCenterLine(padding + flangewidth / 2 + boltdistance, height - padding - flangewidth / 2 - radius - 8, padding + flangewidth / 2 + boltdistance, height - padding - flangewidth / 2 + radius + 8);
            drawArc(radius, radius, padding + flangewidth / 2, height - padding - flangewidth / 2 - boltdistance - radius, padding + flangewidth / 2, height - padding - flangewidth / 2 - boltdistance + radius);
            drawArc(radius, radius, padding + flangewidth / 2, height - padding - flangewidth / 2 - boltdistance + radius, padding + flangewidth / 2, height - padding - flangewidth / 2 - boltdistance - radius);
            drawCenterLine(padding + flangewidth / 2 - radius - 8, height - padding - flangewidth / 2 - boltdistance, padding + flangewidth / 2 + radius + 8, height - padding - flangewidth / 2 - boltdistance);

            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 - radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 + radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 + radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 - radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2 - boltdistance, padding + flangewidth / 2 - radius, width / 2 - gap - flangewidth / 2 - boltdistance, padding + flangewidth / 2 + radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2 - boltdistance, padding + flangewidth / 2 + radius, width / 2 - gap - flangewidth / 2 - boltdistance, padding + flangewidth / 2 - radius);
            drawCenterLine(width / 2 - gap - flangewidth / 2 - boltdistance, padding + flangewidth / 2 - radius - 8, width / 2 - gap - flangewidth / 2 - boltdistance, padding + flangewidth / 2 + radius + 8);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 + boltdistance - radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 + boltdistance + radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 + boltdistance + radius, width / 2 - gap - flangewidth / 2, padding + flangewidth / 2 + boltdistance - radius);
            drawCenterLine(width / 2 - gap - flangewidth / 2 - radius - 8, padding + flangewidth / 2 + boltdistance, width / 2 - gap - flangewidth / 2 + radius + 8, padding + flangewidth / 2 + boltdistance);

            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 - radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 + radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 + radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 - radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2 - boltdistance, height - padding - flangewidth / 2 - radius, width / 2 - gap - flangewidth / 2 - boltdistance, height - padding - flangewidth / 2 + radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2 - boltdistance, height - padding - flangewidth / 2 + radius, width / 2 - gap - flangewidth / 2 - boltdistance, height - padding - flangewidth / 2 - radius);
            drawCenterLine(width / 2 - gap - flangewidth / 2 - boltdistance, height - padding - flangewidth / 2 - radius - 8, width / 2 - gap - flangewidth / 2 - boltdistance, height - padding - flangewidth / 2 + radius + 8);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 - boltdistance - radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 - boltdistance + radius);
            drawArc(radius, radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 - boltdistance + radius, width / 2 - gap - flangewidth / 2, height - padding - flangewidth / 2 - boltdistance - radius);
            drawCenterLine(width / 2 - gap - flangewidth / 2 - radius - 8, height - padding - flangewidth / 2 - boltdistance, width / 2 - gap - flangewidth / 2 + radius + 8, height - padding - flangewidth / 2 - boltdistance);

            /*
            法兰截面
             */
            drawLine(width / 2 + gap, height / 2 - (height - 2 * padding) / 4, width / 2 + gap, height / 2 + (height - 2 * padding) / 4);
            drawLine(width / 2 + gap, height / 2 - (height - 2 * padding) / 4, width - padding - 2 * shellthk, height / 2 - (height - 2 * padding) / 4);
            drawLine(width - padding - 2 * shellthk, height / 2 - (height - 2 * padding) / 4, width - padding - shellthk, height / 2 - (height - 2 * padding) / 4 - shellthk);
            drawLine(width - padding - 2 * shellthk, height / 2 - (height - 2 * padding) / 4, width - padding - shellthk, height / 2 - (height - 2 * padding) / 4 + shellthk);
            drawLine(width / 2 + gap, height / 2 + (height - 2 * padding) / 4, width - padding - shellthk, height / 2 + (height - 2 * padding) / 4);
            drawLine(width - padding - shellthk, padding, width - padding - shellthk, height / 2 + (height - 2 * padding) / 4);
            drawLine(width - padding, padding, width - padding, height / 2 + (height - 2 * padding) / 4 - shellthk);
            drawLine(width - padding - shellthk, height / 2 + (height - 2 * padding) / 4 - shellthk, width - padding, height / 2 + (height - 2 * padding) / 4 - shellthk);
            drawLine(width / 2 + gap + gasketthk, height / 2 + (height - 2 * padding) / 4 + gasketthk, width - padding - shellthk - gasketthk, height / 2 + (height - 2 * padding) / 4 + gasketthk);
            drawLine(width - padding - shellthk - gasketthk, height / 2 + (height - 2 * padding) / 4 + gasketthk, width - padding - shellthk - gasketthk, height / 2 + (height - 2 * padding) / 4);
            drawLine(width / 2 + gap + gasketthk, height / 2 + (height - 2 * padding) / 4 + gasketthk, width / 2 + gap + gasketthk, height / 2 + (height - 2 * padding) / 4);
            let boltx = width / 2 + (width - 2 * padding) / 4;
            let boltr = 40;
            drawLine(boltx - boltr, height / 2 - (height - 2 * padding) / 4, boltx - boltr, height / 2 + (height - 2 * padding) / 4 + gasketthk);
            drawLine(boltx + boltr, height / 2 - (height - 2 * padding) / 4, boltx + boltr, height / 2 + (height - 2 * padding) / 4 + gasketthk);
            drawCenterLine(boltx, height / 2 - (height - 2 * padding) / 4 - 10, boltx, height / 2 + (height - 2 * padding) / 4 + gasketthk + 10);

            // dg
            svg.append("path").attr("d", line([
                {x: width / 2 + gap + gasketthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 40},
                {x: width / 2 + gap + gasketthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 3}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: boltx, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 40},
                {x: boltx, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 10 + 3}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + gap + gasketthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30},
                    {x: width / 2 + gap + gasketthk + 15, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 27},
                    {x: width / 2 + gap + gasketthk + 15, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 33},
                    {x: width / 2 + gap + gasketthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: boltx, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30},
                    {x: boltx - 15, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 27},
                    {x: boltx - 15, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 33},
                    {x: boltx, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 + gap + gasketthk + 15, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30},
                {x: boltx - 15, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30}
            ])).attr("id", "BAJSketchDG").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAJSketchDG").attr("startOffset", "50%").text(dg);

            // Db
            dimLeftV(padding + flangewidth / 2 - radius - 30, height - padding - flangewidth / 2, padding + flangewidth / 2 - radius - 30, padding + flangewidth / 2, bdb, "BAJSketchBDB");
            drawLine(padding + flangewidth / 2 - 3, padding + flangewidth / 2, padding + flangewidth / 2 - radius - 30 - 3, padding + flangewidth / 2);
            drawLine(padding + flangewidth / 2 - 3, height - padding - flangewidth / 2, padding + flangewidth / 2 - radius - 30 - 3, height - padding - flangewidth / 2);

            // lf
            svg.append("path").attr("d", line([
                {x: padding + flangewidth / 2 - radius - 10 - 30, y: height - padding - flangewidth / 2},
                {x: padding + flangewidth / 2 - radius - 10 - 3, y: height - padding - flangewidth / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + flangewidth / 2 - radius - 10 - 30, y: height - padding - flangewidth / 2 - boltdistance},
                {x: padding + flangewidth / 2 - radius - 10 - 3, y: height - padding - flangewidth / 2 - boltdistance}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + flangewidth / 2 - radius - 10 - 20, y: height - padding - flangewidth / 2},
                    {x: padding + flangewidth / 2 - radius - 10 - 17, y: height - padding - flangewidth / 2 + 15},
                    {x: padding + flangewidth / 2 - radius - 10 - 23, y: height - padding - flangewidth / 2 + 15},
                    {x: padding + flangewidth / 2 - radius - 10 - 20, y: height - padding - flangewidth / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {
                        x: padding + flangewidth / 2 - radius - 10 - 20,
                        y: height - padding - flangewidth / 2 - boltdistance
                    },
                    {
                        x: padding + flangewidth / 2 - radius - 10 - 17,
                        y: height - padding - flangewidth / 2 - boltdistance - 15
                    },
                    {
                        x: padding + flangewidth / 2 - radius - 10 - 23,
                        y: height - padding - flangewidth / 2 - boltdistance - 15
                    },
                    {
                        x: padding + flangewidth / 2 - radius - 10 - 20,
                        y: height - padding - flangewidth / 2 - boltdistance
                    }
                ]));
            svg.append("path").attr("d", line([
                {x: padding + flangewidth / 2 - radius - 10 - 20, y: height - padding - flangewidth / 2 + 25},
                {
                    x: padding + flangewidth / 2 - radius - 10 - 20,
                    y: height - padding - flangewidth / 2 - boltdistance - 25
                }
            ])).attr("id", "BAJSketchLF1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAJSketchLF1").attr("startOffset", "50%").text(lf);

            // lf
            svg.append("path").attr("d", line([
                {x: padding + flangewidth / 2, y: padding + flangewidth / 2 - 10},
                {x: padding + flangewidth / 2, y: padding + flangewidth / 2 - radius - 10 - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + flangewidth / 2 + boltdistance, y: padding + flangewidth / 2 - radius - 10 - 3},
                {x: padding + flangewidth / 2 + boltdistance, y: padding + flangewidth / 2 - radius - 10 - 40}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + flangewidth / 2, y: padding + flangewidth / 2 - radius - 10 - 30},
                    {x: padding + flangewidth / 2 - 15, y: padding + flangewidth / 2 - radius - 10 - 30 + 3},
                    {x: padding + flangewidth / 2 - 15, y: padding + flangewidth / 2 - radius - 10 - 30 - 3},
                    {x: padding + flangewidth / 2, y: padding + flangewidth / 2 - radius - 10 - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + flangewidth / 2 + boltdistance, y: padding + flangewidth / 2 - radius - 10 - 30},
                    {
                        x: padding + flangewidth / 2 + boltdistance + 15,
                        y: padding + flangewidth / 2 - radius - 10 - 30 + 3
                    },
                    {
                        x: padding + flangewidth / 2 + boltdistance + 15,
                        y: padding + flangewidth / 2 - radius - 10 - 30 - 3
                    },
                    {x: padding + flangewidth / 2 + boltdistance, y: padding + flangewidth / 2 - radius - 10 - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + flangewidth / 2 - 15 - 10, y: padding + flangewidth / 2 - radius - 10 - 30},
                {x: padding + flangewidth / 2 + boltdistance + 15 + 10, y: padding + flangewidth / 2 - radius - 10 - 30}
            ])).attr("id", "BAJSketchLF2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAJSketchLF2").attr("startOffset", "50%").text(lf);

            // thkn
            dimLeftV(width / 2 + gap, height / 2 + (height - 2 * padding) / 4, width / 2 + gap, height / 2 - (height - 2 * padding) / 4, thkn, "BAJSketchTHKN");

            // LA
            dimTopH(boltx, height / 2 - (height - 2 * padding) / 4 - 10, width - padding - 2 * shellthk, height / 2 - (height - 2 * padding) / 4 - 10, la, "BAJSketchLA");
            drawLine(width - padding - 2 * shellthk, height / 2 - (height - 2 * padding) / 4 - 13, width - padding - 2 * shellthk, height / 2 - (height - 2 * padding) / 4 - 3);

            // LE
            dimTopH(width / 2 + gap, height / 2 - (height - 2 * padding) / 4 - 10, boltx, height / 2 - (height - 2 * padding) / 4 - 10, le, "BAJSketchLE");
            drawLine(width / 2 + gap, height / 2 - (height - 2 * padding) / 4 - 13, width / 2 + gap, height / 2 - (height - 2 * padding) / 4 - 3);

            // LD
            svg.append("path").attr("d", line([
                {x: boltx, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30},
                {x: width - padding - shellthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30}
            ])).attr("id", "BAJSketchLD").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAJSketchLD").attr("startOffset", "50%").text(ld);

            // DI
            dimLeftV(width / 2 - gap - (width / 2 - gap - padding) / 2, height - (padding + flangewidth),
                width / 2 - gap - (width / 2 - gap - padding) / 2, padding + flangewidth, di, "BAJSketchDI1");

            svg.append("path").attr("d", line([
                {x: width - padding - shellthk, y: height / 2 + (height - 2 * padding) / 4 + 3},
                {x: width - padding - shellthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 40}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - shellthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30},
                    {
                        x: width - padding - shellthk + 15,
                        y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30 + 3
                    },
                    {
                        x: width - padding - shellthk + 15,
                        y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30 - 3
                    },
                    {x: width - padding - shellthk, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width - padding - shellthk + 15, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30},
                {x: width - padding - shellthk + 15 + 40, y: height / 2 + (height - 2 * padding) / 4 + gasketthk + 30}
            ])).attr("id", "BAJSketchDI2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAJSketchDI2").attr("startOffset", "50%").text(di);

        }

        currentTabIndex = bajd2d3.tabs('getTabIndex', bajd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baj2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baj").length > 0) {
                    baj2d();
                }
            });
        }
        bajd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baj2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baj").length > 0) {
                            baj2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 矩形法兰内压计算",
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
                if (index === 6) {
                    $(ed.target).combobox("loadData", BAJBCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAJBType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAJBSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAJBName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BAJFCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAJFType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAJFSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAJFName);
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
                    bajd2.empty();

                    // model
                    bajd3.empty();

                    // sketch
                    currentTabIndex = bajd2d3.tabs('getTabIndex', bajd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baj2d();
                        bajd2.off("resize").on("resize", function () {
                            if ($("#baj").length > 0) {
                                baj2d();
                            }
                        });
                    }
                    bajd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baj2d();
                                bajd2.off("resize").on("resize", function () {
                                    if ($("#baj").length > 0) {
                                        baj2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // 温度改变，加载 category
                    if (index === 1) {

                        BAJDT = parseFloat(changes.value);

                        // category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAJBCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAJBType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAJBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAJBName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAJFCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAJFType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAJFSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAJFName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAJBCategory = [];
                                BAJFCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAJDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAJBCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAJFCategory[index] = {
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

                    // category 改变，加载type
                    if (index === 6) {

                        BAJBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAJBType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAJBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAJBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAJBCategoryVal,
                                temp: BAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAJBType = [];
                                $(result).each(function (index, element) {
                                    BAJBType[index] = {
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

                    // type 改变，加载 std
                    if (index === 7) {

                        BAJBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAJBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAJBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAJBCategoryVal,
                                type: BAJBTypeVal,
                                temp: BAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAJBSTD = [];
                                $(result).each(function (index, element) {
                                    BAJBSTD[index] = {
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

                    // std 改变，加载 Name
                    if (index === 8) {

                        BAJBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAJBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAJBCategoryVal,
                                type: BAJBTypeVal,
                                std: BAJBSTDVal,
                                temp: BAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAJBName = [];
                                $(result).each(function (index, element) {
                                    BAJBName[index] = {
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

                    // category 改变，加载type
                    if (index === 14) {

                        BAJFCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAJFType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAJFSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAJFName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAJFCategoryVal,
                                temp: BAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAJFType = [];
                                $(result).each(function (index, element) {
                                    BAJFType[index] = {
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

                    // type 改变，加载 std
                    if (index === 15) {

                        BAJFTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAJFSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAJFName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAJFCategoryVal,
                                type: BAJFTypeVal,
                                temp: BAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAJFSTD = [];
                                $(result).each(function (index, element) {
                                    BAJFSTD[index] = {
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

                    // std 改变，加载 Name
                    if (index === 16) {

                        BAJFSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAJFName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAJFCategoryVal,
                                type: BAJFTypeVal,
                                std: BAJFSTDVal,
                                temp: BAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAJFName = [];
                                $(result).each(function (index, element) {
                                    BAJFName[index] = {
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

                    // 业务逻辑
                    let BAJPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        BAJPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let BAJPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAJPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 计算压力
                    let BAJPC = BAJPD + BAJPS;

                    // 试验类型
                    let BAJTest;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        BAJTest = rows[3][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 垫片材料
                    let BAJGNameVal;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BAJGNameVal = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 垫片 m、y
                    let BAJM, BAJY;
                    if (BAJGNameVal === "合成橡胶板(HS<75)") {
                        BAJM = 0.5;
                        BAJY = 0;
                    }
                    else if (BAJGNameVal === "合成橡胶板(HS≥75)") {
                        BAJM = 1;
                        BAJY = 1.4;
                    }
                    else if (BAJGNameVal === "石棉(橡胶)板,δ=3") {
                        BAJM = 2;
                        BAJY = 11;
                    }
                    else if (BAJGNameVal === "石棉(橡胶)板,δ=1.5") {
                        BAJM = 2.75;
                        BAJY = 25.5;
                    }
                    else if (BAJGNameVal === "棉纤维橡胶板,δ≥1.5") {
                        BAJM = 1.25;
                        BAJY = 2.8;
                    }
                    else if (BAJGNameVal === "植物纤维板,δ≥1.5") {
                        BAJM = 1.75;
                        BAJY = 7.6;
                    }
                    else {
                        return false;
                    }

                    // 外侧垫片宽度 DG
                    let BAJDG;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        BAJDG = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baj2d(BAJDG);
                        bajd2.off("resize").on("resize", function () {
                            if ($("#baj").length > 0) {
                                baj2d(BAJDG);
                            }
                        });
                    }
                    bajd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baj2d(BAJDG);
                                bajd2.off("resize").on("resize", function () {
                                    if ($("#baj").length > 0) {
                                        baj2d(BAJDG);
                                    }
                                });
                            }
                        }
                    });

                    // 螺栓材料名称
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        BAJBNameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取螺栓材料密度、最大最小厚度
                    let BAJDensityB, BAJBThkMin, BAJBThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAJBCategoryVal,
                            "type": BAJBTypeVal,
                            "std": BAJBSTDVal,
                            "name": BAJBNameVal,
                            "temp": BAJDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAJDensityB = parseFloat(result.density);
                            BAJBThkMin = parseFloat(result.thkMin);
                            BAJBThkMax = parseFloat(result.thkMax);

                            // 螺纹规格
                            let BAJSDB;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field].substring(1)) > BAJBThkMin
                                && parseFloat(rows[10][columns[0][1].field].substring(1)) <= BAJBThkMax) {
                                BAJSDB = rows[10][columns[0][1].field];
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field].substring(1)) <= BAJBThkMin) {
                                south.html("螺栓规格不得小于等于 M" + BAJBThkMin).css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field].substring(1)) > BAJBThkMax) {
                                south.html("螺栓规格不得大于 M" + BAJBThkMax).css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 获取螺纹小径
                            let BAJDMIN, BAJLFMin, BAJLEMin, BAJLAMin;
                            if (BAJSDB === "M12") {
                                BAJDMIN = 10.106;
                                BAJLFMin = 32;
                                BAJLEMin = 16;
                                BAJLAMin = 16;
                            }
                            else if (BAJSDB === "M16") {
                                BAJDMIN = 13.835;
                                BAJLFMin = 38;
                                BAJLEMin = 18;
                                BAJLAMin = 20;
                            }
                            else if (BAJSDB === "M20") {
                                BAJDMIN = 17.294;
                                BAJLFMin = 46;
                                BAJLEMin = 20;
                                BAJLAMin = 24;
                            }
                            else if (BAJSDB === "M22") {
                                BAJDMIN = 19.294;
                                BAJLFMin = 52;
                                BAJLEMin = 24;
                                BAJLAMin = 26;
                            }
                            else if (BAJSDB === "M24") {
                                BAJDMIN = 20.752;
                                BAJLFMin = 56;
                                BAJLEMin = 26;
                                BAJLAMin = 28;
                            }
                            else if (BAJSDB === "M27") {
                                BAJDMIN = 23.752;
                                BAJLFMin = 62;
                                BAJLEMin = 28;
                                BAJLAMin = 31;
                            }
                            else if (BAJSDB === "M30") {
                                BAJDMIN = 26.211;
                                BAJLFMin = 70;
                                BAJLEMin = 30;
                                BAJLAMin = 36;
                            }
                            else if (BAJSDB === "M36") {
                                BAJDMIN = 31.670;
                                BAJLFMin = 80;
                                BAJLEMin = 36;
                                BAJLAMin = 39;
                            }
                            else {
                                return false;
                            }

                            // 螺栓力学性能
                            let BAJOBT, BAJOB, BAJRBEL, BAJCB1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAJBCategoryVal,
                                    "type": BAJBTypeVal,
                                    "std": BAJBSTDVal,
                                    "name": BAJBNameVal,
                                    "thk": parseFloat(BAJSDB.substring(1)),
                                    "temp": BAJDT,
                                    "highLow": 2,
                                    "isTube": 0,
                                    "od": parseFloat(BAJSDB.substring(1))
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计应力
                                    BAJOBT = parseFloat(result.ot);
                                    if (BAJOBT < 0) {
                                        south.html("查询螺栓材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    BAJOB = parseFloat(result.o);
                                    if (BAJOB < 0) {
                                        south.html("查询螺栓材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    BAJRBEL = parseFloat(result.rel);
                                    if (BAJRBEL < 0) {
                                        south.html("查询螺栓材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    BAJCB1 = parseFloat(result.c1);
                                    if (BAJCB1 < 0) {
                                        south.html("查询螺栓材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 无螺纹部分小径 dm
                                    let BAJDM;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) > BAJBThkMin
                                        && parseFloat(rows[11][columns[0][1].field]) <= BAJBThkMax) {
                                        BAJDM = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) <= BAJBThkMin) {
                                        south.html("螺栓无螺纹部分最小直径不得小于等于 " + BAJBThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) > BAJBThkMax) {
                                        south.html("螺栓无螺纹部分最小直径不得大于 " + BAJBThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // BDb
                                    let BAJBDB;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) > parseFloat(BAJSDB.substring(1))) {
                                        BAJBDB = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) <= parseFloat(BAJSDB.substring(1))) {
                                        south.html("法兰短边螺栓中心距 Db 不得小于等于 " + parseFloat(BAJSDB.substring(1)) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baj2d(BAJDG, BAJBDB);
                                        bajd2.off("resize").on("resize", function () {
                                            if ($("#baj").length > 0) {
                                                baj2d(BAJDG, BAJBDB);
                                            }
                                        });
                                    }
                                    bajd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baj2d(BAJDG, BAJBDB);
                                                bajd2.off("resize").on("resize", function () {
                                                    if ($("#baj").length > 0) {
                                                        baj2d(BAJDG, BAJBDB);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // lf
                                    let BAJLF;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > parseFloat(BAJSDB.substring(1))
                                        && parseFloat(rows[13][columns[0][1].field]) <= BAJBDB) {
                                        BAJLF = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) <= parseFloat(BAJSDB.substring(1))) {
                                        south.html("相邻螺栓间距 L<sub>F</sub> 不得小于等于 " + parseFloat(BAJSDB.substring(1)) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > BAJBDB) {
                                        south.html("相邻螺栓间距 L<sub>F</sub> 不得大于 " + BAJBDB + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baj2d(BAJDG, BAJBDB, BAJLF);
                                        bajd2.off("resize").on("resize", function () {
                                            if ($("#baj").length > 0) {
                                                baj2d(BAJDG, BAJBDB, BAJLF);
                                            }
                                        });
                                    }
                                    bajd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baj2d(BAJDG, BAJBDB, BAJLF);
                                                bajd2.off("resize").on("resize", function () {
                                                    if ($("#baj").length > 0) {
                                                        baj2d(BAJDG, BAJBDB, BAJLF);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 法兰材料名称
                                    if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                        BAJFNameVal = rows[17][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取法兰材料密度、最大最小厚度
                                    let BAJDensityF, BAJFThkMin, BAJFThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAJFCategoryVal,
                                            "type": BAJFTypeVal,
                                            "std": BAJFSTDVal,
                                            "name": BAJFNameVal,
                                            "temp": BAJDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAJDensityF = parseFloat(result.density);
                                            BAJFThkMin = parseFloat(result.thkMin);
                                            BAJFThkMax = parseFloat(result.thkMax);

                                            // 法兰名义厚度
                                            let BAJTHKN;
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > BAJFThkMin
                                                && parseFloat(rows[18][columns[0][1].field]) <= BAJFThkMax) {
                                                BAJTHKN = parseFloat(rows[18][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) <= BAJFThkMin) {
                                                south.html("法兰名义厚度不能小于等于 " + BAJFThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > BAJFThkMax) {
                                                south.html("法兰名义厚度不能大于 " + BAJFThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN);
                                                bajd2.off("resize").on("resize", function () {
                                                    if ($("#baj").length > 0) {
                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN);
                                                    }
                                                });
                                            }
                                            bajd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN);
                                                        bajd2.off("resize").on("resize", function () {
                                                            if ($("#baj").length > 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let BAJOFT, BAJOF, BAJRFEL, BAJCF1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAJFCategoryVal,
                                                    "type": BAJFTypeVal,
                                                    "std": BAJFSTDVal,
                                                    "name": BAJFNameVal,
                                                    "thk": BAJTHKN,
                                                    "temp": BAJDT,
                                                    "highLow": 2,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    // 设计应力
                                                    BAJOFT = parseFloat(result.ot);
                                                    if (BAJOFT < 0) {
                                                        south.html("查询法兰材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 常温应力
                                                    BAJOF = parseFloat(result.o);
                                                    if (BAJOF < 0) {
                                                        south.html("查询法兰材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 常温屈服强度
                                                    BAJRFEL = parseFloat(result.rel);
                                                    if (BAJRFEL < 0) {
                                                        south.html("查询法兰材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 厚度负偏差
                                                    BAJCF1 = parseFloat(result.c1);
                                                    if (BAJCF1 < 0) {
                                                        south.html("查询法兰材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 腐蚀裕量
                                                    let BAJCF2;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAJTHKN) {
                                                        BAJCF2 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAJTHKN) {
                                                        south.html("法兰腐蚀裕量不能大于等于 " + BAJTHKN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // LA
                                                    let BAJLA;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                        BAJLA = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA);
                                                        bajd2.off("resize").on("resize", function () {
                                                            if ($("#baj").length > 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA);
                                                            }
                                                        });
                                                    }
                                                    bajd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA);
                                                                bajd2.off("resize").on("resize", function () {
                                                                    if ($("#baj").length > 0) {
                                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // LE
                                                    let BAJLE;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        BAJLE = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE);
                                                        bajd2.off("resize").on("resize", function () {
                                                            if ($("#baj").length > 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE);
                                                            }
                                                        });
                                                    }
                                                    bajd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE);
                                                                bajd2.off("resize").on("resize", function () {
                                                                    if ($("#baj").length > 0) {
                                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // LD
                                                    let BAJLD;
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        BAJLD = parseFloat(rows[22][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD);
                                                        bajd2.off("resize").on("resize", function () {
                                                            if ($("#baj").length > 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD);
                                                            }
                                                        });
                                                    }
                                                    bajd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD);
                                                                bajd2.off("resize").on("resize", function () {
                                                                    if ($("#baj").length > 0) {
                                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // DI
                                                    let BAJDI;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) < BAJBDB) {
                                                        BAJDI = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) >= BAJBDB) {
                                                        south.html("短边截面内侧距离 Di 不能大于等于 " + BAJBDB + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD, BAJDI);
                                                        bajd2.off("resize").on("resize", function () {
                                                            if ($("#baj").length > 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD, BAJDI);
                                                            }
                                                        });
                                                    }
                                                    bajd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD, BAJDI);
                                                                bajd2.off("resize").on("resize", function () {
                                                                    if ($("#baj").length > 0) {
                                                                        baj2d(BAJDG, BAJBDB, BAJLF, BAJTHKN, BAJLA, BAJLE, BAJLD, BAJDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 法兰厚度附加量
                                                    let BAJCF = BAJCF1 + BAJCF2;

                                                    // 法兰有效厚度
                                                    let BAJTHKF = BAJTHKN - BAJCF;

                                                    // D
                                                    let BAJD = BAJDI + 2 * BAJLD + 2 * Math.min(BAJDG, BAJLE);

                                                    // BO
                                                    let BAJBO = BAJD - BAJBDB;

                                                    // 垫片预紧状态
                                                    let BAJB = 4 * Math.sqrt(BAJBO);
                                                    let BAJFG = BAJLF * BAJB * BAJY;

                                                    // 垫片操作状态
                                                    let BAJTWOB = 5;
                                                    let BAJFP = BAJTWOB * BAJLF * BAJM * BAJPC;

                                                    // 螺栓
                                                    let BAJLFMax = 3 * parseFloat(BAJSDB.substring(1)) + 2 * BAJTHKF;

                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "允许的相邻螺栓间距范围：[" + BAJLFMin.toFixed(2) + ", " + BAJLFMax.toFixed(2) + "]" +
                                                        "</span>");

                                                    // 螺栓间距校核
                                                    let BAJLFCHK;
                                                    if (BAJLF >= BAJLFMin && BAJLF <= BAJLFMax) {
                                                        BAJLFCHK = "合格";
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际螺栓间距：" + BAJLF.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        BAJLFCHK = "不合格";
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际螺栓间距：" + BAJLF.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }

                                                    // 预紧状态螺栓面积
                                                    let BAJWA = BAJFG;
                                                    let BAJAA = BAJWA / BAJOB;

                                                    // 操作状态螺栓面积
                                                    let BAJLT = 0.25 * (BAJBDB - BAJDI + parseFloat(BAJSDB.substring(1)) + BAJTWOB);
                                                    let BAJLP = 0.5 * (parseFloat(BAJSDB.substring(1)) + BAJTWOB);
                                                    let BAJLR = 0.25 * (BAJD - BAJBDB + parseFloat(BAJSDB.substring(1)));
                                                    let BAJFD = 0.5 * BAJDI * BAJLF * BAJPC;
                                                    let BAJF = 0.5 * (BAJBDB - parseFloat(BAJSDB.substring(1))) * BAJLF * BAJPC;
                                                    let BAJFT = BAJF - BAJFD;
                                                    let BAJFR = (BAJFD * BAJLD + BAJFP * BAJLP + BAJFT * BAJLT) / BAJLR;
                                                    let BAJWP = BAJF + BAJFP + BAJFR;
                                                    let BAJAP = BAJWP / BAJOBT;

                                                    // 螺栓面积校核
                                                    let BAJAM = Math.max(BAJAA, BAJAP);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "所需螺栓截面积：" + BAJAM.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    let BAJAB = 0.785 * Math.min(BAJDM, BAJDMIN) * Math.min(BAJDM, BAJDMIN);

                                                    // 螺栓间距校核
                                                    let BAJABCHK;
                                                    if (BAJAB >= BAJAM) {
                                                        BAJABCHK = "合格";
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际螺栓截面积：" + BAJAB.toFixed(2) + " mm²" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        BAJABCHK = "不合格";
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际螺栓截面积：" + BAJAB.toFixed(2) + " mm²" +
                                                            "</span>");
                                                    }

                                                    // LA 校核
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "L<sub>A</sub> 许用最小距离：" + BAJLAMin.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAJLACHK;
                                                    if (BAJLA >= BAJLAMin) {
                                                        BAJLACHK = "合格";
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "L<sub>A</sub> 实际距离：" + BAJLA.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        BAJLACHK = "不合格";
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "L<sub>A</sub> 实际距离：" + BAJLA.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }

                                                    // LE 校核
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "Le 许用最小距离：" + BAJLEMin.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAJLECHK;
                                                    if (BAJLE >= BAJLEMin) {
                                                        BAJLECHK = "合格";
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "Le 实际距离：" + BAJLE.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        BAJLECHK = "不合格";
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "Le 实际距离：" + BAJLE.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }

                                                    // 法兰厚度校核
                                                    let BAJMO = BAJFR * BAJLR;
                                                    let BAJTHKFC = Math.sqrt(6 * BAJMO / ((BAJLF - parseFloat(BAJSDB.substring(1))) * BAJOFT));
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "法兰计算厚度：" + BAJTHKFC.toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAJTHKFCHK;
                                                    if (BAJTHKF >= BAJTHKFC) {
                                                        BAJTHKFCHK = "合格";
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "法兰有效厚度：" + BAJTHKF.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        BAJTHKFCHK = "不合格";
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "法兰实际有效厚度：" + BAJTHKF.toFixed(2) + " mm" +
                                                            "</span>");
                                                    }

                                                    // 试验压力
                                                    let BAJETA, BAJPFT, BAJPBT, BAJPT;
                                                    if (BAJTest === "液压试验") {
                                                        BAJETA = 1.25;
                                                        BAJPFT = Math.max(BAJETA * BAJPD * BAJOF / BAJOFT, 0.05);
                                                        BAJPBT = Math.max(BAJETA * BAJPD * BAJOB / BAJOBT, 0.05);
                                                        BAJPT = Math.min(BAJPFT, BAJPBT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "压力试验：" + "液压/" + BAJPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        BAJETA = 1.10;
                                                        BAJPFT = Math.max(BAJETA * BAJPD * BAJOF / BAJOFT, 0.05);
                                                        BAJPBT = Math.max(BAJETA * BAJPD * BAJOB / BAJOBT, 0.05);
                                                        BAJPT = Math.min(BAJPFT, BAJPBT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "压力试验：" + "气压/" + BAJPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }

                                                    // docx
                                                    let BAJPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "bajdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "BAJ",

                                                                pd: BAJPD,
                                                                t: BAJDT,
                                                                ps: BAJPS,

                                                                gm: BAJGNameVal,
                                                                dg: BAJDG,

                                                                bstd: BAJBSTDVal,
                                                                bname: BAJBNameVal,
                                                                sdb: parseFloat(BAJSDB.substring(1)),
                                                                dm: BAJDM,
                                                                bdb: BAJBDB,
                                                                lf: BAJLF,

                                                                fstd: BAJFSTDVal,
                                                                fname: BAJFNameVal,
                                                                thkn: BAJTHKN,
                                                                cf2: BAJCF2,
                                                                la: BAJLA,
                                                                le: BAJLE,
                                                                ld: BAJLD,
                                                                di: BAJDI,

                                                                test: BAJTest,

                                                                densityf: BAJDensityF.toFixed(4),
                                                                rfel: BAJRFEL.toFixed(4),
                                                                oft: BAJOFT.toFixed(4),
                                                                of: BAJOF.toFixed(4),
                                                                cf1: BAJCF1.toFixed(4),

                                                                densityb: BAJDensityB.toFixed(4),
                                                                rbel: BAJRBEL.toFixed(4),
                                                                obt: BAJOBT.toFixed(4),
                                                                ob: BAJOB.toFixed(4),
                                                                cb1: BAJCB1.toFixed(4),

                                                                m: BAJM.toFixed(4),
                                                                y: BAJY.toFixed(4),

                                                                pc: BAJPC.toFixed(4),
                                                                cf: BAJCF.toFixed(4),
                                                                thkf: BAJTHKF.toFixed(4),
                                                                d: BAJD.toFixed(4),
                                                                bo: BAJBO.toFixed(4),

                                                                b: BAJB.toFixed(4),
                                                                fg: BAJFG.toFixed(4),

                                                                twob: BAJTWOB.toFixed(4),
                                                                fp: BAJFP.toFixed(4),

                                                                lfmin: BAJLFMin.toFixed(4),
                                                                lfmax: BAJLFMax.toFixed(4),
                                                                lfchk: BAJLFCHK,

                                                                wa: BAJWA.toFixed(4),
                                                                aa: BAJAA.toFixed(4),

                                                                lt: BAJLT.toFixed(4),
                                                                lp: BAJLP.toFixed(4),
                                                                lr: BAJLR.toFixed(4),
                                                                fd: BAJFD.toFixed(4),
                                                                ft: BAJFT.toFixed(4),
                                                                fr: BAJFR.toFixed(4),
                                                                f: BAJF.toFixed(4),
                                                                wp: BAJWP.toFixed(4),
                                                                ap: BAJAP.toFixed(4),

                                                                am: BAJAM.toFixed(4),
                                                                dmin: BAJDMIN.toFixed(4),
                                                                ab: BAJAB.toFixed(4),
                                                                abchk: BAJABCHK,

                                                                lamin: BAJLAMin.toFixed(4),
                                                                lachk: BAJLACHK,
                                                                lemin: BAJLEMin.toFixed(4),
                                                                lechk: BAJLECHK,
                                                                mo: BAJMO.toFixed(4),
                                                                thkfc: BAJTHKFC.toFixed(4),
                                                                thkfchk: BAJTHKFCHK,

                                                                eta: BAJETA.toFixed(4),
                                                                pft: BAJPFT.toFixed(4),
                                                                pbt: BAJPBT.toFixed(4),
                                                                pt: BAJPT.toFixed(4)
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
                                                                    BAJPayJS.dialog({
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
                                                                                BAJPayJS.dialog("close");
                                                                                BAJPayJS.dialog("clear");
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
                                                                                            BAJPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    BAJPayJS.dialog('close');
                                                                                                    BAJPayJS.dialog('clear');
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
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});