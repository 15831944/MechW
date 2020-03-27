$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xcaSketch = $("#d2");
    let xcaModel = $("#d3");
    let xcad2d3 = $('#d2d3');

    $("#cal").html("<table id='xca'></table>");
    let pg = $("#xca");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/c/a/XCA.json", function (result) {

        let XCADT = 20,
            XCACategory, XCACategoryVal, XCAType, XCATypeVal, XCASTD, XCASTDVal, XCAName,
            columns, rows, ed;

        function xca2d(thkn = "δn", d = "ϕD", r = "R", l = "L") {

            xcaSketch.empty();

            let width = xcaSketch.width();
            let height = xcaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XCASVG").attr("height", height);

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
            let crossy = hcy + 4 * hro;

            let leftEndX = hcx - hro / Math.sin(20 / 180 * Math.PI) * Math.sin(40 / 180 * Math.PI);
            let leftEndY = hcy + hro / Math.sin(20 / 180 * Math.PI) * Math.sin(50 / 180 * Math.PI) - 15;
            drawLine(crossx - hro * Math.cos(20 / 180 * Math.PI), hcy - hro * Math.sin(20 / 180 * Math.PI), leftEndX, leftEndY);

            let rightEndX = hcx + hro / Math.sin(20 / 180 * Math.PI) * Math.sin(40 / 180 * Math.PI);
            let rightEndY = hcy + hro / Math.sin(20 / 180 * Math.PI) * Math.sin(50 / 180 * Math.PI) + 15;
            drawLine(crossx + hro * Math.cos(20 / 180 * Math.PI), hcy - hro * Math.sin(20 / 180 * Math.PI), rightEndX, rightEndY);

            drawLine(leftEndX, leftEndY, rightEndX, rightEndY);

            // 中心线
            drawCenterLine(hcx, hcy - hro - 10, hcx, (leftEndY + rightEndY) / 2 + 10);
            drawCenterLine(hcx - hro - 10, hcy, hcx + hro + 10, hcy);

            // 标注 L
            extLineRightH(rightEndX, hcy);
            extLineRightH(rightEndX, (leftEndY + rightEndY) / 2);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: rightEndX + 30, y: hcy},
                    {x: rightEndX + 27, y: hcy + 15},
                    {x: rightEndX + 33, y: hcy + 15},
                    {x: rightEndX + 30, y: hcy}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: rightEndX + 30, y: (leftEndY + rightEndY) / 2},
                    {x: rightEndX + 27, y: (leftEndY + rightEndY) / 2 - 15},
                    {x: rightEndX + 33, y: (leftEndY + rightEndY) / 2 - 15},
                    {x: rightEndX + 30, y: (leftEndY + rightEndY) / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: rightEndX + 30, y: (leftEndY + rightEndY) / 2 - 15},
                {x: rightEndX + 30, y: hcy + 15}
            ])).attr("id", "XCASketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketchL")
                .attr("startOffset", "50%").text(l);
            drawLine(hcx + hro + 10 + 3, hcy, rightEndX + 3, hcy);
            drawLine(hcx + 3, (leftEndY + rightEndY) / 2, rightEndX + 3, (leftEndY + rightEndY) / 2);

            // 吊索方向
            svg.append("path").attr("d", line([
                {x: hcx, y: hcy},
                {x: hcx + hro + 50 - 15, y: hcy}
            ])).classed("sketch", true).attr("id", "XCASketchLUG")
                .attr("transform", "rotate(" + -120 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketchLUG")
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
            ).classed("sketch", true).attr("id", "XCASketch30").attr("transform", "rotate(" + -105 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketch30")
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
            ).classed("sketch", true).attr("id", "XCASketch201").attr("transform", "rotate(" + -10 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketch201")
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
            ).classed("sketch", true).attr("id", "XCASketch202")
                .attr("transform", "rotate(" + -170 + ", " + hcx + " " + hcy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketch202")
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

            // 至设备中心线距离
            extLineBottomV(hcx, (leftEndY + rightEndY) / 2 + 10);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: hcx, y: (leftEndY + rightEndY) / 2 + 10 + 30},
                    {x: hcx - 15, y: (leftEndY + rightEndY) / 2 + 10 + 30 - 3},
                    {x: hcx - 15, y: (leftEndY + rightEndY) / 2 + 10 + 30 + 3},
                    {x: hcx, y: (leftEndY + rightEndY) / 2 + 10 + 30}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: hcx - 15 - 200, y: (leftEndY + rightEndY) / 2 + 10 + 30},
                    {x: hcx - 15, y: (leftEndY + rightEndY) / 2 + 10 + 30}
                ])).classed("sketch", true).attr("id", "XCASketchMIN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketchMIN")
                .attr("startOffset", "50%").text("至设备轴线距离≤0.7倍设备内半径");

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
                ])).classed("sketch", true).attr("id", "XCASketchD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketchD")
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
                ])).classed("sketch", true).attr("id", "XCASketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketchR")
                .attr("startOffset", "50%").text(r);

            // THKN
            let THKX = hcx - hri;
            let THKY = ((hcy + hri) + (leftEndY + rightEndY) / 2) / 2 + 10;
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: THKX, y: THKY},
                    {x: THKX + 1.414 * ((leftEndY + rightEndY) / 2 - (hcy + hri)) / 2, y: THKY}
                ])).attr("transform", "rotate(" + 135 + ", " + THKX + " " + THKY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {
                        x: THKX - 0.707 * 1.414 * ((leftEndY + rightEndY) / 2 - (hcy + hri)) / 2 - 40,
                        y: THKY + 0.707 * 1.414 * ((leftEndY + rightEndY) / 2 - (hcy + hri)) / 2
                    },
                    {
                        x: THKX - 0.707 * 1.414 * ((leftEndY + rightEndY) / 2 - (hcy + hri)) / 2,
                        y: THKY + 0.707 * 1.414 * ((leftEndY + rightEndY) / 2 - (hcy + hri)) / 2
                    }
                ])).classed("sketch", true).attr("id", "XCASketchTHKN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCASketchTHKN")
                .attr("startOffset", "50%").text(thkn);

        }

        currentTabIndex = xcad2d3.tabs('getTabIndex', xcad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xca2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xca").length > 0) {
                    xca2d();
                }
            });
        }
        xcad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xca2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xca").length > 0) {
                            xca2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 21574-2008 立式板式吊耳(TP/TPP)计算",
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
                    $(ed.target).combobox("loadData", XCACategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", XCAType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", XCASTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", XCAName);
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
                    xcaSketch.empty();

                    // model
                    xcaModel.empty();

                    // sketch
                    currentTabIndex = xcad2d3.tabs('getTabIndex', xcad2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        xca2d();
                        xcaSketch.off("resize").on("resize", function () {
                            if ($("#xca").length > 0) {
                                xca2d();
                            }
                        });
                    }
                    xcad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xca2d();
                                xcaSketch.off("resize").on("resize", function () {
                                    if ($("#xca").length > 0) {
                                        xca2d();
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

                        XCACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        XCAType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCASTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCACategoryVal,
                                temp: XCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCAType = [];
                                $(result).each(function (index, element) {
                                    XCAType[index] = {
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

                        XCATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCASTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCACategoryVal,
                                type: XCATypeVal,
                                temp: XCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCASTD = [];
                                $(result).each(function (index, element) {
                                    XCASTD[index] = {
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

                        XCASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCACategoryVal,
                                type: XCATypeVal,
                                std: XCASTDVal,
                                temp: XCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCAName = [];
                                $(result).each(function (index, element) {
                                    XCAName[index] = {
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
                            let XCANameVal = rows[4][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XCADensity, XCAThkMin, XCAThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XCACategoryVal,
                                    "type": XCATypeVal,
                                    "std": XCASTDVal,
                                    "name": XCANameVal,
                                    "temp": XCADT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XCADensity = parseFloat(result.density);
                                    XCAThkMin = parseFloat(result.thkMin);
                                    XCAThkMax = parseFloat(result.thkMax);

                                    if (XCANameVal === "Q235B" || XCANameVal === "Q235C") {
                                        XCAThkMax = 200;
                                    }

                                    // 名义厚度
                                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCAThkMin
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCAThkMax) {
                                        let XCATHKN = parseFloat(rows[5][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xca2d(XCATHKN);
                                            xcaSketch.off("resize").on("resize", function () {
                                                if ($("#xca").length > 0) {
                                                    xca2d(XCATHKN);
                                                }
                                            });
                                        }
                                        xcad2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xca2d(XCATHKN);
                                                    xcaSketch.off("resize").on("resize", function () {
                                                        if ($("#xca").length > 0) {
                                                            xca2d(XCATHKN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // ajax 获取常温屈服强度、厚度负偏差
                                        let XCADesignTStress, XCATestRel, XCAC1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": XCACategoryVal,
                                                "type": XCATypeVal,
                                                "std": XCASTDVal,
                                                "name": XCANameVal,
                                                "thk": XCATHKN,
                                                "temp": XCADT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": 100000
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                // 常温屈服强度
                                                XCATestRel = parseFloat(result.rel);
                                                if (XCATestRel < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 厚度负偏差
                                                XCAC1 = parseFloat(result.c1);
                                                if (XCAC1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                XCADesignTStress = XCATestRel / 1.6;

                                                // D
                                                if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                                    let XCAD = parseFloat(rows[6][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xca2d(XCATHKN, "ϕ" + XCAD);
                                                        xcaSketch.off("resize").on("resize", function () {
                                                            if ($("#xca").length > 0) {
                                                                xca2d(XCATHKN, "ϕ" + XCAD);
                                                            }
                                                        });
                                                    }
                                                    xcad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xca2d(XCATHKN, "ϕ" + XCAD);
                                                                xcaSketch.off("resize").on("resize", function () {
                                                                    if ($("#xca").length > 0) {
                                                                        xca2d(XCATHKN, "ϕ" + XCAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // R
                                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) > XCAD / 2) {
                                                        let XCAR = parseFloat(rows[7][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR);
                                                            xcaSketch.off("resize").on("resize", function () {
                                                                if ($("#xca").length > 0) {
                                                                    xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR);
                                                                }
                                                            });
                                                        }
                                                        xcad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR);
                                                                    xcaSketch.off("resize").on("resize", function () {
                                                                        if ($("#xca").length > 0) {
                                                                            xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // L
                                                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) > XCAR) {
                                                            let XCAL = parseFloat(rows[8][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR, XCAL);
                                                                xcaSketch.off("resize").on("resize", function () {
                                                                    if ($("#xca").length > 0) {
                                                                        xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR, XCAL);
                                                                    }
                                                                });
                                                            }
                                                            xcad2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR, XCAL);
                                                                        xcaSketch.off("resize").on("resize", function () {
                                                                            if ($("#xca").length > 0) {
                                                                                xca2d(XCATHKN, "ϕ" + XCAD, "R" + XCAR, XCAL);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 腐蚀裕量
                                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                                && parseFloat(rows[9][columns[0][1].field]) < XCATHKN) {
                                                                let XCAC2 = parseFloat(rows[9][columns[0][1].field]);

                                                                // 吊重
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                                    let XCAMASS = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 厚度附加量
                                                                    let XCAC = XCAC1 + XCAC2;

                                                                    // 有效厚度
                                                                    let XCATHKE = XCATHKN - XCAC;

                                                                    // 许用剪应力
                                                                    let XCADesignSStress = 0.6 * XCADesignTStress;

                                                                    // 角焊缝系数
                                                                    let XCAE = 0.7;

                                                                    // 综合影响系数 K
                                                                    let XCAK = 1.65;

                                                                    // 竖向载荷 FV
                                                                    let XCAFV = XCAMASS * 9.81 * XCAK;

                                                                    // 横向载荷 FH
                                                                    let XCAFH = XCAFV * Math.tan(30 / 180 * Math.PI);

                                                                    // 吊绳方向载荷 FL
                                                                    let XCAFL = XCAFV / Math.cos(30 / 180 * Math.PI);

                                                                    // 经向弯矩 M
                                                                    let XCAM = XCAFH * XCAL;

                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "吊索方向许用拉应力：" + XCADesignTStress + " MPa" +
                                                                        "</span>");

                                                                    // 吊索方向拉应力 σL
                                                                    let XCAOL = XCAFL / ((2 * XCAR - XCAD) * XCATHKE);

                                                                    // 吊索方向拉应力校核
                                                                    let XCAOLCHK;
                                                                    if (XCAOL.toFixed(4) <= XCADesignTStress) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际拉应力：" + XCAOL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCAOLCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际拉应力：" + XCAOL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCAOLCHK = "不合格";
                                                                    }

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "吊索方向许用剪应力：" + XCADesignSStress + " MPa" +
                                                                        "</span>");

                                                                    // 实际剪应力
                                                                    let XCATL = XCAOL;

                                                                    // 吊索方向剪应力校核
                                                                    let XCATLCHK;
                                                                    if (XCATL.toFixed(4) <= XCADesignSStress) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XCATL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCATLCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际剪应力：" + XCATL.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCATLCHK = "不合格";
                                                                    }

                                                                    // 角焊缝面积 A
                                                                    let XCAA = 2 * (XCAL * Math.tan(20 / 180 * Math.PI) + XCAR) * XCATHKE;

                                                                    // 角焊缝拉应力
                                                                    let XCAOA = XCAFV / XCAA;

                                                                    // 角焊缝剪应力
                                                                    let XCATA = XCAFH / XCAA;

                                                                    // 角焊缝弯曲应力
                                                                    let XCAOB = 6 * XCAM / (XCATHKE * Math.pow(2 * (XCAL * Math.tan(20 / 180 * Math.PI) + XCAR), 2));

                                                                    // 组合应力许用值
                                                                    let XCAOABALLOW = XCAE * XCADesignTStress;

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "角焊缝组合应力许用值：" + XCAOABALLOW.toFixed(4) + " MPa" +
                                                                        "</span>");

                                                                    // 角焊缝组合应力
                                                                    let XCAOAB = Math.sqrt(Math.pow(XCAOA + XCAOB, 2) + 4 * XCATA * XCATA);

                                                                    // 角焊缝组合应力校核
                                                                    let XCAOABCHK;
                                                                    if (XCAOAB <= XCAOABALLOW) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际值：" + XCAOAB.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCAOABCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际值：" + XCAOAB.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        XCAOABCHK = "不合格";
                                                                    }

                                                                    // docx
                                                                    let XCAPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "xcadocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "XCA",

                                                                                std: XCASTDVal,
                                                                                name: XCANameVal,
                                                                                thkn: XCATHKN,
                                                                                l: XCAL,
                                                                                r: XCAR,
                                                                                d: XCAD,
                                                                                c2: XCAC2,
                                                                                mass: XCAMASS,
                                                                                density: XCADensity.toFixed(4),
                                                                                rel: XCATestRel.toFixed(4),
                                                                                c1: XCAC1.toFixed(4),
                                                                                c: XCAC.toFixed(4),
                                                                                thke: XCATHKE.toFixed(4),
                                                                                e: XCAE.toFixed(4),
                                                                                k: XCAK.toFixed(4),
                                                                                fv: XCAFV.toFixed(2),
                                                                                fh: XCAFH.toFixed(2),
                                                                                fl: XCAFL.toFixed(2),
                                                                                m: XCAM.toFixed(2),
                                                                                ol: XCAOL.toFixed(4),
                                                                                olallow: XCADesignTStress.toFixed(4),
                                                                                olchk: XCAOLCHK,
                                                                                tl: XCATL.toFixed(4),
                                                                                tlallow: XCADesignSStress.toFixed(4),
                                                                                tlchk: XCATLCHK,
                                                                                a: XCAA.toFixed(2),
                                                                                oa: XCAOA.toFixed(4),
                                                                                ta: XCATA.toFixed(4),
                                                                                ob: XCAOB.toFixed(4),
                                                                                oab: XCAOAB.toFixed(4),
                                                                                oaballow: XCAOABALLOW.toFixed(4),
                                                                                oabchk: XCAOABCHK
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
                                                                                    XCAPayJS.dialog({
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
                                                                                                XCAPayJS.dialog("close");
                                                                                                XCAPayJS.dialog("clear");
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
                                                                                                            XCAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    XCAPayJS.dialog('close');
                                                                                                                    XCAPayJS.dialog('clear');
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
                                                                && parseFloat(rows[9][columns[0][1].field]) >= XCATHKN) {
                                                                south.html("腐蚀裕量不能大于等于 " + XCATHKN + " mm").css("color", "red");
                                                            }
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) <= XCAR) {
                                                            south.html("尺寸 L 不能小于等于 " + XCAR + " mm").css("color", "red");
                                                        }
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) <= XCAD / 2) {
                                                        south.html("尺寸 R 不能小于等于 " + XCAD / 2 + " mm").css("color", "red");
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
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCAThkMin) {
                                        south.html("材料厚度不能小于等于 " + XCAThkMin + " mm").css("color", "red");
                                    }
                                    else if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCAThkMax) {
                                        south.html("材料厚度不能大于 " + XCAThkMax + " mm").css("color", "red");
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
                        temp: XCADT
                    }),
                    beforeSend: function () {
                    },
                    success: function (result) {
                        XCACategory = [];
                        if (result.length <= 0) {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "&ensp;" + "<span style='color:red;'>" + XCADT + "</span>" +
                                "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                        }
                        else {
                            $(result).each(function (index, element) {
                                XCACategory[index] = {
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