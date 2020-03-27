$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aaed2 = $("#d2");
    let aaed3 = $("#d3");
    let aaed2d3 = $('#d2d3');

    $("#cal").html("<table id='aae'></table>");
    let pg = $("#aae");

    let south = $("#south");
    let currentTabIndex = null;

    let AAEPayJS = $('#payjs');
    $.getJSON("/static/west/cal/a/a/e/AAE.json", function (result) {

        let AAEDT,
            AAESCategory, AAESCategoryVal, AAESType, AAESTypeVal, AAESSTD, AAESSTDVal, AAESName, AAESNameVal,
            AAECCategory, AAECCategoryVal, AAECType, AAECTypeVal, AAECSTD, AAECSTDVal, AAECName, AAECNameVal,
            columns, rows, ed;

        function aae2d(type, di = "ϕDi", thksn = "δsn", ri = "Ri",
                       thkcn = "δcn", thkrn = "δrn", l = "L", offset = ">=2δrc") {

            aaed2.empty();

            let width = aaed2.width();
            let height = aaed2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "AAESVG")
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
            let padding = 120;
            let thickness = 10;

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

            // 底部水平标注
            function dimBottomH(startX, startY, endX, endY, text) {

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
                ])).attr("id", "AAESketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAESketchDI").attr("startOffset", "50%").text(text);

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

            // 画圆弧/椭圆弧
            function drawArc(radiusX, radiusY, startX, startY, endX, endY) {
                svg.append("path").attr("d", "M "
                    + startX + " " + startY + " "
                    + "A" + radiusX + " " + radiusY + " "
                    + "1 0 1" + " "
                    + endX + " " + endY
                ).classed("sketch", true);
            }

            if (type === "端封头") {

                // 筒体轮廓,内壁对应的是 padding 框
                drawLine(padding, height - padding, width - padding, height - padding);
                drawLine(padding, padding, width - padding, padding);
                drawLine(padding, padding - thickness, padding, height - padding + thickness);
                drawLine(width - padding, padding - 2 * thickness, width - padding, height - padding + 2 * thickness);
                drawLine(padding, padding - thickness, width - 2 * padding, padding - thickness);
                drawLine(padding, height - padding + thickness, width - 2 * padding, height - padding + thickness);
                drawLine(width - 2 * padding, padding - thickness, width - 2 * padding + 30, padding - 2 * thickness);
                drawLine(width - 2 * padding, height - padding + thickness, width - 2 * padding + 30, height - padding + 2 * thickness);
                drawLine(width - 2 * padding + 30, padding - 2 * thickness, width - padding, padding - 2 * thickness);
                drawLine(width - 2 * padding + 30, height - padding + 2 * thickness, width - padding, height - padding + 2 * thickness);
                drawLine(width - 2 * padding, padding - thickness, width - 2 * padding, padding);
                drawLine(width - 2 * padding, height - padding + thickness, width - 2 * padding, height - padding);

                // 封头轮廓
                let AAERI = height - 2 * padding;
                let AAERM = height - 2 * padding + thickness;
                let AAERO = height - 2 * padding + 2 * thickness;

                let centerX = width - padding - AAERO;
                let centerY = height / 2;

                // 内壁
                let innerArcTopX = centerX + AAERI * Math.cos(Math.PI / 6);
                let innerArcTopY = padding;
                let innerArcBottomX = centerX + AAERI * Math.cos(Math.PI / 6);
                let innerArcBottomY = height - padding;
                drawArc(AAERI, AAERI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

                // 上侧加强段外壁
                let outerArcTopStartX = centerX + Math.sqrt(AAERO * AAERO - AAERI * AAERI / 4);
                let outerArcTopStartY = padding;
                let outerArcTopEndX = centerX + AAERO * Math.cos(Math.PI / 9);
                let outerArcTopEndY = centerY - AAERO * Math.sin(Math.PI / 9);
                drawArc(AAERO, AAERO, outerArcTopStartX, outerArcTopStartY, outerArcTopEndX, outerArcTopEndY);

                // 下侧加强段外壁
                let outerArcBottomStartX = outerArcTopEndX;
                let outerArcBottomStartY = height - outerArcTopEndY;
                let outerArcBottomEndX = outerArcTopStartX;
                let outerArcBottomEndY = height - outerArcTopStartY;
                drawArc(AAERO, AAERO, outerArcBottomStartX, outerArcBottomStartY, outerArcBottomEndX, outerArcBottomEndY);

                // 球冠区外壁
                let midArcStartX = centerX + AAERM * Math.cos(Math.PI / 12);
                let midArcStartY = centerY - AAERM * Math.sin(Math.PI / 12);
                let midArcEndX = centerX + AAERM * Math.cos(Math.PI / 12);
                let midArcEndY = centerY + AAERM * Math.sin(Math.PI / 12);
                drawArc(AAERM, AAERM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

                // 封头界限
                drawLine(midArcStartX, midArcStartY, centerX + AAERI * Math.cos(Math.PI / 12), centerY - AAERI * Math.sin(Math.PI / 12));
                drawLine(midArcEndX, midArcEndY, centerX + AAERI * Math.cos(Math.PI / 12), centerY + AAERI * Math.sin(Math.PI / 12));

                // 封头削边
                drawLine(midArcStartX, midArcStartY, outerArcTopEndX, outerArcTopEndY);
                drawLine(midArcEndX, midArcEndY, outerArcBottomStartX, outerArcBottomStartY);

                // 中心线
                drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
                drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

                // 筒体内直径
                dimLeftV(padding + 100, height - padding, padding + 100, padding, di, "AAESketchSDI");

                // 筒体厚度
                drawLine(padding + 70, padding - thickness, padding + 70, padding);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: padding + 70, y: padding - thickness},
                        {x: padding + 70 - 3, y: padding - thickness - 15},
                        {x: padding + 70 + 3, y: padding - thickness - 15},
                        {x: padding + 70, y: padding - thickness}
                    ]));
                svg.append("path").attr("d", line([
                    {x: padding + 70, y: padding - thickness - 15},
                    {x: padding + 70, y: padding - thickness - 15 - 40}
                ])).attr("id", "AAESketchTHKSN").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchTHKSN").attr("startOffset", "50%").text(thksn);

                // 筒体加强段厚度
                drawLine(width - 2 * padding + 50, padding, width - 2 * padding + 50, padding - 2 * thickness);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - 2 * padding + 50, y: padding - 2 * thickness},
                        {x: width - 2 * padding + 50 - 3, y: padding - 2 * thickness - 15},
                        {x: width - 2 * padding + 50 + 3, y: padding - 2 * thickness - 15},
                        {x: width - 2 * padding + 50, y: padding - 2 * thickness}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width - 2 * padding + 50, y: padding - 2 * thickness - 15},
                    {x: width - 2 * padding + 50, y: padding - 2 * thickness - 15 - 40}
                ])).attr("id", "AAESketchTHKRN").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchTHKRN").attr("startOffset", "50%").text(thkrn);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - 2 * padding + 50, y: padding},
                        {x: width - 2 * padding + 50 - 3, y: padding + 15},
                        {x: width - 2 * padding + 50 + 3, y: padding + 15},
                        {x: width - 2 * padding + 50, y: padding}
                    ]));
                drawLine(width - 2 * padding + 50, padding + 15, width - 2 * padding + 50, padding + 30);

                // L
                drawLine(width - 2 * padding, height - padding + thickness + 3, width - 2 * padding, height - padding + 2 * thickness + 40);
                drawLine(innerArcTopX, height - padding + 3, innerArcTopX, height - padding + 2 * thickness + 40);

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - 2 * padding, y: height - padding + 2 * thickness + 30},
                        {x: width - 2 * padding - 15, y: height - padding + 2 * thickness + 30 - 3},
                        {x: width - 2 * padding - 15, y: height - padding + 2 * thickness + 30 + 3},
                        {x: width - 2 * padding, y: height - padding + 2 * thickness + 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width - 2 * padding, y: height - padding + 2 * thickness + 30},
                    {x: innerArcBottomX, y: height - padding + 2 * thickness + 30}
                ])).attr("id", "AAESketchL").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchL").attr("startOffset", "50%").text(l);

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: innerArcTopX, y: height - padding + 2 * thickness + 30},
                        {x: innerArcTopX + 15, y: height - padding + 2 * thickness + 30 - 3},
                        {x: innerArcTopX + 15, y: height - padding + 2 * thickness + 30 + 3},
                        {x: innerArcTopX, y: height - padding + 2 * thickness + 30}
                    ]));
                drawLine(innerArcTopX + 15, height - padding + 2 * thickness + 30, innerArcTopX + 30, height - padding + 2 * thickness + 30);
                svg.append("path").attr("d", line([
                    {x: width - 2 * padding - 15, y: height - padding + 2 * thickness + 30},
                    {x: width - 2 * padding - 30, y: height - padding + 2 * thickness + 30}
                ])).classed("sketch", true);

                // 2thkrn
                drawLine(width - padding, padding - 2 * thickness - 3, width - padding, padding - 2 * thickness - 40);
                drawLine(outerArcTopStartX, padding - 3, outerArcTopStartX, padding - 2 * thickness - 40);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: outerArcTopStartX, y: padding - 2 * thickness - 30},
                        {x: outerArcTopStartX - 15, y: padding - 2 * thickness - 30 - 3},
                        {x: outerArcTopStartX - 15, y: padding - 2 * thickness - 30 + 3},
                        {x: outerArcTopStartX, y: padding - 2 * thickness - 30}
                    ]));
                drawLine(outerArcTopStartX - 15, padding - 2 * thickness - 30, outerArcTopStartX - 30, padding - 2 * thickness - 30);
                drawLine(outerArcTopStartX, padding - 2 * thickness - 30, width - padding, padding - 2 * thickness - 30);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - padding, y: padding - 2 * thickness - 30},
                        {x: width - padding + 15, y: padding - 2 * thickness - 30 - 3},
                        {x: width - padding + 15, y: padding - 2 * thickness - 30 + 3},
                        {x: width - padding, y: padding - 2 * thickness - 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width - padding + 15, y: padding - 2 * thickness - 30},
                    {x: width - padding + 80, y: padding - 2 * thickness - 30}
                ])).attr("id", "AAESketchOffset").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchOffset").attr("startOffset", "50%").text(offset);

                // 封头球冠区
                let ang = 4;
                svg.append("path").attr("d", line([
                    {x: centerX, y: centerY},
                    {x: width - padding - 2 * thickness - 15, y: centerY}
                ])).attr("id", "AAESketchRi").classed("sketch", true)
                    .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#AAESketchRi").attr("startOffset", "50%").text(ri);

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - padding - 2 * thickness, y: centerY},
                        {x: width - padding - 2 * thickness - 15, y: centerY - 3},
                        {x: width - padding - 2 * thickness - 15, y: centerY + 3},
                        {x: width - padding - 2 * thickness, y: centerY}
                    ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

                svg.append("path").attr("d", line([
                    {x: width - padding - 2 * thickness, y: centerY},
                    {x: width - padding - thickness, y: centerY}
                ])).classed("sketch", true).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - padding - thickness, y: centerY},
                        {x: width - padding - thickness + 15, y: centerY - 3},
                        {x: width - padding - thickness + 15, y: centerY + 3},
                        {x: width - padding - thickness, y: centerY}
                    ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

                svg.append("path").attr("d", line([
                    {x: width - padding - thickness + 15, y: centerY},
                    {x: width - padding - thickness + 60, y: centerY}
                ])).attr("id", "AAESketchTHKCN").classed("sketch", true)
                    .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#AAESketchTHKCN").attr("startOffset", "50%").text(thkcn);

                let oppang = Math.asin(AAERI / 2 / AAERO) / Math.PI * 180 - ang;
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - padding - 2 * thickness, y: centerY},
                        {x: width - padding - 2 * thickness - 15, y: centerY - 3},
                        {x: width - padding - 2 * thickness - 15, y: centerY + 3},
                        {x: width - padding - 2 * thickness, y: centerY}
                    ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: width - padding - 2 * thickness - 15, y: centerY},
                    {x: width - padding - 2 * thickness - 30, y: centerY}
                ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: width - padding, y: centerY},
                    {x: width - padding - 2 * thickness, y: centerY}
                ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width - padding, y: centerY},
                        {x: width - padding + 15, y: centerY - 3},
                        {x: width - padding + 15, y: centerY + 3},
                        {x: width - padding, y: centerY}
                    ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: width - padding + 15, y: centerY},
                    {x: width - padding + 50, y: centerY}
                ])).attr("id", "AAESketchTHKCRN").classed("sketch", true)
                    .attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#AAESketchTHKCRN").attr("startOffset", "50%").text(thkrn);
            }
            else if (type === "中间封头") {

                // 筒体内壁
                drawLine(padding, height - padding, width - padding, height - padding);
                drawLine(padding, padding, width - padding, padding);
                // 左侧筒体端部
                drawLine(padding, padding - thickness, padding, height - padding + thickness);
                // 右侧筒体端部
                drawLine(width - padding, padding - thickness, width - padding, height - padding + thickness);
                // 左侧筒体上外壁
                drawLine(padding, padding - thickness, width / 2 - 100, padding - thickness);
                // 左侧筒体下外壁
                drawLine(padding, height - padding + thickness, width / 2 - 100, height - padding + thickness);
                // 右侧侧筒体上外壁
                drawLine(width / 2 + 100, padding - thickness, width - padding, padding - thickness);
                // 右侧侧筒体下外壁
                drawLine(width / 2 + 100, height - padding + thickness, width - padding, height - padding + thickness);
                // 筒体截断线
                drawLine(width / 2 - 100, padding - thickness, width / 2 - 100, padding);
                drawLine(width / 2 - 100, height - padding, width / 2 - 100, height - padding + thickness);
                drawLine(width / 2 + 100, padding - thickness, width / 2 + 100, padding);
                drawLine(width / 2 + 100, height - padding, width / 2 + 100, height - padding + thickness);
                // 削边线
                drawLine(width / 2 - 100, padding - thickness, width / 2 - 100 + 30, padding - 2 * thickness);
                drawLine(width / 2 - 100, height - padding + thickness, width / 2 - 100 + 30, height - padding + 2 * thickness);
                drawLine(width / 2 + 100 - 30, padding - 2 * thickness, width / 2 + 100, padding - thickness);
                drawLine(width / 2 + 100 - 30, height - padding + 2 * thickness, width / 2 + 100, height - padding + thickness);
                // 加强段外壁
                drawLine(width / 2 - 100 + 30, padding - 2 * thickness, width / 2 + 100 - 30, padding - 2 * thickness);
                drawLine(width / 2 - 100 + 30, height - padding + 2 * thickness, width / 2 + 100 - 30, height - padding + 2 * thickness);
                // 封头轮廓
                let AAERI = height - 2 * padding;
                let AAERM = height - 2 * padding + thickness;
                let AAERO = height - 2 * padding + 2 * thickness;
                // 圆心坐标
                let centerX = width / 2 - AAERI * Math.cos(Math.PI / 6) - thickness;
                let centerY = height / 2;
                // 内壁
                let innerArcTopX = centerX + AAERI * Math.cos(Math.PI / 6);
                let innerArcTopY = padding;
                let innerArcBottomX = centerX + AAERI * Math.cos(Math.PI / 6);
                let innerArcBottomY = height - padding;
                drawArc(AAERI, AAERI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);
                // 上侧加强段外壁
                let outerArcTopStartX = centerX + Math.sqrt(AAERO * AAERO - AAERI * AAERI / 4);
                let outerArcTopStartY = padding;
                let outerArcTopEndX = centerX + AAERO * Math.cos(Math.PI / 9);
                let outerArcTopEndY = centerY - AAERO * Math.sin(Math.PI / 9);
                drawArc(AAERO, AAERO, outerArcTopStartX, outerArcTopStartY, outerArcTopEndX, outerArcTopEndY);
                // 下侧加强段外壁
                let outerArcBottomStartX = outerArcTopEndX;
                let outerArcBottomStartY = height - outerArcTopEndY;
                let outerArcBottomEndX = outerArcTopStartX;
                let outerArcBottomEndY = height - outerArcTopStartY;
                drawArc(AAERO, AAERO, outerArcBottomStartX, outerArcBottomStartY, outerArcBottomEndX, outerArcBottomEndY);
                // 球冠区外壁
                let midArcStartX = centerX + AAERM * Math.cos(Math.PI / 12);
                let midArcStartY = centerY - AAERM * Math.sin(Math.PI / 12);
                let midArcEndX = centerX + AAERM * Math.cos(Math.PI / 12);
                let midArcEndY = centerY + AAERM * Math.sin(Math.PI / 12);
                drawArc(AAERM, AAERM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);
                // 封头界限
                drawLine(midArcStartX, midArcStartY, centerX + AAERI * Math.cos(Math.PI / 12), centerY - AAERI * Math.sin(Math.PI / 12));
                drawLine(midArcEndX, midArcEndY, centerX + AAERI * Math.cos(Math.PI / 12), centerY + AAERI * Math.sin(Math.PI / 12));
                // 封头削边
                drawLine(midArcStartX, midArcStartY, outerArcTopEndX, outerArcTopEndY);
                drawLine(midArcEndX, midArcEndY, outerArcBottomStartX, outerArcBottomStartY);
                // 中心线
                drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
                drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);
                // 筒体内直径
                dimLeftV(padding, height - padding, padding, padding, di, "AAESketchSDI");
                // 筒体厚度
                drawLine(padding - 30, padding - thickness, padding - 30, padding);
                drawLine(padding - 40, padding - thickness, padding - 3, padding - thickness);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: padding - 30, y: padding - thickness},
                        {x: padding - 30 - 3, y: padding - thickness - 15},
                        {x: padding - 30 + 3, y: padding - thickness - 15},
                        {x: padding - 30, y: padding - thickness}
                    ]));
                svg.append("path").attr("d", line([
                    {x: padding - 30, y: padding - thickness - 15},
                    {x: padding - 30, y: padding - thickness - 15 - 40}
                ])).attr("id", "AAESketchTHKSN").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchTHKSN").attr("startOffset", "50%").text(thksn);
                // 筒体加强段厚度
                drawLine(width / 2 - 100 + 50, padding, width / 2 - 100 + 50, padding - 2 * thickness);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 100 + 50, y: padding - 2 * thickness},
                        {x: width / 2 - 100 + 50 - 3, y: padding - 2 * thickness - 15},
                        {x: width / 2 - 100 + 50 + 3, y: padding - 2 * thickness - 15},
                        {x: width / 2 - 100 + 50, y: padding - 2 * thickness}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width / 2 - 100 + 50, y: padding - 2 * thickness - 15},
                    {x: width / 2 - 100 + 50, y: padding - 2 * thickness - 15 - 40}
                ])).attr("id", "AAESketchTHKSRN").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchTHKSRN").attr("startOffset", "50%").text(thkrn);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 100 + 50, y: padding},
                        {x: width / 2 - 100 + 50 - 3, y: padding + 15},
                        {x: width / 2 - 100 + 50 + 3, y: padding + 15},
                        {x: width / 2 - 100 + 50, y: padding}
                    ]));
                drawLine(width / 2 - 100 + 50, padding + 15, width / 2 - 100 + 50, padding + 30);
                // L
                drawLine(width / 2 - 100, height - padding + thickness + 3, width / 2 - 100, height - padding + 2 * thickness + 40);
                drawLine(innerArcTopX, height - padding + 3, innerArcTopX, height - padding + 2 * thickness + 40);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: innerArcBottomX, y: height - padding + 2 * thickness + 30},
                        {x: innerArcBottomX - 15, y: height - padding + 2 * thickness + 30 - 3},
                        {x: innerArcBottomX - 15, y: height - padding + 2 * thickness + 30 + 3},
                        {x: innerArcBottomX, y: height - padding + 2 * thickness + 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width / 2 - 100 + 15, y: height - padding + 2 * thickness + 30},
                    {x: innerArcBottomX - 15, y: height - padding + 2 * thickness + 30}
                ])).attr("id", "AAESketchLL").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchLL").attr("startOffset", "50%").text(l);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 100, y: height - padding + 2 * thickness + 30},
                        {x: width / 2 - 100 + 15, y: height - padding + 2 * thickness + 30 - 3},
                        {x: width / 2 - 100 + 15, y: height - padding + 2 * thickness + 30 + 3},
                        {x: width / 2 - 100, y: height - padding + 2 * thickness + 30}
                    ]));
                // L
                drawLine(width / 2 + 100, height - padding + thickness + 3, width / 2 + 100, height - padding + 2 * thickness + 40);
                drawLine(outerArcBottomEndX, height - padding + 3, outerArcBottomEndX, height - padding + 2 * thickness + 40);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: outerArcBottomEndX, y: height - padding + 2 * thickness + 30},
                        {x: outerArcBottomEndX + 15, y: height - padding + 2 * thickness + 30 - 3},
                        {x: outerArcBottomEndX + 15, y: height - padding + 2 * thickness + 30 + 3},
                        {x: outerArcBottomEndX, y: height - padding + 2 * thickness + 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: outerArcBottomEndX + 15, y: height - padding + 2 * thickness + 30},
                    {x: width / 2 + 100 - 15, y: height - padding + 2 * thickness + 30}
                ])).attr("id", "AAESketchLR").classed("sketch", true);
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAESketchLR").attr("startOffset", "50%").text(l);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 + 100, y: height - padding + 2 * thickness + 30},
                        {x: width / 2 + 100 - 15, y: height - padding + 2 * thickness + 30 - 3},
                        {x: width / 2 + 100 - 15, y: height - padding + 2 * thickness + 30 + 3},
                        {x: width / 2 + 100, y: height - padding + 2 * thickness + 30}
                    ]));
                // 封头球冠区
                let ang = 4;
                svg.append("path").attr("d", line([
                    {x: centerX, y: centerY},
                    {x: centerX + AAERI, y: centerY}
                ])).attr("id", "AAESketchRi").classed("sketch", true)
                    .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#AAESketchRi").attr("startOffset", "50%").text(ri);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: centerX + AAERI, y: centerY},
                        {x: centerX + AAERI - 15, y: centerY - 3},
                        {x: centerX + AAERI - 15, y: centerY + 3},
                        {x: centerX + AAERI, y: centerY}
                    ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

                svg.append("path").attr("d", line([
                    {x: centerX + AAERI, y: centerY},
                    {x: centerX + AAERM, y: centerY}
                ])).classed("sketch", true).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: centerX + AAERM, y: centerY},
                        {x: centerX + AAERM + 15, y: centerY - 3},
                        {x: centerX + AAERM + 15, y: centerY + 3},
                        {x: centerX + AAERM, y: centerY}
                    ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + AAERM + 15, y: centerY},
                    {x: centerX + AAERM + 60, y: centerY}
                ])).attr("id", "AAESketchTHKCN").classed("sketch", true)
                    .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#AAESketchTHKCN").attr("startOffset", "50%").text(thkcn);
                let oppang = Math.asin(AAERI / 2 / AAERO) / Math.PI * 180 - ang;
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: centerX + AAERI, y: centerY},
                        {x: centerX + AAERI - 15, y: centerY - 3},
                        {x: centerX + AAERI - 15, y: centerY + 3},
                        {x: centerX + AAERI, y: centerY}
                    ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + AAERI - 15, y: centerY},
                    {x: centerX + AAERI - 30, y: centerY}
                ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + AAERO, y: centerY},
                    {x: centerX + AAERI, y: centerY}
                ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: centerX + AAERO, y: centerY},
                        {x: centerX + AAERO + 15, y: centerY - 3},
                        {x: centerX + AAERO + 15, y: centerY + 3},
                        {x: centerX + AAERO, y: centerY}
                    ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("path").attr("d", line([
                    {x: centerX + AAERO + 15, y: centerY},
                    {x: centerX + AAERO + 50, y: centerY}
                ])).attr("id", "AAESketchTHKCRN").classed("sketch", true)
                    .attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#AAESketchTHKCRN").attr("startOffset", "50%").text(thkrn);
            }
        }

        currentTabIndex = aaed2d3.tabs('getTabIndex', aaed2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aae2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aae").length > 0) {
                    aae2d();
                }
            });
        }
        aaed2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aae2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aae").length > 0) {
                            aae2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 球冠形封头内压强度计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 180,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 143,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 5) {
                    $(ed.target).combobox("loadData", AAESCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAESType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAESSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAESName);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAECCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAECType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAECSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", AAECName);
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

                    // sketch & model
                    aaed2.empty();
                    aaed3.empty();

                    // sketch
                    currentTabIndex = aaed2d3.tabs('getTabIndex', aaed2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aae2d();
                        aaed2.off("resize").on("resize", function () {
                            if ($("#aae").length > 0) {
                                aae2d();
                            }
                        });
                    }
                    aaed2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aae2d();
                                aaed2.off("resize").on("resize", function () {
                                    if ($("#aae").length > 0) {
                                        aae2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    /*
                    级联菜单区
                     */
                    if (index === 1) {

                        AAEDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAESCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAESType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAESSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAESName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAECCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAECType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAECSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAECName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAESCategory = [];
                                AAECCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAEDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAESCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAECCategory[index] = {
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

                    if (index === 5) {

                        AAESCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAESType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAESSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAESName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAESCategoryVal,
                                temp: AAEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAESType = [];
                                $(result).each(function (index, element) {
                                    AAESType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 6) {

                        AAESTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAESSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAESName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAESCategoryVal,
                                type: AAESTypeVal,
                                temp: AAEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAESSTD = [];
                                $(result).each(function (index, element) {
                                    AAESSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 7) {

                        AAESSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAESName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAESCategoryVal,
                                type: AAESTypeVal,
                                std: AAESSTDVal,
                                temp: AAEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAESName = [];
                                $(result).each(function (index, element) {
                                    AAESName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 13) {

                        AAECCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAECType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAECSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAECName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAECCategoryVal,
                                temp: AAEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAECType = [];
                                $(result).each(function (index, element) {
                                    AAECType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 14) {

                        AAECTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAECSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAECName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAECCategoryVal,
                                type: AAECTypeVal,
                                temp: AAEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAECSTD = [];
                                $(result).each(function (index, element) {
                                    AAECSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    if (index === 15) {

                        AAECSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAECName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAECCategoryVal,
                                type: AAECTypeVal,
                                std: AAECSTDVal,
                                temp: AAEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAECName = [];
                                $(result).each(function (index, element) {
                                    AAECName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    /*
                    数据获取和计算区
                     */
                    let AAEPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAEPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAEPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAEPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAETest;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAETest = rows[3][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AAEType;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AAEType = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        aae2d(AAEType);
                        aaed2.off("resize").on("resize", function () {
                            if ($("#aae").length > 0) {
                                aae2d(AAEType);
                            }
                        });
                    }
                    aaed2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aae2d(AAEType);
                                aaed2.off("resize").on("resize", function () {
                                    if ($("#aae").length > 0) {
                                        aae2d(AAEType);
                                    }
                                });
                            }
                        }
                    });

                    // SNameVal
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        AAESNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AAEDS, AAESThkMin, AAESThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAESCategoryVal,
                            "type": AAESTypeVal,
                            "std": AAESSTDVal,
                            "name": AAESNameVal,
                            "temp": AAEDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAEDS = parseFloat(result.density);
                            AAESThkMin = parseFloat(result.thkMin);
                            AAESThkMax = parseFloat(result.thkMax);

                            let AAEDSI;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                AAEDSI = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aae2d(AAEType, "Φ" + AAEDSI);
                                aaed2.off("resize").on("resize", function () {
                                    if ($("#aae").length > 0) {
                                        aae2d(AAEType, "Φ" + AAEDSI);
                                    }
                                });
                            }
                            aaed2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aae2d(AAEType, "Φ" + AAEDSI);
                                        aaed2.off("resize").on("resize", function () {
                                            if ($("#aae").length > 0) {
                                                aae2d(AAEType, "Φ" + AAEDSI);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAETHKSN;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > AAESThkMin
                                && parseFloat(rows[10][columns[0][1].field]) <= AAESThkMax) {
                                AAETHKSN = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) <= AAESThkMin) {
                                south.html("筒体材料厚度不能小于等于 " + AAESThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > AAESThkMax) {
                                south.html("筒体材料厚度不能大于 " + AAESThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN);
                                aaed2.off("resize").on("resize", function () {
                                    if ($("#aae").length > 0) {
                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN);
                                    }
                                });
                            }
                            aaed2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN);
                                        aaed2.off("resize").on("resize", function () {
                                            if ($("#aae").length > 0) {
                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAEOST, AAEOS, AAEOST1, AAERSEL, AAECS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAESCategoryVal,
                                    "type": AAESTypeVal,
                                    "std": AAESSTDVal,
                                    "name": AAESNameVal,
                                    "thk": AAETHKSN,
                                    "temp": AAEDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAEDSI + 2 * AAETHKSN
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    AAEOST = parseFloat(result.ot);
                                    if (AAEOST < 0) {
                                        south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    AAEOS = parseFloat(result.o);
                                    if (AAEOS < 0) {
                                        south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    AAEOST1 = parseFloat(result.ot1);

                                    AAERSEL = parseFloat(result.rel);
                                    if (AAERSEL < 0) {
                                        south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    AAECS1 = parseFloat(result.c1);
                                    if (AAECS1 < 0) {
                                        south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 腐蚀裕量
                                    let AAECS2;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) < AAETHKSN) {
                                        AAECS2 = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) >= AAETHKSN) {
                                        south.html("筒体腐蚀裕量不能大于等于 " + AAETHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 筒体焊接接头系数
                                    let AAEFAIS;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                        AAEFAIS = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 封头材料名称
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                        AAECNameVal = rows[16][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let AAEDC, AAECThkMin, AAECThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": AAECCategoryVal,
                                            "type": AAECTypeVal,
                                            "std": AAECSTDVal,
                                            "name": AAECNameVal,
                                            "temp": AAEDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            AAEDC = parseFloat(result.density);
                                            AAECThkMin = parseFloat(result.thkMin);
                                            AAECThkMax = parseFloat(result.thkMax);

                                            // 封头内半径
                                            let AAERI;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) >= 0.7 * AAEDSI
                                                && parseFloat(rows[17][columns[0][1].field]) <= AAEDSI) {
                                                AAERI = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) < 0.7 * AAEDSI) {
                                                south.html("封头内半径不能小于 " + 0.7 * AAEDSI + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > AAEDSI) {
                                                south.html("封头内半径不能大于 " + AAEDSI + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI);
                                                aaed2.off("resize").on("resize", function () {
                                                    if ($("#aae").length > 0) {
                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI);
                                                    }
                                                });
                                            }
                                            aaed2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI);
                                                        aaed2.off("resize").on("resize", function () {
                                                            if ($("#aae").length > 0) {
                                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 封头名义厚度
                                            let AAETHKCN;
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > AAECThkMin
                                                && parseFloat(rows[18][columns[0][1].field]) <= AAECThkMax) {
                                                AAETHKCN = parseFloat(rows[18][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) <= AAECThkMin) {
                                                south.html("封头材料厚度不能小于等于 " + AAECThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > AAECThkMax) {
                                                south.html("封头材料厚度不能大于 " + AAECThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN);
                                                aaed2.off("resize").on("resize", function () {
                                                    if ($("#aae").length > 0) {
                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN);
                                                    }
                                                });
                                            }
                                            aaed2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN);
                                                        aaed2.off("resize").on("resize", function () {
                                                            if ($("#aae").length > 0) {
                                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let AAEOCT, AAEOC, AAEOCT1, AAERCEL, AAECC1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": AAECCategoryVal,
                                                    "type": AAECTypeVal,
                                                    "std": AAECSTDVal,
                                                    "name": AAECNameVal,
                                                    "thk": AAETHKCN,
                                                    "temp": AAEDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 2 * AAERI + 2 * AAETHKCN
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    AAEOCT = parseFloat(result.ot);
                                                    if (AAEOCT < 0) {
                                                        south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    AAEOC = parseFloat(result.o);
                                                    if (AAEOC < 0) {
                                                        south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    AAEOCT1 = parseFloat(result.ot1);

                                                    AAERCEL = parseFloat(result.rel);
                                                    if (AAERCEL < 0) {
                                                        south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    AAECC1 = parseFloat(result.c1);
                                                    if (AAECC1 < 0) {
                                                        south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 腐蚀裕量
                                                    let AAECC2;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < AAETHKCN) {
                                                        AAECC2 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= AAETHKCN) {
                                                        south.html("封头腐蚀裕量不能大于等于 " + AAETHKCN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 焊接接头系数
                                                    let AAEFAIC;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                        AAEFAIC = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 加强段名义厚度
                                                    let AAETHKRN;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                        && parseFloat(rows[21][columns[0][1].field]) > Math.max(AAECThkMin, AAESThkMin)
                                                        && parseFloat(rows[21][columns[0][1].field]) <= Math.min(AAECThkMax, AAESThkMax)) {
                                                        AAETHKRN = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                        && parseFloat(rows[21][columns[0][1].field]) <= Math.max(AAECThkMin, AAESThkMin)) {
                                                        south.html("加强段厚度不能小于等于 " + Math.max(AAECThkMin, AAESThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                        && parseFloat(rows[21][columns[0][1].field]) > Math.min(AAECThkMax, AAESThkMax)) {
                                                        south.html("加强段厚度不能大于 " + Math.min(AAECThkMax, AAESThkMax) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN);
                                                        aaed2.off("resize").on("resize", function () {
                                                            if ($("#aae").length > 0) {
                                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN);
                                                            }
                                                        });
                                                    }
                                                    aaed2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN);
                                                                aaed2.off("resize").on("resize", function () {
                                                                    if ($("#aae").length > 0) {
                                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体加强段力学性质
                                                    let AAEOSRT, AAEOSR, AAEOSRT1, AAERSREL, AAECSR1;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_gbt_150_2011_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": AAESCategoryVal,
                                                            "type": AAESTypeVal,
                                                            "std": AAESSTDVal,
                                                            "name": AAESNameVal,
                                                            "thk": AAETHKRN,
                                                            "temp": AAEDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": AAEDSI + 2 * AAETHKRN
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            AAEOSRT = parseFloat(result.ot);
                                                            if (AAEOSRT < 0) {
                                                                south.html("查询筒体加强段材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            AAEOSR = parseFloat(result.o);
                                                            if (AAEOSR < 0) {
                                                                south.html("查询筒体加强段材料常温许用应力失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            AAEOSRT1 = parseFloat(result.ot1);

                                                            AAERSREL = parseFloat(result.rel);
                                                            if (AAERSREL < 0) {
                                                                south.html("查询筒体加强段材料常温屈服强度失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            AAECSR1 = parseFloat(result.c1);
                                                            if (AAECSR1 < 0) {
                                                                south.html("查询筒体加强段材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            let AAEOCRT, AAEOCR, AAEOCRT1, AAERCREL, AAECCR1;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_gbt_150_2011_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": AAECCategoryVal,
                                                                    "type": AAECTypeVal,
                                                                    "std": AAECSTDVal,
                                                                    "name": AAECNameVal,
                                                                    "thk": AAETHKRN,
                                                                    "temp": AAEDT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 2 * AAERI + 2 * AAETHKRN
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    AAEOCRT = parseFloat(result.ot);
                                                                    if (AAEOCRT < 0) {
                                                                        south.html("查询封头加强段材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    AAEOCR = parseFloat(result.o);
                                                                    if (AAEOCR < 0) {
                                                                        south.html("查询封头加强段材料常温许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    AAEOCRT1 = parseFloat(result.ot1);

                                                                    AAERCREL = parseFloat(result.rel);
                                                                    if (AAERCREL < 0) {
                                                                        south.html("查询封头加强段材料常温屈服强度失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    AAECCR1 = parseFloat(result.c1);
                                                                    if (AAECCR1 < 0) {
                                                                        south.html("查询封头加强段材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    let AAEPC = AAEPD + AAEPS;

                                                                    /*
                                                                    筒体计算
                                                                     */
                                                                    let AAECS = AAECS1 + AAECS2;
                                                                    let AAETHKSE = AAETHKSN - AAECS;
                                                                    let AAETHKSC = (AAEPC * AAEDSI) / (2 * AAEOST * AAEFAIS - AAEPC);
                                                                    let AAETHKSD = AAETHKSC + AAECS2;
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "筒体所需厚度：" + (AAETHKSD + AAECS1).toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    let AAETHKSCHK;
                                                                    if (AAETHKSN >= (AAETHKSD + AAECS1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAETHKSN + " mm" +
                                                                            "</span>");
                                                                        AAETHKSCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAETHKSN + " mm" +
                                                                            "</span>");
                                                                        AAETHKSCHK = "不合格";
                                                                    }

                                                                    /*
                                                                    封头计算
                                                                     */
                                                                    let AAECC = AAECC1 + AAECC2;
                                                                    let AAETHKCE = AAETHKCN - AAECC;
                                                                    let AAETHKCC = (2 * AAEPC * AAERI) / (4 * AAEOCT * AAEFAIC - AAEPC);
                                                                    let AAETHKCD = AAETHKCC + AAECC2;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "封头所需厚度：" + (AAETHKCD + AAECC1).toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    let AAETHKCCHK;
                                                                    if (AAETHKCN >= (AAETHKCD + AAECC1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAETHKCN + " mm" +
                                                                            "</span>");
                                                                        AAETHKCCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAETHKCN + " mm" +
                                                                            "</span>");
                                                                        AAETHKCCHK = "不合格";
                                                                    }

                                                                    /*
                                                                    加强段计算
                                                                     */
                                                                    let AAECR2 = Math.max(AAECS2, AAECC2);
                                                                    let AAECR1 = Math.max(AAECCR1, AAECSR1);
                                                                    let AAECR = AAECR1 + AAECR2;
                                                                    let AAERIDI = AAERI / AAEDSI;
                                                                    let AAETHKSRC = (AAEPC * AAEDSI) / (2 * AAEOSRT * AAEFAIS - AAEPC);
                                                                    let AAETHKSRC2DI = 2 * AAETHKSRC / AAEDSI;
                                                                    let AAEPCOSRTES, AAETHKRC;
                                                                    let AAEQ7, AAEQ8, AAEQ9, AAEQ10, AAEQ;
                                                                    if (AAEType === "端封头") {
                                                                        if (AAETHKSRC2DI >= 0.002 && AAETHKSRC2DI <= 0.1) {

                                                                            AAEPCOSRTES = AAEPC / (AAEOSRT * AAEFAIS);

                                                                            AAEQ7 = 0.3175191 * Math.pow(AAEPCOSRTES, -0.3652483);
                                                                            AAEQ8 = 0.35914 * Math.pow(AAEPCOSRTES, -0.36864554);
                                                                            AAEQ9 = 0.393207 * Math.pow(AAEPCOSRTES, -0.369881);
                                                                            AAEQ10 = 0.42387422 * Math.pow(AAEPCOSRTES, -0.370322442);

                                                                            if (AAERIDI === 0.7) {
                                                                                AAEQ = AAEQ7;
                                                                            }
                                                                            else if (AAERIDI > 0.7 && AAERIDI < 0.8) {
                                                                                AAEQ = AAEQ7 + (AAERIDI - 0.7) / (0.8 - 0.7) * (AAEQ8 - AAEQ7);
                                                                            }
                                                                            else if (AAERIDI === 0.8) {
                                                                                AAEQ = AAEQ8;
                                                                            }
                                                                            else if (AAERIDI > 0.8 && AAERIDI < 0.9) {
                                                                                AAEQ = AAEQ8 + (AAERIDI - 0.8) / (0.9 - 0.8) * (AAEQ9 - AAEQ8);
                                                                            }
                                                                            else if (AAERIDI === 0.9) {
                                                                                AAEQ = AAEQ9;
                                                                            }
                                                                            else if (AAERIDI > 0.9 && AAERIDI < 1.0) {
                                                                                AAEQ = AAEQ9 + (AAERIDI - 0.9) / (1.0 - 0.9) * (AAEQ10 - AAEQ9);
                                                                            }
                                                                            else if (AAERIDI === 1.0) {
                                                                                AAEQ = AAEQ10;
                                                                            }
                                                                            else {
                                                                                south.html("查图 5-5 超界！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            AAETHKRC = AAEQ * AAETHKSRC;
                                                                        }
                                                                        else if (AAETHKSRC2DI < 0.002 && AAETHKSRC2DI > 0) {

                                                                            AAEPCOSRTES = 0.002;
                                                                            AAEQ7 = 0.3175191 * Math.pow(AAEPCOSRTES, -0.3652483);
                                                                            AAEQ8 = 0.35914 * Math.pow(AAEPCOSRTES, -0.36864554);
                                                                            AAEQ9 = 0.393207 * Math.pow(AAEPCOSRTES, -0.369881);
                                                                            AAEQ10 = 0.42387422 * Math.pow(AAEPCOSRTES, -0.370322442);

                                                                            if (AAERIDI === 0.7) {
                                                                                AAEQ = AAEQ7;
                                                                            }
                                                                            else if (AAERIDI > 0.7 && AAERIDI < 0.8) {
                                                                                AAEQ = AAEQ7 + (AAERIDI - 0.7) / (0.8 - 0.7) * (AAEQ8 - AAEQ7);
                                                                            }
                                                                            else if (AAERIDI === 0.8) {
                                                                                AAEQ = AAEQ8;
                                                                            }
                                                                            else if (AAERIDI > 0.8 && AAERIDI < 0.9) {
                                                                                AAEQ = AAEQ8 + (AAERIDI - 0.8) / (0.9 - 0.8) * (AAEQ9 - AAEQ8);
                                                                            }
                                                                            else if (AAERIDI === 0.9) {
                                                                                AAEQ = AAEQ9;
                                                                            }
                                                                            else if (AAERIDI > 0.9 && AAERIDI < 1.0) {
                                                                                AAEQ = AAEQ9 + (AAERIDI - 0.9) / (1.0 - 0.9) * (AAEQ10 - AAEQ9);
                                                                            }
                                                                            else if (AAERIDI === 1.0) {
                                                                                AAEQ = AAEQ10;
                                                                            }
                                                                            else {
                                                                                south.html("查图 5-5 超界！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            AAETHKRC = AAEQ * 0.001 * AAEDSI;
                                                                        }
                                                                        else {
                                                                            south.html("查图 5-5 超界！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                    }
                                                                    else if (AAEType === "中间封头") {
                                                                        if (AAETHKSRC2DI >= 0.002 && AAETHKSRC2DI <= 0.1) {

                                                                            AAEPCOSRTES = AAEPC / (AAEOSRT * AAEFAIS);

                                                                            AAEQ7 = 0.37173 * Math.pow(AAEPCOSRTES, -0.31173);
                                                                            AAEQ8 = 0.41397 * Math.pow(AAEPCOSRTES, -0.31710);
                                                                            AAEQ9 = 0.45340 * Math.pow(AAEPCOSRTES, -0.32038);
                                                                            AAEQ10 = 0.47842 * Math.pow(AAEPCOSRTES, -0.32539);

                                                                            if (AAERIDI === 0.7) {
                                                                                AAEQ = AAEQ7;
                                                                            }
                                                                            else if (AAERIDI > 0.7 && AAERIDI < 0.8) {
                                                                                AAEQ = AAEQ7 + (AAERIDI - 0.7) / (0.8 - 0.7) * (AAEQ8 - AAEQ7);
                                                                            }
                                                                            else if (AAERIDI === 0.8) {
                                                                                AAEQ = AAEQ8;
                                                                            }
                                                                            else if (AAERIDI > 0.8 && AAERIDI < 0.9) {
                                                                                AAEQ = AAEQ8 + (AAERIDI - 0.8) / (0.9 - 0.8) * (AAEQ9 - AAEQ8);
                                                                            }
                                                                            else if (AAERIDI === 0.9) {
                                                                                AAEQ = AAEQ9;
                                                                            }
                                                                            else if (AAERIDI > 0.9 && AAERIDI < 1.0) {
                                                                                AAEQ = AAEQ9 + (AAERIDI - 0.9) / (1.0 - 0.9) * (AAEQ10 - AAEQ9);
                                                                            }
                                                                            else if (AAERIDI === 1.0) {
                                                                                AAEQ = AAEQ10;
                                                                            }
                                                                            else {
                                                                                south.html("查图 5-6 超界！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            AAETHKRC = AAEQ * AAETHKSRC;
                                                                        }
                                                                        else if (AAETHKSRC2DI < 0.002 && AAETHKSRC2DI > 0) {

                                                                            AAEPCOSRTES = 0.002;
                                                                            AAEQ7 = 0.37173 * Math.pow(AAEPCOSRTES, -0.31173);
                                                                            AAEQ8 = 0.41397 * Math.pow(AAEPCOSRTES, -0.31710);
                                                                            AAEQ9 = 0.45340 * Math.pow(AAEPCOSRTES, -0.32038);
                                                                            AAEQ10 = 0.47842 * Math.pow(AAEPCOSRTES, -0.32539);

                                                                            if (AAERIDI === 0.7) {
                                                                                AAEQ = AAEQ7;
                                                                            }
                                                                            else if (AAERIDI > 0.7 && AAERIDI < 0.8) {
                                                                                AAEQ = AAEQ7 + (AAERIDI - 0.7) / (0.8 - 0.7) * (AAEQ8 - AAEQ7);
                                                                            }
                                                                            else if (AAERIDI === 0.8) {
                                                                                AAEQ = AAEQ8;
                                                                            }
                                                                            else if (AAERIDI > 0.8 && AAERIDI < 0.9) {
                                                                                AAEQ = AAEQ8 + (AAERIDI - 0.8) / (0.9 - 0.8) * (AAEQ9 - AAEQ8);
                                                                            }
                                                                            else if (AAERIDI === 0.9) {
                                                                                AAEQ = AAEQ9;
                                                                            }
                                                                            else if (AAERIDI > 0.9 && AAERIDI < 1.0) {
                                                                                AAEQ = AAEQ9 + (AAERIDI - 0.9) / (1.0 - 0.9) * (AAEQ10 - AAEQ9);
                                                                            }
                                                                            else if (AAERIDI === 1.0) {
                                                                                AAEQ = AAEQ10;
                                                                            }
                                                                            else {
                                                                                south.html("查图 5-6 超界！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            AAETHKRC = AAEQ * 0.001 * AAEDSI;
                                                                        }
                                                                        else {
                                                                            south.html("查图 5-6 超界！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    let AAETHKRD = AAETHKRC + AAECR2;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强段所需厚度：" + (AAETHKRD + AAECR1).toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    let AAETHKRCHK;
                                                                    if (AAETHKRN >= (AAETHKRD + AAECR1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAETHKRN + " mm" +
                                                                            "</span>");
                                                                        AAETHKRCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + AAETHKRN + " mm" +
                                                                            "</span>");
                                                                        AAETHKRCHK = "不合格";
                                                                    }

                                                                    // 加强段长度
                                                                    let AAERL = Math.sqrt(2 * AAEDSI * AAETHKRC);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强段最小长度：" + AAERL.toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN, "≥" + AAERL.toFixed(2), "≥" + 2 * AAETHKRC.toFixed(2));
                                                                        aaed2.off("resize").on("resize", function () {
                                                                            if ($("#aae").length > 0) {
                                                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN, "≥" + AAERL.toFixed(2), "≥" + 2 * AAETHKRC.toFixed(2));
                                                                            }
                                                                        });
                                                                    }
                                                                    aaed2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN, "≥" + AAERL.toFixed(2), "≥" + 2 * AAETHKRC.toFixed(2));
                                                                                aaed2.off("resize").on("resize", function () {
                                                                                    if ($("#aae").length > 0) {
                                                                                        aae2d(AAEType, "Φ" + AAEDSI, AAETHKSN, "SR" + AAERI, AAETHKCN, AAETHKRN, "≥" + AAERL.toFixed(2), "≥" + 2 * AAETHKRC.toFixed(2));
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // 压力试验
                                                                    let AAEETA, AAEPCT, AAEPCRT, AAEPST, AAEPSRT, AAEPT;
                                                                    if (AAETest === "液压试验") {
                                                                        AAEETA = 1.25;
                                                                        AAEPCT = AAEETA * AAEPD * AAEOC / Math.max(AAEOCT, AAEOCT1);
                                                                        AAEPCRT = AAEETA * AAEPD * AAEOCR / Math.max(AAEOCRT, AAEOCRT1);
                                                                        AAEPST = AAEETA * AAEPD * AAEOS / Math.max(AAEOST, AAEOST1);
                                                                        AAEPSRT = AAEETA * AAEPD * AAEOSR / Math.max(AAEOSRT, AAEOSRT1);
                                                                        AAEPT = Math.min(AAEPCT, AAEPCRT, AAEPST, AAEPSRT);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试压类型：液压" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试验压力：" + AAEPT.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                    }
                                                                    else if (AAETest === "气压试验") {
                                                                        AAEETA = 1.1;
                                                                        AAEPCT = AAEETA * AAEPD * AAEOC / Math.max(AAEOCT, AAEOCT1);
                                                                        AAEPCRT = AAEETA * AAEPD * AAEOCR / Math.max(AAEOCRT, AAEOCRT1);
                                                                        AAEPST = AAEETA * AAEPD * AAEOS / Math.max(AAEOST, AAEOST1);
                                                                        AAEPSRT = AAEETA * AAEPD * AAEOSR / Math.max(AAEOSRT, AAEOSRT1);
                                                                        AAEPT = Math.min(AAEPCT, AAEPCRT, AAEPST, AAEPSRT);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试压类型：气压" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试验压力：" + AAEPT.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // MAWP
                                                                    let AAEMAWPC = (4 * AAETHKCE * AAEOCT * AAEFAIC) / (2 * AAERI + AAETHKCE) - AAEPS;
                                                                    let AAEMAWPS = (2 * AAETHKSE * AAEOST * AAEFAIS) / (AAEDSI + AAETHKSE) - AAEPS;

                                                                    // MAWPR
                                                                    let AAEMAWPR;
                                                                    let i = AAEPC, j = AAETHKRC + AAECS2 + AAECS1, q;
                                                                    for (; j <= AAETHKRN; i += 0.0001) {

                                                                        let m = i / (AAEOSRT * AAEFAIS);
                                                                        let n = i * AAEDSI / (2 * AAEOSRT * AAEFAIS - i);

                                                                        if (2 * n / AAEDSI < 0.002) {
                                                                            m = 0.002;
                                                                        }

                                                                        if (2 * n / AAEDSI > 0.1) {
                                                                            if (AAEType === "端封头") {
                                                                                south.html("查图 5-5 超界！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (AAEType === "中间封头") {
                                                                                south.html("查图 5-6 超界！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                        }

                                                                        // 求 Q
                                                                        if (AAEType === "端封头") {
                                                                            if (AAERIDI === 0.7) {
                                                                                q = 0.3175191 * Math.pow(m, -0.3652483);
                                                                            }
                                                                            else if (AAERIDI > 0.7 && AAERIDI < 0.8) {
                                                                                q = 0.3175191 * Math.pow(m, -0.3652483) + (AAERIDI - 0.7) / (0.8 - 0.7) * (0.35914 * Math.pow(m, -0.36864554) - 0.3175191 * Math.pow(m, -0.3652483));
                                                                            }
                                                                            else if (AAERIDI === 0.8) {
                                                                                q = 0.35914 * Math.pow(m, -0.36864554);
                                                                            }
                                                                            else if (AAERIDI > 0.8 && AAERIDI < 0.9) {
                                                                                q = 0.35914 * Math.pow(m, -0.36864554) + (AAERIDI - 0.8) / (0.9 - 0.8) * (0.393207 * Math.pow(m, -0.369881) - 0.35914 * Math.pow(m, -0.36864554));
                                                                            }
                                                                            else if (AAERIDI === 0.9) {
                                                                                q = 0.393207 * Math.pow(m, -0.369881);
                                                                            }
                                                                            else if (AAERIDI > 0.9 && AAERIDI < 1.0) {
                                                                                q = 0.393207 * Math.pow(m, -0.369881) + (AAERIDI - 0.9) / (1.0 - 0.9) * (0.42387422 * Math.pow(m, -0.370322442) - 0.393207 * Math.pow(m, -0.369881));
                                                                            }
                                                                            else if (AAERIDI === 1.0) {
                                                                                q = 0.42387422 * Math.pow(m, -0.370322442);
                                                                            }
                                                                            else {
                                                                                south.html("查图 5-5 超界！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                        }
                                                                        else if (AAEType === "中间封头") {
                                                                            if (AAERIDI === 0.7) {
                                                                                q = 0.37173 * Math.pow(m, -0.31173);
                                                                            }
                                                                            else if (AAERIDI > 0.7 && AAERIDI < 0.8) {
                                                                                q = 0.37173 * Math.pow(m, -0.31173) + (AAERIDI - 0.7) / (0.8 - 0.7) * (0.41397 * Math.pow(m, -0.31710) - 0.37173 * Math.pow(m, -0.31173));
                                                                            }
                                                                            else if (AAERIDI === 0.8) {
                                                                                q = 0.41397 * Math.pow(m, -0.31710);
                                                                            }
                                                                            else if (AAERIDI > 0.8 && AAERIDI < 0.9) {
                                                                                q = 0.41397 * Math.pow(m, -0.31710) + (AAERIDI - 0.8) / (0.9 - 0.8) * (0.45340 * Math.pow(m, -0.32038) - 0.41397 * Math.pow(m, -0.31710));
                                                                            }
                                                                            else if (AAERIDI === 0.9) {
                                                                                q = 0.45340 * Math.pow(m, -0.32038);
                                                                            }
                                                                            else if (AAERIDI > 0.9 && AAERIDI < 1.0) {
                                                                                q = 0.45340 * Math.pow(m, -0.32038) + (AAERIDI - 0.9) / (1.0 - 0.9) * (0.47842 * Math.pow(m, -0.32539) - 0.45340 * Math.pow(m, -0.32038));
                                                                            }
                                                                            else if (AAERIDI === 1.0) {
                                                                                q = 0.47842 * Math.pow(m, -0.32539);
                                                                            }
                                                                            else {
                                                                                south.html("查图 5-6 超界！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                        }

                                                                        if (2 * n / AAEDSI < 0.002) {
                                                                            j = q * 0.001 * AAEDSI + AAECS2 + AAECS1;
                                                                        } else {
                                                                            j = q * n + AAECS2 + AAECS1;
                                                                        }
                                                                    }
                                                                    AAEMAWPR = i - 0.0001 - AAEPS;

                                                                    // MAWP
                                                                    let AAEMAWP = Math.min(AAEMAWPC, AAEMAWPS, AAEMAWPR);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "MAWP：" + AAEMAWP.toFixed(4) + " MPa" +
                                                                        "</span>");

                                                                    // docx
                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "aaedocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "AAE",

                                                                                type: AAEType,

                                                                                pd: AAEPD,
                                                                                t: AAEDT,
                                                                                ps: AAEPS,
                                                                                di: AAEDSI,
                                                                                thksn: AAETHKSN,
                                                                                cs2: AAECS2,
                                                                                fais: AAEFAIS,
                                                                                sstd: AAESSTDVal,
                                                                                sname: AAESNameVal,
                                                                                ri: AAERI,
                                                                                thkcn: AAETHKCN,
                                                                                cc2: AAECC2,
                                                                                faic: AAEFAIC,
                                                                                cstd: AAECSTDVal,
                                                                                cname: AAECNameVal,
                                                                                thkrn: AAETHKRN,
                                                                                test: AAETest,

                                                                                dc: AAEDC.toFixed(4),
                                                                                oct: AAEOCT.toFixed(4),
                                                                                oc: AAEOC.toFixed(4),
                                                                                rcrel: AAERCREL.toFixed(4),
                                                                                oct1: AAEOCT1.toFixed(4),
                                                                                cc1: AAECC1.toFixed(4),

                                                                                ds: AAEDS.toFixed(4),
                                                                                ost: AAEOST.toFixed(4),
                                                                                os: AAEOS.toFixed(4),
                                                                                rsrel: AAERSREL.toFixed(4),
                                                                                ost1: AAEOST1.toFixed(4),
                                                                                cs1: AAECS1.toFixed(4),

                                                                                ocrt: AAEOCRT.toFixed(4),
                                                                                ocr: AAEOCR.toFixed(4),
                                                                                rcrrel: AAERCREL.toFixed(4),
                                                                                ocrt1: AAEOCRT1.toFixed(4),
                                                                                ccr1: AAECCR1.toFixed(4),

                                                                                osrt: AAEOSRT.toFixed(4),
                                                                                osr: AAEOSR.toFixed(4),
                                                                                rsrrel: AAERSREL.toFixed(4),
                                                                                osrt1: AAEOSRT1.toFixed(4),
                                                                                csr1: AAECSR1.toFixed(4),

                                                                                pc: AAEPC.toFixed(4),

                                                                                cc: AAECC.toFixed(4),
                                                                                thkce: AAETHKCE.toFixed(4),
                                                                                thkcc: AAETHKCC.toFixed(4),
                                                                                thkcd: AAETHKCD.toFixed(4),
                                                                                thkcchk: AAETHKCCHK,

                                                                                cs: AAECS.toFixed(4),
                                                                                thkse: AAETHKSE.toFixed(4),
                                                                                thksc: AAETHKSC.toFixed(4),
                                                                                thksd: AAETHKSD.toFixed(4),
                                                                                thkschk: AAETHKSCHK,

                                                                                cr2: AAECR2.toFixed(4),
                                                                                cr1: AAECR1.toFixed(4),
                                                                                cr: AAECR.toFixed(4),
                                                                                ridi: AAERIDI.toFixed(4),
                                                                                thksrc: AAETHKSRC.toFixed(4),
                                                                                thksrc2di: AAETHKSRC2DI.toFixed(4),
                                                                                pcosrtes: AAEPCOSRTES.toFixed(4),
                                                                                q: AAEQ.toFixed(4),
                                                                                thkrc: AAETHKRC.toFixed(4),
                                                                                thkrd: AAETHKRD.toFixed(4),
                                                                                thkrchk: AAETHKRCHK,
                                                                                l: AAERL.toFixed(4),

                                                                                eta: AAEETA.toFixed(4),
                                                                                pct: AAEPCT.toFixed(4),
                                                                                pcrt: AAEPCRT.toFixed(4),
                                                                                pst: AAEPST.toFixed(4),
                                                                                psrt: AAEPSRT.toFixed(4),
                                                                                pt: AAEPT.toFixed(4),

                                                                                mawpc: AAEMAWPC.toFixed(4),
                                                                                mawps: AAEMAWPS.toFixed(4),
                                                                                mawpr: AAEMAWPR.toFixed(4),
                                                                                mawp: AAEMAWP.toFixed(4)
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
                                                                                    AAEPayJS.dialog({
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
                                                                                                AAEPayJS.dialog("close");
                                                                                                AAEPayJS.dialog("clear");
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
                                                                                                            AAEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    AAEPayJS.dialog('close');
                                                                                                                    AAEPayJS.dialog('clear');
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
                                                                        "<span style='color:red;'>&ensp;封头加强段材料力学特性获取失败，请检查网络后重试</span>");
                                                                }
                                                            });
                                                        },
                                                        error: function () {
                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                "<span style='color:red;'>&ensp;筒体加强段材料力学特性获取失败，请检查网络后重试</span>");
                                                        }
                                                    });
                                                },
                                                error: function () {
                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                        "<span style='color:red;'>&ensp;封头材料力学特性获取失败，请检查网络后重试</span>");
                                                }
                                            });
                                        },
                                        error: function () {
                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                "<span style='color:red;'>&ensp;封头材料物理性质获取失败，请检查网络后重试</span>");
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;筒体材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;筒体材料物理性质获取失败，请检查网络后重试</span>");
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