$(document).ready(function () {
    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");
    let xdaSketch = $("#d2");
    let xdaModel = $("#d3");
    let xdad2d3 = $('#d2d3');
    $("#cal").html("<table id='xda'></table>");
    let pg = $("#xda");
    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/x/d/a/XDA.json", function (result) {

        let XDADT,
            XDABCategory, XDABCategoryVal, XDABType, XDABTypeVal, XDABSTD, XDABSTDVal, XDABName, XDABNameVal,
            XDAHCategory, XDAHCategoryVal, XDAHType, XDAHTypeVal, XDAHSTD, XDAHSTDVal, XDAHName, XDAHNameVal,
            XDARCategory, XDARCategoryVal, XDARType, XDARTypeVal, XDARSTD, XDARSTDVal, XDARName, XDARNameVal,
            XDASCategory, XDASCategoryVal, XDASType, XDASTypeVal, XDASSTD, XDASSTDVal, XDASName, XDASNameVal,
            columns, rows, ed;

        function xda2d(rb = "Rb", sb = "Sb", lb = "Lb", lr = "Lr", ls = "Ls") {

            xdaSketch.empty();

            let width = xdaSketch.width();
            let height = xdaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XDASVG").attr("height", height);

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
                        {x: startX + 10, y: startY - 28},
                        {x: startX + 10, y: startY - 32},
                        {x: startX, y: startY - 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY - 30},
                        {x: endX - 10, y: endY - 28},
                        {x: endX - 10, y: endY - 32},
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
                        {x: startX + 28, y: startY - 10},
                        {x: startX + 32, y: startY - 10},
                        {x: startX + 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX + 30, y: endY},
                        {x: endX + 28, y: endY + 10},
                        {x: endX + 32, y: endY + 10},
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

            let padding = 20;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 10;

            // 吊环
            let ri = 2 * thk;
            let ro = ri + thk;
            // 中间，圆弧中心为画布中心
            let x0 = width / 2 - wg;
            let y0 = height / 2;
            drawArc(ri, ri, x0 - 0.707 * ri, y0 - 0.707 * ri, x0 - thk / 2, y0 - ri);
            drawArc(ri, ri, x0 + thk / 2, y0 - ri, x0 + 0.707 * ri, y0 - 0.707 * ri);
            drawArc(ro, ro, x0 - 0.707 * ro, y0 - 0.707 * ro, x0 - thk / 2, y0 - ro);
            drawArc(ro, ro, x0 + thk / 2, y0 - ro, x0 + 0.707 * ro, y0 - 0.707 * ro);

            // 左侧
            drawArc(ri, ri, x0 - 0.707 * ro, y0 - 0.707 * ro, x0 - 0.707 * ro - 0.707 * ri, y0 - thk);
            drawArc(ro, ro, x0 - 0.707 * ri, y0 - 0.707 * ri, x0 - 0.707 * ri - 0.707 * ro, y0);
            svg.append("path").attr("d", line([
                {x: x0 - 0.707 * ro - 0.707 * ri, y: y0 - thk},
                {x: x0 - 0.707 * ro - 0.707 * ri - thk, y: y0 - thk},
                {x: x0 - 0.707 * ro - 0.707 * ri - thk, y: y0},
                {x: x0 - 0.707 * ri - 0.707 * ro, y: y0}
            ])).classed("sketch", true);

            // 右侧
            drawArc(ri, ri, x0 + 0.707 * ro + 0.707 * ri, y0 - thk, x0 + 0.707 * ro, y0 - 0.707 * ro);
            drawArc(ro, ro, x0 + 0.707 * ro + 0.707 * ri, y0, x0 + 0.707 * ri, y0 - 0.707 * ri);
            svg.append("path").attr("d", line([
                {x: x0 + 0.707 * ro + 0.707 * ri, y: y0 - thk},
                {x: x0 + 0.707 * ro + 0.707 * ri + thk, y: y0 - thk},
                {x: x0 + 0.707 * ro + 0.707 * ri + thk, y: y0},
                {x: x0 + 0.707 * ri + 0.707 * ro, y: y0}
            ])).classed("sketch", true);
            dimBottomH(x0 - 0.707 * ro - 0.707 * ri - thk, y0, x0 + 0.707 * ro + 0.707 * ri + thk, y0, lr, "XDASketchLR");

            // 吊钩
            drawArc(thk / 2, thk / 2, x0 + thk / 2, y0 - ri + thk / 2, x0 - thk / 2, y0 - ri + thk / 2);
            svg.append("path").attr("d", line([
                {x: x0 - thk / 2, y: y0 - ri + thk / 2},
                {x: x0 - thk / 2, y: padding + hg + thk / 2},
                {x: x0 + thk / 2, y: padding + hg + thk / 2},
                {x: x0 + thk / 2, y: y0 - ri + thk / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: x0 - thk / 2, y: padding + hg - 2.5 * thk},
                {x: x0 - thk / 2, y: padding + hg - 4 * thk},
                {x: x0 + thk / 2, y: padding + hg - 4 * thk},
                {x: x0 + thk / 2, y: padding + hg - 2.5 * thk}
            ])).classed("sketch", true);
            // 螺母
            svg.append("path").attr("d", line([
                {x: x0 - thk / 2 - thk / 2, y: padding + hg - 1.5 * thk},
                {x: x0 + thk / 2 + thk / 2, y: padding + hg - 1.5 * thk},
                {x: x0 + thk / 2 + thk / 2, y: padding + hg - 0.5 * thk},
                {x: x0 - thk / 2 - thk / 2, y: padding + hg - 0.5 * thk},
                {x: x0 - thk / 2 - thk / 2, y: padding + hg - 1.5 * thk}
            ])).classed("sketch", true);
            // 螺母
            svg.append("path").attr("d", line([
                {x: x0 - thk / 2 - thk / 2, y: padding + hg - 2.5 * thk},
                {x: x0 + thk / 2 + thk / 2, y: padding + hg - 2.5 * thk},
                {x: x0 + thk / 2 + thk / 2, y: padding + hg - 1.5 * thk},
                {x: x0 - thk / 2 - thk / 2, y: padding + hg - 1.5 * thk},
                {x: x0 - thk / 2 - thk / 2, y: padding + hg - 2.5 * thk}
            ])).classed("sketch", true);
            // 中心线
            drawCenterLine(x0, y0 - ri + thk / 2 + 10, x0, padding + hg - 4 * thk - 10);

            // 吊臂
            let rm = Math.min(wg, hg);
            // 水平部分
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - rm, y: padding + hg - thk / 2},
                {x: x0 - thk / 2 - 2 * thk, y: padding + hg - thk / 2},
                {x: x0 - thk / 2 - 2 * thk, y: padding + hg + thk / 2},
                {x: padding + 3 * wg - rm, y: padding + hg + thk / 2}
            ])).classed("sketch", true);
            drawCenterLine(x0 - thk / 2 - 2 * thk - 10, padding + hg, padding + 3 * wg - rm, padding + hg);
            // 圆弧部分
            drawArc(rm + thk / 2, rm + thk / 2, padding + 3 * wg - rm, padding + hg - thk / 2, padding + 3 * wg + thk / 2, padding + hg + rm);
            drawArc(rm - thk / 2, rm - thk / 2, padding + 3 * wg - rm, padding + hg + thk / 2, padding + 3 * wg - thk / 2, padding + hg + rm);
            svg.append("path").attr("d", "M "
                + (padding + 3 * wg - rm) + " " + (padding + hg) + " "
                + "A" + rm + " " + rm + " "
                + "1 0 1" + " "
                + (padding + 3 * wg) + " " + (padding + hg + rm)
            ).classed("sketch", true).attr("stroke-dasharray", "25,5,5,5");
            // 竖直部分
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk / 2, y: padding + hg + rm},
                {x: padding + 3 * wg + thk / 2, y: padding + 3 * hg - 4.5 * thk},
                {x: padding + 3 * wg - thk / 2, y: padding + 3 * hg - 4.5 * thk},
                {x: padding + 3 * wg - thk / 2, y: padding + hg + rm}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk / 2, y: padding + 3 * hg + 4 * thk},
                {x: padding + 3 * wg + thk / 2, y: padding + 3 * hg + 5 * thk},
                {x: padding + 3 * wg - thk / 2, y: padding + 3 * hg + 5 * thk},
                {x: padding + 3 * wg - thk / 2, y: padding + 3 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawCenterLine(padding + 3 * wg, padding + hg + rm, padding + 3 * wg, padding + 3 * hg + 5 * thk + 10);
            // 挡环部分
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 1.5 * thk, y: padding + 3 * hg - 4.5 * thk},
                {x: padding + 3 * wg + 1.5 * thk, y: padding + 3 * hg - 4.5 * thk},
                {x: padding + 3 * wg + 1.5 * thk, y: padding + 3 * hg - 4 * thk},
                {x: padding + 3 * wg - 1.5 * thk, y: padding + 3 * hg - 4 * thk},
                {x: padding + 3 * wg - 1.5 * thk, y: padding + 3 * hg - 4.5 * thk}
            ])).classed("sketch", true);
            // 轴套部分
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - thk, y: padding + 3 * hg - 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg - 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg + 4 * thk},
                {x: padding + 3 * wg - thk, y: padding + 3 * hg + 4 * thk},
                {x: padding + 3 * wg - thk, y: padding + 3 * hg - 4 * thk}
            ])).classed("sketch", true);
            // 连接板部分
            drawLine(padding + 3 * wg - 3 * thk, padding + 3 * hg - 3 * thk, padding + 3 * wg - thk, padding + 3 * hg - 3 * thk);
            drawLine(padding + 3 * wg - 3 * thk, padding + 3 * hg + 3 * thk, padding + 3 * wg - thk, padding + 3 * hg + 3 * thk);
            drawArc(3 * rm, 3 * rm, padding + 3 * wg - 3 * thk, padding + 3 * hg - 3 * thk, padding + 3 * wg - 3 * thk, padding + 3 * hg + 3 * thk);

            // LS
            dimLeftV(padding + 3 * wg - 3 * thk, padding + 3 * hg + 3 * thk, padding + 3 * wg - 3 * thk, padding + 3 * hg - 3 * thk, ls, "XDASketchLS");

            // RB
            let crx = padding + 3 * wg - rm;
            let cry = padding + hg + rm;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: crx + rm, y: cry},
                    {x: crx + rm - 15, y: cry - 3},
                    {x: crx + rm - 15, y: cry + 3},
                    {x: crx + rm, y: cry}
                ])).attr("transform", "rotate(" + -45 + ", " + crx + " " + cry + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: crx, y: cry},
                    {x: crx + rm - 15, y: cry}
                ])).attr("transform", "rotate(" + -45 + ", " + crx + " " + cry + ")").attr("id", "XDASketchRB");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchRB")
                .attr("startOffset", "50%").text(rb);

            // LB
            drawCenterLine(padding + 3 * wg - 3 * thk - 10, padding + 3 * hg, padding + 3 * wg + thk + 10, padding + 3 * hg);
            dimLeftV(x0 - thk / 2 - 2 * thk - 10 - 20, padding + 3 * hg, x0 - thk / 2 - 2 * thk - 10 - 20, padding + hg, lb, "XDASketchLB");
            drawLine(x0 - thk / 2 - 2 * thk - 10 - 20 - 3, padding + 3 * hg, padding + 3 * wg - 3 * thk - 40 - 10 - 3, padding + 3 * hg);
            drawLine(x0 - thk / 2 - 2 * thk - 10 - 20 - 3, padding + hg, x0 - thk / 2 - 2 * thk - 10 - 3, padding + hg);

            // sb
            dimTopH(x0, padding + hg - 4 * thk - 10, x0 + 2 * wg, padding + hg - 4 * thk - 10, sb, "XDASketchSB");
            drawLine(x0 + 2 * wg, padding + hg - 4 * thk - 10 - 3, x0 + 2 * wg, padding + hg + rm - 20);

            // 吊环
            let cx1 = x0 + 0.707 * (ri + thk / 2);
            let cy1 = y0 - 0.707 * (ri + thk / 2);
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1},
                    {x: cx1 + 40, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 + 0.707 * 40, y: cy1 - 0.707 * 40},
                    {x: cx1 + 0.707 * 40 + 40, y: cy1 - 0.707 * 40}
                ])).classed("sketch", true).attr("id", "XDASketchDH");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchDH")
                .attr("startOffset", "50%").text("吊环");

            // 吊钩
            let cx2 = width / 2 - wg;
            let cy2 = padding + hg - 3 * thk;
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2, y: cy2},
                    {x: cx2 + 40, y: cy2}
                ])).attr("transform", "rotate(" + -45 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 + 0.707 * 40, y: cy2 - 0.707 * 40},
                    {x: cx2 + 0.707 * 40 + 40, y: cy2 - 0.707 * 40}
                ])).classed("sketch", true).attr("id", "XDASketchDG");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchDG")
                .attr("startOffset", "50%").text("吊钩");

            // 吊臂
            let cx3 = width / 2;
            let cy3 = padding + hg;
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx3, y: cy3},
                    {x: cx3 + 40, y: cy3}
                ])).attr("transform", "rotate(" + -45 + ", " + cx3 + " " + cy3 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx3 + 0.707 * 40, y: cy3 - 0.707 * 40},
                    {x: cx3 + 0.707 * 40 + 40, y: cy3 - 0.707 * 40}
                ])).classed("sketch", true).attr("id", "XDASketchDB");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchDB")
                .attr("startOffset", "50%").text("吊臂");

            // 轴套
            let cx4 = width / 2 + wg;
            let cy4 = padding + 3 * hg;
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx4, y: cy4},
                    {x: cx4 + 40, y: cy4}
                ])).attr("transform", "rotate(" + -45 + ", " + cx4 + " " + cy4 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx4 + 0.707 * 40, y: cy4 - 0.707 * 40},
                    {x: cx4 + 0.707 * 40 + 40, y: cy4 - 0.707 * 40}
                ])).classed("sketch", true).attr("id", "XDASketchZT");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchZT")
                .attr("startOffset", "50%").text("轴套");

            // A
            let cxa = padding + 3 * wg;
            let cya = padding + hg + rm;
            svg.append("path").attr("d", "M "
                + cxa + " " + (cya + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cxa + " " + (cya - 2)
            ).classed("arrow sketch", true);
            svg.append("path").attr("d", "M "
                + cxa + " " + (cya - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cxa + " " + (cya + 2)
            ).classed("arrow sketch", true);
            drawLine(cxa - thk / 2, cya, cxa + thk / 2, cya);
            svg.append("path")
                .attr("d", line([
                    {x: cxa + thk / 2, y: cya},
                    {x: cxa + 2 * thk, y: cya}
                ])).attr("id", "XDASketchAD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchAD")
                .attr("startOffset", "50%").text("A");

            // B
            let cxb = padding + 3 * wg;
            let cyb = padding + 3 * hg - 4.5 * thk;
            svg.append("path").attr("d", "M "
                + cxb + " " + (cyb + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cxb + " " + (cyb - 2)
            ).classed("arrow sketch", true);
            svg.append("path").attr("d", "M "
                + cxb + " " + (cyb - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cxb + " " + (cyb + 2)
            ).classed("arrow sketch", true);
            svg.append("path")
                .attr("d", line([
                    {x: cxb + thk / 2, y: cyb},
                    {x: cxb + 2 * thk, y: cyb}
                ])).attr("id", "XDASketchBD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchBD")
                .attr("startOffset", "50%").text("B");

            // D
            let cxd = x0;
            let cyd = padding + hg;
            svg.append("path").attr("d", "M "
                + cxd + " " + (cyd + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cxd + " " + (cyd - 2)
            ).classed("arrow sketch", true);
            svg.append("path").attr("d", "M "
                + cxd + " " + (cyd - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + cxd + " " + (cyd + 2)
            ).classed("arrow sketch", true);
            svg.append("path")
                .attr("d", line([
                    {x: cxd + thk / 2, y: cyd + 2 * thk},
                    {x: cxd + 2 * thk, y: cyd + 2 * thk}
                ])).attr("id", "XDASketchDD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDASketchDD")
                .attr("startOffset", "50%").text("D");

        }

        currentTabIndex = xdad2d3.tabs('getTabIndex', xdad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xda2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xda").length > 0) {
                    xda2d();
                }
            });
        }
        xdad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xda2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xda").length > 0) {
                            xda2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "人孔起吊配件强度校核",
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
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 2) {
                    $(ed.target).combobox("loadData", XDABCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", XDABType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", XDABSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", XDABName);
                }

                else if (index === 12) {
                    $(ed.target).combobox("loadData", XDAHCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", XDAHType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", XDAHSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", XDAHName);
                }

                else if (index === 19) {
                    $(ed.target).combobox("loadData", XDARCategory);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", XDARType);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", XDARSTD);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", XDARName);
                }

                else if (index === 28) {
                    $(ed.target).combobox("loadData", XDASCategory);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", XDASType);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", XDASSTD);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", XDASName);
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

                    // docx button
                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    xdaSketch.empty();
                    xdaModel.empty();

                    // sketch
                    currentTabIndex = xdad2d3.tabs('getTabIndex', xdad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xda2d();
                        xdaSketch.off("resize").on("resize", function () {
                            if ($("#xda").length > 0) {
                                xda2d();
                            }
                        });
                    }
                    xdad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xda2d();
                                xdaSketch.off("resize").on("resize", function () {
                                    if ($("#xda").length > 0) {
                                        xda2d();
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

                        XDADT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        XDABCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XDABType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XDABSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XDABName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XDAHCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        XDAHType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        XDAHSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        XDAHName = null;

                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XDARCategory = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XDARType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        XDARSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XDARName = null;

                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        XDASCategory = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XDASType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XDASSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        XDASName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDABCategory = [];
                                XDAHCategory = [];
                                XDARCategory = [];
                                XDASCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XDADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XDABCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XDAHCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XDARCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        XDASCategory[index] = {
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

                    // category - type
                    else if (index === 2) {

                        XDABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XDABType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XDABSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XDABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDABCategoryVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDABType = [];
                                $(result).each(function (index, element) {
                                    XDABType[index] = {
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
                    // type - std
                    else if (index === 3) {

                        XDABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XDABSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XDABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDABCategoryVal,
                                type: XDABTypeVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDABSTD = [];
                                $(result).each(function (index, element) {
                                    XDABSTD[index] = {
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
                    // std - Name
                    else if (index === 4) {

                        XDABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XDABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDABCategoryVal,
                                type: XDABTypeVal,
                                std: XDABSTDVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDABName = [];
                                $(result).each(function (index, element) {
                                    XDABName[index] = {
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

                    // category - type
                    else if (index === 12) {

                        XDAHCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        XDAHType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        XDAHSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        XDAHName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDAHCategoryVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDAHType = [];
                                $(result).each(function (index, element) {
                                    XDAHType[index] = {
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
                    // type - std
                    else if (index === 13) {

                        XDAHTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        XDAHSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        XDAHName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDAHCategoryVal,
                                type: XDAHTypeVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDAHSTD = [];
                                $(result).each(function (index, element) {
                                    XDAHSTD[index] = {
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
                    // std - Name
                    else if (index === 14) {

                        XDAHSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        XDAHName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDAHCategoryVal,
                                type: XDAHTypeVal,
                                std: XDAHSTDVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDAHName = [];
                                $(result).each(function (index, element) {
                                    XDAHName[index] = {
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

                    // category - type
                    else if (index === 19) {

                        XDARCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XDARType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        XDARSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XDARName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDARCategoryVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDARType = [];
                                $(result).each(function (index, element) {
                                    XDARType[index] = {
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
                    // type - std
                    else if (index === 20) {

                        XDARTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        XDARSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XDARName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDARCategoryVal,
                                type: XDARTypeVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDARSTD = [];
                                $(result).each(function (index, element) {
                                    XDARSTD[index] = {
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
                    // std - Name
                    else if (index === 21) {

                        XDARSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        XDARName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDARCategoryVal,
                                type: XDARTypeVal,
                                std: XDARSTDVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDARName = [];
                                $(result).each(function (index, element) {
                                    XDARName[index] = {
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

                    // category - type
                    else if (index === 28) {

                        XDASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        XDASType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XDASSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        XDASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDASCategoryVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDASType = [];
                                $(result).each(function (index, element) {
                                    XDASType[index] = {
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
                    // type - std
                    else if (index === 29) {

                        XDASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        XDASSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        XDASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDASCategoryVal,
                                type: XDASTypeVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDASSTD = [];
                                $(result).each(function (index, element) {
                                    XDASSTD[index] = {
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
                    // std - Name
                    else if (index === 30) {

                        XDASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        XDASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDASCategoryVal,
                                type: XDASTypeVal,
                                std: XDASSTDVal,
                                temp: XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDASName = [];
                                $(result).each(function (index, element) {
                                    XDASName[index] = {
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

                    // name 及业务逻辑
                    else {

                        // m0
                        let XDAM0;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            XDAM0 = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 吊臂材料牌号
                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                            XDABNameVal = rows[5][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let XDABDensity, XDABThkMin, XDABThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": XDABCategoryVal,
                                "type": XDABTypeVal,
                                "std": XDABSTDVal,
                                "name": XDABNameVal,
                                "temp": XDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                XDABDensity = parseFloat(result.density);
                                XDABThkMin = parseFloat(result.thkMin);
                                XDABThkMax = parseFloat(result.thkMax);

                                // db
                                let XDADB;
                                if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                    XDADB = parseFloat(rows[6][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // thkbn
                                let XDATHKBN;
                                if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                    && parseFloat(rows[7][columns[0][1].field]) > XDABThkMin
                                    && parseFloat(rows[7][columns[0][1].field]) <= Math.min(XDABThkMax, XDADB / 2)) {
                                    XDATHKBN = parseFloat(rows[7][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                    && parseFloat(rows[7][columns[0][1].field]) <= XDABThkMin) {
                                    south.html("吊臂材料厚度不能小于等于 " + XDABThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                    && parseFloat(rows[7][columns[0][1].field]) > Math.min(XDABThkMax, XDADB / 2)) {
                                    south.html("吊臂材料厚度不能大于 " + Math.min(XDABThkMax, XDADB / 2) + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                let XDACB1, XDAOBT, XDAEBT;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_e_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": XDABCategoryVal,
                                        "type": XDABTypeVal,
                                        "std": XDABSTDVal,
                                        "name": XDABNameVal,
                                        "thk": XDATHKBN,
                                        "temp": XDADT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": XDADB
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        XDACB1 = parseFloat(result.c1);
                                        if (XDACB1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }
                                        XDAOBT = parseFloat(result.ot);
                                        if (XDAOBT < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        XDAEBT = 1000 * parseFloat(result.et);
                                        if (XDAEBT < 0) {
                                            south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                            return false;
                                        }

                                        // CB2
                                        let XDACB2;
                                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                            && parseFloat(rows[8][columns[0][1].field]) < XDATHKBN) {
                                            XDACB2 = parseFloat(rows[8][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                            && parseFloat(rows[8][columns[0][1].field]) >= XDATHKBN) {
                                            south.html("吊臂腐蚀裕量不能大于等于 " + XDATHKBN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // rb
                                        let XDARB;
                                        if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                            && parseFloat(rows[9][columns[0][1].field]) > XDADB / 2) {
                                            XDARB = parseFloat(rows[9][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                            && parseFloat(rows[9][columns[0][1].field]) <= XDADB / 2) {
                                            south.html("吊臂曲率半径 Rb 不能小于等于 " + XDADB / 2 + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xda2d("R" + XDARB);
                                            xdaSketch.off("resize").on("resize", function () {
                                                if ($("#xda").length > 0) {
                                                    xda2d("R" + XDARB);
                                                }
                                            });
                                        }
                                        xdad2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xda2d("R" + XDARB);
                                                    xdaSketch.off("resize").on("resize", function () {
                                                        if ($("#xda").length > 0) {
                                                            xda2d("R" + XDARB);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // sb
                                        let XDASB;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                            && parseFloat(rows[10][columns[0][1].field]) > XDARB) {
                                            XDASB = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                            && parseFloat(rows[10][columns[0][1].field]) <= XDARB) {
                                            south.html("吊臂长度 Sb 不能小于等于 " + XDARB + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xda2d("R" + XDARB, XDASB);
                                            xdaSketch.off("resize").on("resize", function () {
                                                if ($("#xda").length > 0) {
                                                    xda2d("R" + XDARB, XDASB);
                                                }
                                            });
                                        }
                                        xdad2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xda2d("R" + XDARB, XDASB);
                                                    xdaSketch.off("resize").on("resize", function () {
                                                        if ($("#xda").length > 0) {
                                                            xda2d("R" + XDARB, XDASB);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // Lb
                                        let XDALB;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) > XDARB) {
                                            XDALB = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) <= XDARB) {
                                            south.html("吊臂高度 Lb 不能小于等于 " + XDARB + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xda2d("R" + XDARB, XDASB, XDALB);
                                            xdaSketch.off("resize").on("resize", function () {
                                                if ($("#xda").length > 0) {
                                                    xda2d("R" + XDARB, XDASB, XDALB);
                                                }
                                            });
                                        }
                                        xdad2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xda2d("R" + XDARB, XDASB, XDALB);
                                                    xdaSketch.off("resize").on("resize", function () {
                                                        if ($("#xda").length > 0) {
                                                            xda2d("R" + XDARB, XDASB, XDALB);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 吊钩材料
                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                            XDAHNameVal = rows[15][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        let XDAHDensity, XDAHThkMin, XDAHThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": XDAHCategoryVal,
                                                "type": XDAHTypeVal,
                                                "std": XDAHSTDVal,
                                                "name": XDAHNameVal,
                                                "temp": XDADT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                XDAHDensity = parseFloat(result.density);
                                                XDAHThkMin = parseFloat(result.thkMin);
                                                XDAHThkMax = parseFloat(result.thkMax);

                                                // dh
                                                let XDADH;
                                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                    && parseFloat(rows[16][columns[0][1].field]) > XDAHThkMin
                                                    && parseFloat(rows[16][columns[0][1].field]) <= XDAHThkMax) {
                                                    XDADH = parseFloat(rows[16][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                    && parseFloat(rows[16][columns[0][1].field]) <= XDAHThkMin) {
                                                    south.html("吊钩材料直径不能小于等于 " + XDAHThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                    && parseFloat(rows[16][columns[0][1].field]) > XDAHThkMax) {
                                                    south.html("吊钩材料直径不能大于 " + XDAHThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // CH2
                                                let XDACH2;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) < XDADH / 2) {
                                                    XDACH2 = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) >= XDADH / 2) {
                                                    south.html("吊钩腐蚀裕量不能大于等于 " + XDADH / 2 + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 螺纹规格
                                                let XDAHNorms;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field].substring(1)) > XDAHThkMin
                                                    && parseFloat(rows[18][columns[0][1].field].substring(1)) <= XDAHThkMax) {
                                                    XDAHNorms = rows[18][columns[0][1].field];
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field].substring(1)) <= XDAHThkMin) {
                                                    south.html("螺栓规格不得小于等于 M" + XDAHThkMin).css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field].substring(1)) > XDAHThkMax) {
                                                    south.html("螺栓规格不得大于 M" + XDAHThkMax).css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 吊钩设计应力
                                                let XDACH1, XDAOHT, XDAEHT;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_e_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": XDAHCategoryVal,
                                                        "type": XDAHTypeVal,
                                                        "std": XDAHSTDVal,
                                                        "name": XDAHNameVal,
                                                        "thk": parseFloat(rows[18][columns[0][1].field].substring(1)),
                                                        "temp": XDADT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": parseFloat(rows[18][columns[0][1].field].substring(1))
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        XDACH1 = parseFloat(result.c1);
                                                        if (XDACH1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        XDAOHT = parseFloat(result.ot);
                                                        if (XDAOHT < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        XDAEHT = 1000 * parseFloat(result.et);
                                                        if (XDAEHT < 0) {
                                                            south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // 吊环材料
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                            XDARNameVal = rows[22][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let XDARDensity, XDARThkMin, XDARThkMax;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_index.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": XDARCategoryVal,
                                                                "type": XDARTypeVal,
                                                                "std": XDARSTDVal,
                                                                "name": XDARNameVal,
                                                                "temp": XDADT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                XDARDensity = parseFloat(result.density);
                                                                XDARThkMin = parseFloat(result.thkMin);
                                                                XDARThkMax = parseFloat(result.thkMax);

                                                                // LR
                                                                let XDALR;
                                                                if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                    XDALR = parseFloat(rows[23][columns[0][1].field]);
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    xda2d("R" + XDARB, XDASB, XDALB, XDALR);
                                                                    xdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#xda").length > 0) {
                                                                            xda2d("R" + XDARB, XDASB, XDALB, XDALR);
                                                                        }
                                                                    });
                                                                }
                                                                xdad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            xda2d("R" + XDARB, XDASB, XDALB, XDALR);
                                                                            xdaSketch.off("resize").on("resize", function () {
                                                                                if ($("#xda").length > 0) {
                                                                                    xda2d("R" + XDARB, XDASB, XDALB, XDALR);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // dr
                                                                let XDADR;
                                                                if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > XDARThkMin
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= XDARThkMax) {
                                                                    XDADR = parseFloat(rows[24][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= XDARThkMin) {
                                                                    south.html("吊环材料直径不能小于等于 " + XDARThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > XDARThkMax) {
                                                                    south.html("吊环材料直径不能大于 " + XDARThkMax + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // 吊环设计应力
                                                                let XDACR1, XDAORT, XDAERT;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_gbt_150_2011_e_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": XDARCategoryVal,
                                                                        "type": XDARTypeVal,
                                                                        "std": XDARSTDVal,
                                                                        "name": XDARNameVal,
                                                                        "thk": XDADR,
                                                                        "temp": XDADT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": XDADR
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        XDACR1 = parseFloat(result.c1);
                                                                        if (XDACR1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        XDAORT = parseFloat(result.ot);
                                                                        if (XDAORT < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        XDAERT = 1000 * parseFloat(result.et);
                                                                        if (XDAERT < 0) {
                                                                            south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // CR2
                                                                        let XDACR2;
                                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) < XDADR / 2) {
                                                                            XDACR2 = parseFloat(rows[25][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) >= XDADR / 2) {
                                                                            south.html("吊环腐蚀裕量不能大于等于 " + XDADR / 2 + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // HR
                                                                        let XDAHR;
                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                            XDAHR = parseFloat(rows[26][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // LRW
                                                                        let XDALRW;
                                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                            XDALRW = parseFloat(rows[27][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 轴套材料牌号
                                                                        if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                                            XDASNameVal = rows[31][columns[0][1].field];
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        let XDASDensity, XDASThkMin, XDASThkMax;
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "web_get_gbt_150_2011_index.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                "category": XDASCategoryVal,
                                                                                "type": XDASTypeVal,
                                                                                "std": XDASSTDVal,
                                                                                "name": XDASNameVal,
                                                                                "temp": XDADT
                                                                            }),
                                                                            beforeSend: function () {
                                                                            },
                                                                            success: function (result) {

                                                                                XDASDensity = parseFloat(result.density);
                                                                                XDASThkMin = parseFloat(result.thkMin);
                                                                                XDASThkMax = parseFloat(result.thkMax);

                                                                                // ds
                                                                                let XDADS;
                                                                                if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                                                    XDADS = parseFloat(rows[32][columns[0][1].field]);
                                                                                }
                                                                                else {
                                                                                    return false;
                                                                                }

                                                                                // thksn
                                                                                let XDATHKSN;
                                                                                if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                    && parseFloat(rows[33][columns[0][1].field]) > XDASThkMin
                                                                                    && parseFloat(rows[33][columns[0][1].field]) <= Math.min(XDASThkMax, XDADS / 2)) {
                                                                                    XDATHKSN = parseFloat(rows[33][columns[0][1].field]);
                                                                                }
                                                                                else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                    && parseFloat(rows[33][columns[0][1].field]) <= XDASThkMin) {
                                                                                    south.html("轴套材料厚度不能小于等于 " + XDASThkMin + " mm").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                    && parseFloat(rows[33][columns[0][1].field]) > Math.min(XDASThkMax, XDADS / 2)) {
                                                                                    south.html("轴套材料厚度不能大于 " + Math.min(XDASThkMax, XDADS / 2) + " mm").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                else {
                                                                                    return false;
                                                                                }

                                                                                let XDACS1, XDAOST, XDAEST;
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        "category": XDASCategoryVal,
                                                                                        "type": XDASTypeVal,
                                                                                        "std": XDASSTDVal,
                                                                                        "name": XDASNameVal,
                                                                                        "thk": XDATHKSN,
                                                                                        "temp": XDADT,
                                                                                        "highLow": 3,
                                                                                        "isTube": 0,
                                                                                        "od": XDADS
                                                                                    }),
                                                                                    beforeSend: function () {
                                                                                    },
                                                                                    success: function (result) {

                                                                                        XDACS1 = parseFloat(result.c1);
                                                                                        if (XDACS1 < 0) {
                                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                            return false;
                                                                                        }
                                                                                        XDAOST = parseFloat(result.ot);
                                                                                        if (XDAOST < 0) {
                                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                            return false;
                                                                                        }
                                                                                        XDAEST = 1000 * parseFloat(result.et);
                                                                                        if (XDAEST < 0) {
                                                                                            south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                                                            return false;
                                                                                        }

                                                                                        // CS2
                                                                                        let XDACS2;
                                                                                        if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                                            && parseFloat(rows[34][columns[0][1].field]) < XDATHKSN) {
                                                                                            XDACS2 = parseFloat(rows[34][columns[0][1].field]);
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                                            && parseFloat(rows[34][columns[0][1].field]) >= XDATHKSN) {
                                                                                            south.html("轴套腐蚀裕量不能大于等于 " + XDATHKSN + " mm").css("color", "red");
                                                                                            return false;
                                                                                        }
                                                                                        else {
                                                                                            return false;
                                                                                        }

                                                                                        // LS
                                                                                        let XDALS;
                                                                                        if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                                                            XDALS = parseFloat(rows[35][columns[0][1].field]);
                                                                                        }
                                                                                        else {
                                                                                            return false;
                                                                                        }

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            xda2d("R" + XDARB, XDASB, XDALB, XDALR, XDALS);
                                                                                            xdaSketch.off("resize").on("resize", function () {
                                                                                                if ($("#xda").length > 0) {
                                                                                                    xda2d("R" + XDARB, XDASB, XDALB, XDALR, XDALS);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        xdad2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    xda2d("R" + XDARB, XDASB, XDALB, XDALR, XDALS);
                                                                                                    xdaSketch.off("resize").on("resize", function () {
                                                                                                        if ($("#xda").length > 0) {
                                                                                                            xda2d("R" + XDARB, XDASB, XDALB, XDALR, XDALS);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // HS
                                                                                        let XDAHS;
                                                                                        if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                                                            XDAHS = parseFloat(rows[36][columns[0][1].field]);
                                                                                        }
                                                                                        else {
                                                                                            return false;
                                                                                        }

                                                                                        // 计算逻辑开始
                                                                                        let XDAKD = 1.65;
                                                                                        let XDAG = 9.8;
                                                                                        let XDAF = XDAKD * XDAM0 * XDAG;

                                                                                        // 获取螺纹小径
                                                                                        let XDADHMIN;
                                                                                        if (XDAHNorms === "M12") {
                                                                                            XDADHMIN = 10.106;
                                                                                        }
                                                                                        else if (XDAHNorms === "M16") {
                                                                                            XDADHMIN = 13.835;
                                                                                        }
                                                                                        else if (XDAHNorms === "M20") {
                                                                                            XDADHMIN = 17.294;
                                                                                        }
                                                                                        else if (XDAHNorms === "M22") {
                                                                                            XDADHMIN = 19.294;
                                                                                        }
                                                                                        else if (XDAHNorms === "M24") {
                                                                                            XDADHMIN = 20.752;
                                                                                        }
                                                                                        else if (XDAHNorms === "M27") {
                                                                                            XDADHMIN = 23.752;
                                                                                        }
                                                                                        else if (XDAHNorms === "M30") {
                                                                                            XDADHMIN = 26.211;
                                                                                        }
                                                                                        else if (XDAHNorms === "M36") {
                                                                                            XDADHMIN = 31.670;
                                                                                        }
                                                                                        else {
                                                                                            return false;
                                                                                        }
                                                                                        let XDACH = 2 * XDACH2 + XDACH1;
                                                                                        let XDADHE = Math.min(XDADHMIN - 2 * XDACH2, XDADH - XDACH);

                                                                                        let XDACB = XDACB2 + XDACB1;
                                                                                        let XDATHKBE = XDATHKBN - XDACB;
                                                                                        let XDADBO = XDADB - 2 * XDACB;
                                                                                        let XDADBI = XDADB - 2 * XDATHKBN;
                                                                                        let XDAA = Math.PI / 4 * (XDADBO * XDADBO - XDADBI * XDADBI);
                                                                                        let XDAK = (XDADBO * XDADBO + XDADBI * XDADBI) / (16 * XDARB * XDARB);

                                                                                        let XDACR = 2 * XDACR2 + XDACR1;
                                                                                        let XDADRE = XDADR - XDACR;

                                                                                        let XDACS = XDACS2 + XDACS1;
                                                                                        let XDATHKSE = XDATHKSN - XDACS;
                                                                                        let XDAAS = Math.PI * (XDADS - XDATHKSN) * XDATHKSE;

                                                                                        // 吊臂计算及校核
                                                                                        let XDAOBXC = -XDAF / XDAA;
                                                                                        let XDAOBMC = (XDAF * XDASB) / (XDAA * XDARB) * (1 + 1 / XDAK * (-XDADBO / 2) / (XDARB - XDADBO / 2));
                                                                                        south.html(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "吊臂 A 点内侧许用应力：" + XDAOBT + " MPa" +
                                                                                            "</span>");
                                                                                        let XDAOBXCMC = XDAOBXC + XDAOBMC;
                                                                                        let XDAOBXCMCCHK;
                                                                                        if (Math.abs(XDAOBXCMC) <= XDAOBT.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + Math.abs(XDAOBXCMC).toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOBXCMCCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + Math.abs(XDAOBXCMC).toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOBXCMCCHK = "不合格";
                                                                                        }

                                                                                        let XDAOBMT = (XDAF * XDASB) / (XDAA * XDARB) * (1 + 1 / XDAK * (XDADBO / 2) / (XDARB - XDADBO / 2));
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "吊臂 A 点外侧许用应力：" + XDAOBT + " MPa" +
                                                                                            "</span>");
                                                                                        let XDAOBXCMT = XDAOBXC + XDAOBMT;
                                                                                        let XDAOBXCMTCHK;
                                                                                        if (Math.abs(XDAOBXCMT) <= XDAOBT.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + Math.abs(XDAOBXCMT).toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOBXCMTCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + Math.abs(XDAOBXCMT).toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOBXCMTCHK = "不合格";
                                                                                        }

                                                                                        let XDATHETA2 = XDAF / (XDAEBT * XDAA) * ((XDALB - XDARB - XDALS / 2) / XDARB) * ((XDALB - XDARB - XDALS / 2) / XDARB);
                                                                                        let XDAOBAB = XDAF / XDAA + (XDAF / XDAA) * ((8 * XDASB * XDADBO) / (XDADBO * XDADBO + XDADBI * XDADBI)) * (1 + 0.5 * XDATHETA2 * XDATHETA2);
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "吊臂 A-B 段许用应力：" + XDAOBT + " MPa" +
                                                                                            "</span>");
                                                                                        let XDAOBABCHK;
                                                                                        if (Math.abs(XDAOBAB) <= XDAOBT.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + Math.abs(XDAOBAB).toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOBABCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + Math.abs(XDAOBAB).toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOBABCHK = "不合格";
                                                                                        }

                                                                                        // 吊钩计算及校核
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "吊钩许用应力：" + XDAOHT.toFixed(2) + " MPa" +
                                                                                            "</span>");
                                                                                        let XDAOHC = XDAF / (Math.PI / 4 * XDADHE * XDADHE);
                                                                                        let XDAOHCCHK;
                                                                                        if (XDAOHC <= XDAOHT.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAOHC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOHCCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAOHC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOHCCHK = "不合格";
                                                                                        }

                                                                                        // 吊环计算及校核
                                                                                        let XDAORC = (XDAF * XDALR) / (8 * 0.0982 * XDADRE * XDADRE * XDADRE);
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "吊环许用应力：" + XDAORT + " MPa" +
                                                                                            "</span>");
                                                                                        let XDAORCCHK;
                                                                                        if (XDAORC <= XDAORT.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAORC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAORCCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAORC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAORCCHK = "不合格";
                                                                                        }

                                                                                        // 吊环焊缝计算及校核
                                                                                        let XDAORWC = XDAF / (1.4 * XDAHR * XDALRW);
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "吊环连接焊缝许用应力：" + XDAORT + " MPa" +
                                                                                            "</span>");
                                                                                        let XDAORWCCHK;
                                                                                        if (XDAORWC <= XDAORT.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAORWC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAORWCCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAORWC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAORWCCHK = "不合格";
                                                                                        }

                                                                                        // 轴套
                                                                                        let XDAOSC = XDAF / XDAAS;
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "轴套许用应力：" + XDAOST + " MPa" +
                                                                                            "</span>");
                                                                                        let XDAOSCCHK;
                                                                                        if (XDAOSC <= XDAOST.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAOSC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOSCCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDAOSC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDAOSCCHK = "不合格";
                                                                                        }

                                                                                        // 轴套焊缝
                                                                                        let XDATAUSWC = XDAF / (1.4 * XDAHS * XDALS);
                                                                                        let XDATAUST = 0.6 * XDAOST;
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "轴套连接焊缝许用应力：" + XDATAUST + " MPa" +
                                                                                            "</span>");
                                                                                        let XDATAUSWCCHK;
                                                                                        if (XDATAUSWC <= XDATAUST.toFixed(2)) {
                                                                                            south.append(
                                                                                                "<span style='color:#444444;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDATAUSWC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDATAUSWCCHK = "合格";
                                                                                        } else {
                                                                                            south.append(
                                                                                                "<span style='color:red;'>" +
                                                                                                "&ensp;|&ensp;" +
                                                                                                "实际应力：" + XDATAUSWC.toFixed(2) + " MPa" +
                                                                                                "</span>");
                                                                                            XDATAUSWCCHK = "不合格";
                                                                                        }

                                                                                        // docx
                                                                                        let XDAPayJS = $('#payjs');

                                                                                        function getDocx() {
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "xdadocx.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    ribbonName: "XDA",

                                                                                                    t: XDADT,
                                                                                                    m0: XDAM0,

                                                                                                    stdb: XDABSTDVal,
                                                                                                    nameb: XDABNameVal,
                                                                                                    db: XDADB,
                                                                                                    thkbn: XDATHKBN,
                                                                                                    cb2: XDACB2,
                                                                                                    rb: XDARB,
                                                                                                    sb: XDASB,
                                                                                                    lb: XDALB,

                                                                                                    stdh: XDAHSTDVal,
                                                                                                    nameh: XDAHNameVal,
                                                                                                    dh: XDADH,
                                                                                                    ch2: XDACH2,
                                                                                                    boltNorms: XDAHNorms,

                                                                                                    stdr: XDARSTDVal,
                                                                                                    namer: XDARNameVal,
                                                                                                    lr: XDALR,
                                                                                                    dr: XDADR,
                                                                                                    cr2: XDACR2,
                                                                                                    hr: XDAHR,
                                                                                                    lrw: XDALRW,

                                                                                                    stds: XDASSTDVal,
                                                                                                    names: XDASNameVal,
                                                                                                    ds: XDADS,
                                                                                                    thksn: XDATHKSN,
                                                                                                    cs2: XDACS2,
                                                                                                    ls: XDALS,
                                                                                                    hs: XDAHS,

                                                                                                    densityb: XDABDensity.toFixed(4),
                                                                                                    cb1: XDACB1.toFixed(4),
                                                                                                    obt: XDAOBT.toFixed(4),
                                                                                                    ebt: (XDAEBT / 1000).toFixed(4),

                                                                                                    densityr: XDARDensity.toFixed(4),
                                                                                                    cr1: XDACR1.toFixed(4),
                                                                                                    ort: XDAORT.toFixed(4),
                                                                                                    ert: (XDAERT / 1000).toFixed(4),

                                                                                                    densityh: XDAHDensity.toFixed(4),
                                                                                                    ch1: XDACH1.toFixed(4),
                                                                                                    oht: XDAOHT.toFixed(4),
                                                                                                    eht: (XDAEHT / 1000).toFixed(4),

                                                                                                    densitys: XDASDensity.toFixed(4),
                                                                                                    cs1: XDACS1.toFixed(4),
                                                                                                    ost: XDAOST.toFixed(4),
                                                                                                    est: (XDAEST / 1000).toFixed(4),

                                                                                                    kd: XDAKD.toFixed(4),
                                                                                                    g: XDAG.toFixed(4),
                                                                                                    f: XDAF.toFixed(4),

                                                                                                    dhmin: XDADHMIN.toFixed(4),
                                                                                                    ch: XDACH.toFixed(4),
                                                                                                    dhe: XDADHE.toFixed(4),

                                                                                                    cb: XDACB.toFixed(4),
                                                                                                    thkbe: XDATHKBE.toFixed(4),
                                                                                                    dbo: XDADBO.toFixed(4),
                                                                                                    dbi: XDADBI.toFixed(4),
                                                                                                    a: XDAA.toFixed(4),
                                                                                                    k: XDAK.toFixed(4),

                                                                                                    cr: XDACR.toFixed(4),
                                                                                                    dre: XDADRE.toFixed(4),

                                                                                                    cs: XDACS.toFixed(4),
                                                                                                    thkse: XDATHKSE.toFixed(4),
                                                                                                    as: XDAAS.toFixed(4),

                                                                                                    ohc: XDAOHC.toFixed(4),
                                                                                                    ohcchk: XDAOHCCHK,

                                                                                                    obxc: XDAOBXC.toFixed(4),
                                                                                                    obmc: XDAOBMC.toFixed(4),
                                                                                                    obmt: XDAOBMT.toFixed(4),
                                                                                                    obxcmc: XDAOBXCMC.toFixed(4),
                                                                                                    obxcmcchk: XDAOBXCMCCHK,
                                                                                                    obxcmt: XDAOBXCMT.toFixed(4),
                                                                                                    obxcmtchk: XDAOBXCMTCHK,

                                                                                                    theta2: XDATHETA2.toFixed(8),
                                                                                                    obab: XDAOBAB.toFixed(4),
                                                                                                    obabchk: XDAOBABCHK,

                                                                                                    orc: XDAORC.toFixed(4),
                                                                                                    orcchk: XDAORCCHK,

                                                                                                    orwc: XDAORWC.toFixed(4),
                                                                                                    orwcchk: XDAORWCCHK,

                                                                                                    osc: XDAOSC.toFixed(4),
                                                                                                    oscchk: XDAOSCCHK,

                                                                                                    tauswc: XDATAUSWC.toFixed(4),
                                                                                                    taustallow: XDATAUST.toFixed(4),
                                                                                                    tauswcchk: XDATAUSWCCHK
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
                                                                                                        XDAPayJS.dialog({
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
                                                                                                                    XDAPayJS.dialog("close");
                                                                                                                    XDAPayJS.dialog("clear");
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
                                                                                                                                XDAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                        XDAPayJS.dialog('close');
                                                                                                                                        XDAPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});