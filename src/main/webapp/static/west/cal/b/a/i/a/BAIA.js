$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let baiaSketch = $("#d2");
    let baiaModel = $("#d3");
    let baiad2d3 = $('#d2d3');

    $("#cal").html("<table id='baia'></table>");
    let pg = $("#baia");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/i/a/BAIA.json", function (result) {

        let BAIADT;
        let BAIA0Category, BAIA0CategoryVal, BAIA0Type, BAIA0TypeVal, BAIA0STD, BAIA0STDVal, BAIA0Name, BAIA0NameVal,
            BAIA1Category, BAIA1CategoryVal, BAIA1Type, BAIA1TypeVal, BAIA1STD, BAIA1STDVal, BAIA1Name, BAIA1NameVal,
            BAIAFCategory, BAIAFCategoryVal, BAIAFType, BAIAFTypeVal, BAIAFSTD, BAIAFSTDVal, BAIAFName, BAIAFNameVal,
            BAIA2Category, BAIA2CategoryVal, BAIA2Type, BAIA2TypeVal, BAIA2STD, BAIA2STDVal, BAIA2Name, BAIA2NameVal;
        let columns, rows, ed;

        function baia2d(lp = "Lp",
                        bh = "H", bh1 = "0.6H", bh2 = "0.4H",
                        thkte = "δte",
                        thk0n = "δ0n", b0n = "B0n",
                        thkfn = "δfn", bfn = "Bfn") {

            baiaSketch.empty();

            let width = baiaSketch.width();
            let height = baiaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAIASVG").attr("height", height);

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

            // 图形边距
            let padding = 60;
            let thk = 8;

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

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            // 顶板
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 3 * thk, y: padding - thk},
                    {x: padding + 3 * wg + 2 * thk, y: padding - thk},
                    {x: padding + 3 * wg + 2 * thk, y: padding},
                    {x: padding + wg - 3 * thk, y: padding},
                    {x: padding + wg - 3 * thk, y: padding - thk}
                ]));

            // 底板
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 5 * thk, y: height - padding},
                    {x: padding + 3 * wg + 4 * thk, y: height - padding},
                    {x: padding + 3 * wg + 4 * thk, y: height - padding + thk},
                    {x: padding + wg - 5 * thk, y: height - padding + thk},
                    {x: padding + wg - 5 * thk, y: height - padding}
                ]));

            // 壁板及垂直加固柱
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk, y: padding},
                    {x: padding + wg, y: padding},
                    {x: padding + wg, y: height - padding},
                    {x: padding + wg - thk, y: height - padding},
                    {x: padding + wg - thk, y: padding}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - thk, y: padding},
                    {x: padding + 1.5 * wg, y: padding},
                    {x: padding + 1.5 * wg, y: height - padding},
                    {x: padding + 1.5 * wg - thk, y: height - padding},
                    {x: padding + 1.5 * wg - thk, y: padding}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg - thk, y: padding},
                    {x: padding + 2 * wg, y: padding},
                    {x: padding + 2 * wg, y: height - padding},
                    {x: padding + 2 * wg - thk, y: height - padding},
                    {x: padding + 2 * wg - thk, y: padding}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg - thk, y: padding},
                    {x: padding + 2.5 * wg, y: padding},
                    {x: padding + 2.5 * wg, y: height - padding},
                    {x: padding + 2.5 * wg - thk, y: height - padding},
                    {x: padding + 2.5 * wg - thk, y: padding}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg - thk, y: padding},
                    {x: padding + 3 * wg, y: padding},
                    {x: padding + 3 * wg, y: height - padding},
                    {x: padding + 3 * wg - thk, y: height - padding},
                    {x: padding + 3 * wg - thk, y: padding}
                ]));

            // 壁板分界线
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk, y: padding + 2.4 * hg},
                    {x: padding + 3 * wg, y: padding + 2.4 * hg}
                ]));

            // LP1
            dimBottomH(padding + wg, height - padding, padding + 1.5 * wg, height - padding, lp, "BAIASketchLP1");

            // LP2
            dimBottomH(padding + 1.5 * wg, height - padding, padding + 2 * wg, height - padding, lp, "BAIASketchLP2");

            // LP3
            dimBottomH(padding + 2 * wg, height - padding, padding + 2.5 * wg, height - padding, lp, "BAIASketchLP3");

            // LP4
            dimBottomH(padding + 2.5 * wg, height - padding, padding + 3 * wg, height - padding, lp, "BAIASketchLP4");

            // BH
            dimRightV(padding + 3 * wg + 4 * thk, height - padding, padding + 3 * wg + 4 * thk, padding, bh, "BAIASketchBH");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 2 * thk + 3, y: padding},
                    {x: padding + 3 * wg + 4 * thk + 3, y: padding}
                ]));

            // BH1
            dimLeftV(padding + wg - 5 * thk, padding + 2.4 * hg, padding + wg - 5 * thk, padding, bh1, "BAIASketchBH1");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 5 * thk - 3, y: padding + 2.4 * hg},
                    {x: padding + wg - thk - 3, y: padding + 2.4 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 5 * thk - 3, y: padding},
                    {x: padding + wg - 3 * thk - 3, y: padding}
                ]));

            // BH2
            dimLeftV(padding + wg - 5 * thk, height - padding, padding + wg - 5 * thk, padding + 2.4 * hg, bh2, "BAIASketchBH2");

            // THKTE
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.25 * wg, y: padding - thk - 15 - 10},
                    {x: padding + 1.25 * wg, y: padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.25 * wg, y: padding - thk},
                    {x: padding + 1.25 * wg + 3, y: padding - thk - 15},
                    {x: padding + 1.25 * wg - 3, y: padding - thk - 15},
                    {x: padding + 1.25 * wg, y: padding - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.25 * wg, y: padding},
                    {x: padding + 1.25 * wg - 3, y: padding + 15},
                    {x: padding + 1.25 * wg + 3, y: padding + 15},
                    {x: padding + 1.25 * wg, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.25 * wg, y: padding + 15 + 40},
                {x: padding + 1.25 * wg, y: padding + 15}
            ])).attr("id", "BAIASketchTHKTE").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIASketchTHKTE").attr("startOffset", "50%").text(thkte);

            // 顶板联杆
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg, y: padding + 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding + 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding + 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding}
                ]));

            // 中间联杆
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding + 2.4 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding + 2.4 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding + 2.4 * hg}
                ]));

            // B0N
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding - 15 - 10},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * thk}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 3, y: padding + 3 * thk},
                    {x: padding + 2.5 * wg + thk + 40, y: padding + 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding},
                    {x: padding + 2.5 * wg + thk + 30 + 3, y: padding - 15},
                    {x: padding + 2.5 * wg + thk + 30 - 3, y: padding - 15},
                    {x: padding + 2.5 * wg + thk + 30, y: padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * thk},
                    {x: padding + 2.5 * wg + thk + 30 - 3, y: padding + 3 * thk + 15},
                    {x: padding + 2.5 * wg + thk + 30 + 3, y: padding + 3 * thk + 15},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * thk + 15 + 40},
                {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * thk + 15}
            ])).attr("id", "BAIASketchB0N").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIASketchB0N").attr("startOffset", "50%").text(b0n);

            // thk0n
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * thk + 3},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * thk + 40}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 15 - 10, y: padding + 3 * thk + 30},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * thk + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 3 * thk + 30},
                    {x: padding + 1.5 * wg - 15, y: padding + 3 * thk + 30 + 3},
                    {x: padding + 1.5 * wg - 15, y: padding + 3 * thk + 30 - 3},
                    {x: padding + 1.5 * wg, y: padding + 3 * thk + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * thk + 30},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 3 * thk + 30 + 3},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 3 * thk + 30 - 3},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * thk + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg + thk + 15, y: padding + 3 * thk + 30},
                {x: padding + 1.5 * wg + thk + 15 + 40, y: padding + 3 * thk + 30}
            ])).attr("id", "BAIASketchTHK0N").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIASketchTHK0N").attr("startOffset", "50%").text(thk0n);

            // BFN
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg + 15 + 10},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg - 3 * thk}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 3, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk + 40, y: padding + 2.4 * hg - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg},
                    {x: padding + 2.5 * wg + thk + 30 + 3, y: padding + 2.4 * hg + 15},
                    {x: padding + 2.5 * wg + thk + 30 - 3, y: padding + 2.4 * hg + 15},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk + 30 - 3, y: padding + 2.4 * hg - 3 * thk - 15},
                    {x: padding + 2.5 * wg + thk + 30 + 3, y: padding + 2.4 * hg - 3 * thk - 15},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg - 3 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg - 3 * thk - 15},
                {x: padding + 2.5 * wg + thk + 30, y: padding + 2.4 * hg - 3 * thk - 15 - 40}
            ])).attr("id", "BAIASketchBFN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIASketchBFN").attr("startOffset", "50%").text(bfn);

            //thk1n
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding - 3 * thk + 2.4 * hg - 3},
                    {x: padding + 1.5 * wg + thk, y: padding - 3 * thk + 2.4 * hg - 40}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 15 - 10, y: padding + 2.4 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg + thk, y: padding + 2.4 * hg - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 2.4 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg - 15, y: padding + 2.4 * hg - 3 * thk - 30 + 3},
                    {x: padding + 1.5 * wg - 15, y: padding + 2.4 * hg - 3 * thk - 30 - 3},
                    {x: padding + 1.5 * wg, y: padding + 2.4 * hg - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding + 2.4 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 2.4 * hg - 3 * thk - 30 + 3},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 2.4 * hg - 3 * thk - 30 - 3},
                    {x: padding + 1.5 * wg + thk, y: padding + 2.4 * hg - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg + thk + 15, y: padding + 2.4 * hg - 3 * thk - 30},
                {x: padding + 1.5 * wg + thk + 15 + 40, y: padding + 2.4 * hg - 3 * thk - 30}
            ])).attr("id", "BAIASketchTHKFN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIASketchTHKFN").attr("startOffset", "50%").text(thkfn);
        }

        currentTabIndex = baiad2d3.tabs('getTabIndex', baiad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baia2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baia").length > 0) {
                    baia2d();
                }
            });
        }
        baiad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baia2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baia").length > 0) {
                            baia2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 一层中间联杆G型矩形容器设计",
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

                if (index === 5) {
                    $(ed.target).combobox("loadData", BAIA0Category);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAIA0Type);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAIA0STD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAIA0Name);
                }

                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAIA1Category);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BAIA1Type);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAIA1STD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAIA1Name);
                }

                else if (index === 19) {
                    $(ed.target).combobox("loadData", BAIAFCategory);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BAIAFType);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAIAFSTD);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAIAFName);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BAIA2Category);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAIA2Type);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAIA2STD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAIA2Name);
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
                    baiaSketch.empty();

                    // model
                    baiaModel.empty();

                    // sketch
                    currentTabIndex = baiad2d3.tabs('getTabIndex', baiad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baia2d();
                        baiaSketch.off("resize").on("resize", function () {
                            if ($("#baia").length > 0) {
                                baia2d();
                            }
                        });
                    }
                    baiad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baia2d();
                                baiaSketch.off("resize").on("resize", function () {
                                    if ($("#baia").length > 0) {
                                        baia2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // t - category
                    if (index === 0) {

                        BAIADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAIA0Category = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAIA0Type = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAIA0STD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIA0Name = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAIA1Category = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAIA1Type = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAIA1STD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIA1Name = null;

                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAIAFCategory = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BAIAFType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAIAFSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIAFName = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BAIA2Category = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAIA2Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAIA2STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIA2Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA0Category = [];
                                BAIA1Category = [];
                                BAIAFCategory = [];
                                BAIA2Category = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAIADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAIA0Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIA1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIAFCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIA2Category[index] = {
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
                    else if (index === 5) {

                        BAIA0CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAIA0Type = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAIA0STD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIA0Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA0CategoryVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA0Type = [];
                                $(result).each(function (index, element) {
                                    BAIA0Type[index] = {
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
                    else if (index === 6) {

                        BAIA0TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAIA0STD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIA0Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA0CategoryVal,
                                type: BAIA0TypeVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA0STD = [];
                                $(result).each(function (index, element) {
                                    BAIA0STD[index] = {
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
                    else if (index === 7) {

                        BAIA0STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIA0Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA0CategoryVal,
                                type: BAIA0TypeVal,
                                std: BAIA0STDVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA0Name = [];
                                $(result).each(function (index, element) {
                                    BAIA0Name[index] = {
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
                    else if (index === 13) {

                        BAIA1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAIA1Type = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAIA1STD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIA1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA1CategoryVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA1Type = [];
                                $(result).each(function (index, element) {
                                    BAIA1Type[index] = {
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
                    else if (index === 14) {

                        BAIA1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAIA1STD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIA1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA1CategoryVal,
                                type: BAIA1TypeVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA1STD = [];
                                $(result).each(function (index, element) {
                                    BAIA1STD[index] = {
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
                    else if (index === 15) {

                        BAIA1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIA1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA1CategoryVal,
                                type: BAIA1TypeVal,
                                std: BAIA1STDVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA1Name = [];
                                $(result).each(function (index, element) {
                                    BAIA1Name[index] = {
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

                        BAIAFCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BAIAFType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAIAFSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIAFName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIAFCategoryVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIAFType = [];
                                $(result).each(function (index, element) {
                                    BAIAFType[index] = {
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

                        BAIAFTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAIAFSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIAFName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIAFCategoryVal,
                                type: BAIAFTypeVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIAFSTD = [];
                                $(result).each(function (index, element) {
                                    BAIAFSTD[index] = {
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

                        BAIAFSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIAFName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIAFCategoryVal,
                                type: BAIAFTypeVal,
                                std: BAIAFSTDVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIAFName = [];
                                $(result).each(function (index, element) {
                                    BAIAFName[index] = {
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
                    else if (index === 27) {

                        BAIA2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAIA2Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAIA2STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIA2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA2CategoryVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA2Type = [];
                                $(result).each(function (index, element) {
                                    BAIA2Type[index] = {
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
                    else if (index === 28) {

                        BAIA2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAIA2STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIA2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA2CategoryVal,
                                type: BAIA2TypeVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA2STD = [];
                                $(result).each(function (index, element) {
                                    BAIA2STD[index] = {
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
                    else if (index === 29) {

                        BAIA2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIA2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIA2CategoryVal,
                                type: BAIA2TypeVal,
                                std: BAIA2STDVal,
                                temp: BAIADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIA2Name = [];
                                $(result).each(function (index, element) {
                                    BAIA2Name[index] = {
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

                    // 介质密度
                    let BAIAD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAIAD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LP
                    let BAIALP;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAIALP = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baia2d(BAIALP);
                        baiaSketch.off("resize").on("resize", function () {
                            if ($("#baia").length > 0) {
                                baia2d(BAIALP);
                            }
                        });
                    }
                    baiad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baia2d(BAIALP);
                                baiaSketch.off("resize").on("resize", function () {
                                    if ($("#baia").length > 0) {
                                        baia2d(BAIALP);
                                    }
                                });
                            }
                        }
                    });

                    // BH
                    let BAIABH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAIALP / 0.6, 0.1 * BAIALP / 0.4)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAIALP / 0.6, 5 * BAIALP / 0.4)) {
                        BAIABH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAIALP / 0.6, 0.1 * BAIALP / 0.4)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAIALP / 0.6, 0.1 * BAIALP / 0.4) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAIALP / 0.6, 5 * BAIALP / 0.4)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAIALP / 0.6, 5 * BAIALP / 0.4) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH);
                        baiaSketch.off("resize").on("resize", function () {
                            if ($("#baia").length > 0) {
                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH);
                            }
                        });
                    }
                    baiad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH);
                                baiaSketch.off("resize").on("resize", function () {
                                    if ($("#baia").length > 0) {
                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH);
                                    }
                                });
                            }
                        }
                    });

                    // thkte
                    let BAIATHKTE;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BAIATHKTE = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE);
                        baiaSketch.off("resize").on("resize", function () {
                            if ($("#baia").length > 0) {
                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE);
                            }
                        });
                    }
                    baiad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE);
                                baiaSketch.off("resize").on("resize", function () {
                                    if ($("#baia").length > 0) {
                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE);
                                    }
                                });
                            }
                        }
                    });

                    // 顶部联杆材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BAIA0NameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAIAD0, BAIA0ThkMin, BAIA0ThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAIA0CategoryVal,
                            "type": BAIA0TypeVal,
                            "std": BAIA0STDVal,
                            "name": BAIA0NameVal,
                            "temp": BAIADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAIAD0 = parseFloat(result.density);
                            BAIA0ThkMin = parseFloat(result.thkMin);
                            BAIA0ThkMax = parseFloat(result.thkMax);

                            // 顶部联杆腐蚀裕量 C02
                            let BAIAC02;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) < BAIA0ThkMax / 2) {
                                BAIAC02 = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) >= BAIA0ThkMax / 2) {
                                south.html("顶部联杆腐蚀裕量不能大于等于 " + BAIA0ThkMax / 2 + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 顶部联杆名义厚度
                            let BAIATHK0N;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > Math.max(2 * BAIAC02, BAIA0ThkMin)
                                && parseFloat(rows[10][columns[0][1].field]) <= BAIA0ThkMax) {
                                BAIATHK0N = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) <= Math.max(2 * BAIAC02, BAIA0ThkMin)) {
                                south.html("顶部联杆名义厚度 δ0n 不能小于等于 " + Math.max(2 * BAIAC02, BAIA0ThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > BAIA0ThkMax) {
                                south.html("顶部联杆名义厚度 δ0n 不能大于 " + BAIA0ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N);
                                baiaSketch.off("resize").on("resize", function () {
                                    if ($("#baia").length > 0) {
                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N);
                                    }
                                });
                            }
                            baiad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N);
                                        baiaSketch.off("resize").on("resize", function () {
                                            if ($("#baia").length > 0) {
                                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N);
                                            }
                                        });
                                    }
                                }
                            });

                            // ajax 获取 O0T C01 E0T
                            let BAIAO0T, BAIAC01, BAIAE0T;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAIA0CategoryVal,
                                    "type": BAIA0TypeVal,
                                    "std": BAIA0STDVal,
                                    "name": BAIA0NameVal,
                                    "thk": BAIATHK0N,
                                    "temp": BAIADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAIAO0T = parseFloat(result.ot);
                                    if (BAIAO0T < 0) {
                                        south.html("查询顶部联杆材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    BAIAC01 = parseFloat(result.c1);
                                    if (BAIAC01 < 0) {
                                        south.html("查询顶部联杆材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    BAIAE0T = 1000 * parseFloat(result.et);
                                    if (BAIAE0T < 0) {
                                        south.html("查询顶部联杆材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // B0N
                                    let BAIAB0N;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) > 2 * BAIAC02) {
                                        BAIAB0N = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) <= 2 * BAIAC02) {
                                        south.html("顶部联杆高度 B0n 不能小于等于 " + (2 * BAIAC02).toFixed(2) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N);
                                        baiaSketch.off("resize").on("resize", function () {
                                            if ($("#baia").length > 0) {
                                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N);
                                            }
                                        });
                                    }
                                    baiad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N);
                                                baiaSketch.off("resize").on("resize", function () {
                                                    if ($("#baia").length > 0) {
                                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // L0
                                    let BAIAL0;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                        BAIAL0 = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 第一段壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                        BAIA1NameVal = rows[16][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAIAD1, BAIA1ThkMin, BAIA1ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAIA1CategoryVal,
                                            "type": BAIA1TypeVal,
                                            "std": BAIA1STDVal,
                                            "name": BAIA1NameVal,
                                            "temp": BAIADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAIAD1 = parseFloat(result.density);
                                            BAIA1ThkMin = parseFloat(result.thkMin);
                                            BAIA1ThkMax = parseFloat(result.thkMax);

                                            // 第一层壁板腐蚀裕量 C12
                                            let BAIAC12;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) < BAIA1ThkMax) {
                                                BAIAC12 = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) >= BAIA1ThkMax) {
                                                south.html("第一段壁板腐蚀裕量不能大于等于 " + BAIA1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 第一段壁板名义厚度
                                            let BAIATHK1N;
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > Math.max(BAIAC12, BAIA1ThkMin)
                                                && parseFloat(rows[18][columns[0][1].field]) <= BAIA1ThkMax) {
                                                BAIATHK1N = parseFloat(rows[18][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) <= Math.max(BAIAC12, BAIA1ThkMin)) {
                                                south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAIAC12, BAIA1ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > BAIA1ThkMax) {
                                                south.html("第一段壁板名义厚度不能大于 " + BAIA1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O1T C11 E1T
                                            let BAIAO1T, BAIAC11, BAIAE1T;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAIA1CategoryVal,
                                                    "type": BAIA1TypeVal,
                                                    "std": BAIA1STDVal,
                                                    "name": BAIA1NameVal,
                                                    "thk": BAIATHK1N,
                                                    "temp": BAIADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAIAO1T = parseFloat(result.ot);
                                                    if (BAIAO1T < 0) {
                                                        south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAIAC11 = parseFloat(result.c1);
                                                    if (BAIAC11 < 0) {
                                                        south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAIAE1T = 1000 * parseFloat(result.et);
                                                    if (BAIAE1T < 0) {
                                                        south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 第一联杆材料名称
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        BAIAFNameVal = rows[22][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // AJAX 获取材料密度、最大最小厚度
                                                    let BAIADF, BAIAFThkMin, BAIAFThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAIAFCategoryVal,
                                                            "type": BAIAFTypeVal,
                                                            "std": BAIAFSTDVal,
                                                            "name": BAIAFNameVal,
                                                            "temp": BAIADT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAIADF = parseFloat(result.density);
                                                            BAIAFThkMin = parseFloat(result.thkMin);
                                                            BAIAFThkMax = parseFloat(result.thkMax);

                                                            // 第一层联杆腐蚀裕量 CF2
                                                            let BAIACF2;
                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) < BAIAFThkMax / 2) {
                                                                BAIACF2 = parseFloat(rows[23][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) >= BAIAFThkMax / 2) {
                                                                south.html("中间联杆腐蚀裕量不能大于等于 " + BAIAFThkMax / 2 + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 第一层联杆名义厚度
                                                            let BAIATHKFN;
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                && parseFloat(rows[24][columns[0][1].field]) > Math.max(2 * BAIACF2, BAIAFThkMin)
                                                                && parseFloat(rows[24][columns[0][1].field]) <= BAIAFThkMax) {
                                                                BAIATHKFN = parseFloat(rows[24][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                && parseFloat(rows[24][columns[0][1].field]) <= Math.max(2 * BAIACF2, BAIAFThkMin)) {
                                                                south.html("中间联杆名义厚度 δfn 不能小于等于 " + Math.max(2 * BAIACF2, BAIAFThkMin) + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                && parseFloat(rows[24][columns[0][1].field]) > BAIAFThkMax) {
                                                                south.html("中间联杆名义厚度 δfn 不能大于 " + BAIAFThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN);
                                                                baiaSketch.off("resize").on("resize", function () {
                                                                    if ($("#baia").length > 0) {
                                                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN);
                                                                    }
                                                                });
                                                            }
                                                            baiad2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN);
                                                                        baiaSketch.off("resize").on("resize", function () {
                                                                            if ($("#baia").length > 0) {
                                                                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // ajax 获取 OFT CF1 EFT
                                                            let BAIAOFT, BAIACF1, BAIAEFT;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAIAFCategoryVal,
                                                                    "type": BAIAFTypeVal,
                                                                    "std": BAIAFSTDVal,
                                                                    "name": BAIAFNameVal,
                                                                    "thk": BAIATHKFN,
                                                                    "temp": BAIADT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAIAOFT = parseFloat(result.ot);
                                                                    if (BAIAOFT < 0) {
                                                                        south.html("查询中间联杆材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAIACF1 = parseFloat(result.c1);
                                                                    if (BAIACF1 < 0) {
                                                                        south.html("查询中间联杆材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAIAEFT = 1000 * parseFloat(result.et);
                                                                    if (BAIAEFT < 0) {
                                                                        south.html("查询中间联杆材料弹性模量失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // BFN
                                                                    let BAIABFN;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) > 2 * BAIACF2) {
                                                                        BAIABFN = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) <= 2 * BAIACF2) {
                                                                        south.html("中间联杆高度 Bfn 不能小于等于 " + (2 * BAIACF2).toFixed(2) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN, BAIABFN);
                                                                        baiaSketch.off("resize").on("resize", function () {
                                                                            if ($("#baia").length > 0) {
                                                                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN, BAIABFN);
                                                                            }
                                                                        });
                                                                    }
                                                                    baiad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN, BAIABFN);
                                                                                baiaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#baia").length > 0) {
                                                                                        baia2d(BAIALP, BAIABH, 0.6 * BAIABH, 0.4 * BAIABH, BAIATHKTE, BAIATHK0N, BAIAB0N, BAIATHKFN, BAIABFN);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // LF
                                                                    let BAIALF;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                        BAIALF = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第二段壁板材料名称
                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                        BAIA2NameVal = rows[30][columns[0][1].field];
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // AJAX 获取材料密度、最大最小厚度
                                                                    let BAIAD2, BAIA2ThkMin, BAIA2ThkMax;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAIA2CategoryVal,
                                                                            "type": BAIA2TypeVal,
                                                                            "std": BAIA2STDVal,
                                                                            "name": BAIA2NameVal,
                                                                            "temp": BAIADT
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAIAD2 = parseFloat(result.density);
                                                                            BAIA2ThkMin = parseFloat(result.thkMin);
                                                                            BAIA2ThkMax = parseFloat(result.thkMax);

                                                                            // 第二层壁板腐蚀裕量 C22
                                                                            let BAIAC22;
                                                                            if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                && parseFloat(rows[31][columns[0][1].field]) < BAIA2ThkMax) {
                                                                                BAIAC22 = parseFloat(rows[31][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                && parseFloat(rows[31][columns[0][1].field]) >= BAIA2ThkMax) {
                                                                                south.html("第二段壁板腐蚀裕量不能大于等于 " + BAIA2ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // 第二段壁板名义厚度
                                                                            let BAIATHK2N;
                                                                            if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) > Math.max(BAIAC22, BAIA2ThkMin)
                                                                                && parseFloat(rows[32][columns[0][1].field]) <= BAIA2ThkMax) {
                                                                                BAIATHK2N = parseFloat(rows[32][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) <= Math.max(BAIAC22, BAIA2ThkMin)) {
                                                                                south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAIAC22, BAIA2ThkMin) + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) > BAIA2ThkMax) {
                                                                                south.html("第二段壁板名义厚度不能大于 " + BAIA2ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // ajax 获取 O2T C21 E2T
                                                                            let BAIAO2T, BAIAC21, BAIAE2T;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAIA2CategoryVal,
                                                                                    "type": BAIA2TypeVal,
                                                                                    "std": BAIA2STDVal,
                                                                                    "name": BAIA2NameVal,
                                                                                    "thk": BAIATHK2N,
                                                                                    "temp": BAIADT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": 100000
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAIAO2T = parseFloat(result.ot);
                                                                                    if (BAIAO2T < 0) {
                                                                                        south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAIAC21 = parseFloat(result.c1);
                                                                                    if (BAIAC21 < 0) {
                                                                                        south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAIAE2T = 1000 * parseFloat(result.et);
                                                                                    if (BAIAE2T < 0) {
                                                                                        south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // 过程参数
                                                                                    let BAIAG = 9.81;
                                                                                    let BAIAPC = BAIAD * BAIAG * BAIABH / 1000000000;
                                                                                    let BAIAB0E = BAIAB0N - BAIAC02;
                                                                                    let BAIAC0 = BAIAC01 + 2 * BAIAC02;
                                                                                    let BAIATHK0E = BAIATHK0N - BAIAC0;

                                                                                    let BAIAC1 = BAIAC11 + BAIAC12;
                                                                                    let BAIATHK1E = BAIATHK1N - BAIAC1;
                                                                                    let BAIABH1 = 0.6 * BAIABH;
                                                                                    let BAIABH1LP = BAIABH1 / BAIALP;
                                                                                    let BAIASH1 = BAIABH1;
                                                                                    let BAIAPC1 = BAIAD * BAIAG * BAIASH1 / 1000000000;

                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "ba": BAIABH1LP
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            let BAIAALPHA1 = parseFloat(result.alpha);
                                                                                            let BAIABETA1 = parseFloat(result.beta);

                                                                                            let BAIACF = BAIACF1 + 2 * BAIACF2;
                                                                                            let BAIABFE = BAIABFN - 2 * BAIACF2;
                                                                                            let BAIATHKFE = BAIATHKFN - BAIACF;

                                                                                            let BAIAC2 = BAIAC21 + BAIAC22;
                                                                                            let BAIATHK2E = BAIATHK2N - BAIAC2;
                                                                                            let BAIABH2 = 0.4 * BAIABH;
                                                                                            let BAIABH2LP = BAIABH2 / BAIALP;
                                                                                            let BAIASH2 = BAIABH1 + BAIABH2;
                                                                                            let BAIAPC2 = BAIAD * BAIAG * BAIASH2 / 1000000000;

                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "ba": BAIABH2LP
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    let BAIAALPHA2 = parseFloat(result.alpha);
                                                                                                    let BAIABETA2 = parseFloat(result.beta);

                                                                                                    // 顶部联杆计算及校核
                                                                                                    let BAIAK = BAIATHKTE + BAIAB0E;
                                                                                                    let BAIAB = 20 * BAIATHKTE - BAIATHK0E;
                                                                                                    let BAIAE1 = (BAIATHK0E * BAIAK * BAIAK + BAIAB * BAIATHKTE * BAIATHKTE) / (2 * (BAIATHK0E * BAIAK + BAIAB * BAIATHKTE));
                                                                                                    let BAIAE2 = BAIAK - BAIAE1;
                                                                                                    let BAIAIX = (20 * BAIATHKTE * Math.pow(BAIAE1, 3) - BAIAB * Math.pow(BAIAE1 - BAIATHKTE, 3) + BAIATHK0E * Math.pow(BAIAE2, 3)) / 3;
                                                                                                    let BAIAZX = BAIAIX / Math.max(BAIAE1, BAIAE2);
                                                                                                    let BAIAOTW0 = 9.6 * BAIAE0T * BAIAIX / (BAIAL0 * BAIAL0 * (BAIATHK0E * BAIAB0E + BAIATHKTE * BAIALP));
                                                                                                    let BAIAONW0 = 9.62 * BAIAL0 * BAIAL0 * (BAIATHK0E * BAIAB0E + BAIATHKTE * BAIALP) / BAIAZX / 1000000;
                                                                                                    let BAIAOTP0 = 0.06 * BAIAPC * BAIABH * BAIALP / (BAIATHK0E * BAIAB0E + BAIATHKTE * BAIALP);
                                                                                                    let BAIAORMAX0 = BAIAOTW0 + BAIAONW0 + BAIAOTP0;
                                                                                                    let BAIAORMAX0CHK;
                                                                                                    south.html(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "顶部联杆许用应力：" + BAIAO0T.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    if (BAIAORMAX0 <= BAIAO0T) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际应力：" + BAIAORMAX0.toFixed(4) + " MPa" +
                                                                                                            "</span>");
                                                                                                        BAIAORMAX0CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际应力：" + BAIAORMAX0.toFixed(4) + " MPa" +
                                                                                                            "</span>");
                                                                                                        BAIAORMAX0CHK = "不合格";
                                                                                                    }

                                                                                                    // 第一段加固柱校核
                                                                                                    let BAIAZP1 = BAIALP * (0.015 * BAIAPC * BAIABH * BAIABH / BAIAO1T - BAIATHK1E * BAIATHK1E / 6);

                                                                                                    // 第一段壁板
                                                                                                    let BAIATHK1C = BAIALP * Math.sqrt(3 * BAIAALPHA1 * BAIAPC1 / BAIAO1T);
                                                                                                    let BAIATHK1D = BAIATHK1C + BAIAC12;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第一段壁板所需厚度：" + (BAIATHK1D + BAIAC11).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAIATHK1CHK;
                                                                                                    if (BAIATHK1N >= (BAIATHK1D + BAIAC11)) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAIATHK1N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAIATHK1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAIATHK1N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAIATHK1CHK = "不合格";
                                                                                                    }
                                                                                                    let BAIAF1ALLOW = 5 * (BAIATHK1E / 2 + Math.sqrt(BAIABH1LP) * BAIALP / 500);
                                                                                                    let BAIAF1MAX = BAIABETA1 * Math.pow(BAIALP, 4) * BAIAPC1 / (2 * BAIAE1T * Math.pow(BAIATHK1E, 3));
                                                                                                    let BAIAF1CHK;
                                                                                                    if (BAIAF1MAX <= BAIAF1ALLOW) {
                                                                                                        BAIAF1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        BAIAF1CHK = "不合格";
                                                                                                    }

                                                                                                    // 第二段加固柱校核
                                                                                                    let BAIAZP2 = BAIALP * (0.015 * BAIAPC * BAIABH * BAIABH / BAIAO2T - BAIATHK2E * BAIATHK2E / 6);

                                                                                                    // 中间联杆计算及校核
                                                                                                    let BAIAOTWF = 0.8 * BAIAEFT * BAIABFE * BAIABFE / (BAIALF * BAIALF);
                                                                                                    let BAIAONWF = 0.75 * BAIADF * BAIAG * BAIALF * BAIALF / BAIABFE / 1000000000;
                                                                                                    let BAIAOTPF = 0.27 * BAIAPC * BAIABH * BAIALP / (BAIATHKFE * BAIABFE);
                                                                                                    let BAIAORMAXF = BAIAOTWF + BAIAONWF + BAIAOTPF;
                                                                                                    let BAIAORMAXFCHK;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "中间联杆许用应力：" + BAIAOFT.toFixed(2) + " MPa" +
                                                                                                        "</span>");
                                                                                                    if (BAIAORMAXF <= BAIAOFT) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际应力：" + BAIAORMAXF.toFixed(4) + " MPa" +
                                                                                                            "</span>");
                                                                                                        BAIAORMAXFCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际应力：" + BAIAORMAXF.toFixed(4) + " MPa" +
                                                                                                            "</span>");
                                                                                                        BAIAORMAXFCHK = "不合格";
                                                                                                    }

                                                                                                    // 第二段壁板
                                                                                                    let BAIATHK2C = BAIALP * Math.sqrt(6 * BAIAALPHA2 * (BAIAPC1 + BAIAPC2) / BAIAO2T);
                                                                                                    let BAIATHK2D = BAIATHK2C + BAIAC22;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第二段壁板所需厚度：" + (BAIATHK2D + BAIAC21).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAIATHK2CHK;
                                                                                                    if (BAIATHK2N >= (BAIATHK2D + BAIAC21)) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAIATHK2N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAIATHK2CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAIATHK2N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAIATHK2CHK = "不合格";
                                                                                                    }
                                                                                                    let BAIAF2ALLOW = 5 * (BAIATHK2E / 2 + Math.sqrt(BAIABH2LP) * BAIALP / 500);
                                                                                                    let BAIAF2MAX = BAIABETA2 * Math.pow(BAIALP, 4) * (BAIAPC1 + BAIAPC2) / (2 * BAIAE2T * Math.pow(BAIATHK2E, 3));
                                                                                                    let BAIAF2CHK;
                                                                                                    if (BAIAF2MAX <= BAIAF2ALLOW) {
                                                                                                        BAIAF2CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        BAIAF2CHK = "不合格";
                                                                                                    }

                                                                                                    // 加固柱结果汇总
                                                                                                    let BAIAZP = Math.max(BAIAZP1, BAIAZP2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "垂直加固柱所需截面系数：" + BAIAZP.toFixed(2) + " mm³" +
                                                                                                        "</span>");

                                                                                                    // docx
                                                                                                    let BAIAPayJS = $('#payjs');

                                                                                                    function getDocx() {
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "baiadocx.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                ribbonName: "BAIA",

                                                                                                                t: BAIADT,
                                                                                                                d: BAIAD,
                                                                                                                lp: BAIALP,
                                                                                                                bh: BAIABH,
                                                                                                                thkte: BAIATHKTE,

                                                                                                                std0: BAIA0STDVal,
                                                                                                                name0: BAIA0NameVal,
                                                                                                                c02: BAIAC02,
                                                                                                                b0n: BAIAB0N,
                                                                                                                thk0n: BAIATHK0N,
                                                                                                                l0: BAIAL0,

                                                                                                                std1: BAIA1STDVal,
                                                                                                                name1: BAIA1NameVal,
                                                                                                                c12: BAIAC12,
                                                                                                                thk1n: BAIATHK1N,

                                                                                                                stdf: BAIAFSTDVal,
                                                                                                                namef: BAIAFNameVal,
                                                                                                                cf2: BAIACF2,
                                                                                                                bfn: BAIABFN,
                                                                                                                thkfn: BAIATHKFN,
                                                                                                                lf: BAIALF,

                                                                                                                std2: BAIA2STDVal,
                                                                                                                name2: BAIA2NameVal,
                                                                                                                c22: BAIAC22,
                                                                                                                thk2n: BAIATHK2N,

                                                                                                                d0: BAIAD0.toFixed(4),
                                                                                                                c01: BAIAC01.toFixed(4),
                                                                                                                o0t: BAIAO0T.toFixed(4),
                                                                                                                e0t: (BAIAE0T / 1000).toFixed(4),

                                                                                                                d1: BAIAD1.toFixed(4),
                                                                                                                c11: BAIAC11.toFixed(4),
                                                                                                                o1t: BAIAO1T.toFixed(4),
                                                                                                                e1t: (BAIAE1T / 1000).toFixed(4),

                                                                                                                d2: BAIAD2.toFixed(4),
                                                                                                                c21: BAIAC21.toFixed(4),
                                                                                                                o2t: BAIAO2T.toFixed(4),
                                                                                                                e2t: (BAIAE2T / 1000).toFixed(4),

                                                                                                                df: BAIADF.toFixed(4),
                                                                                                                cf1: BAIACF1.toFixed(4),
                                                                                                                oft: BAIAOFT.toFixed(4),
                                                                                                                eft: (BAIAEFT / 1000).toFixed(4),

                                                                                                                g: BAIAG.toFixed(4),
                                                                                                                pc: BAIAPC.toFixed(4),

                                                                                                                b0e: BAIAB0E.toFixed(4),
                                                                                                                c0: BAIAC0.toFixed(4),
                                                                                                                thk0e: BAIATHK0E.toFixed(4),

                                                                                                                c1: BAIAC1.toFixed(4),
                                                                                                                thk1e: BAIATHK1E.toFixed(4),
                                                                                                                bh1: BAIABH1.toFixed(4),
                                                                                                                bh1lp: BAIABH1LP.toFixed(4),
                                                                                                                alpha1: BAIAALPHA1.toFixed(6),
                                                                                                                beta1: BAIABETA1.toFixed(6),
                                                                                                                sh1: BAIASH1.toFixed(4),
                                                                                                                pc1: BAIAPC1.toFixed(4),

                                                                                                                cf: BAIACF.toFixed(4),
                                                                                                                bfe: BAIABFE.toFixed(4),
                                                                                                                thkfe: BAIATHKFE.toFixed(4),

                                                                                                                c2: BAIAC2.toFixed(4),
                                                                                                                thk2e: BAIATHK2E.toFixed(4),
                                                                                                                bh2: BAIABH2.toFixed(4),
                                                                                                                bh2lp: BAIABH2LP.toFixed(4),
                                                                                                                alpha2: BAIAALPHA2.toFixed(6),
                                                                                                                beta2: BAIABETA2.toFixed(6),
                                                                                                                sh2: BAIASH2.toFixed(4),
                                                                                                                pc2: BAIAPC2.toFixed(4),

                                                                                                                k: BAIAK.toFixed(4),
                                                                                                                b: BAIAB.toFixed(4),
                                                                                                                e1: BAIAE1.toFixed(4),
                                                                                                                e2: BAIAE2.toFixed(4),
                                                                                                                ix: BAIAIX.toFixed(4),
                                                                                                                zx: BAIAZX.toFixed(4),
                                                                                                                otw0: BAIAOTW0.toFixed(4),
                                                                                                                onw0: BAIAONW0.toFixed(4),
                                                                                                                otp0: BAIAOTP0.toFixed(4),
                                                                                                                ormax0: BAIAORMAX0.toFixed(4),
                                                                                                                ormax0chk: BAIAORMAX0CHK,

                                                                                                                zp1: BAIAZP1.toFixed(4),

                                                                                                                thk1c: BAIATHK1C.toFixed(4),
                                                                                                                thk1d: BAIATHK1D.toFixed(4),
                                                                                                                thk1chk: BAIATHK1CHK,
                                                                                                                f1allow: BAIAF1ALLOW.toFixed(4),
                                                                                                                f1max: BAIAF1MAX.toFixed(4),
                                                                                                                f1maxchk: BAIAF1CHK,

                                                                                                                zp2: BAIAZP2.toFixed(4),

                                                                                                                otwf: BAIAOTWF.toFixed(4),
                                                                                                                onwf: BAIAONWF.toFixed(4),
                                                                                                                otpf: BAIAOTPF.toFixed(4),
                                                                                                                ormaxf: BAIAORMAXF.toFixed(4),
                                                                                                                ormaxfchk: BAIAORMAXFCHK,

                                                                                                                thk2c: BAIATHK2C.toFixed(4),
                                                                                                                thk2d: BAIATHK2D.toFixed(4),
                                                                                                                thk2chk: BAIATHK2CHK,
                                                                                                                f2allow: BAIAF2ALLOW.toFixed(4),
                                                                                                                f2max: BAIAF2MAX.toFixed(4),
                                                                                                                f2maxchk: BAIAF2CHK,

                                                                                                                zp: BAIAZP.toFixed(4)
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
                                                                                                                    BAIAPayJS.dialog({
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
                                                                                                                                BAIAPayJS.dialog("close");
                                                                                                                                BAIAPayJS.dialog("clear");
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
                                                                                                                                            BAIAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                    BAIAPayJS.dialog('close');
                                                                                                                                                    BAIAPayJS.dialog('clear');
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
                                                                                                        "<span style='color:red;'>&ensp;查表 8-7 获取 α、β失败，请检查网络后重试</span>");
                                                                                                }
                                                                                            });
                                                                                        },
                                                                                        error: function () {
                                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                "<span style='color:red;'>&ensp;查表 8-7 获取 α、β失败，请检查网络后重试</span>");
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