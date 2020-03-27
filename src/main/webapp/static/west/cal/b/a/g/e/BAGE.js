$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bageSketch = $("#d2");
    let bageModel = $("#d3");
    let baged2d3 = $('#d2d3');

    $("#cal").html("<table id='bage'></table>");
    let pg = $("#bage");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/a/g/e/BAGE.json", function (result) {

        let BAGEDT;
        let BAGE1Category, BAGE1CategoryVal, BAGE1Type, BAGE1TypeVal, BAGE1STD, BAGE1STDVal, BAGE1Name, BAGE1NameVal,
            BAGE2Category, BAGE2CategoryVal, BAGE2Type, BAGE2TypeVal, BAGE2STD, BAGE2STDVal, BAGE2Name, BAGE2NameVal,
            BAGE3Category, BAGE3CategoryVal, BAGE3Type, BAGE3TypeVal, BAGE3STD, BAGE3STDVal, BAGE3Name, BAGE3NameVal,
            BAGE4Category, BAGE4CategoryVal, BAGE4Type, BAGE4TypeVal, BAGE4STD, BAGE4STDVal, BAGE4Name, BAGE4NameVal,
            BAGEGCategory, BAGEGCategoryVal, BAGEGType, BAGEGTypeVal, BAGEGSTD, BAGEGSTDVal, BAGEGName, BAGEGNameVal,
            BAGEJCategory, BAGEJCategoryVal, BAGEJType, BAGEJTypeVal, BAGEJSTD, BAGEJSTDVal, BAGEJName, BAGEJNameVal;
        let columns, rows, ed;

        function bage2d(bh = "H", bh1 = "0.37H", bh2 = "0.25H", bh3 = "0.21H", bh4 = "0.17H", dgn = "dgn", lg = "Lg") {

            bageSketch.empty();

            let width = bageSketch.width();
            let height = bageSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGE2VG").attr("height", height);

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
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg},
                {x: padding + wg - thk, y: padding + hg}
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
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding + hg},
                {x: padding + 3 * wg + thk, y: padding + hg}
            ])).classed("sketch", true);

            // 角钢 第二层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 2.1 * hg},
                {x: padding + wg - thk, y: padding + 2.1 * hg},
                {x: padding + wg - thk, y: padding + 2.1 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.1 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.1 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.1 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.1 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.1 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.1 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.1 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.1 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.1 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.1 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 2.9 * hg},
                {x: padding + wg - thk, y: padding + 2.9 * hg},
                {x: padding + wg - thk, y: padding + 2.9 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.9 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.9 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.9 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.9 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.9 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.9 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.9 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.9 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.9 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.9 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.9 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.9 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.9 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 3.5 * hg},
                {x: padding + wg - thk, y: padding + 3.5 * hg},
                {x: padding + wg - thk, y: padding + 3.5 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.5 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.5 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.5 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.5 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.5 * hg}
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
            ])).attr("id", "BAGESketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGESketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 2.1 * hg, padding + wg - 6 * thk, padding + hg, bh1, "BAGESketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 2.9 * hg, padding + wg - 6 * thk, padding + 2.1 * hg, bh2, "BAGESketchBH2");

            // BH3
            dimLeftV(padding + wg - 6 * thk, padding + 3.5 * hg, padding + wg - 6 * thk, padding + 2.9 * hg, bh3, "BAGESketchBH3");

            // BH4
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3.5 * hg, bh4, "BAGESketchBH4");

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
            dimTopH(padding + wg - 4 * thk, padding + hg - 4 * thk - 10, padding + 3 * wg + 4 * thk, padding + hg - 4 * thk - 10, lg, "BAGESketchLG");

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
            ])).attr("id", "BAGESketchDGN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGESketchDGN")
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

        currentTabIndex = baged2d3.tabs('getTabIndex', baged2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bage2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bage").length > 0) {
                    bage2d();
                }
            });
        }
        baged2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bage2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bage").length > 0) {
                            bage2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、有拉杆、垂直加固、三道水平加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAGEJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAGEJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGEJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGEJName);
                }

                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGEGCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGEGType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGEGSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGEGName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGE1Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGE1Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGE1STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGE1Name);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAGE2Category);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAGE2Type);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAGE2STD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAGE2Name);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BAGE3Category);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAGE3Type);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAGE3STD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAGE3Name);
                }

                else if (index === 33) {
                    $(ed.target).combobox("loadData", BAGE4Category);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", BAGE4Type);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", BAGE4STD);
                }
                else if (index === 36) {
                    $(ed.target).combobox("loadData", BAGE4Name);
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
                    bageSketch.empty();

                    // model
                    bageModel.empty();

                    // sketch
                    currentTabIndex = baged2d3.tabs('getTabIndex', baged2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bage2d();
                        bageSketch.off("resize").on("resize", function () {
                            if ($("#bage").length > 0) {
                                bage2d();
                            }
                        });
                    }
                    baged2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bage2d();
                                bageSketch.off("resize").on("resize", function () {
                                    if ($("#bage").length > 0) {
                                        bage2d();
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

                        BAGEDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAGEJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGEJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGEJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGEJName = null;

                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGEGCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGEGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGEGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGEGName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGE1Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGE1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGE1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGE1Name = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAGE2Category = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGE2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGE2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGE2Name = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BAGE3Category = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGE3Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGE3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGE3Name = null;

                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        BAGE4Category = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAGE4Type = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGE4STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGE4Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE1Category = [];
                                BAGE2Category = [];
                                BAGE3Category = [];
                                BAGE4Category = [];
                                BAGEJCategory = [];
                                BAGEGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGEDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGE1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGE2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGE3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGE4Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGEJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGEGCategory[index] = {
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

                        BAGEJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGEJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGEJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGEJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGEJCategoryVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGEJType = [];
                                $(result).each(function (index, element) {
                                    BAGEJType[index] = {
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

                        BAGEJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGEJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGEJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGEJCategoryVal,
                                type: BAGEJTypeVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGEJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGEJSTD[index] = {
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

                        BAGEJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGEJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGEJCategoryVal,
                                type: BAGEJTypeVal,
                                std: BAGEJSTDVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGEJName = [];
                                $(result).each(function (index, element) {
                                    BAGEJName[index] = {
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

                        BAGEGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGEGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGEGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGEGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGEGCategoryVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGEGType = [];
                                $(result).each(function (index, element) {
                                    BAGEGType[index] = {
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

                        BAGEGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGEGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGEGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGEGCategoryVal,
                                type: BAGEGTypeVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGEGSTD = [];
                                $(result).each(function (index, element) {
                                    BAGEGSTD[index] = {
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

                        BAGEGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGEGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGEGCategoryVal,
                                type: BAGEGTypeVal,
                                std: BAGEGSTDVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGEGName = [];
                                $(result).each(function (index, element) {
                                    BAGEGName[index] = {
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

                        BAGE1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGE1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGE1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGE1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE1CategoryVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE1Type = [];
                                $(result).each(function (index, element) {
                                    BAGE1Type[index] = {
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

                        BAGE1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGE1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGE1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE1CategoryVal,
                                type: BAGE1TypeVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE1STD = [];
                                $(result).each(function (index, element) {
                                    BAGE1STD[index] = {
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

                        BAGE1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGE1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE1CategoryVal,
                                type: BAGE1TypeVal,
                                std: BAGE1STDVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE1Name = [];
                                $(result).each(function (index, element) {
                                    BAGE1Name[index] = {
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

                        BAGE2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGE2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGE2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGE2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE2CategoryVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE2Type = [];
                                $(result).each(function (index, element) {
                                    BAGE2Type[index] = {
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

                        BAGE2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGE2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGE2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE2CategoryVal,
                                type: BAGE2TypeVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE2STD = [];
                                $(result).each(function (index, element) {
                                    BAGE2STD[index] = {
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

                        BAGE2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGE2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE2CategoryVal,
                                type: BAGE2TypeVal,
                                std: BAGE2STDVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE2Name = [];
                                $(result).each(function (index, element) {
                                    BAGE2Name[index] = {
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

                        BAGE3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGE3Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGE3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGE3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE3CategoryVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE3Type = [];
                                $(result).each(function (index, element) {
                                    BAGE3Type[index] = {
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

                        BAGE3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGE3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGE3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE3CategoryVal,
                                type: BAGE3TypeVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE3STD = [];
                                $(result).each(function (index, element) {
                                    BAGE3STD[index] = {
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

                        BAGE3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGE3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE3CategoryVal,
                                type: BAGE3TypeVal,
                                std: BAGE3STDVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE3Name = [];
                                $(result).each(function (index, element) {
                                    BAGE3Name[index] = {
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

                    if (index === 33) {

                        BAGE4CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAGE4Type = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGE4STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGE4Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE4CategoryVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE4Type = [];
                                $(result).each(function (index, element) {
                                    BAGE4Type[index] = {
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
                    if (index === 34) {

                        BAGE4TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGE4STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGE4Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE4CategoryVal,
                                type: BAGE4TypeVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE4STD = [];
                                $(result).each(function (index, element) {
                                    BAGE4STD[index] = {
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
                    if (index === 35) {

                        BAGE4STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGE4Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGE4CategoryVal,
                                type: BAGE4TypeVal,
                                std: BAGE4STDVal,
                                temp: BAGEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGE4Name = [];
                                $(result).each(function (index, element) {
                                    BAGE4Name[index] = {
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
                    let BAGED;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGED = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGELC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGELC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGEBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGELC, 0.1 / 0.37 * BAGELC, 0.1 / 0.25 * BAGELC, 0.1 / 0.21 * BAGELC, 0.1 / 0.17 * BAGELC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGELC, 5 / 0.37 * BAGELC, 5 / 0.25 * BAGELC, 5 / 0.21 * BAGELC, 5 / 0.17 * BAGELC)) {
                        BAGEBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGELC, 0.1 / 0.37 * BAGELC, 0.1 / 0.25 * BAGELC, 0.1 / 0.21 * BAGELC, 0.1 / 0.17 * BAGELC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGELC, 0.1 / 0.37 * BAGELC, 0.1 / 0.25 * BAGELC, 0.1 / 0.21 * BAGELC, 0.1 / 0.17 * BAGELC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGELC, 5 / 0.37 * BAGELC, 5 / 0.25 * BAGELC, 5 / 0.21 * BAGELC, 5 / 0.17 * BAGELC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGELC, 5 / 0.37 * BAGELC, 5 / 0.25 * BAGELC, 5 / 0.21 * BAGELC, 5 / 0.17 * BAGELC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2));
                        bageSketch.off("resize").on("resize", function () {
                            if ($("#bage").length > 0) {
                                bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2));
                            }
                        });
                    }
                    baged2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2));
                                bageSketch.off("resize").on("resize", function () {
                                    if ($("#bage").length > 0) {
                                        bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAGEJNameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGEEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGEJCategoryVal,
                            "type": BAGEJTypeVal,
                            "std": BAGEJSTDVal,
                            "name": BAGEJNameVal,
                            "temp": BAGEDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGEEJT = 1000 * parseFloat(result.et);
                            if (BAGEEJT < 0) {
                                south.html("查询顶边加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 拉杆材料名称
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                BAGEGNameVal = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGEDG, BAGEGThkMin, BAGEGThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGEGCategoryVal,
                                    "type": BAGEGTypeVal,
                                    "std": BAGEGSTDVal,
                                    "name": BAGEGNameVal,
                                    "temp": BAGEDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGEDG = parseFloat(result.density);
                                    BAGEGThkMin = parseFloat(result.thkMin);
                                    BAGEGThkMax = parseFloat(result.thkMax);

                                    // 拉杆腐蚀裕量 CG2
                                    let BAGECG2;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) < BAGEGThkMax / 2) {
                                        BAGECG2 = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) >= BAGEGThkMax / 2) {
                                        south.html("拉杆腐蚀裕量不能大于等于 " + BAGEGThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 拉杆名义直径
                                    let BAGEDGN;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > Math.max(BAGECG2, BAGEGThkMin)
                                        && parseFloat(rows[13][columns[0][1].field]) <= BAGEGThkMax) {
                                        BAGEDGN = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) <= Math.max(BAGECG2, BAGEGThkMin)) {
                                        south.html("拉杆直径不能小于等于 " + Math.max(BAGECG2, BAGEGThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > BAGEGThkMax) {
                                        south.html("拉杆直径不能大于 " + BAGEGThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN);
                                        bageSketch.off("resize").on("resize", function () {
                                            if ($("#bage").length > 0) {
                                                bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN);
                                            }
                                        });
                                    }
                                    baged2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN);
                                                bageSketch.off("resize").on("resize", function () {
                                                    if ($("#bage").length > 0) {
                                                        bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 OGT EGT CG1
                                    let BAGEOGT, BAGEEGT, BAGECG1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGEGCategoryVal,
                                            "type": BAGEGTypeVal,
                                            "std": BAGEGSTDVal,
                                            "name": BAGEGNameVal,
                                            "thk": BAGEDGN,
                                            "temp": BAGEDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGEOGT = parseFloat(result.ot);
                                            if (BAGEOGT < 0) {
                                                south.html("查询拉杆材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGEEGT = 1000 * parseFloat(result.et);
                                            if (BAGEEGT < 0) {
                                                south.html("查询拉杆材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGECG1 = parseFloat(result.c1);
                                            if (BAGECG1 < 0) {
                                                south.html("查询拉杆材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 拉杆长度 LG
                                            let BAGELG;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) > BAGELC) {
                                                BAGELG = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) <= BAGELC) {
                                                south.html("拉杆长度 LG 不能小于等于 " + BAGELC + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN, BAGELG);
                                                bageSketch.off("resize").on("resize", function () {
                                                    if ($("#bage").length > 0) {
                                                        bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN, BAGELG);
                                                    }
                                                });
                                            }
                                            baged2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN, BAGELG);
                                                        bageSketch.off("resize").on("resize", function () {
                                                            if ($("#bage").length > 0) {
                                                                bage2d(BAGEBH, (0.37 * BAGEBH).toFixed(2), (0.25 * BAGEBH).toFixed(2), (0.21 * BAGEBH).toFixed(2), (0.17 * BAGEBH).toFixed(2), "Φ" + BAGEDGN, BAGELG);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 第一段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGE1NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGED1, BAGE1ThkMin, BAGE1ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGE1CategoryVal,
                                                    "type": BAGE1TypeVal,
                                                    "std": BAGE1STDVal,
                                                    "name": BAGE1NameVal,
                                                    "temp": BAGEDT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGED1 = parseFloat(result.density);
                                                    BAGE1ThkMin = parseFloat(result.thkMin);
                                                    BAGE1ThkMax = parseFloat(result.thkMax);

                                                    // 第一层壁板腐蚀裕量 C12
                                                    let BAGEC12;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGE1ThkMax) {
                                                        BAGEC12 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGE1ThkMax) {
                                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGE1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第一段壁板名义厚度
                                                    let BAGETHK1N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGEC12, BAGE1ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGE1ThkMax) {
                                                        BAGETHK1N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGEC12, BAGE1ThkMin)) {
                                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGEC12, BAGE1ThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGE1ThkMax) {
                                                        south.html("第一段壁板名义厚度不能大于 " + BAGE1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O1T E1T C11
                                                    let BAGEO1T, BAGEE1T, BAGEC11;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGE1CategoryVal,
                                                            "type": BAGE1TypeVal,
                                                            "std": BAGE1STDVal,
                                                            "name": BAGE1NameVal,
                                                            "thk": BAGETHK1N,
                                                            "temp": BAGEDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGEO1T = parseFloat(result.ot);
                                                            if (BAGEO1T < 0) {
                                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGEE1T = 1000 * parseFloat(result.et);
                                                            if (BAGEE1T < 0) {
                                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGEC11 = parseFloat(result.c1);
                                                            if (BAGEC11 < 0) {
                                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 第二段壁板材料名称
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                BAGE2NameVal = rows[24][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // AJAX 获取材料密度、最大最小厚度
                                                            let BAGED2, BAGE2ThkMin, BAGE2ThkMax;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAGE2CategoryVal,
                                                                    "type": BAGE2TypeVal,
                                                                    "std": BAGE2STDVal,
                                                                    "name": BAGE2NameVal,
                                                                    "temp": BAGEDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAGED2 = parseFloat(result.density);
                                                                    BAGE2ThkMin = parseFloat(result.thkMin);
                                                                    BAGE2ThkMax = parseFloat(result.thkMax);

                                                                    // 第二层壁板腐蚀裕量 C22
                                                                    let BAGEC22;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) < BAGE2ThkMax) {
                                                                        BAGEC22 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BAGE2ThkMax) {
                                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGE2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第二段壁板名义厚度
                                                                    let BAGETHK2N;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.max(BAGEC22, BAGE2ThkMin)
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BAGE2ThkMax) {
                                                                        BAGETHK2N = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.max(BAGEC22, BAGE2ThkMin)) {
                                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGEC22, BAGE2ThkMin) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BAGE2ThkMax) {
                                                                        south.html("第二段壁板名义厚度不能大于 " + BAGE2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 O2T E2T C21
                                                                    let BAGEO2T, BAGEE2T, BAGEC21;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAGE2CategoryVal,
                                                                            "type": BAGE2TypeVal,
                                                                            "std": BAGE2STDVal,
                                                                            "name": BAGE2NameVal,
                                                                            "thk": BAGETHK2N,
                                                                            "temp": BAGEDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": 100000
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAGEO2T = parseFloat(result.ot);
                                                                            if (BAGEO2T < 0) {
                                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGEE2T = 1000 * parseFloat(result.et);
                                                                            if (BAGEE2T < 0) {
                                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGEC21 = parseFloat(result.c1);
                                                                            if (BAGEC21 < 0) {
                                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 第三段壁板材料名称
                                                                            if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                                BAGE3NameVal = rows[30][columns[0][1].field];
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                            let BAGED3, BAGE3ThkMin, BAGE3ThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAGE3CategoryVal,
                                                                                    "type": BAGE3TypeVal,
                                                                                    "std": BAGE3STDVal,
                                                                                    "name": BAGE3NameVal,
                                                                                    "temp": BAGEDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAGED3 = parseFloat(result.density);
                                                                                    BAGE3ThkMin = parseFloat(result.thkMin);
                                                                                    BAGE3ThkMax = parseFloat(result.thkMax);

                                                                                    // 第三层壁板腐蚀裕量 C32
                                                                                    let BAGEC32;
                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) < BAGE3ThkMax) {
                                                                                        BAGEC32 = parseFloat(rows[31][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= BAGE3ThkMax) {
                                                                                        south.html("第三段壁板腐蚀裕量不能大于等于 " + BAGE3ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // 第三段壁板名义厚度
                                                                                    let BAGETHK3N;
                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > Math.max(BAGEC32, BAGE3ThkMin)
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= BAGE3ThkMax) {
                                                                                        BAGETHK3N = parseFloat(rows[32][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= Math.max(BAGEC32, BAGE3ThkMin)) {
                                                                                        south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAGEC32, BAGE3ThkMin) + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > BAGE3ThkMax) {
                                                                                        south.html("第三段壁板名义厚度不能大于 " + BAGE3ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // ajax 获取 O3T E3T C31
                                                                                    let BAGEO3T, BAGEE3T, BAGEC31;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAGE3CategoryVal,
                                                                                            "type": BAGE3TypeVal,
                                                                                            "std": BAGE3STDVal,
                                                                                            "name": BAGE3NameVal,
                                                                                            "thk": BAGETHK3N,
                                                                                            "temp": BAGEDT,
                                                                                            "highLow": 3,
                                                                                            "isTube": 0,
                                                                                            "od": 100000
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAGEO3T = parseFloat(result.ot);
                                                                                            if (BAGEO3T < 0) {
                                                                                                south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGEE3T = 1000 * parseFloat(result.et);
                                                                                            if (BAGEE3T < 0) {
                                                                                                south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGEC31 = parseFloat(result.c1);
                                                                                            if (BAGEC31 < 0) {
                                                                                                south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 第四段壁板材料名称
                                                                                            if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                                                                BAGE4NameVal = rows[36][columns[0][1].field];
                                                                                            }
                                                                                            else {
                                                                                                return false;
                                                                                            }

                                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                                            let BAGED4, BAGE4ThkMin,
                                                                                                BAGE4ThkMax;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BAGE4CategoryVal,
                                                                                                    "type": BAGE4TypeVal,
                                                                                                    "std": BAGE4STDVal,
                                                                                                    "name": BAGE4NameVal,
                                                                                                    "temp": BAGEDT
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BAGED4 = parseFloat(result.density);
                                                                                                    BAGE4ThkMin = parseFloat(result.thkMin);
                                                                                                    BAGE4ThkMax = parseFloat(result.thkMax);

                                                                                                    // 第四层壁板腐蚀裕量 C42
                                                                                                    let BAGEC42;
                                                                                                    if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                        && parseFloat(rows[37][columns[0][1].field]) < BAGE4ThkMax) {
                                                                                                        BAGEC42 = parseFloat(rows[37][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                        && parseFloat(rows[37][columns[0][1].field]) >= BAGE4ThkMax) {
                                                                                                        south.html("第四段壁板腐蚀裕量不能大于等于 " + BAGE4ThkMax + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 第四段壁板名义厚度
                                                                                                    let BAGETHK4N;
                                                                                                    if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) > Math.max(BAGEC42, BAGE4ThkMin)
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) <= BAGE4ThkMax) {
                                                                                                        BAGETHK4N = parseFloat(rows[38][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) <= Math.max(BAGEC42, BAGE4ThkMin)) {
                                                                                                        south.html("第四段壁板名义厚度不能小于等于 " + Math.max(BAGEC42, BAGE4ThkMin) + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) > BAGE4ThkMax) {
                                                                                                        south.html("第四段壁板名义厚度不能大于 " + BAGE4ThkMax + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // ajax 获取 O4T E4T C41
                                                                                                    let BAGEO4T,
                                                                                                        BAGEE4T,
                                                                                                        BAGEC41;
                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "category": BAGE4CategoryVal,
                                                                                                            "type": BAGE4TypeVal,
                                                                                                            "std": BAGE4STDVal,
                                                                                                            "name": BAGE4NameVal,
                                                                                                            "thk": BAGETHK4N,
                                                                                                            "temp": BAGEDT,
                                                                                                            "highLow": 3,
                                                                                                            "isTube": 0,
                                                                                                            "od": 100000
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            BAGEO4T = parseFloat(result.ot);
                                                                                                            if (BAGEO4T < 0) {
                                                                                                                south.html("查询第四段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            BAGEE4T = 1000 * parseFloat(result.et);
                                                                                                            if (BAGEE4T < 0) {
                                                                                                                south.html("查询第四段壁板材料弹性模量失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            BAGEC41 = parseFloat(result.c1);
                                                                                                            if (BAGEC41 < 0) {
                                                                                                                south.html("查询第四段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }

                                                                                                            // 过程参数
                                                                                                            let BAGEG = 9.81;
                                                                                                            let BAGEPC = BAGED * BAGEG * BAGEBH / 1000000000;
                                                                                                            let BAGEBHLC = BAGEBH / BAGELC;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "ba": BAGEBHLC
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    let BAGEALPHA = parseFloat(result.alpha);
                                                                                                                    let BAGEBETA = parseFloat(result.beta);

                                                                                                                    let BAGECG = BAGECG1 + 2 * BAGECG2;
                                                                                                                    let BAGEDGE = BAGEDGN - BAGECG;

                                                                                                                    let BAGEBH1 = 0.37 * BAGEBH;
                                                                                                                    let BAGEC1 = BAGEC11 + BAGEC12;
                                                                                                                    let BAGETHK1E = BAGETHK1N - BAGEC1;
                                                                                                                    let BAGEBH1LC = BAGEBH1 / BAGELC;
                                                                                                                    let BAGESH1 = BAGEBH1;
                                                                                                                    let BAGEPC1 = BAGED * BAGEG * BAGESH1 / 1000000000;

                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "ba": BAGEBH1LC
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            let BAGEALPHA1 = parseFloat(result.alpha);
                                                                                                                            let BAGEBETA1 = parseFloat(result.beta);

                                                                                                                            let BAGEBH2 = 0.25 * BAGEBH;
                                                                                                                            let BAGEC2 = BAGEC21 + BAGEC22;
                                                                                                                            let BAGETHK2E = BAGETHK2N - BAGEC2;
                                                                                                                            let BAGEBH2LC = BAGEBH2 / BAGELC;
                                                                                                                            let BAGESH2 = BAGEBH1 + BAGEBH2;
                                                                                                                            let BAGEPC2 = BAGED * BAGEG * BAGESH2 / 1000000000;

                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "ba": BAGEBH2LC
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    let BAGEALPHA2 = parseFloat(result.alpha);
                                                                                                                                    let BAGEBETA2 = parseFloat(result.beta);

                                                                                                                                    let BAGEBH3 = 0.21 * BAGEBH;
                                                                                                                                    let BAGEC3 = BAGEC31 + BAGEC32;
                                                                                                                                    let BAGETHK3E = BAGETHK3N - BAGEC3;
                                                                                                                                    let BAGEBH3LC = BAGEBH3 / BAGELC;
                                                                                                                                    let BAGESH3 = BAGEBH1 + BAGEBH2 + BAGEBH3;
                                                                                                                                    let BAGEPC3 = BAGED * BAGEG * BAGESH3 / 1000000000;

                                                                                                                                    $.ajax({
                                                                                                                                        type: "POST",
                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                        async: true,
                                                                                                                                        dataType: "json",
                                                                                                                                        data: JSON.stringify({
                                                                                                                                            "ba": BAGEBH3LC
                                                                                                                                        }),
                                                                                                                                        beforeSend: function () {
                                                                                                                                        },
                                                                                                                                        success: function (result) {

                                                                                                                                            let BAGEALPHA3 = parseFloat(result.alpha);
                                                                                                                                            let BAGEBETA3 = parseFloat(result.beta);

                                                                                                                                            let BAGEBH4 = 0.17 * BAGEBH;
                                                                                                                                            let BAGEC4 = BAGEC41 + BAGEC42;
                                                                                                                                            let BAGETHK4E = BAGETHK4N - BAGEC4;
                                                                                                                                            let BAGEBH4LC = BAGEBH4 / BAGELC;
                                                                                                                                            let BAGESH4 = BAGEBH1 + BAGEBH2 + BAGEBH3 + BAGEBH4;
                                                                                                                                            let BAGEPC4 = BAGED * BAGEG * BAGESH4 / 1000000000;

                                                                                                                                            $.ajax({
                                                                                                                                                type: "POST",
                                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                async: true,
                                                                                                                                                dataType: "json",
                                                                                                                                                data: JSON.stringify({
                                                                                                                                                    "ba": BAGEBH4LC
                                                                                                                                                }),
                                                                                                                                                beforeSend: function () {
                                                                                                                                                },
                                                                                                                                                success: function (result) {

                                                                                                                                                    let BAGEALPHA4 = parseFloat(result.alpha);
                                                                                                                                                    let BAGEBETA4 = parseFloat(result.beta);

                                                                                                                                                    // 拉杆校核
                                                                                                                                                    let BAGEOMAX = -1,
                                                                                                                                                        BAGEOMAXCHK = -1,
                                                                                                                                                        BAGEDGC = -1,
                                                                                                                                                        BAGEDGD = -1,
                                                                                                                                                        BAGEDGCHK = -1;
                                                                                                                                                    if (BAGELG >= 363 * Math.pow(BAGEDGE, 2 / 3)) {
                                                                                                                                                        BAGEDGC = 0.553 * BAGEBH * Math.sqrt(BAGED * BAGEG * BAGELC / BAGEOGT / 1000000000);
                                                                                                                                                        BAGEDGD = BAGEDGC + 2 * BAGECG2;
                                                                                                                                                        south.html(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "拉杆所需直径：" + (BAGEDGD + BAGECG1).toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        if (BAGEDGN >= (BAGEDGD + BAGECG1)) {
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "输入直径：" + BAGEDGN + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            BAGEDGCHK = "合格";
                                                                                                                                                        }
                                                                                                                                                        else {
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "输入直径：" + BAGEDGN + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            BAGEDGCHK = "不合格";
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.html(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "拉杆许用应力：" + BAGEOGT.toFixed(2) + " MPa" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEOMAX = 0.864 * BAGEEGT * BAGEDGE * BAGEDGE / (BAGELG * BAGELG)
                                                                                                                                                            + BAGEDG * BAGEG * BAGELG * BAGELG / BAGEDGE / 1000000000
                                                                                                                                                            + 0.306 * BAGEPC * BAGEBH * BAGELC / (BAGEDGE * BAGEDGE);
                                                                                                                                                        if (BAGEOMAX <= BAGEOGT) {
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "实际应力：" + BAGEOMAX.toFixed(4) + " MPa" +
                                                                                                                                                                "</span>");
                                                                                                                                                            BAGEOMAXCHK = "合格";
                                                                                                                                                        }
                                                                                                                                                        else {
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "实际应力：" + BAGEOMAX.toFixed(4) + " MPa" +
                                                                                                                                                                "</span>");
                                                                                                                                                            BAGEOMAXCHK = "不合格";
                                                                                                                                                        }
                                                                                                                                                    }

                                                                                                                                                    // 顶边加固件
                                                                                                                                                    let BAGEI0 = 0.217 * BAGEPC1 * BAGESH1 * BAGELC * BAGELC * BAGELC / BAGEEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "顶边加固件所需最小惯性矩：" + BAGEI0.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第一段加固柱校核
                                                                                                                                                    let BAGELMAX1 = 0.408 * BAGETHK1E * Math.sqrt(BAGEO1T / (BAGEALPHA * BAGEPC));
                                                                                                                                                    let BAGEZP1 = BAGELC * (0.0642 * BAGEPC * BAGEBH * BAGEBH / BAGEO1T - BAGETHK1E * BAGETHK1E / 6);

                                                                                                                                                    // 第一段壁板
                                                                                                                                                    let BAGETHK1C = BAGELC * Math.sqrt(3 * BAGEALPHA1 * BAGEPC1 / BAGEO1T);
                                                                                                                                                    let BAGETHK1D = BAGETHK1C + BAGEC12;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第一段壁板所需厚度：" + (BAGETHK1D + BAGEC11).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGETHK1CHK;
                                                                                                                                                    if (BAGETHK1N >= (BAGETHK1D + BAGEC11)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK1N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK1CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK1N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK1CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAGEF1ALLOW = 5 * (BAGETHK1E / 2 + Math.sqrt(BAGEBH1LC) * BAGELC / 500);
                                                                                                                                                    let BAGEF1MAX = BAGEBETA1 * Math.pow(BAGELC, 4) * BAGEPC1 / (2 * BAGEE1T * Math.pow(BAGETHK1E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第一段壁板许用挠度：" + BAGEF1ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGEF1CHK;
                                                                                                                                                    if (BAGEF1MAX <= BAGEF1ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF1MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF1CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF1MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF1CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 第一道水平加固件
                                                                                                                                                    let BAGEF1 = BAGEPC2 * (BAGESH1 + BAGESH2) / 6;
                                                                                                                                                    let BAGEI1 = 1.3 * BAGEF1 * BAGELC * BAGELC * BAGELC / BAGEEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第一道水平加固件所需最小惯性矩：" + BAGEI1.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第二段加固柱校核
                                                                                                                                                    let BAGELMAX2 = 0.408 * BAGETHK2E * Math.sqrt(BAGEO2T / (BAGEALPHA * BAGEPC));
                                                                                                                                                    let BAGEZP2 = BAGELC * (0.0642 * BAGEPC * BAGEBH * BAGEBH / BAGEO2T - BAGETHK2E * BAGETHK2E / 6);

                                                                                                                                                    // 第二段壁板
                                                                                                                                                    let BAGETHK2C = BAGELC * Math.sqrt(6 * BAGEALPHA2 * (BAGEPC1 + BAGEPC2) / BAGEO2T);
                                                                                                                                                    let BAGETHK2D = BAGETHK2C + BAGEC22;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第二段壁板所需厚度：" + (BAGETHK2D + BAGEC21).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGETHK2CHK;
                                                                                                                                                    if (BAGETHK2N >= (BAGETHK2D + BAGEC21)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK2N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK2CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK2N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK2CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAGEF2ALLOW = 5 * (BAGETHK2E / 2 + Math.sqrt(BAGEBH2LC) * BAGELC / 500);
                                                                                                                                                    let BAGEF2MAX = BAGEBETA2 * Math.pow(BAGELC, 4) * (BAGEPC1 + BAGEPC2) / (2 * BAGEE2T * Math.pow(BAGETHK2E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第二段壁板许用挠度：" + BAGEF2ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGEF2CHK;
                                                                                                                                                    if (BAGEF2MAX <= BAGEF2ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF2MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF2CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF2MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF2CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 第二道水平加固件
                                                                                                                                                    let BAGEF2 = (BAGEPC3 - BAGEPC1) * (BAGESH1 + BAGESH2 + BAGESH3) / 6;
                                                                                                                                                    let BAGEI2 = 1.3 * BAGEF2 * BAGELC * BAGELC * BAGELC / BAGEEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第二道水平加固件所需最小惯性矩：" + BAGEI2.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第三段加固柱校核
                                                                                                                                                    let BAGELMAX3 = 0.408 * BAGETHK3E * Math.sqrt(BAGEO3T / (BAGEALPHA * BAGEPC));
                                                                                                                                                    let BAGEZP3 = BAGELC * (0.0642 * BAGEPC * BAGEBH * BAGEBH / BAGEO3T - BAGETHK3E * BAGETHK3E / 6);

                                                                                                                                                    // 第三段壁板
                                                                                                                                                    let BAGETHK3C = BAGELC * Math.sqrt(6 * BAGEALPHA3 * (BAGEPC2 + BAGEPC3) / BAGEO3T);
                                                                                                                                                    let BAGETHK3D = BAGETHK3C + BAGEC32;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第三段壁板所需厚度：" + (BAGETHK3D + BAGEC31).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGETHK3CHK;
                                                                                                                                                    if (BAGETHK3N >= (BAGETHK3D + BAGEC31)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK3N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK3CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK3N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK3CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAGEF3ALLOW = 5 * (BAGETHK3E / 2 + Math.sqrt(BAGEBH3LC) * BAGELC / 500);
                                                                                                                                                    let BAGEF3MAX = BAGEBETA3 * Math.pow(BAGELC, 4) * (BAGEPC2 + BAGEPC3) / (2 * BAGEE3T * Math.pow(BAGETHK3E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第三段壁板许用挠度：" + BAGEF3ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGEF3CHK;
                                                                                                                                                    if (BAGEF3MAX <= BAGEF3ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF3MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF3CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF3MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF3CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 第三道水平加固件
                                                                                                                                                    let BAGEF3 = (BAGEPC4 - BAGEPC2) * (BAGESH4 + BAGESH3 + BAGESH2) / 6;
                                                                                                                                                    let BAGEI3 = 1.3 * BAGEF3 * BAGELC * BAGELC * BAGELC / BAGEEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第三道水平加固件所需最小惯性矩：" + BAGEI3.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第四段加固柱校核
                                                                                                                                                    let BAGELMAX4 = 0.408 * BAGETHK4E * Math.sqrt(BAGEO4T / (BAGEALPHA * BAGEPC));
                                                                                                                                                    let BAGEZP4 = BAGELC * (0.0642 * BAGEPC * BAGEBH * BAGEBH / BAGEO4T - BAGETHK4E * BAGETHK4E / 6);

                                                                                                                                                    // 第四段壁板
                                                                                                                                                    let BAGETHK4C = BAGELC * Math.sqrt(6 * BAGEALPHA4 * (BAGEPC3 + BAGEPC4) / BAGEO4T);
                                                                                                                                                    let BAGETHK4D = BAGETHK4C + BAGEC42;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第四段壁板所需厚度：" + (BAGETHK4D + BAGEC41).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGETHK4CHK;
                                                                                                                                                    if (BAGETHK4N >= (BAGETHK4D + BAGEC41)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK4N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK4CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAGETHK4N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGETHK4CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAGEF4ALLOW = 5 * (BAGETHK4E / 2 + Math.sqrt(BAGEBH4LC) * BAGELC / 500);
                                                                                                                                                    let BAGEF4MAX = BAGEBETA4 * Math.pow(BAGELC, 4) * (BAGEPC3 + BAGEPC4) / (2 * BAGEE4T * Math.pow(BAGETHK4E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第四段壁板许用挠度：" + BAGEF4ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGEF4CHK;
                                                                                                                                                    if (BAGEF4MAX <= BAGEF4ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF4MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF4CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAGEF4MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGEF4CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 加固柱结果汇总
                                                                                                                                                    let BAGELMAX = Math.min(BAGELMAX1, BAGELMAX2, BAGELMAX3, BAGELMAX4);
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "垂直加固柱允许最大间距：" + BAGELMAX.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAGELCCHK;
                                                                                                                                                    if (BAGELC <= BAGELMAX) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际输入间距：" + BAGELC + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGELCCHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际输入间距：" + BAGELC + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAGELCCHK = "不合格";
                                                                                                                                                    }
                                                                                                                                                    let BAGEZP = Math.max(BAGEZP1, BAGEZP2, BAGEZP3, BAGEZP4);
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "垂直加固柱所需最小截面系数：" + BAGEZP.toFixed(4) + " mm³" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // docx
                                                                                                                                                    let BAGEPayJS = $('#payjs');

                                                                                                                                                    function getDocx() {
                                                                                                                                                        $.ajax({
                                                                                                                                                            type: "POST",
                                                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                                                            url: "bagedocx.action",
                                                                                                                                                            async: true,
                                                                                                                                                            dataType: "json",
                                                                                                                                                            data: JSON.stringify({
                                                                                                                                                                ribbonName: "BAGE",

                                                                                                                                                                t: BAGEDT,
                                                                                                                                                                d: BAGED,
                                                                                                                                                                lc: BAGELC,
                                                                                                                                                                bh: BAGEBH,

                                                                                                                                                                jstd: BAGEJSTDVal,
                                                                                                                                                                jname: BAGEJNameVal,

                                                                                                                                                                gstd: BAGEGSTDVal,
                                                                                                                                                                gname: BAGEGNameVal,
                                                                                                                                                                dgn: BAGEDGN,
                                                                                                                                                                lg: BAGELG,
                                                                                                                                                                cg2: BAGECG2,

                                                                                                                                                                std1: BAGE1STDVal,
                                                                                                                                                                name1: BAGE1NameVal,
                                                                                                                                                                c12: BAGEC12,
                                                                                                                                                                thk1n: BAGETHK1N,

                                                                                                                                                                std2: BAGE2STDVal,
                                                                                                                                                                name2: BAGE2NameVal,
                                                                                                                                                                c22: BAGEC22,
                                                                                                                                                                thk2n: BAGETHK2N,

                                                                                                                                                                std3: BAGE3STDVal,
                                                                                                                                                                name3: BAGE3NameVal,
                                                                                                                                                                c32: BAGEC32,
                                                                                                                                                                thk3n: BAGETHK3N,

                                                                                                                                                                std4: BAGE4STDVal,
                                                                                                                                                                name4: BAGE4NameVal,
                                                                                                                                                                c42: BAGEC42,
                                                                                                                                                                thk4n: BAGETHK4N,

                                                                                                                                                                d1: BAGED1.toFixed(4),
                                                                                                                                                                c11: BAGEC11.toFixed(4),
                                                                                                                                                                o1t: BAGEO1T.toFixed(4),
                                                                                                                                                                e1t: (BAGEE1T / 1000).toFixed(4),

                                                                                                                                                                d2: BAGED2.toFixed(4),
                                                                                                                                                                c21: BAGEC21.toFixed(4),
                                                                                                                                                                o2t: BAGEO2T.toFixed(4),
                                                                                                                                                                e2t: (BAGEE2T / 1000).toFixed(4),

                                                                                                                                                                d3: BAGED3.toFixed(4),
                                                                                                                                                                c31: BAGEC31.toFixed(4),
                                                                                                                                                                o3t: BAGEO3T.toFixed(4),
                                                                                                                                                                e3t: (BAGEE3T / 1000).toFixed(4),

                                                                                                                                                                d4: BAGED4.toFixed(4),
                                                                                                                                                                c41: BAGEC41.toFixed(4),
                                                                                                                                                                o4t: BAGEO4T.toFixed(4),
                                                                                                                                                                e4t: (BAGEE4T / 1000).toFixed(4),

                                                                                                                                                                dg: BAGEDG.toFixed(4),
                                                                                                                                                                cg1: BAGECG1.toFixed(4),
                                                                                                                                                                ogt: BAGEOGT.toFixed(4),
                                                                                                                                                                egt: (BAGEEGT / 1000).toFixed(4),

                                                                                                                                                                ejt: (BAGEEJT / 1000).toFixed(4),

                                                                                                                                                                g: BAGEG.toFixed(4),
                                                                                                                                                                pc: BAGEPC.toFixed(4),
                                                                                                                                                                bhlc: BAGEBHLC.toFixed(4),
                                                                                                                                                                alpha: BAGEALPHA.toFixed(8),
                                                                                                                                                                beta: BAGEBETA.toFixed(8),

                                                                                                                                                                cg: BAGECG.toFixed(4),
                                                                                                                                                                dge: BAGEDGE.toFixed(4),

                                                                                                                                                                bh1: BAGEBH1.toFixed(4),
                                                                                                                                                                c1: BAGEC1.toFixed(4),
                                                                                                                                                                thk1e: BAGETHK1E.toFixed(4),
                                                                                                                                                                bh1lc: BAGEBH1LC.toFixed(4),
                                                                                                                                                                alpha1: BAGEALPHA1.toFixed(8),
                                                                                                                                                                beta1: BAGEBETA1.toFixed(8),
                                                                                                                                                                sh1: BAGESH1.toFixed(4),
                                                                                                                                                                pc1: BAGEPC1.toFixed(4),

                                                                                                                                                                bh2: BAGEBH2.toFixed(4),
                                                                                                                                                                c2: BAGEC2.toFixed(4),
                                                                                                                                                                thk2e: BAGETHK2E.toFixed(4),
                                                                                                                                                                bh2lc: BAGEBH2LC.toFixed(4),
                                                                                                                                                                alpha2: BAGEALPHA2.toFixed(8),
                                                                                                                                                                beta2: BAGEBETA2.toFixed(8),
                                                                                                                                                                sh2: BAGESH2.toFixed(4),
                                                                                                                                                                pc2: BAGEPC2.toFixed(4),

                                                                                                                                                                bh3: BAGEBH3.toFixed(4),
                                                                                                                                                                c3: BAGEC3.toFixed(4),
                                                                                                                                                                thk3e: BAGETHK3E.toFixed(4),
                                                                                                                                                                bh3lc: BAGEBH3LC.toFixed(4),
                                                                                                                                                                alpha3: BAGEALPHA3.toFixed(8),
                                                                                                                                                                beta3: BAGEBETA3.toFixed(8),
                                                                                                                                                                sh3: BAGESH3.toFixed(4),
                                                                                                                                                                pc3: BAGEPC3.toFixed(4),

                                                                                                                                                                bh4: BAGEBH4.toFixed(4),
                                                                                                                                                                c4: BAGEC4.toFixed(4),
                                                                                                                                                                thk4e: BAGETHK4E.toFixed(4),
                                                                                                                                                                bh4lc: BAGEBH4LC.toFixed(4),
                                                                                                                                                                alpha4: BAGEALPHA4.toFixed(8),
                                                                                                                                                                beta4: BAGEBETA4.toFixed(8),
                                                                                                                                                                sh4: BAGESH4.toFixed(4),
                                                                                                                                                                pc4: BAGEPC4.toFixed(4),

                                                                                                                                                                dgc: BAGEDGC.toFixed(4),
                                                                                                                                                                dgd: BAGEDGD.toFixed(4),
                                                                                                                                                                dgchk: BAGEDGCHK,

                                                                                                                                                                omax: BAGEOMAX.toFixed(4),
                                                                                                                                                                omaxchk: BAGEOMAXCHK,

                                                                                                                                                                i0: BAGEI0.toFixed(4),

                                                                                                                                                                lmax1: BAGELMAX1.toFixed(4),
                                                                                                                                                                zp1: BAGEZP1.toFixed(4),

                                                                                                                                                                thk1c: BAGETHK1C.toFixed(4),
                                                                                                                                                                thk1d: BAGETHK1D.toFixed(4),
                                                                                                                                                                thk1chk: BAGETHK1CHK,
                                                                                                                                                                f1allow: BAGEF1ALLOW.toFixed(4),
                                                                                                                                                                f1max: BAGEF1MAX.toFixed(4),
                                                                                                                                                                f1chk: BAGEF1CHK,

                                                                                                                                                                f1: BAGEF1.toFixed(4),
                                                                                                                                                                i1: BAGEI1.toFixed(4),

                                                                                                                                                                lmax2: BAGELMAX2.toFixed(4),
                                                                                                                                                                zp2: BAGEZP2.toFixed(4),

                                                                                                                                                                thk2c: BAGETHK2C.toFixed(4),
                                                                                                                                                                thk2d: BAGETHK2D.toFixed(4),
                                                                                                                                                                thk2chk: BAGETHK2CHK,
                                                                                                                                                                f2allow: BAGEF2ALLOW.toFixed(4),
                                                                                                                                                                f2max: BAGEF2MAX.toFixed(4),
                                                                                                                                                                f2chk: BAGEF2CHK,

                                                                                                                                                                f2: BAGEF2.toFixed(4),
                                                                                                                                                                i2: BAGEI2.toFixed(4),

                                                                                                                                                                lmax3: BAGELMAX3.toFixed(4),
                                                                                                                                                                zp3: BAGEZP3.toFixed(4),

                                                                                                                                                                thk3c: BAGETHK3C.toFixed(4),
                                                                                                                                                                thk3d: BAGETHK3D.toFixed(4),
                                                                                                                                                                thk3chk: BAGETHK3CHK,
                                                                                                                                                                f3allow: BAGEF3ALLOW.toFixed(4),
                                                                                                                                                                f3max: BAGEF3MAX.toFixed(4),
                                                                                                                                                                f3chk: BAGEF3CHK,

                                                                                                                                                                f3: BAGEF3.toFixed(4),
                                                                                                                                                                i3: BAGEI3.toFixed(4),

                                                                                                                                                                lmax4: BAGELMAX4.toFixed(4),
                                                                                                                                                                zp4: BAGEZP4.toFixed(4),

                                                                                                                                                                thk4c: BAGETHK4C.toFixed(4),
                                                                                                                                                                thk4d: BAGETHK4D.toFixed(4),
                                                                                                                                                                thk4chk: BAGETHK4CHK,
                                                                                                                                                                f4allow: BAGEF4ALLOW.toFixed(4),
                                                                                                                                                                f4max: BAGEF4MAX.toFixed(4),
                                                                                                                                                                f4chk: BAGEF4CHK,

                                                                                                                                                                lmax: BAGELMAX.toFixed(4),
                                                                                                                                                                lcchk: BAGELCCHK,
                                                                                                                                                                zp: BAGEZP.toFixed(4)
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
                                                                                                                                                                    BAGEPayJS.dialog({
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
                                                                                                                                                                                BAGEPayJS.dialog("close");
                                                                                                                                                                                BAGEPayJS.dialog("clear");
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
                                                                                                                                                                                            BAGEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                                    BAGEPayJS.dialog('close');
                                                                                                                                                                                                    BAGEPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});