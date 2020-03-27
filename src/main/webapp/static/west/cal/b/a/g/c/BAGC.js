$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bagcSketch = $("#d2");
    let bagcModel = $("#d3");
    let bagcd2d3 = $('#d2d3');

    $("#cal").html("<table id='bagc'></table>");
    let pg = $("#bagc");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/a/g/c/BAGC.json", function (result) {

        let BAGCDT;
        let BAGC1Category, BAGC1CategoryVal, BAGC1Type, BAGC1TypeVal, BAGC1STD, BAGC1STDVal, BAGC1Name, BAGC1NameVal,
            BAGC2Category, BAGC2CategoryVal, BAGC2Type, BAGC2TypeVal, BAGC2STD, BAGC2STDVal, BAGC2Name, BAGC2NameVal,
            BAGC3Category, BAGC3CategoryVal, BAGC3Type, BAGC3TypeVal, BAGC3STD, BAGC3STDVal, BAGC3Name, BAGC3NameVal,
            BAGCGCategory, BAGCGCategoryVal, BAGCGType, BAGCGTypeVal, BAGCGSTD, BAGCGSTDVal, BAGCGName, BAGCGNameVal,
            BAGCJCategory, BAGCJCategoryVal, BAGCJType, BAGCJTypeVal, BAGCJSTD, BAGCJSTDVal, BAGCJName, BAGCJNameVal;
        let columns, rows, ed;

        function bagc2d(bh = "H", bh1 = "0.45H", bh2 = "0.30H", bh3 = "0.25H", dgn = "dgn", lg = "Lg") {

            bagcSketch.empty();

            let width = bagcSketch.width();
            let height = bagcSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGC2VG").attr("height", height);

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
            let padding = 30;
            let thk = 6;

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

            // 底板
            svg.append("path").attr("d", line([
                {x: padding + wg - 7 * thk, y: height - padding},
                {x: padding + 3 * wg + 7 * thk, y: height - padding},
                {x: padding + 3 * wg + 7 * thk, y: height - padding + thk},
                {x: padding + wg - 7 * thk, y: height - padding + thk},
                {x: padding + wg - 7 * thk, y: height - padding}
            ])).classed("sketch", true);

            // 壁板
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: height - padding},
                {x: padding + wg - thk, y: padding + hg + thk},
                {x: padding + wg, y: padding + hg + thk},
                {x: padding + wg, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding + hg + thk},
                {x: padding + 3 * wg + thk, y: padding + hg + thk},
                {x: padding + 3 * wg + thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg + thk},
                {x: padding + 3 * wg, y: padding + hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + hg},
                {x: padding + 3 * wg + thk, y: padding + hg}
            ])).classed("sketch", true);

            // 角钢 第一层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + hg},
                {x: padding + wg - thk, y: padding + hg},
                {x: padding + wg - thk, y: padding + hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + hg + thk},
                {x: padding + wg - 6 * thk, y: padding + hg + thk},
                {x: padding + wg - 6 * thk, y: padding + hg}
            ])).classed("sketch", true);

            // 角钢 第一层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + hg},
                {x: padding + 3 * wg + thk, y: padding + hg},
                {x: padding + 3 * wg + thk, y: padding + hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + hg}
            ])).classed("sketch", true);

            // 角钢 第二层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 2.35 * hg},
                {x: padding + wg - thk, y: padding + 2.35 * hg},
                {x: padding + wg - thk, y: padding + 2.35 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.35 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.35 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.35 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.35 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.35 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.35 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.35 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.35 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.35 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.35 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.35 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.35 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.35 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 3.25 * hg},
                {x: padding + wg - thk, y: padding + 3.25 * hg},
                {x: padding + wg - thk, y: padding + 3.25 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.25 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.25 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.25 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.25 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.25 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.25 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.25 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.25 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.25 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.25 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.25 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.25 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.25 * hg}
            ])).classed("sketch", true);

            // BH
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: height - padding},
                    {x: padding + 2.5 * wg - 3, y: height - padding - 15},
                    {x: padding + 2.5 * wg + 3, y: height - padding - 15},
                    {x: padding + 2.5 * wg, y: height - padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + hg},
                    {x: padding + 2.5 * wg + 3, y: padding + hg + 15},
                    {x: padding + 2.5 * wg - 3, y: padding + hg + 15},
                    {x: padding + 2.5 * wg, y: padding + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - 15},
                {x: padding + 2.5 * wg, y: padding + hg + 15}
            ])).attr("id", "BAGCSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGCSketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 2.35 * hg, padding + wg - 6 * thk, padding + hg, bh1, "BAGCSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 3.25 * hg, padding + wg - 6 * thk, padding + 2.35 * hg, bh2, "BAGCSketchBH2");

            // BH3
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3.25 * hg, bh3, "BAGCSketchBH3");

            // 垂直加固柱
            drawLine(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + hg + thk);
            drawLine(padding + 3 * wg + 6 * thk, height - padding, padding + 3 * wg + 6 * thk, padding + hg + thk);

            // 拉杆及其连接件
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 5 * thk, y: padding + hg - 4 * thk},
                    {x: padding + wg - 3 * thk, y: padding + hg - 4 * thk},
                    {x: padding + wg - 3 * thk, y: padding + hg},
                    {x: padding + wg - 5 * thk, y: padding + hg},
                    {x: padding + wg - 5 * thk, y: padding + hg - 4 * thk}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 5 * thk, y: padding + hg - 4 * thk},
                    {x: padding + 3 * wg + 3 * thk, y: padding + hg - 4 * thk},
                    {x: padding + 3 * wg + 3 * thk, y: padding + hg},
                    {x: padding + 3 * wg + 5 * thk, y: padding + hg},
                    {x: padding + 3 * wg + 5 * thk, y: padding + hg - 4 * thk}
                ]));
            drawCenterLine(padding + wg - 4 * thk, padding + hg - 4 * thk - 10, padding + wg - 4 * thk, padding + hg + 10);
            drawCenterLine(padding + 3 * wg + 4 * thk, padding + hg - 4 * thk - 10, padding + 3 * wg + 4 * thk, padding + hg + 10);
            dimTopH(padding + wg - 4 * thk, padding + hg - 4 * thk - 10, padding + 3 * wg + 4 * thk, padding + hg - 4 * thk - 10, lg, "BAGCSketchLG");

            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 3 * thk, y: padding + hg - thk},
                    {x: padding + 3 * wg + 3 * thk, y: padding + hg - thk}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + wg - 3 * thk, y: padding + hg - 3 * thk},
                    {x: padding + 3 * wg + 3 * thk, y: padding + hg - 3 * thk}
                ]));
            drawCenterLine(padding + wg - 5 * thk - 20, padding + hg - 2 * thk, padding + 3 * wg + 5 * thk + 20, padding + hg - 2 * thk);

            // DGN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + hg - 3 * thk},
                    {x: padding + 1.5 * wg - 3, y: padding + hg - 3 * thk - 15},
                    {x: padding + 1.5 * wg + 3, y: padding + hg - 3 * thk - 15},
                    {x: padding + 1.5 * wg, y: padding + hg - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + hg - thk},
                    {x: padding + 1.5 * wg + 3, y: padding + hg - thk + 15},
                    {x: padding + 1.5 * wg - 3, y: padding + hg - thk + 15},
                    {x: padding + 1.5 * wg, y: padding + hg - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg - 3 * thk - 15 - 10},
                {x: padding + 1.5 * wg, y: padding + hg - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg - thk + 15 + 60},
                {x: padding + 1.5 * wg, y: padding + hg - thk + 15}
            ])).attr("id", "BAGCSketchDGN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGCSketchDGN")
                .attr("startOffset", "50%").text(dgn);

            // 紧固件 X
            svg.append("path").attr("d", line([
                {x: padding + wg - 7 * thk, y: padding + hg - 2.5 * thk},
                {x: padding + wg - 6 * thk, y: padding + hg - 1.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 7 * thk, y: padding + hg - 1.5 * thk},
                {x: padding + wg - 6 * thk, y: padding + hg - 2.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 7 * thk, y: padding + hg - 2.5 * thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + hg - 1.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 7 * thk, y: padding + hg - 1.5 * thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + hg - 2.5 * thk}
            ])).classed("sketch", true);

        }

        currentTabIndex = bagcd2d3.tabs('getTabIndex', bagcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bagc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bagc").length > 0) {
                    bagc2d();
                }
            });
        }
        bagcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bagc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bagc").length > 0) {
                            bagc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、有拉杆、垂直加固、二道水平加固圈矩形容器",
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

                if (index === 4) {
                    $(ed.target).combobox("loadData", BAGCJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAGCJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGCJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGCJName);
                }

                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGCGCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGCGType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGCGSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGCGName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGC1Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGC1Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGC1STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGC1Name);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAGC2Category);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAGC2Type);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAGC2STD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAGC2Name);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BAGC3Category);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAGC3Type);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAGC3STD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAGC3Name);
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
                    bagcSketch.empty();

                    // model
                    bagcModel.empty();

                    // sketch
                    currentTabIndex = bagcd2d3.tabs('getTabIndex', bagcd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagc2d();
                        bagcSketch.off("resize").on("resize", function () {
                            if ($("#bagc").length > 0) {
                                bagc2d();
                            }
                        });
                    }
                    bagcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagc2d();
                                bagcSketch.off("resize").on("resize", function () {
                                    if ($("#bagc").length > 0) {
                                        bagc2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    if (index === 0) {

                        BAGCDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAGCJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGCJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGCJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGCJName = null;

                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGCGCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGCGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGCGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGCGName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGC1Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGC1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGC1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGC1Name = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAGC2Category = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGC2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGC2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGC2Name = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BAGC3Category = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGC3Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGC3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGC3Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC1Category = [];
                                BAGC2Category = [];
                                BAGC3Category = [];
                                BAGCJCategory = [];
                                BAGCGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGC1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGC2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGC3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGCJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGCGCategory[index] = {
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

                    if (index === 4) {

                        BAGCJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGCJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGCJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGCJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGCJCategoryVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGCJType = [];
                                $(result).each(function (index, element) {
                                    BAGCJType[index] = {
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
                    if (index === 5) {

                        BAGCJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGCJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGCJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGCJCategoryVal,
                                type: BAGCJTypeVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGCJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGCJSTD[index] = {
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
                    if (index === 6) {

                        BAGCJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGCJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGCJCategoryVal,
                                type: BAGCJTypeVal,
                                std: BAGCJSTDVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGCJName = [];
                                $(result).each(function (index, element) {
                                    BAGCJName[index] = {
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

                    if (index === 8) {

                        BAGCGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGCGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGCGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGCGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGCGCategoryVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGCGType = [];
                                $(result).each(function (index, element) {
                                    BAGCGType[index] = {
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
                    if (index === 9) {

                        BAGCGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGCGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGCGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGCGCategoryVal,
                                type: BAGCGTypeVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGCGSTD = [];
                                $(result).each(function (index, element) {
                                    BAGCGSTD[index] = {
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
                    if (index === 10) {

                        BAGCGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGCGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGCGCategoryVal,
                                type: BAGCGTypeVal,
                                std: BAGCGSTDVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGCGName = [];
                                $(result).each(function (index, element) {
                                    BAGCGName[index] = {
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

                    if (index === 15) {

                        BAGC1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGC1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGC1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGC1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC1CategoryVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC1Type = [];
                                $(result).each(function (index, element) {
                                    BAGC1Type[index] = {
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
                    if (index === 16) {

                        BAGC1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGC1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGC1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC1CategoryVal,
                                type: BAGC1TypeVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC1STD = [];
                                $(result).each(function (index, element) {
                                    BAGC1STD[index] = {
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
                    if (index === 17) {

                        BAGC1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGC1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC1CategoryVal,
                                type: BAGC1TypeVal,
                                std: BAGC1STDVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC1Name = [];
                                $(result).each(function (index, element) {
                                    BAGC1Name[index] = {
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

                    if (index === 21) {

                        BAGC2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGC2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGC2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGC2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC2CategoryVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC2Type = [];
                                $(result).each(function (index, element) {
                                    BAGC2Type[index] = {
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
                    if (index === 22) {

                        BAGC2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGC2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGC2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC2CategoryVal,
                                type: BAGC2TypeVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC2STD = [];
                                $(result).each(function (index, element) {
                                    BAGC2STD[index] = {
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
                    if (index === 23) {

                        BAGC2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGC2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC2CategoryVal,
                                type: BAGC2TypeVal,
                                std: BAGC2STDVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC2Name = [];
                                $(result).each(function (index, element) {
                                    BAGC2Name[index] = {
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

                    if (index === 27) {

                        BAGC3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGC3Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGC3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGC3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC3CategoryVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC3Type = [];
                                $(result).each(function (index, element) {
                                    BAGC3Type[index] = {
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
                    if (index === 28) {

                        BAGC3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGC3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGC3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC3CategoryVal,
                                type: BAGC3TypeVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC3STD = [];
                                $(result).each(function (index, element) {
                                    BAGC3STD[index] = {
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
                    if (index === 29) {

                        BAGC3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGC3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGC3CategoryVal,
                                type: BAGC3TypeVal,
                                std: BAGC3STDVal,
                                temp: BAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGC3Name = [];
                                $(result).each(function (index, element) {
                                    BAGC3Name[index] = {
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
                    let BAGCD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGCD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGCLC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGCLC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGCBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGCLC, 0.1 / 0.45 * BAGCLC, 0.1 / 0.30 * BAGCLC, 0.1 / 0.25 * BAGCLC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGCLC, 5 / 0.45 * BAGCLC, 5 / 0.30 * BAGCLC, 5 / 0.25 * BAGCLC)) {
                        BAGCBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGCLC, 0.1 / 0.45 * BAGCLC, 0.1 / 0.30 * BAGCLC, 0.1 / 0.25 * BAGCLC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGCLC, 0.1 / 0.45 * BAGCLC, 0.1 / 0.30 * BAGCLC, 0.1 / 0.25 * BAGCLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGCLC, 5 / 0.45 * BAGCLC, 5 / 0.30 * BAGCLC, 5 / 0.25 * BAGCLC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGCLC, 5 / 0.45 * BAGCLC, 5 / 0.30 * BAGCLC, 5 / 0.25 * BAGCLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2));
                        bagcSketch.off("resize").on("resize", function () {
                            if ($("#bagc").length > 0) {
                                bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2));
                            }
                        });
                    }
                    bagcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2));
                                bagcSketch.off("resize").on("resize", function () {
                                    if ($("#bagc").length > 0) {
                                        bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAGCJNameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGCEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGCJCategoryVal,
                            "type": BAGCJTypeVal,
                            "std": BAGCJSTDVal,
                            "name": BAGCJNameVal,
                            "temp": BAGCDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGCEJT = 1000 * parseFloat(result.et);
                            if (BAGCEJT < 0) {
                                south.html("查询顶边加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 拉杆材料名称
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                BAGCGNameVal = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGCDG, BAGCGThkMin, BAGCGThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGCGCategoryVal,
                                    "type": BAGCGTypeVal,
                                    "std": BAGCGSTDVal,
                                    "name": BAGCGNameVal,
                                    "temp": BAGCDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGCDG = parseFloat(result.density);
                                    BAGCGThkMin = parseFloat(result.thkMin);
                                    BAGCGThkMax = parseFloat(result.thkMax);

                                    // 拉杆腐蚀裕量 CG2
                                    let BAGCCG2;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) < BAGCGThkMax / 2) {
                                        BAGCCG2 = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) >= BAGCGThkMax / 2) {
                                        south.html("拉杆腐蚀裕量不能大于等于 " + BAGCGThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 拉杆名义直径
                                    let BAGCDGN;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > Math.max(BAGCCG2, BAGCGThkMin)
                                        && parseFloat(rows[13][columns[0][1].field]) <= BAGCGThkMax) {
                                        BAGCDGN = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) <= Math.max(BAGCCG2, BAGCGThkMin)) {
                                        south.html("拉杆直径不能小于等于 " + Math.max(BAGCCG2, BAGCGThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > BAGCGThkMax) {
                                        south.html("拉杆直径不能大于 " + BAGCGThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN);
                                        bagcSketch.off("resize").on("resize", function () {
                                            if ($("#bagc").length > 0) {
                                                bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN);
                                            }
                                        });
                                    }
                                    bagcd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN);
                                                bagcSketch.off("resize").on("resize", function () {
                                                    if ($("#bagc").length > 0) {
                                                        bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 OGT EGT CG1
                                    let BAGCOGT, BAGCEGT, BAGCCG1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGCGCategoryVal,
                                            "type": BAGCGTypeVal,
                                            "std": BAGCGSTDVal,
                                            "name": BAGCGNameVal,
                                            "thk": BAGCDGN,
                                            "temp": BAGCDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGCOGT = parseFloat(result.ot);
                                            if (BAGCOGT < 0) {
                                                south.html("查询拉杆材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGCEGT = 1000 * parseFloat(result.et);
                                            if (BAGCEGT < 0) {
                                                south.html("查询拉杆材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGCCG1 = parseFloat(result.c1);
                                            if (BAGCCG1 < 0) {
                                                south.html("查询拉杆材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 拉杆长度 LG
                                            let BAGCLG;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) > BAGCLC) {
                                                BAGCLG = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) <= BAGCLC) {
                                                south.html("拉杆长度 LG 不能小于等于 " + BAGCLC + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN, BAGCLG);
                                                bagcSketch.off("resize").on("resize", function () {
                                                    if ($("#bagc").length > 0) {
                                                        bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN, BAGCLG);
                                                    }
                                                });
                                            }
                                            bagcd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN, BAGCLG);
                                                        bagcSketch.off("resize").on("resize", function () {
                                                            if ($("#bagc").length > 0) {
                                                                bagc2d(BAGCBH, (0.45 * BAGCBH).toFixed(2), (0.30 * BAGCBH).toFixed(2), (0.25 * BAGCBH).toFixed(2), "Φ" + BAGCDGN, BAGCLG);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 第一段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGC1NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGCD1, BAGC1ThkMin, BAGC1ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGC1CategoryVal,
                                                    "type": BAGC1TypeVal,
                                                    "std": BAGC1STDVal,
                                                    "name": BAGC1NameVal,
                                                    "temp": BAGCDT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGCD1 = parseFloat(result.density);
                                                    BAGC1ThkMin = parseFloat(result.thkMin);
                                                    BAGC1ThkMax = parseFloat(result.thkMax);

                                                    // 第一层壁板腐蚀裕量 C12
                                                    let BAGCC12;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGC1ThkMax) {
                                                        BAGCC12 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGC1ThkMax) {
                                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGC1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第一段壁板名义厚度
                                                    let BAGCTHK1N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGCC12, BAGC1ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGC1ThkMax) {
                                                        BAGCTHK1N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGCC12, BAGC1ThkMin)) {
                                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGCC12, BAGC1ThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGC1ThkMax) {
                                                        south.html("第一段壁板名义厚度不能大于 " + BAGC1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O2T E2T C21
                                                    let BAGCO1T, BAGCE1T, BAGCC11;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGC1CategoryVal,
                                                            "type": BAGC1TypeVal,
                                                            "std": BAGC1STDVal,
                                                            "name": BAGC1NameVal,
                                                            "thk": BAGCTHK1N,
                                                            "temp": BAGCDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGCO1T = parseFloat(result.ot);
                                                            if (BAGCO1T < 0) {
                                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGCE1T = 1000 * parseFloat(result.et);
                                                            if (BAGCE1T < 0) {
                                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGCC11 = parseFloat(result.c1);
                                                            if (BAGCC11 < 0) {
                                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 第二段壁板材料名称
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                BAGC2NameVal = rows[24][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // AJAX 获取材料密度、最大最小厚度
                                                            let BAGCD2, BAGC2ThkMin, BAGC2ThkMax;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAGC2CategoryVal,
                                                                    "type": BAGC2TypeVal,
                                                                    "std": BAGC2STDVal,
                                                                    "name": BAGC2NameVal,
                                                                    "temp": BAGCDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAGCD2 = parseFloat(result.density);
                                                                    BAGC2ThkMin = parseFloat(result.thkMin);
                                                                    BAGC2ThkMax = parseFloat(result.thkMax);

                                                                    // 第二层壁板腐蚀裕量 C22
                                                                    let BAGCC22;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) < BAGC2ThkMax) {
                                                                        BAGCC22 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BAGC2ThkMax) {
                                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGC2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第二段壁板名义厚度
                                                                    let BAGCTHK2N;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.max(BAGCC22, BAGC2ThkMin)
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BAGC2ThkMax) {
                                                                        BAGCTHK2N = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.max(BAGCC22, BAGC2ThkMin)) {
                                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGCC22, BAGC2ThkMin) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BAGC2ThkMax) {
                                                                        south.html("第二段壁板名义厚度不能大于 " + BAGC2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 O2T E2T C21
                                                                    let BAGCO2T, BAGCE2T, BAGCC21;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAGC2CategoryVal,
                                                                            "type": BAGC2TypeVal,
                                                                            "std": BAGC2STDVal,
                                                                            "name": BAGC2NameVal,
                                                                            "thk": BAGCTHK2N,
                                                                            "temp": BAGCDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": 100000
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAGCO2T = parseFloat(result.ot);
                                                                            if (BAGCO2T < 0) {
                                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGCE2T = 1000 * parseFloat(result.et);
                                                                            if (BAGCE2T < 0) {
                                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGCC21 = parseFloat(result.c1);
                                                                            if (BAGCC21 < 0) {
                                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 第三段壁板材料名称
                                                                            if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                                BAGC3NameVal = rows[30][columns[0][1].field];
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                            let BAGCD3, BAGC3ThkMin, BAGC3ThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAGC3CategoryVal,
                                                                                    "type": BAGC3TypeVal,
                                                                                    "std": BAGC3STDVal,
                                                                                    "name": BAGC3NameVal,
                                                                                    "temp": BAGCDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAGCD3 = parseFloat(result.density);
                                                                                    BAGC3ThkMin = parseFloat(result.thkMin);
                                                                                    BAGC3ThkMax = parseFloat(result.thkMax);

                                                                                    // 第三层壁板腐蚀裕量 C32
                                                                                    let BAGCC32;
                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) < BAGC3ThkMax) {
                                                                                        BAGCC32 = parseFloat(rows[31][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= BAGC3ThkMax) {
                                                                                        south.html("第三段壁板腐蚀裕量不能大于等于 " + BAGC3ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // 第三段壁板名义厚度
                                                                                    let BAGCTHK3N;
                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > Math.max(BAGCC32, BAGC3ThkMin)
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= BAGC3ThkMax) {
                                                                                        BAGCTHK3N = parseFloat(rows[32][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= Math.max(BAGCC32, BAGC3ThkMin)) {
                                                                                        south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAGCC32, BAGC3ThkMin) + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > BAGC3ThkMax) {
                                                                                        south.html("第三段壁板名义厚度不能大于 " + BAGC3ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // ajax 获取 O3T E3T C31
                                                                                    let BAGCO3T, BAGCE3T, BAGCC31;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAGC3CategoryVal,
                                                                                            "type": BAGC3TypeVal,
                                                                                            "std": BAGC3STDVal,
                                                                                            "name": BAGC3NameVal,
                                                                                            "thk": BAGCTHK3N,
                                                                                            "temp": BAGCDT,
                                                                                            "highLow": 3,
                                                                                            "isTube": 0,
                                                                                            "od": 100000
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAGCO3T = parseFloat(result.ot);
                                                                                            if (BAGCO3T < 0) {
                                                                                                south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGCE3T = 1000 * parseFloat(result.et);
                                                                                            if (BAGCE3T < 0) {
                                                                                                south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGCC31 = parseFloat(result.c1);
                                                                                            if (BAGCC31 < 0) {
                                                                                                south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 过程参数
                                                                                            let BAGCG = 9.81;
                                                                                            let BAGCPC = BAGCD * BAGCG * BAGCBH / 1000000000;
                                                                                            let BAGCBHLC = BAGCBH / BAGCLC;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "ba": BAGCBHLC
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    let BAGCALPHA = parseFloat(result.alpha);
                                                                                                    let BAGCBETA = parseFloat(result.beta);

                                                                                                    let BAGCCG = BAGCCG1 + 2 * BAGCCG2;
                                                                                                    let BAGCDGE = BAGCDGN - BAGCCG;

                                                                                                    let BAGCBH1 = 0.45 * BAGCBH;
                                                                                                    let BAGCC1 = BAGCC11 + BAGCC12;
                                                                                                    let BAGCTHK1E = BAGCTHK1N - BAGCC1;
                                                                                                    let BAGCBH1LC = BAGCBH1 / BAGCLC;
                                                                                                    let BAGCSH1 = BAGCBH1;
                                                                                                    let BAGCPC1 = BAGCD * BAGCG * BAGCSH1 / 1000000000;

                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "ba": BAGCBH1LC
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            let BAGCALPHA1 = parseFloat(result.alpha);
                                                                                                            let BAGCBETA1 = parseFloat(result.beta);

                                                                                                            let BAGCBH2 = 0.30 * BAGCBH;
                                                                                                            let BAGCC2 = BAGCC21 + BAGCC22;
                                                                                                            let BAGCTHK2E = BAGCTHK2N - BAGCC2;
                                                                                                            let BAGCBH2LC = BAGCBH2 / BAGCLC;
                                                                                                            let BAGCSH2 = BAGCBH1 + BAGCBH2;
                                                                                                            let BAGCPC2 = BAGCD * BAGCG * BAGCSH2 / 1000000000;

                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "ba": BAGCBH2LC
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    let BAGCALPHA2 = parseFloat(result.alpha);
                                                                                                                    let BAGCBETA2 = parseFloat(result.beta);

                                                                                                                    let BAGCBH3 = 0.25 * BAGCBH;
                                                                                                                    let BAGCC3 = BAGCC31 + BAGCC32;
                                                                                                                    let BAGCTHK3E = BAGCTHK3N - BAGCC3;
                                                                                                                    let BAGCBH3LC = BAGCBH3 / BAGCLC;
                                                                                                                    let BAGCSH3 = BAGCBH1 + BAGCBH2 + BAGCBH3;
                                                                                                                    let BAGCPC3 = BAGCD * BAGCG * BAGCSH3 / 1000000000;

                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "ba": BAGCBH3LC
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            let BAGCALPHA3 = parseFloat(result.alpha);
                                                                                                                            let BAGCBETA3 = parseFloat(result.beta);

                                                                                                                            // 拉杆校核
                                                                                                                            let BAGCOMAX = -1,
                                                                                                                                BAGCOMAXCHK = -1,
                                                                                                                                BAGCDGC = -1,
                                                                                                                                BAGCDGD = -1,
                                                                                                                                BAGCDGCHK = -1;
                                                                                                                            if (BAGCLG >= 363 * Math.pow(BAGCDGE, 2 / 3)) {
                                                                                                                                BAGCDGC = 0.553 * BAGCBH * Math.sqrt(BAGCD * BAGCG * BAGCLC / BAGCOGT / 1000000000);
                                                                                                                                BAGCDGD = BAGCDGC + 2 * BAGCCG2;
                                                                                                                                south.html(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "拉杆所需直径：" + (BAGCDGD + BAGCCG1).toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                if (BAGCDGN >= (BAGCDGD + BAGCCG1)) {
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "输入直径：" + BAGCDGN + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    BAGCDGCHK = "合格";
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "输入直径：" + BAGCDGN + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    BAGCDGCHK = "不合格";
                                                                                                                                }
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.html(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "拉杆许用应力：" + BAGCOGT.toFixed(2) + " MPa" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCOMAX = 0.864 * BAGCEGT * BAGCDGE * BAGCDGE / (BAGCLG * BAGCLG)
                                                                                                                                    + BAGCDG * BAGCG * BAGCLG * BAGCLG / BAGCDGE / 1000000000
                                                                                                                                    + 0.306 * BAGCPC * BAGCBH * BAGCLC / (BAGCDGE * BAGCDGE);
                                                                                                                                if (BAGCOMAX <= BAGCOGT) {
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "实际应力：" + BAGCOMAX.toFixed(4) + " MPa" +
                                                                                                                                        "</span>");
                                                                                                                                    BAGCOMAXCHK = "合格";
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "实际应力：" + BAGCOMAX.toFixed(4) + " MPa" +
                                                                                                                                        "</span>");
                                                                                                                                    BAGCOMAXCHK = "不合格";
                                                                                                                                }
                                                                                                                            }

                                                                                                                            // 顶边加固件
                                                                                                                            let BAGCI0 = 0.217 * BAGCPC1 * BAGCSH1 * BAGCLC * BAGCLC * BAGCLC / BAGCEJT;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "顶边加固件所需最小惯性矩：" + BAGCI0.toFixed(2) + " mm⁴" +
                                                                                                                                "</span>");

                                                                                                                            // 第一段加固柱校核
                                                                                                                            let BAGCLMAX1 = 0.408 * BAGCTHK1E * Math.sqrt(BAGCO1T / (BAGCALPHA * BAGCPC));
                                                                                                                            let BAGCZP1 = BAGCLC * (0.0642 * BAGCPC * BAGCBH * BAGCBH / BAGCO1T - BAGCTHK1E * BAGCTHK1E / 6);

                                                                                                                            // 第一段壁板
                                                                                                                            let BAGCTHK1C = BAGCLC * Math.sqrt(3 * BAGCALPHA1 * BAGCPC1 / BAGCO1T);
                                                                                                                            let BAGCTHK1D = BAGCTHK1C + BAGCC12;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第一段壁板所需厚度：" + (BAGCTHK1D + BAGCC11).toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAGCTHK1CHK;
                                                                                                                            if (BAGCTHK1N >= (BAGCTHK1D + BAGCC11)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAGCTHK1N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCTHK1CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAGCTHK1N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCTHK1CHK = "不合格";
                                                                                                                            }

                                                                                                                            let BAGCF1ALLOW = 5 * (BAGCTHK1E / 2 + Math.sqrt(BAGCBH1LC) * BAGCLC / 500);
                                                                                                                            let BAGCF1MAX = BAGCBETA1 * Math.pow(BAGCLC, 4) * BAGCPC1 / (2 * BAGCE1T * Math.pow(BAGCTHK1E, 3));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第一段壁板许用挠度：" + BAGCF1ALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAGCF1CHK;
                                                                                                                            if (BAGCF1MAX <= BAGCF1ALLOW) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAGCF1MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCF1CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAGCF1MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCF1CHK = "不合格";
                                                                                                                            }

                                                                                                                            // 第一道水平加固件
                                                                                                                            let BAGCF1 = BAGCPC2 * (BAGCSH1 + BAGCSH2) / 6;
                                                                                                                            let BAGCI1 = 1.3 * BAGCF1 * BAGCLC * BAGCLC * BAGCLC / BAGCEJT;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第一道水平加固件所需最小惯性矩：" + BAGCI1.toFixed(2) + " mm⁴" +
                                                                                                                                "</span>");

                                                                                                                            // 第二段加固柱校核
                                                                                                                            let BAGCLMAX2 = 0.408 * BAGCTHK2E * Math.sqrt(BAGCO2T / (BAGCALPHA * BAGCPC));
                                                                                                                            let BAGCZP2 = BAGCLC * (0.0642 * BAGCPC * BAGCBH * BAGCBH / BAGCO2T - BAGCTHK2E * BAGCTHK2E / 6);

                                                                                                                            // 第二段壁板
                                                                                                                            let BAGCTHK2C = BAGCLC * Math.sqrt(6 * BAGCALPHA2 * (BAGCPC1 + BAGCPC2) / BAGCO2T);
                                                                                                                            let BAGCTHK2D = BAGCTHK2C + BAGCC22;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第二段壁板所需厚度：" + (BAGCTHK2D + BAGCC21).toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAGCTHK2CHK;
                                                                                                                            if (BAGCTHK2N >= (BAGCTHK2D + BAGCC21)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAGCTHK2N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCTHK2CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAGCTHK2N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCTHK2CHK = "不合格";
                                                                                                                            }

                                                                                                                            let BAGCF2ALLOW = 5 * (BAGCTHK2E / 2 + Math.sqrt(BAGCBH2LC) * BAGCLC / 500);
                                                                                                                            let BAGCF2MAX = BAGCBETA2 * Math.pow(BAGCLC, 4) * (BAGCPC1 + BAGCPC2) / (2 * BAGCE2T * Math.pow(BAGCTHK2E, 3));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第二段壁板许用挠度：" + BAGCF2ALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAGCF2CHK;
                                                                                                                            if (BAGCF2MAX <= BAGCF2ALLOW) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAGCF2MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCF2CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAGCF2MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCF2CHK = "不合格";
                                                                                                                            }

                                                                                                                            // 第二道水平加固件
                                                                                                                            let BAGCF2 = (BAGCPC3 - BAGCPC1) * (BAGCSH1 + BAGCSH2 + BAGCSH3) / 6;
                                                                                                                            let BAGCI2 = 1.3 * BAGCF2 * BAGCLC * BAGCLC * BAGCLC / BAGCEJT;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第二道水平加固件所需最小惯性矩：" + BAGCI2.toFixed(2) + " mm⁴" +
                                                                                                                                "</span>");

                                                                                                                            // 第三段加固柱校核
                                                                                                                            let BAGCLMAX3 = 0.408 * BAGCTHK3E * Math.sqrt(BAGCO3T / (BAGCALPHA * BAGCPC));
                                                                                                                            let BAGCZP3 = BAGCLC * (0.0642 * BAGCPC * BAGCBH * BAGCBH / BAGCO3T - BAGCTHK3E * BAGCTHK3E / 6);

                                                                                                                            // 第三段壁板
                                                                                                                            let BAGCTHK3C = BAGCLC * Math.sqrt(6 * BAGCALPHA3 * (BAGCPC2 + BAGCPC3) / BAGCO3T);
                                                                                                                            let BAGCTHK3D = BAGCTHK3C + BAGCC32;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第三段壁板所需厚度：" + (BAGCTHK3D + BAGCC31).toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAGCTHK3CHK;
                                                                                                                            if (BAGCTHK3N >= (BAGCTHK3D + BAGCC31)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAGCTHK3N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCTHK3CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAGCTHK3N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCTHK3CHK = "不合格";
                                                                                                                            }

                                                                                                                            let BAGCF3ALLOW = 5 * (BAGCTHK3E / 2 + Math.sqrt(BAGCBH3LC) * BAGCLC / 500);
                                                                                                                            let BAGCF3MAX = BAGCBETA3 * Math.pow(BAGCLC, 4) * (BAGCPC2 + BAGCPC3) / (2 * BAGCE3T * Math.pow(BAGCTHK3E, 3));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第三段壁板许用挠度：" + BAGCF3ALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAGCF3CHK;
                                                                                                                            if (BAGCF3MAX <= BAGCF3ALLOW) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAGCF3MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCF3CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAGCF3MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCF3CHK = "不合格";
                                                                                                                            }

                                                                                                                            // 加固柱结果汇总
                                                                                                                            let BAGCLMAX = Math.min(BAGCLMAX1, BAGCLMAX2, BAGCLMAX3);
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "垂直加固柱允许最大间距：" + BAGCLMAX.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAGCLCCHK;
                                                                                                                            if (BAGCLC <= BAGCLMAX) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际输入间距：" + BAGCLC + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCLCCHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际输入间距：" + BAGCLC + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAGCLCCHK = "不合格";
                                                                                                                            }
                                                                                                                            let BAGCZP = Math.max(BAGCZP1, BAGCZP2, BAGCZP3);
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "垂直加固柱所需最小截面系数：" + BAGCZP.toFixed(4) + " mm³" +
                                                                                                                                "</span>");

                                                                                                                            // docx
                                                                                                                            let BAGCPayJS = $('#payjs');

                                                                                                                            function getDocx() {
                                                                                                                                $.ajax({
                                                                                                                                    type: "POST",
                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                    url: "bagcdocx.action",
                                                                                                                                    async: true,
                                                                                                                                    dataType: "json",
                                                                                                                                    data: JSON.stringify({
                                                                                                                                        ribbonName: "BAGC",

                                                                                                                                        t: BAGCDT,
                                                                                                                                        d: BAGCD,
                                                                                                                                        lc: BAGCLC,
                                                                                                                                        bh: BAGCBH,

                                                                                                                                        jstd: BAGCJSTDVal,
                                                                                                                                        jname: BAGCJNameVal,

                                                                                                                                        gstd: BAGCGSTDVal,
                                                                                                                                        gname: BAGCGNameVal,
                                                                                                                                        dgn: BAGCDGN,
                                                                                                                                        lg: BAGCLG,
                                                                                                                                        cg2: BAGCCG2,

                                                                                                                                        std1: BAGC1STDVal,
                                                                                                                                        name1: BAGC1NameVal,
                                                                                                                                        c12: BAGCC12,
                                                                                                                                        thk1n: BAGCTHK1N,

                                                                                                                                        std2: BAGC2STDVal,
                                                                                                                                        name2: BAGC2NameVal,
                                                                                                                                        c22: BAGCC22,
                                                                                                                                        thk2n: BAGCTHK2N,

                                                                                                                                        std3: BAGC3STDVal,
                                                                                                                                        name3: BAGC3NameVal,
                                                                                                                                        c32: BAGCC32,
                                                                                                                                        thk3n: BAGCTHK3N,

                                                                                                                                        d1: BAGCD1.toFixed(4),
                                                                                                                                        c11: BAGCC11.toFixed(4),
                                                                                                                                        o1t: BAGCO1T.toFixed(4),
                                                                                                                                        e1t: (BAGCE1T / 1000).toFixed(4),

                                                                                                                                        d2: BAGCD2.toFixed(4),
                                                                                                                                        c21: BAGCC21.toFixed(4),
                                                                                                                                        o2t: BAGCO2T.toFixed(4),
                                                                                                                                        e2t: (BAGCE2T / 1000).toFixed(4),

                                                                                                                                        d3: BAGCD3.toFixed(4),
                                                                                                                                        c31: BAGCC31.toFixed(4),
                                                                                                                                        o3t: BAGCO3T.toFixed(4),
                                                                                                                                        e3t: (BAGCE3T / 1000).toFixed(4),

                                                                                                                                        dg: BAGCDG.toFixed(4),
                                                                                                                                        cg1: BAGCCG1.toFixed(4),
                                                                                                                                        ogt: BAGCOGT.toFixed(4),
                                                                                                                                        egt: (BAGCEGT / 1000).toFixed(4),

                                                                                                                                        ejt: (BAGCEJT / 1000).toFixed(4),

                                                                                                                                        g: BAGCG.toFixed(4),
                                                                                                                                        pc: BAGCPC.toFixed(4),
                                                                                                                                        bhlc: BAGCBHLC.toFixed(4),
                                                                                                                                        alpha: BAGCALPHA.toFixed(8),
                                                                                                                                        beta: BAGCBETA.toFixed(8),

                                                                                                                                        cg: BAGCCG.toFixed(4),
                                                                                                                                        dge: BAGCDGE.toFixed(4),

                                                                                                                                        bh1: BAGCBH1.toFixed(4),
                                                                                                                                        c1: BAGCC1.toFixed(4),
                                                                                                                                        thk1e: BAGCTHK1E.toFixed(4),
                                                                                                                                        bh1lc: BAGCBH1LC.toFixed(4),
                                                                                                                                        alpha1: BAGCALPHA1.toFixed(8),
                                                                                                                                        beta1: BAGCBETA1.toFixed(8),
                                                                                                                                        sh1: BAGCSH1.toFixed(4),
                                                                                                                                        pc1: BAGCPC1.toFixed(4),

                                                                                                                                        bh2: BAGCBH2.toFixed(4),
                                                                                                                                        c2: BAGCC2.toFixed(4),
                                                                                                                                        thk2e: BAGCTHK2E.toFixed(4),
                                                                                                                                        bh2lc: BAGCBH2LC.toFixed(4),
                                                                                                                                        alpha2: BAGCALPHA2.toFixed(8),
                                                                                                                                        beta2: BAGCBETA2.toFixed(8),
                                                                                                                                        sh2: BAGCSH2.toFixed(4),
                                                                                                                                        pc2: BAGCPC2.toFixed(4),

                                                                                                                                        bh3: BAGCBH3.toFixed(4),
                                                                                                                                        c3: BAGCC3.toFixed(4),
                                                                                                                                        thk3e: BAGCTHK3E.toFixed(4),
                                                                                                                                        bh3lc: BAGCBH3LC.toFixed(4),
                                                                                                                                        alpha3: BAGCALPHA3.toFixed(8),
                                                                                                                                        beta3: BAGCBETA3.toFixed(8),
                                                                                                                                        sh3: BAGCSH3.toFixed(4),
                                                                                                                                        pc3: BAGCPC3.toFixed(4),

                                                                                                                                        dgc: BAGCDGC.toFixed(4),
                                                                                                                                        dgd: BAGCDGD.toFixed(4),
                                                                                                                                        dgchk: BAGCDGCHK,

                                                                                                                                        omax: BAGCOMAX.toFixed(4),
                                                                                                                                        omaxchk: BAGCOMAXCHK,

                                                                                                                                        i0: BAGCI0.toFixed(4),

                                                                                                                                        lmax1: BAGCLMAX1.toFixed(4),
                                                                                                                                        zp1: BAGCZP1.toFixed(4),

                                                                                                                                        thk1c: BAGCTHK1C.toFixed(4),
                                                                                                                                        thk1d: BAGCTHK1D.toFixed(4),
                                                                                                                                        thk1chk: BAGCTHK1CHK,
                                                                                                                                        f1allow: BAGCF1ALLOW.toFixed(4),
                                                                                                                                        f1max: BAGCF1MAX.toFixed(4),
                                                                                                                                        f1chk: BAGCF1CHK,

                                                                                                                                        f1: BAGCF1.toFixed(4),
                                                                                                                                        i1: BAGCI1.toFixed(4),

                                                                                                                                        lmax2: BAGCLMAX2.toFixed(4),
                                                                                                                                        zp2: BAGCZP2.toFixed(4),

                                                                                                                                        thk2c: BAGCTHK2C.toFixed(4),
                                                                                                                                        thk2d: BAGCTHK2D.toFixed(4),
                                                                                                                                        thk2chk: BAGCTHK2CHK,
                                                                                                                                        f2allow: BAGCF2ALLOW.toFixed(4),
                                                                                                                                        f2max: BAGCF2MAX.toFixed(4),
                                                                                                                                        f2chk: BAGCF2CHK,

                                                                                                                                        f2: BAGCF2.toFixed(4),
                                                                                                                                        i2: BAGCI2.toFixed(4),

                                                                                                                                        lmax3: BAGCLMAX3.toFixed(4),
                                                                                                                                        zp3: BAGCZP3.toFixed(4),

                                                                                                                                        thk3c: BAGCTHK3C.toFixed(4),
                                                                                                                                        thk3d: BAGCTHK3D.toFixed(4),
                                                                                                                                        thk3chk: BAGCTHK3CHK,
                                                                                                                                        f3allow: BAGCF3ALLOW.toFixed(4),
                                                                                                                                        f3max: BAGCF3MAX.toFixed(4),
                                                                                                                                        f3chk: BAGCF3CHK,

                                                                                                                                        lmax: BAGCLMAX.toFixed(4),
                                                                                                                                        lcchk: BAGCLCCHK,
                                                                                                                                        zp: BAGCZP.toFixed(4)
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
                                                                                                                                            BAGCPayJS.dialog({
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
                                                                                                                                                        BAGCPayJS.dialog("close");
                                                                                                                                                        BAGCPayJS.dialog("clear");
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
                                                                                                                                                                    BAGCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                            BAGCPayJS.dialog('close');
                                                                                                                                                                            BAGCPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});