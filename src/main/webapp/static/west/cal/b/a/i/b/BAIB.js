$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let baibSketch = $("#d2");
    let baibModel = $("#d3");
    let baibd2d3 = $('#d2d3');

    $("#cal").html("<table id='baib'></table>");
    let pg = $("#baib");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/i/b/BAIB.json", function (result) {

        let BAIBDT;
        let BAIB0Category, BAIB0CategoryVal, BAIB0Type, BAIB0TypeVal, BAIB0STD, BAIB0STDVal, BAIB0Name, BAIB0NameVal,
            BAIB1Category, BAIB1CategoryVal, BAIB1Type, BAIB1TypeVal, BAIB1STD, BAIB1STDVal, BAIB1Name, BAIB1NameVal,
            BAIBFCategory, BAIBFCategoryVal, BAIBFType, BAIBFTypeVal, BAIBFSTD, BAIBFSTDVal, BAIBFName, BAIBFNameVal,
            BAIB2Category, BAIB2CategoryVal, BAIB2Type, BAIB2TypeVal, BAIB2STD, BAIB2STDVal, BAIB2Name, BAIB2NameVal,
            BAIBSCategory, BAIBSCategoryVal, BAIBSType, BAIBSTypeVal, BAIBSSTD, BAIBSSTDVal, BAIBSName, BAIBSNameVal,
            BAIB3Category, BAIB3CategoryVal, BAIB3Type, BAIB3TypeVal, BAIB3STD, BAIB3STDVal, BAIB3Name, BAIB3NameVal;
        let columns, rows, ed;

        function baib2d(lp = "Lp",
                        bh = "H", bh1 = "0.45H", bh2 = "0.3H", bh3 = "0.25H",
                        thkte = "δte",
                        thk0n = "δ0n", b0n = "B0n",
                        thkfn = "δfn", bfn = "Bfn",
                        thksn = "δsn", bsn = "Bsn") {

            baibSketch.empty();

            let width = baibSketch.width();
            let height = baibSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAIBSVG").attr("height", height);

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
                    {x: padding + wg - thk, y: padding + 1.8 * hg},
                    {x: padding + 3 * wg, y: padding + 1.8 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk, y: padding + 3 * hg},
                    {x: padding + 3 * wg, y: padding + 3 * hg}
                ]));

            // LP1
            dimBottomH(padding + wg, height - padding, padding + 1.5 * wg, height - padding, lp, "BAIBSketchLP1");

            // LP2
            dimBottomH(padding + 1.5 * wg, height - padding, padding + 2 * wg, height - padding, lp, "BAIBSketchLP2");

            // LP3
            dimBottomH(padding + 2 * wg, height - padding, padding + 2.5 * wg, height - padding, lp, "BAIBSketchLP3");

            // LP4
            dimBottomH(padding + 2.5 * wg, height - padding, padding + 3 * wg, height - padding, lp, "BAIBSketchLP4");

            // BH
            dimRightV(padding + 3 * wg + 4 * thk, height - padding, padding + 3 * wg + 4 * thk, padding, bh, "BAIBSketchBH");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 2 * thk + 3, y: padding},
                    {x: padding + 3 * wg + 4 * thk + 3, y: padding}
                ]));

            // BH1
            dimLeftV(padding + wg - 5 * thk, padding + 1.8 * hg, padding + wg - 5 * thk, padding, bh1, "BAIBSketchBH1");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 5 * thk - 3, y: padding + 1.8 * hg},
                    {x: padding + wg - thk - 3, y: padding + 1.8 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 5 * thk - 3, y: padding},
                    {x: padding + wg - 3 * thk - 3, y: padding}
                ]));

            // BH2
            dimLeftV(padding + wg - 5 * thk, padding + 3 * hg, padding + wg - 5 * thk, padding + 1.8 * hg, bh2, "BAIBSketchBH2");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 5 * thk - 3, y: padding + 3 * hg},
                    {x: padding + wg - thk - 3, y: padding + 3 * hg}
                ]));

            // BH3
            dimLeftV(padding + wg - 5 * thk, height - padding, padding + wg - 5 * thk, padding + 3 * hg, bh3, "BAIBSketchBH3");

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
            ])).attr("id", "BAIBSketchTHKTE").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIBSketchTHKTE").attr("startOffset", "50%").text(thkte);

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
            ])).attr("id", "BAIBSketchB0N").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIBSketchB0N").attr("startOffset", "50%").text(b0n);

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
            ])).attr("id", "BAIBSketchTHK0N").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIBSketchTHK0N").attr("startOffset", "50%").text(thk0n);

            // 第一层中间联杆
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding + 1.8 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding + 1.8 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding + 1.8 * hg}
                ]));

            // BFN
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg + 15 + 10},
                    {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg - 3 * thk}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + thk + 3, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk + 40, y: padding + 1.8 * hg - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg},
                    {x: padding + 2 * wg + thk + 30 + 3, y: padding + 1.8 * hg + 15},
                    {x: padding + 2 * wg + thk + 30 - 3, y: padding + 1.8 * hg + 15},
                    {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk + 30 - 3, y: padding + 1.8 * hg - 3 * thk - 15},
                    {x: padding + 2 * wg + thk + 30 + 3, y: padding + 1.8 * hg - 3 * thk - 15},
                    {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg - 3 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg - 3 * thk - 15},
                {x: padding + 2 * wg + thk + 30, y: padding + 1.8 * hg - 3 * thk - 15 - 40}
            ])).attr("id", "BAIBSketchBFN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIBSketchBFN").attr("startOffset", "50%").text(bfn);

            //thkFn
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding - 3 * thk + 1.8 * hg - 3},
                    {x: padding + 1.5 * wg + thk, y: padding - 3 * thk + 1.8 * hg - 40}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 15 - 10, y: padding + 1.8 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg + thk, y: padding + 1.8 * hg - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 1.8 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg - 15, y: padding + 1.8 * hg - 3 * thk - 30 + 3},
                    {x: padding + 1.5 * wg - 15, y: padding + 1.8 * hg - 3 * thk - 30 - 3},
                    {x: padding + 1.5 * wg, y: padding + 1.8 * hg - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding + 1.8 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 1.8 * hg - 3 * thk - 30 + 3},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 1.8 * hg - 3 * thk - 30 - 3},
                    {x: padding + 1.5 * wg + thk, y: padding + 1.8 * hg - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg + thk + 15, y: padding + 1.8 * hg - 3 * thk - 30},
                {x: padding + 1.5 * wg + thk + 15 + 40, y: padding + 1.8 * hg - 3 * thk - 30}
            ])).attr("id", "BAIBSketchTHKFN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIBSketchTHKFN").attr("startOffset", "50%").text(thkfn);

            // 第二层中间联杆
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 2 * wg + thk, y: padding + 3 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk, y: padding + 3 * hg}
                ]));

            // BSN
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg - 3 * thk - 15 - 10},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 3, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk + 40, y: padding + 3 * hg - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg},
                    {x: padding + 2.5 * wg + thk + 30 + 3, y: padding + 3 * hg + 15},
                    {x: padding + 2.5 * wg + thk + 30 - 3, y: padding + 3 * hg + 15},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg - 3 * thk},
                    {x: padding + 2.5 * wg + thk + 30 - 3, y: padding + 3 * hg - 3 * thk - 15},
                    {x: padding + 2.5 * wg + thk + 30 + 3, y: padding + 3 * hg - 3 * thk - 15},
                    {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg - 3 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg + 15 + 40},
                {x: padding + 2.5 * wg + thk + 30, y: padding + 3 * hg + 15}
            ])).attr("id", "BAIBSketchBSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIBSketchBSN").attr("startOffset", "50%").text(bsn);

            //thksn
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding - 3 * thk + 3 * hg - 3},
                    {x: padding + 1.5 * wg + thk, y: padding - 3 * thk + 3 * hg - 40}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 15 - 10, y: padding + 3 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * hg - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 3 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg - 15, y: padding + 3 * hg - 3 * thk - 30 + 3},
                    {x: padding + 1.5 * wg - 15, y: padding + 3 * hg - 3 * thk - 30 - 3},
                    {x: padding + 1.5 * wg, y: padding + 3 * hg - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * hg - 3 * thk - 30},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 3 * hg - 3 * thk - 30 + 3},
                    {x: padding + 1.5 * wg + thk + 15, y: padding + 3 * hg - 3 * thk - 30 - 3},
                    {x: padding + 1.5 * wg + thk, y: padding + 3 * hg - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg + thk + 15, y: padding + 3 * hg - 3 * thk - 30},
                {x: padding + 1.5 * wg + thk + 15 + 40, y: padding + 3 * hg - 3 * thk - 30}
            ])).attr("id", "BAIBSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAIBSketchTHKSN").attr("startOffset", "50%").text(thksn);
        }

        currentTabIndex = baibd2d3.tabs('getTabIndex', baibd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baib2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baib").length > 0) {
                    baib2d();
                }
            });
        }
        baibd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baib2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baib").length > 0) {
                            baib2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 二层中间联杆G型矩形容器设计计算",
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
                    $(ed.target).combobox("loadData", BAIB0Category);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAIB0Type);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAIB0STD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAIB0Name);
                }

                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAIB1Category);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BAIB1Type);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAIB1STD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAIB1Name);
                }

                else if (index === 19) {
                    $(ed.target).combobox("loadData", BAIBFCategory);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BAIBFType);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAIBFSTD);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAIBFName);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BAIB2Category);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAIB2Type);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAIB2STD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAIB2Name);
                }

                else if (index === 33) {
                    $(ed.target).combobox("loadData", BAIBSCategory);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", BAIBSType);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", BAIBSSTD);
                }
                else if (index === 36) {
                    $(ed.target).combobox("loadData", BAIBSName);
                }

                else if (index === 41) {
                    $(ed.target).combobox("loadData", BAIB3Category);
                }
                else if (index === 42) {
                    $(ed.target).combobox("loadData", BAIB3Type);
                }
                else if (index === 43) {
                    $(ed.target).combobox("loadData", BAIB3STD);
                }
                else if (index === 44) {
                    $(ed.target).combobox("loadData", BAIB3Name);
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
                    baibSketch.empty();

                    // model
                    baibModel.empty();

                    // sketch
                    currentTabIndex = baibd2d3.tabs('getTabIndex', baibd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baib2d();
                        baibSketch.off("resize").on("resize", function () {
                            if ($("#baib").length > 0) {
                                baib2d();
                            }
                        });
                    }
                    baibd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baib2d();
                                baibSketch.off("resize").on("resize", function () {
                                    if ($("#baib").length > 0) {
                                        baib2d();
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

                        BAIBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAIB0Category = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAIB0Type = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAIB0STD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIB0Name = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAIB1Category = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAIB1Type = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAIB1STD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIB1Name = null;

                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAIBFCategory = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BAIBFType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAIBFSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIBFName = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BAIB2Category = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAIB2Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAIB2STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIB2Name = null;

                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        BAIBSCategory = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAIBSType = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAIBSSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAIBSName = null;

                        rows[41][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 41);
                        BAIB3Category = null;
                        rows[42][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 42);
                        BAIB3Type = null;
                        rows[43][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 43);
                        BAIB3STD = null;
                        rows[44][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 44);
                        BAIB3Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB0Category = [];
                                BAIB1Category = [];
                                BAIBFCategory = [];
                                BAIB2Category = [];
                                BAIBSCategory = [];
                                BAIB3Category = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAIBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAIB0Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIB1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIBFCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIB2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAIB3Category[index] = {
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

                        BAIB0CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAIB0Type = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAIB0STD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIB0Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB0CategoryVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB0Type = [];
                                $(result).each(function (index, element) {
                                    BAIB0Type[index] = {
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

                        BAIB0TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAIB0STD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIB0Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB0CategoryVal,
                                type: BAIB0TypeVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB0STD = [];
                                $(result).each(function (index, element) {
                                    BAIB0STD[index] = {
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

                        BAIB0STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAIB0Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB0CategoryVal,
                                type: BAIB0TypeVal,
                                std: BAIB0STDVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB0Name = [];
                                $(result).each(function (index, element) {
                                    BAIB0Name[index] = {
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

                        BAIB1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAIB1Type = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAIB1STD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIB1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB1CategoryVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB1Type = [];
                                $(result).each(function (index, element) {
                                    BAIB1Type[index] = {
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

                        BAIB1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAIB1STD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIB1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB1CategoryVal,
                                type: BAIB1TypeVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB1STD = [];
                                $(result).each(function (index, element) {
                                    BAIB1STD[index] = {
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

                        BAIB1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAIB1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB1CategoryVal,
                                type: BAIB1TypeVal,
                                std: BAIB1STDVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB1Name = [];
                                $(result).each(function (index, element) {
                                    BAIB1Name[index] = {
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

                        BAIBFCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BAIBFType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAIBFSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIBFName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIBFCategoryVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIBFType = [];
                                $(result).each(function (index, element) {
                                    BAIBFType[index] = {
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

                        BAIBFTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAIBFSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIBFName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIBFCategoryVal,
                                type: BAIBFTypeVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIBFSTD = [];
                                $(result).each(function (index, element) {
                                    BAIBFSTD[index] = {
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

                        BAIBFSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAIBFName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIBFCategoryVal,
                                type: BAIBFTypeVal,
                                std: BAIBFSTDVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIBFName = [];
                                $(result).each(function (index, element) {
                                    BAIBFName[index] = {
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

                        BAIB2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAIB2Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAIB2STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIB2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB2CategoryVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB2Type = [];
                                $(result).each(function (index, element) {
                                    BAIB2Type[index] = {
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

                        BAIB2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAIB2STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIB2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB2CategoryVal,
                                type: BAIB2TypeVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB2STD = [];
                                $(result).each(function (index, element) {
                                    BAIB2STD[index] = {
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

                        BAIB2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAIB2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB2CategoryVal,
                                type: BAIB2TypeVal,
                                std: BAIB2STDVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB2Name = [];
                                $(result).each(function (index, element) {
                                    BAIB2Name[index] = {
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
                    else if (index === 33) {

                        BAIBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAIBSType = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAIBSSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAIBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIBSCategoryVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIBSType = [];
                                $(result).each(function (index, element) {
                                    BAIBSType[index] = {
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
                    else if (index === 34) {

                        BAIBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAIBSSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAIBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIBSCategoryVal,
                                type: BAIBSTypeVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIBSSTD = [];
                                $(result).each(function (index, element) {
                                    BAIBSSTD[index] = {
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
                    else if (index === 35) {

                        BAIBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAIBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIBSCategoryVal,
                                type: BAIBSTypeVal,
                                std: BAIBSSTDVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIBSName = [];
                                $(result).each(function (index, element) {
                                    BAIBSName[index] = {
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
                    else if (index === 41) {

                        BAIB3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[42][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 42);
                        BAIB3Type = null;
                        rows[43][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 43);
                        BAIB3STD = null;
                        rows[44][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 44);
                        BAIB3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB3CategoryVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB3Type = [];
                                $(result).each(function (index, element) {
                                    BAIB3Type[index] = {
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
                    else if (index === 42) {

                        BAIB3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[43][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 43);
                        BAIB3STD = null;
                        rows[44][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 44);
                        BAIB3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB3CategoryVal,
                                type: BAIB3TypeVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB3STD = [];
                                $(result).each(function (index, element) {
                                    BAIB3STD[index] = {
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
                    else if (index === 43) {

                        BAIB3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[44][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 44);
                        BAIB3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAIB3CategoryVal,
                                type: BAIB3TypeVal,
                                std: BAIB3STDVal,
                                temp: BAIBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAIB3Name = [];
                                $(result).each(function (index, element) {
                                    BAIB3Name[index] = {
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
                    let BAIBD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAIBD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LP
                    let BAIBLP;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAIBLP = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baib2d(BAIBLP);
                        baibSketch.off("resize").on("resize", function () {
                            if ($("#baib").length > 0) {
                                baib2d(BAIBLP);
                            }
                        });
                    }
                    baibd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baib2d(BAIBLP);
                                baibSketch.off("resize").on("resize", function () {
                                    if ($("#baib").length > 0) {
                                        baib2d(BAIBLP);
                                    }
                                });
                            }
                        }
                    });

                    // BH
                    let BAIBBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAIBLP / 0.45, 0.1 * BAIBLP / 0.30, 0.1 * BAIBLP / 0.25)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAIBLP / 0.45, 5 * BAIBLP / 0.30, 5 * BAIBLP / 0.25)) {
                        BAIBBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAIBLP / 0.45, 0.1 * BAIBLP / 0.30, 0.1 * BAIBLP / 0.25)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAIBLP / 0.45, 0.1 * BAIBLP / 0.30, 0.1 * BAIBLP / 0.25) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAIBLP / 0.45, 5 * BAIBLP / 0.30, 5 * BAIBLP / 0.25)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAIBLP / 0.45, 5 * BAIBLP / 0.30, 5 * BAIBLP / 0.25) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH);
                        baibSketch.off("resize").on("resize", function () {
                            if ($("#baib").length > 0) {
                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH);
                            }
                        });
                    }
                    baibd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH);
                                baibSketch.off("resize").on("resize", function () {
                                    if ($("#baib").length > 0) {
                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH);
                                    }
                                });
                            }
                        }
                    });

                    // thkte
                    let BAIBTHKTE;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BAIBTHKTE = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE);
                        baibSketch.off("resize").on("resize", function () {
                            if ($("#baib").length > 0) {
                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE);
                            }
                        });
                    }
                    baibd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE);
                                baibSketch.off("resize").on("resize", function () {
                                    if ($("#baib").length > 0) {
                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE);
                                    }
                                });
                            }
                        }
                    });

                    // 顶部联杆材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BAIB0NameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAIBD0, BAIB0ThkMin, BAIB0ThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAIB0CategoryVal,
                            "type": BAIB0TypeVal,
                            "std": BAIB0STDVal,
                            "name": BAIB0NameVal,
                            "temp": BAIBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAIBD0 = parseFloat(result.density);
                            BAIB0ThkMin = parseFloat(result.thkMin);
                            BAIB0ThkMax = parseFloat(result.thkMax);

                            // 顶部联杆腐蚀裕量 C02
                            let BAIBC02;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) < BAIB0ThkMax / 2) {
                                BAIBC02 = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) >= BAIB0ThkMax / 2) {
                                south.html("顶部联杆腐蚀裕量不能大于等于 " + BAIB0ThkMax / 2 + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 顶部联杆名义厚度
                            let BAIBTHK0N;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > Math.max(2 * BAIBC02, BAIB0ThkMin)
                                && parseFloat(rows[10][columns[0][1].field]) <= BAIB0ThkMax) {
                                BAIBTHK0N = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) <= Math.max(2 * BAIBC02, BAIB0ThkMin)) {
                                south.html("顶部联杆名义厚度 δ0n 不能小于等于 " + Math.max(2 * BAIBC02, BAIB0ThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > BAIB0ThkMax) {
                                south.html("顶部联杆名义厚度 δ0n 不能大于 " + BAIB0ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                baib2d(BAIBLP, BAIBBH, 0.6 * BAIBBH, 0.4 * BAIBBH, BAIBTHKTE, BAIBTHK0N);
                                baibSketch.off("resize").on("resize", function () {
                                    if ($("#baib").length > 0) {
                                        baib2d(BAIBLP, BAIBBH, 0.6 * BAIBBH, 0.4 * BAIBBH, BAIBTHKTE, BAIBTHK0N);
                                    }
                                });
                            }
                            baibd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        baib2d(BAIBLP, BAIBBH, 0.6 * BAIBBH, 0.4 * BAIBBH, BAIBTHKTE, BAIBTHK0N);
                                        baibSketch.off("resize").on("resize", function () {
                                            if ($("#baib").length > 0) {
                                                baib2d(BAIBLP, BAIBBH, 0.6 * BAIBBH, 0.4 * BAIBBH, BAIBTHKTE, BAIBTHK0N);
                                            }
                                        });
                                    }
                                }
                            });

                            // ajax 获取 O0T C01 E0T
                            let BAIBO0T, BAIBC01, BAIBE0T;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAIB0CategoryVal,
                                    "type": BAIB0TypeVal,
                                    "std": BAIB0STDVal,
                                    "name": BAIB0NameVal,
                                    "thk": BAIBTHK0N,
                                    "temp": BAIBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAIBO0T = parseFloat(result.ot);
                                    if (BAIBO0T < 0) {
                                        south.html("查询顶部联杆材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAIBC01 = parseFloat(result.c1);
                                    if (BAIBC01 < 0) {
                                        south.html("查询顶部联杆材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    BAIBE0T = 1000 * parseFloat(result.et);
                                    if (BAIBE0T < 0) {
                                        south.html("查询顶部联杆材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // B0N
                                    let BAIBB0N;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) > 2 * BAIBC02) {
                                        BAIBB0N = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) <= 2 * BAIBC02) {
                                        south.html("顶部联杆高度 B0n 不能小于等于 " + (2 * BAIBC02).toFixed(2) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N);
                                        baibSketch.off("resize").on("resize", function () {
                                            if ($("#baib").length > 0) {
                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N);
                                            }
                                        });
                                    }
                                    baibd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N);
                                                baibSketch.off("resize").on("resize", function () {
                                                    if ($("#baib").length > 0) {
                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // L0
                                    let BAIBL0;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                        BAIBL0 = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 第一段壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                        BAIB1NameVal = rows[16][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAIBD1, BAIB1ThkMin, BAIB1ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAIB1CategoryVal,
                                            "type": BAIB1TypeVal,
                                            "std": BAIB1STDVal,
                                            "name": BAIB1NameVal,
                                            "temp": BAIBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAIBD1 = parseFloat(result.density);
                                            BAIB1ThkMin = parseFloat(result.thkMin);
                                            BAIB1ThkMax = parseFloat(result.thkMax);

                                            // 第一层壁板腐蚀裕量 C12
                                            let BAIBC12;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) < BAIB1ThkMax) {
                                                BAIBC12 = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) >= BAIB1ThkMax) {
                                                south.html("第一段壁板腐蚀裕量不能大于等于 " + BAIB1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 第一段壁板名义厚度
                                            let BAIBTHK1N;
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > Math.max(BAIBC12, BAIB1ThkMin)
                                                && parseFloat(rows[18][columns[0][1].field]) <= BAIB1ThkMax) {
                                                BAIBTHK1N = parseFloat(rows[18][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) <= Math.max(BAIBC12, BAIB1ThkMin)) {
                                                south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAIBC12, BAIB1ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                && parseFloat(rows[18][columns[0][1].field]) > BAIB1ThkMax) {
                                                south.html("第一段壁板名义厚度不能大于 " + BAIB1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O1T C11 E1T
                                            let BAIBO1T, BAIBC11, BAIBE1T;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAIB1CategoryVal,
                                                    "type": BAIB1TypeVal,
                                                    "std": BAIB1STDVal,
                                                    "name": BAIB1NameVal,
                                                    "thk": BAIBTHK1N,
                                                    "temp": BAIBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAIBO1T = parseFloat(result.ot);
                                                    if (BAIBO1T < 0) {
                                                        south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAIBC11 = parseFloat(result.c1);
                                                    if (BAIBC11 < 0) {
                                                        south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAIBE1T = 1000 * parseFloat(result.et);
                                                    if (BAIBE1T < 0) {
                                                        south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 第一联杆材料名称
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        BAIBFNameVal = rows[22][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // AJAX 获取材料密度、最大最小厚度
                                                    let BAIBDF, BAIBFThkMin, BAIBFThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAIBFCategoryVal,
                                                            "type": BAIBFTypeVal,
                                                            "std": BAIBFSTDVal,
                                                            "name": BAIBFNameVal,
                                                            "temp": BAIBDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAIBDF = parseFloat(result.density);
                                                            BAIBFThkMin = parseFloat(result.thkMin);
                                                            BAIBFThkMax = parseFloat(result.thkMax);

                                                            // 第一层联杆腐蚀裕量 CF2
                                                            let BAIBCF2;
                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) < BAIBFThkMax / 2) {
                                                                BAIBCF2 = parseFloat(rows[23][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) >= BAIBFThkMax / 2) {
                                                                south.html("第一层中间联杆腐蚀裕量不能大于等于 " + BAIBFThkMax / 2 + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 第一层中间联杆名义厚度
                                                            let BAIBTHKFN;
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                && parseFloat(rows[24][columns[0][1].field]) > Math.max(2 * BAIBCF2, BAIBFThkMin)
                                                                && parseFloat(rows[24][columns[0][1].field]) <= BAIBFThkMax) {
                                                                BAIBTHKFN = parseFloat(rows[24][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                && parseFloat(rows[24][columns[0][1].field]) <= Math.max(2 * BAIBCF2, BAIBFThkMin)) {
                                                                south.html("第一层中间联杆名义厚度 δfn 不能小于等于 " + Math.max(2 * BAIBCF2, BAIBFThkMin) + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                && parseFloat(rows[24][columns[0][1].field]) > BAIBFThkMax) {
                                                                south.html("第一层中间联杆名义厚度 δfn 不能大于 " + BAIBFThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.30 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN);
                                                                baibSketch.off("resize").on("resize", function () {
                                                                    if ($("#baib").length > 0) {
                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.30 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN);
                                                                    }
                                                                });
                                                            }
                                                            baibd2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.30 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN);
                                                                        baibSketch.off("resize").on("resize", function () {
                                                                            if ($("#baib").length > 0) {
                                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.30 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // ajax 获取 OFT CF1 EFT
                                                            let BAIBOFT, BAIBCF1, BAIBEFT;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAIBFCategoryVal,
                                                                    "type": BAIBFTypeVal,
                                                                    "std": BAIBFSTDVal,
                                                                    "name": BAIBFNameVal,
                                                                    "thk": BAIBTHKFN,
                                                                    "temp": BAIBDT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAIBOFT = parseFloat(result.ot);
                                                                    if (BAIBOFT < 0) {
                                                                        south.html("查询第一层中间联杆材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAIBCF1 = parseFloat(result.c1);
                                                                    if (BAIBCF1 < 0) {
                                                                        south.html("查询第一层中间联杆材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAIBEFT = 1000 * parseFloat(result.et);
                                                                    if (BAIBEFT < 0) {
                                                                        south.html("查询第一层中间联杆材料弹性模量失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // BFN
                                                                    let BAIBBFN;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) > 2 * BAIBCF2) {
                                                                        BAIBBFN = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) <= 2 * BAIBCF2) {
                                                                        south.html("第一层中间联杆高度 Bfn 不能小于等于 " + (2 * BAIBCF2).toFixed(2) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN);
                                                                        baibSketch.off("resize").on("resize", function () {
                                                                            if ($("#baib").length > 0) {
                                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN);
                                                                            }
                                                                        });
                                                                    }
                                                                    baibd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN);
                                                                                baibSketch.off("resize").on("resize", function () {
                                                                                    if ($("#baib").length > 0) {
                                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // LF
                                                                    let BAIBLF;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                        BAIBLF = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第二段壁板材料名称
                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                        BAIB2NameVal = rows[30][columns[0][1].field];
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // AJAX 获取材料密度、最大最小厚度
                                                                    let BAIBD2, BAIB2ThkMin, BAIB2ThkMax;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAIB2CategoryVal,
                                                                            "type": BAIB2TypeVal,
                                                                            "std": BAIB2STDVal,
                                                                            "name": BAIB2NameVal,
                                                                            "temp": BAIBDT
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAIBD2 = parseFloat(result.density);
                                                                            BAIB2ThkMin = parseFloat(result.thkMin);
                                                                            BAIB2ThkMax = parseFloat(result.thkMax);

                                                                            // 第二层壁板腐蚀裕量 C22
                                                                            let BAIBC22;
                                                                            if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                && parseFloat(rows[31][columns[0][1].field]) < BAIB2ThkMax) {
                                                                                BAIBC22 = parseFloat(rows[31][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                && parseFloat(rows[31][columns[0][1].field]) >= BAIB2ThkMax) {
                                                                                south.html("第二段壁板腐蚀裕量不能大于等于 " + BAIB2ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // 第二段壁板名义厚度
                                                                            let BAIBTHK2N;
                                                                            if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) > Math.max(BAIBC22, BAIB2ThkMin)
                                                                                && parseFloat(rows[32][columns[0][1].field]) <= BAIB2ThkMax) {
                                                                                BAIBTHK2N = parseFloat(rows[32][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) <= Math.max(BAIBC22, BAIB2ThkMin)) {
                                                                                south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAIBC22, BAIB2ThkMin) + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) > BAIB2ThkMax) {
                                                                                south.html("第二段壁板名义厚度不能大于 " + BAIB2ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // ajax 获取 O2T C21 E2T
                                                                            let BAIBO2T, BAIBC21, BAIBE2T;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAIB2CategoryVal,
                                                                                    "type": BAIB2TypeVal,
                                                                                    "std": BAIB2STDVal,
                                                                                    "name": BAIB2NameVal,
                                                                                    "thk": BAIBTHK2N,
                                                                                    "temp": BAIBDT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": 100000
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAIBO2T = parseFloat(result.ot);
                                                                                    if (BAIBO2T < 0) {
                                                                                        south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAIBC21 = parseFloat(result.c1);
                                                                                    if (BAIBC21 < 0) {
                                                                                        south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAIBE2T = 1000 * parseFloat(result.et);
                                                                                    if (BAIBE2T < 0) {
                                                                                        south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // 第二层中间联杆材料名称
                                                                                    if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                                                        BAIBSNameVal = rows[36][columns[0][1].field];
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    let BAIBDS, BAIBSThkMin,
                                                                                        BAIBSThkMax;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAIBSCategoryVal,
                                                                                            "type": BAIBSTypeVal,
                                                                                            "std": BAIBSSTDVal,
                                                                                            "name": BAIBSNameVal,
                                                                                            "temp": BAIBDT
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAIBDS = parseFloat(result.density);
                                                                                            BAIBSThkMin = parseFloat(result.thkMin);
                                                                                            BAIBSThkMax = parseFloat(result.thkMax);

                                                                                            // 第二层中间联杆腐蚀裕量 CS2
                                                                                            let BAIBCS2;
                                                                                            if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                && parseFloat(rows[37][columns[0][1].field]) < BAIBSThkMax / 2) {
                                                                                                BAIBCS2 = parseFloat(rows[37][columns[0][1].field]);
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                && parseFloat(rows[37][columns[0][1].field]) >= BAIBSThkMax / 2) {
                                                                                                south.html("第二层中间联杆腐蚀裕量不能大于等于 " + BAIBSThkMax / 2 + " mm").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            else {
                                                                                                return false;
                                                                                            }

                                                                                            // 第二层中间联杆名义厚度
                                                                                            let BAIBTHKSN;
                                                                                            if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                && parseFloat(rows[38][columns[0][1].field]) > Math.max(2 * BAIBCS2, BAIBSThkMin)
                                                                                                && parseFloat(rows[38][columns[0][1].field]) <= BAIBSThkMax) {
                                                                                                BAIBTHKSN = parseFloat(rows[38][columns[0][1].field]);
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                && parseFloat(rows[38][columns[0][1].field]) <= Math.max(2 * BAIBCS2, BAIBSThkMin)) {
                                                                                                south.html("第二层中间联杆名义厚度 δsn 不能小于等于 " + Math.max(2 * BAIBCS2, BAIBSThkMin) + " mm").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                && parseFloat(rows[38][columns[0][1].field]) > BAIBSThkMax) {
                                                                                                south.html("第二层中间联杆名义厚度 δsn 不能大于 " + BAIBSThkMax + " mm").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            else {
                                                                                                return false;
                                                                                            }

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN);
                                                                                                baibSketch.off("resize").on("resize", function () {
                                                                                                    if ($("#baib").length > 0) {
                                                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            baibd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN);
                                                                                                        baibSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#baib").length > 0) {
                                                                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            // ajax 获取 OST CS1 EST
                                                                                            let BAIBOST, BAIBCS1,
                                                                                                BAIBEST;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BAIBSCategoryVal,
                                                                                                    "type": BAIBSTypeVal,
                                                                                                    "std": BAIBSSTDVal,
                                                                                                    "name": BAIBSNameVal,
                                                                                                    "thk": BAIBTHKSN,
                                                                                                    "temp": BAIBDT,
                                                                                                    "highLow": 3,
                                                                                                    "isTube": 0,
                                                                                                    "od": 100000
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BAIBOST = parseFloat(result.ot);
                                                                                                    if (BAIBOST < 0) {
                                                                                                        south.html("查询第二层中间联杆材料设计温度许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BAIBCS1 = parseFloat(result.c1);
                                                                                                    if (BAIBCS1 < 0) {
                                                                                                        south.html("查询第二层中间联杆材料厚度负偏差失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BAIBEST = 1000 * parseFloat(result.et);
                                                                                                    if (BAIBEST < 0) {
                                                                                                        south.html("查询第二层中间联杆材料弹性模量失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }

                                                                                                    // BSN
                                                                                                    let BAIBBSN;
                                                                                                    if (!jQuery.isEmptyObject(rows[39][columns[0][1].field])
                                                                                                        && parseFloat(rows[39][columns[0][1].field]) > 2 * BAIBCS2) {
                                                                                                        BAIBBSN = parseFloat(rows[39][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[39][columns[0][1].field])
                                                                                                        && parseFloat(rows[39][columns[0][1].field]) <= 2 * BAIBCS2) {
                                                                                                        south.html("第二层中间联杆高度 Bsn 不能小于等于 " + (2 * BAIBCS2).toFixed(2) + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN, BAIBBSN);
                                                                                                        baibSketch.off("resize").on("resize", function () {
                                                                                                            if ($("#baib").length > 0) {
                                                                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN, BAIBBSN);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    baibd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN, BAIBBSN);
                                                                                                                baibSketch.off("resize").on("resize", function () {
                                                                                                                    if ($("#baib").length > 0) {
                                                                                                                        baib2d(BAIBLP, BAIBBH, 0.45 * BAIBBH, 0.3 * BAIBBH, 0.25 * BAIBBH, BAIBTHKTE, BAIBTHK0N, BAIBB0N, BAIBTHKFN, BAIBBFN, BAIBTHKSN, BAIBBSN);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // LS
                                                                                                    let BAIBLS;
                                                                                                    if (!jQuery.isEmptyObject(rows[40][columns[0][1].field])) {
                                                                                                        BAIBLS = parseFloat(rows[40][columns[0][1].field]);
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 第三段壁板材料名称
                                                                                                    if (!jQuery.isEmptyObject(rows[44][columns[0][1].field])) {
                                                                                                        BAIB3NameVal = rows[44][columns[0][1].field];
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // AJAX 获取材料密度、最大最小厚度
                                                                                                    let BAIBD3,
                                                                                                        BAIB3ThkMin,
                                                                                                        BAIB3ThkMax;
                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "category": BAIB3CategoryVal,
                                                                                                            "type": BAIB3TypeVal,
                                                                                                            "std": BAIB3STDVal,
                                                                                                            "name": BAIB3NameVal,
                                                                                                            "temp": BAIBDT
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            BAIBD3 = parseFloat(result.density);
                                                                                                            BAIB3ThkMin = parseFloat(result.thkMin);
                                                                                                            BAIB3ThkMax = parseFloat(result.thkMax);

                                                                                                            // 第三层壁板腐蚀裕量 C32
                                                                                                            let BAIBC32;
                                                                                                            if (!jQuery.isEmptyObject(rows[45][columns[0][1].field])
                                                                                                                && parseFloat(rows[45][columns[0][1].field]) < BAIB3ThkMax) {
                                                                                                                BAIBC32 = parseFloat(rows[45][columns[0][1].field]);
                                                                                                            }
                                                                                                            else if (!jQuery.isEmptyObject(rows[45][columns[0][1].field])
                                                                                                                && parseFloat(rows[45][columns[0][1].field]) >= BAIB3ThkMax) {
                                                                                                                south.html("第三段壁板腐蚀裕量不能大于等于 " + BAIB3ThkMax + " mm").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            else {
                                                                                                                return false;
                                                                                                            }

                                                                                                            // 第三段壁板名义厚度
                                                                                                            let BAIBTHK3N;
                                                                                                            if (!jQuery.isEmptyObject(rows[46][columns[0][1].field])
                                                                                                                && parseFloat(rows[46][columns[0][1].field]) > Math.max(BAIBC32, BAIB3ThkMin)
                                                                                                                && parseFloat(rows[46][columns[0][1].field]) <= BAIB3ThkMax) {
                                                                                                                BAIBTHK3N = parseFloat(rows[46][columns[0][1].field]);
                                                                                                            }
                                                                                                            else if (!jQuery.isEmptyObject(rows[46][columns[0][1].field])
                                                                                                                && parseFloat(rows[46][columns[0][1].field]) <= Math.max(BAIBC32, BAIB3ThkMin)) {
                                                                                                                south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAIBC32, BAIB3ThkMin) + " mm").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            else if (!jQuery.isEmptyObject(rows[46][columns[0][1].field])
                                                                                                                && parseFloat(rows[46][columns[0][1].field]) > BAIB3ThkMax) {
                                                                                                                south.html("第三段壁板名义厚度不能大于 " + BAIB3ThkMax + " mm").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            else {
                                                                                                                return false;
                                                                                                            }

                                                                                                            // ajax 获取 O3T C31 E3T
                                                                                                            let BAIBO3T,
                                                                                                                BAIBC31,
                                                                                                                BAIBE3T;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "category": BAIB3CategoryVal,
                                                                                                                    "type": BAIB3TypeVal,
                                                                                                                    "std": BAIB3STDVal,
                                                                                                                    "name": BAIB3NameVal,
                                                                                                                    "thk": BAIBTHK3N,
                                                                                                                    "temp": BAIBDT,
                                                                                                                    "highLow": 3,
                                                                                                                    "isTube": 0,
                                                                                                                    "od": 100000
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    BAIBO3T = parseFloat(result.ot);
                                                                                                                    if (BAIBO3T < 0) {
                                                                                                                        south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }
                                                                                                                    BAIBC31 = parseFloat(result.c1);
                                                                                                                    if (BAIBC31 < 0) {
                                                                                                                        south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }
                                                                                                                    BAIBE3T = 1000 * parseFloat(result.et);
                                                                                                                    if (BAIBE3T < 0) {
                                                                                                                        south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    // 过程参数
                                                                                                                    let BAIBG = 9.81;
                                                                                                                    let BAIBPC = BAIBD * BAIBG * BAIBBH / 1000000000;
                                                                                                                    let BAIBB0E = BAIBB0N - BAIBC02;
                                                                                                                    let BAIBC0 = BAIBC01 + 2 * BAIBC02;
                                                                                                                    let BAIBTHK0E = BAIBTHK0N - BAIBC0;

                                                                                                                    let BAIBC1 = BAIBC11 + BAIBC12;
                                                                                                                    let BAIBTHK1E = BAIBTHK1N - BAIBC1;
                                                                                                                    let BAIBBH1 = 0.45 * BAIBBH;
                                                                                                                    let BAIBBH1LP = BAIBBH1 / BAIBLP;
                                                                                                                    let BAIBSH1 = BAIBBH1;
                                                                                                                    let BAIBPC1 = BAIBD * BAIBG * BAIBSH1 / 1000000000;

                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "ba": BAIBBH1LP
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            let BAIBALPHA1 = parseFloat(result.alpha);
                                                                                                                            let BAIBBETA1 = parseFloat(result.beta);

                                                                                                                            let BAIBCF = BAIBCF1 + 2 * BAIBCF2;
                                                                                                                            let BAIBBFE = BAIBBFN - 2 * BAIBCF2;
                                                                                                                            let BAIBTHKFE = BAIBTHKFN - BAIBCF;

                                                                                                                            let BAIBC2 = BAIBC21 + BAIBC22;
                                                                                                                            let BAIBTHK2E = BAIBTHK2N - BAIBC2;
                                                                                                                            let BAIBBH2 = 0.30 * BAIBBH;
                                                                                                                            let BAIBBH2LP = BAIBBH2 / BAIBLP;
                                                                                                                            let BAIBSH2 = BAIBBH1 + BAIBBH2;
                                                                                                                            let BAIBPC2 = BAIBD * BAIBG * BAIBSH2 / 1000000000;

                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "ba": BAIBBH2LP
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    let BAIBALPHA2 = parseFloat(result.alpha);
                                                                                                                                    let BAIBBETA2 = parseFloat(result.beta);

                                                                                                                                    let BAIBCS = BAIBCS1 + 2 * BAIBCS2;
                                                                                                                                    let BAIBBSE = BAIBBSN - 2 * BAIBCS2;
                                                                                                                                    let BAIBTHKSE = BAIBTHKSN - BAIBCS;

                                                                                                                                    let BAIBC3 = BAIBC31 + BAIBC32;
                                                                                                                                    let BAIBTHK3E = BAIBTHK3N - BAIBC3;
                                                                                                                                    let BAIBBH3 = 0.25 * BAIBBH;
                                                                                                                                    let BAIBBH3LP = BAIBBH3 / BAIBLP;
                                                                                                                                    let BAIBSH3 = BAIBBH1 + BAIBBH2 + BAIBBH3;
                                                                                                                                    let BAIBPC3 = BAIBD * BAIBG * BAIBSH3 / 1000000000;

                                                                                                                                    $.ajax({
                                                                                                                                        type: "POST",
                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                        async: true,
                                                                                                                                        dataType: "json",
                                                                                                                                        data: JSON.stringify({
                                                                                                                                            "ba": BAIBBH3LP
                                                                                                                                        }),
                                                                                                                                        beforeSend: function () {
                                                                                                                                        },
                                                                                                                                        success: function (result) {

                                                                                                                                            let BAIBALPHA3 = parseFloat(result.alpha);
                                                                                                                                            let BAIBBETA3 = parseFloat(result.beta);

                                                                                                                                            // 顶部联杆计算及校核
                                                                                                                                            let BAIBK = BAIBTHKTE + BAIBB0E;
                                                                                                                                            let BAIBB = 20 * BAIBTHKTE - BAIBTHK0E;
                                                                                                                                            let BAIBE1 = (BAIBTHK0E * BAIBK * BAIBK + BAIBB * BAIBTHKTE * BAIBTHKTE) / (2 * (BAIBTHK0E * BAIBK + BAIBB * BAIBTHKTE));
                                                                                                                                            let BAIBE2 = BAIBK - BAIBE1;
                                                                                                                                            let BAIBIX = (20 * BAIBTHKTE * Math.pow(BAIBE1, 3) - BAIBB * Math.pow(BAIBE1 - BAIBTHKTE, 3) + BAIBTHK0E * Math.pow(BAIBE2, 3)) / 3;
                                                                                                                                            let BAIBZX = BAIBIX / Math.max(BAIBE1, BAIBE2);
                                                                                                                                            let BAIBOTW0 = 9.6 * BAIBE0T * BAIBIX / (BAIBL0 * BAIBL0 * (BAIBTHK0E * BAIBB0E + BAIBTHKTE * BAIBLP));
                                                                                                                                            let BAIBONW0 = 9.62 * BAIBL0 * BAIBL0 * (BAIBTHK0E * BAIBB0E + BAIBTHKTE * BAIBLP) / BAIBZX / 1000000;
                                                                                                                                            let BAIBOTP0 = 0.034 * BAIBPC * BAIBBH * BAIBLP / (BAIBTHK0E * BAIBB0E + BAIBTHKTE * BAIBLP);
                                                                                                                                            let BAIBORMAX0 = BAIBOTW0 + BAIBONW0 + BAIBOTP0;
                                                                                                                                            let BAIBORMAX0CHK;
                                                                                                                                            south.html(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "顶部联杆许用应力：" + BAIBO0T.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                            if (BAIBORMAX0 <= BAIBO0T) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际应力：" + BAIBORMAX0.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBORMAX0CHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际应力：" + BAIBORMAX0.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBORMAX0CHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // 第一段加固柱校核
                                                                                                                                            let BAIBZP1 = BAIBLP * (0.0054 * BAIBPC * BAIBBH * BAIBBH / BAIBO1T - BAIBTHK1E * BAIBTHK1E / 6);

                                                                                                                                            // 第一段壁板
                                                                                                                                            let BAIBTHK1C = BAIBLP * Math.sqrt(3 * BAIBALPHA1 * BAIBPC1 / BAIBO1T);
                                                                                                                                            let BAIBTHK1D = BAIBTHK1C + BAIBC12;
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "第一段壁板所需厚度：" + (BAIBTHK1D + BAIBC11).toFixed(2) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                            let BAIBTHK1CHK;
                                                                                                                                            if (BAIBTHK1N >= (BAIBTHK1D + BAIBC11)) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "输入厚度：" + BAIBTHK1N + " mm" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBTHK1CHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "输入厚度：" + BAIBTHK1N + " mm" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBTHK1CHK = "不合格";
                                                                                                                                            }
                                                                                                                                            let BAIBF1ALLOW = 5 * (BAIBTHK1E / 2 + Math.sqrt(BAIBBH1LP) * BAIBLP / 500);
                                                                                                                                            let BAIBF1MAX = BAIBBETA1 * Math.pow(BAIBLP, 4) * BAIBPC1 / (2 * BAIBE1T * Math.pow(BAIBTHK1E, 3));
                                                                                                                                            let BAIBF1CHK;
                                                                                                                                            if (BAIBF1MAX <= BAIBF1ALLOW) {
                                                                                                                                                BAIBF1CHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                BAIBF1CHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // 第二段加固柱校核
                                                                                                                                            let BAIBZP2 = BAIBLP * (0.0054 * BAIBPC * BAIBBH * BAIBBH / BAIBO2T - BAIBTHK2E * BAIBTHK2E / 6);

                                                                                                                                            // 第一层中间联杆计算及校核
                                                                                                                                            let BAIBOTWF = 0.8 * BAIBEFT * BAIBBFE * BAIBBFE / (BAIBLF * BAIBLF);
                                                                                                                                            let BAIBONWF = 0.75 * BAIBDF * BAIBG * BAIBLF * BAIBLF / BAIBBFE / 1000000000;
                                                                                                                                            let BAIBOTPF = 0.15 * BAIBPC * BAIBBH * BAIBLP / (BAIBTHKFE * BAIBBFE);
                                                                                                                                            let BAIBORMAXF = BAIBOTWF + BAIBONWF + BAIBOTPF;
                                                                                                                                            let BAIBORMAXFCHK;
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "第一层中间联杆许用应力：" + BAIBOFT.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                            if (BAIBORMAXF <= BAIBOFT) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际应力：" + BAIBORMAXF.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBORMAXFCHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际应力：" + BAIBORMAXF.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBORMAXFCHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // 第二段壁板
                                                                                                                                            let BAIBTHK2C = BAIBLP * Math.sqrt(6 * BAIBALPHA2 * (BAIBPC1 + BAIBPC2) / BAIBO2T);
                                                                                                                                            let BAIBTHK2D = BAIBTHK2C + BAIBC22;
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "第二段壁板所需厚度：" + (BAIBTHK2D + BAIBC21).toFixed(2) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                            let BAIBTHK2CHK;
                                                                                                                                            if (BAIBTHK2N >= (BAIBTHK2D + BAIBC21)) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "输入厚度：" + BAIBTHK2N + " mm" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBTHK2CHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "输入厚度：" + BAIBTHK2N + " mm" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBTHK2CHK = "不合格";
                                                                                                                                            }
                                                                                                                                            let BAIBF2ALLOW = 5 * (BAIBTHK2E / 2 + Math.sqrt(BAIBBH2LP) * BAIBLP / 500);
                                                                                                                                            let BAIBF2MAX = BAIBBETA2 * Math.pow(BAIBLP, 4) * (BAIBPC1 + BAIBPC2) / (2 * BAIBE2T * Math.pow(BAIBTHK2E, 3));
                                                                                                                                            let BAIBF2CHK;
                                                                                                                                            if (BAIBF2MAX <= BAIBF2ALLOW) {
                                                                                                                                                BAIBF2CHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                BAIBF2CHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // 第三段加固柱校核
                                                                                                                                            let BAIBZP3 = BAIBLP * (0.0054 * BAIBPC * BAIBBH * BAIBBH / BAIBO3T - BAIBTHK3E * BAIBTHK3E / 6);

                                                                                                                                            // 第二层中间联杆计算及校核
                                                                                                                                            let BAIBOTWS = 0.8 * BAIBEST * BAIBBSE * BAIBBSE / (BAIBLS * BAIBLS);
                                                                                                                                            let BAIBONWS = 0.75 * BAIBDS * BAIBG * BAIBLS * BAIBLS / BAIBBSE / 1000000000;
                                                                                                                                            let BAIBOTPS = 0.202 * BAIBPC * BAIBBH * BAIBLP / (BAIBTHKSE * BAIBBSE);
                                                                                                                                            let BAIBORMAXS = BAIBOTWS + BAIBONWS + BAIBOTPS;
                                                                                                                                            let BAIBORMAXSCHK;
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "第二层中间联杆许用应力：" + BAIBOST.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                            if (BAIBORMAXS <= BAIBOST) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际应力：" + BAIBORMAXS.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBORMAXSCHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际应力：" + BAIBORMAXS.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBORMAXSCHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // 第三段壁板
                                                                                                                                            let BAIBTHK3C = BAIBLP * Math.sqrt(6 * BAIBALPHA3 * (BAIBPC2 + BAIBPC3) / BAIBO3T);
                                                                                                                                            let BAIBTHK3D = BAIBTHK3C + BAIBC32;
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "第三段壁板所需厚度：" + (BAIBTHK3D + BAIBC31).toFixed(2) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                            let BAIBTHK3CHK;
                                                                                                                                            if (BAIBTHK3N >= (BAIBTHK3D + BAIBC31)) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "输入厚度：" + BAIBTHK3N + " mm" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBTHK3CHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "输入厚度：" + BAIBTHK3N + " mm" +
                                                                                                                                                    "</span>");
                                                                                                                                                BAIBTHK3CHK = "不合格";
                                                                                                                                            }
                                                                                                                                            let BAIBF3ALLOW = 5 * (BAIBTHK3E / 2 + Math.sqrt(BAIBBH3LP) * BAIBLP / 500);
                                                                                                                                            let BAIBF3MAX = BAIBBETA3 * Math.pow(BAIBLP, 4) * (BAIBPC2 + BAIBPC3) / (2 * BAIBE3T * Math.pow(BAIBTHK3E, 3));
                                                                                                                                            let BAIBF3CHK;
                                                                                                                                            if (BAIBF3MAX <= BAIBF3ALLOW) {
                                                                                                                                                BAIBF3CHK = "合格";
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                BAIBF3CHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // 加固柱结果汇总
                                                                                                                                            let BAIBZP = Math.max(BAIBZP1, BAIBZP2, BAIBZP3);
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "垂直加固柱所需截面系数：" + BAIBZP.toFixed(2) + " mm³" +
                                                                                                                                                "</span>");

                                                                                                                                            // docx
                                                                                                                                            let BAIBPayJS = $('#payjs');

                                                                                                                                            function getDocx() {
                                                                                                                                                $.ajax({
                                                                                                                                                    type: "POST",
                                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                                    url: "baibdocx.action",
                                                                                                                                                    async: true,
                                                                                                                                                    dataType: "json",
                                                                                                                                                    data: JSON.stringify({
                                                                                                                                                        ribbonName: "BAIB",

                                                                                                                                                        t: BAIBDT,
                                                                                                                                                        d: BAIBD,
                                                                                                                                                        lp: BAIBLP,
                                                                                                                                                        bh: BAIBBH,
                                                                                                                                                        thkte: BAIBTHKTE,

                                                                                                                                                        std0: BAIB0STDVal,
                                                                                                                                                        name0: BAIB0NameVal,
                                                                                                                                                        c02: BAIBC02,
                                                                                                                                                        b0n: BAIBB0N,
                                                                                                                                                        thk0n: BAIBTHK0N,
                                                                                                                                                        l0: BAIBL0,

                                                                                                                                                        std1: BAIB1STDVal,
                                                                                                                                                        name1: BAIB1NameVal,
                                                                                                                                                        c12: BAIBC12,
                                                                                                                                                        thk1n: BAIBTHK1N,

                                                                                                                                                        stdf: BAIBFSTDVal,
                                                                                                                                                        namef: BAIBFNameVal,
                                                                                                                                                        cf2: BAIBCF2,
                                                                                                                                                        bfn: BAIBBFN,
                                                                                                                                                        thkfn: BAIBTHKFN,
                                                                                                                                                        lf: BAIBLF,

                                                                                                                                                        std2: BAIB2STDVal,
                                                                                                                                                        name2: BAIB2NameVal,
                                                                                                                                                        c22: BAIBC22,
                                                                                                                                                        thk2n: BAIBTHK2N,

                                                                                                                                                        stds: BAIBSSTDVal,
                                                                                                                                                        names: BAIBSNameVal,
                                                                                                                                                        cs2: BAIBCS2,
                                                                                                                                                        bsn: BAIBBSN,
                                                                                                                                                        thksn: BAIBTHKSN,
                                                                                                                                                        ls: BAIBLS,

                                                                                                                                                        std3: BAIB3STDVal,
                                                                                                                                                        name3: BAIB3NameVal,
                                                                                                                                                        c32: BAIBC32,
                                                                                                                                                        thk3n: BAIBTHK3N,

                                                                                                                                                        d0: BAIBD0.toFixed(4),
                                                                                                                                                        c01: BAIBC01.toFixed(4),
                                                                                                                                                        o0t: BAIBO0T.toFixed(4),
                                                                                                                                                        e0t: (BAIBE0T / 1000).toFixed(4),

                                                                                                                                                        d1: BAIBD1.toFixed(4),
                                                                                                                                                        c11: BAIBC11.toFixed(4),
                                                                                                                                                        o1t: BAIBO1T.toFixed(4),
                                                                                                                                                        e1t: (BAIBE1T / 1000).toFixed(4),

                                                                                                                                                        d2: BAIBD2.toFixed(4),
                                                                                                                                                        c21: BAIBC21.toFixed(4),
                                                                                                                                                        o2t: BAIBO2T.toFixed(4),
                                                                                                                                                        e2t: (BAIBE2T / 1000).toFixed(4),

                                                                                                                                                        df: BAIBDF.toFixed(4),
                                                                                                                                                        cf1: BAIBCF1.toFixed(4),
                                                                                                                                                        oft: BAIBOFT.toFixed(4),
                                                                                                                                                        eft: (BAIBEFT / 1000).toFixed(4),

                                                                                                                                                        d3: BAIBD3.toFixed(4),
                                                                                                                                                        c31: BAIBC31.toFixed(4),
                                                                                                                                                        o3t: BAIBO3T.toFixed(4),
                                                                                                                                                        e3t: (BAIBE3T / 1000).toFixed(4),

                                                                                                                                                        ds: BAIBDS.toFixed(4),
                                                                                                                                                        cs1: BAIBCS1.toFixed(4),
                                                                                                                                                        ost: BAIBOST.toFixed(4),
                                                                                                                                                        est: (BAIBEST / 1000).toFixed(4),

                                                                                                                                                        g: BAIBG.toFixed(4),
                                                                                                                                                        pc: BAIBPC.toFixed(4),

                                                                                                                                                        b0e: BAIBB0E.toFixed(4),
                                                                                                                                                        c0: BAIBC0.toFixed(4),
                                                                                                                                                        thk0e: BAIBTHK0E.toFixed(4),

                                                                                                                                                        c1: BAIBC1.toFixed(4),
                                                                                                                                                        thk1e: BAIBTHK1E.toFixed(4),
                                                                                                                                                        bh1: BAIBBH1.toFixed(4),
                                                                                                                                                        bh1lp: BAIBBH1LP.toFixed(4),
                                                                                                                                                        alpha1: BAIBALPHA1.toFixed(6),
                                                                                                                                                        beta1: BAIBBETA1.toFixed(6),
                                                                                                                                                        sh1: BAIBSH1.toFixed(4),
                                                                                                                                                        pc1: BAIBPC1.toFixed(4),

                                                                                                                                                        cf: BAIBCF.toFixed(4),
                                                                                                                                                        bfe: BAIBBFE.toFixed(4),
                                                                                                                                                        thkfe: BAIBTHKFE.toFixed(4),

                                                                                                                                                        c2: BAIBC2.toFixed(4),
                                                                                                                                                        thk2e: BAIBTHK2E.toFixed(4),
                                                                                                                                                        bh2: BAIBBH2.toFixed(4),
                                                                                                                                                        bh2lp: BAIBBH2LP.toFixed(4),
                                                                                                                                                        alpha2: BAIBALPHA2.toFixed(6),
                                                                                                                                                        beta2: BAIBBETA2.toFixed(6),
                                                                                                                                                        sh2: BAIBSH2.toFixed(4),
                                                                                                                                                        pc2: BAIBPC2.toFixed(4),

                                                                                                                                                        cs: BAIBCS.toFixed(4),
                                                                                                                                                        bse: BAIBBSE.toFixed(4),
                                                                                                                                                        thkse: BAIBTHKSE.toFixed(4),

                                                                                                                                                        c3: BAIBC3.toFixed(4),
                                                                                                                                                        thk3e: BAIBTHK3E.toFixed(4),
                                                                                                                                                        bh3: BAIBBH3.toFixed(4),
                                                                                                                                                        bh3lp: BAIBBH3LP.toFixed(4),
                                                                                                                                                        alpha3: BAIBALPHA3.toFixed(6),
                                                                                                                                                        beta3: BAIBBETA3.toFixed(6),
                                                                                                                                                        sh3: BAIBSH3.toFixed(4),
                                                                                                                                                        pc3: BAIBPC3.toFixed(4),

                                                                                                                                                        k: BAIBK.toFixed(4),
                                                                                                                                                        b: BAIBB.toFixed(4),
                                                                                                                                                        e1: BAIBE1.toFixed(4),
                                                                                                                                                        e2: BAIBE2.toFixed(4),
                                                                                                                                                        ix: BAIBIX.toFixed(4),
                                                                                                                                                        zx: BAIBZX.toFixed(4),
                                                                                                                                                        otw0: BAIBOTW0.toFixed(4),
                                                                                                                                                        onw0: BAIBONW0.toFixed(4),
                                                                                                                                                        otp0: BAIBOTP0.toFixed(4),
                                                                                                                                                        ormax0: BAIBORMAX0.toFixed(4),
                                                                                                                                                        ormax0chk: BAIBORMAX0CHK,

                                                                                                                                                        zp1: BAIBZP1.toFixed(4),

                                                                                                                                                        thk1c: BAIBTHK1C.toFixed(4),
                                                                                                                                                        thk1d: BAIBTHK1D.toFixed(4),
                                                                                                                                                        thk1chk: BAIBTHK1CHK,
                                                                                                                                                        f1allow: BAIBF1ALLOW.toFixed(4),
                                                                                                                                                        f1max: BAIBF1MAX.toFixed(4),
                                                                                                                                                        f1maxchk: BAIBF1CHK,

                                                                                                                                                        zp2: BAIBZP2.toFixed(4),

                                                                                                                                                        otwf: BAIBOTWF.toFixed(4),
                                                                                                                                                        onwf: BAIBONWF.toFixed(4),
                                                                                                                                                        otpf: BAIBOTPF.toFixed(4),
                                                                                                                                                        ormaxf: BAIBORMAXF.toFixed(4),
                                                                                                                                                        ormaxfchk: BAIBORMAXFCHK,

                                                                                                                                                        thk2c: BAIBTHK2C.toFixed(4),
                                                                                                                                                        thk2d: BAIBTHK2D.toFixed(4),
                                                                                                                                                        thk2chk: BAIBTHK2CHK,
                                                                                                                                                        f2allow: BAIBF2ALLOW.toFixed(4),
                                                                                                                                                        f2max: BAIBF2MAX.toFixed(4),
                                                                                                                                                        f2maxchk: BAIBF2CHK,

                                                                                                                                                        zp3: BAIBZP3.toFixed(4),

                                                                                                                                                        otws: BAIBOTWS.toFixed(4),
                                                                                                                                                        onws: BAIBONWS.toFixed(4),
                                                                                                                                                        otps: BAIBOTPS.toFixed(4),
                                                                                                                                                        ormaxs: BAIBORMAXS.toFixed(4),
                                                                                                                                                        ormaxschk: BAIBORMAXSCHK,

                                                                                                                                                        thk3c: BAIBTHK3C.toFixed(4),
                                                                                                                                                        thk3d: BAIBTHK3D.toFixed(4),
                                                                                                                                                        thk3chk: BAIBTHK3CHK,
                                                                                                                                                        f3allow: BAIBF3ALLOW.toFixed(4),
                                                                                                                                                        f3max: BAIBF3MAX.toFixed(4),
                                                                                                                                                        f3maxchk: BAIBF3CHK,

                                                                                                                                                        zp: BAIBZP.toFixed(4)
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
                                                                                                                                                            BAIBPayJS.dialog({
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
                                                                                                                                                                        BAIBPayJS.dialog("close");
                                                                                                                                                                        BAIBPayJS.dialog("clear");
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
                                                                                                                                                                                    BAIBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                            BAIBPayJS.dialog('close');
                                                                                                                                                                                            BAIBPayJS.dialog('clear');
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