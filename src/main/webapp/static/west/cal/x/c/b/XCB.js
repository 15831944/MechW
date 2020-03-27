$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xcbSketch = $("#d2");
    let xcbModel = $("#d3");
    let xcbd2d3 = $('#d2d3');

    $("#cal").html("<table id='xcb'></table>");
    let pg = $("#xcb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/c/b/XCB.json", function (result) {

        let XCBDT = 20,
            XCBCategory, XCBCategoryVal,
            XCBType, XCBTypeVal,
            XCBSTD, XCBSTDVal,
            XCBName,
            columns, rows, ed;

        function xcb2d(thkn = "δn", d = "ϕD", r = "R", l = "L") {

            xcbSketch.empty();

            let width = xcbSketch.width();
            let height = xcbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XCBSVG").attr("height", height);

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

            // 图形边距
            let padding = 100;

            // 吊孔圆心
            let hcx = width / 2;
            let hcy = padding + (height - 2 * padding) / 10;

            // 吊孔圆半径
            let hro = Math.min((height - 2 * padding) / 4, (width - 2 * padding) / 4);
            let hri = hro / 2;

            // 内孔
            svg.append("path").attr("d", "M "
                + (hcx) + " " + (hcy - hri) + " "
                + "A" + hri + " " + hri + " "
                + "1 0 1" + " "
                + (hcx) + " " + (hcy + hri)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (hcx) + " " + (hcy + hri) + " "
                + "A" + hri + " " + hri + " "
                + "1 0 1" + " "
                + (hcx) + " " + (hcy - hri)
            ).classed("sketch", true);

            // 外弧
            svg.append("path").attr("d", "M "
                + (hcx - hro * Math.cos(20 / 180 * Math.PI)) + " " + (hcy - hro * Math.sin(20 / 180 * Math.PI)) + " "
                + "A" + hro + " " + hro + " "
                + "1 0 1" + " "
                + (hcx + hro * Math.cos(20 / 180 * Math.PI)) + " " + (hcy - hro * Math.sin(20 / 180 * Math.PI))
            ).classed("sketch", true);

            // 吊耳中心线与封头外壁交点
            let crossx = hcx;
            let crossy = hcy + hro / Math.sin(20 / 180 * Math.PI) * Math.sin(50 / 180 * Math.PI);

            let leftEndX = hcx - hro / Math.sin(20 / 180 * Math.PI) * Math.sin(40 / 180 * Math.PI);
            let leftEndY = hcy + hro / Math.sin(20 / 180 * Math.PI) * Math.sin(50 / 180 * Math.PI);
            drawLine(crossx - hro * Math.cos(20 / 180 * Math.PI), hcy - hro * Math.sin(20 / 180 * Math.PI), leftEndX, leftEndY);

            let rightEndX = hcx + hro / Math.sin(20 / 180 * Math.PI) * Math.sin(40 / 180 * Math.PI);
            let rightEndY = hcy + hro / Math.sin(20 / 180 * Math.PI) * Math.sin(50 / 180 * Math.PI);
            drawLine(crossx + hro * Math.cos(20 / 180 * Math.PI), hcy - hro * Math.sin(20 / 180 * Math.PI), rightEndX, rightEndY);

            drawLine(leftEndX, leftEndY, rightEndX, rightEndY);

            // 中心线
            drawCenterLine(hcx, hcy - hro - 10, hcx, (leftEndY + rightEndY) / 2 + 10 + 10);
            drawCenterLine(hcx - hro - 10, hcy, hcx + hro + 10, hcy);

            // 标注 L
            extLineRightH(rightEndX, hcy);
            extLineRightH(rightEndX + 15, (leftEndY + rightEndY) / 2);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: rightEndX + 15 + 30, y: hcy},
                    {x: rightEndX + 15 + 27, y: hcy + 15},
                    {x: rightEndX + 15 + 33, y: hcy + 15},
                    {x: rightEndX + 15 + 30, y: hcy}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: rightEndX + 15 + 30, y: (leftEndY + rightEndY) / 2},
                    {x: rightEndX + 15 + 27, y: (leftEndY + rightEndY) / 2 - 15},
                    {x: rightEndX + 15 + 33, y: (leftEndY + rightEndY) / 2 - 15},
                    {x: rightEndX + 15 + 30, y: (leftEndY + rightEndY) / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: rightEndX + 15 + 30, y: (leftEndY + rightEndY) / 2 - 15},
                {x: rightEndX + 15 + 30, y: hcy + 15}
            ])).attr("id", "XCBSketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketchL")
                .attr("startOffset", "50%").text(l);
            drawLine(hcx + hro + 10 + 3, hcy, rightEndX + 3, hcy);
            drawLine(rightEndX + 3, (leftEndY + rightEndY) / 2, rightEndX + 3, (leftEndY + rightEndY) / 2);
            drawLine(leftEndX, leftEndY, leftEndX - 15, leftEndY);
            drawLine(leftEndX - 15, leftEndY, leftEndX - 15, leftEndY + 10);
            drawLine(rightEndX, rightEndY, rightEndX + 15, rightEndY);
            drawLine(rightEndX + 15, rightEndY, rightEndX + 15, rightEndY + 10);
            drawLine(leftEndX - 15, leftEndY + 10, rightEndX + 15, rightEndY + 10);
            drawLine(rightEndX + 40, hcy, rightEndX + 40 + 15, hcy);

            // 吊索方向
            svg.append("path").attr("d", line([
                {x: hcx, y: hcy},
                {x: hcx + hro + 50 - 15, y: hcy}
            ])).classed("sketch", true).attr("id", "XCBSketchLUG")
                .attr("transform", "rotate(" + -120 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketchLUG")
                .attr("startOffset", "50%").text("吊索方向");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 50, y: hcy},
                    {x: hcx + hro + 50 - 15, y: hcy - 3},
                    {x: hcx + hro + 50 - 15, y: hcy + 3},
                    {x: hcx + hro + 50, y: hcy}
                ])).attr("transform", "rotate(" + -120 + ", " + hcx + " " + hcy + ")");

            // <= 30
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 30, y: hcy},
                    {x: hcx + hro + 27, y: hcy + 15},
                    {x: hcx + hro + 33, y: hcy + 15},
                    {x: hcx + hro + 30, y: hcy}
                ])).attr("transform", "rotate(" + -120 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 30, y: hcy},
                    {x: hcx + hro + 27, y: hcy - 15},
                    {x: hcx + hro + 33, y: hcy - 15},
                    {x: hcx + hro + 30, y: hcy}
                ])).attr("transform", "rotate(" + -90 + ", " + hcx + " " + hcy + ")");
            drawLine(hcx, hcy - hro - 10 - 3, hcx, hcy - hro - 50);
            svg.append("path").attr("d", "M "
                + (hcx + (hro + 30) * Math.cos(15 / 180 * Math.PI)) + " " + (hcy - (hro + 30) * Math.sin(15 / 180 * Math.PI)) + " "
                + "A" + (hro + 30) + " " + (hro + 30) + " "
                + "1 0 1" + " "
                + (hcx + (hro + 30) * Math.cos(15 / 180 * Math.PI)) + " " + (hcy + (hro + 30) * Math.sin(15 / 180 * Math.PI))
            ).classed("sketch", true).attr("id", "XCBSketch30").attr("transform", "rotate(" + -105 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketch30")
                .attr("startOffset", "50%").text("≤30°");

            // 20°
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 30, y: hcy},
                    {x: hcx + hro + 27, y: hcy + 15},
                    {x: hcx + hro + 33, y: hcy + 15},
                    {x: hcx + hro + 30, y: hcy}
                ])).attr("transform", "rotate(" + -20 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 30, y: hcy},
                    {x: hcx + hro + 27, y: hcy - 15},
                    {x: hcx + hro + 33, y: hcy - 15},
                    {x: hcx + hro + 30, y: hcy}
                ]));
            svg.append("path").attr("d", "M "
                + (hcx + (hro + 30) * Math.cos(10 / 180 * Math.PI)) + " " + (hcy - (hro + 30) * Math.sin(10 / 180 * Math.PI)) + " "
                + "A" + (hro + 30) + " " + (hro + 30) + " "
                + "1 0 1" + " "
                + (hcx + (hro + 30) * Math.cos(10 / 180 * Math.PI)) + " " + (hcy + (hro + 30) * Math.sin(10 / 180 * Math.PI))
            ).classed("sketch", true).attr("id", "XCBSketch201").attr("transform", "rotate(" + -10 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketch201")
                .attr("startOffset", "50%").text("20°");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx, y: hcy},
                    {x: hcx + hro + 50, y: hcy}
                ])).attr("transform", "rotate(" + -20 + ", " + hcx + " " + hcy + ")");

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 30, y: hcy},
                    {x: hcx + hro + 27, y: hcy + 15},
                    {x: hcx + hro + 33, y: hcy + 15},
                    {x: hcx + hro + 30, y: hcy}
                ])).attr("transform", "rotate(" + -180 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 30, y: hcy},
                    {x: hcx + hro + 27, y: hcy - 15},
                    {x: hcx + hro + 33, y: hcy - 15},
                    {x: hcx + hro + 30, y: hcy}
                ])).attr("transform", "rotate(" + -160 + ", " + hcx + " " + hcy + ")");
            svg.append("path").attr("d", "M "
                + (hcx + (hro + 30) * Math.cos(10 / 180 * Math.PI)) + " " + (hcy - (hro + 30) * Math.sin(10 / 180 * Math.PI)) + " "
                + "A" + (hro + 30) + " " + (hro + 30) + " "
                + "1 0 1" + " "
                + (hcx + (hro + 30) * Math.cos(10 / 180 * Math.PI)) + " " + (hcy + (hro + 30) * Math.sin(10 / 180 * Math.PI))
            ).classed("sketch", true).attr("id", "XCBSketch202")
                .attr("transform", "rotate(" + -170 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketch202")
                .attr("startOffset", "50%").text("20°");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx, y: hcy},
                    {x: hcx + hro + 50, y: hcy}
                ])).attr("transform", "rotate(" + -160 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx + hro + 13, y: hcy},
                    {x: hcx + hro + 50, y: hcy}
                ])).attr("transform", "rotate(" + -180 + ", " + hcx + " " + hcy + ")");

            // D
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hri, y: hcy},
                    {x: hcx + hri + 15, y: hcy - 3},
                    {x: hcx + hri + 15, y: hcy + 3},
                    {x: hcx + hri, y: hcy}
                ])).attr("transform", "rotate(" + -225 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx + hri + 15, y: hcy},
                    {x: hcx + hri + 15 + 30, y: hcy}
                ])).attr("transform", "rotate(" + -225 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx - 0.707 * (hri + 15 + 30) - 40, y: hcy + 0.707 * (hri + 15 + 30)},
                    {x: hcx - 0.707 * (hri + 15 + 30), y: hcy + 0.707 * (hri + 15 + 30)}
                ])).classed("sketch", true).attr("id", "XCBSketchD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketchD")
                .attr("startOffset", "50%").text(d);

            // R
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx + hro, y: hcy},
                    {x: hcx + hro - 15, y: hcy - 3},
                    {x: hcx + hro - 15, y: hcy + 3},
                    {x: hcx + hro, y: hcy}
                ])).attr("transform", "rotate(" + -45 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx, y: hcy},
                    {x: hcx + hro + 15 + 30, y: hcy}
                ])).attr("transform", "rotate(" + -45 + ", " + hcx + " " + hcy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx + 0.707 * (hro + 15 + 30), y: hcy - 0.707 * (hro + 15 + 30)},
                    {x: hcx + 0.707 * (hro + 15 + 30) + 40, y: hcy - 0.707 * (hro + 15 + 30)}
                ])).classed("sketch", true).attr("id", "XCBSketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketchR")
                .attr("startOffset", "50%").text(r);

            // THKN
            let THKX = hcx - hri;
            let THKY = ((hcy + hri) + (leftEndY + rightEndY) / 2) / 2 + 10;
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: THKX, y: THKY},
                    {x: THKX + 1.414 * ((leftEndY + rightEndY) / 2 - (hcy + hri)), y: THKY}
                ])).attr("transform", "rotate(" + 135 + ", " + THKX + " " + THKY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {
                        x: THKX - ((leftEndY + rightEndY) / 2 - (hcy + hri)) - 40,
                        y: THKY + ((leftEndY + rightEndY) / 2 - (hcy + hri))
                    },
                    {
                        x: THKX - ((leftEndY + rightEndY) / 2 - (hcy + hri)),
                        y: THKY + ((leftEndY + rightEndY) / 2 - (hcy + hri))
                    }
                ])).classed("sketch", true).attr("id", "XCBSketchTHKN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCBSketchTHKN")
                .attr("startOffset", "50%").text(thkn);

        }

        currentTabIndex = xcbd2d3.tabs('getTabIndex', xcbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xcb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xcb").length > 0) {
                    xcb2d();
                }
            });
        }
        xcbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xcb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xcb").length > 0) {
                            xcb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 21574-2008 卧式板式吊耳(HP)计算",
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
                if (index === 1) {
                    $(ed.target).combobox("loadData", XCBCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", XCBType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", XCBSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", XCBName);
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
                    xcbSketch.empty();

                    // model
                    xcbModel.empty();

                    // sketch
                    currentTabIndex = xcbd2d3.tabs('getTabIndex', xcbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xcb2d();
                        xcbSketch.off("resize").on("resize", function () {
                            if ($("#xcb").length > 0) {
                                xcb2d();
                            }
                        });
                    }
                    xcbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xcb2d();
                                xcbSketch.off("resize").on("resize", function () {
                                    if ($("#xcb").length > 0) {
                                        xcb2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    if (index === 1) {

                        XCBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        XCBType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCBSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCBCategoryVal,
                                temp: XCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCBType = [];
                                $(result).each(function (index, element) {
                                    XCBType[index] = {
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
                    else if (index === 2) {

                        XCBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCBSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCBCategoryVal,
                                type: XCBTypeVal,
                                temp: XCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCBSTD = [];
                                $(result).each(function (index, element) {
                                    XCBSTD[index] = {
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
                    else if (index === 3) {

                        XCBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCBCategoryVal,
                                type: XCBTypeVal,
                                std: XCBSTDVal,
                                temp: XCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCBName = [];
                                $(result).each(function (index, element) {
                                    XCBName[index] = {
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

                        // 材料名称
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            let XCBNameVal = rows[4][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XCBDensity, XCBThkMin, XCBThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XCBCategoryVal,
                                    "type": XCBTypeVal,
                                    "std": XCBSTDVal,
                                    "name": XCBNameVal,
                                    "temp": XCBDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XCBDensity = parseFloat(result.density);
                                    XCBThkMin = parseFloat(result.thkMin);
                                    XCBThkMax = parseFloat(result.thkMax);

                                    if (XCBNameVal === "Q235B" || XCBNameVal === "Q235C") {
                                        XCBThkMax = 200;
                                    }

                                    // 名义厚度
                                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCBThkMin
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCBThkMax) {
                                        let XCBTHKN = parseFloat(rows[5][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xcb2d(XCBTHKN);
                                            xcbSketch.off("resize").on("resize", function () {
                                                if ($("#xcb").length > 0) {
                                                    xcb2d(XCBTHKN);
                                                }
                                            });
                                        }
                                        xcbd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xcb2d(XCBTHKN);
                                                    xcbSketch.off("resize").on("resize", function () {
                                                        if ($("#xcb").length > 0) {
                                                            xcb2d(XCBTHKN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // ajax 获取 设计应力、常温应力、标记应力、常温屈服强度、厚度负偏差
                                        let XCBDesignTStress, XCBTestRel, XCBC1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": XCBCategoryVal,
                                                "type": XCBTypeVal,
                                                "std": XCBSTDVal,
                                                "name": XCBNameVal,
                                                "thk": XCBTHKN,
                                                "temp": XCBDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": 100000
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                // 常温屈服强度
                                                XCBTestRel = parseFloat(result.rel);
                                                if (XCBTestRel < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 厚度负偏差
                                                XCBC1 = parseFloat(result.c1);
                                                if (XCBC1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                XCBDesignTStress = XCBTestRel / 1.6;

                                                // D
                                                if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                                    let XCBD = parseFloat(rows[6][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xcb2d(XCBTHKN, "ϕ" + XCBD);
                                                        xcbSketch.off("resize").on("resize", function () {
                                                            if ($("#xcb").length > 0) {
                                                                xcb2d(XCBTHKN, "ϕ" + XCBD);
                                                            }
                                                        });
                                                    }
                                                    xcbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xcb2d(XCBTHKN, "ϕ" + XCBD);
                                                                xcbSketch.off("resize").on("resize", function () {
                                                                    if ($("#xcb").length > 0) {
                                                                        xcb2d(XCBTHKN, "ϕ" + XCBD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // R
                                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) > XCBD / 2) {
                                                        let XCBR = parseFloat(rows[7][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR);
                                                            xcbSketch.off("resize").on("resize", function () {
                                                                if ($("#xcb").length > 0) {
                                                                    xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR);
                                                                }
                                                            });
                                                        }
                                                        xcbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR);
                                                                    xcbSketch.off("resize").on("resize", function () {
                                                                        if ($("#xcb").length > 0) {
                                                                            xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // L
                                                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) > XCBR) {
                                                            let XCBL = parseFloat(rows[8][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR, XCBL);
                                                                xcbSketch.off("resize").on("resize", function () {
                                                                    if ($("#xcb").length > 0) {
                                                                        xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR, XCBL);
                                                                    }
                                                                });
                                                            }
                                                            xcbd2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR, XCBL);
                                                                        xcbSketch.off("resize").on("resize", function () {
                                                                            if ($("#xcb").length > 0) {
                                                                                xcb2d(XCBTHKN, "ϕ" + XCBD, "R" + XCBR, XCBL);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 腐蚀裕量
                                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                                && parseFloat(rows[9][columns[0][1].field]) < XCBTHKN) {
                                                                let XCBC2 = parseFloat(rows[9][columns[0][1].field]);

                                                                // 吊重
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                                    let XCBMASS = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 厚度附加量
                                                                    let XCBC = XCBC1 + XCBC2;

                                                                    // 有效厚度
                                                                    let XCBTHKE = XCBTHKN - XCBC;

                                                                    // 许用剪应力
                                                                    let XCBDesignSStress = 0.6 * XCBDesignTStress;

                                                                    // 角焊缝系数
                                                                    let XCBE = 0.7;

                                                                    // 综合影响系数 K
                                                                    let XCBK = 1.65;

                                                                    // 竖向载荷 FV
                                                                    let XCBFV = XCBMASS * 9.81 * XCBK;

                                                                    // 横向载荷 FH
                                                                    let XCBFH = XCBFV * Math.tan(30 / 180 * Math.PI);

                                                                    // 吊绳方向载荷 FL
                                                                    let XCBFL = XCBFV / Math.cos(30 / 180 * Math.PI);

                                                                    // 经向弯矩 M
                                                                    let XCBM = XCBFH * XCBL;

                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "吊索方向许用拉应力：" + XCBDesignTStress + " MPa" +
                                                                        "</span>");

                                                                    // 吊索方向拉应力 σL
                                                                    let XCBOL = XCBFL / ((2 * XCBR - XCBD) * XCBTHKE);

                                                                    // 吊索方向拉应力校核
                                                                    let XCBOLCHK;
                                                                    if (XCBOL.toFixed(4) <= XCBDesignTStress) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际拉应力：" + XCBOL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCBOLCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际拉应力：" + XCBOL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCBOLCHK = "不合格";
                                                                    }

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "吊索方向许用剪应力：" + XCBDesignSStress + " MPa" +
                                                                        "</span>");

                                                                    // 实际剪应力
                                                                    let XCBTL = XCBOL;

                                                                    // 吊索方向剪应力校核
                                                                    let XCBTLCHK;
                                                                    if (XCBTL.toFixed(4) <= XCBDesignSStress) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XCBTL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCBTLCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XCBTL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCBTLCHK = "不合格";
                                                                    }

                                                                    // 角焊缝面积 A
                                                                    let XCBA = 2 * (XCBL * Math.tan(20 / 180 * Math.PI) + XCBR) * XCBTHKE;

                                                                    // 角焊缝拉应力
                                                                    let XCBOA = XCBFV / XCBA;

                                                                    // 角焊缝剪应力
                                                                    let XCBTA = XCBFH / XCBA;

                                                                    // 角焊缝弯曲应力
                                                                    let XCBOB = 6 * XCBM / (XCBTHKE * Math.pow(2 * (XCBL * Math.tan(20 / 180 * Math.PI) + XCBR), 2));

                                                                    // 组合应力许用值
                                                                    let XCBOABALLOW = XCBE * XCBDesignTStress;

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "角焊缝组合应力许用值：" + XCBOABALLOW.toFixed(4) + " MPa" +
                                                                        "</span>");

                                                                    // 角焊缝组合应力
                                                                    let XCBOAB = Math.sqrt(Math.pow(XCBOA + XCBOB, 2) + 4 * XCBTA * XCBTA);

                                                                    // 角焊缝组合应力校核
                                                                    let XCBOABCHK;
                                                                    if (XCBOAB <= XCBOABALLOW) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际值：" + XCBOAB.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCBOABCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际值：" + XCBOAB.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCBOABCHK = "不合格";
                                                                    }

                                                                    // docx
                                                                    let XCBPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "xcbdocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "XCB",

                                                                                std: XCBSTDVal,
                                                                                name: XCBNameVal,
                                                                                thkn: XCBTHKN,
                                                                                l: XCBL,
                                                                                r: XCBR,
                                                                                d: XCBD,
                                                                                c2: XCBC2,
                                                                                mass: XCBMASS,
                                                                                density: XCBDensity.toFixed(4),
                                                                                rel: XCBTestRel.toFixed(4),
                                                                                c1: XCBC1.toFixed(4),
                                                                                c: XCBC.toFixed(4),
                                                                                thke: XCBTHKE.toFixed(4),
                                                                                e: XCBE.toFixed(4),
                                                                                k: XCBK.toFixed(4),
                                                                                fv: XCBFV.toFixed(2),
                                                                                fh: XCBFH.toFixed(2),
                                                                                fl: XCBFL.toFixed(2),
                                                                                m: XCBM.toFixed(2),
                                                                                ol: XCBOL.toFixed(4),
                                                                                olallow: XCBDesignTStress.toFixed(4),
                                                                                olchk: XCBOLCHK,
                                                                                tl: XCBTL.toFixed(4),
                                                                                tlallow: XCBDesignSStress.toFixed(4),
                                                                                tlchk: XCBTLCHK,
                                                                                a: XCBA.toFixed(2),
                                                                                oa: XCBOA.toFixed(4),
                                                                                ta: XCBTA.toFixed(4),
                                                                                ob: XCBOB.toFixed(4),
                                                                                oab: XCBOAB.toFixed(4),
                                                                                oaballow: XCBOABALLOW.toFixed(4),
                                                                                oabchk: XCBOABCHK
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
                                                                                    XCBPayJS.dialog({
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
                                                                                                XCBPayJS.dialog("close");
                                                                                                XCBPayJS.dialog("clear");
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
                                                                                                            XCBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    XCBPayJS.dialog('close');
                                                                                                                    XCBPayJS.dialog('clear');
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
                                                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                                && parseFloat(rows[9][columns[0][1].field]) >= XCBTHKN) {
                                                                south.html("腐蚀裕量不能大于等于 " + XCBTHKN + " mm").css("color", "red");
                                                            }
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) <= XCBR) {
                                                            south.html("尺寸 L 不能小于等于 " + XCBR + " mm").css("color", "red");
                                                        }
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) <= XCBD / 2) {
                                                        south.html("尺寸 R 不能小于等于 " + XCBD / 2 + " mm").css("color", "red");
                                                    }
                                                }
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    }
                                    else if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCBThkMin) {
                                        south.html("材料厚度不能小于等于 " + XCBThkMin + " mm").css("color", "red");
                                    }
                                    else if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCBThkMax) {
                                        south.html("材料厚度不能大于 " + XCBThkMax + " mm").css("color", "red");
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                // 获取 category 列表
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "web_list_gbt_150_2011_category.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        temp: XCBDT
                    }),
                    beforeSend: function () {
                    },
                    success: function (result) {
                        XCBCategory = [];
                        if (result.length <= 0) {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "&ensp;" + "<span style='color:red;'>" + XCBDT + "</span>" +
                                "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                        }
                        else {
                            $(result).each(function (index, element) {
                                XCBCategory[index] = {
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
        });
    });
});