$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let baggSketch = $("#d2");
    let baggModel = $("#d3");
    let baggd2d3 = $('#d2d3');

    $("#cal").html("<table id='bagg'></table>");
    let pg = $("#bagg");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/a/g/g/BAGG.json", function (result) {

        let BAGGDT;
        let BAGG1Category, BAGG1CategoryVal, BAGG1Type, BAGG1TypeVal, BAGG1STD, BAGG1STDVal, BAGG1Name, BAGG1NameVal,
            BAGG2Category, BAGG2CategoryVal, BAGG2Type, BAGG2TypeVal, BAGG2STD, BAGG2STDVal, BAGG2Name, BAGG2NameVal,
            BAGG3Category, BAGG3CategoryVal, BAGG3Type, BAGG3TypeVal, BAGG3STD, BAGG3STDVal, BAGG3Name, BAGG3NameVal,
            BAGG4Category, BAGG4CategoryVal, BAGG4Type, BAGG4TypeVal, BAGG4STD, BAGG4STDVal, BAGG4Name, BAGG4NameVal,
            BAGG5Category, BAGG5CategoryVal, BAGG5Type, BAGG5TypeVal, BAGG5STD, BAGG5STDVal, BAGG5Name, BAGG5NameVal,
            BAGGGCategory, BAGGGCategoryVal, BAGGGType, BAGGGTypeVal, BAGGGSTD, BAGGGSTDVal, BAGGGName, BAGGGNameVal,
            BAGGJCategory, BAGGJCategoryVal, BAGGJType, BAGGJTypeVal, BAGGJSTD, BAGGJSTDVal, BAGGJName, BAGGJNameVal;
        let columns, rows, ed;

        function bagg2d(bh = "H",
                        bh1 = "0.31H", bh2 = "0.21H", bh3 = "0.18H", bh4 = "0.16H", bh5 = "0.14H",
                        dgn = "dgn", lg = "Lg") {

            baggSketch.empty();

            let width = baggSketch.width();
            let height = baggSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGG2VG").attr("height", height);

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
            let padding = 20;
            let thk = 4;

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
                {x: padding + wg - 6 * thk, y: padding + 1.9 * hg},
                {x: padding + wg - thk, y: padding + 1.9 * hg},
                {x: padding + wg - thk, y: padding + 1.9 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.9 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.9 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.9 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.9 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 1.9 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.9 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.9 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.9 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.9 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.9 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.9 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.9 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.9 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 2.6 * hg},
                {x: padding + wg - thk, y: padding + 2.6 * hg},
                {x: padding + wg - thk, y: padding + 2.6 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.6 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.6 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.6 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.6 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.6 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.6 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.6 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.6 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.6 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.6 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.6 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.6 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.6 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 3.1 * hg},
                {x: padding + wg - thk, y: padding + 3.1 * hg},
                {x: padding + wg - thk, y: padding + 3.1 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.1 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.1 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.1 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.1 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.1 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.1 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.1 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.1 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.1 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.1 * hg}
            ])).classed("sketch", true);

            // 角钢 第五层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 3.6 * hg},
                {x: padding + wg - thk, y: padding + 3.6 * hg},
                {x: padding + wg - thk, y: padding + 3.6 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.6 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.6 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.6 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.6 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.6 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.6 * hg}
            ])).classed("sketch", true);

            // 角钢 第五层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.6 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.6 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.6 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.6 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.6 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.6 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.6 * hg}
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
            ])).attr("id", "BAGGSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGGSketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 1.9 * hg, padding + wg - 6 * thk, padding + hg, bh1, "BAGGSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 2.6 * hg, padding + wg - 6 * thk, padding + 1.9 * hg, bh2, "BAGGSketchBH2");

            // BH3
            dimLeftV(padding + wg - 6 * thk, padding + 3.1 * hg, padding + wg - 6 * thk, padding + 2.6 * hg, bh3, "BAGGSketchBH3");

            // BH4
            dimLeftV(padding + wg - 6 * thk, padding + 3.6 * hg, padding + wg - 6 * thk, padding + 3.1 * hg, bh4, "BAGGSketchBH4");

            // BH5
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3.6 * hg, bh5, "BAGGSketchBH5");

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
            dimTopH(padding + wg - 4 * thk, padding + hg - 4 * thk - 10, padding + 3 * wg + 4 * thk, padding + hg - 4 * thk - 10, lg, "BAGGSketchLG");

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
            ])).attr("id", "BAGGSketchDGN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGGSketchDGN")
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

        currentTabIndex = baggd2d3.tabs('getTabIndex', baggd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bagg2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bagg").length > 0) {
                    bagg2d();
                }
            });
        }
        baggd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bagg2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bagg").length > 0) {
                            bagg2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、有拉杆、垂直加固、四道水平加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAGGJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAGGJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGGJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGGJName);
                }

                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGGGCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGGGType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGGGSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGGGName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGG1Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGG1Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGG1STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGG1Name);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAGG2Category);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAGG2Type);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAGG2STD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAGG2Name);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BAGG3Category);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAGG3Type);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAGG3STD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAGG3Name);
                }

                else if (index === 33) {
                    $(ed.target).combobox("loadData", BAGG4Category);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", BAGG4Type);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", BAGG4STD);
                }
                else if (index === 36) {
                    $(ed.target).combobox("loadData", BAGG4Name);
                }

                else if (index === 39) {
                    $(ed.target).combobox("loadData", BAGG5Category);
                }
                else if (index === 40) {
                    $(ed.target).combobox("loadData", BAGG5Type);
                }
                else if (index === 41) {
                    $(ed.target).combobox("loadData", BAGG5STD);
                }
                else if (index === 42) {
                    $(ed.target).combobox("loadData", BAGG5Name);
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
                    baggSketch.empty();

                    // model
                    baggModel.empty();

                    // sketch
                    currentTabIndex = baggd2d3.tabs('getTabIndex', baggd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagg2d();
                        baggSketch.off("resize").on("resize", function () {
                            if ($("#bagg").length > 0) {
                                bagg2d();
                            }
                        });
                    }
                    baggd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagg2d();
                                baggSketch.off("resize").on("resize", function () {
                                    if ($("#bagg").length > 0) {
                                        bagg2d();
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

                        BAGGDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAGGJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGGJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGGJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGGJName = null;

                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGGGCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGGGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGGGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGGGName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGG1Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGG1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGG1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGG1Name = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAGG2Category = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGG2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGG2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGG2Name = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BAGG3Category = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGG3Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGG3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGG3Name = null;

                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        BAGG4Category = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAGG4Type = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGG4STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGG4Name = null;

                        rows[39][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 39);
                        BAGG5Category = null;
                        rows[40][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 40);
                        BAGG5Type = null;
                        rows[41][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 41);
                        BAGG5STD = null;
                        rows[42][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 42);
                        BAGG5Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG1Category = [];
                                BAGG2Category = [];
                                BAGG3Category = [];
                                BAGG4Category = [];
                                BAGG5Category = [];
                                BAGGJCategory = [];
                                BAGGGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGGDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGG1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGG2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGG3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGG4Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGG5Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGGJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGGGCategory[index] = {
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

                        BAGGJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGGJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGGJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGGJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGGJCategoryVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGGJType = [];
                                $(result).each(function (index, element) {
                                    BAGGJType[index] = {
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

                        BAGGJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGGJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGGJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGGJCategoryVal,
                                type: BAGGJTypeVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGGJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGGJSTD[index] = {
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

                        BAGGJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGGJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGGJCategoryVal,
                                type: BAGGJTypeVal,
                                std: BAGGJSTDVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGGJName = [];
                                $(result).each(function (index, element) {
                                    BAGGJName[index] = {
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

                        BAGGGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGGGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGGGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGGGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGGGCategoryVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGGGType = [];
                                $(result).each(function (index, element) {
                                    BAGGGType[index] = {
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

                        BAGGGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGGGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGGGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGGGCategoryVal,
                                type: BAGGGTypeVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGGGSTD = [];
                                $(result).each(function (index, element) {
                                    BAGGGSTD[index] = {
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

                        BAGGGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGGGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGGGCategoryVal,
                                type: BAGGGTypeVal,
                                std: BAGGGSTDVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGGGName = [];
                                $(result).each(function (index, element) {
                                    BAGGGName[index] = {
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

                        BAGG1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGG1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGG1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGG1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG1CategoryVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG1Type = [];
                                $(result).each(function (index, element) {
                                    BAGG1Type[index] = {
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

                        BAGG1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGG1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGG1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG1CategoryVal,
                                type: BAGG1TypeVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG1STD = [];
                                $(result).each(function (index, element) {
                                    BAGG1STD[index] = {
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

                        BAGG1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGG1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG1CategoryVal,
                                type: BAGG1TypeVal,
                                std: BAGG1STDVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG1Name = [];
                                $(result).each(function (index, element) {
                                    BAGG1Name[index] = {
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

                        BAGG2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGG2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGG2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGG2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG2CategoryVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG2Type = [];
                                $(result).each(function (index, element) {
                                    BAGG2Type[index] = {
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

                        BAGG2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGG2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGG2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG2CategoryVal,
                                type: BAGG2TypeVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG2STD = [];
                                $(result).each(function (index, element) {
                                    BAGG2STD[index] = {
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

                        BAGG2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGG2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG2CategoryVal,
                                type: BAGG2TypeVal,
                                std: BAGG2STDVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG2Name = [];
                                $(result).each(function (index, element) {
                                    BAGG2Name[index] = {
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

                        BAGG3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGG3Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGG3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGG3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG3CategoryVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG3Type = [];
                                $(result).each(function (index, element) {
                                    BAGG3Type[index] = {
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

                        BAGG3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGG3STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGG3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG3CategoryVal,
                                type: BAGG3TypeVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG3STD = [];
                                $(result).each(function (index, element) {
                                    BAGG3STD[index] = {
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

                        BAGG3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGG3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG3CategoryVal,
                                type: BAGG3TypeVal,
                                std: BAGG3STDVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG3Name = [];
                                $(result).each(function (index, element) {
                                    BAGG3Name[index] = {
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

                        BAGG4CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAGG4Type = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGG4STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGG4Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG4CategoryVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG4Type = [];
                                $(result).each(function (index, element) {
                                    BAGG4Type[index] = {
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

                        BAGG4TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGG4STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGG4Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG4CategoryVal,
                                type: BAGG4TypeVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG4STD = [];
                                $(result).each(function (index, element) {
                                    BAGG4STD[index] = {
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

                        BAGG4STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGG4Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG4CategoryVal,
                                type: BAGG4TypeVal,
                                std: BAGG4STDVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG4Name = [];
                                $(result).each(function (index, element) {
                                    BAGG4Name[index] = {
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

                    if (index === 39) {

                        BAGG5CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[40][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 40);
                        BAGG5Type = null;
                        rows[41][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 41);
                        BAGG5STD = null;
                        rows[42][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 42);
                        BAGG5Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG5CategoryVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG5Type = [];
                                $(result).each(function (index, element) {
                                    BAGG5Type[index] = {
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
                    if (index === 40) {

                        BAGG5TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[41][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 41);
                        BAGG5STD = null;
                        rows[42][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 42);
                        BAGG5Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG5CategoryVal,
                                type: BAGG5TypeVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG5STD = [];
                                $(result).each(function (index, element) {
                                    BAGG5STD[index] = {
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
                    if (index === 41) {

                        BAGG5STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[42][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 42);
                        BAGG5Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGG5CategoryVal,
                                type: BAGG5TypeVal,
                                std: BAGG5STDVal,
                                temp: BAGGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGG5Name = [];
                                $(result).each(function (index, element) {
                                    BAGG5Name[index] = {
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
                    let BAGGD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGGD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGGLC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGGLC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGGBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGGLC, 0.1 / 0.31 * BAGGLC, 0.1 / 0.21 * BAGGLC, 0.1 / 0.18 * BAGGLC, 0.1 / 0.16 * BAGGLC, 0.1 / 0.14 * BAGGLC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGGLC, 5 / 0.31 * BAGGLC, 5 / 0.21 * BAGGLC, 5 / 0.18 * BAGGLC, 5 / 0.16 * BAGGLC, 5 / 0.14 * BAGGLC)) {
                        BAGGBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGGLC, 0.1 / 0.31 * BAGGLC, 0.1 / 0.21 * BAGGLC, 0.1 / 0.18 * BAGGLC, 0.1 / 0.16 * BAGGLC, 0.1 / 0.14 * BAGGLC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGGLC, 0.1 / 0.31 * BAGGLC, 0.1 / 0.21 * BAGGLC, 0.1 / 0.18 * BAGGLC, 0.1 / 0.16 * BAGGLC, 0.1 / 0.14 * BAGGLC).toFixed(2) + " mm")
                            .css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGGLC, 5 / 0.31 * BAGGLC, 5 / 0.21 * BAGGLC, 5 / 0.18 * BAGGLC, 5 / 0.16 * BAGGLC, 5 / 0.14 * BAGGLC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGGLC, 5 / 0.31 * BAGGLC, 5 / 0.21 * BAGGLC, 5 / 0.18 * BAGGLC, 5 / 0.16 * BAGGLC, 5 / 0.14 * BAGGLC).toFixed(2) + " mm")
                            .css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2));
                        baggSketch.off("resize").on("resize", function () {
                            if ($("#bagg").length > 0) {
                                bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2));
                            }
                        });
                    }
                    baggd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2));
                                baggSketch.off("resize").on("resize", function () {
                                    if ($("#bagg").length > 0) {
                                        bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAGGJNameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGGEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGGJCategoryVal,
                            "type": BAGGJTypeVal,
                            "std": BAGGJSTDVal,
                            "name": BAGGJNameVal,
                            "temp": BAGGDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGGEJT = 1000 * parseFloat(result.et);
                            if (BAGGEJT < 0) {
                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 拉杆材料名称
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                BAGGGNameVal = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGGDG, BAGGGThkMin, BAGGGThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGGGCategoryVal,
                                    "type": BAGGGTypeVal,
                                    "std": BAGGGSTDVal,
                                    "name": BAGGGNameVal,
                                    "temp": BAGGDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGGDG = parseFloat(result.density);
                                    BAGGGThkMin = parseFloat(result.thkMin);
                                    BAGGGThkMax = parseFloat(result.thkMax);

                                    // 拉杆腐蚀裕量 CG2
                                    let BAGGCG2;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) < BAGGGThkMax / 2) {
                                        BAGGCG2 = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) >= BAGGGThkMax / 2) {
                                        south.html("拉杆腐蚀裕量不能大于等于 " + BAGGGThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 拉杆名义直径
                                    let BAGGDGN;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > Math.max(BAGGCG2, BAGGGThkMin)
                                        && parseFloat(rows[13][columns[0][1].field]) <= BAGGGThkMax) {
                                        BAGGDGN = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) <= Math.max(BAGGCG2, BAGGGThkMin)) {
                                        south.html("拉杆直径不能小于等于 " + Math.max(BAGGCG2, BAGGGThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > BAGGGThkMax) {
                                        south.html("拉杆直径不能大于 " + BAGGGThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN);
                                        baggSketch.off("resize").on("resize", function () {
                                            if ($("#bagg").length > 0) {
                                                bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN);
                                            }
                                        });
                                    }
                                    baggd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN);
                                                baggSketch.off("resize").on("resize", function () {
                                                    if ($("#bagg").length > 0) {
                                                        bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 OGT EGT CG1
                                    let BAGGOGT, BAGGEGT, BAGGCG1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGGGCategoryVal,
                                            "type": BAGGGTypeVal,
                                            "std": BAGGGSTDVal,
                                            "name": BAGGGNameVal,
                                            "thk": BAGGDGN,
                                            "temp": BAGGDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGGOGT = parseFloat(result.ot);
                                            if (BAGGOGT < 0) {
                                                south.html("查询拉杆材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGGEGT = 1000 * parseFloat(result.et);
                                            if (BAGGEGT < 0) {
                                                south.html("查询拉杆材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGGCG1 = parseFloat(result.c1);
                                            if (BAGGCG1 < 0) {
                                                south.html("查询拉杆材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 拉杆长度 LG
                                            let BAGGLG;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) > BAGGLC) {
                                                BAGGLG = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) <= BAGGLC) {
                                                south.html("拉杆长度 LG 不能小于等于 " + BAGGLC + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN, BAGGLG);
                                                baggSketch.off("resize").on("resize", function () {
                                                    if ($("#bagg").length > 0) {
                                                        bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN, BAGGLG);
                                                    }
                                                });
                                            }
                                            baggd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN, BAGGLG);
                                                        baggSketch.off("resize").on("resize", function () {
                                                            if ($("#bagg").length > 0) {
                                                                bagg2d(BAGGBH, (0.31 * BAGGBH).toFixed(2), (0.21 * BAGGBH).toFixed(2), (0.18 * BAGGBH).toFixed(2), (0.16 * BAGGBH).toFixed(2), (0.14 * BAGGBH).toFixed(2), "Φ" + BAGGDGN, BAGGLG);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 第一段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGG1NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGGD1, BAGG1ThkMin, BAGG1ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGG1CategoryVal,
                                                    "type": BAGG1TypeVal,
                                                    "std": BAGG1STDVal,
                                                    "name": BAGG1NameVal,
                                                    "temp": BAGGDT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGGD1 = parseFloat(result.density);
                                                    BAGG1ThkMin = parseFloat(result.thkMin);
                                                    BAGG1ThkMax = parseFloat(result.thkMax);

                                                    // 第一层壁板腐蚀裕量 C12
                                                    let BAGGC12;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGG1ThkMax) {
                                                        BAGGC12 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGG1ThkMax) {
                                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGG1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第一段壁板名义厚度
                                                    let BAGGTHK1N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGGC12, BAGG1ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGG1ThkMax) {
                                                        BAGGTHK1N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGGC12, BAGG1ThkMin)) {
                                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGGC12, BAGG1ThkMin) + " mm")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGG1ThkMax) {
                                                        south.html("第一段壁板名义厚度不能大于 " + BAGG1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O1T E1T C11
                                                    let BAGGO1T, BAGGE1T, BAGGC11;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGG1CategoryVal,
                                                            "type": BAGG1TypeVal,
                                                            "std": BAGG1STDVal,
                                                            "name": BAGG1NameVal,
                                                            "thk": BAGGTHK1N,
                                                            "temp": BAGGDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGGO1T = parseFloat(result.ot);
                                                            if (BAGGO1T < 0) {
                                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGGE1T = 1000 * parseFloat(result.et);
                                                            if (BAGGE1T < 0) {
                                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGGC11 = parseFloat(result.c1);
                                                            if (BAGGC11 < 0) {
                                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 第二段壁板材料名称
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                BAGG2NameVal = rows[24][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // AJAX 获取材料密度、最大最小厚度
                                                            let BAGGD2, BAGG2ThkMin, BAGG2ThkMax;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAGG2CategoryVal,
                                                                    "type": BAGG2TypeVal,
                                                                    "std": BAGG2STDVal,
                                                                    "name": BAGG2NameVal,
                                                                    "temp": BAGGDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAGGD2 = parseFloat(result.density);
                                                                    BAGG2ThkMin = parseFloat(result.thkMin);
                                                                    BAGG2ThkMax = parseFloat(result.thkMax);

                                                                    // 第二层壁板腐蚀裕量 C22
                                                                    let BAGGC22;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) < BAGG2ThkMax) {
                                                                        BAGGC22 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BAGG2ThkMax) {
                                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGG2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第二段壁板名义厚度
                                                                    let BAGGTHK2N;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.max(BAGGC22, BAGG2ThkMin)
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BAGG2ThkMax) {
                                                                        BAGGTHK2N = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.max(BAGGC22, BAGG2ThkMin)) {
                                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGGC22, BAGG2ThkMin) + " mm")
                                                                            .css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BAGG2ThkMax) {
                                                                        south.html("第二段壁板名义厚度不能大于 " + BAGG2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 O2T E2T C21
                                                                    let BAGGO2T, BAGGE2T, BAGGC21;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAGG2CategoryVal,
                                                                            "type": BAGG2TypeVal,
                                                                            "std": BAGG2STDVal,
                                                                            "name": BAGG2NameVal,
                                                                            "thk": BAGGTHK2N,
                                                                            "temp": BAGGDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": 100000
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAGGO2T = parseFloat(result.ot);
                                                                            if (BAGGO2T < 0) {
                                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGGE2T = 1000 * parseFloat(result.et);
                                                                            if (BAGGE2T < 0) {
                                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGGC21 = parseFloat(result.c1);
                                                                            if (BAGGC21 < 0) {
                                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 第三段壁板材料名称
                                                                            if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                                BAGG3NameVal = rows[30][columns[0][1].field];
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                            let BAGGD3, BAGG3ThkMin, BAGG3ThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAGG3CategoryVal,
                                                                                    "type": BAGG3TypeVal,
                                                                                    "std": BAGG3STDVal,
                                                                                    "name": BAGG3NameVal,
                                                                                    "temp": BAGGDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAGGD3 = parseFloat(result.density);
                                                                                    BAGG3ThkMin = parseFloat(result.thkMin);
                                                                                    BAGG3ThkMax = parseFloat(result.thkMax);

                                                                                    // 第三层壁板腐蚀裕量 C32
                                                                                    let BAGGC32;
                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) < BAGG3ThkMax) {
                                                                                        BAGGC32 = parseFloat(rows[31][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= BAGG3ThkMax) {
                                                                                        south.html("第三段壁板腐蚀裕量不能大于等于 " + BAGG3ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // 第三段壁板名义厚度
                                                                                    let BAGGTHK3N;
                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > Math.max(BAGGC32, BAGG3ThkMin)
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= BAGG3ThkMax) {
                                                                                        BAGGTHK3N = parseFloat(rows[32][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= Math.max(BAGGC32, BAGG3ThkMin)) {
                                                                                        south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAGGC32, BAGG3ThkMin) + " mm")
                                                                                            .css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > BAGG3ThkMax) {
                                                                                        south.html("第三段壁板名义厚度不能大于 " + BAGG3ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // ajax 获取 O3T E3T C31
                                                                                    let BAGGO3T, BAGGE3T, BAGGC31;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAGG3CategoryVal,
                                                                                            "type": BAGG3TypeVal,
                                                                                            "std": BAGG3STDVal,
                                                                                            "name": BAGG3NameVal,
                                                                                            "thk": BAGGTHK3N,
                                                                                            "temp": BAGGDT,
                                                                                            "highLow": 3,
                                                                                            "isTube": 0,
                                                                                            "od": 100000
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAGGO3T = parseFloat(result.ot);
                                                                                            if (BAGGO3T < 0) {
                                                                                                south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGGE3T = 1000 * parseFloat(result.et);
                                                                                            if (BAGGE3T < 0) {
                                                                                                south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGGC31 = parseFloat(result.c1);
                                                                                            if (BAGGC31 < 0) {
                                                                                                south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 第四段壁板材料名称
                                                                                            if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                                                                BAGG4NameVal = rows[36][columns[0][1].field];
                                                                                            }
                                                                                            else {
                                                                                                return false;
                                                                                            }

                                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                                            let BAGGD4, BAGG4ThkMin,
                                                                                                BAGG4ThkMax;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BAGG4CategoryVal,
                                                                                                    "type": BAGG4TypeVal,
                                                                                                    "std": BAGG4STDVal,
                                                                                                    "name": BAGG4NameVal,
                                                                                                    "temp": BAGGDT
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BAGGD4 = parseFloat(result.density);
                                                                                                    BAGG4ThkMin = parseFloat(result.thkMin);
                                                                                                    BAGG4ThkMax = parseFloat(result.thkMax);

                                                                                                    // 第四层壁板腐蚀裕量 C42
                                                                                                    let BAGGC42;
                                                                                                    if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                        && parseFloat(rows[37][columns[0][1].field]) < BAGG4ThkMax) {
                                                                                                        BAGGC42 = parseFloat(rows[37][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                        && parseFloat(rows[37][columns[0][1].field]) >= BAGG4ThkMax) {
                                                                                                        south.html("第四段壁板腐蚀裕量不能大于等于 " + BAGG4ThkMax + " mm")
                                                                                                            .css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 第四段壁板名义厚度
                                                                                                    let BAGGTHK4N;
                                                                                                    if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) > Math.max(BAGGC42, BAGG4ThkMin)
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) <= BAGG4ThkMax) {
                                                                                                        BAGGTHK4N = parseFloat(rows[38][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) <= Math.max(BAGGC42, BAGG4ThkMin)) {
                                                                                                        south.html("第四段壁板名义厚度不能小于等于 " + Math.max(BAGGC42, BAGG4ThkMin) + " mm")
                                                                                                            .css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) > BAGG4ThkMax) {
                                                                                                        south.html("第四段壁板名义厚度不能大于 " + BAGG4ThkMax + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // ajax 获取 O4T E4T C41
                                                                                                    let BAGGO4T,
                                                                                                        BAGGE4T,
                                                                                                        BAGGC41;
                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "category": BAGG4CategoryVal,
                                                                                                            "type": BAGG4TypeVal,
                                                                                                            "std": BAGG4STDVal,
                                                                                                            "name": BAGG4NameVal,
                                                                                                            "thk": BAGGTHK4N,
                                                                                                            "temp": BAGGDT,
                                                                                                            "highLow": 3,
                                                                                                            "isTube": 0,
                                                                                                            "od": 100000
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            BAGGO4T = parseFloat(result.ot);
                                                                                                            if (BAGGO4T < 0) {
                                                                                                                south.html("查询第四段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            BAGGE4T = 1000 * parseFloat(result.et);
                                                                                                            if (BAGGE4T < 0) {
                                                                                                                south.html("查询第四段壁板材料弹性模量失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            BAGGC41 = parseFloat(result.c1);
                                                                                                            if (BAGGC41 < 0) {
                                                                                                                south.html("查询第四段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }

                                                                                                            // 第五段壁板材料名称
                                                                                                            if (!jQuery.isEmptyObject(rows[42][columns[0][1].field])) {
                                                                                                                BAGG5NameVal = rows[42][columns[0][1].field];
                                                                                                            }
                                                                                                            else {
                                                                                                                return false;
                                                                                                            }

                                                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                                                            let BAGGD5,
                                                                                                                BAGG5ThkMin,
                                                                                                                BAGG5ThkMax;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "category": BAGG5CategoryVal,
                                                                                                                    "type": BAGG5TypeVal,
                                                                                                                    "std": BAGG5STDVal,
                                                                                                                    "name": BAGG5NameVal,
                                                                                                                    "temp": BAGGDT
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    BAGGD5 = parseFloat(result.density);
                                                                                                                    BAGG5ThkMin = parseFloat(result.thkMin);
                                                                                                                    BAGG5ThkMax = parseFloat(result.thkMax);

                                                                                                                    // 第五层壁板腐蚀裕量 C52
                                                                                                                    let BAGGC52;
                                                                                                                    if (!jQuery.isEmptyObject(rows[43][columns[0][1].field])
                                                                                                                        && parseFloat(rows[43][columns[0][1].field]) < BAGG5ThkMax) {
                                                                                                                        BAGGC52 = parseFloat(rows[43][columns[0][1].field]);
                                                                                                                    }
                                                                                                                    else if (!jQuery.isEmptyObject(rows[43][columns[0][1].field])
                                                                                                                        && parseFloat(rows[43][columns[0][1].field]) >= BAGG5ThkMax) {
                                                                                                                        south.html("第五段壁板腐蚀裕量不能大于等于 " + BAGG5ThkMax + " mm").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    // 第五段壁板名义厚度
                                                                                                                    let BAGGTHK5N;
                                                                                                                    if (!jQuery.isEmptyObject(rows[44][columns[0][1].field])
                                                                                                                        && parseFloat(rows[44][columns[0][1].field]) > Math.max(BAGGC52, BAGG5ThkMin)
                                                                                                                        && parseFloat(rows[44][columns[0][1].field]) <= BAGG5ThkMax) {
                                                                                                                        BAGGTHK5N = parseFloat(rows[44][columns[0][1].field]);
                                                                                                                    }
                                                                                                                    else if (!jQuery.isEmptyObject(rows[44][columns[0][1].field])
                                                                                                                        && parseFloat(rows[44][columns[0][1].field]) <= Math.max(BAGGC52, BAGG5ThkMin)) {
                                                                                                                        south.html("第五段壁板名义厚度不能小于等于 " + Math.max(BAGGC52, BAGG5ThkMin) + " mm")
                                                                                                                            .css("color", "red");
                                                                                                                        return false;
                                                                                                                    }
                                                                                                                    else if (!jQuery.isEmptyObject(rows[44][columns[0][1].field])
                                                                                                                        && parseFloat(rows[44][columns[0][1].field]) > BAGG5ThkMax) {
                                                                                                                        south.html("第五段壁板名义厚度不能大于 " + BAGG5ThkMax + " mm").css("color", "red");
                                                                                                                        return false;
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        return false;
                                                                                                                    }

                                                                                                                    // ajax 获取 O5T E5T C51
                                                                                                                    let BAGGO5T,
                                                                                                                        BAGGE5T,
                                                                                                                        BAGGC51;
                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "category": BAGG5CategoryVal,
                                                                                                                            "type": BAGG5TypeVal,
                                                                                                                            "std": BAGG5STDVal,
                                                                                                                            "name": BAGG5NameVal,
                                                                                                                            "thk": BAGGTHK5N,
                                                                                                                            "temp": BAGGDT,
                                                                                                                            "highLow": 3,
                                                                                                                            "isTube": 0,
                                                                                                                            "od": 100000
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            BAGGO5T = parseFloat(result.ot);
                                                                                                                            if (BAGGO5T < 0) {
                                                                                                                                south.html("查询第五段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                return false;
                                                                                                                            }
                                                                                                                            BAGGE5T = 1000 * parseFloat(result.et);
                                                                                                                            if (BAGGE5T < 0) {
                                                                                                                                south.html("查询第五段壁板材料弹性模量失败！").css("color", "red");
                                                                                                                                return false;
                                                                                                                            }
                                                                                                                            BAGGC51 = parseFloat(result.c1);
                                                                                                                            if (BAGGC51 < 0) {
                                                                                                                                south.html("查询第五段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                                                return false;
                                                                                                                            }

                                                                                                                            // 过程参数
                                                                                                                            let BAGGG = 9.81;
                                                                                                                            let BAGGPC = BAGGD * BAGGG * BAGGBH / 1000000000;
                                                                                                                            let BAGGBHLC = BAGGBH / BAGGLC;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "ba": BAGGBHLC
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    let BAGGALPHA = parseFloat(result.alpha);
                                                                                                                                    let BAGGBETA = parseFloat(result.beta);

                                                                                                                                    let BAGGCG = BAGGCG1 + 2 * BAGGCG2;
                                                                                                                                    let BAGGDGE = BAGGDGN - BAGGCG;

                                                                                                                                    let BAGGBH1 = 0.31 * BAGGBH;
                                                                                                                                    let BAGGC1 = BAGGC11 + BAGGC12;
                                                                                                                                    let BAGGTHK1E = BAGGTHK1N - BAGGC1;
                                                                                                                                    let BAGGBH1LC = BAGGBH1 / BAGGLC;
                                                                                                                                    let BAGGSH1 = BAGGBH1;
                                                                                                                                    let BAGGPC1 = BAGGD * BAGGG * BAGGSH1 / 1000000000;

                                                                                                                                    $.ajax({
                                                                                                                                        type: "POST",
                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                        async: true,
                                                                                                                                        dataType: "json",
                                                                                                                                        data: JSON.stringify({
                                                                                                                                            "ba": BAGGBH1LC
                                                                                                                                        }),
                                                                                                                                        beforeSend: function () {
                                                                                                                                        },
                                                                                                                                        success: function (result) {

                                                                                                                                            let BAGGALPHA1 = parseFloat(result.alpha);
                                                                                                                                            let BAGGBETA1 = parseFloat(result.beta);

                                                                                                                                            let BAGGBH2 = 0.21 * BAGGBH;
                                                                                                                                            let BAGGC2 = BAGGC21 + BAGGC22;
                                                                                                                                            let BAGGTHK2E = BAGGTHK2N - BAGGC2;
                                                                                                                                            let BAGGBH2LC = BAGGBH2 / BAGGLC;
                                                                                                                                            let BAGGSH2 = BAGGBH1 + BAGGBH2;
                                                                                                                                            let BAGGPC2 = BAGGD * BAGGG * BAGGSH2 / 1000000000;

                                                                                                                                            $.ajax({
                                                                                                                                                type: "POST",
                                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                async: true,
                                                                                                                                                dataType: "json",
                                                                                                                                                data: JSON.stringify({
                                                                                                                                                    "ba": BAGGBH2LC
                                                                                                                                                }),
                                                                                                                                                beforeSend: function () {
                                                                                                                                                },
                                                                                                                                                success: function (result) {

                                                                                                                                                    let BAGGALPHA2 = parseFloat(result.alpha);
                                                                                                                                                    let BAGGBETA2 = parseFloat(result.beta);

                                                                                                                                                    let BAGGBH3 = 0.18 * BAGGBH;
                                                                                                                                                    let BAGGC3 = BAGGC31 + BAGGC32;
                                                                                                                                                    let BAGGTHK3E = BAGGTHK3N - BAGGC3;
                                                                                                                                                    let BAGGBH3LC = BAGGBH3 / BAGGLC;
                                                                                                                                                    let BAGGSH3 = BAGGBH1 + BAGGBH2 + BAGGBH3;
                                                                                                                                                    let BAGGPC3 = BAGGD * BAGGG * BAGGSH3 / 1000000000;

                                                                                                                                                    $.ajax({
                                                                                                                                                        type: "POST",
                                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                        async: true,
                                                                                                                                                        dataType: "json",
                                                                                                                                                        data: JSON.stringify({
                                                                                                                                                            "ba": BAGGBH3LC
                                                                                                                                                        }),
                                                                                                                                                        beforeSend: function () {
                                                                                                                                                        },
                                                                                                                                                        success: function (result) {

                                                                                                                                                            let BAGGALPHA3 = parseFloat(result.alpha);
                                                                                                                                                            let BAGGBETA3 = parseFloat(result.beta);

                                                                                                                                                            let BAGGBH4 = 0.16 * BAGGBH;
                                                                                                                                                            let BAGGC4 = BAGGC41 + BAGGC42;
                                                                                                                                                            let BAGGTHK4E = BAGGTHK4N - BAGGC4;
                                                                                                                                                            let BAGGBH4LC = BAGGBH4 / BAGGLC;
                                                                                                                                                            let BAGGSH4 = BAGGBH1 + BAGGBH2 + BAGGBH3 + BAGGBH4;
                                                                                                                                                            let BAGGPC4 = BAGGD * BAGGG * BAGGSH4 / 1000000000;

                                                                                                                                                            $.ajax({
                                                                                                                                                                type: "POST",
                                                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                                async: true,
                                                                                                                                                                dataType: "json",
                                                                                                                                                                data: JSON.stringify({
                                                                                                                                                                    "ba": BAGGBH4LC
                                                                                                                                                                }),
                                                                                                                                                                beforeSend: function () {
                                                                                                                                                                },
                                                                                                                                                                success: function (result) {

                                                                                                                                                                    let BAGGALPHA4 = parseFloat(result.alpha);
                                                                                                                                                                    let BAGGBETA4 = parseFloat(result.beta);

                                                                                                                                                                    let BAGGBH5 = 0.14 * BAGGBH;
                                                                                                                                                                    let BAGGC5 = BAGGC51 + BAGGC52;
                                                                                                                                                                    let BAGGTHK5E = BAGGTHK5N - BAGGC5;
                                                                                                                                                                    let BAGGBH5LC = BAGGBH5 / BAGGLC;
                                                                                                                                                                    let BAGGSH5 = BAGGBH1 + BAGGBH2 + BAGGBH3 + BAGGBH4 + BAGGBH5;
                                                                                                                                                                    let BAGGPC5 = BAGGD * BAGGG * BAGGSH5 / 1000000000;

                                                                                                                                                                    $.ajax({
                                                                                                                                                                        type: "POST",
                                                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                                        async: true,
                                                                                                                                                                        dataType: "json",
                                                                                                                                                                        data: JSON.stringify({
                                                                                                                                                                            "ba": BAGGBH5LC
                                                                                                                                                                        }),
                                                                                                                                                                        beforeSend: function () {
                                                                                                                                                                        },
                                                                                                                                                                        success: function (result) {

                                                                                                                                                                            let BAGGALPHA5 = parseFloat(result.alpha);
                                                                                                                                                                            let BAGGBETA5 = parseFloat(result.beta);

                                                                                                                                                                            // 拉杆校核
                                                                                                                                                                            let BAGGOMAX = -1,
                                                                                                                                                                                BAGGOMAXCHK = -1,
                                                                                                                                                                                BAGGDGC = -1,
                                                                                                                                                                                BAGGDGD = -1,
                                                                                                                                                                                BAGGDGCHK = -1;
                                                                                                                                                                            if (BAGGLG >= 363 * Math.pow(BAGGDGE, 2 / 3)) {
                                                                                                                                                                                BAGGDGC = 0.553 * BAGGBH * Math.sqrt(BAGGD * BAGGG * BAGGLC / BAGGOGT / 1000000000);
                                                                                                                                                                                BAGGDGD = BAGGDGC + 2 * BAGGCG2;
                                                                                                                                                                                south.html(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "拉杆所需直径：" + (BAGGDGD + BAGGCG1).toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                if (BAGGDGN >= (BAGGDGD + BAGGCG1)) {
                                                                                                                                                                                    south.append(
                                                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                                                        "输入直径：" + BAGGDGN + " mm" +
                                                                                                                                                                                        "</span>");
                                                                                                                                                                                    BAGGDGCHK = "合格";
                                                                                                                                                                                }
                                                                                                                                                                                else {
                                                                                                                                                                                    south.append(
                                                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                                                        "输入直径：" + BAGGDGN + " mm" +
                                                                                                                                                                                        "</span>");
                                                                                                                                                                                    BAGGDGCHK = "不合格";
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.html(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "拉杆许用应力：" + BAGGOGT.toFixed(2) + " MPa" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGOMAX = 0.864 * BAGGEGT * BAGGDGE * BAGGDGE / (BAGGLG * BAGGLG)
                                                                                                                                                                                    + BAGGDG * BAGGG * BAGGLG * BAGGLG / BAGGDGE / 1000000000
                                                                                                                                                                                    + 0.306 * BAGGPC * BAGGBH * BAGGLC / (BAGGDGE * BAGGDGE);
                                                                                                                                                                                if (BAGGOMAX <= BAGGOGT) {
                                                                                                                                                                                    south.append(
                                                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                                                        "实际应力：" + BAGGOMAX.toFixed(4) + " MPa" +
                                                                                                                                                                                        "</span>");
                                                                                                                                                                                    BAGGOMAXCHK = "合格";
                                                                                                                                                                                }
                                                                                                                                                                                else {
                                                                                                                                                                                    south.append(
                                                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                                                        "实际应力：" + BAGGOMAX.toFixed(4) + " MPa" +
                                                                                                                                                                                        "</span>");
                                                                                                                                                                                    BAGGOMAXCHK = "不合格";
                                                                                                                                                                                }
                                                                                                                                                                            }

                                                                                                                                                                            // 顶边加固件
                                                                                                                                                                            let BAGGI0 = 0.217 * BAGGPC1 * BAGGSH1 * BAGGLC * BAGGLC * BAGGLC / BAGGEJT;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "顶边加固件所需最小惯性矩：" + BAGGI0.toFixed(2) + " mm⁴" +
                                                                                                                                                                                "</span>");

                                                                                                                                                                            // 第一段加固柱校核
                                                                                                                                                                            let BAGGLMAX1 = 0.408 * BAGGTHK1E * Math.sqrt(BAGGO1T / (BAGGALPHA * BAGGPC));
                                                                                                                                                                            let BAGGZP1 = BAGGLC * (0.0642 * BAGGPC * BAGGBH * BAGGBH / BAGGO1T - BAGGTHK1E * BAGGTHK1E / 6);

                                                                                                                                                                            // 第一段壁板
                                                                                                                                                                            let BAGGTHK1C = BAGGLC * Math.sqrt(3 * BAGGALPHA1 * BAGGPC1 / BAGGO1T);
                                                                                                                                                                            let BAGGTHK1D = BAGGTHK1C + BAGGC12;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第一段壁板所需厚度：" + (BAGGTHK1D + BAGGC11).toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGTHK1CHK;
                                                                                                                                                                            if (BAGGTHK1N >= (BAGGTHK1D + BAGGC11)) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK1N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK1CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK1N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK1CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            let BAGGF1ALLOW = 5 * (BAGGTHK1E / 2 + Math.sqrt(BAGGBH1LC) * BAGGLC / 500);
                                                                                                                                                                            let BAGGF1MAX = BAGGBETA1 * Math.pow(BAGGLC, 4) * BAGGPC1 / (2 * BAGGE1T * Math.pow(BAGGTHK1E, 3));
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第一段壁板许用挠度：" + BAGGF1ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGF1CHK;
                                                                                                                                                                            if (BAGGF1MAX <= BAGGF1ALLOW) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF1MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF1CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF1MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF1CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            // 第一道水平加固件
                                                                                                                                                                            let BAGGF1 = BAGGPC2 * (BAGGSH1 + BAGGSH2) / 6;
                                                                                                                                                                            let BAGGI1 = 1.3 * BAGGF1 * BAGGLC * BAGGLC * BAGGLC / BAGGEJT;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第一道水平加固件所需最小惯性矩：" + BAGGI1.toFixed(2) + " mm⁴" +
                                                                                                                                                                                "</span>");

                                                                                                                                                                            // 第二段加固柱校核
                                                                                                                                                                            let BAGGLMAX2 = 0.408 * BAGGTHK2E * Math.sqrt(BAGGO2T / (BAGGALPHA * BAGGPC));
                                                                                                                                                                            let BAGGZP2 = BAGGLC * (0.0642 * BAGGPC * BAGGBH * BAGGBH / BAGGO2T - BAGGTHK2E * BAGGTHK2E / 6);// 第二段壁板
                                                                                                                                                                            let BAGGTHK2C = BAGGLC * Math.sqrt(6 * BAGGALPHA2 * (BAGGPC1 + BAGGPC2) / BAGGO2T);
                                                                                                                                                                            let BAGGTHK2D = BAGGTHK2C + BAGGC22;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第二段壁板所需厚度：" + (BAGGTHK2D + BAGGC21).toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGTHK2CHK;
                                                                                                                                                                            if (BAGGTHK2N >= (BAGGTHK2D + BAGGC21)) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK2N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK2CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK2N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK2CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            let BAGGF2ALLOW = 5 * (BAGGTHK2E / 2 + Math.sqrt(BAGGBH2LC) * BAGGLC / 500);
                                                                                                                                                                            let BAGGF2MAX = BAGGBETA2 * Math.pow(BAGGLC, 4) * (BAGGPC1 + BAGGPC2) / (2 * BAGGE2T * Math.pow(BAGGTHK2E, 3));
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第二段壁板许用挠度：" + BAGGF2ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGF2CHK;
                                                                                                                                                                            if (BAGGF2MAX <= BAGGF2ALLOW) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF2MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF2CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF2MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF2CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            // 第二道水平加固件
                                                                                                                                                                            let BAGGF2 = (BAGGPC3 - BAGGPC1) * (BAGGSH1 + BAGGSH2 + BAGGSH3) / 6;
                                                                                                                                                                            let BAGGI2 = 1.3 * BAGGF2 * BAGGLC * BAGGLC * BAGGLC / BAGGEJT;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第二道水平加固件所需最小惯性矩：" + BAGGI2.toFixed(2) + " mm⁴" +
                                                                                                                                                                                "</span>");

                                                                                                                                                                            // 第三段加固柱校核
                                                                                                                                                                            let BAGGLMAX3 = 0.408 * BAGGTHK3E * Math.sqrt(BAGGO3T / (BAGGALPHA * BAGGPC));
                                                                                                                                                                            let BAGGZP3 = BAGGLC * (0.0642 * BAGGPC * BAGGBH * BAGGBH / BAGGO3T - BAGGTHK3E * BAGGTHK3E / 6);

                                                                                                                                                                            // 第三段壁板
                                                                                                                                                                            let BAGGTHK3C = BAGGLC * Math.sqrt(6 * BAGGALPHA3 * (BAGGPC2 + BAGGPC3) / BAGGO3T);
                                                                                                                                                                            let BAGGTHK3D = BAGGTHK3C + BAGGC32;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第三段壁板所需厚度：" + (BAGGTHK3D + BAGGC31).toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGTHK3CHK;
                                                                                                                                                                            if (BAGGTHK3N >= (BAGGTHK3D + BAGGC31)) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK3N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK3CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK3N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK3CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            let BAGGF3ALLOW = 5 * (BAGGTHK3E / 2 + Math.sqrt(BAGGBH3LC) * BAGGLC / 500);
                                                                                                                                                                            let BAGGF3MAX = BAGGBETA3 * Math.pow(BAGGLC, 4) * (BAGGPC2 + BAGGPC3) / (2 * BAGGE3T * Math.pow(BAGGTHK3E, 3));
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第三段壁板许用挠度：" + BAGGF3ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGF3CHK;
                                                                                                                                                                            if (BAGGF3MAX <= BAGGF3ALLOW) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF3MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF3CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF3MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF3CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            // 第三道水平加固件
                                                                                                                                                                            let BAGGF3 = (BAGGPC4 - BAGGPC2) * (BAGGSH4 + BAGGSH3 + BAGGSH2) / 6;
                                                                                                                                                                            let BAGGI3 = 1.3 * BAGGF3 * BAGGLC * BAGGLC * BAGGLC / BAGGEJT;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第三道水平加固件所需最小惯性矩：" + BAGGI3.toFixed(2) + " mm⁴" +
                                                                                                                                                                                "</span>");

                                                                                                                                                                            // 第四段加固柱校核
                                                                                                                                                                            let BAGGLMAX4 = 0.408 * BAGGTHK4E * Math.sqrt(BAGGO4T / (BAGGALPHA * BAGGPC));
                                                                                                                                                                            let BAGGZP4 = BAGGLC * (0.0642 * BAGGPC * BAGGBH * BAGGBH / BAGGO4T - BAGGTHK4E * BAGGTHK4E / 6);

                                                                                                                                                                            // 第四段壁板
                                                                                                                                                                            let BAGGTHK4C = BAGGLC * Math.sqrt(6 * BAGGALPHA4 * (BAGGPC3 + BAGGPC4) / BAGGO4T);
                                                                                                                                                                            let BAGGTHK4D = BAGGTHK4C + BAGGC42;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第四段壁板所需厚度：" + (BAGGTHK4D + BAGGC41).toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGTHK4CHK;
                                                                                                                                                                            if (BAGGTHK4N >= (BAGGTHK4D + BAGGC41)) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK4N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK4CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK4N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK4CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            let BAGGF4ALLOW = 5 * (BAGGTHK4E / 2 + Math.sqrt(BAGGBH4LC) * BAGGLC / 500);
                                                                                                                                                                            let BAGGF4MAX = BAGGBETA4 * Math.pow(BAGGLC, 4) * (BAGGPC3 + BAGGPC4) / (2 * BAGGE4T * Math.pow(BAGGTHK4E, 3));
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第四段壁板许用挠度：" + BAGGF4ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGF4CHK;
                                                                                                                                                                            if (BAGGF4MAX <= BAGGF4ALLOW) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF4MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF4CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF4MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF4CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            // 第四道水平加固件
                                                                                                                                                                            let BAGGF4 = (BAGGPC5 - BAGGPC3) * (BAGGSH5 + BAGGSH4 + BAGGSH3) / 6;
                                                                                                                                                                            let BAGGI4 = 1.3 * BAGGF4 * BAGGLC * BAGGLC * BAGGLC / BAGGEJT;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第四道水平加固件所需最小惯性矩：" + BAGGI4.toFixed(2) + " mm⁴" +
                                                                                                                                                                                "</span>");

                                                                                                                                                                            // 第五段加固柱校核
                                                                                                                                                                            let BAGGLMAX5 = 0.408 * BAGGTHK5E * Math.sqrt(BAGGO5T / (BAGGALPHA * BAGGPC));
                                                                                                                                                                            let BAGGZP5 = BAGGLC * (0.0642 * BAGGPC * BAGGBH * BAGGBH / BAGGO5T - BAGGTHK5E * BAGGTHK5E / 6);

                                                                                                                                                                            // 第五段壁板
                                                                                                                                                                            let BAGGTHK5C = BAGGLC * Math.sqrt(6 * BAGGALPHA5 * (BAGGPC4 + BAGGPC5) / BAGGO5T);
                                                                                                                                                                            let BAGGTHK5D = BAGGTHK5C + BAGGC52;
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第五段壁板所需厚度：" + (BAGGTHK5D + BAGGC51).toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGTHK5CHK;
                                                                                                                                                                            if (BAGGTHK5N >= (BAGGTHK5D + BAGGC51)) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK5N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK5CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "输入厚度：" + BAGGTHK5N + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGTHK5CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            let BAGGF5ALLOW = 5 * (BAGGTHK5E / 2 + Math.sqrt(BAGGBH5LC) * BAGGLC / 500);
                                                                                                                                                                            let BAGGF5MAX = BAGGBETA5 * Math.pow(BAGGLC, 4) * (BAGGPC4 + BAGGPC5) / (2 * BAGGE5T * Math.pow(BAGGTHK5E, 3));
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "第五段壁板许用挠度：" + BAGGF5ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGF5CHK;
                                                                                                                                                                            if (BAGGF5MAX <= BAGGF5ALLOW) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF5MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF5CHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际挠度：" + BAGGF5MAX.toFixed(2) + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGF5CHK = "不合格";
                                                                                                                                                                            }

                                                                                                                                                                            // 加固柱结果汇总
                                                                                                                                                                            let BAGGLMAX = Math.min(BAGGLMAX1, BAGGLMAX2, BAGGLMAX3, BAGGLMAX4, BAGGLMAX5);
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "垂直加固柱允许最大间距：" + BAGGLMAX.toFixed(2) + " mm" +
                                                                                                                                                                                "</span>");
                                                                                                                                                                            let BAGGLCCHK;
                                                                                                                                                                            if (BAGGLC <= BAGGLMAX) {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际输入间距：" + BAGGLC + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGLCCHK = "合格";
                                                                                                                                                                            }
                                                                                                                                                                            else {
                                                                                                                                                                                south.append(
                                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                                    "实际输入间距：" + BAGGLC + " mm" +
                                                                                                                                                                                    "</span>");
                                                                                                                                                                                BAGGLCCHK = "不合格";
                                                                                                                                                                            }
                                                                                                                                                                            let BAGGZP = Math.max(BAGGZP1, BAGGZP2, BAGGZP3, BAGGZP4, BAGGZP5);
                                                                                                                                                                            south.append(
                                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                                "垂直加固柱所需最小截面系数：" + BAGGZP.toFixed(4) + " mm³" +
                                                                                                                                                                                "</span>");

                                                                                                                                                                            // docx
                                                                                                                                                                            let BAGGPayJS = $('#payjs');

                                                                                                                                                                            function getDocx() {
                                                                                                                                                                                $.ajax({
                                                                                                                                                                                    type: "POST",
                                                                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                                                                    url: "baggdocx.action",
                                                                                                                                                                                    async: true,
                                                                                                                                                                                    dataType: "json",
                                                                                                                                                                                    data: JSON.stringify({
                                                                                                                                                                                        ribbonName: "BAGG",

                                                                                                                                                                                        t: BAGGDT,
                                                                                                                                                                                        d: BAGGD,
                                                                                                                                                                                        lc: BAGGLC,
                                                                                                                                                                                        bh: BAGGBH,

                                                                                                                                                                                        jstd: BAGGJSTDVal,
                                                                                                                                                                                        jname: BAGGJNameVal,

                                                                                                                                                                                        gstd: BAGGGSTDVal,
                                                                                                                                                                                        gname: BAGGGNameVal,
                                                                                                                                                                                        dgn: BAGGDGN,
                                                                                                                                                                                        lg: BAGGLG,
                                                                                                                                                                                        cg2: BAGGCG2,

                                                                                                                                                                                        std1: BAGG1STDVal,
                                                                                                                                                                                        name1: BAGG1NameVal,
                                                                                                                                                                                        c12: BAGGC12,
                                                                                                                                                                                        thk1n: BAGGTHK1N,

                                                                                                                                                                                        std2: BAGG2STDVal,
                                                                                                                                                                                        name2: BAGG2NameVal,
                                                                                                                                                                                        c22: BAGGC22,
                                                                                                                                                                                        thk2n: BAGGTHK2N,

                                                                                                                                                                                        std3: BAGG3STDVal,
                                                                                                                                                                                        name3: BAGG3NameVal,
                                                                                                                                                                                        c32: BAGGC32,
                                                                                                                                                                                        thk3n: BAGGTHK3N,

                                                                                                                                                                                        std4: BAGG4STDVal,
                                                                                                                                                                                        name4: BAGG4NameVal,
                                                                                                                                                                                        c42: BAGGC42,
                                                                                                                                                                                        thk4n: BAGGTHK4N,

                                                                                                                                                                                        std5: BAGG5STDVal,
                                                                                                                                                                                        name5: BAGG5NameVal,
                                                                                                                                                                                        c52: BAGGC52,
                                                                                                                                                                                        thk5n: BAGGTHK5N,

                                                                                                                                                                                        d1: BAGGD1.toFixed(4),
                                                                                                                                                                                        c11: BAGGC11.toFixed(4),
                                                                                                                                                                                        o1t: BAGGO1T.toFixed(4),
                                                                                                                                                                                        e1t: (BAGGE1T / 1000).toFixed(4),

                                                                                                                                                                                        d2: BAGGD2.toFixed(4),
                                                                                                                                                                                        c21: BAGGC21.toFixed(4),
                                                                                                                                                                                        o2t: BAGGO2T.toFixed(4),
                                                                                                                                                                                        e2t: (BAGGE2T / 1000).toFixed(4),

                                                                                                                                                                                        d3: BAGGD3.toFixed(4),
                                                                                                                                                                                        c31: BAGGC31.toFixed(4),
                                                                                                                                                                                        o3t: BAGGO3T.toFixed(4),
                                                                                                                                                                                        e3t: (BAGGE3T / 1000).toFixed(4),

                                                                                                                                                                                        d4: BAGGD4.toFixed(4),
                                                                                                                                                                                        c41: BAGGC41.toFixed(4),
                                                                                                                                                                                        o4t: BAGGO4T.toFixed(4),
                                                                                                                                                                                        e4t: (BAGGE4T / 1000).toFixed(4),

                                                                                                                                                                                        d5: BAGGD5.toFixed(4),
                                                                                                                                                                                        c51: BAGGC51.toFixed(4),
                                                                                                                                                                                        o5t: BAGGO5T.toFixed(4),
                                                                                                                                                                                        e5t: (BAGGE5T / 1000).toFixed(4),

                                                                                                                                                                                        dg: BAGGDG.toFixed(4),
                                                                                                                                                                                        cg1: BAGGCG1.toFixed(4),
                                                                                                                                                                                        ogt: BAGGOGT.toFixed(4),
                                                                                                                                                                                        egt: (BAGGEGT / 1000).toFixed(4),

                                                                                                                                                                                        ejt: (BAGGEJT / 1000).toFixed(4),

                                                                                                                                                                                        g: BAGGG.toFixed(4),
                                                                                                                                                                                        pc: BAGGPC.toFixed(4),
                                                                                                                                                                                        bhlc: BAGGBHLC.toFixed(4),
                                                                                                                                                                                        alpha: BAGGALPHA.toFixed(8),
                                                                                                                                                                                        beta: BAGGBETA.toFixed(8),

                                                                                                                                                                                        cg: BAGGCG.toFixed(4),
                                                                                                                                                                                        dge: BAGGDGE.toFixed(4),

                                                                                                                                                                                        bh1: BAGGBH1.toFixed(4),
                                                                                                                                                                                        c1: BAGGC1.toFixed(4),
                                                                                                                                                                                        thk1e: BAGGTHK1E.toFixed(4),
                                                                                                                                                                                        bh1lc: BAGGBH1LC.toFixed(4),
                                                                                                                                                                                        alpha1: BAGGALPHA1.toFixed(8),
                                                                                                                                                                                        beta1: BAGGBETA1.toFixed(8),
                                                                                                                                                                                        sh1: BAGGSH1.toFixed(4),
                                                                                                                                                                                        pc1: BAGGPC1.toFixed(4),

                                                                                                                                                                                        bh2: BAGGBH2.toFixed(4),
                                                                                                                                                                                        c2: BAGGC2.toFixed(4),
                                                                                                                                                                                        thk2e: BAGGTHK2E.toFixed(4),
                                                                                                                                                                                        bh2lc: BAGGBH2LC.toFixed(4),
                                                                                                                                                                                        alpha2: BAGGALPHA2.toFixed(8),
                                                                                                                                                                                        beta2: BAGGBETA2.toFixed(8),
                                                                                                                                                                                        sh2: BAGGSH2.toFixed(4),
                                                                                                                                                                                        pc2: BAGGPC2.toFixed(4),

                                                                                                                                                                                        bh3: BAGGBH3.toFixed(4),
                                                                                                                                                                                        c3: BAGGC3.toFixed(4),
                                                                                                                                                                                        thk3e: BAGGTHK3E.toFixed(4),
                                                                                                                                                                                        bh3lc: BAGGBH3LC.toFixed(4),
                                                                                                                                                                                        alpha3: BAGGALPHA3.toFixed(8),
                                                                                                                                                                                        beta3: BAGGBETA3.toFixed(8),
                                                                                                                                                                                        sh3: BAGGSH3.toFixed(4),
                                                                                                                                                                                        pc3: BAGGPC3.toFixed(4),

                                                                                                                                                                                        bh4: BAGGBH4.toFixed(4),
                                                                                                                                                                                        c4: BAGGC4.toFixed(4),
                                                                                                                                                                                        thk4e: BAGGTHK4E.toFixed(4),
                                                                                                                                                                                        bh4lc: BAGGBH4LC.toFixed(4),
                                                                                                                                                                                        alpha4: BAGGALPHA4.toFixed(8),
                                                                                                                                                                                        beta4: BAGGBETA4.toFixed(8),
                                                                                                                                                                                        sh4: BAGGSH4.toFixed(4),
                                                                                                                                                                                        pc4: BAGGPC4.toFixed(4),

                                                                                                                                                                                        bh5: BAGGBH5.toFixed(4),
                                                                                                                                                                                        c5: BAGGC5.toFixed(4),
                                                                                                                                                                                        thk5e: BAGGTHK5E.toFixed(4),
                                                                                                                                                                                        bh5lc: BAGGBH5LC.toFixed(4),
                                                                                                                                                                                        alpha5: BAGGALPHA5.toFixed(8),
                                                                                                                                                                                        beta5: BAGGBETA5.toFixed(8),
                                                                                                                                                                                        sh5: BAGGSH5.toFixed(4),
                                                                                                                                                                                        pc5: BAGGPC5.toFixed(4),

                                                                                                                                                                                        dgc: BAGGDGC.toFixed(4),
                                                                                                                                                                                        dgd: BAGGDGD.toFixed(4),
                                                                                                                                                                                        dgchk: BAGGDGCHK,

                                                                                                                                                                                        omax: BAGGOMAX.toFixed(4),
                                                                                                                                                                                        omaxchk: BAGGOMAXCHK,

                                                                                                                                                                                        i0: BAGGI0.toFixed(4),

                                                                                                                                                                                        lmax1: BAGGLMAX1.toFixed(4),
                                                                                                                                                                                        zp1: BAGGZP1.toFixed(4),

                                                                                                                                                                                        thk1c: BAGGTHK1C.toFixed(4),
                                                                                                                                                                                        thk1d: BAGGTHK1D.toFixed(4),
                                                                                                                                                                                        thk1chk: BAGGTHK1CHK,
                                                                                                                                                                                        f1allow: BAGGF1ALLOW.toFixed(4),
                                                                                                                                                                                        f1max: BAGGF1MAX.toFixed(4),
                                                                                                                                                                                        f1chk: BAGGF1CHK,

                                                                                                                                                                                        f1: BAGGF1.toFixed(4),
                                                                                                                                                                                        i1: BAGGI1.toFixed(4),

                                                                                                                                                                                        lmax2: BAGGLMAX2.toFixed(4),
                                                                                                                                                                                        zp2: BAGGZP2.toFixed(4),

                                                                                                                                                                                        thk2c: BAGGTHK2C.toFixed(4),
                                                                                                                                                                                        thk2d: BAGGTHK2D.toFixed(4),
                                                                                                                                                                                        thk2chk: BAGGTHK2CHK,
                                                                                                                                                                                        f2allow: BAGGF2ALLOW.toFixed(4),
                                                                                                                                                                                        f2max: BAGGF2MAX.toFixed(4),
                                                                                                                                                                                        f2chk: BAGGF2CHK,

                                                                                                                                                                                        f2: BAGGF2.toFixed(4),
                                                                                                                                                                                        i2: BAGGI2.toFixed(4),

                                                                                                                                                                                        lmax3: BAGGLMAX3.toFixed(4),
                                                                                                                                                                                        zp3: BAGGZP3.toFixed(4),

                                                                                                                                                                                        thk3c: BAGGTHK3C.toFixed(4),
                                                                                                                                                                                        thk3d: BAGGTHK3D.toFixed(4),
                                                                                                                                                                                        thk3chk: BAGGTHK3CHK,
                                                                                                                                                                                        f3allow: BAGGF3ALLOW.toFixed(4),
                                                                                                                                                                                        f3max: BAGGF3MAX.toFixed(4),
                                                                                                                                                                                        f3chk: BAGGF3CHK,

                                                                                                                                                                                        f3: BAGGF3.toFixed(4),
                                                                                                                                                                                        i3: BAGGI3.toFixed(4),

                                                                                                                                                                                        lmax4: BAGGLMAX4.toFixed(4),
                                                                                                                                                                                        zp4: BAGGZP4.toFixed(4),

                                                                                                                                                                                        thk4c: BAGGTHK4C.toFixed(4),
                                                                                                                                                                                        thk4d: BAGGTHK4D.toFixed(4),
                                                                                                                                                                                        thk4chk: BAGGTHK4CHK,
                                                                                                                                                                                        f4allow: BAGGF4ALLOW.toFixed(4),
                                                                                                                                                                                        f4max: BAGGF4MAX.toFixed(4),
                                                                                                                                                                                        f4chk: BAGGF4CHK,

                                                                                                                                                                                        f4: BAGGF4.toFixed(4),
                                                                                                                                                                                        i4: BAGGI4.toFixed(4),

                                                                                                                                                                                        lmax5: BAGGLMAX5.toFixed(4),
                                                                                                                                                                                        zp5: BAGGZP5.toFixed(4),

                                                                                                                                                                                        thk5c: BAGGTHK5C.toFixed(4),
                                                                                                                                                                                        thk5d: BAGGTHK5D.toFixed(4),
                                                                                                                                                                                        thk5chk: BAGGTHK5CHK,
                                                                                                                                                                                        f5allow: BAGGF5ALLOW.toFixed(4),
                                                                                                                                                                                        f5max: BAGGF5MAX.toFixed(4),
                                                                                                                                                                                        f5chk: BAGGF5CHK,

                                                                                                                                                                                        lmax: BAGGLMAX.toFixed(4),
                                                                                                                                                                                        lcchk: BAGGLCCHK,
                                                                                                                                                                                        zp: BAGGZP.toFixed(4)
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
                                                                                                                                                                                            BAGGPayJS.dialog({
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
                                                                                                                                                                                                        BAGGPayJS.dialog("close");
                                                                                                                                                                                                        BAGGPayJS.dialog("clear");
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
                                                                                                                                                                                                                    BAGGPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                                                            BAGGPayJS.dialog('close');
                                                                                                                                                                                                                            BAGGPayJS.dialog('clear');
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