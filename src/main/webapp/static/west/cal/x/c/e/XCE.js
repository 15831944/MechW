$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xceSketch = $("#d2");
    let xceModel = $("#d3");
    let xced2d3 = $('#d2d3');

    $("#cal").html("<table id='xce'></table>");
    let pg = $("#xce");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/c/e/XCE.json", function (result) {

        let XCEDT = 20;
        let XCEDCategory, XCEDCategoryVal, XCEDType, XCEDTypeVal, XCEDSTD, XCEDSTDVal, XCEDName;
        let XCECCategory, XCECCategoryVal, XCECType, XCECTypeVal, XCECSTD, XCECSTDVal, XCECName;
        let columns, rows, ed;

        function xce2d(thkdn = "δdn", hd = "Hd", b = "b", dd = "Dd", thkcn = "δcn", dc = "Dc") {

            xceSketch.empty();

            let width = xceSketch.width();
            let height = xceSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XCESVG").attr("height", height);

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
                svg.append("g")
                    .append("text").attr("x", 0)
                    .attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            let thk = 15;

            let paddingH, paddingV;
            if (width >= height) {
                paddingV = 35;
                paddingH = (width - (height - 2 * paddingV)) / 2;
            }
            else {
                paddingH = 35;
                paddingV = (height - (width - 2 * paddingH)) / 2;
            }
            let sketchWidth = width - 2 * paddingH;
            let sketchHeight = height - 2 * paddingV;

            /*
            **正视图
             */
            // 吊耳外半径
            let r = 60;
            // 中心线
            drawCenterLine(width / 2, paddingV - 10, width / 2, height / 2 + thk + 10);
            drawCenterLine(width / 2 - r - 10, paddingV + r, width / 2 + r + 10, paddingV + r);
            // 外弧
            drawArc(r, r, width / 2 - r, paddingV + r, width / 2 + r, paddingV + r);

            // 衬板外壁
            // 衬板外半径
            let r1 = r - 10;
            drawArc(r1, r1, width / 2 - r1, paddingV + r, width / 2 + r1, paddingV + r);
            drawArc(r1, r1, width / 2 + r1, paddingV + r, width / 2 - r1, paddingV + r);

            // 吊孔
            // 吊孔半径
            let r2 = r / 2;
            drawArc(r2, r2, width / 2 - r2, paddingV + r, width / 2 + r2, paddingV + r);
            drawArc(r2, r2, width / 2 + r2, paddingV + r, width / 2 - r2, paddingV + r);

            drawLine(width / 2 - r, paddingV + r, width / 2 - r, height / 2);
            drawLine(width / 2 + r, paddingV + r, width / 2 + r, height / 2);
            drawLine(width / 2 - r, height / 2, width / 2 + r, height / 2);

            drawLine(width / 2 - r, height / 2 - thk, width / 2 - r + thk, height / 2);
            drawLine(width / 2 + r - thk, height / 2, width / 2 + r, height / 2 - thk);

            // b
            drawLine(width / 2 - r - 20, paddingV + r + 20, width / 2 - r, paddingV + r + 20);
            drawLine(width / 2 + r, paddingV + r + 20, width / 2 + r + 20, paddingV + r + 20);
            drawLine(width / 2 - r - 20, paddingV + r + 20, width / 2 - r - 20, height / 2);
            drawLine(width / 2 + r + 20, paddingV + r + 20, width / 2 + r + 20, height / 2 + 20 + 20);

            drawLine(width / 2 + r, height / 2, width / 2 + r, height / 2 + 20 + 20);
            drawLine(paddingH, height / 2, width / 2 - r, height / 2);
            drawLine(paddingH, height / 2 + 20, width / 2 + r, height / 2 + 20);

            /**
             * 俯视图
             */
            let cx2 = width / 2;
            let cy2 = height - paddingV - sketchHeight / 4;

            drawCenterLine(cx2 - r - 10, cy2, cx2 + r + 10, cy2);
            drawCenterLine(cx2, cy2 - thk - 10, cx2, cy2 + thk + 10);

            drawLine(cx2 - r1, cy2 - thk - thk / 2, cx2 + r1, cy2 - thk - thk / 2);
            drawLine(cx2 - r, cy2 - thk, cx2 + r, cy2 - thk);
            drawLine(cx2 - r, cy2 + thk, cx2 + r, cy2 + thk);
            drawLine(cx2 - r1, cy2 + thk + thk / 2, cx2 + r1, cy2 + thk + thk / 2);
            drawLine(cx2 - r, cy2 - thk, cx2 - r, cy2 + thk);
            drawLine(cx2 + r, cy2 - thk, cx2 + r, cy2 + thk);

            drawLine(cx2 - r1, cy2 - thk - thk / 2, cx2 - r1, cy2 - thk);
            drawLine(cx2 - r1, cy2 + thk + thk / 2, cx2 - r1, cy2 + thk);
            drawLine(cx2 + r1, cy2 - thk - thk / 2, cx2 + r1, cy2 - thk);
            drawLine(cx2 + r1, cy2 + thk + thk / 2, cx2 + r1, cy2 + thk);

            // thkdn
            svg.append("path").attr("d", line([
                {x: cx2 + r + 3, y: cy2 + thk},
                {x: cx2 + r + 40, y: cy2 + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx2 + r + 3, y: cy2 - thk},
                {x: cx2 + r + 40, y: cy2 - thk}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2 + r + 30, y: cy2 + thk},
                    {x: cx2 + r + 27, y: cy2 + thk + 15},
                    {x: cx2 + r + 33, y: cy2 + thk + 15},
                    {x: cx2 + r + 30, y: cy2 + thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2 + r + 30, y: cy2 - thk},
                    {x: cx2 + r + 27, y: cy2 - thk - 15},
                    {x: cx2 + r + 33, y: cy2 - thk - 15},
                    {x: cx2 + r + 30, y: cy2 - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: cx2 + r + 30, y: cy2 + thk},
                {x: cx2 + r + 30, y: cy2 - thk - 15 - 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx2 + r + 30, y: cy2 + thk + 15 + 40},
                {x: cx2 + r + 30, y: cy2 + thk + 15}
            ])).attr("id", "XCESketchTHKDN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchTHKDN")
                .attr("startOffset", "50%").text(thkdn);

            // b
            svg.append("path").attr("d", line([
                {x: width / 2 + r + 3, y: height / 2},
                {x: width / 2 + r + 50, y: height / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2 + r + 3, y: height / 2 - 15},
                {x: width / 2 + r + 50, y: height / 2 - 15}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + r + 40, y: height / 2},
                    {x: width / 2 + r + 37, y: height / 2 + 15},
                    {x: width / 2 + r + 43, y: height / 2 + 15},
                    {x: width / 2 + r + 40, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + r + 40, y: height / 2 - 15},
                    {x: width / 2 + r + 37, y: height / 2 - 15 - 15},
                    {x: width / 2 + r + 43, y: height / 2 - 15 - 15},
                    {x: width / 2 + r + 40, y: height / 2 - 15}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 + r + 40, y: height / 2 - 15},
                {x: width / 2 + r + 40, y: height / 2 + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2 + r + 40, y: height / 2 - 15 - 15},
                {x: width / 2 + r + 40, y: height / 2 - 15 - 15 - 30}
            ])).attr("id", "XCESketchB").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchB")
                .attr("startOffset", "50%").text(b);

            // HD
            drawLine(width / 2 - r, height / 2 + 3, width / 2 - r, height / 2 + 18);
            drawLine(width / 2 + r, height / 2 + 3, width / 2 + r, height / 2 + 18);
            dimBottomH(width / 2 - r, height / 2 + 15, width / 2 + r, height / 2 + 15, hd, "XCESketchHD");

            // 圆弧圆心
            let cx10 = width / 2;
            let cy10 = paddingV + r;

            // DC
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx10 + r1, y: cy10},
                    {x: cx10 + r1 + 15, y: cy10 - 3},
                    {x: cx10 + r1 + 15, y: cy10 + 3},
                    {x: cx10 + r1, y: cy10}
                ])).attr("transform", "rotate(" + -135 + ", " + cx10 + " " + cy10 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx10 + r1, y: cy10},
                    {x: cx10 + r1 + 15 + 20, y: cy10}
                ])).attr("transform", "rotate(" + -135 + ", " + cx10 + " " + cy10 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx10 - 0.707 * (r1 + 15 + 20) - 40, y: cy10 - 0.707 * (r1 + 15 + 20)},
                    {x: cx10 - 0.707 * (r1 + 15 + 20), y: cy10 - 0.707 * (r1 + 15 + 20)}
                ])).classed("sketch", true).attr("id", "XCESketchDC");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchDC")
                .attr("startOffset", "50%").text(dc);

            // DD
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx10 + r2, y: cy10},
                    {x: cx10 + r2 + 15, y: cy10 - 3},
                    {x: cx10 + r2 + 15, y: cy10 + 3},
                    {x: cx10 + r2, y: cy10}
                ])).attr("transform", "rotate(" + -45 + ", " + cx10 + " " + cy10 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx10 + r2 + 15, y: cy10},
                    {x: cx10 + r2 + 2 * (r - r2), y: cy10}
                ])).attr("transform", "rotate(" + -45 + ", " + cx10 + " " + cy10 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx10 + 0.707 * (r2 + 2 * (r - r2)), y: cy10 - 0.707 * (r2 + 2 * (r - r2))},
                    {x: cx10 + 0.707 * (r2 + 2 * (r - r2)) + 40, y: cy10 - 0.707 * (r2 + 2 * (r - r2))}
                ])).classed("sketch", true).attr("id", "XCESketchDD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchDD")
                .attr("startOffset", "50%").text(dd);

            // thkcn
            drawLine(cx2 - r - 40, cy2 - thk - thk / 2, cx2 - r1 - 3, cy2 - thk - thk / 2);
            drawLine(cx2 - r - 40, cy2 - thk, cx2 - r - 3, cy2 - thk);
            drawLine(cx2 - r - 40, cy2 + thk, cx2 - r - 3, cy2 + thk);
            drawLine(cx2 - r - 40, cy2 + thk + thk / 2, cx2 - r1 - 3, cy2 + thk + thk / 2);

            drawLine(cx2 - r - 30, cy2 - thk - thk / 2, cx2 - r - 30, cy2 + thk + thk / 2);
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - r - 30, y: cy2 - thk - thk / 2},
                    {x: cx2 - r - 30, y: cy2 - thk - thk / 2 - 30}
                ])).classed("sketch", true).attr("id", "XCESketchTHKCN1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchTHKCN1")
                .attr("startOffset", "50%").text(thkcn);
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - r - 30, y: cy2 + thk + thk / 2 + 30},
                    {x: cx2 - r - 30, y: cy2 + thk + thk / 2}
                ])).classed("sketch", true).attr("id", "XCESketchTHKCN2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchTHKCN2")
                .attr("startOffset", "50%").text(thkcn);

            // B-B 截面
            svg.append("path")
                .attr("d", line([
                    {x: cx10 - r - 10, y: cy10},
                    {x: cx10 - r, y: cy10}
                ])).attr("id", "XCESketchB1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchB1")
                .attr("startOffset", "50%").text("B");
            svg.append("path")
                .attr("d", line([
                    {x: cx10 + r, y: cy10},
                    {x: cx10 + r + 10, y: cy10}
                ])).attr("id", "XCESketchB2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchB2")
                .attr("startOffset", "50%").text("B");

            // A-A 截面
            svg.append("path")
                .attr("d", line([
                    {x: cx2 - 10, y: cy2 - thk - thk / 2},
                    {x: cx2, y: cy2 - thk - thk / 2}
                ])).attr("id", "XCESketchA1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchA1")
                .attr("startOffset", "50%").text("A");
            svg.append("path")
                .attr("d", line([
                    {x: cx2 - 10, y: cy2 + thk + thk / 2 + 20},
                    {x: cx2, y: cy2 + thk + thk / 2 + 20}
                ])).attr("id", "XCESketchA2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCESketchA2")
                .attr("startOffset", "50%").text("A");

        }

        currentTabIndex = xced2d3.tabs('getTabIndex', xced2d3.tabs('getSelected'));

        // 初始化 Sketch
        if (currentTabIndex === 0) {
            xce2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xce").length > 0) {
                    xce2d();
                }
            });
        }
        xced2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xce2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xce").length > 0) {
                            xce2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 21574-2008 尾部吊耳(AP)计算",
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
                    $(ed.target).combobox("loadData", XCEDCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", XCEDType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", XCEDSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", XCEDName);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", XCECCategory);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", XCECType);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", XCECSTD);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", XCECName);
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
                    xceSketch.empty();

                    // model
                    xceModel.empty();

                    // sketch
                    currentTabIndex = xced2d3.tabs('getTabIndex', xced2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        xce2d();
                        xceSketch.off("resize").on("resize", function () {
                            if ($("#xce").length > 0) {
                                xce2d();
                            }
                        });
                    }
                    xced2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xce2d();
                                xceSketch.off("resize").on("resize", function () {
                                    if ($("#xce").length > 0) {
                                        xce2d();
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

                        XCEDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        XCEDType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCEDSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCEDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCEDCategoryVal,
                                temp: XCEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCEDType = [];
                                $(result).each(function (index, element) {
                                    XCEDType[index] = {
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

                        XCEDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCEDSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCEDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCEDCategoryVal,
                                type: XCEDTypeVal,
                                temp: XCEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCEDSTD = [];
                                $(result).each(function (index, element) {
                                    XCEDSTD[index] = {
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

                        XCEDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCEDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCEDCategoryVal,
                                type: XCEDTypeVal,
                                std: XCEDSTDVal,
                                temp: XCEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCEDName = [];
                                $(result).each(function (index, element) {
                                    XCEDName[index] = {
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

                        XCECCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        XCECType = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        XCECSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        XCECName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCECCategoryVal,
                                temp: XCEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCECType = [];
                                $(result).each(function (index, element) {
                                    XCECType[index] = {
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

                        XCECTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        XCECSTD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        XCECName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCECCategoryVal,
                                type: XCECTypeVal,
                                temp: XCEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCECSTD = [];
                                $(result).each(function (index, element) {
                                    XCECSTD[index] = {
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

                        XCECSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        XCECName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCECCategoryVal,
                                type: XCECTypeVal,
                                std: XCECSTDVal,
                                temp: XCEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCECName = [];
                                $(result).each(function (index, element) {
                                    XCECName[index] = {
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

                        // 吊耳板材料名称
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            let XCEDNameVal = rows[4][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XCEDDensity, XCEDThkMin, XCEDThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XCEDCategoryVal,
                                    "type": XCEDTypeVal,
                                    "std": XCEDSTDVal,
                                    "name": XCEDNameVal,
                                    "temp": XCEDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XCEDDensity = parseFloat(result.density);
                                    XCEDThkMin = parseFloat(result.thkMin);
                                    XCEDThkMax = parseFloat(result.thkMax);

                                    if (XCEDNameVal === "Q235B" || XCEDNameVal === "Q235C") {
                                        XCEDThkMax = 200;
                                    }

                                    // 名义厚度
                                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCEDThkMin
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCEDThkMax) {
                                        let XCETHKDN = parseFloat(rows[5][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xce2d(XCETHKDN);
                                            xceSketch.off("resize").on("resize", function () {
                                                if ($("#xce").length > 0) {
                                                    xce2d(XCETHKDN);
                                                }
                                            });
                                        }
                                        xced2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xce2d(XCETHKDN);
                                                    xceSketch.off("resize").on("resize", function () {
                                                        if ($("#xce").length > 0) {
                                                            xce2d(XCETHKDN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // ajax 获取常温屈服强度、厚度负偏差
                                        let XCEDTestRel, XCECD1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": XCEDCategoryVal,
                                                "type": XCEDTypeVal,
                                                "std": XCEDSTDVal,
                                                "name": XCEDNameVal,
                                                "thk": XCETHKDN,
                                                "temp": XCEDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": 100000
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                XCEDTestRel = parseFloat(result.rel);
                                                if (XCEDTestRel < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                XCECD1 = parseFloat(result.c1);
                                                if (XCECD1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 高度 Hd
                                                if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                                    let XCEHD = parseFloat(rows[6][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xce2d(XCETHKDN, XCEHD);
                                                        xceSketch.off("resize").on("resize", function () {
                                                            if ($("#xce").length > 0) {
                                                                xce2d(XCETHKDN, XCEHD);
                                                            }
                                                        });
                                                    }
                                                    xced2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xce2d(XCETHKDN, XCEHD);
                                                                xceSketch.off("resize").on("resize", function () {
                                                                    if ($("#xce").length > 0) {
                                                                        xce2d(XCETHKDN, XCEHD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 倒角尺寸 b
                                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) < XCEHD / 2) {
                                                        let XCEB = parseFloat(rows[7][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            xce2d(XCETHKDN, XCEHD, XCEB);
                                                            xceSketch.off("resize").on("resize", function () {
                                                                if ($("#xce").length > 0) {
                                                                    xce2d(XCETHKDN, XCEHD, XCEB);
                                                                }
                                                            });
                                                        }
                                                        xced2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    xce2d(XCETHKDN, XCEHD, XCEB);
                                                                    xceSketch.off("resize").on("resize", function () {
                                                                        if ($("#xce").length > 0) {
                                                                            xce2d(XCETHKDN, XCEHD, XCEB);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // Dd
                                                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) < XCEHD) {
                                                            let XCEDD = parseFloat(rows[8][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD);
                                                                xceSketch.off("resize").on("resize", function () {
                                                                    if ($("#xce").length > 0) {
                                                                        xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD);
                                                                    }
                                                                });
                                                            }
                                                            xced2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD);
                                                                        xceSketch.off("resize").on("resize", function () {
                                                                            if ($("#xce").length > 0) {
                                                                                xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // a
                                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                                && parseFloat(rows[9][columns[0][1].field]) <= XCETHKDN) {
                                                                let XCEA = parseFloat(rows[9][columns[0][1].field]);

                                                                // 腐蚀裕量 cd2
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < Math.min(XCEA, XCETHKDN)) {
                                                                    let XCECD2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 衬板材料名称
                                                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                                        let XCECNameVal = rows[14][columns[0][1].field];

                                                                        // AJAX 获取材料密度、最大最小厚度
                                                                        let XCECDensity, XCECThkMin, XCECThkMax;
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "web_get_gbt_150_2011_index.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                "category": XCECCategoryVal,
                                                                                "type": XCECTypeVal,
                                                                                "std": XCECSTDVal,
                                                                                "name": XCECNameVal,
                                                                                "temp": XCEDT
                                                                            }),
                                                                            beforeSend: function () {
                                                                            },
                                                                            success: function (result) {

                                                                                XCECDensity = parseFloat(result.density);
                                                                                XCECThkMin = parseFloat(result.thkMin);
                                                                                XCECThkMax = parseFloat(result.thkMax);

                                                                                if (XCECNameVal === "Q235B" || XCECNameVal === "Q235C") {
                                                                                    XCECThkMax = 200;
                                                                                }

                                                                                // 名义厚度
                                                                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                                                    && parseFloat(rows[15][columns[0][1].field]) > XCECThkMin
                                                                                    && parseFloat(rows[15][columns[0][1].field]) <= XCECThkMax) {
                                                                                    let XCETHKCN = parseFloat(rows[15][columns[0][1].field]);

                                                                                    // Sketch
                                                                                    if (currentTabIndex === 0) {
                                                                                        xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN);
                                                                                        xceSketch.off("resize").on("resize", function () {
                                                                                            if ($("#xce").length > 0) {
                                                                                                xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    xced2d3.tabs({
                                                                                        onSelect: function (title, index) {
                                                                                            if (index === 0) {
                                                                                                xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN);
                                                                                                xceSketch.off("resize").on("resize", function () {
                                                                                                    if ($("#xce").length > 0) {
                                                                                                        xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    });

                                                                                    // ajax 获取常温屈服强度、厚度负偏差
                                                                                    let XCECTestRel, XCECC1;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_gbt_150_2011_com_property.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": XCECCategoryVal,
                                                                                            "type": XCECTypeVal,
                                                                                            "std": XCECSTDVal,
                                                                                            "name": XCECNameVal,
                                                                                            "thk": XCETHKCN,
                                                                                            "temp": XCEDT,
                                                                                            "highLow": 3,
                                                                                            "isTube": 0,
                                                                                            "od": 100000
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            XCECTestRel = parseFloat(result.rel);
                                                                                            if (XCECTestRel < 0) {
                                                                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            XCECC1 = parseFloat(result.c1);
                                                                                            if (XCECC1 < 0) {
                                                                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 外直径 DC
                                                                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                                && parseFloat(rows[16][columns[0][1].field]) > XCEDD
                                                                                                && parseFloat(rows[16][columns[0][1].field]) <= XCEHD) {
                                                                                                let XCEDC = parseFloat(rows[16][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN, "Φ" + XCEDC);
                                                                                                    xceSketch.off("resize").on("resize", function () {
                                                                                                        if ($("#xce").length > 0) {
                                                                                                            xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN, "Φ" + XCEDC);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                xced2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN, "Φ" + XCEDC);
                                                                                                            xceSketch.off("resize").on("resize", function () {
                                                                                                                if ($("#xce").length > 0) {
                                                                                                                    xce2d(XCETHKDN, XCEHD, XCEB, "Φ" + XCEDD, XCETHKCN, "Φ" + XCEDC);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                // 腐蚀裕量 cp2
                                                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) < XCETHKCN) {
                                                                                                    let XCECC2 = parseFloat(rows[17][columns[0][1].field]);

                                                                                                    // 吊重 mass
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                                                        let XCEMASS = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // 吊耳板过程参数
                                                                                                        let XCECD = XCECD1 + XCECD2;
                                                                                                        let XCETHKDE = XCETHKDN - XCECD;
                                                                                                        let XCEODALLOW = XCEDTestRel / 1.6;
                                                                                                        let XCETDALLOW = XCEODALLOW * 0.6;

                                                                                                        // 衬板过程参数
                                                                                                        let XCECC = XCECC1 + XCECC2;
                                                                                                        let XCETHKCE = XCETHKCN - XCECC;
                                                                                                        let XCEOCALLOW = XCECTestRel / 1.6;
                                                                                                        let XCETCALLOW = XCEOCALLOW * 0.6;

                                                                                                        // 角焊缝系数
                                                                                                        let XCEE = 0.7;

                                                                                                        // K
                                                                                                        let XCEK = 1.65;

                                                                                                        // FV
                                                                                                        let XCEFV = XCEMASS * 9.81 * XCEK;

                                                                                                        // OLALLOW
                                                                                                        let XCEOLALLOW = Math.min(XCEODALLOW, XCEOCALLOW);
                                                                                                        south.html(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "B-B 截面许用拉应力：" + XCEOLALLOW.toFixed(4) + " MPa" +
                                                                                                            "</span>");

                                                                                                        // OL
                                                                                                        let XCEOL = XCEFV / (XCETHKDE * (XCEHD - XCEDD) + 2 * XCETHKCE * (XCEDC - XCEDD));
                                                                                                        let XCEOLCHK;
                                                                                                        if (XCEOL <= XCEOLALLOW) {
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际拉应力：" + XCEOL.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            XCEOLCHK = "合格";
                                                                                                        } else {
                                                                                                            south.append(
                                                                                                                "<span style='color:red;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际拉应力：" + XCEOL.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            XCEOLCHK = "不合格";
                                                                                                        }

                                                                                                        // TLALLOW
                                                                                                        let XCETLALLOW = Math.min(XCETDALLOW, XCETCALLOW);
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "A-A 截面许用剪应力：" + XCETLALLOW.toFixed(4) + " MPa" +
                                                                                                            "</span>");

                                                                                                        // TL
                                                                                                        let XCETL = XCEOL;
                                                                                                        let XCETLCHK;
                                                                                                        if (XCETL <= XCETLALLOW) {
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际剪应力：" + XCETL.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            XCETLCHK = "合格";
                                                                                                        } else {
                                                                                                            south.append(
                                                                                                                "<span style='color:red;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际剪应力：" + XCETL.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            XCETLCHK = "不合格";
                                                                                                        }

                                                                                                        // OAALLOW
                                                                                                        let XCEOAALLOW = XCEE * XCEODALLOW;
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "吊耳角焊缝许用拉应力：" + XCEOAALLOW.toFixed(4) + " MPa" +
                                                                                                            "</span>");

                                                                                                        // OA
                                                                                                        let XCEAREA = 2 * (XCEHD - 2 * XCEB) * XCEA;
                                                                                                        let XCEOA = XCEFV / XCEAREA;
                                                                                                        let XCEOACHK;
                                                                                                        if (XCEOA <= XCEOAALLOW) {
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际拉应力：" + XCEOA.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            XCEOACHK = "合格";
                                                                                                        } else {
                                                                                                            south.append(
                                                                                                                "<span style='color:red;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际拉应力：" + XCEOA.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            XCEOACHK = "不合格";
                                                                                                        }

                                                                                                        // docx
                                                                                                        let XCEPayJS = $('#payjs');

                                                                                                        function getDocx() {
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "xcedocx.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    ribbonName: "XCE",

                                                                                                                    dstd: XCEDSTDVal,
                                                                                                                    dname: XCEDNameVal,
                                                                                                                    thkdn: XCETHKDN,
                                                                                                                    hd: XCEHD,
                                                                                                                    b: XCEB,
                                                                                                                    dd: XCEDD,
                                                                                                                    a: XCEA,
                                                                                                                    cd2: XCECD2,
                                                                                                                    cstd: XCECSTDVal,
                                                                                                                    cname: XCECNameVal,
                                                                                                                    thkcn: XCETHKCN,
                                                                                                                    dc: XCEDC,
                                                                                                                    cc2: XCECC2,
                                                                                                                    mass: XCEMASS,
                                                                                                                    densityd: XCEDDensity.toFixed(4),
                                                                                                                    densityc: XCECDensity.toFixed(4),
                                                                                                                    cd1: XCECD1.toFixed(4),
                                                                                                                    cc1: XCECC1.toFixed(4),
                                                                                                                    rdel: XCEDTestRel.toFixed(4),
                                                                                                                    rcel: XCECTestRel.toFixed(4),
                                                                                                                    cd: XCECD.toFixed(4),
                                                                                                                    thkde: XCETHKDE.toFixed(4),
                                                                                                                    od: XCEODALLOW.toFixed(4),
                                                                                                                    td: XCETDALLOW.toFixed(4),
                                                                                                                    cc: XCECC.toFixed(4),
                                                                                                                    thkce: XCETHKCE.toFixed(4),
                                                                                                                    oc: XCEOCALLOW.toFixed(4),
                                                                                                                    tc: XCETCALLOW.toFixed(4),
                                                                                                                    e: XCEE.toFixed(4),
                                                                                                                    k: XCEK.toFixed(4),
                                                                                                                    fv: XCEFV.toFixed(4),
                                                                                                                    ol: XCEOL.toFixed(4),
                                                                                                                    olallow: XCEOLALLOW.toFixed(4),
                                                                                                                    olchk: XCEOLCHK,
                                                                                                                    tl: XCETL.toFixed(4),
                                                                                                                    tlallow: XCETLALLOW.toFixed(4),
                                                                                                                    tlchk: XCETLCHK,
                                                                                                                    area: XCEAREA.toFixed(4),
                                                                                                                    oa: XCEOA.toFixed(4),
                                                                                                                    oaallow: XCEOAALLOW.toFixed(4),
                                                                                                                    oachk: XCEOACHK
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
                                                                                                                        XCEPayJS.dialog({
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
                                                                                                                                    XCEPayJS.dialog("close");
                                                                                                                                    XCEPayJS.dialog("clear");
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
                                                                                                                                                XCEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                        XCEPayJS.dialog('close');
                                                                                                                                                        XCEPayJS.dialog('clear');
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
                                                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) >= XCETHKCN) {
                                                                                                    south.html("衬板腐蚀裕量不能大于等于 " + XCETHKCN + " mm").css("color", "red");
                                                                                                }
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                                && parseFloat(rows[16][columns[0][1].field]) <= XCEDD) {
                                                                                                south.html("衬板外直径不能小于等于 " + XCEDD + " mm").css("color", "red");
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                                && parseFloat(rows[16][columns[0][1].field]) > XCEHD) {
                                                                                                south.html("衬板外直径不能大于 " + XCEHD + " mm").css("color", "red");
                                                                                            }
                                                                                        },
                                                                                        error: function () {
                                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                                                    && parseFloat(rows[15][columns[0][1].field]) <= XCECThkMin) {
                                                                                    south.html("衬板厚度不能小于等于 " + XCECThkMin + " mm").css("color", "red");
                                                                                }
                                                                                else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                                                    && parseFloat(rows[15][columns[0][1].field]) > XCECThkMax) {
                                                                                    south.html("衬板厚度不能大于 " + XCECThkMax + " mm").css("color", "red");
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
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= Math.min(XCEA, XCETHKDN)) {
                                                                    south.html("吊耳板腐蚀裕量不能大于等于 " + Math.min(XCEA, XCETHKDN) + " mm").css("color", "red");
                                                                }
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                                && parseFloat(rows[9][columns[0][1].field]) > XCETHKDN) {
                                                                south.html("吊耳与壳体角焊缝尺寸 a 不能大于 " + XCETHKDN + " mm").css("color", "red");
                                                            }
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                            && parseFloat(rows[8][columns[0][1].field]) >= XCEHD) {
                                                            south.html("吊孔直径 Dd 不能大于等于 " + XCEHD + " mm").css("color", "red");
                                                        }
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) >= XCEHD / 2) {
                                                        south.html("倒角尺寸 b 不能大于等于 " + XCEHD / 2 + " mm").css("color", "red");
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
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCEDThkMin) {
                                        south.html("吊耳板厚度不能小于等于 " + XCEDThkMin + " mm").css("color", "red");
                                    }
                                    else if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCEDThkMax) {
                                        south.html("吊耳板厚度不能大于 " + XCEDThkMax + " mm").css("color", "red");
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
                        temp: XCEDT
                    }),
                    beforeSend: function () {
                    },
                    success: function (result) {
                        XCEDCategory = [];
                        XCECCategory = [];
                        if (result.length <= 0) {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "&ensp;" + "<span style='color:red;'>" + XCEDT + "</span>" +
                                "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                        }
                        else {
                            $(result).each(function (index, element) {
                                XCEDCategory[index] = {
                                    "value": element,
                                    "text": element
                                };
                                XCECCategory[index] = {
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